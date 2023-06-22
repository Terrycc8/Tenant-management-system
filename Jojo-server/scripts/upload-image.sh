set e
set -x

image=
server=terry-chan.com

docker save $image |zstd| ssh $server "unzstd | docker load"