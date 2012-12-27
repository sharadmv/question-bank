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
      this._id = id;
      this.fetch();
    }
  });

  var CurrentQuestionView = Backbone.View.extend({
    tagName : "div",
    initialize : function() {
      this.model.bind('change', this.render , this);
    },
    render : function(model) {
      $(this.el).html(this.template(this.model.toJSON()));
      prettyPrint();
    },
    template : function(model) {
      return marked(model.content)
    }
  });

  var LoginBox = Backbone.View.extend({
    events : {
      "click #loginButton" : "login"
    },
    login : function(){
      var username = this.$("#username").val();
      var password = this.$("#password").val();
      console.log(username, password);
      $.post('/api/session', {
        login : username,
        password : password
      }, function(data) {
      }).success(function(message, status, obj) {
        if (obj.status == 201) {
          window.location = "/settings";
        }
      }).error(function() {
        console.log("FAILURE!");
      });
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
    loginBox = new LoginBox({ el : $("#login") });
    Backbone.history.start({ root : "/" });
  });
})();
