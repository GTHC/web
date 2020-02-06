#!/bin/bash
# Clean install of bundler
printf '1/3 Updating bundler ♻️ \n'
rm -rf Gemfile.lock
gem update --system
gem install bundler:2.1.4
bundle install
bundle update --bundler

printf '2/3 Updating node modules ♻️ \n'
rm -rf node_modules/
rm -rf yarn.lock
yarn install
yarn run setup


docker-compose run app rm -rf Gemfile.lock
docker-compose run app gem update --system
docker-compose run app gem install bundler:2.1.4
docker-compose run app bundle install
docker-compose run app bundle update --bundler


docker-compose run app rm -rf node_modules/
docker-compose run app rm -rf yarn.lock
docker-compose run app yarn install
docker-compose run app yarn run setup

printf '3/3 Starting server \n'
yarn dev:start