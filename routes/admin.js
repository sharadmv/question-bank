/* Dependencies */
var dao = require('../util/dao');
var model = require('../util/model');

/* GET */

// Home page
exports.home = function (req, res) {
    if (req.signedCookies.user && req.signedCookies.user.admin) {
      dao.question.find({}, function(err, result) {
        res.render('admin', {questions: result, login : req.signedCookies.user.login, admin : req.signedCookies.user.admin});
      });
    } else {
      res.send(401);
    }

};

exports.addQuestion = function(req, res) {
  if (req.signedCookies.user && req.signedCookies.user.admin) {
    res.render('add', { login : req.signedCookies.user.login, admin : req.signedCookies.user.admin});
  } else {
    res.send(401);
  }
}

/* POST */

// Save question to database
exports.add = function(req, res) {
  var question =
    new model.Question(null,
      req.param('author'),
      req.param('title'),
      req.param('content'),
      req.param('solution'),
      req.param('tests'),
      req.param('difficulty'),
      req.param('category'),
      req.param('tags'),
      req.param('type'),
      req.param('comments'),
      req.param('template')
    );
  if (question.title != null) {
    dao.question.save(question, function() {
      res.send(200);
    });
  } else {
    res.send(200);
  }
};
