/* Dependencies */
var dao = require('../databases/mongo');
var model = require('../util/model');

/* GET */

// Home page
exports.home = function (req, res) {
    if (req.signedCookies.user && req.signedCookies.user.admin) {
      dao.Question.find({}, function(err, result) { res.render('admin', {questions: result, login : req.signedCookies.user.login, admin : req.signedCookies.user.admin});
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

exports.delete = function(req, res) {
  if (req.signedCookies.user && req.signedCookies.user.admin) {
    dao.Question.findById(req.params.id, function(err, result) {
        if (err) {
            res.json({});
        } else {
            if (result) {
                result.remove(function() {
                    res.json(result);
                });
            } else {
                res.json({})
            }
        }
    })
  } else {
    res.send(401);
  }
};
// Save question to database
exports.save = function(req, res) {
  if (req.signedCookies.user && req.signedCookies.user.admin) {
    var question = new dao.Question(req.body);
    console.log(question);
    if (question._id === null) {
        delete question._id;
    }
    var upsertData = question.toObject();
    delete upsertData._id;
    dao.Question.findOneAndUpdate({_id: question._id}, upsertData, {upsert: true}, function(err, result){
        if (err) {
            throw err;
        } else {
            console.log(arguments);
            res.json(result);
        }
    });
  } else {
    res.send(401);
  }
};
