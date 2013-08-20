var Mongo = require("mongoskin");
var Config = require("./config");

var Storage = {
    host    : "",
    port    : "",
    dbname  : "",
    db      : null,
    init    : function(){
        this.host = 'localhost';
        this.port = '27017';
        this.dbname = 'zerg';
        this.db = new Mongo.db(this.host + ":" + this.port + "/" + this.dbname);
    },
    readOne : function(collection_name, query, callback){
        if(!this.db){
            this.init();
        }

        var collection = this.db.collection(collection_name);
        collection.find(query, {limit:1, sort:{'date': -1}}).toArray(function(err,docs){
            callback(docs);
        });
    },
    read    : function(collection_name, query, callback){
        if(!this.db){
            this.init();
        }

        var collection = this.db.collection(collection_name);
        collection.find(query).toArray(function(err,docs){
            callback(docs);
        });
    },
    write   : function(collection_name, data){
        if(!this.db){
            this.init();
        }

        var collection = this.db.collection(collection_name);
        collection.insert(data, {w:1}, function(err, result){
            if(err)
                console.log(err);
        });
    }
};

//Storage.readOne('minerals', {shop_id:"1580297"}, function(v){console.log(v)});
//Store.read('minerals', {shop_id:"1580297"}, function(v){console.log(v)});

module.exports = Storage;
