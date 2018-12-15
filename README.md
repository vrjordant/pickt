#Pickt

#####Group Members: 
* David Kim
* Philip Cho
* Sean Hill
* Gabrielle Padriga
* Jordan Tantuico

## About
Welcome! This is a web application that allows users to participate in daily competitions to upload a photo (according to the current day's topic) for everyone in their local area to see! Then they can vote on which ones they think are the best, allowing the winners to move onto higher tiers (State Level, Regional Level, National Level).

## Setup
* Get all the modules

 `npm install`
* Seeding data:

 `npm run seed` : this will enter 5 users, and each of them will have uploaded 1 picture each; this will also add **admin** to the database, so this is important if you want to run as **admin**
* Start the server

 `npm start` : make sure to click on the link to get to the landing page!

## Running as Admin
* Login Credentials:
 * Username: `admin`
 * Password: `1`

* Admin Actions:
 * **MoveUp**: All photos that win in their respective locations will move up to the next level (Example: Local -> State, State -> Regional, Regional -> National, then National Winner(s) for the current National pool will be chosen)
 * **Change Topic**: Enter a new topic for the day! This will change the current topic for local so users will have to enter a photo for the new topic.

