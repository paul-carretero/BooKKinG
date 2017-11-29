stop slave;
CHANGE MASTER TO MASTER_HOST = '192.168.100.11', MASTER_USER = 'synchUser', MASTER_PASSWORD = 'synch', MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 154;
start slave;
show slave status\G
