var config = require("./Config")
var http = require("http");
var url_util = require("url");
var parser = require("./Parser");

var Gather = {
    get : function(parse_f, hostname, path, method, port){
        if(!port) 
            port = '80';
        if(!method)
            method = "GET";

        var index = Math.floor(Math.random()*1000 % config.ua.length);
        var ua = config.ua[index];
        var options = {
            hostname : hostname,
            port : port,
            path : path,
            headers: {
                "User-Agent" : ua
            },
            method : method
        };

        var req = http.request(options, function(res){
            console.log(options['hostname'] + options['path'] + ' : ' + res.statusCode);

//            timeout = setTimeout(function() {
//                timeout = null;
//                req.abort();
//                console.error(err);
//            }, 5000);

            res.setEncoding('utf8');
            var buffers = [];
            res.on('data', function (chunk) {
                var b = new Buffer(chunk);
                buffers.push(b);
            }).on('end', function(){
                var html = Buffer.concat(buffers).toString();
                parse_f(html);
            }).on('error', function(err) {
                clearTimeout(response_timeout);
                console.error(err);
            });
        });
        req.end();
    },
    get_url : function(parser_f, url, method){
        var url_info = url_util.parse(url);
        this.get(parser_f, url_info["host"], url_info["path"],method, url_info["port"]);
    }
};

Gather.get(parser.parse, "guoku.com","/selected/");
//Gather.get_url(parser.parse, "http://guoku.com/selected/");
