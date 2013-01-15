//Models
var BASE_URL = "#/";

var Question = Backbone.Model.extend({
  url : function() {
    return '/api/question/'+this._id;
  }
});
var QuestionList = Backbone.Collection.extend({
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
  select : function(id) {
      console.log(this);
    this._views[this.selected].select(true);
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
    this._views[model.get('_id')] = v;
    $(this.el).append(v.render().el);
    return this;
  },
  remove : function(model) {
    var v = new this.View({ model : model });
    this._views[model.get('_id')].remove();
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
  tagName : "li",
  className : "",
  events : {
  },
  initialize : function() {
    var template = "<a href='"+BASE_URL+"question/{{_id}}'>{{title}}<i class='icon-nav icon-chevron-right'></i></a></div>";
    this.handlebar = Handlebars.compile(template);
  },
  select : function(selected) {
    if (selected) {
        this.$el.addClass('active');
        this.$el.removeClass('inactive');
    } else {
        this.$el.addClass('inactive');
        this.$el.removeClass('active');
    }
  },
  render : function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  template : function(model) {
    return this.handlebar(model);
  }
});
var QuestionsView = UpdateView.extend({
  View : QuestionView
});
