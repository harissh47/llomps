#!/bin/bash



# if you are using windows, you may need to convert the file to unix format
# you can use the Ubuntu terminal to convert this file to unix format
# otherwise, you may get the error after running the docker container

# sudo apt-get install dos2unix
# dos2unix entrypoint.sh


set -e

export NEXT_PUBLIC_DEPLOY_ENV=${DEPLOY_ENV}
export NEXT_PUBLIC_EDITION=${EDITION}
export NEXT_PUBLIC_API_PREFIX=${CONSOLE_API_URL}/console/api
export NEXT_PUBLIC_PUBLIC_API_PREFIX=${APP_API_URL}/api
export NEXT_PUBLIC_FILE_PREFIX=${FILE_API_URL}/files

export NEXT_PUBLIC_SENTRY_DSN=${SENTRY_DSN}
export NEXT_PUBLIC_SITE_ABOUT=${SITE_ABOUT}

pm2 start ./pm2.json --no-daemon
