
/*
 * GET home page.
 */

exports.index = function(req, res){
  var login = req.signedCookies.login;
  res.render('index', { title: 'Express' , login : login });
};
