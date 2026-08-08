import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'romm',
  title: 'RomM',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/alex/romm-startos',
  upstreamRepo: 'https://github.com/rommapp/romm',
  marketingUrl: 'https://romm.app/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'database'],
  images: {
    romm: {
      source: {
        dockerTag:
          'rommapp/romm:3.5.0@sha256:9ff83725e98e5dfc0b871cb88ca378c539fad66b7afcbe6aad562d2b84d5b802',
      },
      arch: ['x86_64', 'aarch64'],
    },
    mariadb: {
      source: {
        dockerTag:
          'mariadb:11.4.5@sha256:49117dcc565cf51aa57ac5fca59ab31213402ff0eae6ffc13c46a37b938f7e4b',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
