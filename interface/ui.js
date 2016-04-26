(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var btn =require( 'polythene/button/button');
var theme=require('polythene/theme/theme');
var toolbar= require( 'polythene/toolbar/toolbar');
var menu =require( 'polythene/menu/menu');
var list =require('polythene/list/list');
var listTile=require( 'polythene/list-tile/list-tile');

var MithDropDown=require('../components/mithDropDown.js');
var dropDown= new MithDropDown();
var dialog=require( 'polythene/dialog/dialog');
var server=require('../main.js');
const loadDialog = {};
loadDialog.view = () => {
    return m('div', [
        m.component(dialog)
    ]);
};
const footerButtons = [
    m.component(btn, {
        label: 'OK',
	events:{onclick:function(){
	    server.MainGlobal.socket.emit('CMD_LOAD',{path:dropDown.selected.name});
	    dialog.hide();
	}
	       }
    }),
    m.component(btn, {
        label: 'Discard',
	events:{onclick:function(){
	    dialog.hide();
	}}
    })
];
var Global={
    show:{loadDialog:false}
};

exports.header = {
    controller: function() {
	var edit= m.component(btn, {
			  label: 'Edit',
			  events: {
			      onclick: function() {
				  
				  m.route('/report');
			      }
			  }
	});
	
	var simpleContainer2={};
	var simpleContainer3={};
	var file={view : function(ctrl){
	    return m('.container',
		     m('a', {
			 href: 'javascript: void(0)',
			 id: 'simple_btn', // use as menu's target
			 onclick: () => (ctrl.open = true) // opens at next redraw
		     }, 'File'),
		     m.component(menu, {
			 target: 'simple_btn', // to align with the link
			 offset: 0, // horizontally align with link
			 show: ctrl.open, // should the menu be open or closed?
			 size:'auto',
			 didHide: () => (ctrl.open = false), // called after closing
			 content: m.component(list, {
			     tiles: [
				 
				 m.component(listTile, {
				     title: 'New',
				     ink: true
				 }),
				 m.component(listTile, {
				     title: 'Load',
				     ink: true,
				     events:{
					 onclick:function(){
					     // server.MainGlobal.socket.emit('CMD_GET_DBS',{});
					     // server.MainGlobal.socket.on('CMD_SET_DBS',function(dbs){
					     // 	 console.log(dbs)
					     // 	 dropDown.update(dbs.dbsArray);
					     // });
					     console.log('ajax')
					     m.request({
						 method: "POST",
						 url: "http://dev.testtube:8000/",
						 background: true,
						 dataType: 'application/json',
						 data: JSON.stringify({name:"Farzan"})
					     }).then(function(response) {
						 console.log(response);
						 
					     });
					     
						dialog.show({
						    title: 'choose a DataBase Name',
						    body: m.component(dropDown),
						    footer:footerButtons
						    
						    
						});
					 }
					 
				     }
				 }),
				 m.component(listTile, {
				     title: 'Save',
				     ink: true
				 })
			     ]
			 })
		     })
		    );
	}};
	
	simpleContainer2.view = (ctrl) => {
	    return m('.container',
		     m('a', {
			 href: 'javascript: void(0)',
			 id: 'simple_btn2', // use as menu's target
			 onclick: () => (ctrl.open = true) // opens at next redraw
		     }, 'Edit'),
		     m.component(menu, {
			 target: 'simple_btn2', // to align with the link
			 offset: 0, // horizontally align with link
			 show: ctrl.open, // should the menu be open or closed?
			 size:'auto',
			 didHide: () => (ctrl.open = false), // called after closing
			 content: m.component(list, {
			     tiles: [
				 m.component(listTile, {
				     title: 'Yes',
				     ink: true
				 }),
				 m.component(listTile, {
				     title: 'No',
				     ink: true
				 })
			     ]
			 })
		     })
		    );
	};
	
	simpleContainer3.view = (ctrl) => {
	    return m('.container',
		     m('a', {
			 href: 'javascript: void(0)',
			 id: 'simple_btn3', // use as menu's target
			 onclick: () => (ctrl.open = true) // opens at next redraw
		     }, 'Help'),
		     m.component(menu, {
			 target: 'simple_btn3', // to align with the link
			 offset: 0, // horizontally align with link
			 show: ctrl.open, // should the menu be open or closed?
			 size:'auto',
			 
			 didHide: () => (ctrl.open = false), // called after closing
			 content: m.component(list, {
			     tiles: [
				 m.component(listTile, {
				     title: 'Yes',
				     ink: true,
				     events:{onclick:function(){
					 server.Global.socket.emit('data',{data:'WoW'});
				     }}
				 }),
				 m.component(listTile, {
				     title: 'No',
				     ink: true
				 })
			     ]
			 })
		     })
		    );
	};
	
	this.myToolbar = m.component(toolbar, {
	    
	    content:[m.component(file),
		     m.component(simpleContainer2),
		     m.component(simpleContainer3)]
		     
				 
	})

    },
    view: function(ctrl) {

        return m('.header',
		 m.component(ctrl.myToolbar),
		 m.component(loadDialog)
		 // m.component(ctrl.buildBtn),
		 // m.component(ctrl.reportBtn)
		);
    }
};

},{"../components/mithDropDown.js":4,"../main.js":5,"polythene/button/button":11,"polythene/dialog/dialog":28,"polythene/list-tile/list-tile":39,"polythene/list/list":44,"polythene/menu/menu":49,"polythene/theme/theme":65,"polythene/toolbar/toolbar":71}],2:[function(require,module,exports){
var button =require( 'polythene/button/button');
var dialog =require('polythene/dialog/dialog');



var load={view :function ()  {
    return m('div', [
        m.component(button, {
            label: 'Load',
            raised: true,
	    
            events: {
                onclick: () => {
                    dialog.show({
                        title: 'Load a DB',
                        body: 'some text'
                    });
                }
            }
        }),
        m.component(dialog)
    ]);
}
	 };

exports.main={
    view:function(){
	return m('');
    }
};


},{"polythene/button/button":11,"polythene/dialog/dialog":28}],3:[function(require,module,exports){
exports.MithChosen=function mithChosen(config) {

    this.config = config || {
        list: [],
        width: 100,
        itemsPerPage: 999,
        sortByName: false
    };
    this.userInput = m.prop('');
    this.selected = '';
    this.showResults=false;

    this.updateList = function(foundItems) {

	this.list = foundItems;
	var perPage = this.config.itemsPerPage;
	var sort = this.config.sortByName;
	
    };

    this.update = function(newList) {
	m.startComputation();
	this.list = newList;
	this.config.list = newList;
	var perPage = this.config.itemsPerPage;
	var sort = this.config.sortByName;
	m.endComputation();
    };

    this.find = function() {

	var self = this;
	var foundItems = [];
	this.config.list.map(function(item) {
            var lowerItem = item.toLowerCase();

            if (lowerItem.indexOf(self.userInput()) > -1) {
		foundItems.push(item);
            }
	});


	this.updateList(foundItems);
    };

    this.getSelected = function() {
	return this.selected;

    };

    this.view = function() {
	var self = this;
	return m('.mithChosen',
		 m('input', {
		     style:{
			 width: self.config.styles.width
		     },
		     config:function(e,isinit){
			 if(isinit)
			     return;
			 self.inputElement=e;
		     },
                     oninput: m.withAttr('value', this.userInput),
                     onkeyup: this.find(),
		     onfocus:function(){
			 
			 self.showResults=true;
		     },
		     onblur:function(){
			 setTimeout(function(){
			     m.startComputation();
			     self.showResults=false;
			     m.endComputation();
			 },150);
		     }
		     
		 },
		   this.userInput()),
		 this.showResults?m('.mithChosenResults',
		   m('ol', {
                       style: {
			   width: self.config.styles.width,
			   maxHeight:'250px',
			   overflowY:'auto',
			   background:'white',
			   position:'absolute',
			   zIndex:'99'
                       }
		   },
		     this.list.map(
			 function(listItem, i) {
			     if (i >= self.config.itemsPerPage)
				 return;
			     else
                               return m('li', {
				   onclick: function(e) {
                                       self.selected = e.target.innerText;
				       self.inputElement.value = self.selected;
				       console.log('aaa',self.inputElement);
				       
				       
				   },
				   onmouseover: function(e) {
                                       var background = self.config.styles.selectedBackground;
                                       var foreground = self.config.styles.selectedForeground;

                                       e.target.style.background = background;
                                       e.target.style.color = foreground;

				   },
				   onmouseout: function(e) {
                                       var background = self.config.styles.background;
                                       var foreground = self.config.styles.foreground;

                                       e.target.style.background = background;
                                       e.target.style.color = foreground;
				   }
                               }, listItem);
			 }))
			      ):null);
		};

    
}





},{}],4:[function(require,module,exports){
var MythDropDown=function(list)  {
    if(Array.isArray(list))
	this.list=list;
    else
	list=[];
    if (!(this instanceof MythDropDown)) 
	return new MythDropDown(list);
    
    var self=this;
    this.selectElement={selectedIndex:0};
    this.selected={
	name:list[0],
	index:0};
    this.list=list;

    MythDropDown.prototype.view= function(ctrl) {
        var self = this;
        return m('select', {
            config: function(selectElement, isinit) {
                if (isinit)
                    return;
		self.selectElement = selectElement;
		self.update(self.list);
            },
            onchange: function(e) {
                self.selected.name = e.target.value;
		self.selected.index=e.target.selectedIndex;
		
            }
        },

		 this.list.map(function(name, i) {
                     return m('option', name);
		 }));
    };

    this.getSelected=function(){
	return (this.selected);
    };

    this.update=function(newList){
	
	this.list=newList;
	this.selectElement.selectedIndex=0;
	this.selected.name=newList[0];
	this.selected.index=0;
    };

    this.sort=function(){
	this.list.sort();
	this.update(this.list);
    };

    this.delete=function(){
	this.list.splice(this.selected.index,1);
	this.update(this.list);
	
    };

};


module.exports = MythDropDown;

},{}],5:[function(require,module,exports){
var socket;
var firstconnect = true;
var Global={server:''};
function connect() {
    if(firstconnect) {
        Global.socket = io.connect('http://dev.testtube:8000');
        Global.socket.on('serverMessage', function(data){ message(data); });
        Global.socket.on('connect', function(){ console.log("Connected to Server"); });

        firstconnect = false;
    }
    else {
        Global.socket.socket.reconnect();
    }
}
var MithDropDown=require('./components/mithDropDown.js');
var dropDown2= new MithDropDown();

dropDown2.update(['apple','banana','orange']);

var chosenCfg = {
    list: ['brown','apple','red'],
    itemsPerPage: 100,
    sortByName: true,
    styles: {
	width: "500px",
        selectedBackground: 'black',
        selectedForeground: 'white',
        background: 'white',
        foreground: 'black'
    }
};

var MithChosen=require('./components/mithChosen.js').MithChosen;

var chosen=new MithChosen(chosenCfg);

connect();

Global.socket.on('time',function(time){
    console.log(time);
    Global.socket.emit('data',{data:'recieved'});
    
});
Global.socket.on('messageToClient',function(data){
    console.log(data);
    switch(data.type){
    case 'updateLoad':
	var array=[];
	data.data.map(function(d){
				  array.push(d.content[0].description)
				  
	});
	console.log(data.data)
	chosen.update(array);
	break;
    }

});

var header=require('./components/header.js').header;
var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(load),
	    m.component(header),
	    m.component(chosen),
	    m('','some content')
	       ];
    }
    
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': main
});
exports.MainGlobal=Global;


},{"./components/header.js":1,"./components/load.js":2,"./components/mithChosen.js":3,"./components/mithDropDown.js":4}],6:[function(require,module,exports){
'use strict';

var emptyObject = {};
var emptyArray = [];
var type = emptyObject.toString;
var own =  emptyObject.hasOwnProperty;
var OBJECT = type.call(emptyObject);
var ARRAY =  type.call(emptyArray);
var STRING = type.call('');
/*/-inline-/*/
// function cartesian(a, b, res, i, j) {
//   res = [];
//   for (j in b) if (own.call(b, j))
//     for (i in a) if (own.call(a, i))
//       res.push(a[i] + b[j]);
//   return res;
// }
/*/-inline-/*/

/* /-statements-/*/
function cartesian(a,b, selectorP, res, i, j) {
  res = []
  for (j in b) if(own.call(b, j))
    for (i in a) if(own.call(a, i))
      res.push(concat(a[i], b[j], selectorP))
  return res
}

function concat(a, b, selectorP) {
  // `b.replace(/&/g, a)` is never falsy, since the
  // 'a' of cartesian can't be the empty string
  // in selector mode.
  return selectorP && (
    /^[-\w$]+$/.test(b) && ':-error-bad-sub-selector-' + b ||
    /&/.test(b) && /* never falsy */ b.replace(/&/g, a)
  ) || a + b
}

function decamelize(match) {
  return '-' + match.toLowerCase()
}

/**
 * Handles the property:value; pairs.
 *
 * @param {array|object|string} o - the declarations.
 * @param {string[]} buf - the buffer in which the final style sheet is built.
 * @param {string} prefix - the current property or a prefix in case of nested
 *                          sub-properties.
 * @param {string} vendors - a list of vendor prefixes.
 * @Param {boolean} local - are we in @local or in @global scope.
 * @param {object} ns - helper functions to populate or create the @local namespace
 *                      and to @extend classes.
 * @param {function} ns.e - @extend helper.
 * @param {function} ns.l - @local helper.
 */

function declarations(o, buf, prefix, vendors, local, ns, /*var*/ k, v, kk) {
  if (o==null) return
  if (/\$/.test(prefix)) {
    for (kk in (prefix = prefix.split('$'))) if (own.call(prefix, kk)) {
      declarations(o, buf, prefix[kk], vendors, local, ns)
    }
    return
  }
  switch ( type.call(o = o.valueOf()) ) {
  case ARRAY:
    for (k = 0; k < o.length; k++)
      declarations(o[k], buf, prefix, vendors, local, ns)
    break
  case OBJECT:
    // prefix is falsy iif it is the empty string, which means we're at the root
    // of the declarations list.
    prefix = (prefix && prefix + '-')
    for (k in o) if (own.call(o, k)){
      v = o[k]
      if (/\$/.test(k)) {
        for (kk in (k = k.split('$'))) if (own.call(k, kk))
          declarations(v, buf, prefix + k[kk], vendors, local, ns)
      } else {
        declarations(v, buf, prefix + k, vendors, local, ns)
      }
    }
    break
  default:
    // prefix is falsy when it is "", which means that we're
    // at the top level.
    // `o` is then treated as a `property:value` pair.
    // otherwise, `prefix` is the property name, and
    // `o` is the value.
    k = prefix.replace(/_/g, '-').replace(/[A-Z]/g, decamelize)

    if (local && (k == 'animation-name' || k == 'animation')) {
      o = o.split(',').map(function (o) {
        return o.replace(/()(?::global\(\s*([-\w]+)\s*\)|()([-\w]+))/, ns.l)
      }).join(',')
    }
    if (/^animation|^transition/.test(k)) vendors = ['webkit']
    // '@' in properties also triggers the *ielte7 hack
    // Since plugins dispatch on the /^@/ for at-rules
    // we swap the at for an asterisk
    // http://browserhacks.com/#hack-6d49e92634f26ae6d6e46b3ebc10019a

    k = k.replace(/^@/, '*')

/*/-statements-/*/
    // vendorify
    for (kk = 0; kk < vendors.length; kk++)
      buf.push('-', vendors[kk], '-', k, k ? ':': '', o, ';\n')
/*/-statements-/*/

    buf.push(k, k ? ':': '', o, ';\n')

  }
}

var findClass = /()(?::global\(\s*(\.[-\w]+)\s*\)|(\.)([-\w]+))/g

/**
 * Hanldes at-rules
 *
 * @param {string} k - The at-rule name, and, if takes both parameters and a
 *                     block, the parameters.
 * @param {string[]} buf - the buffer in which the final style sheet is built
 * @param {string[]} v - Either parameters for block-less rules or their block
 *                       for the others.
 * @param {string} prefix - the current selector or a prefix in case of nested rules
 * @param {string} rawPrefix - as above, but without localization transformations
 * @param {string} vendors - a list of vendor prefixes
 * @Param {boolean} local - are we in @local or in @global scope?
 * @param {object} ns - helper functions to populate or create the @local namespace
 *                      and to @extend classes
 * @param {function} ns.e - @extend helper
 * @param {function} ns.l - @local helper
 */

function at(k, v, buf, prefix, rawPrefix, vendors, local, ns){
  var kk
  if (/^@(?:namespace|import|charset)$/.test(k)) {
    if(type.call(v) == ARRAY){
      for (kk = 0; kk < v.length; kk++) {
        buf.push(k, ' ', v[kk], ';\n')
      }
    } else {
      buf.push(k, ' ', v, ';\n')
    }
  } else if (/^@keyframes /.test(k)) {
    k = local ? k.replace(
      // generated by script/regexps.js
      /( )(?::global\(\s*([-\w]+)\s*\)|()([-\w]+))/,
      ns.l
    ) : k
    // add a @-webkit-keyframes block too.

    buf.push('@-webkit-', k.slice(1), ' {\n')
    sheet(v, buf, '', '', ['webkit'])
    buf.push('}\n')

    buf.push(k, ' {\n')
    sheet(v, buf, '', '', vendors, local, ns)
    buf.push('}\n')

  } else if (/^@extends?$/.test(k)) {

    /*eslint-disable no-cond-assign*/
    // pick the last class to be extended
    while (kk = findClass.exec(rawPrefix)) k = kk[4]
    /*eslint-enable no-cond-assign*/
    if (k == null || !local) {
      // we're in a @global{} block
      buf.push('@-error-cannot-extend-in-global-context ', JSON.stringify(rawPrefix), ';\n')
      return
    } else if (/^@extends?$/.test(k)) {
      // no class in the selector
      buf.push('@-error-no-class-to-extend-in ', JSON.stringify(rawPrefix), ';\n')
      return
    }
    ns.e(
      type.call(v) == ARRAY ? v.map(function (parent) {
        return parent.replace(/()(?::global\(\s*(\.[-\w]+)\s*\)|()\.([-\w]+))/, ns.l)
      }).join(' ') : v.replace(/()(?::global\(\s*(\.[-\w]+)\s*\)|()\.([-\w]+))/, ns.l),
      k
    )

  } else if (/^@(?:font-face$|viewport$|page )/.test(k)) {
    sheet(v, buf, k, k, emptyArray)

  } else if (/^@global$/.test(k)) {
    sheet(v, buf, prefix, rawPrefix, vendors, 0, ns)

  } else if (/^@local$/.test(k)) {
    sheet(v, buf, prefix, rawPrefix, vendors, 1, ns)

  } else if (/^@(?:media |supports |document )./.test(k)) {
    buf.push(k, ' {\n')
    sheet(v, buf, prefix, rawPrefix, vendors, local, ns)
    buf.push('}\n')

  } else {
    buf.push('@-error-unsupported-at-rule ', JSON.stringify(k), ';\n')
  }
}

/**
 * Add rulesets and other CSS statements to the sheet.
 *
 * @param {array|string|object} statements - a source object or sub-object.
 * @param {string[]} buf - the buffer in which the final style sheet is built
 * @param {string} prefix - the current selector or a prefix in case of nested rules
 * @param {string} rawPrefix - as above, but without localization transformations
 * @param {string} vendors - a list of vendor prefixes
 * @Param {boolean} local - are we in @local or in @global scope?
 * @param {object} ns - helper functions to populate or create the @local namespace
 *                      and to @extend classes
 * @param {function} ns.e - @extend helper
 * @param {function} ns.l - @local helper
 */
function sheet(statements, buf, prefix, rawPrefix, vendors, local, ns) {
  var k, kk, v, inDeclaration

  switch (type.call(statements)) {

  case ARRAY:
    for (k = 0; k < statements.length; k++)
      sheet(statements[k], buf, prefix, rawPrefix, vendors, local, ns)
    break

  case OBJECT:
    for (k in statements) {
      v = statements[k]
      if (prefix && /^[-\w$]+$/.test(k)) {
        if (!inDeclaration) {
          inDeclaration = 1
          buf.push(( prefix || '*' ), ' {\n')
        }
        declarations(v, buf, k, vendors, local, ns)
      } else if (/^@/.test(k)) {
        // Handle At-rules
        inDeclaration = (inDeclaration && buf.push('}\n') && 0)

        at(k, v, buf, prefix, rawPrefix, vendors, local, ns)

      } else {
        // selector or nested sub-selectors

        inDeclaration = (inDeclaration && buf.push('}\n') && 0)

        sheet(v, buf,
          (kk = /,/.test(prefix) || prefix && /,/.test(k)) ?
            cartesian(prefix.split(','), ( local ?
          k.replace(
            /()(?::global\(\s*(\.[-\w]+)\s*\)|(\.)([-\w]+))/g, ns.l
          ) : k
        ).split(','), prefix).join(',') :
            concat(prefix, ( local ?
          k.replace(
            /()(?::global\(\s*(\.[-\w]+)\s*\)|(\.)([-\w]+))/g, ns.l
          ) : k
        ), prefix),
          kk ?
            cartesian(rawPrefix.split(','), k.split(','), rawPrefix).join(',') :
            concat(rawPrefix, k, rawPrefix),
          vendors,
          local, ns
        )
      }
    }
    if (inDeclaration) buf.push('}\n')
    break
  case STRING:
    buf.push(
        ( prefix || ':-error-no-selector' ) , ' {\n'
      )
    declarations(statements, buf, '', vendors, local, ns)
    buf.push('}\n')
  }
}

var scope_root = '_j2c_' +
      Math.floor(Math.random() * 0x100000000).toString(36) + '_' +
      Math.floor(Math.random() * 0x100000000).toString(36) + '_' +
      Math.floor(Math.random() * 0x100000000).toString(36) + '_' +
      Math.floor(Math.random() * 0x100000000).toString(36) + '_';
var counter = 0;
function j2c(res) {
  res = res || {}
  var extensions = []

  function finalize(buf, i) {
    for (i = 0; i< extensions.length; i++) buf = extensions[i](buf) || buf
    return buf.join('')
  }

  res.use = function() {
    var args = arguments
    for (var i = 0; i < args.length; i++){
      extensions.push(args[i])
    }
    return res
  }
/*/-statements-/*/
  res.sheet = function(ns, statements) {
    if (arguments.length === 1) {
      statements = ns; ns = {}
    }
    var
      suffix = scope_root + counter++,
      locals = {},
      k, buf = []
    // pick only non-numeric keys since `(NaN != NaN) === true`
    for (k in ns) if (k-0 != k-0 && own.call(ns, k)) {
      locals[k] = ns[k]
    }
    sheet(
      statements, buf, '', '', emptyArray /*vendors*/,
      1, // local
      {
        e: function extend(parent, child) {
          var nameList = locals[child]
          locals[child] =
            nameList.slice(0, nameList.lastIndexOf(' ') + 1) +
            parent + ' ' +
            nameList.slice(nameList.lastIndexOf(' ') + 1)
        },
        l: function localize(match, space, global, dot, name) {
          if (global) {
            return space + global
          }
          if (!locals[name]) locals[name] = name + suffix
          return space + dot + locals[name].match(/\S+$/)
        }
      }
    )
    /*jshint -W053 */
    buf = new String(finalize(buf))
    /*jshint +W053 */
    for (k in locals) if (own.call(locals, k)) buf[k] = locals[k]
    return buf
  }
/*/-statements-/*/
  res.inline = function (locals, decl, buf) {
    if (arguments.length === 1) {
      decl = locals; locals = {}
    }
    declarations(
      decl,
      buf = [],
      '', // prefix
      emptyArray, // vendors
      1,
      {
        l: function localize(match, space, global, dot, name) {
          if (global) return space + global
          if (!locals[name]) return name
          return space + dot + locals[name]
        }
      })
    return finalize(buf)
  }

  res.prefix = function(val, vendors) {
    return cartesian(
      vendors.map(function(p){return '-' + p + '-'}).concat(['']),
      [val]
    )
  }
  return res
}

j2c.global = function(x) {
  return ':global(' + x + ')'
}

j2c.kv = kv
function kv (k, v, o) {
  o = {}
  o[k] = v
  return o
}

j2c.at = function at (rule, params, block) {
  if (
    arguments.length < 3
  ) {
    var _at = at.bind.apply(at, [null].concat([].slice.call(arguments,0)))
    _at.toString = function(){return '@' + rule + ' ' + params}
    return _at
  }
  else return kv('@' + rule + ' ' + params, block)
}

j2c(j2c)
delete j2c.use

module.exports = j2c;
},{}],7:[function(require,module,exports){
;(function (global, factory) { // eslint-disable-line
	"use strict"
	/* eslint-disable no-undef */
	var m = factory(global)
	if (typeof module === "object" && module != null && module.exports) {
		module.exports = m
	} else if (typeof define === "function" && define.amd) {
		define(function () { return m })
	} else {
		global.m = m
	}
	/* eslint-enable no-undef */
})(typeof window !== "undefined" ? window : {}, function (global, undefined) { // eslint-disable-line
	"use strict"

	m.version = function () {
		return "v0.2.3"
	}

	var hasOwn = {}.hasOwnProperty
	var type = {}.toString

	function isFunction(object) {
		return typeof object === "function"
	}

	function isObject(object) {
		return type.call(object) === "[object Object]"
	}

	function isString(object) {
		return type.call(object) === "[object String]"
	}

	var isArray = Array.isArray || function (object) {
		return type.call(object) === "[object Array]"
	}

	function noop() {}

	var voidElements = {
		AREA: 1,
		BASE: 1,
		BR: 1,
		COL: 1,
		COMMAND: 1,
		EMBED: 1,
		HR: 1,
		IMG: 1,
		INPUT: 1,
		KEYGEN: 1,
		LINK: 1,
		META: 1,
		PARAM: 1,
		SOURCE: 1,
		TRACK: 1,
		WBR: 1
	}

	// caching commonly used variables
	var $document, $location, $requestAnimationFrame, $cancelAnimationFrame

	// self invoking function needed because of the way mocks work
	function initialize(mock) {
		$document = mock.document
		$location = mock.location
		$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
		$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
	}

	// testing API
	m.deps = function (mock) {
		initialize(global = mock || window)
		return global
	}

	m.deps(global)

	/**
	 * @typedef {String} Tag
	 * A string that looks like -> div.classname#id[param=one][param2=two]
	 * Which describes a DOM node
	 */

	function parseTagAttrs(cell, tag) {
		var classes = []
		var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
		var match

		while ((match = parser.exec(tag))) {
			if (match[1] === "" && match[2]) {
				cell.tag = match[2]
			} else if (match[1] === "#") {
				cell.attrs.id = match[2]
			} else if (match[1] === ".") {
				classes.push(match[2])
			} else if (match[3][0] === "[") {
				var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
				cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" : true)
			}
		}

		return classes
	}

	function getVirtualChildren(args, hasAttrs) {
		var children = hasAttrs ? args.slice(1) : args

		if (children.length === 1 && isArray(children[0])) {
			return children[0]
		} else {
			return children
		}
	}

	function assignAttrs(target, attrs, classes) {
		var classAttr = "class" in attrs ? "class" : "className"

		for (var attrName in attrs) {
			if (hasOwn.call(attrs, attrName)) {
				if (attrName === classAttr &&
						attrs[attrName] != null &&
						attrs[attrName] !== "") {
					classes.push(attrs[attrName])
					// create key in correct iteration order
					target[attrName] = ""
				} else {
					target[attrName] = attrs[attrName]
				}
			}
		}

		if (classes.length) target[classAttr] = classes.join(" ")
	}

	/**
	 *
	 * @param {Tag} The DOM node tag
	 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
	 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
	 *                      or splat (optional)
	 */
	function m(tag, pairs) {
		var args = [].slice.call(arguments, 1)

		if (isObject(tag)) return parameterize(tag, args)

		if (!isString(tag)) {
			throw new Error("selector in m(selector, attrs, children) should " +
				"be a string")
		}

		var hasAttrs = pairs != null && isObject(pairs) &&
			!("tag" in pairs || "view" in pairs || "subtree" in pairs)

		var attrs = hasAttrs ? pairs : {}
		var cell = {
			tag: "div",
			attrs: {},
			children: getVirtualChildren(args, hasAttrs)
		}

		assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
		return cell
	}

	function forEach(list, f) {
		for (var i = 0; i < list.length && !f(list[i], i++);) {
			// function called in condition
		}
	}

	function forKeys(list, f) {
		forEach(list, function (attrs, i) {
			return (attrs = attrs && attrs.attrs) &&
				attrs.key != null &&
				f(attrs, i)
		})
	}
	// This function was causing deopts in Chrome.
	function dataToString(data) {
		// data.toString() might throw or return null if data is the return
		// value of Console.log in some versions of Firefox (behavior depends on
		// version)
		try {
			if (data != null && data.toString() != null) return data
		} catch (e) {
			// silently ignore errors
		}
		return ""
	}

	// This function was causing deopts in Chrome.
	function injectTextNode(parentElement, first, index, data) {
		try {
			insertNode(parentElement, first, index)
			first.nodeValue = data
		} catch (e) {
			// IE erroneously throws error when appending an empty text node
			// after a null
		}
	}

	function flatten(list) {
		// recursively flatten array
		for (var i = 0; i < list.length; i++) {
			if (isArray(list[i])) {
				list = list.concat.apply([], list)
				// check current index again and flatten until there are no more
				// nested arrays at that index
				i--
			}
		}
		return list
	}

	function insertNode(parentElement, node, index) {
		parentElement.insertBefore(node,
			parentElement.childNodes[index] || null)
	}

	var DELETION = 1
	var INSERTION = 2
	var MOVE = 3

	function handleKeysDiffer(data, existing, cached, parentElement) {
		forKeys(data, function (key, i) {
			existing[key = key.key] = existing[key] ? {
				action: MOVE,
				index: i,
				from: existing[key].index,
				element: cached.nodes[existing[key].index] ||
					$document.createElement("div")
			} : {action: INSERTION, index: i}
		})

		var actions = []
		for (var prop in existing) if (hasOwn.call(existing, prop)) {
			actions.push(existing[prop])
		}

		var changes = actions.sort(sortChanges)
		var newCached = new Array(cached.length)

		newCached.nodes = cached.nodes.slice()

		forEach(changes, function (change) {
			var index = change.index
			if (change.action === DELETION) {
				clear(cached[index].nodes, cached[index])
				newCached.splice(index, 1)
			}
			if (change.action === INSERTION) {
				var dummy = $document.createElement("div")
				dummy.key = data[index].attrs.key
				insertNode(parentElement, dummy, index)
				newCached.splice(index, 0, {
					attrs: {key: data[index].attrs.key},
					nodes: [dummy]
				})
				newCached.nodes[index] = dummy
			}

			if (change.action === MOVE) {
				var changeElement = change.element
				var maybeChanged = parentElement.childNodes[index]
				if (maybeChanged !== changeElement && changeElement !== null) {
					parentElement.insertBefore(changeElement,
						maybeChanged || null)
				}
				newCached[index] = cached[change.from]
				newCached.nodes[index] = changeElement
			}
		})

		return newCached
	}

	function diffKeys(data, cached, existing, parentElement) {
		var keysDiffer = data.length !== cached.length

		if (!keysDiffer) {
			forKeys(data, function (attrs, i) {
				var cachedCell = cached[i]
				return keysDiffer = cachedCell &&
					cachedCell.attrs &&
					cachedCell.attrs.key !== attrs.key
			})
		}

		if (keysDiffer) {
			return handleKeysDiffer(data, existing, cached, parentElement)
		} else {
			return cached
		}
	}

	function diffArray(data, cached, nodes) {
		// diff the array itself

		// update the list of DOM nodes by collecting the nodes from each item
		forEach(data, function (_, i) {
			if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
		})
		// remove items from the end of the array if the new array is shorter
		// than the old one. if errors ever happen here, the issue is most
		// likely a bug in the construction of the `cached` data structure
		// somewhere earlier in the program
		forEach(cached.nodes, function (node, i) {
			if (node.parentNode != null && nodes.indexOf(node) < 0) {
				clear([node], [cached[i]])
			}
		})

		if (data.length < cached.length) cached.length = data.length
		cached.nodes = nodes
	}

	function buildArrayKeys(data) {
		var guid = 0
		forKeys(data, function () {
			forEach(data, function (attrs) {
				if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
					attrs.key = "__mithril__" + guid++
				}
			})
			return 1
		})
	}

	function isDifferentEnough(data, cached, dataAttrKeys) {
		if (data.tag !== cached.tag) return true

		if (dataAttrKeys.sort().join() !==
				Object.keys(cached.attrs).sort().join()) {
			return true
		}

		if (data.attrs.id !== cached.attrs.id) {
			return true
		}

		if (data.attrs.key !== cached.attrs.key) {
			return true
		}

		if (m.redraw.strategy() === "all") {
			return !cached.configContext || cached.configContext.retain !== true
		}

		if (m.redraw.strategy() === "diff") {
			return cached.configContext && cached.configContext.retain === false
		}

		return false
	}

	function maybeRecreateObject(data, cached, dataAttrKeys) {
		// if an element is different enough from the one in cache, recreate it
		if (isDifferentEnough(data, cached, dataAttrKeys)) {
			if (cached.nodes.length) clear(cached.nodes)

			if (cached.configContext &&
					isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
			}

			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (controller.onunload) controller.onunload({preventDefault: noop});
				});
			}
		}
	}

	function getObjectNamespace(data, namespace) {
		if (data.attrs.xmlns) return data.attrs.xmlns
		if (data.tag === "svg") return "http://www.w3.org/2000/svg"
		if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
		return namespace
	}

	var pendingRequests = 0
	m.startComputation = function () { pendingRequests++ }
	m.endComputation = function () {
		if (pendingRequests > 1) {
			pendingRequests--
		} else {
			pendingRequests = 0
			m.redraw()
		}
	}

	function unloadCachedControllers(cached, views, controllers) {
		if (controllers.length) {
			cached.views = views
			cached.controllers = controllers
			forEach(controllers, function (controller) {
				if (controller.onunload && controller.onunload.$old) {
					controller.onunload = controller.onunload.$old
				}

				if (pendingRequests && controller.onunload) {
					var onunload = controller.onunload
					controller.onunload = noop
					controller.onunload.$old = onunload
				}
			})
		}
	}

	function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
		// schedule configs to be called. They are called after `build` finishes
		// running
		if (isFunction(data.attrs.config)) {
			var context = cached.configContext = cached.configContext || {}

			// bind
			configs.push(function () {
				return data.attrs.config.call(data, node, !isNew, context,
					cached)
			})
		}
	}

	function buildUpdatedNode(
		cached,
		data,
		editable,
		hasKeys,
		namespace,
		views,
		configs,
		controllers
	) {
		var node = cached.nodes[0]

		if (hasKeys) {
			setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
		}

		cached.children = build(
			node,
			data.tag,
			undefined,
			undefined,
			data.children,
			cached.children,
			false,
			0,
			data.attrs.contenteditable ? node : editable,
			namespace,
			configs
		)

		cached.nodes.intact = true

		if (controllers.length) {
			cached.views = views
			cached.controllers = controllers
		}

		return node
	}

	function handleNonexistentNodes(data, parentElement, index) {
		var nodes
		if (data.$trusted) {
			nodes = injectHTML(parentElement, index, data)
		} else {
			nodes = [$document.createTextNode(data)]
			if (!(parentElement.nodeName in voidElements)) {
				insertNode(parentElement, nodes[0], index)
			}
		}

		var cached

		if (typeof data === "string" ||
				typeof data === "number" ||
				typeof data === "boolean") {
			cached = new data.constructor(data)
		} else {
			cached = data
		}

		cached.nodes = nodes
		return cached
	}

	function reattachNodes(
		data,
		cached,
		parentElement,
		editable,
		index,
		parentTag
	) {
		var nodes = cached.nodes
		if (!editable || editable !== $document.activeElement) {
			if (data.$trusted) {
				clear(nodes, cached)
				nodes = injectHTML(parentElement, index, data)
			} else if (parentTag === "textarea") {
				// <textarea> uses `value` instead of `nodeValue`.
				parentElement.value = data
			} else if (editable) {
				// contenteditable nodes use `innerHTML` instead of `nodeValue`.
				editable.innerHTML = data
			} else {
				// was a trusted string
				if (nodes[0].nodeType === 1 || nodes.length > 1 ||
						(nodes[0].nodeValue.trim &&
							!nodes[0].nodeValue.trim())) {
					clear(cached.nodes, cached)
					nodes = [$document.createTextNode(data)]
				}

				injectTextNode(parentElement, nodes[0], index, data)
			}
		}
		cached = new data.constructor(data)
		cached.nodes = nodes
		return cached
	}

	function handleTextNode(
		cached,
		data,
		index,
		parentElement,
		shouldReattach,
		editable,
		parentTag
	) {
		if (!cached.nodes.length) {
			return handleNonexistentNodes(data, parentElement, index)
		} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
			return reattachNodes(data, cached, parentElement, editable, index,
				parentTag)
		} else {
			return (cached.nodes.intact = true, cached)
		}
	}

	function getSubArrayCount(item) {
		if (item.$trusted) {
			// fix offset of next element if item was a trusted string w/ more
			// than one html element
			// the first clause in the regexp matches elements
			// the second clause (after the pipe) matches text nodes
			var match = item.match(/<[^\/]|\>\s*[^<]/g)
			if (match != null) return match.length
		} else if (isArray(item)) {
			return item.length
		}
		return 1
	}

	function buildArray(
		data,
		cached,
		parentElement,
		index,
		parentTag,
		shouldReattach,
		editable,
		namespace,
		configs
	) {
		data = flatten(data)
		var nodes = []
		var intact = cached.length === data.length
		var subArrayCount = 0

		// keys algorithm: sort elements without recreating them if keys are
		// present
		//
		// 1) create a map of all existing keys, and mark all for deletion
		// 2) add new keys to map and mark them for addition
		// 3) if key exists in new list, change action from deletion to a move
		// 4) for each key, handle its corresponding action as marked in
		//    previous steps

		var existing = {}
		var shouldMaintainIdentities = false

		forKeys(cached, function (attrs, i) {
			shouldMaintainIdentities = true
			existing[cached[i].attrs.key] = {action: DELETION, index: i}
		})

		buildArrayKeys(data)
		if (shouldMaintainIdentities) {
			cached = diffKeys(data, cached, existing, parentElement)
		}
		// end key algorithm

		var cacheCount = 0
		// faster explicitly written
		for (var i = 0, len = data.length; i < len; i++) {
			// diff each item in the array
			var item = build(
				parentElement,
				parentTag,
				cached,
				index,
				data[i],
				cached[cacheCount],
				shouldReattach,
				index + subArrayCount || subArrayCount,
				editable,
				namespace,
				configs)

			if (item !== undefined) {
				intact = intact && item.nodes.intact
				subArrayCount += getSubArrayCount(item)
				cached[cacheCount++] = item
			}
		}

		if (!intact) diffArray(data, cached, nodes)
		return cached
	}

	function makeCache(data, cached, index, parentIndex, parentCache) {
		if (cached != null) {
			if (type.call(cached) === type.call(data)) return cached

			if (parentCache && parentCache.nodes) {
				var offset = index - parentIndex
				var end = offset + (isArray(data) ? data : cached.nodes).length
				clear(
					parentCache.nodes.slice(offset, end),
					parentCache.slice(offset, end))
			} else if (cached.nodes) {
				clear(cached.nodes, cached)
			}
		}

		cached = new data.constructor()
		// if constructor creates a virtual dom element, use a blank object as
		// the base cached node instead of copying the virtual el (#277)
		if (cached.tag) cached = {}
		cached.nodes = []
		return cached
	}

	function constructNode(data, namespace) {
		if (data.attrs.is) {
			if (namespace == null) {
				return $document.createElement(data.tag, data.attrs.is)
			} else {
				return $document.createElementNS(namespace, data.tag,
					data.attrs.is)
			}
		} else if (namespace == null) {
			return $document.createElement(data.tag)
		} else {
			return $document.createElementNS(namespace, data.tag)
		}
	}

	function constructAttrs(data, node, namespace, hasKeys) {
		if (hasKeys) {
			return setAttributes(node, data.tag, data.attrs, {}, namespace)
		} else {
			return data.attrs
		}
	}

	function constructChildren(
		data,
		node,
		cached,
		editable,
		namespace,
		configs
	) {
		if (data.children != null && data.children.length > 0) {
			return build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				true,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs)
		} else {
			return data.children
		}
	}

	function reconstructCached(
		data,
		attrs,
		children,
		node,
		namespace,
		views,
		controllers
	) {
		var cached = {
			tag: data.tag,
			attrs: attrs,
			children: children,
			nodes: [node]
		}

		unloadCachedControllers(cached, views, controllers)

		if (cached.children && !cached.children.nodes) {
			cached.children.nodes = []
		}

		// edge case: setting value on <select> doesn't work before children
		// exist, so set it again after children have been created
		if (data.tag === "select" && "value" in data.attrs) {
			setAttributes(node, data.tag, {value: data.attrs.value}, {},
				namespace)
		}

		return cached
	}

	function getController(views, view, cachedControllers, controller) {
		var controllerIndex

		if (m.redraw.strategy() === "diff" && views) {
			controllerIndex = views.indexOf(view)
		} else {
			controllerIndex = -1
		}

		if (controllerIndex > -1) {
			return cachedControllers[controllerIndex]
		} else if (isFunction(controller)) {
			return new controller()
		} else {
			return {}
		}
	}

	var unloaders = []

	function updateLists(views, controllers, view, controller) {
		if (controller.onunload != null && unloaders.map(function(u) {return u.handler}).indexOf(controller.onunload) < 0) {
			unloaders.push({
				controller: controller,
				handler: controller.onunload
			})
		}

		views.push(view)
		controllers.push(controller)
	}

	var forcing = false
	function checkView(data, view, cached, cachedControllers, controllers, views) {
		var controller = getController(cached.views, view, cachedControllers, data.controller)
		var key = data && data.attrs && data.attrs.key
		data = pendingRequests === 0 || forcing || cachedControllers && cachedControllers.indexOf(controller) > -1 ? data.view(controller) : {tag: "placeholder"}
		if (data.subtree === "retain") return data;
		data.attrs = data.attrs || {}
		data.attrs.key = key
		updateLists(views, controllers, view, controller)
		return data
	}

	function markViews(data, cached, views, controllers) {
		var cachedControllers = cached && cached.controllers

		while (data.view != null) {
			data = checkView(
				data,
				data.view.$original || data.view,
				cached,
				cachedControllers,
				controllers,
				views)
		}

		return data
	}

	function buildObject( // eslint-disable-line max-statements
		data,
		cached,
		editable,
		parentElement,
		index,
		shouldReattach,
		namespace,
		configs
	) {
		var views = []
		var controllers = []

		data = markViews(data, cached, views, controllers)

		if (data.subtree === "retain") return cached

		if (!data.tag && controllers.length) {
			throw new Error("Component template must return a virtual " +
				"element, not an array, string, etc.")
		}

		data.attrs = data.attrs || {}
		cached.attrs = cached.attrs || {}

		var dataAttrKeys = Object.keys(data.attrs)
		var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)

		maybeRecreateObject(data, cached, dataAttrKeys)

		if (!isString(data.tag)) return

		var isNew = cached.nodes.length === 0

		namespace = getObjectNamespace(data, namespace)

		var node
		if (isNew) {
			node = constructNode(data, namespace)
			// set attributes first, then create children
			var attrs = constructAttrs(data, node, namespace, hasKeys)

			var children = constructChildren(data, node, cached, editable,
				namespace, configs)

			cached = reconstructCached(
				data,
				attrs,
				children,
				node,
				namespace,
				views,
				controllers)
		} else {
			node = buildUpdatedNode(
				cached,
				data,
				editable,
				hasKeys,
				namespace,
				views,
				configs,
				controllers)
		}

		if (isNew || shouldReattach === true && node != null) {
			insertNode(parentElement, node, index)
		}

		// The configs are called after `build` finishes running
		scheduleConfigsToBeCalled(configs, data, node, isNew, cached)

		return cached
	}

	function build(
		parentElement,
		parentTag,
		parentCache,
		parentIndex,
		data,
		cached,
		shouldReattach,
		index,
		editable,
		namespace,
		configs
	) {
		/*
		 * `build` is a recursive function that manages creation/diffing/removal
		 * of DOM elements based on comparison between `data` and `cached` the
		 * diff algorithm can be summarized as this:
		 *
		 * 1 - compare `data` and `cached`
		 * 2 - if they are different, copy `data` to `cached` and update the DOM
		 *     based on what the difference is
		 * 3 - recursively apply this algorithm for every array and for the
		 *     children of every virtual element
		 *
		 * The `cached` data structure is essentially the same as the previous
		 * redraw's `data` data structure, with a few additions:
		 * - `cached` always has a property called `nodes`, which is a list of
		 *    DOM elements that correspond to the data represented by the
		 *    respective virtual element
		 * - in order to support attaching `nodes` as a property of `cached`,
		 *    `cached` is *always* a non-primitive object, i.e. if the data was
		 *    a string, then cached is a String instance. If data was `null` or
		 *    `undefined`, cached is `new String("")`
		 * - `cached also has a `configContext` property, which is the state
		 *    storage object exposed by config(element, isInitialized, context)
		 * - when `cached` is an Object, it represents a virtual element; when
		 *    it's an Array, it represents a list of elements; when it's a
		 *    String, Number or Boolean, it represents a text node
		 *
		 * `parentElement` is a DOM element used for W3C DOM API calls
		 * `parentTag` is only used for handling a corner case for textarea
		 * values
		 * `parentCache` is used to remove nodes in some multi-node cases
		 * `parentIndex` and `index` are used to figure out the offset of nodes.
		 * They're artifacts from before arrays started being flattened and are
		 * likely refactorable
		 * `data` and `cached` are, respectively, the new and old nodes being
		 * diffed
		 * `shouldReattach` is a flag indicating whether a parent node was
		 * recreated (if so, and if this node is reused, then this node must
		 * reattach itself to the new parent)
		 * `editable` is a flag that indicates whether an ancestor is
		 * contenteditable
		 * `namespace` indicates the closest HTML namespace as it cascades down
		 * from an ancestor
		 * `configs` is a list of config functions to run after the topmost
		 * `build` call finishes running
		 *
		 * there's logic that relies on the assumption that null and undefined
		 * data are equivalent to empty strings
		 * - this prevents lifecycle surprises from procedural helpers that mix
		 *   implicit and explicit return statements (e.g.
		 *   function foo() {if (cond) return m("div")}
		 * - it simplifies diffing code
		 */
		data = dataToString(data)
		if (data.subtree === "retain") return cached
		cached = makeCache(data, cached, index, parentIndex, parentCache)

		if (isArray(data)) {
			return buildArray(
				data,
				cached,
				parentElement,
				index,
				parentTag,
				shouldReattach,
				editable,
				namespace,
				configs)
		} else if (data != null && isObject(data)) {
			return buildObject(
				data,
				cached,
				editable,
				parentElement,
				index,
				shouldReattach,
				namespace,
				configs)
		} else if (!isFunction(data)) {
			return handleTextNode(
				cached,
				data,
				index,
				parentElement,
				shouldReattach,
				editable,
				parentTag)
		} else {
			return cached
		}
	}

	function sortChanges(a, b) {
		return a.action - b.action || a.index - b.index
	}

	function copyStyleAttrs(node, dataAttr, cachedAttr) {
		for (var rule in dataAttr) if (hasOwn.call(dataAttr, rule)) {
			if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
				node.style[rule] = dataAttr[rule]
			}
		}

		for (rule in cachedAttr) if (hasOwn.call(cachedAttr, rule)) {
			if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
		}
	}

	var shouldUseSetAttribute = {
		list: 1,
		style: 1,
		form: 1,
		type: 1,
		width: 1,
		height: 1
	}

	function setSingleAttr(
		node,
		attrName,
		dataAttr,
		cachedAttr,
		tag,
		namespace
	) {
		if (attrName === "config" || attrName === "key") {
			// `config` isn't a real attribute, so ignore it
			return true
		} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
			// hook event handlers to the auto-redrawing system
			node[attrName] = autoredraw(dataAttr, node)
		} else if (attrName === "style" && dataAttr != null &&
				isObject(dataAttr)) {
			// handle `style: {...}`
			copyStyleAttrs(node, dataAttr, cachedAttr)
		} else if (namespace != null) {
			// handle SVG
			if (attrName === "href") {
				node.setAttributeNS("http://www.w3.org/1999/xlink",
					"href", dataAttr)
			} else {
				node.setAttribute(
					attrName === "className" ? "class" : attrName,
					dataAttr)
			}
		} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
			// handle cases that are properties (but ignore cases where we
			// should use setAttribute instead)
			//
			// - list and form are typically used as strings, but are DOM
			//   element references in js
			//
			// - when using CSS selectors (e.g. `m("[style='']")`), style is
			//   used as a string, but it's an object in js
			//
			// #348 don't set the value if not needed - otherwise, cursor
			// placement breaks in Chrome
			try {
				if (tag !== "input" || node[attrName] !== dataAttr) {
					node[attrName] = dataAttr
				}
			} catch (e) {
				node.setAttribute(attrName, dataAttr)
			}
		}
		else node.setAttribute(attrName, dataAttr)
	}

	function trySetAttr(
		node,
		attrName,
		dataAttr,
		cachedAttr,
		cachedAttrs,
		tag,
		namespace
	) {
		if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
			cachedAttrs[attrName] = dataAttr
			try {
				return setSingleAttr(
					node,
					attrName,
					dataAttr,
					cachedAttr,
					tag,
					namespace)
			} catch (e) {
				// swallow IE's invalid argument errors to mimic HTML's
				// fallback-to-doing-nothing-on-invalid-attributes behavior
				if (e.message.indexOf("Invalid argument") < 0) throw e
			}
		} else if (attrName === "value" && tag === "input" &&
				node.value !== dataAttr) {
			// #348 dataAttr may not be a string, so use loose comparison
			node.value = dataAttr
		}
	}

	function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
		for (var attrName in dataAttrs) if (hasOwn.call(dataAttrs, attrName)) {
			if (trySetAttr(
					node,
					attrName,
					dataAttrs[attrName],
					cachedAttrs[attrName],
					cachedAttrs,
					tag,
					namespace)) {
				continue
			}
		}
		return cachedAttrs
	}

	function clear(nodes, cached) {
		for (var i = nodes.length - 1; i > -1; i--) {
			if (nodes[i] && nodes[i].parentNode) {
				try {
					nodes[i].parentNode.removeChild(nodes[i])
				} catch (e) {
					/* eslint-disable max-len */
					// ignore if this fails due to order of events (see
					// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
					/* eslint-enable max-len */
				}
				cached = [].concat(cached)
				if (cached[i]) unload(cached[i])
			}
		}
		// release memory if nodes is an array. This check should fail if nodes
		// is a NodeList (see loop above)
		if (nodes.length) {
			nodes.length = 0
		}
	}

	function unload(cached) {
		if (cached.configContext && isFunction(cached.configContext.onunload)) {
			cached.configContext.onunload()
			cached.configContext.onunload = null
		}
		if (cached.controllers) {
			forEach(cached.controllers, function (controller) {
				if (isFunction(controller.onunload)) {
					controller.onunload({preventDefault: noop})
				}
			})
		}
		if (cached.children) {
			if (isArray(cached.children)) forEach(cached.children, unload)
			else if (cached.children.tag) unload(cached.children)
		}
	}

	function appendTextFragment(parentElement, data) {
		try {
			parentElement.appendChild(
				$document.createRange().createContextualFragment(data))
		} catch (e) {
			parentElement.insertAdjacentHTML("beforeend", data)
		}
	}

	function injectHTML(parentElement, index, data) {
		var nextSibling = parentElement.childNodes[index]
		if (nextSibling) {
			var isElement = nextSibling.nodeType !== 1
			var placeholder = $document.createElement("span")
			if (isElement) {
				parentElement.insertBefore(placeholder, nextSibling || null)
				placeholder.insertAdjacentHTML("beforebegin", data)
				parentElement.removeChild(placeholder)
			} else {
				nextSibling.insertAdjacentHTML("beforebegin", data)
			}
		} else {
			appendTextFragment(parentElement, data)
		}

		var nodes = []

		while (parentElement.childNodes[index] !== nextSibling) {
			nodes.push(parentElement.childNodes[index])
			index++
		}

		return nodes
	}

	function autoredraw(callback, object) {
		return function (e) {
			e = e || event
			m.redraw.strategy("diff")
			m.startComputation()
			try {
				return callback.call(object, e)
			} finally {
				endFirstComputation()
			}
		}
	}

	var html
	var documentNode = {
		appendChild: function (node) {
			if (html === undefined) html = $document.createElement("html")
			if ($document.documentElement &&
					$document.documentElement !== node) {
				$document.replaceChild(node, $document.documentElement)
			} else {
				$document.appendChild(node)
			}

			this.childNodes = $document.childNodes
		},

		insertBefore: function (node) {
			this.appendChild(node)
		},

		childNodes: []
	}

	var nodeCache = []
	var cellCache = {}

	m.render = function (root, cell, forceRecreation) {
		if (!root) {
			throw new Error("Ensure the DOM element being passed to " +
				"m.route/m.mount/m.render is not undefined.")
		}
		var configs = []
		var id = getCellCacheKey(root)
		var isDocumentRoot = root === $document
		var node

		if (isDocumentRoot || root === $document.documentElement) {
			node = documentNode
		} else {
			node = root
		}

		if (isDocumentRoot && cell.tag !== "html") {
			cell = {tag: "html", attrs: {}, children: cell}
		}

		if (cellCache[id] === undefined) clear(node.childNodes)
		if (forceRecreation === true) reset(root)

		cellCache[id] = build(
			node,
			null,
			undefined,
			undefined,
			cell,
			cellCache[id],
			false,
			0,
			null,
			undefined,
			configs)

		forEach(configs, function (config) { config() })
	}

	function getCellCacheKey(element) {
		var index = nodeCache.indexOf(element)
		return index < 0 ? nodeCache.push(element) - 1 : index
	}

	m.trust = function (value) {
		value = new String(value) // eslint-disable-line no-new-wrappers
		value.$trusted = true
		return value
	}

	function gettersetter(store) {
		function prop() {
			if (arguments.length) store = arguments[0]
			return store
		}

		prop.toJSON = function () {
			return store
		}

		return prop
	}

	m.prop = function (store) {
		if ((store != null && isObject(store) || isFunction(store)) &&
				isFunction(store.then)) {
			return propify(store)
		}

		return gettersetter(store)
	}

	var roots = []
	var components = []
	var controllers = []
	var lastRedrawId = null
	var lastRedrawCallTime = 0
	var computePreRedrawHook = null
	var computePostRedrawHook = null
	var topComponent
	var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms

	function parameterize(component, args) {
		function controller() {
			/* eslint-disable no-invalid-this */
			return (component.controller || noop).apply(this, args) || this
			/* eslint-enable no-invalid-this */
		}

		if (component.controller) {
			controller.prototype = component.controller.prototype
		}

		function view(ctrl) {
			var currentArgs = [ctrl].concat(args)
			for (var i = 1; i < arguments.length; i++) {
				currentArgs.push(arguments[i])
			}

			return component.view.apply(component, currentArgs)
		}

		view.$original = component.view
		var output = {controller: controller, view: view}
		if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
		return output
	}

	m.component = function (component) {
		var args = [].slice.call(arguments, 1)

		return parameterize(component, args)
	}

	function checkPrevented(component, root, index, isPrevented) {
		if (!isPrevented) {
			m.redraw.strategy("all")
			m.startComputation()
			roots[index] = root
			var currentComponent

			if (component) {
				currentComponent = topComponent = component
			} else {
				currentComponent = topComponent = component = {controller: noop}
			}

			var controller = new (component.controller || noop)()

			// controllers may call m.mount recursively (via m.route redirects,
			// for example)
			// this conditional ensures only the last recursive m.mount call is
			// applied
			if (currentComponent === topComponent) {
				controllers[index] = controller
				components[index] = component
			}
			endFirstComputation()
			if (component === null) {
				removeRootElement(root, index)
			}
			return controllers[index]
		} else if (component == null) {
			removeRootElement(root, index)
		}
	}

	m.mount = m.module = function (root, component) {
		if (!root) {
			throw new Error("Please ensure the DOM element exists before " +
				"rendering a template into it.")
		}

		var index = roots.indexOf(root)
		if (index < 0) index = roots.length

		var isPrevented = false
		var event = {
			preventDefault: function () {
				isPrevented = true
				computePreRedrawHook = computePostRedrawHook = null
			}
		}

		forEach(unloaders, function (unloader) {
			unloader.handler.call(unloader.controller, event)
			unloader.controller.onunload = null
		})

		if (isPrevented) {
			forEach(unloaders, function (unloader) {
				unloader.controller.onunload = unloader.handler
			})
		} else {
			unloaders = []
		}

		if (controllers[index] && isFunction(controllers[index].onunload)) {
			controllers[index].onunload(event)
		}

		return checkPrevented(component, root, index, isPrevented)
	}

	function removeRootElement(root, index) {
		roots.splice(index, 1)
		controllers.splice(index, 1)
		components.splice(index, 1)
		reset(root)
		nodeCache.splice(getCellCacheKey(root), 1)
	}

	var redrawing = false
	m.redraw = function (force) {
		if (redrawing) return
		redrawing = true
		if (force) forcing = true

		try {
			// lastRedrawId is a positive number if a second redraw is requested
			// before the next animation frame
			// lastRedrawID is null if it's the first redraw and not an event
			// handler
			if (lastRedrawId && !force) {
				// when setTimeout: only reschedule redraw if time between now
				// and previous redraw is bigger than a frame, otherwise keep
				// currently scheduled timeout
				// when rAF: always reschedule redraw
				if ($requestAnimationFrame === global.requestAnimationFrame ||
						new Date() - lastRedrawCallTime > FRAME_BUDGET) {
					if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
					lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
				}
			} else {
				redraw()
				lastRedrawId = $requestAnimationFrame(function () {
					lastRedrawId = null
				}, FRAME_BUDGET)
			}
		} finally {
			redrawing = forcing = false
		}
	}

	m.redraw.strategy = m.prop()
	function redraw() {
		if (computePreRedrawHook) {
			computePreRedrawHook()
			computePreRedrawHook = null
		}
		forEach(roots, function (root, i) {
			var component = components[i]
			if (controllers[i]) {
				var args = [controllers[i]]
				m.render(root,
					component.view ? component.view(controllers[i], args) : "")
			}
		})
		// after rendering within a routed context, we need to scroll back to
		// the top, and fetch the document title for history.pushState
		if (computePostRedrawHook) {
			computePostRedrawHook()
			computePostRedrawHook = null
		}
		lastRedrawId = null
		lastRedrawCallTime = new Date()
		m.redraw.strategy("diff")
	}

	function endFirstComputation() {
		if (m.redraw.strategy() === "none") {
			pendingRequests--
			m.redraw.strategy("diff")
		} else {
			m.endComputation()
		}
	}

	m.withAttr = function (prop, withAttrCallback, callbackThis) {
		return function (e) {
			e = e || event
			/* eslint-disable no-invalid-this */
			var currentTarget = e.currentTarget || this
			var _this = callbackThis || this
			/* eslint-enable no-invalid-this */
			var target = prop in currentTarget ?
				currentTarget[prop] :
				currentTarget.getAttribute(prop)
			withAttrCallback.call(_this, target)
		}
	}

	// routing
	var modes = {pathname: "", hash: "#", search: "?"}
	var redirect = noop
	var isDefaultRoute = false
	var routeParams, currentRoute

	m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
		// m.route()
		if (arguments.length === 0) return currentRoute
		// m.route(el, defaultRoute, routes)
		if (arguments.length === 3 && isString(arg1)) {
			redirect = function (source) {
				var path = currentRoute = normalizeRoute(source)
				if (!routeByValue(root, arg2, path)) {
					if (isDefaultRoute) {
						throw new Error("Ensure the default route matches " +
							"one of the routes defined in m.route")
					}

					isDefaultRoute = true
					m.route(arg1, true)
					isDefaultRoute = false
				}
			}

			var listener = m.route.mode === "hash" ?
				"onhashchange" :
				"onpopstate"

			global[listener] = function () {
				var path = $location[m.route.mode]
				if (m.route.mode === "pathname") path += $location.search
				if (currentRoute !== normalizeRoute(path)) redirect(path)
			}

			computePreRedrawHook = setScroll
			global[listener]()

			return
		}

		// config: m.route
		if (root.addEventListener || root.attachEvent) {
			var base = m.route.mode !== "pathname" ? $location.pathname : ""
			root.href = base + modes[m.route.mode] + vdom.attrs.href
			if (root.addEventListener) {
				root.removeEventListener("click", routeUnobtrusive)
				root.addEventListener("click", routeUnobtrusive)
			} else {
				root.detachEvent("onclick", routeUnobtrusive)
				root.attachEvent("onclick", routeUnobtrusive)
			}

			return
		}
		// m.route(route, params, shouldReplaceHistoryEntry)
		if (isString(root)) {
			var oldRoute = currentRoute
			currentRoute = root

			var args = arg1 || {}
			var queryIndex = currentRoute.indexOf("?")
			var params

			if (queryIndex > -1) {
				params = parseQueryString(currentRoute.slice(queryIndex + 1))
			} else {
				params = {}
			}

			for (var i in args) if (hasOwn.call(args, i)) {
				params[i] = args[i]
			}

			var querystring = buildQueryString(params)
			var currentPath

			if (queryIndex > -1) {
				currentPath = currentRoute.slice(0, queryIndex)
			} else {
				currentPath = currentRoute
			}

			if (querystring) {
				currentRoute = currentPath +
					(currentPath.indexOf("?") === -1 ? "?" : "&") +
					querystring
			}

			var replaceHistory =
				(arguments.length === 3 ? arg2 : arg1) === true ||
				oldRoute === root

			if (global.history.pushState) {
				var method = replaceHistory ? "replaceState" : "pushState"
				computePreRedrawHook = setScroll
				computePostRedrawHook = function () {
					global.history[method](null, $document.title,
						modes[m.route.mode] + currentRoute)
				}
				redirect(modes[m.route.mode] + currentRoute)
			} else {
				$location[m.route.mode] = currentRoute
				redirect(modes[m.route.mode] + currentRoute)
			}
		}
	}

	m.route.param = function (key) {
		if (!routeParams) {
			throw new Error("You must call m.route(element, defaultRoute, " +
				"routes) before calling m.route.param()")
		}

		if (!key) {
			return routeParams
		}

		return routeParams[key]
	}

	m.route.mode = "search"

	function normalizeRoute(route) {
		return route.slice(modes[m.route.mode].length)
	}

	function routeByValue(root, router, path) {
		routeParams = {}

		var queryStart = path.indexOf("?")
		if (queryStart !== -1) {
			routeParams = parseQueryString(
				path.substr(queryStart + 1, path.length))
			path = path.substr(0, queryStart)
		}

		// Get all routes and check if there's
		// an exact match for the current path
		var keys = Object.keys(router)
		var index = keys.indexOf(path)

		if (index !== -1){
			m.mount(root, router[keys [index]])
			return true
		}

		for (var route in router) if (hasOwn.call(router, route)) {
			if (route === path) {
				m.mount(root, router[route])
				return true
			}

			var matcher = new RegExp("^" + route
				.replace(/:[^\/]+?\.{3}/g, "(.*?)")
				.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")

			if (matcher.test(path)) {
				/* eslint-disable no-loop-func */
				path.replace(matcher, function () {
					var keys = route.match(/:[^\/]+/g) || []
					var values = [].slice.call(arguments, 1, -2)
					forEach(keys, function (key, i) {
						routeParams[key.replace(/:|\./g, "")] =
							decodeURIComponent(values[i])
					})
					m.mount(root, router[route])
				})
				/* eslint-enable no-loop-func */
				return true
			}
		}
	}

	function routeUnobtrusive(e) {
		e = e || event
		if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return

		if (e.preventDefault) {
			e.preventDefault()
		} else {
			e.returnValue = false
		}

		var currentTarget = e.currentTarget || e.srcElement
		var args

		if (m.route.mode === "pathname" && currentTarget.search) {
			args = parseQueryString(currentTarget.search.slice(1))
		} else {
			args = {}
		}

		while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
			currentTarget = currentTarget.parentNode
		}

		// clear pendingRequests because we want an immediate route change
		pendingRequests = 0
		m.route(currentTarget[m.route.mode]
			.slice(modes[m.route.mode].length), args)
	}

	function setScroll() {
		if (m.route.mode !== "hash" && $location.hash) {
			$location.hash = $location.hash
		} else {
			global.scrollTo(0, 0)
		}
	}

	function buildQueryString(object, prefix) {
		var duplicates = {}
		var str = []

		for (var prop in object) if (hasOwn.call(object, prop)) {
			var key = prefix ? prefix + "[" + prop + "]" : prop
			var value = object[prop]

			if (value === null) {
				str.push(encodeURIComponent(key))
			} else if (isObject(value)) {
				str.push(buildQueryString(value, key))
			} else if (isArray(value)) {
				var keys = []
				duplicates[key] = duplicates[key] || {}
				/* eslint-disable no-loop-func */
				forEach(value, function (item) {
					/* eslint-enable no-loop-func */
					if (!duplicates[key][item]) {
						duplicates[key][item] = true
						keys.push(encodeURIComponent(key) + "=" +
							encodeURIComponent(item))
					}
				})
				str.push(keys.join("&"))
			} else if (value !== undefined) {
				str.push(encodeURIComponent(key) + "=" +
					encodeURIComponent(value))
			}
		}
		return str.join("&")
	}

	function parseQueryString(str) {
		if (str === "" || str == null) return {}
		if (str.charAt(0) === "?") str = str.slice(1)

		var pairs = str.split("&")
		var params = {}

		forEach(pairs, function (string) {
			var pair = string.split("=")
			var key = decodeURIComponent(pair[0])
			var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
			if (params[key] != null) {
				if (!isArray(params[key])) params[key] = [params[key]]
				params[key].push(value)
			}
			else params[key] = value
		})

		return params
	}

	m.route.buildQueryString = buildQueryString
	m.route.parseQueryString = parseQueryString

	function reset(root) {
		var cacheKey = getCellCacheKey(root)
		clear(root.childNodes, cellCache[cacheKey])
		cellCache[cacheKey] = undefined
	}

	m.deferred = function () {
		var deferred = new Deferred()
		deferred.promise = propify(deferred.promise)
		return deferred
	}

	function propify(promise, initialValue) {
		var prop = m.prop(initialValue)
		promise.then(prop)
		prop.then = function (resolve, reject) {
			return propify(promise.then(resolve, reject), initialValue)
		}

		prop.catch = prop.then.bind(null, null)
		return prop
	}
	// Promiz.mithril.js | Zolmeister | MIT
	// a modified version of Promiz.js, which does not conform to Promises/A+
	// for two reasons:
	//
	// 1) `then` callbacks are called synchronously (because setTimeout is too
	//    slow, and the setImmediate polyfill is too big
	//
	// 2) throwing subclasses of Error cause the error to be bubbled up instead
	//    of triggering rejection (because the spec does not account for the
	//    important use case of default browser error handling, i.e. message w/
	//    line number)

	var RESOLVING = 1
	var REJECTING = 2
	var RESOLVED = 3
	var REJECTED = 4

	function Deferred(onSuccess, onFailure) {
		var self = this
		var state = 0
		var promiseValue = 0
		var next = []

		self.promise = {}

		self.resolve = function (value) {
			if (!state) {
				promiseValue = value
				state = RESOLVING

				fire()
			}

			return self
		}

		self.reject = function (value) {
			if (!state) {
				promiseValue = value
				state = REJECTING

				fire()
			}

			return self
		}

		self.promise.then = function (onSuccess, onFailure) {
			var deferred = new Deferred(onSuccess, onFailure)

			if (state === RESOLVED) {
				deferred.resolve(promiseValue)
			} else if (state === REJECTED) {
				deferred.reject(promiseValue)
			} else {
				next.push(deferred)
			}

			return deferred.promise
		}

		function finish(type) {
			state = type || REJECTED
			next.map(function (deferred) {
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else {
					deferred.reject(promiseValue)
				}
			})
		}

		function thennable(then, success, failure, notThennable) {
			if (((promiseValue != null && isObject(promiseValue)) ||
					isFunction(promiseValue)) && isFunction(then)) {
				try {
					// count protects against abuse calls from spec checker
					var count = 0
					then.call(promiseValue, function (value) {
						if (count++) return
						promiseValue = value
						success()
					}, function (value) {
						if (count++) return
						promiseValue = value
						failure()
					})
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					failure()
				}
			} else {
				notThennable()
			}
		}

		function fire() {
			// check if it's a thenable
			var then
			try {
				then = promiseValue && promiseValue.then
			} catch (e) {
				m.deferred.onerror(e)
				promiseValue = e
				state = REJECTING
				return fire()
			}

			if (state === REJECTING) {
				m.deferred.onerror(promiseValue)
			}

			thennable(then, function () {
				state = RESOLVING
				fire()
			}, function () {
				state = REJECTING
				fire()
			}, function () {
				try {
					if (state === RESOLVING && isFunction(onSuccess)) {
						promiseValue = onSuccess(promiseValue)
					} else if (state === REJECTING && isFunction(onFailure)) {
						promiseValue = onFailure(promiseValue)
						state = RESOLVING
					}
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					return finish()
				}

				if (promiseValue === self) {
					promiseValue = TypeError()
					finish()
				} else {
					thennable(then, function () {
						finish(RESOLVED)
					}, finish, function () {
						finish(state === RESOLVING && RESOLVED)
					})
				}
			})
		}
	}

	m.deferred.onerror = function (e) {
		if (type.call(e) === "[object Error]" &&
				!/ Error/.test(e.constructor.toString())) {
			pendingRequests = 0
			throw e
		}
	}

	m.sync = function (args) {
		var deferred = m.deferred()
		var outstanding = args.length
		var results = new Array(outstanding)
		var method = "resolve"

		function synchronizer(pos, resolved) {
			return function (value) {
				results[pos] = value
				if (!resolved) method = "reject"
				if (--outstanding === 0) {
					deferred.promise(results)
					deferred[method](results)
				}
				return value
			}
		}

		if (args.length > 0) {
			forEach(args, function (arg, i) {
				arg.then(synchronizer(i, true), synchronizer(i, false))
			})
		} else {
			deferred.resolve([])
		}

		return deferred.promise
	}

	function identity(value) { return value }

	function handleJsonp(options) {
		var callbackKey = "mithril_callback_" +
			new Date().getTime() + "_" +
			(Math.round(Math.random() * 1e16)).toString(36)

		var script = $document.createElement("script")

		global[callbackKey] = function (resp) {
			script.parentNode.removeChild(script)
			options.onload({
				type: "load",
				target: {
					responseText: resp
				}
			})
			global[callbackKey] = undefined
		}

		script.onerror = function () {
			script.parentNode.removeChild(script)

			options.onerror({
				type: "error",
				target: {
					status: 500,
					responseText: JSON.stringify({
						error: "Error making jsonp request"
					})
				}
			})
			global[callbackKey] = undefined

			return false
		}

		script.onload = function () {
			return false
		}

		script.src = options.url +
			(options.url.indexOf("?") > 0 ? "&" : "?") +
			(options.callbackKey ? options.callbackKey : "callback") +
			"=" + callbackKey +
			"&" + buildQueryString(options.data || {})

		$document.body.appendChild(script)
	}

	function createXhr(options) {
		var xhr = new global.XMLHttpRequest()
		xhr.open(options.method, options.url, true, options.user,
			options.password)

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300) {
					options.onload({type: "load", target: xhr})
				} else {
					options.onerror({type: "error", target: xhr})
				}
			}
		}

		if (options.serialize === JSON.stringify &&
				options.data &&
				options.method !== "GET") {
			xhr.setRequestHeader("Content-Type",
				"application/json; charset=utf-8")
		}

		if (options.deserialize === JSON.parse) {
			xhr.setRequestHeader("Accept", "application/json, text/*")
		}

		if (isFunction(options.config)) {
			var maybeXhr = options.config(xhr, options)
			if (maybeXhr != null) xhr = maybeXhr
		}

		var data = options.method === "GET" || !options.data ? "" : options.data

		if (data && !isString(data) && data.constructor !== global.FormData) {
			throw new Error("Request data should be either be a string or " +
				"FormData. Check the `serialize` option in `m.request`")
		}

		xhr.send(data)
		return xhr
	}

	function ajax(options) {
		if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
			return handleJsonp(options)
		} else {
			return createXhr(options)
		}
	}

	function bindData(options, data, serialize) {
		if (options.method === "GET" && options.dataType !== "jsonp") {
			var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
			var querystring = buildQueryString(data)
			options.url += (querystring ? prefix + querystring : "")
		} else {
			options.data = serialize(data)
		}
	}

	function parameterizeUrl(url, data) {
		if (data) {
			url = url.replace(/:[a-z]\w+/gi, function(token){
				var key = token.slice(1)
				var value = data[key]
				delete data[key]
				return value
			})
		}
		return url
	}

	m.request = function (options) {
		if (options.background !== true) m.startComputation()
		var deferred = new Deferred()
		var isJSONP = options.dataType &&
			options.dataType.toLowerCase() === "jsonp"

		var serialize, deserialize, extract

		if (isJSONP) {
			serialize = options.serialize =
			deserialize = options.deserialize = identity

			extract = function (jsonp) { return jsonp.responseText }
		} else {
			serialize = options.serialize = options.serialize || JSON.stringify

			deserialize = options.deserialize =
				options.deserialize || JSON.parse
			extract = options.extract || function (xhr) {
				if (xhr.responseText.length || deserialize !== JSON.parse) {
					return xhr.responseText
				} else {
					return null
				}
			}
		}

		options.method = (options.method || "GET").toUpperCase()
		options.url = parameterizeUrl(options.url, options.data)
		bindData(options, options.data, serialize)
		options.onload = options.onerror = function (ev) {
			try {
				ev = ev || event
				var response = deserialize(extract(ev.target, options))
				if (ev.type === "load") {
					if (options.unwrapSuccess) {
						response = options.unwrapSuccess(response, ev.target)
					}

					if (isArray(response) && options.type) {
						forEach(response, function (res, i) {
							response[i] = new options.type(res)
						})
					} else if (options.type) {
						response = new options.type(response)
					}

					deferred.resolve(response)
				} else {
					if (options.unwrapError) {
						response = options.unwrapError(response, ev.target)
					}

					deferred.reject(response)
				}
			} catch (e) {
				deferred.reject(e)
			} finally {
				if (options.background !== true) m.endComputation()
			}
		}

		ajax(options)
		deferred.promise = propify(deferred.promise, options.initialValue)
		return deferred.promise
	}

	return m
})

},{}],8:[function(require,module,exports){
"use strict";require("polythene/base-button/theme/theme");

},{"polythene/base-button/theme/theme":10}],9:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=[{".pe-button":[_mixin2["default"].vendorize({"user-select":"none"},_config2["default"].prefixes_user_select),{outline:"none",padding:0,"text-decoration":"none","text-align":"center",cursor:"pointer","&.pe-button--selected, &.pe-button--disabled, &.pe-button--inactive":{cursor:"default","pointer-events":"none"}," .pe-button__content":{position:"relative","border-radius":"inherit"}," .pe-button__label":[_mixin2["default"].fontSmoothing(),{position:"relative","z-index":1,display:"block","border-radius":"inherit","pointer-events":"none"}]," .pe-button__wash":[_mixin2["default"].vendorize({transition:"background-color "+_config2["default"].animation_duration+" "+_config2["default"].animation_curve_default},_config2["default"].prefixes_transition),_mixin2["default"].fit(),{"z-index":1,"border-radius":"inherit","pointer-events":"none"}]}]}];exports["default"]=style,module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24}],10:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _layout=require("polythene/base-button/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler);_styler2["default"].add("pe-base-button",_layout2["default"]);

},{"polythene/base-button/theme/layout":9,"polythene/common/styler":20}],11:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj};require("polythene/common/object.assign");var _polythene=require("polythene/polythene/polythene"),_polythene2=_interopRequireDefault(_polythene),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_ripple=require("polythene/ripple/ripple"),_ripple2=_interopRequireDefault(_ripple),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow);require("polythene/base-button/base-button"),require("polythene/button/theme/theme");var CSS_CLASSES={block:"pe-button pe-button--text",content:"pe-button__content",label:"pe-button__label",raised:"pe-button--raised",wash:"pe-button__wash",selected:"pe-button--selected",disabled:"pe-button--disabled",borders:"pe-button--borders",inactive:"pe-button--inactive"},MAX_Z=5,startType=window.PointerEvent?"pointerdown":"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?"touchstart":"mousedown",endType=window.PointerEvent?"pointerup":"ontouchend"in window||window.DocumentTouch&&document instanceof DocumentTouch?"touchend":"mouseup",tapStart=void 0,tapEnd=void 0,tapEndAll=void 0,downButtons=[],animateZ=function(ctrl,opts,name){var baseZ=ctrl.baseZ(),increase=opts.increase||1,z=ctrl.z();"down"===name&&5!==baseZ?(z+=increase,z=Math.min(z,MAX_Z)):"up"===name&&(z-=increase,z=Math.max(z,baseZ)),z!==ctrl.z()&&(ctrl.z(z),_mithril2["default"].redraw())},inactivate=function(ctrl,opts){ctrl.inactive=!0,_mithril2["default"].redraw(),setTimeout(function(){ctrl.inactive=!1,_mithril2["default"].redraw()},1e3*opts.inactivate)},initTapEvents=function(el,ctrl,opts){var tapHandler=function(ctrl,opts,name){"down"===name?downButtons.push({ctrl:ctrl,opts:opts}):"up"===name&&opts.inactivate&&!opts.inactive&&inactivate(ctrl,opts),opts.animateOnTap&&!_polythene2["default"].isTouch&&animateZ(ctrl,opts,name)};tapStart=function(){return tapHandler(ctrl,opts,"down")},tapEnd=function(){return tapHandler(ctrl,opts,"up")},tapEndAll=function(){downButtons.map(function(btn){tapHandler(btn.ctrl,btn.opts,"up")}),downButtons=[]},el.addEventListener(startType,tapStart),el.addEventListener(endType,tapEnd),window.addEventListener(endType,tapEndAll)},clearTapEvents=function(el){el.removeEventListener(startType,tapStart),el.removeEventListener(endType,tapEnd),window.removeEventListener(endType,tapEndAll)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],noink=void 0!==opts.ink&&!opts.ink,disabled=opts.disabled,inactive=ctrl.inactive,tag=opts.tag||"a",buttonConfig=function(el,isInited,context){isInited||disabled||inactive||(initTapEvents(el,ctrl,Object.assign({},opts,{animateOnTap:opts.animateOnTap!==!1})),context.onunload=function(){clearTapEvents(el)})},optsConfig=opts.config||function(){},urlConfig=opts.url&&opts.url.config?opts.url.config:function(){},props=Object.assign({},{"class":[opts.parentClass||CSS_CLASSES.block,opts.selected?CSS_CLASSES.selected:null,disabled?CSS_CLASSES.disabled:null,inactive?CSS_CLASSES.inactive:null,opts.borders?CSS_CLASSES.borders:null,opts.raised?CSS_CLASSES.raised:null,opts["class"]].join(" "),id:opts.id||""},opts.url?opts.url:null,opts.formaction?{formaction:opts.formaction}:null,opts.type?{type:opts.type}:null,opts.events?opts.events:null,{config:function(){return[buttonConfig.apply(void 0,arguments),optsConfig.apply(void 0,arguments),urlConfig.apply(void 0,arguments)]}},disabled?{disabled:!0}:null),label=opts.content?opts.content:opts.label?"object"===_typeof(opts.label)?opts.label:({ tag: "div", attrs: { "class": CSS_CLASSES.label }, children: [ opts.label ] }):null,content=({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ opts.raised&&!disabled?_mithril2["default"].component(_shadow2["default"],{z:ctrl.z(),animated:!0}):null,disabled||noink?null:_mithril2["default"].component(_ripple2["default"],opts.ripple||{}),disabled||void 0!==opts.wash&&!opts.wash?null:({ tag: "div", attrs: { "class": CSS_CLASSES.wash }, children: [] }),label ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],z=void 0!==opts.z?opts.z:1;return{baseZ:_mithril2["default"].prop(z),z:_mithril2["default"].prop(z),inactive:opts.inactive||!1}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/base-button/base-button":8,"polythene/button/theme/theme":15,"polythene/common/object.assign":19,"polythene/polythene/polythene":54,"polythene/ripple/ripple":55,"polythene/shadow/shadow":59}],12:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint,type){var scope=arguments.length<=3||void 0===arguments[3]?"":arguments[3],normalBorder=config["color_"+tint+"_"+type+"_normal_border"]||"transparent",activeBorder=config["color_"+tint+"_"+type+"_active_border"]||normalBorder,disabledBorder=config["color_"+tint+"_"+type+"_disabled_border"]||normalBorder;return[_defineProperty({},scope+".pe-button",{"&, &:link, &:visited":{color:config["color_"+tint+"_"+type+"_normal_text"]}," .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_normal_background"],"border-color":normalBorder},"&.pe-button--disabled":{color:config["color_"+tint+"_"+type+"_disabled_text"]," .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_disabled_background"],"border-color":disabledBorder}},"&.pe-button--selected":{" .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_active_background"],"border-color":activeBorder}," .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"]}},"&:active":{" .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"]}}})]},noTouch=function(config,tint,type){var scope=arguments.length<=3||void 0===arguments[3]?"":arguments[3],normalBorder=config["color_"+tint+"_"+type+"_normal_border"],hoverBorder=config["color_"+tint+"_"+type+"_normal_border"]||normalBorder;return[_defineProperty({},scope+".pe-button:hover",{"&:not(.pe-button--selected) .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"],"border-color":hoverBorder}})]},createStyles=function(config){return[style(config,"light","flat"),style(config,"light","raised",".pe-button--raised"),{"html.pe-no-touch":[noTouch(config,"light","flat"," "),noTouch(config,"light","raised"," .pe-button--raised")]},{".pe-dark-theme":[style(config,"dark","flat"," "),style(config,"dark","raised"," .pe-button--raised")]},{"html.pe-no-touch .pe-dark-theme":[noTouch(config,"dark","flat"," "),noTouch(config,"dark","raised"," .pe-button--raised")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],13:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba,touch_height=_config2["default"].unit_touch_height,height=36;exports["default"]={margin_h:_config2["default"].grid_unit,border_radius:_config2["default"].unit_item_border_radius,font_size:14,font_weight:500,outer_padding_v:(touch_height-height)/2,padding_h:2*_config2["default"].grid_unit,padding_v:11,min_width:8*_config2["default"].grid_unit_component,text_transform:"uppercase",border_width:0,color_light_flat_normal_background:"transparent",color_light_flat_normal_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_flat_hover_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_flat_active_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_active),color_light_flat_disabled_background:"transparent",color_light_flat_disabled_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_light_raised_normal_background:"#E0E0E0",color_light_raised_normal_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_raised_hover_background:"transparent",color_light_raised_active_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_raised_disabled_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_disabled),color_light_raised_disabled_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_dark_flat_normal_background:"transparent",color_dark_flat_normal_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_flat_hover_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover),color_dark_flat_active_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_active),color_dark_flat_disabled_background:"transparent",color_dark_flat_disabled_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled),color_dark_raised_normal_background:rgba(_config2["default"].color_primary),color_dark_raised_normal_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_raised_hover_background:_config2["default"].color_primary_active,color_dark_raised_active_background:_config2["default"].color_primary_dark,color_dark_raised_disabled_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_disabled),color_dark_raised_disabled_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled)},module.exports=exports["default"];

},{"polythene/config/config":24}],14:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),createStyles=function(config){return[{".pe-button--text":{display:"inline-block","min-width":config.min_width+"px",margin:"0 "+config.margin_h+"px",padding:config.outer_padding_v+"px 0",background:"transparent",border:"none"," .pe-button__content":{"border-width":0,padding:"0 "+config.padding_h+"px","border-radius":config.border_radius+"px"}," .pe-button__label":{padding:config.padding_v+"px 0","font-size":config.font_size+"px","line-height":config.font_size+"px","font-weight":config.font_weight,"text-transform":config.text_transform,"white-space":"pre"},"&.pe-button--borders":{" .pe-button__wash":_mixin2["default"].fit(-1)," .pe-ripple":_mixin2["default"].fit(-1)," .pe-button__content":{"border-style":"solid","border-width":"1px"}," .pe-button__label":{padding:config.padding_v-1+"px 0"}}}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],15:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/button/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/button/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/button/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].button,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-button-text",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/button/theme/color":12,"polythene/button/theme/config":13,"polythene/button/theme/layout":14,"polythene/common/styler":20,"polythene/config/custom":25}],16:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var listeners={},throttle=function(func){var s=arguments.length<=1||void 0===arguments[1]?.05:arguments[1],context=arguments.length<=2||void 0===arguments[2]?window:arguments[2],wait=!1;return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];var later=function(){func.apply(context,args)};wait||(later(),wait=!0,setTimeout(function(){wait=!1},s))}},subscribe=function(eventName,listener,delay){listeners[eventName]=listeners[eventName]||[],listeners[eventName].push(delay?throttle(listener,delay):listener)},unsubscribe=function(eventName,listener){if(listeners[eventName]){var index=listeners[eventName].indexOf(listener);index>-1&&listeners[eventName].splice(index,1)}},emit=function(eventName,event){listeners[eventName]&&listeners[eventName].forEach(function(listener){listener(event)})};window.addEventListener("resize",function(e){return emit("resize",e)}),window.addEventListener("scroll",function(e){return emit("scroll",e)}),window.addEventListener("keydown",function(e){return emit("keydown",e)}),exports["default"]={throttle:throttle,subscribe:subscribe,unsubscribe:unsubscribe,emit:emit},module.exports=exports["default"];

},{}],17:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);require("polythene/common/object.assign");var vendorize=function(what,prefixes){var vendorsSel=prefixes.map(function(v){return"_"+v+"$"}).join("");return _defineProperty({},vendorsSel,what)},fit=function(){var offset=arguments.length<=0||void 0===arguments[0]?0:arguments[0],offsetPx=offset+"px";return{position:"absolute",top:offsetPx,right:offsetPx,bottom:offsetPx,left:offsetPx}},fontSmoothing=function(){var smoothing=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];return smoothing?{"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"}:{"-webkit-font-smoothing":"subpixel-antialiased","-moz-osx-font-smoothing":"auto"}},ellipsis=function(lines,lineHeight){return"none"===lines?{"text-overflow":"initial",overflow:"initial","white-space":"initial",display:"block",height:"auto"}:Object.assign({overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis","text-rendering":"auto"},void 0!==lines?{"-webkit-line-clamp":lines,"-webkit-box-orient":"vertical",display:"-webkit-box",height:lines*lineHeight+"px"}:null)},clearfix=function(){return{"&:after":{content:'""',display:"table",clear:"both"}}},hairline=function(){return{}},sticky=function(){return[{position:"-webkit-sticky"},{position:"-moz-sticky"},{position:"-o-sticky"},{position:"-ms-sticky"},{position:"sticky"},{top:0,"z-index":1}]},createStyles=function(common,fn){return Array.isArray(common)?common.map(function(o){for(var scope in o)return _defineProperty({},scope,fn(o[scope]))}):fn(common)},defaultTransition=function(){var properties=arguments.length<=0||void 0===arguments[0]?"all":arguments[0],duration=arguments.length<=1||void 0===arguments[1]?_config2["default"].animation_duration:arguments[1],curve=arguments.length<=2||void 0===arguments[2]?_config2["default"].animation_curve_default:arguments[2];return[vendorize({"transition-delay":0},_config2["default"].prefixes_transition),vendorize({"transition-duration":duration},_config2["default"].prefixes_transition),vendorize({"transition-timing-function":curve},_config2["default"].prefixes_transition),vendorize({"transition-property":properties},_config2["default"].prefixes_transition)]},fluidScale=function(property,unit,minValue,maxValue){var minBreakpoint=arguments.length<=4||void 0===arguments[4]?320:arguments[4],maxBreakpoint=arguments.length<=5||void 0===arguments[5]?1920:arguments[5],orientation=arguments.length<=6||void 0===arguments[6]?"horizontal":arguments[6];return fluidScales([property],unit,[[minBreakpoint,minValue],[maxBreakpoint,maxValue]],orientation)},fluidScales=function(property,unit,sizes,orientation){var sorted=sizes.sort(),minBreakpoints=sorted.map(function(data){return data[0]}),maxBreakpoints=sorted.map(function(data){return data[0]});maxBreakpoints.shift(),maxBreakpoints.push(minBreakpoints[minBreakpoints.length-1]);var minValues=sorted.map(function(data){return data[1]}),maxValues=sorted.map(function(data){return data[1]});return maxValues.shift(),maxValues.push(minValues[minValues.length-1]),sorted.map(function(data,index){return fluidRule(property,unit,orientation,minBreakpoints[index],maxBreakpoints[index],minValues[index],maxValues[index],0===index,index===sorted.length-1)})},fluidRule=function(property,unit){var orientation=arguments.length<=2||void 0===arguments[2]?"horizontal":arguments[2],minBreakpoint=arguments[3],maxBreakpoint=arguments[4],minValue=arguments[5],maxValue=arguments[6],isFirst=arguments[7],isLast=arguments[8],orientationUnit="vertical"===orientation?"vh":"vw",orientationRule="vertical"===orientation?"height":"width",rule=isLast?["@media (min-"+orientationRule+": "+minBreakpoint+"px)"]:["@media (min-"+orientationRule+": "+minBreakpoint+"px) and (max-"+orientationRule+": "+maxBreakpoint+"px)"],multiplier="(("+maxValue+" - "+minValue+") / ("+maxBreakpoint+" - "+minBreakpoint+") * 100"+orientationUnit+")",adder="((("+minValue+" * "+maxBreakpoint+") - ("+maxValue+" * "+minBreakpoint+")) / ("+maxBreakpoint+" - "+minBreakpoint+")) * 1"+unit,formula="calc("+multiplier+" + "+adder+")",properties=Array.isArray(property)?property:[property];return[isFirst?properties.map(function(p){return _defineProperty({},p,""+minValue+unit)}):null,_defineProperty({},rule,properties.map(function(p){return _defineProperty({},p,isLast?""+maxValue+unit:formula)}))]};exports["default"]={clearfix:clearfix,createStyles:createStyles,defaultTransition:defaultTransition,ellipsis:ellipsis,fit:fit,fontSmoothing:fontSmoothing,fluidScale:fluidScale,fluidScales:fluidScales,hairline:hairline,sticky:sticky,vendorize:vendorize},module.exports=exports["default"];

},{"polythene/common/object.assign":19,"polythene/config/config":24}],18:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/common/object.assign");var multiple=function(mOpts){var items=[],itemIndex=function(id){var item=findItem(id);return items.indexOf(item)},removeItem=function(id){var index=itemIndex(id);-1!==index&&items.splice(index,1)},replaceItem=function(id,newItem){var index=itemIndex(id);-1!==index&&(items[index]=newItem)},findItem=function(id){for(var i=0;i<items.length;i++)if(items[i].instanceId===id)return items[i]},next=function(){items.length&&(items[0].show=!0,_mithril2["default"].redraw())},_remove=function(instanceId){mOpts.queue?(items.shift(),setTimeout(next,0)):removeItem(instanceId)},setPauseState=function(pause,instanceId){var item=findItem(instanceId);item&&(item.pause=pause,item.unpause=!pause)},makeItem=function(itemOpts,instanceId){var opts="function"==typeof itemOpts?itemOpts():itemOpts,resolveShow=void 0,didShow=function(){return opts.didShow&&opts.didShow(instanceId),resolveShow(instanceId)},showPromise=new Promise(function(resolve){resolveShow=resolve}),resolveHide=void 0,didHide=function(){return opts.didHide&&opts.didHide(instanceId),mOpts.queue&&_remove(instanceId),resolveHide(instanceId)},hidePromise=new Promise(function(resolve){resolveHide=resolve});return Object.assign({},mOpts,{instanceId:instanceId,opts:opts,show:!mOpts.queue,showPromise:showPromise,hidePromise:hidePromise,didShow:didShow,didHide:didHide})};return{count:function(){return items.length},clear:function(){return items.length=0},show:function(opts){var instanceId=arguments.length<=1||void 0===arguments[1]?mOpts.defaultId:arguments[1],item=void 0;if(mOpts.queue)item=makeItem(opts,instanceId),items.push(item),1===items.length&&next();else{var storedItem=findItem(instanceId);item=makeItem(opts,instanceId),storedItem?replaceItem(instanceId,item):items.push(item)}return item.showPromise},hide:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0],item=void 0;return mOpts.queue?items.length&&(item=items[0]):item=findItem(instanceId),item?(item.hide=!0,item.hidePromise):Promise.resolve(instanceId)},remove:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];_remove(instanceId)},pause:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];setPauseState(!0,instanceId)},unpause:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];setPauseState(!1,instanceId)},view:function(){var toShowItems=items.filter(function(item){return item.show});return toShowItems.length?(document.body.classList.add(mOpts.bodyShowClass),(0,_mithril2["default"])(mOpts.tag,toShowItems.map(function(itemData){return _mithril2["default"].component(mOpts.instance,Object.assign({},itemData,{transitions:mOpts.transitions,key:itemData.key||itemData.instanceId}))}))):(document.body.classList.remove(mOpts.bodyShowClass),(0,_mithril2["default"])(mOpts.noneTag))}}};exports["default"]=multiple,module.exports=exports["default"];

},{"mithril":7,"polythene/common/object.assign":19}],19:[function(require,module,exports){
"use strict";Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(target){if(void 0===target||null===target)throw new TypeError("Cannot convert first argument to object");for(var to=Object(target),i=1;i<arguments.length;i++){var nextSource=arguments[i];if(void 0!==nextSource&&null!==nextSource){nextSource=Object(nextSource);for(var keysArray=Object.keys(nextSource),nextIndex=0,len=keysArray.length;len>nextIndex;nextIndex++){var nextKey=keysArray[nextIndex],desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);void 0!==desc&&desc.enumerable&&(to[nextKey]=nextSource[nextKey])}}}return to}});

},{}],20:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _j2c=require("j2c"),_j2c2=_interopRequireDefault(_j2c),remove=function(id){if(id){var old=document.getElementById(id);old&&old.parentNode.removeChild(old)}},add=function(id){for(var _len=arguments.length,styles=Array(_len>1?_len-1:0),_key=1;_len>_key;_key++)styles[_key-1]=arguments[_key];remove(id);var styleEl=document.createElement("style");id&&styleEl.setAttribute("id",id),styles.forEach(function(styleList){Object.keys(styleList).length&&styleList.forEach(function(style){var scoped={"@global":style},sheet=_j2c2["default"].sheet(scoped);styleEl.appendChild(document.createTextNode(sheet))})}),document.head.appendChild(styleEl)};exports["default"]={add:add,remove:remove},module.exports=exports["default"];

},{"j2c":6}],21:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){var el=document.createElement("fakeelement"),animations={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(var a in animations)if(void 0!==el.style[a])return animations[a]},module.exports=exports["default"];

},{}],22:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),SHOW_DURATION=.22,HIDE_DURATION=.2,SHOW_DELAY=0,HIDE_DELAY=0,TRANSITION="both",show=function(opts){return transition(opts,"show")},hide=function(opts){return transition(opts,"hide")},getDuration=function(opts,state){var transition=opts.transition||TRANSITION;return"none"===transition?0:"show"===transition&&"hide"===state?0:"hide"===transition&&"show"===state?0:"show"===state?void 0!==opts.showDuration?opts.showDuration:SHOW_DURATION:void 0!==opts.hideDuration?opts.hideDuration:HIDE_DURATION},getDelay=function(opts,state){var transition=opts.transition||TRANSITION;return"none"===transition?0:"show"===transition&&"hide"===state?0:"hide"===transition&&"show"===state?0:"show"===state?void 0!==opts.showDelay?opts.showDelay:SHOW_DELAY:void 0!==opts.hideDelay?opts.hideDelay:HIDE_DELAY},transition=function(opts,state){var deferred=_mithril2["default"].deferred(),el=opts.el;if(!el)return deferred.resolve(),deferred.promise;var transitionDuration=1e3*getDuration(opts,state),delay=1e3*getDelay(opts,state),style=el.style,beforeTransition=opts.beforeShow&&"show"===state?function(){style.transitionDuration="0ms",style.transitionDelay="0ms",opts.beforeShow()}:null,applyTransition=function(){style.transitionDuration=transitionDuration+"ms",style.transitionDelay=delay+"ms",opts.showClass&&el.classList["show"===state?"add":"remove"](opts.showClass),opts.show&&"function"==typeof opts.show&&"show"===state&&opts.show(),opts.hide&&"function"==typeof opts.hide&&"hide"===state&&opts.hide()},applyAfterTransition=function(){opts.afterHide&&"hide"===state&&(style.transitionDuration="0ms",style.transitionDelay="0ms",opts.afterHide())},doTransition=function(){applyTransition(),setTimeout(function(){applyAfterTransition(),deferred.resolve()},transitionDuration+delay)},maybeDelayTransition=function(){0===transitionDuration?doTransition():setTimeout(function(){doTransition()},0)};return beforeTransition?(beforeTransition(),setTimeout(function(){maybeDelayTransition()},0)):maybeDelayTransition(),deferred.promise};exports["default"]={show:show,hide:hide},module.exports=exports["default"];

},{"mithril":7}],23:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),window.WebFontConfig||(window.WebFontConfig={},function(){var wf=document.createElement("script");wf.src=("https:"===document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",wf.type="text/javascript",wf.async="true";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(wf,s)}());var webfontLoader={add:function(vendor,family,key){var vendorCfg=window.WebFontConfig[vendor]||{};vendorCfg.families=vendorCfg.families||[],vendorCfg.families.push(family),key&&(vendorCfg.key=key),window.WebFontConfig[vendor]=vendorCfg}};exports["default"]=webfontLoader,module.exports=exports["default"];

},{}],24:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default=require("polythene/config/default"),_default2=_interopRequireDefault(_default);exports["default"]=_default2["default"],module.exports=exports["default"];

},{"polythene/config/default":26}],25:[function(require,module,exports){
"use strict";

},{}],26:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var hex=function(_hex){var bigint=parseInt(_hex.substring(1),16),r=bigint>>16&255,g=bigint>>8&255,b=255&bigint;return r+","+g+","+b},rgba=function(colorStr){var opacity=arguments.length<=1||void 0===arguments[1]?1:arguments[1];return"rgba("+colorStr+","+opacity+")"},isInteger=function(nVal){return"number"==typeof nVal&&isFinite(nVal)&&nVal>-9007199254740992&&9007199254740992>nVal&&Math.floor(nVal)===nVal},isDesktop=window.innerWidth>=1024,grid_unit=4,grid_unit_component=8,animation_curve_slow_in_fast_out="cubic-bezier(.4, 0, .2, 1)",animation_curve_slow_in_linear_out="cubic-bezier(0, 0, .2, 1)",animation_curve_linear_in_fast_out="cubic-bezier(.4, 0, 1, 1)";exports["default"]={rgba:rgba,hex:hex,isInteger:isInteger,grid_unit:grid_unit,grid_unit_component:grid_unit_component,grid_unit_menu:56,grid_unit_icon_button:6*grid_unit_component,unit_block_border_radius:2,unit_item_border_radius:2,unit_indent:72,unit_side_padding:isDesktop?24:16,unit_touch_height:48,unit_icon_size_small:2*grid_unit_component,unit_icon_size:3*grid_unit_component,unit_icon_size_medium:4*grid_unit_component,unit_icon_size_large:5*grid_unit_component,unit_screen_size_extra_large:1280,unit_screen_size_large:960,unit_screen_size_medium:480,unit_screen_size_small:320,animation_duration:".18s",animation_curve_slow_in_fast_out:animation_curve_slow_in_fast_out,animation_curve_slow_in_linear_out:animation_curve_slow_in_linear_out,animation_curve_linear_in_fast_out:animation_curve_linear_in_fast_out,animation_curve_default:"ease-out",font_weight_light:300,font_weight_normal:400,font_weight_medium:500,font_weight_bold:700,font_size_title:20,line_height:1.3,color_primary:"33, 150, 243",color_primary_active:"30, 136, 229",color_primary_dark:"25, 118, 210",color_primary_faded:"100, 181, 249",color_primary_foreground:"255, 255, 255",color_light_background:"255, 255, 255",color_light_foreground:"0, 0, 0",color_dark_background:"34, 34, 34",color_dark_foreground:"255, 255, 255",blend_light_text_primary:.87,blend_light_text_regular:.73,blend_light_text_secondary:.54,blend_light_text_tertiary:.4,blend_light_text_disabled:.26,blend_light_border_light:.11,blend_light_background_active:.14,blend_light_background_hover:.06,blend_light_background_hover_medium:.12,blend_light_background_disabled:.09,blend_light_overlay_background:.3,blend_dark_text_primary:1,blend_dark_text_regular:.87,blend_dark_text_secondary:.7,blend_dark_text_tertiary:.4,blend_dark_text_disabled:.26,blend_dark_border_light:.1,blend_dark_background_active:.14,blend_dark_background_hover:.08,blend_dark_background_hoverMedium:.12,blend_dark_background_disabled:.12,blend_dark_overlay_background:.3,prefixes_animation:["o","moz","webkit"],prefixes_appearance:["o","moz","ms","webkit"],prefixes_background_size:["o","moz","webkit"],prefixes_box_shadow:["moz","webkit"],prefixes_keyframes:["o","moz","webkit"],prefixes_transform:["o","moz","ms","webkit"],prefixes_transition:["o","moz","webkit"],prefixes_user_select:["moz","ms","webkit"],breakpoint_small_handset_portrait:0,breakpoint_medium_handset_portrait:360,breakpoint_large_handset_portrait:400,breakpoint_small_tablet_portrait:600,breakpoint_large_tablet_portrait:720,breakpoint_small_handset_landscape:480,breakpoint_medium_handset_landscape:600,breakpoint_large_handset_landscape:720,env_tablet:window.innerWidth>=600,env_desktop:window.innerWidth>=1024,z_menu:99,z_header_container:999,z_notification:9998,z_dialog:9999},module.exports=exports["default"];

},{}],27:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _events=require("polythene/common/events"),_events2=_interopRequireDefault(_events),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_dialog=require("polythene/dialog/dialog"),_dialog2=_interopRequireDefault(_dialog),_transition=require("polythene/common/transition"),_transition2=_interopRequireDefault(_transition),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow);require("polythene/dialog/theme/theme");var CSS_CLASSES={block:"pe-dialog",visible:"pe-dialog--visible",body:"pe-dialog__body",fullscreen:"pe-dialog--fullscreen",content:"pe-dialog__content",header:"pe-dialog__header",footer:"pe-dialog__footer",footerHigh:"pe-dialog__footer--high",title:"pe-dialog__title",actions:"pe-dialog__actions",hasBackdrop:"pe-dialog--backdrop",hasTopOverflow:"pe-dialog--overflow-top",hasBottomOverflow:"pe-dialog--overflow-bottom",menuContent:"pe-menu__content"},SCROLL_WATCH_TIMER=150,updateScrollState=function(ctrl){var scroller=ctrl.scrollEl;scroller&&(ctrl.topOverflow=scroller.scrollTop>0,ctrl.bottomOverflow=scroller.scrollHeight-(scroller.scrollTop+scroller.getBoundingClientRect().height)>0)},updateFooterState=function(ctrl){var footerEl=ctrl.footerEl;if(footerEl){var style=window.getComputedStyle(footerEl),height=footerEl.getBoundingClientRect().height,minHeight=parseInt(style.minHeight,10);height>minHeight?footerEl.classList.add(CSS_CLASSES.footerHigh):footerEl.classList.remove(CSS_CLASSES.footerHigh)}},show=function(ctrl,opts){var id=ctrl.instanceId;return ctrl.isTransitioning=!0,_transition2["default"].show(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!0,ctrl.didShow&&ctrl.didShow(id)})},hide=function(ctrl,opts){var id=ctrl.instanceId;return ctrl.isTransitioning=!0,_transition2["default"].hide(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){_dialog2["default"].remove(id),ctrl.isTransitioning=!1,ctrl.visible=!1,ctrl.didHide&&ctrl.didHide(id),setTimeout(_mithril2["default"].redraw,0)})},createViewContent=function(ctrl,opts){var style={},bodyOpts=opts.body||opts.menu;return({ tag: "div", attrs: { "class": CSS_CLASSES.body, "style": style, "config": function(el,inited){inited||(ctrl.scrollEl=el)}, "onscroll": function(){ctrl.isScrolling=!0,updateScrollState(ctrl),clearTimeout(ctrl.scrollWatchId),ctrl.scrollWatchId=setTimeout(function(){ctrl.isScrolling=!1},SCROLL_WATCH_TIMER)} }, children: [ bodyOpts ] })},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],bodyOpts=opts.body||opts.menu,updateContentOnScroll=opts.updateContentOnScroll||!1,ignoreContent=!updateContentOnScroll&&ctrl.isScrolling,tag=opts.tag||"form",update=function(){updateScrollState(ctrl),updateFooterState(ctrl),_mithril2["default"].redraw()},props=Object.assign({},{"class":[CSS_CLASSES.block,opts.fullscreen?CSS_CLASSES.fullscreen:null,opts.backdrop?CSS_CLASSES.hasBackdrop:null,ctrl.topOverflow||opts.borders?CSS_CLASSES.hasTopOverflow:null,ctrl.bottomOverflow||opts.borders?CSS_CLASSES.hasBottomOverflow:null,ctrl.visible?CSS_CLASSES.visible:null,opts["class"]].join(" "),id:opts.id||"",config:function(el,inited,context,vdom){if(!inited){opts.config&&opts.config(el,inited,context,vdom),ctrl.el=el;var cleanup=function(){_events2["default"].unsubscribe("resize",update),_events2["default"].unsubscribe("keydown",handleEscape)},handleEscape=function(e){opts.fullscreen||opts.backdrop||27===e.which&&(cleanup(),hide(ctrl,Object.assign({},opts,{hideDelay:0})))};_events2["default"].subscribe("resize",update),_events2["default"].subscribe("keydown",handleEscape),context.onunload=function(){cleanup()},updateScrollState(ctrl),updateFooterState(ctrl),show(ctrl,opts).then(function(){updateScrollState(ctrl),updateFooterState(ctrl),(ctrl.topOverflow||ctrl.bottomOverflow)&&setTimeout(_mithril2["default"].redraw,0)})}},onclick:function(e){e.target===ctrl.el&&(opts.modal||ctrl.isTransitioning||hide(ctrl,Object.assign({},opts,{hideDelay:0})))}},opts.formOptions?opts.formOptions:null),body=bodyOpts?ignoreContent?{subtree:"retain"}:createViewContent(ctrl,opts):null,content=({ tag: "div", attrs: { "class": [CSS_CLASSES.content,opts.menu?CSS_CLASSES.menuContent:null].join(" ") }, children: [ opts.fullscreen?null:_mithril2["default"].component(_shadow2["default"],{z:ctrl.z,animated:!0}),opts.fullscreen?null:opts.title?({ tag: "div", attrs: { "class": CSS_CLASSES.header, "config": function(el){ctrl.headerHeight=el.scrollHeight} }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.title }, children: [ opts.title ] }) ] }):null,body,opts.fullscreen?null:opts.footer?({ tag: "div", attrs: { "class": CSS_CLASSES.footer, "config": function(el,inited){ctrl.footerHeight=el.scrollHeight,inited||(ctrl.footerEl=el)} }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.actions }, children: [ opts.footer ] }) ] }):null ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var instanceData=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],opts=instanceData.opts||{},z=void 0!==opts.z?opts.z:3;return Object.assign({},instanceData,{instanceId:instanceData.instanceId,z:z,scrollEl:null,footerEl:null,topOverflow:!1,bottomOverflow:!1,scrollWatchId:0,isScrolling:!1,headerHeight:0,footerHeight:0,el:null,visible:!1,isTransitioning:!1})},view:function(ctrl,instanceData){var opts="function"==typeof instanceData.opts?instanceData.opts():instanceData.opts;return instanceData.hide&&!ctrl.isTransitioning&&hide(ctrl,opts),createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/events":16,"polythene/common/object.assign":19,"polythene/common/transition":22,"polythene/dialog/dialog":28,"polythene/dialog/theme/theme":32,"polythene/shadow/shadow":59}],28:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _multiple=require("polythene/common/multiple"),_multiple2=_interopRequireDefault(_multiple),_dialogInstance=require("polythene/dialog/dialog-instance"),_dialogInstance2=_interopRequireDefault(_dialogInstance);exports["default"]=(0,_multiple2["default"])({instance:_dialogInstance2["default"],defaultId:"default_dialog",tag:".pe-dialog__holder",noneTag:"span.pe-dialog__placeholder",bodyShowClass:"pe-dialog--open"}),module.exports=exports["default"];

},{"polythene/common/multiple":18,"polythene/dialog/dialog-instance":27}],29:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-dialog",{"&.pe-dialog--backdrop":{"background-color":config["color_"+tint+"_backdrop_background"]}," .pe-dialog__content":{"background-color":config["color_"+tint+"_content_background"]}," .pe-dialog__header .pe-dialog__title":{color:config["color_"+tint+"_title_text"]}," .pe-dialog__body":{color:config["color_"+tint+"_body_text"]},"&.pe-dialog--overflow-top .pe-dialog__body":{"border-top-color":config["color_"+tint+"_body_border"]},"&.pe-dialog--overflow-bottom .pe-dialog__body":{"border-bottom-color":config["color_"+tint+"_body_border"]}})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],30:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba;exports["default"]={border_radius:_config2["default"].unit_block_border_radius,padding:3*_config2["default"].grid_unit_component,header_bottom:20,header_height:60,footer_height:52,color_light_content_background:rgba(_config2["default"].color_light_background),color_light_title_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_body_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_regular),color_light_body_border:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_border_light),color_light_backdrop_background:"rgba(0, 0, 0, .4)",color_dark_content_background:rgba(_config2["default"].color_dark_background),color_dark_title_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_body_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_regular),color_dark_body_border:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_border_light),color_dark_backdrop_background:"rgba(0, 0, 0, .5)"},module.exports=exports["default"];

},{"polythene/config/config":24}],31:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),createStyles=function(config){var padding=config.padding;return[{".pe-dialog":[_flex2["default"].layoutCenterCenter,_mixin2["default"].vendorize({"transition-timing-function":"ease-out"},_config2["default"].prefixes_transition),_mixin2["default"].vendorize({"transition-property":"opacity"},_config2["default"].prefixes_transition),{position:"fixed",top:0,left:0,right:0,bottom:0,"z-index":_config2["default"].z_dialog,height:"100%",padding:padding+"px 40px",opacity:0,"&.pe-dialog--visible":{opacity:1},"&.pe-dialog--fullscreen":{padding:0," .pe-dialog__content":{"border-radius":0,"max-width":"none",height:"100%",width:"100%"," .pe-dialog__header, .pe-dialog__footer":{display:"none"}," .pe-dialog__body":{padding:0,height:"100vh",border:"none","max-height":"calc(100vh)"}}}," .pe-dialog__header, pe-dialog__body, pe-dialog__header":{"z-index":1}," .pe-dialog__content":[_flex2["default"].layoutVertical,{position:"relative","max-height":"100%","min-width":"280px","max-width":7*_config2["default"].grid_unit_menu+"px","border-radius":config.border_radius+"px"," > .pe-shadow":{"z-index":-1},"&.pe-menu__content":{" .pe-dialog__body":{padding:0,border:"none"}}}]," .pe-dialog__title":{"font-size":_config2["default"].font_size_title+"px","line-height":"24px","font-weight":_config2["default"].font_weight_medium,display:"block","& + div":{"margin-top":"16px"}}," .pe-dialog__header":{padding:[padding-4,padding,config.header_bottom-4,padding].map(function(v){return v+"px"}).join(" "),"min-height":config.header_height+"px"," .pe-dialog__title":[_mixin2["default"].ellipsis(),{display:"block",width:"100%"}]}," .pe-dialog__body":[_flex2["default"].selfStretch,_mixin2["default"].hairline("border-top"),{"border-top-style":"solid"},_mixin2["default"].hairline("border-top"),{"border-bottom-style":"solid"},{padding:[padding,padding,padding-5,padding].map(function(v){return v+"px"}).join(" "),"overflow-y":"auto","-webkit-overflow-scrolling":"touch","border-width":"1px","border-style":"solid none","border-color":"transparent","max-height":"calc(100vh - "+2*padding+"px - "+(config.header_height+config.footer_height)+"px)"}]," .pe-dialog__header + .pe-dialog__body":{"padding-top":0}," .pe-dialog__footer":{padding:"2px 8px","min-height":config.footer_height+"px","font-size":0,"&.pe-dialog__footer--high":{"padding-bottom":"8px"}}," .pe-dialog__actions":[_flex2["default"].layoutHorizontal,_flex2["default"].layoutEndJustified,_flex2["default"].layoutWrap,{margin:"0 -4px"," .pe-button":{height:"36px","margin-top":"6px","margin-bottom":"6px",padding:0}}]}]," body.pe-dialog--open":{overflow:"hidden",left:0,"-webkit-overflow-scrolling":"touch",position:"fixed",top:0,width:"100%"}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24,"polythene/layout/theme/flex":38}],32:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/dialog/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/dialog/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/dialog/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].dialog,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-dialog",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/dialog/theme/color":29,"polythene/dialog/theme/config":30,"polythene/dialog/theme/layout":31}],33:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _webfontloader=require("polythene/common/webfontloader"),_webfontloader2=_interopRequireDefault(_webfontloader);_webfontloader2["default"].add("google","Roboto:400,500,700,400italic:latin");

},{"polythene/common/webfontloader":23}],34:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_svg=require("polythene/svg/svg"),_svg2=_interopRequireDefault(_svg);require("polythene/icon/theme/theme");var CSS_CLASSES={icon:"pe-icon",avatar:"pe-icon--avatar",small:"pe-icon--small",regular:"pe-icon--regular",medium:"pe-icon--medium",large:"pe-icon--large"},typeClasses={small:CSS_CLASSES.small,regular:CSS_CLASSES.regular,medium:CSS_CLASSES.medium,large:CSS_CLASSES.large},classForType=function(){var mode=arguments.length<=0||void 0===arguments[0]?"regular":arguments[0];return typeClasses[mode]},layoutContent=function(opts){if(opts.content)return opts.content;if(opts.svg){var svgOpts=Object.assign({},opts.svg);return svgOpts.tag=svgOpts.tag||"i",_mithril2["default"].component(_svg2["default"],svgOpts)}return opts.msvg?(0,_mithril2["default"])("i.pe-svg",_mithril2["default"].trust(opts.msvg)):({ tag: "i", attrs: {  }, children: [ ({ tag: "img", attrs: { "src": opts.src }, children: [] }) ] })},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props=Object.assign({},{"class":[CSS_CLASSES.icon,classForType(opts.type),opts["class"]].join(" "),id:opts.id||"",config:opts.config},opts.events?opts.events:null),content=layoutContent(opts);return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/object.assign":19,"polythene/icon/theme/theme":37,"polythene/svg/svg":63}],35:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);exports["default"]={size_small:_config2["default"].unit_icon_size_small,size_regular:_config2["default"].unit_icon_size,size_medium:_config2["default"].unit_icon_size_medium,size_large:_config2["default"].unit_icon_size_large},module.exports=exports["default"];

},{"polythene/common/object.assign":19,"polythene/config/config":24}],36:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),iconSizesPx=function(){var size=arguments.length<=0||void 0===arguments[0]?_config2["default"].unit_icon_size:arguments[0];return{width:size+"px",height:size+"px"}},createStyles=function(config){return[{".pe-icon":{display:"inline-block","vertical-align":"middle","background-repeat":"no-repeat",fill:"currentcolor",position:"relative","&.pe-icon--avatar img":{border:"none","border-radius":"50%",width:"100%",height:"100%"}," i":[_mixin2["default"].fit(),{display:"block","font-size":"inherit",color:"inherit","line-height":"inherit",height:"100%"," img":{height:"100%"}," svg":{width:"100%",height:"100%",fill:"currentcolor",color:"inherit"," path:not([fill=none])":{fill:"currentcolor"}}}],"&.pe-icon--small":iconSizesPx(config.size_small),"&.pe-icon--regular":iconSizesPx(config.size_regular),"&.pe-icon--medium":iconSizesPx(config.size_medium),"&.pe-icon--large":iconSizesPx(config.size_large)}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24}],37:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/icon/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/icon/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].icon,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-icon",(0,_layout2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/icon/theme/config":35,"polythene/icon/theme/layout":36}],38:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var layout=[{display:"-webkit-box"},{display:"-moz-box"},{display:"-ms-flexbox","-ms-flex-preferred-size":"initial"},{display:"-webkit-flex"},{display:"flex"}],layoutInline=[layout,{display:"-ms-inline-flexbox"},{display:"-webkit-inline-flex"},{display:"inline-flex"}],layoutHorizontal=[layout,{"-ms-flex-direction":"row","-webkit-flex-direction":"row","flex-direction":"row"}],layoutHorizontalReverse=[layout,{"-ms-flex-direction":"row-reverse","-webkit-flex-direction":"row-reverse","flex-direction":"row-reverse"}],layoutVertical=[layout,{"-ms-flex-direction":"column","-webkit-flex-direction":"column","flex-direction":"column"}],layoutVerticalReverse=[layout,{"-ms-flex-direction":"column-reverse","-webkit-flex-direction":"column-reverse","flex-direction":"column-reverse"}],layoutWrap=[layout,{"-ms-flex-wrap":"wrap","-webkit-flex-wrap":"wrap","flex-wrap":"wrap"}],layoutWrapReverse=[layout,{"-ms-flex-wrap":"wrap-reverse","-webkit-flex-wrap":"wrap-reverse","flex-wrap":"wrap-reverse"}],layoutStart=[layout,{"-ms-flex-align":"start","-webkit-align-items":"flex-start","align-items":"flex-start"}],layoutCenter=[layout,{"-ms-flex-align":"center","-webkit-align-items":"center","align-items":"center"}],layoutEnd=[layout,{"-ms-flex-align":"end","-webkit-align-items":"flex-end","align-items":"flex-end"}],layoutJustified=[layout,{"-ms-flex-line-pack":"stretch","-ms-flex-pack":"justify","-webkit-justify-content":"space-between","justify-content":"space-between"}],layoutStartJustified=[layout,{"-ms-flex-align":"start","-ms-flex-pack":"start","-webkit-justify-content":"flex-start","justify-content":"flex-start"}],layoutCenterJustified=[layout,{"-ms-flex-pack":"center","-webkit-justify-content":"center","justify-content":"center"}],layoutEndJustified=[layout,{"-ms-flex-pack":"end","-webkit-justify-content":"flex-end","justify-content":"flex-end"}],layoutCenterCenter=[layoutCenterJustified,layoutCenter],layoutAroundJustified=[layout,{"-ms-flex-pack":"distribute","-webkit-justify-content":"space-around","justify-content":"space-around"}],flex=function(){var num=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return[{"-webkit-box-flex":num},{"-moz-box-flex":num},{"-webkit-flex":num},{"-ms-flex":num},{flex:num},1===num?{"-webkit-flex-basis":"0.000000001px"}:{},1===num?{"flex-basis":"0.000000001px"}:{}]},flexAuto={"-ms-flex":"1 1 auto","-webkit-flex-basis":"auto","flex-basis":"auto"},flexAutoVertical={"-ms-flex":"1 1 auto","-webkit-flex-basis":"auto","flex-basis":"auto"},flexIndex=function(index){return{"-ms-flex":index,"-webkit-flex":index,flex:index}},selfStart={"-ms-flex-item-align":"start","-ms-align-self":"flex-start","-webkit-align-self":"flex-start","align-self":"flex-start"},selfCenter={"-ms-flex-item-align":"center","-ms-align-self":"center","-webkit-align-self":"center","align-self":"center"},selfEnd={"-ms-flex-item-align":"end","-ms-align-self":"flex-end","-webkit-align-self":"flex-end","align-self":"flex-end"},selfStretch={"-ms-flex-item-align":"stretch","-ms-align-self":"stretch","-webkit-align-self":"stretch","align-self":"stretch"};exports["default"]={flex:flex,flexAuto:flexAuto,flexAutoVertical:flexAutoVertical,flexIndex:flexIndex,layout:layout,layoutAroundJustified:layoutAroundJustified,layoutCenter:layoutCenter,layoutCenterCenter:layoutCenterCenter,layoutCenterJustified:layoutCenterJustified,layoutEnd:layoutEnd,layoutEndJustified:layoutEndJustified,layoutHorizontal:layoutHorizontal,layoutHorizontalReverse:layoutHorizontalReverse,layoutInline:layoutInline,layoutJustified:layoutJustified,layoutStart:layoutStart,layoutStartJustified:layoutStartJustified,layoutVertical:layoutVertical,layoutVerticalReverse:layoutVerticalReverse,layoutWrap:layoutWrap,layoutWrapReverse:layoutWrapReverse,selfCenter:selfCenter,selfEnd:selfEnd,selfStart:selfStart,selfStretch:selfStretch},module.exports=exports["default"];

},{}],39:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_icon=require("polythene/icon/icon"),_icon2=_interopRequireDefault(_icon),_ripple=require("polythene/ripple/ripple"),_ripple2=_interopRequireDefault(_ripple);require("polythene/list-tile/theme/theme");var CSS_CLASSES={block:"pe-list-tile",primary:"pe-list-tile__primary",secondary:"pe-list-tile__secondary",content:"pe-list-tile__content",contentFront:"pe-list-tile__content--front",title:"pe-list-tile__title",subtitle:"pe-list-tile__subtitle",highSubtitle:"pe-list-tile__subtitle--high",selected:"pe-list-tile--selected",disabled:"pe-list-tile--disabled",sticky:"pe-list-tile--sticky",hasSubtitle:"pe-list-tile--subtitle",hasHighSubtitle:"pe-list-tile--high-subtitle",hasFront:"pe-list-tile--front",isCompact:"pe-list-tile--compact"},parsePrimaryContent=function(opts){var tag=opts.tag?opts.tag:opts.url?"a":"div",frontComp=opts.front?({ tag: "div", attrs: { "class": CSS_CLASSES.content+" "+CSS_CLASSES.contentFront }, children: [ opts.front ] }):opts.indent?({ tag: "div", attrs: { "class": CSS_CLASSES.content+" "+CSS_CLASSES.contentFront }, children: [] }):null;return(0,_mithril2["default"])(tag,Object.assign({"class":CSS_CLASSES.primary},opts.url,opts.events),[frontComp,({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ opts.content?opts.content:null,opts.title?({ tag: "div", attrs: { "class": CSS_CLASSES.title }, children: [ opts.title ] }):null,opts.subtitle?({ tag: "div", attrs: { "class": CSS_CLASSES.subtitle }, children: [ opts.subtitle ] }):null,opts.highSubtitle?({ tag: "div", attrs: { "class": CSS_CLASSES.subtitle+" "+CSS_CLASSES.highSubtitle }, children: [ opts.highSubtitle ] }):null ] })])},parseSecondaryContent=function(opts){var secondaryOpts=opts.secondary||{},tag=void 0;return tag=secondaryOpts.tag?secondaryOpts.tag:secondaryOpts.url?"a":"div",(0,_mithril2["default"])(tag,Object.assign({"class":CSS_CLASSES.secondary},secondaryOpts.url,secondaryOpts.events),({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ secondaryOpts.icon?_mithril2["default"].component(_icon2["default"],secondaryOpts.icon):null,secondaryOpts.content?secondaryOpts.content:null ] }))},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",heightClass=opts.subtitle?CSS_CLASSES.hasSubtitle:opts.highSubtitle?CSS_CLASSES.hasHighSubtitle:opts.front||opts.indent?CSS_CLASSES.hasFront:null,props={"class":[CSS_CLASSES.block,opts.selected?CSS_CLASSES.selected:null,opts.disabled?CSS_CLASSES.disabled:null,opts.sticky?CSS_CLASSES.sticky:null,opts.compact?CSS_CLASSES.isCompact:null,heightClass,opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=[opts.ink&&!opts.disabled?_mithril2["default"].component(_ripple2["default"],opts.ripple):null,parsePrimaryContent(opts),opts.secondary?parseSecondaryContent(opts):null];return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/object.assign":19,"polythene/icon/icon":34,"polythene/list-tile/theme/theme":43,"polythene/ripple/ripple":55}],40:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-list-tile",{" .pe-list-tile__title":{color:config["color_"+tint+"_title"]},"&.pe-list__header":{"background-color":"inherit"," .pe-list-tile__title":{color:config["color_"+tint+"_list_header"]}}," .pe-list-tile__content, .pe-list-tile__subtitle":{color:config["color_"+tint+"_subtitle"]},"&.pe-list-tile--disabled":{"&, .pe-list-tile__title, .pe-list-tile__content, .pe-list-tile__subtitle":{color:config["color_"+tint+"_text_disabled"]}},"&.pe-list-tile--selected":{"background-color":config["color_"+tint+"_background_selected"]}})]},noTouch=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-list-tile",{"&:not(.pe-list__header):not(.pe-list-tile--disabled):hover":{"background-color":config["color_"+tint+"_background_hover"]}})]},createStyles=function(config){return[style(config,"light"),{"html.pe-no-touch .pe-list--hoverable":[noTouch(config,"light"," ")]},{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]},{"html.pe-no-touch .pe-dark-theme .pe-list--hoverable":noTouch(config,"dark"," "),"html.pe-no-touch .pe-list--hoverable .pe-dark-theme":noTouch(config,"dark")}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],41:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba,single_height=48,padding=8,single_with_icon_height=56;exports["default"]={single_height:single_height,single_line_height:single_height-2*padding-11,single_with_icon_height:single_with_icon_height,single_with_icon_line_height:single_with_icon_height-2*padding-11,padding:13,compact_padding:9,subtitle_line_count:1,has_subtitle_padding:15,high_subtitle_line_count:2,has_high_subtitle_padding:13,front_item_width:72,side_padding:2*_config2["default"].grid_unit_component,font_size_title:16,font_size_subtitle:14,line_height_subtitle:20,font_size_list_header:14,font_size_small:12,color_light_title:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_subtitle:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_secondary),color_light_info:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_tertiary),color_light_text_disabled:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_light_list_header:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_tertiary),color_light_background_hover:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_background_selected:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_dark_title:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_subtitle:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_secondary),color_dark_info:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_tertiary),color_dark_text_disabled:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled),color_dark_list_header:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_tertiary),color_dark_background_hover:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover),color_dark_background_selected:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover)},module.exports=exports["default"];

},{"polythene/config/config":24}],42:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),paddingH=function(h){return{"padding-left":h+"px","padding-right":h+"px"}},paddingV=function(top,bottom){return{"padding-top":top+"px","padding-bottom":(bottom||top)+"px"}},createStyles=function(config){return[{".pe-list-tile":[_flex2["default"].layout,{position:"relative",overflow:"hidden","&.pe-list-tile--sticky":_mixin2["default"].sticky()," .pe-list-tile__primary, .pe-list-tile__secondary":[_flex2["default"].layoutHorizontal,{" a&":{"text-decoration":"none",color:"inherit",border:"none"}}]," .pe-list-tile__primary":[_flex2["default"].flex(),{position:"relative"," .pe-list-tile__content:not(.pe-list-tile__content--front)":[_flex2["default"].flex(),paddingV(config.padding,config.padding+1)]}]," .pe-list-tile__secondary":{"text-align":"right","font-size":config.font_size_title+"px"}," .pe-list-tile__content":[_flex2["default"].layoutVertical,_flex2["default"].selfCenter,paddingH(config.side_padding),{"&.pe-list-tile__content--front":[paddingV(config.padding-5),{width:config.front_item_width+"px"}]," small":{"font-size":config.font_size_small+"px"}}]," .pe-list-tile__content--front + .pe-list-tile__content":{"padding-left":0}," .pe-list-tile__title":[_mixin2["default"].ellipsis(1,config.single_line_height),{"font-size":config.font_size_title+"px","font-weight":_config2["default"].font_weight_normal,"line-height":config.single_line_height+"px"}]," .pe-list-tile__subtitle":[_mixin2["default"].ellipsis(config.subtitle_line_count,config.line_height_subtitle),{"font-size":config.font_size_subtitle+"px","line-height":config.line_height_subtitle+"px","&.pe-list-tile__subtitle--high":[_mixin2["default"].ellipsis(config.high_subtitle_line_count,config.line_height_subtitle),{"white-space":"normal"}]}],"&.pe-list-tile--selected, &.pe-list-tile--disabled":{cursor:"default"},"&.pe-list-tile--subtitle":{" .pe-list-tile__content":[paddingV(config.has_subtitle_padding,config.has_subtitle_padding+1),{" .pe-list-tile__title":{padding:0}}]},"&.pe-list-tile--high-subtitle":{" .pe-list-tile--high-subtitle .pe-list-tile__secondary":[_flex2["default"].layoutHorizontal,_flex2["default"].layoutStart]," .pe-list-tile__content":[_flex2["default"].selfStart,paddingV(config.has_high_subtitle_padding,config.has_high_subtitle_padding+1),{" .pe-list-tile__title":{padding:0}}]},"&.pe-list__header":{height:config.single_height+"px"," .pe-list-tile__content":{"padding-top":0,"padding-bottom":0}," .pe-list-tile__title":[_mixin2["default"].ellipsis(1,config.single_height),{"font-size":config.font_size_list_header+"px","font-weight":_config2["default"].font_weight_medium,"line-height":config.single_height+"px",padding:0}]}," .pe-list--compact &, &.pe-list-tile--compact":{"&:not(.pe-list__header)":{" .pe-list-tile__content":paddingV(config.compact_padding,config.compact_padding+1)}},"@supports (-moz-appearance:none) and (display:contents)":{" .pe-list-tile__primary, .pe-list-tile__content":{overflow:"hidden"}},".pe-dialog .pe-menu__content &":{" .pe-list-tile__title":_mixin2["default"].ellipsis("none")},".pe-menu__content &":{"&:not(.pe-list-tile--disabled)":{cursor:"default","&, .pe-list-tile__primary, .pe-list-tile__secondary":{" .pe-list-tile__title, .pe-list-tile__subtitle":[_mixin2["default"].vendorize({"user-select":"none"},_config2["default"].prefixes_user_select)]}}},"html.pe-no-touch .pe-list--hoverable &, html.pe-no-touch .pe-list--selectable &":{"&:not(.pe-list__header):not(.pe-list-tile--disabled):not(.pe-list-tile--selected):hover":{cursor:"pointer"}}}]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24,"polythene/layout/theme/flex":38}],43:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/list-tile/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/list-tile/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/list-tile/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"]["list-tile"],config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-list-tile",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/list-tile/theme/color":40,"polythene/list-tile/theme/config":41,"polythene/list-tile/theme/layout":42}],44:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_listTile=require("polythene/list-tile/list-tile"),_listTile2=_interopRequireDefault(_listTile);require("polythene/list/theme/theme");var CSS_CLASSES={block:"pe-list",header:"pe-list__header",hoverable:"pe-list--hoverable",selectable:"pe-list--selectable",borders:"pe-list--borders",indentedBorders:"pe-list--borders-indented",hasHeader:"pe-list--header",isCompact:"pe-list--compact"},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.borders?CSS_CLASSES.borders:null,opts.indentedBorders?CSS_CLASSES.indentedBorders:null,opts.hoverable?CSS_CLASSES.hoverable:null,opts.selectable?CSS_CLASSES.selectable:null,opts.header?CSS_CLASSES.hasHeader:null,opts.compact?CSS_CLASSES.isCompact:null,opts["class"]].join(" "),id:opts.id||"",config:opts.config},headerOpts=void 0;opts.header&&(headerOpts=Object.assign({},opts.header),headerOpts["class"]=[CSS_CLASSES.header,headerOpts["class"]||null].join(" "));var content=[headerOpts?_mithril2["default"].component(_listTile2["default"],headerOpts):null,opts.tiles?opts.tiles:null];return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/object.assign":19,"polythene/list-tile/list-tile":39,"polythene/list/theme/theme":48}],45:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var _ref,scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[(_ref={},_defineProperty(_ref,scope+".pe-list",{"&.pe-list--borders":{" .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{"border-color":config["color_"+tint+"_border"]}}},"&.pe-list--borders-indented":{" .pe-list-tile:not(.pe-list__header)":{" .pe-list-tile__content:not(.pe-list-tile__content--front)":{"border-color":config["color_"+tint+"_border"]}}}}),_defineProperty(_ref," .pe-list + .pe-list",{"border-color":config["color_"+tint+"_border"]}),_ref)]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],46:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba;exports["default"]={padding:_config2["default"].grid_unit_component,padding_compact:_config2["default"].grid_unit_component/2,border_width_stacked:1,border_width_bordered:1,color_light_border:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_border_light),color_dark_border:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_border_light)},module.exports=exports["default"];

},{"polythene/config/config":24}],47:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),borderStyle=function(config){return _mixin2["default"].hairline("border-bottom"),{"border-style":"none none solid none","border-width":config.border_width_bordered+"px"}},createStyles=function(config){return[{".pe-list":{padding:config.padding+"px 0","&.pe-list--header":{"padding-top":0},"&.pe-list--compact":{padding:config.padding_compact+"px 0"},"& + &":[_mixin2["default"].hairline("border-top"),{"border-style":"solid none none none","border-width":config.border_width_stacked+"px"}],"&.pe-list--borders":{" .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{"&":borderStyle(config)}}},"&.pe-list--borders-indented":{"border-top":"none"," .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{" .pe-list-tile__content:not(.pe-list-tile__content--front)":borderStyle(config)}}}}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],48:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/list/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/list/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/list/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].list,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-list",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/list/theme/color":45,"polythene/list/theme/config":46,"polythene/list/theme/layout":47}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _events=require("polythene/common/events"),_events2=_interopRequireDefault(_events),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow),_transition=require("polythene/common/transition"),_transition2=_interopRequireDefault(_transition);require("polythene/menu/theme/theme");var CSS_CLASSES={block:"pe-menu",content:"pe-menu__content",placeholder:"pe-menu--placeholder",visible:"pe-menu--visible",permanent:"pe-menu--permanent",target:"pe-menu--target",width_n:"pe-menu--width-",width_auto:"pe-menu--width-auto",listTile:"pe-list-tile",selectedListTile:"pe-list-tile--selected"},OFFSET_V=-8,DEFAULT_OFFSET_H=16,MIN_SIZE=1.5,positionMenu=function(ctrl,opts){if(opts.target){var targetEl=document.querySelector("#"+opts.target);if(targetEl){var offsetH=void 0!==opts.offset?opts.offset:DEFAULT_OFFSET_H,menuEl=ctrl.el;if(menuEl){var contentEl=ctrl.contentEl,origin=opts.origin||"top-left",reposition=opts.reposition!==!1,positionOffset=0;if(reposition){var firstItem=contentEl.querySelectorAll("."+CSS_CLASSES.listTile)[0],selectedItem=contentEl.querySelector("."+CSS_CLASSES.selectedListTile);if(firstItem&&selectedItem){var firstItemRect=firstItem.getBoundingClientRect(),selectedItemRect=selectedItem.getBoundingClientRect();positionOffset=selectedItemRect.top-firstItemRect.top}var alignEl=selectedItem||firstItem,alignRect=alignEl.getBoundingClientRect(),_targetRect=targetEl.getBoundingClientRect(),heightDiff=alignRect.height-_targetRect.height;positionOffset+=heightDiff/2}var targetRect=targetEl.getBoundingClientRect(),parentRect=menuEl.parentNode.getBoundingClientRect(),alignLeft=function(){return menuEl.style.left=targetRect.left-parentRect.left+offsetH+"px"},alignRight=function(){return menuEl.style.right=targetRect.right-parentRect.right+offsetH+"px"},alignTop=function(){return menuEl.style.top=targetRect.top-parentRect.top-positionOffset+OFFSET_V+"px"},alignBottom=function(){return menuEl.style.bottom=targetRect.bottom-parentRect.bottom-positionOffset+"px"},alignFn={"top-left":function(){return alignTop()&&alignLeft()},"top-right":function(){return alignTop()&&alignRight()},"bottom-left":function(){return alignBottom()&&alignLeft()},"bottom-right":function(){return alignBottom()&&alignRight()}};alignFn[origin].call()}}}},show=function(ctrl,opts){return ctrl.isTransitioning=!0,_transition2["default"].show(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!0,opts.didShow&&opts.didShow(opts.id)})},hide=function(ctrl,opts){return ctrl.isTransitioning=!0,_transition2["default"].hide(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!1,opts.didHide&&opts.didHide(opts.id),_mithril2["default"].redraw()})},unifySize=function(size){return MIN_SIZE>size?MIN_SIZE:size},widthClass=function(size){var sizeStr=size.toString().replace(".","-");return CSS_CLASSES.width_n+sizeStr},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],listenEl=document.body,activateDismissTap=function(){listenEl.addEventListener("click",handleDismissTap)},deActivateDismissTap=function(){listenEl.removeEventListener("click",handleDismissTap)},handleDismissTap=function(e){e.target!==ctrl.el&&(deActivateDismissTap(),e.defaultPrevented?hide(ctrl,opts):hide(ctrl,Object.assign({},opts,{hideDelay:0})))},tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.permanent?CSS_CLASSES.permanent:null,opts.target?CSS_CLASSES.target:"layout center-center",opts.size?widthClass(unifySize(opts.size)):null,opts["class"]].join(" "),id:opts.id||"",config:function(el,inited,context,vdom){if(!inited){opts.config&&opts.config(el,inited,context,vdom),ctrl.el=el;var update=function(){positionMenu(ctrl,opts),_mithril2["default"].redraw()},handleEscape=function(e){27===e.which&&hide(ctrl,Object.assign({},opts,{hideDelay:0}))};opts.permanent||(_events2["default"].subscribe("resize",update),_events2["default"].subscribe("keydown",handleEscape),setTimeout(function(){activateDismissTap(),show(ctrl,opts)},0)),context.onunload=function(){_events2["default"].unsubscribe("resize",update),_events2["default"].unsubscribe("keydown",handleEscape),opts.permanent||deActivateDismissTap()},positionMenu(ctrl,opts)}}},content=({ tag: "div", attrs: { "class": CSS_CLASSES.content, "config": function(el,inited){inited||(ctrl.contentEl=el)}, "onclick": function(e){e.preventDefault()} }, children: [ _mithril2["default"].component(_shadow2["default"],{z:ctrl.z,animated:!0}),opts.content?opts.content:null ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],z=void 0!==opts.z?opts.z:1;return{z:z,el:null,contentEl:null,isTransitioning:!1,visible:opts.permanent||!1}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return opts.show&&!ctrl.visible&&(ctrl.visible=!0),ctrl.visible?createView(ctrl,opts):({ tag: "span", attrs: { "class": CSS_CLASSES.placeholder }, children: [] })}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/events":16,"polythene/common/transition":22,"polythene/menu/theme/theme":53,"polythene/shadow/shadow":59}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-menu",{" .pe-menu__content":{"background-color":config["color_"+tint+"_background"]}})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);exports["default"]={sizes:[1,1.5,2,3,4,5,6,7],min_size:1.5,max_size_small_screen:5,size_factor:_config2["default"].grid_unit_menu,border_radius:_config2["default"].unit_block_border_radius,color_light_background:_config2["default"].rgba(_config2["default"].color_light_background),color_dark_background:_config2["default"].rgba(_config2["default"].color_dark_background)},module.exports=exports["default"];

},{"polythene/config/config":24}],52:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),unifySize=function(config,size){return size<config.min_size?config.min_size:size},widthClass=function(config,size){var sizeStr=size.toString().replace(".","-");return"pe-menu--width-"+sizeStr},widthStyle=function(config,size){var s=unifySize(config,size);return _defineProperty({},"&."+widthClass(config,s),{width:config.size_factor*s+"px","max-width":"100%"})},createStyles=function(config){return[{".pe-menu":[_mixin2["default"].vendorize({"transition-timing-function":"ease-out"},_config2["default"].prefixes_transition),_mixin2["default"].vendorize({"transition-property":"opacity"},_config2["default"].prefixes_transition),config.sizes.map(function(size){return widthStyle(config,size)}),_defineProperty({"z-index":_config2["default"].z_menu,opacity:0,position:"absolute",width:"100%","min-width":_config2["default"].grid_unit_menu*config.min_size+"px","&.pe-menu--width-auto":{width:"auto"},"&.pe-menu--visible":{opacity:1},"&.pe-menu--permanent":{position:"relative",opacity:1}," .pe-menu__content":{width:"100%","border-radius":config.border_radius+"px"}},"@media (max-width: "+_config2["default"].unit_screen_size_large+"px)",{"max-width":config.max_size_small_screen*_config2["default"].grid_unit_menu+"px"})]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24}],53:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/menu/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/menu/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/menu/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].menu,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-menu",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/menu/theme/color":50,"polythene/menu/theme/config":51,"polythene/menu/theme/layout":52}],54:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var isTouch="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;document.querySelector("html").classList.add(isTouch?"pe-touch":"pe-no-touch"),exports["default"]={isTouch:isTouch},module.exports=exports["default"];

},{}],55:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_polythene=require("polythene/polythene/polythene"),_polythene2=_interopRequireDefault(_polythene),_transitionEvent=require("polythene/common/transition-event"),_transitionEvent2=_interopRequireDefault(_transitionEvent);require("polythene/ripple/theme/theme");var transitionEvent=(0,_transitionEvent2["default"])(),DEFAULT_START_OPACITY=.2,OPACITY_DECAY_VELOCITY=.35,CSS_CLASSES={ripple:"pe-ripple",waves:"pe-ripple__waves",mask:"pe-ripple__mask",constrained:"pe-ripple--constrained",animated:"pe-ripple__waves--animated"},makeRipple=function(e,ctrl){var opts=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],el=ctrl.ripple(),wavesEl=ctrl.waves(),w=el.offsetWidth,h=el.offsetHeight,waveRadius=Math.sqrt(w*w+h*h),rect=el.getBoundingClientRect(),x=_polythene2["default"].isTouch&&e.touches?e.touches[0].pageX:e.clientX,y=_polythene2["default"].isTouch&&e.touches?e.touches[0].pageY:e.clientY,mx=opts.center?rect.left+rect.width/2:x,my=opts.center?rect.top+rect.height/2:y,rx=mx-rect.left-waveRadius/2,ry=my-rect.top-waveRadius/2,initialOpacity=void 0!==opts.initialOpacity?opts.initialOpacity:DEFAULT_START_OPACITY,opacityDecayVelocity=void 0!==opts.opacityDecayVelocity?opts.opacityDecayVelocity:OPACITY_DECAY_VELOCITY,duration=1/opacityDecayVelocity*initialOpacity,color=window.getComputedStyle(el).color,onEnd=function onEnd(evt){wavesEl.classList.remove(CSS_CLASSES.animated),wavesEl.removeEventListener(transitionEvent,onEnd,!1),opts.end&&opts.end(evt)};wavesEl.classList.remove(CSS_CLASSES.animated);var style=wavesEl.style;style.width=style.height=waveRadius+"px",style.top=ry+"px",style.left=rx+"px",style["animation-duration"]=style["-webkit-animation-duration"]=style["-moz-animation-duration"]=style["-o-animation-duration"]=duration+"s",style.backgroundColor=color,style.opacity=initialOpacity,wavesEl.addEventListener(transitionEvent,onEnd,!1),opts.start&&opts.start(e),wavesEl.classList.add(CSS_CLASSES.animated)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(opts.disabled)return({ tag: "div", attrs: {  }, children: [] });var initRipple=function(ripple,inited,context){if(!inited){ctrl.ripple(ripple);var parent=ripple.parentElement,onClick=function(e){makeRipple(e,ctrl,opts)},endType=_polythene2["default"].isTouch?"click":"mouseup";parent.addEventListener(endType,onClick,!1),context.onunload=function(){parent.removeEventListener(endType,onClick,!1)}}},initWaves=function(waves,inited){inited||ctrl.waves(waves)},tag=opts.tag||"div",props={"class":[CSS_CLASSES.ripple,opts.constrained!==!1?CSS_CLASSES.constrained:null,opts["class"]].join(" "),id:opts.id||"",config:initRipple},content=({ tag: "div", attrs: { "class": CSS_CLASSES.mask }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.waves, "config": initWaves }, children: [] }) ] });return(0,_mithril2["default"])(tag,props,content)},component={controller:function(){return{ripple:_mithril2["default"].prop(),waves:_mithril2["default"].prop(),delegate:_mithril2["default"].prop()}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/transition-event":21,"polythene/polythene/polythene":54,"polythene/ripple/theme/theme":58}],56:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={start_scale:.1,end_scale:2,start_opacity:.2,end_opacity:0},module.exports=exports["default"];

},{}],57:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),kfRipple=function(config){return{" 100%":{transform:"scale("+config.end_scale+")",opacity:config.end_opacity}}},createStyles=function(config){return[{".pe-ripple":[_mixin2["default"].fit(),{color:"inherit","border-radius":"inherit","&.pe-ripple--constrained":{"border-radius":"inherit"," .pe-ripple__mask":{overflow:"hidden","border-radius":"inherit"}}," .pe-ripple__mask":[_mixin2["default"].fit(),_mixin2["default"].vendorize({transform:"translate3d(0,0,0)"},_config2["default"].prefixes_transform)]," .pe-ripple__waves":[_mixin2["default"].vendorize({transform:"scale("+config.start_scale+")"},_config2["default"].prefixes_transform),_mixin2["default"].vendorize({animation:"ripple "+_config2["default"].animation_curve_default},_config2["default"].prefixes_animation),_mixin2["default"].vendorize({"animation-duration":_config2["default"].animation_duration},_config2["default"].prefixes_animation),{outline:"1px solid transparent",position:"absolute","border-radius":"50%",opacity:config.start_opacity,"pointer-events":"none",display:"none"}]," .pe-ripple__waves--animated":{display:"block"}}],"@keyframes ripple":kfRipple(config)}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24}],58:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/ripple/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/ripple/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].ripple,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-ripple",(0,_layout2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/ripple/theme/config":56,"polythene/ripple/theme/layout":57}],59:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/shadow/theme/theme");var CSS_CLASSES={block:"pe-shadow",topShadow:"pe-shadow__top",bottomShadow:"pe-shadow__bottom",animated:"pe-shadow--animated",depth_n:"pe-shadow--z-"},classForDepth=function(){var z=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return CSS_CLASSES.depth_n+Math.min(5,z)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],depthClass=classForDepth(opts.z),tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.animated?CSS_CLASSES.animated:"",opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=[opts.content?opts.content:null,({ tag: "div", attrs: { "class": [CSS_CLASSES.bottomShadow,depthClass].join(" ") }, children: [] }),({ tag: "div", attrs: { "class": [CSS_CLASSES.topShadow,depthClass].join(" ") }, children: [] })];return(0,_mithril2["default"])(tag,props,content)},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/shadow/theme/theme":62}],60:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={transition:"box-shadow 0.18s ease-out","shadow-top-z-1":"none","shadow-bottom-z-1":"0 1px 4px 0 rgba(0, 0, 0, 0.37)","shadow-top-z-2":"0 2px 2px 0 rgba(0, 0, 0, 0.2)","shadow-bottom-z-2":"0 6px 10px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-3":"0 11px 7px 0 rgba(0, 0, 0, 0.19)","shadow-bottom-z-3":"0 13px 25px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-4":"0 14px 12px 0 rgba(0, 0, 0, 0.17)","shadow-bottom-z-4":"0 20px 40px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-5":"0 17px 17px 0 rgba(0, 0, 0, 0.15)","shadow-bottom-z-5":"0 27px 55px 0 rgba(0, 0, 0, 0.3)","shadow-down-z-1":"inset 0px 1px 2px -1px rgba(0, 0, 0, 0.15)","shadow-down-z-2":"inset 0px 4px 6px -3px rgba(0, 0, 0, 0.25)"},module.exports=exports["default"];

},{}],61:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),shadowDirective=function(dir){return _mixin2["default"].vendorize({"box-shadow":dir},_config2["default"].prefixes_box_shadow)},createStyles=function(config){return[{".pe-shadow":[_mixin2["default"].fit(),{"border-radius":"inherit","pointer-events":"none"," .pe-shadow__bottom, .pe-shadow__top":[_mixin2["default"].fit(),{"border-radius":"inherit"}],"&.pe-shadow--animated":{" .pe-shadow__bottom, .pe-shadow__top":_mixin2["default"].vendorize({transition:config.transition},_config2["default"].prefixes_transition)}},[1,2,3,4,5].map(function(index){var _ref;return _ref={},_defineProperty(_ref," .pe-shadow__top.pe-shadow--z-"+index,shadowDirective(config["shadow-top-z-"+index])),_defineProperty(_ref," .pe-shadow__bottom.pe-shadow--z-"+index,shadowDirective(config["shadow-bottom-z-"+index])),_ref})]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24}],62:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/shadow/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/shadow/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].shadow,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-shadow",(0,_layout2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/shadow/theme/config":60,"polythene/shadow/theme/layout":61}],63:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/svg/theme/theme");var CSS_CLASSES={block:"pe-svg"},globalCache={},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],content=void 0,svg=void 0,tag=opts.tag||"div",props=Object.assign({},{"class":[CSS_CLASSES.block,opts["class"]].join(" "),id:opts.id||"",config:opts.config},opts.events?opts.events:null);if(opts.content)content=opts.content;else{var path=opts.src;ctrl.path()!==path?(svg=globalCache[path],svg?(content=_mithril2["default"].trust(svg),preloadNext(ctrl,opts)):(ctrl.path(path),loadSvg(path,ctrl,opts).then(_mithril2["default"].redraw))):(svg=ctrl.svg(),svg=svg||"",content=_mithril2["default"].trust(svg),preloadNext(ctrl,opts))}return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},loadSvg=function(path,ctrl,opts){var preloading=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];if(System&&System["import"]){var normalizedName=System.normalizeSync(path);return System["import"](normalizedName).then(function(data){preloading?(globalCache[path]=data,ctrl.preloadingIndex++,preloadNext(ctrl,opts)):ctrl.svg(data)})}console&&console.log("polythene/svg: System not found.")},preloadNext=function preloadNext(ctrl,opts){if(ctrl.preloadingItems&&!(ctrl.preloadingIndex>=ctrl.preloadingItems.length)){var next=ctrl.preloadingItems[ctrl.preloadingIndex];globalCache[next]?(ctrl.preloadingIndex++,preloadNext(ctrl,opts)):loadSvg(next,ctrl,opts,!0)}},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return{path:_mithril2["default"].prop(""),svg:_mithril2["default"].prop(""),preloadingItems:opts.preload,preloadingIndex:0}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/common/object.assign":19,"polythene/svg/theme/theme":64}],64:[function(require,module,exports){
"use strict";

},{}],65:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler);require("polythene/font-roboto/theme");var _typography=require("polythene/theme/typography"),_typography2=_interopRequireDefault(_typography),roboto=[{"html, body, input, textarea":{"font-family":"Roboto, Helvetica, Arial, sans-serif"}}],general=[{"*":[{"box-sizing":"border-box"},{"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},{"-webkit-tap-highlight-color":"transparent"}]," a, a:active, a:focus, input:active, input[type]:focus":{outline:0},"input:disabled":{opacity:1}}];_styler2["default"].add("pe-theme",roboto,_typography2["default"],general);

},{"polythene/common/styler":20,"polythene/font-roboto/theme":33,"polythene/theme/typography":66}],66:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),fontSize=14,styles=[{" h1, h2, h3, h4, h5, h6, p":{margin:0,padding:0}},{" h1 small, h2 small, h3 small, h4 small, h5 small, h6 small":{"font-weight":_config2["default"].font_weight_normal,"line-height":_config2["default"].line_height,"letter-spacing":"-0.02em","font-size":"0.6em"}},{" h1":{"font-size":"56px","font-weight":_config2["default"].font_weight_normal,"line-height":_config2["default"].line_height,"margin-top":"24px","margin-bottom":"24px"}},{" h2":{"font-size":"45px","font-weight":_config2["default"].font_weight_normal,"line-height":"48px","margin-top":"24px","margin-bottom":"24px"}},{" h3":{"font-size":"34px","font-weight":_config2["default"].font_weight_normal,"line-height":"40px","margin-top":"24px","margin-bottom":"24px"}},{" h4":{"font-size":"24px","font-weight":_config2["default"].font_weight_normal,"line-height":"32px","-moz-osx-font-smoothing":"grayscale","margin-top":"24px","margin-bottom":"16px"}},{" h5":{"font-size":"20px","font-weight":_config2["default"].font_weight_medium,"line-height":"1","letter-spacing":"-0.02em","margin-top":"24px","margin-bottom":"16px"}},{" h6":{"font-size":"16px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":"0.04em","margin-top":"24px","margin-bottom":"16px"}},{" html, body":{"font-size":fontSize+"px","line-height":"20px","font-weight":_config2["default"].font_weight_normal}," p":{"font-size":fontSize+"px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":"0","margin-bottom":"16px"}," blockquote":{position:"relative","font-size":"24px","font-weight":_config2["default"].font_weight_normal,"font-style":"italic","line-height":_config2["default"].line_height,"letter-spacing":"0.08em","margin-top":"24px","margin-bottom":"16px"}," ul, ol":{"font-size":fontSize+"px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":0},"b, strong":{"font-weight":_config2["default"].font_weight_medium}}];exports["default"]=styles,module.exports=exports["default"];

},{"polythene/config/config":24}],67:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-toolbar",{color:config["color_"+tint+"_text"]})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17}],68:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),margin_side=2*_config2["default"].grid_unit_component-12,height_desktop=8*_config2["default"].grid_unit_component,height_mobile_portrait=7*_config2["default"].grid_unit_component,height_mobile_landscape=6*_config2["default"].grid_unit_component;exports["default"]={margin_side:margin_side,indent:_config2["default"].unit_indent,transition_duration:_config2["default"].animation_duration,font_size:_config2["default"].font_size_title,line_height:_config2["default"].line_height,height_desktop:height_desktop,height_mobile_portrait:height_mobile_portrait,height_mobile_landscape:height_mobile_landscape,height_normal:height_desktop,height_medium_tall:2*height_desktop,height_tall:3*height_desktop,height_narrow:height_mobile_portrait,height_narrow_medium_tall:112,height_narrow_tall:168,color_light_text:_config2["default"].rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_dark_text:_config2["default"].rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary)},module.exports=exports["default"];

},{"polythene/config/config":24}],69:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),createStyles=function(config){return[{".pe-toolbar":[_mixin2["default"].vendorize({transform:"translate3d(0,0,0)"},_config2["default"].prefixes_transform),{display:"block",position:"relative",height:config.height_normal+"px","font-size":config.font_size+"px","line-height":config.line_height+"em","background-color":"#CFD8DC","&.pe-header--animated":_mixin2["default"].defaultTransition("height",config.transition_duration,"ease-in"),"&.pe-header--medium-tall":{height:config.height_medium_tall+"px"},"&.pe-header--tall":{height:config.height_tall+"px"},"&.pe-toolbar--narrow":{height:config.height_narrow+"px"," .pe-toolbar__bar":{height:config.height_narrow+"px",padding:0}},"&.pe-toolbar--narrow.pe-header--medium-tall":{height:config.height_narrow_medium_tall+"px"},"&.pe-toolbar--narrow.pe-header--tall":{height:config.height_narrow_tall+"px"},"&.pe-header--tall .pe-toolbar__bar--middle":_mixin2["default"].vendorize({transform:"translateY(100%)"},_config2["default"].prefixes_transform)," .pe-toolbar__bar":[_flex2["default"].layoutCenter,_flex2["default"].layoutHorizontal,{"> *:not(.disabled)":{"pointer-events":"auto"}},{"> :first-child":{"margin-left":config.margin_side+"px"}},{"> :last-child":{"margin-right":config.margin_side+"px"}},{" .pe-button--icon + span, .pe-button--icon + .pe-title":{"margin-left":config.indent-config.margin_side-_config2["default"].grid_unit_icon_button+"px"}},{"> span:first-child, .pe-toolbar__title--indent":[_mixin2["default"].ellipsis(),{"margin-left":config.indent+"px"}]},{"> span, > .pe-title":[_mixin2["default"].ellipsis(),_mixin2["default"].vendorize({"transform-origin":"left 50%"},_config2["default"].prefixes_transform),{display:"block","line-height":_config2["default"].line_height+"em"}]},{width:"100%",position:"relative",height:config.height_normal+"px","pointer-events":"none"," .pe-fit":[_mixin2["default"].fit(),{width:"auto",margin:0,".bottom":{top:"auto"}}]," .pe-header":_mixin2["default"].ellipsis(),"&.pe-toolbar__bar--middle":{position:"absolute",top:0,right:0,left:0},"&.pe-toolbar__bar--bottom":{position:"absolute",right:0,bottom:0,left:0}}]}]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":17,"polythene/config/config":24,"polythene/layout/theme/flex":38}],70:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/toolbar/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/toolbar/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/toolbar/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].toolbar,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-toolbar",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":20,"polythene/config/custom":25,"polythene/toolbar/theme/color":67,"polythene/toolbar/theme/config":68,"polythene/toolbar/theme/layout":69}],71:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/toolbar/theme/theme");var CSS_CLASSES={block:"pe-toolbar",bar:"pe-toolbar__bar",topBar:"pe-toolbar__bar--top",middleBar:"pe-toolbar__bar--middle",bottomBar:"pe-toolbar__bar--bottom",animated:"pe-header--animated",mediumTall:"pe-header--medium-tall",tall:"pe-header--tall"},barWrapper=function(className,content){return({ tag: "div", attrs: { "class": [CSS_CLASSES.bar,className].join(" ") }, children: [ content ] })},bar=function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],bars=[];return opts.content?bars.push(barWrapper(CSS_CLASSES.topBar,opts.content)):(opts.topBar&&bars.push(barWrapper(CSS_CLASSES.topBar,opts.topBar)),opts.middleBar&&bars.push(barWrapper(CSS_CLASSES.middleBar,opts.middleBar)),opts.bottomBar&&bars.push(barWrapper(CSS_CLASSES.bottomBar,opts.bottomBar))),bars},modeClasses={"medium-tall":CSS_CLASSES.mediumTall,tall:CSS_CLASSES.tall},classForMode=function(){var mode=arguments.length<=0||void 0===arguments[0]?"standard":arguments[0];return"standard"===mode?"":modeClasses[mode]},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,CSS_CLASSES.animated,classForMode(opts.mode),opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=bar(opts);return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":7,"polythene/toolbar/theme/theme":70}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2hlYWRlci5qcyIsImNvbXBvbmVudHMvbG9hZC5qcyIsImNvbXBvbmVudHMvbWl0aENob3Nlbi5qcyIsImNvbXBvbmVudHMvbWl0aERyb3BEb3duLmpzIiwibWFpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9qMmMvZGlzdC9qMmMuY29tbW9uanMuanMiLCIuLi9ub2RlX21vZHVsZXMvbWl0aHJpbC9taXRocmlsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9iYXNlLWJ1dHRvbi9iYXNlLWJ1dHRvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYmFzZS1idXR0b24vdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9iYXNlLWJ1dHRvbi90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL2J1dHRvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2NvbG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9taXhpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL211bHRpcGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL3N0eWxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL3RyYW5zaXRpb24tZXZlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vd2ViZm9udGxvYWRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2N1c3RvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2RlZmF1bHQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy9kaWFsb2ctaW5zdGFuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy9kaWFsb2cuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9mb250LXJvYm90by90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvaWNvbi9pY29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9pY29uL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvaWNvbi90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2ljb24vdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xheW91dC90aGVtZS9mbGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvbGlzdC10aWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC9saXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0L3RoZW1lL2NvbG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0L3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbWVudS90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbWVudS90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9tZW51L3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9wb2x5dGhlbmUvcG9seXRoZW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvcmlwcGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy9zaGFkb3cuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvc3ZnL3N2Zy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvc3ZnL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdGhlbWUvdHlwb2dyYXBoeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90b29sYmFyL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90b29sYmFyL3Rvb2xiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdsRUE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYnRuID1yZXF1aXJlKCAncG9seXRoZW5lL2J1dHRvbi9idXR0b24nKTtcbnZhciB0aGVtZT1yZXF1aXJlKCdwb2x5dGhlbmUvdGhlbWUvdGhlbWUnKTtcbnZhciB0b29sYmFyPSByZXF1aXJlKCAncG9seXRoZW5lL3Rvb2xiYXIvdG9vbGJhcicpO1xudmFyIG1lbnUgPXJlcXVpcmUoICdwb2x5dGhlbmUvbWVudS9tZW51Jyk7XG52YXIgbGlzdCA9cmVxdWlyZSgncG9seXRoZW5lL2xpc3QvbGlzdCcpO1xudmFyIGxpc3RUaWxlPXJlcXVpcmUoICdwb2x5dGhlbmUvbGlzdC10aWxlL2xpc3QtdGlsZScpO1xuXG52YXIgTWl0aERyb3BEb3duPXJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbWl0aERyb3BEb3duLmpzJyk7XG52YXIgZHJvcERvd249IG5ldyBNaXRoRHJvcERvd24oKTtcbnZhciBkaWFsb2c9cmVxdWlyZSggJ3BvbHl0aGVuZS9kaWFsb2cvZGlhbG9nJyk7XG52YXIgc2VydmVyPXJlcXVpcmUoJy4uL21haW4uanMnKTtcbmNvbnN0IGxvYWREaWFsb2cgPSB7fTtcbmxvYWREaWFsb2cudmlldyA9ICgpID0+IHtcbiAgICByZXR1cm4gbSgnZGl2JywgW1xuICAgICAgICBtLmNvbXBvbmVudChkaWFsb2cpXG4gICAgXSk7XG59O1xuY29uc3QgZm9vdGVyQnV0dG9ucyA9IFtcbiAgICBtLmNvbXBvbmVudChidG4sIHtcbiAgICAgICAgbGFiZWw6ICdPSycsXG5cdGV2ZW50czp7b25jbGljazpmdW5jdGlvbigpe1xuXHQgICAgc2VydmVyLk1haW5HbG9iYWwuc29ja2V0LmVtaXQoJ0NNRF9MT0FEJyx7cGF0aDpkcm9wRG93bi5zZWxlY3RlZC5uYW1lfSk7XG5cdCAgICBkaWFsb2cuaGlkZSgpO1xuXHR9XG5cdCAgICAgICB9XG4gICAgfSksXG4gICAgbS5jb21wb25lbnQoYnRuLCB7XG4gICAgICAgIGxhYmVsOiAnRGlzY2FyZCcsXG5cdGV2ZW50czp7b25jbGljazpmdW5jdGlvbigpe1xuXHQgICAgZGlhbG9nLmhpZGUoKTtcblx0fX1cbiAgICB9KVxuXTtcbnZhciBHbG9iYWw9e1xuICAgIHNob3c6e2xvYWREaWFsb2c6ZmFsc2V9XG59O1xuXG5leHBvcnRzLmhlYWRlciA9IHtcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcblx0dmFyIGVkaXQ9IG0uY29tcG9uZW50KGJ0biwge1xuXHRcdFx0ICBsYWJlbDogJ0VkaXQnLFxuXHRcdFx0ICBldmVudHM6IHtcblx0XHRcdCAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQgIFxuXHRcdFx0XHQgIG0ucm91dGUoJy9yZXBvcnQnKTtcblx0XHRcdCAgICAgIH1cblx0XHRcdCAgfVxuXHR9KTtcblx0XG5cdHZhciBzaW1wbGVDb250YWluZXIyPXt9O1xuXHR2YXIgc2ltcGxlQ29udGFpbmVyMz17fTtcblx0dmFyIGZpbGU9e3ZpZXcgOiBmdW5jdGlvbihjdHJsKXtcblx0ICAgIHJldHVybiBtKCcuY29udGFpbmVyJyxcblx0XHQgICAgIG0oJ2EnLCB7XG5cdFx0XHQgaHJlZjogJ2phdmFzY3JpcHQ6IHZvaWQoMCknLFxuXHRcdFx0IGlkOiAnc2ltcGxlX2J0bicsIC8vIHVzZSBhcyBtZW51J3MgdGFyZ2V0XG5cdFx0XHQgb25jbGljazogKCkgPT4gKGN0cmwub3BlbiA9IHRydWUpIC8vIG9wZW5zIGF0IG5leHQgcmVkcmF3XG5cdFx0ICAgICB9LCAnRmlsZScpLFxuXHRcdCAgICAgbS5jb21wb25lbnQobWVudSwge1xuXHRcdFx0IHRhcmdldDogJ3NpbXBsZV9idG4nLCAvLyB0byBhbGlnbiB3aXRoIHRoZSBsaW5rXG5cdFx0XHQgb2Zmc2V0OiAwLCAvLyBob3Jpem9udGFsbHkgYWxpZ24gd2l0aCBsaW5rXG5cdFx0XHQgc2hvdzogY3RybC5vcGVuLCAvLyBzaG91bGQgdGhlIG1lbnUgYmUgb3BlbiBvciBjbG9zZWQ/XG5cdFx0XHQgc2l6ZTonYXV0bycsXG5cdFx0XHQgZGlkSGlkZTogKCkgPT4gKGN0cmwub3BlbiA9IGZhbHNlKSwgLy8gY2FsbGVkIGFmdGVyIGNsb3Npbmdcblx0XHRcdCBjb250ZW50OiBtLmNvbXBvbmVudChsaXN0LCB7XG5cdFx0XHQgICAgIHRpbGVzOiBbXG5cdFx0XHRcdCBcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdOZXcnLFxuXHRcdFx0XHQgICAgIGluazogdHJ1ZVxuXHRcdFx0XHQgfSksXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnTG9hZCcsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlLFxuXHRcdFx0XHQgICAgIGV2ZW50czp7XG5cdFx0XHRcdFx0IG9uY2xpY2s6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgICAgIC8vIHNlcnZlci5NYWluR2xvYmFsLnNvY2tldC5lbWl0KCdDTURfR0VUX0RCUycse30pO1xuXHRcdFx0XHRcdCAgICAgLy8gc2VydmVyLk1haW5HbG9iYWwuc29ja2V0Lm9uKCdDTURfU0VUX0RCUycsZnVuY3Rpb24oZGJzKXtcblx0XHRcdFx0XHQgICAgIC8vIFx0IGNvbnNvbGUubG9nKGRicylcblx0XHRcdFx0XHQgICAgIC8vIFx0IGRyb3BEb3duLnVwZGF0ZShkYnMuZGJzQXJyYXkpO1xuXHRcdFx0XHRcdCAgICAgLy8gfSk7XG5cdFx0XHRcdFx0ICAgICBjb25zb2xlLmxvZygnYWpheCcpXG5cdFx0XHRcdFx0ICAgICBtLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0IG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0XHRcdFx0XHQgdXJsOiBcImh0dHA6Ly9kZXYudGVzdHR1YmU6ODAwMC9cIixcblx0XHRcdFx0XHRcdCBiYWNrZ3JvdW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0IGRhdGFUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0XHQgZGF0YTogSlNPTi5zdHJpbmdpZnkoe25hbWU6XCJGYXJ6YW5cIn0pXG5cdFx0XHRcdFx0ICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0XHQgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0IFxuXHRcdFx0XHRcdCAgICAgfSk7XG5cdFx0XHRcdFx0ICAgICBcblx0XHRcdFx0XHRcdGRpYWxvZy5zaG93KHtcblx0XHRcdFx0XHRcdCAgICB0aXRsZTogJ2Nob29zZSBhIERhdGFCYXNlIE5hbWUnLFxuXHRcdFx0XHRcdFx0ICAgIGJvZHk6IG0uY29tcG9uZW50KGRyb3BEb3duKSxcblx0XHRcdFx0XHRcdCAgICBmb290ZXI6Zm9vdGVyQnV0dG9uc1xuXHRcdFx0XHRcdFx0ICAgIFxuXHRcdFx0XHRcdFx0ICAgIFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0IH1cblx0XHRcdFx0XHQgXG5cdFx0XHRcdCAgICAgfVxuXHRcdFx0XHQgfSksXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnU2F2ZScsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KVxuXHRcdFx0ICAgICBdXG5cdFx0XHQgfSlcblx0XHQgICAgIH0pXG5cdFx0ICAgICk7XG5cdH19O1xuXHRcblx0c2ltcGxlQ29udGFpbmVyMi52aWV3ID0gKGN0cmwpID0+IHtcblx0ICAgIHJldHVybiBtKCcuY29udGFpbmVyJyxcblx0XHQgICAgIG0oJ2EnLCB7XG5cdFx0XHQgaHJlZjogJ2phdmFzY3JpcHQ6IHZvaWQoMCknLFxuXHRcdFx0IGlkOiAnc2ltcGxlX2J0bjInLCAvLyB1c2UgYXMgbWVudSdzIHRhcmdldFxuXHRcdFx0IG9uY2xpY2s6ICgpID0+IChjdHJsLm9wZW4gPSB0cnVlKSAvLyBvcGVucyBhdCBuZXh0IHJlZHJhd1xuXHRcdCAgICAgfSwgJ0VkaXQnKSxcblx0XHQgICAgIG0uY29tcG9uZW50KG1lbnUsIHtcblx0XHRcdCB0YXJnZXQ6ICdzaW1wbGVfYnRuMicsIC8vIHRvIGFsaWduIHdpdGggdGhlIGxpbmtcblx0XHRcdCBvZmZzZXQ6IDAsIC8vIGhvcml6b250YWxseSBhbGlnbiB3aXRoIGxpbmtcblx0XHRcdCBzaG93OiBjdHJsLm9wZW4sIC8vIHNob3VsZCB0aGUgbWVudSBiZSBvcGVuIG9yIGNsb3NlZD9cblx0XHRcdCBzaXplOidhdXRvJyxcblx0XHRcdCBkaWRIaWRlOiAoKSA9PiAoY3RybC5vcGVuID0gZmFsc2UpLCAvLyBjYWxsZWQgYWZ0ZXIgY2xvc2luZ1xuXHRcdFx0IGNvbnRlbnQ6IG0uY29tcG9uZW50KGxpc3QsIHtcblx0XHRcdCAgICAgdGlsZXM6IFtcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdZZXMnLFxuXHRcdFx0XHQgICAgIGluazogdHJ1ZVxuXHRcdFx0XHQgfSksXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnTm8nLFxuXHRcdFx0XHQgICAgIGluazogdHJ1ZVxuXHRcdFx0XHQgfSlcblx0XHRcdCAgICAgXVxuXHRcdFx0IH0pXG5cdFx0ICAgICB9KVxuXHRcdCAgICApO1xuXHR9O1xuXHRcblx0c2ltcGxlQ29udGFpbmVyMy52aWV3ID0gKGN0cmwpID0+IHtcblx0ICAgIHJldHVybiBtKCcuY29udGFpbmVyJyxcblx0XHQgICAgIG0oJ2EnLCB7XG5cdFx0XHQgaHJlZjogJ2phdmFzY3JpcHQ6IHZvaWQoMCknLFxuXHRcdFx0IGlkOiAnc2ltcGxlX2J0bjMnLCAvLyB1c2UgYXMgbWVudSdzIHRhcmdldFxuXHRcdFx0IG9uY2xpY2s6ICgpID0+IChjdHJsLm9wZW4gPSB0cnVlKSAvLyBvcGVucyBhdCBuZXh0IHJlZHJhd1xuXHRcdCAgICAgfSwgJ0hlbHAnKSxcblx0XHQgICAgIG0uY29tcG9uZW50KG1lbnUsIHtcblx0XHRcdCB0YXJnZXQ6ICdzaW1wbGVfYnRuMycsIC8vIHRvIGFsaWduIHdpdGggdGhlIGxpbmtcblx0XHRcdCBvZmZzZXQ6IDAsIC8vIGhvcml6b250YWxseSBhbGlnbiB3aXRoIGxpbmtcblx0XHRcdCBzaG93OiBjdHJsLm9wZW4sIC8vIHNob3VsZCB0aGUgbWVudSBiZSBvcGVuIG9yIGNsb3NlZD9cblx0XHRcdCBzaXplOidhdXRvJyxcblx0XHRcdCBcblx0XHRcdCBkaWRIaWRlOiAoKSA9PiAoY3RybC5vcGVuID0gZmFsc2UpLCAvLyBjYWxsZWQgYWZ0ZXIgY2xvc2luZ1xuXHRcdFx0IGNvbnRlbnQ6IG0uY29tcG9uZW50KGxpc3QsIHtcblx0XHRcdCAgICAgdGlsZXM6IFtcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdZZXMnLFxuXHRcdFx0XHQgICAgIGluazogdHJ1ZSxcblx0XHRcdFx0ICAgICBldmVudHM6e29uY2xpY2s6ZnVuY3Rpb24oKXtcblx0XHRcdFx0XHQgc2VydmVyLkdsb2JhbC5zb2NrZXQuZW1pdCgnZGF0YScse2RhdGE6J1dvVyd9KTtcblx0XHRcdFx0ICAgICB9fVxuXHRcdFx0XHQgfSksXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnTm8nLFxuXHRcdFx0XHQgICAgIGluazogdHJ1ZVxuXHRcdFx0XHQgfSlcblx0XHRcdCAgICAgXVxuXHRcdFx0IH0pXG5cdFx0ICAgICB9KVxuXHRcdCAgICApO1xuXHR9O1xuXHRcblx0dGhpcy5teVRvb2xiYXIgPSBtLmNvbXBvbmVudCh0b29sYmFyLCB7XG5cdCAgICBcblx0ICAgIGNvbnRlbnQ6W20uY29tcG9uZW50KGZpbGUpLFxuXHRcdCAgICAgbS5jb21wb25lbnQoc2ltcGxlQ29udGFpbmVyMiksXG5cdFx0ICAgICBtLmNvbXBvbmVudChzaW1wbGVDb250YWluZXIzKV1cblx0XHQgICAgIFxuXHRcdFx0XHQgXG5cdH0pXG5cbiAgICB9LFxuICAgIHZpZXc6IGZ1bmN0aW9uKGN0cmwpIHtcblxuICAgICAgICByZXR1cm4gbSgnLmhlYWRlcicsXG5cdFx0IG0uY29tcG9uZW50KGN0cmwubXlUb29sYmFyKSxcblx0XHQgbS5jb21wb25lbnQobG9hZERpYWxvZylcblx0XHQgLy8gbS5jb21wb25lbnQoY3RybC5idWlsZEJ0biksXG5cdFx0IC8vIG0uY29tcG9uZW50KGN0cmwucmVwb3J0QnRuKVxuXHRcdCk7XG4gICAgfVxufTtcbiIsInZhciBidXR0b24gPXJlcXVpcmUoICdwb2x5dGhlbmUvYnV0dG9uL2J1dHRvbicpO1xudmFyIGRpYWxvZyA9cmVxdWlyZSgncG9seXRoZW5lL2RpYWxvZy9kaWFsb2cnKTtcblxuXG5cbnZhciBsb2FkPXt2aWV3IDpmdW5jdGlvbiAoKSAge1xuICAgIHJldHVybiBtKCdkaXYnLCBbXG4gICAgICAgIG0uY29tcG9uZW50KGJ1dHRvbiwge1xuICAgICAgICAgICAgbGFiZWw6ICdMb2FkJyxcbiAgICAgICAgICAgIHJhaXNlZDogdHJ1ZSxcblx0ICAgIFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25jbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0xvYWQgYSBEQicsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiAnc29tZSB0ZXh0J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBtLmNvbXBvbmVudChkaWFsb2cpXG4gICAgXSk7XG59XG5cdCB9O1xuXG5leHBvcnRzLm1haW49e1xuICAgIHZpZXc6ZnVuY3Rpb24oKXtcblx0cmV0dXJuIG0oJycpO1xuICAgIH1cbn07XG5cbiIsImV4cG9ydHMuTWl0aENob3Nlbj1mdW5jdGlvbiBtaXRoQ2hvc2VuKGNvbmZpZykge1xuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge1xuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgaXRlbXNQZXJQYWdlOiA5OTksXG4gICAgICAgIHNvcnRCeU5hbWU6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLnVzZXJJbnB1dCA9IG0ucHJvcCgnJyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xuICAgIHRoaXMuc2hvd1Jlc3VsdHM9ZmFsc2U7XG5cbiAgICB0aGlzLnVwZGF0ZUxpc3QgPSBmdW5jdGlvbihmb3VuZEl0ZW1zKSB7XG5cblx0dGhpcy5saXN0ID0gZm91bmRJdGVtcztcblx0dmFyIHBlclBhZ2UgPSB0aGlzLmNvbmZpZy5pdGVtc1BlclBhZ2U7XG5cdHZhciBzb3J0ID0gdGhpcy5jb25maWcuc29ydEJ5TmFtZTtcblx0XG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24obmV3TGlzdCkge1xuXHRtLnN0YXJ0Q29tcHV0YXRpb24oKTtcblx0dGhpcy5saXN0ID0gbmV3TGlzdDtcblx0dGhpcy5jb25maWcubGlzdCA9IG5ld0xpc3Q7XG5cdHZhciBwZXJQYWdlID0gdGhpcy5jb25maWcuaXRlbXNQZXJQYWdlO1xuXHR2YXIgc29ydCA9IHRoaXMuY29uZmlnLnNvcnRCeU5hbWU7XG5cdG0uZW5kQ29tcHV0YXRpb24oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5maW5kID0gZnVuY3Rpb24oKSB7XG5cblx0dmFyIHNlbGYgPSB0aGlzO1xuXHR2YXIgZm91bmRJdGVtcyA9IFtdO1xuXHR0aGlzLmNvbmZpZy5saXN0Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgbG93ZXJJdGVtID0gaXRlbS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAobG93ZXJJdGVtLmluZGV4T2Yoc2VsZi51c2VySW5wdXQoKSkgPiAtMSkge1xuXHRcdGZvdW5kSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cblx0fSk7XG5cblxuXHR0aGlzLnVwZGF0ZUxpc3QoZm91bmRJdGVtcyk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0U2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG5cbiAgICB9O1xuXG4gICAgdGhpcy52aWV3ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblx0cmV0dXJuIG0oJy5taXRoQ2hvc2VuJyxcblx0XHQgbSgnaW5wdXQnLCB7XG5cdFx0ICAgICBzdHlsZTp7XG5cdFx0XHQgd2lkdGg6IHNlbGYuY29uZmlnLnN0eWxlcy53aWR0aFxuXHRcdCAgICAgfSxcblx0XHQgICAgIGNvbmZpZzpmdW5jdGlvbihlLGlzaW5pdCl7XG5cdFx0XHQgaWYoaXNpbml0KVxuXHRcdFx0ICAgICByZXR1cm47XG5cdFx0XHQgc2VsZi5pbnB1dEVsZW1lbnQ9ZTtcblx0XHQgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICBvbmlucHV0OiBtLndpdGhBdHRyKCd2YWx1ZScsIHRoaXMudXNlcklucHV0KSxcbiAgICAgICAgICAgICAgICAgICAgIG9ua2V5dXA6IHRoaXMuZmluZCgpLFxuXHRcdCAgICAgb25mb2N1czpmdW5jdGlvbigpe1xuXHRcdFx0IFxuXHRcdFx0IHNlbGYuc2hvd1Jlc3VsdHM9dHJ1ZTtcblx0XHQgICAgIH0sXG5cdFx0ICAgICBvbmJsdXI6ZnVuY3Rpb24oKXtcblx0XHRcdCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQgICAgIG0uc3RhcnRDb21wdXRhdGlvbigpO1xuXHRcdFx0ICAgICBzZWxmLnNob3dSZXN1bHRzPWZhbHNlO1xuXHRcdFx0ICAgICBtLmVuZENvbXB1dGF0aW9uKCk7XG5cdFx0XHQgfSwxNTApO1xuXHRcdCAgICAgfVxuXHRcdCAgICAgXG5cdFx0IH0sXG5cdFx0ICAgdGhpcy51c2VySW5wdXQoKSksXG5cdFx0IHRoaXMuc2hvd1Jlc3VsdHM/bSgnLm1pdGhDaG9zZW5SZXN1bHRzJyxcblx0XHQgICBtKCdvbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcblx0XHRcdCAgIHdpZHRoOiBzZWxmLmNvbmZpZy5zdHlsZXMud2lkdGgsXG5cdFx0XHQgICBtYXhIZWlnaHQ6JzI1MHB4Jyxcblx0XHRcdCAgIG92ZXJmbG93WTonYXV0bycsXG5cdFx0XHQgICBiYWNrZ3JvdW5kOid3aGl0ZScsXG5cdFx0XHQgICBwb3NpdGlvbjonYWJzb2x1dGUnLFxuXHRcdFx0ICAgekluZGV4Oic5OSdcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgIH0sXG5cdFx0ICAgICB0aGlzLmxpc3QubWFwKFxuXHRcdFx0IGZ1bmN0aW9uKGxpc3RJdGVtLCBpKSB7XG5cdFx0XHQgICAgIGlmIChpID49IHNlbGYuY29uZmlnLml0ZW1zUGVyUGFnZSlcblx0XHRcdFx0IHJldHVybjtcblx0XHRcdCAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtKCdsaScsIHtcblx0XHRcdFx0ICAgb25jbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZCA9IGUudGFyZ2V0LmlubmVyVGV4dDtcblx0XHRcdFx0ICAgICAgIHNlbGYuaW5wdXRFbGVtZW50LnZhbHVlID0gc2VsZi5zZWxlY3RlZDtcblx0XHRcdFx0ICAgICAgIGNvbnNvbGUubG9nKCdhYWEnLHNlbGYuaW5wdXRFbGVtZW50KTtcblx0XHRcdFx0ICAgICAgIFxuXHRcdFx0XHQgICAgICAgXG5cdFx0XHRcdCAgIH0sXG5cdFx0XHRcdCAgIG9ubW91c2VvdmVyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9IHNlbGYuY29uZmlnLnN0eWxlcy5zZWxlY3RlZEJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yZWdyb3VuZCA9IHNlbGYuY29uZmlnLnN0eWxlcy5zZWxlY3RlZEZvcmVncm91bmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuY29sb3IgPSBmb3JlZ3JvdW5kO1xuXG5cdFx0XHRcdCAgIH0sXG5cdFx0XHRcdCAgIG9ubW91c2VvdXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gc2VsZi5jb25maWcuc3R5bGVzLmJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yZWdyb3VuZCA9IHNlbGYuY29uZmlnLnN0eWxlcy5mb3JlZ3JvdW5kO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmNvbG9yID0gZm9yZWdyb3VuZDtcblx0XHRcdFx0ICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGxpc3RJdGVtKTtcblx0XHRcdCB9KSlcblx0XHRcdCAgICAgICk6bnVsbCk7XG5cdFx0fTtcblxuICAgIFxufVxuXG5cblxuXG4iLCJ2YXIgTXl0aERyb3BEb3duPWZ1bmN0aW9uKGxpc3QpICB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShsaXN0KSlcblx0dGhpcy5saXN0PWxpc3Q7XG4gICAgZWxzZVxuXHRsaXN0PVtdO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNeXRoRHJvcERvd24pKSBcblx0cmV0dXJuIG5ldyBNeXRoRHJvcERvd24obGlzdCk7XG4gICAgXG4gICAgdmFyIHNlbGY9dGhpcztcbiAgICB0aGlzLnNlbGVjdEVsZW1lbnQ9e3NlbGVjdGVkSW5kZXg6MH07XG4gICAgdGhpcy5zZWxlY3RlZD17XG5cdG5hbWU6bGlzdFswXSxcblx0aW5kZXg6MH07XG4gICAgdGhpcy5saXN0PWxpc3Q7XG5cbiAgICBNeXRoRHJvcERvd24ucHJvdG90eXBlLnZpZXc9IGZ1bmN0aW9uKGN0cmwpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbSgnc2VsZWN0Jywge1xuICAgICAgICAgICAgY29uZmlnOiBmdW5jdGlvbihzZWxlY3RFbGVtZW50LCBpc2luaXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNpbml0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cdFx0c2VsZi5zZWxlY3RFbGVtZW50ID0gc2VsZWN0RWxlbWVudDtcblx0XHRzZWxmLnVwZGF0ZShzZWxmLmxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uY2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZC5uYW1lID0gZS50YXJnZXQudmFsdWU7XG5cdFx0c2VsZi5zZWxlY3RlZC5pbmRleD1lLnRhcmdldC5zZWxlY3RlZEluZGV4O1xuXHRcdFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cdFx0IHRoaXMubGlzdC5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oJ29wdGlvbicsIG5hbWUpO1xuXHRcdCB9KSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0U2VsZWN0ZWQ9ZnVuY3Rpb24oKXtcblx0cmV0dXJuICh0aGlzLnNlbGVjdGVkKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGU9ZnVuY3Rpb24obmV3TGlzdCl7XG5cdFxuXHR0aGlzLmxpc3Q9bmV3TGlzdDtcblx0dGhpcy5zZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXg9MDtcblx0dGhpcy5zZWxlY3RlZC5uYW1lPW5ld0xpc3RbMF07XG5cdHRoaXMuc2VsZWN0ZWQuaW5kZXg9MDtcbiAgICB9O1xuXG4gICAgdGhpcy5zb3J0PWZ1bmN0aW9uKCl7XG5cdHRoaXMubGlzdC5zb3J0KCk7XG5cdHRoaXMudXBkYXRlKHRoaXMubGlzdCk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlPWZ1bmN0aW9uKCl7XG5cdHRoaXMubGlzdC5zcGxpY2UodGhpcy5zZWxlY3RlZC5pbmRleCwxKTtcblx0dGhpcy51cGRhdGUodGhpcy5saXN0KTtcblx0XG4gICAgfTtcblxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE15dGhEcm9wRG93bjtcbiIsInZhciBzb2NrZXQ7XG52YXIgZmlyc3Rjb25uZWN0ID0gdHJ1ZTtcbnZhciBHbG9iYWw9e3NlcnZlcjonJ307XG5mdW5jdGlvbiBjb25uZWN0KCkge1xuICAgIGlmKGZpcnN0Y29ubmVjdCkge1xuICAgICAgICBHbG9iYWwuc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2Rldi50ZXN0dHViZTo4MDAwJyk7XG4gICAgICAgIEdsb2JhbC5zb2NrZXQub24oJ3NlcnZlck1lc3NhZ2UnLCBmdW5jdGlvbihkYXRhKXsgbWVzc2FnZShkYXRhKTsgfSk7XG4gICAgICAgIEdsb2JhbC5zb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpeyBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBTZXJ2ZXJcIik7IH0pO1xuXG4gICAgICAgIGZpcnN0Y29ubmVjdCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgR2xvYmFsLnNvY2tldC5zb2NrZXQucmVjb25uZWN0KCk7XG4gICAgfVxufVxudmFyIE1pdGhEcm9wRG93bj1yZXF1aXJlKCcuL2NvbXBvbmVudHMvbWl0aERyb3BEb3duLmpzJyk7XG52YXIgZHJvcERvd24yPSBuZXcgTWl0aERyb3BEb3duKCk7XG5cbmRyb3BEb3duMi51cGRhdGUoWydhcHBsZScsJ2JhbmFuYScsJ29yYW5nZSddKTtcblxudmFyIGNob3NlbkNmZyA9IHtcbiAgICBsaXN0OiBbJ2Jyb3duJywnYXBwbGUnLCdyZWQnXSxcbiAgICBpdGVtc1BlclBhZ2U6IDEwMCxcbiAgICBzb3J0QnlOYW1lOiB0cnVlLFxuICAgIHN0eWxlczoge1xuXHR3aWR0aDogXCI1MDBweFwiLFxuICAgICAgICBzZWxlY3RlZEJhY2tncm91bmQ6ICdibGFjaycsXG4gICAgICAgIHNlbGVjdGVkRm9yZWdyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgZm9yZWdyb3VuZDogJ2JsYWNrJ1xuICAgIH1cbn07XG5cbnZhciBNaXRoQ2hvc2VuPXJlcXVpcmUoJy4vY29tcG9uZW50cy9taXRoQ2hvc2VuLmpzJykuTWl0aENob3NlbjtcblxudmFyIGNob3Nlbj1uZXcgTWl0aENob3NlbihjaG9zZW5DZmcpO1xuXG5jb25uZWN0KCk7XG5cbkdsb2JhbC5zb2NrZXQub24oJ3RpbWUnLGZ1bmN0aW9uKHRpbWUpe1xuICAgIGNvbnNvbGUubG9nKHRpbWUpO1xuICAgIEdsb2JhbC5zb2NrZXQuZW1pdCgnZGF0YScse2RhdGE6J3JlY2lldmVkJ30pO1xuICAgIFxufSk7XG5HbG9iYWwuc29ja2V0Lm9uKCdtZXNzYWdlVG9DbGllbnQnLGZ1bmN0aW9uKGRhdGEpe1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHN3aXRjaChkYXRhLnR5cGUpe1xuICAgIGNhc2UgJ3VwZGF0ZUxvYWQnOlxuXHR2YXIgYXJyYXk9W107XG5cdGRhdGEuZGF0YS5tYXAoZnVuY3Rpb24oZCl7XG5cdFx0XHRcdCAgYXJyYXkucHVzaChkLmNvbnRlbnRbMF0uZGVzY3JpcHRpb24pXG5cdFx0XHRcdCAgXG5cdH0pO1xuXHRjb25zb2xlLmxvZyhkYXRhLmRhdGEpXG5cdGNob3Nlbi51cGRhdGUoYXJyYXkpO1xuXHRicmVhaztcbiAgICB9XG5cbn0pO1xuXG52YXIgaGVhZGVyPXJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKS5oZWFkZXI7XG52YXIgbG9hZD1yZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZC5qcycpLm1haW47XG5cbnZhciBtYWluPXtcbiAgICB2aWV3OmZ1bmN0aW9uKCl7XG5cdHJldHVybiBbXG5cdCAgICBtLmNvbXBvbmVudChsb2FkKSxcblx0ICAgIG0uY29tcG9uZW50KGhlYWRlciksXG5cdCAgICBtLmNvbXBvbmVudChjaG9zZW4pLFxuXHQgICAgbSgnJywnc29tZSBjb250ZW50Jylcblx0ICAgICAgIF07XG4gICAgfVxuICAgIFxufTtcblxuXG5cbm0ucm91dGUubW9kZSA9ICdwYXRobmFtZSc7XG5cbm0ucm91dGUoZG9jdW1lbnQuYm9keSwgJy8nLCB7XG4gICAgJy8nOiBtYWluXG59KTtcbmV4cG9ydHMuTWFpbkdsb2JhbD1HbG9iYWw7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG52YXIgZW1wdHlBcnJheSA9IFtdO1xudmFyIHR5cGUgPSBlbXB0eU9iamVjdC50b1N0cmluZztcbnZhciBvd24gPSAgZW1wdHlPYmplY3QuaGFzT3duUHJvcGVydHk7XG52YXIgT0JKRUNUID0gdHlwZS5jYWxsKGVtcHR5T2JqZWN0KTtcbnZhciBBUlJBWSA9ICB0eXBlLmNhbGwoZW1wdHlBcnJheSk7XG52YXIgU1RSSU5HID0gdHlwZS5jYWxsKCcnKTtcbi8qLy1pbmxpbmUtLyovXG4vLyBmdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYiwgcmVzLCBpLCBqKSB7XG4vLyAgIHJlcyA9IFtdO1xuLy8gICBmb3IgKGogaW4gYikgaWYgKG93bi5jYWxsKGIsIGopKVxuLy8gICAgIGZvciAoaSBpbiBhKSBpZiAob3duLmNhbGwoYSwgaSkpXG4vLyAgICAgICByZXMucHVzaChhW2ldICsgYltqXSk7XG4vLyAgIHJldHVybiByZXM7XG4vLyB9XG4vKi8taW5saW5lLS8qL1xuXG4vKiAvLXN0YXRlbWVudHMtLyovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSxiLCBzZWxlY3RvclAsIHJlcywgaSwgaikge1xuICByZXMgPSBbXVxuICBmb3IgKGogaW4gYikgaWYob3duLmNhbGwoYiwgaikpXG4gICAgZm9yIChpIGluIGEpIGlmKG93bi5jYWxsKGEsIGkpKVxuICAgICAgcmVzLnB1c2goY29uY2F0KGFbaV0sIGJbal0sIHNlbGVjdG9yUCkpXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gY29uY2F0KGEsIGIsIHNlbGVjdG9yUCkge1xuICAvLyBgYi5yZXBsYWNlKC8mL2csIGEpYCBpcyBuZXZlciBmYWxzeSwgc2luY2UgdGhlXG4gIC8vICdhJyBvZiBjYXJ0ZXNpYW4gY2FuJ3QgYmUgdGhlIGVtcHR5IHN0cmluZ1xuICAvLyBpbiBzZWxlY3RvciBtb2RlLlxuICByZXR1cm4gc2VsZWN0b3JQICYmIChcbiAgICAvXlstXFx3JF0rJC8udGVzdChiKSAmJiAnOi1lcnJvci1iYWQtc3ViLXNlbGVjdG9yLScgKyBiIHx8XG4gICAgLyYvLnRlc3QoYikgJiYgLyogbmV2ZXIgZmFsc3kgKi8gYi5yZXBsYWNlKC8mL2csIGEpXG4gICkgfHwgYSArIGJcbn1cblxuZnVuY3Rpb24gZGVjYW1lbGl6ZShtYXRjaCkge1xuICByZXR1cm4gJy0nICsgbWF0Y2gudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIEhhbmRsZXMgdGhlIHByb3BlcnR5OnZhbHVlOyBwYWlycy5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fG9iamVjdHxzdHJpbmd9IG8gLSB0aGUgZGVjbGFyYXRpb25zLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYnVmIC0gdGhlIGJ1ZmZlciBpbiB3aGljaCB0aGUgZmluYWwgc3R5bGUgc2hlZXQgaXMgYnVpbHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gdGhlIGN1cnJlbnQgcHJvcGVydHkgb3IgYSBwcmVmaXggaW4gY2FzZSBvZiBuZXN0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBzdWItcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZW5kb3JzIC0gYSBsaXN0IG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqIEBQYXJhbSB7Ym9vbGVhbn0gbG9jYWwgLSBhcmUgd2UgaW4gQGxvY2FsIG9yIGluIEBnbG9iYWwgc2NvcGUuXG4gKiBAcGFyYW0ge29iamVjdH0gbnMgLSBoZWxwZXIgZnVuY3Rpb25zIHRvIHBvcHVsYXRlIG9yIGNyZWF0ZSB0aGUgQGxvY2FsIG5hbWVzcGFjZVxuICogICAgICAgICAgICAgICAgICAgICAgYW5kIHRvIEBleHRlbmQgY2xhc3Nlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmUgLSBAZXh0ZW5kIGhlbHBlci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmwgLSBAbG9jYWwgaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIGRlY2xhcmF0aW9ucyhvLCBidWYsIHByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zLCAvKnZhciovIGssIHYsIGtrKSB7XG4gIGlmIChvPT1udWxsKSByZXR1cm5cbiAgaWYgKC9cXCQvLnRlc3QocHJlZml4KSkge1xuICAgIGZvciAoa2sgaW4gKHByZWZpeCA9IHByZWZpeC5zcGxpdCgnJCcpKSkgaWYgKG93bi5jYWxsKHByZWZpeCwga2spKSB7XG4gICAgICBkZWNsYXJhdGlvbnMobywgYnVmLCBwcmVmaXhba2tdLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgfVxuICAgIHJldHVyblxuICB9XG4gIHN3aXRjaCAoIHR5cGUuY2FsbChvID0gby52YWx1ZU9mKCkpICkge1xuICBjYXNlIEFSUkFZOlxuICAgIGZvciAoayA9IDA7IGsgPCBvLmxlbmd0aDsgaysrKVxuICAgICAgZGVjbGFyYXRpb25zKG9ba10sIGJ1ZiwgcHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgYnJlYWtcbiAgY2FzZSBPQkpFQ1Q6XG4gICAgLy8gcHJlZml4IGlzIGZhbHN5IGlpZiBpdCBpcyB0aGUgZW1wdHkgc3RyaW5nLCB3aGljaCBtZWFucyB3ZSdyZSBhdCB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSBkZWNsYXJhdGlvbnMgbGlzdC5cbiAgICBwcmVmaXggPSAocHJlZml4ICYmIHByZWZpeCArICctJylcbiAgICBmb3IgKGsgaW4gbykgaWYgKG93bi5jYWxsKG8sIGspKXtcbiAgICAgIHYgPSBvW2tdXG4gICAgICBpZiAoL1xcJC8udGVzdChrKSkge1xuICAgICAgICBmb3IgKGtrIGluIChrID0gay5zcGxpdCgnJCcpKSkgaWYgKG93bi5jYWxsKGssIGtrKSlcbiAgICAgICAgICBkZWNsYXJhdGlvbnModiwgYnVmLCBwcmVmaXggKyBrW2trXSwgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjbGFyYXRpb25zKHYsIGJ1ZiwgcHJlZml4ICsgaywgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgICAgfVxuICAgIH1cbiAgICBicmVha1xuICBkZWZhdWx0OlxuICAgIC8vIHByZWZpeCBpcyBmYWxzeSB3aGVuIGl0IGlzIFwiXCIsIHdoaWNoIG1lYW5zIHRoYXQgd2UncmVcbiAgICAvLyBhdCB0aGUgdG9wIGxldmVsLlxuICAgIC8vIGBvYCBpcyB0aGVuIHRyZWF0ZWQgYXMgYSBgcHJvcGVydHk6dmFsdWVgIHBhaXIuXG4gICAgLy8gb3RoZXJ3aXNlLCBgcHJlZml4YCBpcyB0aGUgcHJvcGVydHkgbmFtZSwgYW5kXG4gICAgLy8gYG9gIGlzIHRoZSB2YWx1ZS5cbiAgICBrID0gcHJlZml4LnJlcGxhY2UoL18vZywgJy0nKS5yZXBsYWNlKC9bQS1aXS9nLCBkZWNhbWVsaXplKVxuXG4gICAgaWYgKGxvY2FsICYmIChrID09ICdhbmltYXRpb24tbmFtZScgfHwgayA9PSAnYW5pbWF0aW9uJykpIHtcbiAgICAgIG8gPSBvLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLnJlcGxhY2UoLygpKD86Omdsb2JhbFxcKFxccyooWy1cXHddKylcXHMqXFwpfCgpKFstXFx3XSspKS8sIG5zLmwpXG4gICAgICB9KS5qb2luKCcsJylcbiAgICB9XG4gICAgaWYgKC9eYW5pbWF0aW9ufF50cmFuc2l0aW9uLy50ZXN0KGspKSB2ZW5kb3JzID0gWyd3ZWJraXQnXVxuICAgIC8vICdAJyBpbiBwcm9wZXJ0aWVzIGFsc28gdHJpZ2dlcnMgdGhlICppZWx0ZTcgaGFja1xuICAgIC8vIFNpbmNlIHBsdWdpbnMgZGlzcGF0Y2ggb24gdGhlIC9eQC8gZm9yIGF0LXJ1bGVzXG4gICAgLy8gd2Ugc3dhcCB0aGUgYXQgZm9yIGFuIGFzdGVyaXNrXG4gICAgLy8gaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stNmQ0OWU5MjYzNGYyNmFlNmQ2ZTQ2YjNlYmMxMDAxOWFcblxuICAgIGsgPSBrLnJlcGxhY2UoL15ALywgJyonKVxuXG4vKi8tc3RhdGVtZW50cy0vKi9cbiAgICAvLyB2ZW5kb3JpZnlcbiAgICBmb3IgKGtrID0gMDsga2sgPCB2ZW5kb3JzLmxlbmd0aDsga2srKylcbiAgICAgIGJ1Zi5wdXNoKCctJywgdmVuZG9yc1tra10sICctJywgaywgayA/ICc6JzogJycsIG8sICc7XFxuJylcbi8qLy1zdGF0ZW1lbnRzLS8qL1xuXG4gICAgYnVmLnB1c2goaywgayA/ICc6JzogJycsIG8sICc7XFxuJylcblxuICB9XG59XG5cbnZhciBmaW5kQ2xhc3MgPSAvKCkoPzo6Z2xvYmFsXFwoXFxzKihcXC5bLVxcd10rKVxccypcXCl8KFxcLikoWy1cXHddKykpL2dcblxuLyoqXG4gKiBIYW5sZGVzIGF0LXJ1bGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGsgLSBUaGUgYXQtcnVsZSBuYW1lLCBhbmQsIGlmIHRha2VzIGJvdGggcGFyYW1ldGVycyBhbmQgYVxuICogICAgICAgICAgICAgICAgICAgICBibG9jaywgdGhlIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBidWYgLSB0aGUgYnVmZmVyIGluIHdoaWNoIHRoZSBmaW5hbCBzdHlsZSBzaGVldCBpcyBidWlsdFxuICogQHBhcmFtIHtzdHJpbmdbXX0gdiAtIEVpdGhlciBwYXJhbWV0ZXJzIGZvciBibG9jay1sZXNzIHJ1bGVzIG9yIHRoZWlyIGJsb2NrXG4gKiAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoZSBvdGhlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gdGhlIGN1cnJlbnQgc2VsZWN0b3Igb3IgYSBwcmVmaXggaW4gY2FzZSBvZiBuZXN0ZWQgcnVsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSByYXdQcmVmaXggLSBhcyBhYm92ZSwgYnV0IHdpdGhvdXQgbG9jYWxpemF0aW9uIHRyYW5zZm9ybWF0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IHZlbmRvcnMgLSBhIGxpc3Qgb2YgdmVuZG9yIHByZWZpeGVzXG4gKiBAUGFyYW0ge2Jvb2xlYW59IGxvY2FsIC0gYXJlIHdlIGluIEBsb2NhbCBvciBpbiBAZ2xvYmFsIHNjb3BlP1xuICogQHBhcmFtIHtvYmplY3R9IG5zIC0gaGVscGVyIGZ1bmN0aW9ucyB0byBwb3B1bGF0ZSBvciBjcmVhdGUgdGhlIEBsb2NhbCBuYW1lc3BhY2VcbiAqICAgICAgICAgICAgICAgICAgICAgIGFuZCB0byBAZXh0ZW5kIGNsYXNzZXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmUgLSBAZXh0ZW5kIGhlbHBlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMubCAtIEBsb2NhbCBoZWxwZXJcbiAqL1xuXG5mdW5jdGlvbiBhdChrLCB2LCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpe1xuICB2YXIga2tcbiAgaWYgKC9eQCg/Om5hbWVzcGFjZXxpbXBvcnR8Y2hhcnNldCkkLy50ZXN0KGspKSB7XG4gICAgaWYodHlwZS5jYWxsKHYpID09IEFSUkFZKXtcbiAgICAgIGZvciAoa2sgPSAwOyBrayA8IHYubGVuZ3RoOyBraysrKSB7XG4gICAgICAgIGJ1Zi5wdXNoKGssICcgJywgdltra10sICc7XFxuJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goaywgJyAnLCB2LCAnO1xcbicpXG4gICAgfVxuICB9IGVsc2UgaWYgKC9eQGtleWZyYW1lcyAvLnRlc3QoaykpIHtcbiAgICBrID0gbG9jYWwgPyBrLnJlcGxhY2UoXG4gICAgICAvLyBnZW5lcmF0ZWQgYnkgc2NyaXB0L3JlZ2V4cHMuanNcbiAgICAgIC8oICkoPzo6Z2xvYmFsXFwoXFxzKihbLVxcd10rKVxccypcXCl8KCkoWy1cXHddKykpLyxcbiAgICAgIG5zLmxcbiAgICApIDoga1xuICAgIC8vIGFkZCBhIEAtd2Via2l0LWtleWZyYW1lcyBibG9jayB0b28uXG5cbiAgICBidWYucHVzaCgnQC13ZWJraXQtJywgay5zbGljZSgxKSwgJyB7XFxuJylcbiAgICBzaGVldCh2LCBidWYsICcnLCAnJywgWyd3ZWJraXQnXSlcbiAgICBidWYucHVzaCgnfVxcbicpXG5cbiAgICBidWYucHVzaChrLCAnIHtcXG4nKVxuICAgIHNoZWV0KHYsIGJ1ZiwgJycsICcnLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgYnVmLnB1c2goJ31cXG4nKVxuXG4gIH0gZWxzZSBpZiAoL15AZXh0ZW5kcz8kLy50ZXN0KGspKSB7XG5cbiAgICAvKmVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduKi9cbiAgICAvLyBwaWNrIHRoZSBsYXN0IGNsYXNzIHRvIGJlIGV4dGVuZGVkXG4gICAgd2hpbGUgKGtrID0gZmluZENsYXNzLmV4ZWMocmF3UHJlZml4KSkgayA9IGtrWzRdXG4gICAgLyplc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduKi9cbiAgICBpZiAoayA9PSBudWxsIHx8ICFsb2NhbCkge1xuICAgICAgLy8gd2UncmUgaW4gYSBAZ2xvYmFse30gYmxvY2tcbiAgICAgIGJ1Zi5wdXNoKCdALWVycm9yLWNhbm5vdC1leHRlbmQtaW4tZ2xvYmFsLWNvbnRleHQgJywgSlNPTi5zdHJpbmdpZnkocmF3UHJlZml4KSwgJztcXG4nKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmICgvXkBleHRlbmRzPyQvLnRlc3QoaykpIHtcbiAgICAgIC8vIG5vIGNsYXNzIGluIHRoZSBzZWxlY3RvclxuICAgICAgYnVmLnB1c2goJ0AtZXJyb3Itbm8tY2xhc3MtdG8tZXh0ZW5kLWluICcsIEpTT04uc3RyaW5naWZ5KHJhd1ByZWZpeCksICc7XFxuJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBucy5lKFxuICAgICAgdHlwZS5jYWxsKHYpID09IEFSUkFZID8gdi5tYXAoZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gcGFyZW50LnJlcGxhY2UoLygpKD86Omdsb2JhbFxcKFxccyooXFwuWy1cXHddKylcXHMqXFwpfCgpXFwuKFstXFx3XSspKS8sIG5zLmwpXG4gICAgICB9KS5qb2luKCcgJykgOiB2LnJlcGxhY2UoLygpKD86Omdsb2JhbFxcKFxccyooXFwuWy1cXHddKylcXHMqXFwpfCgpXFwuKFstXFx3XSspKS8sIG5zLmwpLFxuICAgICAga1xuICAgIClcblxuICB9IGVsc2UgaWYgKC9eQCg/OmZvbnQtZmFjZSR8dmlld3BvcnQkfHBhZ2UgKS8udGVzdChrKSkge1xuICAgIHNoZWV0KHYsIGJ1ZiwgaywgaywgZW1wdHlBcnJheSlcblxuICB9IGVsc2UgaWYgKC9eQGdsb2JhbCQvLnRlc3QoaykpIHtcbiAgICBzaGVldCh2LCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCAwLCBucylcblxuICB9IGVsc2UgaWYgKC9eQGxvY2FsJC8udGVzdChrKSkge1xuICAgIHNoZWV0KHYsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIDEsIG5zKVxuXG4gIH0gZWxzZSBpZiAoL15AKD86bWVkaWEgfHN1cHBvcnRzIHxkb2N1bWVudCApLi8udGVzdChrKSkge1xuICAgIGJ1Zi5wdXNoKGssICcge1xcbicpXG4gICAgc2hlZXQodiwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIGJ1Zi5wdXNoKCd9XFxuJylcblxuICB9IGVsc2Uge1xuICAgIGJ1Zi5wdXNoKCdALWVycm9yLXVuc3VwcG9ydGVkLWF0LXJ1bGUgJywgSlNPTi5zdHJpbmdpZnkoayksICc7XFxuJylcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBydWxlc2V0cyBhbmQgb3RoZXIgQ1NTIHN0YXRlbWVudHMgdG8gdGhlIHNoZWV0LlxuICpcbiAqIEBwYXJhbSB7YXJyYXl8c3RyaW5nfG9iamVjdH0gc3RhdGVtZW50cyAtIGEgc291cmNlIG9iamVjdCBvciBzdWItb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYnVmIC0gdGhlIGJ1ZmZlciBpbiB3aGljaCB0aGUgZmluYWwgc3R5bGUgc2hlZXQgaXMgYnVpbHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSB0aGUgY3VycmVudCBzZWxlY3RvciBvciBhIHByZWZpeCBpbiBjYXNlIG9mIG5lc3RlZCBydWxlc1xuICogQHBhcmFtIHtzdHJpbmd9IHJhd1ByZWZpeCAtIGFzIGFib3ZlLCBidXQgd2l0aG91dCBsb2NhbGl6YXRpb24gdHJhbnNmb3JtYXRpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVuZG9ycyAtIGEgbGlzdCBvZiB2ZW5kb3IgcHJlZml4ZXNcbiAqIEBQYXJhbSB7Ym9vbGVhbn0gbG9jYWwgLSBhcmUgd2UgaW4gQGxvY2FsIG9yIGluIEBnbG9iYWwgc2NvcGU/XG4gKiBAcGFyYW0ge29iamVjdH0gbnMgLSBoZWxwZXIgZnVuY3Rpb25zIHRvIHBvcHVsYXRlIG9yIGNyZWF0ZSB0aGUgQGxvY2FsIG5hbWVzcGFjZVxuICogICAgICAgICAgICAgICAgICAgICAgYW5kIHRvIEBleHRlbmQgY2xhc3Nlc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMuZSAtIEBleHRlbmQgaGVscGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5sIC0gQGxvY2FsIGhlbHBlclxuICovXG5mdW5jdGlvbiBzaGVldChzdGF0ZW1lbnRzLCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpIHtcbiAgdmFyIGssIGtrLCB2LCBpbkRlY2xhcmF0aW9uXG5cbiAgc3dpdGNoICh0eXBlLmNhbGwoc3RhdGVtZW50cykpIHtcblxuICBjYXNlIEFSUkFZOlxuICAgIGZvciAoayA9IDA7IGsgPCBzdGF0ZW1lbnRzLmxlbmd0aDsgaysrKVxuICAgICAgc2hlZXQoc3RhdGVtZW50c1trXSwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIGJyZWFrXG5cbiAgY2FzZSBPQkpFQ1Q6XG4gICAgZm9yIChrIGluIHN0YXRlbWVudHMpIHtcbiAgICAgIHYgPSBzdGF0ZW1lbnRzW2tdXG4gICAgICBpZiAocHJlZml4ICYmIC9eWy1cXHckXSskLy50ZXN0KGspKSB7XG4gICAgICAgIGlmICghaW5EZWNsYXJhdGlvbikge1xuICAgICAgICAgIGluRGVjbGFyYXRpb24gPSAxXG4gICAgICAgICAgYnVmLnB1c2goKCBwcmVmaXggfHwgJyonICksICcge1xcbicpXG4gICAgICAgIH1cbiAgICAgICAgZGVjbGFyYXRpb25zKHYsIGJ1ZiwgaywgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgICAgfSBlbHNlIGlmICgvXkAvLnRlc3QoaykpIHtcbiAgICAgICAgLy8gSGFuZGxlIEF0LXJ1bGVzXG4gICAgICAgIGluRGVjbGFyYXRpb24gPSAoaW5EZWNsYXJhdGlvbiAmJiBidWYucHVzaCgnfVxcbicpICYmIDApXG5cbiAgICAgICAgYXQoaywgdiwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzZWxlY3RvciBvciBuZXN0ZWQgc3ViLXNlbGVjdG9yc1xuXG4gICAgICAgIGluRGVjbGFyYXRpb24gPSAoaW5EZWNsYXJhdGlvbiAmJiBidWYucHVzaCgnfVxcbicpICYmIDApXG5cbiAgICAgICAgc2hlZXQodiwgYnVmLFxuICAgICAgICAgIChrayA9IC8sLy50ZXN0KHByZWZpeCkgfHwgcHJlZml4ICYmIC8sLy50ZXN0KGspKSA/XG4gICAgICAgICAgICBjYXJ0ZXNpYW4ocHJlZml4LnNwbGl0KCcsJyksICggbG9jYWwgP1xuICAgICAgICAgIGsucmVwbGFjZShcbiAgICAgICAgICAgIC8oKSg/OjpnbG9iYWxcXChcXHMqKFxcLlstXFx3XSspXFxzKlxcKXwoXFwuKShbLVxcd10rKSkvZywgbnMubFxuICAgICAgICAgICkgOiBrXG4gICAgICAgICkuc3BsaXQoJywnKSwgcHJlZml4KS5qb2luKCcsJykgOlxuICAgICAgICAgICAgY29uY2F0KHByZWZpeCwgKCBsb2NhbCA/XG4gICAgICAgICAgay5yZXBsYWNlKFxuICAgICAgICAgICAgLygpKD86Omdsb2JhbFxcKFxccyooXFwuWy1cXHddKylcXHMqXFwpfChcXC4pKFstXFx3XSspKS9nLCBucy5sXG4gICAgICAgICAgKSA6IGtcbiAgICAgICAgKSwgcHJlZml4KSxcbiAgICAgICAgICBrayA/XG4gICAgICAgICAgICBjYXJ0ZXNpYW4ocmF3UHJlZml4LnNwbGl0KCcsJyksIGsuc3BsaXQoJywnKSwgcmF3UHJlZml4KS5qb2luKCcsJykgOlxuICAgICAgICAgICAgY29uY2F0KHJhd1ByZWZpeCwgaywgcmF3UHJlZml4KSxcbiAgICAgICAgICB2ZW5kb3JzLFxuICAgICAgICAgIGxvY2FsLCBuc1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbkRlY2xhcmF0aW9uKSBidWYucHVzaCgnfVxcbicpXG4gICAgYnJlYWtcbiAgY2FzZSBTVFJJTkc6XG4gICAgYnVmLnB1c2goXG4gICAgICAgICggcHJlZml4IHx8ICc6LWVycm9yLW5vLXNlbGVjdG9yJyApICwgJyB7XFxuJ1xuICAgICAgKVxuICAgIGRlY2xhcmF0aW9ucyhzdGF0ZW1lbnRzLCBidWYsICcnLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgYnVmLnB1c2goJ31cXG4nKVxuICB9XG59XG5cbnZhciBzY29wZV9yb290ID0gJ19qMmNfJyArXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCkudG9TdHJpbmcoMzYpICsgJ18nICtcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKS50b1N0cmluZygzNikgKyAnXycgK1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApLnRvU3RyaW5nKDM2KSArICdfJyArXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCkudG9TdHJpbmcoMzYpICsgJ18nO1xudmFyIGNvdW50ZXIgPSAwO1xuZnVuY3Rpb24gajJjKHJlcykge1xuICByZXMgPSByZXMgfHwge31cbiAgdmFyIGV4dGVuc2lvbnMgPSBbXVxuXG4gIGZ1bmN0aW9uIGZpbmFsaXplKGJ1ZiwgaSkge1xuICAgIGZvciAoaSA9IDA7IGk8IGV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIGJ1ZiA9IGV4dGVuc2lvbnNbaV0oYnVmKSB8fCBidWZcbiAgICByZXR1cm4gYnVmLmpvaW4oJycpXG4gIH1cblxuICByZXMudXNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgZXh0ZW5zaW9ucy5wdXNoKGFyZ3NbaV0pXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuLyovLXN0YXRlbWVudHMtLyovXG4gIHJlcy5zaGVldCA9IGZ1bmN0aW9uKG5zLCBzdGF0ZW1lbnRzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHN0YXRlbWVudHMgPSBuczsgbnMgPSB7fVxuICAgIH1cbiAgICB2YXJcbiAgICAgIHN1ZmZpeCA9IHNjb3BlX3Jvb3QgKyBjb3VudGVyKyssXG4gICAgICBsb2NhbHMgPSB7fSxcbiAgICAgIGssIGJ1ZiA9IFtdXG4gICAgLy8gcGljayBvbmx5IG5vbi1udW1lcmljIGtleXMgc2luY2UgYChOYU4gIT0gTmFOKSA9PT0gdHJ1ZWBcbiAgICBmb3IgKGsgaW4gbnMpIGlmIChrLTAgIT0gay0wICYmIG93bi5jYWxsKG5zLCBrKSkge1xuICAgICAgbG9jYWxzW2tdID0gbnNba11cbiAgICB9XG4gICAgc2hlZXQoXG4gICAgICBzdGF0ZW1lbnRzLCBidWYsICcnLCAnJywgZW1wdHlBcnJheSAvKnZlbmRvcnMqLyxcbiAgICAgIDEsIC8vIGxvY2FsXG4gICAgICB7XG4gICAgICAgIGU6IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGNoaWxkKSB7XG4gICAgICAgICAgdmFyIG5hbWVMaXN0ID0gbG9jYWxzW2NoaWxkXVxuICAgICAgICAgIGxvY2Fsc1tjaGlsZF0gPVxuICAgICAgICAgICAgbmFtZUxpc3Quc2xpY2UoMCwgbmFtZUxpc3QubGFzdEluZGV4T2YoJyAnKSArIDEpICtcbiAgICAgICAgICAgIHBhcmVudCArICcgJyArXG4gICAgICAgICAgICBuYW1lTGlzdC5zbGljZShuYW1lTGlzdC5sYXN0SW5kZXhPZignICcpICsgMSlcbiAgICAgICAgfSxcbiAgICAgICAgbDogZnVuY3Rpb24gbG9jYWxpemUobWF0Y2gsIHNwYWNlLCBnbG9iYWwsIGRvdCwgbmFtZSkge1xuICAgICAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFjZSArIGdsb2JhbFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvY2Fsc1tuYW1lXSkgbG9jYWxzW25hbWVdID0gbmFtZSArIHN1ZmZpeFxuICAgICAgICAgIHJldHVybiBzcGFjZSArIGRvdCArIGxvY2Fsc1tuYW1lXS5tYXRjaCgvXFxTKyQvKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgIC8qanNoaW50IC1XMDUzICovXG4gICAgYnVmID0gbmV3IFN0cmluZyhmaW5hbGl6ZShidWYpKVxuICAgIC8qanNoaW50ICtXMDUzICovXG4gICAgZm9yIChrIGluIGxvY2FscykgaWYgKG93bi5jYWxsKGxvY2FscywgaykpIGJ1ZltrXSA9IGxvY2Fsc1trXVxuICAgIHJldHVybiBidWZcbiAgfVxuLyovLXN0YXRlbWVudHMtLyovXG4gIHJlcy5pbmxpbmUgPSBmdW5jdGlvbiAobG9jYWxzLCBkZWNsLCBidWYpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZGVjbCA9IGxvY2FsczsgbG9jYWxzID0ge31cbiAgICB9XG4gICAgZGVjbGFyYXRpb25zKFxuICAgICAgZGVjbCxcbiAgICAgIGJ1ZiA9IFtdLFxuICAgICAgJycsIC8vIHByZWZpeFxuICAgICAgZW1wdHlBcnJheSwgLy8gdmVuZG9yc1xuICAgICAgMSxcbiAgICAgIHtcbiAgICAgICAgbDogZnVuY3Rpb24gbG9jYWxpemUobWF0Y2gsIHNwYWNlLCBnbG9iYWwsIGRvdCwgbmFtZSkge1xuICAgICAgICAgIGlmIChnbG9iYWwpIHJldHVybiBzcGFjZSArIGdsb2JhbFxuICAgICAgICAgIGlmICghbG9jYWxzW25hbWVdKSByZXR1cm4gbmFtZVxuICAgICAgICAgIHJldHVybiBzcGFjZSArIGRvdCArIGxvY2Fsc1tuYW1lXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIHJldHVybiBmaW5hbGl6ZShidWYpXG4gIH1cblxuICByZXMucHJlZml4ID0gZnVuY3Rpb24odmFsLCB2ZW5kb3JzKSB7XG4gICAgcmV0dXJuIGNhcnRlc2lhbihcbiAgICAgIHZlbmRvcnMubWFwKGZ1bmN0aW9uKHApe3JldHVybiAnLScgKyBwICsgJy0nfSkuY29uY2F0KFsnJ10pLFxuICAgICAgW3ZhbF1cbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5qMmMuZ2xvYmFsID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gJzpnbG9iYWwoJyArIHggKyAnKSdcbn1cblxuajJjLmt2ID0ga3ZcbmZ1bmN0aW9uIGt2IChrLCB2LCBvKSB7XG4gIG8gPSB7fVxuICBvW2tdID0gdlxuICByZXR1cm4gb1xufVxuXG5qMmMuYXQgPSBmdW5jdGlvbiBhdCAocnVsZSwgcGFyYW1zLCBibG9jaykge1xuICBpZiAoXG4gICAgYXJndW1lbnRzLmxlbmd0aCA8IDNcbiAgKSB7XG4gICAgdmFyIF9hdCA9IGF0LmJpbmQuYXBwbHkoYXQsIFtudWxsXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMCkpKVxuICAgIF9hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCl7cmV0dXJuICdAJyArIHJ1bGUgKyAnICcgKyBwYXJhbXN9XG4gICAgcmV0dXJuIF9hdFxuICB9XG4gIGVsc2UgcmV0dXJuIGt2KCdAJyArIHJ1bGUgKyAnICcgKyBwYXJhbXMsIGJsb2NrKVxufVxuXG5qMmMoajJjKVxuZGVsZXRlIGoyYy51c2VcblxubW9kdWxlLmV4cG9ydHMgPSBqMmM7IiwiOyhmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHRcInVzZSBzdHJpY3RcIlxyXG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcblx0dmFyIG0gPSBmYWN0b3J5KGdsb2JhbClcclxuXHRpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUgIT0gbnVsbCAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBtXHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xyXG5cdFx0ZGVmaW5lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG0gfSlcclxuXHR9IGVsc2Uge1xyXG5cdFx0Z2xvYmFsLm0gPSBtXHJcblx0fVxyXG5cdC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cclxufSkodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LCBmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cdFwidXNlIHN0cmljdFwiXHJcblxyXG5cdG0udmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBcInYwLjIuM1wiXHJcblx0fVxyXG5cclxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHlcclxuXHR2YXIgdHlwZSA9IHt9LnRvU3RyaW5nXHJcblxyXG5cdGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gXCJmdW5jdGlvblwiXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpc09iamVjdChvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIlxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNTdHJpbmcob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZS5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBTdHJpbmddXCJcclxuXHR9XHJcblxyXG5cdHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZS5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBBcnJheV1cIlxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbm9vcCgpIHt9XHJcblxyXG5cdHZhciB2b2lkRWxlbWVudHMgPSB7XHJcblx0XHRBUkVBOiAxLFxyXG5cdFx0QkFTRTogMSxcclxuXHRcdEJSOiAxLFxyXG5cdFx0Q09MOiAxLFxyXG5cdFx0Q09NTUFORDogMSxcclxuXHRcdEVNQkVEOiAxLFxyXG5cdFx0SFI6IDEsXHJcblx0XHRJTUc6IDEsXHJcblx0XHRJTlBVVDogMSxcclxuXHRcdEtFWUdFTjogMSxcclxuXHRcdExJTks6IDEsXHJcblx0XHRNRVRBOiAxLFxyXG5cdFx0UEFSQU06IDEsXHJcblx0XHRTT1VSQ0U6IDEsXHJcblx0XHRUUkFDSzogMSxcclxuXHRcdFdCUjogMVxyXG5cdH1cclxuXHJcblx0Ly8gY2FjaGluZyBjb21tb25seSB1c2VkIHZhcmlhYmxlc1xyXG5cdHZhciAkZG9jdW1lbnQsICRsb2NhdGlvbiwgJHJlcXVlc3RBbmltYXRpb25GcmFtZSwgJGNhbmNlbEFuaW1hdGlvbkZyYW1lXHJcblxyXG5cdC8vIHNlbGYgaW52b2tpbmcgZnVuY3Rpb24gbmVlZGVkIGJlY2F1c2Ugb2YgdGhlIHdheSBtb2NrcyB3b3JrXHJcblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZShtb2NrKSB7XHJcblx0XHQkZG9jdW1lbnQgPSBtb2NrLmRvY3VtZW50XHJcblx0XHQkbG9jYXRpb24gPSBtb2NrLmxvY2F0aW9uXHJcblx0XHQkY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBtb2NrLmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IG1vY2suY2xlYXJUaW1lb3V0XHJcblx0XHQkcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gbW9jay5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgbW9jay5zZXRUaW1lb3V0XHJcblx0fVxyXG5cclxuXHQvLyB0ZXN0aW5nIEFQSVxyXG5cdG0uZGVwcyA9IGZ1bmN0aW9uIChtb2NrKSB7XHJcblx0XHRpbml0aWFsaXplKGdsb2JhbCA9IG1vY2sgfHwgd2luZG93KVxyXG5cdFx0cmV0dXJuIGdsb2JhbFxyXG5cdH1cclxuXHJcblx0bS5kZXBzKGdsb2JhbClcclxuXHJcblx0LyoqXHJcblx0ICogQHR5cGVkZWYge1N0cmluZ30gVGFnXHJcblx0ICogQSBzdHJpbmcgdGhhdCBsb29rcyBsaWtlIC0+IGRpdi5jbGFzc25hbWUjaWRbcGFyYW09b25lXVtwYXJhbTI9dHdvXVxyXG5cdCAqIFdoaWNoIGRlc2NyaWJlcyBhIERPTSBub2RlXHJcblx0ICovXHJcblxyXG5cdGZ1bmN0aW9uIHBhcnNlVGFnQXR0cnMoY2VsbCwgdGFnKSB7XHJcblx0XHR2YXIgY2xhc3NlcyA9IFtdXHJcblx0XHR2YXIgcGFyc2VyID0gLyg/OihefCN8XFwuKShbXiNcXC5cXFtcXF1dKykpfChcXFsuKz9cXF0pL2dcclxuXHRcdHZhciBtYXRjaFxyXG5cclxuXHRcdHdoaWxlICgobWF0Y2ggPSBwYXJzZXIuZXhlYyh0YWcpKSkge1xyXG5cdFx0XHRpZiAobWF0Y2hbMV0gPT09IFwiXCIgJiYgbWF0Y2hbMl0pIHtcclxuXHRcdFx0XHRjZWxsLnRhZyA9IG1hdGNoWzJdXHJcblx0XHRcdH0gZWxzZSBpZiAobWF0Y2hbMV0gPT09IFwiI1wiKSB7XHJcblx0XHRcdFx0Y2VsbC5hdHRycy5pZCA9IG1hdGNoWzJdXHJcblx0XHRcdH0gZWxzZSBpZiAobWF0Y2hbMV0gPT09IFwiLlwiKSB7XHJcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKG1hdGNoWzJdKVxyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoWzNdWzBdID09PSBcIltcIikge1xyXG5cdFx0XHRcdHZhciBwYWlyID0gL1xcWyguKz8pKD86PShcInwnfCkoLio/KVxcMik/XFxdLy5leGVjKG1hdGNoWzNdKVxyXG5cdFx0XHRcdGNlbGwuYXR0cnNbcGFpclsxXV0gPSBwYWlyWzNdIHx8IChwYWlyWzJdID8gXCJcIiA6IHRydWUpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xhc3Nlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0VmlydHVhbENoaWxkcmVuKGFyZ3MsIGhhc0F0dHJzKSB7XHJcblx0XHR2YXIgY2hpbGRyZW4gPSBoYXNBdHRycyA/IGFyZ3Muc2xpY2UoMSkgOiBhcmdzXHJcblxyXG5cdFx0aWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KGNoaWxkcmVuWzBdKSkge1xyXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW5bMF1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjaGlsZHJlblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXNzaWduQXR0cnModGFyZ2V0LCBhdHRycywgY2xhc3Nlcykge1xyXG5cdFx0dmFyIGNsYXNzQXR0ciA9IFwiY2xhc3NcIiBpbiBhdHRycyA/IFwiY2xhc3NcIiA6IFwiY2xhc3NOYW1lXCJcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyTmFtZSBpbiBhdHRycykge1xyXG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGF0dHJOYW1lKSkge1xyXG5cdFx0XHRcdGlmIChhdHRyTmFtZSA9PT0gY2xhc3NBdHRyICYmXHJcblx0XHRcdFx0XHRcdGF0dHJzW2F0dHJOYW1lXSAhPSBudWxsICYmXHJcblx0XHRcdFx0XHRcdGF0dHJzW2F0dHJOYW1lXSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGF0dHJzW2F0dHJOYW1lXSlcclxuXHRcdFx0XHRcdC8vIGNyZWF0ZSBrZXkgaW4gY29ycmVjdCBpdGVyYXRpb24gb3JkZXJcclxuXHRcdFx0XHRcdHRhcmdldFthdHRyTmFtZV0gPSBcIlwiXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhcmdldFthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2xhc3Nlcy5sZW5ndGgpIHRhcmdldFtjbGFzc0F0dHJdID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1RhZ30gVGhlIERPTSBub2RlIHRhZ1xyXG5cdCAqIEBwYXJhbSB7T2JqZWN0PVtdfSBvcHRpb25hbCBrZXktdmFsdWUgcGFpcnMgdG8gYmUgbWFwcGVkIHRvIERPTSBhdHRyc1xyXG5cdCAqIEBwYXJhbSB7Li4ubU5vZGU9W119IFplcm8gb3IgbW9yZSBNaXRocmlsIGNoaWxkIG5vZGVzLiBDYW4gYmUgYW4gYXJyYXksXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb3Igc3BsYXQgKG9wdGlvbmFsKVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIG0odGFnLCBwYWlycykge1xyXG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuXHJcblx0XHRpZiAoaXNPYmplY3QodGFnKSkgcmV0dXJuIHBhcmFtZXRlcml6ZSh0YWcsIGFyZ3MpXHJcblxyXG5cdFx0aWYgKCFpc1N0cmluZyh0YWcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInNlbGVjdG9yIGluIG0oc2VsZWN0b3IsIGF0dHJzLCBjaGlsZHJlbikgc2hvdWxkIFwiICtcclxuXHRcdFx0XHRcImJlIGEgc3RyaW5nXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGhhc0F0dHJzID0gcGFpcnMgIT0gbnVsbCAmJiBpc09iamVjdChwYWlycykgJiZcclxuXHRcdFx0IShcInRhZ1wiIGluIHBhaXJzIHx8IFwidmlld1wiIGluIHBhaXJzIHx8IFwic3VidHJlZVwiIGluIHBhaXJzKVxyXG5cclxuXHRcdHZhciBhdHRycyA9IGhhc0F0dHJzID8gcGFpcnMgOiB7fVxyXG5cdFx0dmFyIGNlbGwgPSB7XHJcblx0XHRcdHRhZzogXCJkaXZcIixcclxuXHRcdFx0YXR0cnM6IHt9LFxyXG5cdFx0XHRjaGlsZHJlbjogZ2V0VmlydHVhbENoaWxkcmVuKGFyZ3MsIGhhc0F0dHJzKVxyXG5cdFx0fVxyXG5cclxuXHRcdGFzc2lnbkF0dHJzKGNlbGwuYXR0cnMsIGF0dHJzLCBwYXJzZVRhZ0F0dHJzKGNlbGwsIHRhZykpXHJcblx0XHRyZXR1cm4gY2VsbFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBmKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoICYmICFmKGxpc3RbaV0sIGkrKyk7KSB7XHJcblx0XHRcdC8vIGZ1bmN0aW9uIGNhbGxlZCBpbiBjb25kaXRpb25cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcktleXMobGlzdCwgZikge1xyXG5cdFx0Zm9yRWFjaChsaXN0LCBmdW5jdGlvbiAoYXR0cnMsIGkpIHtcclxuXHRcdFx0cmV0dXJuIChhdHRycyA9IGF0dHJzICYmIGF0dHJzLmF0dHJzKSAmJlxyXG5cdFx0XHRcdGF0dHJzLmtleSAhPSBudWxsICYmXHJcblx0XHRcdFx0ZihhdHRycywgaSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gd2FzIGNhdXNpbmcgZGVvcHRzIGluIENocm9tZS5cclxuXHRmdW5jdGlvbiBkYXRhVG9TdHJpbmcoZGF0YSkge1xyXG5cdFx0Ly8gZGF0YS50b1N0cmluZygpIG1pZ2h0IHRocm93IG9yIHJldHVybiBudWxsIGlmIGRhdGEgaXMgdGhlIHJldHVyblxyXG5cdFx0Ly8gdmFsdWUgb2YgQ29uc29sZS5sb2cgaW4gc29tZSB2ZXJzaW9ucyBvZiBGaXJlZm94IChiZWhhdmlvciBkZXBlbmRzIG9uXHJcblx0XHQvLyB2ZXJzaW9uKVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhLnRvU3RyaW5nKCkgIT0gbnVsbCkgcmV0dXJuIGRhdGFcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gc2lsZW50bHkgaWdub3JlIGVycm9yc1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCJcclxuXHR9XHJcblxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gd2FzIGNhdXNpbmcgZGVvcHRzIGluIENocm9tZS5cclxuXHRmdW5jdGlvbiBpbmplY3RUZXh0Tm9kZShwYXJlbnRFbGVtZW50LCBmaXJzdCwgaW5kZXgsIGRhdGEpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgZmlyc3QsIGluZGV4KVxyXG5cdFx0XHRmaXJzdC5ub2RlVmFsdWUgPSBkYXRhXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIElFIGVycm9uZW91c2x5IHRocm93cyBlcnJvciB3aGVuIGFwcGVuZGluZyBhbiBlbXB0eSB0ZXh0IG5vZGVcclxuXHRcdFx0Ly8gYWZ0ZXIgYSBudWxsXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmbGF0dGVuKGxpc3QpIHtcclxuXHRcdC8vIHJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoaXNBcnJheShsaXN0W2ldKSkge1xyXG5cdFx0XHRcdGxpc3QgPSBsaXN0LmNvbmNhdC5hcHBseShbXSwgbGlzdClcclxuXHRcdFx0XHQvLyBjaGVjayBjdXJyZW50IGluZGV4IGFnYWluIGFuZCBmbGF0dGVuIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlXHJcblx0XHRcdFx0Ly8gbmVzdGVkIGFycmF5cyBhdCB0aGF0IGluZGV4XHJcblx0XHRcdFx0aS0tXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBsaXN0XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGUsIGluZGV4KSB7XHJcblx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShub2RlLFxyXG5cdFx0XHRwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcblx0fVxyXG5cclxuXHR2YXIgREVMRVRJT04gPSAxXHJcblx0dmFyIElOU0VSVElPTiA9IDJcclxuXHR2YXIgTU9WRSA9IDNcclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlS2V5c0RpZmZlcihkYXRhLCBleGlzdGluZywgY2FjaGVkLCBwYXJlbnRFbGVtZW50KSB7XHJcblx0XHRmb3JLZXlzKGRhdGEsIGZ1bmN0aW9uIChrZXksIGkpIHtcclxuXHRcdFx0ZXhpc3Rpbmdba2V5ID0ga2V5LmtleV0gPSBleGlzdGluZ1trZXldID8ge1xyXG5cdFx0XHRcdGFjdGlvbjogTU9WRSxcclxuXHRcdFx0XHRpbmRleDogaSxcclxuXHRcdFx0XHRmcm9tOiBleGlzdGluZ1trZXldLmluZGV4LFxyXG5cdFx0XHRcdGVsZW1lbnQ6IGNhY2hlZC5ub2Rlc1tleGlzdGluZ1trZXldLmluZGV4XSB8fFxyXG5cdFx0XHRcdFx0JGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHRcdFx0fSA6IHthY3Rpb246IElOU0VSVElPTiwgaW5kZXg6IGl9XHJcblx0XHR9KVxyXG5cclxuXHRcdHZhciBhY3Rpb25zID0gW11cclxuXHRcdGZvciAodmFyIHByb3AgaW4gZXhpc3RpbmcpIGlmIChoYXNPd24uY2FsbChleGlzdGluZywgcHJvcCkpIHtcclxuXHRcdFx0YWN0aW9ucy5wdXNoKGV4aXN0aW5nW3Byb3BdKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjaGFuZ2VzID0gYWN0aW9ucy5zb3J0KHNvcnRDaGFuZ2VzKVxyXG5cdFx0dmFyIG5ld0NhY2hlZCA9IG5ldyBBcnJheShjYWNoZWQubGVuZ3RoKVxyXG5cclxuXHRcdG5ld0NhY2hlZC5ub2RlcyA9IGNhY2hlZC5ub2Rlcy5zbGljZSgpXHJcblxyXG5cdFx0Zm9yRWFjaChjaGFuZ2VzLCBmdW5jdGlvbiAoY2hhbmdlKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IGNoYW5nZS5pbmRleFxyXG5cdFx0XHRpZiAoY2hhbmdlLmFjdGlvbiA9PT0gREVMRVRJT04pIHtcclxuXHRcdFx0XHRjbGVhcihjYWNoZWRbaW5kZXhdLm5vZGVzLCBjYWNoZWRbaW5kZXhdKVxyXG5cdFx0XHRcdG5ld0NhY2hlZC5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNoYW5nZS5hY3Rpb24gPT09IElOU0VSVElPTikge1xyXG5cdFx0XHRcdHZhciBkdW1teSA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdFx0ZHVtbXkua2V5ID0gZGF0YVtpbmRleF0uYXR0cnMua2V5XHJcblx0XHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBkdW1teSwgaW5kZXgpXHJcblx0XHRcdFx0bmV3Q2FjaGVkLnNwbGljZShpbmRleCwgMCwge1xyXG5cdFx0XHRcdFx0YXR0cnM6IHtrZXk6IGRhdGFbaW5kZXhdLmF0dHJzLmtleX0sXHJcblx0XHRcdFx0XHRub2RlczogW2R1bW15XVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bmV3Q2FjaGVkLm5vZGVzW2luZGV4XSA9IGR1bW15XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGFuZ2UuYWN0aW9uID09PSBNT1ZFKSB7XHJcblx0XHRcdFx0dmFyIGNoYW5nZUVsZW1lbnQgPSBjaGFuZ2UuZWxlbWVudFxyXG5cdFx0XHRcdHZhciBtYXliZUNoYW5nZWQgPSBwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdXHJcblx0XHRcdFx0aWYgKG1heWJlQ2hhbmdlZCAhPT0gY2hhbmdlRWxlbWVudCAmJiBjaGFuZ2VFbGVtZW50ICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjaGFuZ2VFbGVtZW50LFxyXG5cdFx0XHRcdFx0XHRtYXliZUNoYW5nZWQgfHwgbnVsbClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV3Q2FjaGVkW2luZGV4XSA9IGNhY2hlZFtjaGFuZ2UuZnJvbV1cclxuXHRcdFx0XHRuZXdDYWNoZWQubm9kZXNbaW5kZXhdID0gY2hhbmdlRWxlbWVudFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBuZXdDYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRpZmZLZXlzKGRhdGEsIGNhY2hlZCwgZXhpc3RpbmcsIHBhcmVudEVsZW1lbnQpIHtcclxuXHRcdHZhciBrZXlzRGlmZmVyID0gZGF0YS5sZW5ndGggIT09IGNhY2hlZC5sZW5ndGhcclxuXHJcblx0XHRpZiAoIWtleXNEaWZmZXIpIHtcclxuXHRcdFx0Zm9yS2V5cyhkYXRhLCBmdW5jdGlvbiAoYXR0cnMsIGkpIHtcclxuXHRcdFx0XHR2YXIgY2FjaGVkQ2VsbCA9IGNhY2hlZFtpXVxyXG5cdFx0XHRcdHJldHVybiBrZXlzRGlmZmVyID0gY2FjaGVkQ2VsbCAmJlxyXG5cdFx0XHRcdFx0Y2FjaGVkQ2VsbC5hdHRycyAmJlxyXG5cdFx0XHRcdFx0Y2FjaGVkQ2VsbC5hdHRycy5rZXkgIT09IGF0dHJzLmtleVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChrZXlzRGlmZmVyKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVLZXlzRGlmZmVyKGRhdGEsIGV4aXN0aW5nLCBjYWNoZWQsIHBhcmVudEVsZW1lbnQpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVkXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkaWZmQXJyYXkoZGF0YSwgY2FjaGVkLCBub2Rlcykge1xyXG5cdFx0Ly8gZGlmZiB0aGUgYXJyYXkgaXRzZWxmXHJcblxyXG5cdFx0Ly8gdXBkYXRlIHRoZSBsaXN0IG9mIERPTSBub2RlcyBieSBjb2xsZWN0aW5nIHRoZSBub2RlcyBmcm9tIGVhY2ggaXRlbVxyXG5cdFx0Zm9yRWFjaChkYXRhLCBmdW5jdGlvbiAoXywgaSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkW2ldICE9IG51bGwpIG5vZGVzLnB1c2guYXBwbHkobm9kZXMsIGNhY2hlZFtpXS5ub2RlcylcclxuXHRcdH0pXHJcblx0XHQvLyByZW1vdmUgaXRlbXMgZnJvbSB0aGUgZW5kIG9mIHRoZSBhcnJheSBpZiB0aGUgbmV3IGFycmF5IGlzIHNob3J0ZXJcclxuXHRcdC8vIHRoYW4gdGhlIG9sZCBvbmUuIGlmIGVycm9ycyBldmVyIGhhcHBlbiBoZXJlLCB0aGUgaXNzdWUgaXMgbW9zdFxyXG5cdFx0Ly8gbGlrZWx5IGEgYnVnIGluIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIGBjYWNoZWRgIGRhdGEgc3RydWN0dXJlXHJcblx0XHQvLyBzb21ld2hlcmUgZWFybGllciBpbiB0aGUgcHJvZ3JhbVxyXG5cdFx0Zm9yRWFjaChjYWNoZWQubm9kZXMsIGZ1bmN0aW9uIChub2RlLCBpKSB7XHJcblx0XHRcdGlmIChub2RlLnBhcmVudE5vZGUgIT0gbnVsbCAmJiBub2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xyXG5cdFx0XHRcdGNsZWFyKFtub2RlXSwgW2NhY2hlZFtpXV0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0aWYgKGRhdGEubGVuZ3RoIDwgY2FjaGVkLmxlbmd0aCkgY2FjaGVkLmxlbmd0aCA9IGRhdGEubGVuZ3RoXHJcblx0XHRjYWNoZWQubm9kZXMgPSBub2Rlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRBcnJheUtleXMoZGF0YSkge1xyXG5cdFx0dmFyIGd1aWQgPSAwXHJcblx0XHRmb3JLZXlzKGRhdGEsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Zm9yRWFjaChkYXRhLCBmdW5jdGlvbiAoYXR0cnMpIHtcclxuXHRcdFx0XHRpZiAoKGF0dHJzID0gYXR0cnMgJiYgYXR0cnMuYXR0cnMpICYmIGF0dHJzLmtleSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRhdHRycy5rZXkgPSBcIl9fbWl0aHJpbF9fXCIgKyBndWlkKytcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiAxXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNEaWZmZXJlbnRFbm91Z2goZGF0YSwgY2FjaGVkLCBkYXRhQXR0cktleXMpIHtcclxuXHRcdGlmIChkYXRhLnRhZyAhPT0gY2FjaGVkLnRhZykgcmV0dXJuIHRydWVcclxuXHJcblx0XHRpZiAoZGF0YUF0dHJLZXlzLnNvcnQoKS5qb2luKCkgIT09XHJcblx0XHRcdFx0T2JqZWN0LmtleXMoY2FjaGVkLmF0dHJzKS5zb3J0KCkuam9pbigpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cnMuaWQgIT09IGNhY2hlZC5hdHRycy5pZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJzLmtleSAhPT0gY2FjaGVkLmF0dHJzLmtleSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChtLnJlZHJhdy5zdHJhdGVneSgpID09PSBcImFsbFwiKSB7XHJcblx0XHRcdHJldHVybiAhY2FjaGVkLmNvbmZpZ0NvbnRleHQgfHwgY2FjaGVkLmNvbmZpZ0NvbnRleHQucmV0YWluICE9PSB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG0ucmVkcmF3LnN0cmF0ZWd5KCkgPT09IFwiZGlmZlwiKSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWQuY29uZmlnQ29udGV4dCAmJiBjYWNoZWQuY29uZmlnQ29udGV4dC5yZXRhaW4gPT09IGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBtYXliZVJlY3JlYXRlT2JqZWN0KGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKSB7XHJcblx0XHQvLyBpZiBhbiBlbGVtZW50IGlzIGRpZmZlcmVudCBlbm91Z2ggZnJvbSB0aGUgb25lIGluIGNhY2hlLCByZWNyZWF0ZSBpdFxyXG5cdFx0aWYgKGlzRGlmZmVyZW50RW5vdWdoKGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkLm5vZGVzLmxlbmd0aCkgY2xlYXIoY2FjaGVkLm5vZGVzKVxyXG5cclxuXHRcdFx0aWYgKGNhY2hlZC5jb25maWdDb250ZXh0ICYmXHJcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKSkge1xyXG5cdFx0XHRcdGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNhY2hlZC5jb250cm9sbGVycykge1xyXG5cdFx0XHRcdGZvckVhY2goY2FjaGVkLmNvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0aWYgKGNvbnRyb2xsZXIub251bmxvYWQpIGNvbnRyb2xsZXIub251bmxvYWQoe3ByZXZlbnREZWZhdWx0OiBub29wfSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldE9iamVjdE5hbWVzcGFjZShkYXRhLCBuYW1lc3BhY2UpIHtcclxuXHRcdGlmIChkYXRhLmF0dHJzLnhtbG5zKSByZXR1cm4gZGF0YS5hdHRycy54bWxuc1xyXG5cdFx0aWYgKGRhdGEudGFnID09PSBcInN2Z1wiKSByZXR1cm4gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcblx0XHRpZiAoZGF0YS50YWcgPT09IFwibWF0aFwiKSByZXR1cm4gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCJcclxuXHRcdHJldHVybiBuYW1lc3BhY2VcclxuXHR9XHJcblxyXG5cdHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0bS5zdGFydENvbXB1dGF0aW9uID0gZnVuY3Rpb24gKCkgeyBwZW5kaW5nUmVxdWVzdHMrKyB9XHJcblx0bS5lbmRDb21wdXRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChwZW5kaW5nUmVxdWVzdHMgPiAxKSB7XHJcblx0XHRcdHBlbmRpbmdSZXF1ZXN0cy0tXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0XHRcdG0ucmVkcmF3KClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHVubG9hZENhY2hlZENvbnRyb2xsZXJzKGNhY2hlZCwgdmlld3MsIGNvbnRyb2xsZXJzKSB7XHJcblx0XHRpZiAoY29udHJvbGxlcnMubGVuZ3RoKSB7XHJcblx0XHRcdGNhY2hlZC52aWV3cyA9IHZpZXdzXHJcblx0XHRcdGNhY2hlZC5jb250cm9sbGVycyA9IGNvbnRyb2xsZXJzXHJcblx0XHRcdGZvckVhY2goY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0XHRcdFx0aWYgKGNvbnRyb2xsZXIub251bmxvYWQgJiYgY29udHJvbGxlci5vbnVubG9hZC4kb2xkKSB7XHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkID0gY29udHJvbGxlci5vbnVubG9hZC4kb2xkXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocGVuZGluZ1JlcXVlc3RzICYmIGNvbnRyb2xsZXIub251bmxvYWQpIHtcclxuXHRcdFx0XHRcdHZhciBvbnVubG9hZCA9IGNvbnRyb2xsZXIub251bmxvYWRcclxuXHRcdFx0XHRcdGNvbnRyb2xsZXIub251bmxvYWQgPSBub29wXHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkLiRvbGQgPSBvbnVubG9hZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNjaGVkdWxlQ29uZmlnc1RvQmVDYWxsZWQoY29uZmlncywgZGF0YSwgbm9kZSwgaXNOZXcsIGNhY2hlZCkge1xyXG5cdFx0Ly8gc2NoZWR1bGUgY29uZmlncyB0byBiZSBjYWxsZWQuIFRoZXkgYXJlIGNhbGxlZCBhZnRlciBgYnVpbGRgIGZpbmlzaGVzXHJcblx0XHQvLyBydW5uaW5nXHJcblx0XHRpZiAoaXNGdW5jdGlvbihkYXRhLmF0dHJzLmNvbmZpZykpIHtcclxuXHRcdFx0dmFyIGNvbnRleHQgPSBjYWNoZWQuY29uZmlnQ29udGV4dCA9IGNhY2hlZC5jb25maWdDb250ZXh0IHx8IHt9XHJcblxyXG5cdFx0XHQvLyBiaW5kXHJcblx0XHRcdGNvbmZpZ3MucHVzaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGEuYXR0cnMuY29uZmlnLmNhbGwoZGF0YSwgbm9kZSwgIWlzTmV3LCBjb250ZXh0LFxyXG5cdFx0XHRcdFx0Y2FjaGVkKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRVcGRhdGVkTm9kZShcclxuXHRcdGNhY2hlZCxcclxuXHRcdGRhdGEsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdGhhc0tleXMsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHR2aWV3cyxcclxuXHRcdGNvbmZpZ3MsXHJcblx0XHRjb250cm9sbGVyc1xyXG5cdCkge1xyXG5cdFx0dmFyIG5vZGUgPSBjYWNoZWQubm9kZXNbMF1cclxuXHJcblx0XHRpZiAoaGFzS2V5cykge1xyXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKG5vZGUsIGRhdGEudGFnLCBkYXRhLmF0dHJzLCBjYWNoZWQuYXR0cnMsIG5hbWVzcGFjZSlcclxuXHRcdH1cclxuXHJcblx0XHRjYWNoZWQuY2hpbGRyZW4gPSBidWlsZChcclxuXHRcdFx0bm9kZSxcclxuXHRcdFx0ZGF0YS50YWcsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRkYXRhLmNoaWxkcmVuLFxyXG5cdFx0XHRjYWNoZWQuY2hpbGRyZW4sXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHRkYXRhLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA/IG5vZGUgOiBlZGl0YWJsZSxcclxuXHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRjb25maWdzXHJcblx0XHQpXHJcblxyXG5cdFx0Y2FjaGVkLm5vZGVzLmludGFjdCA9IHRydWVcclxuXHJcblx0XHRpZiAoY29udHJvbGxlcnMubGVuZ3RoKSB7XHJcblx0XHRcdGNhY2hlZC52aWV3cyA9IHZpZXdzXHJcblx0XHRcdGNhY2hlZC5jb250cm9sbGVycyA9IGNvbnRyb2xsZXJzXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5vZGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGhhbmRsZU5vbmV4aXN0ZW50Tm9kZXMoZGF0YSwgcGFyZW50RWxlbWVudCwgaW5kZXgpIHtcclxuXHRcdHZhciBub2Rlc1xyXG5cdFx0aWYgKGRhdGEuJHRydXN0ZWQpIHtcclxuXHRcdFx0bm9kZXMgPSBpbmplY3RIVE1MKHBhcmVudEVsZW1lbnQsIGluZGV4LCBkYXRhKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bm9kZXMgPSBbJGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpXVxyXG5cdFx0XHRpZiAoIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lIGluIHZvaWRFbGVtZW50cykpIHtcclxuXHRcdFx0XHRpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGVzWzBdLCBpbmRleClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjYWNoZWRcclxuXHJcblx0XHRpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHxcclxuXHRcdFx0XHR0eXBlb2YgZGF0YSA9PT0gXCJudW1iZXJcIiB8fFxyXG5cdFx0XHRcdHR5cGVvZiBkYXRhID09PSBcImJvb2xlYW5cIikge1xyXG5cdFx0XHRjYWNoZWQgPSBuZXcgZGF0YS5jb25zdHJ1Y3RvcihkYXRhKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FjaGVkID0gZGF0YVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhY2hlZC5ub2RlcyA9IG5vZGVzXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZWF0dGFjaE5vZGVzKFxyXG5cdFx0ZGF0YSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdGluZGV4LFxyXG5cdFx0cGFyZW50VGFnXHJcblx0KSB7XHJcblx0XHR2YXIgbm9kZXMgPSBjYWNoZWQubm9kZXNcclxuXHRcdGlmICghZWRpdGFibGUgfHwgZWRpdGFibGUgIT09ICRkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcblx0XHRcdGlmIChkYXRhLiR0cnVzdGVkKSB7XHJcblx0XHRcdFx0Y2xlYXIobm9kZXMsIGNhY2hlZClcclxuXHRcdFx0XHRub2RlcyA9IGluamVjdEhUTUwocGFyZW50RWxlbWVudCwgaW5kZXgsIGRhdGEpXHJcblx0XHRcdH0gZWxzZSBpZiAocGFyZW50VGFnID09PSBcInRleHRhcmVhXCIpIHtcclxuXHRcdFx0XHQvLyA8dGV4dGFyZWE+IHVzZXMgYHZhbHVlYCBpbnN0ZWFkIG9mIGBub2RlVmFsdWVgLlxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQudmFsdWUgPSBkYXRhXHJcblx0XHRcdH0gZWxzZSBpZiAoZWRpdGFibGUpIHtcclxuXHRcdFx0XHQvLyBjb250ZW50ZWRpdGFibGUgbm9kZXMgdXNlIGBpbm5lckhUTUxgIGluc3RlYWQgb2YgYG5vZGVWYWx1ZWAuXHJcblx0XHRcdFx0ZWRpdGFibGUuaW5uZXJIVE1MID0gZGF0YVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIHdhcyBhIHRydXN0ZWQgc3RyaW5nXHJcblx0XHRcdFx0aWYgKG5vZGVzWzBdLm5vZGVUeXBlID09PSAxIHx8IG5vZGVzLmxlbmd0aCA+IDEgfHxcclxuXHRcdFx0XHRcdFx0KG5vZGVzWzBdLm5vZGVWYWx1ZS50cmltICYmXHJcblx0XHRcdFx0XHRcdFx0IW5vZGVzWzBdLm5vZGVWYWx1ZS50cmltKCkpKSB7XHJcblx0XHRcdFx0XHRjbGVhcihjYWNoZWQubm9kZXMsIGNhY2hlZClcclxuXHRcdFx0XHRcdG5vZGVzID0gWyRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKV1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGluamVjdFRleHROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGVzWzBdLCBpbmRleCwgZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2FjaGVkID0gbmV3IGRhdGEuY29uc3RydWN0b3IoZGF0YSlcclxuXHRcdGNhY2hlZC5ub2RlcyA9IG5vZGVzXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVUZXh0Tm9kZShcclxuXHRcdGNhY2hlZCxcclxuXHRcdGRhdGEsXHJcblx0XHRpbmRleCxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0cGFyZW50VGFnXHJcblx0KSB7XHJcblx0XHRpZiAoIWNhY2hlZC5ub2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGhhbmRsZU5vbmV4aXN0ZW50Tm9kZXMoZGF0YSwgcGFyZW50RWxlbWVudCwgaW5kZXgpXHJcblx0XHR9IGVsc2UgaWYgKGNhY2hlZC52YWx1ZU9mKCkgIT09IGRhdGEudmFsdWVPZigpIHx8IHNob3VsZFJlYXR0YWNoKSB7XHJcblx0XHRcdHJldHVybiByZWF0dGFjaE5vZGVzKGRhdGEsIGNhY2hlZCwgcGFyZW50RWxlbWVudCwgZWRpdGFibGUsIGluZGV4LFxyXG5cdFx0XHRcdHBhcmVudFRhZylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAoY2FjaGVkLm5vZGVzLmludGFjdCA9IHRydWUsIGNhY2hlZClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldFN1YkFycmF5Q291bnQoaXRlbSkge1xyXG5cdFx0aWYgKGl0ZW0uJHRydXN0ZWQpIHtcclxuXHRcdFx0Ly8gZml4IG9mZnNldCBvZiBuZXh0IGVsZW1lbnQgaWYgaXRlbSB3YXMgYSB0cnVzdGVkIHN0cmluZyB3LyBtb3JlXHJcblx0XHRcdC8vIHRoYW4gb25lIGh0bWwgZWxlbWVudFxyXG5cdFx0XHQvLyB0aGUgZmlyc3QgY2xhdXNlIGluIHRoZSByZWdleHAgbWF0Y2hlcyBlbGVtZW50c1xyXG5cdFx0XHQvLyB0aGUgc2Vjb25kIGNsYXVzZSAoYWZ0ZXIgdGhlIHBpcGUpIG1hdGNoZXMgdGV4dCBub2Rlc1xyXG5cdFx0XHR2YXIgbWF0Y2ggPSBpdGVtLm1hdGNoKC88W15cXC9dfFxcPlxccypbXjxdL2cpXHJcblx0XHRcdGlmIChtYXRjaCAhPSBudWxsKSByZXR1cm4gbWF0Y2gubGVuZ3RoXHJcblx0XHR9IGVsc2UgaWYgKGlzQXJyYXkoaXRlbSkpIHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0ubGVuZ3RoXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRBcnJheShcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0aW5kZXgsXHJcblx0XHRwYXJlbnRUYWcsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0ZGF0YSA9IGZsYXR0ZW4oZGF0YSlcclxuXHRcdHZhciBub2RlcyA9IFtdXHJcblx0XHR2YXIgaW50YWN0ID0gY2FjaGVkLmxlbmd0aCA9PT0gZGF0YS5sZW5ndGhcclxuXHRcdHZhciBzdWJBcnJheUNvdW50ID0gMFxyXG5cclxuXHRcdC8vIGtleXMgYWxnb3JpdGhtOiBzb3J0IGVsZW1lbnRzIHdpdGhvdXQgcmVjcmVhdGluZyB0aGVtIGlmIGtleXMgYXJlXHJcblx0XHQvLyBwcmVzZW50XHJcblx0XHQvL1xyXG5cdFx0Ly8gMSkgY3JlYXRlIGEgbWFwIG9mIGFsbCBleGlzdGluZyBrZXlzLCBhbmQgbWFyayBhbGwgZm9yIGRlbGV0aW9uXHJcblx0XHQvLyAyKSBhZGQgbmV3IGtleXMgdG8gbWFwIGFuZCBtYXJrIHRoZW0gZm9yIGFkZGl0aW9uXHJcblx0XHQvLyAzKSBpZiBrZXkgZXhpc3RzIGluIG5ldyBsaXN0LCBjaGFuZ2UgYWN0aW9uIGZyb20gZGVsZXRpb24gdG8gYSBtb3ZlXHJcblx0XHQvLyA0KSBmb3IgZWFjaCBrZXksIGhhbmRsZSBpdHMgY29ycmVzcG9uZGluZyBhY3Rpb24gYXMgbWFya2VkIGluXHJcblx0XHQvLyAgICBwcmV2aW91cyBzdGVwc1xyXG5cclxuXHRcdHZhciBleGlzdGluZyA9IHt9XHJcblx0XHR2YXIgc2hvdWxkTWFpbnRhaW5JZGVudGl0aWVzID0gZmFsc2VcclxuXHJcblx0XHRmb3JLZXlzKGNhY2hlZCwgZnVuY3Rpb24gKGF0dHJzLCBpKSB7XHJcblx0XHRcdHNob3VsZE1haW50YWluSWRlbnRpdGllcyA9IHRydWVcclxuXHRcdFx0ZXhpc3RpbmdbY2FjaGVkW2ldLmF0dHJzLmtleV0gPSB7YWN0aW9uOiBERUxFVElPTiwgaW5kZXg6IGl9XHJcblx0XHR9KVxyXG5cclxuXHRcdGJ1aWxkQXJyYXlLZXlzKGRhdGEpXHJcblx0XHRpZiAoc2hvdWxkTWFpbnRhaW5JZGVudGl0aWVzKSB7XHJcblx0XHRcdGNhY2hlZCA9IGRpZmZLZXlzKGRhdGEsIGNhY2hlZCwgZXhpc3RpbmcsIHBhcmVudEVsZW1lbnQpXHJcblx0XHR9XHJcblx0XHQvLyBlbmQga2V5IGFsZ29yaXRobVxyXG5cclxuXHRcdHZhciBjYWNoZUNvdW50ID0gMFxyXG5cdFx0Ly8gZmFzdGVyIGV4cGxpY2l0bHkgd3JpdHRlblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGRhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0Ly8gZGlmZiBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XHJcblx0XHRcdHZhciBpdGVtID0gYnVpbGQoXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdFx0XHRwYXJlbnRUYWcsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdGRhdGFbaV0sXHJcblx0XHRcdFx0Y2FjaGVkW2NhY2hlQ291bnRdLFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGluZGV4ICsgc3ViQXJyYXlDb3VudCB8fCBzdWJBcnJheUNvdW50LFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cclxuXHRcdFx0aWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGludGFjdCA9IGludGFjdCAmJiBpdGVtLm5vZGVzLmludGFjdFxyXG5cdFx0XHRcdHN1YkFycmF5Q291bnQgKz0gZ2V0U3ViQXJyYXlDb3VudChpdGVtKVxyXG5cdFx0XHRcdGNhY2hlZFtjYWNoZUNvdW50KytdID0gaXRlbVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpbnRhY3QpIGRpZmZBcnJheShkYXRhLCBjYWNoZWQsIG5vZGVzKVxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbWFrZUNhY2hlKGRhdGEsIGNhY2hlZCwgaW5kZXgsIHBhcmVudEluZGV4LCBwYXJlbnRDYWNoZSkge1xyXG5cdFx0aWYgKGNhY2hlZCAhPSBudWxsKSB7XHJcblx0XHRcdGlmICh0eXBlLmNhbGwoY2FjaGVkKSA9PT0gdHlwZS5jYWxsKGRhdGEpKSByZXR1cm4gY2FjaGVkXHJcblxyXG5cdFx0XHRpZiAocGFyZW50Q2FjaGUgJiYgcGFyZW50Q2FjaGUubm9kZXMpIHtcclxuXHRcdFx0XHR2YXIgb2Zmc2V0ID0gaW5kZXggLSBwYXJlbnRJbmRleFxyXG5cdFx0XHRcdHZhciBlbmQgPSBvZmZzZXQgKyAoaXNBcnJheShkYXRhKSA/IGRhdGEgOiBjYWNoZWQubm9kZXMpLmxlbmd0aFxyXG5cdFx0XHRcdGNsZWFyKFxyXG5cdFx0XHRcdFx0cGFyZW50Q2FjaGUubm9kZXMuc2xpY2Uob2Zmc2V0LCBlbmQpLFxyXG5cdFx0XHRcdFx0cGFyZW50Q2FjaGUuc2xpY2Uob2Zmc2V0LCBlbmQpKVxyXG5cdFx0XHR9IGVsc2UgaWYgKGNhY2hlZC5ub2Rlcykge1xyXG5cdFx0XHRcdGNsZWFyKGNhY2hlZC5ub2RlcywgY2FjaGVkKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FjaGVkID0gbmV3IGRhdGEuY29uc3RydWN0b3IoKVxyXG5cdFx0Ly8gaWYgY29uc3RydWN0b3IgY3JlYXRlcyBhIHZpcnR1YWwgZG9tIGVsZW1lbnQsIHVzZSBhIGJsYW5rIG9iamVjdCBhc1xyXG5cdFx0Ly8gdGhlIGJhc2UgY2FjaGVkIG5vZGUgaW5zdGVhZCBvZiBjb3B5aW5nIHRoZSB2aXJ0dWFsIGVsICgjMjc3KVxyXG5cdFx0aWYgKGNhY2hlZC50YWcpIGNhY2hlZCA9IHt9XHJcblx0XHRjYWNoZWQubm9kZXMgPSBbXVxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29uc3RydWN0Tm9kZShkYXRhLCBuYW1lc3BhY2UpIHtcclxuXHRcdGlmIChkYXRhLmF0dHJzLmlzKSB7XHJcblx0XHRcdGlmIChuYW1lc3BhY2UgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnRhZywgZGF0YS5hdHRycy5pcylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIGRhdGEudGFnLFxyXG5cdFx0XHRcdFx0ZGF0YS5hdHRycy5pcylcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChuYW1lc3BhY2UgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZGF0YS50YWcpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIGRhdGEudGFnKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29uc3RydWN0QXR0cnMoZGF0YSwgbm9kZSwgbmFtZXNwYWNlLCBoYXNLZXlzKSB7XHJcblx0XHRpZiAoaGFzS2V5cykge1xyXG5cdFx0XHRyZXR1cm4gc2V0QXR0cmlidXRlcyhub2RlLCBkYXRhLnRhZywgZGF0YS5hdHRycywge30sIG5hbWVzcGFjZSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkYXRhLmF0dHJzXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb25zdHJ1Y3RDaGlsZHJlbihcclxuXHRcdGRhdGEsXHJcblx0XHRub2RlLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHRjb25maWdzXHJcblx0KSB7XHJcblx0XHRpZiAoZGF0YS5jaGlsZHJlbiAhPSBudWxsICYmIGRhdGEuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gYnVpbGQoXHJcblx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRkYXRhLnRhZyxcclxuXHRcdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRcdGRhdGEuY2hpbGRyZW4sXHJcblx0XHRcdFx0Y2FjaGVkLmNoaWxkcmVuLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0MCxcclxuXHRcdFx0XHRkYXRhLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA/IG5vZGUgOiBlZGl0YWJsZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0Y29uZmlncylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkYXRhLmNoaWxkcmVuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZWNvbnN0cnVjdENhY2hlZChcclxuXHRcdGRhdGEsXHJcblx0XHRhdHRycyxcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0bm9kZSxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdHZpZXdzLFxyXG5cdFx0Y29udHJvbGxlcnNcclxuXHQpIHtcclxuXHRcdHZhciBjYWNoZWQgPSB7XHJcblx0XHRcdHRhZzogZGF0YS50YWcsXHJcblx0XHRcdGF0dHJzOiBhdHRycyxcclxuXHRcdFx0Y2hpbGRyZW46IGNoaWxkcmVuLFxyXG5cdFx0XHRub2RlczogW25vZGVdXHJcblx0XHR9XHJcblxyXG5cdFx0dW5sb2FkQ2FjaGVkQ29udHJvbGxlcnMoY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpXHJcblxyXG5cdFx0aWYgKGNhY2hlZC5jaGlsZHJlbiAmJiAhY2FjaGVkLmNoaWxkcmVuLm5vZGVzKSB7XHJcblx0XHRcdGNhY2hlZC5jaGlsZHJlbi5ub2RlcyA9IFtdXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZWRnZSBjYXNlOiBzZXR0aW5nIHZhbHVlIG9uIDxzZWxlY3Q+IGRvZXNuJ3Qgd29yayBiZWZvcmUgY2hpbGRyZW5cclxuXHRcdC8vIGV4aXN0LCBzbyBzZXQgaXQgYWdhaW4gYWZ0ZXIgY2hpbGRyZW4gaGF2ZSBiZWVuIGNyZWF0ZWRcclxuXHRcdGlmIChkYXRhLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBcInZhbHVlXCIgaW4gZGF0YS5hdHRycykge1xyXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKG5vZGUsIGRhdGEudGFnLCB7dmFsdWU6IGRhdGEuYXR0cnMudmFsdWV9LCB7fSxcclxuXHRcdFx0XHRuYW1lc3BhY2UpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0Q29udHJvbGxlcih2aWV3cywgdmlldywgY2FjaGVkQ29udHJvbGxlcnMsIGNvbnRyb2xsZXIpIHtcclxuXHRcdHZhciBjb250cm9sbGVySW5kZXhcclxuXHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJkaWZmXCIgJiYgdmlld3MpIHtcclxuXHRcdFx0Y29udHJvbGxlckluZGV4ID0gdmlld3MuaW5kZXhPZih2aWV3KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29udHJvbGxlckluZGV4ID0gLTFcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29udHJvbGxlckluZGV4ID4gLTEpIHtcclxuXHRcdFx0cmV0dXJuIGNhY2hlZENvbnRyb2xsZXJzW2NvbnRyb2xsZXJJbmRleF1cclxuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihjb250cm9sbGVyKSkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IGNvbnRyb2xsZXIoKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHt9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgdW5sb2FkZXJzID0gW11cclxuXHJcblx0ZnVuY3Rpb24gdXBkYXRlTGlzdHModmlld3MsIGNvbnRyb2xsZXJzLCB2aWV3LCBjb250cm9sbGVyKSB7XHJcblx0XHRpZiAoY29udHJvbGxlci5vbnVubG9hZCAhPSBudWxsICYmIHVubG9hZGVycy5tYXAoZnVuY3Rpb24odSkge3JldHVybiB1LmhhbmRsZXJ9KS5pbmRleE9mKGNvbnRyb2xsZXIub251bmxvYWQpIDwgMCkge1xyXG5cdFx0XHR1bmxvYWRlcnMucHVzaCh7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogY29udHJvbGxlcixcclxuXHRcdFx0XHRoYW5kbGVyOiBjb250cm9sbGVyLm9udW5sb2FkXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0dmlld3MucHVzaCh2aWV3KVxyXG5cdFx0Y29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKVxyXG5cdH1cclxuXHJcblx0dmFyIGZvcmNpbmcgPSBmYWxzZVxyXG5cdGZ1bmN0aW9uIGNoZWNrVmlldyhkYXRhLCB2aWV3LCBjYWNoZWQsIGNhY2hlZENvbnRyb2xsZXJzLCBjb250cm9sbGVycywgdmlld3MpIHtcclxuXHRcdHZhciBjb250cm9sbGVyID0gZ2V0Q29udHJvbGxlcihjYWNoZWQudmlld3MsIHZpZXcsIGNhY2hlZENvbnRyb2xsZXJzLCBkYXRhLmNvbnRyb2xsZXIpXHJcblx0XHR2YXIga2V5ID0gZGF0YSAmJiBkYXRhLmF0dHJzICYmIGRhdGEuYXR0cnMua2V5XHJcblx0XHRkYXRhID0gcGVuZGluZ1JlcXVlc3RzID09PSAwIHx8IGZvcmNpbmcgfHwgY2FjaGVkQ29udHJvbGxlcnMgJiYgY2FjaGVkQ29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSA+IC0xID8gZGF0YS52aWV3KGNvbnRyb2xsZXIpIDoge3RhZzogXCJwbGFjZWhvbGRlclwifVxyXG5cdFx0aWYgKGRhdGEuc3VidHJlZSA9PT0gXCJyZXRhaW5cIikgcmV0dXJuIGRhdGE7XHJcblx0XHRkYXRhLmF0dHJzID0gZGF0YS5hdHRycyB8fCB7fVxyXG5cdFx0ZGF0YS5hdHRycy5rZXkgPSBrZXlcclxuXHRcdHVwZGF0ZUxpc3RzKHZpZXdzLCBjb250cm9sbGVycywgdmlldywgY29udHJvbGxlcilcclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBtYXJrVmlld3MoZGF0YSwgY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpIHtcclxuXHRcdHZhciBjYWNoZWRDb250cm9sbGVycyA9IGNhY2hlZCAmJiBjYWNoZWQuY29udHJvbGxlcnNcclxuXHJcblx0XHR3aGlsZSAoZGF0YS52aWV3ICE9IG51bGwpIHtcclxuXHRcdFx0ZGF0YSA9IGNoZWNrVmlldyhcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGRhdGEudmlldy4kb3JpZ2luYWwgfHwgZGF0YS52aWV3LFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRjYWNoZWRDb250cm9sbGVycyxcclxuXHRcdFx0XHRjb250cm9sbGVycyxcclxuXHRcdFx0XHR2aWV3cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRPYmplY3QoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LXN0YXRlbWVudHNcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRpbmRleCxcclxuXHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0dmFyIHZpZXdzID0gW11cclxuXHRcdHZhciBjb250cm9sbGVycyA9IFtdXHJcblxyXG5cdFx0ZGF0YSA9IG1hcmtWaWV3cyhkYXRhLCBjYWNoZWQsIHZpZXdzLCBjb250cm9sbGVycylcclxuXHJcblx0XHRpZiAoZGF0YS5zdWJ0cmVlID09PSBcInJldGFpblwiKSByZXR1cm4gY2FjaGVkXHJcblxyXG5cdFx0aWYgKCFkYXRhLnRhZyAmJiBjb250cm9sbGVycy5sZW5ndGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ29tcG9uZW50IHRlbXBsYXRlIG11c3QgcmV0dXJuIGEgdmlydHVhbCBcIiArXHJcblx0XHRcdFx0XCJlbGVtZW50LCBub3QgYW4gYXJyYXksIHN0cmluZywgZXRjLlwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGRhdGEuYXR0cnMgPSBkYXRhLmF0dHJzIHx8IHt9XHJcblx0XHRjYWNoZWQuYXR0cnMgPSBjYWNoZWQuYXR0cnMgfHwge31cclxuXHJcblx0XHR2YXIgZGF0YUF0dHJLZXlzID0gT2JqZWN0LmtleXMoZGF0YS5hdHRycylcclxuXHRcdHZhciBoYXNLZXlzID0gZGF0YUF0dHJLZXlzLmxlbmd0aCA+IChcImtleVwiIGluIGRhdGEuYXR0cnMgPyAxIDogMClcclxuXHJcblx0XHRtYXliZVJlY3JlYXRlT2JqZWN0KGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKVxyXG5cclxuXHRcdGlmICghaXNTdHJpbmcoZGF0YS50YWcpKSByZXR1cm5cclxuXHJcblx0XHR2YXIgaXNOZXcgPSBjYWNoZWQubm9kZXMubGVuZ3RoID09PSAwXHJcblxyXG5cdFx0bmFtZXNwYWNlID0gZ2V0T2JqZWN0TmFtZXNwYWNlKGRhdGEsIG5hbWVzcGFjZSlcclxuXHJcblx0XHR2YXIgbm9kZVxyXG5cdFx0aWYgKGlzTmV3KSB7XHJcblx0XHRcdG5vZGUgPSBjb25zdHJ1Y3ROb2RlKGRhdGEsIG5hbWVzcGFjZSlcclxuXHRcdFx0Ly8gc2V0IGF0dHJpYnV0ZXMgZmlyc3QsIHRoZW4gY3JlYXRlIGNoaWxkcmVuXHJcblx0XHRcdHZhciBhdHRycyA9IGNvbnN0cnVjdEF0dHJzKGRhdGEsIG5vZGUsIG5hbWVzcGFjZSwgaGFzS2V5cylcclxuXHJcblx0XHRcdHZhciBjaGlsZHJlbiA9IGNvbnN0cnVjdENoaWxkcmVuKGRhdGEsIG5vZGUsIGNhY2hlZCwgZWRpdGFibGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLCBjb25maWdzKVxyXG5cclxuXHRcdFx0Y2FjaGVkID0gcmVjb25zdHJ1Y3RDYWNoZWQoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRhdHRycyxcclxuXHRcdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0XHRub2RlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHR2aWV3cyxcclxuXHRcdFx0XHRjb250cm9sbGVycylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUgPSBidWlsZFVwZGF0ZWROb2RlKFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdGhhc0tleXMsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdHZpZXdzLFxyXG5cdFx0XHRcdGNvbmZpZ3MsXHJcblx0XHRcdFx0Y29udHJvbGxlcnMpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzTmV3IHx8IHNob3VsZFJlYXR0YWNoID09PSB0cnVlICYmIG5vZGUgIT0gbnVsbCkge1xyXG5cdFx0XHRpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGUsIGluZGV4KVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBjb25maWdzIGFyZSBjYWxsZWQgYWZ0ZXIgYGJ1aWxkYCBmaW5pc2hlcyBydW5uaW5nXHJcblx0XHRzY2hlZHVsZUNvbmZpZ3NUb0JlQ2FsbGVkKGNvbmZpZ3MsIGRhdGEsIG5vZGUsIGlzTmV3LCBjYWNoZWQpXHJcblxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGQoXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0cGFyZW50VGFnLFxyXG5cdFx0cGFyZW50Q2FjaGUsXHJcblx0XHRwYXJlbnRJbmRleCxcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdGluZGV4LFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHRjb25maWdzXHJcblx0KSB7XHJcblx0XHQvKlxyXG5cdFx0ICogYGJ1aWxkYCBpcyBhIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0aGF0IG1hbmFnZXMgY3JlYXRpb24vZGlmZmluZy9yZW1vdmFsXHJcblx0XHQgKiBvZiBET00gZWxlbWVudHMgYmFzZWQgb24gY29tcGFyaXNvbiBiZXR3ZWVuIGBkYXRhYCBhbmQgYGNhY2hlZGAgdGhlXHJcblx0XHQgKiBkaWZmIGFsZ29yaXRobSBjYW4gYmUgc3VtbWFyaXplZCBhcyB0aGlzOlxyXG5cdFx0ICpcclxuXHRcdCAqIDEgLSBjb21wYXJlIGBkYXRhYCBhbmQgYGNhY2hlZGBcclxuXHRcdCAqIDIgLSBpZiB0aGV5IGFyZSBkaWZmZXJlbnQsIGNvcHkgYGRhdGFgIHRvIGBjYWNoZWRgIGFuZCB1cGRhdGUgdGhlIERPTVxyXG5cdFx0ICogICAgIGJhc2VkIG9uIHdoYXQgdGhlIGRpZmZlcmVuY2UgaXNcclxuXHRcdCAqIDMgLSByZWN1cnNpdmVseSBhcHBseSB0aGlzIGFsZ29yaXRobSBmb3IgZXZlcnkgYXJyYXkgYW5kIGZvciB0aGVcclxuXHRcdCAqICAgICBjaGlsZHJlbiBvZiBldmVyeSB2aXJ0dWFsIGVsZW1lbnRcclxuXHRcdCAqXHJcblx0XHQgKiBUaGUgYGNhY2hlZGAgZGF0YSBzdHJ1Y3R1cmUgaXMgZXNzZW50aWFsbHkgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzXHJcblx0XHQgKiByZWRyYXcncyBgZGF0YWAgZGF0YSBzdHJ1Y3R1cmUsIHdpdGggYSBmZXcgYWRkaXRpb25zOlxyXG5cdFx0ICogLSBgY2FjaGVkYCBhbHdheXMgaGFzIGEgcHJvcGVydHkgY2FsbGVkIGBub2Rlc2AsIHdoaWNoIGlzIGEgbGlzdCBvZlxyXG5cdFx0ICogICAgRE9NIGVsZW1lbnRzIHRoYXQgY29ycmVzcG9uZCB0byB0aGUgZGF0YSByZXByZXNlbnRlZCBieSB0aGVcclxuXHRcdCAqICAgIHJlc3BlY3RpdmUgdmlydHVhbCBlbGVtZW50XHJcblx0XHQgKiAtIGluIG9yZGVyIHRvIHN1cHBvcnQgYXR0YWNoaW5nIGBub2Rlc2AgYXMgYSBwcm9wZXJ0eSBvZiBgY2FjaGVkYCxcclxuXHRcdCAqICAgIGBjYWNoZWRgIGlzICphbHdheXMqIGEgbm9uLXByaW1pdGl2ZSBvYmplY3QsIGkuZS4gaWYgdGhlIGRhdGEgd2FzXHJcblx0XHQgKiAgICBhIHN0cmluZywgdGhlbiBjYWNoZWQgaXMgYSBTdHJpbmcgaW5zdGFuY2UuIElmIGRhdGEgd2FzIGBudWxsYCBvclxyXG5cdFx0ICogICAgYHVuZGVmaW5lZGAsIGNhY2hlZCBpcyBgbmV3IFN0cmluZyhcIlwiKWBcclxuXHRcdCAqIC0gYGNhY2hlZCBhbHNvIGhhcyBhIGBjb25maWdDb250ZXh0YCBwcm9wZXJ0eSwgd2hpY2ggaXMgdGhlIHN0YXRlXHJcblx0XHQgKiAgICBzdG9yYWdlIG9iamVjdCBleHBvc2VkIGJ5IGNvbmZpZyhlbGVtZW50LCBpc0luaXRpYWxpemVkLCBjb250ZXh0KVxyXG5cdFx0ICogLSB3aGVuIGBjYWNoZWRgIGlzIGFuIE9iamVjdCwgaXQgcmVwcmVzZW50cyBhIHZpcnR1YWwgZWxlbWVudDsgd2hlblxyXG5cdFx0ICogICAgaXQncyBhbiBBcnJheSwgaXQgcmVwcmVzZW50cyBhIGxpc3Qgb2YgZWxlbWVudHM7IHdoZW4gaXQncyBhXHJcblx0XHQgKiAgICBTdHJpbmcsIE51bWJlciBvciBCb29sZWFuLCBpdCByZXByZXNlbnRzIGEgdGV4dCBub2RlXHJcblx0XHQgKlxyXG5cdFx0ICogYHBhcmVudEVsZW1lbnRgIGlzIGEgRE9NIGVsZW1lbnQgdXNlZCBmb3IgVzNDIERPTSBBUEkgY2FsbHNcclxuXHRcdCAqIGBwYXJlbnRUYWdgIGlzIG9ubHkgdXNlZCBmb3IgaGFuZGxpbmcgYSBjb3JuZXIgY2FzZSBmb3IgdGV4dGFyZWFcclxuXHRcdCAqIHZhbHVlc1xyXG5cdFx0ICogYHBhcmVudENhY2hlYCBpcyB1c2VkIHRvIHJlbW92ZSBub2RlcyBpbiBzb21lIG11bHRpLW5vZGUgY2FzZXNcclxuXHRcdCAqIGBwYXJlbnRJbmRleGAgYW5kIGBpbmRleGAgYXJlIHVzZWQgdG8gZmlndXJlIG91dCB0aGUgb2Zmc2V0IG9mIG5vZGVzLlxyXG5cdFx0ICogVGhleSdyZSBhcnRpZmFjdHMgZnJvbSBiZWZvcmUgYXJyYXlzIHN0YXJ0ZWQgYmVpbmcgZmxhdHRlbmVkIGFuZCBhcmVcclxuXHRcdCAqIGxpa2VseSByZWZhY3RvcmFibGVcclxuXHRcdCAqIGBkYXRhYCBhbmQgYGNhY2hlZGAgYXJlLCByZXNwZWN0aXZlbHksIHRoZSBuZXcgYW5kIG9sZCBub2RlcyBiZWluZ1xyXG5cdFx0ICogZGlmZmVkXHJcblx0XHQgKiBgc2hvdWxkUmVhdHRhY2hgIGlzIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgYSBwYXJlbnQgbm9kZSB3YXNcclxuXHRcdCAqIHJlY3JlYXRlZCAoaWYgc28sIGFuZCBpZiB0aGlzIG5vZGUgaXMgcmV1c2VkLCB0aGVuIHRoaXMgbm9kZSBtdXN0XHJcblx0XHQgKiByZWF0dGFjaCBpdHNlbGYgdG8gdGhlIG5ldyBwYXJlbnQpXHJcblx0XHQgKiBgZWRpdGFibGVgIGlzIGEgZmxhZyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGFuIGFuY2VzdG9yIGlzXHJcblx0XHQgKiBjb250ZW50ZWRpdGFibGVcclxuXHRcdCAqIGBuYW1lc3BhY2VgIGluZGljYXRlcyB0aGUgY2xvc2VzdCBIVE1MIG5hbWVzcGFjZSBhcyBpdCBjYXNjYWRlcyBkb3duXHJcblx0XHQgKiBmcm9tIGFuIGFuY2VzdG9yXHJcblx0XHQgKiBgY29uZmlnc2AgaXMgYSBsaXN0IG9mIGNvbmZpZyBmdW5jdGlvbnMgdG8gcnVuIGFmdGVyIHRoZSB0b3Btb3N0XHJcblx0XHQgKiBgYnVpbGRgIGNhbGwgZmluaXNoZXMgcnVubmluZ1xyXG5cdFx0ICpcclxuXHRcdCAqIHRoZXJlJ3MgbG9naWMgdGhhdCByZWxpZXMgb24gdGhlIGFzc3VtcHRpb24gdGhhdCBudWxsIGFuZCB1bmRlZmluZWRcclxuXHRcdCAqIGRhdGEgYXJlIGVxdWl2YWxlbnQgdG8gZW1wdHkgc3RyaW5nc1xyXG5cdFx0ICogLSB0aGlzIHByZXZlbnRzIGxpZmVjeWNsZSBzdXJwcmlzZXMgZnJvbSBwcm9jZWR1cmFsIGhlbHBlcnMgdGhhdCBtaXhcclxuXHRcdCAqICAgaW1wbGljaXQgYW5kIGV4cGxpY2l0IHJldHVybiBzdGF0ZW1lbnRzIChlLmcuXHJcblx0XHQgKiAgIGZ1bmN0aW9uIGZvbygpIHtpZiAoY29uZCkgcmV0dXJuIG0oXCJkaXZcIil9XHJcblx0XHQgKiAtIGl0IHNpbXBsaWZpZXMgZGlmZmluZyBjb2RlXHJcblx0XHQgKi9cclxuXHRcdGRhdGEgPSBkYXRhVG9TdHJpbmcoZGF0YSlcclxuXHRcdGlmIChkYXRhLnN1YnRyZWUgPT09IFwicmV0YWluXCIpIHJldHVybiBjYWNoZWRcclxuXHRcdGNhY2hlZCA9IG1ha2VDYWNoZShkYXRhLCBjYWNoZWQsIGluZGV4LCBwYXJlbnRJbmRleCwgcGFyZW50Q2FjaGUpXHJcblxyXG5cdFx0aWYgKGlzQXJyYXkoZGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIGJ1aWxkQXJyYXkoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdFx0XHRpbmRleCxcclxuXHRcdFx0XHRwYXJlbnRUYWcsXHJcblx0XHRcdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRcdFx0ZWRpdGFibGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdGNvbmZpZ3MpXHJcblx0XHR9IGVsc2UgaWYgKGRhdGEgIT0gbnVsbCAmJiBpc09iamVjdChkYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gYnVpbGRPYmplY3QoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0ZWRpdGFibGUsXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdFx0XHRpbmRleCxcclxuXHRcdFx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0Y29uZmlncylcclxuXHRcdH0gZWxzZSBpZiAoIWlzRnVuY3Rpb24oZGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIGhhbmRsZVRleHROb2RlKFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRcdFx0ZWRpdGFibGUsXHJcblx0XHRcdFx0cGFyZW50VGFnKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGNhY2hlZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc29ydENoYW5nZXMoYSwgYikge1xyXG5cdFx0cmV0dXJuIGEuYWN0aW9uIC0gYi5hY3Rpb24gfHwgYS5pbmRleCAtIGIuaW5kZXhcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNvcHlTdHlsZUF0dHJzKG5vZGUsIGRhdGFBdHRyLCBjYWNoZWRBdHRyKSB7XHJcblx0XHRmb3IgKHZhciBydWxlIGluIGRhdGFBdHRyKSBpZiAoaGFzT3duLmNhbGwoZGF0YUF0dHIsIHJ1bGUpKSB7XHJcblx0XHRcdGlmIChjYWNoZWRBdHRyID09IG51bGwgfHwgY2FjaGVkQXR0cltydWxlXSAhPT0gZGF0YUF0dHJbcnVsZV0pIHtcclxuXHRcdFx0XHRub2RlLnN0eWxlW3J1bGVdID0gZGF0YUF0dHJbcnVsZV1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAocnVsZSBpbiBjYWNoZWRBdHRyKSBpZiAoaGFzT3duLmNhbGwoY2FjaGVkQXR0ciwgcnVsZSkpIHtcclxuXHRcdFx0aWYgKCFoYXNPd24uY2FsbChkYXRhQXR0ciwgcnVsZSkpIG5vZGUuc3R5bGVbcnVsZV0gPSBcIlwiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgc2hvdWxkVXNlU2V0QXR0cmlidXRlID0ge1xyXG5cdFx0bGlzdDogMSxcclxuXHRcdHN0eWxlOiAxLFxyXG5cdFx0Zm9ybTogMSxcclxuXHRcdHR5cGU6IDEsXHJcblx0XHR3aWR0aDogMSxcclxuXHRcdGhlaWdodDogMVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0U2luZ2xlQXR0cihcclxuXHRcdG5vZGUsXHJcblx0XHRhdHRyTmFtZSxcclxuXHRcdGRhdGFBdHRyLFxyXG5cdFx0Y2FjaGVkQXR0cixcclxuXHRcdHRhZyxcclxuXHRcdG5hbWVzcGFjZVxyXG5cdCkge1xyXG5cdFx0aWYgKGF0dHJOYW1lID09PSBcImNvbmZpZ1wiIHx8IGF0dHJOYW1lID09PSBcImtleVwiKSB7XHJcblx0XHRcdC8vIGBjb25maWdgIGlzbid0IGEgcmVhbCBhdHRyaWJ1dGUsIHNvIGlnbm9yZSBpdFxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGRhdGFBdHRyKSAmJiBhdHRyTmFtZS5zbGljZSgwLCAyKSA9PT0gXCJvblwiKSB7XHJcblx0XHRcdC8vIGhvb2sgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIGF1dG8tcmVkcmF3aW5nIHN5c3RlbVxyXG5cdFx0XHRub2RlW2F0dHJOYW1lXSA9IGF1dG9yZWRyYXcoZGF0YUF0dHIsIG5vZGUpXHJcblx0XHR9IGVsc2UgaWYgKGF0dHJOYW1lID09PSBcInN0eWxlXCIgJiYgZGF0YUF0dHIgIT0gbnVsbCAmJlxyXG5cdFx0XHRcdGlzT2JqZWN0KGRhdGFBdHRyKSkge1xyXG5cdFx0XHQvLyBoYW5kbGUgYHN0eWxlOiB7Li4ufWBcclxuXHRcdFx0Y29weVN0eWxlQXR0cnMobm9kZSwgZGF0YUF0dHIsIGNhY2hlZEF0dHIpXHJcblx0XHR9IGVsc2UgaWYgKG5hbWVzcGFjZSAhPSBudWxsKSB7XHJcblx0XHRcdC8vIGhhbmRsZSBTVkdcclxuXHRcdFx0aWYgKGF0dHJOYW1lID09PSBcImhyZWZcIikge1xyXG5cdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXHJcblx0XHRcdFx0XHRcImhyZWZcIiwgZGF0YUF0dHIpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHRhdHRyTmFtZSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGF0dHJOYW1lLFxyXG5cdFx0XHRcdFx0ZGF0YUF0dHIpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXR0ck5hbWUgaW4gbm9kZSAmJiAhc2hvdWxkVXNlU2V0QXR0cmlidXRlW2F0dHJOYW1lXSkge1xyXG5cdFx0XHQvLyBoYW5kbGUgY2FzZXMgdGhhdCBhcmUgcHJvcGVydGllcyAoYnV0IGlnbm9yZSBjYXNlcyB3aGVyZSB3ZVxyXG5cdFx0XHQvLyBzaG91bGQgdXNlIHNldEF0dHJpYnV0ZSBpbnN0ZWFkKVxyXG5cdFx0XHQvL1xyXG5cdFx0XHQvLyAtIGxpc3QgYW5kIGZvcm0gYXJlIHR5cGljYWxseSB1c2VkIGFzIHN0cmluZ3MsIGJ1dCBhcmUgRE9NXHJcblx0XHRcdC8vICAgZWxlbWVudCByZWZlcmVuY2VzIGluIGpzXHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIC0gd2hlbiB1c2luZyBDU1Mgc2VsZWN0b3JzIChlLmcuIGBtKFwiW3N0eWxlPScnXVwiKWApLCBzdHlsZSBpc1xyXG5cdFx0XHQvLyAgIHVzZWQgYXMgYSBzdHJpbmcsIGJ1dCBpdCdzIGFuIG9iamVjdCBpbiBqc1xyXG5cdFx0XHQvL1xyXG5cdFx0XHQvLyAjMzQ4IGRvbid0IHNldCB0aGUgdmFsdWUgaWYgbm90IG5lZWRlZCAtIG90aGVyd2lzZSwgY3Vyc29yXHJcblx0XHRcdC8vIHBsYWNlbWVudCBicmVha3MgaW4gQ2hyb21lXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKHRhZyAhPT0gXCJpbnB1dFwiIHx8IG5vZGVbYXR0ck5hbWVdICE9PSBkYXRhQXR0cikge1xyXG5cdFx0XHRcdFx0bm9kZVthdHRyTmFtZV0gPSBkYXRhQXR0clxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBkYXRhQXR0cilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgZGF0YUF0dHIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0cnlTZXRBdHRyKFxyXG5cdFx0bm9kZSxcclxuXHRcdGF0dHJOYW1lLFxyXG5cdFx0ZGF0YUF0dHIsXHJcblx0XHRjYWNoZWRBdHRyLFxyXG5cdFx0Y2FjaGVkQXR0cnMsXHJcblx0XHR0YWcsXHJcblx0XHRuYW1lc3BhY2VcclxuXHQpIHtcclxuXHRcdGlmICghKGF0dHJOYW1lIGluIGNhY2hlZEF0dHJzKSB8fCAoY2FjaGVkQXR0ciAhPT0gZGF0YUF0dHIpKSB7XHJcblx0XHRcdGNhY2hlZEF0dHJzW2F0dHJOYW1lXSA9IGRhdGFBdHRyXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIHNldFNpbmdsZUF0dHIoXHJcblx0XHRcdFx0XHRub2RlLFxyXG5cdFx0XHRcdFx0YXR0ck5hbWUsXHJcblx0XHRcdFx0XHRkYXRhQXR0cixcclxuXHRcdFx0XHRcdGNhY2hlZEF0dHIsXHJcblx0XHRcdFx0XHR0YWcsXHJcblx0XHRcdFx0XHRuYW1lc3BhY2UpXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHQvLyBzd2FsbG93IElFJ3MgaW52YWxpZCBhcmd1bWVudCBlcnJvcnMgdG8gbWltaWMgSFRNTCdzXHJcblx0XHRcdFx0Ly8gZmFsbGJhY2stdG8tZG9pbmctbm90aGluZy1vbi1pbnZhbGlkLWF0dHJpYnV0ZXMgYmVoYXZpb3JcclxuXHRcdFx0XHRpZiAoZS5tZXNzYWdlLmluZGV4T2YoXCJJbnZhbGlkIGFyZ3VtZW50XCIpIDwgMCkgdGhyb3cgZVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGF0dHJOYW1lID09PSBcInZhbHVlXCIgJiYgdGFnID09PSBcImlucHV0XCIgJiZcclxuXHRcdFx0XHRub2RlLnZhbHVlICE9PSBkYXRhQXR0cikge1xyXG5cdFx0XHQvLyAjMzQ4IGRhdGFBdHRyIG1heSBub3QgYmUgYSBzdHJpbmcsIHNvIHVzZSBsb29zZSBjb21wYXJpc29uXHJcblx0XHRcdG5vZGUudmFsdWUgPSBkYXRhQXR0clxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhub2RlLCB0YWcsIGRhdGFBdHRycywgY2FjaGVkQXR0cnMsIG5hbWVzcGFjZSkge1xyXG5cdFx0Zm9yICh2YXIgYXR0ck5hbWUgaW4gZGF0YUF0dHJzKSBpZiAoaGFzT3duLmNhbGwoZGF0YUF0dHJzLCBhdHRyTmFtZSkpIHtcclxuXHRcdFx0aWYgKHRyeVNldEF0dHIoXHJcblx0XHRcdFx0XHRub2RlLFxyXG5cdFx0XHRcdFx0YXR0ck5hbWUsXHJcblx0XHRcdFx0XHRkYXRhQXR0cnNbYXR0ck5hbWVdLFxyXG5cdFx0XHRcdFx0Y2FjaGVkQXR0cnNbYXR0ck5hbWVdLFxyXG5cdFx0XHRcdFx0Y2FjaGVkQXR0cnMsXHJcblx0XHRcdFx0XHR0YWcsXHJcblx0XHRcdFx0XHRuYW1lc3BhY2UpKSB7XHJcblx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNhY2hlZEF0dHJzXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjbGVhcihub2RlcywgY2FjaGVkKSB7XHJcblx0XHRmb3IgKHZhciBpID0gbm9kZXMubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcclxuXHRcdFx0aWYgKG5vZGVzW2ldICYmIG5vZGVzW2ldLnBhcmVudE5vZGUpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bm9kZXNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2Rlc1tpXSlcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXHJcblx0XHRcdFx0XHQvLyBpZ25vcmUgaWYgdGhpcyBmYWlscyBkdWUgdG8gb3JkZXIgb2YgZXZlbnRzIChzZWVcclxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjE5MjYwODMvZmFpbGVkLXRvLWV4ZWN1dGUtcmVtb3ZlY2hpbGQtb24tbm9kZSlcclxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWNoZWQgPSBbXS5jb25jYXQoY2FjaGVkKVxyXG5cdFx0XHRcdGlmIChjYWNoZWRbaV0pIHVubG9hZChjYWNoZWRbaV0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIHJlbGVhc2UgbWVtb3J5IGlmIG5vZGVzIGlzIGFuIGFycmF5LiBUaGlzIGNoZWNrIHNob3VsZCBmYWlsIGlmIG5vZGVzXHJcblx0XHQvLyBpcyBhIE5vZGVMaXN0IChzZWUgbG9vcCBhYm92ZSlcclxuXHRcdGlmIChub2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0bm9kZXMubGVuZ3RoID0gMFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdW5sb2FkKGNhY2hlZCkge1xyXG5cdFx0aWYgKGNhY2hlZC5jb25maWdDb250ZXh0ICYmIGlzRnVuY3Rpb24oY2FjaGVkLmNvbmZpZ0NvbnRleHQub251bmxvYWQpKSB7XHJcblx0XHRcdGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKClcclxuXHRcdFx0Y2FjaGVkLmNvbmZpZ0NvbnRleHQub251bmxvYWQgPSBudWxsXHJcblx0XHR9XHJcblx0XHRpZiAoY2FjaGVkLmNvbnRyb2xsZXJzKSB7XHJcblx0XHRcdGZvckVhY2goY2FjaGVkLmNvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xyXG5cdFx0XHRcdGlmIChpc0Z1bmN0aW9uKGNvbnRyb2xsZXIub251bmxvYWQpKSB7XHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkKHtwcmV2ZW50RGVmYXVsdDogbm9vcH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0aWYgKGNhY2hlZC5jaGlsZHJlbikge1xyXG5cdFx0XHRpZiAoaXNBcnJheShjYWNoZWQuY2hpbGRyZW4pKSBmb3JFYWNoKGNhY2hlZC5jaGlsZHJlbiwgdW5sb2FkKVxyXG5cdFx0XHRlbHNlIGlmIChjYWNoZWQuY2hpbGRyZW4udGFnKSB1bmxvYWQoY2FjaGVkLmNoaWxkcmVuKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXBwZW5kVGV4dEZyYWdtZW50KHBhcmVudEVsZW1lbnQsIGRhdGEpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcblx0XHRcdFx0JGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGRhdGEpKVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBkYXRhKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW5qZWN0SFRNTChwYXJlbnRFbGVtZW50LCBpbmRleCwgZGF0YSkge1xyXG5cdFx0dmFyIG5leHRTaWJsaW5nID0gcGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XVxyXG5cdFx0aWYgKG5leHRTaWJsaW5nKSB7XHJcblx0XHRcdHZhciBpc0VsZW1lbnQgPSBuZXh0U2libGluZy5ub2RlVHlwZSAhPT0gMVxyXG5cdFx0XHR2YXIgcGxhY2Vob2xkZXIgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcclxuXHRcdFx0aWYgKGlzRWxlbWVudCkge1xyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBuZXh0U2libGluZyB8fCBudWxsKVxyXG5cdFx0XHRcdHBsYWNlaG9sZGVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGRhdGEpXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChwbGFjZWhvbGRlcilcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRuZXh0U2libGluZy5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmViZWdpblwiLCBkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhcHBlbmRUZXh0RnJhZ21lbnQocGFyZW50RWxlbWVudCwgZGF0YSlcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbm9kZXMgPSBbXVxyXG5cclxuXHRcdHdoaWxlIChwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdICE9PSBuZXh0U2libGluZykge1xyXG5cdFx0XHRub2Rlcy5wdXNoKHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF0pXHJcblx0XHRcdGluZGV4KytcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbm9kZXNcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGF1dG9yZWRyYXcoY2FsbGJhY2ssIG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUgPSBlIHx8IGV2ZW50XHJcblx0XHRcdG0ucmVkcmF3LnN0cmF0ZWd5KFwiZGlmZlwiKVxyXG5cdFx0XHRtLnN0YXJ0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG9iamVjdCwgZSlcclxuXHRcdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0XHRlbmRGaXJzdENvbXB1dGF0aW9uKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGh0bWxcclxuXHR2YXIgZG9jdW1lbnROb2RlID0ge1xyXG5cdFx0YXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRcdGlmIChodG1sID09PSB1bmRlZmluZWQpIGh0bWwgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImh0bWxcIilcclxuXHRcdFx0aWYgKCRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcclxuXHRcdFx0XHRcdCRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgIT09IG5vZGUpIHtcclxuXHRcdFx0XHQkZG9jdW1lbnQucmVwbGFjZUNoaWxkKG5vZGUsICRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGRvY3VtZW50LmFwcGVuZENoaWxkKG5vZGUpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuY2hpbGROb2RlcyA9ICRkb2N1bWVudC5jaGlsZE5vZGVzXHJcblx0XHR9LFxyXG5cclxuXHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0dGhpcy5hcHBlbmRDaGlsZChub2RlKVxyXG5cdFx0fSxcclxuXHJcblx0XHRjaGlsZE5vZGVzOiBbXVxyXG5cdH1cclxuXHJcblx0dmFyIG5vZGVDYWNoZSA9IFtdXHJcblx0dmFyIGNlbGxDYWNoZSA9IHt9XHJcblxyXG5cdG0ucmVuZGVyID0gZnVuY3Rpb24gKHJvb3QsIGNlbGwsIGZvcmNlUmVjcmVhdGlvbikge1xyXG5cdFx0aWYgKCFyb290KSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgcGFzc2VkIHRvIFwiICtcclxuXHRcdFx0XHRcIm0ucm91dGUvbS5tb3VudC9tLnJlbmRlciBpcyBub3QgdW5kZWZpbmVkLlwiKVxyXG5cdFx0fVxyXG5cdFx0dmFyIGNvbmZpZ3MgPSBbXVxyXG5cdFx0dmFyIGlkID0gZ2V0Q2VsbENhY2hlS2V5KHJvb3QpXHJcblx0XHR2YXIgaXNEb2N1bWVudFJvb3QgPSByb290ID09PSAkZG9jdW1lbnRcclxuXHRcdHZhciBub2RlXHJcblxyXG5cdFx0aWYgKGlzRG9jdW1lbnRSb290IHx8IHJvb3QgPT09ICRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcclxuXHRcdFx0bm9kZSA9IGRvY3VtZW50Tm9kZVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bm9kZSA9IHJvb3RcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNEb2N1bWVudFJvb3QgJiYgY2VsbC50YWcgIT09IFwiaHRtbFwiKSB7XHJcblx0XHRcdGNlbGwgPSB7dGFnOiBcImh0bWxcIiwgYXR0cnM6IHt9LCBjaGlsZHJlbjogY2VsbH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2VsbENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSBjbGVhcihub2RlLmNoaWxkTm9kZXMpXHJcblx0XHRpZiAoZm9yY2VSZWNyZWF0aW9uID09PSB0cnVlKSByZXNldChyb290KVxyXG5cclxuXHRcdGNlbGxDYWNoZVtpZF0gPSBidWlsZChcclxuXHRcdFx0bm9kZSxcclxuXHRcdFx0bnVsbCxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdGNlbGwsXHJcblx0XHRcdGNlbGxDYWNoZVtpZF0sXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdGNvbmZpZ3MpXHJcblxyXG5cdFx0Zm9yRWFjaChjb25maWdzLCBmdW5jdGlvbiAoY29uZmlnKSB7IGNvbmZpZygpIH0pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRDZWxsQ2FjaGVLZXkoZWxlbWVudCkge1xyXG5cdFx0dmFyIGluZGV4ID0gbm9kZUNhY2hlLmluZGV4T2YoZWxlbWVudClcclxuXHRcdHJldHVybiBpbmRleCA8IDAgPyBub2RlQ2FjaGUucHVzaChlbGVtZW50KSAtIDEgOiBpbmRleFxyXG5cdH1cclxuXHJcblx0bS50cnVzdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0dmFsdWUgPSBuZXcgU3RyaW5nKHZhbHVlKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xyXG5cdFx0dmFsdWUuJHRydXN0ZWQgPSB0cnVlXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldHRlcnNldHRlcihzdG9yZSkge1xyXG5cdFx0ZnVuY3Rpb24gcHJvcCgpIHtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGgpIHN0b3JlID0gYXJndW1lbnRzWzBdXHJcblx0XHRcdHJldHVybiBzdG9yZVxyXG5cdFx0fVxyXG5cclxuXHRcdHByb3AudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gc3RvcmVcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvcFxyXG5cdH1cclxuXHJcblx0bS5wcm9wID0gZnVuY3Rpb24gKHN0b3JlKSB7XHJcblx0XHRpZiAoKHN0b3JlICE9IG51bGwgJiYgaXNPYmplY3Qoc3RvcmUpIHx8IGlzRnVuY3Rpb24oc3RvcmUpKSAmJlxyXG5cdFx0XHRcdGlzRnVuY3Rpb24oc3RvcmUudGhlbikpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BpZnkoc3RvcmUpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGdldHRlcnNldHRlcihzdG9yZSlcclxuXHR9XHJcblxyXG5cdHZhciByb290cyA9IFtdXHJcblx0dmFyIGNvbXBvbmVudHMgPSBbXVxyXG5cdHZhciBjb250cm9sbGVycyA9IFtdXHJcblx0dmFyIGxhc3RSZWRyYXdJZCA9IG51bGxcclxuXHR2YXIgbGFzdFJlZHJhd0NhbGxUaW1lID0gMFxyXG5cdHZhciBjb21wdXRlUHJlUmVkcmF3SG9vayA9IG51bGxcclxuXHR2YXIgY29tcHV0ZVBvc3RSZWRyYXdIb29rID0gbnVsbFxyXG5cdHZhciB0b3BDb21wb25lbnRcclxuXHR2YXIgRlJBTUVfQlVER0VUID0gMTYgLy8gNjAgZnJhbWVzIHBlciBzZWNvbmQgPSAxIGNhbGwgcGVyIDE2IG1zXHJcblxyXG5cdGZ1bmN0aW9uIHBhcmFtZXRlcml6ZShjb21wb25lbnQsIGFyZ3MpIHtcclxuXHRcdGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XHJcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0XHRyZXR1cm4gKGNvbXBvbmVudC5jb250cm9sbGVyIHx8IG5vb3ApLmFwcGx5KHRoaXMsIGFyZ3MpIHx8IHRoaXNcclxuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29tcG9uZW50LmNvbnRyb2xsZXIpIHtcclxuXHRcdFx0Y29udHJvbGxlci5wcm90b3R5cGUgPSBjb21wb25lbnQuY29udHJvbGxlci5wcm90b3R5cGVcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiB2aWV3KGN0cmwpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRBcmdzID0gW2N0cmxdLmNvbmNhdChhcmdzKVxyXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGN1cnJlbnRBcmdzLnB1c2goYXJndW1lbnRzW2ldKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gY29tcG9uZW50LnZpZXcuYXBwbHkoY29tcG9uZW50LCBjdXJyZW50QXJncylcclxuXHRcdH1cclxuXHJcblx0XHR2aWV3LiRvcmlnaW5hbCA9IGNvbXBvbmVudC52aWV3XHJcblx0XHR2YXIgb3V0cHV0ID0ge2NvbnRyb2xsZXI6IGNvbnRyb2xsZXIsIHZpZXc6IHZpZXd9XHJcblx0XHRpZiAoYXJnc1swXSAmJiBhcmdzWzBdLmtleSAhPSBudWxsKSBvdXRwdXQuYXR0cnMgPSB7a2V5OiBhcmdzWzBdLmtleX1cclxuXHRcdHJldHVybiBvdXRwdXRcclxuXHR9XHJcblxyXG5cdG0uY29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xyXG5cdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuXHJcblx0XHRyZXR1cm4gcGFyYW1ldGVyaXplKGNvbXBvbmVudCwgYXJncylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNoZWNrUHJldmVudGVkKGNvbXBvbmVudCwgcm9vdCwgaW5kZXgsIGlzUHJldmVudGVkKSB7XHJcblx0XHRpZiAoIWlzUHJldmVudGVkKSB7XHJcblx0XHRcdG0ucmVkcmF3LnN0cmF0ZWd5KFwiYWxsXCIpXHJcblx0XHRcdG0uc3RhcnRDb21wdXRhdGlvbigpXHJcblx0XHRcdHJvb3RzW2luZGV4XSA9IHJvb3RcclxuXHRcdFx0dmFyIGN1cnJlbnRDb21wb25lbnRcclxuXHJcblx0XHRcdGlmIChjb21wb25lbnQpIHtcclxuXHRcdFx0XHRjdXJyZW50Q29tcG9uZW50ID0gdG9wQ29tcG9uZW50ID0gY29tcG9uZW50XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y3VycmVudENvbXBvbmVudCA9IHRvcENvbXBvbmVudCA9IGNvbXBvbmVudCA9IHtjb250cm9sbGVyOiBub29wfVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY29udHJvbGxlciA9IG5ldyAoY29tcG9uZW50LmNvbnRyb2xsZXIgfHwgbm9vcCkoKVxyXG5cclxuXHRcdFx0Ly8gY29udHJvbGxlcnMgbWF5IGNhbGwgbS5tb3VudCByZWN1cnNpdmVseSAodmlhIG0ucm91dGUgcmVkaXJlY3RzLFxyXG5cdFx0XHQvLyBmb3IgZXhhbXBsZSlcclxuXHRcdFx0Ly8gdGhpcyBjb25kaXRpb25hbCBlbnN1cmVzIG9ubHkgdGhlIGxhc3QgcmVjdXJzaXZlIG0ubW91bnQgY2FsbCBpc1xyXG5cdFx0XHQvLyBhcHBsaWVkXHJcblx0XHRcdGlmIChjdXJyZW50Q29tcG9uZW50ID09PSB0b3BDb21wb25lbnQpIHtcclxuXHRcdFx0XHRjb250cm9sbGVyc1tpbmRleF0gPSBjb250cm9sbGVyXHJcblx0XHRcdFx0Y29tcG9uZW50c1tpbmRleF0gPSBjb21wb25lbnRcclxuXHRcdFx0fVxyXG5cdFx0XHRlbmRGaXJzdENvbXB1dGF0aW9uKClcclxuXHRcdFx0aWYgKGNvbXBvbmVudCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdHJlbW92ZVJvb3RFbGVtZW50KHJvb3QsIGluZGV4KVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjb250cm9sbGVyc1tpbmRleF1cclxuXHRcdH0gZWxzZSBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcclxuXHRcdFx0cmVtb3ZlUm9vdEVsZW1lbnQocm9vdCwgaW5kZXgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLm1vdW50ID0gbS5tb2R1bGUgPSBmdW5jdGlvbiAocm9vdCwgY29tcG9uZW50KSB7XHJcblx0XHRpZiAoIXJvb3QpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgZXhpc3RzIGJlZm9yZSBcIiArXHJcblx0XHRcdFx0XCJyZW5kZXJpbmcgYSB0ZW1wbGF0ZSBpbnRvIGl0LlwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBpbmRleCA9IHJvb3RzLmluZGV4T2Yocm9vdClcclxuXHRcdGlmIChpbmRleCA8IDApIGluZGV4ID0gcm9vdHMubGVuZ3RoXHJcblxyXG5cdFx0dmFyIGlzUHJldmVudGVkID0gZmFsc2VcclxuXHRcdHZhciBldmVudCA9IHtcclxuXHRcdFx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpc1ByZXZlbnRlZCA9IHRydWVcclxuXHRcdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IGNvbXB1dGVQb3N0UmVkcmF3SG9vayA9IG51bGxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvckVhY2godW5sb2FkZXJzLCBmdW5jdGlvbiAodW5sb2FkZXIpIHtcclxuXHRcdFx0dW5sb2FkZXIuaGFuZGxlci5jYWxsKHVubG9hZGVyLmNvbnRyb2xsZXIsIGV2ZW50KVxyXG5cdFx0XHR1bmxvYWRlci5jb250cm9sbGVyLm9udW5sb2FkID0gbnVsbFxyXG5cdFx0fSlcclxuXHJcblx0XHRpZiAoaXNQcmV2ZW50ZWQpIHtcclxuXHRcdFx0Zm9yRWFjaCh1bmxvYWRlcnMsIGZ1bmN0aW9uICh1bmxvYWRlcikge1xyXG5cdFx0XHRcdHVubG9hZGVyLmNvbnRyb2xsZXIub251bmxvYWQgPSB1bmxvYWRlci5oYW5kbGVyXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR1bmxvYWRlcnMgPSBbXVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb250cm9sbGVyc1tpbmRleF0gJiYgaXNGdW5jdGlvbihjb250cm9sbGVyc1tpbmRleF0ub251bmxvYWQpKSB7XHJcblx0XHRcdGNvbnRyb2xsZXJzW2luZGV4XS5vbnVubG9hZChldmVudClcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2hlY2tQcmV2ZW50ZWQoY29tcG9uZW50LCByb290LCBpbmRleCwgaXNQcmV2ZW50ZWQpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZW1vdmVSb290RWxlbWVudChyb290LCBpbmRleCkge1xyXG5cdFx0cm9vdHMuc3BsaWNlKGluZGV4LCAxKVxyXG5cdFx0Y29udHJvbGxlcnMuc3BsaWNlKGluZGV4LCAxKVxyXG5cdFx0Y29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRyZXNldChyb290KVxyXG5cdFx0bm9kZUNhY2hlLnNwbGljZShnZXRDZWxsQ2FjaGVLZXkocm9vdCksIDEpXHJcblx0fVxyXG5cclxuXHR2YXIgcmVkcmF3aW5nID0gZmFsc2VcclxuXHRtLnJlZHJhdyA9IGZ1bmN0aW9uIChmb3JjZSkge1xyXG5cdFx0aWYgKHJlZHJhd2luZykgcmV0dXJuXHJcblx0XHRyZWRyYXdpbmcgPSB0cnVlXHJcblx0XHRpZiAoZm9yY2UpIGZvcmNpbmcgPSB0cnVlXHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gbGFzdFJlZHJhd0lkIGlzIGEgcG9zaXRpdmUgbnVtYmVyIGlmIGEgc2Vjb25kIHJlZHJhdyBpcyByZXF1ZXN0ZWRcclxuXHRcdFx0Ly8gYmVmb3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxyXG5cdFx0XHQvLyBsYXN0UmVkcmF3SUQgaXMgbnVsbCBpZiBpdCdzIHRoZSBmaXJzdCByZWRyYXcgYW5kIG5vdCBhbiBldmVudFxyXG5cdFx0XHQvLyBoYW5kbGVyXHJcblx0XHRcdGlmIChsYXN0UmVkcmF3SWQgJiYgIWZvcmNlKSB7XHJcblx0XHRcdFx0Ly8gd2hlbiBzZXRUaW1lb3V0OiBvbmx5IHJlc2NoZWR1bGUgcmVkcmF3IGlmIHRpbWUgYmV0d2VlbiBub3dcclxuXHRcdFx0XHQvLyBhbmQgcHJldmlvdXMgcmVkcmF3IGlzIGJpZ2dlciB0aGFuIGEgZnJhbWUsIG90aGVyd2lzZSBrZWVwXHJcblx0XHRcdFx0Ly8gY3VycmVudGx5IHNjaGVkdWxlZCB0aW1lb3V0XHJcblx0XHRcdFx0Ly8gd2hlbiByQUY6IGFsd2F5cyByZXNjaGVkdWxlIHJlZHJhd1xyXG5cdFx0XHRcdGlmICgkcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0XHRcdFx0XHRcdG5ldyBEYXRlKCkgLSBsYXN0UmVkcmF3Q2FsbFRpbWUgPiBGUkFNRV9CVURHRVQpIHtcclxuXHRcdFx0XHRcdGlmIChsYXN0UmVkcmF3SWQgPiAwKSAkY2FuY2VsQW5pbWF0aW9uRnJhbWUobGFzdFJlZHJhd0lkKVxyXG5cdFx0XHRcdFx0bGFzdFJlZHJhd0lkID0gJHJlcXVlc3RBbmltYXRpb25GcmFtZShyZWRyYXcsIEZSQU1FX0JVREdFVClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVkcmF3KClcclxuXHRcdFx0XHRsYXN0UmVkcmF3SWQgPSAkcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGxhc3RSZWRyYXdJZCA9IG51bGxcclxuXHRcdFx0XHR9LCBGUkFNRV9CVURHRVQpXHJcblx0XHRcdH1cclxuXHRcdH0gZmluYWxseSB7XHJcblx0XHRcdHJlZHJhd2luZyA9IGZvcmNpbmcgPSBmYWxzZVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5yZWRyYXcuc3RyYXRlZ3kgPSBtLnByb3AoKVxyXG5cdGZ1bmN0aW9uIHJlZHJhdygpIHtcclxuXHRcdGlmIChjb21wdXRlUHJlUmVkcmF3SG9vaykge1xyXG5cdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vaygpXHJcblx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rID0gbnVsbFxyXG5cdFx0fVxyXG5cdFx0Zm9yRWFjaChyb290cywgZnVuY3Rpb24gKHJvb3QsIGkpIHtcclxuXHRcdFx0dmFyIGNvbXBvbmVudCA9IGNvbXBvbmVudHNbaV1cclxuXHRcdFx0aWYgKGNvbnRyb2xsZXJzW2ldKSB7XHJcblx0XHRcdFx0dmFyIGFyZ3MgPSBbY29udHJvbGxlcnNbaV1dXHJcblx0XHRcdFx0bS5yZW5kZXIocm9vdCxcclxuXHRcdFx0XHRcdGNvbXBvbmVudC52aWV3ID8gY29tcG9uZW50LnZpZXcoY29udHJvbGxlcnNbaV0sIGFyZ3MpIDogXCJcIilcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdC8vIGFmdGVyIHJlbmRlcmluZyB3aXRoaW4gYSByb3V0ZWQgY29udGV4dCwgd2UgbmVlZCB0byBzY3JvbGwgYmFjayB0b1xyXG5cdFx0Ly8gdGhlIHRvcCwgYW5kIGZldGNoIHRoZSBkb2N1bWVudCB0aXRsZSBmb3IgaGlzdG9yeS5wdXNoU3RhdGVcclxuXHRcdGlmIChjb21wdXRlUG9zdFJlZHJhd0hvb2spIHtcclxuXHRcdFx0Y29tcHV0ZVBvc3RSZWRyYXdIb29rKClcclxuXHRcdFx0Y29tcHV0ZVBvc3RSZWRyYXdIb29rID0gbnVsbFxyXG5cdFx0fVxyXG5cdFx0bGFzdFJlZHJhd0lkID0gbnVsbFxyXG5cdFx0bGFzdFJlZHJhd0NhbGxUaW1lID0gbmV3IERhdGUoKVxyXG5cdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJkaWZmXCIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlbmRGaXJzdENvbXB1dGF0aW9uKCkge1xyXG5cdFx0aWYgKG0ucmVkcmF3LnN0cmF0ZWd5KCkgPT09IFwibm9uZVwiKSB7XHJcblx0XHRcdHBlbmRpbmdSZXF1ZXN0cy0tXHJcblx0XHRcdG0ucmVkcmF3LnN0cmF0ZWd5KFwiZGlmZlwiKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bS5lbmRDb21wdXRhdGlvbigpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLndpdGhBdHRyID0gZnVuY3Rpb24gKHByb3AsIHdpdGhBdHRyQ2FsbGJhY2ssIGNhbGxiYWNrVGhpcykge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUgPSBlIHx8IGV2ZW50XHJcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0XHR2YXIgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldCB8fCB0aGlzXHJcblx0XHRcdHZhciBfdGhpcyA9IGNhbGxiYWNrVGhpcyB8fCB0aGlzXHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHRcdHZhciB0YXJnZXQgPSBwcm9wIGluIGN1cnJlbnRUYXJnZXQgP1xyXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXRbcHJvcF0gOlxyXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKHByb3ApXHJcblx0XHRcdHdpdGhBdHRyQ2FsbGJhY2suY2FsbChfdGhpcywgdGFyZ2V0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gcm91dGluZ1xyXG5cdHZhciBtb2RlcyA9IHtwYXRobmFtZTogXCJcIiwgaGFzaDogXCIjXCIsIHNlYXJjaDogXCI/XCJ9XHJcblx0dmFyIHJlZGlyZWN0ID0gbm9vcFxyXG5cdHZhciBpc0RlZmF1bHRSb3V0ZSA9IGZhbHNlXHJcblx0dmFyIHJvdXRlUGFyYW1zLCBjdXJyZW50Um91dGVcclxuXHJcblx0bS5yb3V0ZSA9IGZ1bmN0aW9uIChyb290LCBhcmcxLCBhcmcyLCB2ZG9tKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHRcdC8vIG0ucm91dGUoKVxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBjdXJyZW50Um91dGVcclxuXHRcdC8vIG0ucm91dGUoZWwsIGRlZmF1bHRSb3V0ZSwgcm91dGVzKVxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgaXNTdHJpbmcoYXJnMSkpIHtcclxuXHRcdFx0cmVkaXJlY3QgPSBmdW5jdGlvbiAoc291cmNlKSB7XHJcblx0XHRcdFx0dmFyIHBhdGggPSBjdXJyZW50Um91dGUgPSBub3JtYWxpemVSb3V0ZShzb3VyY2UpXHJcblx0XHRcdFx0aWYgKCFyb3V0ZUJ5VmFsdWUocm9vdCwgYXJnMiwgcGF0aCkpIHtcclxuXHRcdFx0XHRcdGlmIChpc0RlZmF1bHRSb3V0ZSkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIGRlZmF1bHQgcm91dGUgbWF0Y2hlcyBcIiArXHJcblx0XHRcdFx0XHRcdFx0XCJvbmUgb2YgdGhlIHJvdXRlcyBkZWZpbmVkIGluIG0ucm91dGVcIilcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpc0RlZmF1bHRSb3V0ZSA9IHRydWVcclxuXHRcdFx0XHRcdG0ucm91dGUoYXJnMSwgdHJ1ZSlcclxuXHRcdFx0XHRcdGlzRGVmYXVsdFJvdXRlID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBsaXN0ZW5lciA9IG0ucm91dGUubW9kZSA9PT0gXCJoYXNoXCIgP1xyXG5cdFx0XHRcdFwib25oYXNoY2hhbmdlXCIgOlxyXG5cdFx0XHRcdFwib25wb3BzdGF0ZVwiXHJcblxyXG5cdFx0XHRnbG9iYWxbbGlzdGVuZXJdID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBwYXRoID0gJGxvY2F0aW9uW20ucm91dGUubW9kZV1cclxuXHRcdFx0XHRpZiAobS5yb3V0ZS5tb2RlID09PSBcInBhdGhuYW1lXCIpIHBhdGggKz0gJGxvY2F0aW9uLnNlYXJjaFxyXG5cdFx0XHRcdGlmIChjdXJyZW50Um91dGUgIT09IG5vcm1hbGl6ZVJvdXRlKHBhdGgpKSByZWRpcmVjdChwYXRoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IHNldFNjcm9sbFxyXG5cdFx0XHRnbG9iYWxbbGlzdGVuZXJdKClcclxuXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbmZpZzogbS5yb3V0ZVxyXG5cdFx0aWYgKHJvb3QuYWRkRXZlbnRMaXN0ZW5lciB8fCByb290LmF0dGFjaEV2ZW50KSB7XHJcblx0XHRcdHZhciBiYXNlID0gbS5yb3V0ZS5tb2RlICE9PSBcInBhdGhuYW1lXCIgPyAkbG9jYXRpb24ucGF0aG5hbWUgOiBcIlwiXHJcblx0XHRcdHJvb3QuaHJlZiA9IGJhc2UgKyBtb2Rlc1ttLnJvdXRlLm1vZGVdICsgdmRvbS5hdHRycy5ocmVmXHJcblx0XHRcdGlmIChyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHRcdFx0XHRyb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHRcdHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdXRlVW5vYnRydXNpdmUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cm9vdC5kZXRhY2hFdmVudChcIm9uY2xpY2tcIiwgcm91dGVVbm9idHJ1c2l2ZSlcclxuXHRcdFx0XHRyb290LmF0dGFjaEV2ZW50KFwib25jbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdC8vIG0ucm91dGUocm91dGUsIHBhcmFtcywgc2hvdWxkUmVwbGFjZUhpc3RvcnlFbnRyeSlcclxuXHRcdGlmIChpc1N0cmluZyhyb290KSkge1xyXG5cdFx0XHR2YXIgb2xkUm91dGUgPSBjdXJyZW50Um91dGVcclxuXHRcdFx0Y3VycmVudFJvdXRlID0gcm9vdFxyXG5cclxuXHRcdFx0dmFyIGFyZ3MgPSBhcmcxIHx8IHt9XHJcblx0XHRcdHZhciBxdWVyeUluZGV4ID0gY3VycmVudFJvdXRlLmluZGV4T2YoXCI/XCIpXHJcblx0XHRcdHZhciBwYXJhbXNcclxuXHJcblx0XHRcdGlmIChxdWVyeUluZGV4ID4gLTEpIHtcclxuXHRcdFx0XHRwYXJhbXMgPSBwYXJzZVF1ZXJ5U3RyaW5nKGN1cnJlbnRSb3V0ZS5zbGljZShxdWVyeUluZGV4ICsgMSkpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cGFyYW1zID0ge31cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBhcmdzKSBpZiAoaGFzT3duLmNhbGwoYXJncywgaSkpIHtcclxuXHRcdFx0XHRwYXJhbXNbaV0gPSBhcmdzW2ldXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocGFyYW1zKVxyXG5cdFx0XHR2YXIgY3VycmVudFBhdGhcclxuXHJcblx0XHRcdGlmIChxdWVyeUluZGV4ID4gLTEpIHtcclxuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGN1cnJlbnRSb3V0ZS5zbGljZSgwLCBxdWVyeUluZGV4KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGN1cnJlbnRQYXRoID0gY3VycmVudFJvdXRlXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChxdWVyeXN0cmluZykge1xyXG5cdFx0XHRcdGN1cnJlbnRSb3V0ZSA9IGN1cnJlbnRQYXRoICtcclxuXHRcdFx0XHRcdChjdXJyZW50UGF0aC5pbmRleE9mKFwiP1wiKSA9PT0gLTEgPyBcIj9cIiA6IFwiJlwiKSArXHJcblx0XHRcdFx0XHRxdWVyeXN0cmluZ1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVwbGFjZUhpc3RvcnkgPVxyXG5cdFx0XHRcdChhcmd1bWVudHMubGVuZ3RoID09PSAzID8gYXJnMiA6IGFyZzEpID09PSB0cnVlIHx8XHJcblx0XHRcdFx0b2xkUm91dGUgPT09IHJvb3RcclxuXHJcblx0XHRcdGlmIChnbG9iYWwuaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuXHRcdFx0XHR2YXIgbWV0aG9kID0gcmVwbGFjZUhpc3RvcnkgPyBcInJlcGxhY2VTdGF0ZVwiIDogXCJwdXNoU3RhdGVcIlxyXG5cdFx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rID0gc2V0U2Nyb2xsXHJcblx0XHRcdFx0Y29tcHV0ZVBvc3RSZWRyYXdIb29rID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Z2xvYmFsLmhpc3RvcnlbbWV0aG9kXShudWxsLCAkZG9jdW1lbnQudGl0bGUsXHJcblx0XHRcdFx0XHRcdG1vZGVzW20ucm91dGUubW9kZV0gKyBjdXJyZW50Um91dGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlZGlyZWN0KG1vZGVzW20ucm91dGUubW9kZV0gKyBjdXJyZW50Um91dGUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGxvY2F0aW9uW20ucm91dGUubW9kZV0gPSBjdXJyZW50Um91dGVcclxuXHRcdFx0XHRyZWRpcmVjdChtb2Rlc1ttLnJvdXRlLm1vZGVdICsgY3VycmVudFJvdXRlKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLnJvdXRlLnBhcmFtID0gZnVuY3Rpb24gKGtleSkge1xyXG5cdFx0aWYgKCFyb3V0ZVBhcmFtcykge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBjYWxsIG0ucm91dGUoZWxlbWVudCwgZGVmYXVsdFJvdXRlLCBcIiArXHJcblx0XHRcdFx0XCJyb3V0ZXMpIGJlZm9yZSBjYWxsaW5nIG0ucm91dGUucGFyYW0oKVwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgha2V5KSB7XHJcblx0XHRcdHJldHVybiByb3V0ZVBhcmFtc1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByb3V0ZVBhcmFtc1trZXldXHJcblx0fVxyXG5cclxuXHRtLnJvdXRlLm1vZGUgPSBcInNlYXJjaFwiXHJcblxyXG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdXRlKHJvdXRlKSB7XHJcblx0XHRyZXR1cm4gcm91dGUuc2xpY2UobW9kZXNbbS5yb3V0ZS5tb2RlXS5sZW5ndGgpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByb3V0ZUJ5VmFsdWUocm9vdCwgcm91dGVyLCBwYXRoKSB7XHJcblx0XHRyb3V0ZVBhcmFtcyA9IHt9XHJcblxyXG5cdFx0dmFyIHF1ZXJ5U3RhcnQgPSBwYXRoLmluZGV4T2YoXCI/XCIpXHJcblx0XHRpZiAocXVlcnlTdGFydCAhPT0gLTEpIHtcclxuXHRcdFx0cm91dGVQYXJhbXMgPSBwYXJzZVF1ZXJ5U3RyaW5nKFxyXG5cdFx0XHRcdHBhdGguc3Vic3RyKHF1ZXJ5U3RhcnQgKyAxLCBwYXRoLmxlbmd0aCkpXHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cigwLCBxdWVyeVN0YXJ0KVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEdldCBhbGwgcm91dGVzIGFuZCBjaGVjayBpZiB0aGVyZSdzXHJcblx0XHQvLyBhbiBleGFjdCBtYXRjaCBmb3IgdGhlIGN1cnJlbnQgcGF0aFxyXG5cdFx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhyb3V0ZXIpXHJcblx0XHR2YXIgaW5kZXggPSBrZXlzLmluZGV4T2YocGF0aClcclxuXHJcblx0XHRpZiAoaW5kZXggIT09IC0xKXtcclxuXHRcdFx0bS5tb3VudChyb290LCByb3V0ZXJba2V5cyBbaW5kZXhdXSlcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciByb3V0ZSBpbiByb3V0ZXIpIGlmIChoYXNPd24uY2FsbChyb3V0ZXIsIHJvdXRlKSkge1xyXG5cdFx0XHRpZiAocm91dGUgPT09IHBhdGgpIHtcclxuXHRcdFx0XHRtLm1vdW50KHJvb3QsIHJvdXRlcltyb3V0ZV0pXHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiXlwiICsgcm91dGVcclxuXHRcdFx0XHQucmVwbGFjZSgvOlteXFwvXSs/XFwuezN9L2csIFwiKC4qPylcIilcclxuXHRcdFx0XHQucmVwbGFjZSgvOlteXFwvXSsvZywgXCIoW15cXFxcL10rKVwiKSArIFwiXFwvPyRcIilcclxuXHJcblx0XHRcdGlmIChtYXRjaGVyLnRlc3QocGF0aCkpIHtcclxuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0XHRwYXRoLnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dmFyIGtleXMgPSByb3V0ZS5tYXRjaCgvOlteXFwvXSsvZykgfHwgW11cclxuXHRcdFx0XHRcdHZhciB2YWx1ZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSwgLTIpXHJcblx0XHRcdFx0XHRmb3JFYWNoKGtleXMsIGZ1bmN0aW9uIChrZXksIGkpIHtcclxuXHRcdFx0XHRcdFx0cm91dGVQYXJhbXNba2V5LnJlcGxhY2UoLzp8XFwuL2csIFwiXCIpXSA9XHJcblx0XHRcdFx0XHRcdFx0ZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlc1tpXSlcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRtLm1vdW50KHJvb3QsIHJvdXRlcltyb3V0ZV0pXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJvdXRlVW5vYnRydXNpdmUoZSkge1xyXG5cdFx0ZSA9IGUgfHwgZXZlbnRcclxuXHRcdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS53aGljaCA9PT0gMikgcmV0dXJuXHJcblxyXG5cdFx0aWYgKGUucHJldmVudERlZmF1bHQpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlLnJldHVyblZhbHVlID0gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldCB8fCBlLnNyY0VsZW1lbnRcclxuXHRcdHZhciBhcmdzXHJcblxyXG5cdFx0aWYgKG0ucm91dGUubW9kZSA9PT0gXCJwYXRobmFtZVwiICYmIGN1cnJlbnRUYXJnZXQuc2VhcmNoKSB7XHJcblx0XHRcdGFyZ3MgPSBwYXJzZVF1ZXJ5U3RyaW5nKGN1cnJlbnRUYXJnZXQuc2VhcmNoLnNsaWNlKDEpKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YXJncyA9IHt9XHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUgKGN1cnJlbnRUYXJnZXQgJiYgIS9hL2kudGVzdChjdXJyZW50VGFyZ2V0Lm5vZGVOYW1lKSkge1xyXG5cdFx0XHRjdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldC5wYXJlbnROb2RlXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2xlYXIgcGVuZGluZ1JlcXVlc3RzIGJlY2F1c2Ugd2Ugd2FudCBhbiBpbW1lZGlhdGUgcm91dGUgY2hhbmdlXHJcblx0XHRwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0XHRtLnJvdXRlKGN1cnJlbnRUYXJnZXRbbS5yb3V0ZS5tb2RlXVxyXG5cdFx0XHQuc2xpY2UobW9kZXNbbS5yb3V0ZS5tb2RlXS5sZW5ndGgpLCBhcmdzKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2V0U2Nyb2xsKCkge1xyXG5cdFx0aWYgKG0ucm91dGUubW9kZSAhPT0gXCJoYXNoXCIgJiYgJGxvY2F0aW9uLmhhc2gpIHtcclxuXHRcdFx0JGxvY2F0aW9uLmhhc2ggPSAkbG9jYXRpb24uaGFzaFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Z2xvYmFsLnNjcm9sbFRvKDAsIDApXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKG9iamVjdCwgcHJlZml4KSB7XHJcblx0XHR2YXIgZHVwbGljYXRlcyA9IHt9XHJcblx0XHR2YXIgc3RyID0gW11cclxuXHJcblx0XHRmb3IgKHZhciBwcm9wIGluIG9iamVjdCkgaWYgKGhhc093bi5jYWxsKG9iamVjdCwgcHJvcCkpIHtcclxuXHRcdFx0dmFyIGtleSA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcHJvcCArIFwiXVwiIDogcHJvcFxyXG5cdFx0XHR2YXIgdmFsdWUgPSBvYmplY3RbcHJvcF1cclxuXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKVxyXG5cdFx0XHR9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xyXG5cdFx0XHRcdHN0ci5wdXNoKGJ1aWxkUXVlcnlTdHJpbmcodmFsdWUsIGtleSkpXHJcblx0XHRcdH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHR2YXIga2V5cyA9IFtdXHJcblx0XHRcdFx0ZHVwbGljYXRlc1trZXldID0gZHVwbGljYXRlc1trZXldIHx8IHt9XHJcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0XHRpZiAoIWR1cGxpY2F0ZXNba2V5XVtpdGVtXSkge1xyXG5cdFx0XHRcdFx0XHRkdXBsaWNhdGVzW2tleV1baXRlbV0gPSB0cnVlXHJcblx0XHRcdFx0XHRcdGtleXMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICtcclxuXHRcdFx0XHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoaXRlbSkpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRzdHIucHVzaChrZXlzLmpvaW4oXCImXCIpKVxyXG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRzdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiPVwiICtcclxuXHRcdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHIuam9pbihcIiZcIilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcoc3RyKSB7XHJcblx0XHRpZiAoc3RyID09PSBcIlwiIHx8IHN0ciA9PSBudWxsKSByZXR1cm4ge31cclxuXHRcdGlmIChzdHIuY2hhckF0KDApID09PSBcIj9cIikgc3RyID0gc3RyLnNsaWNlKDEpXHJcblxyXG5cdFx0dmFyIHBhaXJzID0gc3RyLnNwbGl0KFwiJlwiKVxyXG5cdFx0dmFyIHBhcmFtcyA9IHt9XHJcblxyXG5cdFx0Zm9yRWFjaChwYWlycywgZnVuY3Rpb24gKHN0cmluZykge1xyXG5cdFx0XHR2YXIgcGFpciA9IHN0cmluZy5zcGxpdChcIj1cIilcclxuXHRcdFx0dmFyIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKVxyXG5cdFx0XHR2YXIgdmFsdWUgPSBwYWlyLmxlbmd0aCA9PT0gMiA/IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKSA6IG51bGxcclxuXHRcdFx0aWYgKHBhcmFtc1trZXldICE9IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoIWlzQXJyYXkocGFyYW1zW2tleV0pKSBwYXJhbXNba2V5XSA9IFtwYXJhbXNba2V5XV1cclxuXHRcdFx0XHRwYXJhbXNba2V5XS5wdXNoKHZhbHVlKVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgcGFyYW1zW2tleV0gPSB2YWx1ZVxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gcGFyYW1zXHJcblx0fVxyXG5cclxuXHRtLnJvdXRlLmJ1aWxkUXVlcnlTdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nXHJcblx0bS5yb3V0ZS5wYXJzZVF1ZXJ5U3RyaW5nID0gcGFyc2VRdWVyeVN0cmluZ1xyXG5cclxuXHRmdW5jdGlvbiByZXNldChyb290KSB7XHJcblx0XHR2YXIgY2FjaGVLZXkgPSBnZXRDZWxsQ2FjaGVLZXkocm9vdClcclxuXHRcdGNsZWFyKHJvb3QuY2hpbGROb2RlcywgY2VsbENhY2hlW2NhY2hlS2V5XSlcclxuXHRcdGNlbGxDYWNoZVtjYWNoZUtleV0gPSB1bmRlZmluZWRcclxuXHR9XHJcblxyXG5cdG0uZGVmZXJyZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKVxyXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSA9IHByb3BpZnkoZGVmZXJyZWQucHJvbWlzZSlcclxuXHRcdHJldHVybiBkZWZlcnJlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcHJvcGlmeShwcm9taXNlLCBpbml0aWFsVmFsdWUpIHtcclxuXHRcdHZhciBwcm9wID0gbS5wcm9wKGluaXRpYWxWYWx1ZSlcclxuXHRcdHByb21pc2UudGhlbihwcm9wKVxyXG5cdFx0cHJvcC50aGVuID0gZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGlmeShwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KSwgaW5pdGlhbFZhbHVlKVxyXG5cdFx0fVxyXG5cclxuXHRcdHByb3AuY2F0Y2ggPSBwcm9wLnRoZW4uYmluZChudWxsLCBudWxsKVxyXG5cdFx0cmV0dXJuIHByb3BcclxuXHR9XHJcblx0Ly8gUHJvbWl6Lm1pdGhyaWwuanMgfCBab2xtZWlzdGVyIHwgTUlUXHJcblx0Ly8gYSBtb2RpZmllZCB2ZXJzaW9uIG9mIFByb21pei5qcywgd2hpY2ggZG9lcyBub3QgY29uZm9ybSB0byBQcm9taXNlcy9BK1xyXG5cdC8vIGZvciB0d28gcmVhc29uczpcclxuXHQvL1xyXG5cdC8vIDEpIGB0aGVuYCBjYWxsYmFja3MgYXJlIGNhbGxlZCBzeW5jaHJvbm91c2x5IChiZWNhdXNlIHNldFRpbWVvdXQgaXMgdG9vXHJcblx0Ly8gICAgc2xvdywgYW5kIHRoZSBzZXRJbW1lZGlhdGUgcG9seWZpbGwgaXMgdG9vIGJpZ1xyXG5cdC8vXHJcblx0Ly8gMikgdGhyb3dpbmcgc3ViY2xhc3NlcyBvZiBFcnJvciBjYXVzZSB0aGUgZXJyb3IgdG8gYmUgYnViYmxlZCB1cCBpbnN0ZWFkXHJcblx0Ly8gICAgb2YgdHJpZ2dlcmluZyByZWplY3Rpb24gKGJlY2F1c2UgdGhlIHNwZWMgZG9lcyBub3QgYWNjb3VudCBmb3IgdGhlXHJcblx0Ly8gICAgaW1wb3J0YW50IHVzZSBjYXNlIG9mIGRlZmF1bHQgYnJvd3NlciBlcnJvciBoYW5kbGluZywgaS5lLiBtZXNzYWdlIHcvXHJcblx0Ly8gICAgbGluZSBudW1iZXIpXHJcblxyXG5cdHZhciBSRVNPTFZJTkcgPSAxXHJcblx0dmFyIFJFSkVDVElORyA9IDJcclxuXHR2YXIgUkVTT0xWRUQgPSAzXHJcblx0dmFyIFJFSkVDVEVEID0gNFxyXG5cclxuXHRmdW5jdGlvbiBEZWZlcnJlZChvblN1Y2Nlc3MsIG9uRmFpbHVyZSkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzXHJcblx0XHR2YXIgc3RhdGUgPSAwXHJcblx0XHR2YXIgcHJvbWlzZVZhbHVlID0gMFxyXG5cdFx0dmFyIG5leHQgPSBbXVxyXG5cclxuXHRcdHNlbGYucHJvbWlzZSA9IHt9XHJcblxyXG5cdFx0c2VsZi5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdGlmICghc3RhdGUpIHtcclxuXHRcdFx0XHRwcm9taXNlVmFsdWUgPSB2YWx1ZVxyXG5cdFx0XHRcdHN0YXRlID0gUkVTT0xWSU5HXHJcblxyXG5cdFx0XHRcdGZpcmUoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VsZlxyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYucmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdGlmICghc3RhdGUpIHtcclxuXHRcdFx0XHRwcm9taXNlVmFsdWUgPSB2YWx1ZVxyXG5cdFx0XHRcdHN0YXRlID0gUkVKRUNUSU5HXHJcblxyXG5cdFx0XHRcdGZpcmUoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gc2VsZlxyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYucHJvbWlzZS50aGVuID0gZnVuY3Rpb24gKG9uU3VjY2Vzcywgb25GYWlsdXJlKSB7XHJcblx0XHRcdHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZChvblN1Y2Nlc3MsIG9uRmFpbHVyZSlcclxuXHJcblx0XHRcdGlmIChzdGF0ZSA9PT0gUkVTT0xWRUQpIHtcclxuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PT0gUkVKRUNURUQpIHtcclxuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5leHQucHVzaChkZWZlcnJlZClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2VcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBmaW5pc2godHlwZSkge1xyXG5cdFx0XHRzdGF0ZSA9IHR5cGUgfHwgUkVKRUNURURcclxuXHRcdFx0bmV4dC5tYXAoZnVuY3Rpb24gKGRlZmVycmVkKSB7XHJcblx0XHRcdFx0aWYgKHN0YXRlID09PSBSRVNPTFZFRCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShwcm9taXNlVmFsdWUpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChwcm9taXNlVmFsdWUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHRoZW5uYWJsZSh0aGVuLCBzdWNjZXNzLCBmYWlsdXJlLCBub3RUaGVubmFibGUpIHtcclxuXHRcdFx0aWYgKCgocHJvbWlzZVZhbHVlICE9IG51bGwgJiYgaXNPYmplY3QocHJvbWlzZVZhbHVlKSkgfHxcclxuXHRcdFx0XHRcdGlzRnVuY3Rpb24ocHJvbWlzZVZhbHVlKSkgJiYgaXNGdW5jdGlvbih0aGVuKSkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvLyBjb3VudCBwcm90ZWN0cyBhZ2FpbnN0IGFidXNlIGNhbGxzIGZyb20gc3BlYyBjaGVja2VyXHJcblx0XHRcdFx0XHR2YXIgY291bnQgPSAwXHJcblx0XHRcdFx0XHR0aGVuLmNhbGwocHJvbWlzZVZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNvdW50KyspIHJldHVyblxyXG5cdFx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSB2YWx1ZVxyXG5cdFx0XHRcdFx0XHRzdWNjZXNzKClcclxuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoY291bnQrKykgcmV0dXJuXHJcblx0XHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0XHRcdGZhaWx1cmUoKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IoZSlcclxuXHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IGVcclxuXHRcdFx0XHRcdGZhaWx1cmUoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub3RUaGVubmFibGUoKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZmlyZSgpIHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgaXQncyBhIHRoZW5hYmxlXHJcblx0XHRcdHZhciB0aGVuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dGhlbiA9IHByb21pc2VWYWx1ZSAmJiBwcm9taXNlVmFsdWUudGhlblxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bS5kZWZlcnJlZC5vbmVycm9yKGUpXHJcblx0XHRcdFx0cHJvbWlzZVZhbHVlID0gZVxyXG5cdFx0XHRcdHN0YXRlID0gUkVKRUNUSU5HXHJcblx0XHRcdFx0cmV0dXJuIGZpcmUoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc3RhdGUgPT09IFJFSkVDVElORykge1xyXG5cdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihwcm9taXNlVmFsdWUpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoZW5uYWJsZSh0aGVuLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBSRVNPTFZJTkdcclxuXHRcdFx0XHRmaXJlKClcclxuXHRcdFx0fSwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHN0YXRlID0gUkVKRUNUSU5HXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0aWYgKHN0YXRlID09PSBSRVNPTFZJTkcgJiYgaXNGdW5jdGlvbihvblN1Y2Nlc3MpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IG9uU3VjY2Vzcyhwcm9taXNlVmFsdWUpXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBSRUpFQ1RJTkcgJiYgaXNGdW5jdGlvbihvbkZhaWx1cmUpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IG9uRmFpbHVyZShwcm9taXNlVmFsdWUpXHJcblx0XHRcdFx0XHRcdHN0YXRlID0gUkVTT0xWSU5HXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0bS5kZWZlcnJlZC5vbmVycm9yKGUpXHJcblx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSBlXHJcblx0XHRcdFx0XHRyZXR1cm4gZmluaXNoKClcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwcm9taXNlVmFsdWUgPT09IHNlbGYpIHtcclxuXHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IFR5cGVFcnJvcigpXHJcblx0XHRcdFx0XHRmaW5pc2goKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGVubmFibGUodGhlbiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRmaW5pc2goUkVTT0xWRUQpXHJcblx0XHRcdFx0XHR9LCBmaW5pc2gsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0ZmluaXNoKHN0YXRlID09PSBSRVNPTFZJTkcgJiYgUkVTT0xWRUQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0uZGVmZXJyZWQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAodHlwZS5jYWxsKGUpID09PSBcIltvYmplY3QgRXJyb3JdXCIgJiZcclxuXHRcdFx0XHQhLyBFcnJvci8udGVzdChlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkpKSB7XHJcblx0XHRcdHBlbmRpbmdSZXF1ZXN0cyA9IDBcclxuXHRcdFx0dGhyb3cgZVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5zeW5jID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdHZhciBkZWZlcnJlZCA9IG0uZGVmZXJyZWQoKVxyXG5cdFx0dmFyIG91dHN0YW5kaW5nID0gYXJncy5sZW5ndGhcclxuXHRcdHZhciByZXN1bHRzID0gbmV3IEFycmF5KG91dHN0YW5kaW5nKVxyXG5cdFx0dmFyIG1ldGhvZCA9IFwicmVzb2x2ZVwiXHJcblxyXG5cdFx0ZnVuY3Rpb24gc3luY2hyb25pemVyKHBvcywgcmVzb2x2ZWQpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdHJlc3VsdHNbcG9zXSA9IHZhbHVlXHJcblx0XHRcdFx0aWYgKCFyZXNvbHZlZCkgbWV0aG9kID0gXCJyZWplY3RcIlxyXG5cdFx0XHRcdGlmICgtLW91dHN0YW5kaW5nID09PSAwKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5wcm9taXNlKHJlc3VsdHMpXHJcblx0XHRcdFx0XHRkZWZlcnJlZFttZXRob2RdKHJlc3VsdHMpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3JFYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcsIGkpIHtcclxuXHRcdFx0XHRhcmcudGhlbihzeW5jaHJvbml6ZXIoaSwgdHJ1ZSksIHN5bmNocm9uaXplcihpLCBmYWxzZSkpXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFtdKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgfVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVKc29ucChvcHRpb25zKSB7XHJcblx0XHR2YXIgY2FsbGJhY2tLZXkgPSBcIm1pdGhyaWxfY2FsbGJhY2tfXCIgK1xyXG5cdFx0XHRuZXcgRGF0ZSgpLmdldFRpbWUoKSArIFwiX1wiICtcclxuXHRcdFx0KE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlMTYpKS50b1N0cmluZygzNilcclxuXHJcblx0XHR2YXIgc2NyaXB0ID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcclxuXHJcblx0XHRnbG9iYWxbY2FsbGJhY2tLZXldID0gZnVuY3Rpb24gKHJlc3ApIHtcclxuXHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxyXG5cdFx0XHRvcHRpb25zLm9ubG9hZCh7XHJcblx0XHRcdFx0dHlwZTogXCJsb2FkXCIsXHJcblx0XHRcdFx0dGFyZ2V0OiB7XHJcblx0XHRcdFx0XHRyZXNwb25zZVRleHQ6IHJlc3BcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdGdsb2JhbFtjYWxsYmFja0tleV0gPSB1bmRlZmluZWRcclxuXHRcdH1cclxuXHJcblx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxyXG5cclxuXHRcdFx0b3B0aW9ucy5vbmVycm9yKHtcclxuXHRcdFx0XHR0eXBlOiBcImVycm9yXCIsXHJcblx0XHRcdFx0dGFyZ2V0OiB7XHJcblx0XHRcdFx0XHRzdGF0dXM6IDUwMCxcclxuXHRcdFx0XHRcdHJlc3BvbnNlVGV4dDogSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdFx0XHRlcnJvcjogXCJFcnJvciBtYWtpbmcganNvbnAgcmVxdWVzdFwiXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Z2xvYmFsW2NhbGxiYWNrS2V5XSA9IHVuZGVmaW5lZFxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0c2NyaXB0LnNyYyA9IG9wdGlvbnMudXJsICtcclxuXHRcdFx0KG9wdGlvbnMudXJsLmluZGV4T2YoXCI/XCIpID4gMCA/IFwiJlwiIDogXCI/XCIpICtcclxuXHRcdFx0KG9wdGlvbnMuY2FsbGJhY2tLZXkgPyBvcHRpb25zLmNhbGxiYWNrS2V5IDogXCJjYWxsYmFja1wiKSArXHJcblx0XHRcdFwiPVwiICsgY2FsbGJhY2tLZXkgK1xyXG5cdFx0XHRcIiZcIiArIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucy5kYXRhIHx8IHt9KVxyXG5cclxuXHRcdCRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNyZWF0ZVhocihvcHRpb25zKSB7XHJcblx0XHR2YXIgeGhyID0gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpXHJcblx0XHR4aHIub3BlbihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIHRydWUsIG9wdGlvbnMudXNlcixcclxuXHRcdFx0b3B0aW9ucy5wYXNzd29yZClcclxuXHJcblx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5vbmxvYWQoe3R5cGU6IFwibG9hZFwiLCB0YXJnZXQ6IHhocn0pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMub25lcnJvcih7dHlwZTogXCJlcnJvclwiLCB0YXJnZXQ6IHhocn0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuc2VyaWFsaXplID09PSBKU09OLnN0cmluZ2lmeSAmJlxyXG5cdFx0XHRcdG9wdGlvbnMuZGF0YSAmJlxyXG5cdFx0XHRcdG9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiKSB7XHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXHJcblx0XHRcdFx0XCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuZGVzZXJpYWxpemUgPT09IEpTT04ucGFyc2UpIHtcclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0LypcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNvbmZpZykpIHtcclxuXHRcdFx0dmFyIG1heWJlWGhyID0gb3B0aW9ucy5jb25maWcoeGhyLCBvcHRpb25zKVxyXG5cdFx0XHRpZiAobWF5YmVYaHIgIT0gbnVsbCkgeGhyID0gbWF5YmVYaHJcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZGF0YSA9IG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiIHx8ICFvcHRpb25zLmRhdGEgPyBcIlwiIDogb3B0aW9ucy5kYXRhXHJcblxyXG5cdFx0aWYgKGRhdGEgJiYgIWlzU3RyaW5nKGRhdGEpICYmIGRhdGEuY29uc3RydWN0b3IgIT09IGdsb2JhbC5Gb3JtRGF0YSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZXF1ZXN0IGRhdGEgc2hvdWxkIGJlIGVpdGhlciBiZSBhIHN0cmluZyBvciBcIiArXHJcblx0XHRcdFx0XCJGb3JtRGF0YS4gQ2hlY2sgdGhlIGBzZXJpYWxpemVgIG9wdGlvbiBpbiBgbS5yZXF1ZXN0YFwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdHhoci5zZW5kKGRhdGEpXHJcblx0XHRyZXR1cm4geGhyXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhamF4KG9wdGlvbnMpIHtcclxuXHRcdGlmIChvcHRpb25zLmRhdGFUeXBlICYmIG9wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJqc29ucFwiKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVKc29ucChvcHRpb25zKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGNyZWF0ZVhocihvcHRpb25zKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYmluZERhdGEob3B0aW9ucywgZGF0YSwgc2VyaWFsaXplKSB7XHJcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIgJiYgb3B0aW9ucy5kYXRhVHlwZSAhPT0gXCJqc29ucFwiKSB7XHJcblx0XHRcdHZhciBwcmVmaXggPSBvcHRpb25zLnVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiXHJcblx0XHRcdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcoZGF0YSlcclxuXHRcdFx0b3B0aW9ucy51cmwgKz0gKHF1ZXJ5c3RyaW5nID8gcHJlZml4ICsgcXVlcnlzdHJpbmcgOiBcIlwiKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gc2VyaWFsaXplKGRhdGEpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYXJhbWV0ZXJpemVVcmwodXJsLCBkYXRhKSB7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgvOlthLXpdXFx3Ky9naSwgZnVuY3Rpb24odG9rZW4pe1xyXG5cdFx0XHRcdHZhciBrZXkgPSB0b2tlbi5zbGljZSgxKVxyXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGRhdGFba2V5XVxyXG5cdFx0XHRcdGRlbGV0ZSBkYXRhW2tleV1cclxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHJldHVybiB1cmxcclxuXHR9XHJcblxyXG5cdG0ucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRpZiAob3B0aW9ucy5iYWNrZ3JvdW5kICE9PSB0cnVlKSBtLnN0YXJ0Q29tcHV0YXRpb24oKVxyXG5cdFx0dmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKClcclxuXHRcdHZhciBpc0pTT05QID0gb3B0aW9ucy5kYXRhVHlwZSAmJlxyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCkgPT09IFwianNvbnBcIlxyXG5cclxuXHRcdHZhciBzZXJpYWxpemUsIGRlc2VyaWFsaXplLCBleHRyYWN0XHJcblxyXG5cdFx0aWYgKGlzSlNPTlApIHtcclxuXHRcdFx0c2VyaWFsaXplID0gb3B0aW9ucy5zZXJpYWxpemUgPVxyXG5cdFx0XHRkZXNlcmlhbGl6ZSA9IG9wdGlvbnMuZGVzZXJpYWxpemUgPSBpZGVudGl0eVxyXG5cclxuXHRcdFx0ZXh0cmFjdCA9IGZ1bmN0aW9uIChqc29ucCkgeyByZXR1cm4ganNvbnAucmVzcG9uc2VUZXh0IH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNlcmlhbGl6ZSA9IG9wdGlvbnMuc2VyaWFsaXplID0gb3B0aW9ucy5zZXJpYWxpemUgfHwgSlNPTi5zdHJpbmdpZnlcclxuXHJcblx0XHRcdGRlc2VyaWFsaXplID0gb3B0aW9ucy5kZXNlcmlhbGl6ZSA9XHJcblx0XHRcdFx0b3B0aW9ucy5kZXNlcmlhbGl6ZSB8fCBKU09OLnBhcnNlXHJcblx0XHRcdGV4dHJhY3QgPSBvcHRpb25zLmV4dHJhY3QgfHwgZnVuY3Rpb24gKHhocikge1xyXG5cdFx0XHRcdGlmICh4aHIucmVzcG9uc2VUZXh0Lmxlbmd0aCB8fCBkZXNlcmlhbGl6ZSAhPT0gSlNPTi5wYXJzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHhoci5yZXNwb25zZVRleHRcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zLm1ldGhvZCA9IChvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiKS50b1VwcGVyQ2FzZSgpXHJcblx0XHRvcHRpb25zLnVybCA9IHBhcmFtZXRlcml6ZVVybChvcHRpb25zLnVybCwgb3B0aW9ucy5kYXRhKVxyXG5cdFx0YmluZERhdGEob3B0aW9ucywgb3B0aW9ucy5kYXRhLCBzZXJpYWxpemUpXHJcblx0XHRvcHRpb25zLm9ubG9hZCA9IG9wdGlvbnMub25lcnJvciA9IGZ1bmN0aW9uIChldikge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGV2ID0gZXYgfHwgZXZlbnRcclxuXHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBkZXNlcmlhbGl6ZShleHRyYWN0KGV2LnRhcmdldCwgb3B0aW9ucykpXHJcblx0XHRcdFx0aWYgKGV2LnR5cGUgPT09IFwibG9hZFwiKSB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9ucy51bndyYXBTdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gb3B0aW9ucy51bndyYXBTdWNjZXNzKHJlc3BvbnNlLCBldi50YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzQXJyYXkocmVzcG9uc2UpICYmIG9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdFx0XHRmb3JFYWNoKHJlc3BvbnNlLCBmdW5jdGlvbiAocmVzLCBpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VbaV0gPSBuZXcgb3B0aW9ucy50eXBlKHJlcylcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IG9wdGlvbnMudHlwZShyZXNwb25zZSlcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9ucy51bndyYXBFcnJvcikge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IG9wdGlvbnMudW53cmFwRXJyb3IocmVzcG9uc2UsIGV2LnRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGUpXHJcblx0XHRcdH0gZmluYWxseSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuYmFja2dyb3VuZCAhPT0gdHJ1ZSkgbS5lbmRDb21wdXRhdGlvbigpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRhamF4KG9wdGlvbnMpXHJcblx0XHRkZWZlcnJlZC5wcm9taXNlID0gcHJvcGlmeShkZWZlcnJlZC5wcm9taXNlLCBvcHRpb25zLmluaXRpYWxWYWx1ZSlcclxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbVxyXG59KVxyXG4iLCJcInVzZSBzdHJpY3RcIjtyZXF1aXJlKFwicG9seXRoZW5lL2Jhc2UtYnV0dG9uL3RoZW1lL3RoZW1lXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZS1idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9W3tcIi5wZS1idXR0b25cIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInVzZXItc2VsZWN0XCI6XCJub25lXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc191c2VyX3NlbGVjdCkse291dGxpbmU6XCJub25lXCIscGFkZGluZzowLFwidGV4dC1kZWNvcmF0aW9uXCI6XCJub25lXCIsXCJ0ZXh0LWFsaWduXCI6XCJjZW50ZXJcIixjdXJzb3I6XCJwb2ludGVyXCIsXCImLnBlLWJ1dHRvbi0tc2VsZWN0ZWQsICYucGUtYnV0dG9uLS1kaXNhYmxlZCwgJi5wZS1idXR0b24tLWluYWN0aXZlXCI6e2N1cnNvcjpcImRlZmF1bHRcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCJ9LFwiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7cG9zaXRpb246XCJyZWxhdGl2ZVwiLFwiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwifSxcIiAucGUtYnV0dG9uX19sYWJlbFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5mb250U21vb3RoaW5nKCkse3Bvc2l0aW9uOlwicmVsYXRpdmVcIixcInotaW5kZXhcIjoxLGRpc3BsYXk6XCJibG9ja1wiLFwiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIn1dLFwiIC5wZS1idXR0b25fX3dhc2hcIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2l0aW9uOlwiYmFja2dyb3VuZC1jb2xvciBcIitfY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2R1cmF0aW9uK1wiIFwiK19jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fY3VydmVfZGVmYXVsdH0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLF9taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHtcInotaW5kZXhcIjoxLFwiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIn1dfV19XTtleHBvcnRzW1wiZGVmYXVsdFwiXT1zdHlsZSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvYmFzZS1idXR0b24vdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtYmFzZS1idXR0b25cIixfbGF5b3V0MltcImRlZmF1bHRcIl0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24ob2JqKXtyZXR1cm4gdHlwZW9mIG9ian06ZnVuY3Rpb24ob2JqKXtyZXR1cm4gb2JqJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJm9iai5jb25zdHJ1Y3Rvcj09PVN5bWJvbD9cInN5bWJvbFwiOnR5cGVvZiBvYmp9O3JlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9wb2x5dGhlbmU9cmVxdWlyZShcInBvbHl0aGVuZS9wb2x5dGhlbmUvcG9seXRoZW5lXCIpLF9wb2x5dGhlbmUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbHl0aGVuZSksX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9yaXBwbGU9cmVxdWlyZShcInBvbHl0aGVuZS9yaXBwbGUvcmlwcGxlXCIpLF9yaXBwbGUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JpcHBsZSksX3NoYWRvdz1yZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy9zaGFkb3dcIiksX3NoYWRvdzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2hhZG93KTtyZXF1aXJlKFwicG9seXRoZW5lL2Jhc2UtYnV0dG9uL2Jhc2UtYnV0dG9uXCIpLHJlcXVpcmUoXCJwb2x5dGhlbmUvYnV0dG9uL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1idXR0b24gcGUtYnV0dG9uLS10ZXh0XCIsY29udGVudDpcInBlLWJ1dHRvbl9fY29udGVudFwiLGxhYmVsOlwicGUtYnV0dG9uX19sYWJlbFwiLHJhaXNlZDpcInBlLWJ1dHRvbi0tcmFpc2VkXCIsd2FzaDpcInBlLWJ1dHRvbl9fd2FzaFwiLHNlbGVjdGVkOlwicGUtYnV0dG9uLS1zZWxlY3RlZFwiLGRpc2FibGVkOlwicGUtYnV0dG9uLS1kaXNhYmxlZFwiLGJvcmRlcnM6XCJwZS1idXR0b24tLWJvcmRlcnNcIixpbmFjdGl2ZTpcInBlLWJ1dHRvbi0taW5hY3RpdmVcIn0sTUFYX1o9NSxzdGFydFR5cGU9d2luZG93LlBvaW50ZXJFdmVudD9cInBvaW50ZXJkb3duXCI6XCJvbnRvdWNoc3RhcnRcImluIHdpbmRvd3x8d2luZG93LkRvY3VtZW50VG91Y2gmJmRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaD9cInRvdWNoc3RhcnRcIjpcIm1vdXNlZG93blwiLGVuZFR5cGU9d2luZG93LlBvaW50ZXJFdmVudD9cInBvaW50ZXJ1cFwiOlwib250b3VjaGVuZFwiaW4gd2luZG93fHx3aW5kb3cuRG9jdW1lbnRUb3VjaCYmZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoP1widG91Y2hlbmRcIjpcIm1vdXNldXBcIix0YXBTdGFydD12b2lkIDAsdGFwRW5kPXZvaWQgMCx0YXBFbmRBbGw9dm9pZCAwLGRvd25CdXR0b25zPVtdLGFuaW1hdGVaPWZ1bmN0aW9uKGN0cmwsb3B0cyxuYW1lKXt2YXIgYmFzZVo9Y3RybC5iYXNlWigpLGluY3JlYXNlPW9wdHMuaW5jcmVhc2V8fDEsej1jdHJsLnooKTtcImRvd25cIj09PW5hbWUmJjUhPT1iYXNlWj8oeis9aW5jcmVhc2Usej1NYXRoLm1pbih6LE1BWF9aKSk6XCJ1cFwiPT09bmFtZSYmKHotPWluY3JlYXNlLHo9TWF0aC5tYXgoeixiYXNlWikpLHohPT1jdHJsLnooKSYmKGN0cmwueih6KSxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpKX0saW5hY3RpdmF0ZT1mdW5jdGlvbihjdHJsLG9wdHMpe2N0cmwuaW5hY3RpdmU9ITAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y3RybC5pbmFjdGl2ZT0hMSxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpfSwxZTMqb3B0cy5pbmFjdGl2YXRlKX0saW5pdFRhcEV2ZW50cz1mdW5jdGlvbihlbCxjdHJsLG9wdHMpe3ZhciB0YXBIYW5kbGVyPWZ1bmN0aW9uKGN0cmwsb3B0cyxuYW1lKXtcImRvd25cIj09PW5hbWU/ZG93bkJ1dHRvbnMucHVzaCh7Y3RybDpjdHJsLG9wdHM6b3B0c30pOlwidXBcIj09PW5hbWUmJm9wdHMuaW5hY3RpdmF0ZSYmIW9wdHMuaW5hY3RpdmUmJmluYWN0aXZhdGUoY3RybCxvcHRzKSxvcHRzLmFuaW1hdGVPblRhcCYmIV9wb2x5dGhlbmUyW1wiZGVmYXVsdFwiXS5pc1RvdWNoJiZhbmltYXRlWihjdHJsLG9wdHMsbmFtZSl9O3RhcFN0YXJ0PWZ1bmN0aW9uKCl7cmV0dXJuIHRhcEhhbmRsZXIoY3RybCxvcHRzLFwiZG93blwiKX0sdGFwRW5kPWZ1bmN0aW9uKCl7cmV0dXJuIHRhcEhhbmRsZXIoY3RybCxvcHRzLFwidXBcIil9LHRhcEVuZEFsbD1mdW5jdGlvbigpe2Rvd25CdXR0b25zLm1hcChmdW5jdGlvbihidG4pe3RhcEhhbmRsZXIoYnRuLmN0cmwsYnRuLm9wdHMsXCJ1cFwiKX0pLGRvd25CdXR0b25zPVtdfSxlbC5hZGRFdmVudExpc3RlbmVyKHN0YXJ0VHlwZSx0YXBTdGFydCksZWwuYWRkRXZlbnRMaXN0ZW5lcihlbmRUeXBlLHRhcEVuZCksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZW5kVHlwZSx0YXBFbmRBbGwpfSxjbGVhclRhcEV2ZW50cz1mdW5jdGlvbihlbCl7ZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihzdGFydFR5cGUsdGFwU3RhcnQpLGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZW5kVHlwZSx0YXBFbmQpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGVuZFR5cGUsdGFwRW5kQWxsKX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLG5vaW5rPXZvaWQgMCE9PW9wdHMuaW5rJiYhb3B0cy5pbmssZGlzYWJsZWQ9b3B0cy5kaXNhYmxlZCxpbmFjdGl2ZT1jdHJsLmluYWN0aXZlLHRhZz1vcHRzLnRhZ3x8XCJhXCIsYnV0dG9uQ29uZmlnPWZ1bmN0aW9uKGVsLGlzSW5pdGVkLGNvbnRleHQpe2lzSW5pdGVkfHxkaXNhYmxlZHx8aW5hY3RpdmV8fChpbml0VGFwRXZlbnRzKGVsLGN0cmwsT2JqZWN0LmFzc2lnbih7fSxvcHRzLHthbmltYXRlT25UYXA6b3B0cy5hbmltYXRlT25UYXAhPT0hMX0pKSxjb250ZXh0Lm9udW5sb2FkPWZ1bmN0aW9uKCl7Y2xlYXJUYXBFdmVudHMoZWwpfSl9LG9wdHNDb25maWc9b3B0cy5jb25maWd8fGZ1bmN0aW9uKCl7fSx1cmxDb25maWc9b3B0cy51cmwmJm9wdHMudXJsLmNvbmZpZz9vcHRzLnVybC5jb25maWc6ZnVuY3Rpb24oKXt9LHByb3BzPU9iamVjdC5hc3NpZ24oe30se1wiY2xhc3NcIjpbb3B0cy5wYXJlbnRDbGFzc3x8Q1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5zZWxlY3RlZD9DU1NfQ0xBU1NFUy5zZWxlY3RlZDpudWxsLGRpc2FibGVkP0NTU19DTEFTU0VTLmRpc2FibGVkOm51bGwsaW5hY3RpdmU/Q1NTX0NMQVNTRVMuaW5hY3RpdmU6bnVsbCxvcHRzLmJvcmRlcnM/Q1NTX0NMQVNTRVMuYm9yZGVyczpudWxsLG9wdHMucmFpc2VkP0NTU19DTEFTU0VTLnJhaXNlZDpudWxsLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIn0sb3B0cy51cmw/b3B0cy51cmw6bnVsbCxvcHRzLmZvcm1hY3Rpb24/e2Zvcm1hY3Rpb246b3B0cy5mb3JtYWN0aW9ufTpudWxsLG9wdHMudHlwZT97dHlwZTpvcHRzLnR5cGV9Om51bGwsb3B0cy5ldmVudHM/b3B0cy5ldmVudHM6bnVsbCx7Y29uZmlnOmZ1bmN0aW9uKCl7cmV0dXJuW2J1dHRvbkNvbmZpZy5hcHBseSh2b2lkIDAsYXJndW1lbnRzKSxvcHRzQ29uZmlnLmFwcGx5KHZvaWQgMCxhcmd1bWVudHMpLHVybENvbmZpZy5hcHBseSh2b2lkIDAsYXJndW1lbnRzKV19fSxkaXNhYmxlZD97ZGlzYWJsZWQ6ITB9Om51bGwpLGxhYmVsPW9wdHMuY29udGVudD9vcHRzLmNvbnRlbnQ6b3B0cy5sYWJlbD9cIm9iamVjdFwiPT09X3R5cGVvZihvcHRzLmxhYmVsKT9vcHRzLmxhYmVsOih7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5sYWJlbCB9LCBjaGlsZHJlbjogWyBvcHRzLmxhYmVsIF0gfSk6bnVsbCxjb250ZW50PSh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50IH0sIGNoaWxkcmVuOiBbIG9wdHMucmFpc2VkJiYhZGlzYWJsZWQ/X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3NoYWRvdzJbXCJkZWZhdWx0XCJdLHt6OmN0cmwueigpLGFuaW1hdGVkOiEwfSk6bnVsbCxkaXNhYmxlZHx8bm9pbms/bnVsbDpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfcmlwcGxlMltcImRlZmF1bHRcIl0sb3B0cy5yaXBwbGV8fHt9KSxkaXNhYmxlZHx8dm9pZCAwIT09b3B0cy53YXNoJiYhb3B0cy53YXNoP251bGw6KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLndhc2ggfSwgY2hpbGRyZW46IFtdIH0pLGxhYmVsIF0gfSk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXtjb250cm9sbGVyOmZ1bmN0aW9uKCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSx6PXZvaWQgMCE9PW9wdHMuej9vcHRzLno6MTtyZXR1cm57YmFzZVo6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKHopLHo6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKHopLGluYWN0aXZlOm9wdHMuaW5hY3RpdmV8fCExfX0sdmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQsdHlwZSl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTN8fHZvaWQgMD09PWFyZ3VtZW50c1szXT9cIlwiOmFyZ3VtZW50c1szXSxub3JtYWxCb3JkZXI9Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX25vcm1hbF9ib3JkZXJcIl18fFwidHJhbnNwYXJlbnRcIixhY3RpdmVCb3JkZXI9Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2FjdGl2ZV9ib3JkZXJcIl18fG5vcm1hbEJvcmRlcixkaXNhYmxlZEJvcmRlcj1jb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfZGlzYWJsZWRfYm9yZGVyXCJdfHxub3JtYWxCb3JkZXI7cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1idXR0b25cIix7XCImLCAmOmxpbmssICY6dmlzaXRlZFwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfbm9ybWFsX3RleHRcIl19LFwiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX25vcm1hbF9iYWNrZ3JvdW5kXCJdLFwiYm9yZGVyLWNvbG9yXCI6bm9ybWFsQm9yZGVyfSxcIiYucGUtYnV0dG9uLS1kaXNhYmxlZFwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfZGlzYWJsZWRfdGV4dFwiXSxcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9kaXNhYmxlZF9iYWNrZ3JvdW5kXCJdLFwiYm9yZGVyLWNvbG9yXCI6ZGlzYWJsZWRCb3JkZXJ9fSxcIiYucGUtYnV0dG9uLS1zZWxlY3RlZFwiOntcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9hY3RpdmVfYmFja2dyb3VuZFwiXSxcImJvcmRlci1jb2xvclwiOmFjdGl2ZUJvcmRlcn0sXCIgLnBlLWJ1dHRvbl9fd2FzaFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfaG92ZXJfYmFja2dyb3VuZFwiXX19LFwiJjphY3RpdmVcIjp7XCIgLnBlLWJ1dHRvbl9fd2FzaFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfaG92ZXJfYmFja2dyb3VuZFwiXX19fSldfSxub1RvdWNoPWZ1bmN0aW9uKGNvbmZpZyx0aW50LHR5cGUpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0zfHx2b2lkIDA9PT1hcmd1bWVudHNbM10/XCJcIjphcmd1bWVudHNbM10sbm9ybWFsQm9yZGVyPWNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ub3JtYWxfYm9yZGVyXCJdLGhvdmVyQm9yZGVyPWNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ub3JtYWxfYm9yZGVyXCJdfHxub3JtYWxCb3JkZXI7cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1idXR0b246aG92ZXJcIix7XCImOm5vdCgucGUtYnV0dG9uLS1zZWxlY3RlZCkgLnBlLWJ1dHRvbl9fd2FzaFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfaG92ZXJfYmFja2dyb3VuZFwiXSxcImJvcmRlci1jb2xvclwiOmhvdmVyQm9yZGVyfX0pXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIsXCJmbGF0XCIpLHN0eWxlKGNvbmZpZyxcImxpZ2h0XCIsXCJyYWlzZWRcIixcIi5wZS1idXR0b24tLXJhaXNlZFwiKSx7XCJodG1sLnBlLW5vLXRvdWNoXCI6W25vVG91Y2goY29uZmlnLFwibGlnaHRcIixcImZsYXRcIixcIiBcIiksbm9Ub3VjaChjb25maWcsXCJsaWdodFwiLFwicmFpc2VkXCIsXCIgLnBlLWJ1dHRvbi0tcmFpc2VkXCIpXX0se1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiZmxhdFwiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCJyYWlzZWRcIixcIiAucGUtYnV0dG9uLS1yYWlzZWRcIildfSx7XCJodG1sLnBlLW5vLXRvdWNoIC5wZS1kYXJrLXRoZW1lXCI6W25vVG91Y2goY29uZmlnLFwiZGFya1wiLFwiZmxhdFwiLFwiIFwiKSxub1RvdWNoKGNvbmZpZyxcImRhcmtcIixcInJhaXNlZFwiLFwiIC5wZS1idXR0b24tLXJhaXNlZFwiKV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZykscmdiYT1fY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYSx0b3VjaF9oZWlnaHQ9X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfdG91Y2hfaGVpZ2h0LGhlaWdodD0zNjtleHBvcnRzW1wiZGVmYXVsdFwiXT17bWFyZ2luX2g6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdCxib3JkZXJfcmFkaXVzOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2l0ZW1fYm9yZGVyX3JhZGl1cyxmb250X3NpemU6MTQsZm9udF93ZWlnaHQ6NTAwLG91dGVyX3BhZGRpbmdfdjoodG91Y2hfaGVpZ2h0LWhlaWdodCkvMixwYWRkaW5nX2g6MipfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0LHBhZGRpbmdfdjoxMSxtaW5fd2lkdGg6OCpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCx0ZXh0X3RyYW5zZm9ybTpcInVwcGVyY2FzZVwiLGJvcmRlcl93aWR0aDowLGNvbG9yX2xpZ2h0X2ZsYXRfbm9ybWFsX2JhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGNvbG9yX2xpZ2h0X2ZsYXRfbm9ybWFsX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5KSxjb2xvcl9saWdodF9mbGF0X2hvdmVyX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfbGlnaHRfZmxhdF9hY3RpdmVfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2FjdGl2ZSksY29sb3JfbGlnaHRfZmxhdF9kaXNhYmxlZF9iYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixjb2xvcl9saWdodF9mbGF0X2Rpc2FibGVkX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9kaXNhYmxlZCksY29sb3JfbGlnaHRfcmFpc2VkX25vcm1hbF9iYWNrZ3JvdW5kOlwiI0UwRTBFMFwiLGNvbG9yX2xpZ2h0X3JhaXNlZF9ub3JtYWxfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3ByaW1hcnkpLGNvbG9yX2xpZ2h0X3JhaXNlZF9ob3Zlcl9iYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixjb2xvcl9saWdodF9yYWlzZWRfYWN0aXZlX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfbGlnaHRfcmFpc2VkX2Rpc2FibGVkX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9kaXNhYmxlZCksY29sb3JfbGlnaHRfcmFpc2VkX2Rpc2FibGVkX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9kaXNhYmxlZCksY29sb3JfZGFya19mbGF0X25vcm1hbF9iYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixjb2xvcl9kYXJrX2ZsYXRfbm9ybWFsX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcHJpbWFyeSksY29sb3JfZGFya19mbGF0X2hvdmVyX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2RhcmtfZmxhdF9hY3RpdmVfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYmFja2dyb3VuZF9hY3RpdmUpLGNvbG9yX2RhcmtfZmxhdF9kaXNhYmxlZF9iYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixjb2xvcl9kYXJrX2ZsYXRfZGlzYWJsZWRfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9kaXNhYmxlZCksY29sb3JfZGFya19yYWlzZWRfbm9ybWFsX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfcHJpbWFyeSksY29sb3JfZGFya19yYWlzZWRfbm9ybWFsX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcHJpbWFyeSksY29sb3JfZGFya19yYWlzZWRfaG92ZXJfYmFja2dyb3VuZDpfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfcHJpbWFyeV9hY3RpdmUsY29sb3JfZGFya19yYWlzZWRfYWN0aXZlX2JhY2tncm91bmQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX3ByaW1hcnlfZGFyayxjb2xvcl9kYXJrX3JhaXNlZF9kaXNhYmxlZF9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19iYWNrZ3JvdW5kX2Rpc2FibGVkKSxjb2xvcl9kYXJrX3JhaXNlZF9kaXNhYmxlZF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X2Rpc2FibGVkKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtYnV0dG9uLS10ZXh0XCI6e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixcIm1pbi13aWR0aFwiOmNvbmZpZy5taW5fd2lkdGgrXCJweFwiLG1hcmdpbjpcIjAgXCIrY29uZmlnLm1hcmdpbl9oK1wicHhcIixwYWRkaW5nOmNvbmZpZy5vdXRlcl9wYWRkaW5nX3YrXCJweCAwXCIsYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsYm9yZGVyOlwibm9uZVwiLFwiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7XCJib3JkZXItd2lkdGhcIjowLHBhZGRpbmc6XCIwIFwiK2NvbmZpZy5wYWRkaW5nX2grXCJweFwiLFwiYm9yZGVyLXJhZGl1c1wiOmNvbmZpZy5ib3JkZXJfcmFkaXVzK1wicHhcIn0sXCIgLnBlLWJ1dHRvbl9fbGFiZWxcIjp7cGFkZGluZzpjb25maWcucGFkZGluZ192K1wicHggMFwiLFwiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZStcInB4XCIsXCJsaW5lLWhlaWdodFwiOmNvbmZpZy5mb250X3NpemUrXCJweFwiLFwiZm9udC13ZWlnaHRcIjpjb25maWcuZm9udF93ZWlnaHQsXCJ0ZXh0LXRyYW5zZm9ybVwiOmNvbmZpZy50ZXh0X3RyYW5zZm9ybSxcIndoaXRlLXNwYWNlXCI6XCJwcmVcIn0sXCImLnBlLWJ1dHRvbi0tYm9yZGVyc1wiOntcIiAucGUtYnV0dG9uX193YXNoXCI6X21peGluMltcImRlZmF1bHRcIl0uZml0KC0xKSxcIiAucGUtcmlwcGxlXCI6X21peGluMltcImRlZmF1bHRcIl0uZml0KC0xKSxcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e1wiYm9yZGVyLXN0eWxlXCI6XCJzb2xpZFwiLFwiYm9yZGVyLXdpZHRoXCI6XCIxcHhcIn0sXCIgLnBlLWJ1dHRvbl9fbGFiZWxcIjp7cGFkZGluZzpjb25maWcucGFkZGluZ192LTErXCJweCAwXCJ9fX19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2J1dHRvbi90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS9idXR0b24vdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0uYnV0dG9uLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtYnV0dG9uLXRleHRcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGxpc3RlbmVycz17fSx0aHJvdHRsZT1mdW5jdGlvbihmdW5jKXt2YXIgcz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/LjA1OmFyZ3VtZW50c1sxXSxjb250ZXh0PWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT93aW5kb3c6YXJndW1lbnRzWzJdLHdhaXQ9ITE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBfbGVuPWFyZ3VtZW50cy5sZW5ndGgsYXJncz1BcnJheShfbGVuKSxfa2V5PTA7X2xlbj5fa2V5O19rZXkrKylhcmdzW19rZXldPWFyZ3VtZW50c1tfa2V5XTt2YXIgbGF0ZXI9ZnVuY3Rpb24oKXtmdW5jLmFwcGx5KGNvbnRleHQsYXJncyl9O3dhaXR8fChsYXRlcigpLHdhaXQ9ITAsc2V0VGltZW91dChmdW5jdGlvbigpe3dhaXQ9ITF9LHMpKX19LHN1YnNjcmliZT1mdW5jdGlvbihldmVudE5hbWUsbGlzdGVuZXIsZGVsYXkpe2xpc3RlbmVyc1tldmVudE5hbWVdPWxpc3RlbmVyc1tldmVudE5hbWVdfHxbXSxsaXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGRlbGF5P3Rocm90dGxlKGxpc3RlbmVyLGRlbGF5KTpsaXN0ZW5lcil9LHVuc3Vic2NyaWJlPWZ1bmN0aW9uKGV2ZW50TmFtZSxsaXN0ZW5lcil7aWYobGlzdGVuZXJzW2V2ZW50TmFtZV0pe3ZhciBpbmRleD1saXN0ZW5lcnNbZXZlbnROYW1lXS5pbmRleE9mKGxpc3RlbmVyKTtpbmRleD4tMSYmbGlzdGVuZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LDEpfX0sZW1pdD1mdW5jdGlvbihldmVudE5hbWUsZXZlbnQpe2xpc3RlbmVyc1tldmVudE5hbWVdJiZsaXN0ZW5lcnNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKXtsaXN0ZW5lcihldmVudCl9KX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbihlKXtyZXR1cm4gZW1pdChcInJlc2l6ZVwiLGUpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixmdW5jdGlvbihlKXtyZXR1cm4gZW1pdChcInNjcm9sbFwiLGUpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZnVuY3Rpb24oZSl7cmV0dXJuIGVtaXQoXCJrZXlkb3duXCIsZSl9KSxleHBvcnRzW1wiZGVmYXVsdFwiXT17dGhyb3R0bGU6dGhyb3R0bGUsc3Vic2NyaWJlOnN1YnNjcmliZSx1bnN1YnNjcmliZTp1bnN1YnNjcmliZSxlbWl0OmVtaXR9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKTtyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciB2ZW5kb3JpemU9ZnVuY3Rpb24od2hhdCxwcmVmaXhlcyl7dmFyIHZlbmRvcnNTZWw9cHJlZml4ZXMubWFwKGZ1bmN0aW9uKHYpe3JldHVyblwiX1wiK3YrXCIkXCJ9KS5qb2luKFwiXCIpO3JldHVybiBfZGVmaW5lUHJvcGVydHkoe30sdmVuZG9yc1NlbCx3aGF0KX0sZml0PWZ1bmN0aW9uKCl7dmFyIG9mZnNldD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/MDphcmd1bWVudHNbMF0sb2Zmc2V0UHg9b2Zmc2V0K1wicHhcIjtyZXR1cm57cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDpvZmZzZXRQeCxyaWdodDpvZmZzZXRQeCxib3R0b206b2Zmc2V0UHgsbGVmdDpvZmZzZXRQeH19LGZvbnRTbW9vdGhpbmc9ZnVuY3Rpb24oKXt2YXIgc21vb3RoaW5nPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT8hMDphcmd1bWVudHNbMF07cmV0dXJuIHNtb290aGluZz97XCItd2Via2l0LWZvbnQtc21vb3RoaW5nXCI6XCJhbnRpYWxpYXNlZFwiLFwiLW1vei1vc3gtZm9udC1zbW9vdGhpbmdcIjpcImdyYXlzY2FsZVwifTp7XCItd2Via2l0LWZvbnQtc21vb3RoaW5nXCI6XCJzdWJwaXhlbC1hbnRpYWxpYXNlZFwiLFwiLW1vei1vc3gtZm9udC1zbW9vdGhpbmdcIjpcImF1dG9cIn19LGVsbGlwc2lzPWZ1bmN0aW9uKGxpbmVzLGxpbmVIZWlnaHQpe3JldHVyblwibm9uZVwiPT09bGluZXM/e1widGV4dC1vdmVyZmxvd1wiOlwiaW5pdGlhbFwiLG92ZXJmbG93OlwiaW5pdGlhbFwiLFwid2hpdGUtc3BhY2VcIjpcImluaXRpYWxcIixkaXNwbGF5OlwiYmxvY2tcIixoZWlnaHQ6XCJhdXRvXCJ9Ok9iamVjdC5hc3NpZ24oe292ZXJmbG93OlwiaGlkZGVuXCIsXCJ3aGl0ZS1zcGFjZVwiOlwibm93cmFwXCIsXCJ0ZXh0LW92ZXJmbG93XCI6XCJlbGxpcHNpc1wiLFwidGV4dC1yZW5kZXJpbmdcIjpcImF1dG9cIn0sdm9pZCAwIT09bGluZXM/e1wiLXdlYmtpdC1saW5lLWNsYW1wXCI6bGluZXMsXCItd2Via2l0LWJveC1vcmllbnRcIjpcInZlcnRpY2FsXCIsZGlzcGxheTpcIi13ZWJraXQtYm94XCIsaGVpZ2h0OmxpbmVzKmxpbmVIZWlnaHQrXCJweFwifTpudWxsKX0sY2xlYXJmaXg9ZnVuY3Rpb24oKXtyZXR1cm57XCImOmFmdGVyXCI6e2NvbnRlbnQ6J1wiXCInLGRpc3BsYXk6XCJ0YWJsZVwiLGNsZWFyOlwiYm90aFwifX19LGhhaXJsaW5lPWZ1bmN0aW9uKCl7cmV0dXJue319LHN0aWNreT1mdW5jdGlvbigpe3JldHVyblt7cG9zaXRpb246XCItd2Via2l0LXN0aWNreVwifSx7cG9zaXRpb246XCItbW96LXN0aWNreVwifSx7cG9zaXRpb246XCItby1zdGlja3lcIn0se3Bvc2l0aW9uOlwiLW1zLXN0aWNreVwifSx7cG9zaXRpb246XCJzdGlja3lcIn0se3RvcDowLFwiei1pbmRleFwiOjF9XX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbW1vbixmbil7cmV0dXJuIEFycmF5LmlzQXJyYXkoY29tbW9uKT9jb21tb24ubWFwKGZ1bmN0aW9uKG8pe2Zvcih2YXIgc2NvcGUgaW4gbylyZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlLGZuKG9bc2NvcGVdKSl9KTpmbihjb21tb24pfSxkZWZhdWx0VHJhbnNpdGlvbj1mdW5jdGlvbigpe3ZhciBwcm9wZXJ0aWVzPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9cImFsbFwiOmFyZ3VtZW50c1swXSxkdXJhdGlvbj1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9kdXJhdGlvbjphcmd1bWVudHNbMV0sY3VydmU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP19jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fY3VydmVfZGVmYXVsdDphcmd1bWVudHNbMl07cmV0dXJuW3ZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLWRlbGF5XCI6MH0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLHZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCI6ZHVyYXRpb259LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSx2ZW5kb3JpemUoe1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIjpjdXJ2ZX0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLHZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXByb3BlcnR5XCI6cHJvcGVydGllc30sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pXX0sZmx1aWRTY2FsZT1mdW5jdGlvbihwcm9wZXJ0eSx1bml0LG1pblZhbHVlLG1heFZhbHVlKXt2YXIgbWluQnJlYWtwb2ludD1hcmd1bWVudHMubGVuZ3RoPD00fHx2b2lkIDA9PT1hcmd1bWVudHNbNF0/MzIwOmFyZ3VtZW50c1s0XSxtYXhCcmVha3BvaW50PWFyZ3VtZW50cy5sZW5ndGg8PTV8fHZvaWQgMD09PWFyZ3VtZW50c1s1XT8xOTIwOmFyZ3VtZW50c1s1XSxvcmllbnRhdGlvbj1hcmd1bWVudHMubGVuZ3RoPD02fHx2b2lkIDA9PT1hcmd1bWVudHNbNl0/XCJob3Jpem9udGFsXCI6YXJndW1lbnRzWzZdO3JldHVybiBmbHVpZFNjYWxlcyhbcHJvcGVydHldLHVuaXQsW1ttaW5CcmVha3BvaW50LG1pblZhbHVlXSxbbWF4QnJlYWtwb2ludCxtYXhWYWx1ZV1dLG9yaWVudGF0aW9uKX0sZmx1aWRTY2FsZXM9ZnVuY3Rpb24ocHJvcGVydHksdW5pdCxzaXplcyxvcmllbnRhdGlvbil7dmFyIHNvcnRlZD1zaXplcy5zb3J0KCksbWluQnJlYWtwb2ludHM9c29ydGVkLm1hcChmdW5jdGlvbihkYXRhKXtyZXR1cm4gZGF0YVswXX0pLG1heEJyZWFrcG9pbnRzPXNvcnRlZC5tYXAoZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRhdGFbMF19KTttYXhCcmVha3BvaW50cy5zaGlmdCgpLG1heEJyZWFrcG9pbnRzLnB1c2gobWluQnJlYWtwb2ludHNbbWluQnJlYWtwb2ludHMubGVuZ3RoLTFdKTt2YXIgbWluVmFsdWVzPXNvcnRlZC5tYXAoZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRhdGFbMV19KSxtYXhWYWx1ZXM9c29ydGVkLm1hcChmdW5jdGlvbihkYXRhKXtyZXR1cm4gZGF0YVsxXX0pO3JldHVybiBtYXhWYWx1ZXMuc2hpZnQoKSxtYXhWYWx1ZXMucHVzaChtaW5WYWx1ZXNbbWluVmFsdWVzLmxlbmd0aC0xXSksc29ydGVkLm1hcChmdW5jdGlvbihkYXRhLGluZGV4KXtyZXR1cm4gZmx1aWRSdWxlKHByb3BlcnR5LHVuaXQsb3JpZW50YXRpb24sbWluQnJlYWtwb2ludHNbaW5kZXhdLG1heEJyZWFrcG9pbnRzW2luZGV4XSxtaW5WYWx1ZXNbaW5kZXhdLG1heFZhbHVlc1tpbmRleF0sMD09PWluZGV4LGluZGV4PT09c29ydGVkLmxlbmd0aC0xKX0pfSxmbHVpZFJ1bGU9ZnVuY3Rpb24ocHJvcGVydHksdW5pdCl7dmFyIG9yaWVudGF0aW9uPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cImhvcml6b250YWxcIjphcmd1bWVudHNbMl0sbWluQnJlYWtwb2ludD1hcmd1bWVudHNbM10sbWF4QnJlYWtwb2ludD1hcmd1bWVudHNbNF0sbWluVmFsdWU9YXJndW1lbnRzWzVdLG1heFZhbHVlPWFyZ3VtZW50c1s2XSxpc0ZpcnN0PWFyZ3VtZW50c1s3XSxpc0xhc3Q9YXJndW1lbnRzWzhdLG9yaWVudGF0aW9uVW5pdD1cInZlcnRpY2FsXCI9PT1vcmllbnRhdGlvbj9cInZoXCI6XCJ2d1wiLG9yaWVudGF0aW9uUnVsZT1cInZlcnRpY2FsXCI9PT1vcmllbnRhdGlvbj9cImhlaWdodFwiOlwid2lkdGhcIixydWxlPWlzTGFzdD9bXCJAbWVkaWEgKG1pbi1cIitvcmllbnRhdGlvblJ1bGUrXCI6IFwiK21pbkJyZWFrcG9pbnQrXCJweClcIl06W1wiQG1lZGlhIChtaW4tXCIrb3JpZW50YXRpb25SdWxlK1wiOiBcIittaW5CcmVha3BvaW50K1wicHgpIGFuZCAobWF4LVwiK29yaWVudGF0aW9uUnVsZStcIjogXCIrbWF4QnJlYWtwb2ludCtcInB4KVwiXSxtdWx0aXBsaWVyPVwiKChcIittYXhWYWx1ZStcIiAtIFwiK21pblZhbHVlK1wiKSAvIChcIittYXhCcmVha3BvaW50K1wiIC0gXCIrbWluQnJlYWtwb2ludCtcIikgKiAxMDBcIitvcmllbnRhdGlvblVuaXQrXCIpXCIsYWRkZXI9XCIoKChcIittaW5WYWx1ZStcIiAqIFwiK21heEJyZWFrcG9pbnQrXCIpIC0gKFwiK21heFZhbHVlK1wiICogXCIrbWluQnJlYWtwb2ludCtcIikpIC8gKFwiK21heEJyZWFrcG9pbnQrXCIgLSBcIittaW5CcmVha3BvaW50K1wiKSkgKiAxXCIrdW5pdCxmb3JtdWxhPVwiY2FsYyhcIittdWx0aXBsaWVyK1wiICsgXCIrYWRkZXIrXCIpXCIscHJvcGVydGllcz1BcnJheS5pc0FycmF5KHByb3BlcnR5KT9wcm9wZXJ0eTpbcHJvcGVydHldO3JldHVybltpc0ZpcnN0P3Byb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHApe3JldHVybiBfZGVmaW5lUHJvcGVydHkoe30scCxcIlwiK21pblZhbHVlK3VuaXQpfSk6bnVsbCxfZGVmaW5lUHJvcGVydHkoe30scnVsZSxwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwKXtyZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LHAsaXNMYXN0P1wiXCIrbWF4VmFsdWUrdW5pdDpmb3JtdWxhKX0pKV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtjbGVhcmZpeDpjbGVhcmZpeCxjcmVhdGVTdHlsZXM6Y3JlYXRlU3R5bGVzLGRlZmF1bHRUcmFuc2l0aW9uOmRlZmF1bHRUcmFuc2l0aW9uLGVsbGlwc2lzOmVsbGlwc2lzLGZpdDpmaXQsZm9udFNtb290aGluZzpmb250U21vb3RoaW5nLGZsdWlkU2NhbGU6Zmx1aWRTY2FsZSxmbHVpZFNjYWxlczpmbHVpZFNjYWxlcyxoYWlybGluZTpoYWlybGluZSxzdGlja3k6c3RpY2t5LHZlbmRvcml6ZTp2ZW5kb3JpemV9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWl4aW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpO3JlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIG11bHRpcGxlPWZ1bmN0aW9uKG1PcHRzKXt2YXIgaXRlbXM9W10saXRlbUluZGV4PWZ1bmN0aW9uKGlkKXt2YXIgaXRlbT1maW5kSXRlbShpZCk7cmV0dXJuIGl0ZW1zLmluZGV4T2YoaXRlbSl9LHJlbW92ZUl0ZW09ZnVuY3Rpb24oaWQpe3ZhciBpbmRleD1pdGVtSW5kZXgoaWQpOy0xIT09aW5kZXgmJml0ZW1zLnNwbGljZShpbmRleCwxKX0scmVwbGFjZUl0ZW09ZnVuY3Rpb24oaWQsbmV3SXRlbSl7dmFyIGluZGV4PWl0ZW1JbmRleChpZCk7LTEhPT1pbmRleCYmKGl0ZW1zW2luZGV4XT1uZXdJdGVtKX0sZmluZEl0ZW09ZnVuY3Rpb24oaWQpe2Zvcih2YXIgaT0wO2k8aXRlbXMubGVuZ3RoO2krKylpZihpdGVtc1tpXS5pbnN0YW5jZUlkPT09aWQpcmV0dXJuIGl0ZW1zW2ldfSxuZXh0PWZ1bmN0aW9uKCl7aXRlbXMubGVuZ3RoJiYoaXRlbXNbMF0uc2hvdz0hMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpKX0sX3JlbW92ZT1mdW5jdGlvbihpbnN0YW5jZUlkKXttT3B0cy5xdWV1ZT8oaXRlbXMuc2hpZnQoKSxzZXRUaW1lb3V0KG5leHQsMCkpOnJlbW92ZUl0ZW0oaW5zdGFuY2VJZCl9LHNldFBhdXNlU3RhdGU9ZnVuY3Rpb24ocGF1c2UsaW5zdGFuY2VJZCl7dmFyIGl0ZW09ZmluZEl0ZW0oaW5zdGFuY2VJZCk7aXRlbSYmKGl0ZW0ucGF1c2U9cGF1c2UsaXRlbS51bnBhdXNlPSFwYXVzZSl9LG1ha2VJdGVtPWZ1bmN0aW9uKGl0ZW1PcHRzLGluc3RhbmNlSWQpe3ZhciBvcHRzPVwiZnVuY3Rpb25cIj09dHlwZW9mIGl0ZW1PcHRzP2l0ZW1PcHRzKCk6aXRlbU9wdHMscmVzb2x2ZVNob3c9dm9pZCAwLGRpZFNob3c9ZnVuY3Rpb24oKXtyZXR1cm4gb3B0cy5kaWRTaG93JiZvcHRzLmRpZFNob3coaW5zdGFuY2VJZCkscmVzb2x2ZVNob3coaW5zdGFuY2VJZCl9LHNob3dQcm9taXNlPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe3Jlc29sdmVTaG93PXJlc29sdmV9KSxyZXNvbHZlSGlkZT12b2lkIDAsZGlkSGlkZT1mdW5jdGlvbigpe3JldHVybiBvcHRzLmRpZEhpZGUmJm9wdHMuZGlkSGlkZShpbnN0YW5jZUlkKSxtT3B0cy5xdWV1ZSYmX3JlbW92ZShpbnN0YW5jZUlkKSxyZXNvbHZlSGlkZShpbnN0YW5jZUlkKX0saGlkZVByb21pc2U9bmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7cmVzb2x2ZUhpZGU9cmVzb2x2ZX0pO3JldHVybiBPYmplY3QuYXNzaWduKHt9LG1PcHRzLHtpbnN0YW5jZUlkOmluc3RhbmNlSWQsb3B0czpvcHRzLHNob3c6IW1PcHRzLnF1ZXVlLHNob3dQcm9taXNlOnNob3dQcm9taXNlLGhpZGVQcm9taXNlOmhpZGVQcm9taXNlLGRpZFNob3c6ZGlkU2hvdyxkaWRIaWRlOmRpZEhpZGV9KX07cmV0dXJue2NvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIGl0ZW1zLmxlbmd0aH0sY2xlYXI6ZnVuY3Rpb24oKXtyZXR1cm4gaXRlbXMubGVuZ3RoPTB9LHNob3c6ZnVuY3Rpb24ob3B0cyl7dmFyIGluc3RhbmNlSWQ9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP21PcHRzLmRlZmF1bHRJZDphcmd1bWVudHNbMV0saXRlbT12b2lkIDA7aWYobU9wdHMucXVldWUpaXRlbT1tYWtlSXRlbShvcHRzLGluc3RhbmNlSWQpLGl0ZW1zLnB1c2goaXRlbSksMT09PWl0ZW1zLmxlbmd0aCYmbmV4dCgpO2Vsc2V7dmFyIHN0b3JlZEl0ZW09ZmluZEl0ZW0oaW5zdGFuY2VJZCk7aXRlbT1tYWtlSXRlbShvcHRzLGluc3RhbmNlSWQpLHN0b3JlZEl0ZW0/cmVwbGFjZUl0ZW0oaW5zdGFuY2VJZCxpdGVtKTppdGVtcy5wdXNoKGl0ZW0pfXJldHVybiBpdGVtLnNob3dQcm9taXNlfSxoaWRlOmZ1bmN0aW9uKCl7dmFyIGluc3RhbmNlSWQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP21PcHRzLmRlZmF1bHRJZDphcmd1bWVudHNbMF0saXRlbT12b2lkIDA7cmV0dXJuIG1PcHRzLnF1ZXVlP2l0ZW1zLmxlbmd0aCYmKGl0ZW09aXRlbXNbMF0pOml0ZW09ZmluZEl0ZW0oaW5zdGFuY2VJZCksaXRlbT8oaXRlbS5oaWRlPSEwLGl0ZW0uaGlkZVByb21pc2UpOlByb21pc2UucmVzb2x2ZShpbnN0YW5jZUlkKX0scmVtb3ZlOmZ1bmN0aW9uKCl7dmFyIGluc3RhbmNlSWQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP21PcHRzLmRlZmF1bHRJZDphcmd1bWVudHNbMF07X3JlbW92ZShpbnN0YW5jZUlkKX0scGF1c2U6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2VJZD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/bU9wdHMuZGVmYXVsdElkOmFyZ3VtZW50c1swXTtzZXRQYXVzZVN0YXRlKCEwLGluc3RhbmNlSWQpfSx1bnBhdXNlOmZ1bmN0aW9uKCl7dmFyIGluc3RhbmNlSWQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP21PcHRzLmRlZmF1bHRJZDphcmd1bWVudHNbMF07c2V0UGF1c2VTdGF0ZSghMSxpbnN0YW5jZUlkKX0sdmlldzpmdW5jdGlvbigpe3ZhciB0b1Nob3dJdGVtcz1pdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7cmV0dXJuIGl0ZW0uc2hvd30pO3JldHVybiB0b1Nob3dJdGVtcy5sZW5ndGg/KGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChtT3B0cy5ib2R5U2hvd0NsYXNzKSwoMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKShtT3B0cy50YWcsdG9TaG93SXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW1EYXRhKXtyZXR1cm4gX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQobU9wdHMuaW5zdGFuY2UsT2JqZWN0LmFzc2lnbih7fSxpdGVtRGF0YSx7dHJhbnNpdGlvbnM6bU9wdHMudHJhbnNpdGlvbnMsa2V5Oml0ZW1EYXRhLmtleXx8aXRlbURhdGEuaW5zdGFuY2VJZH0pKX0pKSk6KGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShtT3B0cy5ib2R5U2hvd0NsYXNzKSwoMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKShtT3B0cy5ub25lVGFnKSl9fX07ZXhwb3J0c1tcImRlZmF1bHRcIl09bXVsdGlwbGUsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tdWx0aXBsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuYXNzaWdufHxPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LFwiYXNzaWduXCIse2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKHRhcmdldCl7aWYodm9pZCAwPT09dGFyZ2V0fHxudWxsPT09dGFyZ2V0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3RcIik7Zm9yKHZhciB0bz1PYmplY3QodGFyZ2V0KSxpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7dmFyIG5leHRTb3VyY2U9YXJndW1lbnRzW2ldO2lmKHZvaWQgMCE9PW5leHRTb3VyY2UmJm51bGwhPT1uZXh0U291cmNlKXtuZXh0U291cmNlPU9iamVjdChuZXh0U291cmNlKTtmb3IodmFyIGtleXNBcnJheT1PYmplY3Qua2V5cyhuZXh0U291cmNlKSxuZXh0SW5kZXg9MCxsZW49a2V5c0FycmF5Lmxlbmd0aDtsZW4+bmV4dEluZGV4O25leHRJbmRleCsrKXt2YXIgbmV4dEtleT1rZXlzQXJyYXlbbmV4dEluZGV4XSxkZXNjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSxuZXh0S2V5KTt2b2lkIDAhPT1kZXNjJiZkZXNjLmVudW1lcmFibGUmJih0b1tuZXh0S2V5XT1uZXh0U291cmNlW25leHRLZXldKX19fXJldHVybiB0b319KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9iamVjdC5hc3NpZ24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2oyYz1yZXF1aXJlKFwiajJjXCIpLF9qMmMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2oyYykscmVtb3ZlPWZ1bmN0aW9uKGlkKXtpZihpZCl7dmFyIG9sZD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7b2xkJiZvbGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGQpfX0sYWRkPWZ1bmN0aW9uKGlkKXtmb3IodmFyIF9sZW49YXJndW1lbnRzLmxlbmd0aCxzdHlsZXM9QXJyYXkoX2xlbj4xP19sZW4tMTowKSxfa2V5PTE7X2xlbj5fa2V5O19rZXkrKylzdHlsZXNbX2tleS0xXT1hcmd1bWVudHNbX2tleV07cmVtb3ZlKGlkKTt2YXIgc3R5bGVFbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7aWQmJnN0eWxlRWwuc2V0QXR0cmlidXRlKFwiaWRcIixpZCksc3R5bGVzLmZvckVhY2goZnVuY3Rpb24oc3R5bGVMaXN0KXtPYmplY3Qua2V5cyhzdHlsZUxpc3QpLmxlbmd0aCYmc3R5bGVMaXN0LmZvckVhY2goZnVuY3Rpb24oc3R5bGUpe3ZhciBzY29wZWQ9e1wiQGdsb2JhbFwiOnN0eWxlfSxzaGVldD1fajJjMltcImRlZmF1bHRcIl0uc2hlZXQoc2NvcGVkKTtzdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHNoZWV0KSl9KX0pLGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCl9O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXthZGQ6YWRkLHJlbW92ZTpyZW1vdmV9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3R5bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKCl7dmFyIGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKSxhbmltYXRpb25zPXthbmltYXRpb246XCJhbmltYXRpb25lbmRcIixPQW5pbWF0aW9uOlwib0FuaW1hdGlvbkVuZFwiLE1vekFuaW1hdGlvbjpcImFuaW1hdGlvbmVuZFwiLFdlYmtpdEFuaW1hdGlvbjpcIndlYmtpdEFuaW1hdGlvbkVuZFwifTtmb3IodmFyIGEgaW4gYW5pbWF0aW9ucylpZih2b2lkIDAhPT1lbC5zdHlsZVthXSlyZXR1cm4gYW5pbWF0aW9uc1thXX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmFuc2l0aW9uLWV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxTSE9XX0RVUkFUSU9OPS4yMixISURFX0RVUkFUSU9OPS4yLFNIT1dfREVMQVk9MCxISURFX0RFTEFZPTAsVFJBTlNJVElPTj1cImJvdGhcIixzaG93PWZ1bmN0aW9uKG9wdHMpe3JldHVybiB0cmFuc2l0aW9uKG9wdHMsXCJzaG93XCIpfSxoaWRlPWZ1bmN0aW9uKG9wdHMpe3JldHVybiB0cmFuc2l0aW9uKG9wdHMsXCJoaWRlXCIpfSxnZXREdXJhdGlvbj1mdW5jdGlvbihvcHRzLHN0YXRlKXt2YXIgdHJhbnNpdGlvbj1vcHRzLnRyYW5zaXRpb258fFRSQU5TSVRJT047cmV0dXJuXCJub25lXCI9PT10cmFuc2l0aW9uPzA6XCJzaG93XCI9PT10cmFuc2l0aW9uJiZcImhpZGVcIj09PXN0YXRlPzA6XCJoaWRlXCI9PT10cmFuc2l0aW9uJiZcInNob3dcIj09PXN0YXRlPzA6XCJzaG93XCI9PT1zdGF0ZT92b2lkIDAhPT1vcHRzLnNob3dEdXJhdGlvbj9vcHRzLnNob3dEdXJhdGlvbjpTSE9XX0RVUkFUSU9OOnZvaWQgMCE9PW9wdHMuaGlkZUR1cmF0aW9uP29wdHMuaGlkZUR1cmF0aW9uOkhJREVfRFVSQVRJT059LGdldERlbGF5PWZ1bmN0aW9uKG9wdHMsc3RhdGUpe3ZhciB0cmFuc2l0aW9uPW9wdHMudHJhbnNpdGlvbnx8VFJBTlNJVElPTjtyZXR1cm5cIm5vbmVcIj09PXRyYW5zaXRpb24/MDpcInNob3dcIj09PXRyYW5zaXRpb24mJlwiaGlkZVwiPT09c3RhdGU/MDpcImhpZGVcIj09PXRyYW5zaXRpb24mJlwic2hvd1wiPT09c3RhdGU/MDpcInNob3dcIj09PXN0YXRlP3ZvaWQgMCE9PW9wdHMuc2hvd0RlbGF5P29wdHMuc2hvd0RlbGF5OlNIT1dfREVMQVk6dm9pZCAwIT09b3B0cy5oaWRlRGVsYXk/b3B0cy5oaWRlRGVsYXk6SElERV9ERUxBWX0sdHJhbnNpdGlvbj1mdW5jdGlvbihvcHRzLHN0YXRlKXt2YXIgZGVmZXJyZWQ9X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5kZWZlcnJlZCgpLGVsPW9wdHMuZWw7aWYoIWVsKXJldHVybiBkZWZlcnJlZC5yZXNvbHZlKCksZGVmZXJyZWQucHJvbWlzZTt2YXIgdHJhbnNpdGlvbkR1cmF0aW9uPTFlMypnZXREdXJhdGlvbihvcHRzLHN0YXRlKSxkZWxheT0xZTMqZ2V0RGVsYXkob3B0cyxzdGF0ZSksc3R5bGU9ZWwuc3R5bGUsYmVmb3JlVHJhbnNpdGlvbj1vcHRzLmJlZm9yZVNob3cmJlwic2hvd1wiPT09c3RhdGU/ZnVuY3Rpb24oKXtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb249XCIwbXNcIixzdHlsZS50cmFuc2l0aW9uRGVsYXk9XCIwbXNcIixvcHRzLmJlZm9yZVNob3coKX06bnVsbCxhcHBseVRyYW5zaXRpb249ZnVuY3Rpb24oKXtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb249dHJhbnNpdGlvbkR1cmF0aW9uK1wibXNcIixzdHlsZS50cmFuc2l0aW9uRGVsYXk9ZGVsYXkrXCJtc1wiLG9wdHMuc2hvd0NsYXNzJiZlbC5jbGFzc0xpc3RbXCJzaG93XCI9PT1zdGF0ZT9cImFkZFwiOlwicmVtb3ZlXCJdKG9wdHMuc2hvd0NsYXNzKSxvcHRzLnNob3cmJlwiZnVuY3Rpb25cIj09dHlwZW9mIG9wdHMuc2hvdyYmXCJzaG93XCI9PT1zdGF0ZSYmb3B0cy5zaG93KCksb3B0cy5oaWRlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBvcHRzLmhpZGUmJlwiaGlkZVwiPT09c3RhdGUmJm9wdHMuaGlkZSgpfSxhcHBseUFmdGVyVHJhbnNpdGlvbj1mdW5jdGlvbigpe29wdHMuYWZ0ZXJIaWRlJiZcImhpZGVcIj09PXN0YXRlJiYoc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uPVwiMG1zXCIsc3R5bGUudHJhbnNpdGlvbkRlbGF5PVwiMG1zXCIsb3B0cy5hZnRlckhpZGUoKSl9LGRvVHJhbnNpdGlvbj1mdW5jdGlvbigpe2FwcGx5VHJhbnNpdGlvbigpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXthcHBseUFmdGVyVHJhbnNpdGlvbigpLGRlZmVycmVkLnJlc29sdmUoKX0sdHJhbnNpdGlvbkR1cmF0aW9uK2RlbGF5KX0sbWF5YmVEZWxheVRyYW5zaXRpb249ZnVuY3Rpb24oKXswPT09dHJhbnNpdGlvbkR1cmF0aW9uP2RvVHJhbnNpdGlvbigpOnNldFRpbWVvdXQoZnVuY3Rpb24oKXtkb1RyYW5zaXRpb24oKX0sMCl9O3JldHVybiBiZWZvcmVUcmFuc2l0aW9uPyhiZWZvcmVUcmFuc2l0aW9uKCksc2V0VGltZW91dChmdW5jdGlvbigpe21heWJlRGVsYXlUcmFuc2l0aW9uKCl9LDApKTptYXliZURlbGF5VHJhbnNpdGlvbigpLGRlZmVycmVkLnByb21pc2V9O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtzaG93OnNob3csaGlkZTpoaWRlfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYW5zaXRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksd2luZG93LldlYkZvbnRDb25maWd8fCh3aW5kb3cuV2ViRm9udENvbmZpZz17fSxmdW5jdGlvbigpe3ZhciB3Zj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3dmLnNyYz0oXCJodHRwczpcIj09PWRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sP1wiaHR0cHNcIjpcImh0dHBcIikrXCI6Ly9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy93ZWJmb250LzEvd2ViZm9udC5qc1wiLHdmLnR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIix3Zi5hc3luYz1cInRydWVcIjt2YXIgcz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdmLHMpfSgpKTt2YXIgd2ViZm9udExvYWRlcj17YWRkOmZ1bmN0aW9uKHZlbmRvcixmYW1pbHksa2V5KXt2YXIgdmVuZG9yQ2ZnPXdpbmRvdy5XZWJGb250Q29uZmlnW3ZlbmRvcl18fHt9O3ZlbmRvckNmZy5mYW1pbGllcz12ZW5kb3JDZmcuZmFtaWxpZXN8fFtdLHZlbmRvckNmZy5mYW1pbGllcy5wdXNoKGZhbWlseSksa2V5JiYodmVuZG9yQ2ZnLmtleT1rZXkpLHdpbmRvdy5XZWJGb250Q29uZmlnW3ZlbmRvcl09dmVuZG9yQ2ZnfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09d2ViZm9udExvYWRlcixtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYmZvbnRsb2FkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2RlZmF1bHQ9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvZGVmYXVsdFwiKSxfZGVmYXVsdDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdCk7ZXhwb3J0c1tcImRlZmF1bHRcIl09X2RlZmF1bHQyW1wiZGVmYXVsdFwiXSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWN1c3RvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgaGV4PWZ1bmN0aW9uKF9oZXgpe3ZhciBiaWdpbnQ9cGFyc2VJbnQoX2hleC5zdWJzdHJpbmcoMSksMTYpLHI9YmlnaW50Pj4xNiYyNTUsZz1iaWdpbnQ+PjgmMjU1LGI9MjU1JmJpZ2ludDtyZXR1cm4gcitcIixcIitnK1wiLFwiK2J9LHJnYmE9ZnVuY3Rpb24oY29sb3JTdHIpe3ZhciBvcGFjaXR5PWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT8xOmFyZ3VtZW50c1sxXTtyZXR1cm5cInJnYmEoXCIrY29sb3JTdHIrXCIsXCIrb3BhY2l0eStcIilcIn0saXNJbnRlZ2VyPWZ1bmN0aW9uKG5WYWwpe3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiBuVmFsJiZpc0Zpbml0ZShuVmFsKSYmblZhbD4tOTAwNzE5OTI1NDc0MDk5MiYmOTAwNzE5OTI1NDc0MDk5Mj5uVmFsJiZNYXRoLmZsb29yKG5WYWwpPT09blZhbH0saXNEZXNrdG9wPXdpbmRvdy5pbm5lcldpZHRoPj0xMDI0LGdyaWRfdW5pdD00LGdyaWRfdW5pdF9jb21wb25lbnQ9OCxhbmltYXRpb25fY3VydmVfc2xvd19pbl9mYXN0X291dD1cImN1YmljLWJlemllciguNCwgMCwgLjIsIDEpXCIsYW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fbGluZWFyX291dD1cImN1YmljLWJlemllcigwLCAwLCAuMiwgMSlcIixhbmltYXRpb25fY3VydmVfbGluZWFyX2luX2Zhc3Rfb3V0PVwiY3ViaWMtYmV6aWVyKC40LCAwLCAxLCAxKVwiO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtyZ2JhOnJnYmEsaGV4OmhleCxpc0ludGVnZXI6aXNJbnRlZ2VyLGdyaWRfdW5pdDpncmlkX3VuaXQsZ3JpZF91bml0X2NvbXBvbmVudDpncmlkX3VuaXRfY29tcG9uZW50LGdyaWRfdW5pdF9tZW51OjU2LGdyaWRfdW5pdF9pY29uX2J1dHRvbjo2KmdyaWRfdW5pdF9jb21wb25lbnQsdW5pdF9ibG9ja19ib3JkZXJfcmFkaXVzOjIsdW5pdF9pdGVtX2JvcmRlcl9yYWRpdXM6Mix1bml0X2luZGVudDo3Mix1bml0X3NpZGVfcGFkZGluZzppc0Rlc2t0b3A/MjQ6MTYsdW5pdF90b3VjaF9oZWlnaHQ6NDgsdW5pdF9pY29uX3NpemVfc21hbGw6MipncmlkX3VuaXRfY29tcG9uZW50LHVuaXRfaWNvbl9zaXplOjMqZ3JpZF91bml0X2NvbXBvbmVudCx1bml0X2ljb25fc2l6ZV9tZWRpdW06NCpncmlkX3VuaXRfY29tcG9uZW50LHVuaXRfaWNvbl9zaXplX2xhcmdlOjUqZ3JpZF91bml0X2NvbXBvbmVudCx1bml0X3NjcmVlbl9zaXplX2V4dHJhX2xhcmdlOjEyODAsdW5pdF9zY3JlZW5fc2l6ZV9sYXJnZTo5NjAsdW5pdF9zY3JlZW5fc2l6ZV9tZWRpdW06NDgwLHVuaXRfc2NyZWVuX3NpemVfc21hbGw6MzIwLGFuaW1hdGlvbl9kdXJhdGlvbjpcIi4xOHNcIixhbmltYXRpb25fY3VydmVfc2xvd19pbl9mYXN0X291dDphbmltYXRpb25fY3VydmVfc2xvd19pbl9mYXN0X291dCxhbmltYXRpb25fY3VydmVfc2xvd19pbl9saW5lYXJfb3V0OmFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2xpbmVhcl9vdXQsYW5pbWF0aW9uX2N1cnZlX2xpbmVhcl9pbl9mYXN0X291dDphbmltYXRpb25fY3VydmVfbGluZWFyX2luX2Zhc3Rfb3V0LGFuaW1hdGlvbl9jdXJ2ZV9kZWZhdWx0OlwiZWFzZS1vdXRcIixmb250X3dlaWdodF9saWdodDozMDAsZm9udF93ZWlnaHRfbm9ybWFsOjQwMCxmb250X3dlaWdodF9tZWRpdW06NTAwLGZvbnRfd2VpZ2h0X2JvbGQ6NzAwLGZvbnRfc2l6ZV90aXRsZToyMCxsaW5lX2hlaWdodDoxLjMsY29sb3JfcHJpbWFyeTpcIjMzLCAxNTAsIDI0M1wiLGNvbG9yX3ByaW1hcnlfYWN0aXZlOlwiMzAsIDEzNiwgMjI5XCIsY29sb3JfcHJpbWFyeV9kYXJrOlwiMjUsIDExOCwgMjEwXCIsY29sb3JfcHJpbWFyeV9mYWRlZDpcIjEwMCwgMTgxLCAyNDlcIixjb2xvcl9wcmltYXJ5X2ZvcmVncm91bmQ6XCIyNTUsIDI1NSwgMjU1XCIsY29sb3JfbGlnaHRfYmFja2dyb3VuZDpcIjI1NSwgMjU1LCAyNTVcIixjb2xvcl9saWdodF9mb3JlZ3JvdW5kOlwiMCwgMCwgMFwiLGNvbG9yX2RhcmtfYmFja2dyb3VuZDpcIjM0LCAzNCwgMzRcIixjb2xvcl9kYXJrX2ZvcmVncm91bmQ6XCIyNTUsIDI1NSwgMjU1XCIsYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5Oi44NyxibGVuZF9saWdodF90ZXh0X3JlZ3VsYXI6LjczLGJsZW5kX2xpZ2h0X3RleHRfc2Vjb25kYXJ5Oi41NCxibGVuZF9saWdodF90ZXh0X3RlcnRpYXJ5Oi40LGJsZW5kX2xpZ2h0X3RleHRfZGlzYWJsZWQ6LjI2LGJsZW5kX2xpZ2h0X2JvcmRlcl9saWdodDouMTEsYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9hY3RpdmU6LjE0LGJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXI6LjA2LGJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXJfbWVkaXVtOi4xMixibGVuZF9saWdodF9iYWNrZ3JvdW5kX2Rpc2FibGVkOi4wOSxibGVuZF9saWdodF9vdmVybGF5X2JhY2tncm91bmQ6LjMsYmxlbmRfZGFya190ZXh0X3ByaW1hcnk6MSxibGVuZF9kYXJrX3RleHRfcmVndWxhcjouODcsYmxlbmRfZGFya190ZXh0X3NlY29uZGFyeTouNyxibGVuZF9kYXJrX3RleHRfdGVydGlhcnk6LjQsYmxlbmRfZGFya190ZXh0X2Rpc2FibGVkOi4yNixibGVuZF9kYXJrX2JvcmRlcl9saWdodDouMSxibGVuZF9kYXJrX2JhY2tncm91bmRfYWN0aXZlOi4xNCxibGVuZF9kYXJrX2JhY2tncm91bmRfaG92ZXI6LjA4LGJsZW5kX2RhcmtfYmFja2dyb3VuZF9ob3Zlck1lZGl1bTouMTIsYmxlbmRfZGFya19iYWNrZ3JvdW5kX2Rpc2FibGVkOi4xMixibGVuZF9kYXJrX292ZXJsYXlfYmFja2dyb3VuZDouMyxwcmVmaXhlc19hbmltYXRpb246W1wib1wiLFwibW96XCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfYXBwZWFyYW5jZTpbXCJvXCIsXCJtb3pcIixcIm1zXCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfYmFja2dyb3VuZF9zaXplOltcIm9cIixcIm1velwiLFwid2Via2l0XCJdLHByZWZpeGVzX2JveF9zaGFkb3c6W1wibW96XCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfa2V5ZnJhbWVzOltcIm9cIixcIm1velwiLFwid2Via2l0XCJdLHByZWZpeGVzX3RyYW5zZm9ybTpbXCJvXCIsXCJtb3pcIixcIm1zXCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfdHJhbnNpdGlvbjpbXCJvXCIsXCJtb3pcIixcIndlYmtpdFwiXSxwcmVmaXhlc191c2VyX3NlbGVjdDpbXCJtb3pcIixcIm1zXCIsXCJ3ZWJraXRcIl0sYnJlYWtwb2ludF9zbWFsbF9oYW5kc2V0X3BvcnRyYWl0OjAsYnJlYWtwb2ludF9tZWRpdW1faGFuZHNldF9wb3J0cmFpdDozNjAsYnJlYWtwb2ludF9sYXJnZV9oYW5kc2V0X3BvcnRyYWl0OjQwMCxicmVha3BvaW50X3NtYWxsX3RhYmxldF9wb3J0cmFpdDo2MDAsYnJlYWtwb2ludF9sYXJnZV90YWJsZXRfcG9ydHJhaXQ6NzIwLGJyZWFrcG9pbnRfc21hbGxfaGFuZHNldF9sYW5kc2NhcGU6NDgwLGJyZWFrcG9pbnRfbWVkaXVtX2hhbmRzZXRfbGFuZHNjYXBlOjYwMCxicmVha3BvaW50X2xhcmdlX2hhbmRzZXRfbGFuZHNjYXBlOjcyMCxlbnZfdGFibGV0OndpbmRvdy5pbm5lcldpZHRoPj02MDAsZW52X2Rlc2t0b3A6d2luZG93LmlubmVyV2lkdGg+PTEwMjQsel9tZW51Ojk5LHpfaGVhZGVyX2NvbnRhaW5lcjo5OTksel9ub3RpZmljYXRpb246OTk5OCx6X2RpYWxvZzo5OTk5fSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfZXZlbnRzPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL2V2ZW50c1wiKSxfZXZlbnRzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudHMpLF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfZGlhbG9nPXJlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL2RpYWxvZ1wiKSxfZGlhbG9nMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kaWFsb2cpLF90cmFuc2l0aW9uPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3RyYW5zaXRpb25cIiksX3RyYW5zaXRpb24yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyYW5zaXRpb24pLF9zaGFkb3c9cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvc2hhZG93XCIpLF9zaGFkb3cyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NoYWRvdyk7cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLWRpYWxvZ1wiLHZpc2libGU6XCJwZS1kaWFsb2ctLXZpc2libGVcIixib2R5OlwicGUtZGlhbG9nX19ib2R5XCIsZnVsbHNjcmVlbjpcInBlLWRpYWxvZy0tZnVsbHNjcmVlblwiLGNvbnRlbnQ6XCJwZS1kaWFsb2dfX2NvbnRlbnRcIixoZWFkZXI6XCJwZS1kaWFsb2dfX2hlYWRlclwiLGZvb3RlcjpcInBlLWRpYWxvZ19fZm9vdGVyXCIsZm9vdGVySGlnaDpcInBlLWRpYWxvZ19fZm9vdGVyLS1oaWdoXCIsdGl0bGU6XCJwZS1kaWFsb2dfX3RpdGxlXCIsYWN0aW9uczpcInBlLWRpYWxvZ19fYWN0aW9uc1wiLGhhc0JhY2tkcm9wOlwicGUtZGlhbG9nLS1iYWNrZHJvcFwiLGhhc1RvcE92ZXJmbG93OlwicGUtZGlhbG9nLS1vdmVyZmxvdy10b3BcIixoYXNCb3R0b21PdmVyZmxvdzpcInBlLWRpYWxvZy0tb3ZlcmZsb3ctYm90dG9tXCIsbWVudUNvbnRlbnQ6XCJwZS1tZW51X19jb250ZW50XCJ9LFNDUk9MTF9XQVRDSF9USU1FUj0xNTAsdXBkYXRlU2Nyb2xsU3RhdGU9ZnVuY3Rpb24oY3RybCl7dmFyIHNjcm9sbGVyPWN0cmwuc2Nyb2xsRWw7c2Nyb2xsZXImJihjdHJsLnRvcE92ZXJmbG93PXNjcm9sbGVyLnNjcm9sbFRvcD4wLGN0cmwuYm90dG9tT3ZlcmZsb3c9c2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0LShzY3JvbGxlci5zY3JvbGxUb3Arc2Nyb2xsZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KT4wKX0sdXBkYXRlRm9vdGVyU3RhdGU9ZnVuY3Rpb24oY3RybCl7dmFyIGZvb3RlckVsPWN0cmwuZm9vdGVyRWw7aWYoZm9vdGVyRWwpe3ZhciBzdHlsZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShmb290ZXJFbCksaGVpZ2h0PWZvb3RlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCxtaW5IZWlnaHQ9cGFyc2VJbnQoc3R5bGUubWluSGVpZ2h0LDEwKTtoZWlnaHQ+bWluSGVpZ2h0P2Zvb3RlckVsLmNsYXNzTGlzdC5hZGQoQ1NTX0NMQVNTRVMuZm9vdGVySGlnaCk6Zm9vdGVyRWwuY2xhc3NMaXN0LnJlbW92ZShDU1NfQ0xBU1NFUy5mb290ZXJIaWdoKX19LHNob3c9ZnVuY3Rpb24oY3RybCxvcHRzKXt2YXIgaWQ9Y3RybC5pbnN0YW5jZUlkO3JldHVybiBjdHJsLmlzVHJhbnNpdGlvbmluZz0hMCxfdHJhbnNpdGlvbjJbXCJkZWZhdWx0XCJdLnNob3coT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtlbDpjdHJsLmVsLHNob3dDbGFzczpDU1NfQ0xBU1NFUy52aXNpYmxlfSkpLnRoZW4oZnVuY3Rpb24oKXtjdHJsLmlzVHJhbnNpdGlvbmluZz0hMSxjdHJsLnZpc2libGU9ITAsY3RybC5kaWRTaG93JiZjdHJsLmRpZFNob3coaWQpfSl9LGhpZGU9ZnVuY3Rpb24oY3RybCxvcHRzKXt2YXIgaWQ9Y3RybC5pbnN0YW5jZUlkO3JldHVybiBjdHJsLmlzVHJhbnNpdGlvbmluZz0hMCxfdHJhbnNpdGlvbjJbXCJkZWZhdWx0XCJdLmhpZGUoT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtlbDpjdHJsLmVsLHNob3dDbGFzczpDU1NfQ0xBU1NFUy52aXNpYmxlfSkpLnRoZW4oZnVuY3Rpb24oKXtfZGlhbG9nMltcImRlZmF1bHRcIl0ucmVtb3ZlKGlkKSxjdHJsLmlzVHJhbnNpdGlvbmluZz0hMSxjdHJsLnZpc2libGU9ITEsY3RybC5kaWRIaWRlJiZjdHJsLmRpZEhpZGUoaWQpLHNldFRpbWVvdXQoX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcsMCl9KX0sY3JlYXRlVmlld0NvbnRlbnQ9ZnVuY3Rpb24oY3RybCxvcHRzKXt2YXIgc3R5bGU9e30sYm9keU9wdHM9b3B0cy5ib2R5fHxvcHRzLm1lbnU7cmV0dXJuKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmJvZHksIFwic3R5bGVcIjogc3R5bGUsIFwiY29uZmlnXCI6IGZ1bmN0aW9uKGVsLGluaXRlZCl7aW5pdGVkfHwoY3RybC5zY3JvbGxFbD1lbCl9LCBcIm9uc2Nyb2xsXCI6IGZ1bmN0aW9uKCl7Y3RybC5pc1Njcm9sbGluZz0hMCx1cGRhdGVTY3JvbGxTdGF0ZShjdHJsKSxjbGVhclRpbWVvdXQoY3RybC5zY3JvbGxXYXRjaElkKSxjdHJsLnNjcm9sbFdhdGNoSWQ9c2V0VGltZW91dChmdW5jdGlvbigpe2N0cmwuaXNTY3JvbGxpbmc9ITF9LFNDUk9MTF9XQVRDSF9USU1FUil9IH0sIGNoaWxkcmVuOiBbIGJvZHlPcHRzIF0gfSl9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSxib2R5T3B0cz1vcHRzLmJvZHl8fG9wdHMubWVudSx1cGRhdGVDb250ZW50T25TY3JvbGw9b3B0cy51cGRhdGVDb250ZW50T25TY3JvbGx8fCExLGlnbm9yZUNvbnRlbnQ9IXVwZGF0ZUNvbnRlbnRPblNjcm9sbCYmY3RybC5pc1Njcm9sbGluZyx0YWc9b3B0cy50YWd8fFwiZm9ybVwiLHVwZGF0ZT1mdW5jdGlvbigpe3VwZGF0ZVNjcm9sbFN0YXRlKGN0cmwpLHVwZGF0ZUZvb3RlclN0YXRlKGN0cmwpLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCl9LHByb3BzPU9iamVjdC5hc3NpZ24oe30se1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5mdWxsc2NyZWVuP0NTU19DTEFTU0VTLmZ1bGxzY3JlZW46bnVsbCxvcHRzLmJhY2tkcm9wP0NTU19DTEFTU0VTLmhhc0JhY2tkcm9wOm51bGwsY3RybC50b3BPdmVyZmxvd3x8b3B0cy5ib3JkZXJzP0NTU19DTEFTU0VTLmhhc1RvcE92ZXJmbG93Om51bGwsY3RybC5ib3R0b21PdmVyZmxvd3x8b3B0cy5ib3JkZXJzP0NTU19DTEFTU0VTLmhhc0JvdHRvbU92ZXJmbG93Om51bGwsY3RybC52aXNpYmxlP0NTU19DTEFTU0VTLnZpc2libGU6bnVsbCxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOmZ1bmN0aW9uKGVsLGluaXRlZCxjb250ZXh0LHZkb20pe2lmKCFpbml0ZWQpe29wdHMuY29uZmlnJiZvcHRzLmNvbmZpZyhlbCxpbml0ZWQsY29udGV4dCx2ZG9tKSxjdHJsLmVsPWVsO3ZhciBjbGVhbnVwPWZ1bmN0aW9uKCl7X2V2ZW50czJbXCJkZWZhdWx0XCJdLnVuc3Vic2NyaWJlKFwicmVzaXplXCIsdXBkYXRlKSxfZXZlbnRzMltcImRlZmF1bHRcIl0udW5zdWJzY3JpYmUoXCJrZXlkb3duXCIsaGFuZGxlRXNjYXBlKX0saGFuZGxlRXNjYXBlPWZ1bmN0aW9uKGUpe29wdHMuZnVsbHNjcmVlbnx8b3B0cy5iYWNrZHJvcHx8Mjc9PT1lLndoaWNoJiYoY2xlYW51cCgpLGhpZGUoY3RybCxPYmplY3QuYXNzaWduKHt9LG9wdHMse2hpZGVEZWxheTowfSkpKX07X2V2ZW50czJbXCJkZWZhdWx0XCJdLnN1YnNjcmliZShcInJlc2l6ZVwiLHVwZGF0ZSksX2V2ZW50czJbXCJkZWZhdWx0XCJdLnN1YnNjcmliZShcImtleWRvd25cIixoYW5kbGVFc2NhcGUpLGNvbnRleHQub251bmxvYWQ9ZnVuY3Rpb24oKXtjbGVhbnVwKCl9LHVwZGF0ZVNjcm9sbFN0YXRlKGN0cmwpLHVwZGF0ZUZvb3RlclN0YXRlKGN0cmwpLHNob3coY3RybCxvcHRzKS50aGVuKGZ1bmN0aW9uKCl7dXBkYXRlU2Nyb2xsU3RhdGUoY3RybCksdXBkYXRlRm9vdGVyU3RhdGUoY3RybCksKGN0cmwudG9wT3ZlcmZsb3d8fGN0cmwuYm90dG9tT3ZlcmZsb3cpJiZzZXRUaW1lb3V0KF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3LDApfSl9fSxvbmNsaWNrOmZ1bmN0aW9uKGUpe2UudGFyZ2V0PT09Y3RybC5lbCYmKG9wdHMubW9kYWx8fGN0cmwuaXNUcmFuc2l0aW9uaW5nfHxoaWRlKGN0cmwsT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtoaWRlRGVsYXk6MH0pKSl9fSxvcHRzLmZvcm1PcHRpb25zP29wdHMuZm9ybU9wdGlvbnM6bnVsbCksYm9keT1ib2R5T3B0cz9pZ25vcmVDb250ZW50P3tzdWJ0cmVlOlwicmV0YWluXCJ9OmNyZWF0ZVZpZXdDb250ZW50KGN0cmwsb3B0cyk6bnVsbCxjb250ZW50PSh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBbQ1NTX0NMQVNTRVMuY29udGVudCxvcHRzLm1lbnU/Q1NTX0NMQVNTRVMubWVudUNvbnRlbnQ6bnVsbF0uam9pbihcIiBcIikgfSwgY2hpbGRyZW46IFsgb3B0cy5mdWxsc2NyZWVuP251bGw6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3NoYWRvdzJbXCJkZWZhdWx0XCJdLHt6OmN0cmwueixhbmltYXRlZDohMH0pLG9wdHMuZnVsbHNjcmVlbj9udWxsOm9wdHMudGl0bGU/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmhlYWRlciwgXCJjb25maWdcIjogZnVuY3Rpb24oZWwpe2N0cmwuaGVhZGVySGVpZ2h0PWVsLnNjcm9sbEhlaWdodH0gfSwgY2hpbGRyZW46IFsgKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLnRpdGxlIH0sIGNoaWxkcmVuOiBbIG9wdHMudGl0bGUgXSB9KSBdIH0pOm51bGwsYm9keSxvcHRzLmZ1bGxzY3JlZW4/bnVsbDpvcHRzLmZvb3Rlcj8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuZm9vdGVyLCBcImNvbmZpZ1wiOiBmdW5jdGlvbihlbCxpbml0ZWQpe2N0cmwuZm9vdGVySGVpZ2h0PWVsLnNjcm9sbEhlaWdodCxpbml0ZWR8fChjdHJsLmZvb3RlckVsPWVsKX0gfSwgY2hpbGRyZW46IFsgKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmFjdGlvbnMgfSwgY2hpbGRyZW46IFsgb3B0cy5mb290ZXIgXSB9KSBdIH0pOm51bGwgXSB9KTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e2NvbnRyb2xsZXI6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2VEYXRhPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF0sb3B0cz1pbnN0YW5jZURhdGEub3B0c3x8e30sej12b2lkIDAhPT1vcHRzLno/b3B0cy56OjM7cmV0dXJuIE9iamVjdC5hc3NpZ24oe30saW5zdGFuY2VEYXRhLHtpbnN0YW5jZUlkOmluc3RhbmNlRGF0YS5pbnN0YW5jZUlkLHo6eixzY3JvbGxFbDpudWxsLGZvb3RlckVsOm51bGwsdG9wT3ZlcmZsb3c6ITEsYm90dG9tT3ZlcmZsb3c6ITEsc2Nyb2xsV2F0Y2hJZDowLGlzU2Nyb2xsaW5nOiExLGhlYWRlckhlaWdodDowLGZvb3RlckhlaWdodDowLGVsOm51bGwsdmlzaWJsZTohMSxpc1RyYW5zaXRpb25pbmc6ITF9KX0sdmlldzpmdW5jdGlvbihjdHJsLGluc3RhbmNlRGF0YSl7dmFyIG9wdHM9XCJmdW5jdGlvblwiPT10eXBlb2YgaW5zdGFuY2VEYXRhLm9wdHM/aW5zdGFuY2VEYXRhLm9wdHMoKTppbnN0YW5jZURhdGEub3B0cztyZXR1cm4gaW5zdGFuY2VEYXRhLmhpZGUmJiFjdHJsLmlzVHJhbnNpdGlvbmluZyYmaGlkZShjdHJsLG9wdHMpLGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpYWxvZy1pbnN0YW5jZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbXVsdGlwbGU9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbXVsdGlwbGVcIiksX211bHRpcGxlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tdWx0aXBsZSksX2RpYWxvZ0luc3RhbmNlPXJlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL2RpYWxvZy1pbnN0YW5jZVwiKSxfZGlhbG9nSW5zdGFuY2UyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RpYWxvZ0luc3RhbmNlKTtleHBvcnRzW1wiZGVmYXVsdFwiXT0oMCxfbXVsdGlwbGUyW1wiZGVmYXVsdFwiXSkoe2luc3RhbmNlOl9kaWFsb2dJbnN0YW5jZTJbXCJkZWZhdWx0XCJdLGRlZmF1bHRJZDpcImRlZmF1bHRfZGlhbG9nXCIsdGFnOlwiLnBlLWRpYWxvZ19faG9sZGVyXCIsbm9uZVRhZzpcInNwYW4ucGUtZGlhbG9nX19wbGFjZWhvbGRlclwiLGJvZHlTaG93Q2xhc3M6XCJwZS1kaWFsb2ctLW9wZW5cIn0pLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlhbG9nLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtZGlhbG9nXCIse1wiJi5wZS1kaWFsb2ctLWJhY2tkcm9wXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYmFja2Ryb3BfYmFja2dyb3VuZFwiXX0sXCIgLnBlLWRpYWxvZ19fY29udGVudFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2NvbnRlbnRfYmFja2dyb3VuZFwiXX0sXCIgLnBlLWRpYWxvZ19faGVhZGVyIC5wZS1kaWFsb2dfX3RpdGxlXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfdGl0bGVfdGV4dFwiXX0sXCIgLnBlLWRpYWxvZ19fYm9keVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvZHlfdGV4dFwiXX0sXCImLnBlLWRpYWxvZy0tb3ZlcmZsb3ctdG9wIC5wZS1kaWFsb2dfX2JvZHlcIjp7XCJib3JkZXItdG9wLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib2R5X2JvcmRlclwiXX0sXCImLnBlLWRpYWxvZy0tb3ZlcmZsb3ctYm90dG9tIC5wZS1kaWFsb2dfX2JvZHlcIjp7XCJib3JkZXItYm90dG9tLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib2R5X2JvcmRlclwiXX19KV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiKSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcIiZcIildfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLHJnYmE9X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmE7ZXhwb3J0c1tcImRlZmF1bHRcIl09e2JvcmRlcl9yYWRpdXM6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfYmxvY2tfYm9yZGVyX3JhZGl1cyxwYWRkaW5nOjMqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQsaGVhZGVyX2JvdHRvbToyMCxoZWFkZXJfaGVpZ2h0OjYwLGZvb3Rlcl9oZWlnaHQ6NTIsY29sb3JfbGlnaHRfY29udGVudF9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2JhY2tncm91bmQpLGNvbG9yX2xpZ2h0X3RpdGxlX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5KSxjb2xvcl9saWdodF9ib2R5X3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9yZWd1bGFyKSxjb2xvcl9saWdodF9ib2R5X2JvcmRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9ib3JkZXJfbGlnaHQpLGNvbG9yX2xpZ2h0X2JhY2tkcm9wX2JhY2tncm91bmQ6XCJyZ2JhKDAsIDAsIDAsIC40KVwiLGNvbG9yX2RhcmtfY29udGVudF9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfYmFja2dyb3VuZCksY29sb3JfZGFya190aXRsZV90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3ByaW1hcnkpLGNvbG9yX2RhcmtfYm9keV90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3JlZ3VsYXIpLGNvbG9yX2RhcmtfYm9keV9ib3JkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JvcmRlcl9saWdodCksY29sb3JfZGFya19iYWNrZHJvcF9iYWNrZ3JvdW5kOlwicmdiYSgwLCAwLCAwLCAuNSlcIn0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksX2ZsZXg9cmVxdWlyZShcInBvbHl0aGVuZS9sYXlvdXQvdGhlbWUvZmxleFwiKSxfZmxleDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleCksY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7dmFyIHBhZGRpbmc9Y29uZmlnLnBhZGRpbmc7cmV0dXJuW3tcIi5wZS1kaWFsb2dcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRDZW50ZXJDZW50ZXIsX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6XCJlYXNlLW91dFwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInRyYW5zaXRpb24tcHJvcGVydHlcIjpcIm9wYWNpdHlcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLHtwb3NpdGlvbjpcImZpeGVkXCIsdG9wOjAsbGVmdDowLHJpZ2h0OjAsYm90dG9tOjAsXCJ6LWluZGV4XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnpfZGlhbG9nLGhlaWdodDpcIjEwMCVcIixwYWRkaW5nOnBhZGRpbmcrXCJweCA0MHB4XCIsb3BhY2l0eTowLFwiJi5wZS1kaWFsb2ctLXZpc2libGVcIjp7b3BhY2l0eToxfSxcIiYucGUtZGlhbG9nLS1mdWxsc2NyZWVuXCI6e3BhZGRpbmc6MCxcIiAucGUtZGlhbG9nX19jb250ZW50XCI6e1wiYm9yZGVyLXJhZGl1c1wiOjAsXCJtYXgtd2lkdGhcIjpcIm5vbmVcIixoZWlnaHQ6XCIxMDAlXCIsd2lkdGg6XCIxMDAlXCIsXCIgLnBlLWRpYWxvZ19faGVhZGVyLCAucGUtZGlhbG9nX19mb290ZXJcIjp7ZGlzcGxheTpcIm5vbmVcIn0sXCIgLnBlLWRpYWxvZ19fYm9keVwiOntwYWRkaW5nOjAsaGVpZ2h0OlwiMTAwdmhcIixib3JkZXI6XCJub25lXCIsXCJtYXgtaGVpZ2h0XCI6XCJjYWxjKDEwMHZoKVwifX19LFwiIC5wZS1kaWFsb2dfX2hlYWRlciwgcGUtZGlhbG9nX19ib2R5LCBwZS1kaWFsb2dfX2hlYWRlclwiOntcInotaW5kZXhcIjoxfSxcIiAucGUtZGlhbG9nX19jb250ZW50XCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0VmVydGljYWwse3Bvc2l0aW9uOlwicmVsYXRpdmVcIixcIm1heC1oZWlnaHRcIjpcIjEwMCVcIixcIm1pbi13aWR0aFwiOlwiMjgwcHhcIixcIm1heC13aWR0aFwiOjcqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9tZW51K1wicHhcIixcImJvcmRlci1yYWRpdXNcIjpjb25maWcuYm9yZGVyX3JhZGl1cytcInB4XCIsXCIgPiAucGUtc2hhZG93XCI6e1wiei1pbmRleFwiOi0xfSxcIiYucGUtbWVudV9fY29udGVudFwiOntcIiAucGUtZGlhbG9nX19ib2R5XCI6e3BhZGRpbmc6MCxib3JkZXI6XCJub25lXCJ9fX1dLFwiIC5wZS1kaWFsb2dfX3RpdGxlXCI6e1wiZm9udC1zaXplXCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfc2l6ZV90aXRsZStcInB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbWVkaXVtLGRpc3BsYXk6XCJibG9ja1wiLFwiJiArIGRpdlwiOntcIm1hcmdpbi10b3BcIjpcIjE2cHhcIn19LFwiIC5wZS1kaWFsb2dfX2hlYWRlclwiOntwYWRkaW5nOltwYWRkaW5nLTQscGFkZGluZyxjb25maWcuaGVhZGVyX2JvdHRvbS00LHBhZGRpbmddLm1hcChmdW5jdGlvbih2KXtyZXR1cm4gditcInB4XCJ9KS5qb2luKFwiIFwiKSxcIm1pbi1oZWlnaHRcIjpjb25maWcuaGVhZGVyX2hlaWdodCtcInB4XCIsXCIgLnBlLWRpYWxvZ19fdGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoKSx7ZGlzcGxheTpcImJsb2NrXCIsd2lkdGg6XCIxMDAlXCJ9XX0sXCIgLnBlLWRpYWxvZ19fYm9keVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLnNlbGZTdHJldGNoLF9taXhpbjJbXCJkZWZhdWx0XCJdLmhhaXJsaW5lKFwiYm9yZGVyLXRvcFwiKSx7XCJib3JkZXItdG9wLXN0eWxlXCI6XCJzb2xpZFwifSxfbWl4aW4yW1wiZGVmYXVsdFwiXS5oYWlybGluZShcImJvcmRlci10b3BcIikse1wiYm9yZGVyLWJvdHRvbS1zdHlsZVwiOlwic29saWRcIn0se3BhZGRpbmc6W3BhZGRpbmcscGFkZGluZyxwYWRkaW5nLTUscGFkZGluZ10ubWFwKGZ1bmN0aW9uKHYpe3JldHVybiB2K1wicHhcIn0pLmpvaW4oXCIgXCIpLFwib3ZlcmZsb3cteVwiOlwiYXV0b1wiLFwiLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmdcIjpcInRvdWNoXCIsXCJib3JkZXItd2lkdGhcIjpcIjFweFwiLFwiYm9yZGVyLXN0eWxlXCI6XCJzb2xpZCBub25lXCIsXCJib3JkZXItY29sb3JcIjpcInRyYW5zcGFyZW50XCIsXCJtYXgtaGVpZ2h0XCI6XCJjYWxjKDEwMHZoIC0gXCIrMipwYWRkaW5nK1wicHggLSBcIisoY29uZmlnLmhlYWRlcl9oZWlnaHQrY29uZmlnLmZvb3Rlcl9oZWlnaHQpK1wicHgpXCJ9XSxcIiAucGUtZGlhbG9nX19oZWFkZXIgKyAucGUtZGlhbG9nX19ib2R5XCI6e1wicGFkZGluZy10b3BcIjowfSxcIiAucGUtZGlhbG9nX19mb290ZXJcIjp7cGFkZGluZzpcIjJweCA4cHhcIixcIm1pbi1oZWlnaHRcIjpjb25maWcuZm9vdGVyX2hlaWdodCtcInB4XCIsXCJmb250LXNpemVcIjowLFwiJi5wZS1kaWFsb2dfX2Zvb3Rlci0taGlnaFwiOntcInBhZGRpbmctYm90dG9tXCI6XCI4cHhcIn19LFwiIC5wZS1kaWFsb2dfX2FjdGlvbnNcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRIb3Jpem9udGFsLF9mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0RW5kSnVzdGlmaWVkLF9mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0V3JhcCx7bWFyZ2luOlwiMCAtNHB4XCIsXCIgLnBlLWJ1dHRvblwiOntoZWlnaHQ6XCIzNnB4XCIsXCJtYXJnaW4tdG9wXCI6XCI2cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjZweFwiLHBhZGRpbmc6MH19XX1dLFwiIGJvZHkucGUtZGlhbG9nLS1vcGVuXCI6e292ZXJmbG93OlwiaGlkZGVuXCIsbGVmdDowLFwiLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmdcIjpcInRvdWNoXCIscG9zaXRpb246XCJmaXhlZFwiLHRvcDowLHdpZHRoOlwiMTAwJVwifX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5kaWFsb2csY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1kaWFsb2dcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX3dlYmZvbnRsb2FkZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vd2ViZm9udGxvYWRlclwiKSxfd2ViZm9udGxvYWRlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2ViZm9udGxvYWRlcik7X3dlYmZvbnRsb2FkZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJnb29nbGVcIixcIlJvYm90bzo0MDAsNTAwLDcwMCw0MDBpdGFsaWM6bGF0aW5cIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfc3ZnPXJlcXVpcmUoXCJwb2x5dGhlbmUvc3ZnL3N2Z1wiKSxfc3ZnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdmcpO3JlcXVpcmUoXCJwb2x5dGhlbmUvaWNvbi90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2ljb246XCJwZS1pY29uXCIsYXZhdGFyOlwicGUtaWNvbi0tYXZhdGFyXCIsc21hbGw6XCJwZS1pY29uLS1zbWFsbFwiLHJlZ3VsYXI6XCJwZS1pY29uLS1yZWd1bGFyXCIsbWVkaXVtOlwicGUtaWNvbi0tbWVkaXVtXCIsbGFyZ2U6XCJwZS1pY29uLS1sYXJnZVwifSx0eXBlQ2xhc3Nlcz17c21hbGw6Q1NTX0NMQVNTRVMuc21hbGwscmVndWxhcjpDU1NfQ0xBU1NFUy5yZWd1bGFyLG1lZGl1bTpDU1NfQ0xBU1NFUy5tZWRpdW0sbGFyZ2U6Q1NTX0NMQVNTRVMubGFyZ2V9LGNsYXNzRm9yVHlwZT1mdW5jdGlvbigpe3ZhciBtb2RlPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9cInJlZ3VsYXJcIjphcmd1bWVudHNbMF07cmV0dXJuIHR5cGVDbGFzc2VzW21vZGVdfSxsYXlvdXRDb250ZW50PWZ1bmN0aW9uKG9wdHMpe2lmKG9wdHMuY29udGVudClyZXR1cm4gb3B0cy5jb250ZW50O2lmKG9wdHMuc3ZnKXt2YXIgc3ZnT3B0cz1PYmplY3QuYXNzaWduKHt9LG9wdHMuc3ZnKTtyZXR1cm4gc3ZnT3B0cy50YWc9c3ZnT3B0cy50YWd8fFwiaVwiLF9taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9zdmcyW1wiZGVmYXVsdFwiXSxzdmdPcHRzKX1yZXR1cm4gb3B0cy5tc3ZnPygwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKFwiaS5wZS1zdmdcIixfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnRydXN0KG9wdHMubXN2ZykpOih7IHRhZzogXCJpXCIsIGF0dHJzOiB7ICB9LCBjaGlsZHJlbjogWyAoeyB0YWc6IFwiaW1nXCIsIGF0dHJzOiB7IFwic3JjXCI6IG9wdHMuc3JjIH0sIGNoaWxkcmVuOiBbXSB9KSBdIH0pfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPU9iamVjdC5hc3NpZ24oe30se1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuaWNvbixjbGFzc0ZvclR5cGUob3B0cy50eXBlKSxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxvcHRzLmV2ZW50cz9vcHRzLmV2ZW50czpudWxsKSxjb250ZW50PWxheW91dENvbnRlbnQob3B0cyk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXt2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWljb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtzaXplX3NtYWxsOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2ljb25fc2l6ZV9zbWFsbCxzaXplX3JlZ3VsYXI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaWNvbl9zaXplLHNpemVfbWVkaXVtOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2ljb25fc2l6ZV9tZWRpdW0sc2l6ZV9sYXJnZTpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pY29uX3NpemVfbGFyZ2V9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLGljb25TaXplc1B4PWZ1bmN0aW9uKCl7dmFyIHNpemU9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP19jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2ljb25fc2l6ZTphcmd1bWVudHNbMF07cmV0dXJue3dpZHRoOnNpemUrXCJweFwiLGhlaWdodDpzaXplK1wicHhcIn19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtaWNvblwiOntkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXCJ2ZXJ0aWNhbC1hbGlnblwiOlwibWlkZGxlXCIsXCJiYWNrZ3JvdW5kLXJlcGVhdFwiOlwibm8tcmVwZWF0XCIsZmlsbDpcImN1cnJlbnRjb2xvclwiLHBvc2l0aW9uOlwicmVsYXRpdmVcIixcIiYucGUtaWNvbi0tYXZhdGFyIGltZ1wiOntib3JkZXI6XCJub25lXCIsXCJib3JkZXItcmFkaXVzXCI6XCI1MCVcIix3aWR0aDpcIjEwMCVcIixoZWlnaHQ6XCIxMDAlXCJ9LFwiIGlcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse2Rpc3BsYXk6XCJibG9ja1wiLFwiZm9udC1zaXplXCI6XCJpbmhlcml0XCIsY29sb3I6XCJpbmhlcml0XCIsXCJsaW5lLWhlaWdodFwiOlwiaW5oZXJpdFwiLGhlaWdodDpcIjEwMCVcIixcIiBpbWdcIjp7aGVpZ2h0OlwiMTAwJVwifSxcIiBzdmdcIjp7d2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwiLGZpbGw6XCJjdXJyZW50Y29sb3JcIixjb2xvcjpcImluaGVyaXRcIixcIiBwYXRoOm5vdChbZmlsbD1ub25lXSlcIjp7ZmlsbDpcImN1cnJlbnRjb2xvclwifX19XSxcIiYucGUtaWNvbi0tc21hbGxcIjppY29uU2l6ZXNQeChjb25maWcuc2l6ZV9zbWFsbCksXCImLnBlLWljb24tLXJlZ3VsYXJcIjppY29uU2l6ZXNQeChjb25maWcuc2l6ZV9yZWd1bGFyKSxcIiYucGUtaWNvbi0tbWVkaXVtXCI6aWNvblNpemVzUHgoY29uZmlnLnNpemVfbWVkaXVtKSxcIiYucGUtaWNvbi0tbGFyZ2VcIjppY29uU2l6ZXNQeChjb25maWcuc2l6ZV9sYXJnZSl9fV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2ljb24vdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvaWNvbi90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5pY29uLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtaWNvblwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbGF5b3V0PVt7ZGlzcGxheTpcIi13ZWJraXQtYm94XCJ9LHtkaXNwbGF5OlwiLW1vei1ib3hcIn0se2Rpc3BsYXk6XCItbXMtZmxleGJveFwiLFwiLW1zLWZsZXgtcHJlZmVycmVkLXNpemVcIjpcImluaXRpYWxcIn0se2Rpc3BsYXk6XCItd2Via2l0LWZsZXhcIn0se2Rpc3BsYXk6XCJmbGV4XCJ9XSxsYXlvdXRJbmxpbmU9W2xheW91dCx7ZGlzcGxheTpcIi1tcy1pbmxpbmUtZmxleGJveFwifSx7ZGlzcGxheTpcIi13ZWJraXQtaW5saW5lLWZsZXhcIn0se2Rpc3BsYXk6XCJpbmxpbmUtZmxleFwifV0sbGF5b3V0SG9yaXpvbnRhbD1bbGF5b3V0LHtcIi1tcy1mbGV4LWRpcmVjdGlvblwiOlwicm93XCIsXCItd2Via2l0LWZsZXgtZGlyZWN0aW9uXCI6XCJyb3dcIixcImZsZXgtZGlyZWN0aW9uXCI6XCJyb3dcIn1dLGxheW91dEhvcml6b250YWxSZXZlcnNlPVtsYXlvdXQse1wiLW1zLWZsZXgtZGlyZWN0aW9uXCI6XCJyb3ctcmV2ZXJzZVwiLFwiLXdlYmtpdC1mbGV4LWRpcmVjdGlvblwiOlwicm93LXJldmVyc2VcIixcImZsZXgtZGlyZWN0aW9uXCI6XCJyb3ctcmV2ZXJzZVwifV0sbGF5b3V0VmVydGljYWw9W2xheW91dCx7XCItbXMtZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtblwiLFwiLXdlYmtpdC1mbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uXCIsXCJmbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uXCJ9XSxsYXlvdXRWZXJ0aWNhbFJldmVyc2U9W2xheW91dCx7XCItbXMtZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtbi1yZXZlcnNlXCIsXCItd2Via2l0LWZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW4tcmV2ZXJzZVwiLFwiZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtbi1yZXZlcnNlXCJ9XSxsYXlvdXRXcmFwPVtsYXlvdXQse1wiLW1zLWZsZXgtd3JhcFwiOlwid3JhcFwiLFwiLXdlYmtpdC1mbGV4LXdyYXBcIjpcIndyYXBcIixcImZsZXgtd3JhcFwiOlwid3JhcFwifV0sbGF5b3V0V3JhcFJldmVyc2U9W2xheW91dCx7XCItbXMtZmxleC13cmFwXCI6XCJ3cmFwLXJldmVyc2VcIixcIi13ZWJraXQtZmxleC13cmFwXCI6XCJ3cmFwLXJldmVyc2VcIixcImZsZXgtd3JhcFwiOlwid3JhcC1yZXZlcnNlXCJ9XSxsYXlvdXRTdGFydD1bbGF5b3V0LHtcIi1tcy1mbGV4LWFsaWduXCI6XCJzdGFydFwiLFwiLXdlYmtpdC1hbGlnbi1pdGVtc1wiOlwiZmxleC1zdGFydFwiLFwiYWxpZ24taXRlbXNcIjpcImZsZXgtc3RhcnRcIn1dLGxheW91dENlbnRlcj1bbGF5b3V0LHtcIi1tcy1mbGV4LWFsaWduXCI6XCJjZW50ZXJcIixcIi13ZWJraXQtYWxpZ24taXRlbXNcIjpcImNlbnRlclwiLFwiYWxpZ24taXRlbXNcIjpcImNlbnRlclwifV0sbGF5b3V0RW5kPVtsYXlvdXQse1wiLW1zLWZsZXgtYWxpZ25cIjpcImVuZFwiLFwiLXdlYmtpdC1hbGlnbi1pdGVtc1wiOlwiZmxleC1lbmRcIixcImFsaWduLWl0ZW1zXCI6XCJmbGV4LWVuZFwifV0sbGF5b3V0SnVzdGlmaWVkPVtsYXlvdXQse1wiLW1zLWZsZXgtbGluZS1wYWNrXCI6XCJzdHJldGNoXCIsXCItbXMtZmxleC1wYWNrXCI6XCJqdXN0aWZ5XCIsXCItd2Via2l0LWp1c3RpZnktY29udGVudFwiOlwic3BhY2UtYmV0d2VlblwiLFwianVzdGlmeS1jb250ZW50XCI6XCJzcGFjZS1iZXR3ZWVuXCJ9XSxsYXlvdXRTdGFydEp1c3RpZmllZD1bbGF5b3V0LHtcIi1tcy1mbGV4LWFsaWduXCI6XCJzdGFydFwiLFwiLW1zLWZsZXgtcGFja1wiOlwic3RhcnRcIixcIi13ZWJraXQtanVzdGlmeS1jb250ZW50XCI6XCJmbGV4LXN0YXJ0XCIsXCJqdXN0aWZ5LWNvbnRlbnRcIjpcImZsZXgtc3RhcnRcIn1dLGxheW91dENlbnRlckp1c3RpZmllZD1bbGF5b3V0LHtcIi1tcy1mbGV4LXBhY2tcIjpcImNlbnRlclwiLFwiLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnRcIjpcImNlbnRlclwiLFwianVzdGlmeS1jb250ZW50XCI6XCJjZW50ZXJcIn1dLGxheW91dEVuZEp1c3RpZmllZD1bbGF5b3V0LHtcIi1tcy1mbGV4LXBhY2tcIjpcImVuZFwiLFwiLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnRcIjpcImZsZXgtZW5kXCIsXCJqdXN0aWZ5LWNvbnRlbnRcIjpcImZsZXgtZW5kXCJ9XSxsYXlvdXRDZW50ZXJDZW50ZXI9W2xheW91dENlbnRlckp1c3RpZmllZCxsYXlvdXRDZW50ZXJdLGxheW91dEFyb3VuZEp1c3RpZmllZD1bbGF5b3V0LHtcIi1tcy1mbGV4LXBhY2tcIjpcImRpc3RyaWJ1dGVcIixcIi13ZWJraXQtanVzdGlmeS1jb250ZW50XCI6XCJzcGFjZS1hcm91bmRcIixcImp1c3RpZnktY29udGVudFwiOlwic3BhY2UtYXJvdW5kXCJ9XSxmbGV4PWZ1bmN0aW9uKCl7dmFyIG51bT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/MTphcmd1bWVudHNbMF07cmV0dXJuW3tcIi13ZWJraXQtYm94LWZsZXhcIjpudW19LHtcIi1tb3otYm94LWZsZXhcIjpudW19LHtcIi13ZWJraXQtZmxleFwiOm51bX0se1wiLW1zLWZsZXhcIjpudW19LHtmbGV4Om51bX0sMT09PW51bT97XCItd2Via2l0LWZsZXgtYmFzaXNcIjpcIjAuMDAwMDAwMDAxcHhcIn06e30sMT09PW51bT97XCJmbGV4LWJhc2lzXCI6XCIwLjAwMDAwMDAwMXB4XCJ9Ont9XX0sZmxleEF1dG89e1wiLW1zLWZsZXhcIjpcIjEgMSBhdXRvXCIsXCItd2Via2l0LWZsZXgtYmFzaXNcIjpcImF1dG9cIixcImZsZXgtYmFzaXNcIjpcImF1dG9cIn0sZmxleEF1dG9WZXJ0aWNhbD17XCItbXMtZmxleFwiOlwiMSAxIGF1dG9cIixcIi13ZWJraXQtZmxleC1iYXNpc1wiOlwiYXV0b1wiLFwiZmxleC1iYXNpc1wiOlwiYXV0b1wifSxmbGV4SW5kZXg9ZnVuY3Rpb24oaW5kZXgpe3JldHVybntcIi1tcy1mbGV4XCI6aW5kZXgsXCItd2Via2l0LWZsZXhcIjppbmRleCxmbGV4OmluZGV4fX0sc2VsZlN0YXJ0PXtcIi1tcy1mbGV4LWl0ZW0tYWxpZ25cIjpcInN0YXJ0XCIsXCItbXMtYWxpZ24tc2VsZlwiOlwiZmxleC1zdGFydFwiLFwiLXdlYmtpdC1hbGlnbi1zZWxmXCI6XCJmbGV4LXN0YXJ0XCIsXCJhbGlnbi1zZWxmXCI6XCJmbGV4LXN0YXJ0XCJ9LHNlbGZDZW50ZXI9e1wiLW1zLWZsZXgtaXRlbS1hbGlnblwiOlwiY2VudGVyXCIsXCItbXMtYWxpZ24tc2VsZlwiOlwiY2VudGVyXCIsXCItd2Via2l0LWFsaWduLXNlbGZcIjpcImNlbnRlclwiLFwiYWxpZ24tc2VsZlwiOlwiY2VudGVyXCJ9LHNlbGZFbmQ9e1wiLW1zLWZsZXgtaXRlbS1hbGlnblwiOlwiZW5kXCIsXCItbXMtYWxpZ24tc2VsZlwiOlwiZmxleC1lbmRcIixcIi13ZWJraXQtYWxpZ24tc2VsZlwiOlwiZmxleC1lbmRcIixcImFsaWduLXNlbGZcIjpcImZsZXgtZW5kXCJ9LHNlbGZTdHJldGNoPXtcIi1tcy1mbGV4LWl0ZW0tYWxpZ25cIjpcInN0cmV0Y2hcIixcIi1tcy1hbGlnbi1zZWxmXCI6XCJzdHJldGNoXCIsXCItd2Via2l0LWFsaWduLXNlbGZcIjpcInN0cmV0Y2hcIixcImFsaWduLXNlbGZcIjpcInN0cmV0Y2hcIn07ZXhwb3J0c1tcImRlZmF1bHRcIl09e2ZsZXg6ZmxleCxmbGV4QXV0bzpmbGV4QXV0byxmbGV4QXV0b1ZlcnRpY2FsOmZsZXhBdXRvVmVydGljYWwsZmxleEluZGV4OmZsZXhJbmRleCxsYXlvdXQ6bGF5b3V0LGxheW91dEFyb3VuZEp1c3RpZmllZDpsYXlvdXRBcm91bmRKdXN0aWZpZWQsbGF5b3V0Q2VudGVyOmxheW91dENlbnRlcixsYXlvdXRDZW50ZXJDZW50ZXI6bGF5b3V0Q2VudGVyQ2VudGVyLGxheW91dENlbnRlckp1c3RpZmllZDpsYXlvdXRDZW50ZXJKdXN0aWZpZWQsbGF5b3V0RW5kOmxheW91dEVuZCxsYXlvdXRFbmRKdXN0aWZpZWQ6bGF5b3V0RW5kSnVzdGlmaWVkLGxheW91dEhvcml6b250YWw6bGF5b3V0SG9yaXpvbnRhbCxsYXlvdXRIb3Jpem9udGFsUmV2ZXJzZTpsYXlvdXRIb3Jpem9udGFsUmV2ZXJzZSxsYXlvdXRJbmxpbmU6bGF5b3V0SW5saW5lLGxheW91dEp1c3RpZmllZDpsYXlvdXRKdXN0aWZpZWQsbGF5b3V0U3RhcnQ6bGF5b3V0U3RhcnQsbGF5b3V0U3RhcnRKdXN0aWZpZWQ6bGF5b3V0U3RhcnRKdXN0aWZpZWQsbGF5b3V0VmVydGljYWw6bGF5b3V0VmVydGljYWwsbGF5b3V0VmVydGljYWxSZXZlcnNlOmxheW91dFZlcnRpY2FsUmV2ZXJzZSxsYXlvdXRXcmFwOmxheW91dFdyYXAsbGF5b3V0V3JhcFJldmVyc2U6bGF5b3V0V3JhcFJldmVyc2Usc2VsZkNlbnRlcjpzZWxmQ2VudGVyLHNlbGZFbmQ6c2VsZkVuZCxzZWxmU3RhcnQ6c2VsZlN0YXJ0LHNlbGZTdHJldGNoOnNlbGZTdHJldGNofSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZsZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX2ljb249cmVxdWlyZShcInBvbHl0aGVuZS9pY29uL2ljb25cIiksX2ljb24yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ljb24pLF9yaXBwbGU9cmVxdWlyZShcInBvbHl0aGVuZS9yaXBwbGUvcmlwcGxlXCIpLF9yaXBwbGUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JpcHBsZSk7cmVxdWlyZShcInBvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLWxpc3QtdGlsZVwiLHByaW1hcnk6XCJwZS1saXN0LXRpbGVfX3ByaW1hcnlcIixzZWNvbmRhcnk6XCJwZS1saXN0LXRpbGVfX3NlY29uZGFyeVwiLGNvbnRlbnQ6XCJwZS1saXN0LXRpbGVfX2NvbnRlbnRcIixjb250ZW50RnJvbnQ6XCJwZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250XCIsdGl0bGU6XCJwZS1saXN0LXRpbGVfX3RpdGxlXCIsc3VidGl0bGU6XCJwZS1saXN0LXRpbGVfX3N1YnRpdGxlXCIsaGlnaFN1YnRpdGxlOlwicGUtbGlzdC10aWxlX19zdWJ0aXRsZS0taGlnaFwiLHNlbGVjdGVkOlwicGUtbGlzdC10aWxlLS1zZWxlY3RlZFwiLGRpc2FibGVkOlwicGUtbGlzdC10aWxlLS1kaXNhYmxlZFwiLHN0aWNreTpcInBlLWxpc3QtdGlsZS0tc3RpY2t5XCIsaGFzU3VidGl0bGU6XCJwZS1saXN0LXRpbGUtLXN1YnRpdGxlXCIsaGFzSGlnaFN1YnRpdGxlOlwicGUtbGlzdC10aWxlLS1oaWdoLXN1YnRpdGxlXCIsaGFzRnJvbnQ6XCJwZS1saXN0LXRpbGUtLWZyb250XCIsaXNDb21wYWN0OlwicGUtbGlzdC10aWxlLS1jb21wYWN0XCJ9LHBhcnNlUHJpbWFyeUNvbnRlbnQ9ZnVuY3Rpb24ob3B0cyl7dmFyIHRhZz1vcHRzLnRhZz9vcHRzLnRhZzpvcHRzLnVybD9cImFcIjpcImRpdlwiLGZyb250Q29tcD1vcHRzLmZyb250Pyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50K1wiIFwiK0NTU19DTEFTU0VTLmNvbnRlbnRGcm9udCB9LCBjaGlsZHJlbjogWyBvcHRzLmZyb250IF0gfSk6b3B0cy5pbmRlbnQ/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQrXCIgXCIrQ1NTX0NMQVNTRVMuY29udGVudEZyb250IH0sIGNoaWxkcmVuOiBbXSB9KTpudWxsO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxPYmplY3QuYXNzaWduKHtcImNsYXNzXCI6Q1NTX0NMQVNTRVMucHJpbWFyeX0sb3B0cy51cmwsb3B0cy5ldmVudHMpLFtmcm9udENvbXAsKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQgfSwgY2hpbGRyZW46IFsgb3B0cy5jb250ZW50P29wdHMuY29udGVudDpudWxsLG9wdHMudGl0bGU/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLnRpdGxlIH0sIGNoaWxkcmVuOiBbIG9wdHMudGl0bGUgXSB9KTpudWxsLG9wdHMuc3VidGl0bGU/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLnN1YnRpdGxlIH0sIGNoaWxkcmVuOiBbIG9wdHMuc3VidGl0bGUgXSB9KTpudWxsLG9wdHMuaGlnaFN1YnRpdGxlPyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5zdWJ0aXRsZStcIiBcIitDU1NfQ0xBU1NFUy5oaWdoU3VidGl0bGUgfSwgY2hpbGRyZW46IFsgb3B0cy5oaWdoU3VidGl0bGUgXSB9KTpudWxsIF0gfSldKX0scGFyc2VTZWNvbmRhcnlDb250ZW50PWZ1bmN0aW9uKG9wdHMpe3ZhciBzZWNvbmRhcnlPcHRzPW9wdHMuc2Vjb25kYXJ5fHx7fSx0YWc9dm9pZCAwO3JldHVybiB0YWc9c2Vjb25kYXJ5T3B0cy50YWc/c2Vjb25kYXJ5T3B0cy50YWc6c2Vjb25kYXJ5T3B0cy51cmw/XCJhXCI6XCJkaXZcIiwoMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcsT2JqZWN0LmFzc2lnbih7XCJjbGFzc1wiOkNTU19DTEFTU0VTLnNlY29uZGFyeX0sc2Vjb25kYXJ5T3B0cy51cmwsc2Vjb25kYXJ5T3B0cy5ldmVudHMpLCh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50IH0sIGNoaWxkcmVuOiBbIHNlY29uZGFyeU9wdHMuaWNvbj9fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfaWNvbjJbXCJkZWZhdWx0XCJdLHNlY29uZGFyeU9wdHMuaWNvbik6bnVsbCxzZWNvbmRhcnlPcHRzLmNvbnRlbnQ/c2Vjb25kYXJ5T3B0cy5jb250ZW50Om51bGwgXSB9KSl9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSx0YWc9b3B0cy50YWd8fFwiZGl2XCIsaGVpZ2h0Q2xhc3M9b3B0cy5zdWJ0aXRsZT9DU1NfQ0xBU1NFUy5oYXNTdWJ0aXRsZTpvcHRzLmhpZ2hTdWJ0aXRsZT9DU1NfQ0xBU1NFUy5oYXNIaWdoU3VidGl0bGU6b3B0cy5mcm9udHx8b3B0cy5pbmRlbnQ/Q1NTX0NMQVNTRVMuaGFzRnJvbnQ6bnVsbCxwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLnNlbGVjdGVkP0NTU19DTEFTU0VTLnNlbGVjdGVkOm51bGwsb3B0cy5kaXNhYmxlZD9DU1NfQ0xBU1NFUy5kaXNhYmxlZDpudWxsLG9wdHMuc3RpY2t5P0NTU19DTEFTU0VTLnN0aWNreTpudWxsLG9wdHMuY29tcGFjdD9DU1NfQ0xBU1NFUy5pc0NvbXBhY3Q6bnVsbCxoZWlnaHRDbGFzcyxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxjb250ZW50PVtvcHRzLmluayYmIW9wdHMuZGlzYWJsZWQ/X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3JpcHBsZTJbXCJkZWZhdWx0XCJdLG9wdHMucmlwcGxlKTpudWxsLHBhcnNlUHJpbWFyeUNvbnRlbnQob3B0cyksb3B0cy5zZWNvbmRhcnk/cGFyc2VTZWNvbmRhcnlDb250ZW50KG9wdHMpOm51bGxdO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17dmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0LXRpbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1saXN0LXRpbGVcIix7XCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl90aXRsZVwiXX0sXCImLnBlLWxpc3RfX2hlYWRlclwiOntcImJhY2tncm91bmQtY29sb3JcIjpcImluaGVyaXRcIixcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2xpc3RfaGVhZGVyXCJdfX0sXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudCwgLnBlLWxpc3QtdGlsZV9fc3VidGl0bGVcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9zdWJ0aXRsZVwiXX0sXCImLnBlLWxpc3QtdGlsZS0tZGlzYWJsZWRcIjp7XCImLCAucGUtbGlzdC10aWxlX190aXRsZSwgLnBlLWxpc3QtdGlsZV9fY29udGVudCwgLnBlLWxpc3QtdGlsZV9fc3VidGl0bGVcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl90ZXh0X2Rpc2FibGVkXCJdfX0sXCImLnBlLWxpc3QtdGlsZS0tc2VsZWN0ZWRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9iYWNrZ3JvdW5kX3NlbGVjdGVkXCJdfX0pXX0sbm9Ub3VjaD1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLWxpc3QtdGlsZVwiLHtcIiY6bm90KC5wZS1saXN0X19oZWFkZXIpOm5vdCgucGUtbGlzdC10aWxlLS1kaXNhYmxlZCk6aG92ZXJcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9iYWNrZ3JvdW5kX2hvdmVyXCJdfX0pXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIpLHtcImh0bWwucGUtbm8tdG91Y2ggLnBlLWxpc3QtLWhvdmVyYWJsZVwiOltub1RvdWNoKGNvbmZpZyxcImxpZ2h0XCIsXCIgXCIpXX0se1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCImXCIpXX0se1wiaHRtbC5wZS1uby10b3VjaCAucGUtZGFyay10aGVtZSAucGUtbGlzdC0taG92ZXJhYmxlXCI6bm9Ub3VjaChjb25maWcsXCJkYXJrXCIsXCIgXCIpLFwiaHRtbC5wZS1uby10b3VjaCAucGUtbGlzdC0taG92ZXJhYmxlIC5wZS1kYXJrLXRoZW1lXCI6bm9Ub3VjaChjb25maWcsXCJkYXJrXCIpfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLHJnYmE9X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEsc2luZ2xlX2hlaWdodD00OCxwYWRkaW5nPTgsc2luZ2xlX3dpdGhfaWNvbl9oZWlnaHQ9NTY7ZXhwb3J0c1tcImRlZmF1bHRcIl09e3NpbmdsZV9oZWlnaHQ6c2luZ2xlX2hlaWdodCxzaW5nbGVfbGluZV9oZWlnaHQ6c2luZ2xlX2hlaWdodC0yKnBhZGRpbmctMTEsc2luZ2xlX3dpdGhfaWNvbl9oZWlnaHQ6c2luZ2xlX3dpdGhfaWNvbl9oZWlnaHQsc2luZ2xlX3dpdGhfaWNvbl9saW5lX2hlaWdodDpzaW5nbGVfd2l0aF9pY29uX2hlaWdodC0yKnBhZGRpbmctMTEscGFkZGluZzoxMyxjb21wYWN0X3BhZGRpbmc6OSxzdWJ0aXRsZV9saW5lX2NvdW50OjEsaGFzX3N1YnRpdGxlX3BhZGRpbmc6MTUsaGlnaF9zdWJ0aXRsZV9saW5lX2NvdW50OjIsaGFzX2hpZ2hfc3VidGl0bGVfcGFkZGluZzoxMyxmcm9udF9pdGVtX3dpZHRoOjcyLHNpZGVfcGFkZGluZzoyKl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LGZvbnRfc2l6ZV90aXRsZToxNixmb250X3NpemVfc3VidGl0bGU6MTQsbGluZV9oZWlnaHRfc3VidGl0bGU6MjAsZm9udF9zaXplX2xpc3RfaGVhZGVyOjE0LGZvbnRfc2l6ZV9zbWFsbDoxMixjb2xvcl9saWdodF90aXRsZTpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3ByaW1hcnkpLGNvbG9yX2xpZ2h0X3N1YnRpdGxlOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfc2Vjb25kYXJ5KSxjb2xvcl9saWdodF9pbmZvOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfdGVydGlhcnkpLGNvbG9yX2xpZ2h0X3RleHRfZGlzYWJsZWQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9kaXNhYmxlZCksY29sb3JfbGlnaHRfbGlzdF9oZWFkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF90ZXJ0aWFyeSksY29sb3JfbGlnaHRfYmFja2dyb3VuZF9ob3ZlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9saWdodF9iYWNrZ3JvdW5kX3NlbGVjdGVkOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2RhcmtfdGl0bGU6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcHJpbWFyeSksY29sb3JfZGFya19zdWJ0aXRsZTpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9zZWNvbmRhcnkpLGNvbG9yX2RhcmtfaW5mbzpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF90ZXJ0aWFyeSksY29sb3JfZGFya190ZXh0X2Rpc2FibGVkOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X2Rpc2FibGVkKSxjb2xvcl9kYXJrX2xpc3RfaGVhZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3RlcnRpYXJ5KSxjb2xvcl9kYXJrX2JhY2tncm91bmRfaG92ZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2RhcmtfYmFja2dyb3VuZF9zZWxlY3RlZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYmFja2dyb3VuZF9ob3Zlcil9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLF9mbGV4PXJlcXVpcmUoXCJwb2x5dGhlbmUvbGF5b3V0L3RoZW1lL2ZsZXhcIiksX2ZsZXgyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsZXgpLHBhZGRpbmdIPWZ1bmN0aW9uKGgpe3JldHVybntcInBhZGRpbmctbGVmdFwiOmgrXCJweFwiLFwicGFkZGluZy1yaWdodFwiOmgrXCJweFwifX0scGFkZGluZ1Y9ZnVuY3Rpb24odG9wLGJvdHRvbSl7cmV0dXJue1wicGFkZGluZy10b3BcIjp0b3ArXCJweFwiLFwicGFkZGluZy1ib3R0b21cIjooYm90dG9tfHx0b3ApK1wicHhcIn19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtbGlzdC10aWxlXCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0LHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsb3ZlcmZsb3c6XCJoaWRkZW5cIixcIiYucGUtbGlzdC10aWxlLS1zdGlja3lcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5zdGlja3koKSxcIiAucGUtbGlzdC10aWxlX19wcmltYXJ5LCAucGUtbGlzdC10aWxlX19zZWNvbmRhcnlcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRIb3Jpem9udGFsLHtcIiBhJlwiOntcInRleHQtZGVjb3JhdGlvblwiOlwibm9uZVwiLGNvbG9yOlwiaW5oZXJpdFwiLGJvcmRlcjpcIm5vbmVcIn19XSxcIiAucGUtbGlzdC10aWxlX19wcmltYXJ5XCI6W19mbGV4MltcImRlZmF1bHRcIl0uZmxleCgpLHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudDpub3QoLnBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnQpXCI6W19mbGV4MltcImRlZmF1bHRcIl0uZmxleCgpLHBhZGRpbmdWKGNvbmZpZy5wYWRkaW5nLGNvbmZpZy5wYWRkaW5nKzEpXX1dLFwiIC5wZS1saXN0LXRpbGVfX3NlY29uZGFyeVwiOntcInRleHQtYWxpZ25cIjpcInJpZ2h0XCIsXCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplX3RpdGxlK1wicHhcIn0sXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dFZlcnRpY2FsLF9mbGV4MltcImRlZmF1bHRcIl0uc2VsZkNlbnRlcixwYWRkaW5nSChjb25maWcuc2lkZV9wYWRkaW5nKSx7XCImLnBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnRcIjpbcGFkZGluZ1YoY29uZmlnLnBhZGRpbmctNSkse3dpZHRoOmNvbmZpZy5mcm9udF9pdGVtX3dpZHRoK1wicHhcIn1dLFwiIHNtYWxsXCI6e1wiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZV9zbWFsbCtcInB4XCJ9fV0sXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnQgKyAucGUtbGlzdC10aWxlX19jb250ZW50XCI6e1wicGFkZGluZy1sZWZ0XCI6MH0sXCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoMSxjb25maWcuc2luZ2xlX2xpbmVfaGVpZ2h0KSx7XCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplX3RpdGxlK1wicHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6Y29uZmlnLnNpbmdsZV9saW5lX2hlaWdodCtcInB4XCJ9XSxcIiAucGUtbGlzdC10aWxlX19zdWJ0aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcyhjb25maWcuc3VidGl0bGVfbGluZV9jb3VudCxjb25maWcubGluZV9oZWlnaHRfc3VidGl0bGUpLHtcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemVfc3VidGl0bGUrXCJweFwiLFwibGluZS1oZWlnaHRcIjpjb25maWcubGluZV9oZWlnaHRfc3VidGl0bGUrXCJweFwiLFwiJi5wZS1saXN0LXRpbGVfX3N1YnRpdGxlLS1oaWdoXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKGNvbmZpZy5oaWdoX3N1YnRpdGxlX2xpbmVfY291bnQsY29uZmlnLmxpbmVfaGVpZ2h0X3N1YnRpdGxlKSx7XCJ3aGl0ZS1zcGFjZVwiOlwibm9ybWFsXCJ9XX1dLFwiJi5wZS1saXN0LXRpbGUtLXNlbGVjdGVkLCAmLnBlLWxpc3QtdGlsZS0tZGlzYWJsZWRcIjp7Y3Vyc29yOlwiZGVmYXVsdFwifSxcIiYucGUtbGlzdC10aWxlLS1zdWJ0aXRsZVwiOntcIiAucGUtbGlzdC10aWxlX19jb250ZW50XCI6W3BhZGRpbmdWKGNvbmZpZy5oYXNfc3VidGl0bGVfcGFkZGluZyxjb25maWcuaGFzX3N1YnRpdGxlX3BhZGRpbmcrMSkse1wiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6e3BhZGRpbmc6MH19XX0sXCImLnBlLWxpc3QtdGlsZS0taGlnaC1zdWJ0aXRsZVwiOntcIiAucGUtbGlzdC10aWxlLS1oaWdoLXN1YnRpdGxlIC5wZS1saXN0LXRpbGVfX3NlY29uZGFyeVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dEhvcml6b250YWwsX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRTdGFydF0sXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOltfZmxleDJbXCJkZWZhdWx0XCJdLnNlbGZTdGFydCxwYWRkaW5nVihjb25maWcuaGFzX2hpZ2hfc3VidGl0bGVfcGFkZGluZyxjb25maWcuaGFzX2hpZ2hfc3VidGl0bGVfcGFkZGluZysxKSx7XCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjp7cGFkZGluZzowfX1dfSxcIiYucGUtbGlzdF9faGVhZGVyXCI6e2hlaWdodDpjb25maWcuc2luZ2xlX2hlaWdodCtcInB4XCIsXCIgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOntcInBhZGRpbmctdG9wXCI6MCxcInBhZGRpbmctYm90dG9tXCI6MH0sXCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoMSxjb25maWcuc2luZ2xlX2hlaWdodCkse1wiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZV9saXN0X2hlYWRlcitcInB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9tZWRpdW0sXCJsaW5lLWhlaWdodFwiOmNvbmZpZy5zaW5nbGVfaGVpZ2h0K1wicHhcIixwYWRkaW5nOjB9XX0sXCIgLnBlLWxpc3QtLWNvbXBhY3QgJiwgJi5wZS1saXN0LXRpbGUtLWNvbXBhY3RcIjp7XCImOm5vdCgucGUtbGlzdF9faGVhZGVyKVwiOntcIiAucGUtbGlzdC10aWxlX19jb250ZW50XCI6cGFkZGluZ1YoY29uZmlnLmNvbXBhY3RfcGFkZGluZyxjb25maWcuY29tcGFjdF9wYWRkaW5nKzEpfX0sXCJAc3VwcG9ydHMgKC1tb3otYXBwZWFyYW5jZTpub25lKSBhbmQgKGRpc3BsYXk6Y29udGVudHMpXCI6e1wiIC5wZS1saXN0LXRpbGVfX3ByaW1hcnksIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjp7b3ZlcmZsb3c6XCJoaWRkZW5cIn19LFwiLnBlLWRpYWxvZyAucGUtbWVudV9fY29udGVudCAmXCI6e1wiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6X21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoXCJub25lXCIpfSxcIi5wZS1tZW51X19jb250ZW50ICZcIjp7XCImOm5vdCgucGUtbGlzdC10aWxlLS1kaXNhYmxlZClcIjp7Y3Vyc29yOlwiZGVmYXVsdFwiLFwiJiwgLnBlLWxpc3QtdGlsZV9fcHJpbWFyeSwgLnBlLWxpc3QtdGlsZV9fc2Vjb25kYXJ5XCI6e1wiIC5wZS1saXN0LXRpbGVfX3RpdGxlLCAucGUtbGlzdC10aWxlX19zdWJ0aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widXNlci1zZWxlY3RcIjpcIm5vbmVcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3VzZXJfc2VsZWN0KV19fX0sXCJodG1sLnBlLW5vLXRvdWNoIC5wZS1saXN0LS1ob3ZlcmFibGUgJiwgaHRtbC5wZS1uby10b3VjaCAucGUtbGlzdC0tc2VsZWN0YWJsZSAmXCI6e1wiJjpub3QoLnBlLWxpc3RfX2hlYWRlcik6bm90KC5wZS1saXN0LXRpbGUtLWRpc2FibGVkKTpub3QoLnBlLWxpc3QtdGlsZS0tc2VsZWN0ZWQpOmhvdmVyXCI6e2N1cnNvcjpcInBvaW50ZXJcIn19fV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC10aWxlL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl1bXCJsaXN0LXRpbGVcIl0sY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1saXN0LXRpbGVcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX2xpc3RUaWxlPXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC10aWxlL2xpc3QtdGlsZVwiKSxfbGlzdFRpbGUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpc3RUaWxlKTtyZXF1aXJlKFwicG9seXRoZW5lL2xpc3QvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLWxpc3RcIixoZWFkZXI6XCJwZS1saXN0X19oZWFkZXJcIixob3ZlcmFibGU6XCJwZS1saXN0LS1ob3ZlcmFibGVcIixzZWxlY3RhYmxlOlwicGUtbGlzdC0tc2VsZWN0YWJsZVwiLGJvcmRlcnM6XCJwZS1saXN0LS1ib3JkZXJzXCIsaW5kZW50ZWRCb3JkZXJzOlwicGUtbGlzdC0tYm9yZGVycy1pbmRlbnRlZFwiLGhhc0hlYWRlcjpcInBlLWxpc3QtLWhlYWRlclwiLGlzQ29tcGFjdDpcInBlLWxpc3QtLWNvbXBhY3RcIn0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLmJvcmRlcnM/Q1NTX0NMQVNTRVMuYm9yZGVyczpudWxsLG9wdHMuaW5kZW50ZWRCb3JkZXJzP0NTU19DTEFTU0VTLmluZGVudGVkQm9yZGVyczpudWxsLG9wdHMuaG92ZXJhYmxlP0NTU19DTEFTU0VTLmhvdmVyYWJsZTpudWxsLG9wdHMuc2VsZWN0YWJsZT9DU1NfQ0xBU1NFUy5zZWxlY3RhYmxlOm51bGwsb3B0cy5oZWFkZXI/Q1NTX0NMQVNTRVMuaGFzSGVhZGVyOm51bGwsb3B0cy5jb21wYWN0P0NTU19DTEFTU0VTLmlzQ29tcGFjdDpudWxsLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LGhlYWRlck9wdHM9dm9pZCAwO29wdHMuaGVhZGVyJiYoaGVhZGVyT3B0cz1PYmplY3QuYXNzaWduKHt9LG9wdHMuaGVhZGVyKSxoZWFkZXJPcHRzW1wiY2xhc3NcIl09W0NTU19DTEFTU0VTLmhlYWRlcixoZWFkZXJPcHRzW1wiY2xhc3NcIl18fG51bGxdLmpvaW4oXCIgXCIpKTt2YXIgY29udGVudD1baGVhZGVyT3B0cz9fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfbGlzdFRpbGUyW1wiZGVmYXVsdFwiXSxoZWFkZXJPcHRzKTpudWxsLG9wdHMudGlsZXM/b3B0cy50aWxlczpudWxsXTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e3ZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIF9yZWYsc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVyblsoX3JlZj17fSxfZGVmaW5lUHJvcGVydHkoX3JlZixzY29wZStcIi5wZS1saXN0XCIse1wiJi5wZS1saXN0LS1ib3JkZXJzXCI6e1wiIC5wZS1saXN0LXRpbGU6bm90KC5wZS1saXN0X19oZWFkZXIpXCI6e1wiJjpub3QoOmxhc3QtY2hpbGQpXCI6e1wiYm9yZGVyLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib3JkZXJcIl19fX0sXCImLnBlLWxpc3QtLWJvcmRlcnMtaW5kZW50ZWRcIjp7XCIgLnBlLWxpc3QtdGlsZTpub3QoLnBlLWxpc3RfX2hlYWRlcilcIjp7XCIgLnBlLWxpc3QtdGlsZV9fY29udGVudDpub3QoLnBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnQpXCI6e1wiYm9yZGVyLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib3JkZXJcIl19fX19KSxfZGVmaW5lUHJvcGVydHkoX3JlZixcIiAucGUtbGlzdCArIC5wZS1saXN0XCIse1wiYm9yZGVyLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib3JkZXJcIl19KSxfcmVmKV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiKSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcIiZcIildfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLHJnYmE9X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmE7ZXhwb3J0c1tcImRlZmF1bHRcIl09e3BhZGRpbmc6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQscGFkZGluZ19jb21wYWN0Ol9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LzIsYm9yZGVyX3dpZHRoX3N0YWNrZWQ6MSxib3JkZXJfd2lkdGhfYm9yZGVyZWQ6MSxjb2xvcl9saWdodF9ib3JkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYm9yZGVyX2xpZ2h0KSxjb2xvcl9kYXJrX2JvcmRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYm9yZGVyX2xpZ2h0KX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLGJvcmRlclN0eWxlPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmhhaXJsaW5lKFwiYm9yZGVyLWJvdHRvbVwiKSx7XCJib3JkZXItc3R5bGVcIjpcIm5vbmUgbm9uZSBzb2xpZCBub25lXCIsXCJib3JkZXItd2lkdGhcIjpjb25maWcuYm9yZGVyX3dpZHRoX2JvcmRlcmVkK1wicHhcIn19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtbGlzdFwiOntwYWRkaW5nOmNvbmZpZy5wYWRkaW5nK1wicHggMFwiLFwiJi5wZS1saXN0LS1oZWFkZXJcIjp7XCJwYWRkaW5nLXRvcFwiOjB9LFwiJi5wZS1saXN0LS1jb21wYWN0XCI6e3BhZGRpbmc6Y29uZmlnLnBhZGRpbmdfY29tcGFjdCtcInB4IDBcIn0sXCImICsgJlwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5oYWlybGluZShcImJvcmRlci10b3BcIikse1wiYm9yZGVyLXN0eWxlXCI6XCJzb2xpZCBub25lIG5vbmUgbm9uZVwiLFwiYm9yZGVyLXdpZHRoXCI6Y29uZmlnLmJvcmRlcl93aWR0aF9zdGFja2VkK1wicHhcIn1dLFwiJi5wZS1saXN0LS1ib3JkZXJzXCI6e1wiIC5wZS1saXN0LXRpbGU6bm90KC5wZS1saXN0X19oZWFkZXIpXCI6e1wiJjpub3QoOmxhc3QtY2hpbGQpXCI6e1wiJlwiOmJvcmRlclN0eWxlKGNvbmZpZyl9fX0sXCImLnBlLWxpc3QtLWJvcmRlcnMtaW5kZW50ZWRcIjp7XCJib3JkZXItdG9wXCI6XCJub25lXCIsXCIgLnBlLWxpc3QtdGlsZTpub3QoLnBlLWxpc3RfX2hlYWRlcilcIjp7XCImOm5vdCg6bGFzdC1jaGlsZClcIjp7XCIgLnBlLWxpc3QtdGlsZV9fY29udGVudDpub3QoLnBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnQpXCI6Ym9yZGVyU3R5bGUoY29uZmlnKX19fX19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0L3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QvdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0ubGlzdCxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWxpc3RcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2V2ZW50cz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9ldmVudHNcIiksX2V2ZW50czI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKSxfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX3NoYWRvdz1yZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy9zaGFkb3dcIiksX3NoYWRvdzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2hhZG93KSxfdHJhbnNpdGlvbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uXCIpLF90cmFuc2l0aW9uMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cmFuc2l0aW9uKTtyZXF1aXJlKFwicG9seXRoZW5lL21lbnUvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLW1lbnVcIixjb250ZW50OlwicGUtbWVudV9fY29udGVudFwiLHBsYWNlaG9sZGVyOlwicGUtbWVudS0tcGxhY2Vob2xkZXJcIix2aXNpYmxlOlwicGUtbWVudS0tdmlzaWJsZVwiLHBlcm1hbmVudDpcInBlLW1lbnUtLXBlcm1hbmVudFwiLHRhcmdldDpcInBlLW1lbnUtLXRhcmdldFwiLHdpZHRoX246XCJwZS1tZW51LS13aWR0aC1cIix3aWR0aF9hdXRvOlwicGUtbWVudS0td2lkdGgtYXV0b1wiLGxpc3RUaWxlOlwicGUtbGlzdC10aWxlXCIsc2VsZWN0ZWRMaXN0VGlsZTpcInBlLWxpc3QtdGlsZS0tc2VsZWN0ZWRcIn0sT0ZGU0VUX1Y9LTgsREVGQVVMVF9PRkZTRVRfSD0xNixNSU5fU0laRT0xLjUscG9zaXRpb25NZW51PWZ1bmN0aW9uKGN0cmwsb3B0cyl7aWYob3B0cy50YXJnZXQpe3ZhciB0YXJnZXRFbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiK29wdHMudGFyZ2V0KTtpZih0YXJnZXRFbCl7dmFyIG9mZnNldEg9dm9pZCAwIT09b3B0cy5vZmZzZXQ/b3B0cy5vZmZzZXQ6REVGQVVMVF9PRkZTRVRfSCxtZW51RWw9Y3RybC5lbDtpZihtZW51RWwpe3ZhciBjb250ZW50RWw9Y3RybC5jb250ZW50RWwsb3JpZ2luPW9wdHMub3JpZ2lufHxcInRvcC1sZWZ0XCIscmVwb3NpdGlvbj1vcHRzLnJlcG9zaXRpb24hPT0hMSxwb3NpdGlvbk9mZnNldD0wO2lmKHJlcG9zaXRpb24pe3ZhciBmaXJzdEl0ZW09Y29udGVudEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrQ1NTX0NMQVNTRVMubGlzdFRpbGUpWzBdLHNlbGVjdGVkSXRlbT1jb250ZW50RWwucXVlcnlTZWxlY3RvcihcIi5cIitDU1NfQ0xBU1NFUy5zZWxlY3RlZExpc3RUaWxlKTtpZihmaXJzdEl0ZW0mJnNlbGVjdGVkSXRlbSl7dmFyIGZpcnN0SXRlbVJlY3Q9Zmlyc3RJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHNlbGVjdGVkSXRlbVJlY3Q9c2VsZWN0ZWRJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3Bvc2l0aW9uT2Zmc2V0PXNlbGVjdGVkSXRlbVJlY3QudG9wLWZpcnN0SXRlbVJlY3QudG9wfXZhciBhbGlnbkVsPXNlbGVjdGVkSXRlbXx8Zmlyc3RJdGVtLGFsaWduUmVjdD1hbGlnbkVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLF90YXJnZXRSZWN0PXRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGhlaWdodERpZmY9YWxpZ25SZWN0LmhlaWdodC1fdGFyZ2V0UmVjdC5oZWlnaHQ7cG9zaXRpb25PZmZzZXQrPWhlaWdodERpZmYvMn12YXIgdGFyZ2V0UmVjdD10YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxwYXJlbnRSZWN0PW1lbnVFbC5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGFsaWduTGVmdD1mdW5jdGlvbigpe3JldHVybiBtZW51RWwuc3R5bGUubGVmdD10YXJnZXRSZWN0LmxlZnQtcGFyZW50UmVjdC5sZWZ0K29mZnNldEgrXCJweFwifSxhbGlnblJpZ2h0PWZ1bmN0aW9uKCl7cmV0dXJuIG1lbnVFbC5zdHlsZS5yaWdodD10YXJnZXRSZWN0LnJpZ2h0LXBhcmVudFJlY3QucmlnaHQrb2Zmc2V0SCtcInB4XCJ9LGFsaWduVG9wPWZ1bmN0aW9uKCl7cmV0dXJuIG1lbnVFbC5zdHlsZS50b3A9dGFyZ2V0UmVjdC50b3AtcGFyZW50UmVjdC50b3AtcG9zaXRpb25PZmZzZXQrT0ZGU0VUX1YrXCJweFwifSxhbGlnbkJvdHRvbT1mdW5jdGlvbigpe3JldHVybiBtZW51RWwuc3R5bGUuYm90dG9tPXRhcmdldFJlY3QuYm90dG9tLXBhcmVudFJlY3QuYm90dG9tLXBvc2l0aW9uT2Zmc2V0K1wicHhcIn0sYWxpZ25Gbj17XCJ0b3AtbGVmdFwiOmZ1bmN0aW9uKCl7cmV0dXJuIGFsaWduVG9wKCkmJmFsaWduTGVmdCgpfSxcInRvcC1yaWdodFwiOmZ1bmN0aW9uKCl7cmV0dXJuIGFsaWduVG9wKCkmJmFsaWduUmlnaHQoKX0sXCJib3R0b20tbGVmdFwiOmZ1bmN0aW9uKCl7cmV0dXJuIGFsaWduQm90dG9tKCkmJmFsaWduTGVmdCgpfSxcImJvdHRvbS1yaWdodFwiOmZ1bmN0aW9uKCl7cmV0dXJuIGFsaWduQm90dG9tKCkmJmFsaWduUmlnaHQoKX19O2FsaWduRm5bb3JpZ2luXS5jYWxsKCl9fX19LHNob3c9ZnVuY3Rpb24oY3RybCxvcHRzKXtyZXR1cm4gY3RybC5pc1RyYW5zaXRpb25pbmc9ITAsX3RyYW5zaXRpb24yW1wiZGVmYXVsdFwiXS5zaG93KE9iamVjdC5hc3NpZ24oe30sb3B0cyx7ZWw6Y3RybC5lbCxzaG93Q2xhc3M6Q1NTX0NMQVNTRVMudmlzaWJsZX0pKS50aGVuKGZ1bmN0aW9uKCl7Y3RybC5pc1RyYW5zaXRpb25pbmc9ITEsY3RybC52aXNpYmxlPSEwLG9wdHMuZGlkU2hvdyYmb3B0cy5kaWRTaG93KG9wdHMuaWQpfSl9LGhpZGU9ZnVuY3Rpb24oY3RybCxvcHRzKXtyZXR1cm4gY3RybC5pc1RyYW5zaXRpb25pbmc9ITAsX3RyYW5zaXRpb24yW1wiZGVmYXVsdFwiXS5oaWRlKE9iamVjdC5hc3NpZ24oe30sb3B0cyx7ZWw6Y3RybC5lbCxzaG93Q2xhc3M6Q1NTX0NMQVNTRVMudmlzaWJsZX0pKS50aGVuKGZ1bmN0aW9uKCl7Y3RybC5pc1RyYW5zaXRpb25pbmc9ITEsY3RybC52aXNpYmxlPSExLG9wdHMuZGlkSGlkZSYmb3B0cy5kaWRIaWRlKG9wdHMuaWQpLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCl9KX0sdW5pZnlTaXplPWZ1bmN0aW9uKHNpemUpe3JldHVybiBNSU5fU0laRT5zaXplP01JTl9TSVpFOnNpemV9LHdpZHRoQ2xhc3M9ZnVuY3Rpb24oc2l6ZSl7dmFyIHNpemVTdHI9c2l6ZS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsXCItXCIpO3JldHVybiBDU1NfQ0xBU1NFUy53aWR0aF9uK3NpemVTdHJ9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSxsaXN0ZW5FbD1kb2N1bWVudC5ib2R5LGFjdGl2YXRlRGlzbWlzc1RhcD1mdW5jdGlvbigpe2xpc3RlbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGhhbmRsZURpc21pc3NUYXApfSxkZUFjdGl2YXRlRGlzbWlzc1RhcD1mdW5jdGlvbigpe2xpc3RlbkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGhhbmRsZURpc21pc3NUYXApfSxoYW5kbGVEaXNtaXNzVGFwPWZ1bmN0aW9uKGUpe2UudGFyZ2V0IT09Y3RybC5lbCYmKGRlQWN0aXZhdGVEaXNtaXNzVGFwKCksZS5kZWZhdWx0UHJldmVudGVkP2hpZGUoY3RybCxvcHRzKTpoaWRlKGN0cmwsT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtoaWRlRGVsYXk6MH0pKSl9LHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLnBlcm1hbmVudD9DU1NfQ0xBU1NFUy5wZXJtYW5lbnQ6bnVsbCxvcHRzLnRhcmdldD9DU1NfQ0xBU1NFUy50YXJnZXQ6XCJsYXlvdXQgY2VudGVyLWNlbnRlclwiLG9wdHMuc2l6ZT93aWR0aENsYXNzKHVuaWZ5U2l6ZShvcHRzLnNpemUpKTpudWxsLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6ZnVuY3Rpb24oZWwsaW5pdGVkLGNvbnRleHQsdmRvbSl7aWYoIWluaXRlZCl7b3B0cy5jb25maWcmJm9wdHMuY29uZmlnKGVsLGluaXRlZCxjb250ZXh0LHZkb20pLGN0cmwuZWw9ZWw7dmFyIHVwZGF0ZT1mdW5jdGlvbigpe3Bvc2l0aW9uTWVudShjdHJsLG9wdHMpLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCl9LGhhbmRsZUVzY2FwZT1mdW5jdGlvbihlKXsyNz09PWUud2hpY2gmJmhpZGUoY3RybCxPYmplY3QuYXNzaWduKHt9LG9wdHMse2hpZGVEZWxheTowfSkpfTtvcHRzLnBlcm1hbmVudHx8KF9ldmVudHMyW1wiZGVmYXVsdFwiXS5zdWJzY3JpYmUoXCJyZXNpemVcIix1cGRhdGUpLF9ldmVudHMyW1wiZGVmYXVsdFwiXS5zdWJzY3JpYmUoXCJrZXlkb3duXCIsaGFuZGxlRXNjYXBlKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YWN0aXZhdGVEaXNtaXNzVGFwKCksc2hvdyhjdHJsLG9wdHMpfSwwKSksY29udGV4dC5vbnVubG9hZD1mdW5jdGlvbigpe19ldmVudHMyW1wiZGVmYXVsdFwiXS51bnN1YnNjcmliZShcInJlc2l6ZVwiLHVwZGF0ZSksX2V2ZW50czJbXCJkZWZhdWx0XCJdLnVuc3Vic2NyaWJlKFwia2V5ZG93blwiLGhhbmRsZUVzY2FwZSksb3B0cy5wZXJtYW5lbnR8fGRlQWN0aXZhdGVEaXNtaXNzVGFwKCl9LHBvc2l0aW9uTWVudShjdHJsLG9wdHMpfX19LGNvbnRlbnQ9KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQsIFwiY29uZmlnXCI6IGZ1bmN0aW9uKGVsLGluaXRlZCl7aW5pdGVkfHwoY3RybC5jb250ZW50RWw9ZWwpfSwgXCJvbmNsaWNrXCI6IGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKX0gfSwgY2hpbGRyZW46IFsgX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3NoYWRvdzJbXCJkZWZhdWx0XCJdLHt6OmN0cmwueixhbmltYXRlZDohMH0pLG9wdHMuY29udGVudD9vcHRzLmNvbnRlbnQ6bnVsbCBdIH0pO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17Y29udHJvbGxlcjpmdW5jdGlvbigpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF0sej12b2lkIDAhPT1vcHRzLno/b3B0cy56OjE7cmV0dXJue3o6eixlbDpudWxsLGNvbnRlbnRFbDpudWxsLGlzVHJhbnNpdGlvbmluZzohMSx2aXNpYmxlOm9wdHMucGVybWFuZW50fHwhMX19LHZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gb3B0cy5zaG93JiYhY3RybC52aXNpYmxlJiYoY3RybC52aXNpYmxlPSEwKSxjdHJsLnZpc2libGU/Y3JlYXRlVmlldyhjdHJsLG9wdHMpOih7IHRhZzogXCJzcGFuXCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMucGxhY2Vob2xkZXIgfSwgY2hpbGRyZW46IFtdIH0pfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVudS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLW1lbnVcIix7XCIgLnBlLW1lbnVfX2NvbnRlbnRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9iYWNrZ3JvdW5kXCJdfX0pXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIpLHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiJlwiKV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7ZXhwb3J0c1tcImRlZmF1bHRcIl09e3NpemVzOlsxLDEuNSwyLDMsNCw1LDYsN10sbWluX3NpemU6MS41LG1heF9zaXplX3NtYWxsX3NjcmVlbjo1LHNpemVfZmFjdG9yOl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfbWVudSxib3JkZXJfcmFkaXVzOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2Jsb2NrX2JvcmRlcl9yYWRpdXMsY29sb3JfbGlnaHRfYmFja2dyb3VuZDpfY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfYmFja2dyb3VuZCksY29sb3JfZGFya19iYWNrZ3JvdW5kOl9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2JhY2tncm91bmQpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHVuaWZ5U2l6ZT1mdW5jdGlvbihjb25maWcsc2l6ZSl7cmV0dXJuIHNpemU8Y29uZmlnLm1pbl9zaXplP2NvbmZpZy5taW5fc2l6ZTpzaXplfSx3aWR0aENsYXNzPWZ1bmN0aW9uKGNvbmZpZyxzaXplKXt2YXIgc2l6ZVN0cj1zaXplLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIixcIi1cIik7cmV0dXJuXCJwZS1tZW51LS13aWR0aC1cIitzaXplU3RyfSx3aWR0aFN0eWxlPWZ1bmN0aW9uKGNvbmZpZyxzaXplKXt2YXIgcz11bmlmeVNpemUoY29uZmlnLHNpemUpO3JldHVybiBfZGVmaW5lUHJvcGVydHkoe30sXCImLlwiK3dpZHRoQ2xhc3MoY29uZmlnLHMpLHt3aWR0aDpjb25maWcuc2l6ZV9mYWN0b3IqcytcInB4XCIsXCJtYXgtd2lkdGhcIjpcIjEwMCVcIn0pfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLW1lbnVcIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6XCJlYXNlLW91dFwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInRyYW5zaXRpb24tcHJvcGVydHlcIjpcIm9wYWNpdHlcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLGNvbmZpZy5zaXplcy5tYXAoZnVuY3Rpb24oc2l6ZSl7cmV0dXJuIHdpZHRoU3R5bGUoY29uZmlnLHNpemUpfSksX2RlZmluZVByb3BlcnR5KHtcInotaW5kZXhcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uel9tZW51LG9wYWNpdHk6MCxwb3NpdGlvbjpcImFic29sdXRlXCIsd2lkdGg6XCIxMDAlXCIsXCJtaW4td2lkdGhcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X21lbnUqY29uZmlnLm1pbl9zaXplK1wicHhcIixcIiYucGUtbWVudS0td2lkdGgtYXV0b1wiOnt3aWR0aDpcImF1dG9cIn0sXCImLnBlLW1lbnUtLXZpc2libGVcIjp7b3BhY2l0eToxfSxcIiYucGUtbWVudS0tcGVybWFuZW50XCI6e3Bvc2l0aW9uOlwicmVsYXRpdmVcIixvcGFjaXR5OjF9LFwiIC5wZS1tZW51X19jb250ZW50XCI6e3dpZHRoOlwiMTAwJVwiLFwiYm9yZGVyLXJhZGl1c1wiOmNvbmZpZy5ib3JkZXJfcmFkaXVzK1wicHhcIn19LFwiQG1lZGlhIChtYXgtd2lkdGg6IFwiK19jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X3NjcmVlbl9zaXplX2xhcmdlK1wicHgpXCIse1wibWF4LXdpZHRoXCI6Y29uZmlnLm1heF9zaXplX3NtYWxsX3NjcmVlbipfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X21lbnUrXCJweFwifSldfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL21lbnUvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvbWVudS90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS9tZW51L3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLm1lbnUsY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1tZW51XCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBpc1RvdWNoPVwib250b3VjaHN0YXJ0XCJpbiB3aW5kb3d8fG5hdmlnYXRvci5NYXhUb3VjaFBvaW50cz4wfHxuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cz4wO2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpLmNsYXNzTGlzdC5hZGQoaXNUb3VjaD9cInBlLXRvdWNoXCI6XCJwZS1uby10b3VjaFwiKSxleHBvcnRzW1wiZGVmYXVsdFwiXT17aXNUb3VjaDppc1RvdWNofSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHl0aGVuZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX3BvbHl0aGVuZT1yZXF1aXJlKFwicG9seXRoZW5lL3BvbHl0aGVuZS9wb2x5dGhlbmVcIiksX3BvbHl0aGVuZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9seXRoZW5lKSxfdHJhbnNpdGlvbkV2ZW50PXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3RyYW5zaXRpb24tZXZlbnRcIiksX3RyYW5zaXRpb25FdmVudDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHJhbnNpdGlvbkV2ZW50KTtyZXF1aXJlKFwicG9seXRoZW5lL3JpcHBsZS90aGVtZS90aGVtZVwiKTt2YXIgdHJhbnNpdGlvbkV2ZW50PSgwLF90cmFuc2l0aW9uRXZlbnQyW1wiZGVmYXVsdFwiXSkoKSxERUZBVUxUX1NUQVJUX09QQUNJVFk9LjIsT1BBQ0lUWV9ERUNBWV9WRUxPQ0lUWT0uMzUsQ1NTX0NMQVNTRVM9e3JpcHBsZTpcInBlLXJpcHBsZVwiLHdhdmVzOlwicGUtcmlwcGxlX193YXZlc1wiLG1hc2s6XCJwZS1yaXBwbGVfX21hc2tcIixjb25zdHJhaW5lZDpcInBlLXJpcHBsZS0tY29uc3RyYWluZWRcIixhbmltYXRlZDpcInBlLXJpcHBsZV9fd2F2ZXMtLWFuaW1hdGVkXCJ9LG1ha2VSaXBwbGU9ZnVuY3Rpb24oZSxjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/e306YXJndW1lbnRzWzJdLGVsPWN0cmwucmlwcGxlKCksd2F2ZXNFbD1jdHJsLndhdmVzKCksdz1lbC5vZmZzZXRXaWR0aCxoPWVsLm9mZnNldEhlaWdodCx3YXZlUmFkaXVzPU1hdGguc3FydCh3KncraCpoKSxyZWN0PWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHg9X3BvbHl0aGVuZTJbXCJkZWZhdWx0XCJdLmlzVG91Y2gmJmUudG91Y2hlcz9lLnRvdWNoZXNbMF0ucGFnZVg6ZS5jbGllbnRYLHk9X3BvbHl0aGVuZTJbXCJkZWZhdWx0XCJdLmlzVG91Y2gmJmUudG91Y2hlcz9lLnRvdWNoZXNbMF0ucGFnZVk6ZS5jbGllbnRZLG14PW9wdHMuY2VudGVyP3JlY3QubGVmdCtyZWN0LndpZHRoLzI6eCxteT1vcHRzLmNlbnRlcj9yZWN0LnRvcCtyZWN0LmhlaWdodC8yOnkscng9bXgtcmVjdC5sZWZ0LXdhdmVSYWRpdXMvMixyeT1teS1yZWN0LnRvcC13YXZlUmFkaXVzLzIsaW5pdGlhbE9wYWNpdHk9dm9pZCAwIT09b3B0cy5pbml0aWFsT3BhY2l0eT9vcHRzLmluaXRpYWxPcGFjaXR5OkRFRkFVTFRfU1RBUlRfT1BBQ0lUWSxvcGFjaXR5RGVjYXlWZWxvY2l0eT12b2lkIDAhPT1vcHRzLm9wYWNpdHlEZWNheVZlbG9jaXR5P29wdHMub3BhY2l0eURlY2F5VmVsb2NpdHk6T1BBQ0lUWV9ERUNBWV9WRUxPQ0lUWSxkdXJhdGlvbj0xL29wYWNpdHlEZWNheVZlbG9jaXR5KmluaXRpYWxPcGFjaXR5LGNvbG9yPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5jb2xvcixvbkVuZD1mdW5jdGlvbiBvbkVuZChldnQpe3dhdmVzRWwuY2xhc3NMaXN0LnJlbW92ZShDU1NfQ0xBU1NFUy5hbmltYXRlZCksd2F2ZXNFbC5yZW1vdmVFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCxvbkVuZCwhMSksb3B0cy5lbmQmJm9wdHMuZW5kKGV2dCl9O3dhdmVzRWwuY2xhc3NMaXN0LnJlbW92ZShDU1NfQ0xBU1NFUy5hbmltYXRlZCk7dmFyIHN0eWxlPXdhdmVzRWwuc3R5bGU7c3R5bGUud2lkdGg9c3R5bGUuaGVpZ2h0PXdhdmVSYWRpdXMrXCJweFwiLHN0eWxlLnRvcD1yeStcInB4XCIsc3R5bGUubGVmdD1yeCtcInB4XCIsc3R5bGVbXCJhbmltYXRpb24tZHVyYXRpb25cIl09c3R5bGVbXCItd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvblwiXT1zdHlsZVtcIi1tb3otYW5pbWF0aW9uLWR1cmF0aW9uXCJdPXN0eWxlW1wiLW8tYW5pbWF0aW9uLWR1cmF0aW9uXCJdPWR1cmF0aW9uK1wic1wiLHN0eWxlLmJhY2tncm91bmRDb2xvcj1jb2xvcixzdHlsZS5vcGFjaXR5PWluaXRpYWxPcGFjaXR5LHdhdmVzRWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsb25FbmQsITEpLG9wdHMuc3RhcnQmJm9wdHMuc3RhcnQoZSksd2F2ZXNFbC5jbGFzc0xpc3QuYWRkKENTU19DTEFTU0VTLmFuaW1hdGVkKX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO2lmKG9wdHMuZGlzYWJsZWQpcmV0dXJuKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyAgfSwgY2hpbGRyZW46IFtdIH0pO3ZhciBpbml0UmlwcGxlPWZ1bmN0aW9uKHJpcHBsZSxpbml0ZWQsY29udGV4dCl7aWYoIWluaXRlZCl7Y3RybC5yaXBwbGUocmlwcGxlKTt2YXIgcGFyZW50PXJpcHBsZS5wYXJlbnRFbGVtZW50LG9uQ2xpY2s9ZnVuY3Rpb24oZSl7bWFrZVJpcHBsZShlLGN0cmwsb3B0cyl9LGVuZFR5cGU9X3BvbHl0aGVuZTJbXCJkZWZhdWx0XCJdLmlzVG91Y2g/XCJjbGlja1wiOlwibW91c2V1cFwiO3BhcmVudC5hZGRFdmVudExpc3RlbmVyKGVuZFR5cGUsb25DbGljaywhMSksY29udGV4dC5vbnVubG9hZD1mdW5jdGlvbigpe3BhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKGVuZFR5cGUsb25DbGljaywhMSl9fX0saW5pdFdhdmVzPWZ1bmN0aW9uKHdhdmVzLGluaXRlZCl7aW5pdGVkfHxjdHJsLndhdmVzKHdhdmVzKX0sdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLnJpcHBsZSxvcHRzLmNvbnN0cmFpbmVkIT09ITE/Q1NTX0NMQVNTRVMuY29uc3RyYWluZWQ6bnVsbCxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOmluaXRSaXBwbGV9LGNvbnRlbnQ9KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLm1hc2sgfSwgY2hpbGRyZW46IFsgKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLndhdmVzLCBcImNvbmZpZ1wiOiBpbml0V2F2ZXMgfSwgY2hpbGRyZW46IFtdIH0pIF0gfSk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLGNvbnRlbnQpfSxjb21wb25lbnQ9e2NvbnRyb2xsZXI6ZnVuY3Rpb24oKXtyZXR1cm57cmlwcGxlOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcCgpLHdhdmVzOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcCgpLGRlbGVnYXRlOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcCgpfX0sdmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yaXBwbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0c1tcImRlZmF1bHRcIl09e3N0YXJ0X3NjYWxlOi4xLGVuZF9zY2FsZToyLHN0YXJ0X29wYWNpdHk6LjIsZW5kX29wYWNpdHk6MH0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksa2ZSaXBwbGU9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm57XCIgMTAwJVwiOnt0cmFuc2Zvcm06XCJzY2FsZShcIitjb25maWcuZW5kX3NjYWxlK1wiKVwiLG9wYWNpdHk6Y29uZmlnLmVuZF9vcGFjaXR5fX19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtcmlwcGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHtjb2xvcjpcImluaGVyaXRcIixcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIixcIiYucGUtcmlwcGxlLS1jb25zdHJhaW5lZFwiOntcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIixcIiAucGUtcmlwcGxlX19tYXNrXCI6e292ZXJmbG93OlwiaGlkZGVuXCIsXCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCJ9fSxcIiAucGUtcmlwcGxlX19tYXNrXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNmb3JtOlwidHJhbnNsYXRlM2QoMCwwLDApXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2Zvcm0pXSxcIiAucGUtcmlwcGxlX193YXZlc1wiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zZm9ybTpcInNjYWxlKFwiK2NvbmZpZy5zdGFydF9zY2FsZStcIilcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zZm9ybSksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHthbmltYXRpb246XCJyaXBwbGUgXCIrX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9jdXJ2ZV9kZWZhdWx0fSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfYW5pbWF0aW9uKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1wiYW5pbWF0aW9uLWR1cmF0aW9uXCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9kdXJhdGlvbn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX2FuaW1hdGlvbikse291dGxpbmU6XCIxcHggc29saWQgdHJhbnNwYXJlbnRcIixwb3NpdGlvbjpcImFic29sdXRlXCIsXCJib3JkZXItcmFkaXVzXCI6XCI1MCVcIixvcGFjaXR5OmNvbmZpZy5zdGFydF9vcGFjaXR5LFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIixkaXNwbGF5Olwibm9uZVwifV0sXCIgLnBlLXJpcHBsZV9fd2F2ZXMtLWFuaW1hdGVkXCI6e2Rpc3BsYXk6XCJibG9ja1wifX1dLFwiQGtleWZyYW1lcyByaXBwbGVcIjprZlJpcHBsZShjb25maWcpfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL3JpcHBsZS90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9yaXBwbGUvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0ucmlwcGxlLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtcmlwcGxlXCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKTtyZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtc2hhZG93XCIsdG9wU2hhZG93OlwicGUtc2hhZG93X190b3BcIixib3R0b21TaGFkb3c6XCJwZS1zaGFkb3dfX2JvdHRvbVwiLGFuaW1hdGVkOlwicGUtc2hhZG93LS1hbmltYXRlZFwiLGRlcHRoX246XCJwZS1zaGFkb3ctLXotXCJ9LGNsYXNzRm9yRGVwdGg9ZnVuY3Rpb24oKXt2YXIgej1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/MTphcmd1bWVudHNbMF07cmV0dXJuIENTU19DTEFTU0VTLmRlcHRoX24rTWF0aC5taW4oNSx6KX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLGRlcHRoQ2xhc3M9Y2xhc3NGb3JEZXB0aChvcHRzLnopLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLmFuaW1hdGVkP0NTU19DTEFTU0VTLmFuaW1hdGVkOlwiXCIsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30sY29udGVudD1bb3B0cy5jb250ZW50P29wdHMuY29udGVudDpudWxsLCh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBbQ1NTX0NMQVNTRVMuYm90dG9tU2hhZG93LGRlcHRoQ2xhc3NdLmpvaW4oXCIgXCIpIH0sIGNoaWxkcmVuOiBbXSB9KSwoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogW0NTU19DTEFTU0VTLnRvcFNoYWRvdyxkZXB0aENsYXNzXS5qb2luKFwiIFwiKSB9LCBjaGlsZHJlbjogW10gfSldO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxjb250ZW50KX0sY29tcG9uZW50PXt2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYWRvdy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzW1wiZGVmYXVsdFwiXT17dHJhbnNpdGlvbjpcImJveC1zaGFkb3cgMC4xOHMgZWFzZS1vdXRcIixcInNoYWRvdy10b3Atei0xXCI6XCJub25lXCIsXCJzaGFkb3ctYm90dG9tLXotMVwiOlwiMCAxcHggNHB4IDAgcmdiYSgwLCAwLCAwLCAwLjM3KVwiLFwic2hhZG93LXRvcC16LTJcIjpcIjAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4yKVwiLFwic2hhZG93LWJvdHRvbS16LTJcIjpcIjAgNnB4IDEwcHggMCByZ2JhKDAsIDAsIDAsIDAuMylcIixcInNoYWRvdy10b3Atei0zXCI6XCIwIDExcHggN3B4IDAgcmdiYSgwLCAwLCAwLCAwLjE5KVwiLFwic2hhZG93LWJvdHRvbS16LTNcIjpcIjAgMTNweCAyNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpXCIsXCJzaGFkb3ctdG9wLXotNFwiOlwiMCAxNHB4IDEycHggMCByZ2JhKDAsIDAsIDAsIDAuMTcpXCIsXCJzaGFkb3ctYm90dG9tLXotNFwiOlwiMCAyMHB4IDQwcHggMCByZ2JhKDAsIDAsIDAsIDAuMylcIixcInNoYWRvdy10b3Atei01XCI6XCIwIDE3cHggMTdweCAwIHJnYmEoMCwgMCwgMCwgMC4xNSlcIixcInNoYWRvdy1ib3R0b20tei01XCI6XCIwIDI3cHggNTVweCAwIHJnYmEoMCwgMCwgMCwgMC4zKVwiLFwic2hhZG93LWRvd24tei0xXCI6XCJpbnNldCAwcHggMXB4IDJweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xNSlcIixcInNoYWRvdy1kb3duLXotMlwiOlwiaW5zZXQgMHB4IDRweCA2cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMjUpXCJ9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc2hhZG93RGlyZWN0aXZlPWZ1bmN0aW9uKGRpcil7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJib3gtc2hhZG93XCI6ZGlyfSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfYm94X3NoYWRvdyl9LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtc2hhZG93XCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHtcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCIsXCIgLnBlLXNoYWRvd19fYm90dG9tLCAucGUtc2hhZG93X190b3BcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse1wiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwifV0sXCImLnBlLXNoYWRvdy0tYW5pbWF0ZWRcIjp7XCIgLnBlLXNoYWRvd19fYm90dG9tLCAucGUtc2hhZG93X190b3BcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zaXRpb246Y29uZmlnLnRyYW5zaXRpb259LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKX19LFsxLDIsMyw0LDVdLm1hcChmdW5jdGlvbihpbmRleCl7dmFyIF9yZWY7cmV0dXJuIF9yZWY9e30sX2RlZmluZVByb3BlcnR5KF9yZWYsXCIgLnBlLXNoYWRvd19fdG9wLnBlLXNoYWRvdy0tei1cIitpbmRleCxzaGFkb3dEaXJlY3RpdmUoY29uZmlnW1wic2hhZG93LXRvcC16LVwiK2luZGV4XSkpLF9kZWZpbmVQcm9wZXJ0eShfcmVmLFwiIC5wZS1zaGFkb3dfX2JvdHRvbS5wZS1zaGFkb3ctLXotXCIraW5kZXgsc2hhZG93RGlyZWN0aXZlKGNvbmZpZ1tcInNoYWRvdy1ib3R0b20tei1cIitpbmRleF0pKSxfcmVmfSldfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0uc2hhZG93LGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtc2hhZG93XCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpO3JlcXVpcmUoXCJwb2x5dGhlbmUvc3ZnL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1zdmdcIn0sZ2xvYmFsQ2FjaGU9e30sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLGNvbnRlbnQ9dm9pZCAwLHN2Zz12b2lkIDAsdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPU9iamVjdC5hc3NpZ24oe30se1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30sb3B0cy5ldmVudHM/b3B0cy5ldmVudHM6bnVsbCk7aWYob3B0cy5jb250ZW50KWNvbnRlbnQ9b3B0cy5jb250ZW50O2Vsc2V7dmFyIHBhdGg9b3B0cy5zcmM7Y3RybC5wYXRoKCkhPT1wYXRoPyhzdmc9Z2xvYmFsQ2FjaGVbcGF0aF0sc3ZnPyhjb250ZW50PV9taXRocmlsMltcImRlZmF1bHRcIl0udHJ1c3Qoc3ZnKSxwcmVsb2FkTmV4dChjdHJsLG9wdHMpKTooY3RybC5wYXRoKHBhdGgpLGxvYWRTdmcocGF0aCxjdHJsLG9wdHMpLnRoZW4oX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcpKSk6KHN2Zz1jdHJsLnN2ZygpLHN2Zz1zdmd8fFwiXCIsY29udGVudD1fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnRydXN0KHN2ZykscHJlbG9hZE5leHQoY3RybCxvcHRzKSl9cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sbG9hZFN2Zz1mdW5jdGlvbihwYXRoLGN0cmwsb3B0cyl7dmFyIHByZWxvYWRpbmc9YXJndW1lbnRzLmxlbmd0aDw9M3x8dm9pZCAwPT09YXJndW1lbnRzWzNdPyExOmFyZ3VtZW50c1szXTtpZihTeXN0ZW0mJlN5c3RlbVtcImltcG9ydFwiXSl7dmFyIG5vcm1hbGl6ZWROYW1lPVN5c3RlbS5ub3JtYWxpemVTeW5jKHBhdGgpO3JldHVybiBTeXN0ZW1bXCJpbXBvcnRcIl0obm9ybWFsaXplZE5hbWUpLnRoZW4oZnVuY3Rpb24oZGF0YSl7cHJlbG9hZGluZz8oZ2xvYmFsQ2FjaGVbcGF0aF09ZGF0YSxjdHJsLnByZWxvYWRpbmdJbmRleCsrLHByZWxvYWROZXh0KGN0cmwsb3B0cykpOmN0cmwuc3ZnKGRhdGEpfSl9Y29uc29sZSYmY29uc29sZS5sb2coXCJwb2x5dGhlbmUvc3ZnOiBTeXN0ZW0gbm90IGZvdW5kLlwiKX0scHJlbG9hZE5leHQ9ZnVuY3Rpb24gcHJlbG9hZE5leHQoY3RybCxvcHRzKXtpZihjdHJsLnByZWxvYWRpbmdJdGVtcyYmIShjdHJsLnByZWxvYWRpbmdJbmRleD49Y3RybC5wcmVsb2FkaW5nSXRlbXMubGVuZ3RoKSl7dmFyIG5leHQ9Y3RybC5wcmVsb2FkaW5nSXRlbXNbY3RybC5wcmVsb2FkaW5nSW5kZXhdO2dsb2JhbENhY2hlW25leHRdPyhjdHJsLnByZWxvYWRpbmdJbmRleCsrLHByZWxvYWROZXh0KGN0cmwsb3B0cykpOmxvYWRTdmcobmV4dCxjdHJsLG9wdHMsITApfX0sY29tcG9uZW50PXtjb250cm9sbGVyOmZ1bmN0aW9uKCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXTtyZXR1cm57cGF0aDpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoXCJcIiksc3ZnOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcChcIlwiKSxwcmVsb2FkaW5nSXRlbXM6b3B0cy5wcmVsb2FkLHByZWxvYWRpbmdJbmRleDowfX0sdmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdmcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpO3JlcXVpcmUoXCJwb2x5dGhlbmUvZm9udC1yb2JvdG8vdGhlbWVcIik7dmFyIF90eXBvZ3JhcGh5PXJlcXVpcmUoXCJwb2x5dGhlbmUvdGhlbWUvdHlwb2dyYXBoeVwiKSxfdHlwb2dyYXBoeTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwb2dyYXBoeSkscm9ib3RvPVt7XCJodG1sLCBib2R5LCBpbnB1dCwgdGV4dGFyZWFcIjp7XCJmb250LWZhbWlseVwiOlwiUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJ9fV0sZ2VuZXJhbD1be1wiKlwiOlt7XCJib3gtc2l6aW5nXCI6XCJib3JkZXItYm94XCJ9LHtcIi13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvclwiOlwicmdiYSgwLDAsMCwwKVwifSx7XCItd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3JcIjpcInRyYW5zcGFyZW50XCJ9XSxcIiBhLCBhOmFjdGl2ZSwgYTpmb2N1cywgaW5wdXQ6YWN0aXZlLCBpbnB1dFt0eXBlXTpmb2N1c1wiOntvdXRsaW5lOjB9LFwiaW5wdXQ6ZGlzYWJsZWRcIjp7b3BhY2l0eToxfX1dO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS10aGVtZVwiLHJvYm90byxfdHlwb2dyYXBoeTJbXCJkZWZhdWx0XCJdLGdlbmVyYWwpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxmb250U2l6ZT0xNCxzdHlsZXM9W3tcIiBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwXCI6e21hcmdpbjowLHBhZGRpbmc6MH19LHtcIiBoMSBzbWFsbCwgaDIgc21hbGwsIGgzIHNtYWxsLCBoNCBzbWFsbCwgaDUgc21hbGwsIGg2IHNtYWxsXCI6e1wiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0ubGluZV9oZWlnaHQsXCJsZXR0ZXItc3BhY2luZ1wiOlwiLTAuMDJlbVwiLFwiZm9udC1zaXplXCI6XCIwLjZlbVwifX0se1wiIGgxXCI6e1wiZm9udC1zaXplXCI6XCI1NnB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5saW5lX2hlaWdodCxcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjI0cHhcIn19LHtcIiBoMlwiOntcImZvbnQtc2l6ZVwiOlwiNDVweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjQ4cHhcIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjI0cHhcIn19LHtcIiBoM1wiOntcImZvbnQtc2l6ZVwiOlwiMzRweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjQwcHhcIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjI0cHhcIn19LHtcIiBoNFwiOntcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjMycHhcIixcIi1tb3otb3N4LWZvbnQtc21vb3RoaW5nXCI6XCJncmF5c2NhbGVcIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjE2cHhcIn19LHtcIiBoNVwiOntcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbWVkaXVtLFwibGluZS1oZWlnaHRcIjpcIjFcIixcImxldHRlci1zcGFjaW5nXCI6XCItMC4wMmVtXCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIxNnB4XCJ9fSx7XCIgaDZcIjp7XCJmb250LXNpemVcIjpcIjE2cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC4wNGVtXCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIxNnB4XCJ9fSx7XCIgaHRtbCwgYm9keVwiOntcImZvbnQtc2l6ZVwiOmZvbnRTaXplK1wicHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyMHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWx9LFwiIHBcIjp7XCJmb250LXNpemVcIjpmb250U2l6ZStcInB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjBcIixcIm1hcmdpbi1ib3R0b21cIjpcIjE2cHhcIn0sXCIgYmxvY2txdW90ZVwiOntwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImZvbnQtc3R5bGVcIjpcIml0YWxpY1wiLFwibGluZS1oZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0ubGluZV9oZWlnaHQsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMC4wOGVtXCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIxNnB4XCJ9LFwiIHVsLCBvbFwiOntcImZvbnQtc2l6ZVwiOmZvbnRTaXplK1wicHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOjB9LFwiYiwgc3Ryb25nXCI6e1wiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbWVkaXVtfX1dO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXN0eWxlcyxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cG9ncmFwaHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS10b29sYmFyXCIse2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfdGV4dFwiXX0pXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIpLHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiJlwiKV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksbWFyZ2luX3NpZGU9MipfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudC0xMixoZWlnaHRfZGVza3RvcD04Kl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LGhlaWdodF9tb2JpbGVfcG9ydHJhaXQ9NypfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCxoZWlnaHRfbW9iaWxlX2xhbmRzY2FwZT02Kl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXttYXJnaW5fc2lkZTptYXJnaW5fc2lkZSxpbmRlbnQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaW5kZW50LHRyYW5zaXRpb25fZHVyYXRpb246X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9kdXJhdGlvbixmb250X3NpemU6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfc2l6ZV90aXRsZSxsaW5lX2hlaWdodDpfY29uZmlnMltcImRlZmF1bHRcIl0ubGluZV9oZWlnaHQsaGVpZ2h0X2Rlc2t0b3A6aGVpZ2h0X2Rlc2t0b3AsaGVpZ2h0X21vYmlsZV9wb3J0cmFpdDpoZWlnaHRfbW9iaWxlX3BvcnRyYWl0LGhlaWdodF9tb2JpbGVfbGFuZHNjYXBlOmhlaWdodF9tb2JpbGVfbGFuZHNjYXBlLGhlaWdodF9ub3JtYWw6aGVpZ2h0X2Rlc2t0b3AsaGVpZ2h0X21lZGl1bV90YWxsOjIqaGVpZ2h0X2Rlc2t0b3AsaGVpZ2h0X3RhbGw6MypoZWlnaHRfZGVza3RvcCxoZWlnaHRfbmFycm93OmhlaWdodF9tb2JpbGVfcG9ydHJhaXQsaGVpZ2h0X25hcnJvd19tZWRpdW1fdGFsbDoxMTIsaGVpZ2h0X25hcnJvd190YWxsOjE2OCxjb2xvcl9saWdodF90ZXh0Ol9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3ByaW1hcnkpLGNvbG9yX2RhcmtfdGV4dDpfY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcHJpbWFyeSl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLF9mbGV4PXJlcXVpcmUoXCJwb2x5dGhlbmUvbGF5b3V0L3RoZW1lL2ZsZXhcIiksX2ZsZXgyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsZXgpLGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtdG9vbGJhclwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zZm9ybTpcInRyYW5zbGF0ZTNkKDAsMCwwKVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNmb3JtKSx7ZGlzcGxheTpcImJsb2NrXCIscG9zaXRpb246XCJyZWxhdGl2ZVwiLGhlaWdodDpjb25maWcuaGVpZ2h0X25vcm1hbCtcInB4XCIsXCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplK1wicHhcIixcImxpbmUtaGVpZ2h0XCI6Y29uZmlnLmxpbmVfaGVpZ2h0K1wiZW1cIixcImJhY2tncm91bmQtY29sb3JcIjpcIiNDRkQ4RENcIixcIiYucGUtaGVhZGVyLS1hbmltYXRlZFwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLmRlZmF1bHRUcmFuc2l0aW9uKFwiaGVpZ2h0XCIsY29uZmlnLnRyYW5zaXRpb25fZHVyYXRpb24sXCJlYXNlLWluXCIpLFwiJi5wZS1oZWFkZXItLW1lZGl1bS10YWxsXCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X21lZGl1bV90YWxsK1wicHhcIn0sXCImLnBlLWhlYWRlci0tdGFsbFwiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF90YWxsK1wicHhcIn0sXCImLnBlLXRvb2xiYXItLW5hcnJvd1wiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF9uYXJyb3crXCJweFwiLFwiIC5wZS10b29sYmFyX19iYXJcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfbmFycm93K1wicHhcIixwYWRkaW5nOjB9fSxcIiYucGUtdG9vbGJhci0tbmFycm93LnBlLWhlYWRlci0tbWVkaXVtLXRhbGxcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfbmFycm93X21lZGl1bV90YWxsK1wicHhcIn0sXCImLnBlLXRvb2xiYXItLW5hcnJvdy5wZS1oZWFkZXItLXRhbGxcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfbmFycm93X3RhbGwrXCJweFwifSxcIiYucGUtaGVhZGVyLS10YWxsIC5wZS10b29sYmFyX19iYXItLW1pZGRsZVwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNmb3JtOlwidHJhbnNsYXRlWSgxMDAlKVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNmb3JtKSxcIiAucGUtdG9vbGJhcl9fYmFyXCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0Q2VudGVyLF9mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0SG9yaXpvbnRhbCx7XCI+ICo6bm90KC5kaXNhYmxlZClcIjp7XCJwb2ludGVyLWV2ZW50c1wiOlwiYXV0b1wifX0se1wiPiA6Zmlyc3QtY2hpbGRcIjp7XCJtYXJnaW4tbGVmdFwiOmNvbmZpZy5tYXJnaW5fc2lkZStcInB4XCJ9fSx7XCI+IDpsYXN0LWNoaWxkXCI6e1wibWFyZ2luLXJpZ2h0XCI6Y29uZmlnLm1hcmdpbl9zaWRlK1wicHhcIn19LHtcIiAucGUtYnV0dG9uLS1pY29uICsgc3BhbiwgLnBlLWJ1dHRvbi0taWNvbiArIC5wZS10aXRsZVwiOntcIm1hcmdpbi1sZWZ0XCI6Y29uZmlnLmluZGVudC1jb25maWcubWFyZ2luX3NpZGUtX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9pY29uX2J1dHRvbitcInB4XCJ9fSx7XCI+IHNwYW46Zmlyc3QtY2hpbGQsIC5wZS10b29sYmFyX190aXRsZS0taW5kZW50XCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKCkse1wibWFyZ2luLWxlZnRcIjpjb25maWcuaW5kZW50K1wicHhcIn1dfSx7XCI+IHNwYW4sID4gLnBlLXRpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKCksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInRyYW5zZm9ybS1vcmlnaW5cIjpcImxlZnQgNTAlXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2Zvcm0pLHtkaXNwbGF5OlwiYmxvY2tcIixcImxpbmUtaGVpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmxpbmVfaGVpZ2h0K1wiZW1cIn1dfSx7d2lkdGg6XCIxMDAlXCIscG9zaXRpb246XCJyZWxhdGl2ZVwiLGhlaWdodDpjb25maWcuaGVpZ2h0X25vcm1hbCtcInB4XCIsXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwiLFwiIC5wZS1maXRcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse3dpZHRoOlwiYXV0b1wiLG1hcmdpbjowLFwiLmJvdHRvbVwiOnt0b3A6XCJhdXRvXCJ9fV0sXCIgLnBlLWhlYWRlclwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKCksXCImLnBlLXRvb2xiYXJfX2Jhci0tbWlkZGxlXCI6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6MCxyaWdodDowLGxlZnQ6MH0sXCImLnBlLXRvb2xiYXJfX2Jhci0tYm90dG9tXCI6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixyaWdodDowLGJvdHRvbTowLGxlZnQ6MH19XX1dfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvdG9vbGJhci90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS90b29sYmFyL3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLnRvb2xiYXIsY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS10b29sYmFyXCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKTtyZXF1aXJlKFwicG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLXRvb2xiYXJcIixiYXI6XCJwZS10b29sYmFyX19iYXJcIix0b3BCYXI6XCJwZS10b29sYmFyX19iYXItLXRvcFwiLG1pZGRsZUJhcjpcInBlLXRvb2xiYXJfX2Jhci0tbWlkZGxlXCIsYm90dG9tQmFyOlwicGUtdG9vbGJhcl9fYmFyLS1ib3R0b21cIixhbmltYXRlZDpcInBlLWhlYWRlci0tYW5pbWF0ZWRcIixtZWRpdW1UYWxsOlwicGUtaGVhZGVyLS1tZWRpdW0tdGFsbFwiLHRhbGw6XCJwZS1oZWFkZXItLXRhbGxcIn0sYmFyV3JhcHBlcj1mdW5jdGlvbihjbGFzc05hbWUsY29udGVudCl7cmV0dXJuKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IFtDU1NfQ0xBU1NFUy5iYXIsY2xhc3NOYW1lXS5qb2luKFwiIFwiKSB9LCBjaGlsZHJlbjogWyBjb250ZW50IF0gfSl9LGJhcj1mdW5jdGlvbigpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF0sYmFycz1bXTtyZXR1cm4gb3B0cy5jb250ZW50P2JhcnMucHVzaChiYXJXcmFwcGVyKENTU19DTEFTU0VTLnRvcEJhcixvcHRzLmNvbnRlbnQpKToob3B0cy50b3BCYXImJmJhcnMucHVzaChiYXJXcmFwcGVyKENTU19DTEFTU0VTLnRvcEJhcixvcHRzLnRvcEJhcikpLG9wdHMubWlkZGxlQmFyJiZiYXJzLnB1c2goYmFyV3JhcHBlcihDU1NfQ0xBU1NFUy5taWRkbGVCYXIsb3B0cy5taWRkbGVCYXIpKSxvcHRzLmJvdHRvbUJhciYmYmFycy5wdXNoKGJhcldyYXBwZXIoQ1NTX0NMQVNTRVMuYm90dG9tQmFyLG9wdHMuYm90dG9tQmFyKSkpLGJhcnN9LG1vZGVDbGFzc2VzPXtcIm1lZGl1bS10YWxsXCI6Q1NTX0NMQVNTRVMubWVkaXVtVGFsbCx0YWxsOkNTU19DTEFTU0VTLnRhbGx9LGNsYXNzRm9yTW9kZT1mdW5jdGlvbigpe3ZhciBtb2RlPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9cInN0YW5kYXJkXCI6YXJndW1lbnRzWzBdO3JldHVyblwic3RhbmRhcmRcIj09PW1vZGU/XCJcIjptb2RlQ2xhc3Nlc1ttb2RlXX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxDU1NfQ0xBU1NFUy5hbmltYXRlZCxjbGFzc0Zvck1vZGUob3B0cy5tb2RlKSxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxjb250ZW50PWJhcihvcHRzKTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e3ZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbGJhci5qcy5tYXAiXX0=
