var port = 8000,
    slimerjs = require('node-phantom-simple'),
    //slimerjs=require('node-phantom'),
    test = require('./engine.js'),
    PubSub = require('./pubsub.js'),
    Parse = require('parse/node').Parse,
    // server = http.createServer(),
    jsons = require('./data.js'),
    beautify_js = require('js-beautify').js_beautify,
    BROWSER,
    loopCounter = 0,
    stepPromise, networkResponses = [],
    testTube, networkBeaker,
    networkArraySize = 2,
    dbService = require('./dbService.js'),
    http = require('http'),
    fs = require('fs'),

    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/interface/index.html'),

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
globalData.jsonFileCounter = 0,
globalData.testSetCounter = 0;
globalData.setCounter=0;

function networkTap() {
    return new Promise(function(resolve) {
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
            path: require('slimerjs').path

        }, function(err, sl) {
            return sl.createPage(function(err, page) {
                return new Promise(function(resolve, reject) {


                    sl.outputEncoding = "utf-8";
                    globalData.page = page;
                    networkTap();
                    page.open(url, function(err, status) {
                        page.evaluate(function() {
                            var initElement = document.getElementsByTagName("html")[0];
                            var json = mapDOM(initElement, true);
                            console.log(json);

                            function mapDOM(element, json) {
                                var treeObject = {};

                                // If string convert to document Node
                                if (typeof element === "string") {
                                    if (window.DOMParser) {
                                        parser = new DOMParser();
                                        docNode = parser.parseFromString(element, "text/xml");
                                    } else { // Microsoft strikes again
                                        docNode = new ActiveXObject("Microsoft.XMLDOM");
                                        docNode.async = false;
                                        docNode.loadXML(element);
                                    }
                                    element = docNode.firstChild;
                                }

                                //Recursively loop through DOM elements and assign properties to object
                                function treeHTML(element, object) {
                                    object["type"] = element.nodeName;
                                    var nodeList = element.childNodes;
                                    if (nodeList != null) {
                                        if (nodeList.length) {
                                            object["content"] = [];
                                            for (var i = 0; i < nodeList.length; i++) {
                                                if (nodeList[i].nodeType == 3) {
                                                    object["content"].push(nodeList[i].nodeValue);
                                                } else {
                                                    object["content"].push({});
                                                    treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
                                                }
                                            }
                                        }
                                    }
                                    if (element.attributes != null) {
                                        if (element.attributes.length) {
                                            object["attributes"] = {};
                                            for (var i = 0; i < element.attributes.length; i++) {
                                                object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                                            }
                                        }
                                    }
                                }
                                treeHTML(element, treeObject);

                                return (json) ? JSON.stringify(treeObject) : treeObject;
                            }
                            return json;
                        }, function(err, json) {
                            globalData.domJson = json;
                        });
                        if (status == "success") {
                            console.log('Success: page opened');
                            return resolve('done');
                        } else {
                            console.log('Failed to open page');
                            return resolve('fail');
                        }
                    });

                }).then(function() {
                    BROWSER = sl;
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
    test.engineGlobal.state='pending';
    io.emit('state',{state:'pending'});
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
                        globalData.testTubeKey = step.tag;
                        return testTube = test.getElementContent(step.tag, page);
                    case 'getNetworkContent':
                        globalData.beakerKey = step.key;
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
                                page.get('canGoBack', function(err, canGoBack) {
                                    if (canGoBack)
                                        page.goBack();
                                    else {
                                        test.log('fail', 'can\'t GO back in history');

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
                                page.get('canGoBack', function(err, canGoForward) {
                                    if (canGoForward)
                                        page.goForward();
                                    else {
                                        test.log('fail', 'can\'t GO forward in history');
                                    }

                                    wait(50).then(function() {
                                        return resolve('done');
                                    });
                                });
                            })
                        });
                        break;
                    case 'navigateUrl':
                        page.openUrl(step.key);
                        break;
                };
            };

            if (typeof(stepPromise) == 'undefined') 
                stepPromise = stepSwitchCheck(step, page);
	    else {
                stepPromise = stepPromise.then(function(msg) {
                    if (step.action == 'done') {
			test.engineGlobal.state='done';
			io.emit('state',{state:'done'});
                        PubSub.publish('testStepsComplete');
                        return resolve('done');
                    }
                    if (typeof step.des !== 'undefined') {
                        globalData.currentStepDescription = step.des;
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
    
    var testSet = globalData.testSets[globalData.testSetCounter];
    var testSteps = test.load(globalData.testSet[globalData.jsonFileCounter].testFile);

    run(testSteps);

    p2 = PubSub.subscribe('testStepsComplete', function() {
        globalData.jsonFileCounter++;
        console.log("****************************", typeof testSet[globalData.jsonFileCounter])
        if (typeof testSet[globalData.jsonFileCounter] !== 'undefined' && testSet[globalData.jsonFileCounter].status == 'testSetComplete') {
            PubSub.publish('nextSet');
        } else {
            testSteps = test.load(globalData.testSet[globalData.jsonFileCounter].testFile);
            test.log('next', 'Next testFile--------------------------------------------------------');
            run(testSteps);
        }
    });

    p3 = PubSub.subscribe('nextSet', function() {

        globalData.testSetCounter++;
        //set current testSet
        testSet = testSet[globalData.testSetCounter];
        globalData.jsonFileCounter = -1;
        test.log('next', 'Next Set of TestFiles-----------------------------------------------');


        if (typeof testSet === 'undefined') {
            test.log('blink', 'ALL DONE');
        } else {
            PubSub.publish('testStepsComplete');
        }
    });
};

globalData.testSets = [

    // jsons.networkAnswerCheck,

    // jsons.networkTimerCheck,
    // jsons.leftPlayCycle,
    // jsons.checkViewsIncrease,
    // jsons.rightPlayCycle,

    // jsons.timerOutPlayCycle,

    // //Timeout then check url to see if changed
    // jsons.selectSubtitles,
    // jsons.getUrlContent,
    // jsons.clickNext,
    // jsons.getUrlContent,
    // jsons.compareTestTubesFail,

    // //play then check url to see if changed
    // jsons.selectSubtitles,
    // jsons.getUrlContent,
    // jsons.selectLeft,
    // jsons.clickNext,
    // jsons.getUrlContent,
    // jsons.compareTestTubesFail,

    // //play with subtitles and check if subtitles is shown
    // jsons.subtitlesDisabled,

    // // //check infopanel functionality:---------------------
    // jsons.selectSubtitles,
    // jsons.panelClick,
    // jsons.selectLeft,
    // jsons.clickNext,

    // //history checks----------------------

    // jsons.rightPlayCycle,
    // jsons.urlHistory,
    // jsons.leftPlayCycle,
    // jsons.urlHistory,

    // jsons.rightPlayCycle,
    // jsons.getUrlContent,
    // jsons.rightPlayCycle,
    // jsons.getUrlContent,
    // jsons.compareTestTubesFalse,

    // jsons.rightPlayCycle,
    // jsons.getUrlContent,
    // jsons.goBack,
    // jsons.goForward,
    // jsons.goBack,
    // jsons.goForward,
    // jsons.goBack,
    // jsons.goForward,
    // jsons.getUrlContent,
    // jsons.compareTestTubes,

    // //play > get url > go back, go back > get url > see if the urls aren't the same
    //     jsons.rightPlayCycle,
    //     jsons.getUrlContent,
    //     jsons.goBack,
    //     jsons.goBack,
    //     jsons.getUrlContent,
    // jsons.compareTestTubesFalse,


    // //correctAnswer Cycle
    // jsons.selectSubtitles,
    // jsons.correctAnswerClick,
    // //incorrectAnswer Cycle
    // jsons.selectSubtitles,
    // jsons.incorrectAnswerClick,

    //check session number success change after correct Answer

    // jsons.selectSubtitles,
    // jsons.getSuccessFromSessions,
    // jsons.correctAnswerClick,
    // jsons.getSuccessFromSessions,
    // jsons.compareTestTubesFalse,

    //check session number success change after incorrect 

    // jsons.selectSubtitles,
    // jsons.getSuccessFromSessions,
    // jsons.incorrectAnswerClick,
    // jsons.getSuccessFromSessions,
    // jsons.compareTestTubes,
    // jsons.clickNext,

    //check session number fail correct after incorrect

    // jsons.selectSubtitles,
    // jsons.getFailFromSessions,
    // jsons.incorrectAnswerClick,
    // jsons.getFailFromSessions,
    // jsons.compareTestTubesFalse,
    // jsons.clickNext,

    //check session number fail correct after incorrect

    // jsons.selectSubtitles,
    // jsons.getSuccessFromSessions,
    // jsons.incorrectAnswerClick,
    // jsons.getSuccessFromSessions,
    // jsons.compareTestTubes,
    // jsons.clickNext,

    // //titlebar Components check
    // jsons.checkTitleBarComponents,

    // //products tests
    // jsons.productsTestSet_Red,
    // jsons.rightPlayCycle,
    // jsons.urlCheckRed,

    // jsons.productsTestSet_Green,
    // jsons.rightPlayCycle,
    // jsons.urlCheckGreen,

    // jsons.productsTestSet_Yellow,
    // jsons.rightPlayCycle,
    // jsons.urlCheckYellow,

    jsons.azeriSelect,
    // jsons.urlCheckAZ,
    // jsons.rightPlayCycle,
    // jsons.urlCheckAZ,
    // jsons.rightPlayCycle,
];

var page;

function sendData() {
    io.emit('time', {
        time: new Date().toJSON(),
        data: globalData,
        currentUrl: test.engineGlobal.currentUrl,
        oldUrl: test.engineGlobal.oldUrl,
        testTube: test.engineGlobal.testTube,
        oldTestTube: test.engineGlobal.oldTestTube,
        beaker: test.engineGlobal.networkBeaker,
        stepDescription: globalData.currentStepDescription,
        beakerKey: globalData.beakerKey,
        testTubeKey: globalData.testTubeKey,
        messagePool: test.engineGlobal.messagePool,
	state:test.engineGlobal.state
    });
    
    // console.log(globalData.currentStepDescription)
}

function reloadBrowser() {
    //PubSub.clearAllSubscriptions();
}

function exit() {
    BROWSER.exit();
};

// Send current time every 10 secs
setInterval(sendData, 50);

var url = 'http://dev.fev1/';

dbService.server();

startBrowser(url).then(function() {
    page = globalData.page;
    console.log('browser Started');

    globalData.page.set('viewportSize', {
        width: 1000,
        height: 700
    });

    test.urlWatcher.start(globalData.page, 250);
    
    

    //setTimeout(function(){
    //start();},1000)

    // 	page.onConsoleMessage = function(msg, lineNum, sourceId) {
    // 	    console.log('SLIMER CONSOLE: ' + msg );
    // };
    //     setTimeout(function(){
    // 	page.evaluate(function(){
    // 	    console.log("!!!!!!!!!!!!!"+document.body.children);
    // 	    return document.body.children[0];
    // 	},function(err,val){
    // 	    console.log("^^^^^^^^",val)
    // 	});

    //     },1000)




});
// setTimeout(function(){console.log(beautify_js(globalData.domJson))},5000);

exports.run = run;

exports.start = start;
exports.startBrowser = startBrowser;
exports.networkTap = networkTap;
exports.globalData = globalData;
exports.reloadBrowser = reloadBrowser;
exports.globalData = globalData;

exports.exit = exit;
