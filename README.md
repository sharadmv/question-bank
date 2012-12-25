Question Bank
=============

You can run the program with

    node app

By default it connects to port 3000.

Dependencies
------------

* [node.js](http://nodejs.org/)
* [Express](http://expressjs.com/guide.html): directory manager
* [Jade](http://naltatis.github.com/jade-syntax-docs/): template engine
* [MongoDB](http://www.mongodb.org/): database

You can get all the dependencies by running

    npm install

from the command line.

File System
-----------

`app.js` is the main file that maps urls to controllers.

`databases` houses various database abstraction. Still not sure what
DB to use, but currently using [MongoDB](http://www.mongodb.org/).

`views` contains [Jade](http://naltatis.github.com/jade-syntax-docs/) 
templates.

`routes` contains controllers that are used in `app.js`.

`public` contains static files.

MongoHQ
----------
* Command Line Access: mongo linus.mongohq.com:10013/app10368472 -u &lt;user> -p&lt;password>
* Mongo URI: mongodb://&lt;user>:&lt;password>@linus.mongohq.com:10013/app10368472
