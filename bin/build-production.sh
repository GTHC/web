docker-compose run app rails assets:precompile
heroku container:push web --app gthc-web
heroku container:release web --app gthc-web
