FROM ruby
RUN apt-get update\
  && apt-get -y install\
  build-essential libpq-dev\
  curl\
  postgresql-client\
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
    yarn \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY package.json yarn* ./
RUN yarn install
COPY . .
EXPOSE 5000 3035
CMD rails db:migrate && yarn run prod