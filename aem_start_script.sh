#! /bin/bash

echo "running  /home/ec2-user/aem_start_script.sh" >>  /home/ec2-user/serverstart.log 
#Maintaining the Repository
#https://docs.adobe.com/content/docs/en/aem/6-1/deploy/platform/storage-elements-in-aem-6.html#Maintaining%20the%20Repository
echo "gabarge collection" >>  /home/ec2-user/serverstart.log
cd /home/ec2-user/AEM/author
du -sh crx-quickstart/repository/segmentstore
java -jar oak-run-1.2.7.jar checkpoints crx-quickstart/repository/segmentstore
java -jar oak-run-1.2.7.jar checkpoints crx-quickstart/repository/segmentstore rm-unreferenced
java -jar oak-run-1.2.7.jar compact crx-quickstart/repository/segmentstore
du -sh crx-quickstart/repository/segmentstore 

cd /home/ec2-user/AEM/author/crx-quickstart/bin
echo "AEM start  /etc/rc.local" >>  /home/ec2-user/serverstart.log
./start

