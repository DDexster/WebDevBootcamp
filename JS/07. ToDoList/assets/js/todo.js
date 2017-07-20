// --------------Events-----------
$("ul").on("click", "li", function() {
    $(this).toggleClass("done");
});

$("ul").on("click", ".delete-btn", function(event) {
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
// --------------Functions-----------