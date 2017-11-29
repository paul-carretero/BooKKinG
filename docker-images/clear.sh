#!/bin/bash
docker rm -f bookking1
docker rm -f bookking2
docker rm -f mysql1
docker rm -f mysql2
docker rm -f load-balancer
docker network rm virtualnetwork
