set -e
set -o pipefail

aws s3 sync dist s3://jojo-app
aws cloudfront create-invalidation --distrubtion-id E3MQLATEMETO82 --path '/index.html'