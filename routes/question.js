/* Dependencies */
var db = require('../databases/db-mongo.js');

/* GET */
exports.list = function (req, res) {
    db.getAll('questions', function(err, result) {
        res.render('qlist', {list: result});
    });
};

exports.single = function (req, res) {
    var query = {title: req.params.name};
    db.get('questions', query, function(err, result) {
        res.render('question', {
            title: result.title,
            body: result.body,
        });
    });
};


