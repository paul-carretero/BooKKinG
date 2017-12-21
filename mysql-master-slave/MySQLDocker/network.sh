docker network rm virtualnetwork

docker network create \
  --driver=bridge \
  --subnet=192.168.100.0/16 \
  --ip-range=192.168.100.0/24 \
  --gateway=192.168.100.254 \
  virtualnetwork
