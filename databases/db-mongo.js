
var MongoClient = require('mongodb').MongoClient;

var host = 'localhost';
var port = '27017';
var dbname = 'questionDb';

var path = process.env.MONGOHQ_URL || 'mongodb://' + host + ':' + port + '/' + dbname;

exports.getAll = function(dbname, callback) {
  MongoClient.connect(path, function(err, db) {
    if (err) return console.log(err);
    db.collection(dbname)
      .find()
      .toArray(function(err, result) {
        callback(err, result);
        db.close();
      });
  });
};

exports.get = function(dbname, query, callback) {
  MongoClient.connect(path, function(err, db) {
    if (err) return console.log(err);
    db.collection(dbname).findOne(query, function(err, result) {
      callback(err, result);
      db.close();
    });
  });
};

exports.save = function(dbname, doc, callback) {
  MongoClient.connect(path, function(err, db) {
    if (err) console.dir(err);
    db.collection(dbname).save(doc, function() {
      callback();
      db.close();
    });
  });
};
