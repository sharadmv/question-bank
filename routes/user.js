var dao = require('../util/dao');
var model = require('../util/model');

exports

exports.save = function(req, res) {
  var user = new model.User(
    req.session['login'],
    req.param('username'),
    req.param('section')
  );
  dao.user.save(user, function() {
  });
};
