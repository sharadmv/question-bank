(function() {
  //Models
  var Question = Backbone.Model.extend({
  });
  var QuestionList = Backbone.Collection.extend({
    initialize : function() {
      this.bind('add', function() {
        console.log("Adding");
      }, this);
    },
    model : Question,
    url: '/api/question',
    parse : function(response) {
      return response.data
    }
  });

  //Views
  var UpdateView = Backbone.View.extend({
    initialize : function(options) {
      var self = this;
      this._views = {};
      this.collection.bind("add", function(model) {
        self.add(model);
      }, this);
      this.collection.bind("reset", function() {
        self.reset();
        self.render();
        self._empty = true;
      }, this);
      this.collection.bind("remove", function(model) {
        self.remove(model);
        }, this);
      this.collection.bind("change", function() {
        if (self.collection.length > 0) {
          self.update();
        }
      }, this);
      this._empty = true;
    },
    render : function() {
      var self = this;
      $(this.el).html("No questions to be displayed");
      this._empty = true;
      return this;
    },
    update : function() {
      if (this._empty) {
        $(this.el).html("");
      }
      var self = this;
      this.collection.each(function(model) {
        self.add(model);
      });
      this._empty = false;
    },
    add : function(model) {
      var v = new this.View({ model : model });
      this._views[model._id] = v;
      $(this.el).append(v.render().el);
      return this;
    },
    remove : function(model) {
      var v = new this.View({ model : model });
      this._views[model._id].remove();
      delete this._views[model._id];
    },
    reset : function() {
      for (var i in this._views) {
        this._views[i].remove();
      }
      this._views = {};
    }
  });

  var QuestionView = Backbone.View.extend({
    tagName : "div",
    className : "question",
    events : {
    },
    initialize : function() {
    },
    render : function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    template : function(model) {
      console.log(model.content)
      return marked(model.content);
    }
  });

  var QuestionsView = UpdateView.extend({
    View : QuestionView
  });

  //Entry point
  $(document).ready(function() {
    var questionList = new QuestionList();
    var questionsView = new QuestionsView({ el : $("#questionList"), collection : questionList });
    questionList.fetch({ update : true });
    window.blah = questionList;
  });
})();
