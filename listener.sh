#!/bin/bash
pgrep node
if [ $? != 0 ]
then
    cd /home/zlu/code/Grape/crawler/
    nohup /usr/local/bin/node ./server.js &
fi
