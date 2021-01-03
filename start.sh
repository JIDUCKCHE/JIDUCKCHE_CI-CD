#!/bin/bash

cd /deploy/JIDUCKCHE_CI-CD

npm install
npm install -g pm2
pm2 start ./server/index.js