(function() {
  var username;
  var loginBox;

  var LoginBox = Backbone.View.extend({
    initialize : function() {
      this.loggedIn = !!username;
      this.showing = false;
      if (this.loggedIn) {
        this.display("Logout");
      } else {
        this.display("Login");
      }
      this.$("#loginWrapper").css({ opacity : 0 });
    },
    events : {
      "click #loginButton" : "login",
      "click #loginLink" : "toggle",
      "keypress #loginWrapper" : "enter"
    },
    display : function(text) {
      this.$("#loginLink").html(text);
    },
    enter : function(e) {
      if (e.charCode == 13) {
        this.login();
      }
    },
    login : function(){
      var username = this.$("#username").val();
      var password = this.$("#password").val();
      var self = this;
      $.post('/api/session', {
        login : username,
        password : password
      }, function(data) {
        self.display("Logout");
        self.hide();
      }).success(function(message, status, obj) {
        if (obj.status == 201) {
          window.location = "/settings";
        }
      }).error(function() {
        console.log("FAILURE!");
      });
    },
    logout : function() {
      $.ajax({
        type : 'delete',
        url : '/api/session'
      }).success(function () {
        location.reload();
      });
    },
    toggle : function() {
      if (this.loggedIn) {
        this.logout();
      } else {
        if (this.showing) {
          this.hide();
        } else {
          this.show();
        }
      }
    },
    show : function() {
      if (!this.loggedIn) {
        this.$("#loginWrapper").animate({opacity:1}, 100)
        this.$("#username").select();
        this.showing = true;
      }
    },
    hide : function() {
      this.$("#loginWrapper").animate({opacity:0}, 100)
      this.showing = false;
    }
  });

  $(document).ready(function() {
    username = window.login;
    loginBox = new LoginBox({ el : $("#loginBox") , loggedIn: !!username});
  });
})();
