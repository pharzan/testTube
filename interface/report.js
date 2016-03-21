var socket = io('http://127.0.0.1:3000');
var time = 'hi';

// socket.on('welcome', function(data) {
//     //addMessage(data.message);

//     // // Respond with a message including this clients' id sent from the server
//     // socket.emit('i am client', {
//     //     data: 'foo!',
//     //     id: data.id
//     // });
// });
var Globals = {};
Globals.selected = {};
Globals.selected.name = 'nothing selected yet';
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

var header = {
    view: function() {
        return m('.header',
		 m('span', {
                     onclick: function() {
			 m.route('/load')
                     }
		 }, 'Load'),
		 m('span', {
                     onclick: function() {
			 m.route('/report')
                     }
		 }, 'Report'),
		 m('span', {
                     onclick: function() {
			 m.route('/build')
                     }
		 }, 'New')

        );
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

        var names = m.request({
            method: "GET",
            url: "http://127.0.0.1:8001/steps/?names",
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
			self.selected=response;
                        Globals.selected = response;
                        console.log('SelectedStep', Globals.selectedStep);
			self.infoShowable=true;
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
        return m('',m('select', {
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
                        url: "http://127.0.0.1:8001/set/?" + self.selected.name,
                        background: false
                    }).then(function(response) {
                        self.selected = response;
                        Globals.selectedSet = response;
			
                        console.log('SelectedSet', Globals.selectedSet);
			self.infoShowable=true;
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
		 
		 m('button',{
		     onclick: function() {

			 m.request({
                             method: "GET",
                             url: "http://127.0.0.1:8001/play/?steps",
                             background: true
			 });
                     }
		 },'PLAY Steps')


		);

    }
};

var setList={
    view:function(){
	//console.log(Globals.selectedSet,selectSetList.selected)
	return m('ul',selectSetList.selected.content.map(function(set){
	    return m('li',set.testFile)
	})
		)
    }
};

var stepList={
    view:function(){
	return m('ul',selectStepList.selected.content.map(function(step,i){
	    return step.action?m('li','Action: '+i+') '+step.action,m('span.des'," >>> "+step.des)):m('.des',step.description);
	})
		);
    }
}

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

var build={
    data:[],
    view:function(){
	var self=this;
	
	return [m.component(header),
		m('',
		  m('lable','Action'),m('input',{
		      onchange:function(e){	  
			  self.action=this.value;
		      }
		  }),
		  m('lable','selector'),m('input',{
		      onchange:function(e){
			  self.selector=this.value;
		      }}),
		  m('lable','description'),m('input',{
		      onchange:function(){
			  self.description=this.value;
		      }
		  })
		 ),this.data.map(function(d,i){
		     return m('',JSON.stringify(d),
			      m('button',{onclick:function(){
				  console.log(i)
				  self.data.splice(i,1);
				  console.log(self.data)
		     }},'remove'));
		 }
		     
				),
		m('button',{onclick:this.makeData.bind(self)},'add'),
		m('button','done')
	       ];
    },

    makeData:function() {
	var self=this;
        this.data.push({
	    action:self.action,
	    tag:self.selector,
	    des:self.description
	})
	
	
    }
};

var load = {
    view: function() {
        return [m.component(header),
		m.component(actionButtons),
		m.component(selectStepList),
		selectStepList.infoShowable?m.component(stepList):null,
            m.component(selectSetList),
		selectSetList.infoShowable?m.component(setList):null,
		
            //m('',Globals.selected.name)
        ];

    }
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': test,
    '/report': test,
    '/load': load,
    '/':build
});

// var initElement = document.getElementsByTagName("html")[0];
// var json = mapDOM(initElement, true);
// console.log(json);

// // Test with a string.
// // initElement = "<div><span>text</span>Text2</div>";
// // json = mapDOM(initElement, true);
// // console.log(json);

// function mapDOM(element, json) {
//     var treeObject = {};

//     // If string convert to document Node
//     if (typeof element === "string") {
//         if (window.DOMParser) {
//               parser = new DOMParser();
//               docNode = parser.parseFromString(element,"text/xml");
//         } else { // Microsoft strikes again
//               docNode = new ActiveXObject("Microsoft.XMLDOM");
//               docNode.async = false;
//               docNode.loadXML(element); 
//         } 
//         element = docNode.firstChild;
//     }

//     //Recursively loop through DOM elements and assign properties to object
//     function treeHTML(element, object) {
//         object["type"] = element.nodeName;
//         var nodeList = element.childNodes;
//         if (nodeList != null) {
//             if (nodeList.length) {
//                 object["content"] = [];
//                 for (var i = 0; i < nodeList.length; i++) {
//                     if (nodeList[i].nodeType == 3) {
//                         object["content"].push(nodeList[i].nodeValue);
//                     } else {
//                         object["content"].push({});
//                         treeHTML(nodeList[i], object["content"][object["content"].length -1]);
//                     }
//                 }
//             }
//         }
//         if (element.attributes != null) {
//             if (element.attributes.length) {
//                 object["attributes"] = {};
//                 for (var i = 0; i < element.attributes.length; i++) {
//                     object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
//                 }
//             }
//         }
//     }
//     treeHTML(element, treeObject);

//     return (json) ? JSON.stringify(treeObject) : treeObject;
// }


