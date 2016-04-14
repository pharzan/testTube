var cfg={slimerjs:true};
var testTube=require('./engine.js').TestEngine(cfg);
var PromiseRunner=require('promiserunner');
var promiseRunner=new PromiseRunner();
testTube.log('hi');
testTube.startBrowser()
    .then(function(){
	return testTube.waitFor(function _check() {
    	    return this.visibility('#content_area',true);
	});
    })
    .then(function(){
	return testTube.waitFor(function _check() {
	},1000);
    })
    .then(function(){
	return testTube.waitFor(function _check() {
	    return this.getContent('#tabs > div.clickable.inactive > span');
	});
    })
    .then(function(){
	return testTube.waitFor(function _check() {
	    return this.clickTestTube();
	});
    })
    .then(function(){
	return testTube.waitFor(function _check() {
	    return this.fillTestTube({text:'#blah',tagType:'div'});
	});
    })
    .then(function(){
	return testTube.waitFor(function _check() {
	    return this.clickTestTube();
	});
    })
    .then(function(){
	testTube.fillTestTube({text:'50',type:'number'});
	testTube.fillTestTube({text:'60',type:'number'});
	
	return testTube.waitFor(function _check() {
	    return this.analyze({
		arg0:'0',
		arg1:'1',
		expression:'T1+T2',
		type:'stringCompare',
		expect:'120'
	    });
	});
    }).then(function(){
	testTube.stopBrowser();
    });
    // .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.exists('#index_dasfas',true);
// 	    });
//     })

//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.keyboardEvent('#auth > div.pane.cflex > input[type="text"]:nth-child(2)','pharzan@outlook.com');
// 	    });
//     })

//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.getContent('#auth > div.pane.cflex > input[type="text"]:nth-child(2)');
//     	    });
//     })

//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.keyboardEvent('#auth > div.pane.cflex > input[type="password"]:nth-child(4)','far19agu');
// 	    });
//     })

//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.getContent('#auth > div.pane.cflex > input[type="password"]:nth-child(4)');
//     	    });
//     })
//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.getContent('#auth > div.pane.cflex > input[type="text"]:nth-child(2)');
//     	    });
//     })
    
//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.mouseEvent('#auth > div.pane.cflex > button');
// 	    });
//     })
//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.screenShot('#auth > div.pane.cflex > button');
// 	    });
//     })
//     .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.mouseEvent('#logo');
// 	    });
//     })
// .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.getContent('#score_boxes > div:nth-child(1) > div.score_box.first > div.success');
//     	    });
//     })
// .then(function(){
//     	    return testTube.waitFor(function _check() {
//     		return this.getContent('#score_boxes > div:nth-child(3) > div.score_box.last > div > a');
//     	    });
//     })
   

















