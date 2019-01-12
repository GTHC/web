#!/usr/bin/env bash

echo 'Beginning release tasks!'

if [ "$STAGING" = "true" ]; then
 rails db:seed
fi

rails db:migrate
