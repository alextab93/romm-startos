import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.0:3',
  releaseNotes: {
    en_US:
      'Fixes backup restore by recreating the MariaDB account RomM uses over the internal loopback connection, including backups that restore the database root credential. Full release notes: https://github.com/rommapp/romm/releases/tag/5.1.0',
    es_ES:
      'Corrige la restauración de copias de seguridad al recrear la cuenta de MariaDB que RomM usa mediante la conexión interna de bucle local, incluso cuando la copia restaura la credencial raíz de la base de datos. Notas completas: https://github.com/rommapp/romm/releases/tag/5.1.0',
    de_DE:
      'Behebt die Wiederherstellung von Backups, indem das MariaDB-Konto für RomMs interne Loopback-Verbindung erneut erstellt wird, auch wenn das Backup das Root-Zugangspasswort der Datenbank wiederherstellt. Vollständige Versionshinweise: https://github.com/rommapp/romm/releases/tag/5.1.0',
    pl_PL:
      'Naprawia przywracanie kopii zapasowych, odtwarzając konto MariaDB używane przez RomM przez wewnętrzne połączenie loopback, także gdy kopia przywraca poświadczenie roota bazy danych. Pełne informacje o wydaniu: https://github.com/rommapp/romm/releases/tag/5.1.0',
    fr_FR:
      'Corrige la restauration des sauvegardes en recréant le compte MariaDB que RomM utilise par la connexion interne de bouclage, y compris si la sauvegarde restaure le mot de passe root de la base de données. Notes complètes : https://github.com/rommapp/romm/releases/tag/5.1.0',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
