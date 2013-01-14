(function() {
  var questionList;
  var questionsView;
  var currentQuestion;
  var currentQuestionView;
  var loginBox;

  var CurrentQuestion = Backbone.Model.extend({
    url : function() {
      return "/api/question/"+this._id;
    },
    parse : function(response){
      return response.data;
    },
    update : function(id) {
      console.log(id);
      this._id = id;
      this.fetch();
    }
  });

  var CurrentQuestionView = Backbone.View.extend({
    tagName : "div",
    initialize : function() {
      this.model.bind('change', this.render , this);
      var template = "<div class='currentTitle'>{{title}}</div><div>{{{content}}}</div><div class='answerArea'>"+
      "<textarea id='solutionBox'></textarea></div><div class='submissionBox'><button id='submit' class='btn'>Check</button></div>";
      this.handlebar = Handlebars.compile(template);
    },
    render : function(model) {
      $(this.el).html(this.template(this.model.toJSON()));
      prettyPrint();
      this.code = CodeMirror.fromTextArea(this.$("#solutionBox")[0], {
        mode : 'python',
        stylesheet: "css/pythoncolors.css",
        path: "../../js/",
        lineNumbers: true,
        textWrapping: false,
        indentUnit: 4,
        parserConfig: {'pythonVersion': 3, 'strictErrors': true}
      });
      this.code.setValue(model.get('template'));
      var self = this;
      this.$("#submit").click(function() {
        var obj = {
          _id : self.model.get('_id'),
          solution : self.code.getValue()
        }
        $.post("/api/check", obj).success(function(result) {
          alert(result.correct ? "Correct!" : "False!");
        }).error(function() {
          alert("Please log in!");
        })
      });
    },
    template : function(model) {
      model.content = marked(model.content);
      return this.handlebar(model);
    }
  });

  var App = Backbone.Router.extend({
    routes: {
      "question/:id" :"question",
      "" : "home",
    },
    home : function() {
    },
    question : function(id) {
      currentQuestion.update(id);
    }
  });

  new App();

  //Entry point
  $(document).ready(function() {
    questionList = new QuestionList();
    questionsView = new QuestionsView({ el : $("#questionList"), collection : questionList });
    questionList.fetch({ update : true });
    currentQuestion = new CurrentQuestion();
    currentQuestionView = new CurrentQuestionView({ model : currentQuestion, el : $("#currentQuestion")});
    Backbone.history.start({ root : "/" });
  });
})();
