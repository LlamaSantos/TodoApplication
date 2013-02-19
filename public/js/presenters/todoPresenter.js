var TodoPresenter = (function (){
    // -- Shared Space between all TodoPresenters created.
    var renderBody = function renderBody(tmpl, items){
        $(".app-root").html(tmpl.main.render({items: items}));
    };

    var jQueryEvents = function jQueryEvents($, _, bus, tmpl){

        // -- Saving an element
        $("body").on("click", ".js-todo-add", function (){
            $(".app-root").append(tmpl.todoAddModal.render({}));
            $(".todo-add-modal").modal({
                keyboard: true
            });
        });

        $("body").on("click", ".js-todo-modal-save", function (){
            var data = {
                name : $(".todo-add-modal .todo-name-field").val(),
                description : $(".todo-add-modal .todo-description-field").val()
            };

            bus.emit("todo::add", data, function (err, items){
                if (err){
                    console.info(err);
                }
                else{
                    renderBody(tmpl, items);
                }

                $(".todo-add-modal").on("hidden", function (){
                    $(".todo-add-modal").remove();
                });
                $(".todo-add-modal").modal('hide');
            });
        });

        $("body").on("click", ".js-todo-modal-close", function (){
            $(".todo-add-modal").remove();
        });


    };

    var busEvents = function busEvents($, _, bus, tmpl){
        bus.on("app::init", function (){
            bus.emit("todo::list", function (err, items){
                renderBody(tmpl, items);
            });
        });
    };

    return {
        create : function ($, _, bus, tmpl){

            jQueryEvents($, _, bus, tmpl);

            busEvents($, _, bus, tmpl);

            return {
                setup : true
            }
        }
    }
})();