var dao = require('../util/dao');
var model = require('../util/model');

exports.update = function(req, res) {
  dao.user.update(req.signedCookies.user.login, {
    username: req.param('username'),
    section: req.param('section'),
  }, function() {
    res.redirect('/');
  });
};
