var socket = io('http://127.0.0.1:3000');
var time = 'hi';

var Globals = {};
var _Globals = {selectedStep:{name:'',
			      categoery:'',
			      content:[{description:''}]},
		build:false,
		set:{content:[]},
		selectedHeader:'report',
		icons:{playStep:'.fa.fa-play-circle.fa-3x'}
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
socket.on('state',function(state){
    console.log(state)
    if(state.state=='pending'){
	
	_Globals.icons.playStep='.fa.fa-spinner.fa-pulse.fa-3x.disabled';
    }
    else
	_Globals.icons.playStep='.fa.fa-play-circle.fa-3x';
	})

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
    raised: false,
    borders:true,
    
    events: {
        onclick: function(e){
	    
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
const deleteBtn = m.component(btn, {
    label: 'delete',
    raised: true,
    
    events: {
        onclick: function(){
	    
	    _Globals.build=true;
	    
	}
    }
});;
const SvgPlus='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L 12.9994,18.998L 10.9994,18.998L 10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 10.9994,4.99805L 12.9994,4.99805L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

const SvgMinus='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="24" height="24" viewBox="0 0 24.00 24.00" enable-background="new 0 0 24.00 24.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 18.9994,12.998L 12.9994,12.998L  10.9994,12.998L 4.99936,12.998L 4.99936,10.998L 10.9994,10.998L 12.9994,10.998L 18.9994,10.998L 18.9994,12.998 Z "></path></svg>';

const SvgMenu='<i class="menuDots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></i>';

var header={
    controller:function(){
	

    },
    view:function()   {
	
	return m('',m.component(loadBtn),m.component(reportBtn),m.component(buildBtn))
    }
};

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
        return m('',m('select', {
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
            }) : null));
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
        return m('span',
            m('i.fa.fa-toggle-right.fa-3x.playBtncontainer', {
                onclick: function() {

                    m.request({
                        method: "post",
                        url: "http://127.0.0.1:8001/play/?set",
                        background: true,
			data:_Globals.set.content
                    });
                }
            }),

		 m('i.playBtncontainer'+_Globals.icons.playStep, {
                onclick: function() {

                    m.request({
                        method: "GET",
                        url: "http://127.0.0.1:8001/play/?steps",
                        background: true
                    });
                }
            })


        );

    }
};

var setList = {
    view: function() {
        
        return m('ul', _Globals.set.content.map(function(set,i) {
	    
            return m('li',{onclick:function(){
		_Globals.set.content.splice(i,1);
	    }},set.name);
        }));
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

var build = {
    content: [],
    data: {},
    
    controller: function() {
	
        
    },
    
    fetchFlag: false,
    deleteFlag:false,
    action:'',
    view: function(ctrl) {
	
        var self = this;
        return [m.component(header),
		m.component(dialog),
		m.component(selectStepList),
		m('.actions.span.twelve',
		  m.component(actionButtons),
		  m.component(btn, {
		      label: 'Add to set',
		      raised: true,
		      events:{
			  onclick: function() {
			      var data={name:_Globals.selectedStep.name,
					repetition:0};
			_Globals.set.content.push(data);
			      console.log(_Globals.set);
                      }}
		  }),
		  m('button', {
                    onclick: function() {
			//console.log(_Globals.selectedStep.name,_Globals);
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
		  m('span', {
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
		  }, deleteBtn)
		 ),
		m('.span.twelve',
		m('.stepForm.span.eight',
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
		  },self),
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
		},self)
		 )),
		m('.span.twelve',
		  m.component(actionsMenu,self),
		  m('.span.twelve',
		  // m.component(textfield, {
		  //     label: 'Add to Row',
		  //      floatingLabel: true,
		  //      type:'number',
		  //     class:'stepInputs',
		  //     help: 'Enter the row number to insert in to',
		  //     focusHelp: true,
		  //     dense:true,
		  //     fullWidth:false,
		  //     validateAtStart:false,
		  //     getState:function(e){
		  //     	 self.rowNumber=e.value;
		  //     }
		  //    },self),
		    m.component(fabtn, {
		    class:'addBtn',
			 small:true,
			 content:m.trust(SvgPlus),
			 events:{onclick: this.makeStep.bind(self)}
		}),
		    m.component(btn, {
		      label: 'Build&Save',
		      raised: true,
		      events: {
			  onclick: self.makeData.bind(self)
			  
		      }
		  },self)
		 
		   )),
		m('',
		  m.component(testSteps,self),_Globals.set?m.component(setList):null
		  //,
		  //m.component(set)
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
		key: self.keyz?self.keyz:null,
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

var set={view:function(){
    return m('',
	     _Globals.set.content.map(function(setName,i){
	return  m.component(listTile, {
            title: setName,
	    compact:true
        });
	     }));
}};

var actionsMenu={
    
    controller:function(parent){
	
	var onlyTag={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Selector',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    console.log(e)
		    build.selector = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			build.description = e.value;
		    }},self));
    }},

    onlyKey={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Selector',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    
		    build.keyz = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			build.description = e.value;
		    }},self));
    }},

    tagAndKeyForm={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Selector',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    build.selector = e.value;
		}},self),m.component(textfield, {
		class:'stepInputs',
		label: 'Key',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    build.keyz = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			build.description = e.value;
		    }},self));
	}},

    compareForm={view:function(){
	    return m('', m.component(textfield, {
		class:'stepInputs',
		label: 'Key',
		floatingLabel: true,
		dense:true,
		fullWidth:false,
		getState:function(e){
		    build.key = e.value;
		}},self),m.component(textfield, {
		    class:'stepInputs',
		    label: 'Description',
		    floatingLabel: true,
		    dense:true,
		    fullWidth:false,
		    getState:function(e){
			build.description = e.value;
		    }},self));
	}},
	
    expect={view:function(){
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
	}},

    empty={view:function(){
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
    
    empty:{view:function(){
	return m('');
    }},
    
    view:function(ctrl,parent){
	var self=this;
	return m('',m('.actionsMenu.span.three',
		      m('a',{
		       
		       href: 'javascript: void(0)',
		       id: 'simple_btn', // use as menu's target
		       onclick: () => (ctrl.open = true) // opens at next redraw
		      },
			m.trust(SvgMenu),'Action: '+ parent.action),
		 m.component(menu, {
		       size:5,
		       transition:'both',
		       target: 'simple_btn', // to align with the link
		       offset: 0, // horizontally align with link
		       show: ctrl.open, // should the menu be open or closed?
		       didHide: () => (ctrl.open = false), // called after closing
		       content: m.component(list,
					    {
			   tiles: ctrl.actions.map(function(name,i){
			       return  m.component(listTile, {
				   front:{view:function(){return m('i.fa.fa-bookmark');}},
				   title: name,
				   ink: true,
				   ripple:true,
				   events:{onclick:function(){
				       parent.action = name;
				       self.action=name;
				   }}
				   
			       },parent,self);
		})
                
                
            })
		   }
		   
			    )),
		 m('.span.six',m.component(ctrl.actionForms[self.action]?ctrl.actionForms[self.action]:this.empty))
		);
    }
};
var testSteps={view:function(ctrl,self){
    
    return m('.span.twelve', self.content.map(function(d, i) {
	return m('.span.twelve',
		 m.component(btn, {
		     class:'removeBtn',
		     small:true,
		     content:m.trust("<i class='fa fa-minus'></i>"),
		     events:{
			 onclick: function(){
			     self.content.splice(i, 1);
			 }
		     }
		     
		 }),
		 m.component(listTile, {
		     title: JSON.stringify(d),
		     compact:true
		 }));


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
