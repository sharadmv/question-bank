/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , question = require('./routes/question')
  , admin = require('./routes/admin')
  , user = require('./routes/user')
  , http = require('http')
  , dao = require('./databases/mongo.js')
  , model = require('./util/model.js')
  , auth = require('./util/auth.js')
  , fs = require('fs')
  , path = require('path');

var admins = {};
fs.readFile('./admins.txt', function (err, data) {
  if (err) throw err;
  var data = data.toString('ascii').trim().split("\n");
  for (var i in data) {
    admins[data[i]] = true;
  }
});
var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('this is my secret'));
  app.use(express.cookieSession());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'databases')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/questions', question.list);
app.get('/question/:id', question.single);
app.get('/admin', admin.home);
app.get('/admin/:action', function(req, res) {
  admin[req.params.action](req, res);
});

var session = {
};

/* User Settings */
app.get('/settings', function(req, res) {
  var sections = ['1', '2', '3'];

  var user = dao.User.findOne({login : req.signedCookies.user.login}, function(err, result) {

    result.admin = req.signedCookies.user.admin;
    result.sections = sections;
    console.log(result[0]);
    res.render('settings', result);
  });
});

app.post('/api/session', function(req, res) {
  var login = req.param('login');
  var password = req.param('password');
  auth.authenticate(login, password, function(result) {
    if (result) {
      dao.User.find({ login : login }, function(err, users) {
        res.cookie('user', {'login' : login, admin : (login in admins)}, {signed : true});
        if (users.length == 0) {
          console.log("SUP")
          res.send(201);
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(501);
    }
  });
});

app.del('/api/session', function(req, res) {
  res.clearCookie('user');
  res.send(200);
});

app.get('/api/users', function(req, res) {
  dao.User.find({}, function(err, result) {
    res.json(result);
  });
});

app.post('/settings', user.update);

//API functions
app.get('/api/question/:id', function(req, res) {
  var start = new Date().getTime();
  dao.Question.findOne({ _id : req.params.id }, function(err, question) {
    res.json({ data : question, elapsed : (new Date().getTime() - start)});
  })
});

app.get('/api/question', function(req, res) {
  var start = new Date().getTime();
  dao.Question.find({}, function(err, questions) {
    res.json({ data : questions, elapsed : (new Date().getTime() - start)});
  })
});

app.del('/api/question/:id', admin.delete);
app.post('/api/question', admin.save);
app.post('/api/question/:id', admin.save);
app.put('/api/question', admin.save);
app.put('/api/question/:id', admin.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
