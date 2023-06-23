set -e
set -x

npm i |pv
rm -rf dist
npm run build |pv
docker build -t jojo-server-image1 . |pv