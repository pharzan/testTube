var port = 8000,
    slimerjs = require('node-phantom-simple'),
    //slimerjs=require('node-phantom'),
    test = require('./engine.js'),
    PubSub = require('./pubsub.js'),
    p;

var http = require('http'),
    fs = require('fs');

function start (){
slimerjs.create({
            path: require('slimerjs').path
	    
        }, function(err, sl) {
            return sl.createPage(function(err, page) {
                return new Promise(function(resolve, reject) {
		   
		    sl.get('encoding',function(err,val){
			// console.log(val)
		    })
                    page.open('http://www.google.com', function(err, status) {
			
			if (status == "success") {
                            console.log('Success: page opened');
			    page.onConsoleMessage = function(msg, lineNum, sourceId) {
	    
	    console.log('SLIMER CONSOLE: ' + msg );
			    };
			    var found=encodeURI('Dünyanın en iyi okçularına sahibiz')
			    page.evaluate(function(found) {
	    	    console.log(found);
			    },found,function(err,val){

	    	});



                            return resolve('done');
                        } else {
                            console.log('Failed to open page');
                            return resolve('fail');
                        }
                    });

                }).then(function() {
                    return resolve('done');

                });
            });
        });
}

start()

