source scripts/config

./scripts/build-image.sh
./scripts/upload-image.sh

scp docker-compose.yml $server:~/$project_dir/
ssh $server "cd ~/$project_dir/ \
&& docker-compose up -d \
&& docker ps"

echo "done"
