const SvgPlus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L 12.9994,18.998L 10.9994,18.998L 10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 10.9994,4.99805L 12.9994,4.99805L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

const SvgMinus = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L  10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

const SvgMenu = '<i class="menuDots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></i>';

var socket = io('http://127.0.0.1:3000');
var time = 'hi';

var Globals = {
};
var _Globals = {
    selectedStep: {
        name: '',
        categoery: '',
        content: [{
            description: ''
        }]
    },
    build: false,
    set: {
        content: []
    },
    selectedHeader: 'report',
    icons: {
        playStep: '.fa.fa-play-circle.fa-3x'
    },
    header:{
	loadRaised:false,
	reportRaised:false,
	buildRaised:false
    },
    setRow:'',
    screenShots:['http://dev.testtube/A','http://dev.testtube/B'],
    diff:{screenShot:'',mismatch:0}
};

socket.on('time', function(data) {
    //console.log(data.time);
    m.startComputation();
    time = data.time;
    Globals = data;
    m.endComputation();
    

});
function getImageDiff(){
    
	   var diff = resemble(_Globals.screenShots[0])
			   .compareTo(_Globals.screenShots[1])
			   .ignoreColors()
			   .onComplete(function(data){
			       _Globals.diff.screenShot=data.getImageDataUrl();
			       _Globals.diff.mismatch=data.misMatchPercentage;
			       // console.log("Mismatch Percentage: ",data.misMatchPercentage)
		       /*
			{
			misMatchPercentage : 100, // %
			isSameDimensions: true, // or false
			dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
			getImageDataUrl: function(){}
			}
			*/
			   });
    
    		 resemble.outputSettings({
		     errorColor: {
			 red: 255,
			 green: 0,
			 blue: 255
		     },
		     errorType: 'flat',
		     transparency: 1,
		     largeImageThreshold: 1200
		     
		 });

    
		 diff.ignoreNothing();
		 diff.repaint();
}

socket.on('log', function(msg) {
    console.log(msg);
    
});
socket.on('screenShot',function(screenShots){
    
    console.log('io:screenShot Recieved',screenShots);
    setTimeout(function(){
	m.startComputation();
	
	_Globals.screenShots=screenShots.screenShots;
	console.log('!!!!',screenShots);
	// screenShot.updateSource();
	
	getImageDiff();
	m.endComputation();
    },1000)
});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

var test = {
    tab:0,
    controller:function(){
	raiseHeader(2)
	console.log(_Globals.header)
    },
    view: function() {
	var self=this;
        return m('',
		 m.component(header),
		 m.component(tabs, {
                buttons: [{
                    label: 'Live'
                }, {
                    label: 'History'
                },{
		    label: 'Custom Report'
		}

			 ],
                getState: function(e) {
                    self.tab= e.index;

                },

                autofit: false
            }),
		 
		
            m('.tab',
                m('.time', time),
              (self.tab==0)?m.component(testTube):null,
	      (self.tab==0)?m.component(beaker):null,
              (self.tab==0)?m.component(url):null,
              m.component(description),
              
	      (self.tab==0)?m.component(screenShot):null
             ),
		 (self.tab==1)?m('.span.six', m.component(messages)):null);
    }
};

var checkbox = require('polythene/checkbox/checkbox');
var btn = require('polythene/button/button');
var dialog = require('polythene/dialog/dialog');
var textfield = require('polythene/textfield/textfield');
var fabtn = require('polythene/fab/fab');
var card = require('polythene/card/card');

var menu = require('polythene/menu/menu');
var list = require('polythene/list/list');
var listTile = require('polythene/list-tile/list-tile');

var tabs = require('polythene/tabs/tabs');

const loadBtn = m.component(btn, {
    label: 'Load',
    raised: _Globals.header.loadRaised,
    borders: true,

    events: {
        onclick: function(e) {
	    raiseHeader(1)
            m.route('/load')

        }
    }
});;
const reportBtn = m.component(btn, {
    label: 'Report',
    raised: _Globals.header.reportRaised,
    selected: _Globals.header.reportRaised,
    disabled: _Globals.header.reportRaised,
    events: {
        onclick: function() {
	    
            m.route('/report')
        }
    }
});;
const buildBtn = m.component(btn, {

    label: 'Build',
    raised: _Globals.header.buildRaised,

    events: {
        onclick: function() {
	    raiseHeader(3)
            m.route('/build')
        }
    }
});;
var raiseHeader=function(num){
    _Globals.header.loadRaised=false;
    _Globals.header.reportRaised=false;
    _Globals.header.buildRaised=false;
    switch(num){
    case 1:
	_Globals.header.loadRaised=true;
	break;
    case 2:
	_Globals.header.reportRaised=true;
	break;
    case 3:
	_Globals.header.buildRaised=true;
	break;
    }
};

const deleteBtn = m.component(btn, {
    label: 'delete',
    raised: true,

    events: {
        onclick: function() {

            _Globals.build = true;

        }
    }
});;

var header = {
    controller: function() {


    },
    view: function() {

        return m('.header',
		 m.component(loadBtn),
		 m.component(reportBtn),
		 m.component(buildBtn));
    }
};

var url = {
    view: function() {

        return m('.span.twelve',
            m('.span.six', m('a', {
                    href: Globals.currentUrl
                },
                m('img', {
                    src: './img/link.png'
                }), Globals.currentUrl)),
            m('.span.six', m('a', {
                    href: Globals.oldUrl
                },
                m('img', {
                    src: './img/linkGrey.png'
                }), Globals.oldUrl))
        );
    }
};

var screenShot = {
    view: function() {
	var self=this;
	
        return m('.span.twelve',
            m('.span.twelve', 
              m('img.span.four', {
		  config:function(e,isinit){
		      if(isinit)
			  return;
		      
		      self.imgElementA=e;
		  },
                    src:_Globals.screenShots[0]
              }),
              m('img.span.four', {
		  config:function(e,isinit){
		      if(isinit)
			  return;
		      
		      self.imgElementB=e;
		  },
                    src: _Globals.screenShots[1]
              }),
	      m('img.span.four', {
		  config:function(e,isinit){
		      if(isinit){
			  return;}
		      setTimeout(getImageDiff,100)
		      
		      self.imgElementC=e;
		  },
                    src: _Globals.diff.screenShot
              })
	       ))
        
    },
    updateSource:function(){
	//console.log(Globals.screenShots[0],this.imgElementA)
	//var screenShotA=_Globals.screenShots[0];
	//console.log('>>>>',screenShotA,this.imgElementA);
	//this.imgElementA.src=screenShotA;
	    
	//console.log("AAAA",this.imgElementA.src);
	if(typeof this.imgElementB!=='undefined' && typeof Globals.screenShots !==  'undefined'){
	  this.imgElementB.src=Globals.screenShots[1];
	    }
	
    }
};

var testTube = {
    view: function() {
        return m('.span.twelve',
            m('.span.four',
                m('img', {
                    src: './img/keys.png'
                }),
                m('', Globals.testTubeKey)),
            m('.span.four',
                m('img', {
                    src: (Globals.testTube !== '') ? './img/testTube.png' : './img/testTubeEmpty.png'
                }), Globals.testTube),
            m('.span.four',
                m('img', {
                    src: (Globals.oldTestTube !== '') ? './img/testTube.png' : './img/testTubeEmpty.png'
                }), Globals.oldTestTube));

    }

};

var beaker = {
    view: function() {

        if (typeof Globals.beaker !== 'undefined')
            var mappable = true;
        return m('.span.twelve',
            m('.span.four',
                m('img', {
                    src: './img/network.png'
                }), m('', Globals.beakerKey)), mappable ? Globals.beaker.map(function(beakerContent) {
                return m('.beaker',
                    m('.span.four',
                        m('img', {
                            src: './img/beaker.png'
                        }), beakerContent));


            }) : null);


    }
};

var description = {
    view: function() {
        return m('',
            m('', 'Current step description:'),
            m('', Globals.stepDescription));


    }
};

var descriptionHistory = {
    controller: function() {
        var self = this;
        this.descriptionHistory = [];
        setInterval(function() {
            var length = self.descriptionHistory.length;
            if (self.descriptionHistory[length - 1] !== Globals.stepDescription) {
                self.descriptionHistory.push(Globals.stepDescription);

            }

        }, 10);

    },
    view: function(ctrl) {
        var self = this;
        return m('.historyBox',
            m('', 'Step History:'),
            m('',
                ctrl.descriptionHistory.map(function(description, i) {
                    return m('',
                        m('span', i + ')'),
                        m('span', description)
                    );
                })
            )
        );

    }

};

var messages = {

    view: function() {
        var mappable;
        if (Globals.messagePool)
            mappable = true;
        else
            mappable = false;
        return m('', mappable ? Globals.messagePool.map(function(message) {
            var status, icon = '.fa.fa-file',
                color;
            switch (message.status) {
                case '\033[97m\033[42m PASS \033[37m\033[49m ':
                    status = 'pass';
                    icon = '.fa.fa-check';
                    break;
                case '\033[107m\033[34m >>>> \033[37m\033[49m ':
                    status = 'step';
                    icon = '.fa.fa-clock-o';
                    break;
                case '\033[97m\033[44m INFO \033[37m\033[49m ':
                    status = 'info';
                    icon = '.fa.fa-info-circle';
                    break;
                case '\033[97;48;5;165m URL  \033[0m\033[37m\033[49m':
                    status = 'url';
                    icon = '.fa.fa-link';
                    break;
                case '\033[97m\033[41m FAIL \033[37m\033[49m ':
                    status = 'fail';
                    icon = '.fa.fa-times';
                    break;
                case '\033[1m NEXT \033[0m\033[37m\033[49m ':
                    status = 'seperate';
                    icon = '.fa.fa-circle-o';
                    message.content = '---------------------------------------------------------------------';
                    break;
            }
            return m('',
                m('i' + icon + '.' + status, ' '),
                m('span', message.content)
            )
        }) : null)
    }

};

var selectStepList = {

    controller: function() {
        var self = this;
        this.populated = false;
        var names = m.request({
            method: "GET",
            url: "http://dev.testtube:8001/steps/?names",
            background: true
        }).then(function(response) {
            console.log(response);
            self.list = response.sort();
        });

        this.onunload = function() {
            this.mappable = false;
            this.populated = false;
        };
    },

    view: function(ctrl) {
        var self = this;

        (typeof ctrl.list === 'undefined') ? ctrl.mappable = false: ctrl.mappable = true;
        return m('select', {
                config: function(selectElement, isinit) {
                    if (isinit)
                        return;
                    self.selectElement = selectElement;

                },
                onchange: function(e) {

                    if (typeof self.selected === 'undefined') {
                        self.selected = {};
                    }
                    self.selected.name = e.target.value;
                    m.request({
                        method: "GET",
                        url: "http://127.0.0.1:8001/step/?" + self.selected.name,
                        background: false
                    }).then(function(response) {
                        //selectedStep:::
                        self.selected = response;
                        _Globals.selectedStep = response;

                        console.log('SelectedStep', _Globals.selectedStep);
                        self.infoShowable = true;

                    });

                }
            },

            ctrl.mappable ? ctrl.list.map(function(name, i) {
                return m('option', name);

            }) : null);
    }
};

var selectSetList = {
    
    controller: function() {
        var self = this;
        this.mappable = false;
        this.list = [];
        var names = m.request({
            method: "GET",
            url: "http://127.0.0.1:8001/sets/?names",
            background: true
        }).then(function(response) {
            self.selected = response;
            self.list = response;
            console.log(self.list);
        });

        this.onunload = function() {
            this.mappable = false;
            this.populated = false;
        };
    },

    view: function(ctrl) {
        var self = this;


        return m('select', {
            onchange: function(e) {
                if (typeof self.selected === 'undefined') {
                    self.selected = {};
                }
                self.selected.name = e.target.value;
                m.request({
                    method: "GET",
                    url: "http://127.0.0.1:8001/set/?" + self.selected.name,
                    background: false
                }).then(function(response) {
                    //selectedStep:::
                    self.selected = response;
                    _Globals.set = response;
                    console.log('SelectedStep', _Globals.set);
                    self.infoShowable = true;
		    m.redraw();
                });
            },

            config: function(selectElement, isinit) {
                if (isinit)
                    return;
                self.selectElement = selectElement;
                ctrl.mappable = true;

            }
        }, ctrl.list.map(function(name, i) {
            return m('option', name);
        }));
    }
};

// var actionButtons = {

//     actions: [],
//     view: function() {

//         var self = this;
//         return m('span',





//         );

//     }
// };

var setList = {
    
    view: function() {
	
	
        return m('.span.twelve',m('ul',
            _Globals.set.content.map(function(set, i) {
                return m('li', m('span',i+') '),m('.fa.fa-minus-circle', {
                        onclick: function() {
                            _Globals.set.content.splice(i, 1);
                        }
                }),
                    m('input', {
                        onchange: m.withAttr('value', function(value) {
                            _Globals.set.content[i].repetition = value;
                        }),
                        placeholder: _Globals.set.content[i].repetition,
                        style: {
                            width: "50px"
                        }
                    }), set.name
                );
            })
				 ));
    }
};

// var stepList = {
//     view: function() {

//         return m('ul',

// 		 _Globals.selectedStep.content.map(function(step, i) {
//             return step.action ? m('li', 'Action: ' + i + ') ' + step.action, m('span.des', " >>> " + step.des)) : m('.des', step.description);
//         }));
//     }
// };

var build = {
    content: [],
    data: {},

    controller: function() {

    },
    action: '',
    view: function(ctrl) {

        var self = this;
        return m('.page',
	    m.component(header),
            m.component(tabs, {
                buttons: [{
                    label: 'Steps'
                }, {
                    label: 'Sets of Steps'
                }],
                getState: function(e) {
                    _Globals.tab = e.index;

                },

                autofit: false
            }),
		 (_Globals.tab == 0) ? m.component(stepsTabView, self) : null,
		 (_Globals.tab == 1) ? m.component(setsTabView) : null
		);



        
    },

    makeStep: function() {
        var self = this,
            row;
        (this.rowNumber !== '') ? (row = Number(this.rowNumber)) : null;
        
        var key = self.key;
	
	console.log('HERE',self.action);
	
        if (!isNaN(row)) {
            _Globals.selectedStep.content.splice(row, 0, {
                action: self.action,
                tag: self.selector,
                key: self.keyz,
                expect: self.expect ? self.expect : null,
                des: self.description
            });
            this.rowNumber = '';
        } else if (self.action == 'compareTestTubes' && self.custom) {
            _Globals.selectedStep.content.push({
                action: self.action,
                tag: self.selector,
                key: self.keyz ? self.keyz : null,
                expect: self.expect ? self.expect : null,
                expression: self.customExpression,
                type: 'custom',
                des: self.description
            });

        } else if(self.action=='compare'){
	    console.log('Compare DATA',self.arg0,self.arg1);
	    _Globals.selectedStep.content.push({
                action: self.action,
		arg0:self.arg0,
		arg1:self.arg1,
		type:self.type,
                expect: self.expect ? self.expect : null,
                expression: self.customExpression,
                des: self.description
            });

	} else{
            _Globals.selectedStep.content.push({
                action: self.action,
                tag: self.selector,
                key: self.keyz ? self.keyz : null,
                expect: self.expect ? self.expect : null,
                des: self.description
            });
        }
    },

    makeData: function() {
        var self = this;
	
        if (_Globals.selectedStep.content[_Globals.selectedStep.content.length - 1].action !== 'done')
            _Globals.selectedStep.content.push({
                action: 'done'
            });

        if (typeof _Globals.selectedStep.content[0].description === 'undefined')
            _Globals.selectedStep.content.unshift({
                description: self.stepsDescription
            });

        self.data = {
            name: self.stepsName,
            content: _Globals.selectedStep.content,
            dataStore: 'steps',
            categoery: self.category,
            infos: {
                time: new Date()
            }
        };
        m.request({
            method: "POST",
            url: "http://dev.testtube:8001/steps/?save",
            dataType: 'application/json',
            background: true,
            data: JSON.stringify(self.data)
        }).then(function(response) {
            console.log("!!!!", response);

        });
        console.log(self.data)
    },

    delete: function(_id) {
        console.log('Will now make delete request', _id);
        m.request({
            method: "POST",
            url: "http://dev.testtube:8001/steps/?delete",
            dataType: 'application/json',
            background: true,
            data: JSON.stringify({
                id: _id
            })
        }).then(function(response) {
            console.log("!!!!", response);


        });
    }
};

var stepsTabView = {

    view: function(ctrl, parent) {
        var self = this;
        return m('',

            m.component(dialog),
            m.component(selectStepList),
            //m.component(selectSetList),
            m('.actions.span.twelve',
                //m.component(actionButtons),
                m('i.playBtncontainer' + _Globals.icons.playStep, {
                    onclick: function() {

                        m.request({
                            method: "GET",
                            url: "http://127.0.0.1:8001/play/?steps",
                            background: true
                        });
                    }
                }),
                m('span', {
                    onclick: function() {
                        console.log(_Globals.selectedStep._id);
                        dialog.show({
                            title: 'Just to make sure:',
                            body: 'You are one step away from deleting \n' + _Globals.selectedStep.name,
                            footer: [
                                m.component(btn, {
                                    label: 'Cancel',
                                    events: {
                                        onclick: function() {
                                            self.deleteFlag = false;
                                            dialog.hide(1);
                                        }
                                    }
                                }),
                                m.component(btn, {
                                    label: 'Delete',
                                    events: {
                                        onclick: function() {
                                            self.deleteFlag = true;
                                            dialog.hide(1);
                                        }
                                    }

                                })
                            ],
                            backdrop: true,
                            didHide: function() {
                                console.log('dialog closed callback function', self.deleteFlag);
                                if (self.deleteFlag)
                                    parent.delete(_Globals.selectedStep._id);

                            }

                        }, 1);


                    }
                }, deleteBtn)
            ),
            m('.span.twelve',
                m('.stepForm.span.eight',
                    m.component(textfield, {
                        label: 'Step Name',
                        floatingLabel: true,
                        class: 'stepInputs',
                        help: 'Enter the name for the test steps',
                        focusHelp: true,
                        dense: true,
                        required: true,
                        fullWidth: false,
                        validateAtStart: false,
                        value: () => (_Globals.selectedStep.name),
                        getState: function(e) {
                            self.stepsName = e.value;
                            _Globals.selectedStep.name = e.value;
                        }
                    }, self),
                    m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Steps Description',
                        floatingLabel: true,
                        help: 'Input a description for all of the steps in the test',
                        focusHelp: true,
                        dense: true,
                        required: true,
                        fullWidth: false,
                        validateAtStart: false,
                        value: () => (_Globals.selectedStep.content[0].description),
                        getState: function(e) {
                            _Globals.selectedStep.content[0].description = e.value;
                            self.stepsDescription = e.value;

                        }
                    }, self),
                    m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Category',
                        floatingLabel: true,
                        dense: true,
                        required: true,
                        fullWidth: false,
                        value: () => (_Globals.selectedStep.categoery),
                        getState: function(e) {
                            _Globals.selectedStep.categoery = e.value;
                            self.category = e.value;
                        }
                    }, self)
                )),
            m('.span.twelve',
                m.component(actionsMenu, self),
                m('.span.twelve',
                    m.component(textfield, {
                        label: 'Add to Row',
                        floatingLabel: true,
                        type: 'number',
                        class: 'addToRow',
                        help: 'Row to insert in to',
                        focusHelp: true,
                        dense: true,
                        fullWidth: false,
                        validateAtStart: false,
                        getState: function(e) {
                            self.rowNumber = e.value;
                        }
                    }, self),
                    m.component(btn, {
                        class: 'addBtn',
                        small: true,
                        content: m('i.fa.fa-plus.fa-3x'),
                        events: {
			    
                            onclick: parent.makeStep.bind(self)
			    
                        }
                    }, parent),
                    m.component(btn, {
                        label: 'Build&Save Steps',
                        raised: true,
                        events: {
                            onclick: parent.makeData.bind(self)

                        }
                    }, parent)

                )),
            m.component(testSteps, self));
    }
};

var setsTabView = {
    view: function() {
        return m('',
            m('.span.twelve.hello',

                m.component(selectStepList),
                m.component(selectSetList),
                m('',
                    m('i.fa.fa-toggle-right.fa-3x.playBtncontainer', {
                        onclick: function() {

                            m.request({
                                method: "post",
                                url: "http://127.0.0.1:8001/play/?set",
                                background: true,
                                data: _Globals.set.content
                            });
                        }
                    }),
                    m.component(btn, {
                        label: 'Add to set',
                        raised: true,
                        events: {
                            onclick: function() {
				var row;
				var data = {
                                    name: _Globals.selectedStep.name,
                                    repetition: 0
                                };
				(_Globals.setRow !== '') ? (row = Number(_Globals.setRow)) : null;
				console.log('R',row)
				if (!isNaN(row)) {
				    _Globals.set.content.splice(row, 0, data);
				    _Globals.setRow = '';
				}else{
                                    _Globals.set.content.push(data);}
                                
                            }
                        }
                    }),
                    m.component(btn, {
                        label: 'Build&Save Set',
                        raised: true,
                        events: {
                            onclick: function() {
                                console.log(_Globals.set);
                                m.request({
                                    method: "POST",
                                    url: "http://dev.testtube:8001/sets/?save",
                                    dataType: 'application/json',
                                    background: true,
                                    data: JSON.stringify(_Globals.set)
                                }).then(function(response) {
                                    console.log("!!!!", response);

                                });
                            }
                        }
                    })
                ),
                m('.stepForm.span.eight',

                    m.component(textfield, {
                        label: 'Set Name',
                        floatingLabel: true,
                        class: 'stepInputs',
                        help: 'Enter the name for the test set',
                        focusHelp: true,
                        dense: true,
                        required: true,
                        fullWidth: false,
                        validateAtStart: false,
                        value: () => (_Globals.set.name),
                        getState: function(e) {
                            self.setName = e.value;
                            _Globals.set.name = e.value;
                        }
                    }, self),
                    m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Set Description',
                        floatingLabel: true,
                        help: 'Input a description for all of the set',
                        focusHelp: true,
                        dense: true,
                        required: true,
                        fullWidth: false,
                        validateAtStart: false,
                        value: () => (_Globals.set.description),
                        getState: function(e) {
                            _Globals.set.description = e.value;
                            self.setDescription = e.value;

                        }
                    }, self)
                 ),m.component(textfield, {
                        label: 'Add to Row',
                        floatingLabel: true,
                        type: 'number',
                        class: 'addToRow',
                        help: 'Row to insert in to',
                        focusHelp: true,
                        dense: true,
                        fullWidth: false,
                        validateAtStart: false,
                        getState: function(e) {
                            _Globals.setRow = e.value;
			    console.log(_Globals.setRow)
                        }
                    }, self)
	     ),
            _Globals.set ? m.component(setList) : null

        )

    }
};


var set = {
    view: function() {
        return m('',
            _Globals.set.content.map(function(setName, i) {
                return m.component(listTile, {
                    title: setName,
                    compact: true
                });
            }));
    }
};

var actionsMenu = {

    controller: function(parent) {

        var onlyTag = {
                view: function() {
                    return m('', m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Selector',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            console.log(e)
                            parent.selector = e.value;
                        }
                    }, self), m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Description',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            build.description = e.value;
                        }
                    }, self));
                }
            },

            onlyKey = {
                view: function() {
                    return m('', m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Selector',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {

                            parent.keyz = e.value;
                        }
                    }, self), m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Description',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            build.description = e.value;
                        }
                    }, self));
                }
            },

            tagAndKeyForm = {
                view: function() {
                    return m('', m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Selector',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            parent.selector = e.value;
                        }
                    }, self), m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Key',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            parent.keyz = e.value;
                        }
                    }, self), m.component(textfield, {
                        class: 'stepInputs',
                        label: 'Description',
                        floatingLabel: true,
                        dense: true,
                        fullWidth: false,
                        getState: function(e) {
                            parent.description = e.value;
                        }
                    }, self));
                }
            },

            compareForm = {
		controller:function(){
		    this.open=false;
		    this.types=['dataContains','dataToDataEquals','dataToStringEquals'];
		},
                view: function(ctrl) {
		    
                    return m('.container',
			     m('.actionsMenu',m('a', {
				 href: 'javascript: void(0)',
				 id: 'simple_btn', // use as menu's target
				 onclick: () => (ctrl.open = true) // opens at next redraw
			     }, 'Type'),
			     m.component(menu, {
				 target: 'simple_btn', // to align with the link
				 offset: 0, // horizontally align with link
				 show: ctrl.open, // should the menu be open or closed?
				 didHide: () => (ctrl.open = false), // called after closing
				 content: m.component(list, {
				     tiles:ctrl.types.map(function(type){
					 return m.component(listTile, {
					     title: type,
					     ink: true,
					     events:{
						 onclick:function(){
						     parent.type=type;
						     console.log(parent);
						 }
					     }
					     
					 });
				     })


				 })
			     }),
			     m.component(textfield, {
				 class: 'stepInputs',
				 label: 'argument 0',
				 floatingLabel: true,
				 dense: true,
				 fullWidth: false,
				 getState: function(e) {
				     parent.arg0 = e.value;
				 }
			     }, self),
			     m.component(textfield, {
				 class: 'stepInputs',
				 label: 'argument 1',
				 floatingLabel: true,
				 dense: true,
				 fullWidth: false,
				 getState: function(e) {
				     parent.arg1 = e.value;
				 }
			     }, self),
			      
			     m.component(textfield, {
				 class: 'stepInputs',
				 label: 'expect',
				 floatingLabel: true,
				 dense: true,
				 fullWidth: false,
				 getState: function(e) {
				     parent.expect = e.value;
				 }
			     }, self))
			    );
		    
                }
            },

            expect = {
                custom: false,
                view: function() {
                    var self = this;
                    return m('',
                        m.component(textfield, {
                            class: 'stepInputs',
                            label: 'Expected Value',
                            floatingLabel: true,
                            dense: true,
                            fullWidth: false,
                            getState: function(e) {
                                // _Globals.selectedStep.categoery=e.value;
                                parent.expect = e.value;
                            }
                        }, self),
                        this.custom ? m.component(textfield, {
                            class: 'stepInputs',
                            label: 'Evaluation Expression',
                            help: 'example: (2*T1==T2)?Expected:',
                            floatingLabel: true,
                            dense: true,
                            fullWidth: false,
                            getState: function(e) {
                                // _Globals.selectedStep.categoery=e.value;
                                parent.customExpression = e.value;
                            }
                        }, self) : null,
                        m.component(textfield, {
                            class: 'stepInputs',
                            label: 'Description',
                            floatingLabel: true,
                            dense: true,
                            fullWidth: false,
                            getState: function(e) {
                                // _Globals.selectedStep.categoery=e.value;
                                parent.description = e.value;
                            }
                        }, self),
                        m('', m.component(checkbox, {
                            label: 'Cutsom Operation',
                            getState: function state(e) {
                                self.custom = e.el.checked
                                parent.custom = e.el.checked

                            }
                        }, self)));
                }
            },
	    
            empty = {
                view: function() {
                    return m('');
                }
            };

        this.actionForms = {
            'navigateUrl': onlyKey,
            'navigateTestTube': empty,
            'waitForVisibility': onlyTag,
            'click': onlyTag,
            'removeClass': onlyTag,
            'realClick': onlyTag,
            'focus': onlyTag,
            'sendKeys': tagAndKeyForm,
            'getElementContent': onlyTag,
            'getUrlContent': empty,
            'compareTestTubeBeaker': empty,
            'waitPlaybackStart': empty,
            'waitPlaybackEnd': empty,
            'searchAndClickFromBeaker': empty,
            'searchAndClick': tagAndKeyForm,
            'reload': empty,
            'historyBack': empty,
            'historyForward': empty,
            'getNetworkContent': onlyKey,
            'compareTestTubes': expect,
            'wait': onlyKey,
            'compare': compareForm,
	    'screenShot':empty,
            'deadLinkChecker': empty
        };


        this.actions = Object.keys(this.actionForms);
    },

    empty: {
        view: function() {
            return m('');
        }
    },

    view: function(ctrl, parent) {
        var self = this;
        return m('', m('.actionsMenu.span.three',
                m('a', {

                        href: 'javascript: void(0)',
                        id: 'simple_btn', // use as menu's target
                        onclick: () => (ctrl.open = true) // opens at next redraw
                    },
                    m.trust(SvgMenu), 'Action: ' + parent.action),
                m.component(menu, {
                        size: 5,
                        transition: 'both',
                        target: 'simple_btn', // to align with the link
                        offset: 0, // horizontally align with link
                        show: ctrl.open, // should the menu be open or closed?
                        didHide: () => (ctrl.open = false), // called after closing
                        content: m.component(list, {
                            tiles: ctrl.actions.map(function(name, i) {
                                return m.component(listTile, {
                                    front: {
                                        view: function() {
                                            return m('i.fa.fa-bookmark');
                                        }
                                    },
                                    title: name,
                                    ink: true,
                                    ripple: true,
                                    events: {
                                        onclick: function() {
					    console.log(name)
                                            parent.action = name;
                                            self.action = name;
                                        }
                                    }

                                }, parent, self);
                            })


                        })
                    }

                )),
            m('.span.six', m.component(ctrl.actionForms[self.action] ? ctrl.actionForms[self.action] : this.empty))
        );
    }
};

var testSteps = {
    view: function(ctrl, self) {
        return m('.span.twelve', _Globals.selectedStep.content.map(function(step, i) {
            return m('span.span.twelve.noMargin',
                m('span', i + ') '),
                m('i.fa.fa-minus-circle', {
                    onclick: function() {
                        _Globals.selectedStep.content.splice(i, 1);
                    }
                }),
                JSON.stringify(step));
        }));
    }
};;

var load = {
    view: function() {
        return [
	    m.component(header),
            m.component(selectStepList),
            // selectStepList.infoShowable ? m.component(stepList) : null,
	    //m('',Globals.selected.name)
        ];

    }
};

socket.on('time',function(time){
    console.log('time :',time);
    
});
var post={
    view:function(){
	return [m('button',{onclick:function(){
	    console.log('yay');
	    m.request({
            method: "POST",
            url: "http://dev.testtube:8001/",
            dataType: 'application/json',
            background: true,
		data: JSON.stringify({'name':'farzan'})
        }).then(function(response) {
            console.log("!!!!", response);

        });
	    
	}
			   },'Click'),
		m('button',{onclick:function(){
		    console.log('kitty');
		    m.request({
			method: "POST",
			url: "http://dev.testtube:8001/kitty",
			dataType: 'application/json',
            background: true,
		data: JSON.stringify({'name':'farzan'})
        }).then(function(response) {
            console.log("!!!!", response);

        });
	    
	}
			   },'kitty'),
		m('button',{onclick:function(){
		    console.log('puppy');
		    m.request({
			method: "POST",
			url: "http://dev.testtube:8001/puppy",
			dataType: 'application/json',
            background: true,
		data: JSON.stringify({'name':'farzan'})
        }).then(function(response) {
            console.log("!!!!", response);

        });
	    
	}
			   },'puppy')


	       ];
    }
}
m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': test,
    '/report': test,
    '/load': load,
    '/build': build,
    '/post':post
});

var initElement = document.getElementsByTagName("html")[0];
var json = mapDOM(initElement, true);

//console.log(json);

// Test with a string.
// initElement = "<div><span>text</span>Text2</div>";
// json = mapDOM(initElement, true);
// console.log(json);

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

