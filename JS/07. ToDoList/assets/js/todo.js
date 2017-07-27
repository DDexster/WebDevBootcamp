//--------------VARIABLES------------
var todos = [];
//--------------VARIABLES------------


//--------------MAIN------------
_renderTodos();
//--------------MAIN------------


// --------------Events-----------
$("ul").on("click", "li", function() {
    $(this).toggleClass("done");
});

$("ul").on("click", ".delete-btn", function(event) {
    var text = $(this).parent().text().trim();
    var index = todos.indexOf(text);
    todos.splice(index, 1);
    _upadteStorage();

    $(this).parent().fadeOut(750, function() {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").on("keypress", function(event) {
    if (event.which === 13) {
        var todoText = $(this).val();
        if (todoText) {
            addTodo(todoText);
            $(this).val("");
            todos.push(todoText);
            _upadteStorage();
        }
    }
});

$("#plus").on("click", function() {
    $("input[type='text']").slideToggle();
});
// --------------Events-----------


// --------------Functions-----------
function addTodo(text) {
    $("#todos").append("<li><span class='delete-btn'><i class='fa fa-trash' aria-hidden='true'></i></span> " +
        text + "</li>");
}

function _upadteStorage() {
    var todosStore = JSON.stringify(todos);
    localStorage.setItem("todos", todosStore);
}

function _renderTodos() {
    _clearTodos();
    var todosParsed = JSON.parse(localStorage.getItem("todos"));
    console.log(todosParsed);
    if (todosParsed) {
        todos = todosParsed;
        todos.forEach(function(todo) {
            addTodo(todo);
        }, this);
    }

}

function _clearTodos() {
    $("#todo li").remove();
}

// --------------Functions-----------