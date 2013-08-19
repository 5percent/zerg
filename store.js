var Mongo = require("mongodb");
var Config = require("./config");

var Store = {
    host    : "",
    port    : "",
    dbname  : "",
    db      : null,
    init    : function(){
        this.host = 'localhost';
        this.port = '27017';
        this.dbname = 'zerg';
        this.db = new Mongo.Db(this.dbname, new Mongo.Server(this.host, this.port), {safe:true});
        this.db.open(function(){});
    },
    read    : function(collection_name, query){
        if(!this.db){
            this.init();
        }

//        this.db.open(function(err, db){
            var collection = this.db.collection(collection_name);
            console.log(collection.find(query).toArray);
            collection.find(query).toArray(function(err,docs){
                console.log(1);
                console.log(err);
                console.log(docs);
            });
//        });
    },
    write   : function(collection_name, data){
        if(!this.db){
            this.init();
        }

        this.db.open(function(err, db){
            var collection = db.collection(collection_name);
            collection.insert(data, {w:1}, function(err, result){
                assert.equal(null, error);
                db.close(); 
            });
        });
    }
};

Store.read('minerals', {shop_id:"1580297"});
Store.read('minerals', {shop_id:"1580297"});

module.exports = Store;
