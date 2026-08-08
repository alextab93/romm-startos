# RomM for StartOS

This repository packages [RomM](https://github.com/rommapp/romm) 3.5.0 as a native StartOS 0.4 SDK-v2 service.

RomM scans, enriches, browses, and manages a personal game library from a web interface. This package uses the official RomM container and a private MariaDB sidecar. RomM's bundled Redis instance, web server, migrations, watcher, worker, and scheduler are started by the upstream `/init` process.

## Architecture

- `rommapp/romm:3.5.0` serves the UI on internal port `8080`.
- `mariadb:11.4.5` stores RomM metadata on internal port `3306`.
- The daemons share the service network namespace; MariaDB listens only inside the package.
- RomM starts only after the MariaDB health check succeeds.
- StartOS exposes a single `ui` interface. The administrator chooses which installed gateways may publish an address.
- Authentication is provided by RomM, not by the StartOS interface proxy.

## Persistent data

The `main` volume contains `library/`, `resources/`, `assets/`, `config/`, `redis-data/`, and the package's `store.json`. The `database` volume contains MariaDB at `/var/lib/mysql`.

Internal MariaDB credentials and `ROMM_AUTH_SECRET_KEY` are generated once during a clean install. The Configure Metadata Providers action stores the exact optional variables supported by RomM 3.5.0: `IGDB_CLIENT_ID`, `IGDB_CLIENT_SECRET`, `MOBYGAMES_API_KEY`, and `STEAMGRIDDB_API_KEY`.

## Backups

Backups create a logical MariaDB dump and copy the `main` volume. The ROM library is included for correctness, so backups may be large. StartOS stops the service while creating or restoring a backup.

## Legacy package policy

This is a clean rewrite. The abandoned StartOS 0.3 wrapper never formed a supported release and has no upgrade, database, or backup compatibility with this package. Users must copy only their ROM files into a clean installation and let RomM scan them again.

## Images

Both images are pinned to immutable multi-architecture OCI indexes:

- `rommapp/romm:3.5.0@sha256:9ff83725e98e5dfc0b871cb88ca378c539fad66b7afcbe6aad562d2b84d5b802`
- `mariadb:11.4.5@sha256:49117dcc565cf51aa57ac5fca59ab31213402ff0eae6ffc13c46a37b938f7e4b`

The verified Linux platforms are `amd64` and `arm64`.

## Build

```sh
npm ci
npm run check
npm run build
make
```

The package uses `@start9labs/start-sdk` 2.0.9. A release requires installation, login, library import, restart, backup, and restore testing on real StartOS 0.4 hardware for both supported architectures.

## License

RomM and this package are distributed under AGPL-3.0. See [LICENSE](LICENSE).
