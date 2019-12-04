docker-compose run -p '5000:5000' -p '3035:3035' \
    -e OAUTH_CLIENT=gthc-dev \
    -e OAUTH_KEY=NTfThB6aP34KyN08Ut63AmLV32QcnQu8YxZYMGTdD85T3j-IjSp2U_z6lH7ljwola7tn6HVX7f89PZBBkDU3gw \
    -e OAUTH_REDIRECT=http://localhost:5000/auth2/callback \
    app yarn start
