/* Dependencies */
var dao = require('../util/dao');
var model = require('../util/model');

/* GET */

// Home page
exports.home = function (req, res) {
    dao.question.find({}, function(err, result) {
      res.render('admin-home', {questions: result});
    });
};

// Edit question page
exports.edit = function (req, res) {
    res.render('edit', {});
};

exports.add = function(req, res) {
    res.render('add', {});
};


/* POST */

// Save question to database
exports.save = function(req, res) {
  var question =
    new model.Question(null,
      req.param('title'),
      req.param('content'),
      req.param('solution'),
      req.param('tests'),
      req.param('difficulty'),
      req.param('category'),
      req.param('tags'),
      req.param('type'),
      req.param('comments')
    );
  dao.question.save(question, function() {
    res.send(200);
  });
};
