#!/usr/bin/env bash

echo "Starting container ..."
docker-compose -p nodecacheapi up -d

# Exec the bash command on the container to attach to STDIN
echo "Attaching to container ..."
docker exec -it nodecacheapi_web sh -c "bash"

# Clean up after exiting from bash
echo "Cleaning up ..."
docker-compose -p nodecacheapi down
