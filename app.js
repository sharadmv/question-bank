/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , question = require('./routes/question')
  , admin = require('./routes/admin')
  , http = require('http')
  , dao = require('./util/dao.js')
  , model = require('./util/model.js')
  , md = require('node-markdown').Markdown
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
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

app.post('/admin/edit/create', admin.save_q);

//API functions
app.get('/api/question/:id', function(req, res) {
  var start = new Date().getTime();
  dao.question.getById(req.params.id, function(err, result) {
    res.json({ data : result, elapsed : (new Date().getTime() - start)});
  })
});

app.get('/api/question', function(req, res) {
  var start = new Date().getTime();
  dao.question.find({}, function(err, result) {
    res.json({ data : result, elapsed : (new Date().getTime() - start)});
  })
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
