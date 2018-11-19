# Doppelganger Finder

<p align = "center"><img src = logo.png></p>
<p align = "center">
<a href = "https://circleci.com/gh/kevinbae15/doppelganger"><img src = "https://circleci.com/gh/kevinbae15/doppelganger.svg?style=shield&circle-token=9ddd3e4004a43f67efc3ad1d99e95f328e04c4ea"></a>
<a href = "https://travis-ci.com/kevinbae15/doppelganger"><img src = "https://travis-ci.com/kevinbae15/doppelganger.svg?token=hbcf443y4Y83m1AyPst2&branch=master">
<a href="https://snyk.io/test/github/kevinbae15/doppelganger"><img src="https://img.shields.io/badge/Package_Vulnerabilities-Synk-ffcc00.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/kevinbae15/doppelganger" style="max-width:100%;"/></a>
</p>




## Todo
* David and I have tested it out, and we think Kairos is the way to go
* Kenny and Chris: Setup Kairos [API](https://www.kairos.com/login)
	* Cannot use gmail, yahoo, etc. Use something like a school email
	* You will receive API keys and ID
	* *DO NOT SHARE THESE API KEYS*
	* *DO NOT LEAVE ON CLIENT SIDE CODE*
	* Since this repo is private it's okay to leave on server side code for now
* Setup Picture File Upload 
* Only one canvas after snapping photo
* Front end work ([bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/))
* Serverside???
* Logo?
* Script to get all pictures of celebrities and add them to gallery
* Set up heroku domain
* Download libaries and include into project (faster load speeds)

Set-up instructions at the bottom

## Git and Using Branches
* Commands:

	`git remote add -your branch name-` 	: creates a remote branch
	
	`git checkout -your branch name-` 	:changes the HEAD to point to the specified branch
	
	`git pull origin master`				: will get changes made on the master branch
	
	`git branch -a` 						: will show working branches, including remote branches
	
* To push changes from your branch to the master branch, do a pull request from the gtihub website instead
* For merge conflicts, use 'git status' to see where the conflict is taking place. Then, open that file and fix the merge conflicts
* Ex: 

![conflict example](pics/conflict1.png)

There is a conflict between two console.log statements.
Fix this by only keeping what you want

![conflict example](pics/conflict2.png)


## Node.js and npm
"Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside the browser."
* Allows for Javascipt server-side coding, which is super easy to learn and use.

"npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js"
* As you can see, npm and node.js go hand in hand
* Download:
	* [Download Package](https://nodejs.org/en/)
	* For Mac use [command line](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew) for easier integration
* *node_modules*, *package.json*, and *package-lock.json* are all files used by node and npm
* "node [server-side code]" will run node.js
* "npm install [package]" install open-source npm packages that you may use
	* Note that npm packages get added to node_modules file and will only be able to used in the specific directory that it was installed in
* [More info](https://www.w3schools.com/nodejs/nodejs_intro.asp)


## Heroku
"Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps — we're the fastest way to go from idea to URL, bypassing all those infrastructure headaches."
* Basically, it allows us to deploy server side web applications very easily by taking care of all of the hard stuff
* **You can push into Github as normal**
	* The Github is linked to the heroku repo, so all code pushed to this Github will automatically be pushed to Heroku.
	* Deployment will occur manually.
	* *Profile* is a file used by Heroku.
* [More Info](https://www.heroku.com/what)

## Travis CI
Travis CI is what we will be using to test our builds before we deploy to heroku.
* Click the build status button at the top to see more details about our current repo build status
* [Getting started with Travis](https://docs.travis-ci.com/user/getting-started/)
* Super helpful [tutorial](https://github.com/dwyl/learn-travis) on how to use Travis
* [Using Travis with Node.js](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/);
* As of now, we use JSHint as our test, however, I want to integrate [mocha](https://boneskull.com/mocha-and-travis-ci-build-stages/) testing as well if needed
	* Mocha allows for [unit testing](https://codeburst.io/how-to-test-javascript-with-mocha-the-basics-80132324752e)
* *travis.yml* and *.jshintrc* are files used by the Travis CI
* Possibly use [Circle CI](https://circleci.com/circleci-versus-travisci/?utm_source=gnb&utm_medium=SEM&utm_campaign=SEM-gnb-400-Eng-ni&utm_content=SEM-gnb-400-Eng-ni-Travis_CI&gclid=CjwKCAjws8vaBRBFEiwAQfhs-A4utDz_VKFAReJ3peADSWvrTEKYorb2p-4cId72K8aqCJ8XtI0YnhoC9DQQAvD_BwE) as well


## Facial Recognition Links
* [Top 10 Facial Recognition APIs (Limited use / pay to use apis)](https://blog.rapidapi.com/top-facial-recognition-apis/)
* [Open Face](https://cmusatyalab.github.io/openface/)
* [Kairos](https://market.mashape.com/kairosar/kairos-face-detection)
* [Emotion Detection by Kairos](https://www.kairos.com/emotion-analysis-api)
  * This includes age, gender, and attention recognition as well
* [Databases of Faces in a blog by Kairos](https://www.kairos.com/blog/60-facial-recognition-databases)
* [Interesting article](http://www.kairos.com/blog/goodbye-passwords-hello-web-authentication-standard)

## Setup Instructions
* Make sure you download node.js and npm (should both be downloaded together if you download node.js)
* Make a directory for this project
* Clone this github repo
* Make sure all node_modules are installed
	* `npm install`
* Now run node.js on server code
	* `node server.js`
* Should print out:
	* `This da doppelganger program motherfucker`
* Good Job!~


