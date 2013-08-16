var $ = require("jQuery");

var Parser = {
    parse_taobao_shop : function(html){
        var id_list = [];
        $(html).find(".shop-list div.pic a").each(function(){
            var href = this.href;
            var start = href.indexOf("id=") + 3;
            var end = href.indexOf("&", start);
            if(end == -1)
                var id = href.slice(start);
            else
                var id = href.slice(start, end);
            id_list.push(id);
        });
    }
};
module.exports = Parser;
