
var mongoskin = require('mongoskin')

var host = 'localhost';
var port = '27017';

var path = process.env.MONGOHQ_URL || 'mongodb://' + host + ':' + port + '/';
path = "mongodb://root:61a-master@linus.mongohq.com:10013/app10368472"
var db = mongoskin.db(path);


exports.getAll = function(coll, query, callback) {
  db.collection(coll)
    .find(query)
    .toArray(function(err, result) {
      callback(err, result);
    });
};

exports.get = function(coll, query, callback) {
  db.collection(coll).findOne(query, function(err, result) {
    callback(err, result);
  });
};

exports.getById = function(coll, id, callback) {
  db.collection(coll).findById(id, function(err, result) {
    callback(err, result);
  });
};

exports.update = function(coll, query, update, callback) {
  db.collection(coll).update(query, update, function(err, result) {
    callback(err, result);
  });
};

exports.save = function(coll, doc, callback) {
  db.collection(coll).save(doc, function() {
    console.log(doc);
    callback();
  });
};
