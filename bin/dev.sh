#!/bin/bash

function isCommand () {
  #
  local _arg=" $(type -t "$1") "
  local _executables=' file alias keyword function builtin '
  #
  [[ "${_executables#*$_arg}" != "$_executables" ]]  && return 0
  ### if $_arg is NOT in $_executables, the two strings will be identical
  #
  return 1
}

showLoading() {
  mypid=$!
  loadingText=$1
  dot=$2

  echo -ne "$loadingText\r"

  while kill -0 $mypid 2>/dev/null; do
    echo -ne "$loadingText $dot\r"
    sleep 0.5
    echo -ne "$loadingText $dot $dot\r"
    sleep 0.5
    echo -ne "$loadingText $dot $dot $dot\r"
    sleep 0.5
    echo -ne "\r\033[K"
    echo -ne "$loadingText\r"
    sleep 0.5
  done

  echo "$loadingText $dot $dot $dot"
}

echo "🐳 Checking if Docker is set up 🐳"

isCommand docker || ( printf "Docker does not seem to be installed. Install at: \nhttps://docs.docker.com/install/ \n" && exit )

docker=$(docker ps )
if [[ !($docker =~ .*kville-scheduler_app.*) && !($docker =~ .*kville-scheduler_db.*) ]]
then
  echo "📦 Building containers 📦"
  docker-compose build
  docker-compose up -d
  echo "💾 POSTGRES 💾"
  docker-compose run app ./bin/db-setup.sh
fi

printf "🖥️  Starting app 🖥️ \n"
export OAUTH_CLIENT=gthc-dev
export OAUTH_KEY=NTfThB6aP34KyN08Ut63AmLV32QcnQu8YxZYMGTdD85T3j-IjSp2U_z6lH7ljwola7tn6HVX7f89PZBBkDU3gw
export OAUTH_REDIRECT=http://localhost:5000/auth2/callback
docker-compose run -p '5000:5000' -p '3035:3035' app yarn start
