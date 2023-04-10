#!/usr/bin/env bash

set -e
set -o pipefail
source .env

DCP="docker-compose -p $PROJECT_NAME --file=$PROJECT_PATH$PROJECT_NAME/current/docker-compose.yaml --env-file=$PROJECT_PATH$PROJECT_NAME/current/.env"

$DCP build
$DCP down
$DCP up -d

# additional steps
$DCP exec -T dpa-com-nextjs npx prisma migrate deploy