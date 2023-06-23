````bash
sudo apt install docker.io docker-compose
sudo usermod -aG docker `whoami`


## install compress utility
```bash
sudo apt install zstd

## setup port forwading with nginx
1.setup /etc/nginx/sites-available/$host.$domain
2. setup s link in /etc/nginx/sites-enabled
3. check config format `sudo nginx -t`
4. obtain https cert `sudo certbot --nginx`
5. restart nginx `sudo service nginx restart`
````
