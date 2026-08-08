import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.0:0',
  releaseNotes: {
    en_US:
      'Updates RomM to 5.1.0 with the redesigned UI, security fixes, enhanced library scanning, and native support for cross-directory hardlinks.',
    es_ES:
      'Actualiza RomM a 5.1.0 con la interfaz rediseñada, correcciones de seguridad, escaneo mejorado y soporte nativo para enlaces físicos entre directorios.',
    de_DE:
      'Aktualisiert RomM auf 5.1.0 mit neuer Oberfläche, Sicherheitskorrekturen, verbessertem Bibliotheksscan und nativer Unterstützung für verzeichnisübergreifende Hardlinks.',
    pl_PL:
      'Aktualizuje RomM do 5.1.0 z przeprojektowanym interfejsem, poprawkami bezpieczeństwa, ulepszonym skanowaniem i obsługą dowiązań twardych między katalogami.',
    fr_FR:
      'Met RomM à jour vers 5.1.0 avec une interface repensée, des correctifs de sécurité, une analyse améliorée et la prise en charge des liens physiques entre répertoires.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
