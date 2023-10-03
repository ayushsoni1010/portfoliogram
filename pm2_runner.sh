#!/bin/bash
if ! type pm2 > /dev/null
then
    npm install -g pm2 && sudo systemctl start pm2-root
else
    sudo systemctl start pm2-root
fi
