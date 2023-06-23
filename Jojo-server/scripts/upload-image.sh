set -e
set -x

source ../scripts/config
docker images $image
docker save $image|pv |zstd| ssh $server "unzstd | docker load"