#!/bin/bash

echo "🐳 Checking if Docker is set up 🐳"

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

isCommand docker || ( printf "Docker does not seem to be installed. Install at: \nhttps://docs.docker.com/install/ \n" && exit )

docker=$(docker ps )
if [[ !($docker =~ .*kville-scheduler_app.*) && !($docker =~ .*kville-scheduler_db.*) ]]
then
  echo "📦 Building containers 📦"
  docker-compose up -d
  echo "💾 Setting up database 💾"
  docker-compose run app ./bin/db-setup.sh
fi
