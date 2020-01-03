# GTHC - Game Tenting Help Center

![Logo](/app/javascript/src/images/gthc_long.png)

# README

## Testing Notifications

From Shamikh: 
Implemented Push Notifications for Shifts and Posts
1. Testing Notifications for Shifts
- Run ```yarn flush``` and ```yarn dev:start``` and make your own team 
- Enabling Notifications on Web: Navigate to http://localhost:5000/notif and click "Allow Notifications" in the browser pop up. 
- Enabling Notifications on Mobile: Navigate to Notifications tab on app and select "Allow Notifications" in the pop up (waiting on updated build for mobile to be available). 
- Go to [http://localhost:5000/app/calendar](http://localhost:5000/app/calendar) and make a shift for yourself on the current day at a close future time 
- Verify that you receive a Notification about your shift 10 minutes before the shift occurs. 
2. Testing Notifications for Posts (Line Monitor Announcements) 
- Go to [http://localhost:5000/admin/posts](http://localhost:5000/admin/posts) and make a new post. 
- All subscribed users should receive a notification (don't use this test more than once)
3. Notifications Endpoint (Used to make our own Notifications History/Inbox)
- Be logged into GTHC with Shibboleth
- Navigate to [http://localhost:5000/api/v1/notifications/](http://localhost:5000/api/v1/notifications/) to get the notifications for the current logged on user. 
- Use http://localhost:5000/api/v1/notifications/<user_id> to get the notifications user with that user_id. The shift notifications are under "shift_notifications" in the JSON, and Posts/Line Monitor announcements are under "announcements". 
Let Shamikh know if you encounter any issues during testing or if you don't get a notification. Test consciously and please be wary of spamming the OneSignal API with requests. All requests are logged in the server logs. If you see anything suspicious in the logs, please let me know. Thanks so much! :) 

From Mike: 
Added OneSignal integration 
Upgraded all the dependencies to latest versions, removed unnecessary packages to improve compiling speed. 
Migrated to rails webpacker native babel to solve conflicts.

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
