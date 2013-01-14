(function() {
  var questionList;
  var questionsView;
  var currentQuestion;
  var currentQuestionView;
  var loginBox;

  var DEFAULT_TEMPLATE = 'def answer():\n    """YOUR CODE HERE"""';

  var preview;

  var Preview = Backbone.View.extend({
    render : function(md) {
      $(this.el).html(marked(md));
    }
  });

  var FormView = Backbone.View.extend({
    initialize : function() {
        this.question = new Question({
        });
        var self = this;
        currentQuestion.on('change', function()  {
            self.load(currentQuestion);
        }, this);

    },
    events : {
      'click #save' : "save",
      'click #delete' : "delete",
      'click #preview' : "preview",
      'change #author' : "update",
      'change #title' : "update",
      'keyup #content' : "update",
      'change #content' : "update",
      'change #solution' : "update",
      'change #type' : "update",
      'change #tests' : "update",
      'change #category' : "update",
      'change #difficulty' : "update",
      'change #tags' : "update",
      'change #template' : "update"
    },
    delete : function() {
        this.question.destroy({ success : function(model, response) {
            window.location = "/admin";
        }});
    },
    update : function() {
        this.question.set('author', this.$('#author').val());
        this.question.set('title', this.$('#title').val());
        this.question.set('content', this.$('#content').val());
        this.question.set('solution', this.$('#solution').val());
        this.question.set('type', this.$('#type').val());
        this.question.set('tests', this.$('#tests').val());
        this.question.set('category', this.$('#category').val());
        this.question.set('difficulty', this.$('#difficulty').val());
        this.question.set('tags', this.$('#tags').val().trim().split(" "));
        this.question.set('template', template.getValue());
        this.preview();
    },
    clear : function() {
        this.question.set('_id', null);
        this.question.set('id', null);
        this.question.id = null;
        this.question.set('author', '');
        this.question.set('title', '');
        this.question.set('content', '');
        this.question.set('solution', '');
        this.question.set('type', '');
        this.question.set('tests', '');
        this.question.set('category', '');
        this.question.set('difficulty', '');
        this.question.set('tags', []);
        this.question.set('template', DEFAULT_TEMPLATE);
        this.fields();
    },
    fields : function() {
        this.$("#author").val(this.question.get('author'));
        this.$("#title").val(this.question.get('title'));
        this.$("#content").val(this.question.get('content'));
        this.$("#solution").val(this.question.get('solution'));
        this.$("#type").val(this.question.get('type'));
        this.$("#tests").val(this.question.get('tests'));
        this.$("#category").val(this.question.get('category'));
        this.$("#difficulty").val(this.question.get('difficulty'));
        this.$("#tags").val(this.question.get('tags').join(" "));
        template.setValue(this.question.get('template'));
        this.preview();
    },
    load : function(question) {
        window.question = question;
        this.question._id = question.get('_id');
        this.question.set('id', question.get('_id'));
        this.question.set('_id', question.get('_id'));
        this.question.set('author', question.get('author'));
        this.question.set('title', question.get('title'));
        this.question.set('content', question.get('content'));
        this.question.set('solution', question.get('solution'));
        this.question.set('type', question.get('type'));
        this.question.set('tests', question.get('tests'));
        this.question.set('category', question.get('category'));
        this.question.set('difficulty', question.get('difficulty'));
        this.question.set('tags', question.get('tags'));
        this.question.set('template', question.get('template'));
        this.fields();
        this.preview();
    },
    save : function() {
      var self = this;
      this.question.save(null, { success : function(rand, obj) {
        self.question.set('_id', obj._id)
        self.question.set('id', obj._id)
        self.question.id = obj._id;
        location.reload();
      }});
    },
    preview : function() {
      preview.render(this.$("#content").val());
    }
  });

  var CurrentQuestion = Backbone.Model.extend({
    url : function() {
      return "/api/question/"+this.id;
    },
    parse : function(response){
      return response.data;
    },
    update : function(id) {
      console.log("Fetching question: %s", id);
      this.id = id;
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
  var template;

  //Entry point
  $(document).ready(function() {
    questionList = new QuestionList();
    questionsView = new QuestionsView({ el : $("#questionList"), collection : questionList });
    questionList.fetch({ update : true });
    currentQuestion = new CurrentQuestion();
    Backbone.history.start({ root : "/admin" });
    var form = new FormView({ el : $("#currentQuestion") });
    console.log(form.$("#template"));
    template = CodeMirror.fromTextArea(form.$("#code")[0], {
      mode : 'python',
      stylesheet: "css/pythoncolors.css",
      path: "../../js/",
      lineNumbers: true,
      textWrapping: false,
      indentUnit: 4,
      parserConfig: {'pythonVersion': 3, 'strictErrors': true}
    });
    window.template = template;
    preview = new Preview({ el : $("#previewBox") });
    $("#newQuestion").click(function() {
        console.log("Clearing form");
        form.clear();
    });
  });
})();
