#!/bin/bash

TMP_PATH=/tmp/pntkl-editor
DEPLOY_PATH=/var/www/pntkl-editor

systemctl stop nginx
systemctl stop pntkl-editor
rm -rf $TMP_PATH
mkdir $TMP_PATH
rsync -av --delete $TMP_PATH/ $DEPLOY_PATH/
chown root:root $DEPLOY_PATH
chmod +x $DEPLOY_PATH
systemctl start pntkl-editor
systemctl start nginx