var $ = require("jQuery");
var Hatchery = require("./Hatchery");

var MineralField = function(options){
    var _mf = $.extend({
        type          : "taobao_shop",
        shop_id       : "",
        page          : 1, 
        items_count   : 0,
        items_todo    : [],
    },options);

    _mf.get_location = function(){
        var page_str = this.page>1? "&pageNum="+this.page : "";
        return {
            hostname : "shop"+this.shop_id+".taobao.com",
            path     : "/?search=y" + page_str,
            type     : this.type
        };
    },
    _mf.update = function(data){
        this.items_count = parseInt(data.items_num);
        this.items_todo = this.items_todo.concat(data.id_list);
        if(this.items_todo.length < this.items_count)
            this.page++;

        console.log(this);
    }


    return _mf;
};

module.exports = MineralField;
