var Connection= require('ssh2');

exports.authenticate = function(username, password, callback) {
  var ssh = new Connection();
  ssh.on('ready', function() {
    callback(true);
    ssh.end();
  });
  ssh.on('error', function(err) {
    callback(false);
  });
  ssh.connect({
    host: 'cory.eecs.berkeley.edu',
    port: 22,
    username: username,
    password : password
  });
}
