var clone = function (item){
    return JSON.parse(JSON.stringify(item));
}
var TodoOperation = (function (){
    return {
        create : function (_, store){
            if (!("todo" in store)){
                store["todo"] = {};
            }

            var scope = store["todo"];
            var index = 0;
            return (function (){
                return {
                    search : function (filter, done){
                        done(null, _(scope).filter(filter));
                    },
                    add : function (item, done){
                        if(('name' in item) && ('description' in item)){

                            index = index + 1;
                            item.id = index;
                            scope.push(item);

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data", clone(scope));
                        }
                    },
                    update : function (item, done){
                        if(('name' in item) && ('description' in item)){
                            var newList = _(scope).reject(function (i){
                                return i.id == itemFound.id;
                            });

                            newList.push(item);
                            scope = newList;

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data");
                        }
                    },
                    remove : function (item, done){
                        scope = _(scope).reject(function (i){
                            return i.id = item.id;
                        });

                        done(null, clone(scope));
                    }
                }
            })();
        }
    };
})();