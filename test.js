var Config = require("./config")
var Http = require("http");
var FS = require("fs");

var index = Math.floor(Math.random()*1000 % Config.ua.length);
var ua = Config.ua[index];
var options={
    hostname:"img03.taobaocdn.com",
    path : "/bao/uploaded/i3/18826029172392554/T1.JrLFeFbXXXXXXXX_!!0-item_pic.jpg",
    port : "80",
    headers: {
        "User-Agent" : ua
    },
    method : "GET"
};
var req = Http.request(options, function(res){
    var buffers = [];
    res.on('data', function (chunk) {
        var b = new Buffer(chunk);
        buffers.push(b);
    }).on('end', function(){
        var content = Buffer.concat(buffers);
        FS.writeFile("./haha.jpg", content, function(e){
            if(e)
                throw e;

            console.log("done");
        })
    })
});
req.end();
