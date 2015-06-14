var taskRef = new Firebase("https://amber-torch-666.firebaseio.com/task");

$(document).ready(function() {

  $("#task-form").submit(function( event ) {
    event.preventDefault();
    var $formText = $(".input-text");
    if ($formText.val().trim().length > 0) {
      taskRef.push( { task: $formText.val() } );
    }
    $formText.val("");
  });

  $(".task-list").on("click", ".current-task", function(event) {
    event.preventDefault();
    $currentTask = $(this);
    taskRef.child($currentTask.data("firebase-key")).remove();
    $currentTask.remove();
  });

  taskRef.on("child_added", function(snapshot) {
        newLi = $("<li>").addClass("current-task")
                         .data("firebase-key", snapshot.key())
                         .text(snapshot.val().task);
        $(".task-list").append(newLi);
  });

});
