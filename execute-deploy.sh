#!/bin/bash

cd /home/ubuntu/deploy/JIDUCKCHE_CI-CD
cp -rf /home/ubuntu/live.js /home/ubuntu/deploy/JIDUCKCHE_CI-CD/server/config/
cp -rf /home/ubuntu/dev.js /home/ubuntu/deploy/JIDUCKCHE_CI-CD/server/config/

docker build -t jiduckche:1.0 .
./deploy.sh > /dev/null 2> /dev/null < /dev/null &
