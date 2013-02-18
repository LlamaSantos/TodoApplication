var TodoPresenter = (function (){
    // -- Shared Space between all TodoPresenters created.
    return {
        create : function ($, _, bus, tmpl){

            $("body").on("click", ".todo-add-save", function (){
                var data = {
                    name : $("#todoName").val(),
                    description : $("#todoDescription").val()
                }

                bus.emit("todo::add", data, function (err, list){
                    if (err){
                        bus.emit("app::error", { area : "todo add", message : err });
                    }
                    else{
                        var html = tmpl.todoList.render({ list: list });
                        $("#todo-list").html(html);
                    }
                });
            });


            return {
                setup : true
            }
        }
    }
})();