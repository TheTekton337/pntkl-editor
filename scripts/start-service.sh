#!/bin/bash

# Load nvm environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Use the desired Node.js version
nvm use stable

NPM=$(which npm)

cd /var/www/pntkl-editor

# Start your application
pm2 start $NPM --name pntkl-editor -- run start