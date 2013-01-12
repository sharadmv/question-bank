var dao = require('../databases/mongo');
var model = require('../util/model');

exports.update = function(req, res) {
  var user = new dao.User(req.body);
  console.log(user);
  user.login = req.signedCookies.user.login;
  var upsertData = user.toObject();
  delete upsertData._id;
  console.log(user, upsertData);
  dao.User.findOneAndUpdate({login : user.login}, upsertData, {upsert: true}, function(err, result){
    console.log(err, result);
    if (err) {
      res.send(200);
    } else {
      res.json(result);
    }
  });
};
