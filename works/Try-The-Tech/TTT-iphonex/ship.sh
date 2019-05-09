#!/usr/bin/env bash

set -e

git pull -r

npm install
npm run build

git push

