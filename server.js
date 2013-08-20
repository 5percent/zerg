var Express = require("express");
var Hatchery = require("./Hatchery");
var Storage = require("./Storage");

var app = Express();
app.listen(8080);

app.get("/new/shop", function(req, res){
    var id = req.param("id");
    var hatchery = new Hatchery(); 
    hatchery.tasks.shop.push(id);
    res.send("recived");
});

app.get("/query/shop", function(req, res){
    var id = req.param("id");
    Storage.readOne('minerals', {shop_id:id}, function(data){
        res.send(data);
    });
});
