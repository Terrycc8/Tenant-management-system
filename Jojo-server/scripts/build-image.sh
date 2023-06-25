set -e
set -x

npm i
rm -rf dist
npm run build
cd dist
mkdir upload
cd ..
cp upload/eventDefault.jpg dist/upload
cp upload/propertyDefault.jpg dist/upload
cp upload/defaultProfilePic.png dist/upload
docker build -t jojo-server-image1 .