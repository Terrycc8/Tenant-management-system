set -e
set -x

rm -rf out
nest-gen
rm -rf ../Jojo-client/src/api-client
cp -r out ../Jojo-client/src/api-client
rm -rf out
