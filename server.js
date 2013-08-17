var Express = require("express");
var Hatchery = require("./Hatchery");

var app = Express();
app.listen(8080);

app.get("/new/shop", function(req, res){
    var id = req.param("id");
    var hatchery = new Hatchery(); 
    hatchery.tasks.shop.push(id);
    console.log(hatchery.tasks.shop);
    res.send("recived");
});
