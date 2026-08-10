import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '5.1.0:1',
  releaseNotes: {
    en_US:
      'Initial StartOS release of RomM 5.1.0. Adds the scan settings UI and per-field artwork priorities, improves library scanning, and includes security hardening and numerous fixes. Full release notes: https://github.com/rommapp/romm/releases/tag/5.1.0',
    es_ES:
      'Versión inicial de RomM 5.1.0 para StartOS. Añade la interfaz de configuración de escaneo y prioridades de ilustraciones por campo, mejora el escaneo de la biblioteca e incluye refuerzos de seguridad y numerosas correcciones. Notas completas: https://github.com/rommapp/romm/releases/tag/5.1.0',
    de_DE:
      'Erste StartOS-Veröffentlichung von RomM 5.1.0. Fügt die Oberfläche für Scan-Einstellungen und feldbezogene Prioritäten für Grafiken hinzu, verbessert Bibliotheksscans und enthält Sicherheitshärtungen sowie zahlreiche Korrekturen. Vollständige Versionshinweise: https://github.com/rommapp/romm/releases/tag/5.1.0',
    pl_PL:
      'Pierwsze wydanie RomM 5.1.0 dla StartOS. Dodaje interfejs ustawień skanowania i priorytety grafik dla poszczególnych pól, usprawnia skanowanie biblioteki oraz zawiera wzmocnienia zabezpieczeń i liczne poprawki. Pełne informacje o wydaniu: https://github.com/rommapp/romm/releases/tag/5.1.0',
    fr_FR:
      'Première version de RomM 5.1.0 pour StartOS. Ajoute l’interface des paramètres d’analyse et les priorités d’illustration par champ, améliore l’analyse de la ludothèque et inclut un renforcement de la sécurité ainsi que de nombreux correctifs. Notes complètes : https://github.com/rommapp/romm/releases/tag/5.1.0',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
