const EventHandler = require('events');

var fs = require('fs'),
    slimerjs = require('node-phantom-simple'),
    promiseRunner = require('promiserunner');
    // dbService = require('./dbService.js'),
    // PubSub = require('./lib/pubsub.js'),
    // main=require('./main.js'),
    
// PubSub.subscribe('testStepsComplete', function() {
//     //_reset();
// });
exports.TestEngine=function TestEngine(cfg){
    

    var self=this;
    if (!(this instanceof TestEngine)) {
	return new TestEngine(cfg);
    }
    this.Global = {
        oldUrl: '',
        currentUrl: '',
        oldTestTube: '',
        testTubes: [],
	maxTestTubes:4,
        networkBeaker: [],
        networkResponses: [],
        urlHistorySize: 7,
        urlHistory: [],
        messagePool: [],
        popup: {
            url: '',
            source: 'unknown'
        },
	screenShots:['',''],
	
    };
    this.PromiseRunner=new promiseRunner();
    this.EventHandler=new EventHandler();
    this.Globals={
	viewport:{},
	history:{},
	urls:{},
	screenShots:{}
    };
    cfg.slimerjs?this.Globals.slimerjs=true:false;
    
    // this.EventHandler.on('waitStart',function(){self.waitStart()});
    
    this.log=function(message){
	console.log(message);
    };

    this.startBrowser=function(){
	var self=this;
	return new Promise(function(resolve) {
            slimerjs.create({path: self.Globals.slimerjs?require('slimerjs').path:require('phantomjs').path }, function(err, sl) {
		return sl.createPage(function(err, page) {
                    return new Promise(function(resolve, reject) {
			sl.outputEncoding = "utf-8";
			self.Globals.page=page;
			
			// networkTap();
			page.open('http://www.voscreen.com', function(err, status) {
                            page.set('viewportSize', {
				width: 1000,
				height: 700
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
			self.Globals.BROWSER = sl;
			return resolve('done');

                    });
		    
		});
            });
	});
    };
    
    this.waitFor=function(fn){
	var self=this;
	return new Promise(function(resolve){
	    
	    var retryTimeout=250;
	    self.EventHandler.emit('waitStart');
	    self.EventHandler.once('result',function(result,act){
		
		
		action=act;
		condition=result;
		self.EventHandler.removeAllListeners()
	    });
	    var action='unidentified';
	    var start=new Date().getTime();
	    var timeout=3000;
	    var condition=false;
	    
            
	    var interval = setInterval(function _check(self) {
		
		if ((new Date().getTime() - start < timeout) && !condition) {
		    fn.call(self,self);
		    return
		}
		 if (!condition) {
		     console.log("waitFor(%s) failed in %d ms.",action,new Date().getTime() - start);
		    clearInterval(interval);
		     self.EventHandler.removeAllListeners()
		    return resolve('fail');
		 }

		else{
                    console.log("waitFor(%s) passed in %d ms.", action,new Date().getTime() - start);
                    clearInterval(interval);
		    self.EventHandler.removeAllListeners()
		    return resolve('pass'); 
		}
		
            },retryTimeout,self);
	},self);
    };

    this.visibility=function(selector,expect){
	
	var self=this;
	var page=this.Globals.page;
	if(typeof expect=='undefined')
	    expect=true;
	page.evaluate(function(selector) {
            var element=document.querySelector(selector);
	    if(element.offsetParent !== null)
		return true;
	    else
		return false;
		
        },selector,expect,function(err,result){
	    
	    self.EventHandler.emit('result',result && expect,'visibility');
	    //console.log(selector,result)
	});
	
	
	
    };

    this.exists=function(selector,expect){
	var page=this.Globals.page,self=this;
	if(typeof expect=='undefined')
	    expect=true;
	
	page.evaluate(function(selector) {
            var element=document.querySelector(selector);

	    if(element !== null)
		return true;
	    else
		return false;
        },selector,expect,function(err,result){
	    self.EventHandler.emit('result',result == expect,'exists');
	    
	});
    };
    
    this.waitStart=function(){
	var time=new Date().getTime();
	//console.log('wait started',time);
	this.pendingWait = true;
    };

    this.mouseEvent=function(selector){
	var page=this.Globals.page,self=this;
	page.evaluate(function(selector) {
	    var element=document.querySelector(selector);
	    if (element != null) {
                    element.click();
                    return true;
            } else 
                return false;
        },selector,function(err,result){
	    self.EventHandler.emit('result',result,'mouseEvent');
	    
	});

    };

    this.keyboardEvent=function(selector,key){
	
	var page=this.Globals.page,self=this;
        page.evaluate(function(selector, key) {
            var input = document.querySelector(selector); // Get the element where you want to press.
	    if (input != null) {
		input.focus();
		return true;}
	    else
		return false;
        }, selector, key, function(err, result) {
	    if(result){
		page.sendEvent('keypress', key, null, null, null);
		page.evaluate(function(selector, key) {
		    var input = document.querySelector(selector); // Get the element where you want to press.
		    var myEvent = new Event('change');
		    input.dispatchEvent(myEvent);
		    myEvent = new Event('input');
		    input.dispatchEvent(myEvent);
		    return true;
		},selector,key,function(err,result){
		    
			self.EventHandler.emit('result',result,'keyboardEvent');
		})
	    }
	    
        });
    };

    this.screenShot=function(){
	
	var self=this;
	    var fileNameGenerator=function(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;      // "+ 1" becouse the 1st month is 0
		var day = date.getDate();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		var secconds = date.getSeconds();
		var milliseconds = date.getMilliseconds();
		var name = year+ '-'+ month+ '-'+ day+ '_'+ hour+ '_'+ minutes+ '_'+ secconds+'_'+milliseconds;
		return name;
	    };
	
	var name=fileNameGenerator();
	console.log(name)
	self.Globals.page.render('./screenShots/'+name+'.png');
	self.EventHandler.emit('result',true,'screenShot');
    };

    this.getContent=function(selector){
	_getElementInfo(selector,function(info){
	    var result;
	    switch(info.tagName){
	    case 'INPUT':
		result={text:info.value,
			tagName:info.tagName
		       };
		break;
	    default:
		result={text:info.textContent,
			tagName:info.tagName
		       };
		break;
	    }
	    
	    _fillTestTube(result);
	    
	    if(info!==false)
		self.EventHandler.emit('result',true,'getContent '+info.tagName);
	    else
		self.EventHandler.emit('result',false,'getContent');
	});
    };

    var _getElementInfo=function(selector,callback){
	
	var page=self.Globals.page;
	
	page.evaluate(function(selector) {
            var element=document.querySelector(selector);
	    if(element !== null){
		
		return { tagName:element.tagName,
			 tagClass:element.className,
			 tagId:element.id,
			 innerHtml:element.innerHTML,
			 textContent:element.textContent,
			 value:element.value,
			 href:element.href
		       };
	    }
	    else
		return false;
		
        },selector,function(err,result){
	    callback(result);
	});

    };

    var _fillTestTube=function(value){
	
	var testTubes=self.Global.testTubes;
	
	testTubes.unshift(value);
	if(testTubes.length>self.Global.maxTestTubes)
	    testTubes.pop();

	console.log(value,'>>>',testTubes);
    };
    
    this.clickTestTube=function(){
	/*Searchs the dom for the selector and return the selector*/
	var lable=this.Global.testTubes[0].text;
	var tagType=this.Global.testTubes[0].tagName;
	
	var page=self.Globals.page;
        page.evaluate(function(lable, tagType) {

            var textContents = [];
            var e = document.getElementsByTagName(tagType);
            var found = [];
            var BreakException = {};

            try {

                for (var i = 0; i < e.length; i++) {
                   //textContents.push(e[i].textContent);
                    if (e[i].textContent == lable) {
                        found.push(e[i]);

                    }

                };

                if (typeof found !== 'undefined') {
                    console.log(found.length);
                    found.map(function(e) {
                        e.click();
                        console.log(e.className + " tag:" + e.tagName);
                    })
                   
                    return true;
                } else
                    return false;
            } catch (e) {
                if (e !== BreakException) throw e;
                return true;
            }
        }, lable, tagType, function(err, val) {
            
            if (val) {

                return true;
            } else
                return false;
        });
	

    };
};


function log(type, message, report) {
    main.sendLog(message,type);
    var msg;

    switch (type) {
        case 'info':
            msg = '\033[97m\033[44m INFO \033[37m\033[49m ';
            break;
        case 'detail':
            msg = '\033[97m\033[46m ARG: \033[37m\033[49m ';
            break;
        case 'pass':
            msg = '\033[97m\033[42m PASS \033[37m\033[49m ';
            break;
        case 'blink':
            msg = '\x1b[5m WINK \033[37m\033[49m ';
            break;
        case 'next':
            msg = '\033[1m NEXT \033[0m\033[37m\033[49m ';
            break;

        case 'fail':
            msg = '\033[97m\033[41m FAIL \033[37m\033[49m ';
            break;
        case 'warn':
            msg = '\033[97m\033[43m WARN \033[37m\033[49m ';
            break;

        case 'des':
            msg = '\033[107m\033[34m >>>> \033[37m\033[49m ';
            break;

        case 'fin':
            msg = '\033[1m DONE \033[0m\033[37m\033[49m';
            break;

        case 'url':
            msg = '\033[97;48;5;165m URL  \033[0m\033[37m\033[49m';
            break;

    }
    Global.messagePool.push({
        status: msg,
        content: message
    })
    console.log(msg + message);
}



function deadLinkChecker(page) {
    return new Promise(function(resolve) {

        var I = setInterval(function() {

            if (Global.popup.url !== '') {
                log('pass', '*' + Global.popup.source + ": " + Global.popup.url);

                var selector;
                switch (Global.popup.source) {
                    case 'amazon':
                        clearInterval(I);
                        console.log('AMAZON MATE');
                        page.openUrl(Global.testTube);
                        selector = '#dv-action-box';
                        waitForVisibility(selector, page, 10).then(function(r) {
                            console.log(r)
                            return resolve('done');
                        });
                        break;
                    case 'youtube':
                        clearInterval(I);
                        console.log('YOUTUBE MATE!!!')
                        page.openUrl(Global.testTube);
                        selector = '#movie_player > div.html5-video-container > video';
                        waitForVisibility(selector, page, 10).then(function(r) {
                            console.log(r)
                            return resolve('done');

                        });
                        break;
                    default:
                        console.log('dropped to defualt')
                        clearInterval(I);
                        return resolve('done');
                        break;

                }
                clearInterval(I);

            } else {
                clearInterval(I);
                return resolve('done');
            }
        }, 125);;

    })
};

function sendKeys(element, key, page, callback) {
    return new Promise(function(resolve, reject) {
        page.sendEvent('keypress', key, null, null, null);
        var e = page.evaluate(function(element, key) {
            var input = document.querySelector(element); // Get the element where you want to press.
            var myEvent = new Event('change');
            //input.value=key;

            input.dispatchEvent(myEvent);
            return true;
        }, element, key, function(err, result) {
            console.log("!!!!SEND KEYS", result);
            //if(result)
            return resolve('done');
        });
        //e.value=key
        // page.sendEvent('keypress', key, null, null,null);
        // e.dispatchEvent(myEvent);


    });
}


function onPlaybackStart(page, callback) {
    return new Promise(function(resolve, reject) {

        var video = page.evaluate(function() {
            return document.querySelector('#game_player > div.video_container > video');
        });

        video.addEventListener('playing', myHandler, false);

        function myHandler(e) {

            video.removeEventListener('playing', myHandler);
            return resolve('done');
        }
    });
}

function onPlaybackEnded(page, callback) {

    return new Promise(function(resolve, reject) {
        var state = false;
        var interval = setInterval(function() {
            page.evaluate(function() {

                var video = document.querySelector('#game_player > div.video_container > video');
                video.addEventListener('ended', myHandler, false);


                function myHandler(e) {
                    video.removeEventListener('ended', myHandler);
                    state = true;
                }
                return state;

            }, function(err, result) {


                if (result) {
                    clearInterval(interval);
                    return resolve('done')
                }
            })
        }, 250)


    })
}

// function waitForVisibility(selector, page, timeOut) {
//     if (typeof timeOut == 'undefined')
//         timeOut = 30;
//     return new Promise(function(resolve, reject) {
	
//         var startTime = new Date().getTime();
        
// 	var interval = setInterval(function() {
// 	    page.evaluate(function(selector) {
// 		var a = document.querySelector(selector);
		
// 			if (a.offsetParent !== null)
// 			    return true;
// 			else
// 			    return false;
		
// 	    },function(err,result){
		
// 		// if (new Date().getTime() - startTime > timeOut * 1000){
//                 //     clearInterval(interval);
//                 //     log('fail', 'waitForVisibility: ' + selector + ' element Timed OUT');
//                 //     return resolve('timeOut');
// 		// }
// 		if(result){
// 		    clearInterval(interval);
// 		    log('pass', 'waitForVisibility: ' + selector + ' element Now VISIBLE ');
// 		    return resolve('done');
// 		}else{
// 		    clearInterval(interval);
// 		    log('fail', 'waitForVisibility: ' + selector + ' element Not VISIBLE ');
// 		    return resolve('fail');
// 		}
		    
// 	    });
        
// 	},selector,100);
	
    
//     });
// }

function waitForVisibility(selector, page, timeOut) {
    if (typeof timeOut == 'undefined')
        timeOut = 30;
    return new Promise(function(resolve, reject) {
	 
        var startTime = new Date().getTime();
        var interval = setInterval(function() {
	   
            var e = page.evaluate(function(selector) {
                var a=document.querySelector(selector);
		
		if(a.offsetParent !== null)
		    return true;
		else
		    return false;
		
            },selector,function(err,result){
	
		if (result) {
                    log('pass', 'waitForVisibility: ' + selector + ' element Now VISIBLE ');
                    clearInterval(interval);
                    return resolve('done');
		}
	    
	    })
	    
            if (new Date().getTime() - startTime > timeOut * 1000) {
                log('fail', 'waitForVisibility: ' + selector + ' element Timed OUT');
                clearInterval(interval);
                return resolve('timeOut');
            }
	    
        }, 125);
	     
    });
};

function getElementContent(element, page) {
    /*
     GetElementContent function will get the text content of a passed in element
     like a div or span or a button and return it. This way we can store a
     user interface elements content inside a variable (TestTube) and later on
     test and assert it.

     the value retrieved is stored in Global.testTube;
     */
    return new Promise(function(resolve, reject) {
        page.evaluate(function(element) {
            var e = document.querySelector(element);
            if (e && e != null) {
                if (e != null && typeof(e) != 'undefined') {
                    console.log(e.tagName)
                    var content;
                    if (e.tagName === 'INPUT')
                        content = e.value;
                    else
                        content = e.textContent;
                    return content;
                }
                return false;
            }
        }, element, function(err, result) {
            //console.log('!!!!!!##!',result);
            if (!result) {
                log('fail', 'Element ' + element + ' content not found');
                resolve('error');
            } else {
                log('pass', 'TestTube:: ' + result);

                Global.oldTestTube = Global.testTube;
                Global.testTube = result;
                resolve('done');
            }
        });

    });
};

function getUrlContent(page) {
    /*
     Get the url and store it in a test tube
     the oldTest tube is set to current testTube
     the new url is set to current url,
     */
    return new Promise(function(resolve, reject) {
        page.get('url', function(err, url) {
            if (url != null && typeof(url) != 'undefined') {

                log('pass', 'TestTube:: ' + url);

                Global.oldTestTube = Global.testTube;
                Global.testTube = url;

                return resolve('done');

            } else {

                log('fail', 'Element ' + url + ' content not found');
                return resolve('error');
            }

        });


    });

};

function getNetworkContent(networkResponses, key) {
    /*
     This function searches through the network responses for a certain key
     and returns its (value/values) as an array. the array now has the values
     needed to be checked for example if we want the network response for 
     "answer" this function returns the "answer" in the response array.
     later we can store the values returned and assert them with a certain
     value gotten from the UI using the getelementcontent() function.

     the value retrieved is stored in Global.networkBeaker[];
     */

    var foundItems = [];

    networkResponses.map(function(response) {

        //console.log(beaker.body.question.choices.answer)
        foundItems.push(_getValues(response, key));
    });

    if (foundItems.length > 0) {
        log('pass', 'searched through an array of (' + networkResponses.length + ') network responses for [' + key + '] and found:' + foundItems.length + '\n\r' + foundItems.map(function(found) {
            return '\n\rGOT: ' + found + '';
        }));
        Global.networkBeaker = foundItems;
    } else {
        log('fail', 'searched through an array of (' + networkResponses.length + ') network responses for' + key + ' and found none');
    };
};

function clickClass(selector, page) {

    return new Promise(function(resolve, reject) {

        page.evaluate(function(selector) {

            var a = document.querySelector(selector);

            if (a != null && typeof(a) !== 'undefined') {
                if (a.offsetParent !== null) {
                    a.click();
                    return true;


                }
            } else {

                return false;
            }
        }, selector, function(err, result) {

            if (result) {
                log('pass', 'clickClass: ' + selector + ' clicked');
                return resolve('done');
            } else {
                log('fail', 'clickClass Something went wrong ' + selector + 'element Not Found! ');
                return resolve('fail');
            }

        });


    });


};

function removeClass(selector, page) {

    return new Promise(function(resolve, reject) {
	
	/* this function removes a given class from the dom
	 created for faster browsing */
	
        page.evaluate(function(selector) {
	    
            var a = document.querySelector(selector);

            if (a != null && typeof(a) !== 'undefined') {
                if (a.offsetParent !== null) {
                    a.parentElement.remove();
                    return true;
                }
            } else {
                return false;
            }
        }, selector, function(err, result) {
	    console.log('!!!!',result)
            if (result) {
                log('pass', 'removed: ' + selector + ' ');
                return resolve('done');
            } else {
                log('fail', 'remove Something went wrong ' + selector + 'element Not Found! ');
                return resolve('fail');
            }

        });


    });


};

function realclickClass(selector, page) {

    return new Promise(function(resolve, reject) {

        page.evaluate(function(selector) {

            var a = document.querySelector(selector);

            if (a != null && typeof(a) !== 'undefined') {
                if (a.offsetParent !== null) {


                    //a.click();
                    return {
                        status: true,
                        top: a.getBoundingClientRect().top,
                        right: a.getBoundingClientRect().right,
                        left: a.getBoundingClientRect().left,
                        bottom: a.getBoundingClientRect().bottom,
                        width: a.getBoundingClientRect().width,
                        height: a.getBoundingClientRect().height
                    };
                }
            } else {

                return false;
            }
        }, selector, function(err, result) {
            page.sendEvent('click', result.left + (result.width / 2), result.top + (result.height / 2), button = 'left');
            //console.log('>>>>>>>', result)
            if (result.status) {
                log('pass', 'clickClass: ' + selector + ' clicked');
                return resolve('done');
            } else {
                log('fail', 'clickClass Something went wrong ' + selector + 'element Not Found! ');
                return resolve('fail');
            }

        });


    });


};

function focusClass(element, page) {
    return new Promise(function(resolve, reject) {
        page.evaluate(function(element) {
            var e = document.querySelector(element);
            if (e != null && typeof(e) != 'undefined') {
                if (e.offsetParent !== null) {
                    e.focus();

                    return true;
                }
            } else {

                return false
            }

        }, element, function(err, result) {
            if (result) {
                log('pass', 'focusClass: ' + element + ' focused');
                return resolve('done')
            } else {
                log('fail', 'focusClass Something went wrong ' + element + 'element Not Found! ');
                return resolve('fail')
            }
        });


    });


};

function compareTestTubeBeaker() {
    /*
     this function maps through all the recieved network
     responses and checks to see if test tube content exists
     in them.
     Note: testTube needs to be filled and the network responses
     are pushed into the array as they are recieved.
     */
    var found;
    var key;
    Global.networkResponses.map(function(response) {
        key = _getKeys(response, Global.testTube);
        if (key.length != 0) {
            log('pass', 'TestTube content:' + Global.testTube + ' Matched in network responses as a [' + key + ']');
            found = true;
        }
    });
    if (found)
        return
    else
        log('warn', 'Match not Found in TestTube and Beaker');
};

function compareTestTubes(expect, type, expression) {
    return new Promise(function(resolve) {
        var old = Number(Global.oldTestTube),
            current = Number(Global.testTube);
        var expected = (expect === 'true') ? true : false;
        if (type === 'custom') {

            console.log('operate');
            console.log('TestTube1: ' + Global.testTube, 'TestTube2: ' + Global.oldTestTube)

            var T1 = Number(Global.testTube);
            var T2 = Number(Global.oldTestTube);
            var temp = eval(expression);
            Global.oldTestTube = Global.testTube;
            Global.testTube = temp;

            console.log(temp, T1, T2, 'expect: ' + expect, 'comparision: ', temp == expect)
            return resolve('done')
        } else if (isNaN(old) || isNaN(current)) {

            compare = (Global.oldTestTube == Global.testTube);
            // console.log("Global.testTube = "+Global.testTube);
            // console.log("Global.old = "+Global.oldTestTube);
            // console.log(Global.Global===testTube.oldTestTube);

            if (compare == expected)
                log('pass', 'compare pass');
            else
                log('fail', 'compare didn\'t pass!');

            return resolve('done');
        } else {
            var diff = old - current;

            if (diff > 0)
                log('warn', old + '>' + current + ' diffrence = ' + diff);
            else if (diff < 0)
                log('warn', old + '<' + current + ' difference = ' + diff);
            else
                log('warn', old + '=' + current);
            if (expect == diff)
                log('pass', 'expected value matches the difference of testTubes');
            else
                log('fail', 'expected value doesn\'t match');
	    return resolve('done');
        }

        return resolve('done')

    });
};

function compare(arg0, arg1, type, expect) {
    console.log("HERE",arg0,arg1,type,expect)
    var expected = (expect === 'true') ? true : false;;
    // usage:
    //-------------------------------------------------------
    // {"action":"compare",
    //  "type":"dataContains",
    //  "arg0":"currentUrl",
    //  "arg1":"voKido/green",
    //  "expect":"true",
    //  "des":"Check to see if url contains voKido/green ",
    //  "callback":""}
    //-------------------------------------------------------

    switch (type) {

        case 'dataContains':
            //see's if arg0 from Global.Data,  contains arg1:
            //global.arg0 contains arg1?
            if (Global[arg0].indexOf(arg1) > -1)
                log('pass', arg0 + ' contains ' + arg1);
            else
                log('fail', arg0 + ' didn\'t contain ' + arg1);
            break;

        case 'dataToDataEquals':

            //see's if arg0 from Global.Data,  contains Global.data:
            //global.arg0 contains global.arg1?
            log('detail', Global[arg0]);
            log('detail', Global[arg1]);
            var cmp = Global[arg0] == Global[arg1];

            if (cmp == expected)
                log('pass', arg0 + ' compare ' + arg1 + " returned expeced: " + expect);
            else
                log('fail', arg0 + ' compare ' + arg1 + " didn\'t returned expeced: " + expect);
            break;

        case 'dataToStringEquals':

            //see's if arg0 from Global.Data,  contains Global.data:
            //global.arg0 contains global.arg1?
            log('detail', Global[arg0]);
            log('detail', arg1);
            var cmp = Global[arg0] == arg1;

            if (cmp == expected)
                log('pass', arg0 + ' compare ' + arg1 + " returned expeced: " + expect);
            else
                log('fail', arg0 + ' compare ' + arg1 + " didn\'t returned expeced: " + expect);
            break;



    }

}

function searchAndClickFromBeaker(page, searchTexts) {
    /*
     this function will find the element with same content as the network beacker
     and it will then click.
     */
    return new Promise(function(resolve) {
        var found;
        var beakers = [];
        Global.networkBeaker.map(function(beaker) {
            beakers.push(encodeURI(beaker));
        });
        page.evaluate(function(beakerContent) {

            var textContents = [];
            var e = document.getElementsByTagName('div');
            var found;
            var BreakException = {};

            try {
                beakerContent.map(function(beaker) {
                    for (var i = 0; i < e.length; i++) {
                        textContents.push(e[i].textContent);

                        if (e[i].textContent == beaker) {
                            found = e[i];

                        }

                    };
                })
                if (typeof found !== 'undefined') {
                    found.click();
                    return true;
                } else
                    return false;
            } catch (e) {
                if (e !== BreakException) throw e;
                return resolve('done');
            }
        }, beakers, function(err, val) {
            if (true) {

                resolve('done');
            } else

                return
        });


    });
};

function searchAndClick(page, searchText, tagType) {
    /*
     this function will find the element with same content as the network beacker
     and it will then click.
     */

    return new Promise(function(resolve) {
        /*finds a ui element with given text as key and finds all
         elements with certain tag type and clicks on it.
         */
        var found;

        page.evaluate(function(searchText, tagType) {

            var textContents = [];
            var e = document.getElementsByTagName(tagType);
            var found = [];
            var BreakException = {};

            try {

                for (var i = 0; i < e.length; i++) {
                    //textContents.push(e[i].textContent);

                    if (e[i].textContent == searchText) {
                        found.push(e[i]);

                    }

                };

                if (typeof found !== 'undefined') {
                    console.log(found.length);
                    found.map(function(e) {
                            e.click();
                            console.log(e.className + " tag:" + e.tagName);
                        })
                        //found.click();
                    return true;
                } else
                    return false;
            } catch (e) {
                if (e !== BreakException) throw e;
                return resolve('done');
            }
        }, searchText, tagType, function(err, val) {
            console.log('!!!!!!!' + val)
            if (true) {

                return resolve('done');
            } else
                return resolve('fail');
        });


    });
};

function linkExtractor(page, searchText, tagType) {
    /*
     this function will find the element with same content as the network beacker
     and it will then click.
     */

    return new Promise(function(resolve) {
        /*finds a ui element with given text as key and finds all
         elements with certain tag type and clicks on it.
         */
        var found;

        page.evaluate(function(searchText, tagType) {

            var textContents = [];
            var e = document.getElementsByTagName(tagType);
            var found = [];
            var BreakException = {};

            try {

                for (var i = 0; i < e.length; i++) {
                    //textContents.push(e[i].textContent);

                    if (e[i].textContent == searchText) {
                        found.push(e[i]);

                    }

                };

                if (typeof found !== 'undefined') {
                    console.log(found.length);
                    found.map(function(e) {
                            e.click();
                            console.log(e.className + " tag:" + e.tagName);
                        })
                        //found.click();
                    return true;
                } else
                    return false;
            } catch (e) {
                if (e !== BreakException) throw e;
                return resolve('done');
            }
        }, searchText, tagType, function(err, val) {
            console.log('!!!!!!!' + val)
            if (true) {

                return resolve('done');
            } else
                return resolve('fail');
        });


    });
};

function wait(t) {
    return new Promise(function(resolve) {;
        var i = 0;
        var inter = setInterval(function() {
            i++;
            if (i == t) {
                clearInterval(inter);
                return resolve('done'); // Note we're not returning `p` directly
            }
        }, 1000);
    });
}

function load(file) {

    //var testSteps,content;
    // dbService.load('steps',{name:'checkTestTubes.json'}).then(function(steps){

    // 	// testSteps = JSON.parse(steps.content);
    // 	// console.log('!387!!!',steps);
    // 	console.log("!!!!&&&&&&!",steps[0].content)
    // 	return resolve(steps[0].content);
    // });

    // dbService.load('sets',{}).then(function(sets){

    // 	//content=sets.content;

    // });

    var content = fs.readFileSync('./' + file, 'utf8', function(err, data) {
        return data;
    });

    var testSteps = JSON.parse(content);
    log('warn', testSteps[0].description);
    return testSteps;

};

function _getValues(obj, key) {
    //return an array of values that match on a certain key
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(_getValues(obj[i], key));

        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
};

function _getKeys(obj, val) {
    //return an array of keys that match on a certain value
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(_getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
};

var urlWatcher = {

    start: function(page, frequency) {
          
        var urlCheckInterval = setInterval(function() {
		
                page.get('url', function(err, url) {
	           if (Global.currentUrl != url) {
                        Global.oldUrl = Global.currentUrl;
                        Global.currentUrl = url;
                        Global.urlHistory.push(Global.currentUrl);
                        log('url', ' Change: ' + Global.currentUrl);

                        return;
                    } else
                        return;
                });


        }, 125);
        }
        // stop:function(urlCheckInterval){

    // 	window.clearInterval(urlCheckInterval);
    // }
};

function reset() {

    // Global = {
    //     testTube: '',
    //     networkBeaker: [],
    //     networkResponses: []
    // };
}

// module.exports = {
//     compareTestTubeBeaker: compareTestTubeBeaker,
//     compareTestTubes: compareTestTubes,
//     waitForVisibility: waitForVisibility,
//     getElementContent: getElementContent,
//     getNetworkContent: getNetworkContent,
//     onPlaybackEnded: onPlaybackEnded,
//     onPlaybackStart: onPlaybackStart,
//     searchAndClickFromBeaker: searchAndClickFromBeaker,
//     searchAndClick: searchAndClick,
//     urlWatcher: urlWatcher,
//     clickClass: clickClass,
//     removeClass:removeClass,
//     realclickClass: realclickClass,
//     getUrlContent: getUrlContent,
//     sendKeys: sendKeys,
//     focusClass: focusClass,
//     load: load,
//     wait: wait,
//     compare: compare,
//     log: log,
//     engineGlobal: Global,
//     deadLinkChecker: deadLinkChecker,
//     screenShot:screenShot
// };
