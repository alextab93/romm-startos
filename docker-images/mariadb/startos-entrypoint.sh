#!/bin/sh
set -eu

/usr/local/bin/docker-entrypoint.sh "$@" &
server_pid=$!

trap 'kill -TERM "$server_pid" 2>/dev/null || true; wait "$server_pid"' TERM INT

root_password=''

until {
  if mariadb --protocol=socket --user=root --password="$MARIADB_ROOT_PASSWORD" --execute 'SELECT 1' >/dev/null 2>&1; then
    root_password="$MARIADB_ROOT_PASSWORD"
  elif mariadb --protocol=socket --user=root --password="$MARIADB_PASSWORD" --execute 'SELECT 1' >/dev/null 2>&1; then
    root_password="$MARIADB_PASSWORD"
  else
    false
  fi
}; do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    wait "$server_pid"
    exit $?
  fi
  sleep 1
done

mariadb --protocol=socket --user=root --password="$root_password" --execute "CREATE USER IF NOT EXISTS 'romm'@'127.0.0.1' IDENTIFIED BY '$MARIADB_PASSWORD'; GRANT ALL PRIVILEGES ON romm.* TO 'romm'@'127.0.0.1'; FLUSH PRIVILEGES;"

wait "$server_pid"
