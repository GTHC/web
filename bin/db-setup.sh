#!/bin/bash

printf '1/3 Creating databases ♻️ \n'
rails db:create
printf '2/3 Migrating and correcting sequences 🐫 \n'
rails db:migrate && rails database:correction_seq_id
printf '2/3 Seeding with test data 🌱 \n'
rails db:seed
