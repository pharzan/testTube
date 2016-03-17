var port = 8000,
    slimerjs = require('node-phantom-simple'),
    test = require('./engine.js'),
    PubSub = require('./pubsub.js'),
    // server = http.createServer(),
    jsons = require('./data.js'),
    jsonFileCounter = 0,
    testSetCounter = 0,
    loopCounter = 0,
    stepPromise, networkResponses = [],
    testTube, networkBeaker,
    networkArraySize = 2;

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

function networkTap(){
    return new Promise(function(resolve){
	globalData.page.onResourceReceived = function(response, networkRequest) {
	
        if (response.stage == 'end') {
            if (response.url.indexOf('question_service') != -1 && response.bodySize != 0) {
		
                response.body = JSON.parse(response.body);
                if (networkResponses.length >= networkArraySize) {
                    // networkResponses.pop();
                    networkResponses.shift();
                    // test.Global.networkResponses.pop();
                    test.engineGlobal.networkResponses.shift();
                }
                networkResponses.push(response.body);
                test.engineGlobal.networkResponses.push(response.body);
                
		
            }
        }
    }
	return resolve('done');
				 })
};

function startBrowser(url) {
    return new Promise(function(resolve) {
        slimerjs.create({
            path: require('slimerjs').path,
	    encoding:'UTF-8'
        }, function(err, sl) {
            return sl.createPage(function(err, page) {
                return new Promise(function(resolve, reject) {
		    console.log(sl)
		    sl.get('encoding',function(err,val){
			console.log(val)
		    })
		    sl.outputEncoding = "utf-8";
		    globalData.page=page;
		    networkTap();
                    page.open(url, function(err, status) {
			
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
		    globalData.testTubeKey=step.tag;
                    return testTube = test.getElementContent(step.tag, page);
                case 'getNetworkContent':
		    globalData.beakerKey=step.key;
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
			     page.get('canGoBack',function(err,canGoBack){
                                 if(canGoBack)
                                     page.goBack();
				 else{
				     test.log('fail','can\'t GO back in history');
				     
				 }
                                 wait(100).then(function() {
                                     return resolve('done');
                                 });
                             });
			 });
                        });
		    break;
                    case 'historyForward':
                     return new Promise(function(resolve) {
                         return wait(50).then(function() {
			     page.get('canGoBack',function(err,canGoForward){
				 if(canGoForward)
                                     page.goForward();
				 else{
				     test.log('fail','can\'t GO forward in history');
				 }
				 
                                 wait(50).then(function() {
                                     return resolve('done');
                                 });
                             });
			 })
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
                    if (typeof step.des !== 'undefined'){
			
			globalData.currentStepDescription=step.des;
                        test.log('des', step.des);
		    }
                    return wait(10).then(function() {
                        return stepSwitchCheck(step, page);
                    });
                });
            }
        });
    });
};

function start() {
    var testSet = testSets[testSetCounter];
    var testSteps = test.load(testSet[jsonFileCounter].testFile);
    
    run(testSteps);

    p2 = PubSub.subscribe('testStepsComplete', function() {
	jsonFileCounter++;
	if(typeof testSet[jsonFileCounter]!=='undefined' && testSet[jsonFileCounter].status=='testSetComplete'){
	    PubSub.publish('nextSet');
	}else
	{testSteps= test.load(testSet[jsonFileCounter].testFile);
    	test.log('next','Next testFile--------------------------------------------------------' );
	 run(testSteps);}
    });
    
    p3 = PubSub.subscribe('nextSet', function() {
	
	testSetCounter++;
	//set current testSet
	testSet=testSets[testSetCounter];
	jsonFileCounter=-1;
    	test.log('next','Next Set of TestFiles-----------------------------------------------');
	
	
	if(typeof testSet === 'undefined'){
	    test.log('blink','ALL DONE');
	}else{
	    PubSub.publish('testStepsComplete');
	}
    });
};


var testSets = [

    jsons.networkAnswerCheck,
    
    jsons.networkTimerCheck,
    jsons.leftPlayCycle,
    jsons.checkViewsIncrease,
    jsons.rightPlayCycle,

    jsons.timerOutPlayCycle,

    //Timeout then check url to see if changed
    jsons.selectSubtitles,
    jsons.getUrlContent,
    jsons.clickNext,
    jsons.getUrlContent,
    jsons.compareTestTubesFail,

    //play then check url to see if changed
    jsons.selectSubtitles,
    jsons.getUrlContent,
    jsons.selectLeft,
    jsons.clickNext,
    jsons.getUrlContent,
    jsons.compareTestTubesFail,

    //play with subtitles and check if subtitles is shown
    jsons.subtitlesDisabled,
    
    // //check infopanel functionality:---------------------
    jsons.selectSubtitles,
    jsons.panelClick,
    jsons.selectLeft,
    jsons.clickNext,
    
    //history checks----------------------
    
    jsons.rightPlayCycle,
    jsons.urlHistory,
    jsons.leftPlayCycle,
    jsons.urlHistory,

    jsons.rightPlayCycle,
    jsons.getUrlContent,
    jsons.rightPlayCycle,
    jsons.getUrlContent,
    jsons.compareTestTubesFalse,

    jsons.rightPlayCycle,
    jsons.getUrlContent,
    jsons.goBack,
    jsons.goForward,
    jsons.goBack,
    jsons.goForward,
    jsons.goBack,
    jsons.goForward,
    jsons.getUrlContent,
    jsons.compareTestTubes,

    //play > get url > go back, go back > get url > see if the urls aren't the same
        jsons.rightPlayCycle,
        jsons.getUrlContent,
        jsons.goBack,
        jsons.goBack,
        jsons.getUrlContent,
    jsons.compareTestTubesFalse,
	
    
    //correctAnswer Cycle
    jsons.selectSubtitles,

    jsons.correctAnswerClick,
    
    //titlebar Components check
    jsons.checkTitleBarComponents,

    //products tests
    jsons.productsTestSet_Red,
    jsons.rightPlayCycle,
    jsons.urlCheckRed,

    jsons.productsTestSet_Green,
    jsons.rightPlayCycle,
    jsons.urlCheckGreen,

    jsons.productsTestSet_Yellow,
    jsons.rightPlayCycle,
    jsons.urlCheckYellow,

    jsons.azeriSelect,
    jsons.urlCheckAZ,
    jsons.rightPlayCycle,
    jsons.urlCheckAZ,
    jsons.rightPlayCycle,

    

];

var page;

function sendData() {
    io.emit('time', {
        time: new Date().toJSON(),
	data:globalData,
	currentUrl:test.engineGlobal.currentUrl,
	oldUrl:test.engineGlobal.oldUrl,
	testTube:test.engineGlobal.testTube,
	oldTestTube:test.engineGlobal.oldTestTube,
	beaker:test.engineGlobal.networkBeaker,
	stepDescription:globalData.currentStepDescription,
	beakerKey:globalData.beakerKey,
	testTubeKey:globalData.testTubeKey,
	messagePool:test.engineGlobal.messagePool
    });
    // console.log(globalData.currentStepDescription)
}

// Send current time every 10 secs
setInterval(sendData, 50);

var url='http://dev.fev1/';

    startBrowser(url).then(function() {
    page=globalData.page;
    console.log('browser Started');
    
    globalData.page.set('viewportSize', {
        width: 1200,
        height: 750
    });
    
    test.urlWatcher.start(globalData.page,250);
    
    setTimeout(function(){
	start();},1000)

	page.onConsoleMessage = function(msg, lineNum, sourceId) {
	    
  console.log('SLIMER CONSOLE: ' + msg );
};
//     setTimeout(function(){
// 	page.evaluate(function(){
// 	    console.log("!!!!!!!!!!!!!"+document.body.children);
// 	    return document.body.children[0];
// 	},function(err,val){
// 	    console.log("^^^^^^^^",val)
// 	});
	
//     },1000)

});
