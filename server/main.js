// var port = 8000,
//     slimerjs = require('node-phantom-simple'),
//     test = require('./engine.js'),
//     PubSub = require('./lib/pubsub.js'),
//     dbService = require('./dbService.js'),
//     http = require('http'),
//     fs = require('fs'),
//     stepPromise,
//     // NEVER use a Sync function except at start-up!
//     // index = fs.readFileSync( '../interface/index.html'),
//     // app = http.createServer(function(req, res) {
//     //     res.writeHead(200, {
//     //         'Content-Type': 'text/html'
//     //     });
//     //     res.end(index);
//     // }),

//     // Socket.io server listens to our app
//     io = require('socket.io').listen(app);

// // Send current time to all connected clients


// // Emit welcome message on connection
// // io.on('connection', function(socket) {
// // });

// app.listen(3000);

// var globalData = {};

// globalData.jsonFileCounter = 0;
// globalData.testSetCounter = 0;
// globalData.setCounter = 0;

// function networkTap() {
//     return new Promise(function(resolve) {
//         globalData.page.onResourceReceived = function(response, networkRequest) {

//             if (response.stage == 'end') {
//                 if (response.url.indexOf('question_service') != -1 && response.bodySize != 0) {

//                     response.body = JSON.parse(response.body);
//                     if (networkResponses.length >= networkArraySize) {
//                         // networkResponses.pop();
//                         networkResponses.shift();
//                         // test.Global.networkResponses.pop();
//                         test.engineGlobal.networkResponses.shift();
//                     }
//                     networkResponses.push(response.body);
//                     test.engineGlobal.networkResponses.push(response.body);


//                 }
//             }
//         };
//         return resolve('done');
//     });
// };

// function run(testSteps) {

//     return new Promise(function(resolve) {
//         testSteps.map(function(step) {
//             function stepSwitchCheck(step, page) {
		
//                 switch (step.action) {
// 		case 'screenShot':
// 		    test.screenShot('./','test.png',page).then(function(){
// 			io.emit('screenShot',{
// 			    screenShots:test.engineGlobal.screenShots
// 			});
// 		    })
// 		    break;
//                     case 'waitForVisibility':
//                         return test.waitForVisibility(step.tag, page);
//                     case 'click':
//                         return test.clickClass(step.tag, page);
//                     case 'removeClass':
//                         return test.removeClass(step.tag, page);
//                     case 'realClick':
//                         return test.realclickClass(step.tag, page);
//                     case 'focus':
//                         return test.focusClass(step.tag, page);
//                     case 'sendKeys':
//                         return test.sendKeys(step.tag, step.key, page);
//                     case 'getElementContent':
//                         globalData.testTubeKey = step.tag;
//                         return testTube = test.getElementContent(step.tag, page);
//                     case 'getNetworkContent':
//                         globalData.beakerKey = step.key;
//                         return networkBeaker = test.getNetworkContent(networkResponses, step.key);
//                     case 'getUrlContent':
//                         return testTube = test.getUrlContent(page);
//                     case 'compareTestTubeBeaker':
//                         return test.compareTestTubeBeaker();
//                     case 'waitPlaybackEnd':
//                         return test.onPlaybackEnded(page, step.callback);
//                     case 'waitPlaybackStart':
//                         return test.onPlaybackStart(page, step.callback);
//                     case 'searchAndClickFromBeaker':
//                         return test.searchAndClickFromBeaker(page);
//                     case 'compareTestTubes':
//                         console.log('!!!!!!', step);
//                         return test.compareTestTubes(step.expect, step.type, step.expression);
//                     case 'wait':
//                         return test.wait(step.key);
//                     case 'compare':
//                         return test.compare(step.arg0, step.arg1, step.type, step.expect);
//                     case 'reload':
//                         return new Promise(function(resolve) {
//                             return wait(50).then(function() {
//                                 page.reload();
//                                 wait(50).then(function() {
//                                     return resolve('done');
//                                 });
//                             });
//                         });
//                         break;
//                         return test.wait(step.key);
//                     case 'historyBack':
//                         return new Promise(function(resolve) {
//                             return wait(50).then(function() {
//                                 page.get('canGoBack', function(err, canGoBack) {
//                                     if (canGoBack)
//                                         page.goBack();
//                                     else {
//                                         test.log('fail', 'can\'t GO back in history');

//                                     }
//                                     wait(100).then(function() {
//                                         return resolve('done');
//                                     });
//                                 });
//                             });
//                         });
//                         break;
//                     case 'historyForward':
//                         return new Promise(function(resolve) {
//                             return wait(50).then(function() {
//                                 page.get('canGoBack', function(err, canGoForward) {
//                                     if (canGoForward)
//                                         page.goForward();
//                                     else {
//                                         test.log('fail', 'can\'t GO forward in history');
//                                     }

//                                     wait(50).then(function() {
//                                         return resolve('done');
//                                     });
//                                 });
//                             })
//                         });
//                         break;
//                     case 'navigateUrl':
//                         return new Promise(function(resolve) {
//                             page.openUrl(step.key)
//                             return resolve('done');
//                         });
//                     case 'navigateTestTube':
//                         return new Promise(function(resolve) {
//                             //this navigates to test tube.
//                             // fill the content of the testtube with a url
//                             // or open a pop up and the test tube is automatigically
//                             // filled with the poped up url
//                             var I = setInterval(function() {
//                                 console.log(test.engineGlobal.status)
//                                 if (test.engineGlobal.status == 'opened') {

//                                     page.openUrl(test.engineGlobal.testTube);
//                                     clearInterval(I);
//                                     return resolve('done');
//                                 }
//                             }, 125);;


//                         });
//                     case 'deadLinkChecker':

//                         test.deadLinkChecker(page);
//                         break;
//                     case 'searchAndClick':
//                         return test.searchAndClick(page, step.key, step.tag);
//                         break;




//                 };
//             };

//             if (typeof(stepPromise) == 'undefined') {

//                 stepPromise = stepSwitchCheck(step, page);
//             } else {
//                 stepPromise = stepPromise.then(function(msg) {

//                     if (step.action == 'done') {
//                         test.engineGlobal.state = 'done';
			
//                         PubSub.publish('testStepsComplete');
//                         return resolve('done');
//                     }
//                     if (typeof step.des !== 'undefined') {
//                         globalData.currentStepDescription = step.des;
//                         test.log('des', step.des);
//                     }
//                     return wait(10).then(function() {
//                         return stepSwitchCheck(step, page);
//                     });
//                 });
//             }
//         });
//     });
// };

// function start() {

//     var testSet = globalData.testSets[globalData.testSetCounter];
//     var testSteps = test.load(globalData.testSet[globalData.jsonFileCounter].testFile);

//     run(testSteps);

//     p2 = PubSub.subscribe('testStepsComplete', function() {
//         globalData.jsonFileCounter++;
//         console.log("****************************", typeof testSet[globalData.jsonFileCounter]);
//         if (typeof testSet[globalData.jsonFileCounter] !== 'undefined' && testSet[globalData.jsonFileCounter].status == 'testSetComplete') {
//             PubSub.publish('nextSet');
//         } else {
//             testSteps = test.load(globalData.testSet[globalData.jsonFileCounter].testFile);
//             test.log('next', 'Next testFile--------------------------------------------------------');
//             run(testSteps);
//         }
//     });

//     p3 = PubSub.subscribe('nextSet', function() {

//         globalData.testSetCounter++;
//         //set current testSet
//         testSet = testSet[globalData.testSetCounter];
//         globalData.jsonFileCounter = -1;
//         test.log('next', 'Next Set of TestFiles-----------------------------------------------');


//         if (typeof testSet === 'undefined') {
//             test.log('blink', 'ALL DONE');
//         } else {
//             PubSub.publish('testStepsComplete');
//         }
//     });
// };

// var page;

// function sendData() {
//     io.emit('time', {
//         time: new Date().toJSON(),
//         data: globalData,
//         currentUrl: test.engineGlobal.currentUrl,
//         oldUrl: test.engineGlobal.oldUrl,
//         testTube: test.engineGlobal.testTube,
//         oldTestTube: test.engineGlobal.oldTestTube,
//         beaker: test.engineGlobal.networkBeaker,
//         stepDescription: globalData.currentStepDescription,
//         beakerKey: globalData.beakerKey,
//         testTubeKey: globalData.testTubeKey,
//         messagePool: test.engineGlobal.messagePool,
//         state: test.engineGlobal.state
//     });
    
//     io.emit('state', {
//         state:  test.engineGlobal.state
//     });
//     // console.log(globalData.currentStepDescription)
// }


// var url = 'http://dev.fev1/';


// startBrowser(url).then(function() {
   
//     page = globalData.page;
//     console.log('browser Started');

//     globalData.page.

//     globalData.page.set('viewportSize', {
//         width: 1000,
//         height: 700
//     });



//     globalData.page.onPageCreated = function(newPage) {
//         test.engineGlobal.status = 'pending';
//         newPage.onLoadFinished = function(a) {
//             //console.log('newPage::',a)
//             newPage.get('url', function(err, url) {
//                 var source = 'other';
//                 console.log('NEW OPENED PAGE: URL:', url);
//                 if (url.indexOf('youtube') != -1) {
//                     source = 'youtube';
//                 } else if (url.indexOf('amazon') != -1) {
//                     source = 'amazon';
//                 }
//                 test.engineGlobal.oldTestTube = test.engineGlobal.testTube;
//                 test.engineGlobal.testTube = url;
//                 test.engineGlobal.popup = {
//                     url: url,
//                     source: source
//                 };
//                 newPage.close();

//                 test.engineGlobal.status = 'opened';
//                 test.log('pass', 'Page Opened from source: ' + source);
                

//             })

//         };
//     };

//     page.get('settings', function(err, res) {
	
//         console.log(res)
//     })
// console.log('HERE')
    

//     //test.urlWatcher.start(globalData.page, 250);



//     //setTimeout(function(){
//     //start();},1000)


//     // setTimeout(function(){
//     // page.evaluate(function(){
//     //     console.log("!!!!!!!!!!!!!"+document.body.children);
//     //     return document.body.children[0];
//     // },function(err,val){
//     //     console.log("^^^^^^^^",val)
//     // });

//     // },1000)




// });
// // setTimeout(function(){console.log(beautify_js(globalData.domJson))},5000);

// exports.run = run;
// exports.start = start;
// exports.startBrowser = startBrowser;
// exports.networkTap = networkTap;
// exports.globalData = globalData;
// exports.reloadBrowser = reloadBrowser;
// exports.globalData = globalData;
// exports.sendLog=sendLog;
// exports.exit = exit;

var cfg={slimerjs:true};
var test=require('./engine.js').TestEngine(cfg);
var Events=require('events');
var EventHandler=new Events();
var runStart;
var server=require('./server.js').Server();
server.start();
function run(testSteps) {
    runStart=new Date();
    return new Promise(function(resolve) {
        testSteps.map(function(step) {
            function stepSwitchCheck(step) {
                switch (step.action) {
		    
		case 'startBrowser':
		    return test.startBrowser();
		case 'visibility':
		    return test.waitFor(function _check() {
    			return this.visibility(step.tag,step.expect);
		    });
		case 'wait':
		    return test.waitFor(function _noCheck(){},step.key);
		case 'getContent':
		    return test.waitFor(function _noCheck(){
			this.getContent(step.tag);
		    },step.timeout);

		case 'clickTestTube':
		    return test.waitFor(function _noCheck(){
			return this.clickTestTube();
		    },step.timeout);
		case 'describe':
		    console.log('Test description: %s',step.key);
		    break;
		case 'screenShot':
		    test.screenShot('./','test.png',page).then(function(){
			io.emit('screenShot',{
			    screenShots:test.engineGlobal.screenShots
			});
		    });
		    break;
                    // case 'waitForVisibility':
                    //     return test.waitForVisibility(step.tag, page);
                    case 'click':
                    return test.clickClass(step.tag, page);

		    
                    case 'removeClass':
                        return test.removeClass(step.tag, page);
                    case 'realClick':
                        return test.realclickClass(step.tag, page);
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
                        console.log('!!!!!!', step);
                        return test.compareTestTubes(step.expect, step.type, step.expression);
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
                        return new Promise(function(resolve) {
                            page.openUrl(step.key)
                            return resolve('done');
                        });
                    case 'navigateTestTube':
                        return new Promise(function(resolve) {
                            //this navigates to test tube.
                            // fill the content of the testtube with a url
                            // or open a pop up and the test tube is automatigically
                            // filled with the poped up url
                            var I = setInterval(function() {
                                console.log(test.engineGlobal.status)
                                if (test.engineGlobal.status == 'opened') {

                                    page.openUrl(test.engineGlobal.testTube);
                                    clearInterval(I);
                                    return resolve('done');
                                }
                            }, 125);;


                        });
                    case 'deadLinkChecker':

                        test.deadLinkChecker(page);
                        break;
                    case 'searchAndClick':
                        return test.searchAndClick(page, step.key, step.tag);
                        break;
                };
            };

            if (typeof(stepPromise) == 'undefined') {

                stepPromise = stepSwitchCheck(step);
            } else {
                stepPromise = stepPromise.then(function(msg) {

                    if (step.action == 'done') {
                        EventHandler.emit('stepsComplete');
                        return resolve('done');
                    }
		    
                    if (typeof step.des !== 'undefined') {
                        console.log('description: %s', step.des);
                    }
                    return stepSwitchCheck(step);
                    
                });
            }
        });
    });
};

EventHandler.on('stepsComplete',function(){
    var runEnd=new Date();
    var elapsed=runEnd-runStart;
    
    server.emit('time',{time:elapsed});
    console.log('Steps Complete in %d ms',elapsed);
});

run([
    {action:'startBrowser'},
    {action:'describe',key:'blah blah, blah'},
    {action:'visibility',tag:'#content_area',expect:'true',des:'Check for the visibility of'},
    {action:'wait',key:'1500'},
    {action:'getContent',tag:'#tabs > div.clickable.inactive > span',timeout:'1500'},
    {action:'clickTestTube',timeout:'800'},
    {action:'done'}
    ]);
