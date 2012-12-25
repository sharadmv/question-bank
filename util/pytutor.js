var rest = require('restler'),
    querystring = require('querystring'),
    model = require('./model.js'),
    URL = require('url');

var url = "http://www.pythontutor.com/web_exec_py3.py";

exports.run = function(code, callback) {
  var data = {
    cumulative_mode : false,
    user_script : code
  }
  rest.get(url + "?" + querystring.stringify(data), {
  }).on('complete', function(result) {
    if (result instanceof Error) {
        callback(result);
        return;
    }
    trace = JSON.parse(result).trace;
    if (typeof(callback) == "function") {
        last = trace[trace.length - 1];
        output = new model.Code.Output(last.heap, last.globals, last.stdout);
        callback(output);
    }
  });
}
exports.compare = function(sub, sol) {
    for (var i in sub.globals) {
        if (typeof(sub.globals[i]) != typeof(sol.globals[i])) {
            return false;
        }
        if (typeof(sub.globals[i]) == "object") {
            if (sub.globals[i] && sol.globals[i]) {
                if (sub.globals[i][0] == "REF") {

                    subpointer = sub.globals[i][1]+"";
                    solpointer = sol.globals[i][1]+"";

                    if (JSON.stringify(sub.heap[subpointer]) != JSON.stringify(sol.heap[solpointer])) {
                        return false;
                    }
                }
            }
        } else if (sub.globals[i] != sol.globals[i]) {
            return false;
        }
    }
    return true;
}
exports.run("x=[1,2,3]\nprint(x)", function(result) {
    if (result instanceof Error) {
        return;
    }
    console.log(result);
    exports.run("x=[3,2,1]", function(res) {
        if (res instanceof Error) {
            return;
        }
        console.log(res);
        console.log(exports.compare(result, res));
    });
})
