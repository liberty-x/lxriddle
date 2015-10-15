[![Build Status](https://travis-ci.org/liberty-x/lxriddle.svg?branch=master)](https://travis-ci.org/liberty-x/lxriddle)
[![Code Climate](https://codeclimate.com/github/liberty-x/lxriddle/badges/gpa.svg)](https://codeclimate.com/github/liberty-x/lxriddle)
[![Test Coverage](https://codeclimate.com/github/liberty-x/lxriddle/badges/coverage.svg)](https://codeclimate.com/github/liberty-x/lxriddle/coverage)
[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/liberty-x/lxriddle/master)

# LX Riddle
The search for a riddle-based forum is over! :+1::+1:

Please find our application [here](http://agile-beyond-9343.herokuapp.com/).

The tutorial for constructing this application (or one with a similar functionality) can be found at the bottom of this page. Good luck! :four_leaf_clover:

## Who?

The same team who brought you such hits as LX News :newspaper: and LX Search :mag:, Liberty-X, a team in the 6th iteration of the Founders & Coders academy.  

 Members are: Justen Barget, Rachel Black, Huw Davies and Ruth Uwemedimo.

## What?

LX Riddle will be a forum where you can share and answer riddles, and even chat about them with your pals / __complete__ strangers (Wow!). We are hosting this on Heroku and using Redis as a database. Socket.io will also be used for an embedded chat room. We are conducting this project during the 5th week of the course.

## Why?

We are reinforcing our knowledge of Redis, as well as trying to integrate more functionality using the DB - such as upvoting, deleting etc. We have also not implemented socket.io before, so we hope to do this successfully here. Once this is achieved, we are looking to implement some authentication for our users :closed_lock_with_key: We are also starting training on client handling, and we are using [Pivotal Tracker](https://www.pivotaltracker.com/) to this effect.

### Our wireframes

![wireframes](https://files.gitter.im/RachelBLondon/libert-x/w5ML/instgrachat-wireframes.png)

### Whiteboard plan for our front-end and back-end exchanges

![whiteboard](https://files.gitter.im/RachelBLondon/libert-x/JeOA/DSC_0603.JPG)

#### Dependencies

* Redis (Our Database)
* Pre-commit hooks
* UUID (Generates our user IDs!)
* JSON Web Tokens (What we're using to do authentication)
* Socket.io (Live chat on the site!)

#### Dev Dependencies

* QUnit (frontend testing)
* Tape (backend testing)
* Shot (backend testing)
* Istanbul (Tests quality of code)
* Codeclimate (Badge at top of page!)

### Testing

Please find our frontend tests [here](http://agile-beyond-9343.herokuapp.com/test/test.html).

For backend testing, please download our repo and run our backendTest.js file, having used the command ``npm install`` to download our dependencies shown above.

## Tutorial (or where to look!)

Ok. Some of the key features we used are listed below and we have provided the resources. If you have any further questions about how we went about constructing this repo, please raise an issue or get in touch with us! :+1:

##### Redis
Redis has a good walkthrough of the _fundamentals_ on their website [here](http://try.redis.io/). Once you've gone through this, have a look at DWYL's tutorial  [here](https://github.com/dwyl/learn-redis), which puts a bit more meat on the bones and covers some node.js packages. We plumped for [Heroku Redis](https://elements.heroku.com/addons/heroku-redis). Don't be scared when they ask you for your card details. It's free! :no_entry_sign::moneybag:

Please find handy :hand: FAC6 cheatsheet [here](https://github.com/FAC6/book/blob/master/patterns/week4/redisCheatsheet.md).
##### JSON Web Tokens
We went through another DWYL tutorial for our authentication functionality (it's _hard_ and will take you a _while_, don't be disheartened). Find it  [here](https://github.com/dwyl/learn-json-web-tokens).  
 Clue: have a long look through the example app code and try to figure out what's going on. We traced which functions use which _other_ functions like so:

![sketch](https://files.gitter.im/RachelBLondon/libert-x/hDWb/resizedJWT.jpg)

__After__ you've done _something like_ this, try to go about building your authentication functionality yourself.   

##### UUID

We used the node module UUID to generate a unique user ID during our _authentication_ process. For this, we used the node module __UUID__, after it was recommended in a [Stack Overflow post](http://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js). You can follow their repo [here](https://github.com/broofa/node-uuid). We plumped for a _time-based_ ID! :clock130:

##### Socket.io
Some more of our very own FAC6ers (:heart:) wrote a _Web Sockets_ README [here](https://github.com/FAC6/book/blob/master/patterns/week5/websockets.md), which _may_ be useful to understand what Socket.io is doing. Socket.io itself has a handy tutorial located [here](http://socket.io/get-started/chat/), which we would __strongly__ recommend following before constructing your application. We also _closely_ examined the example repo from the README above, which is located [here](https://github.com/RachBLondon/socketchat). Have fun!

##### Testing

For our front-end tests we use Qunit. A good tutorial on how to use this can be found [here](https://github.com/dwyl/learn-qunit). For backend testing with Node, they have another great tutorial [here](https://github.com/dwyl/learn-tdd).

##### Code Quality Badges
We like [Code Climate](https://codeclimate.com/) and Coverage (also provided by Code Climate). [Travis](https://travis-ci.org/) is also _very_ good for continuous integration.

A handy tool for mapping the dependencies on your Github repo can be found [here](http://codecrystal.herokuapp.com/), with the open-source repo [here](https://github.com/Crystal-Clear/codecrystal).

We're gonna do it. We're gonna recommend a DWYL tutorial [again](https://github.com/dwyl/repo-badges). Have a look over it for all the badges you'd ever need!

### Enjoy building your app! :metal:
