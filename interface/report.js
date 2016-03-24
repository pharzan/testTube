var socket = io('http://127.0.0.1:3000');
var time = 'hi';

var Globals = {};
var _Globals = {selectedStep:{name:'',
			      categoery:'',
			      content:[{description:''}]},
		build:false,
		set:{content:[]}
	       };
//Globals.selected.name = 'nothing selected yet';
socket.on('time', function(data) {
    //console.log(data.time);
    m.startComputation();
    time = data.time;
    Globals = data;
    m.endComputation();
    //addMessage(data.time);

});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

var test = {
    view: function() {
        return m('',
            m.component(header),
            m('.span.six',
                m('.class', time),
                m.component(description),
                m.component(url),
                m.component(testTube),
                m.component(beaker)
            ), m('.span.six', m.component(messages)));
    }
};


var btn= require ( 'polythene/button/button');
var dialog= require( 'polythene/dialog/dialog');
var textfield =require( 'polythene/textfield/textfield');
var fabtn = require( 'polythene/fab/fab');
var card = require( 'polythene/card/card');

var menu=require( 'polythene/menu/menu');
var list=require( 'polythene/list/list');
var listTile=require( 'polythene/list-tile/list-tile');

const loadBtn = m.component(btn, {
    label: 'Load',
    raised: true,
    events: {
        onclick: function(){
	    m.route('/load')
	}
    }
});;
const reportBtn = m.component(btn, {
    label: 'Report',
    raised: true,
    selected:_Globals.build,
    events: {
        onclick: function(){
	    m.route('/report')
	}
    }
});;
const buildBtn = m.component(btn, {
    label: 'Build',
    raised: true,
    
    events: {
        onclick: function(){
	    console.log("1",_Globals.build)
	    _Globals.build=true;
	    console.log("2",_Globals.build)
	    m.route('/build')
	}
    }
});;

const SvgPlus='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L 12.9994,18.998L 10.9994,18.998L 10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 10.9994,4.99805L 12.9994,4.99805L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

const SvgMinus='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L  10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

var header={
    controller:function(){
	

    },
    view:function()   {
	
	return m('',m.component(loadBtn),m.component(reportBtn),m.component(buildBtn))
    }
};
// var header = {
//     view: function() {
	
//         return m('.header',m.component(app),
//             m('span', {
//                 onclick: function() {
//                     m.route('/load')
//                 }
//             }, 'Load'),
//             m('span', {
//                 onclick: function() {
//                     m.route('/report')
//                 }
//             }, 'Report'),
//             m('span', {
//                 onclick: function() {
//                     m.route('/build')
//                 }
//             }, 'New')

//         );
//     }

// };

var url = {
    view: function() {

        return m('.span.twelve',
            m('.span.twelve', m('a', {
                    href: Globals.currentUrl
                },
                m('img', {
                    src: './img/link.png'
                }), Globals.currentUrl)),
            m('.span.twelve', m('a', {
                    href: Globals.oldUrl
                },
                m('img', {
                    src: './img/linkGrey.png'
                }), Globals.oldUrl))
        );
    }
};

var testTube = {
    view: function() {
        return m('.span.twelve',
            m('.span.three',
                m('img', {
                    src: './img/keys.png'
                }),
                m('', Globals.testTubeKey)),
            m('.span.three',
                m('img', {
                    src: (Globals.testTube !== '') ? './img/testTube.png' : './img/testTubeEmpty.png'
                }), Globals.testTube),
            m('.span.three',
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
            m('.span.three',
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
	this.populated=false;
        var names = m.request({
            method: "GET",
            url: "http://dev.testtube:8001/steps/?names",
            background: true
        }).then(function(response) {
            console.log(response);
            self.list = response;
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
            oninput: function(e) {
		
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

                if (i == ctrl.list.length - 1) {
                    ctrl.populated = true;
                }
                if (ctrl.populated)
                    return;
                self.selectElement.options[self.selectElement.options.length] = new Option(i + ') ' + name, name);
            }) : null);
    }
};

var selectSetList = {

    controller: function() {
        var self = this;

        var names = m.request({
            method: "GET",
            url: "http://127.0.0.1:8001/sets/?names",
            background: true
        }).then(function(response) {
            self.selected = response;
            self.list = response;
        });

        this.onunload = function() {
            this.mappable = false;
            this.populated = false;
        };
    },

    view: function(ctrl) {
        var self = this;

        (typeof ctrl.list === 'undefined') ? ctrl.mappable = false: ctrl.mappable = true;
        return m('', m('select', {
                config: function(selectElement, isinit) {
                    if (isinit)
                        return;
                    self.selectElement = selectElement;

                },
                oninput: function(e) {
                    if (typeof self.selected === 'undefined') {
                        self.selected = {};
                    }

                    self.selected.name = e.target.value;
                    m.request({
                        method: "GET",
                        url: "http://127.0.0.1:8001/set/?" + self.selected.name,
                        background: false
                    }).then(function(response) {
                        self.selected = response;
                        _Globals.selectedSet = response;

                        console.log('SelectedSet', _Globals.selectedSet);
                        self.infoShowable = true;
                    });
                }

            },
            ctrl.mappable ? ctrl.list.map(function(name, i) {

                if (i == ctrl.list.length - 1) {
                    ctrl.populated = true;
                }
                if (ctrl.populated)
                    return;

                self.selectElement.options[self.selectElement.options.length] = new Option(i + ') ' + name, name);


            }) : null));
    }
};

var actionButtons = {

    actions: [],
    view: function() {

        var self = this;
        return m('',
            m('button', {
                onclick: function() {

                    m.request({
                        method: "GET",
                        url: "http://127.0.0.1:8001/play/?set",
                        background: true
                    });
                }
            }, 'PLAY Set!'),

            m('button', {
                onclick: function() {

                    m.request({
                        method: "GET",
                        url: "http://127.0.0.1:8001/play/?steps",
                        background: true
                    });
                }
            }, 'PLAY Steps')


        );

    }
};

var setList = {
    view: function() {
        
        return m('ul', _Globals.set.map(function(set) {
            return m('li', set);
        }))
    }
};

var stepList = {
    view: function() {
        return m('ul',
		 _Globals.selectedStep.content.map(function(step, i) {
            return step.action ? m('li', 'Action: ' + i + ') ' + step.action, m('span.des', " >>> " + step.des)) : m('.des', step.description);
        }));
    }
};

var List = function() {

    var view = function(ctrl, actions) {

        return m('ul', actions.map(function(action) {
            return m('li', {
                key: Math.random()
            }, action);
        }));
    };
    return {
        view: view
    };
};

var build = {
    content: [],
    data: {},
    
    controller: function() {
	var onlyTag={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Selector',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.selector = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			// _Globals.selectedStep.categoery=e.value;
			build.description = e.value;
		    }},self));
	}};

		// return
				     // m('span',
			    // 		      m('lable', 'selector'),
			    // 		      m('input', {
			    // 	oninput: function(e) {
			    // 	    build.selector = this.value;
			    // 	}
			    // }),
			    // 		      m('lable', 'description'),
			    // 		      m('input', {
			    // 			  oninput: function() {
			    // 			      build.description = this.value;
			    // 			  }
			    // 		      }));		     
				    
	var onlyKey={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Key',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.key = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			// _Globals.selectedStep.categoery=e.value;
			build.description = e.value;
		    }},self));
	}};

		// {view:function(){return m('span',
		// 			      m('lable', 'Key'),
		// 			      m('input', {
		// 		oninput: function(e) {
		// 		    build.key = this.value;
		// 		}
		// 	    }),
		// 			      m('lable', 'description'),
		// 			      m('input', {
		// 				  oninput: function() {
		// 				      build.description = this.value;
		// 				  }
		// 			      }));
	// 		    }};
	
	var tagAndKeyForm={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Selector',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.selector = e.value;
		}},self),m.component(textfield, {
		class:'stepInputs',
		label: 'Key',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.key = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			// _Globals.selectedStep.categoery=e.value;
			build.description = e.value;
		    }},self));
	}};


		// {view:function(){return m('span',
		// 			      m('lable', 'tag'),
		// 			      m('input', {
		// 		oninput: function(e) {
		// 		    build.tag = this.value;
		// 		}
		// 	    }),
		// 			      m('lable', 'Key'),
		// 			      m('input', {
		// 		oninput: function(e) {
		// 		    build.key = this.value;
		// 		}
		// 	    }),
		// 				    m('lable', 'description'),
		// 				    m('input', {
		// 				  oninput: function() {
		// 				      build.description = this.value;
		// 				  }
		// 				    }));
					   
	// 		    }};
	
	var compareForm={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Key',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.key = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			// _Globals.selectedStep.categoery=e.value;
			build.description = e.value;
		    }},self));
	}};


		// {view:function(){return m('span',
			// 		      m('lable', 'Key'),
			// 		      m('input', {
			// 	oninput: function(e) {
			// 	    build.key = this.value;
			// 	}
			//     }),
			// 		      m('lable', 'description'),
			// 		      m('input', {
			// 			  oninput: function() {
			// 			      build.description = this.value;
			// 			  }
			// 		      }));
			// 	    }};
	var expect={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Expected Value',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    // _Globals.selectedStep.categoery=e.value;
		    build.expect = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			// _Globals.selectedStep.categoery=e.value;
			build.description = e.value;
		    }},self));
	}};



		// {view:function(){return m('span',
		   // 			      m('lable', 'Expected:(diff or string)'),
		   // 			      m('input', {
		   // 		oninput: function(e) {
		   // 		    build.expect = this.value;
		   // 		}}))}
			    
	// 		    };
	
	var empty={view:function(){
	    return m('');
	}};
        this.actionForms = {
	    'navigateUrl':onlyKey,
	    'waitForVisibility':onlyTag,
	    'click':onlyTag,
	    'focus':onlyTag,
	    'sendKeys':tagAndKeyForm,
	    'getElementContent':onlyTag,
	    'getUrlContent':empty,
	    'compareTestTubeBeaker':empty,
	    'waitPlaybackStart':empty,
	    'waitPlaybackEnd':empty,
	    'searchAndClickFromBeaker':empty,
	    'reload':empty,
	    'historyBack':empty,
	    'historyForward':empty,
	    'getNetworkContent':onlyKey,
	    'compareTestTubes':expect,
	    'wait':onlyKey,
	    'compare':compareForm
	    		    
			   };
	this.actions=Object.keys(this.actionForms);
    },
    fetchFlag: false,
    deleteFlag:false,
    action:'waitForVisibility',
    view: function(ctrl) {
        var self = this;
        return [m.component(header),m.component(dialog),
		m.component(selectStepList),
		m('button',{
		    onclick: function() {
			_Globals.set.content.push(_Globals.selectedSteps.name);
			console.log(_Globals.set.content)
                    }},'Add to set'),
		m('button', {
                    onclick: function() {
			console.log(_Globals.selectedStep.name,_Globals);
			self.stepsName=_Globals.selectedStep.name;
			self.content=_Globals.selectedStep.content;
			self.fetchFlag = true;
                    }
		}, 'fetch'),
		m('button', {
                    onclick: function() {
			console.log(_Globals.selectedStep.name);
			self.fetchFlag = false;
                    }
		}, 'edit'),
		m('button', {
                    onclick: function() {
			console.log(_Globals.selectedStep._id);
			dialog.show({
                            title: 'Just to make sure:',
                            body: 'You are one step away from deleting \n'+_Globals.selectedStep.name,
			    footer:[
				m.component(btn, {
				    label: 'Cancel',
				    events:{onclick:function(){
					self.deleteFlag=false;
					dialog.hide(1);
				    }}
				}),
				m.component(btn, {
				    label: 'Delete',
				    events:{onclick:function(){
					self.deleteFlag=true;
					dialog.hide(1);
				    }}
				    
				})
			    ],	
			    backdrop: true,
			    didHide:function(){
				console.log('dialog closed callback function',self.deleteFlag);
				if(self.deleteFlag)
				    self.delete(_Globals.selectedStep._id);
				
			    }
			    
			},1);
			self.fetchFlag = false;
			
                    }
		}, 'delete'),
		m('.form',
                  // m('lable', 'steps name'),
		  // m('input', {
                  //     oninput: m.withAttr("value", function(e){
		  // 	  self.stepsName=this.value}),
		  //     value:self.stepsName,
		     
                      
                  //     config: function(element, isinit) {
		  // 	  if(isinit)
		  // 	      return
                  //         // if (self.fetchFlag)
                  //             element.value = _Globals.selectedStep.name;
                  //     }

                  // }),
		  m.component(textfield, {
		      label: 'Step Name',
		      floatingLabel: true,
		      class:'stepInputs',
		      help: 'Enter the name for the test steps',
		      focusHelp: true,
		      dense:true,
		      required: true,
		      fullWidth:false,
		      validateAtStart:false,
		      value:() => (_Globals.selectedStep.name),
		      getState:function(e){
		      	  self.stepsName=e.value;
			  _Globals.selectedStep.name=e.value;
		      }
		  },self)),
                  // m('lable', 'steps Description'),
		 //  m('input', {
                 //      oninput: function(e) {
                 //          self.stepsDescription = this.value;
                 //      },
                 //      config: function(element, isisnt) {
                 //          if (self.fetchFlag) {
                 //              element.value = _Globals.selectedStep.content[0].description;
                 //              self.content = _Globals.selectedStep.content;
			      
                 //          }
                 //      }
                 //  })
		  // ),
		m.component(textfield, {
		    class:'stepInputs',
		      label: 'Steps Description',
		      floatingLabel: true,
		      help: 'Input a description for all of the steps in the test',
		      focusHelp: true,
		      dense:true,
		      required: true,
		    fullWidth:false,
		    validateAtStart:false,
		    value:() => (_Globals.selectedStep.content[0].description),
		    getState:function(e){
			_Globals.selectedStep.content[0].description=e.value;
			self.stepsDescription = e.value;
			  
		      }
		},self),
		// m('lable', 'Category'),
		// m('input', {
                //     oninput: function(e) {
		// 	self.category = this.value;
                //     },
                //     config: function(element, isisnt) {
		// 	if (self.fetchFlag)
                //             element.value = _Globals.selectedStep.categoery;
                //     }

		// }),
		m.component(textfield, {
		    class:'stepInputs',
		      label: 'Category',
		      floatingLabel: true,
		      dense:true,
		      required: true,
		    fullWidth:false,
		    value:() => (_Globals.selectedStep.categoery),
		    getState:function(e){
			_Globals.selectedStep.categoery=e.value;
			self.category = e.value;
		      }
		},self),
		m('',
                  // m('lable', 'Action'),
		  m('select', {
                      config: function(selectElement, isinit) {
                          if (isinit)
                              return;
                          ctrl.actions.map(function(name, i) {
                              if (i == ctrl.actions.length) {
                                  ctrl.populated = true;
                              }
                              if (ctrl.populated)
                                  return;
                              selectElement.options[i] = new Option('(' + i + ') ' + name, name);
                          });
                      },
                      oninput: function(e) {
                          self.action = this.value;
			  
                      }
                  }),
		  m.component(ctrl.actionForms[self.action]),
		   m.component(textfield, {
		      label: 'Add to Row',
		       floatingLabel: true,
		       type:'number',
		      class:'stepInputs',
		      help: 'Enter the row number to insert in to',
		      focusHelp: true,
		      dense:true,
		      fullWidth:false,
		      validateAtStart:false,
		      getState:function(e){
		      	 self.rowNumber=e.value;
		      }
		   },self),
		  
		 // m('lable', 'add to row:'),
		  // m('input', {
                  //     oninput: function() {
                  //         self.rowNumber = this.value;
                  //     }
                  // })
		  
		m.component(fabtn, {
		    class:'addBtn',
			 small:true,
			 content:m.trust(SvgPlus),
			 events:{
			     onclick: this.makeStep.bind(self)
			 }
			 
		}),
		  m.component(btn, {
		      label: 'Build&Save',
		      raised: true,
		      events: {
			  onclick: self.makeData.bind(self)
			  
		      }
		  },self)
		 
		 ),
		// m('', this.content.map(function(d, i) {
                //      return m('', m('button', {
                //          onclick: function() {
                //              self.content.splice(i, 1);
                //          }
                //      }, 'remove'),
		// 	      m('button',{
		// 		  onclick:function(){
		// 		      console.log(d,i,self.content[i])
		// 		      self.stepEditor.value=JSON.stringify(d);
		// 	 }
		//      },'Edit'),i+") " ,JSON.stringify(d)
		// 	     );
                //  }),
		// m('button', {
                //     onclick: this.makeStep.bind(self)
		// }, 'add'),
		// m('button', {
                //     onclick: this.makeData.bind(self)
		// }, 'build/Save'),
		m('',
		  m.component(testSteps,self),
		  m.component(set)
		    )
               ];
    },

    makeStep: function() {
        var self = this;
	var row=Number(this.rowNumber);
	var key=self.key;
	// if(!isNaN(row)){
	//     this.content.splice(row, 0, {
	// 	action: self.action,
	// 	tag: self.selector,
	// 	key: self.key?self.key:null,
	// 	expect: self.expect?self.expect:null,
	// 	des: self.description
        //     });
	    
	// }
	// else
	{
            this.content.push({
		action: self.action,
		tag: self.selector,
		key: self.key?self.key:null,
		expect: self.expect?self.expect:null,
		des: self.description
            });
	}
    },
    
    makeData: function() {
        var self = this;
	
	if(self.content[self.content.length-1].action!=='done')
            self.content.push({
		action: 'done'
            });
	
	if(typeof self.content[0].description==='undefined')
            self.content.unshift({
		description: self.stepsDescription
            });
	
        self.data = {
            name: self.stepsName,
            content: self.content,
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
    
    delete:function(_id){
	console.log('Will now make delete request',_id);
	m.request({
            method: "POST",
            url: "http://dev.testtube:8001/steps/?delete",
            dataType: 'application/json',
            background: true,
            data: JSON.stringify({id:_id})
        }).then(function(response) {
            console.log("!!!!", response);
	    

        });
    }
};
// var set={
//     view:function(){
// 	return m('',m('ul',_Globals.set.content.map(function(setName,i){
// 	    return [m('li',m('button',{onclick:function(){
// 		_Globals.set.content.splice(i, 1);
// 	    }},'remove'),m('span',{},setName))];
// 	})),(_Globals.set.content.length!==0)?m('',m('button','Build set')):null)
//     }

// };
    var set={view:function(){return m('',_Globals.set.content.map(function(setName,i){
	return  m.component(listTile, {
            title: setName,
	    compact:true
        });
    }));}
	     
			     // m.component(list, {
//     header: {
//         title: 'My header'
//     },
//     tiles: [
//         m.component(listTile, {
//             title: 'Ali Connors',
//             subtitle: 'Brunch this weekend?',
//             icon: {
//                 type: 'large',
//                 src: 'app/list-tile/avatars/1.png'
//             }
//         }),
//         m.component(listTile, {
//             title: 'Ali Connors',
//             subtitle: 'Brunch this weekend?',
//             icon: {
//                 type: 'large',
//                 src: 'app/list-tile/avatars/1.png'
//             }
//         })
//     ]
// })
	    }

var testSteps={view:function(ctrl,self){
    
    return m('', self.content.map(function(d, i) {
	
	
	return m('',m.component(fabtn, {
		    class:'removeBtn',
			 small:true,
			 content:m.trust(SvgMinus),
			 events:{
			     onclick: function(){
				 self.content.splice(i, 1);
			     }
			 }
			 
	}),m.component(listTile, {
	    class:'fab--mini',
            title: JSON.stringify(d),
	    subtitle:'i',
	    
	    compact:true
        }));


	// m('', m('button', {
        //     onclick: function() {
	// 	self.content.splice(i, 1);
        //     }
	// }, 'remove'),
	// 	 m('button',{
	// 	     onclick:function(){
	// 		 console.log(d,i,self.content[i]);
	// 		 self.stepEditor.value=JSON.stringify(d);
	// 	     }
	// 	 },'Edit'),i+") " ,JSON.stringify(d)
	// 	);
    }));
}};;

var load = {
    view: function() {
        return [m.component(header),
		m.component(actionButtons),
		m.component(simpleContainer),
            m.component(selectStepList),
            selectStepList.infoShowable ? m.component(stepList) : null,
            m.component(selectSetList),
            selectSetList.infoShowable ? m.component(setList) : null,
		
            //m('',Globals.selected.name)
        ];

    }
};

const simpleContainer = {};
simpleContainer.controller = () => {
    return {
        open: false
    };
};
simpleContainer.view = (ctrl) => {
    return m('.container',{style:{position:'relative'}},
        m('a', {
            href: 'javascript: void(0)',
            id: 'simple_btn', // use as menu's target
            onclick: () => (ctrl.open = true) // opens at next redraw
        }, 'Open menu'),
        m.component(menu, {
            target: 'simple_btn', // to align with the link
            offset: 0, // horizontally align with link
            show: ctrl.open, // should the menu be open or closed?
            didHide: () => (ctrl.open = false), // called after closing
            content: m.component(list, {
                tiles: createList()
                    
                
            })
        })
    );
};
var createList=function(){

    // var names = m.request({
    //         method: "GET",
    //         url: "http://127.0.0.1:8001/steps/?names",
    //         background: true
    //     }).then(function(response) {
    //         var components=[];
    //         self.list = response;
    // 	    self.list.map(function(name){
    // 		components.push(m.component(listTile, {
    //                     title: 'Yes',
    //                     ink: true}
    // 					   ));
//	    });

	    return ;

//	});
};
m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/':test,
    '/report': test,
    '/load': load,
    '/build': build
});

var initElement = document.getElementsByTagName("html")[0];
var json = mapDOM(initElement, true);
console.log(json);

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
