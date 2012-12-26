/* Dependencies */
var dao = require('../util/dao');

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
exports.save_q = function(req, res) {
    var doc = {title: req.param('title'),
               body: req.param('body'),
               solution: req.param('solution')};
    db.save('questions', doc, function() {
        res.redirect('/admin');
    });
};
