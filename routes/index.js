
/*
 * GET home page.
 */

exports.index = function(req, res){
  var login;
  var admin;
  login = null;
  admin = false;
  if (req.signedCookies.user) {
    login = req.signedCookies.user.login;
    admin = req.signedCookies.user.admin;
  }
  res.render('index', { title: 'Express' , login : login , admin : admin});
};
