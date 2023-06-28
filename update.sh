#!/usr/bin/env bash

log_file=app.log
# update the code
echo [`date "+%Y-%m-%d %H:%M:%S"`] update the code | tee -a $log_file
git pull | tee -a $log_file

# restart node server
echo [`date "+%Y-%m-%d %H:%M:%S"`] restart node server | tee -a $log_file
pm2 restart index | tee -a $log_file

# reload nginx
echo [`date "+%Y-%m-%d %H:%M:%S"`] reload nginx | tee -a $log_file
sudo service nginx reload 2>&1 | tee -a $log_file