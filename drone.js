var Gather = require("./Gather");
var Parser = require("./Parser");
var $ = require("jQuery");

var Drone = function(options){
    var _drone = $.extend({
        type : "",
        url  : "",
        host : "",
        path : "",
        port : "",
        method  : "",
    },options);

    _drone.get_parser = function(){
        if(this.type=="taobao_shop")
            return Parser.parse_taobao_shop;
        return null;
    };
    _drone.work = function(){
        var parser = this.get_parser();
        if(!parser){
            hatchery.kill_drone(this);
            return false;
        }
        if(this.host)
            Gather.get(parser, this.host, this.path, this.method, this.port);
        else if(this.url)
            Gather.get_url(parser, this.url, this.method);
    };

    return _drone;
};

module.exports = Drone;
