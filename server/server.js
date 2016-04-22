var Global;
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
	      console.log('Server Connected...');
	      //setInterval(function(){self.io.emit('time',{data:new Date()});},1000)
	      socket.on('CMD_LOAD',function(data){
		  console.log('Load Command Recieved',data);
		  dbService=require('./dbService.js').init(data);
		  dbService.load().then(function(data){
		      self.io.emit('messageToClient',{
			  type:'updateLoad',
			  data:data});
		      Global.Data=data;
		  });
	      });

	      socket.on('CMD_GET_DBS',function(data){
		  socket.emit('CMD_SET_DBS',{dbsArray:['/home/pharzan/dev/www/testTube/data/sets.db',
						       '/home/pharzan/dev/www/testTube/data/steps.db']
					     
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
