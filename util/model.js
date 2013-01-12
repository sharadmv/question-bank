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
  Question : function(id, author, title, content, solution, tests, difficulty, category, tags, type, comments, template) {
    this._id = id;
    this.author = author;
    this.title = title;
    this.content = content;
    this.solution = solution;
    this.tests = tests;
    this.difficulty = difficulty;
    this.category = category;
    this.tags = tags;
    this.type = type;
    this.template = template;
    this.comments = comments;
  },
  Response:function(data, status, url, query, timestamp, elapsed) {
    this.data = data;
    this.status = status;
    this.url = url;
    this.query = query;
    this.timestamp = timestamp.getTime();
    this.elapsed = elapsed;
  },
  User : function(id, login, username, section) {
    this._id = id;
    this.login = login;
    this.username = username;
    this.section = section;
  },
}
module.exports = model;
