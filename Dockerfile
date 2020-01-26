FROM ruby

RUN apt-get update\
  && apt-get -y install\
  build-essential libpq-dev\
  curl\
  postgresql-client\
  && curl -sL https://deb.nodesource.com/setup_10.x | bash -\
  && apt-get -y install\
  nodejs\
  && npm install -g yarn\
  && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY package.json yarn* ./
RUN yarn install
COPY . .

EXPOSE 5000 3035
CMD rails db:migrate && yarn run prod
