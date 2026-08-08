export const uiPort = 8080
export const databasePort = 3306
export const uiHostId = 'ui'
export const databaseName = 'romm'
export const databaseUser = 'romm'

export const mainMounts = {
  library: '/romm/library',
  resources: '/romm/resources',
  assets: '/romm/assets',
  config: '/romm/config',
  redis: '/redis-data',
} as const
