stop slave;
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%';
CHANGE MASTER TO MASTER_HOST = '192.168.100.3', MASTER_USER = 'synchUser', MASTER_PASSWORD = 'synchUser', MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 154;
start slave;
show slave status\G
