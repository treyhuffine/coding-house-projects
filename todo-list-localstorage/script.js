var theme = localStorage["theme"],
    todos = (localStorage["taskMaster"] ? JSON.parse(localStorage["taskMaster"]) : []);

// Function to push new tasks to the full array
var pushTasks = function(newTodo) {
  todos.push({"task": newTodo, "open-task": true});
};

// Fill out tasks in the DOM
var fillTasks = function() {
  var newTodoLi;
  $.each(todos, function(index, element) {
    newTodoLi = $(".todo-item-clone:last").clone(true).show();
    newTodoLi.removeClass("todo-item-clone").addClass("todo-item");
    if(!element["open-task"]) {
      newTodoLi.addClass("done");
      newTodoLi.find("input").prop("checked", true)
    }
    $("#todo-items").prepend(newTodoLi);
    $("#todo-items li:first-child").find(".todo-text").text(element["task"]);
  });
  filterComplete();
}

// Save state for values that are marked complete
var setComplete = function() {
  $(".todo-item").each(function(index, element) {
    todos[todos.length-index-1]["open-task"] = ( $(element).hasClass("done") ? false : true);
  });
  filterComplete();
  localStorage["taskMaster"] = JSON.stringify(todos);
};

var filterComplete = function() {
  localStorage["show-tasks"] === "true" ? $(".done").show() : $(".done").hide();
};

//********** Main Function **********
$(document).ready(function() {
  $("body").removeClass().addClass(theme);
  fillTasks();
  filterComplete();

  // Add new task
  $("form#add-todo").submit(function(event) {
    event.preventDefault();

    var newTodo = $(this).find("textarea"),
        newTodoLi = $(".todo-item:last").clone(true).show();

    pushTasks(newTodo.val());
    $("#todo-items").empty();
    fillTasks();
    $(this).find("textarea").val("");
    localStorage["taskMaster"] = JSON.stringify(todos);

  });

  // Cross our task and save state
  $(":checkbox").click(function() {
    $(this).parent("li").toggleClass("done");
    setComplete();
  });

  // Make this show and hide completed elemented
  $("#remove").on("click", function() {
    $(".todo-item.done").toggle();
    localStorage["show-tasks"] = (localStorage["show-tasks"] === "true" ? false : true);
  })

  $("#change-theme").click(function() {
    theme = (theme === "light" ? "dark" : "light");
    localStorage["theme"] = theme;
    $("body").removeClass().addClass(theme);
  });
});



// reading : $("div");
// creating: $("<div>");
// wrapping: $(element)
// document.ready: $(function() {});
