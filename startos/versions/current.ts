import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '3.5.0:0',
  releaseNotes: {
    en_US: 'Initial native StartOS 0.4 package for RomM 3.5.0.',
    es_ES: 'Paquete nativo inicial de StartOS 0.4 para RomM 3.5.0.',
    de_DE: 'Erstes natives StartOS-0.4-Paket für RomM 3.5.0.',
    pl_PL: 'Pierwszy natywny pakiet StartOS 0.4 dla RomM 3.5.0.',
    fr_FR: 'Premier paquet StartOS 0.4 natif pour RomM 3.5.0.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
