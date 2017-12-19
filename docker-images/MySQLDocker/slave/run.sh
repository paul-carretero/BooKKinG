docker rm -f mysqlslave
docker build -t mysqlslave .
docker run -dit -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=bookkingDS --name mysqlslave --network=virtualnetwork --ip 192.168.100.4 -p 3506:3306 mysqlslave

echo "waiting slave 1/2"
sleep 10
echo "waiting slave 2/4"
sleep 10
echo "waiting slave 3/4"
sleep 10
echo "waiting slave 4/4"
sleep 10
echo "waiting slave end"

docker exec -ti mysqlslave sh -c "mysql -uroot -proot < \"/backup/initdb.sql\" "