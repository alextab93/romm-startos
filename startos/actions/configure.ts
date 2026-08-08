import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  igdbClientId: Value.text({
    name: i18n('IGDB Client ID'),
    description: i18n('Optional Twitch application client ID used by IGDB.'),
    required: false,
    default: null,
  }),
  igdbClientSecret: Value.text({
    name: i18n('IGDB Client Secret'),
    description: i18n('Optional Twitch application secret used by IGDB.'),
    required: false,
    masked: true,
    default: null,
  }),
  mobygamesApiKey: Value.text({
    name: i18n('MobyGames API Key'),
    description: i18n('Optional API key used to retrieve MobyGames metadata.'),
    required: false,
    masked: true,
    default: null,
  }),
  steamGridDbApiKey: Value.text({
    name: i18n('SteamGridDB API Key'),
    description: i18n('Optional API key used to retrieve SteamGridDB artwork.'),
    required: false,
    masked: true,
    default: null,
  }),
})

export const configure = sdk.Action.withInput(
  'configure',
  async () => ({
    name: i18n('Configure Metadata Providers'),
    description: i18n(
      'Save optional API credentials supported by RomM 3.5.0.',
    ),
    warning: i18n(
      'Saved values are passed to RomM after the service is restarted. Leave a field blank to remove it.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  async () => ({
    igdbClientId: null,
    igdbClientSecret: null,
    mobygamesApiKey: null,
    steamGridDbApiKey: null,
  }),
  async ({ effects, input }) => {
    await storeJson.merge(effects, {
      igdbClientId: input.igdbClientId ?? '',
      igdbClientSecret: input.igdbClientSecret ?? '',
      mobygamesApiKey: input.mobygamesApiKey ?? '',
      steamGridDbApiKey: input.steamGridDbApiKey ?? '',
    })

    return {
      version: '1',
      title: i18n('Configuration Saved'),
      message: i18n(
        'Restart RomM to apply the metadata provider configuration.',
      ),
      result: null,
    }
  },
)
