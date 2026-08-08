# Updating RomM

This package intentionally begins with RomM `3.5.0` so the StartOS wrapper can be validated independently from an application upgrade.

For a future update:

1. Read the RomM release and database migration notes.
2. Verify the image tag and both `amd64` and `arm64` manifests.
3. Pin the new multi-architecture digest in `startos/manifest/index.ts`.
4. Reinspect the entrypoint, ports, volumes, users, and environment variables.
5. Update `startos/versions/current.ts`; add a historical node only for an explicit package migration.
6. Update README and instructions for user-visible behavior.
7. Test install, upgrade, login, scan, restart, backup, and restore on StartOS.

Do not restore compatibility with the abandoned StartOS 0.3 wrapper.
