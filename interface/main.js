var socket;
var firstconnect = true;

function connect() {
    if(firstconnect) {
        socket = io.connect('http://dev.testtube:8000');

        socket.on('serverMessage', function(data){ message(data); });
        socket.on('connect', function(){ console.log("Connected to Server"); });

        firstconnect = false;
    }
    else {
        socket.socket.reconnect();
    }
}

connect();


