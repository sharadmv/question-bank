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
      "keypress #loginWrapper" : "enter",
      "click #cancelButton" : "hide"
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
      if (username && password) {
        var self = this;
        $.post('/api/session', {
          login : username,
          password : password
        }, function(data) {
        }).success(function(message, status, obj) {
          self.display("Logout");
          self.hide();
          self.loggedIn = true;
          if (obj.status == 201) {
            location = "/settings";
          } else {
            location.reload();
          }
        }).error(function() {
          console.log("FAILURE!");
        });
      }
    },
    logout : function() {
      $.ajax({
        type : 'delete',
        url : '/api/session'
      }).success(function () {
        this.loggedIn = false;
        location.reload();
      });
    },
    toggle : function() {
      console.log(this.loggedIn);
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
