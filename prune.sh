docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker system prune -f
docker volume prune -f
docker network prune -f