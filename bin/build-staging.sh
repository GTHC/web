docker-compose run app rails assets:precompile
heroku container:push web --app gthc-web-staging
heroku container:release web --app gthc-web-staging  
