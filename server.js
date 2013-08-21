var Express = require("express");
var Http = require("http");
var Hatchery = require("./Hatchery");
var Storage = require("./Storage");

var app = Express();
app.listen(8080);

app.get("/new/shop", function(req, res){
    var id = req.param("id");
    var hatchery = new Hatchery(); 
    hatchery.tasks.shop.push(id);
    console.log(hatchery.tasks.shop);
    res.send("recived");
});

app.get("/query/shop", function(req, res){
    var id = req.param("id");
    Storage.readOne('minerals', {shop_id:id}, function(data){
        res.send(data);
    });
});

var get_task = function(){
    var options = {
        hostname : "10.0.1.74",
        port     : "8080",
        path     : "/get_shop",
        headers  : {
            "User-Agent" : "Firefox 22/Windows: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0"
        },
        method   : "GET"
    };
    var req = Http.request(options, function(res){
        res.setEncoding('utf8');
        var buffers = [];
        res.on('data', function (chunk) {
            var b = new Buffer(chunk);
            buffers.push(b);
        }).on('end', function(){
            var html = Buffer.concat(buffers).toString();
            var json = eval("(" + html + ")");
            if(json.Sid == 0)
                return;

            var hatchery = new Hatchery(); 
            hatchery.tasks.shop.push(json.Sid);
            console.log(hatchery.tasks.shop);
        });
    });
    req.end();
};
get_task();
setInterval(get_task, 1000 * 10);
