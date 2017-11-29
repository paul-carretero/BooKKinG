echo ""
echo "---CLEAR---"
echo ""

sh ./clear.sh

echo ""
echo "---INIT NETWORK---"
echo ""

docker network create \
  --driver=bridge \
  --subnet=192.168.100.0/16 \
  --ip-range=192.168.100.0/24 \
  --gateway=192.168.100.254 \
  virtualnetwork

echo ""
echo "---INIT MySQL DATABASES---"
echo ""

sh ./MySQLDocker/run.sh

echo ""
echo "---INIT WILDFLY---"
echo ""

LOADBALANCER="192.168.100.3"
WILDFLY1="192.168.100.1"
WILDFLY2="192.168.100.2"
docker build -t bookking-cluster .
docker run -d --name bookking1 -p 8080:8080 -p 9990:9990 --network=virtualnetwork --ip $WILDFLY1 bookking-cluster /opt/jboss/wildfly/bin/standalone.sh -c standalone-ha-1.xml -u 230.0.0.4
docker run -d --name bookking2 -p 8081:8080 -p 9991:9990 --network=virtualnetwork --ip $WILDFLY2 bookking-cluster /opt/jboss/wildfly/bin/standalone.sh -c standalone-ha-2.xml -u 230.0.0.4
docker run -d --name load-balancer -p 80:80 --env-file ./env.list --network=virtualnetwork --ip $LOADBALANCER jasonwyatt/nginx-loadbalancer
