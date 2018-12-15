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

 `npm run seed` : 
 * This will enter 5 users, and each of them will have uploaded 1 picture each
 * This will also add **admin** to the database, so this is important if you want to run as **admin**
 * Counties so far are only provided for New Jersey and for Washington
* Start the server

 `npm start` : make sure to click on the link to get to the landing page!

## Running as Admin
* Login Credentials:
 * Username: `admin`
 * Password: `1`

* Admin Actions:
 * **MoveUp**: All photos that win in their respective locations will move up to the next level (Example: Local -> State, State -> Regional, Regional -> National, then National Winner(s) for the current National pool will be chosen.) If more than one post has the same number of highest votes, then they will both move up to the next level.
 * **Change Topic**: Enter a new topic for the day! This will change the current topic for local so users will have to enter a photo for the new topic. Ideally done in conjunction with MoveUp.

## Running as User:
* Sign up as a new user (only alphanumeric characters allowed)
* Upload pictures at the top of the feed!
* Vote on pictures in areas pertaining to you! You only get 5 votes per area (local, state, regional, national)
 * You can only vote in your local area, your state, your region, then your nation
 * The votes get reset after admin calls move-up!
* Profile contains all the photos you've posted and metrics on the number of votes and victories you have!

## Looking at the Database:
* `mongo` 
* `use final-project`
* `show collections` 
 * Should see `users`,`gallery`, and `local` if you called the seed task
 * You'll see the `state`, `regional`, and `national` collections as you call `moveup` in the admin panel