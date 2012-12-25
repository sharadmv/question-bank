Question Bank
=============

Dependencies
------------

* node.js
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
