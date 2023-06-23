set -e
set -o pipefail

aws s3 sync dist s3://jojo-app