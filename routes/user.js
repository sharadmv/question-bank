var dao = require('../util/dao');
var model = require('../util/model');

exports.update = function(req, res) {
  var user = new model.User(

    req.session['login'],
    req.param('username'),
    req.param('section')
  );
  dao.user.update(req.session.login, {
    username: req.param('username'),
    section: req.param('section'),
  }, function() {
    res.send(200);
  });
};
