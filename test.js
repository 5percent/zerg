var http = require("http");

var options={
    hostname:'www.guoku.com',
    port:'80',
    path:'/selected/',
    headers: { 
        "User-Agent": "Firefox 22/Windows: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:22.0) Gecko/20100101 Firefox/22.0"
    }, // todo: ua list for changing
    method:'GET'
};
var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
req.write('data\n');
req.end();

