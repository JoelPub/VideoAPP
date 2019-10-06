#! /bin/bash

echo "running  /home/ec2-user/litemall_start_script.sh" 
echo "start litemall-all backend" 
cd /var/www/html/litemall
mvn install
mvn package
cd /var/www/html/litemall/litemall-all
mvn spring-boot:run
echo "http://localhost:8080/wx/index/index can visit" 

echo "start litemall-admin frontend admin" 
cd litemall/litemall-admin
npm install
npm run dev
echo "http://18.215.228.3:9527 can visit" 