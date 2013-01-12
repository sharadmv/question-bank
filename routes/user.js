var dao = require('../databases/mongo');
var model = require('../util/model');

exports.update = function(req, res) {
  var user = new dao.User(req.body);
  console.log(user);
  user.login = req.signedCookies.user.login;
  var upsertData = user.toObject();
  console.log(user, upsertData);
  delete upsertData._id;
  dao.User.findOneAndUpdate({login : user.login}, upsertData, {upsert: true}, function(err, result){
    if (err) {
      throw err;
    } else {
      res.json(result);
    }
  });
};
