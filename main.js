var port = 8000,
    slimerjs = require('node-phantom-simple'),
    test = require('./engine.js'),
    // server = http.createServer(),
    jsons = require('./data.js'),
    jsonFileCounter = 0,
    testSetCounter = 0,
    loopCounter = 0,
    stepPromise, networkResponses = [],
    testTube, networkBeaker,
    networkArraySize = 2;
    //historySet = require('./testSets/historySet.js');



//server.listen(port);

var http = require('http'),
    fs = require('fs'),

    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/report/index.html'),

    // Send index.html to all requests
    app = http.createServer(function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(index);
    }),

    // Socket.io server listens to our app
    io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', {
        time: new Date().toJSON()
    });
}

// Send current time every 10 secs
setInterval(sendTime, 1);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', {
        time: new Date().toJSON(),
        message: 'Welcome!',
        id: socket.id
    });
    socket.on('i am client', console.log);
});

app.listen(3000);
var globalData = {};

function startBrowser(url) {
    return new Promise(function(resolve) {
        slimerjs.create({
            path: require('slimerjs').path
        }, function(err, sl) {
            return sl.createPage(function(err, page) {
                return new Promise(function(resolve, reject) {
                    page.open(url, function(err, status) {
			
			globalData.page=page;
			
			if (status == "success") {
                            console.log('Success: page opened');
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
    });

}

function run(testSteps) {
    return new Promise(function(resolve) {
	
        testSteps.map(function(step) {
            function stepSwitchCheck(step, page) {
		

	
                switch (step.action) {
                case 'waitForVisibility':
		    
                        return test.waitForVisibility(step.tag, page);
		    case 'click':
                        return test.clickClass(step.tag, page);
                    case 'focus':
                        return test.focusClass(step.tag, page);
                    case 'sendKeys':
                        return test.sendKeys(step.tag, step.key, page);
                    case 'getElementContent':
                        return testTube = test.getElementContent(step.tag, page);
                    case 'getNetworkContent':
                        return networkBeaker = test.getNetworkContent(networkResponses, step.key);
                    case 'getUrlContent':
                        return testTube = test.getUrlContent(page);
                    case 'compareTestTubeBeaker':
                        return test.compareTestTubeBeaker();
                    case 'waitPlaybackEnd':
                        return test.onPlaybackEnded(page, step.callback);
                    case 'waitPlaybackStart':
                        return test.onPlaybackStart(page, step.callback);
                    case 'searchAndClickFromBeaker':
                        return test.searchAndClickFromBeaker(page);
                    case 'compareTestTubes':
                        return test.compareTestTubes(step.expect);
                    case 'wait':
                        return test.wait(step.key);
                    case 'compare':
                        return test.compare(step.arg0, step.arg1, step.type, step.expect);
                    case 'reload':
                        return new Promise(function(resolve) {
                            return wait(50).then(function() {
                                page.reload();
                                wait(50).then(function() {
                                    return resolve('done');
                                });
                            });
                        });
                    break;
		    return test.wait(step.key);
                    case 'historyBack':
                     return new Promise(function(resolve) {
                            return wait(50).then(function() {
                                 if(page.canGoBack)
                                 page.goBack();
			     else{
				 test.log('fail','can\'t GO back in history');
				 
			     }
                                wait(100).then(function() {
                                    return resolve('done');
                                });
                            });
                        });
		    break;
                    case 'historyForward':
                     return new Promise(function(resolve) {
                         return wait(50).then(function() {
			     if(page.canGoForward)
                                 page.goForward();
			     else{
				 test.log('fail','can\'t GO forward in history');
			     }
				 
                                wait(50).then(function() {
                                    return resolve('done');
                                });
                            });
                        });
		    break;
                };
            };

            if (typeof(stepPromise) == 'undefined') {
		
                stepPromise = stepSwitchCheck(step, page);
            } else {
                stepPromise = stepPromise.then(function(msg) {
                    if (step.action == 'done') {
                        PubSub.publish('testStepsComplete');
                        return resolve('done');
                    }
                    if (typeof step.des !== 'undefined')
                        test.log('des', step.des);
                    return wait(10).then(function() {
                        return stepSwitchCheck(step, page);
                    });
                });
            }
        });
    });
};

function wait(t) {
    return new Promise(function(resolve) {;
        var i = 0;
        var inter = setInterval(function() {
            i++;
            if (i == 10) {
                clearInterval(inter);
                return resolve('done'); // Note we're not returning `p` directly
            }
        }, t);
    });
}

function start() {
    var testSet = testSets[testSetCounter];
    var testSteps = test.load(testSet[jsonFileCounter].testFile);
    run(testSteps);

    p2 = PubSub.subscribe('testStepsComplete', function() {
	jsonFileCounter++;
	if(testSet[jsonFileCounter].status=='testSetComplete'){
	    PubSub.publish('nextSet');
	}else
	{testSteps= test.load(testSet[jsonFileCounter].testFile);
    	test.log('info','Next testFile--------------------------------------------------------' );
	 run(testSteps);}
    });
    
    p3 = PubSub.subscribe('nextSet', function() {
	testSetCounter++;
	//set current testSet
	testSet=testSets[testSetCounter];
	jsonFileCounter=-1;
    	test.log('info','Next Set of TestFiles-----------------------------------------------');
	PubSub.publish('testStepsComplete');
	if(testSets.length==testSetCounter){
	    test.log('blink','ALL DONE');
	}
    	
    });


};

var testSets = [
    jsons.leftPlayCycle
];

var page;
var url='http://dev.fev1/';
startBrowser(url).then(function() {
    page=globalData.page;
    console.log('browser Started');
    globalData.page.set('viewportSize', {
        width: 1200,
        height: 750
    });
    start();
    globalData.onResourceReceived = function(response) {
	// if(response.contentType==='text/html')
        //     console.log(response.contentType,response.body)
    };
});
