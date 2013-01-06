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
    Backbone.history.start({ root : "/admin" });
  });
})();
