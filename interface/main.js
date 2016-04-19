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

var MythDropDown=function(list)  {
    if(Array.isArray(list))
	this.list=list;
    else
	list=[];
    if (!(this instanceof MythDropDown)) 
	return new MythDropDown(list);
    
    var self=this;
    this.selected={};
    this.list=list;
};

MythDropDown.prototype.view= function(ctrl) {
        var self = this;

        // (typeof ctrl.list === 'undefined') ? ctrl.mappable = false: ctrl.mappable = true;
        return m('select', {
                config: function(selectElement, isinit) {
                    if (isinit)
                        return;
                    self.selectElement = selectElement;
                    self.selectElement.selectedIndex=0;
		    self.selected.name=list[0];
		    self.selected.index=0;
                },
            onchange: function(e) {
                self.selected.name = e.target.value;
		self.selected.index=e.target.selectedIndex;
		console.log(self.selected);
                }
            },

            this.list.map(function(name, i) {
                return m('option', name);
            }));
    };

MythDropDown.prototype.getSelected=function(){
	return (this.selected);
};

MythDropDown.prototype.updateList=function(newList){
	console.log(this.selectElement)
	this.list=newList;
	this.selectElement.selectedIndex=0;
	this.selected.name=newList[0];
	this.selected.index=0;
};

MythDropDown.prototype.sort=function(){
    this.list.sort();
    this.updateList(this.list);
};



var list=['dafssaf'];
var l1=new MythDropDown(list);
var header=require('./components/header.js').header;
var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(header),
	    m.component(load),m.component(l1),
	    m('button',{
		onclick:function(){
		    var list=['fasd','afdsfdsa','fasdfdsaf','fasdfsda'];
		    l1.updateList(list);
		    console.log(l1.getSelected());
		}
	    },'AA'),
	    m('button',{
		onclick:function(){
		    var newList=['zdsafdsf','fdsafdsa','afarzan','psdddfsafdsfdsaf','_dsa3133135'];
		    l1.updateList(newList);
		    console.log(l1.getSelected());
		}
	    },'AA'),
	    
	    m('button',{
		onclick:function(){
		    l1.sort();
		    console.log(l1.getSelected());
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
