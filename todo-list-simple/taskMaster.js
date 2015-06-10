$(document).ready(function() {

  $("#task-form").submit(function( event ) {

    event.preventDefault();

    var formText = $(".input-text").val();
    $(".task-list").append("<li class='current-task'>" + formText + "</li>");
    $(".input-text").val("");

  });

  $(".task-list").on("click", ".current-task", function(event) {
    event.preventDefault();
    $(this).remove();
  });

});
