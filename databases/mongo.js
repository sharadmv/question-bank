var mongoose = require('mongoose');
path = "mongodb://root:61a-master@linus.mongohq.com:10013/app10368472";
mongoose.connect(path);
var schema = {
    question : new mongoose.Schema({
        author : String,
        title : String,
        content : String,
        solution : String,
        tests : String,
        difficulty : String,
        category : String,
        tags : Array,
        type : String,
        template : String,
        comments : [{author : Object, body : String, date : Date }]
    }),
    user : new mongoose.Schema({
        login : String,
        section : String,
        username : String,
        name : String,
    })
}
var interface = {
    Question : mongoose.model("Question", schema.question),
    User : mongoose.model("User", schema.user)
}
module.exports = interface;
