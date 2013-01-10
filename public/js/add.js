(function() {

  var preview;

  var NewQuestion = Backbone.Model.extend({
    url : '/api/question'
  });
  var Preview = Backbone.View.extend({
    render : function(md) {
      $(this.el).html(marked(md));
    }
  });
  var FormView = Backbone.View.extend({
    events : {
      'click #save' : "save",
      'click #preview' : "preview"
    },
    save : function() {
      tags = $("#tags").val().trim().split(" ");
      var question = new NewQuestion({
        author: this.$("#author").val(),
        title : this.$("#title").val(),
        content : this.$("#content").val(),
        solution : this.$("#solution").val(),
        type : this.$("#type").val(),
        tests : this.$("#tests").val(),
        category : this.$("#category").val(),
        difficulty : this.$("#difficulty").val(),
        tags : tags,
        comments : []
      });
      question.save();
    },
    preview : function() {
      preview.render(this.$("#content").val());
    }
  });
  $(document).ready(function() {
    var form = new FormView({ el : $("#addForm") });
    preview = new Preview({ el : $("#previewBox") });
  });
})();
