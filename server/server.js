
var dbService;
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(8000);

io.on('connection',
      function(socket){
	  console.log('server connected...');
	  socket.on('CMD_LOAD',function(data){
	      console.log('Load Command Recieved',data);
	      dbService=require('./dbService.js').init(data);
	      dbService.load().then(function(data){
		  io.emit('data',{data:data});
	      });
	  });
});
