/* Dependencies */
var db = require('../util/dao.js');

/* GET */
exports.list = function (req, res) {
    db.question.find({}, function(err, result) {
        if (err) throw err;
        res.render('qlist', {list: result});
    });
};

exports.single = function (req, res) {
    var query = {title: req.params.name};
    db.get('questions', query, function(err, result) {
        if (err) throw err;
        res.render('question', {
            title: result.title,
            body: result.body,
        });
    });
};


