var socket;
var firstconnect = true;
var Global={server:''};
function connect() {
    if(firstconnect) {
        Global.socket = io.connect('http://dev.testtube:8000');
        Global.socket.on('serverMessage', function(data){ message(data); });
        Global.socket.on('connect', function(){ console.log("Connected to Server"); });

        firstconnect = false;
    }
    else {
        Global.socket.socket.reconnect();
    }
}

connect();

Global.socket.on('time',function(time){
    console.log(time)
    socket.emit('data',{data:'recieved'})
});
var header=require('./components/header.js').header;

var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(header),
	    m.component(load)
	       ];
    }
    
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': main
});

exports.Global=Global;
