import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z
  .object({
    databaseRootPassword: z.string().catch(''),
    databasePassword: z.string().catch(''),
    authSecret: z.string().catch(''),
    igdbClientId: z.string().catch(''),
    igdbClientSecret: z.string().catch(''),
    mobygamesApiKey: z.string().catch(''),
    steamGridDbApiKey: z.string().catch(''),
  })
  .strip()

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
