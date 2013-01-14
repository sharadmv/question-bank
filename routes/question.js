/* Dependencies */
var dao = require('../databases/mongo');
var model = require('../util/model');
var pytutor = require('../util/pytutor');

/* GET */

// Home page
exports.check = function(req, res) {
    var solution = req.body.solution;
    dao.Question.findOne({_id : req.body._id}, function(err, question) {
        var code = solution+"\nprint("+question.tests.trim().split("\n").join(")\nprint(")+")";
        pytutor.run(code, function(result) {
            var correct = result.stdout.trim() == question.solution.trim();
            var user = {
                question : req.body._id,
                login : req.signedCookies.user.login,
                solution : solution,
                correct : correct
            }
            var submission = new dao.Submission(user);
            submission.save();
            res.json({ correct : correct });
        });
    })
};
