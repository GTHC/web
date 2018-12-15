docker-compose run -e RAILS_ENV=production -e NODE_ENV=production -e SECRET_KEY_BASE=key -p '5000:5000' -p '3035:3035' app yarn run prod 
