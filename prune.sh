docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker system prune -f
docker volume prune -f
docker network prune -f
docker build -t did-node .
docker run --network host -p 9090:9090 did-node:latest