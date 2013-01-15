(function() {
  var questionList;
  var questionsView;
  var currentQuestion;
  var currentQuestionView;
  var loginBox;
  var currentId;

  var CurrentQuestion = Backbone.Model.extend({
    url : function() {
      return "/api/question/"+this._id;
    },
    parse : function(response){
      return response.data;
    },
    update : function(id) {
      this._id = id;
      var self = this;
      this.fetch({
        success : function(question) {
          if (question.get('correct') === true || question.get('correct') === false) {
            self.trigger('check',{correct:question.get('correct')});
          } else {
            self.trigger('check',null);
          }
        }
      });

    },
    saveTemplate : function(code) {
      var obj = {
        question : this.get('_id'),
        solution : code
      }
      var self = this;
      $.post("/api/save", obj).success(function(result) {
        self.trigger("save", result);
      }).error(function() {
        //TODO implement error better than alert
        alert("Please log in!");
      })
    },
    check : function(code) {
      var obj = {
        _id : this.get('_id'),
        solution : code
      }
      var self = this;
      $.post("/api/check", obj).success(function(result) {
        self.trigger('check', result);
      })
    }
  });

  var CurrentQuestionView = Backbone.View.extend({
    tagName : "div",
    initialize : function() {
      this.model.bind('change', this.render , this);
      var template = "<div class='currentTitle'>{{title}}</div><div>{{{content}}}</div><div class='answerArea'>"+
        "<textarea id='solutionBox'></textarea></div><div class='submissionBox'><button id='submit' class='btn btn-primary checkButton'>Check</button><button class='btn btn-success' id='save'>Save</button></div>";
      this.handlebar = Handlebars.compile(template);
      this.correct = null;
      this.model.bind('check', function(result) {
        if (result) {
          $("#currentQuestion").css({"border-color": (result.correct?"green":"red")});
        } else {
          $("#currentQuestion").css({"border-color": "#E9E9E9"});
        } }, this);
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
        self.model.check(self.code.getValue());
      });
      this.$("#save").click(function() {
        self.model.saveTemplate(self.code.getValue());
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
      if (questionsView._views[id]) {
        questionsView._views[id].select(true)
        questionsView._views[currentId].select(false)
      }
      currentId = id;
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
