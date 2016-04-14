var Server=function(){
    var self=this;
    var dbService;
    
    if (!(this instanceof Server)) {
    return new Server();
    }
    this.start=function(){
	self.server = require('http').createServer();
	self.server.listen(8000);
	this.io = require('socket.io').listen(this.server);
	
    this.io.on('connection',
	  function(socket){
	      console.log('server connected...');
	      
	      socket.on('CMD_LOAD',function(data){
		  console.log('Load Command Recieved',data);
		  dbService=require('./dbService.js').init(data);
		  dbService.load().then(function(data){
		      self.io.emit('data',{data:data});
		  });
	      });

	      socket.on('data',function(data){
		  console.log(data);
	      });
	  });
	
    };
     
};
Server.prototype.emit=function(name,d){
	this.io.emit(name,d);
    };

exports.Server=Server;
