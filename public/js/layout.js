(function() {
  $(document).ready(function() {
    $("#logout").click(function() {
      console.log("HELLO");
      $.ajax({
        type : 'delete',
        url : '/api/session'
      }).success(function (){
        location.reload();
      });
    });
  });
})();
