@echo off
echo Uploading files...
scp -r * root@167.172.237.61:/var/www/html/

echo Fixing permissions...
ssh root@167.172.237.61 "find /var/www/html/ -type d -exec chmod 755 {} \; && find /var/www/html/ -type f -exec chmod 644 {} \;"

echo Deployment complete!