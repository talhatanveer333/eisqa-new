#!/bin/sh


#=====================================
# HOST_IP  controlled by jenkins env
# HOST_USER controlled by jenkins envs
# PORT controlled by jenkins envs
#=====================================

# Get current git commit number
LABEL=$(git log -1 --format=%h)

CONTAINER_NAME=fingerate-admin-backend
CONTAINER_CURRENT=rnssolutions/$CONTAINER_NAME:$LABEL
    docker stop $CONTAINER_NAME-$BRANCH_NAME
    docker rm -f $CONTAINER_NAME-$BRANCH_NAME
    docker run -v /var/fingerate/fingerate-admin-backend/.env:/app/.env -d -p $PORT:4000 --name $CONTAINER_NAME-$BRANCH_NAME $CONTAINER_CURRENT
