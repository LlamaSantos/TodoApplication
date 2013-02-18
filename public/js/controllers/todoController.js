var TodoController = (function (){
    return {
        create : function (_, bus, ops){

            bus.on("todo::add", function (item, presenter){
                ops.add(item, function (err, todoItems){
                    if (err){
                        presenter(err, todoItems);
                    }
                    else{
                        presenter(null, todoItems);
                    }

                    app.emit("todo::add::completed", todoItems);
                });
            });

            bus.on("todo:update", ops.update);
            bus.on("todo:remove", ops.remove);


            return {
                setup : true
            };
        }
    };
})();