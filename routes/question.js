/* Dependencies */
var dao = require('../util/dao.js');

/* GET */
exports.list = function (req, res) {
    dao.question.find({}, function(err, result) {
        if (err) throw err;
        res.render('qlist', {list: result});
    });
};

exports.single = function (req, res) {
    dao.question.getById(req.params.id, function(err, result) {
        console.log(result);
        res.render('question', {
          question : result
        });
    });
};


