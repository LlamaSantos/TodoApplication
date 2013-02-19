var clone = function (item){
    return JSON.parse(JSON.stringify(item));
};

var TodoOperation = (function (){
    return {
        create : function (_, store){
            if (!!store.get("todo")){
                store.set("todo", []);
            }

            var index = 0;

            return (function (){
                return {
                    search : function (filter, done){
                        var scope = store.get("todo") || [];

                        done(null, _(scope).filter(filter));
                    },
                    list : function list(done){
                        var scope = store.get("todo") || [];

                        done(null, clone(scope));
                    },
                    add : function (item, done){
                        if(('name' in item) && ('description' in item)){
                            var scope = store.get("todo") || [];

                            index = index + 1;
                            item.id = index;
                            scope.push(item);

                            store.set("todo", scope);

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data", clone(scope));
                        }
                    },
                    update : function (item, done){
                        if(('name' in item) && ('description' in item)){
                            var scope = store.get("todo") || [];
                            var newList = _(scope).reject(function (i){
                                return i.id == itemFound.id;
                            });

                            newList.push(item);
                            scope = newList;
                            store.set("todo", scope);

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data");
                        }
                    },
                    remove : function (item, done){
                        var scope = store.get("todo") || [];
                        scope = _(scope).reject(function (i){
                            return i.id = item.id;
                        });

                        store.set("todo", scope);

                        done(null, clone(scope));
                    }
                }
            })();
        }
    };
})();