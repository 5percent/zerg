var Drone = function(){
    return {};
};

var Overlord = function(){
    return {};
};

var Hatchery = {
    create_drone : function(){
        var drone = new Drone;
        return drone;
    },
    create_overlord : function(){
        var overlord = new Overlord;
        return overlord;
    }
};
module.exports = Hatchery;
