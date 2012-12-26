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

exports.user = {
  get : function(login, callback) {
    db.get('user', {login: login}, function(err, result) {
      user = new model.User(login, result.username, result.section);
      callback(err, user);
    });
  },
  save : function(user, callback) {
    db.save('user', user, callback);
  },
}
