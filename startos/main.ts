import { sdk } from './sdk'
import { i18n } from './i18n'
import { storeJson } from './fileModels/store.json'
import {
  databaseName,
  databasePort,
  databaseUser,
  mainMountpoint,
  redisMountpoint,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  const store = await storeJson.read().const(effects)
  if (
    !store?.databaseRootPassword ||
    !store.databasePassword ||
    !store.authSecret
  ) {
    throw new Error('RomM internal secrets have not been initialized')
  }

  const mariadb = sdk.SubContainer.of(
    effects,
    { imageId: 'mariadb' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'database',
      subpath: null,
      mountpoint: '/var/lib/mysql',
      readonly: false,
    }),
    'romm-mariadb-sub',
  )

  const romm = sdk.SubContainer.of(
    effects,
    { imageId: 'romm' },
    sdk.Mounts.of()
      .mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: mainMountpoint,
        readonly: false,
      })
      .mountVolume({
        volumeId: 'main',
        subpath: 'redis-data',
        mountpoint: redisMountpoint,
        readonly: false,
      }),
    'romm-app-sub',
  )

  return sdk.Daemons.of(effects)
    .addDaemon('mariadb', {
      subcontainer: mariadb,
      exec: {
        command: sdk.useEntrypoint(),
        runAsInit: true,
        env: {
          MARIADB_ROOT_PASSWORD: store.databaseRootPassword,
          MARIADB_DATABASE: databaseName,
          MARIADB_USER: databaseUser,
          MARIADB_PASSWORD: store.databasePassword,
        },
      },
      ready: {
        display: i18n('Database'),
        gracePeriod: 120000,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, databasePort, {
            successMessage: i18n('MariaDB is ready'),
            errorMessage: i18n('MariaDB is not ready'),
          }),
      },
      requires: [],
    })
    .addDaemon('romm', {
      subcontainer: romm,
      exec: {
        command: sdk.useEntrypoint(),
        runAsInit: true,
        env: {
          DB_HOST: '127.0.0.1',
          DB_PORT: String(databasePort),
          DB_NAME: databaseName,
          DB_USER: databaseUser,
          DB_PASSWD: store.databasePassword,
          ROMM_AUTH_SECRET_KEY: store.authSecret,
          IGDB_CLIENT_ID: store.igdbClientId,
          IGDB_CLIENT_SECRET: store.igdbClientSecret,
          MOBYGAMES_API_KEY: store.mobygamesApiKey,
          STEAMGRIDDB_API_KEY: store.steamGridDbApiKey,
        },
      },
      ready: {
        display: i18n('Web Interface'),
        gracePeriod: 180000,
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('RomM is ready'),
            errorMessage: i18n('RomM is not ready'),
          }),
      },
      requires: ['mariadb'],
    })
})
