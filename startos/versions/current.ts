import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.0:10',
  releaseNotes: {
    en_US:
      'Restores the MariaDB account required by RomM view and trigger definers after backup recovery. Full release notes: https://github.com/rommapp/romm/releases/tag/5.1.0',
    es_ES:
      'Restaura la cuenta de MariaDB requerida por los definidores de vistas y disparadores de RomM después de recuperar una copia de seguridad. Notas completas: https://github.com/rommapp/romm/releases/tag/5.1.0',
    de_DE:
      'Stellt nach einer Sicherungswiederherstellung das MariaDB-Konto wieder her, das von den Definern der RomM-Views und Trigger benötigt wird. Vollständige Versionshinweise: https://github.com/rommapp/romm/releases/tag/5.1.0',
    pl_PL:
      'Przywraca po odzyskaniu kopii zapasowej konto MariaDB wymagane przez definicje widoków i wyzwalaczy RomM. Pełne informacje o wydaniu: https://github.com/rommapp/romm/releases/tag/5.1.0',
    fr_FR:
      'Restaure après récupération d’une sauvegarde le compte MariaDB requis par les définisseurs des vues et déclencheurs RomM. Notes complètes : https://github.com/rommapp/romm/releases/tag/5.1.0',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
