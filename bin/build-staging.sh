docker-compose build
docker-compose run -e NODE_ENV=production app rails assets:precompile
heroku container:push web --app gthc-web-staging
heroku container:release web --app gthc-web-staging
