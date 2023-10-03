#!/bin/bash
if ! type pm2 > /dev/null
then
    npm install -g pm2 && systemctl start pm2-root
else
    systemctl restart pm2-root
fi
