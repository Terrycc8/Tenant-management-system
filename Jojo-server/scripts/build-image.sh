set -e
set -x

npm i
rm -rf dist
npm run build
docker build -t jojo-server-image1 .