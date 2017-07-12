var question;
var todos = [];

while (question !== "quit") {
  question = prompt("What do you like to do?:");
  switch (question) {
    case "new":
      addTodo();
      break;
    case "list":
      listTodos();
      break;
    case "delete":
      delTodo();
      break;
    default:
      break;
  }
};

console.log("YOU QUIT THE APP!");

function addTodo() {
  var task = prompt("Please enter a task:");
  todos.push(task);
  console.log(task + " is added to list");
}

function listTodos() {
  console.log("**************");
  for (var i = 0; i < todos.length; i++) {
    console.log(i + ": " + todos[i]);
  }
  console.log("**************");
}

function delTodo() {
  var item = prompt("Specify the index of task, you whant to delete:");
  todos.splice(item, 1);
  console.log("Item deleted");
}
