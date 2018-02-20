#!/bin/bash

read -p "Are you sure? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

printf '\n 🚽  🚽  🚽  Flushing DB  🚽  🚽  🚽 \n'
printf '1/4 Dropping databases 🗑️ \n'
eval rails db:drop
printf '2/4 Deleting schema.rb 🚫 \n'
rm db/schema.rb
printf '3/4 Recreate databases ♻️ \n'
rails db:create && rails db:migrate
printf '4/4 Seeding with test data 🌱 \n'
rails db:seed
