docker rm -f mysqlmaster
docker build -t mysqlmaster .
docker run -dit -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bookkingDS --name mysqlmaster --network=virtualnetwork --ip 192.168.100.3 -p 3406:3306 mysqlmaster

echo "waiting slave 1/2"
sleep 10
echo "waiting slave 2/4"
sleep 10
echo "waiting slave 3/4"
sleep 10
echo "waiting slave 4/4"
sleep 10
echo "waiting slave end"

docker exec -ti mysqlmaster sh -c "mysql -uroot -proot < \"/backup/initdb.sql\" "