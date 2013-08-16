var Config = require("./Config")
var Http = require("http");
var Url = require("url");

var Gather = {
    get : function(parse_f, hostname, path, method, port){
        if(!path) 
            path = '';
        if(!port) 
            port = '80';
        if(!method)
            method = "GET";

        var index = Math.floor(Math.random()*1000 % Config.ua.length);
        var ua = Config.ua[index];
        var options = {
            hostname : hostname,
            port : port,
            path : path,
            headers: {
                "User-Agent" : ua
            },
            method : method
        };

        var req = Http.request(options, function(res){
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
        var url_info = Url.parse(url);
        this.get(parser_f, url_info["host"], url_info["path"],method, url_info["port"]);
    }
};

module.exports = Gather;
