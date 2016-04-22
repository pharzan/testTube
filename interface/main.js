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
var MithDropDown=require('./components/mithDropDown.js');
var dropDown2= new MithDropDown();

dropDown2.update(['apple','banana','orange']);

var chosenCfg = {
    list: ['brown','apple','red'],
    itemsPerPage: 100,
    sortByName: true,
    styles: {
	width: "500px",
        selectedBackground: 'black',
        selectedForeground: 'white',
        background: 'white',
        foreground: 'black'
    }
};

var MithChosen=require('./components/mithChosen.js').MithChosen;

var chosen=new MithChosen(chosenCfg);

connect();

Global.socket.on('time',function(time){
    console.log(time);
    Global.socket.emit('data',{data:'recieved'});
    
});
Global.socket.on('messageToClient',function(data){
    console.log(data);
    switch(data.type){
    case 'updateLoad':
	var array=[];
	data.data.map(function(d){
				  array.push(d.content[0].description)
				  
	});
	console.log(data.data)
	chosen.update(array);
	break;
    }

});

var header=require('./components/header.js').header;
var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(load),
	    m.component(header),
	    m.component(chosen),
	    m('','some content')
	       ];
    }
    
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': main
});
exports.MainGlobal=Global;

