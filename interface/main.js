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
var dropDown=require('./components/mithDropDown.js');

var chosenCfg = {
    list: ['brown','apple','red'],
    itemsPerPage: 2,
    sortByName: true,
    styles: {
	width: "200px",
        selectedBackground: 'black',
        selectedForeground: 'white',
        background: 'white',
        foreground: 'black'
    }
};
var MithChosen=require('./components/mithChosen.js');
var chosen=new MithChosen(chosenCfg);

connect();

Global.socket.on('time',function(time){
    console.log(time);
    socket.emit('data',{data:'recieved'});
});

var header=require('./components/header.js').header;
var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(load),
	    m.component(header),
	    m.component(dropDown),
	    m.component(chosen),
	    m('button',{
		onclick:function(){
		    var list=['fasd','afdsfdsa','fasdfdsaf','fasdfsda'];
		    dropDown.update(list);
		    console.log(dropDown.getSelected());
		}
	    },'AA'),
	    m('button',{
		onclick:function(){
		    var newList=['zdsafdsf','fdsafdsa','afarzan','psdddfsafdsfdsaf','_dsa3133135'];
		    dropDown.update(newList);
		    console.log(dropDown.getSelected());
		}
	    },'AA'),
	    
	    m('button',{
		onclick:function(){
		    dropDown.sort();
		    console.log(dropDown.getSelected());
		}
	    },'cc')
	       ];
    }
    
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': main
});

exports.Global=Global;
