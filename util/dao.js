var db = require('../databases/db-mongo.js');
var model = require('./model.js');

exports.question = {
  getById : function(id, callback) {
    db.getById("question", id, function(err, result) {
      question = new model.Question(result._id, result.title, result.content, result.solution, result.tests, result.category, result.tags, result.type, result.comments);
      //callback(err, result);
      callback(err, question);
    });
  },
  find : function(query, callback) {
    db.getAll("question", query, function(err, result) {
        callback(err, result);
    });
  },
  save : function(question, callback) {
    db.save("question", question, callback);
  }
}
