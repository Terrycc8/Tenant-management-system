set -e
set -x

docker stop jojo-server-container
docker rm jojo-server-container

# ## local port:docker port
# docker run -it -p 8300:8300 --name jojo-server-container jojo-server-image1

# docker-compose up -d
# docker logs --follow jojo-server-web-server-1