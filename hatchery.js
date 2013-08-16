var Drone = require("./Drone");
var Overlord = require("./Overlord");

var Hatchery = function(){
    return _hatchery.get();
};

var _hatchery = {
    obj : null,
    init : function(){
        this.obj = {
            support : 0,
            create_overlord : function(){
                var overlord = new Overlord();
                return overlord;
            },
            create_drone : function(options){
                var drone = new Drone(options);
                this.support++;
                return drone;
            },
            kill_drone : function(drone){
                this.support--;
            }
        };
    },
    get : function(){
        if (!this.obj) 
            this.init();

        return this.obj;
    }
};

hatchery = new Hatchery();
var drone = hatchery.create_drone({url:"http://pc-trend.taobao.com/search.htm?spm=a1z10.3.w1017-2942140716.79.KI2EZX&search=y&viewType=grid&orderType=_hotsell&pageNum=1#anchor", type:"taobao_shop"});
drone.work();

module.exports = Hatchery;
