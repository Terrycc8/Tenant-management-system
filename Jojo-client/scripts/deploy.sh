set -e
set -o pipefail

npm install --legacy-peer-deps
npm run build
./scripts/upload.sh