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
socket.on('time', function(data) {
    //console.log(data.time);
    m.startComputation();
    time=data.time;
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
	
	return m('.class',time);
    }
    
};

m.mount(document.body,test);
