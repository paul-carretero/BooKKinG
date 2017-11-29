CURRENTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
MYSQL1IP="192.168.100.11"
MYSQL2IP="192.168.100.12"

docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=1a2z3e! -e MYSQL_DATABASE=bookkingDS -dit --network=virtualnetwork --ip $MYSQL1IP -p 5306:3306 -v $CURRENTPATH/server1/conf.d:/etc/mysql/mysql.conf.d/ -v $CURRENTPATH/server1/backup:/backup mysql

docker run --name mysql2 -e MYSQL_ROOT_PASSWORD=1a2z3e! -e MYSQL_DATABASE=bookkingDS -dit --network=virtualnetwork --ip $MYSQL2IP -p 6306:3306 -v $CURRENTPATH/server2/conf.d:/etc/mysql/mysql.conf.d/ -v $CURRENTPATH/server2/backup:/backup mysql



while ! mysqladmin ping -h$MYSQL1IP -u root -p1a2z3e! --silent  ; do
    echo "waiting server #1"
    sleep 2
done
while ! mysqladmin ping -h$MYSQL2IP -u root -p1a2z3e! --silent  ; do
    echo "waiting server #2"
    sleep 2
done

#mysql -h "server-name" -u "root" "-pXXXXXXXX" "database-name" < "filename.sql"

docker exec -ti mysql1 sh -c "mysql -uroot -p1a2z3e! < \"/backup/initdb.sql\" "
sleep 2
docker exec -ti mysql2 sh -c "mysql -uroot -p1a2z3e! < \"/backup/initdb.sql\" "
sleep 2
docker exec -ti mysql1 sh -c "mysql -uroot -p1a2z3e! < \"/backup/initmaster.sql\" "
sleep 2
docker exec -ti mysql2 sh -c "mysql -uroot -p1a2z3e! < \"/backup/initmaster.sql\" "
