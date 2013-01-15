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
            if (result.stdout) {
                var correct = result.stdout.trim() == question.solution.trim();
                if (req.signedCookies.user && req.signedCookies.user.login) {
                    var user = {
                        question : req.body._id,
                        solution : solution,
                        correct : correct,
                        login : req.signedCookies.user.login,
                    }
                    dao.Submission.findOne({
                        question : req.body._id,
                        login : req.signedCookies.user.login,
                    }, function(err, result) {
                        if (!result) {
                        var submission = new dao.Submission(user);
                            submission.save();
                        } else {
                            result.solution = req.body.solution;
                            result.correct = correct;
                            result.save();
                        }
                    })
                }
                res.json({ correct : correct });
            } else {
                res.json({ correct : false })
            }
        });
    })
};
exports.save = function(req, res) {
    if (req.signedCookies.user && req.signedCookies.user.login) {
        dao.Save.findOne({
            question : req.body.question,
            login : req.signedCookies.user.login,
        }, function(err, result) {
            if (!result) {
                var save = new dao.Save({
                    login : req.signedCookies.user.login,
                    solution : req.body.solution,
                    question : req.body.question
                });
                save.save();
            } else {
                result.solution = req.body.solution;
                result.save();
            }
            res.json({});
        })
    } else {
        res.send(401);
    }
}
