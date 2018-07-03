FROM ruby:2.3

RUN apt-get update

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN bundle install
COPY . .
