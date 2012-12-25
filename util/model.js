var model = {
  /**
   * The Output class is used to encapsulate output from Online Python Tutor
   */
  Output : function(heap, globals, stdout) {
    this.heap = heap;
    this.globals = globals;
    this.stdout = stdout;
  },

  /**
   * The Question class encapsulates the questions that are in the database
   */
  Question : function(id, title, content, solution, tests, category, tags, type, comments) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.solution = solution;
    this.tests = tests;
    this.category = category;
    this.tags = tags;
    this.type = type;
    this.comments = comments;
  }
}
module.exports = model;
