#!/bin/bash

cd /deploy/JIDUCKCHE_CI-CD

npm install

cd client
npm install
npm run build

cd ..
npm run backend