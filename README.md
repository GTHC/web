# README

<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->

## Table of Context
1. [Installation](#Installation)
2. [Setup](#Setup)
3. [Configuration](#configuration)

## Installation
1. Install Docker and `docker-compose`. Please follow the instructions on how to do so in the links below.

    a. [Docker](https://docs.docker.com/install/)

    b. [`docker-compose`](https://docs.docker.com/compose/install/)
  
2. Install Ruby and Ruby on Rails.

    a. One of the easiest ways to do this: http://installrails.com

3. Install Node.js. Please follow instructions on how to do so in the links below.

    a. [Node.js](https://nodejs.org/en/download/)

4. Install PostgreSQL. Please follow instructions on how to do so in the links below.

    a. [PostgreSQL](https://www.postgresql.org/download/)

## Setup

__Disclaimer:__ Windows users, it is highly recommended that the entire setup process should be done through the Windows Subsystem for Linux (WSL). Setting up WSL can be found [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

1. Make sure you the yarn package manager installed by running: `npm i -g yarn`

   a. `yarn` is a great alternative to `npm` as a dependency manager for Node.js. Read more [here](https://yarnpkg.com/en/).

2. `yarn run setup`

   a. This yarn script should run all of the necessary shell scripts to setup your Docker containers, bundle (ruby gems) dependencies, and your node dependencies.

3. `yarn dev:start`

    a. This will start a local developer server, by default that will be on port 5000. (`https://localhost:5000`)

### Local Software Versioning
It is required that your system is running `Rails 5.0+` for the local development to function properly. It is recommended to use the most recent version of Node, but anything above `Node 8.x` shall work. 

## Configuration
__Important:__ There are private environment variables needed for certain aspects of the application. Therefore, it will be required that you have a `.env` file in the root of your project __before__ running anything. Please contact the project leaders (Aman or Anesu) for this information. __Finally, the .env file should not be pushed to github under no circumstances!__
