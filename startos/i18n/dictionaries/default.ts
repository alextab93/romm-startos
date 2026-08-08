export const DEFAULT_LANG = 'en_US'

const dict = {
  Database: 0,
  'MariaDB is ready': 1,
  'MariaDB is not ready': 2,
  'Web Interface': 3,
  'RomM is ready': 4,
  'RomM is not ready': 5,
  'RomM Web Interface': 6,
  'Browse, scan, and manage your game library': 7,
  'IGDB Client ID': 8,
  'Optional Twitch application client ID used by IGDB.': 9,
  'IGDB Client Secret': 10,
  'Optional Twitch application secret used by IGDB.': 11,
  'MobyGames API Key': 12,
  'Optional API key used to retrieve MobyGames metadata.': 13,
  'SteamGridDB API Key': 14,
  'Optional API key used to retrieve SteamGridDB artwork.': 15,
  'Configure Metadata Providers': 16,
  'Save optional API credentials supported by RomM 5.1.0.': 17,
  'Saved values are passed to RomM after the service is restarted. Leave a field blank to remove it.': 18,
  'Configuration Saved': 19,
  'Restart RomM to apply the metadata provider configuration.': 20,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
