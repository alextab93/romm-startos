FROM mariadb:11.4.5@sha256:49117dcc565cf51aa57ac5fca59ab31213402ff0eae6ffc13c46a37b938f7e4b

# start-sdk 2.0.9's logical backup helper invokes the legacy MySQL command
# names. MariaDB 11.4 ships only mariadb-* names, so expose compatibility
# aliases until these commands are configurable by the SDK.
RUN ln -s /usr/bin/mariadb-admin /usr/local/bin/mysqladmin \
    && ln -s /usr/bin/mariadb-dump /usr/local/bin/mysqldump \
    && ln -s /usr/bin/mariadb /usr/local/bin/mysql \
    && ln -s /usr/bin/mariadb-install-db /usr/local/bin/mysql_install_db \
    && ln -s /usr/sbin/mariadbd /usr/local/bin/mysqld
