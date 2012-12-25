/* Dependencies */
var db = require('../databases/db-mongo');

/* GET */

// Home page
exports.home = function (req, res) {
    db.getAll('questions', function(err, result) {
      res.render('admin-home', {questions: result});
    });
};

// Edit question page
exports.edit = function (req, res) {
    res.render('edit', {});
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
