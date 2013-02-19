var TodoController = (function (){
    return {
        create : function (_, bus, ops){

            // -- Wireup listing of all items
            bus.on("todo::list", function (presenter){
                ops.list(function (err, items){
                    presenter(err, items);
                });
            });

            // -- Wireup adding a todo item
            bus.on("todo::add", function (item, presenter){
                ops.add(item, function (err, todoItems){
                    if (err){
                        presenter(err, todoItems);
                    }
                    else{
                        presenter(null, todoItems);
                    }

                    bus.emit("todo::add::completed", todoItems);
                });
            });

            // -- Wireup Updating a specific item
            bus.on("todo:update", ops.update);

            // -- Wireup removing an item
            bus.on("todo:remove", ops.remove);


            return {
                setup : true
            };
        }
    };
})();