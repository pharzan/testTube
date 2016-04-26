var Global={data:''};
var Server=function(){
    var responseHeaders= {"access-control-allow-origin": "*",
			      "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS, XMODIFY",
			      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key, Host',
			  'Access-Control-Allow-Headers': ' X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
			  'Access-Control-Allow-Credentials': true,
			  "Content-Type": "application/json"};
    var self=this;
    var dbService,
	url = require('url');
    
    if (!(this instanceof Server)) {
    return new Server();
    }
    
    this.start=function(){
	self.server = require('http').createServer(function(request,response){
	    var realUrl = (request.connection.encrypted ? 'https': 'http') + '://' + request.headers.host + request.url;
	    var urlParts = url.parse(realUrl,true);
	    var search=urlParts.search;
	    
	    urlParts.search=decodeURI(urlParts.search);
	    var result=_pathFinder(urlParts,request,response);

	});
	self.server.listen(8000);
	
	this.io = require('socket.io').listen(this.server);
	
    this.io.on('connection',
	  function(socket){
	      console.log('Server Connected...');
	      //setInterval(function(){self.io.emit('time',{data:new Date()});},1000)
	      socket.on('CMD_LOAD',function(data){
		  console.log('Load Command Recieved',data);
		  
	      });

	      
	      socket.on('data',function(data){
		  console.log(data);
	      });
	  });


	var _pathFinder=function(urlParts,req,res){
	    if (req.method === "OPTIONS") {
		res.writeHead(200, responseHeaders);
		res.end();
            }
	    if(req.method==='GET'){
		_routeGet(urlParts,req,res);
		
	    }else if (req.method==='POST')
	    {
		_routePost(urlParts,req,res);
	    }
	}

	var _routePost=function(urlParts,req,res){
	    
	    req.on('data', function(chunk) {
		   
		var data=JSON.parse(chunk);
		if(typeof data=='string')
		    data=JSON.parse(data);
		// console.log('Data Received::',data);
		if (data.command){
		    switch(data.command){
		    case "getDataBaseList":
			console.log(' get DBs List');
			res.writeHead(200, responseHeaders);
			var dbList=['/home/pharzan/dev/www/testTube/data/sets.db',
	      			    '/home/pharzan/dev/www/testTube/data/steps.db'];
			res.write(JSON.stringify({response:dbList}));
			res.end();
			break;
			case "loadDatabase":
			console.log(' load DBs List',data.dbName.name);
			
			res.writeHead(200, responseHeaders);
			dbService=require('./dbService.js').init({path:data.dbName.name});
			dbService.load({}).then(function(data){
			    Global.data=data;
			    
			    res.writeHead(200, responseHeaders);
			    res.write(JSON.stringify({status:'ok',response:data}));
			    res.end();
			});
			
			break;
		    default:
			console.log('command not found');
			break;
		    }
		}
		else{
		    res.writeHead(200, responseHeaders);
		    res.write(JSON.stringify({message:'hi'}));
		    res.end();
		}
	});
	    //res.end();	
	};

	var _routeGet=function(urlParts,req,res){
	    res.writeHead(200, responseHeaders);
	    switch(urlParts.pathname){
	    case '/kitty':
		break;
	    default:
		res.end();
		break;
		}
	};
    };
     
};

Server.prototype.emit=function(name,d){
	this.io.emit(name,d);
    };

exports.Server=Server;
