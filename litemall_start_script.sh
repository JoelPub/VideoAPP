#! /bin/bash

echo "running  /home/ec2-user/litemall_start_script.sh" >>  /home/ec2-user/serverstart.log
echo "start litemall-all backend" >>  /home/ec2-user/serverstart.log
cd /var/www/html/litemall
mvn install
mvn package
cd /var/www/html/litemall/litemall-all
mvn spring-boot:run
echo "http://localhost:8080/wx/index/index can visit" >>  /home/ec2-user/serverstart.log

echo "start litemall-admin frontend admin" >>  /home/ec2-user/serverstart.log
cd litemall/litemall-admin
npm install
npm run dev
echo "http://18.215.228.3:9527 can visit" >>  /home/ec2-user/serverstart.log