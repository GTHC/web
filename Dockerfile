FROM ruby

RUN apt-get update\
  && apt-get -y install\
  build-essential libpq-dev\
  curl\
  postgresql-client\
  && curl -sL https://deb.nodesource.com/setup_10.x | bash -\
  && apt-get -y install\
  nodejs npm\
  && npm install -g yarn\
  && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .
RUN yarn install

EXPOSE 5000
CMD ./bin/db-setup.sh
