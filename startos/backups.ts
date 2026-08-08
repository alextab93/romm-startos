import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { databaseName, databaseUser } from './utils'

export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.withMysqlDump({
      imageId: 'mariadb',
      dbVolume: 'database',
      datadir: '/var/lib/mysql',
      database: databaseName,
      user: databaseUser,
      password: async () => {
        const store = await storeJson.read().once()
        if (!store?.databasePassword) {
          throw new Error('RomM database password is missing')
        }
        return store.databasePassword
      },
      engine: 'mariadb',
      readyTimeout: 120000,
    }).addVolume('main'),
)
