var socket = io('http://127.0.0.1:3000');
var time='hi';
socket.on('welcome', function(data) {
    //addMessage(data.message);
    
    // Respond with a message including this clients' id sent from the server
    socket.emit('i am client', {
        data: 'foo!',
        id: data.id
    });
});
var globals={};
socket.on('time', function(data) {
    //console.log(data.time);
    m.startComputation();
    time=data.time;
    globals=data;
    
    m.endComputation();
    //addMessage(data.time);
    
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

// function addMessage(message) {
//     var text = document.createTextNode(message),
//         el = document.createElement('li'),
//         messages = document.getElementById('messages');
//     m.startComputation();
    
//     time=text;
//     m.endComputation();
    
//     //el.appendChild(text);
//     //messages.appendChild(el);
// }

var test={
    view:function(){
	return m('',m('.class',time),
		 m.component(description),
		 m.component(url),
		 m.component(testTube),
		 m.component(beaker)
		);
    }
};

var url={
    view:function(){
	
	return m('',
		 m('',m('a',{href:globals.currentUrl},
			m('img',{src:'./img/link.png'}),globals.currentUrl)),
		 m('',m('a',{href:globals.oldUrl},
			m('img',{src:'./img/linkGrey.png'}),globals.oldUrl))
		);
    }
};

var testTube={
        view:function(){
	    return m('',
		     
		       m('img',{src:(globals.testTube!=='')?'./img/testTube.png':'./img/testTubeEmpty.png'}
			   
		       ),globals.testTube,
		     m('img',
		       {src:(globals.oldTestTube!=='')?'./img/testTube.png':'./img/testTubeEmpty.png'}
		      ),globals.oldTestTube);
		     
    }

};

var beaker={
    view:function(){
	
	if(typeof globals.beaker !=='undefined')
	    var mappable=true;
	return m('',mappable?globals.beaker.map(function(beakerContent){
	    return  m('.beaker',m('img',
		       {src:'./img/beaker.png'}
				 ),beakerContent)

	    
       }):null);
		     
		     
    }
};

var description={
    view:function(){
	return m('',
		 m('','Current step description:'),
		 m('',globals.stepDescription),m.component(descriptionHistory)
		)
		 
	
    }
}

var descriptionHistory={
    controller:function(){
	var self=this;
	this.descriptionHistory=[];
	setInterval(function(){
	    var length=self.descriptionHistory.length;
	    if(self.descriptionHistory[length-1]!==globals.stepDescription){
		self.descriptionHistory.push(globals.stepDescription);
		
	    }
	    
	},10);

    },
    view:function(ctrl){
	var self=this;
	return m('',
		 m('','Step History:'),
		 m('.historyBox',
		   ctrl.descriptionHistory.map(function(description,i){
		       return m('',
				m('span',i+')'),
				m('span',description)
			       );
		   })
		  )
		);
	
    }
    
};
m.mount(document.body,test);







