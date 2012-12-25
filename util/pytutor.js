var rest = require('restler')
  , querystring = require('querystring')
  , model = require('./model.js')
  , URL = require('url');

var url = "http://www.pythontutor.com/web_exec_py3.py";

exports.run = function(code, callback) {
  var data = {
    cumulative_mode : false,
    user_script : code
  }
  rest.get(url + "?" + querystring.stringify(data)).on('complete', function(result) {
    if (result instanceof Error) {
      callback(result);
      return;
    }
    trace = JSON.parse(result).trace;
    if (typeof(callback) == "function") {
      last = trace[trace.length - 1];
      output = new model.Output(last.heap, last.globals, last.stdout);
      callback(output);
    }
  });
}
exports.compare = function(sub, sol) {
  return sub.stdout.trim() == sol.stdout.trim();
}
