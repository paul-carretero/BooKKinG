use mysql;
create user 'synchUser'@'%' identified by 'synch';
grant replication slave on *.* to 'synchUser'@'%';
FLUSH PRIVILEGES;
SHOW MASTER STATUS;
SHOW VARIABLES LIKE 'server_id';
