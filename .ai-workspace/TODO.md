# RomM for StartOS 0.4 — Rewrite TODO

## Decision and scope

Rewrite the package as a native StartOS 0.4 SDK-v2 service. The existing package never produced a working installation, so do **not** build an upgrade path from its StartOS 0.3-era manifest, configuration, database, or backups.

The target is a clean installation of RomM. Existing users, if any, must install it as a new service and import their ROM library through a documented manual process.

Initial application target: **RomM 3.5.0**, packaged as revision **`3.5.0:0`**. This keeps the application version stable while the wrapper is replaced. Upgrade RomM separately after the StartOS package works end to end.

## Keep, replace, and discard

### Keep as product requirements

- Package identity: `romm`.
- Service name, description, license attribution, upstream links, and useful user-facing prose after checking them for accuracy.
- A persistent RomM library, resources, assets, configuration, and Redis data.
- A browser UI exposed through one StartOS `ui` interface on RomM's internal port `8080`.
- RomM's own authentication and first-run setup flow.
- Useful provider credentials/settings only when they are supported by the selected RomM release.
- Multi-architecture support for `x86_64` and `aarch64`.

### Replace completely

- `manifest.yaml` with `startos/manifest.ts` and SDK-v2 modules.
- `scripts/embassy.ts` and its Deno/`embassyd` API with SDK-v2 actions, file models, interfaces, daemons, health checks, backups, and versions.
- The custom source-build `Dockerfile` with pinned upstream multi-architecture images and small package-owned Dockerfiles only where necessary.
- `docker_entrypoint.sh` with the upstream RomM image's `/init` process.
- SQLite assumptions with a persistent MariaDB daemon.
- Legacy `tor-config`/`lan-config` declarations with a StartOS 0.4 interface. Gateway availability is controlled by StartOS.
- The empty `icon.png` with a valid icon no larger than 40 KiB.
- The legacy Makefile with the SDK-v2 `s9pk.mk` build.

### Do not carry forward

- Legacy migration entries or compatibility code for `3.5.0.0`.
- The old `.env` parser or shell-based `export $(...)` loading.
- SQLite or `DATABASE_URL` configuration.
- RAHasher/RetroAchievements code that is not part of the selected RomM release.
- Unsupported ScreenScraper, scheduler, watcher, logging, Redis, or auth environment variables.
- Claims that StartOS automatically authenticates the interface or provisions Tor access.
- Old backups; StartOS 0.3 and 0.4 backups are not compatible.

## Phase 1 — Create the native package skeleton

- [x] Preserve the legacy files temporarily for reference; do not use them in the new build.
- [x] Scaffold the package with the installed `start-cli s9pk init-package` workflow rather than copying another package wholesale.
- [x] Use `/Users/alextab93/code/gitea-runner-startos/` only as an SDK-v2 structural reference.
- [x] Add `package.json` and lockfile with `@start9labs/start-sdk` pinned to the workspace-supported 2.x version (currently `2.0.9`) and `@vercel/ncc`.
- [x] Replace the Makefile with `ARCHES := x86 arm` and include `node_modules/@start9labs/start-sdk/s9pk.mk`.
- [x] Create the standard current scaffold structure:
  - [x] `startos/index.ts`
  - [x] `startos/manifest/index.ts`
  - [x] `startos/main.ts`
  - [x] `startos/init/index.ts`
  - [x] `startos/interfaces.ts`
  - [x] `startos/actions/index.ts`
  - [x] `startos/backups.ts`
  - [x] `startos/fileModels/store.json.ts`
  - [x] `startos/versions/index.ts`
  - [x] `startos/versions/current.ts`
  - [x] `startos/i18n/index.ts`
  - [x] `assets/`
- [x] Export the six required ABI functions from `startos/index.ts`: `createBackup`, `main`, `init`, `uninit`, `manifest`, and `actions`.
- [x] Set the package version to `3.5.0:0`; there is no predecessor node because this is a clean rewrite.

## Phase 2 — Define the runtime topology

- [x] Pin `rommapp/romm:3.5.0` by immutable digest after verifying both `amd64` and `arm64` manifests.
- [x] Use the upstream image entrypoint and `/init` command as PID 1; enable init semantics if required by the SDK.
- [x] Do not rebuild RomM from source in this package.
- [x] Add a pinned, multi-architecture MariaDB image as a second daemon.
- [x] Create persistent storage with clear ownership:
  - [x] RomM data mounted where the official image expects `/romm/library`, `/romm/resources`, `/romm/assets`, and `/romm/config`.
  - [x] Embedded Redis data mounted at `/redis-data`.
  - [x] MariaDB data mounted at `/var/lib/mysql`.
- [x] Prefer separate StartOS volume IDs such as `main` and `database`; there is no legacy data-layout constraint.
- [x] Generate MariaDB root password, application password, and `ROMM_AUTH_SECRET_KEY` once during initialization.
- [x] Store secrets with typed SDK file models/store helpers; never regenerate them on a settings change.
- [x] Pass only variables supported by RomM 3.5.0, including the MariaDB host, database, user, and password.
- [x] Leave `REDIS_HOST` unset if the official RomM image is expected to manage its embedded Redis; do not pass an empty `REDIS_PORT`.
- [x] Make the RomM daemon depend on MariaDB readiness.
- [x] Run both containers with the least privilege compatible with their official initialization processes.

## Phase 3 — Interface, health, and configuration

- [x] Define one `MultiHost`/`createInterface` UI interface bound to internal port `8080`.
- [x] Label it clearly as the RomM web interface and rely on RomM's native authentication.
- [x] Do not hard-code Tor or LAN URLs; document that StartOS gateway choices control availability.
- [x] Add MariaDB readiness using a database-native check or listening-port check.
- [x] Add RomM readiness using `checkPortListening(8080)`; `/api/heartbeat` was also confirmed during the local runtime smoke test.
- [x] Expose a small configuration action only for settings verified against the exact RomM 3.5.0 environment-variable documentation/source.
- [x] Treat credentials as secrets in action inputs and stored files.
- [x] Ensure values containing spaces, quotes, dollar signs, or newlines are passed through structured environment handling, never shell interpolation.
- [x] Evaluate safe setup guidance: keep it in `instructions.md`; the action never prefills or reveals stored secrets.

## Phase 4 — Backups and restore

- [x] Back up the MariaDB database with the SDK MySQL/MariaDB dump helper.
- [x] Back up RomM configuration and application-owned metadata.
- [x] Include the ROM library in routine StartOS backups for complete restores; document that backups may be very large.
- [x] Document an independent backup strategy for irreplaceable ROM files even though the library is included.
- [x] Include Redis data as part of the complete `main` volume and document that choice.
- [ ] Test restore into an empty service and verify database records, configuration, login, and library visibility.

## Phase 5 — Documentation and assets

- [x] Replace the zero-byte icon with an upstream-authorized PNG or SVG that meets StartOS size/format requirements.
- [x] Repair or rewrite `README.md`; remove embedded NUL bytes and corrupted tree glyphs.
- [x] Rewrite `instructions.md` for a clean StartOS 0.4 install.
- [x] Document the RomM first-run administrator setup.
- [x] Document required storage, supported gateways, native RomM authentication, provider credentials, and backup limitations accurately.
- [x] Add a clear statement that the abandoned StartOS 0.3 package is not upgrade-compatible and its backups cannot be restored into this package.
- [x] Include a manual ROM import guide for users who experimented with the old wrapper.
- [x] Record all image tags and immutable digests used by the package.

## Phase 6 — Remove the abandoned wrapper

Removed after native build/pack and isolated runtime validation. Full StartOS installation testing remains explicitly unchecked below.

- [x] Remove `manifest.yaml`.
- [x] Remove `scripts/embassy.ts` and the generated legacy JavaScript, if present.
- [x] Remove `docker_entrypoint.sh`.
- [x] Remove the old custom `Dockerfile`, unless a new minimal package Dockerfile intentionally replaces it.
- [x] Remove `icon_note.txt` after installing the real icon.
- [x] Remove obsolete documentation and unsupported configuration references.
- [x] Confirm source and user documentation contain no references to `embassyd`, `DATABASE_URL`, SQLite, RAHasher, `REDIS_PORT=`, legacy `tor-config`, or legacy `lan-config` (the historical checklist wording is excluded from this search).

## Validation gates

Do not mark the rewrite complete until every applicable gate passes.

- [x] Install dependencies reproducibly from the committed lockfile (`npm ci`).
- [x] Type-check and bundle `startos/index.ts` to `javascript/index.js`.
- [x] Run `start-cli s9pk list-ingredients .` successfully.
- [x] Build the package for both `x86_64` and `aarch64`.
- [x] Pack and verify the `.s9pk` with the current StartOS tooling.
- [x] Inspect both packed artifacts: SDK `2.0.9`, package `3.5.0:0`, target-specific packed images, `main`/`database` volumes, six ABI exports, one UI interface in bundled source, and no additional package permissions.
- [ ] Install on a clean StartOS 0.4 system.
- [x] Verify the pinned MariaDB runtime initializes once and survives service restart (isolated ARM64 runtime smoke test).
- [x] Verify the pinned RomM runtime reaches ready state, completes first-run admin setup, and serves the browser UI (isolated ARM64 runtime smoke test).
- [ ] Verify login, logout, session persistence, and secret persistence across configuration changes and restarts.
- [ ] Import a small representative ROM set and verify scan, metadata, artwork, launch/download paths, and background workers.
- [ ] Exercise stop/start, reboot, update-to-same-build, backup, restore, and uninstall/reinstall behavior.
- [ ] Verify both Tor and LAN access only through gateways enabled by the StartOS administrator.
- [ ] Repeat smoke tests on both supported CPU architectures.

### Current external validation blocker

- The configured StartOS development host is `https://dev-vm.local`, but it is currently unreachable from this workstation. The install and appliance-only checks above must stay unchecked until a StartOS 0.4 host is online and authenticated.
- Local ARM64 container smoke test completed: MariaDB initialized 11 RomM schema tables, `/api/heartbeat` reported RomM `3.5.0`, every declared persistent mount was writable, and database/library state survived restart. A real administrator was created through RomM's CSRF-protected first-run API, the UI root returned HTML, login and authenticated identity succeeded, the same session remained valid after restart with the fixed auth secret, logout invalidated the session, and the setup wizard switched off.
- The packaging repository URLs available from the abandoned manifest and local username do not currently resolve on GitHub. Confirm the final repository URL before publishing.

## Definition of done

- A clean StartOS 0.4 install starts RomM and MariaDB without manual shell intervention.
- The UI is reachable through the declared StartOS interface and protected by RomM authentication.
- Persistent data and generated secrets survive restarts and configuration changes.
- Backup and restore behavior is tested and documented, including any ROM-library exclusion.
- The package builds reproducibly for both architectures and passes StartOS pack/verify checks.
- Documentation describes only behavior confirmed on a real StartOS 0.4 installation.
- No runtime or packaging dependency remains on the abandoned StartOS 0.3 wrapper.
