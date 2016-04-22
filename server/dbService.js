// var Datastore = require('nedb'),
//     PubSub = require('./lib/pubsub.js'),
//     http = require('http'),
//     fs = require('fs'),
//     url = require('url'),
//     beautify_js = require('js-beautify').js_beautify,
//     main = require('./main.js'),
//     db = {};
// var Global = {
//     steps: '',
//     setCounter:0
// };
// var r = require('request');

// db.steps = new Datastore('data/steps.db');
// db.sets = new Datastore('data/sets.db');
// db.steps.loadDatabase();
// db.sets.loadDatabase();

// function load(dbName, query) {
//     // query={name:'checkTestTubes.json' };
//     var d = db[dbName];
//     return new Promise(function(resolve) {

//         d.find(query, function(err, steps) {
//             if (steps.length == 0)
//                 return resolve('empty');

//             //console.log('DATA SERVICES:: LOADED ',steps.map(function(st){return st.name}));
//             return resolve(steps);

//         });
//     });
// }

// function save(dbName, data) {
    
//     var d = db[dbName];
    
//     d.insert(data, function(err, newDoc) { // Callback is optional
//         // newDoc is the newly inserted document, including its _id
//         // newDoc has no key called notToBeSaved since its value was undefined
//         console.log('inserted');
//     });


// }

// function remove(data) {
//     db.steps.remove({
//         name: 'checkTestTubes.json'
//     }, {}, function(err, numRemoved) {
//         // numRemoved = 1
//         console.log('Number Removed::', numRemoved);
//         console.log('removed')
//     });
// }

// function removeById(dbName, id) {
//     var d = db[dbName];
//     d.remove({
//         _id: id
//     }, {}, function(err, numRemoved) {
//         // numRemoved = 1
//         console.log('Number Removed::', numRemoved);
//         console.log('removed')
//     });
// }

// function updateByName(dbName,name,updateData){
//     var d = db[dbName];
//     d.update({ name: name }, { $set: updateData }, { multi: true }, function (err, numReplaced) {
// 	console.log('updated: ',numReplaced)
//   // numReplaced = 3
//   // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
// });

// }

// function server() {
    
//     http.createServer(function(request, response) {
// 	console.log('in the Server')
//         var responseHeaders = {
//             "access-control-allow-origin": "*",

//             "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS, XMODIFY",
//             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key, Host',
//             'Access-Control-Allow-Headers': ' X-Requested-With, X-HTTP-Method-Override, content-type, Accept, Key,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
//             'Access-Control-Allow-Credentials': true,
//             "Content-Type": "application/json"
//         };

//         response.writeHead(200, responseHeaders);
	
//         if (request.method === "OPTIONS") {
//             // Add headers to response and send
//             response.writeHead(200, responseHeaders);
//             response.end();
//         }

//         var path = url.parse(request.url).pathname;
//         var search = url.parse(request.url).search;
// 	search=decodeURI(search);
//         var answer;
	
//         console.log('path', path);
//         console.log('search', search);

//         if (path == "/steps/") {

//             // console.log("request recieved",search);
//             if (search === '?all') {

//                 load('steps', {}).then(function(steps) {
//                     //console.log('HERE');
//                     response.writeHead(200, responseHeaders);
//                     response.write(JSON.stringify(steps));
//                     response.end();

//                 });
//             }
//             if (search === '?names') {

//                 load('steps', {}).then(function(steps) {

//                     //console.log('NAMES',steps.length);
//                     var names = [];

//                     steps.map(function(step) {
//                         // console.log('!!!!',step.name);
//                         names.push(step.name)
//                     });

//                     response.writeHead(200, responseHeaders);
//                     response.write(JSON.stringify(names));
//                     response.end();

//                 });
//             }
// 	    if (search === '?save'){
		
// 		request.on('data', function(chunk) {
// 		    console.log("Received body data:");
// 		   // console.log(JSON.parse(chunk.toString()));
// 		    var data=JSON.parse(chunk.toString());
// 		    var d=JSON.parse(data)
// 		    console.log('SAVE:: name:',d.name)
// 		    load('steps',{name:d.name}).then(function(result){
// 			if(result==='empty'){
// 			    console.log('data didn\'t exist so going to save it')
// 			    save(d.dataStore,d);
// 			}else{
// 			    console.log('didnt save becuase a name already exists but updated');
// 			    updateByName('steps',d.name,d)
// 			}
// 		    })
// 		    //console.log(d.dataStore)
		    
// 		    response.writeHead(200, responseHeaders);
		    
// 		    response.write(JSON.stringify({status:"OK"}));
// 		    response.end();
// 		});
		
// 		request.on('end', function() {
// 		    // empty 200 OK response for now
// 		    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
// 		    response.end();
// 		});
// 	    }
// 	    if (search === '?delete'){
		
// 		request.on('data', function(chunk) {
// 		    console.log("Received body data:");
// 		   // console.log(JSON.parse(chunk.toString()));
// 		    var data=JSON.parse(chunk.toString());
// 		    var d=JSON.parse(data);
// 		    console.log('delete:: id:',d.id);
// 		    removeById('steps',d.id);
// 		    //console.log(d.dataStore)
		    
// 		    response.writeHead(200, responseHeaders);
		    
// 		    response.write(JSON.stringify({status:"OK"}));
// 		    response.end();
// 		});
		
// 		request.on('end', function() {
// 		    // empty 200 OK response for now
// 		    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
// 		    response.end();
// 		});
// 	    }


//             // response.writeHead(200, {"Content-Type": "text/plain"});
//             // response.end(answer);
            
//         }
// 	else if (path == '/step/') {
//             var query = {
//                 name: search.replace('?', '')
//             };

//             load('steps', query).then(function(res) {
//                 Global.steps = res[0];
//                 console.log('sent step, GLOBAL step set to', Global.steps = res[0].content);
//                 main.globalData.steps = main.globalData.testSteps;
//                 response.write(JSON.stringify(res[0]));
//                 response.end();
//             });

//         }
// 	else if (path == '/sets/') {
//             if (search === '?names') {
//                 var names = [];
//                 var query = {};
//                 load('sets', query).then(function(res) {
//                     res.map(function(r) {
//                         names.push(r.name);
//                     });
//                     console.log('sent step, GLOBAL step set to');
//                     response.write(JSON.stringify(names));
//                     response.end();
//                 });
//             }
//             if (search === '?all') {
//                 var names = [];
//                 var query = {};
//                 load('sets', query).then(function(res) {
//                     res.map(function(r) {
//                         names.push(r);
//                     });
//                     console.log('sent step, GLOBAL step set to');
//                     response.write(JSON.stringify(names));
//                     response.end();
//                 });
//             }
// 	    if (search === '?save'){
		
// 		request.on('data', function(chunk) {
// 		    console.log("Received body data:");
// 		   // console.log(JSON.parse(chunk.toString()));
// 		    var data=JSON.parse(chunk.toString());
// 		    var d=JSON.parse(data)
// 		    console.log('SAVE:: name:',d.name)
// 		    load('sets',{name:d.name}).then(function(result){
// 			console.log("&&&&",data)
// 			if(result==='empty'){
// 			    console.log('data didn\'t exist so going to save it')
// 			    save('sets',d);
// 			}else{
// 			    console.log('didnt save becuase a name already exists but updated');
// 			    updateByName('sets',d.name,d)
// 			}
// 		    })
// 		    //console.log(d.dataStore)
		    
// 		    response.writeHead(200, responseHeaders);
		    
// 		    response.write(JSON.stringify({status:"OK"}));
// 		    response.end();
// 		})
// 	    }
	    
//         }
// 	else if (path == '/set/') {
//             query = {
//                 name: search.replace('?', '')
//             };
//             console.log('query:::', query);
//             load('sets', query).then(function(res) {

//                 console.log('sent step, GLOBAL step set to', Global.set = res[0].content);
//                 main.globalData.testSet = res[0].content;
//                 response.write(JSON.stringify(res[0]));
//                 response.end();
//             });
//         }
	
// 	else if (path == '/play/') {
	    
//             if (search === '?set') {
//                 console.log('going for a set play');
//                 main.reloadBrowser();
// 		request.on('data', function(chunk) {
// 		    console.log("Received body data:");
// 		   // console.log(JSON.parse(chunk.toString()));
// 		    var data=JSON.parse(chunk.toString());
		     
// 		    console.log('data:',data);
// 		    main.reloadBrowser();
// 		    var setCounter=0;
// 		    var steps=load('steps',{name:data[setCounter].name}).then(function(res){
// 			console.log(data[setCounter].repetition);
// 			console.log(data[setCounter].name);
// 			for(var i=0;i<=data[setCounter].repetition;i++){
// 			    main.run(res[0].content);}
// 			response.writeHead(200, responseHeaders);
// 			response.write(JSON.stringify({status:"OK"}));
// 			response.end();
// 		    });
// 		    var p2 = PubSub.subscribe('testStepsComplete', function() {
// 			setCounter++;
			
// 			if(setCounter==data.length){   
// 			    PubSub.clearAllSubscriptions();
// 			    console.log('--------------- SET DONE -------',setCounter);
// 			    return;
// 			}else{
// 			    steps=load('steps',{name:data[setCounter].name}).then(function(res){
// 				for(var i=0;i<=data[setCounter].repetition;i++){
// 				    main.run(res[0].content);}
// 			});
// 			}
// 			console.log('------TEST STEPS COMPLETE-----SetCounter::',setCounter);
			
			
			
// 		    });
// 		    //main.run(data[setCounter]);
// 		    main.run(steps);
		    
// 		});
//                 // console.log(Global.step);
//                 // main.run(Global.steps);
//                 //main.start();
//                 // response.writeHead(200, responseHeaders);
//                 // response.end();
//             }
	
// 	    else if (search === '?steps') {
//                 console.log('going for a step play');
//                 main.reloadBrowser();
//                 // console.log(Global.step);
		
//                 main.run(Global.steps);

//                 //main.start();
//                 response.writeHead(200, responseHeaders);
//                 response.end();
//             }
// 	    else if (search === '?close') {
//                 main.globalData.page.close();
//                 main.exit();
//                 response.writeHead(200, responseHeaders);
//                 response.end();
//             }
// 	    else if (search.indexOf('?start') != -1) {

//                 var navigationUrl = search.split(',')[1];
//                 console.log('navigate to:', navigationUrl);
//                 main.startBrowser(navigationUrl);
//                 response.writeHead(200, responseHeaders);
//                 response.end();

//             }

//             //main.startBrowser(url)

//         }
	
// 	else if(path=='/getDom/'){
// 	    console.log(beautify_js(main.globalData.domJson))
// 	    response.write(beautify_js(main.globalData.domJson));
	
//                 response.end();
// 	}
// 	else {
//             fs.readFile('./index.html', function(err, file) {
//                 if (err) {
//                     // write an error response or nothing here  
//                     return;
//                 }
//                 response.writeHead(200, {
//                     'Content-Type': 'text/html'
//                 });
//                 response.end(file, "utf-8");
//             });
//         }
//     }).listen(8001);
//     console.log("server initialized");

// }

// module.exports = {
//     server: server,
//     load: load,
//     save: save,
//     remove: remove,
//     removeById: removeById
// };


var Datastore = require('nedb'),
    fs = require('fs'),
    db = {};



function dbService (cfg){
    
    if (!(this instanceof dbService)) {
    return new dbService(cfg);
    }
    
    this.dbPath=cfg.path;
    
    /*
     Constructor:
     */
    this.db=new Datastore({filename:this.dbPath, autoload: true });
    this.db.loadDatabase(function(err){
	console.log(err)
    });
    
    
};

dbService.prototype.load=function(query){
    var self=this;
    return new Promise(function(resolve) {
        self.db.find(query, function(err, result) {
            if (result.length == 0){
                return resolve('empty');	 
	    }
	    console.log('data Fetched',result);
	    return resolve(result);
	    
        });
    });
};

dbService.prototype.save=function (data) {
    
    this.db.insert(data, function(err, newData) { // Callback is optional
	        // newDoc is the newly inserted document, including its _id
	        // newDoc has no key called notToBeSaved since its value was undefined
	console.log('inserted');
	    });

};

dbService.prototype.update=function(data,options){

};

dbService.prototype.updateByKey=function (existing,updateData){
    /*
     inserts or updates existing fields:
     first argument is the existing data the second is the one to be updated or to be inserted 
     */
    this.db.update(existing, { $set: updateData }, { multi: true }, function (err, numReplaced) {
	console.log('updated: ',numReplaced);
	// numReplaced = 3
	// Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
    });

};

dbService.prototype.removeByKey=function(data){
    this.db.remove(data, {}, function(err, numRemoved) {
        console.log('Number Removed::', numRemoved);
        console.log('removed');
    });
};

function load(dbName, query) {
    // query={name:'checkTestTubes.json' };
    var d = db[dbName];
    return new Promise(function(resolve) {


        d.find(query, function(err, steps) {
            if (steps.length == 0)
                return resolve('empty');
	    var data=[];
	    steps.map(function(st) {
                return data.push(st)
            })
	    for(var i=0;i<data.length;i++){
		console.log('-------------------------------'+i+'\n\r',data[i] );

	    }
	    
            return resolve(steps);

        });
    });
}

function existsInDB(dbName, name) {
    return new Promise(function(resolve){
	var d = db[dbName];
	var query={name:name};
	d.find(query, function(err, steps) {
            if (steps.length == 0)
		return resolve(false)
	    else
		return resolve(true)
	    
            

	});
    })
    
}

function updateByName(name,updateData){
    
    db.steps.update({ name: name }, { $set: updateData }, { multi: true }, function (err, numReplaced) {
	console.log('updated: ',numReplaced)
  // numReplaced = 3
  // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
});

}

function remove(data) {
    db.steps.remove({
        name: 'checkTestTubes.json'
    }, {}, function(err, numRemoved) {
        // numRemoved = 1
        console.log('Number Removed::', numRemoved);
        console.log('removed')
    });
}

function removeById(dbName, id) {
    var d = db[dbName];
    d.remove({
        _id: id
    }, {}, function(err, numRemoved) {
        // numRemoved = 1
        console.log('Number Removed::', numRemoved);
        console.log('removed')
    });
}

function loadFromFile(file) {

    var content = fs.readFileSync('./' + file, 'utf8', function(err, data) {
        return data;
    });

    var testSteps = JSON.parse(content);
    console.log('FileLoader:: ', testSteps[0].description);
    return testSteps;

};

function dataBuilder(content,fileName){
    
    var data= { name: fileName
            , dataStore:'data/steps.db'
            , content: content
	    , categoery:'products'
            , infos: { cretaedBy: 'pharzan',
	    	       time: new Date()
	    	     }
               };
    console.log('DataBuilder:: DataCreated');
    return data;
};


exports.init=dbService
