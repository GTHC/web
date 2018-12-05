#!/bin/bash

printf 'Creating databases ♻️ \n'
rails db:create
printf 'Migrating and correcting sequences 🐫 \n'
rails db:migrate && rails database:correction_seq_id
