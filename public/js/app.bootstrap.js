(function (win, $, _, Hogan, tmpls){

    if (!('app' in win)){
        var cache = {};
        win.app = {
            bus : new EventEmitter2({
                "delimeter" : "::",
                "wildcard" : "*"
            }),
            store : {
                get : function (key){
                    return cache[key];
                },
                set : function (key, value){
                    cache[key] = value;
                }
            },
            templates : tmpls,
            operations : {
                todo : TodoOperation.create(_, win.app.store)
            },
            controllers : {
                todo : TodoController.create(_, win.app.bus, win.app.operations.todo)
            },
            presenters : {
                todo : TodoPresenter.create($, _, win.app.bus, win.app.templates)
            }
        }
    }

})(window, jQuery, _, Hogan, templates);
