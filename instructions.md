# RomM

RomM provides a browser interface for organizing, enriching, and browsing your game library.

## First start

1. Start RomM and wait for both Database and Web Interface health checks to become ready. Initial database setup can take several minutes.
2. Open **Interfaces → RomM Web Interface**.
3. Complete RomM's first-run administrator registration in the web interface.
4. Keep RomM authentication enabled. StartOS does not add authentication to this interface.

The StartOS administrator controls where the interface is reachable. LAN addresses are normally available first. Tor requires the separate Tor service and must be enabled for this interface by the administrator.

## Metadata providers

RomM works without external metadata credentials, but enrichment is limited. Run **Actions → Configure Metadata Providers** to save optional credentials for IGDB, MobyGames, and SteamGridDB. The action never displays saved secret values. Restart RomM after saving or clearing credentials.

## Importing ROMs

Place files in the library using the folder layout documented for RomM 5.1.0, then start a scan from the RomM web interface. Test with a small library before copying a large collection.

RomM 5.1.0 may use hardlinks between its library and asset directories. Keep all RomM application data in the package-managed storage; do not replace individual `/romm` subdirectories with unrelated external filesystems.

If you experimented with the abandoned StartOS 0.3 wrapper, do not copy its database, `.env`, Redis data, or backup. Copy only ROM files into a clean installation and let RomM rebuild its metadata.

## Storage and backups

The StartOS backup contains the MariaDB database, RomM configuration, generated secrets, artwork/resources, Redis data, and the ROM library. Because ROM libraries can be very large, confirm that the backup destination has enough free space and maintain an independent copy of irreplaceable ROM files.

Backups from the old StartOS 0.3 wrapper cannot be restored into this native StartOS 0.4 package. After restoring, verify sign-in, library visibility, and a representative game before treating the restore as successful.

## Security

- Use a strong RomM administrator password.
- Enable only the StartOS gateway addresses you need.
- Treat metadata-provider credentials as secrets.
- Do not assume a Tor or public address exists unless it is shown and enabled in the Interfaces tab.
