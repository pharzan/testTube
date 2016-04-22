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
	}}
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
					     server.MainGlobal.socket.emit('CMD_GET_DBS',{});
					     server.MainGlobal.socket.on('CMD_SET_DBS',function(dbs){
						 console.log(dbs)
						 dropDown.update(dbs.dbsArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2hlYWRlci5qcyIsImNvbXBvbmVudHMvbG9hZC5qcyIsImNvbXBvbmVudHMvbWl0aENob3Nlbi5qcyIsImNvbXBvbmVudHMvbWl0aERyb3BEb3duLmpzIiwibWFpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9qMmMvZGlzdC9qMmMuY29tbW9uanMuanMiLCIuLi9ub2RlX21vZHVsZXMvbWl0aHJpbC9taXRocmlsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9iYXNlLWJ1dHRvbi9iYXNlLWJ1dHRvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYmFzZS1idXR0b24vdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9iYXNlLWJ1dHRvbi90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL2J1dHRvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2NvbG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9idXR0b24vdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9taXhpbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL211bHRpcGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL3N0eWxlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL3RyYW5zaXRpb24tZXZlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vd2ViZm9udGxvYWRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2N1c3RvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29uZmlnL2RlZmF1bHQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy9kaWFsb2ctaW5zdGFuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy9kaWFsb2cuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZGlhbG9nL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9mb250LXJvYm90by90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvaWNvbi9pY29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9pY29uL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvaWNvbi90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2ljb24vdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xheW91dC90aGVtZS9mbGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvbGlzdC10aWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC9saXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0L3RoZW1lL2NvbG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0L3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbWVudS90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbWVudS90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9tZW51L3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9wb2x5dGhlbmUvcG9seXRoZW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvcmlwcGxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9yaXBwbGUvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy9zaGFkb3cuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3NoYWRvdy90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvc3ZnL3N2Zy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvc3ZnL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdGhlbWUvdHlwb2dyYXBoeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90b29sYmFyL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90b29sYmFyL3Rvb2xiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3bEVBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGJ0biA9cmVxdWlyZSggJ3BvbHl0aGVuZS9idXR0b24vYnV0dG9uJyk7XG52YXIgdGhlbWU9cmVxdWlyZSgncG9seXRoZW5lL3RoZW1lL3RoZW1lJyk7XG52YXIgdG9vbGJhcj0gcmVxdWlyZSggJ3BvbHl0aGVuZS90b29sYmFyL3Rvb2xiYXInKTtcbnZhciBtZW51ID1yZXF1aXJlKCAncG9seXRoZW5lL21lbnUvbWVudScpO1xudmFyIGxpc3QgPXJlcXVpcmUoJ3BvbHl0aGVuZS9saXN0L2xpc3QnKTtcbnZhciBsaXN0VGlsZT1yZXF1aXJlKCAncG9seXRoZW5lL2xpc3QtdGlsZS9saXN0LXRpbGUnKTtcblxudmFyIE1pdGhEcm9wRG93bj1yZXF1aXJlKCcuLi9jb21wb25lbnRzL21pdGhEcm9wRG93bi5qcycpO1xudmFyIGRyb3BEb3duPSBuZXcgTWl0aERyb3BEb3duKCk7XG52YXIgZGlhbG9nPXJlcXVpcmUoICdwb2x5dGhlbmUvZGlhbG9nL2RpYWxvZycpO1xudmFyIHNlcnZlcj1yZXF1aXJlKCcuLi9tYWluLmpzJyk7XG5jb25zdCBsb2FkRGlhbG9nID0ge307XG5sb2FkRGlhbG9nLnZpZXcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG0oJ2RpdicsIFtcbiAgICAgICAgbS5jb21wb25lbnQoZGlhbG9nKVxuICAgIF0pO1xufTtcbmNvbnN0IGZvb3RlckJ1dHRvbnMgPSBbXG4gICAgbS5jb21wb25lbnQoYnRuLCB7XG4gICAgICAgIGxhYmVsOiAnT0snLFxuXHRldmVudHM6e29uY2xpY2s6ZnVuY3Rpb24oKXtcblx0ICAgIHNlcnZlci5NYWluR2xvYmFsLnNvY2tldC5lbWl0KCdDTURfTE9BRCcse3BhdGg6ZHJvcERvd24uc2VsZWN0ZWQubmFtZX0pO1xuXHQgICAgZGlhbG9nLmhpZGUoKTtcblx0fX1cbiAgICB9KSxcbiAgICBtLmNvbXBvbmVudChidG4sIHtcbiAgICAgICAgbGFiZWw6ICdEaXNjYXJkJyxcblx0ZXZlbnRzOntvbmNsaWNrOmZ1bmN0aW9uKCl7XG5cdCAgICBkaWFsb2cuaGlkZSgpO1xuXHR9fVxuICAgIH0pXG5dO1xudmFyIEdsb2JhbD17XG4gICAgc2hvdzp7bG9hZERpYWxvZzpmYWxzZX1cbn07XG5cbmV4cG9ydHMuaGVhZGVyID0ge1xuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuXHR2YXIgZWRpdD0gbS5jb21wb25lbnQoYnRuLCB7XG5cdFx0XHQgIGxhYmVsOiAnRWRpdCcsXG5cdFx0XHQgIGV2ZW50czoge1xuXHRcdFx0ICAgICAgb25jbGljazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCAgXG5cdFx0XHRcdCAgbS5yb3V0ZSgnL3JlcG9ydCcpO1xuXHRcdFx0ICAgICAgfVxuXHRcdFx0ICB9XG5cdH0pO1xuXHRcblx0dmFyIHNpbXBsZUNvbnRhaW5lcjI9e307XG5cdHZhciBzaW1wbGVDb250YWluZXIzPXt9O1xuXHR2YXIgZmlsZT17dmlldyA6IGZ1bmN0aW9uKGN0cmwpe1xuXHQgICAgcmV0dXJuIG0oJy5jb250YWluZXInLFxuXHRcdCAgICAgbSgnYScsIHtcblx0XHRcdCBocmVmOiAnamF2YXNjcmlwdDogdm9pZCgwKScsXG5cdFx0XHQgaWQ6ICdzaW1wbGVfYnRuJywgLy8gdXNlIGFzIG1lbnUncyB0YXJnZXRcblx0XHRcdCBvbmNsaWNrOiAoKSA9PiAoY3RybC5vcGVuID0gdHJ1ZSkgLy8gb3BlbnMgYXQgbmV4dCByZWRyYXdcblx0XHQgICAgIH0sICdGaWxlJyksXG5cdFx0ICAgICBtLmNvbXBvbmVudChtZW51LCB7XG5cdFx0XHQgdGFyZ2V0OiAnc2ltcGxlX2J0bicsIC8vIHRvIGFsaWduIHdpdGggdGhlIGxpbmtcblx0XHRcdCBvZmZzZXQ6IDAsIC8vIGhvcml6b250YWxseSBhbGlnbiB3aXRoIGxpbmtcblx0XHRcdCBzaG93OiBjdHJsLm9wZW4sIC8vIHNob3VsZCB0aGUgbWVudSBiZSBvcGVuIG9yIGNsb3NlZD9cblx0XHRcdCBzaXplOidhdXRvJyxcblx0XHRcdCBkaWRIaWRlOiAoKSA9PiAoY3RybC5vcGVuID0gZmFsc2UpLCAvLyBjYWxsZWQgYWZ0ZXIgY2xvc2luZ1xuXHRcdFx0IGNvbnRlbnQ6IG0uY29tcG9uZW50KGxpc3QsIHtcblx0XHRcdCAgICAgdGlsZXM6IFtcblx0XHRcdFx0IFxuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ05ldycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KSxcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdMb2FkJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWUsXG5cdFx0XHRcdCAgICAgZXZlbnRzOntcblx0XHRcdFx0XHQgb25jbGljazpmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCAgICAgc2VydmVyLk1haW5HbG9iYWwuc29ja2V0LmVtaXQoJ0NNRF9HRVRfREJTJyx7fSk7XG5cdFx0XHRcdFx0ICAgICBzZXJ2ZXIuTWFpbkdsb2JhbC5zb2NrZXQub24oJ0NNRF9TRVRfREJTJyxmdW5jdGlvbihkYnMpe1xuXHRcdFx0XHRcdFx0IGNvbnNvbGUubG9nKGRicylcblx0XHRcdFx0XHRcdCBkcm9wRG93bi51cGRhdGUoZGJzLmRic0FycmF5KTtcblx0XHRcdFx0XHQgICAgIH0pO1xuXHRcdFx0XHRcdFx0ZGlhbG9nLnNob3coe1xuXHRcdFx0XHRcdFx0ICAgIHRpdGxlOiAnY2hvb3NlIGEgRGF0YUJhc2UgTmFtZScsXG5cdFx0XHRcdFx0XHQgICAgYm9keTogbS5jb21wb25lbnQoZHJvcERvd24pLFxuXHRcdFx0XHRcdFx0ICAgIGZvb3Rlcjpmb290ZXJCdXR0b25zXG5cdFx0XHRcdFx0XHQgICAgXG5cdFx0XHRcdFx0XHQgICAgXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQgfVxuXHRcdFx0XHRcdCBcblx0XHRcdFx0ICAgICB9XG5cdFx0XHRcdCB9KSxcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdTYXZlJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWVcblx0XHRcdFx0IH0pXG5cdFx0XHQgICAgIF1cblx0XHRcdCB9KVxuXHRcdCAgICAgfSlcblx0XHQgICAgKTtcblx0fX07XG5cdFxuXHRzaW1wbGVDb250YWluZXIyLnZpZXcgPSAoY3RybCkgPT4ge1xuXHQgICAgcmV0dXJuIG0oJy5jb250YWluZXInLFxuXHRcdCAgICAgbSgnYScsIHtcblx0XHRcdCBocmVmOiAnamF2YXNjcmlwdDogdm9pZCgwKScsXG5cdFx0XHQgaWQ6ICdzaW1wbGVfYnRuMicsIC8vIHVzZSBhcyBtZW51J3MgdGFyZ2V0XG5cdFx0XHQgb25jbGljazogKCkgPT4gKGN0cmwub3BlbiA9IHRydWUpIC8vIG9wZW5zIGF0IG5leHQgcmVkcmF3XG5cdFx0ICAgICB9LCAnRWRpdCcpLFxuXHRcdCAgICAgbS5jb21wb25lbnQobWVudSwge1xuXHRcdFx0IHRhcmdldDogJ3NpbXBsZV9idG4yJywgLy8gdG8gYWxpZ24gd2l0aCB0aGUgbGlua1xuXHRcdFx0IG9mZnNldDogMCwgLy8gaG9yaXpvbnRhbGx5IGFsaWduIHdpdGggbGlua1xuXHRcdFx0IHNob3c6IGN0cmwub3BlbiwgLy8gc2hvdWxkIHRoZSBtZW51IGJlIG9wZW4gb3IgY2xvc2VkP1xuXHRcdFx0IHNpemU6J2F1dG8nLFxuXHRcdFx0IGRpZEhpZGU6ICgpID0+IChjdHJsLm9wZW4gPSBmYWxzZSksIC8vIGNhbGxlZCBhZnRlciBjbG9zaW5nXG5cdFx0XHQgY29udGVudDogbS5jb21wb25lbnQobGlzdCwge1xuXHRcdFx0ICAgICB0aWxlczogW1xuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ1llcycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KSxcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdObycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KVxuXHRcdFx0ICAgICBdXG5cdFx0XHQgfSlcblx0XHQgICAgIH0pXG5cdFx0ICAgICk7XG5cdH07XG5cdFxuXHRzaW1wbGVDb250YWluZXIzLnZpZXcgPSAoY3RybCkgPT4ge1xuXHQgICAgcmV0dXJuIG0oJy5jb250YWluZXInLFxuXHRcdCAgICAgbSgnYScsIHtcblx0XHRcdCBocmVmOiAnamF2YXNjcmlwdDogdm9pZCgwKScsXG5cdFx0XHQgaWQ6ICdzaW1wbGVfYnRuMycsIC8vIHVzZSBhcyBtZW51J3MgdGFyZ2V0XG5cdFx0XHQgb25jbGljazogKCkgPT4gKGN0cmwub3BlbiA9IHRydWUpIC8vIG9wZW5zIGF0IG5leHQgcmVkcmF3XG5cdFx0ICAgICB9LCAnSGVscCcpLFxuXHRcdCAgICAgbS5jb21wb25lbnQobWVudSwge1xuXHRcdFx0IHRhcmdldDogJ3NpbXBsZV9idG4zJywgLy8gdG8gYWxpZ24gd2l0aCB0aGUgbGlua1xuXHRcdFx0IG9mZnNldDogMCwgLy8gaG9yaXpvbnRhbGx5IGFsaWduIHdpdGggbGlua1xuXHRcdFx0IHNob3c6IGN0cmwub3BlbiwgLy8gc2hvdWxkIHRoZSBtZW51IGJlIG9wZW4gb3IgY2xvc2VkP1xuXHRcdFx0IHNpemU6J2F1dG8nLFxuXHRcdFx0IFxuXHRcdFx0IGRpZEhpZGU6ICgpID0+IChjdHJsLm9wZW4gPSBmYWxzZSksIC8vIGNhbGxlZCBhZnRlciBjbG9zaW5nXG5cdFx0XHQgY29udGVudDogbS5jb21wb25lbnQobGlzdCwge1xuXHRcdFx0ICAgICB0aWxlczogW1xuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ1llcycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlLFxuXHRcdFx0XHQgICAgIGV2ZW50czp7b25jbGljazpmdW5jdGlvbigpe1xuXHRcdFx0XHRcdCBzZXJ2ZXIuR2xvYmFsLnNvY2tldC5lbWl0KCdkYXRhJyx7ZGF0YTonV29XJ30pO1xuXHRcdFx0XHQgICAgIH19XG5cdFx0XHRcdCB9KSxcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdObycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KVxuXHRcdFx0ICAgICBdXG5cdFx0XHQgfSlcblx0XHQgICAgIH0pXG5cdFx0ICAgICk7XG5cdH07XG5cdFxuXHR0aGlzLm15VG9vbGJhciA9IG0uY29tcG9uZW50KHRvb2xiYXIsIHtcblx0ICAgIFxuXHQgICAgY29udGVudDpbbS5jb21wb25lbnQoZmlsZSksXG5cdFx0ICAgICBtLmNvbXBvbmVudChzaW1wbGVDb250YWluZXIyKSxcblx0XHQgICAgIG0uY29tcG9uZW50KHNpbXBsZUNvbnRhaW5lcjMpXVxuXHRcdCAgICAgXG5cdFx0XHRcdCBcblx0fSlcblxuICAgIH0sXG4gICAgdmlldzogZnVuY3Rpb24oY3RybCkge1xuXG4gICAgICAgIHJldHVybiBtKCcuaGVhZGVyJyxcblx0XHQgbS5jb21wb25lbnQoY3RybC5teVRvb2xiYXIpLFxuXHRcdCBtLmNvbXBvbmVudChsb2FkRGlhbG9nKVxuXHRcdCAvLyBtLmNvbXBvbmVudChjdHJsLmJ1aWxkQnRuKSxcblx0XHQgLy8gbS5jb21wb25lbnQoY3RybC5yZXBvcnRCdG4pXG5cdFx0KTtcbiAgICB9XG59O1xuIiwidmFyIGJ1dHRvbiA9cmVxdWlyZSggJ3BvbHl0aGVuZS9idXR0b24vYnV0dG9uJyk7XG52YXIgZGlhbG9nID1yZXF1aXJlKCdwb2x5dGhlbmUvZGlhbG9nL2RpYWxvZycpO1xuXG5cblxudmFyIGxvYWQ9e3ZpZXcgOmZ1bmN0aW9uICgpICB7XG4gICAgcmV0dXJuIG0oJ2RpdicsIFtcbiAgICAgICAgbS5jb21wb25lbnQoYnV0dG9uLCB7XG4gICAgICAgICAgICBsYWJlbDogJ0xvYWQnLFxuICAgICAgICAgICAgcmFpc2VkOiB0cnVlLFxuXHQgICAgXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTG9hZCBhIERCJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6ICdzb21lIHRleHQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG0uY29tcG9uZW50KGRpYWxvZylcbiAgICBdKTtcbn1cblx0IH07XG5cbmV4cG9ydHMubWFpbj17XG4gICAgdmlldzpmdW5jdGlvbigpe1xuXHRyZXR1cm4gbSgnJyk7XG4gICAgfVxufTtcblxuIiwiZXhwb3J0cy5NaXRoQ2hvc2VuPWZ1bmN0aW9uIG1pdGhDaG9zZW4oY29uZmlnKSB7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7XG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICBpdGVtc1BlclBhZ2U6IDk5OSxcbiAgICAgICAgc29ydEJ5TmFtZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMudXNlcklucHV0ID0gbS5wcm9wKCcnKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gJyc7XG4gICAgdGhpcy5zaG93UmVzdWx0cz1mYWxzZTtcblxuICAgIHRoaXMudXBkYXRlTGlzdCA9IGZ1bmN0aW9uKGZvdW5kSXRlbXMpIHtcblxuXHR0aGlzLmxpc3QgPSBmb3VuZEl0ZW1zO1xuXHR2YXIgcGVyUGFnZSA9IHRoaXMuY29uZmlnLml0ZW1zUGVyUGFnZTtcblx0dmFyIHNvcnQgPSB0aGlzLmNvbmZpZy5zb3J0QnlOYW1lO1xuXHRcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihuZXdMaXN0KSB7XG5cdG0uc3RhcnRDb21wdXRhdGlvbigpO1xuXHR0aGlzLmxpc3QgPSBuZXdMaXN0O1xuXHR0aGlzLmNvbmZpZy5saXN0ID0gbmV3TGlzdDtcblx0dmFyIHBlclBhZ2UgPSB0aGlzLmNvbmZpZy5pdGVtc1BlclBhZ2U7XG5cdHZhciBzb3J0ID0gdGhpcy5jb25maWcuc29ydEJ5TmFtZTtcblx0bS5lbmRDb21wdXRhdGlvbigpO1xuICAgIH07XG5cbiAgICB0aGlzLmZpbmQgPSBmdW5jdGlvbigpIHtcblxuXHR2YXIgc2VsZiA9IHRoaXM7XG5cdHZhciBmb3VuZEl0ZW1zID0gW107XG5cdHRoaXMuY29uZmlnLmxpc3QubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBsb3dlckl0ZW0gPSBpdGVtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmIChsb3dlckl0ZW0uaW5kZXhPZihzZWxmLnVzZXJJbnB1dCgpKSA+IC0xKSB7XG5cdFx0Zm91bmRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXHR9KTtcblxuXG5cdHRoaXMudXBkYXRlTGlzdChmb3VuZEl0ZW1zKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5zZWxlY3RlZDtcblxuICAgIH07XG5cbiAgICB0aGlzLnZpZXcgPSBmdW5jdGlvbigpIHtcblx0dmFyIHNlbGYgPSB0aGlzO1xuXHRyZXR1cm4gbSgnLm1pdGhDaG9zZW4nLFxuXHRcdCBtKCdpbnB1dCcsIHtcblx0XHQgICAgIHN0eWxlOntcblx0XHRcdCB3aWR0aDogc2VsZi5jb25maWcuc3R5bGVzLndpZHRoXG5cdFx0ICAgICB9LFxuXHRcdCAgICAgY29uZmlnOmZ1bmN0aW9uKGUsaXNpbml0KXtcblx0XHRcdCBpZihpc2luaXQpXG5cdFx0XHQgICAgIHJldHVybjtcblx0XHRcdCBzZWxmLmlucHV0RWxlbWVudD1lO1xuXHRcdCAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgIG9uaW5wdXQ6IG0ud2l0aEF0dHIoJ3ZhbHVlJywgdGhpcy51c2VySW5wdXQpLFxuICAgICAgICAgICAgICAgICAgICAgb25rZXl1cDogdGhpcy5maW5kKCksXG5cdFx0ICAgICBvbmZvY3VzOmZ1bmN0aW9uKCl7XG5cdFx0XHQgXG5cdFx0XHQgc2VsZi5zaG93UmVzdWx0cz10cnVlO1xuXHRcdCAgICAgfSxcblx0XHQgICAgIG9uYmx1cjpmdW5jdGlvbigpe1xuXHRcdFx0IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdCAgICAgbS5zdGFydENvbXB1dGF0aW9uKCk7XG5cdFx0XHQgICAgIHNlbGYuc2hvd1Jlc3VsdHM9ZmFsc2U7XG5cdFx0XHQgICAgIG0uZW5kQ29tcHV0YXRpb24oKTtcblx0XHRcdCB9LDE1MCk7XG5cdFx0ICAgICB9XG5cdFx0ICAgICBcblx0XHQgfSxcblx0XHQgICB0aGlzLnVzZXJJbnB1dCgpKSxcblx0XHQgdGhpcy5zaG93UmVzdWx0cz9tKCcubWl0aENob3NlblJlc3VsdHMnLFxuXHRcdCAgIG0oJ29sJywge1xuICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuXHRcdFx0ICAgd2lkdGg6IHNlbGYuY29uZmlnLnN0eWxlcy53aWR0aCxcblx0XHRcdCAgIG1heEhlaWdodDonMjUwcHgnLFxuXHRcdFx0ICAgb3ZlcmZsb3dZOidhdXRvJyxcblx0XHRcdCAgIGJhY2tncm91bmQ6J3doaXRlJyxcblx0XHRcdCAgIHBvc2l0aW9uOidhYnNvbHV0ZScsXG5cdFx0XHQgICB6SW5kZXg6Jzk5J1xuICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgfSxcblx0XHQgICAgIHRoaXMubGlzdC5tYXAoXG5cdFx0XHQgZnVuY3Rpb24obGlzdEl0ZW0sIGkpIHtcblx0XHRcdCAgICAgaWYgKGkgPj0gc2VsZi5jb25maWcuaXRlbXNQZXJQYWdlKVxuXHRcdFx0XHQgcmV0dXJuO1xuXHRcdFx0ICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oJ2xpJywge1xuXHRcdFx0XHQgICBvbmNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuXHRcdFx0XHQgICAgICAgc2VsZi5pbnB1dEVsZW1lbnQudmFsdWUgPSBzZWxmLnNlbGVjdGVkO1xuXHRcdFx0XHQgICAgICAgY29uc29sZS5sb2coJ2FhYScsc2VsZi5pbnB1dEVsZW1lbnQpO1xuXHRcdFx0XHQgICAgICAgXG5cdFx0XHRcdCAgICAgICBcblx0XHRcdFx0ICAgfSxcblx0XHRcdFx0ICAgb25tb3VzZW92ZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gc2VsZi5jb25maWcuc3R5bGVzLnNlbGVjdGVkQmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JlZ3JvdW5kID0gc2VsZi5jb25maWcuc3R5bGVzLnNlbGVjdGVkRm9yZWdyb3VuZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5jb2xvciA9IGZvcmVncm91bmQ7XG5cblx0XHRcdFx0ICAgfSxcblx0XHRcdFx0ICAgb25tb3VzZW91dDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSBzZWxmLmNvbmZpZy5zdHlsZXMuYmFja2dyb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JlZ3JvdW5kID0gc2VsZi5jb25maWcuc3R5bGVzLmZvcmVncm91bmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuY29sb3IgPSBmb3JlZ3JvdW5kO1xuXHRcdFx0XHQgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbGlzdEl0ZW0pO1xuXHRcdFx0IH0pKVxuXHRcdFx0ICAgICAgKTpudWxsKTtcblx0XHR9O1xuXG4gICAgXG59XG5cblxuXG5cbiIsInZhciBNeXRoRHJvcERvd249ZnVuY3Rpb24obGlzdCkgIHtcbiAgICBpZihBcnJheS5pc0FycmF5KGxpc3QpKVxuXHR0aGlzLmxpc3Q9bGlzdDtcbiAgICBlbHNlXG5cdGxpc3Q9W107XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE15dGhEcm9wRG93bikpIFxuXHRyZXR1cm4gbmV3IE15dGhEcm9wRG93bihsaXN0KTtcbiAgICBcbiAgICB2YXIgc2VsZj10aGlzO1xuICAgIHRoaXMuc2VsZWN0RWxlbWVudD17c2VsZWN0ZWRJbmRleDowfTtcbiAgICB0aGlzLnNlbGVjdGVkPXtcblx0bmFtZTpsaXN0WzBdLFxuXHRpbmRleDowfTtcbiAgICB0aGlzLmxpc3Q9bGlzdDtcblxuICAgIE15dGhEcm9wRG93bi5wcm90b3R5cGUudmlldz0gZnVuY3Rpb24oY3RybCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBtKCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBjb25maWc6IGZ1bmN0aW9uKHNlbGVjdEVsZW1lbnQsIGlzaW5pdCkge1xuICAgICAgICAgICAgICAgIGlmIChpc2luaXQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblx0XHRzZWxmLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuXHRcdHNlbGYudXBkYXRlKHNlbGYubGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25jaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkLm5hbWUgPSBlLnRhcmdldC52YWx1ZTtcblx0XHRzZWxmLnNlbGVjdGVkLmluZGV4PWUudGFyZ2V0LnNlbGVjdGVkSW5kZXg7XG5cdFx0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblx0XHQgdGhpcy5saXN0Lm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSgnb3B0aW9uJywgbmFtZSk7XG5cdFx0IH0pKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRTZWxlY3RlZD1mdW5jdGlvbigpe1xuXHRyZXR1cm4gKHRoaXMuc2VsZWN0ZWQpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZT1mdW5jdGlvbihuZXdMaXN0KXtcblx0XG5cdHRoaXMubGlzdD1uZXdMaXN0O1xuXHR0aGlzLnNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleD0wO1xuXHR0aGlzLnNlbGVjdGVkLm5hbWU9bmV3TGlzdFswXTtcblx0dGhpcy5zZWxlY3RlZC5pbmRleD0wO1xuICAgIH07XG5cbiAgICB0aGlzLnNvcnQ9ZnVuY3Rpb24oKXtcblx0dGhpcy5saXN0LnNvcnQoKTtcblx0dGhpcy51cGRhdGUodGhpcy5saXN0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGU9ZnVuY3Rpb24oKXtcblx0dGhpcy5saXN0LnNwbGljZSh0aGlzLnNlbGVjdGVkLmluZGV4LDEpO1xuXHR0aGlzLnVwZGF0ZSh0aGlzLmxpc3QpO1xuXHRcbiAgICB9O1xuXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTXl0aERyb3BEb3duO1xuIiwidmFyIHNvY2tldDtcbnZhciBmaXJzdGNvbm5lY3QgPSB0cnVlO1xudmFyIEdsb2JhbD17c2VydmVyOicnfTtcbmZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgaWYoZmlyc3Rjb25uZWN0KSB7XG4gICAgICAgIEdsb2JhbC5zb2NrZXQgPSBpby5jb25uZWN0KCdodHRwOi8vZGV2LnRlc3R0dWJlOjgwMDAnKTtcbiAgICAgICAgR2xvYmFsLnNvY2tldC5vbignc2VydmVyTWVzc2FnZScsIGZ1bmN0aW9uKGRhdGEpeyBtZXNzYWdlKGRhdGEpOyB9KTtcbiAgICAgICAgR2xvYmFsLnNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIFNlcnZlclwiKTsgfSk7XG5cbiAgICAgICAgZmlyc3Rjb25uZWN0ID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBHbG9iYWwuc29ja2V0LnNvY2tldC5yZWNvbm5lY3QoKTtcbiAgICB9XG59XG52YXIgTWl0aERyb3BEb3duPXJlcXVpcmUoJy4vY29tcG9uZW50cy9taXRoRHJvcERvd24uanMnKTtcbnZhciBkcm9wRG93bjI9IG5ldyBNaXRoRHJvcERvd24oKTtcblxuZHJvcERvd24yLnVwZGF0ZShbJ2FwcGxlJywnYmFuYW5hJywnb3JhbmdlJ10pO1xuXG52YXIgY2hvc2VuQ2ZnID0ge1xuICAgIGxpc3Q6IFsnYnJvd24nLCdhcHBsZScsJ3JlZCddLFxuICAgIGl0ZW1zUGVyUGFnZTogMTAwLFxuICAgIHNvcnRCeU5hbWU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG5cdHdpZHRoOiBcIjUwMHB4XCIsXG4gICAgICAgIHNlbGVjdGVkQmFja2dyb3VuZDogJ2JsYWNrJyxcbiAgICAgICAgc2VsZWN0ZWRGb3JlZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICBmb3JlZ3JvdW5kOiAnYmxhY2snXG4gICAgfVxufTtcblxudmFyIE1pdGhDaG9zZW49cmVxdWlyZSgnLi9jb21wb25lbnRzL21pdGhDaG9zZW4uanMnKS5NaXRoQ2hvc2VuO1xuXG52YXIgY2hvc2VuPW5ldyBNaXRoQ2hvc2VuKGNob3NlbkNmZyk7XG5cbmNvbm5lY3QoKTtcblxuR2xvYmFsLnNvY2tldC5vbigndGltZScsZnVuY3Rpb24odGltZSl7XG4gICAgY29uc29sZS5sb2codGltZSk7XG4gICAgR2xvYmFsLnNvY2tldC5lbWl0KCdkYXRhJyx7ZGF0YToncmVjaWV2ZWQnfSk7XG4gICAgXG59KTtcbkdsb2JhbC5zb2NrZXQub24oJ21lc3NhZ2VUb0NsaWVudCcsZnVuY3Rpb24oZGF0YSl7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgc3dpdGNoKGRhdGEudHlwZSl7XG4gICAgY2FzZSAndXBkYXRlTG9hZCc6XG5cdHZhciBhcnJheT1bXTtcblx0ZGF0YS5kYXRhLm1hcChmdW5jdGlvbihkKXtcblx0XHRcdFx0ICBhcnJheS5wdXNoKGQuY29udGVudFswXS5kZXNjcmlwdGlvbilcblx0XHRcdFx0ICBcblx0fSk7XG5cdGNvbnNvbGUubG9nKGRhdGEuZGF0YSlcblx0Y2hvc2VuLnVwZGF0ZShhcnJheSk7XG5cdGJyZWFrO1xuICAgIH1cblxufSk7XG5cbnZhciBoZWFkZXI9cmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlci5qcycpLmhlYWRlcjtcbnZhciBsb2FkPXJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkLmpzJykubWFpbjtcblxudmFyIG1haW49e1xuICAgIHZpZXc6ZnVuY3Rpb24oKXtcblx0cmV0dXJuIFtcblx0ICAgIG0uY29tcG9uZW50KGxvYWQpLFxuXHQgICAgbS5jb21wb25lbnQoaGVhZGVyKSxcblx0ICAgIG0uY29tcG9uZW50KGNob3NlbiksXG5cdCAgICBtKCcnLCdzb21lIGNvbnRlbnQnKVxuXHQgICAgICAgXTtcbiAgICB9XG4gICAgXG59O1xuXG5cblxubS5yb3V0ZS5tb2RlID0gJ3BhdGhuYW1lJztcblxubS5yb3V0ZShkb2N1bWVudC5ib2R5LCAnLycsIHtcbiAgICAnLyc6IG1haW5cbn0pO1xuZXhwb3J0cy5NYWluR2xvYmFsPUdsb2JhbDtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcbnZhciBlbXB0eUFycmF5ID0gW107XG52YXIgdHlwZSA9IGVtcHR5T2JqZWN0LnRvU3RyaW5nO1xudmFyIG93biA9ICBlbXB0eU9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbnZhciBPQkpFQ1QgPSB0eXBlLmNhbGwoZW1wdHlPYmplY3QpO1xudmFyIEFSUkFZID0gIHR5cGUuY2FsbChlbXB0eUFycmF5KTtcbnZhciBTVFJJTkcgPSB0eXBlLmNhbGwoJycpO1xuLyovLWlubGluZS0vKi9cbi8vIGZ1bmN0aW9uIGNhcnRlc2lhbihhLCBiLCByZXMsIGksIGopIHtcbi8vICAgcmVzID0gW107XG4vLyAgIGZvciAoaiBpbiBiKSBpZiAob3duLmNhbGwoYiwgaikpXG4vLyAgICAgZm9yIChpIGluIGEpIGlmIChvd24uY2FsbChhLCBpKSlcbi8vICAgICAgIHJlcy5wdXNoKGFbaV0gKyBiW2pdKTtcbi8vICAgcmV0dXJuIHJlcztcbi8vIH1cbi8qLy1pbmxpbmUtLyovXG5cbi8qIC8tc3RhdGVtZW50cy0vKi9cbmZ1bmN0aW9uIGNhcnRlc2lhbihhLGIsIHNlbGVjdG9yUCwgcmVzLCBpLCBqKSB7XG4gIHJlcyA9IFtdXG4gIGZvciAoaiBpbiBiKSBpZihvd24uY2FsbChiLCBqKSlcbiAgICBmb3IgKGkgaW4gYSkgaWYob3duLmNhbGwoYSwgaSkpXG4gICAgICByZXMucHVzaChjb25jYXQoYVtpXSwgYltqXSwgc2VsZWN0b3JQKSlcbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBjb25jYXQoYSwgYiwgc2VsZWN0b3JQKSB7XG4gIC8vIGBiLnJlcGxhY2UoLyYvZywgYSlgIGlzIG5ldmVyIGZhbHN5LCBzaW5jZSB0aGVcbiAgLy8gJ2EnIG9mIGNhcnRlc2lhbiBjYW4ndCBiZSB0aGUgZW1wdHkgc3RyaW5nXG4gIC8vIGluIHNlbGVjdG9yIG1vZGUuXG4gIHJldHVybiBzZWxlY3RvclAgJiYgKFxuICAgIC9eWy1cXHckXSskLy50ZXN0KGIpICYmICc6LWVycm9yLWJhZC1zdWItc2VsZWN0b3ItJyArIGIgfHxcbiAgICAvJi8udGVzdChiKSAmJiAvKiBuZXZlciBmYWxzeSAqLyBiLnJlcGxhY2UoLyYvZywgYSlcbiAgKSB8fCBhICsgYlxufVxuXG5mdW5jdGlvbiBkZWNhbWVsaXplKG1hdGNoKSB7XG4gIHJldHVybiAnLScgKyBtYXRjaC50b0xvd2VyQ2FzZSgpXG59XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgcHJvcGVydHk6dmFsdWU7IHBhaXJzLlxuICpcbiAqIEBwYXJhbSB7YXJyYXl8b2JqZWN0fHN0cmluZ30gbyAtIHRoZSBkZWNsYXJhdGlvbnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBidWYgLSB0aGUgYnVmZmVyIGluIHdoaWNoIHRoZSBmaW5hbCBzdHlsZSBzaGVldCBpcyBidWlsdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSB0aGUgY3VycmVudCBwcm9wZXJ0eSBvciBhIHByZWZpeCBpbiBjYXNlIG9mIG5lc3RlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi1wcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtzdHJpbmd9IHZlbmRvcnMgLSBhIGxpc3Qgb2YgdmVuZG9yIHByZWZpeGVzLlxuICogQFBhcmFtIHtib29sZWFufSBsb2NhbCAtIGFyZSB3ZSBpbiBAbG9jYWwgb3IgaW4gQGdsb2JhbCBzY29wZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBucyAtIGhlbHBlciBmdW5jdGlvbnMgdG8gcG9wdWxhdGUgb3IgY3JlYXRlIHRoZSBAbG9jYWwgbmFtZXNwYWNlXG4gKiAgICAgICAgICAgICAgICAgICAgICBhbmQgdG8gQGV4dGVuZCBjbGFzc2VzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMuZSAtIEBleHRlbmQgaGVscGVyLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMubCAtIEBsb2NhbCBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gZGVjbGFyYXRpb25zKG8sIGJ1ZiwgcHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMsIC8qdmFyKi8gaywgdiwga2spIHtcbiAgaWYgKG89PW51bGwpIHJldHVyblxuICBpZiAoL1xcJC8udGVzdChwcmVmaXgpKSB7XG4gICAgZm9yIChrayBpbiAocHJlZml4ID0gcHJlZml4LnNwbGl0KCckJykpKSBpZiAob3duLmNhbGwocHJlZml4LCBraykpIHtcbiAgICAgIGRlY2xhcmF0aW9ucyhvLCBidWYsIHByZWZpeFtra10sIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgc3dpdGNoICggdHlwZS5jYWxsKG8gPSBvLnZhbHVlT2YoKSkgKSB7XG4gIGNhc2UgQVJSQVk6XG4gICAgZm9yIChrID0gMDsgayA8IG8ubGVuZ3RoOyBrKyspXG4gICAgICBkZWNsYXJhdGlvbnMob1trXSwgYnVmLCBwcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICBicmVha1xuICBjYXNlIE9CSkVDVDpcbiAgICAvLyBwcmVmaXggaXMgZmFsc3kgaWlmIGl0IGlzIHRoZSBlbXB0eSBzdHJpbmcsIHdoaWNoIG1lYW5zIHdlJ3JlIGF0IHRoZSByb290XG4gICAgLy8gb2YgdGhlIGRlY2xhcmF0aW9ucyBsaXN0LlxuICAgIHByZWZpeCA9IChwcmVmaXggJiYgcHJlZml4ICsgJy0nKVxuICAgIGZvciAoayBpbiBvKSBpZiAob3duLmNhbGwobywgaykpe1xuICAgICAgdiA9IG9ba11cbiAgICAgIGlmICgvXFwkLy50ZXN0KGspKSB7XG4gICAgICAgIGZvciAoa2sgaW4gKGsgPSBrLnNwbGl0KCckJykpKSBpZiAob3duLmNhbGwoaywga2spKVxuICAgICAgICAgIGRlY2xhcmF0aW9ucyh2LCBidWYsIHByZWZpeCArIGtba2tdLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWNsYXJhdGlvbnModiwgYnVmLCBwcmVmaXggKyBrLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgICB9XG4gICAgfVxuICAgIGJyZWFrXG4gIGRlZmF1bHQ6XG4gICAgLy8gcHJlZml4IGlzIGZhbHN5IHdoZW4gaXQgaXMgXCJcIiwgd2hpY2ggbWVhbnMgdGhhdCB3ZSdyZVxuICAgIC8vIGF0IHRoZSB0b3AgbGV2ZWwuXG4gICAgLy8gYG9gIGlzIHRoZW4gdHJlYXRlZCBhcyBhIGBwcm9wZXJ0eTp2YWx1ZWAgcGFpci5cbiAgICAvLyBvdGhlcndpc2UsIGBwcmVmaXhgIGlzIHRoZSBwcm9wZXJ0eSBuYW1lLCBhbmRcbiAgICAvLyBgb2AgaXMgdGhlIHZhbHVlLlxuICAgIGsgPSBwcmVmaXgucmVwbGFjZSgvXy9nLCAnLScpLnJlcGxhY2UoL1tBLVpdL2csIGRlY2FtZWxpemUpXG5cbiAgICBpZiAobG9jYWwgJiYgKGsgPT0gJ2FuaW1hdGlvbi1uYW1lJyB8fCBrID09ICdhbmltYXRpb24nKSkge1xuICAgICAgbyA9IG8uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8ucmVwbGFjZSgvKCkoPzo6Z2xvYmFsXFwoXFxzKihbLVxcd10rKVxccypcXCl8KCkoWy1cXHddKykpLywgbnMubClcbiAgICAgIH0pLmpvaW4oJywnKVxuICAgIH1cbiAgICBpZiAoL15hbmltYXRpb258XnRyYW5zaXRpb24vLnRlc3QoaykpIHZlbmRvcnMgPSBbJ3dlYmtpdCddXG4gICAgLy8gJ0AnIGluIHByb3BlcnRpZXMgYWxzbyB0cmlnZ2VycyB0aGUgKmllbHRlNyBoYWNrXG4gICAgLy8gU2luY2UgcGx1Z2lucyBkaXNwYXRjaCBvbiB0aGUgL15ALyBmb3IgYXQtcnVsZXNcbiAgICAvLyB3ZSBzd2FwIHRoZSBhdCBmb3IgYW4gYXN0ZXJpc2tcbiAgICAvLyBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay02ZDQ5ZTkyNjM0ZjI2YWU2ZDZlNDZiM2ViYzEwMDE5YVxuXG4gICAgayA9IGsucmVwbGFjZSgvXkAvLCAnKicpXG5cbi8qLy1zdGF0ZW1lbnRzLS8qL1xuICAgIC8vIHZlbmRvcmlmeVxuICAgIGZvciAoa2sgPSAwOyBrayA8IHZlbmRvcnMubGVuZ3RoOyBraysrKVxuICAgICAgYnVmLnB1c2goJy0nLCB2ZW5kb3JzW2trXSwgJy0nLCBrLCBrID8gJzonOiAnJywgbywgJztcXG4nKVxuLyovLXN0YXRlbWVudHMtLyovXG5cbiAgICBidWYucHVzaChrLCBrID8gJzonOiAnJywgbywgJztcXG4nKVxuXG4gIH1cbn1cblxudmFyIGZpbmRDbGFzcyA9IC8oKSg/OjpnbG9iYWxcXChcXHMqKFxcLlstXFx3XSspXFxzKlxcKXwoXFwuKShbLVxcd10rKSkvZ1xuXG4vKipcbiAqIEhhbmxkZXMgYXQtcnVsZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gayAtIFRoZSBhdC1ydWxlIG5hbWUsIGFuZCwgaWYgdGFrZXMgYm90aCBwYXJhbWV0ZXJzIGFuZCBhXG4gKiAgICAgICAgICAgICAgICAgICAgIGJsb2NrLCB0aGUgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGJ1ZiAtIHRoZSBidWZmZXIgaW4gd2hpY2ggdGhlIGZpbmFsIHN0eWxlIHNoZWV0IGlzIGJ1aWx0XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSB2IC0gRWl0aGVyIHBhcmFtZXRlcnMgZm9yIGJsb2NrLWxlc3MgcnVsZXMgb3IgdGhlaXIgYmxvY2tcbiAqICAgICAgICAgICAgICAgICAgICAgICBmb3IgdGhlIG90aGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSB0aGUgY3VycmVudCBzZWxlY3RvciBvciBhIHByZWZpeCBpbiBjYXNlIG9mIG5lc3RlZCBydWxlc1xuICogQHBhcmFtIHtzdHJpbmd9IHJhd1ByZWZpeCAtIGFzIGFib3ZlLCBidXQgd2l0aG91dCBsb2NhbGl6YXRpb24gdHJhbnNmb3JtYXRpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVuZG9ycyAtIGEgbGlzdCBvZiB2ZW5kb3IgcHJlZml4ZXNcbiAqIEBQYXJhbSB7Ym9vbGVhbn0gbG9jYWwgLSBhcmUgd2UgaW4gQGxvY2FsIG9yIGluIEBnbG9iYWwgc2NvcGU/XG4gKiBAcGFyYW0ge29iamVjdH0gbnMgLSBoZWxwZXIgZnVuY3Rpb25zIHRvIHBvcHVsYXRlIG9yIGNyZWF0ZSB0aGUgQGxvY2FsIG5hbWVzcGFjZVxuICogICAgICAgICAgICAgICAgICAgICAgYW5kIHRvIEBleHRlbmQgY2xhc3Nlc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMuZSAtIEBleHRlbmQgaGVscGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5sIC0gQGxvY2FsIGhlbHBlclxuICovXG5cbmZ1bmN0aW9uIGF0KGssIHYsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucyl7XG4gIHZhciBra1xuICBpZiAoL15AKD86bmFtZXNwYWNlfGltcG9ydHxjaGFyc2V0KSQvLnRlc3QoaykpIHtcbiAgICBpZih0eXBlLmNhbGwodikgPT0gQVJSQVkpe1xuICAgICAgZm9yIChrayA9IDA7IGtrIDwgdi5sZW5ndGg7IGtrKyspIHtcbiAgICAgICAgYnVmLnB1c2goaywgJyAnLCB2W2trXSwgJztcXG4nKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChrLCAnICcsIHYsICc7XFxuJylcbiAgICB9XG4gIH0gZWxzZSBpZiAoL15Aa2V5ZnJhbWVzIC8udGVzdChrKSkge1xuICAgIGsgPSBsb2NhbCA/IGsucmVwbGFjZShcbiAgICAgIC8vIGdlbmVyYXRlZCBieSBzY3JpcHQvcmVnZXhwcy5qc1xuICAgICAgLyggKSg/OjpnbG9iYWxcXChcXHMqKFstXFx3XSspXFxzKlxcKXwoKShbLVxcd10rKSkvLFxuICAgICAgbnMubFxuICAgICkgOiBrXG4gICAgLy8gYWRkIGEgQC13ZWJraXQta2V5ZnJhbWVzIGJsb2NrIHRvby5cblxuICAgIGJ1Zi5wdXNoKCdALXdlYmtpdC0nLCBrLnNsaWNlKDEpLCAnIHtcXG4nKVxuICAgIHNoZWV0KHYsIGJ1ZiwgJycsICcnLCBbJ3dlYmtpdCddKVxuICAgIGJ1Zi5wdXNoKCd9XFxuJylcblxuICAgIGJ1Zi5wdXNoKGssICcge1xcbicpXG4gICAgc2hlZXQodiwgYnVmLCAnJywgJycsIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICBidWYucHVzaCgnfVxcbicpXG5cbiAgfSBlbHNlIGlmICgvXkBleHRlbmRzPyQvLnRlc3QoaykpIHtcblxuICAgIC8qZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24qL1xuICAgIC8vIHBpY2sgdGhlIGxhc3QgY2xhc3MgdG8gYmUgZXh0ZW5kZWRcbiAgICB3aGlsZSAoa2sgPSBmaW5kQ2xhc3MuZXhlYyhyYXdQcmVmaXgpKSBrID0ga2tbNF1cbiAgICAvKmVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24qL1xuICAgIGlmIChrID09IG51bGwgfHwgIWxvY2FsKSB7XG4gICAgICAvLyB3ZSdyZSBpbiBhIEBnbG9iYWx7fSBibG9ja1xuICAgICAgYnVmLnB1c2goJ0AtZXJyb3ItY2Fubm90LWV4dGVuZC1pbi1nbG9iYWwtY29udGV4dCAnLCBKU09OLnN0cmluZ2lmeShyYXdQcmVmaXgpLCAnO1xcbicpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKC9eQGV4dGVuZHM/JC8udGVzdChrKSkge1xuICAgICAgLy8gbm8gY2xhc3MgaW4gdGhlIHNlbGVjdG9yXG4gICAgICBidWYucHVzaCgnQC1lcnJvci1uby1jbGFzcy10by1leHRlbmQtaW4gJywgSlNPTi5zdHJpbmdpZnkocmF3UHJlZml4KSwgJztcXG4nKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG5zLmUoXG4gICAgICB0eXBlLmNhbGwodikgPT0gQVJSQVkgPyB2Lm1hcChmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQucmVwbGFjZSgvKCkoPzo6Z2xvYmFsXFwoXFxzKihcXC5bLVxcd10rKVxccypcXCl8KClcXC4oWy1cXHddKykpLywgbnMubClcbiAgICAgIH0pLmpvaW4oJyAnKSA6IHYucmVwbGFjZSgvKCkoPzo6Z2xvYmFsXFwoXFxzKihcXC5bLVxcd10rKVxccypcXCl8KClcXC4oWy1cXHddKykpLywgbnMubCksXG4gICAgICBrXG4gICAgKVxuXG4gIH0gZWxzZSBpZiAoL15AKD86Zm9udC1mYWNlJHx2aWV3cG9ydCR8cGFnZSApLy50ZXN0KGspKSB7XG4gICAgc2hlZXQodiwgYnVmLCBrLCBrLCBlbXB0eUFycmF5KVxuXG4gIH0gZWxzZSBpZiAoL15AZ2xvYmFsJC8udGVzdChrKSkge1xuICAgIHNoZWV0KHYsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIDAsIG5zKVxuXG4gIH0gZWxzZSBpZiAoL15AbG9jYWwkLy50ZXN0KGspKSB7XG4gICAgc2hlZXQodiwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgMSwgbnMpXG5cbiAgfSBlbHNlIGlmICgvXkAoPzptZWRpYSB8c3VwcG9ydHMgfGRvY3VtZW50ICkuLy50ZXN0KGspKSB7XG4gICAgYnVmLnB1c2goaywgJyB7XFxuJylcbiAgICBzaGVldCh2LCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgYnVmLnB1c2goJ31cXG4nKVxuXG4gIH0gZWxzZSB7XG4gICAgYnVmLnB1c2goJ0AtZXJyb3ItdW5zdXBwb3J0ZWQtYXQtcnVsZSAnLCBKU09OLnN0cmluZ2lmeShrKSwgJztcXG4nKVxuICB9XG59XG5cbi8qKlxuICogQWRkIHJ1bGVzZXRzIGFuZCBvdGhlciBDU1Mgc3RhdGVtZW50cyB0byB0aGUgc2hlZXQuXG4gKlxuICogQHBhcmFtIHthcnJheXxzdHJpbmd8b2JqZWN0fSBzdGF0ZW1lbnRzIC0gYSBzb3VyY2Ugb2JqZWN0IG9yIHN1Yi1vYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBidWYgLSB0aGUgYnVmZmVyIGluIHdoaWNoIHRoZSBmaW5hbCBzdHlsZSBzaGVldCBpcyBidWlsdFxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIHRoZSBjdXJyZW50IHNlbGVjdG9yIG9yIGEgcHJlZml4IGluIGNhc2Ugb2YgbmVzdGVkIHJ1bGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gcmF3UHJlZml4IC0gYXMgYWJvdmUsIGJ1dCB3aXRob3V0IGxvY2FsaXphdGlvbiB0cmFuc2Zvcm1hdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZW5kb3JzIC0gYSBsaXN0IG9mIHZlbmRvciBwcmVmaXhlc1xuICogQFBhcmFtIHtib29sZWFufSBsb2NhbCAtIGFyZSB3ZSBpbiBAbG9jYWwgb3IgaW4gQGdsb2JhbCBzY29wZT9cbiAqIEBwYXJhbSB7b2JqZWN0fSBucyAtIGhlbHBlciBmdW5jdGlvbnMgdG8gcG9wdWxhdGUgb3IgY3JlYXRlIHRoZSBAbG9jYWwgbmFtZXNwYWNlXG4gKiAgICAgICAgICAgICAgICAgICAgICBhbmQgdG8gQGV4dGVuZCBjbGFzc2VzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5lIC0gQGV4dGVuZCBoZWxwZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmwgLSBAbG9jYWwgaGVscGVyXG4gKi9cbmZ1bmN0aW9uIHNoZWV0KHN0YXRlbWVudHMsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucykge1xuICB2YXIgaywga2ssIHYsIGluRGVjbGFyYXRpb25cblxuICBzd2l0Y2ggKHR5cGUuY2FsbChzdGF0ZW1lbnRzKSkge1xuXG4gIGNhc2UgQVJSQVk6XG4gICAgZm9yIChrID0gMDsgayA8IHN0YXRlbWVudHMubGVuZ3RoOyBrKyspXG4gICAgICBzaGVldChzdGF0ZW1lbnRzW2tdLCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgYnJlYWtcblxuICBjYXNlIE9CSkVDVDpcbiAgICBmb3IgKGsgaW4gc3RhdGVtZW50cykge1xuICAgICAgdiA9IHN0YXRlbWVudHNba11cbiAgICAgIGlmIChwcmVmaXggJiYgL15bLVxcdyRdKyQvLnRlc3QoaykpIHtcbiAgICAgICAgaWYgKCFpbkRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgaW5EZWNsYXJhdGlvbiA9IDFcbiAgICAgICAgICBidWYucHVzaCgoIHByZWZpeCB8fCAnKicgKSwgJyB7XFxuJylcbiAgICAgICAgfVxuICAgICAgICBkZWNsYXJhdGlvbnModiwgYnVmLCBrLCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG4gICAgICB9IGVsc2UgaWYgKC9eQC8udGVzdChrKSkge1xuICAgICAgICAvLyBIYW5kbGUgQXQtcnVsZXNcbiAgICAgICAgaW5EZWNsYXJhdGlvbiA9IChpbkRlY2xhcmF0aW9uICYmIGJ1Zi5wdXNoKCd9XFxuJykgJiYgMClcblxuICAgICAgICBhdChrLCB2LCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCBsb2NhbCwgbnMpXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNlbGVjdG9yIG9yIG5lc3RlZCBzdWItc2VsZWN0b3JzXG5cbiAgICAgICAgaW5EZWNsYXJhdGlvbiA9IChpbkRlY2xhcmF0aW9uICYmIGJ1Zi5wdXNoKCd9XFxuJykgJiYgMClcblxuICAgICAgICBzaGVldCh2LCBidWYsXG4gICAgICAgICAgKGtrID0gLywvLnRlc3QocHJlZml4KSB8fCBwcmVmaXggJiYgLywvLnRlc3QoaykpID9cbiAgICAgICAgICAgIGNhcnRlc2lhbihwcmVmaXguc3BsaXQoJywnKSwgKCBsb2NhbCA/XG4gICAgICAgICAgay5yZXBsYWNlKFxuICAgICAgICAgICAgLygpKD86Omdsb2JhbFxcKFxccyooXFwuWy1cXHddKylcXHMqXFwpfChcXC4pKFstXFx3XSspKS9nLCBucy5sXG4gICAgICAgICAgKSA6IGtcbiAgICAgICAgKS5zcGxpdCgnLCcpLCBwcmVmaXgpLmpvaW4oJywnKSA6XG4gICAgICAgICAgICBjb25jYXQocHJlZml4LCAoIGxvY2FsID9cbiAgICAgICAgICBrLnJlcGxhY2UoXG4gICAgICAgICAgICAvKCkoPzo6Z2xvYmFsXFwoXFxzKihcXC5bLVxcd10rKVxccypcXCl8KFxcLikoWy1cXHddKykpL2csIG5zLmxcbiAgICAgICAgICApIDoga1xuICAgICAgICApLCBwcmVmaXgpLFxuICAgICAgICAgIGtrID9cbiAgICAgICAgICAgIGNhcnRlc2lhbihyYXdQcmVmaXguc3BsaXQoJywnKSwgay5zcGxpdCgnLCcpLCByYXdQcmVmaXgpLmpvaW4oJywnKSA6XG4gICAgICAgICAgICBjb25jYXQocmF3UHJlZml4LCBrLCByYXdQcmVmaXgpLFxuICAgICAgICAgIHZlbmRvcnMsXG4gICAgICAgICAgbG9jYWwsIG5zXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGluRGVjbGFyYXRpb24pIGJ1Zi5wdXNoKCd9XFxuJylcbiAgICBicmVha1xuICBjYXNlIFNUUklORzpcbiAgICBidWYucHVzaChcbiAgICAgICAgKCBwcmVmaXggfHwgJzotZXJyb3Itbm8tc2VsZWN0b3InICkgLCAnIHtcXG4nXG4gICAgICApXG4gICAgZGVjbGFyYXRpb25zKHN0YXRlbWVudHMsIGJ1ZiwgJycsIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICBidWYucHVzaCgnfVxcbicpXG4gIH1cbn1cblxudmFyIHNjb3BlX3Jvb3QgPSAnX2oyY18nICtcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKS50b1N0cmluZygzNikgKyAnXycgK1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApLnRvU3RyaW5nKDM2KSArICdfJyArXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCkudG9TdHJpbmcoMzYpICsgJ18nICtcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKS50b1N0cmluZygzNikgKyAnXyc7XG52YXIgY291bnRlciA9IDA7XG5mdW5jdGlvbiBqMmMocmVzKSB7XG4gIHJlcyA9IHJlcyB8fCB7fVxuICB2YXIgZXh0ZW5zaW9ucyA9IFtdXG5cbiAgZnVuY3Rpb24gZmluYWxpemUoYnVmLCBpKSB7XG4gICAgZm9yIChpID0gMDsgaTwgZXh0ZW5zaW9ucy5sZW5ndGg7IGkrKykgYnVmID0gZXh0ZW5zaW9uc1tpXShidWYpIHx8IGJ1ZlxuICAgIHJldHVybiBidWYuam9pbignJylcbiAgfVxuXG4gIHJlcy51c2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKyl7XG4gICAgICBleHRlbnNpb25zLnB1c2goYXJnc1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG4vKi8tc3RhdGVtZW50cy0vKi9cbiAgcmVzLnNoZWV0ID0gZnVuY3Rpb24obnMsIHN0YXRlbWVudHMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgc3RhdGVtZW50cyA9IG5zOyBucyA9IHt9XG4gICAgfVxuICAgIHZhclxuICAgICAgc3VmZml4ID0gc2NvcGVfcm9vdCArIGNvdW50ZXIrKyxcbiAgICAgIGxvY2FscyA9IHt9LFxuICAgICAgaywgYnVmID0gW11cbiAgICAvLyBwaWNrIG9ubHkgbm9uLW51bWVyaWMga2V5cyBzaW5jZSBgKE5hTiAhPSBOYU4pID09PSB0cnVlYFxuICAgIGZvciAoayBpbiBucykgaWYgKGstMCAhPSBrLTAgJiYgb3duLmNhbGwobnMsIGspKSB7XG4gICAgICBsb2NhbHNba10gPSBuc1trXVxuICAgIH1cbiAgICBzaGVldChcbiAgICAgIHN0YXRlbWVudHMsIGJ1ZiwgJycsICcnLCBlbXB0eUFycmF5IC8qdmVuZG9ycyovLFxuICAgICAgMSwgLy8gbG9jYWxcbiAgICAgIHtcbiAgICAgICAgZTogZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgY2hpbGQpIHtcbiAgICAgICAgICB2YXIgbmFtZUxpc3QgPSBsb2NhbHNbY2hpbGRdXG4gICAgICAgICAgbG9jYWxzW2NoaWxkXSA9XG4gICAgICAgICAgICBuYW1lTGlzdC5zbGljZSgwLCBuYW1lTGlzdC5sYXN0SW5kZXhPZignICcpICsgMSkgK1xuICAgICAgICAgICAgcGFyZW50ICsgJyAnICtcbiAgICAgICAgICAgIG5hbWVMaXN0LnNsaWNlKG5hbWVMaXN0Lmxhc3RJbmRleE9mKCcgJykgKyAxKVxuICAgICAgICB9LFxuICAgICAgICBsOiBmdW5jdGlvbiBsb2NhbGl6ZShtYXRjaCwgc3BhY2UsIGdsb2JhbCwgZG90LCBuYW1lKSB7XG4gICAgICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHNwYWNlICsgZ2xvYmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9jYWxzW25hbWVdKSBsb2NhbHNbbmFtZV0gPSBuYW1lICsgc3VmZml4XG4gICAgICAgICAgcmV0dXJuIHNwYWNlICsgZG90ICsgbG9jYWxzW25hbWVdLm1hdGNoKC9cXFMrJC8pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgLypqc2hpbnQgLVcwNTMgKi9cbiAgICBidWYgPSBuZXcgU3RyaW5nKGZpbmFsaXplKGJ1ZikpXG4gICAgLypqc2hpbnQgK1cwNTMgKi9cbiAgICBmb3IgKGsgaW4gbG9jYWxzKSBpZiAob3duLmNhbGwobG9jYWxzLCBrKSkgYnVmW2tdID0gbG9jYWxzW2tdXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG4vKi8tc3RhdGVtZW50cy0vKi9cbiAgcmVzLmlubGluZSA9IGZ1bmN0aW9uIChsb2NhbHMsIGRlY2wsIGJ1Zikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBkZWNsID0gbG9jYWxzOyBsb2NhbHMgPSB7fVxuICAgIH1cbiAgICBkZWNsYXJhdGlvbnMoXG4gICAgICBkZWNsLFxuICAgICAgYnVmID0gW10sXG4gICAgICAnJywgLy8gcHJlZml4XG4gICAgICBlbXB0eUFycmF5LCAvLyB2ZW5kb3JzXG4gICAgICAxLFxuICAgICAge1xuICAgICAgICBsOiBmdW5jdGlvbiBsb2NhbGl6ZShtYXRjaCwgc3BhY2UsIGdsb2JhbCwgZG90LCBuYW1lKSB7XG4gICAgICAgICAgaWYgKGdsb2JhbCkgcmV0dXJuIHNwYWNlICsgZ2xvYmFsXG4gICAgICAgICAgaWYgKCFsb2NhbHNbbmFtZV0pIHJldHVybiBuYW1lXG4gICAgICAgICAgcmV0dXJuIHNwYWNlICsgZG90ICsgbG9jYWxzW25hbWVdXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgcmV0dXJuIGZpbmFsaXplKGJ1ZilcbiAgfVxuXG4gIHJlcy5wcmVmaXggPSBmdW5jdGlvbih2YWwsIHZlbmRvcnMpIHtcbiAgICByZXR1cm4gY2FydGVzaWFuKFxuICAgICAgdmVuZG9ycy5tYXAoZnVuY3Rpb24ocCl7cmV0dXJuICctJyArIHAgKyAnLSd9KS5jb25jYXQoWycnXSksXG4gICAgICBbdmFsXVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmoyYy5nbG9iYWwgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAnOmdsb2JhbCgnICsgeCArICcpJ1xufVxuXG5qMmMua3YgPSBrdlxuZnVuY3Rpb24ga3YgKGssIHYsIG8pIHtcbiAgbyA9IHt9XG4gIG9ba10gPSB2XG4gIHJldHVybiBvXG59XG5cbmoyYy5hdCA9IGZ1bmN0aW9uIGF0IChydWxlLCBwYXJhbXMsIGJsb2NrKSB7XG4gIGlmIChcbiAgICBhcmd1bWVudHMubGVuZ3RoIDwgM1xuICApIHtcbiAgICB2YXIgX2F0ID0gYXQuYmluZC5hcHBseShhdCwgW251bGxdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywwKSkpXG4gICAgX2F0LnRvU3RyaW5nID0gZnVuY3Rpb24oKXtyZXR1cm4gJ0AnICsgcnVsZSArICcgJyArIHBhcmFtc31cbiAgICByZXR1cm4gX2F0XG4gIH1cbiAgZWxzZSByZXR1cm4ga3YoJ0AnICsgcnVsZSArICcgJyArIHBhcmFtcywgYmxvY2spXG59XG5cbmoyYyhqMmMpXG5kZWxldGUgajJjLnVzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGoyYzsiLCI7KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cdFwidXNlIHN0cmljdFwiXHJcblx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHR2YXIgbSA9IGZhY3RvcnkoZ2xvYmFsKVxyXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZSAhPSBudWxsICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IG1cclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcblx0XHRkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gbSB9KVxyXG5cdH0gZWxzZSB7XHJcblx0XHRnbG9iYWwubSA9IG1cclxuXHR9XHJcblx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xyXG59KSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30sIGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblx0XCJ1c2Ugc3RyaWN0XCJcclxuXHJcblx0bS52ZXJzaW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIFwidjAuMi4zXCJcclxuXHR9XHJcblxyXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxyXG5cdHZhciB0eXBlID0ge30udG9TdHJpbmdcclxuXHJcblx0ZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlzT2JqZWN0KG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGUuY2FsbChvYmplY3QpID09PSBcIltvYmplY3QgT2JqZWN0XVwiXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpc1N0cmluZyhvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxyXG5cdH1cclxuXHJcblx0dmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuXHRcdHJldHVybiB0eXBlLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBub29wKCkge31cclxuXHJcblx0dmFyIHZvaWRFbGVtZW50cyA9IHtcclxuXHRcdEFSRUE6IDEsXHJcblx0XHRCQVNFOiAxLFxyXG5cdFx0QlI6IDEsXHJcblx0XHRDT0w6IDEsXHJcblx0XHRDT01NQU5EOiAxLFxyXG5cdFx0RU1CRUQ6IDEsXHJcblx0XHRIUjogMSxcclxuXHRcdElNRzogMSxcclxuXHRcdElOUFVUOiAxLFxyXG5cdFx0S0VZR0VOOiAxLFxyXG5cdFx0TElOSzogMSxcclxuXHRcdE1FVEE6IDEsXHJcblx0XHRQQVJBTTogMSxcclxuXHRcdFNPVVJDRTogMSxcclxuXHRcdFRSQUNLOiAxLFxyXG5cdFx0V0JSOiAxXHJcblx0fVxyXG5cclxuXHQvLyBjYWNoaW5nIGNvbW1vbmx5IHVzZWQgdmFyaWFibGVzXHJcblx0dmFyICRkb2N1bWVudCwgJGxvY2F0aW9uLCAkcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCAkY2FuY2VsQW5pbWF0aW9uRnJhbWVcclxuXHJcblx0Ly8gc2VsZiBpbnZva2luZyBmdW5jdGlvbiBuZWVkZWQgYmVjYXVzZSBvZiB0aGUgd2F5IG1vY2tzIHdvcmtcclxuXHRmdW5jdGlvbiBpbml0aWFsaXplKG1vY2spIHtcclxuXHRcdCRkb2N1bWVudCA9IG1vY2suZG9jdW1lbnRcclxuXHRcdCRsb2NhdGlvbiA9IG1vY2subG9jYXRpb25cclxuXHRcdCRjYW5jZWxBbmltYXRpb25GcmFtZSA9IG1vY2suY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgbW9jay5jbGVhclRpbWVvdXRcclxuXHRcdCRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBtb2NrLnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBtb2NrLnNldFRpbWVvdXRcclxuXHR9XHJcblxyXG5cdC8vIHRlc3RpbmcgQVBJXHJcblx0bS5kZXBzID0gZnVuY3Rpb24gKG1vY2spIHtcclxuXHRcdGluaXRpYWxpemUoZ2xvYmFsID0gbW9jayB8fCB3aW5kb3cpXHJcblx0XHRyZXR1cm4gZ2xvYmFsXHJcblx0fVxyXG5cclxuXHRtLmRlcHMoZ2xvYmFsKVxyXG5cclxuXHQvKipcclxuXHQgKiBAdHlwZWRlZiB7U3RyaW5nfSBUYWdcclxuXHQgKiBBIHN0cmluZyB0aGF0IGxvb2tzIGxpa2UgLT4gZGl2LmNsYXNzbmFtZSNpZFtwYXJhbT1vbmVdW3BhcmFtMj10d29dXHJcblx0ICogV2hpY2ggZGVzY3JpYmVzIGEgRE9NIG5vZGVcclxuXHQgKi9cclxuXHJcblx0ZnVuY3Rpb24gcGFyc2VUYWdBdHRycyhjZWxsLCB0YWcpIHtcclxuXHRcdHZhciBjbGFzc2VzID0gW11cclxuXHRcdHZhciBwYXJzZXIgPSAvKD86KF58I3xcXC4pKFteI1xcLlxcW1xcXV0rKSl8KFxcWy4rP1xcXSkvZ1xyXG5cdFx0dmFyIG1hdGNoXHJcblxyXG5cdFx0d2hpbGUgKChtYXRjaCA9IHBhcnNlci5leGVjKHRhZykpKSB7XHJcblx0XHRcdGlmIChtYXRjaFsxXSA9PT0gXCJcIiAmJiBtYXRjaFsyXSkge1xyXG5cdFx0XHRcdGNlbGwudGFnID0gbWF0Y2hbMl1cclxuXHRcdFx0fSBlbHNlIGlmIChtYXRjaFsxXSA9PT0gXCIjXCIpIHtcclxuXHRcdFx0XHRjZWxsLmF0dHJzLmlkID0gbWF0Y2hbMl1cclxuXHRcdFx0fSBlbHNlIGlmIChtYXRjaFsxXSA9PT0gXCIuXCIpIHtcclxuXHRcdFx0XHRjbGFzc2VzLnB1c2gobWF0Y2hbMl0pXHJcblx0XHRcdH0gZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XHJcblx0XHRcdFx0dmFyIHBhaXIgPSAvXFxbKC4rPykoPzo9KFwifCd8KSguKj8pXFwyKT9cXF0vLmV4ZWMobWF0Y2hbM10pXHJcblx0XHRcdFx0Y2VsbC5hdHRyc1twYWlyWzFdXSA9IHBhaXJbM10gfHwgKHBhaXJbMl0gPyBcIlwiIDogdHJ1ZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjbGFzc2VzXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRWaXJ0dWFsQ2hpbGRyZW4oYXJncywgaGFzQXR0cnMpIHtcclxuXHRcdHZhciBjaGlsZHJlbiA9IGhhc0F0dHJzID8gYXJncy5zbGljZSgxKSA6IGFyZ3NcclxuXHJcblx0XHRpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoY2hpbGRyZW5bMF0pKSB7XHJcblx0XHRcdHJldHVybiBjaGlsZHJlblswXVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhc3NpZ25BdHRycyh0YXJnZXQsIGF0dHJzLCBjbGFzc2VzKSB7XHJcblx0XHR2YXIgY2xhc3NBdHRyID0gXCJjbGFzc1wiIGluIGF0dHJzID8gXCJjbGFzc1wiIDogXCJjbGFzc05hbWVcIlxyXG5cclxuXHRcdGZvciAodmFyIGF0dHJOYW1lIGluIGF0dHJzKSB7XHJcblx0XHRcdGlmIChoYXNPd24uY2FsbChhdHRycywgYXR0ck5hbWUpKSB7XHJcblx0XHRcdFx0aWYgKGF0dHJOYW1lID09PSBjbGFzc0F0dHIgJiZcclxuXHRcdFx0XHRcdFx0YXR0cnNbYXR0ck5hbWVdICE9IG51bGwgJiZcclxuXHRcdFx0XHRcdFx0YXR0cnNbYXR0ck5hbWVdICE9PSBcIlwiKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goYXR0cnNbYXR0ck5hbWVdKVxyXG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGtleSBpbiBjb3JyZWN0IGl0ZXJhdGlvbiBvcmRlclxyXG5cdFx0XHRcdFx0dGFyZ2V0W2F0dHJOYW1lXSA9IFwiXCJcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGFyZ2V0W2F0dHJOYW1lXSA9IGF0dHJzW2F0dHJOYW1lXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjbGFzc2VzLmxlbmd0aCkgdGFyZ2V0W2NsYXNzQXR0cl0gPSBjbGFzc2VzLmpvaW4oXCIgXCIpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7VGFnfSBUaGUgRE9NIG5vZGUgdGFnXHJcblx0ICogQHBhcmFtIHtPYmplY3Q9W119IG9wdGlvbmFsIGtleS12YWx1ZSBwYWlycyB0byBiZSBtYXBwZWQgdG8gRE9NIGF0dHJzXHJcblx0ICogQHBhcmFtIHsuLi5tTm9kZT1bXX0gWmVybyBvciBtb3JlIE1pdGhyaWwgY2hpbGQgbm9kZXMuIENhbiBiZSBhbiBhcnJheSxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICBvciBzcGxhdCAob3B0aW9uYWwpXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gbSh0YWcsIHBhaXJzKSB7XHJcblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG5cclxuXHRcdGlmIChpc09iamVjdCh0YWcpKSByZXR1cm4gcGFyYW1ldGVyaXplKHRhZywgYXJncylcclxuXHJcblx0XHRpZiAoIWlzU3RyaW5nKHRhZykpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic2VsZWN0b3IgaW4gbShzZWxlY3RvciwgYXR0cnMsIGNoaWxkcmVuKSBzaG91bGQgXCIgK1xyXG5cdFx0XHRcdFwiYmUgYSBzdHJpbmdcIilcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaGFzQXR0cnMgPSBwYWlycyAhPSBudWxsICYmIGlzT2JqZWN0KHBhaXJzKSAmJlxyXG5cdFx0XHQhKFwidGFnXCIgaW4gcGFpcnMgfHwgXCJ2aWV3XCIgaW4gcGFpcnMgfHwgXCJzdWJ0cmVlXCIgaW4gcGFpcnMpXHJcblxyXG5cdFx0dmFyIGF0dHJzID0gaGFzQXR0cnMgPyBwYWlycyA6IHt9XHJcblx0XHR2YXIgY2VsbCA9IHtcclxuXHRcdFx0dGFnOiBcImRpdlwiLFxyXG5cdFx0XHRhdHRyczoge30sXHJcblx0XHRcdGNoaWxkcmVuOiBnZXRWaXJ0dWFsQ2hpbGRyZW4oYXJncywgaGFzQXR0cnMpXHJcblx0XHR9XHJcblxyXG5cdFx0YXNzaWduQXR0cnMoY2VsbC5hdHRycywgYXR0cnMsIHBhcnNlVGFnQXR0cnMoY2VsbCwgdGFnKSlcclxuXHRcdHJldHVybiBjZWxsXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGYpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGggJiYgIWYobGlzdFtpXSwgaSsrKTspIHtcclxuXHRcdFx0Ly8gZnVuY3Rpb24gY2FsbGVkIGluIGNvbmRpdGlvblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9yS2V5cyhsaXN0LCBmKSB7XHJcblx0XHRmb3JFYWNoKGxpc3QsIGZ1bmN0aW9uIChhdHRycywgaSkge1xyXG5cdFx0XHRyZXR1cm4gKGF0dHJzID0gYXR0cnMgJiYgYXR0cnMuYXR0cnMpICYmXHJcblx0XHRcdFx0YXR0cnMua2V5ICE9IG51bGwgJiZcclxuXHRcdFx0XHRmKGF0dHJzLCBpKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Ly8gVGhpcyBmdW5jdGlvbiB3YXMgY2F1c2luZyBkZW9wdHMgaW4gQ2hyb21lLlxyXG5cdGZ1bmN0aW9uIGRhdGFUb1N0cmluZyhkYXRhKSB7XHJcblx0XHQvLyBkYXRhLnRvU3RyaW5nKCkgbWlnaHQgdGhyb3cgb3IgcmV0dXJuIG51bGwgaWYgZGF0YSBpcyB0aGUgcmV0dXJuXHJcblx0XHQvLyB2YWx1ZSBvZiBDb25zb2xlLmxvZyBpbiBzb21lIHZlcnNpb25zIG9mIEZpcmVmb3ggKGJlaGF2aW9yIGRlcGVuZHMgb25cclxuXHRcdC8vIHZlcnNpb24pXHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoZGF0YSAhPSBudWxsICYmIGRhdGEudG9TdHJpbmcoKSAhPSBudWxsKSByZXR1cm4gZGF0YVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvLyBzaWxlbnRseSBpZ25vcmUgZXJyb3JzXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCJcIlxyXG5cdH1cclxuXHJcblx0Ly8gVGhpcyBmdW5jdGlvbiB3YXMgY2F1c2luZyBkZW9wdHMgaW4gQ2hyb21lLlxyXG5cdGZ1bmN0aW9uIGluamVjdFRleHROb2RlKHBhcmVudEVsZW1lbnQsIGZpcnN0LCBpbmRleCwgZGF0YSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBmaXJzdCwgaW5kZXgpXHJcblx0XHRcdGZpcnN0Lm5vZGVWYWx1ZSA9IGRhdGFcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gSUUgZXJyb25lb3VzbHkgdGhyb3dzIGVycm9yIHdoZW4gYXBwZW5kaW5nIGFuIGVtcHR5IHRleHQgbm9kZVxyXG5cdFx0XHQvLyBhZnRlciBhIG51bGxcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZsYXR0ZW4obGlzdCkge1xyXG5cdFx0Ly8gcmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheVxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChpc0FycmF5KGxpc3RbaV0pKSB7XHJcblx0XHRcdFx0bGlzdCA9IGxpc3QuY29uY2F0LmFwcGx5KFtdLCBsaXN0KVxyXG5cdFx0XHRcdC8vIGNoZWNrIGN1cnJlbnQgaW5kZXggYWdhaW4gYW5kIGZsYXR0ZW4gdW50aWwgdGhlcmUgYXJlIG5vIG1vcmVcclxuXHRcdFx0XHQvLyBuZXN0ZWQgYXJyYXlzIGF0IHRoYXQgaW5kZXhcclxuXHRcdFx0XHRpLS1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGxpc3RcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgbm9kZSwgaW5kZXgpIHtcclxuXHRcdHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGUsXHJcblx0XHRcdHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF0gfHwgbnVsbClcclxuXHR9XHJcblxyXG5cdHZhciBERUxFVElPTiA9IDFcclxuXHR2YXIgSU5TRVJUSU9OID0gMlxyXG5cdHZhciBNT1ZFID0gM1xyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVLZXlzRGlmZmVyKGRhdGEsIGV4aXN0aW5nLCBjYWNoZWQsIHBhcmVudEVsZW1lbnQpIHtcclxuXHRcdGZvcktleXMoZGF0YSwgZnVuY3Rpb24gKGtleSwgaSkge1xyXG5cdFx0XHRleGlzdGluZ1trZXkgPSBrZXkua2V5XSA9IGV4aXN0aW5nW2tleV0gPyB7XHJcblx0XHRcdFx0YWN0aW9uOiBNT1ZFLFxyXG5cdFx0XHRcdGluZGV4OiBpLFxyXG5cdFx0XHRcdGZyb206IGV4aXN0aW5nW2tleV0uaW5kZXgsXHJcblx0XHRcdFx0ZWxlbWVudDogY2FjaGVkLm5vZGVzW2V4aXN0aW5nW2tleV0uaW5kZXhdIHx8XHJcblx0XHRcdFx0XHQkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHR9IDoge2FjdGlvbjogSU5TRVJUSU9OLCBpbmRleDogaX1cclxuXHRcdH0pXHJcblxyXG5cdFx0dmFyIGFjdGlvbnMgPSBbXVxyXG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBleGlzdGluZykgaWYgKGhhc093bi5jYWxsKGV4aXN0aW5nLCBwcm9wKSkge1xyXG5cdFx0XHRhY3Rpb25zLnB1c2goZXhpc3RpbmdbcHJvcF0pXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNoYW5nZXMgPSBhY3Rpb25zLnNvcnQoc29ydENoYW5nZXMpXHJcblx0XHR2YXIgbmV3Q2FjaGVkID0gbmV3IEFycmF5KGNhY2hlZC5sZW5ndGgpXHJcblxyXG5cdFx0bmV3Q2FjaGVkLm5vZGVzID0gY2FjaGVkLm5vZGVzLnNsaWNlKClcclxuXHJcblx0XHRmb3JFYWNoKGNoYW5nZXMsIGZ1bmN0aW9uIChjaGFuZ2UpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gY2hhbmdlLmluZGV4XHJcblx0XHRcdGlmIChjaGFuZ2UuYWN0aW9uID09PSBERUxFVElPTikge1xyXG5cdFx0XHRcdGNsZWFyKGNhY2hlZFtpbmRleF0ubm9kZXMsIGNhY2hlZFtpbmRleF0pXHJcblx0XHRcdFx0bmV3Q2FjaGVkLnNwbGljZShpbmRleCwgMSlcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY2hhbmdlLmFjdGlvbiA9PT0gSU5TRVJUSU9OKSB7XHJcblx0XHRcdFx0dmFyIGR1bW15ID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHRcdFx0XHRkdW1teS5rZXkgPSBkYXRhW2luZGV4XS5hdHRycy5rZXlcclxuXHRcdFx0XHRpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIGR1bW15LCBpbmRleClcclxuXHRcdFx0XHRuZXdDYWNoZWQuc3BsaWNlKGluZGV4LCAwLCB7XHJcblx0XHRcdFx0XHRhdHRyczoge2tleTogZGF0YVtpbmRleF0uYXR0cnMua2V5fSxcclxuXHRcdFx0XHRcdG5vZGVzOiBbZHVtbXldXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRuZXdDYWNoZWQubm9kZXNbaW5kZXhdID0gZHVtbXlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNoYW5nZS5hY3Rpb24gPT09IE1PVkUpIHtcclxuXHRcdFx0XHR2YXIgY2hhbmdlRWxlbWVudCA9IGNoYW5nZS5lbGVtZW50XHJcblx0XHRcdFx0dmFyIG1heWJlQ2hhbmdlZCA9IHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF1cclxuXHRcdFx0XHRpZiAobWF5YmVDaGFuZ2VkICE9PSBjaGFuZ2VFbGVtZW50ICYmIGNoYW5nZUVsZW1lbnQgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNoYW5nZUVsZW1lbnQsXHJcblx0XHRcdFx0XHRcdG1heWJlQ2hhbmdlZCB8fCBudWxsKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXdDYWNoZWRbaW5kZXhdID0gY2FjaGVkW2NoYW5nZS5mcm9tXVxyXG5cdFx0XHRcdG5ld0NhY2hlZC5ub2Rlc1tpbmRleF0gPSBjaGFuZ2VFbGVtZW50XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIG5ld0NhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZGlmZktleXMoZGF0YSwgY2FjaGVkLCBleGlzdGluZywgcGFyZW50RWxlbWVudCkge1xyXG5cdFx0dmFyIGtleXNEaWZmZXIgPSBkYXRhLmxlbmd0aCAhPT0gY2FjaGVkLmxlbmd0aFxyXG5cclxuXHRcdGlmICgha2V5c0RpZmZlcikge1xyXG5cdFx0XHRmb3JLZXlzKGRhdGEsIGZ1bmN0aW9uIChhdHRycywgaSkge1xyXG5cdFx0XHRcdHZhciBjYWNoZWRDZWxsID0gY2FjaGVkW2ldXHJcblx0XHRcdFx0cmV0dXJuIGtleXNEaWZmZXIgPSBjYWNoZWRDZWxsICYmXHJcblx0XHRcdFx0XHRjYWNoZWRDZWxsLmF0dHJzICYmXHJcblx0XHRcdFx0XHRjYWNoZWRDZWxsLmF0dHJzLmtleSAhPT0gYXR0cnMua2V5XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGtleXNEaWZmZXIpIHtcclxuXHRcdFx0cmV0dXJuIGhhbmRsZUtleXNEaWZmZXIoZGF0YSwgZXhpc3RpbmcsIGNhY2hlZCwgcGFyZW50RWxlbWVudClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRpZmZBcnJheShkYXRhLCBjYWNoZWQsIG5vZGVzKSB7XHJcblx0XHQvLyBkaWZmIHRoZSBhcnJheSBpdHNlbGZcclxuXHJcblx0XHQvLyB1cGRhdGUgdGhlIGxpc3Qgb2YgRE9NIG5vZGVzIGJ5IGNvbGxlY3RpbmcgdGhlIG5vZGVzIGZyb20gZWFjaCBpdGVtXHJcblx0XHRmb3JFYWNoKGRhdGEsIGZ1bmN0aW9uIChfLCBpKSB7XHJcblx0XHRcdGlmIChjYWNoZWRbaV0gIT0gbnVsbCkgbm9kZXMucHVzaC5hcHBseShub2RlcywgY2FjaGVkW2ldLm5vZGVzKVxyXG5cdFx0fSlcclxuXHRcdC8vIHJlbW92ZSBpdGVtcyBmcm9tIHRoZSBlbmQgb2YgdGhlIGFycmF5IGlmIHRoZSBuZXcgYXJyYXkgaXMgc2hvcnRlclxyXG5cdFx0Ly8gdGhhbiB0aGUgb2xkIG9uZS4gaWYgZXJyb3JzIGV2ZXIgaGFwcGVuIGhlcmUsIHRoZSBpc3N1ZSBpcyBtb3N0XHJcblx0XHQvLyBsaWtlbHkgYSBidWcgaW4gdGhlIGNvbnN0cnVjdGlvbiBvZiB0aGUgYGNhY2hlZGAgZGF0YSBzdHJ1Y3R1cmVcclxuXHRcdC8vIHNvbWV3aGVyZSBlYXJsaWVyIGluIHRoZSBwcm9ncmFtXHJcblx0XHRmb3JFYWNoKGNhY2hlZC5ub2RlcywgZnVuY3Rpb24gKG5vZGUsIGkpIHtcclxuXHRcdFx0aWYgKG5vZGUucGFyZW50Tm9kZSAhPSBudWxsICYmIG5vZGVzLmluZGV4T2Yobm9kZSkgPCAwKSB7XHJcblx0XHRcdFx0Y2xlYXIoW25vZGVdLCBbY2FjaGVkW2ldXSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRpZiAoZGF0YS5sZW5ndGggPCBjYWNoZWQubGVuZ3RoKSBjYWNoZWQubGVuZ3RoID0gZGF0YS5sZW5ndGhcclxuXHRcdGNhY2hlZC5ub2RlcyA9IG5vZGVzXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZEFycmF5S2V5cyhkYXRhKSB7XHJcblx0XHR2YXIgZ3VpZCA9IDBcclxuXHRcdGZvcktleXMoZGF0YSwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmb3JFYWNoKGRhdGEsIGZ1bmN0aW9uIChhdHRycykge1xyXG5cdFx0XHRcdGlmICgoYXR0cnMgPSBhdHRycyAmJiBhdHRycy5hdHRycykgJiYgYXR0cnMua2V5ID09IG51bGwpIHtcclxuXHRcdFx0XHRcdGF0dHJzLmtleSA9IFwiX19taXRocmlsX19cIiArIGd1aWQrK1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIDFcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpc0RpZmZlcmVudEVub3VnaChkYXRhLCBjYWNoZWQsIGRhdGFBdHRyS2V5cykge1xyXG5cdFx0aWYgKGRhdGEudGFnICE9PSBjYWNoZWQudGFnKSByZXR1cm4gdHJ1ZVxyXG5cclxuXHRcdGlmIChkYXRhQXR0cktleXMuc29ydCgpLmpvaW4oKSAhPT1cclxuXHRcdFx0XHRPYmplY3Qua2V5cyhjYWNoZWQuYXR0cnMpLnNvcnQoKS5qb2luKCkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5hdHRycy5pZCAhPT0gY2FjaGVkLmF0dHJzLmlkKSB7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cnMua2V5ICE9PSBjYWNoZWQuYXR0cnMua2V5KSB7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG0ucmVkcmF3LnN0cmF0ZWd5KCkgPT09IFwiYWxsXCIpIHtcclxuXHRcdFx0cmV0dXJuICFjYWNoZWQuY29uZmlnQ29udGV4dCB8fCBjYWNoZWQuY29uZmlnQ29udGV4dC5yZXRhaW4gIT09IHRydWVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJkaWZmXCIpIHtcclxuXHRcdFx0cmV0dXJuIGNhY2hlZC5jb25maWdDb250ZXh0ICYmIGNhY2hlZC5jb25maWdDb250ZXh0LnJldGFpbiA9PT0gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG1heWJlUmVjcmVhdGVPYmplY3QoZGF0YSwgY2FjaGVkLCBkYXRhQXR0cktleXMpIHtcclxuXHRcdC8vIGlmIGFuIGVsZW1lbnQgaXMgZGlmZmVyZW50IGVub3VnaCBmcm9tIHRoZSBvbmUgaW4gY2FjaGUsIHJlY3JlYXRlIGl0XHJcblx0XHRpZiAoaXNEaWZmZXJlbnRFbm91Z2goZGF0YSwgY2FjaGVkLCBkYXRhQXR0cktleXMpKSB7XHJcblx0XHRcdGlmIChjYWNoZWQubm9kZXMubGVuZ3RoKSBjbGVhcihjYWNoZWQubm9kZXMpXHJcblxyXG5cdFx0XHRpZiAoY2FjaGVkLmNvbmZpZ0NvbnRleHQgJiZcclxuXHRcdFx0XHRcdGlzRnVuY3Rpb24oY2FjaGVkLmNvbmZpZ0NvbnRleHQub251bmxvYWQpKSB7XHJcblx0XHRcdFx0Y2FjaGVkLmNvbmZpZ0NvbnRleHQub251bmxvYWQoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2FjaGVkLmNvbnRyb2xsZXJzKSB7XHJcblx0XHRcdFx0Zm9yRWFjaChjYWNoZWQuY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0XHRcdFx0XHRpZiAoY29udHJvbGxlci5vbnVubG9hZCkgY29udHJvbGxlci5vbnVubG9hZCh7cHJldmVudERlZmF1bHQ6IG5vb3B9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0T2JqZWN0TmFtZXNwYWNlKGRhdGEsIG5hbWVzcGFjZSkge1xyXG5cdFx0aWYgKGRhdGEuYXR0cnMueG1sbnMpIHJldHVybiBkYXRhLmF0dHJzLnhtbG5zXHJcblx0XHRpZiAoZGF0YS50YWcgPT09IFwic3ZnXCIpIHJldHVybiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuXHRcdGlmIChkYXRhLnRhZyA9PT0gXCJtYXRoXCIpIHJldHVybiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIlxyXG5cdFx0cmV0dXJuIG5hbWVzcGFjZVxyXG5cdH1cclxuXHJcblx0dmFyIHBlbmRpbmdSZXF1ZXN0cyA9IDBcclxuXHRtLnN0YXJ0Q29tcHV0YXRpb24gPSBmdW5jdGlvbiAoKSB7IHBlbmRpbmdSZXF1ZXN0cysrIH1cclxuXHRtLmVuZENvbXB1dGF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHBlbmRpbmdSZXF1ZXN0cyA+IDEpIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzLS1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBlbmRpbmdSZXF1ZXN0cyA9IDBcclxuXHRcdFx0bS5yZWRyYXcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdW5sb2FkQ2FjaGVkQ29udHJvbGxlcnMoY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpIHtcclxuXHRcdGlmIChjb250cm9sbGVycy5sZW5ndGgpIHtcclxuXHRcdFx0Y2FjaGVkLnZpZXdzID0gdmlld3NcclxuXHRcdFx0Y2FjaGVkLmNvbnRyb2xsZXJzID0gY29udHJvbGxlcnNcclxuXHRcdFx0Zm9yRWFjaChjb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRpZiAoY29udHJvbGxlci5vbnVubG9hZCAmJiBjb250cm9sbGVyLm9udW5sb2FkLiRvbGQpIHtcclxuXHRcdFx0XHRcdGNvbnRyb2xsZXIub251bmxvYWQgPSBjb250cm9sbGVyLm9udW5sb2FkLiRvbGRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwZW5kaW5nUmVxdWVzdHMgJiYgY29udHJvbGxlci5vbnVubG9hZCkge1xyXG5cdFx0XHRcdFx0dmFyIG9udW5sb2FkID0gY29udHJvbGxlci5vbnVubG9hZFxyXG5cdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZCA9IG5vb3BcclxuXHRcdFx0XHRcdGNvbnRyb2xsZXIub251bmxvYWQuJG9sZCA9IG9udW5sb2FkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2NoZWR1bGVDb25maWdzVG9CZUNhbGxlZChjb25maWdzLCBkYXRhLCBub2RlLCBpc05ldywgY2FjaGVkKSB7XHJcblx0XHQvLyBzY2hlZHVsZSBjb25maWdzIHRvIGJlIGNhbGxlZC4gVGhleSBhcmUgY2FsbGVkIGFmdGVyIGBidWlsZGAgZmluaXNoZXNcclxuXHRcdC8vIHJ1bm5pbmdcclxuXHRcdGlmIChpc0Z1bmN0aW9uKGRhdGEuYXR0cnMuY29uZmlnKSkge1xyXG5cdFx0XHR2YXIgY29udGV4dCA9IGNhY2hlZC5jb25maWdDb250ZXh0ID0gY2FjaGVkLmNvbmZpZ0NvbnRleHQgfHwge31cclxuXHJcblx0XHRcdC8vIGJpbmRcclxuXHRcdFx0Y29uZmlncy5wdXNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGF0YS5hdHRycy5jb25maWcuY2FsbChkYXRhLCBub2RlLCAhaXNOZXcsIGNvbnRleHQsXHJcblx0XHRcdFx0XHRjYWNoZWQpXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZFVwZGF0ZWROb2RlKFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0ZGF0YSxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0aGFzS2V5cyxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdHZpZXdzLFxyXG5cdFx0Y29uZmlncyxcclxuXHRcdGNvbnRyb2xsZXJzXHJcblx0KSB7XHJcblx0XHR2YXIgbm9kZSA9IGNhY2hlZC5ub2Rlc1swXVxyXG5cclxuXHRcdGlmIChoYXNLZXlzKSB7XHJcblx0XHRcdHNldEF0dHJpYnV0ZXMobm9kZSwgZGF0YS50YWcsIGRhdGEuYXR0cnMsIGNhY2hlZC5hdHRycywgbmFtZXNwYWNlKVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhY2hlZC5jaGlsZHJlbiA9IGJ1aWxkKFxyXG5cdFx0XHRub2RlLFxyXG5cdFx0XHRkYXRhLnRhZyxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdGRhdGEuY2hpbGRyZW4sXHJcblx0XHRcdGNhY2hlZC5jaGlsZHJlbixcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdDAsXHJcblx0XHRcdGRhdGEuYXR0cnMuY29udGVudGVkaXRhYmxlID8gbm9kZSA6IGVkaXRhYmxlLFxyXG5cdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdGNvbmZpZ3NcclxuXHRcdClcclxuXHJcblx0XHRjYWNoZWQubm9kZXMuaW50YWN0ID0gdHJ1ZVxyXG5cclxuXHRcdGlmIChjb250cm9sbGVycy5sZW5ndGgpIHtcclxuXHRcdFx0Y2FjaGVkLnZpZXdzID0gdmlld3NcclxuXHRcdFx0Y2FjaGVkLmNvbnRyb2xsZXJzID0gY29udHJvbGxlcnNcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbm9kZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlTm9uZXhpc3RlbnROb2RlcyhkYXRhLCBwYXJlbnRFbGVtZW50LCBpbmRleCkge1xyXG5cdFx0dmFyIG5vZGVzXHJcblx0XHRpZiAoZGF0YS4kdHJ1c3RlZCkge1xyXG5cdFx0XHRub2RlcyA9IGluamVjdEhUTUwocGFyZW50RWxlbWVudCwgaW5kZXgsIGRhdGEpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlcyA9IFskZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSldXHJcblx0XHRcdGlmICghKHBhcmVudEVsZW1lbnQubm9kZU5hbWUgaW4gdm9pZEVsZW1lbnRzKSkge1xyXG5cdFx0XHRcdGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgbm9kZXNbMF0sIGluZGV4KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGNhY2hlZFxyXG5cclxuXHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiB8fFxyXG5cdFx0XHRcdHR5cGVvZiBkYXRhID09PSBcIm51bWJlclwiIHx8XHJcblx0XHRcdFx0dHlwZW9mIGRhdGEgPT09IFwiYm9vbGVhblwiKSB7XHJcblx0XHRcdGNhY2hlZCA9IG5ldyBkYXRhLmNvbnN0cnVjdG9yKGRhdGEpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjYWNoZWQgPSBkYXRhXHJcblx0XHR9XHJcblxyXG5cdFx0Y2FjaGVkLm5vZGVzID0gbm9kZXNcclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlYXR0YWNoTm9kZXMoXHJcblx0XHRkYXRhLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0aW5kZXgsXHJcblx0XHRwYXJlbnRUYWdcclxuXHQpIHtcclxuXHRcdHZhciBub2RlcyA9IGNhY2hlZC5ub2Rlc1xyXG5cdFx0aWYgKCFlZGl0YWJsZSB8fCBlZGl0YWJsZSAhPT0gJGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuXHRcdFx0aWYgKGRhdGEuJHRydXN0ZWQpIHtcclxuXHRcdFx0XHRjbGVhcihub2RlcywgY2FjaGVkKVxyXG5cdFx0XHRcdG5vZGVzID0gaW5qZWN0SFRNTChwYXJlbnRFbGVtZW50LCBpbmRleCwgZGF0YSlcclxuXHRcdFx0fSBlbHNlIGlmIChwYXJlbnRUYWcgPT09IFwidGV4dGFyZWFcIikge1xyXG5cdFx0XHRcdC8vIDx0ZXh0YXJlYT4gdXNlcyBgdmFsdWVgIGluc3RlYWQgb2YgYG5vZGVWYWx1ZWAuXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudC52YWx1ZSA9IGRhdGFcclxuXHRcdFx0fSBlbHNlIGlmIChlZGl0YWJsZSkge1xyXG5cdFx0XHRcdC8vIGNvbnRlbnRlZGl0YWJsZSBub2RlcyB1c2UgYGlubmVySFRNTGAgaW5zdGVhZCBvZiBgbm9kZVZhbHVlYC5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSBkYXRhXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gd2FzIGEgdHJ1c3RlZCBzdHJpbmdcclxuXHRcdFx0XHRpZiAobm9kZXNbMF0ubm9kZVR5cGUgPT09IDEgfHwgbm9kZXMubGVuZ3RoID4gMSB8fFxyXG5cdFx0XHRcdFx0XHQobm9kZXNbMF0ubm9kZVZhbHVlLnRyaW0gJiZcclxuXHRcdFx0XHRcdFx0XHQhbm9kZXNbMF0ubm9kZVZhbHVlLnRyaW0oKSkpIHtcclxuXHRcdFx0XHRcdGNsZWFyKGNhY2hlZC5ub2RlcywgY2FjaGVkKVxyXG5cdFx0XHRcdFx0bm9kZXMgPSBbJGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpXVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aW5qZWN0VGV4dE5vZGUocGFyZW50RWxlbWVudCwgbm9kZXNbMF0sIGluZGV4LCBkYXRhKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYWNoZWQgPSBuZXcgZGF0YS5jb25zdHJ1Y3RvcihkYXRhKVxyXG5cdFx0Y2FjaGVkLm5vZGVzID0gbm9kZXNcclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGhhbmRsZVRleHROb2RlKFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0ZGF0YSxcclxuXHRcdGluZGV4LFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRwYXJlbnRUYWdcclxuXHQpIHtcclxuXHRcdGlmICghY2FjaGVkLm5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gaGFuZGxlTm9uZXhpc3RlbnROb2RlcyhkYXRhLCBwYXJlbnRFbGVtZW50LCBpbmRleClcclxuXHRcdH0gZWxzZSBpZiAoY2FjaGVkLnZhbHVlT2YoKSAhPT0gZGF0YS52YWx1ZU9mKCkgfHwgc2hvdWxkUmVhdHRhY2gpIHtcclxuXHRcdFx0cmV0dXJuIHJlYXR0YWNoTm9kZXMoZGF0YSwgY2FjaGVkLCBwYXJlbnRFbGVtZW50LCBlZGl0YWJsZSwgaW5kZXgsXHJcblx0XHRcdFx0cGFyZW50VGFnKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIChjYWNoZWQubm9kZXMuaW50YWN0ID0gdHJ1ZSwgY2FjaGVkKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0U3ViQXJyYXlDb3VudChpdGVtKSB7XHJcblx0XHRpZiAoaXRlbS4kdHJ1c3RlZCkge1xyXG5cdFx0XHQvLyBmaXggb2Zmc2V0IG9mIG5leHQgZWxlbWVudCBpZiBpdGVtIHdhcyBhIHRydXN0ZWQgc3RyaW5nIHcvIG1vcmVcclxuXHRcdFx0Ly8gdGhhbiBvbmUgaHRtbCBlbGVtZW50XHJcblx0XHRcdC8vIHRoZSBmaXJzdCBjbGF1c2UgaW4gdGhlIHJlZ2V4cCBtYXRjaGVzIGVsZW1lbnRzXHJcblx0XHRcdC8vIHRoZSBzZWNvbmQgY2xhdXNlIChhZnRlciB0aGUgcGlwZSkgbWF0Y2hlcyB0ZXh0IG5vZGVzXHJcblx0XHRcdHZhciBtYXRjaCA9IGl0ZW0ubWF0Y2goLzxbXlxcL118XFw+XFxzKltePF0vZylcclxuXHRcdFx0aWYgKG1hdGNoICE9IG51bGwpIHJldHVybiBtYXRjaC5sZW5ndGhcclxuXHRcdH0gZWxzZSBpZiAoaXNBcnJheShpdGVtKSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbS5sZW5ndGhcclxuXHRcdH1cclxuXHRcdHJldHVybiAxXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZEFycmF5KFxyXG5cdFx0ZGF0YSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRpbmRleCxcclxuXHRcdHBhcmVudFRhZyxcclxuXHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHRjb25maWdzXHJcblx0KSB7XHJcblx0XHRkYXRhID0gZmxhdHRlbihkYXRhKVxyXG5cdFx0dmFyIG5vZGVzID0gW11cclxuXHRcdHZhciBpbnRhY3QgPSBjYWNoZWQubGVuZ3RoID09PSBkYXRhLmxlbmd0aFxyXG5cdFx0dmFyIHN1YkFycmF5Q291bnQgPSAwXHJcblxyXG5cdFx0Ly8ga2V5cyBhbGdvcml0aG06IHNvcnQgZWxlbWVudHMgd2l0aG91dCByZWNyZWF0aW5nIHRoZW0gaWYga2V5cyBhcmVcclxuXHRcdC8vIHByZXNlbnRcclxuXHRcdC8vXHJcblx0XHQvLyAxKSBjcmVhdGUgYSBtYXAgb2YgYWxsIGV4aXN0aW5nIGtleXMsIGFuZCBtYXJrIGFsbCBmb3IgZGVsZXRpb25cclxuXHRcdC8vIDIpIGFkZCBuZXcga2V5cyB0byBtYXAgYW5kIG1hcmsgdGhlbSBmb3IgYWRkaXRpb25cclxuXHRcdC8vIDMpIGlmIGtleSBleGlzdHMgaW4gbmV3IGxpc3QsIGNoYW5nZSBhY3Rpb24gZnJvbSBkZWxldGlvbiB0byBhIG1vdmVcclxuXHRcdC8vIDQpIGZvciBlYWNoIGtleSwgaGFuZGxlIGl0cyBjb3JyZXNwb25kaW5nIGFjdGlvbiBhcyBtYXJrZWQgaW5cclxuXHRcdC8vICAgIHByZXZpb3VzIHN0ZXBzXHJcblxyXG5cdFx0dmFyIGV4aXN0aW5nID0ge31cclxuXHRcdHZhciBzaG91bGRNYWludGFpbklkZW50aXRpZXMgPSBmYWxzZVxyXG5cclxuXHRcdGZvcktleXMoY2FjaGVkLCBmdW5jdGlvbiAoYXR0cnMsIGkpIHtcclxuXHRcdFx0c2hvdWxkTWFpbnRhaW5JZGVudGl0aWVzID0gdHJ1ZVxyXG5cdFx0XHRleGlzdGluZ1tjYWNoZWRbaV0uYXR0cnMua2V5XSA9IHthY3Rpb246IERFTEVUSU9OLCBpbmRleDogaX1cclxuXHRcdH0pXHJcblxyXG5cdFx0YnVpbGRBcnJheUtleXMoZGF0YSlcclxuXHRcdGlmIChzaG91bGRNYWludGFpbklkZW50aXRpZXMpIHtcclxuXHRcdFx0Y2FjaGVkID0gZGlmZktleXMoZGF0YSwgY2FjaGVkLCBleGlzdGluZywgcGFyZW50RWxlbWVudClcclxuXHRcdH1cclxuXHRcdC8vIGVuZCBrZXkgYWxnb3JpdGhtXHJcblxyXG5cdFx0dmFyIGNhY2hlQ291bnQgPSAwXHJcblx0XHQvLyBmYXN0ZXIgZXhwbGljaXRseSB3cml0dGVuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHQvLyBkaWZmIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcclxuXHRcdFx0dmFyIGl0ZW0gPSBidWlsZChcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0XHRcdHBhcmVudFRhZyxcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0ZGF0YVtpXSxcclxuXHRcdFx0XHRjYWNoZWRbY2FjaGVDb3VudF0sXHJcblx0XHRcdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRcdFx0aW5kZXggKyBzdWJBcnJheUNvdW50IHx8IHN1YkFycmF5Q291bnQsXHJcblx0XHRcdFx0ZWRpdGFibGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdGNvbmZpZ3MpXHJcblxyXG5cdFx0XHRpZiAoaXRlbSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0aW50YWN0ID0gaW50YWN0ICYmIGl0ZW0ubm9kZXMuaW50YWN0XHJcblx0XHRcdFx0c3ViQXJyYXlDb3VudCArPSBnZXRTdWJBcnJheUNvdW50KGl0ZW0pXHJcblx0XHRcdFx0Y2FjaGVkW2NhY2hlQ291bnQrK10gPSBpdGVtXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWludGFjdCkgZGlmZkFycmF5KGRhdGEsIGNhY2hlZCwgbm9kZXMpXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBtYWtlQ2FjaGUoZGF0YSwgY2FjaGVkLCBpbmRleCwgcGFyZW50SW5kZXgsIHBhcmVudENhY2hlKSB7XHJcblx0XHRpZiAoY2FjaGVkICE9IG51bGwpIHtcclxuXHRcdFx0aWYgKHR5cGUuY2FsbChjYWNoZWQpID09PSB0eXBlLmNhbGwoZGF0YSkpIHJldHVybiBjYWNoZWRcclxuXHJcblx0XHRcdGlmIChwYXJlbnRDYWNoZSAmJiBwYXJlbnRDYWNoZS5ub2Rlcykge1xyXG5cdFx0XHRcdHZhciBvZmZzZXQgPSBpbmRleCAtIHBhcmVudEluZGV4XHJcblx0XHRcdFx0dmFyIGVuZCA9IG9mZnNldCArIChpc0FycmF5KGRhdGEpID8gZGF0YSA6IGNhY2hlZC5ub2RlcykubGVuZ3RoXHJcblx0XHRcdFx0Y2xlYXIoXHJcblx0XHRcdFx0XHRwYXJlbnRDYWNoZS5ub2Rlcy5zbGljZShvZmZzZXQsIGVuZCksXHJcblx0XHRcdFx0XHRwYXJlbnRDYWNoZS5zbGljZShvZmZzZXQsIGVuZCkpXHJcblx0XHRcdH0gZWxzZSBpZiAoY2FjaGVkLm5vZGVzKSB7XHJcblx0XHRcdFx0Y2xlYXIoY2FjaGVkLm5vZGVzLCBjYWNoZWQpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjYWNoZWQgPSBuZXcgZGF0YS5jb25zdHJ1Y3RvcigpXHJcblx0XHQvLyBpZiBjb25zdHJ1Y3RvciBjcmVhdGVzIGEgdmlydHVhbCBkb20gZWxlbWVudCwgdXNlIGEgYmxhbmsgb2JqZWN0IGFzXHJcblx0XHQvLyB0aGUgYmFzZSBjYWNoZWQgbm9kZSBpbnN0ZWFkIG9mIGNvcHlpbmcgdGhlIHZpcnR1YWwgZWwgKCMyNzcpXHJcblx0XHRpZiAoY2FjaGVkLnRhZykgY2FjaGVkID0ge31cclxuXHRcdGNhY2hlZC5ub2RlcyA9IFtdXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb25zdHJ1Y3ROb2RlKGRhdGEsIG5hbWVzcGFjZSkge1xyXG5cdFx0aWYgKGRhdGEuYXR0cnMuaXMpIHtcclxuXHRcdFx0aWYgKG5hbWVzcGFjZSA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KGRhdGEudGFnLCBkYXRhLmF0dHJzLmlzKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgZGF0YS50YWcsXHJcblx0XHRcdFx0XHRkYXRhLmF0dHJzLmlzKVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKG5hbWVzcGFjZSA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnRhZylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgZGF0YS50YWcpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb25zdHJ1Y3RBdHRycyhkYXRhLCBub2RlLCBuYW1lc3BhY2UsIGhhc0tleXMpIHtcclxuXHRcdGlmIChoYXNLZXlzKSB7XHJcblx0XHRcdHJldHVybiBzZXRBdHRyaWJ1dGVzKG5vZGUsIGRhdGEudGFnLCBkYXRhLmF0dHJzLCB7fSwgbmFtZXNwYWNlKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEuYXR0cnNcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNvbnN0cnVjdENoaWxkcmVuKFxyXG5cdFx0ZGF0YSxcclxuXHRcdG5vZGUsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdGNvbmZpZ3NcclxuXHQpIHtcclxuXHRcdGlmIChkYXRhLmNoaWxkcmVuICE9IG51bGwgJiYgZGF0YS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiBidWlsZChcclxuXHRcdFx0XHRub2RlLFxyXG5cdFx0XHRcdGRhdGEudGFnLFxyXG5cdFx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdFx0ZGF0YS5jaGlsZHJlbixcclxuXHRcdFx0XHRjYWNoZWQuY2hpbGRyZW4sXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHQwLFxyXG5cdFx0XHRcdGRhdGEuYXR0cnMuY29udGVudGVkaXRhYmxlID8gbm9kZSA6IGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEuY2hpbGRyZW5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlY29uc3RydWN0Q2FjaGVkKFxyXG5cdFx0ZGF0YSxcclxuXHRcdGF0dHJzLFxyXG5cdFx0Y2hpbGRyZW4sXHJcblx0XHRub2RlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0dmlld3MsXHJcblx0XHRjb250cm9sbGVyc1xyXG5cdCkge1xyXG5cdFx0dmFyIGNhY2hlZCA9IHtcclxuXHRcdFx0dGFnOiBkYXRhLnRhZyxcclxuXHRcdFx0YXR0cnM6IGF0dHJzLFxyXG5cdFx0XHRjaGlsZHJlbjogY2hpbGRyZW4sXHJcblx0XHRcdG5vZGVzOiBbbm9kZV1cclxuXHRcdH1cclxuXHJcblx0XHR1bmxvYWRDYWNoZWRDb250cm9sbGVycyhjYWNoZWQsIHZpZXdzLCBjb250cm9sbGVycylcclxuXHJcblx0XHRpZiAoY2FjaGVkLmNoaWxkcmVuICYmICFjYWNoZWQuY2hpbGRyZW4ubm9kZXMpIHtcclxuXHRcdFx0Y2FjaGVkLmNoaWxkcmVuLm5vZGVzID0gW11cclxuXHRcdH1cclxuXHJcblx0XHQvLyBlZGdlIGNhc2U6IHNldHRpbmcgdmFsdWUgb24gPHNlbGVjdD4gZG9lc24ndCB3b3JrIGJlZm9yZSBjaGlsZHJlblxyXG5cdFx0Ly8gZXhpc3QsIHNvIHNldCBpdCBhZ2FpbiBhZnRlciBjaGlsZHJlbiBoYXZlIGJlZW4gY3JlYXRlZFxyXG5cdFx0aWYgKGRhdGEudGFnID09PSBcInNlbGVjdFwiICYmIFwidmFsdWVcIiBpbiBkYXRhLmF0dHJzKSB7XHJcblx0XHRcdHNldEF0dHJpYnV0ZXMobm9kZSwgZGF0YS50YWcsIHt2YWx1ZTogZGF0YS5hdHRycy52YWx1ZX0sIHt9LFxyXG5cdFx0XHRcdG5hbWVzcGFjZSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRDb250cm9sbGVyKHZpZXdzLCB2aWV3LCBjYWNoZWRDb250cm9sbGVycywgY29udHJvbGxlcikge1xyXG5cdFx0dmFyIGNvbnRyb2xsZXJJbmRleFxyXG5cclxuXHRcdGlmIChtLnJlZHJhdy5zdHJhdGVneSgpID09PSBcImRpZmZcIiAmJiB2aWV3cykge1xyXG5cdFx0XHRjb250cm9sbGVySW5kZXggPSB2aWV3cy5pbmRleE9mKHZpZXcpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb250cm9sbGVySW5kZXggPSAtMVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb250cm9sbGVySW5kZXggPiAtMSkge1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVkQ29udHJvbGxlcnNbY29udHJvbGxlckluZGV4XVxyXG5cdFx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGNvbnRyb2xsZXIpKSB7XHJcblx0XHRcdHJldHVybiBuZXcgY29udHJvbGxlcigpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4ge31cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciB1bmxvYWRlcnMgPSBbXVxyXG5cclxuXHRmdW5jdGlvbiB1cGRhdGVMaXN0cyh2aWV3cywgY29udHJvbGxlcnMsIHZpZXcsIGNvbnRyb2xsZXIpIHtcclxuXHRcdGlmIChjb250cm9sbGVyLm9udW5sb2FkICE9IG51bGwgJiYgdW5sb2FkZXJzLm1hcChmdW5jdGlvbih1KSB7cmV0dXJuIHUuaGFuZGxlcn0pLmluZGV4T2YoY29udHJvbGxlci5vbnVubG9hZCkgPCAwKSB7XHJcblx0XHRcdHVubG9hZGVycy5wdXNoKHtcclxuXHRcdFx0XHRjb250cm9sbGVyOiBjb250cm9sbGVyLFxyXG5cdFx0XHRcdGhhbmRsZXI6IGNvbnRyb2xsZXIub251bmxvYWRcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR2aWV3cy5wdXNoKHZpZXcpXHJcblx0XHRjb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpXHJcblx0fVxyXG5cclxuXHR2YXIgZm9yY2luZyA9IGZhbHNlXHJcblx0ZnVuY3Rpb24gY2hlY2tWaWV3KGRhdGEsIHZpZXcsIGNhY2hlZCwgY2FjaGVkQ29udHJvbGxlcnMsIGNvbnRyb2xsZXJzLCB2aWV3cykge1xyXG5cdFx0dmFyIGNvbnRyb2xsZXIgPSBnZXRDb250cm9sbGVyKGNhY2hlZC52aWV3cywgdmlldywgY2FjaGVkQ29udHJvbGxlcnMsIGRhdGEuY29udHJvbGxlcilcclxuXHRcdHZhciBrZXkgPSBkYXRhICYmIGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy5rZXlcclxuXHRcdGRhdGEgPSBwZW5kaW5nUmVxdWVzdHMgPT09IDAgfHwgZm9yY2luZyB8fCBjYWNoZWRDb250cm9sbGVycyAmJiBjYWNoZWRDb250cm9sbGVycy5pbmRleE9mKGNvbnRyb2xsZXIpID4gLTEgPyBkYXRhLnZpZXcoY29udHJvbGxlcikgOiB7dGFnOiBcInBsYWNlaG9sZGVyXCJ9XHJcblx0XHRpZiAoZGF0YS5zdWJ0cmVlID09PSBcInJldGFpblwiKSByZXR1cm4gZGF0YTtcclxuXHRcdGRhdGEuYXR0cnMgPSBkYXRhLmF0dHJzIHx8IHt9XHJcblx0XHRkYXRhLmF0dHJzLmtleSA9IGtleVxyXG5cdFx0dXBkYXRlTGlzdHModmlld3MsIGNvbnRyb2xsZXJzLCB2aWV3LCBjb250cm9sbGVyKVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG1hcmtWaWV3cyhkYXRhLCBjYWNoZWQsIHZpZXdzLCBjb250cm9sbGVycykge1xyXG5cdFx0dmFyIGNhY2hlZENvbnRyb2xsZXJzID0gY2FjaGVkICYmIGNhY2hlZC5jb250cm9sbGVyc1xyXG5cclxuXHRcdHdoaWxlIChkYXRhLnZpZXcgIT0gbnVsbCkge1xyXG5cdFx0XHRkYXRhID0gY2hlY2tWaWV3KFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0ZGF0YS52aWV3LiRvcmlnaW5hbCB8fCBkYXRhLnZpZXcsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGNhY2hlZENvbnRyb2xsZXJzLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJzLFxyXG5cdFx0XHRcdHZpZXdzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZE9iamVjdCggLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtc3RhdGVtZW50c1xyXG5cdFx0ZGF0YSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdGluZGV4LFxyXG5cdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHRjb25maWdzXHJcblx0KSB7XHJcblx0XHR2YXIgdmlld3MgPSBbXVxyXG5cdFx0dmFyIGNvbnRyb2xsZXJzID0gW11cclxuXHJcblx0XHRkYXRhID0gbWFya1ZpZXdzKGRhdGEsIGNhY2hlZCwgdmlld3MsIGNvbnRyb2xsZXJzKVxyXG5cclxuXHRcdGlmIChkYXRhLnN1YnRyZWUgPT09IFwicmV0YWluXCIpIHJldHVybiBjYWNoZWRcclxuXHJcblx0XHRpZiAoIWRhdGEudGFnICYmIGNvbnRyb2xsZXJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb21wb25lbnQgdGVtcGxhdGUgbXVzdCByZXR1cm4gYSB2aXJ0dWFsIFwiICtcclxuXHRcdFx0XHRcImVsZW1lbnQsIG5vdCBhbiBhcnJheSwgc3RyaW5nLCBldGMuXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YS5hdHRycyA9IGRhdGEuYXR0cnMgfHwge31cclxuXHRcdGNhY2hlZC5hdHRycyA9IGNhY2hlZC5hdHRycyB8fCB7fVxyXG5cclxuXHRcdHZhciBkYXRhQXR0cktleXMgPSBPYmplY3Qua2V5cyhkYXRhLmF0dHJzKVxyXG5cdFx0dmFyIGhhc0tleXMgPSBkYXRhQXR0cktleXMubGVuZ3RoID4gKFwia2V5XCIgaW4gZGF0YS5hdHRycyA/IDEgOiAwKVxyXG5cclxuXHRcdG1heWJlUmVjcmVhdGVPYmplY3QoZGF0YSwgY2FjaGVkLCBkYXRhQXR0cktleXMpXHJcblxyXG5cdFx0aWYgKCFpc1N0cmluZyhkYXRhLnRhZykpIHJldHVyblxyXG5cclxuXHRcdHZhciBpc05ldyA9IGNhY2hlZC5ub2Rlcy5sZW5ndGggPT09IDBcclxuXHJcblx0XHRuYW1lc3BhY2UgPSBnZXRPYmplY3ROYW1lc3BhY2UoZGF0YSwgbmFtZXNwYWNlKVxyXG5cclxuXHRcdHZhciBub2RlXHJcblx0XHRpZiAoaXNOZXcpIHtcclxuXHRcdFx0bm9kZSA9IGNvbnN0cnVjdE5vZGUoZGF0YSwgbmFtZXNwYWNlKVxyXG5cdFx0XHQvLyBzZXQgYXR0cmlidXRlcyBmaXJzdCwgdGhlbiBjcmVhdGUgY2hpbGRyZW5cclxuXHRcdFx0dmFyIGF0dHJzID0gY29uc3RydWN0QXR0cnMoZGF0YSwgbm9kZSwgbmFtZXNwYWNlLCBoYXNLZXlzKVxyXG5cclxuXHRcdFx0dmFyIGNoaWxkcmVuID0gY29uc3RydWN0Q2hpbGRyZW4oZGF0YSwgbm9kZSwgY2FjaGVkLCBlZGl0YWJsZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsIGNvbmZpZ3MpXHJcblxyXG5cdFx0XHRjYWNoZWQgPSByZWNvbnN0cnVjdENhY2hlZChcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGF0dHJzLFxyXG5cdFx0XHRcdGNoaWxkcmVuLFxyXG5cdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdHZpZXdzLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJzKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bm9kZSA9IGJ1aWxkVXBkYXRlZE5vZGUoXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0ZWRpdGFibGUsXHJcblx0XHRcdFx0aGFzS2V5cyxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0dmlld3MsXHJcblx0XHRcdFx0Y29uZmlncyxcclxuXHRcdFx0XHRjb250cm9sbGVycylcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNOZXcgfHwgc2hvdWxkUmVhdHRhY2ggPT09IHRydWUgJiYgbm9kZSAhPSBudWxsKSB7XHJcblx0XHRcdGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgbm9kZSwgaW5kZXgpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIGNvbmZpZ3MgYXJlIGNhbGxlZCBhZnRlciBgYnVpbGRgIGZpbmlzaGVzIHJ1bm5pbmdcclxuXHRcdHNjaGVkdWxlQ29uZmlnc1RvQmVDYWxsZWQoY29uZmlncywgZGF0YSwgbm9kZSwgaXNOZXcsIGNhY2hlZClcclxuXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBidWlsZChcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRwYXJlbnRUYWcsXHJcblx0XHRwYXJlbnRDYWNoZSxcclxuXHRcdHBhcmVudEluZGV4LFxyXG5cdFx0ZGF0YSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0aW5kZXgsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdGNvbmZpZ3NcclxuXHQpIHtcclxuXHRcdC8qXHJcblx0XHQgKiBgYnVpbGRgIGlzIGEgcmVjdXJzaXZlIGZ1bmN0aW9uIHRoYXQgbWFuYWdlcyBjcmVhdGlvbi9kaWZmaW5nL3JlbW92YWxcclxuXHRcdCAqIG9mIERPTSBlbGVtZW50cyBiYXNlZCBvbiBjb21wYXJpc29uIGJldHdlZW4gYGRhdGFgIGFuZCBgY2FjaGVkYCB0aGVcclxuXHRcdCAqIGRpZmYgYWxnb3JpdGhtIGNhbiBiZSBzdW1tYXJpemVkIGFzIHRoaXM6XHJcblx0XHQgKlxyXG5cdFx0ICogMSAtIGNvbXBhcmUgYGRhdGFgIGFuZCBgY2FjaGVkYFxyXG5cdFx0ICogMiAtIGlmIHRoZXkgYXJlIGRpZmZlcmVudCwgY29weSBgZGF0YWAgdG8gYGNhY2hlZGAgYW5kIHVwZGF0ZSB0aGUgRE9NXHJcblx0XHQgKiAgICAgYmFzZWQgb24gd2hhdCB0aGUgZGlmZmVyZW5jZSBpc1xyXG5cdFx0ICogMyAtIHJlY3Vyc2l2ZWx5IGFwcGx5IHRoaXMgYWxnb3JpdGhtIGZvciBldmVyeSBhcnJheSBhbmQgZm9yIHRoZVxyXG5cdFx0ICogICAgIGNoaWxkcmVuIG9mIGV2ZXJ5IHZpcnR1YWwgZWxlbWVudFxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBgY2FjaGVkYCBkYXRhIHN0cnVjdHVyZSBpcyBlc3NlbnRpYWxseSB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXNcclxuXHRcdCAqIHJlZHJhdydzIGBkYXRhYCBkYXRhIHN0cnVjdHVyZSwgd2l0aCBhIGZldyBhZGRpdGlvbnM6XHJcblx0XHQgKiAtIGBjYWNoZWRgIGFsd2F5cyBoYXMgYSBwcm9wZXJ0eSBjYWxsZWQgYG5vZGVzYCwgd2hpY2ggaXMgYSBsaXN0IG9mXHJcblx0XHQgKiAgICBET00gZWxlbWVudHMgdGhhdCBjb3JyZXNwb25kIHRvIHRoZSBkYXRhIHJlcHJlc2VudGVkIGJ5IHRoZVxyXG5cdFx0ICogICAgcmVzcGVjdGl2ZSB2aXJ0dWFsIGVsZW1lbnRcclxuXHRcdCAqIC0gaW4gb3JkZXIgdG8gc3VwcG9ydCBhdHRhY2hpbmcgYG5vZGVzYCBhcyBhIHByb3BlcnR5IG9mIGBjYWNoZWRgLFxyXG5cdFx0ICogICAgYGNhY2hlZGAgaXMgKmFsd2F5cyogYSBub24tcHJpbWl0aXZlIG9iamVjdCwgaS5lLiBpZiB0aGUgZGF0YSB3YXNcclxuXHRcdCAqICAgIGEgc3RyaW5nLCB0aGVuIGNhY2hlZCBpcyBhIFN0cmluZyBpbnN0YW5jZS4gSWYgZGF0YSB3YXMgYG51bGxgIG9yXHJcblx0XHQgKiAgICBgdW5kZWZpbmVkYCwgY2FjaGVkIGlzIGBuZXcgU3RyaW5nKFwiXCIpYFxyXG5cdFx0ICogLSBgY2FjaGVkIGFsc28gaGFzIGEgYGNvbmZpZ0NvbnRleHRgIHByb3BlcnR5LCB3aGljaCBpcyB0aGUgc3RhdGVcclxuXHRcdCAqICAgIHN0b3JhZ2Ugb2JqZWN0IGV4cG9zZWQgYnkgY29uZmlnKGVsZW1lbnQsIGlzSW5pdGlhbGl6ZWQsIGNvbnRleHQpXHJcblx0XHQgKiAtIHdoZW4gYGNhY2hlZGAgaXMgYW4gT2JqZWN0LCBpdCByZXByZXNlbnRzIGEgdmlydHVhbCBlbGVtZW50OyB3aGVuXHJcblx0XHQgKiAgICBpdCdzIGFuIEFycmF5LCBpdCByZXByZXNlbnRzIGEgbGlzdCBvZiBlbGVtZW50czsgd2hlbiBpdCdzIGFcclxuXHRcdCAqICAgIFN0cmluZywgTnVtYmVyIG9yIEJvb2xlYW4sIGl0IHJlcHJlc2VudHMgYSB0ZXh0IG5vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBgcGFyZW50RWxlbWVudGAgaXMgYSBET00gZWxlbWVudCB1c2VkIGZvciBXM0MgRE9NIEFQSSBjYWxsc1xyXG5cdFx0ICogYHBhcmVudFRhZ2AgaXMgb25seSB1c2VkIGZvciBoYW5kbGluZyBhIGNvcm5lciBjYXNlIGZvciB0ZXh0YXJlYVxyXG5cdFx0ICogdmFsdWVzXHJcblx0XHQgKiBgcGFyZW50Q2FjaGVgIGlzIHVzZWQgdG8gcmVtb3ZlIG5vZGVzIGluIHNvbWUgbXVsdGktbm9kZSBjYXNlc1xyXG5cdFx0ICogYHBhcmVudEluZGV4YCBhbmQgYGluZGV4YCBhcmUgdXNlZCB0byBmaWd1cmUgb3V0IHRoZSBvZmZzZXQgb2Ygbm9kZXMuXHJcblx0XHQgKiBUaGV5J3JlIGFydGlmYWN0cyBmcm9tIGJlZm9yZSBhcnJheXMgc3RhcnRlZCBiZWluZyBmbGF0dGVuZWQgYW5kIGFyZVxyXG5cdFx0ICogbGlrZWx5IHJlZmFjdG9yYWJsZVxyXG5cdFx0ICogYGRhdGFgIGFuZCBgY2FjaGVkYCBhcmUsIHJlc3BlY3RpdmVseSwgdGhlIG5ldyBhbmQgb2xkIG5vZGVzIGJlaW5nXHJcblx0XHQgKiBkaWZmZWRcclxuXHRcdCAqIGBzaG91bGRSZWF0dGFjaGAgaXMgYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciBhIHBhcmVudCBub2RlIHdhc1xyXG5cdFx0ICogcmVjcmVhdGVkIChpZiBzbywgYW5kIGlmIHRoaXMgbm9kZSBpcyByZXVzZWQsIHRoZW4gdGhpcyBub2RlIG11c3RcclxuXHRcdCAqIHJlYXR0YWNoIGl0c2VsZiB0byB0aGUgbmV3IHBhcmVudClcclxuXHRcdCAqIGBlZGl0YWJsZWAgaXMgYSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgYW4gYW5jZXN0b3IgaXNcclxuXHRcdCAqIGNvbnRlbnRlZGl0YWJsZVxyXG5cdFx0ICogYG5hbWVzcGFjZWAgaW5kaWNhdGVzIHRoZSBjbG9zZXN0IEhUTUwgbmFtZXNwYWNlIGFzIGl0IGNhc2NhZGVzIGRvd25cclxuXHRcdCAqIGZyb20gYW4gYW5jZXN0b3JcclxuXHRcdCAqIGBjb25maWdzYCBpcyBhIGxpc3Qgb2YgY29uZmlnIGZ1bmN0aW9ucyB0byBydW4gYWZ0ZXIgdGhlIHRvcG1vc3RcclxuXHRcdCAqIGBidWlsZGAgY2FsbCBmaW5pc2hlcyBydW5uaW5nXHJcblx0XHQgKlxyXG5cdFx0ICogdGhlcmUncyBsb2dpYyB0aGF0IHJlbGllcyBvbiB0aGUgYXNzdW1wdGlvbiB0aGF0IG51bGwgYW5kIHVuZGVmaW5lZFxyXG5cdFx0ICogZGF0YSBhcmUgZXF1aXZhbGVudCB0byBlbXB0eSBzdHJpbmdzXHJcblx0XHQgKiAtIHRoaXMgcHJldmVudHMgbGlmZWN5Y2xlIHN1cnByaXNlcyBmcm9tIHByb2NlZHVyYWwgaGVscGVycyB0aGF0IG1peFxyXG5cdFx0ICogICBpbXBsaWNpdCBhbmQgZXhwbGljaXQgcmV0dXJuIHN0YXRlbWVudHMgKGUuZy5cclxuXHRcdCAqICAgZnVuY3Rpb24gZm9vKCkge2lmIChjb25kKSByZXR1cm4gbShcImRpdlwiKX1cclxuXHRcdCAqIC0gaXQgc2ltcGxpZmllcyBkaWZmaW5nIGNvZGVcclxuXHRcdCAqL1xyXG5cdFx0ZGF0YSA9IGRhdGFUb1N0cmluZyhkYXRhKVxyXG5cdFx0aWYgKGRhdGEuc3VidHJlZSA9PT0gXCJyZXRhaW5cIikgcmV0dXJuIGNhY2hlZFxyXG5cdFx0Y2FjaGVkID0gbWFrZUNhY2hlKGRhdGEsIGNhY2hlZCwgaW5kZXgsIHBhcmVudEluZGV4LCBwYXJlbnRDYWNoZSlcclxuXHJcblx0XHRpZiAoaXNBcnJheShkYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gYnVpbGRBcnJheShcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdHBhcmVudFRhZyxcclxuXHRcdFx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdFx0XHRlZGl0YWJsZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0Y29uZmlncylcclxuXHRcdH0gZWxzZSBpZiAoZGF0YSAhPSBudWxsICYmIGlzT2JqZWN0KGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBidWlsZE9iamVjdChcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRlZGl0YWJsZSxcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cdFx0fSBlbHNlIGlmICghaXNGdW5jdGlvbihkYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gaGFuZGxlVGV4dE5vZGUoXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdFx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdFx0XHRlZGl0YWJsZSxcclxuXHRcdFx0XHRwYXJlbnRUYWcpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVkXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzb3J0Q2hhbmdlcyhhLCBiKSB7XHJcblx0XHRyZXR1cm4gYS5hY3Rpb24gLSBiLmFjdGlvbiB8fCBhLmluZGV4IC0gYi5pbmRleFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29weVN0eWxlQXR0cnMobm9kZSwgZGF0YUF0dHIsIGNhY2hlZEF0dHIpIHtcclxuXHRcdGZvciAodmFyIHJ1bGUgaW4gZGF0YUF0dHIpIGlmIChoYXNPd24uY2FsbChkYXRhQXR0ciwgcnVsZSkpIHtcclxuXHRcdFx0aWYgKGNhY2hlZEF0dHIgPT0gbnVsbCB8fCBjYWNoZWRBdHRyW3J1bGVdICE9PSBkYXRhQXR0cltydWxlXSkge1xyXG5cdFx0XHRcdG5vZGUuc3R5bGVbcnVsZV0gPSBkYXRhQXR0cltydWxlXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChydWxlIGluIGNhY2hlZEF0dHIpIGlmIChoYXNPd24uY2FsbChjYWNoZWRBdHRyLCBydWxlKSkge1xyXG5cdFx0XHRpZiAoIWhhc093bi5jYWxsKGRhdGFBdHRyLCBydWxlKSkgbm9kZS5zdHlsZVtydWxlXSA9IFwiXCJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBzaG91bGRVc2VTZXRBdHRyaWJ1dGUgPSB7XHJcblx0XHRsaXN0OiAxLFxyXG5cdFx0c3R5bGU6IDEsXHJcblx0XHRmb3JtOiAxLFxyXG5cdFx0dHlwZTogMSxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdFx0aGVpZ2h0OiAxXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRTaW5nbGVBdHRyKFxyXG5cdFx0bm9kZSxcclxuXHRcdGF0dHJOYW1lLFxyXG5cdFx0ZGF0YUF0dHIsXHJcblx0XHRjYWNoZWRBdHRyLFxyXG5cdFx0dGFnLFxyXG5cdFx0bmFtZXNwYWNlXHJcblx0KSB7XHJcblx0XHRpZiAoYXR0ck5hbWUgPT09IFwiY29uZmlnXCIgfHwgYXR0ck5hbWUgPT09IFwia2V5XCIpIHtcclxuXHRcdFx0Ly8gYGNvbmZpZ2AgaXNuJ3QgYSByZWFsIGF0dHJpYnV0ZSwgc28gaWdub3JlIGl0XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZGF0YUF0dHIpICYmIGF0dHJOYW1lLnNsaWNlKDAsIDIpID09PSBcIm9uXCIpIHtcclxuXHRcdFx0Ly8gaG9vayBldmVudCBoYW5kbGVycyB0byB0aGUgYXV0by1yZWRyYXdpbmcgc3lzdGVtXHJcblx0XHRcdG5vZGVbYXR0ck5hbWVdID0gYXV0b3JlZHJhdyhkYXRhQXR0ciwgbm9kZSlcclxuXHRcdH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09IFwic3R5bGVcIiAmJiBkYXRhQXR0ciAhPSBudWxsICYmXHJcblx0XHRcdFx0aXNPYmplY3QoZGF0YUF0dHIpKSB7XHJcblx0XHRcdC8vIGhhbmRsZSBgc3R5bGU6IHsuLi59YFxyXG5cdFx0XHRjb3B5U3R5bGVBdHRycyhub2RlLCBkYXRhQXR0ciwgY2FjaGVkQXR0cilcclxuXHRcdH0gZWxzZSBpZiAobmFtZXNwYWNlICE9IG51bGwpIHtcclxuXHRcdFx0Ly8gaGFuZGxlIFNWR1xyXG5cdFx0XHRpZiAoYXR0ck5hbWUgPT09IFwiaHJlZlwiKSB7XHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcclxuXHRcdFx0XHRcdFwiaHJlZlwiLCBkYXRhQXR0cilcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdGF0dHJOYW1lID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDogYXR0ck5hbWUsXHJcblx0XHRcdFx0XHRkYXRhQXR0cilcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhdHRyTmFtZSBpbiBub2RlICYmICFzaG91bGRVc2VTZXRBdHRyaWJ1dGVbYXR0ck5hbWVdKSB7XHJcblx0XHRcdC8vIGhhbmRsZSBjYXNlcyB0aGF0IGFyZSBwcm9wZXJ0aWVzIChidXQgaWdub3JlIGNhc2VzIHdoZXJlIHdlXHJcblx0XHRcdC8vIHNob3VsZCB1c2Ugc2V0QXR0cmlidXRlIGluc3RlYWQpXHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIC0gbGlzdCBhbmQgZm9ybSBhcmUgdHlwaWNhbGx5IHVzZWQgYXMgc3RyaW5ncywgYnV0IGFyZSBET01cclxuXHRcdFx0Ly8gICBlbGVtZW50IHJlZmVyZW5jZXMgaW4ganNcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gLSB3aGVuIHVzaW5nIENTUyBzZWxlY3RvcnMgKGUuZy4gYG0oXCJbc3R5bGU9JyddXCIpYCksIHN0eWxlIGlzXHJcblx0XHRcdC8vICAgdXNlZCBhcyBhIHN0cmluZywgYnV0IGl0J3MgYW4gb2JqZWN0IGluIGpzXHJcblx0XHRcdC8vXHJcblx0XHRcdC8vICMzNDggZG9uJ3Qgc2V0IHRoZSB2YWx1ZSBpZiBub3QgbmVlZGVkIC0gb3RoZXJ3aXNlLCBjdXJzb3JcclxuXHRcdFx0Ly8gcGxhY2VtZW50IGJyZWFrcyBpbiBDaHJvbWVcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAodGFnICE9PSBcImlucHV0XCIgfHwgbm9kZVthdHRyTmFtZV0gIT09IGRhdGFBdHRyKSB7XHJcblx0XHRcdFx0XHRub2RlW2F0dHJOYW1lXSA9IGRhdGFBdHRyXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGRhdGFBdHRyKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBkYXRhQXR0cilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRyeVNldEF0dHIoXHJcblx0XHRub2RlLFxyXG5cdFx0YXR0ck5hbWUsXHJcblx0XHRkYXRhQXR0cixcclxuXHRcdGNhY2hlZEF0dHIsXHJcblx0XHRjYWNoZWRBdHRycyxcclxuXHRcdHRhZyxcclxuXHRcdG5hbWVzcGFjZVxyXG5cdCkge1xyXG5cdFx0aWYgKCEoYXR0ck5hbWUgaW4gY2FjaGVkQXR0cnMpIHx8IChjYWNoZWRBdHRyICE9PSBkYXRhQXR0cikpIHtcclxuXHRcdFx0Y2FjaGVkQXR0cnNbYXR0ck5hbWVdID0gZGF0YUF0dHJcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gc2V0U2luZ2xlQXR0cihcclxuXHRcdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0XHRhdHRyTmFtZSxcclxuXHRcdFx0XHRcdGRhdGFBdHRyLFxyXG5cdFx0XHRcdFx0Y2FjaGVkQXR0cixcclxuXHRcdFx0XHRcdHRhZyxcclxuXHRcdFx0XHRcdG5hbWVzcGFjZSlcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdC8vIHN3YWxsb3cgSUUncyBpbnZhbGlkIGFyZ3VtZW50IGVycm9ycyB0byBtaW1pYyBIVE1MJ3NcclxuXHRcdFx0XHQvLyBmYWxsYmFjay10by1kb2luZy1ub3RoaW5nLW9uLWludmFsaWQtYXR0cmlidXRlcyBiZWhhdmlvclxyXG5cdFx0XHRcdGlmIChlLm1lc3NhZ2UuaW5kZXhPZihcIkludmFsaWQgYXJndW1lbnRcIikgPCAwKSB0aHJvdyBlXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09IFwidmFsdWVcIiAmJiB0YWcgPT09IFwiaW5wdXRcIiAmJlxyXG5cdFx0XHRcdG5vZGUudmFsdWUgIT09IGRhdGFBdHRyKSB7XHJcblx0XHRcdC8vICMzNDggZGF0YUF0dHIgbWF5IG5vdCBiZSBhIHN0cmluZywgc28gdXNlIGxvb3NlIGNvbXBhcmlzb25cclxuXHRcdFx0bm9kZS52YWx1ZSA9IGRhdGFBdHRyXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKG5vZGUsIHRhZywgZGF0YUF0dHJzLCBjYWNoZWRBdHRycywgbmFtZXNwYWNlKSB7XHJcblx0XHRmb3IgKHZhciBhdHRyTmFtZSBpbiBkYXRhQXR0cnMpIGlmIChoYXNPd24uY2FsbChkYXRhQXR0cnMsIGF0dHJOYW1lKSkge1xyXG5cdFx0XHRpZiAodHJ5U2V0QXR0cihcclxuXHRcdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0XHRhdHRyTmFtZSxcclxuXHRcdFx0XHRcdGRhdGFBdHRyc1thdHRyTmFtZV0sXHJcblx0XHRcdFx0XHRjYWNoZWRBdHRyc1thdHRyTmFtZV0sXHJcblx0XHRcdFx0XHRjYWNoZWRBdHRycyxcclxuXHRcdFx0XHRcdHRhZyxcclxuXHRcdFx0XHRcdG5hbWVzcGFjZSkpIHtcclxuXHRcdFx0XHRjb250aW51ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2FjaGVkQXR0cnNcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNsZWFyKG5vZGVzLCBjYWNoZWQpIHtcclxuXHRcdGZvciAodmFyIGkgPSBub2Rlcy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xyXG5cdFx0XHRpZiAobm9kZXNbaV0gJiYgbm9kZXNbaV0ucGFyZW50Tm9kZSkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRub2Rlc1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVzW2ldKVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuXHRcdFx0XHRcdC8vIGlnbm9yZSBpZiB0aGlzIGZhaWxzIGR1ZSB0byBvcmRlciBvZiBldmVudHMgKHNlZVxyXG5cdFx0XHRcdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMTkyNjA4My9mYWlsZWQtdG8tZXhlY3V0ZS1yZW1vdmVjaGlsZC1vbi1ub2RlKVxyXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhY2hlZCA9IFtdLmNvbmNhdChjYWNoZWQpXHJcblx0XHRcdFx0aWYgKGNhY2hlZFtpXSkgdW5sb2FkKGNhY2hlZFtpXSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaWYgbm9kZXMgaXMgYW4gYXJyYXkuIFRoaXMgY2hlY2sgc2hvdWxkIGZhaWwgaWYgbm9kZXNcclxuXHRcdC8vIGlzIGEgTm9kZUxpc3QgKHNlZSBsb29wIGFib3ZlKVxyXG5cdFx0aWYgKG5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRub2Rlcy5sZW5ndGggPSAwXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB1bmxvYWQoY2FjaGVkKSB7XHJcblx0XHRpZiAoY2FjaGVkLmNvbmZpZ0NvbnRleHQgJiYgaXNGdW5jdGlvbihjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCkpIHtcclxuXHRcdFx0Y2FjaGVkLmNvbmZpZ0NvbnRleHQub251bmxvYWQoKVxyXG5cdFx0XHRjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCA9IG51bGxcclxuXHRcdH1cclxuXHRcdGlmIChjYWNoZWQuY29udHJvbGxlcnMpIHtcclxuXHRcdFx0Zm9yRWFjaChjYWNoZWQuY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0XHRcdFx0aWYgKGlzRnVuY3Rpb24oY29udHJvbGxlci5vbnVubG9hZCkpIHtcclxuXHRcdFx0XHRcdGNvbnRyb2xsZXIub251bmxvYWQoe3ByZXZlbnREZWZhdWx0OiBub29wfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRpZiAoY2FjaGVkLmNoaWxkcmVuKSB7XHJcblx0XHRcdGlmIChpc0FycmF5KGNhY2hlZC5jaGlsZHJlbikpIGZvckVhY2goY2FjaGVkLmNoaWxkcmVuLCB1bmxvYWQpXHJcblx0XHRcdGVsc2UgaWYgKGNhY2hlZC5jaGlsZHJlbi50YWcpIHVubG9hZChjYWNoZWQuY2hpbGRyZW4pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhcHBlbmRUZXh0RnJhZ21lbnQocGFyZW50RWxlbWVudCwgZGF0YSkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChcclxuXHRcdFx0XHQkZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoZGF0YSkpXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHBhcmVudEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGRhdGEpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpbmplY3RIVE1MKHBhcmVudEVsZW1lbnQsIGluZGV4LCBkYXRhKSB7XHJcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdXHJcblx0XHRpZiAobmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0dmFyIGlzRWxlbWVudCA9IG5leHRTaWJsaW5nLm5vZGVUeXBlICE9PSAxXHJcblx0XHRcdHZhciBwbGFjZWhvbGRlciA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG5cdFx0XHRpZiAoaXNFbGVtZW50KSB7XHJcblx0XHRcdFx0cGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIG5leHRTaWJsaW5nIHx8IG51bGwpXHJcblx0XHRcdFx0cGxhY2Vob2xkZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlYmVnaW5cIiwgZGF0YSlcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHBsYWNlaG9sZGVyKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5leHRTaWJsaW5nLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGRhdGEpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFwcGVuZFRleHRGcmFnbWVudChwYXJlbnRFbGVtZW50LCBkYXRhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBub2RlcyA9IFtdXHJcblxyXG5cdFx0d2hpbGUgKHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF0gIT09IG5leHRTaWJsaW5nKSB7XHJcblx0XHRcdG5vZGVzLnB1c2gocGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSlcclxuXHRcdFx0aW5kZXgrK1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBub2Rlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXV0b3JlZHJhdyhjYWxsYmFjaywgb2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZSA9IGUgfHwgZXZlbnRcclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJkaWZmXCIpXHJcblx0XHRcdG0uc3RhcnRDb21wdXRhdGlvbigpXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwob2JqZWN0LCBlKVxyXG5cdFx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRcdGVuZEZpcnN0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaHRtbFxyXG5cdHZhciBkb2N1bWVudE5vZGUgPSB7XHJcblx0XHRhcHBlbmRDaGlsZDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0aWYgKGh0bWwgPT09IHVuZGVmaW5lZCkgaHRtbCA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHRtbFwiKVxyXG5cdFx0XHRpZiAoJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxyXG5cdFx0XHRcdFx0JGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdCRkb2N1bWVudC5yZXBsYWNlQ2hpbGQobm9kZSwgJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkZG9jdW1lbnQuYXBwZW5kQ2hpbGQobm9kZSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5jaGlsZE5vZGVzID0gJGRvY3VtZW50LmNoaWxkTm9kZXNcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0XHR0aGlzLmFwcGVuZENoaWxkKG5vZGUpXHJcblx0XHR9LFxyXG5cclxuXHRcdGNoaWxkTm9kZXM6IFtdXHJcblx0fVxyXG5cclxuXHR2YXIgbm9kZUNhY2hlID0gW11cclxuXHR2YXIgY2VsbENhY2hlID0ge31cclxuXHJcblx0bS5yZW5kZXIgPSBmdW5jdGlvbiAocm9vdCwgY2VsbCwgZm9yY2VSZWNyZWF0aW9uKSB7XHJcblx0XHRpZiAoIXJvb3QpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCBiZWluZyBwYXNzZWQgdG8gXCIgK1xyXG5cdFx0XHRcdFwibS5yb3V0ZS9tLm1vdW50L20ucmVuZGVyIGlzIG5vdCB1bmRlZmluZWQuXCIpXHJcblx0XHR9XHJcblx0XHR2YXIgY29uZmlncyA9IFtdXHJcblx0XHR2YXIgaWQgPSBnZXRDZWxsQ2FjaGVLZXkocm9vdClcclxuXHRcdHZhciBpc0RvY3VtZW50Um9vdCA9IHJvb3QgPT09ICRkb2N1bWVudFxyXG5cdFx0dmFyIG5vZGVcclxuXHJcblx0XHRpZiAoaXNEb2N1bWVudFJvb3QgfHwgcm9vdCA9PT0gJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG5cdFx0XHRub2RlID0gZG9jdW1lbnROb2RlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlID0gcm9vdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc0RvY3VtZW50Um9vdCAmJiBjZWxsLnRhZyAhPT0gXCJodG1sXCIpIHtcclxuXHRcdFx0Y2VsbCA9IHt0YWc6IFwiaHRtbFwiLCBhdHRyczoge30sIGNoaWxkcmVuOiBjZWxsfVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjZWxsQ2FjaGVbaWRdID09PSB1bmRlZmluZWQpIGNsZWFyKG5vZGUuY2hpbGROb2RlcylcclxuXHRcdGlmIChmb3JjZVJlY3JlYXRpb24gPT09IHRydWUpIHJlc2V0KHJvb3QpXHJcblxyXG5cdFx0Y2VsbENhY2hlW2lkXSA9IGJ1aWxkKFxyXG5cdFx0XHRub2RlLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0Y2VsbCxcclxuXHRcdFx0Y2VsbENhY2hlW2lkXSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdDAsXHJcblx0XHRcdG51bGwsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0Y29uZmlncylcclxuXHJcblx0XHRmb3JFYWNoKGNvbmZpZ3MsIGZ1bmN0aW9uIChjb25maWcpIHsgY29uZmlnKCkgfSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldENlbGxDYWNoZUtleShlbGVtZW50KSB7XHJcblx0XHR2YXIgaW5kZXggPSBub2RlQ2FjaGUuaW5kZXhPZihlbGVtZW50KVxyXG5cdFx0cmV0dXJuIGluZGV4IDwgMCA/IG5vZGVDYWNoZS5wdXNoKGVsZW1lbnQpIC0gMSA6IGluZGV4XHJcblx0fVxyXG5cclxuXHRtLnRydXN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IG5ldyBTdHJpbmcodmFsdWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXHJcblx0XHR2YWx1ZS4kdHJ1c3RlZCA9IHRydWVcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0dGVyc2V0dGVyKHN0b3JlKSB7XHJcblx0XHRmdW5jdGlvbiBwcm9wKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCkgc3RvcmUgPSBhcmd1bWVudHNbMF1cclxuXHRcdFx0cmV0dXJuIHN0b3JlXHJcblx0XHR9XHJcblxyXG5cdFx0cHJvcC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBzdG9yZVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9wXHJcblx0fVxyXG5cclxuXHRtLnByb3AgPSBmdW5jdGlvbiAoc3RvcmUpIHtcclxuXHRcdGlmICgoc3RvcmUgIT0gbnVsbCAmJiBpc09iamVjdChzdG9yZSkgfHwgaXNGdW5jdGlvbihzdG9yZSkpICYmXHJcblx0XHRcdFx0aXNGdW5jdGlvbihzdG9yZS50aGVuKSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGlmeShzdG9yZSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZ2V0dGVyc2V0dGVyKHN0b3JlKVxyXG5cdH1cclxuXHJcblx0dmFyIHJvb3RzID0gW11cclxuXHR2YXIgY29tcG9uZW50cyA9IFtdXHJcblx0dmFyIGNvbnRyb2xsZXJzID0gW11cclxuXHR2YXIgbGFzdFJlZHJhd0lkID0gbnVsbFxyXG5cdHZhciBsYXN0UmVkcmF3Q2FsbFRpbWUgPSAwXHJcblx0dmFyIGNvbXB1dGVQcmVSZWRyYXdIb29rID0gbnVsbFxyXG5cdHZhciBjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBudWxsXHJcblx0dmFyIHRvcENvbXBvbmVudFxyXG5cdHZhciBGUkFNRV9CVURHRVQgPSAxNiAvLyA2MCBmcmFtZXMgcGVyIHNlY29uZCA9IDEgY2FsbCBwZXIgMTYgbXNcclxuXHJcblx0ZnVuY3Rpb24gcGFyYW1ldGVyaXplKGNvbXBvbmVudCwgYXJncykge1xyXG5cdFx0ZnVuY3Rpb24gY29udHJvbGxlcigpIHtcclxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHRcdHJldHVybiAoY29tcG9uZW50LmNvbnRyb2xsZXIgfHwgbm9vcCkuYXBwbHkodGhpcywgYXJncykgfHwgdGhpc1xyXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuY29udHJvbGxlcikge1xyXG5cdFx0XHRjb250cm9sbGVyLnByb3RvdHlwZSA9IGNvbXBvbmVudC5jb250cm9sbGVyLnByb3RvdHlwZVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHZpZXcoY3RybCkge1xyXG5cdFx0XHR2YXIgY3VycmVudEFyZ3MgPSBbY3RybF0uY29uY2F0KGFyZ3MpXHJcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Y3VycmVudEFyZ3MucHVzaChhcmd1bWVudHNbaV0pXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjb21wb25lbnQudmlldy5hcHBseShjb21wb25lbnQsIGN1cnJlbnRBcmdzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZpZXcuJG9yaWdpbmFsID0gY29tcG9uZW50LnZpZXdcclxuXHRcdHZhciBvdXRwdXQgPSB7Y29udHJvbGxlcjogY29udHJvbGxlciwgdmlldzogdmlld31cclxuXHRcdGlmIChhcmdzWzBdICYmIGFyZ3NbMF0ua2V5ICE9IG51bGwpIG91dHB1dC5hdHRycyA9IHtrZXk6IGFyZ3NbMF0ua2V5fVxyXG5cdFx0cmV0dXJuIG91dHB1dFxyXG5cdH1cclxuXHJcblx0bS5jb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG5cclxuXHRcdHJldHVybiBwYXJhbWV0ZXJpemUoY29tcG9uZW50LCBhcmdzKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2hlY2tQcmV2ZW50ZWQoY29tcG9uZW50LCByb290LCBpbmRleCwgaXNQcmV2ZW50ZWQpIHtcclxuXHRcdGlmICghaXNQcmV2ZW50ZWQpIHtcclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJhbGxcIilcclxuXHRcdFx0bS5zdGFydENvbXB1dGF0aW9uKClcclxuXHRcdFx0cm9vdHNbaW5kZXhdID0gcm9vdFxyXG5cdFx0XHR2YXIgY3VycmVudENvbXBvbmVudFxyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdGN1cnJlbnRDb21wb25lbnQgPSB0b3BDb21wb25lbnQgPSBjb21wb25lbnRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50Q29tcG9uZW50ID0gdG9wQ29tcG9uZW50ID0gY29tcG9uZW50ID0ge2NvbnRyb2xsZXI6IG5vb3B9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IChjb21wb25lbnQuY29udHJvbGxlciB8fCBub29wKSgpXHJcblxyXG5cdFx0XHQvLyBjb250cm9sbGVycyBtYXkgY2FsbCBtLm1vdW50IHJlY3Vyc2l2ZWx5ICh2aWEgbS5yb3V0ZSByZWRpcmVjdHMsXHJcblx0XHRcdC8vIGZvciBleGFtcGxlKVxyXG5cdFx0XHQvLyB0aGlzIGNvbmRpdGlvbmFsIGVuc3VyZXMgb25seSB0aGUgbGFzdCByZWN1cnNpdmUgbS5tb3VudCBjYWxsIGlzXHJcblx0XHRcdC8vIGFwcGxpZWRcclxuXHRcdFx0aWYgKGN1cnJlbnRDb21wb25lbnQgPT09IHRvcENvbXBvbmVudCkge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXJzW2luZGV4XSA9IGNvbnRyb2xsZXJcclxuXHRcdFx0XHRjb21wb25lbnRzW2luZGV4XSA9IGNvbXBvbmVudFxyXG5cdFx0XHR9XHJcblx0XHRcdGVuZEZpcnN0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHRpZiAoY29tcG9uZW50ID09PSBudWxsKSB7XHJcblx0XHRcdFx0cmVtb3ZlUm9vdEVsZW1lbnQocm9vdCwgaW5kZXgpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGNvbnRyb2xsZXJzW2luZGV4XVxyXG5cdFx0fSBlbHNlIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZW1vdmVSb290RWxlbWVudChyb290LCBpbmRleClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ubW91bnQgPSBtLm1vZHVsZSA9IGZ1bmN0aW9uIChyb290LCBjb21wb25lbnQpIHtcclxuXHRcdGlmICghcm9vdCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZW5zdXJlIHRoZSBET00gZWxlbWVudCBleGlzdHMgYmVmb3JlIFwiICtcclxuXHRcdFx0XHRcInJlbmRlcmluZyBhIHRlbXBsYXRlIGludG8gaXQuXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGluZGV4ID0gcm9vdHMuaW5kZXhPZihyb290KVxyXG5cdFx0aWYgKGluZGV4IDwgMCkgaW5kZXggPSByb290cy5sZW5ndGhcclxuXHJcblx0XHR2YXIgaXNQcmV2ZW50ZWQgPSBmYWxzZVxyXG5cdFx0dmFyIGV2ZW50ID0ge1xyXG5cdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlzUHJldmVudGVkID0gdHJ1ZVxyXG5cdFx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rID0gY29tcHV0ZVBvc3RSZWRyYXdIb29rID0gbnVsbFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yRWFjaCh1bmxvYWRlcnMsIGZ1bmN0aW9uICh1bmxvYWRlcikge1xyXG5cdFx0XHR1bmxvYWRlci5oYW5kbGVyLmNhbGwodW5sb2FkZXIuY29udHJvbGxlciwgZXZlbnQpXHJcblx0XHRcdHVubG9hZGVyLmNvbnRyb2xsZXIub251bmxvYWQgPSBudWxsXHJcblx0XHR9KVxyXG5cclxuXHRcdGlmIChpc1ByZXZlbnRlZCkge1xyXG5cdFx0XHRmb3JFYWNoKHVubG9hZGVycywgZnVuY3Rpb24gKHVubG9hZGVyKSB7XHJcblx0XHRcdFx0dW5sb2FkZXIuY29udHJvbGxlci5vbnVubG9hZCA9IHVubG9hZGVyLmhhbmRsZXJcclxuXHRcdFx0fSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHVubG9hZGVycyA9IFtdXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbnRyb2xsZXJzW2luZGV4XSAmJiBpc0Z1bmN0aW9uKGNvbnRyb2xsZXJzW2luZGV4XS5vbnVubG9hZCkpIHtcclxuXHRcdFx0Y29udHJvbGxlcnNbaW5kZXhdLm9udW5sb2FkKGV2ZW50KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja1ByZXZlbnRlZChjb21wb25lbnQsIHJvb3QsIGluZGV4LCBpc1ByZXZlbnRlZClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlbW92ZVJvb3RFbGVtZW50KHJvb3QsIGluZGV4KSB7XHJcblx0XHRyb290cy5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRjb250cm9sbGVycy5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRjb21wb25lbnRzLnNwbGljZShpbmRleCwgMSlcclxuXHRcdHJlc2V0KHJvb3QpXHJcblx0XHRub2RlQ2FjaGUuc3BsaWNlKGdldENlbGxDYWNoZUtleShyb290KSwgMSlcclxuXHR9XHJcblxyXG5cdHZhciByZWRyYXdpbmcgPSBmYWxzZVxyXG5cdG0ucmVkcmF3ID0gZnVuY3Rpb24gKGZvcmNlKSB7XHJcblx0XHRpZiAocmVkcmF3aW5nKSByZXR1cm5cclxuXHRcdHJlZHJhd2luZyA9IHRydWVcclxuXHRcdGlmIChmb3JjZSkgZm9yY2luZyA9IHRydWVcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBsYXN0UmVkcmF3SWQgaXMgYSBwb3NpdGl2ZSBudW1iZXIgaWYgYSBzZWNvbmQgcmVkcmF3IGlzIHJlcXVlc3RlZFxyXG5cdFx0XHQvLyBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXHJcblx0XHRcdC8vIGxhc3RSZWRyYXdJRCBpcyBudWxsIGlmIGl0J3MgdGhlIGZpcnN0IHJlZHJhdyBhbmQgbm90IGFuIGV2ZW50XHJcblx0XHRcdC8vIGhhbmRsZXJcclxuXHRcdFx0aWYgKGxhc3RSZWRyYXdJZCAmJiAhZm9yY2UpIHtcclxuXHRcdFx0XHQvLyB3aGVuIHNldFRpbWVvdXQ6IG9ubHkgcmVzY2hlZHVsZSByZWRyYXcgaWYgdGltZSBiZXR3ZWVuIG5vd1xyXG5cdFx0XHRcdC8vIGFuZCBwcmV2aW91cyByZWRyYXcgaXMgYmlnZ2VyIHRoYW4gYSBmcmFtZSwgb3RoZXJ3aXNlIGtlZXBcclxuXHRcdFx0XHQvLyBjdXJyZW50bHkgc2NoZWR1bGVkIHRpbWVvdXRcclxuXHRcdFx0XHQvLyB3aGVuIHJBRjogYWx3YXlzIHJlc2NoZWR1bGUgcmVkcmF3XHJcblx0XHRcdFx0aWYgKCRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRcdFx0XHRcdFx0bmV3IERhdGUoKSAtIGxhc3RSZWRyYXdDYWxsVGltZSA+IEZSQU1FX0JVREdFVCkge1xyXG5cdFx0XHRcdFx0aWYgKGxhc3RSZWRyYXdJZCA+IDApICRjYW5jZWxBbmltYXRpb25GcmFtZShsYXN0UmVkcmF3SWQpXHJcblx0XHRcdFx0XHRsYXN0UmVkcmF3SWQgPSAkcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlZHJhdywgRlJBTUVfQlVER0VUKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWRyYXcoKVxyXG5cdFx0XHRcdGxhc3RSZWRyYXdJZCA9ICRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0bGFzdFJlZHJhd0lkID0gbnVsbFxyXG5cdFx0XHRcdH0sIEZSQU1FX0JVREdFVClcclxuXHRcdFx0fVxyXG5cdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0cmVkcmF3aW5nID0gZm9yY2luZyA9IGZhbHNlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLnJlZHJhdy5zdHJhdGVneSA9IG0ucHJvcCgpXHJcblx0ZnVuY3Rpb24gcmVkcmF3KCkge1xyXG5cdFx0aWYgKGNvbXB1dGVQcmVSZWRyYXdIb29rKSB7XHJcblx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rKClcclxuXHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2sgPSBudWxsXHJcblx0XHR9XHJcblx0XHRmb3JFYWNoKHJvb3RzLCBmdW5jdGlvbiAocm9vdCwgaSkge1xyXG5cdFx0XHR2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1tpXVxyXG5cdFx0XHRpZiAoY29udHJvbGxlcnNbaV0pIHtcclxuXHRcdFx0XHR2YXIgYXJncyA9IFtjb250cm9sbGVyc1tpXV1cclxuXHRcdFx0XHRtLnJlbmRlcihyb290LFxyXG5cdFx0XHRcdFx0Y29tcG9uZW50LnZpZXcgPyBjb21wb25lbnQudmlldyhjb250cm9sbGVyc1tpXSwgYXJncykgOiBcIlwiKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Ly8gYWZ0ZXIgcmVuZGVyaW5nIHdpdGhpbiBhIHJvdXRlZCBjb250ZXh0LCB3ZSBuZWVkIHRvIHNjcm9sbCBiYWNrIHRvXHJcblx0XHQvLyB0aGUgdG9wLCBhbmQgZmV0Y2ggdGhlIGRvY3VtZW50IHRpdGxlIGZvciBoaXN0b3J5LnB1c2hTdGF0ZVxyXG5cdFx0aWYgKGNvbXB1dGVQb3N0UmVkcmF3SG9vaykge1xyXG5cdFx0XHRjb21wdXRlUG9zdFJlZHJhd0hvb2soKVxyXG5cdFx0XHRjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBudWxsXHJcblx0XHR9XHJcblx0XHRsYXN0UmVkcmF3SWQgPSBudWxsXHJcblx0XHRsYXN0UmVkcmF3Q2FsbFRpbWUgPSBuZXcgRGF0ZSgpXHJcblx0XHRtLnJlZHJhdy5zdHJhdGVneShcImRpZmZcIilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGVuZEZpcnN0Q29tcHV0YXRpb24oKSB7XHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJub25lXCIpIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzLS1cclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJkaWZmXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtLmVuZENvbXB1dGF0aW9uKClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ud2l0aEF0dHIgPSBmdW5jdGlvbiAocHJvcCwgd2l0aEF0dHJDYWxsYmFjaywgY2FsbGJhY2tUaGlzKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZSA9IGUgfHwgZXZlbnRcclxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHRcdHZhciBjdXJyZW50VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0IHx8IHRoaXNcclxuXHRcdFx0dmFyIF90aGlzID0gY2FsbGJhY2tUaGlzIHx8IHRoaXNcclxuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHRcdFx0dmFyIHRhcmdldCA9IHByb3AgaW4gY3VycmVudFRhcmdldCA/XHJcblx0XHRcdFx0Y3VycmVudFRhcmdldFtwcm9wXSA6XHJcblx0XHRcdFx0Y3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUocHJvcClcclxuXHRcdFx0d2l0aEF0dHJDYWxsYmFjay5jYWxsKF90aGlzLCB0YXJnZXQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyByb3V0aW5nXHJcblx0dmFyIG1vZGVzID0ge3BhdGhuYW1lOiBcIlwiLCBoYXNoOiBcIiNcIiwgc2VhcmNoOiBcIj9cIn1cclxuXHR2YXIgcmVkaXJlY3QgPSBub29wXHJcblx0dmFyIGlzRGVmYXVsdFJvdXRlID0gZmFsc2VcclxuXHR2YXIgcm91dGVQYXJhbXMsIGN1cnJlbnRSb3V0ZVxyXG5cclxuXHRtLnJvdXRlID0gZnVuY3Rpb24gKHJvb3QsIGFyZzEsIGFyZzIsIHZkb20pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cdFx0Ly8gbS5yb3V0ZSgpXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGN1cnJlbnRSb3V0ZVxyXG5cdFx0Ly8gbS5yb3V0ZShlbCwgZGVmYXVsdFJvdXRlLCByb3V0ZXMpXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiBpc1N0cmluZyhhcmcxKSkge1xyXG5cdFx0XHRyZWRpcmVjdCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuXHRcdFx0XHR2YXIgcGF0aCA9IGN1cnJlbnRSb3V0ZSA9IG5vcm1hbGl6ZVJvdXRlKHNvdXJjZSlcclxuXHRcdFx0XHRpZiAoIXJvdXRlQnlWYWx1ZShyb290LCBhcmcyLCBwYXRoKSkge1xyXG5cdFx0XHRcdFx0aWYgKGlzRGVmYXVsdFJvdXRlKSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkVuc3VyZSB0aGUgZGVmYXVsdCByb3V0ZSBtYXRjaGVzIFwiICtcclxuXHRcdFx0XHRcdFx0XHRcIm9uZSBvZiB0aGUgcm91dGVzIGRlZmluZWQgaW4gbS5yb3V0ZVwiKVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlzRGVmYXVsdFJvdXRlID0gdHJ1ZVxyXG5cdFx0XHRcdFx0bS5yb3V0ZShhcmcxLCB0cnVlKVxyXG5cdFx0XHRcdFx0aXNEZWZhdWx0Um91dGUgPSBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGxpc3RlbmVyID0gbS5yb3V0ZS5tb2RlID09PSBcImhhc2hcIiA/XHJcblx0XHRcdFx0XCJvbmhhc2hjaGFuZ2VcIiA6XHJcblx0XHRcdFx0XCJvbnBvcHN0YXRlXCJcclxuXHJcblx0XHRcdGdsb2JhbFtsaXN0ZW5lcl0gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIHBhdGggPSAkbG9jYXRpb25bbS5yb3V0ZS5tb2RlXVxyXG5cdFx0XHRcdGlmIChtLnJvdXRlLm1vZGUgPT09IFwicGF0aG5hbWVcIikgcGF0aCArPSAkbG9jYXRpb24uc2VhcmNoXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRSb3V0ZSAhPT0gbm9ybWFsaXplUm91dGUocGF0aCkpIHJlZGlyZWN0KHBhdGgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rID0gc2V0U2Nyb2xsXHJcblx0XHRcdGdsb2JhbFtsaXN0ZW5lcl0oKVxyXG5cclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY29uZmlnOiBtLnJvdXRlXHJcblx0XHRpZiAocm9vdC5hZGRFdmVudExpc3RlbmVyIHx8IHJvb3QuYXR0YWNoRXZlbnQpIHtcclxuXHRcdFx0dmFyIGJhc2UgPSBtLnJvdXRlLm1vZGUgIT09IFwicGF0aG5hbWVcIiA/ICRsb2NhdGlvbi5wYXRobmFtZSA6IFwiXCJcclxuXHRcdFx0cm9vdC5ocmVmID0gYmFzZSArIG1vZGVzW20ucm91dGUubW9kZV0gKyB2ZG9tLmF0dHJzLmhyZWZcclxuXHRcdFx0aWYgKHJvb3QuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cdFx0XHRcdHJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdXRlVW5vYnRydXNpdmUpXHJcblx0XHRcdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcm91dGVVbm9idHJ1c2l2ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyb290LmRldGFjaEV2ZW50KFwib25jbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHRcdHJvb3QuYXR0YWNoRXZlbnQoXCJvbmNsaWNrXCIsIHJvdXRlVW5vYnRydXNpdmUpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0Ly8gbS5yb3V0ZShyb3V0ZSwgcGFyYW1zLCBzaG91bGRSZXBsYWNlSGlzdG9yeUVudHJ5KVxyXG5cdFx0aWYgKGlzU3RyaW5nKHJvb3QpKSB7XHJcblx0XHRcdHZhciBvbGRSb3V0ZSA9IGN1cnJlbnRSb3V0ZVxyXG5cdFx0XHRjdXJyZW50Um91dGUgPSByb290XHJcblxyXG5cdFx0XHR2YXIgYXJncyA9IGFyZzEgfHwge31cclxuXHRcdFx0dmFyIHF1ZXJ5SW5kZXggPSBjdXJyZW50Um91dGUuaW5kZXhPZihcIj9cIilcclxuXHRcdFx0dmFyIHBhcmFtc1xyXG5cclxuXHRcdFx0aWYgKHF1ZXJ5SW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdHBhcmFtcyA9IHBhcnNlUXVlcnlTdHJpbmcoY3VycmVudFJvdXRlLnNsaWNlKHF1ZXJ5SW5kZXggKyAxKSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwYXJhbXMgPSB7fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpIGluIGFyZ3MpIGlmIChoYXNPd24uY2FsbChhcmdzLCBpKSkge1xyXG5cdFx0XHRcdHBhcmFtc1tpXSA9IGFyZ3NbaV1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHF1ZXJ5c3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZyhwYXJhbXMpXHJcblx0XHRcdHZhciBjdXJyZW50UGF0aFxyXG5cclxuXHRcdFx0aWYgKHF1ZXJ5SW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdGN1cnJlbnRQYXRoID0gY3VycmVudFJvdXRlLnNsaWNlKDAsIHF1ZXJ5SW5kZXgpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y3VycmVudFBhdGggPSBjdXJyZW50Um91dGVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHF1ZXJ5c3RyaW5nKSB7XHJcblx0XHRcdFx0Y3VycmVudFJvdXRlID0gY3VycmVudFBhdGggK1xyXG5cdFx0XHRcdFx0KGN1cnJlbnRQYXRoLmluZGV4T2YoXCI/XCIpID09PSAtMSA/IFwiP1wiIDogXCImXCIpICtcclxuXHRcdFx0XHRcdHF1ZXJ5c3RyaW5nXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZXBsYWNlSGlzdG9yeSA9XHJcblx0XHRcdFx0KGFyZ3VtZW50cy5sZW5ndGggPT09IDMgPyBhcmcyIDogYXJnMSkgPT09IHRydWUgfHxcclxuXHRcdFx0XHRvbGRSb3V0ZSA9PT0gcm9vdFxyXG5cclxuXHRcdFx0aWYgKGdsb2JhbC5oaXN0b3J5LnB1c2hTdGF0ZSkge1xyXG5cdFx0XHRcdHZhciBtZXRob2QgPSByZXBsYWNlSGlzdG9yeSA/IFwicmVwbGFjZVN0YXRlXCIgOiBcInB1c2hTdGF0ZVwiXHJcblx0XHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2sgPSBzZXRTY3JvbGxcclxuXHRcdFx0XHRjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRnbG9iYWwuaGlzdG9yeVttZXRob2RdKG51bGwsICRkb2N1bWVudC50aXRsZSxcclxuXHRcdFx0XHRcdFx0bW9kZXNbbS5yb3V0ZS5tb2RlXSArIGN1cnJlbnRSb3V0ZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVkaXJlY3QobW9kZXNbbS5yb3V0ZS5tb2RlXSArIGN1cnJlbnRSb3V0ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkbG9jYXRpb25bbS5yb3V0ZS5tb2RlXSA9IGN1cnJlbnRSb3V0ZVxyXG5cdFx0XHRcdHJlZGlyZWN0KG1vZGVzW20ucm91dGUubW9kZV0gKyBjdXJyZW50Um91dGUpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ucm91dGUucGFyYW0gPSBmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRpZiAoIXJvdXRlUGFyYW1zKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IGNhbGwgbS5yb3V0ZShlbGVtZW50LCBkZWZhdWx0Um91dGUsIFwiICtcclxuXHRcdFx0XHRcInJvdXRlcykgYmVmb3JlIGNhbGxpbmcgbS5yb3V0ZS5wYXJhbSgpXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFrZXkpIHtcclxuXHRcdFx0cmV0dXJuIHJvdXRlUGFyYW1zXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJvdXRlUGFyYW1zW2tleV1cclxuXHR9XHJcblxyXG5cdG0ucm91dGUubW9kZSA9IFwic2VhcmNoXCJcclxuXHJcblx0ZnVuY3Rpb24gbm9ybWFsaXplUm91dGUocm91dGUpIHtcclxuXHRcdHJldHVybiByb3V0ZS5zbGljZShtb2Rlc1ttLnJvdXRlLm1vZGVdLmxlbmd0aClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJvdXRlQnlWYWx1ZShyb290LCByb3V0ZXIsIHBhdGgpIHtcclxuXHRcdHJvdXRlUGFyYW1zID0ge31cclxuXHJcblx0XHR2YXIgcXVlcnlTdGFydCA9IHBhdGguaW5kZXhPZihcIj9cIilcclxuXHRcdGlmIChxdWVyeVN0YXJ0ICE9PSAtMSkge1xyXG5cdFx0XHRyb3V0ZVBhcmFtcyA9IHBhcnNlUXVlcnlTdHJpbmcoXHJcblx0XHRcdFx0cGF0aC5zdWJzdHIocXVlcnlTdGFydCArIDEsIHBhdGgubGVuZ3RoKSlcclxuXHRcdFx0cGF0aCA9IHBhdGguc3Vic3RyKDAsIHF1ZXJ5U3RhcnQpXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gR2V0IGFsbCByb3V0ZXMgYW5kIGNoZWNrIGlmIHRoZXJlJ3NcclxuXHRcdC8vIGFuIGV4YWN0IG1hdGNoIGZvciB0aGUgY3VycmVudCBwYXRoXHJcblx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJvdXRlcilcclxuXHRcdHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihwYXRoKVxyXG5cclxuXHRcdGlmIChpbmRleCAhPT0gLTEpe1xyXG5cdFx0XHRtLm1vdW50KHJvb3QsIHJvdXRlcltrZXlzIFtpbmRleF1dKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIHJvdXRlIGluIHJvdXRlcikgaWYgKGhhc093bi5jYWxsKHJvdXRlciwgcm91dGUpKSB7XHJcblx0XHRcdGlmIChyb3V0ZSA9PT0gcGF0aCkge1xyXG5cdFx0XHRcdG0ubW91bnQocm9vdCwgcm91dGVyW3JvdXRlXSlcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbWF0Y2hlciA9IG5ldyBSZWdFeHAoXCJeXCIgKyByb3V0ZVxyXG5cdFx0XHRcdC5yZXBsYWNlKC86W15cXC9dKz9cXC57M30vZywgXCIoLio/KVwiKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC86W15cXC9dKy9nLCBcIihbXlxcXFwvXSspXCIpICsgXCJcXC8/JFwiKVxyXG5cclxuXHRcdFx0aWYgKG1hdGNoZXIudGVzdChwYXRoKSkge1xyXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRcdHBhdGgucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR2YXIga2V5cyA9IHJvdXRlLm1hdGNoKC86W15cXC9dKy9nKSB8fCBbXVxyXG5cdFx0XHRcdFx0dmFyIHZhbHVlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxLCAtMilcclxuXHRcdFx0XHRcdGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSwgaSkge1xyXG5cdFx0XHRcdFx0XHRyb3V0ZVBhcmFtc1trZXkucmVwbGFjZSgvOnxcXC4vZywgXCJcIildID1cclxuXHRcdFx0XHRcdFx0XHRkZWNvZGVVUklDb21wb25lbnQodmFsdWVzW2ldKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdG0ubW91bnQocm9vdCwgcm91dGVyW3JvdXRlXSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcm91dGVVbm9idHJ1c2l2ZShlKSB7XHJcblx0XHRlID0gZSB8fCBldmVudFxyXG5cdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSB8fCBlLndoaWNoID09PSAyKSByZXR1cm5cclxuXHJcblx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjdXJyZW50VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0IHx8IGUuc3JjRWxlbWVudFxyXG5cdFx0dmFyIGFyZ3NcclxuXHJcblx0XHRpZiAobS5yb3V0ZS5tb2RlID09PSBcInBhdGhuYW1lXCIgJiYgY3VycmVudFRhcmdldC5zZWFyY2gpIHtcclxuXHRcdFx0YXJncyA9IHBhcnNlUXVlcnlTdHJpbmcoY3VycmVudFRhcmdldC5zZWFyY2guc2xpY2UoMSkpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhcmdzID0ge31cclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZSAoY3VycmVudFRhcmdldCAmJiAhL2EvaS50ZXN0KGN1cnJlbnRUYXJnZXQubm9kZU5hbWUpKSB7XHJcblx0XHRcdGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0LnBhcmVudE5vZGVcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjbGVhciBwZW5kaW5nUmVxdWVzdHMgYmVjYXVzZSB3ZSB3YW50IGFuIGltbWVkaWF0ZSByb3V0ZSBjaGFuZ2VcclxuXHRcdHBlbmRpbmdSZXF1ZXN0cyA9IDBcclxuXHRcdG0ucm91dGUoY3VycmVudFRhcmdldFttLnJvdXRlLm1vZGVdXHJcblx0XHRcdC5zbGljZShtb2Rlc1ttLnJvdXRlLm1vZGVdLmxlbmd0aCksIGFyZ3MpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRTY3JvbGwoKSB7XHJcblx0XHRpZiAobS5yb3V0ZS5tb2RlICE9PSBcImhhc2hcIiAmJiAkbG9jYXRpb24uaGFzaCkge1xyXG5cdFx0XHQkbG9jYXRpb24uaGFzaCA9ICRsb2NhdGlvbi5oYXNoXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwuc2Nyb2xsVG8oMCwgMClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkUXVlcnlTdHJpbmcob2JqZWN0LCBwcmVmaXgpIHtcclxuXHRcdHZhciBkdXBsaWNhdGVzID0ge31cclxuXHRcdHZhciBzdHIgPSBbXVxyXG5cclxuXHRcdGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSBpZiAoaGFzT3duLmNhbGwob2JqZWN0LCBwcm9wKSkge1xyXG5cdFx0XHR2YXIga2V5ID0gcHJlZml4ID8gcHJlZml4ICsgXCJbXCIgKyBwcm9wICsgXCJdXCIgOiBwcm9wXHJcblx0XHRcdHZhciB2YWx1ZSA9IG9iamVjdFtwcm9wXVxyXG5cclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0c3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpXHJcblx0XHRcdH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcblx0XHRcdFx0c3RyLnB1c2goYnVpbGRRdWVyeVN0cmluZyh2YWx1ZSwga2V5KSlcclxuXHRcdFx0fSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xyXG5cdFx0XHRcdHZhciBrZXlzID0gW11cclxuXHRcdFx0XHRkdXBsaWNhdGVzW2tleV0gPSBkdXBsaWNhdGVzW2tleV0gfHwge31cclxuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0XHRmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0XHRcdGlmICghZHVwbGljYXRlc1trZXldW2l0ZW1dKSB7XHJcblx0XHRcdFx0XHRcdGR1cGxpY2F0ZXNba2V5XVtpdGVtXSA9IHRydWVcclxuXHRcdFx0XHRcdFx0a2V5cy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgK1xyXG5cdFx0XHRcdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudChpdGVtKSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHN0ci5wdXNoKGtleXMuam9pbihcIiZcIikpXHJcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgK1xyXG5cdFx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0ci5qb2luKFwiJlwiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZyhzdHIpIHtcclxuXHRcdGlmIChzdHIgPT09IFwiXCIgfHwgc3RyID09IG51bGwpIHJldHVybiB7fVxyXG5cdFx0aWYgKHN0ci5jaGFyQXQoMCkgPT09IFwiP1wiKSBzdHIgPSBzdHIuc2xpY2UoMSlcclxuXHJcblx0XHR2YXIgcGFpcnMgPSBzdHIuc3BsaXQoXCImXCIpXHJcblx0XHR2YXIgcGFyYW1zID0ge31cclxuXHJcblx0XHRmb3JFYWNoKHBhaXJzLCBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcblx0XHRcdHZhciBwYWlyID0gc3RyaW5nLnNwbGl0KFwiPVwiKVxyXG5cdFx0XHR2YXIga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXHJcblx0XHRcdHZhciB2YWx1ZSA9IHBhaXIubGVuZ3RoID09PSAyID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pIDogbnVsbFxyXG5cdFx0XHRpZiAocGFyYW1zW2tleV0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmICghaXNBcnJheShwYXJhbXNba2V5XSkpIHBhcmFtc1trZXldID0gW3BhcmFtc1trZXldXVxyXG5cdFx0XHRcdHBhcmFtc1trZXldLnB1c2godmFsdWUpXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBwYXJhbXNba2V5XSA9IHZhbHVlXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBwYXJhbXNcclxuXHR9XHJcblxyXG5cdG0ucm91dGUuYnVpbGRRdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmdcclxuXHRtLnJvdXRlLnBhcnNlUXVlcnlTdHJpbmcgPSBwYXJzZVF1ZXJ5U3RyaW5nXHJcblxyXG5cdGZ1bmN0aW9uIHJlc2V0KHJvb3QpIHtcclxuXHRcdHZhciBjYWNoZUtleSA9IGdldENlbGxDYWNoZUtleShyb290KVxyXG5cdFx0Y2xlYXIocm9vdC5jaGlsZE5vZGVzLCBjZWxsQ2FjaGVbY2FjaGVLZXldKVxyXG5cdFx0Y2VsbENhY2hlW2NhY2hlS2V5XSA9IHVuZGVmaW5lZFxyXG5cdH1cclxuXHJcblx0bS5kZWZlcnJlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpXHJcblx0XHRkZWZlcnJlZC5wcm9taXNlID0gcHJvcGlmeShkZWZlcnJlZC5wcm9taXNlKVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwcm9waWZ5KHByb21pc2UsIGluaXRpYWxWYWx1ZSkge1xyXG5cdFx0dmFyIHByb3AgPSBtLnByb3AoaW5pdGlhbFZhbHVlKVxyXG5cdFx0cHJvbWlzZS50aGVuKHByb3ApXHJcblx0XHRwcm9wLnRoZW4gPSBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHJldHVybiBwcm9waWZ5KHByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpLCBpbml0aWFsVmFsdWUpXHJcblx0XHR9XHJcblxyXG5cdFx0cHJvcC5jYXRjaCA9IHByb3AudGhlbi5iaW5kKG51bGwsIG51bGwpXHJcblx0XHRyZXR1cm4gcHJvcFxyXG5cdH1cclxuXHQvLyBQcm9taXoubWl0aHJpbC5qcyB8IFpvbG1laXN0ZXIgfCBNSVRcclxuXHQvLyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgUHJvbWl6LmpzLCB3aGljaCBkb2VzIG5vdCBjb25mb3JtIHRvIFByb21pc2VzL0ErXHJcblx0Ly8gZm9yIHR3byByZWFzb25zOlxyXG5cdC8vXHJcblx0Ly8gMSkgYHRoZW5gIGNhbGxiYWNrcyBhcmUgY2FsbGVkIHN5bmNocm9ub3VzbHkgKGJlY2F1c2Ugc2V0VGltZW91dCBpcyB0b29cclxuXHQvLyAgICBzbG93LCBhbmQgdGhlIHNldEltbWVkaWF0ZSBwb2x5ZmlsbCBpcyB0b28gYmlnXHJcblx0Ly9cclxuXHQvLyAyKSB0aHJvd2luZyBzdWJjbGFzc2VzIG9mIEVycm9yIGNhdXNlIHRoZSBlcnJvciB0byBiZSBidWJibGVkIHVwIGluc3RlYWRcclxuXHQvLyAgICBvZiB0cmlnZ2VyaW5nIHJlamVjdGlvbiAoYmVjYXVzZSB0aGUgc3BlYyBkb2VzIG5vdCBhY2NvdW50IGZvciB0aGVcclxuXHQvLyAgICBpbXBvcnRhbnQgdXNlIGNhc2Ugb2YgZGVmYXVsdCBicm93c2VyIGVycm9yIGhhbmRsaW5nLCBpLmUuIG1lc3NhZ2Ugdy9cclxuXHQvLyAgICBsaW5lIG51bWJlcilcclxuXHJcblx0dmFyIFJFU09MVklORyA9IDFcclxuXHR2YXIgUkVKRUNUSU5HID0gMlxyXG5cdHZhciBSRVNPTFZFRCA9IDNcclxuXHR2YXIgUkVKRUNURUQgPSA0XHJcblxyXG5cdGZ1bmN0aW9uIERlZmVycmVkKG9uU3VjY2Vzcywgb25GYWlsdXJlKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXNcclxuXHRcdHZhciBzdGF0ZSA9IDBcclxuXHRcdHZhciBwcm9taXNlVmFsdWUgPSAwXHJcblx0XHR2YXIgbmV4dCA9IFtdXHJcblxyXG5cdFx0c2VsZi5wcm9taXNlID0ge31cclxuXHJcblx0XHRzZWxmLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKCFzdGF0ZSkge1xyXG5cdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0c3RhdGUgPSBSRVNPTFZJTkdcclxuXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBzZWxmXHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKCFzdGF0ZSkge1xyXG5cdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBzZWxmXHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAob25TdWNjZXNzLCBvbkZhaWx1cmUpIHtcclxuXHRcdFx0dmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKG9uU3VjY2Vzcywgb25GYWlsdXJlKVxyXG5cclxuXHRcdFx0aWYgKHN0YXRlID09PSBSRVNPTFZFRCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChwcm9taXNlVmFsdWUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bmV4dC5wdXNoKGRlZmVycmVkKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbmlzaCh0eXBlKSB7XHJcblx0XHRcdHN0YXRlID0gdHlwZSB8fCBSRUpFQ1RFRFxyXG5cdFx0XHRuZXh0Lm1hcChmdW5jdGlvbiAoZGVmZXJyZWQpIHtcclxuXHRcdFx0XHRpZiAoc3RhdGUgPT09IFJFU09MVkVEKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gdGhlbm5hYmxlKHRoZW4sIHN1Y2Nlc3MsIGZhaWx1cmUsIG5vdFRoZW5uYWJsZSkge1xyXG5cdFx0XHRpZiAoKChwcm9taXNlVmFsdWUgIT0gbnVsbCAmJiBpc09iamVjdChwcm9taXNlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdFx0aXNGdW5jdGlvbihwcm9taXNlVmFsdWUpKSAmJiBpc0Z1bmN0aW9uKHRoZW4pKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vIGNvdW50IHByb3RlY3RzIGFnYWluc3QgYWJ1c2UgY2FsbHMgZnJvbSBzcGVjIGNoZWNrZXJcclxuXHRcdFx0XHRcdHZhciBjb3VudCA9IDBcclxuXHRcdFx0XHRcdHRoZW4uY2FsbChwcm9taXNlVmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoY291bnQrKykgcmV0dXJuXHJcblx0XHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0XHRcdHN1Y2Nlc3MoKVxyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjb3VudCsrKSByZXR1cm5cclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gdmFsdWVcclxuXHRcdFx0XHRcdFx0ZmFpbHVyZSgpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihlKVxyXG5cdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gZVxyXG5cdFx0XHRcdFx0ZmFpbHVyZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vdFRoZW5uYWJsZSgpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBmaXJlKCkge1xyXG5cdFx0XHQvLyBjaGVjayBpZiBpdCdzIGEgdGhlbmFibGVcclxuXHRcdFx0dmFyIHRoZW5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGVuID0gcHJvbWlzZVZhbHVlICYmIHByb21pc2VWYWx1ZS50aGVuXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IoZSlcclxuXHRcdFx0XHRwcm9taXNlVmFsdWUgPSBlXHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHRcdFx0XHRyZXR1cm4gZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzdGF0ZSA9PT0gUkVKRUNUSU5HKSB7XHJcblx0XHRcdFx0bS5kZWZlcnJlZC5vbmVycm9yKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhlbm5hYmxlKHRoZW4sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRzdGF0ZSA9IFJFU09MVklOR1xyXG5cdFx0XHRcdGZpcmUoKVxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHRcdFx0XHRmaXJlKClcclxuXHRcdFx0fSwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT09IFJFU09MVklORyAmJiBpc0Z1bmN0aW9uKG9uU3VjY2VzcykpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gb25TdWNjZXNzKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09IFJFSkVDVElORyAmJiBpc0Z1bmN0aW9uKG9uRmFpbHVyZSkpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gb25GYWlsdXJlKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBSRVNPTFZJTkdcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IoZSlcclxuXHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IGVcclxuXHRcdFx0XHRcdHJldHVybiBmaW5pc2goKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHByb21pc2VWYWx1ZSA9PT0gc2VsZikge1xyXG5cdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gVHlwZUVycm9yKClcclxuXHRcdFx0XHRcdGZpbmlzaCgpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoZW5uYWJsZSh0aGVuLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGZpbmlzaChSRVNPTFZFRClcclxuXHRcdFx0XHRcdH0sIGZpbmlzaCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRmaW5pc2goc3RhdGUgPT09IFJFU09MVklORyAmJiBSRVNPTFZFRClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5kZWZlcnJlZC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICh0eXBlLmNhbGwoZSkgPT09IFwiW29iamVjdCBFcnJvcl1cIiAmJlxyXG5cdFx0XHRcdCEvIEVycm9yLy50ZXN0KGUuY29uc3RydWN0b3IudG9TdHJpbmcoKSkpIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzID0gMFxyXG5cdFx0XHR0aHJvdyBlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLnN5bmMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGRlZmVycmVkID0gbS5kZWZlcnJlZCgpXHJcblx0XHR2YXIgb3V0c3RhbmRpbmcgPSBhcmdzLmxlbmd0aFxyXG5cdFx0dmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkob3V0c3RhbmRpbmcpXHJcblx0XHR2YXIgbWV0aG9kID0gXCJyZXNvbHZlXCJcclxuXHJcblx0XHRmdW5jdGlvbiBzeW5jaHJvbml6ZXIocG9zLCByZXNvbHZlZCkge1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0cmVzdWx0c1twb3NdID0gdmFsdWVcclxuXHRcdFx0XHRpZiAoIXJlc29sdmVkKSBtZXRob2QgPSBcInJlamVjdFwiXHJcblx0XHRcdFx0aWYgKC0tb3V0c3RhbmRpbmcgPT09IDApIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnByb21pc2UocmVzdWx0cylcclxuXHRcdFx0XHRcdGRlZmVycmVkW21ldGhvZF0ocmVzdWx0cylcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJncy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGZvckVhY2goYXJncywgZnVuY3Rpb24gKGFyZywgaSkge1xyXG5cdFx0XHRcdGFyZy50aGVuKHN5bmNocm9uaXplcihpLCB0cnVlKSwgc3luY2hyb25pemVyKGksIGZhbHNlKSlcclxuXHRcdFx0fSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlZmVycmVkLnJlc29sdmUoW10pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2VcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7IHJldHVybiB2YWx1ZSB9XHJcblxyXG5cdGZ1bmN0aW9uIGhhbmRsZUpzb25wKG9wdGlvbnMpIHtcclxuXHRcdHZhciBjYWxsYmFja0tleSA9IFwibWl0aHJpbF9jYWxsYmFja19cIiArXHJcblx0XHRcdG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgXCJfXCIgK1xyXG5cdFx0XHQoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWUxNikpLnRvU3RyaW5nKDM2KVxyXG5cclxuXHRcdHZhciBzY3JpcHQgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxyXG5cclxuXHRcdGdsb2JhbFtjYWxsYmFja0tleV0gPSBmdW5jdGlvbiAocmVzcCkge1xyXG5cdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXHJcblx0XHRcdG9wdGlvbnMub25sb2FkKHtcclxuXHRcdFx0XHR0eXBlOiBcImxvYWRcIixcclxuXHRcdFx0XHR0YXJnZXQ6IHtcclxuXHRcdFx0XHRcdHJlc3BvbnNlVGV4dDogcmVzcFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Z2xvYmFsW2NhbGxiYWNrS2V5XSA9IHVuZGVmaW5lZFxyXG5cdFx0fVxyXG5cclxuXHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXHJcblxyXG5cdFx0XHRvcHRpb25zLm9uZXJyb3Ioe1xyXG5cdFx0XHRcdHR5cGU6IFwiZXJyb3JcIixcclxuXHRcdFx0XHR0YXJnZXQ6IHtcclxuXHRcdFx0XHRcdHN0YXR1czogNTAwLFxyXG5cdFx0XHRcdFx0cmVzcG9uc2VUZXh0OiBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBcIkVycm9yIG1ha2luZyBqc29ucCByZXF1ZXN0XCJcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRnbG9iYWxbY2FsbGJhY2tLZXldID0gdW5kZWZpbmVkXHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRzY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdH1cclxuXHJcblx0XHRzY3JpcHQuc3JjID0gb3B0aW9ucy51cmwgK1xyXG5cdFx0XHQob3B0aW9ucy51cmwuaW5kZXhPZihcIj9cIikgPiAwID8gXCImXCIgOiBcIj9cIikgK1xyXG5cdFx0XHQob3B0aW9ucy5jYWxsYmFja0tleSA/IG9wdGlvbnMuY2FsbGJhY2tLZXkgOiBcImNhbGxiYWNrXCIpICtcclxuXHRcdFx0XCI9XCIgKyBjYWxsYmFja0tleSArXHJcblx0XHRcdFwiJlwiICsgYnVpbGRRdWVyeVN0cmluZyhvcHRpb25zLmRhdGEgfHwge30pXHJcblxyXG5cdFx0JGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY3JlYXRlWGhyKG9wdGlvbnMpIHtcclxuXHRcdHZhciB4aHIgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KClcclxuXHRcdHhoci5vcGVuKG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVybCwgdHJ1ZSwgb3B0aW9ucy51c2VyLFxyXG5cdFx0XHRvcHRpb25zLnBhc3N3b3JkKVxyXG5cclxuXHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLm9ubG9hZCh7dHlwZTogXCJsb2FkXCIsIHRhcmdldDogeGhyfSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5vbmVycm9yKHt0eXBlOiBcImVycm9yXCIsIHRhcmdldDogeGhyfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5zZXJpYWxpemUgPT09IEpTT04uc3RyaW5naWZ5ICYmXHJcblx0XHRcdFx0b3B0aW9ucy5kYXRhICYmXHJcblx0XHRcdFx0b3B0aW9ucy5tZXRob2QgIT09IFwiR0VUXCIpIHtcclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcclxuXHRcdFx0XHRcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5kZXNlcmlhbGl6ZSA9PT0gSlNPTi5wYXJzZSkge1xyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvKlwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMuY29uZmlnKSkge1xyXG5cdFx0XHR2YXIgbWF5YmVYaHIgPSBvcHRpb25zLmNvbmZpZyh4aHIsIG9wdGlvbnMpXHJcblx0XHRcdGlmIChtYXliZVhociAhPSBudWxsKSB4aHIgPSBtYXliZVhoclxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBkYXRhID0gb3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIgfHwgIW9wdGlvbnMuZGF0YSA/IFwiXCIgOiBvcHRpb25zLmRhdGFcclxuXHJcblx0XHRpZiAoZGF0YSAmJiAhaXNTdHJpbmcoZGF0YSkgJiYgZGF0YS5jb25zdHJ1Y3RvciAhPT0gZ2xvYmFsLkZvcm1EYXRhKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlcXVlc3QgZGF0YSBzaG91bGQgYmUgZWl0aGVyIGJlIGEgc3RyaW5nIG9yIFwiICtcclxuXHRcdFx0XHRcIkZvcm1EYXRhLiBDaGVjayB0aGUgYHNlcmlhbGl6ZWAgb3B0aW9uIGluIGBtLnJlcXVlc3RgXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0eGhyLnNlbmQoZGF0YSlcclxuXHRcdHJldHVybiB4aHJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFqYXgob3B0aW9ucykge1xyXG5cdFx0aWYgKG9wdGlvbnMuZGF0YVR5cGUgJiYgb3B0aW9ucy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImpzb25wXCIpIHtcclxuXHRcdFx0cmV0dXJuIGhhbmRsZUpzb25wKG9wdGlvbnMpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gY3JlYXRlWGhyKG9wdGlvbnMpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiaW5kRGF0YShvcHRpb25zLCBkYXRhLCBzZXJpYWxpemUpIHtcclxuXHRcdGlmIChvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIiAmJiBvcHRpb25zLmRhdGFUeXBlICE9PSBcImpzb25wXCIpIHtcclxuXHRcdFx0dmFyIHByZWZpeCA9IG9wdGlvbnMudXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCJcclxuXHRcdFx0dmFyIHF1ZXJ5c3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZyhkYXRhKVxyXG5cdFx0XHRvcHRpb25zLnVybCArPSAocXVlcnlzdHJpbmcgPyBwcmVmaXggKyBxdWVyeXN0cmluZyA6IFwiXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvcHRpb25zLmRhdGEgPSBzZXJpYWxpemUoZGF0YSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhcmFtZXRlcml6ZVVybCh1cmwsIGRhdGEpIHtcclxuXHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKC86W2Etel1cXHcrL2dpLCBmdW5jdGlvbih0b2tlbil7XHJcblx0XHRcdFx0dmFyIGtleSA9IHRva2VuLnNsaWNlKDEpXHJcblx0XHRcdFx0dmFyIHZhbHVlID0gZGF0YVtrZXldXHJcblx0XHRcdFx0ZGVsZXRlIGRhdGFba2V5XVxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVybFxyXG5cdH1cclxuXHJcblx0bS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdGlmIChvcHRpb25zLmJhY2tncm91bmQgIT09IHRydWUpIG0uc3RhcnRDb21wdXRhdGlvbigpXHJcblx0XHR2YXIgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKVxyXG5cdFx0dmFyIGlzSlNPTlAgPSBvcHRpb25zLmRhdGFUeXBlICYmXHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJqc29ucFwiXHJcblxyXG5cdFx0dmFyIHNlcmlhbGl6ZSwgZGVzZXJpYWxpemUsIGV4dHJhY3RcclxuXHJcblx0XHRpZiAoaXNKU09OUCkge1xyXG5cdFx0XHRzZXJpYWxpemUgPSBvcHRpb25zLnNlcmlhbGl6ZSA9XHJcblx0XHRcdGRlc2VyaWFsaXplID0gb3B0aW9ucy5kZXNlcmlhbGl6ZSA9IGlkZW50aXR5XHJcblxyXG5cdFx0XHRleHRyYWN0ID0gZnVuY3Rpb24gKGpzb25wKSB7IHJldHVybiBqc29ucC5yZXNwb25zZVRleHQgfVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2VyaWFsaXplID0gb3B0aW9ucy5zZXJpYWxpemUgPSBvcHRpb25zLnNlcmlhbGl6ZSB8fCBKU09OLnN0cmluZ2lmeVxyXG5cclxuXHRcdFx0ZGVzZXJpYWxpemUgPSBvcHRpb25zLmRlc2VyaWFsaXplID1cclxuXHRcdFx0XHRvcHRpb25zLmRlc2VyaWFsaXplIHx8IEpTT04ucGFyc2VcclxuXHRcdFx0ZXh0cmFjdCA9IG9wdGlvbnMuZXh0cmFjdCB8fCBmdW5jdGlvbiAoeGhyKSB7XHJcblx0XHRcdFx0aWYgKHhoci5yZXNwb25zZVRleHQubGVuZ3RoIHx8IGRlc2VyaWFsaXplICE9PSBKU09OLnBhcnNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4geGhyLnJlc3BvbnNlVGV4dFxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG9wdGlvbnMubWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCIpLnRvVXBwZXJDYXNlKClcclxuXHRcdG9wdGlvbnMudXJsID0gcGFyYW1ldGVyaXplVXJsKG9wdGlvbnMudXJsLCBvcHRpb25zLmRhdGEpXHJcblx0XHRiaW5kRGF0YShvcHRpb25zLCBvcHRpb25zLmRhdGEsIHNlcmlhbGl6ZSlcclxuXHRcdG9wdGlvbnMub25sb2FkID0gb3B0aW9ucy5vbmVycm9yID0gZnVuY3Rpb24gKGV2KSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZXYgPSBldiB8fCBldmVudFxyXG5cdFx0XHRcdHZhciByZXNwb25zZSA9IGRlc2VyaWFsaXplKGV4dHJhY3QoZXYudGFyZ2V0LCBvcHRpb25zKSlcclxuXHRcdFx0XHRpZiAoZXYudHlwZSA9PT0gXCJsb2FkXCIpIHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zLnVud3JhcFN1Y2Nlc3MpIHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBvcHRpb25zLnVud3JhcFN1Y2Nlc3MocmVzcG9uc2UsIGV2LnRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoaXNBcnJheShyZXNwb25zZSkgJiYgb3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0XHRcdGZvckVhY2gocmVzcG9uc2UsIGZ1bmN0aW9uIChyZXMsIGkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZVtpXSA9IG5ldyBvcHRpb25zLnR5cGUocmVzKVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgb3B0aW9ucy50eXBlKHJlc3BvbnNlKVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zLnVud3JhcEVycm9yKSB7XHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gb3B0aW9ucy51bndyYXBFcnJvcihyZXNwb25zZSwgZXYudGFyZ2V0KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChyZXNwb25zZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZSlcclxuXHRcdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5iYWNrZ3JvdW5kICE9PSB0cnVlKSBtLmVuZENvbXB1dGF0aW9uKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGFqYXgob3B0aW9ucylcclxuXHRcdGRlZmVycmVkLnByb21pc2UgPSBwcm9waWZ5KGRlZmVycmVkLnByb21pc2UsIG9wdGlvbnMuaW5pdGlhbFZhbHVlKVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2VcclxuXHR9XHJcblxyXG5cdHJldHVybiBtXHJcbn0pXHJcbiIsIlwidXNlIHN0cmljdFwiO3JlcXVpcmUoXCJwb2x5dGhlbmUvYmFzZS1idXR0b24vdGhlbWUvdGhlbWVcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlLWJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1be1wiLnBlLWJ1dHRvblwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widXNlci1zZWxlY3RcIjpcIm5vbmVcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3VzZXJfc2VsZWN0KSx7b3V0bGluZTpcIm5vbmVcIixwYWRkaW5nOjAsXCJ0ZXh0LWRlY29yYXRpb25cIjpcIm5vbmVcIixcInRleHQtYWxpZ25cIjpcImNlbnRlclwiLGN1cnNvcjpcInBvaW50ZXJcIixcIiYucGUtYnV0dG9uLS1zZWxlY3RlZCwgJi5wZS1idXR0b24tLWRpc2FibGVkLCAmLnBlLWJ1dHRvbi0taW5hY3RpdmVcIjp7Y3Vyc29yOlwiZGVmYXVsdFwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIn0sXCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCJ9LFwiIC5wZS1idXR0b25fX2xhYmVsXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZvbnRTbW9vdGhpbmcoKSx7cG9zaXRpb246XCJyZWxhdGl2ZVwiLFwiei1pbmRleFwiOjEsZGlzcGxheTpcImJsb2NrXCIsXCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCIsXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwifV0sXCIgLnBlLWJ1dHRvbl9fd2FzaFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zaXRpb246XCJiYWNrZ3JvdW5kLWNvbG9yIFwiK19jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fZHVyYXRpb24rXCIgXCIrX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9jdXJ2ZV9kZWZhdWx0fSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse1wiei1pbmRleFwiOjEsXCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCIsXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwifV19XX1dO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXN0eWxlLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9iYXNlLWJ1dHRvbi90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1iYXNlLWJ1dHRvblwiLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfdHlwZW9mPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihvYmope3JldHVybiB0eXBlb2Ygb2JqfTpmdW5jdGlvbihvYmope3JldHVybiBvYmomJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmb2JqLmNvbnN0cnVjdG9yPT09U3ltYm9sP1wic3ltYm9sXCI6dHlwZW9mIG9ian07cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX3BvbHl0aGVuZT1yZXF1aXJlKFwicG9seXRoZW5lL3BvbHl0aGVuZS9wb2x5dGhlbmVcIiksX3BvbHl0aGVuZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9seXRoZW5lKSxfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX3JpcHBsZT1yZXF1aXJlKFwicG9seXRoZW5lL3JpcHBsZS9yaXBwbGVcIiksX3JpcHBsZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmlwcGxlKSxfc2hhZG93PXJlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3NoYWRvd1wiKSxfc2hhZG93Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGFkb3cpO3JlcXVpcmUoXCJwb2x5dGhlbmUvYmFzZS1idXR0b24vYmFzZS1idXR0b25cIikscmVxdWlyZShcInBvbHl0aGVuZS9idXR0b24vdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLWJ1dHRvbiBwZS1idXR0b24tLXRleHRcIixjb250ZW50OlwicGUtYnV0dG9uX19jb250ZW50XCIsbGFiZWw6XCJwZS1idXR0b25fX2xhYmVsXCIscmFpc2VkOlwicGUtYnV0dG9uLS1yYWlzZWRcIix3YXNoOlwicGUtYnV0dG9uX193YXNoXCIsc2VsZWN0ZWQ6XCJwZS1idXR0b24tLXNlbGVjdGVkXCIsZGlzYWJsZWQ6XCJwZS1idXR0b24tLWRpc2FibGVkXCIsYm9yZGVyczpcInBlLWJ1dHRvbi0tYm9yZGVyc1wiLGluYWN0aXZlOlwicGUtYnV0dG9uLS1pbmFjdGl2ZVwifSxNQVhfWj01LHN0YXJ0VHlwZT13aW5kb3cuUG9pbnRlckV2ZW50P1wicG9pbnRlcmRvd25cIjpcIm9udG91Y2hzdGFydFwiaW4gd2luZG93fHx3aW5kb3cuRG9jdW1lbnRUb3VjaCYmZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoP1widG91Y2hzdGFydFwiOlwibW91c2Vkb3duXCIsZW5kVHlwZT13aW5kb3cuUG9pbnRlckV2ZW50P1wicG9pbnRlcnVwXCI6XCJvbnRvdWNoZW5kXCJpbiB3aW5kb3d8fHdpbmRvdy5Eb2N1bWVudFRvdWNoJiZkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2g/XCJ0b3VjaGVuZFwiOlwibW91c2V1cFwiLHRhcFN0YXJ0PXZvaWQgMCx0YXBFbmQ9dm9pZCAwLHRhcEVuZEFsbD12b2lkIDAsZG93bkJ1dHRvbnM9W10sYW5pbWF0ZVo9ZnVuY3Rpb24oY3RybCxvcHRzLG5hbWUpe3ZhciBiYXNlWj1jdHJsLmJhc2VaKCksaW5jcmVhc2U9b3B0cy5pbmNyZWFzZXx8MSx6PWN0cmwueigpO1wiZG93blwiPT09bmFtZSYmNSE9PWJhc2VaPyh6Kz1pbmNyZWFzZSx6PU1hdGgubWluKHosTUFYX1opKTpcInVwXCI9PT1uYW1lJiYoei09aW5jcmVhc2Usej1NYXRoLm1heCh6LGJhc2VaKSkseiE9PWN0cmwueigpJiYoY3RybC56KHopLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCkpfSxpbmFjdGl2YXRlPWZ1bmN0aW9uKGN0cmwsb3B0cyl7Y3RybC5pbmFjdGl2ZT0hMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtjdHJsLmluYWN0aXZlPSExLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCl9LDFlMypvcHRzLmluYWN0aXZhdGUpfSxpbml0VGFwRXZlbnRzPWZ1bmN0aW9uKGVsLGN0cmwsb3B0cyl7dmFyIHRhcEhhbmRsZXI9ZnVuY3Rpb24oY3RybCxvcHRzLG5hbWUpe1wiZG93blwiPT09bmFtZT9kb3duQnV0dG9ucy5wdXNoKHtjdHJsOmN0cmwsb3B0czpvcHRzfSk6XCJ1cFwiPT09bmFtZSYmb3B0cy5pbmFjdGl2YXRlJiYhb3B0cy5pbmFjdGl2ZSYmaW5hY3RpdmF0ZShjdHJsLG9wdHMpLG9wdHMuYW5pbWF0ZU9uVGFwJiYhX3BvbHl0aGVuZTJbXCJkZWZhdWx0XCJdLmlzVG91Y2gmJmFuaW1hdGVaKGN0cmwsb3B0cyxuYW1lKX07dGFwU3RhcnQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGFwSGFuZGxlcihjdHJsLG9wdHMsXCJkb3duXCIpfSx0YXBFbmQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGFwSGFuZGxlcihjdHJsLG9wdHMsXCJ1cFwiKX0sdGFwRW5kQWxsPWZ1bmN0aW9uKCl7ZG93bkJ1dHRvbnMubWFwKGZ1bmN0aW9uKGJ0bil7dGFwSGFuZGxlcihidG4uY3RybCxidG4ub3B0cyxcInVwXCIpfSksZG93bkJ1dHRvbnM9W119LGVsLmFkZEV2ZW50TGlzdGVuZXIoc3RhcnRUeXBlLHRhcFN0YXJ0KSxlbC5hZGRFdmVudExpc3RlbmVyKGVuZFR5cGUsdGFwRW5kKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihlbmRUeXBlLHRhcEVuZEFsbCl9LGNsZWFyVGFwRXZlbnRzPWZ1bmN0aW9uKGVsKXtlbC5yZW1vdmVFdmVudExpc3RlbmVyKHN0YXJ0VHlwZSx0YXBTdGFydCksZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbmRUeXBlLHRhcEVuZCksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZW5kVHlwZSx0YXBFbmRBbGwpfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sbm9pbms9dm9pZCAwIT09b3B0cy5pbmsmJiFvcHRzLmluayxkaXNhYmxlZD1vcHRzLmRpc2FibGVkLGluYWN0aXZlPWN0cmwuaW5hY3RpdmUsdGFnPW9wdHMudGFnfHxcImFcIixidXR0b25Db25maWc9ZnVuY3Rpb24oZWwsaXNJbml0ZWQsY29udGV4dCl7aXNJbml0ZWR8fGRpc2FibGVkfHxpbmFjdGl2ZXx8KGluaXRUYXBFdmVudHMoZWwsY3RybCxPYmplY3QuYXNzaWduKHt9LG9wdHMse2FuaW1hdGVPblRhcDpvcHRzLmFuaW1hdGVPblRhcCE9PSExfSkpLGNvbnRleHQub251bmxvYWQ9ZnVuY3Rpb24oKXtjbGVhclRhcEV2ZW50cyhlbCl9KX0sb3B0c0NvbmZpZz1vcHRzLmNvbmZpZ3x8ZnVuY3Rpb24oKXt9LHVybENvbmZpZz1vcHRzLnVybCYmb3B0cy51cmwuY29uZmlnP29wdHMudXJsLmNvbmZpZzpmdW5jdGlvbigpe30scHJvcHM9T2JqZWN0LmFzc2lnbih7fSx7XCJjbGFzc1wiOltvcHRzLnBhcmVudENsYXNzfHxDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLnNlbGVjdGVkP0NTU19DTEFTU0VTLnNlbGVjdGVkOm51bGwsZGlzYWJsZWQ/Q1NTX0NMQVNTRVMuZGlzYWJsZWQ6bnVsbCxpbmFjdGl2ZT9DU1NfQ0xBU1NFUy5pbmFjdGl2ZTpudWxsLG9wdHMuYm9yZGVycz9DU1NfQ0xBU1NFUy5ib3JkZXJzOm51bGwsb3B0cy5yYWlzZWQ/Q1NTX0NMQVNTRVMucmFpc2VkOm51bGwsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwifSxvcHRzLnVybD9vcHRzLnVybDpudWxsLG9wdHMuZm9ybWFjdGlvbj97Zm9ybWFjdGlvbjpvcHRzLmZvcm1hY3Rpb259Om51bGwsb3B0cy50eXBlP3t0eXBlOm9wdHMudHlwZX06bnVsbCxvcHRzLmV2ZW50cz9vcHRzLmV2ZW50czpudWxsLHtjb25maWc6ZnVuY3Rpb24oKXtyZXR1cm5bYnV0dG9uQ29uZmlnLmFwcGx5KHZvaWQgMCxhcmd1bWVudHMpLG9wdHNDb25maWcuYXBwbHkodm9pZCAwLGFyZ3VtZW50cyksdXJsQ29uZmlnLmFwcGx5KHZvaWQgMCxhcmd1bWVudHMpXX19LGRpc2FibGVkP3tkaXNhYmxlZDohMH06bnVsbCksbGFiZWw9b3B0cy5jb250ZW50P29wdHMuY29udGVudDpvcHRzLmxhYmVsP1wib2JqZWN0XCI9PT1fdHlwZW9mKG9wdHMubGFiZWwpP29wdHMubGFiZWw6KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmxhYmVsIH0sIGNoaWxkcmVuOiBbIG9wdHMubGFiZWwgXSB9KTpudWxsLGNvbnRlbnQ9KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQgfSwgY2hpbGRyZW46IFsgb3B0cy5yYWlzZWQmJiFkaXNhYmxlZD9fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfc2hhZG93MltcImRlZmF1bHRcIl0se3o6Y3RybC56KCksYW5pbWF0ZWQ6ITB9KTpudWxsLGRpc2FibGVkfHxub2luaz9udWxsOl9taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9yaXBwbGUyW1wiZGVmYXVsdFwiXSxvcHRzLnJpcHBsZXx8e30pLGRpc2FibGVkfHx2b2lkIDAhPT1vcHRzLndhc2gmJiFvcHRzLndhc2g/bnVsbDooeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMud2FzaCB9LCBjaGlsZHJlbjogW10gfSksbGFiZWwgXSB9KTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e2NvbnRyb2xsZXI6ZnVuY3Rpb24oKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdLHo9dm9pZCAwIT09b3B0cy56P29wdHMuejoxO3JldHVybntiYXNlWjpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoeiksejpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoeiksaW5hY3RpdmU6b3B0cy5pbmFjdGl2ZXx8ITF9fSx2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCx0eXBlKXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9M3x8dm9pZCAwPT09YXJndW1lbnRzWzNdP1wiXCI6YXJndW1lbnRzWzNdLG5vcm1hbEJvcmRlcj1jb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfbm9ybWFsX2JvcmRlclwiXXx8XCJ0cmFuc3BhcmVudFwiLGFjdGl2ZUJvcmRlcj1jb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfYWN0aXZlX2JvcmRlclwiXXx8bm9ybWFsQm9yZGVyLGRpc2FibGVkQm9yZGVyPWNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9kaXNhYmxlZF9ib3JkZXJcIl18fG5vcm1hbEJvcmRlcjtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLWJ1dHRvblwiLHtcIiYsICY6bGluaywgJjp2aXNpdGVkXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ub3JtYWxfdGV4dFwiXX0sXCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfbm9ybWFsX2JhY2tncm91bmRcIl0sXCJib3JkZXItY29sb3JcIjpub3JtYWxCb3JkZXJ9LFwiJi5wZS1idXR0b24tLWRpc2FibGVkXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9kaXNhYmxlZF90ZXh0XCJdLFwiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2Rpc2FibGVkX2JhY2tncm91bmRcIl0sXCJib3JkZXItY29sb3JcIjpkaXNhYmxlZEJvcmRlcn19LFwiJi5wZS1idXR0b24tLXNlbGVjdGVkXCI6e1wiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2FjdGl2ZV9iYWNrZ3JvdW5kXCJdLFwiYm9yZGVyLWNvbG9yXCI6YWN0aXZlQm9yZGVyfSxcIiAucGUtYnV0dG9uX193YXNoXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ob3Zlcl9iYWNrZ3JvdW5kXCJdfX0sXCImOmFjdGl2ZVwiOntcIiAucGUtYnV0dG9uX193YXNoXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ob3Zlcl9iYWNrZ3JvdW5kXCJdfX19KV19LG5vVG91Y2g9ZnVuY3Rpb24oY29uZmlnLHRpbnQsdHlwZSl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTN8fHZvaWQgMD09PWFyZ3VtZW50c1szXT9cIlwiOmFyZ3VtZW50c1szXSxub3JtYWxCb3JkZXI9Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX25vcm1hbF9ib3JkZXJcIl0saG92ZXJCb3JkZXI9Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX25vcm1hbF9ib3JkZXJcIl18fG5vcm1hbEJvcmRlcjtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLWJ1dHRvbjpob3ZlclwiLHtcIiY6bm90KC5wZS1idXR0b24tLXNlbGVjdGVkKSAucGUtYnV0dG9uX193YXNoXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ob3Zlcl9iYWNrZ3JvdW5kXCJdLFwiYm9yZGVyLWNvbG9yXCI6aG92ZXJCb3JkZXJ9fSldfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIixcImZsYXRcIiksc3R5bGUoY29uZmlnLFwibGlnaHRcIixcInJhaXNlZFwiLFwiLnBlLWJ1dHRvbi0tcmFpc2VkXCIpLHtcImh0bWwucGUtbm8tdG91Y2hcIjpbbm9Ub3VjaChjb25maWcsXCJsaWdodFwiLFwiZmxhdFwiLFwiIFwiKSxub1RvdWNoKGNvbmZpZyxcImxpZ2h0XCIsXCJyYWlzZWRcIixcIiAucGUtYnV0dG9uLS1yYWlzZWRcIildfSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCJmbGF0XCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcInJhaXNlZFwiLFwiIC5wZS1idXR0b24tLXJhaXNlZFwiKV19LHtcImh0bWwucGUtbm8tdG91Y2ggLnBlLWRhcmstdGhlbWVcIjpbbm9Ub3VjaChjb25maWcsXCJkYXJrXCIsXCJmbGF0XCIsXCIgXCIpLG5vVG91Y2goY29uZmlnLFwiZGFya1wiLFwicmFpc2VkXCIsXCIgLnBlLWJ1dHRvbi0tcmFpc2VkXCIpXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxyZ2JhPV9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhLHRvdWNoX2hlaWdodD1fY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF90b3VjaF9oZWlnaHQsaGVpZ2h0PTM2O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXttYXJnaW5faDpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0LGJvcmRlcl9yYWRpdXM6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaXRlbV9ib3JkZXJfcmFkaXVzLGZvbnRfc2l6ZToxNCxmb250X3dlaWdodDo1MDAsb3V0ZXJfcGFkZGluZ192Oih0b3VjaF9oZWlnaHQtaGVpZ2h0KS8yLHBhZGRpbmdfaDoyKl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXQscGFkZGluZ192OjExLG1pbl93aWR0aDo4Kl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LHRleHRfdHJhbnNmb3JtOlwidXBwZXJjYXNlXCIsYm9yZGVyX3dpZHRoOjAsY29sb3JfbGlnaHRfZmxhdF9ub3JtYWxfYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsY29sb3JfbGlnaHRfZmxhdF9ub3JtYWxfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3ByaW1hcnkpLGNvbG9yX2xpZ2h0X2ZsYXRfaG92ZXJfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9saWdodF9mbGF0X2FjdGl2ZV9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfYWN0aXZlKSxjb2xvcl9saWdodF9mbGF0X2Rpc2FibGVkX2JhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGNvbG9yX2xpZ2h0X2ZsYXRfZGlzYWJsZWRfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X2Rpc2FibGVkKSxjb2xvcl9saWdodF9yYWlzZWRfbm9ybWFsX2JhY2tncm91bmQ6XCIjRTBFMEUwXCIsY29sb3JfbGlnaHRfcmFpc2VkX25vcm1hbF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeSksY29sb3JfbGlnaHRfcmFpc2VkX2hvdmVyX2JhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGNvbG9yX2xpZ2h0X3JhaXNlZF9hY3RpdmVfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9saWdodF9yYWlzZWRfZGlzYWJsZWRfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2Rpc2FibGVkKSxjb2xvcl9saWdodF9yYWlzZWRfZGlzYWJsZWRfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X2Rpc2FibGVkKSxjb2xvcl9kYXJrX2ZsYXRfbm9ybWFsX2JhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGNvbG9yX2RhcmtfZmxhdF9ub3JtYWxfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5KSxjb2xvcl9kYXJrX2ZsYXRfaG92ZXJfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfZGFya19mbGF0X2FjdGl2ZV9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19iYWNrZ3JvdW5kX2FjdGl2ZSksY29sb3JfZGFya19mbGF0X2Rpc2FibGVkX2JhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGNvbG9yX2RhcmtfZmxhdF9kaXNhYmxlZF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X2Rpc2FibGVkKSxjb2xvcl9kYXJrX3JhaXNlZF9ub3JtYWxfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9wcmltYXJ5KSxjb2xvcl9kYXJrX3JhaXNlZF9ub3JtYWxfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5KSxjb2xvcl9kYXJrX3JhaXNlZF9ob3Zlcl9iYWNrZ3JvdW5kOl9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9wcmltYXJ5X2FjdGl2ZSxjb2xvcl9kYXJrX3JhaXNlZF9hY3RpdmVfYmFja2dyb3VuZDpfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfcHJpbWFyeV9kYXJrLGNvbG9yX2RhcmtfcmFpc2VkX2Rpc2FibGVkX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JhY2tncm91bmRfZGlzYWJsZWQpLGNvbG9yX2RhcmtfcmFpc2VkX2Rpc2FibGVkX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfZGlzYWJsZWQpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1idXR0b24tLXRleHRcIjp7ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFwibWluLXdpZHRoXCI6Y29uZmlnLm1pbl93aWR0aCtcInB4XCIsbWFyZ2luOlwiMCBcIitjb25maWcubWFyZ2luX2grXCJweFwiLHBhZGRpbmc6Y29uZmlnLm91dGVyX3BhZGRpbmdfditcInB4IDBcIixiYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixib3JkZXI6XCJub25lXCIsXCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntcImJvcmRlci13aWR0aFwiOjAscGFkZGluZzpcIjAgXCIrY29uZmlnLnBhZGRpbmdfaCtcInB4XCIsXCJib3JkZXItcmFkaXVzXCI6Y29uZmlnLmJvcmRlcl9yYWRpdXMrXCJweFwifSxcIiAucGUtYnV0dG9uX19sYWJlbFwiOntwYWRkaW5nOmNvbmZpZy5wYWRkaW5nX3YrXCJweCAwXCIsXCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplK1wicHhcIixcImxpbmUtaGVpZ2h0XCI6Y29uZmlnLmZvbnRfc2l6ZStcInB4XCIsXCJmb250LXdlaWdodFwiOmNvbmZpZy5mb250X3dlaWdodCxcInRleHQtdHJhbnNmb3JtXCI6Y29uZmlnLnRleHRfdHJhbnNmb3JtLFwid2hpdGUtc3BhY2VcIjpcInByZVwifSxcIiYucGUtYnV0dG9uLS1ib3JkZXJzXCI6e1wiIC5wZS1idXR0b25fX3dhc2hcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoLTEpLFwiIC5wZS1yaXBwbGVcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoLTEpLFwiIC5wZS1idXR0b25fX2NvbnRlbnRcIjp7XCJib3JkZXItc3R5bGVcIjpcInNvbGlkXCIsXCJib3JkZXItd2lkdGhcIjpcIjFweFwifSxcIiAucGUtYnV0dG9uX19sYWJlbFwiOntwYWRkaW5nOmNvbmZpZy5wYWRkaW5nX3YtMStcInB4IDBcIn19fX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9idXR0b24vdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL2J1dHRvbi90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5idXR0b24sY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1idXR0b24tdGV4dFwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbGlzdGVuZXJzPXt9LHRocm90dGxlPWZ1bmN0aW9uKGZ1bmMpe3ZhciBzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT8uMDU6YXJndW1lbnRzWzFdLGNvbnRleHQ9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP3dpbmRvdzphcmd1bWVudHNbMl0sd2FpdD0hMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIF9sZW49YXJndW1lbnRzLmxlbmd0aCxhcmdzPUFycmF5KF9sZW4pLF9rZXk9MDtfbGVuPl9rZXk7X2tleSsrKWFyZ3NbX2tleV09YXJndW1lbnRzW19rZXldO3ZhciBsYXRlcj1mdW5jdGlvbigpe2Z1bmMuYXBwbHkoY29udGV4dCxhcmdzKX07d2FpdHx8KGxhdGVyKCksd2FpdD0hMCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7d2FpdD0hMX0scykpfX0sc3Vic2NyaWJlPWZ1bmN0aW9uKGV2ZW50TmFtZSxsaXN0ZW5lcixkZWxheSl7bGlzdGVuZXJzW2V2ZW50TmFtZV09bGlzdGVuZXJzW2V2ZW50TmFtZV18fFtdLGxpc3RlbmVyc1tldmVudE5hbWVdLnB1c2goZGVsYXk/dGhyb3R0bGUobGlzdGVuZXIsZGVsYXkpOmxpc3RlbmVyKX0sdW5zdWJzY3JpYmU9ZnVuY3Rpb24oZXZlbnROYW1lLGxpc3RlbmVyKXtpZihsaXN0ZW5lcnNbZXZlbnROYW1lXSl7dmFyIGluZGV4PWxpc3RlbmVyc1tldmVudE5hbWVdLmluZGV4T2YobGlzdGVuZXIpO2luZGV4Pi0xJiZsaXN0ZW5lcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsMSl9fSxlbWl0PWZ1bmN0aW9uKGV2ZW50TmFtZSxldmVudCl7bGlzdGVuZXJzW2V2ZW50TmFtZV0mJmxpc3RlbmVyc1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpe2xpc3RlbmVyKGV2ZW50KX0pfTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKGUpe3JldHVybiBlbWl0KFwicmVzaXplXCIsZSl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGZ1bmN0aW9uKGUpe3JldHVybiBlbWl0KFwic2Nyb2xsXCIsZSl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixmdW5jdGlvbihlKXtyZXR1cm4gZW1pdChcImtleWRvd25cIixlKX0pLGV4cG9ydHNbXCJkZWZhdWx0XCJdPXt0aHJvdHRsZTp0aHJvdHRsZSxzdWJzY3JpYmU6c3Vic2NyaWJlLHVuc3Vic2NyaWJlOnVuc3Vic2NyaWJlLGVtaXQ6ZW1pdH0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO3JlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIHZlbmRvcml6ZT1mdW5jdGlvbih3aGF0LHByZWZpeGVzKXt2YXIgdmVuZG9yc1NlbD1wcmVmaXhlcy5tYXAoZnVuY3Rpb24odil7cmV0dXJuXCJfXCIrditcIiRcIn0pLmpvaW4oXCJcIik7cmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSx2ZW5kb3JzU2VsLHdoYXQpfSxmaXQ9ZnVuY3Rpb24oKXt2YXIgb2Zmc2V0PWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT8wOmFyZ3VtZW50c1swXSxvZmZzZXRQeD1vZmZzZXQrXCJweFwiO3JldHVybntwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOm9mZnNldFB4LHJpZ2h0Om9mZnNldFB4LGJvdHRvbTpvZmZzZXRQeCxsZWZ0Om9mZnNldFB4fX0sZm9udFNtb290aGluZz1mdW5jdGlvbigpe3ZhciBzbW9vdGhpbmc9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPyEwOmFyZ3VtZW50c1swXTtyZXR1cm4gc21vb3RoaW5nP3tcIi13ZWJraXQtZm9udC1zbW9vdGhpbmdcIjpcImFudGlhbGlhc2VkXCIsXCItbW96LW9zeC1mb250LXNtb290aGluZ1wiOlwiZ3JheXNjYWxlXCJ9OntcIi13ZWJraXQtZm9udC1zbW9vdGhpbmdcIjpcInN1YnBpeGVsLWFudGlhbGlhc2VkXCIsXCItbW96LW9zeC1mb250LXNtb290aGluZ1wiOlwiYXV0b1wifX0sZWxsaXBzaXM9ZnVuY3Rpb24obGluZXMsbGluZUhlaWdodCl7cmV0dXJuXCJub25lXCI9PT1saW5lcz97XCJ0ZXh0LW92ZXJmbG93XCI6XCJpbml0aWFsXCIsb3ZlcmZsb3c6XCJpbml0aWFsXCIsXCJ3aGl0ZS1zcGFjZVwiOlwiaW5pdGlhbFwiLGRpc3BsYXk6XCJibG9ja1wiLGhlaWdodDpcImF1dG9cIn06T2JqZWN0LmFzc2lnbih7b3ZlcmZsb3c6XCJoaWRkZW5cIixcIndoaXRlLXNwYWNlXCI6XCJub3dyYXBcIixcInRleHQtb3ZlcmZsb3dcIjpcImVsbGlwc2lzXCIsXCJ0ZXh0LXJlbmRlcmluZ1wiOlwiYXV0b1wifSx2b2lkIDAhPT1saW5lcz97XCItd2Via2l0LWxpbmUtY2xhbXBcIjpsaW5lcyxcIi13ZWJraXQtYm94LW9yaWVudFwiOlwidmVydGljYWxcIixkaXNwbGF5OlwiLXdlYmtpdC1ib3hcIixoZWlnaHQ6bGluZXMqbGluZUhlaWdodCtcInB4XCJ9Om51bGwpfSxjbGVhcmZpeD1mdW5jdGlvbigpe3JldHVybntcIiY6YWZ0ZXJcIjp7Y29udGVudDonXCJcIicsZGlzcGxheTpcInRhYmxlXCIsY2xlYXI6XCJib3RoXCJ9fX0saGFpcmxpbmU9ZnVuY3Rpb24oKXtyZXR1cm57fX0sc3RpY2t5PWZ1bmN0aW9uKCl7cmV0dXJuW3twb3NpdGlvbjpcIi13ZWJraXQtc3RpY2t5XCJ9LHtwb3NpdGlvbjpcIi1tb3otc3RpY2t5XCJ9LHtwb3NpdGlvbjpcIi1vLXN0aWNreVwifSx7cG9zaXRpb246XCItbXMtc3RpY2t5XCJ9LHtwb3NpdGlvbjpcInN0aWNreVwifSx7dG9wOjAsXCJ6LWluZGV4XCI6MX1dfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29tbW9uLGZuKXtyZXR1cm4gQXJyYXkuaXNBcnJheShjb21tb24pP2NvbW1vbi5tYXAoZnVuY3Rpb24obyl7Zm9yKHZhciBzY29wZSBpbiBvKXJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUsZm4ob1tzY29wZV0pKX0pOmZuKGNvbW1vbil9LGRlZmF1bHRUcmFuc2l0aW9uPWZ1bmN0aW9uKCl7dmFyIHByb3BlcnRpZXM9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP1wiYWxsXCI6YXJndW1lbnRzWzBdLGR1cmF0aW9uPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT9fY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2R1cmF0aW9uOmFyZ3VtZW50c1sxXSxjdXJ2ZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9jdXJ2ZV9kZWZhdWx0OmFyZ3VtZW50c1syXTtyZXR1cm5bdmVuZG9yaXplKHtcInRyYW5zaXRpb24tZGVsYXlcIjowfSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksdmVuZG9yaXplKHtcInRyYW5zaXRpb24tZHVyYXRpb25cIjpkdXJhdGlvbn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLHZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblwiOmN1cnZlfSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksdmVuZG9yaXplKHtcInRyYW5zaXRpb24tcHJvcGVydHlcIjpwcm9wZXJ0aWVzfSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbildfSxmbHVpZFNjYWxlPWZ1bmN0aW9uKHByb3BlcnR5LHVuaXQsbWluVmFsdWUsbWF4VmFsdWUpe3ZhciBtaW5CcmVha3BvaW50PWFyZ3VtZW50cy5sZW5ndGg8PTR8fHZvaWQgMD09PWFyZ3VtZW50c1s0XT8zMjA6YXJndW1lbnRzWzRdLG1heEJyZWFrcG9pbnQ9YXJndW1lbnRzLmxlbmd0aDw9NXx8dm9pZCAwPT09YXJndW1lbnRzWzVdPzE5MjA6YXJndW1lbnRzWzVdLG9yaWVudGF0aW9uPWFyZ3VtZW50cy5sZW5ndGg8PTZ8fHZvaWQgMD09PWFyZ3VtZW50c1s2XT9cImhvcml6b250YWxcIjphcmd1bWVudHNbNl07cmV0dXJuIGZsdWlkU2NhbGVzKFtwcm9wZXJ0eV0sdW5pdCxbW21pbkJyZWFrcG9pbnQsbWluVmFsdWVdLFttYXhCcmVha3BvaW50LG1heFZhbHVlXV0sb3JpZW50YXRpb24pfSxmbHVpZFNjYWxlcz1mdW5jdGlvbihwcm9wZXJ0eSx1bml0LHNpemVzLG9yaWVudGF0aW9uKXt2YXIgc29ydGVkPXNpemVzLnNvcnQoKSxtaW5CcmVha3BvaW50cz1zb3J0ZWQubWFwKGZ1bmN0aW9uKGRhdGEpe3JldHVybiBkYXRhWzBdfSksbWF4QnJlYWtwb2ludHM9c29ydGVkLm1hcChmdW5jdGlvbihkYXRhKXtyZXR1cm4gZGF0YVswXX0pO21heEJyZWFrcG9pbnRzLnNoaWZ0KCksbWF4QnJlYWtwb2ludHMucHVzaChtaW5CcmVha3BvaW50c1ttaW5CcmVha3BvaW50cy5sZW5ndGgtMV0pO3ZhciBtaW5WYWx1ZXM9c29ydGVkLm1hcChmdW5jdGlvbihkYXRhKXtyZXR1cm4gZGF0YVsxXX0pLG1heFZhbHVlcz1zb3J0ZWQubWFwKGZ1bmN0aW9uKGRhdGEpe3JldHVybiBkYXRhWzFdfSk7cmV0dXJuIG1heFZhbHVlcy5zaGlmdCgpLG1heFZhbHVlcy5wdXNoKG1pblZhbHVlc1ttaW5WYWx1ZXMubGVuZ3RoLTFdKSxzb3J0ZWQubWFwKGZ1bmN0aW9uKGRhdGEsaW5kZXgpe3JldHVybiBmbHVpZFJ1bGUocHJvcGVydHksdW5pdCxvcmllbnRhdGlvbixtaW5CcmVha3BvaW50c1tpbmRleF0sbWF4QnJlYWtwb2ludHNbaW5kZXhdLG1pblZhbHVlc1tpbmRleF0sbWF4VmFsdWVzW2luZGV4XSwwPT09aW5kZXgsaW5kZXg9PT1zb3J0ZWQubGVuZ3RoLTEpfSl9LGZsdWlkUnVsZT1mdW5jdGlvbihwcm9wZXJ0eSx1bml0KXt2YXIgb3JpZW50YXRpb249YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiaG9yaXpvbnRhbFwiOmFyZ3VtZW50c1syXSxtaW5CcmVha3BvaW50PWFyZ3VtZW50c1szXSxtYXhCcmVha3BvaW50PWFyZ3VtZW50c1s0XSxtaW5WYWx1ZT1hcmd1bWVudHNbNV0sbWF4VmFsdWU9YXJndW1lbnRzWzZdLGlzRmlyc3Q9YXJndW1lbnRzWzddLGlzTGFzdD1hcmd1bWVudHNbOF0sb3JpZW50YXRpb25Vbml0PVwidmVydGljYWxcIj09PW9yaWVudGF0aW9uP1widmhcIjpcInZ3XCIsb3JpZW50YXRpb25SdWxlPVwidmVydGljYWxcIj09PW9yaWVudGF0aW9uP1wiaGVpZ2h0XCI6XCJ3aWR0aFwiLHJ1bGU9aXNMYXN0P1tcIkBtZWRpYSAobWluLVwiK29yaWVudGF0aW9uUnVsZStcIjogXCIrbWluQnJlYWtwb2ludCtcInB4KVwiXTpbXCJAbWVkaWEgKG1pbi1cIitvcmllbnRhdGlvblJ1bGUrXCI6IFwiK21pbkJyZWFrcG9pbnQrXCJweCkgYW5kIChtYXgtXCIrb3JpZW50YXRpb25SdWxlK1wiOiBcIittYXhCcmVha3BvaW50K1wicHgpXCJdLG11bHRpcGxpZXI9XCIoKFwiK21heFZhbHVlK1wiIC0gXCIrbWluVmFsdWUrXCIpIC8gKFwiK21heEJyZWFrcG9pbnQrXCIgLSBcIittaW5CcmVha3BvaW50K1wiKSAqIDEwMFwiK29yaWVudGF0aW9uVW5pdCtcIilcIixhZGRlcj1cIigoKFwiK21pblZhbHVlK1wiICogXCIrbWF4QnJlYWtwb2ludCtcIikgLSAoXCIrbWF4VmFsdWUrXCIgKiBcIittaW5CcmVha3BvaW50K1wiKSkgLyAoXCIrbWF4QnJlYWtwb2ludCtcIiAtIFwiK21pbkJyZWFrcG9pbnQrXCIpKSAqIDFcIit1bml0LGZvcm11bGE9XCJjYWxjKFwiK211bHRpcGxpZXIrXCIgKyBcIithZGRlcitcIilcIixwcm9wZXJ0aWVzPUFycmF5LmlzQXJyYXkocHJvcGVydHkpP3Byb3BlcnR5Oltwcm9wZXJ0eV07cmV0dXJuW2lzRmlyc3Q/cHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocCl7cmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSxwLFwiXCIrbWluVmFsdWUrdW5pdCl9KTpudWxsLF9kZWZpbmVQcm9wZXJ0eSh7fSxydWxlLHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHApe3JldHVybiBfZGVmaW5lUHJvcGVydHkoe30scCxpc0xhc3Q/XCJcIittYXhWYWx1ZSt1bml0OmZvcm11bGEpfSkpXX07ZXhwb3J0c1tcImRlZmF1bHRcIl09e2NsZWFyZml4OmNsZWFyZml4LGNyZWF0ZVN0eWxlczpjcmVhdGVTdHlsZXMsZGVmYXVsdFRyYW5zaXRpb246ZGVmYXVsdFRyYW5zaXRpb24sZWxsaXBzaXM6ZWxsaXBzaXMsZml0OmZpdCxmb250U21vb3RoaW5nOmZvbnRTbW9vdGhpbmcsZmx1aWRTY2FsZTpmbHVpZFNjYWxlLGZsdWlkU2NhbGVzOmZsdWlkU2NhbGVzLGhhaXJsaW5lOmhhaXJsaW5lLHN0aWNreTpzdGlja3ksdmVuZG9yaXplOnZlbmRvcml6ZX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1taXhpbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCk7cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgbXVsdGlwbGU9ZnVuY3Rpb24obU9wdHMpe3ZhciBpdGVtcz1bXSxpdGVtSW5kZXg9ZnVuY3Rpb24oaWQpe3ZhciBpdGVtPWZpbmRJdGVtKGlkKTtyZXR1cm4gaXRlbXMuaW5kZXhPZihpdGVtKX0scmVtb3ZlSXRlbT1mdW5jdGlvbihpZCl7dmFyIGluZGV4PWl0ZW1JbmRleChpZCk7LTEhPT1pbmRleCYmaXRlbXMuc3BsaWNlKGluZGV4LDEpfSxyZXBsYWNlSXRlbT1mdW5jdGlvbihpZCxuZXdJdGVtKXt2YXIgaW5kZXg9aXRlbUluZGV4KGlkKTstMSE9PWluZGV4JiYoaXRlbXNbaW5kZXhdPW5ld0l0ZW0pfSxmaW5kSXRlbT1mdW5jdGlvbihpZCl7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKWlmKGl0ZW1zW2ldLmluc3RhbmNlSWQ9PT1pZClyZXR1cm4gaXRlbXNbaV19LG5leHQ9ZnVuY3Rpb24oKXtpdGVtcy5sZW5ndGgmJihpdGVtc1swXS5zaG93PSEwLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCkpfSxfcmVtb3ZlPWZ1bmN0aW9uKGluc3RhbmNlSWQpe21PcHRzLnF1ZXVlPyhpdGVtcy5zaGlmdCgpLHNldFRpbWVvdXQobmV4dCwwKSk6cmVtb3ZlSXRlbShpbnN0YW5jZUlkKX0sc2V0UGF1c2VTdGF0ZT1mdW5jdGlvbihwYXVzZSxpbnN0YW5jZUlkKXt2YXIgaXRlbT1maW5kSXRlbShpbnN0YW5jZUlkKTtpdGVtJiYoaXRlbS5wYXVzZT1wYXVzZSxpdGVtLnVucGF1c2U9IXBhdXNlKX0sbWFrZUl0ZW09ZnVuY3Rpb24oaXRlbU9wdHMsaW5zdGFuY2VJZCl7dmFyIG9wdHM9XCJmdW5jdGlvblwiPT10eXBlb2YgaXRlbU9wdHM/aXRlbU9wdHMoKTppdGVtT3B0cyxyZXNvbHZlU2hvdz12b2lkIDAsZGlkU2hvdz1mdW5jdGlvbigpe3JldHVybiBvcHRzLmRpZFNob3cmJm9wdHMuZGlkU2hvdyhpbnN0YW5jZUlkKSxyZXNvbHZlU2hvdyhpbnN0YW5jZUlkKX0sc2hvd1Byb21pc2U9bmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSl7cmVzb2x2ZVNob3c9cmVzb2x2ZX0pLHJlc29sdmVIaWRlPXZvaWQgMCxkaWRIaWRlPWZ1bmN0aW9uKCl7cmV0dXJuIG9wdHMuZGlkSGlkZSYmb3B0cy5kaWRIaWRlKGluc3RhbmNlSWQpLG1PcHRzLnF1ZXVlJiZfcmVtb3ZlKGluc3RhbmNlSWQpLHJlc29sdmVIaWRlKGluc3RhbmNlSWQpfSxoaWRlUHJvbWlzZT1uZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtyZXNvbHZlSGlkZT1yZXNvbHZlfSk7cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sbU9wdHMse2luc3RhbmNlSWQ6aW5zdGFuY2VJZCxvcHRzOm9wdHMsc2hvdzohbU9wdHMucXVldWUsc2hvd1Byb21pc2U6c2hvd1Byb21pc2UsaGlkZVByb21pc2U6aGlkZVByb21pc2UsZGlkU2hvdzpkaWRTaG93LGRpZEhpZGU6ZGlkSGlkZX0pfTtyZXR1cm57Y291bnQ6ZnVuY3Rpb24oKXtyZXR1cm4gaXRlbXMubGVuZ3RofSxjbGVhcjpmdW5jdGlvbigpe3JldHVybiBpdGVtcy5sZW5ndGg9MH0sc2hvdzpmdW5jdGlvbihvcHRzKXt2YXIgaW5zdGFuY2VJZD1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/bU9wdHMuZGVmYXVsdElkOmFyZ3VtZW50c1sxXSxpdGVtPXZvaWQgMDtpZihtT3B0cy5xdWV1ZSlpdGVtPW1ha2VJdGVtKG9wdHMsaW5zdGFuY2VJZCksaXRlbXMucHVzaChpdGVtKSwxPT09aXRlbXMubGVuZ3RoJiZuZXh0KCk7ZWxzZXt2YXIgc3RvcmVkSXRlbT1maW5kSXRlbShpbnN0YW5jZUlkKTtpdGVtPW1ha2VJdGVtKG9wdHMsaW5zdGFuY2VJZCksc3RvcmVkSXRlbT9yZXBsYWNlSXRlbShpbnN0YW5jZUlkLGl0ZW0pOml0ZW1zLnB1c2goaXRlbSl9cmV0dXJuIGl0ZW0uc2hvd1Byb21pc2V9LGhpZGU6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2VJZD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/bU9wdHMuZGVmYXVsdElkOmFyZ3VtZW50c1swXSxpdGVtPXZvaWQgMDtyZXR1cm4gbU9wdHMucXVldWU/aXRlbXMubGVuZ3RoJiYoaXRlbT1pdGVtc1swXSk6aXRlbT1maW5kSXRlbShpbnN0YW5jZUlkKSxpdGVtPyhpdGVtLmhpZGU9ITAsaXRlbS5oaWRlUHJvbWlzZSk6UHJvbWlzZS5yZXNvbHZlKGluc3RhbmNlSWQpfSxyZW1vdmU6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2VJZD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/bU9wdHMuZGVmYXVsdElkOmFyZ3VtZW50c1swXTtfcmVtb3ZlKGluc3RhbmNlSWQpfSxwYXVzZTpmdW5jdGlvbigpe3ZhciBpbnN0YW5jZUlkPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9tT3B0cy5kZWZhdWx0SWQ6YXJndW1lbnRzWzBdO3NldFBhdXNlU3RhdGUoITAsaW5zdGFuY2VJZCl9LHVucGF1c2U6ZnVuY3Rpb24oKXt2YXIgaW5zdGFuY2VJZD1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/bU9wdHMuZGVmYXVsdElkOmFyZ3VtZW50c1swXTtzZXRQYXVzZVN0YXRlKCExLGluc3RhbmNlSWQpfSx2aWV3OmZ1bmN0aW9uKCl7dmFyIHRvU2hvd0l0ZW1zPWl0ZW1zLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zaG93fSk7cmV0dXJuIHRvU2hvd0l0ZW1zLmxlbmd0aD8oZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKG1PcHRzLmJvZHlTaG93Q2xhc3MpLCgwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKG1PcHRzLnRhZyx0b1Nob3dJdGVtcy5tYXAoZnVuY3Rpb24oaXRlbURhdGEpe3JldHVybiBfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChtT3B0cy5pbnN0YW5jZSxPYmplY3QuYXNzaWduKHt9LGl0ZW1EYXRhLHt0cmFuc2l0aW9uczptT3B0cy50cmFuc2l0aW9ucyxrZXk6aXRlbURhdGEua2V5fHxpdGVtRGF0YS5pbnN0YW5jZUlkfSkpfSkpKTooZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKG1PcHRzLmJvZHlTaG93Q2xhc3MpLCgwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKG1PcHRzLm5vbmVUYWcpKX19fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1tdWx0aXBsZSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW11bHRpcGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5hc3NpZ258fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsXCJhc3NpZ25cIix7ZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6ZnVuY3Rpb24odGFyZ2V0KXtpZih2b2lkIDA9PT10YXJnZXR8fG51bGw9PT10YXJnZXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdFwiKTtmb3IodmFyIHRvPU9iamVjdCh0YXJnZXQpLGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXt2YXIgbmV4dFNvdXJjZT1hcmd1bWVudHNbaV07aWYodm9pZCAwIT09bmV4dFNvdXJjZSYmbnVsbCE9PW5leHRTb3VyY2Upe25leHRTb3VyY2U9T2JqZWN0KG5leHRTb3VyY2UpO2Zvcih2YXIga2V5c0FycmF5PU9iamVjdC5rZXlzKG5leHRTb3VyY2UpLG5leHRJbmRleD0wLGxlbj1rZXlzQXJyYXkubGVuZ3RoO2xlbj5uZXh0SW5kZXg7bmV4dEluZGV4Kyspe3ZhciBuZXh0S2V5PWtleXNBcnJheVtuZXh0SW5kZXhdLGRlc2M9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLG5leHRLZXkpO3ZvaWQgMCE9PWRlc2MmJmRlc2MuZW51bWVyYWJsZSYmKHRvW25leHRLZXldPW5leHRTb3VyY2VbbmV4dEtleV0pfX19cmV0dXJuIHRvfX0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JqZWN0LmFzc2lnbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfajJjPXJlcXVpcmUoXCJqMmNcIiksX2oyYzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfajJjKSxyZW1vdmU9ZnVuY3Rpb24oaWQpe2lmKGlkKXt2YXIgb2xkPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtvbGQmJm9sZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZCl9fSxhZGQ9ZnVuY3Rpb24oaWQpe2Zvcih2YXIgX2xlbj1hcmd1bWVudHMubGVuZ3RoLHN0eWxlcz1BcnJheShfbGVuPjE/X2xlbi0xOjApLF9rZXk9MTtfbGVuPl9rZXk7X2tleSsrKXN0eWxlc1tfa2V5LTFdPWFyZ3VtZW50c1tfa2V5XTtyZW1vdmUoaWQpO3ZhciBzdHlsZUVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtpZCYmc3R5bGVFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLGlkKSxzdHlsZXMuZm9yRWFjaChmdW5jdGlvbihzdHlsZUxpc3Qpe09iamVjdC5rZXlzKHN0eWxlTGlzdCkubGVuZ3RoJiZzdHlsZUxpc3QuZm9yRWFjaChmdW5jdGlvbihzdHlsZSl7dmFyIHNjb3BlZD17XCJAZ2xvYmFsXCI6c3R5bGV9LHNoZWV0PV9qMmMyW1wiZGVmYXVsdFwiXS5zaGVldChzY29wZWQpO3N0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc2hlZXQpKX0pfSksZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKX07ZXhwb3J0c1tcImRlZmF1bHRcIl09e2FkZDphZGQscmVtb3ZlOnJlbW92ZX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHlsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oKXt2YXIgZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpLGFuaW1hdGlvbnM9e2FuaW1hdGlvbjpcImFuaW1hdGlvbmVuZFwiLE9BbmltYXRpb246XCJvQW5pbWF0aW9uRW5kXCIsTW96QW5pbWF0aW9uOlwiYW5pbWF0aW9uZW5kXCIsV2Via2l0QW5pbWF0aW9uOlwid2Via2l0QW5pbWF0aW9uRW5kXCJ9O2Zvcih2YXIgYSBpbiBhbmltYXRpb25zKWlmKHZvaWQgMCE9PWVsLnN0eWxlW2FdKXJldHVybiBhbmltYXRpb25zW2FdfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYW5zaXRpb24tZXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLFNIT1dfRFVSQVRJT049LjIyLEhJREVfRFVSQVRJT049LjIsU0hPV19ERUxBWT0wLEhJREVfREVMQVk9MCxUUkFOU0lUSU9OPVwiYm90aFwiLHNob3c9ZnVuY3Rpb24ob3B0cyl7cmV0dXJuIHRyYW5zaXRpb24ob3B0cyxcInNob3dcIil9LGhpZGU9ZnVuY3Rpb24ob3B0cyl7cmV0dXJuIHRyYW5zaXRpb24ob3B0cyxcImhpZGVcIil9LGdldER1cmF0aW9uPWZ1bmN0aW9uKG9wdHMsc3RhdGUpe3ZhciB0cmFuc2l0aW9uPW9wdHMudHJhbnNpdGlvbnx8VFJBTlNJVElPTjtyZXR1cm5cIm5vbmVcIj09PXRyYW5zaXRpb24/MDpcInNob3dcIj09PXRyYW5zaXRpb24mJlwiaGlkZVwiPT09c3RhdGU/MDpcImhpZGVcIj09PXRyYW5zaXRpb24mJlwic2hvd1wiPT09c3RhdGU/MDpcInNob3dcIj09PXN0YXRlP3ZvaWQgMCE9PW9wdHMuc2hvd0R1cmF0aW9uP29wdHMuc2hvd0R1cmF0aW9uOlNIT1dfRFVSQVRJT046dm9pZCAwIT09b3B0cy5oaWRlRHVyYXRpb24/b3B0cy5oaWRlRHVyYXRpb246SElERV9EVVJBVElPTn0sZ2V0RGVsYXk9ZnVuY3Rpb24ob3B0cyxzdGF0ZSl7dmFyIHRyYW5zaXRpb249b3B0cy50cmFuc2l0aW9ufHxUUkFOU0lUSU9OO3JldHVyblwibm9uZVwiPT09dHJhbnNpdGlvbj8wOlwic2hvd1wiPT09dHJhbnNpdGlvbiYmXCJoaWRlXCI9PT1zdGF0ZT8wOlwiaGlkZVwiPT09dHJhbnNpdGlvbiYmXCJzaG93XCI9PT1zdGF0ZT8wOlwic2hvd1wiPT09c3RhdGU/dm9pZCAwIT09b3B0cy5zaG93RGVsYXk/b3B0cy5zaG93RGVsYXk6U0hPV19ERUxBWTp2b2lkIDAhPT1vcHRzLmhpZGVEZWxheT9vcHRzLmhpZGVEZWxheTpISURFX0RFTEFZfSx0cmFuc2l0aW9uPWZ1bmN0aW9uKG9wdHMsc3RhdGUpe3ZhciBkZWZlcnJlZD1fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmRlZmVycmVkKCksZWw9b3B0cy5lbDtpZighZWwpcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoKSxkZWZlcnJlZC5wcm9taXNlO3ZhciB0cmFuc2l0aW9uRHVyYXRpb249MWUzKmdldER1cmF0aW9uKG9wdHMsc3RhdGUpLGRlbGF5PTFlMypnZXREZWxheShvcHRzLHN0YXRlKSxzdHlsZT1lbC5zdHlsZSxiZWZvcmVUcmFuc2l0aW9uPW9wdHMuYmVmb3JlU2hvdyYmXCJzaG93XCI9PT1zdGF0ZT9mdW5jdGlvbigpe3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbj1cIjBtc1wiLHN0eWxlLnRyYW5zaXRpb25EZWxheT1cIjBtc1wiLG9wdHMuYmVmb3JlU2hvdygpfTpudWxsLGFwcGx5VHJhbnNpdGlvbj1mdW5jdGlvbigpe3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbj10cmFuc2l0aW9uRHVyYXRpb24rXCJtc1wiLHN0eWxlLnRyYW5zaXRpb25EZWxheT1kZWxheStcIm1zXCIsb3B0cy5zaG93Q2xhc3MmJmVsLmNsYXNzTGlzdFtcInNob3dcIj09PXN0YXRlP1wiYWRkXCI6XCJyZW1vdmVcIl0ob3B0cy5zaG93Q2xhc3MpLG9wdHMuc2hvdyYmXCJmdW5jdGlvblwiPT10eXBlb2Ygb3B0cy5zaG93JiZcInNob3dcIj09PXN0YXRlJiZvcHRzLnNob3coKSxvcHRzLmhpZGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIG9wdHMuaGlkZSYmXCJoaWRlXCI9PT1zdGF0ZSYmb3B0cy5oaWRlKCl9LGFwcGx5QWZ0ZXJUcmFuc2l0aW9uPWZ1bmN0aW9uKCl7b3B0cy5hZnRlckhpZGUmJlwiaGlkZVwiPT09c3RhdGUmJihzdHlsZS50cmFuc2l0aW9uRHVyYXRpb249XCIwbXNcIixzdHlsZS50cmFuc2l0aW9uRGVsYXk9XCIwbXNcIixvcHRzLmFmdGVySGlkZSgpKX0sZG9UcmFuc2l0aW9uPWZ1bmN0aW9uKCl7YXBwbHlUcmFuc2l0aW9uKCksc2V0VGltZW91dChmdW5jdGlvbigpe2FwcGx5QWZ0ZXJUcmFuc2l0aW9uKCksZGVmZXJyZWQucmVzb2x2ZSgpfSx0cmFuc2l0aW9uRHVyYXRpb24rZGVsYXkpfSxtYXliZURlbGF5VHJhbnNpdGlvbj1mdW5jdGlvbigpezA9PT10cmFuc2l0aW9uRHVyYXRpb24/ZG9UcmFuc2l0aW9uKCk6c2V0VGltZW91dChmdW5jdGlvbigpe2RvVHJhbnNpdGlvbigpfSwwKX07cmV0dXJuIGJlZm9yZVRyYW5zaXRpb24/KGJlZm9yZVRyYW5zaXRpb24oKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bWF5YmVEZWxheVRyYW5zaXRpb24oKX0sMCkpOm1heWJlRGVsYXlUcmFuc2l0aW9uKCksZGVmZXJyZWQucHJvbWlzZX07ZXhwb3J0c1tcImRlZmF1bHRcIl09e3Nob3c6c2hvdyxoaWRlOmhpZGV9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNpdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx3aW5kb3cuV2ViRm9udENvbmZpZ3x8KHdpbmRvdy5XZWJGb250Q29uZmlnPXt9LGZ1bmN0aW9uKCl7dmFyIHdmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7d2Yuc3JjPShcImh0dHBzOlwiPT09ZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2w/XCJodHRwc1wiOlwiaHR0cFwiKStcIjovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3dlYmZvbnQvMS93ZWJmb250LmpzXCIsd2YudHlwZT1cInRleHQvamF2YXNjcmlwdFwiLHdmLmFzeW5jPVwidHJ1ZVwiO3ZhciBzPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO3MucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod2Yscyl9KCkpO3ZhciB3ZWJmb250TG9hZGVyPXthZGQ6ZnVuY3Rpb24odmVuZG9yLGZhbWlseSxrZXkpe3ZhciB2ZW5kb3JDZmc9d2luZG93LldlYkZvbnRDb25maWdbdmVuZG9yXXx8e307dmVuZG9yQ2ZnLmZhbWlsaWVzPXZlbmRvckNmZy5mYW1pbGllc3x8W10sdmVuZG9yQ2ZnLmZhbWlsaWVzLnB1c2goZmFtaWx5KSxrZXkmJih2ZW5kb3JDZmcua2V5PWtleSksd2luZG93LldlYkZvbnRDb25maWdbdmVuZG9yXT12ZW5kb3JDZmd9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT13ZWJmb250TG9hZGVyLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViZm9udGxvYWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfZGVmYXVsdD1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9kZWZhdWx0XCIpLF9kZWZhdWx0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0KTtleHBvcnRzW1wiZGVmYXVsdFwiXT1fZGVmYXVsdDJbXCJkZWZhdWx0XCJdLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VzdG9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBoZXg9ZnVuY3Rpb24oX2hleCl7dmFyIGJpZ2ludD1wYXJzZUludChfaGV4LnN1YnN0cmluZygxKSwxNikscj1iaWdpbnQ+PjE2JjI1NSxnPWJpZ2ludD4+OCYyNTUsYj0yNTUmYmlnaW50O3JldHVybiByK1wiLFwiK2crXCIsXCIrYn0scmdiYT1mdW5jdGlvbihjb2xvclN0cil7dmFyIG9wYWNpdHk9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdPzE6YXJndW1lbnRzWzFdO3JldHVyblwicmdiYShcIitjb2xvclN0citcIixcIitvcGFjaXR5K1wiKVwifSxpc0ludGVnZXI9ZnVuY3Rpb24oblZhbCl7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIG5WYWwmJmlzRmluaXRlKG5WYWwpJiZuVmFsPi05MDA3MTk5MjU0NzQwOTkyJiY5MDA3MTk5MjU0NzQwOTkyPm5WYWwmJk1hdGguZmxvb3IoblZhbCk9PT1uVmFsfSxpc0Rlc2t0b3A9d2luZG93LmlubmVyV2lkdGg+PTEwMjQsZ3JpZF91bml0PTQsZ3JpZF91bml0X2NvbXBvbmVudD04LGFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2Zhc3Rfb3V0PVwiY3ViaWMtYmV6aWVyKC40LCAwLCAuMiwgMSlcIixhbmltYXRpb25fY3VydmVfc2xvd19pbl9saW5lYXJfb3V0PVwiY3ViaWMtYmV6aWVyKDAsIDAsIC4yLCAxKVwiLGFuaW1hdGlvbl9jdXJ2ZV9saW5lYXJfaW5fZmFzdF9vdXQ9XCJjdWJpYy1iZXppZXIoLjQsIDAsIDEsIDEpXCI7ZXhwb3J0c1tcImRlZmF1bHRcIl09e3JnYmE6cmdiYSxoZXg6aGV4LGlzSW50ZWdlcjppc0ludGVnZXIsZ3JpZF91bml0OmdyaWRfdW5pdCxncmlkX3VuaXRfY29tcG9uZW50OmdyaWRfdW5pdF9jb21wb25lbnQsZ3JpZF91bml0X21lbnU6NTYsZ3JpZF91bml0X2ljb25fYnV0dG9uOjYqZ3JpZF91bml0X2NvbXBvbmVudCx1bml0X2Jsb2NrX2JvcmRlcl9yYWRpdXM6Mix1bml0X2l0ZW1fYm9yZGVyX3JhZGl1czoyLHVuaXRfaW5kZW50OjcyLHVuaXRfc2lkZV9wYWRkaW5nOmlzRGVza3RvcD8yNDoxNix1bml0X3RvdWNoX2hlaWdodDo0OCx1bml0X2ljb25fc2l6ZV9zbWFsbDoyKmdyaWRfdW5pdF9jb21wb25lbnQsdW5pdF9pY29uX3NpemU6MypncmlkX3VuaXRfY29tcG9uZW50LHVuaXRfaWNvbl9zaXplX21lZGl1bTo0KmdyaWRfdW5pdF9jb21wb25lbnQsdW5pdF9pY29uX3NpemVfbGFyZ2U6NSpncmlkX3VuaXRfY29tcG9uZW50LHVuaXRfc2NyZWVuX3NpemVfZXh0cmFfbGFyZ2U6MTI4MCx1bml0X3NjcmVlbl9zaXplX2xhcmdlOjk2MCx1bml0X3NjcmVlbl9zaXplX21lZGl1bTo0ODAsdW5pdF9zY3JlZW5fc2l6ZV9zbWFsbDozMjAsYW5pbWF0aW9uX2R1cmF0aW9uOlwiLjE4c1wiLGFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2Zhc3Rfb3V0OmFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2Zhc3Rfb3V0LGFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2xpbmVhcl9vdXQ6YW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fbGluZWFyX291dCxhbmltYXRpb25fY3VydmVfbGluZWFyX2luX2Zhc3Rfb3V0OmFuaW1hdGlvbl9jdXJ2ZV9saW5lYXJfaW5fZmFzdF9vdXQsYW5pbWF0aW9uX2N1cnZlX2RlZmF1bHQ6XCJlYXNlLW91dFwiLGZvbnRfd2VpZ2h0X2xpZ2h0OjMwMCxmb250X3dlaWdodF9ub3JtYWw6NDAwLGZvbnRfd2VpZ2h0X21lZGl1bTo1MDAsZm9udF93ZWlnaHRfYm9sZDo3MDAsZm9udF9zaXplX3RpdGxlOjIwLGxpbmVfaGVpZ2h0OjEuMyxjb2xvcl9wcmltYXJ5OlwiMzMsIDE1MCwgMjQzXCIsY29sb3JfcHJpbWFyeV9hY3RpdmU6XCIzMCwgMTM2LCAyMjlcIixjb2xvcl9wcmltYXJ5X2Rhcms6XCIyNSwgMTE4LCAyMTBcIixjb2xvcl9wcmltYXJ5X2ZhZGVkOlwiMTAwLCAxODEsIDI0OVwiLGNvbG9yX3ByaW1hcnlfZm9yZWdyb3VuZDpcIjI1NSwgMjU1LCAyNTVcIixjb2xvcl9saWdodF9iYWNrZ3JvdW5kOlwiMjU1LCAyNTUsIDI1NVwiLGNvbG9yX2xpZ2h0X2ZvcmVncm91bmQ6XCIwLCAwLCAwXCIsY29sb3JfZGFya19iYWNrZ3JvdW5kOlwiMzQsIDM0LCAzNFwiLGNvbG9yX2RhcmtfZm9yZWdyb3VuZDpcIjI1NSwgMjU1LCAyNTVcIixibGVuZF9saWdodF90ZXh0X3ByaW1hcnk6Ljg3LGJsZW5kX2xpZ2h0X3RleHRfcmVndWxhcjouNzMsYmxlbmRfbGlnaHRfdGV4dF9zZWNvbmRhcnk6LjU0LGJsZW5kX2xpZ2h0X3RleHRfdGVydGlhcnk6LjQsYmxlbmRfbGlnaHRfdGV4dF9kaXNhYmxlZDouMjYsYmxlbmRfbGlnaHRfYm9yZGVyX2xpZ2h0Oi4xMSxibGVuZF9saWdodF9iYWNrZ3JvdW5kX2FjdGl2ZTouMTQsYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3ZlcjouMDYsYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3Zlcl9tZWRpdW06LjEyLGJsZW5kX2xpZ2h0X2JhY2tncm91bmRfZGlzYWJsZWQ6LjA5LGJsZW5kX2xpZ2h0X292ZXJsYXlfYmFja2dyb3VuZDouMyxibGVuZF9kYXJrX3RleHRfcHJpbWFyeToxLGJsZW5kX2RhcmtfdGV4dF9yZWd1bGFyOi44NyxibGVuZF9kYXJrX3RleHRfc2Vjb25kYXJ5Oi43LGJsZW5kX2RhcmtfdGV4dF90ZXJ0aWFyeTouNCxibGVuZF9kYXJrX3RleHRfZGlzYWJsZWQ6LjI2LGJsZW5kX2RhcmtfYm9yZGVyX2xpZ2h0Oi4xLGJsZW5kX2RhcmtfYmFja2dyb3VuZF9hY3RpdmU6LjE0LGJsZW5kX2RhcmtfYmFja2dyb3VuZF9ob3ZlcjouMDgsYmxlbmRfZGFya19iYWNrZ3JvdW5kX2hvdmVyTWVkaXVtOi4xMixibGVuZF9kYXJrX2JhY2tncm91bmRfZGlzYWJsZWQ6LjEyLGJsZW5kX2Rhcmtfb3ZlcmxheV9iYWNrZ3JvdW5kOi4zLHByZWZpeGVzX2FuaW1hdGlvbjpbXCJvXCIsXCJtb3pcIixcIndlYmtpdFwiXSxwcmVmaXhlc19hcHBlYXJhbmNlOltcIm9cIixcIm1velwiLFwibXNcIixcIndlYmtpdFwiXSxwcmVmaXhlc19iYWNrZ3JvdW5kX3NpemU6W1wib1wiLFwibW96XCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfYm94X3NoYWRvdzpbXCJtb3pcIixcIndlYmtpdFwiXSxwcmVmaXhlc19rZXlmcmFtZXM6W1wib1wiLFwibW96XCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfdHJhbnNmb3JtOltcIm9cIixcIm1velwiLFwibXNcIixcIndlYmtpdFwiXSxwcmVmaXhlc190cmFuc2l0aW9uOltcIm9cIixcIm1velwiLFwid2Via2l0XCJdLHByZWZpeGVzX3VzZXJfc2VsZWN0OltcIm1velwiLFwibXNcIixcIndlYmtpdFwiXSxicmVha3BvaW50X3NtYWxsX2hhbmRzZXRfcG9ydHJhaXQ6MCxicmVha3BvaW50X21lZGl1bV9oYW5kc2V0X3BvcnRyYWl0OjM2MCxicmVha3BvaW50X2xhcmdlX2hhbmRzZXRfcG9ydHJhaXQ6NDAwLGJyZWFrcG9pbnRfc21hbGxfdGFibGV0X3BvcnRyYWl0OjYwMCxicmVha3BvaW50X2xhcmdlX3RhYmxldF9wb3J0cmFpdDo3MjAsYnJlYWtwb2ludF9zbWFsbF9oYW5kc2V0X2xhbmRzY2FwZTo0ODAsYnJlYWtwb2ludF9tZWRpdW1faGFuZHNldF9sYW5kc2NhcGU6NjAwLGJyZWFrcG9pbnRfbGFyZ2VfaGFuZHNldF9sYW5kc2NhcGU6NzIwLGVudl90YWJsZXQ6d2luZG93LmlubmVyV2lkdGg+PTYwMCxlbnZfZGVza3RvcDp3aW5kb3cuaW5uZXJXaWR0aD49MTAyNCx6X21lbnU6OTksel9oZWFkZXJfY29udGFpbmVyOjk5OSx6X25vdGlmaWNhdGlvbjo5OTk4LHpfZGlhbG9nOjk5OTl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9ldmVudHM9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vZXZlbnRzXCIpLF9ldmVudHMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50cyksX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9kaWFsb2c9cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvZGlhbG9nXCIpLF9kaWFsb2cyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RpYWxvZyksX3RyYW5zaXRpb249cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vdHJhbnNpdGlvblwiKSxfdHJhbnNpdGlvbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHJhbnNpdGlvbiksX3NoYWRvdz1yZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy9zaGFkb3dcIiksX3NoYWRvdzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2hhZG93KTtyZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtZGlhbG9nXCIsdmlzaWJsZTpcInBlLWRpYWxvZy0tdmlzaWJsZVwiLGJvZHk6XCJwZS1kaWFsb2dfX2JvZHlcIixmdWxsc2NyZWVuOlwicGUtZGlhbG9nLS1mdWxsc2NyZWVuXCIsY29udGVudDpcInBlLWRpYWxvZ19fY29udGVudFwiLGhlYWRlcjpcInBlLWRpYWxvZ19faGVhZGVyXCIsZm9vdGVyOlwicGUtZGlhbG9nX19mb290ZXJcIixmb290ZXJIaWdoOlwicGUtZGlhbG9nX19mb290ZXItLWhpZ2hcIix0aXRsZTpcInBlLWRpYWxvZ19fdGl0bGVcIixhY3Rpb25zOlwicGUtZGlhbG9nX19hY3Rpb25zXCIsaGFzQmFja2Ryb3A6XCJwZS1kaWFsb2ctLWJhY2tkcm9wXCIsaGFzVG9wT3ZlcmZsb3c6XCJwZS1kaWFsb2ctLW92ZXJmbG93LXRvcFwiLGhhc0JvdHRvbU92ZXJmbG93OlwicGUtZGlhbG9nLS1vdmVyZmxvdy1ib3R0b21cIixtZW51Q29udGVudDpcInBlLW1lbnVfX2NvbnRlbnRcIn0sU0NST0xMX1dBVENIX1RJTUVSPTE1MCx1cGRhdGVTY3JvbGxTdGF0ZT1mdW5jdGlvbihjdHJsKXt2YXIgc2Nyb2xsZXI9Y3RybC5zY3JvbGxFbDtzY3JvbGxlciYmKGN0cmwudG9wT3ZlcmZsb3c9c2Nyb2xsZXIuc2Nyb2xsVG9wPjAsY3RybC5ib3R0b21PdmVyZmxvdz1zY3JvbGxlci5zY3JvbGxIZWlnaHQtKHNjcm9sbGVyLnNjcm9sbFRvcCtzY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpPjApfSx1cGRhdGVGb290ZXJTdGF0ZT1mdW5jdGlvbihjdHJsKXt2YXIgZm9vdGVyRWw9Y3RybC5mb290ZXJFbDtpZihmb290ZXJFbCl7dmFyIHN0eWxlPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGZvb3RlckVsKSxoZWlnaHQ9Zm9vdGVyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LG1pbkhlaWdodD1wYXJzZUludChzdHlsZS5taW5IZWlnaHQsMTApO2hlaWdodD5taW5IZWlnaHQ/Zm9vdGVyRWwuY2xhc3NMaXN0LmFkZChDU1NfQ0xBU1NFUy5mb290ZXJIaWdoKTpmb290ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKENTU19DTEFTU0VTLmZvb3RlckhpZ2gpfX0sc2hvdz1mdW5jdGlvbihjdHJsLG9wdHMpe3ZhciBpZD1jdHJsLmluc3RhbmNlSWQ7cmV0dXJuIGN0cmwuaXNUcmFuc2l0aW9uaW5nPSEwLF90cmFuc2l0aW9uMltcImRlZmF1bHRcIl0uc2hvdyhPYmplY3QuYXNzaWduKHt9LG9wdHMse2VsOmN0cmwuZWwsc2hvd0NsYXNzOkNTU19DTEFTU0VTLnZpc2libGV9KSkudGhlbihmdW5jdGlvbigpe2N0cmwuaXNUcmFuc2l0aW9uaW5nPSExLGN0cmwudmlzaWJsZT0hMCxjdHJsLmRpZFNob3cmJmN0cmwuZGlkU2hvdyhpZCl9KX0saGlkZT1mdW5jdGlvbihjdHJsLG9wdHMpe3ZhciBpZD1jdHJsLmluc3RhbmNlSWQ7cmV0dXJuIGN0cmwuaXNUcmFuc2l0aW9uaW5nPSEwLF90cmFuc2l0aW9uMltcImRlZmF1bHRcIl0uaGlkZShPYmplY3QuYXNzaWduKHt9LG9wdHMse2VsOmN0cmwuZWwsc2hvd0NsYXNzOkNTU19DTEFTU0VTLnZpc2libGV9KSkudGhlbihmdW5jdGlvbigpe19kaWFsb2cyW1wiZGVmYXVsdFwiXS5yZW1vdmUoaWQpLGN0cmwuaXNUcmFuc2l0aW9uaW5nPSExLGN0cmwudmlzaWJsZT0hMSxjdHJsLmRpZEhpZGUmJmN0cmwuZGlkSGlkZShpZCksc2V0VGltZW91dChfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdywwKX0pfSxjcmVhdGVWaWV3Q29udGVudD1mdW5jdGlvbihjdHJsLG9wdHMpe3ZhciBzdHlsZT17fSxib2R5T3B0cz1vcHRzLmJvZHl8fG9wdHMubWVudTtyZXR1cm4oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuYm9keSwgXCJzdHlsZVwiOiBzdHlsZSwgXCJjb25maWdcIjogZnVuY3Rpb24oZWwsaW5pdGVkKXtpbml0ZWR8fChjdHJsLnNjcm9sbEVsPWVsKX0sIFwib25zY3JvbGxcIjogZnVuY3Rpb24oKXtjdHJsLmlzU2Nyb2xsaW5nPSEwLHVwZGF0ZVNjcm9sbFN0YXRlKGN0cmwpLGNsZWFyVGltZW91dChjdHJsLnNjcm9sbFdhdGNoSWQpLGN0cmwuc2Nyb2xsV2F0Y2hJZD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y3RybC5pc1Njcm9sbGluZz0hMX0sU0NST0xMX1dBVENIX1RJTUVSKX0gfSwgY2hpbGRyZW46IFsgYm9keU9wdHMgXSB9KX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLGJvZHlPcHRzPW9wdHMuYm9keXx8b3B0cy5tZW51LHVwZGF0ZUNvbnRlbnRPblNjcm9sbD1vcHRzLnVwZGF0ZUNvbnRlbnRPblNjcm9sbHx8ITEsaWdub3JlQ29udGVudD0hdXBkYXRlQ29udGVudE9uU2Nyb2xsJiZjdHJsLmlzU2Nyb2xsaW5nLHRhZz1vcHRzLnRhZ3x8XCJmb3JtXCIsdXBkYXRlPWZ1bmN0aW9uKCl7dXBkYXRlU2Nyb2xsU3RhdGUoY3RybCksdXBkYXRlRm9vdGVyU3RhdGUoY3RybCksX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKX0scHJvcHM9T2JqZWN0LmFzc2lnbih7fSx7XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzLmZ1bGxzY3JlZW4/Q1NTX0NMQVNTRVMuZnVsbHNjcmVlbjpudWxsLG9wdHMuYmFja2Ryb3A/Q1NTX0NMQVNTRVMuaGFzQmFja2Ryb3A6bnVsbCxjdHJsLnRvcE92ZXJmbG93fHxvcHRzLmJvcmRlcnM/Q1NTX0NMQVNTRVMuaGFzVG9wT3ZlcmZsb3c6bnVsbCxjdHJsLmJvdHRvbU92ZXJmbG93fHxvcHRzLmJvcmRlcnM/Q1NTX0NMQVNTRVMuaGFzQm90dG9tT3ZlcmZsb3c6bnVsbCxjdHJsLnZpc2libGU/Q1NTX0NMQVNTRVMudmlzaWJsZTpudWxsLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6ZnVuY3Rpb24oZWwsaW5pdGVkLGNvbnRleHQsdmRvbSl7aWYoIWluaXRlZCl7b3B0cy5jb25maWcmJm9wdHMuY29uZmlnKGVsLGluaXRlZCxjb250ZXh0LHZkb20pLGN0cmwuZWw9ZWw7dmFyIGNsZWFudXA9ZnVuY3Rpb24oKXtfZXZlbnRzMltcImRlZmF1bHRcIl0udW5zdWJzY3JpYmUoXCJyZXNpemVcIix1cGRhdGUpLF9ldmVudHMyW1wiZGVmYXVsdFwiXS51bnN1YnNjcmliZShcImtleWRvd25cIixoYW5kbGVFc2NhcGUpfSxoYW5kbGVFc2NhcGU9ZnVuY3Rpb24oZSl7b3B0cy5mdWxsc2NyZWVufHxvcHRzLmJhY2tkcm9wfHwyNz09PWUud2hpY2gmJihjbGVhbnVwKCksaGlkZShjdHJsLE9iamVjdC5hc3NpZ24oe30sb3B0cyx7aGlkZURlbGF5OjB9KSkpfTtfZXZlbnRzMltcImRlZmF1bHRcIl0uc3Vic2NyaWJlKFwicmVzaXplXCIsdXBkYXRlKSxfZXZlbnRzMltcImRlZmF1bHRcIl0uc3Vic2NyaWJlKFwia2V5ZG93blwiLGhhbmRsZUVzY2FwZSksY29udGV4dC5vbnVubG9hZD1mdW5jdGlvbigpe2NsZWFudXAoKX0sdXBkYXRlU2Nyb2xsU3RhdGUoY3RybCksdXBkYXRlRm9vdGVyU3RhdGUoY3RybCksc2hvdyhjdHJsLG9wdHMpLnRoZW4oZnVuY3Rpb24oKXt1cGRhdGVTY3JvbGxTdGF0ZShjdHJsKSx1cGRhdGVGb290ZXJTdGF0ZShjdHJsKSwoY3RybC50b3BPdmVyZmxvd3x8Y3RybC5ib3R0b21PdmVyZmxvdykmJnNldFRpbWVvdXQoX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcsMCl9KX19LG9uY2xpY2s6ZnVuY3Rpb24oZSl7ZS50YXJnZXQ9PT1jdHJsLmVsJiYob3B0cy5tb2RhbHx8Y3RybC5pc1RyYW5zaXRpb25pbmd8fGhpZGUoY3RybCxPYmplY3QuYXNzaWduKHt9LG9wdHMse2hpZGVEZWxheTowfSkpKX19LG9wdHMuZm9ybU9wdGlvbnM/b3B0cy5mb3JtT3B0aW9uczpudWxsKSxib2R5PWJvZHlPcHRzP2lnbm9yZUNvbnRlbnQ/e3N1YnRyZWU6XCJyZXRhaW5cIn06Y3JlYXRlVmlld0NvbnRlbnQoY3RybCxvcHRzKTpudWxsLGNvbnRlbnQ9KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IFtDU1NfQ0xBU1NFUy5jb250ZW50LG9wdHMubWVudT9DU1NfQ0xBU1NFUy5tZW51Q29udGVudDpudWxsXS5qb2luKFwiIFwiKSB9LCBjaGlsZHJlbjogWyBvcHRzLmZ1bGxzY3JlZW4/bnVsbDpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfc2hhZG93MltcImRlZmF1bHRcIl0se3o6Y3RybC56LGFuaW1hdGVkOiEwfSksb3B0cy5mdWxsc2NyZWVuP251bGw6b3B0cy50aXRsZT8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuaGVhZGVyLCBcImNvbmZpZ1wiOiBmdW5jdGlvbihlbCl7Y3RybC5oZWFkZXJIZWlnaHQ9ZWwuc2Nyb2xsSGVpZ2h0fSB9LCBjaGlsZHJlbjogWyAoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMudGl0bGUgfSwgY2hpbGRyZW46IFsgb3B0cy50aXRsZSBdIH0pIF0gfSk6bnVsbCxib2R5LG9wdHMuZnVsbHNjcmVlbj9udWxsOm9wdHMuZm9vdGVyPyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5mb290ZXIsIFwiY29uZmlnXCI6IGZ1bmN0aW9uKGVsLGluaXRlZCl7Y3RybC5mb290ZXJIZWlnaHQ9ZWwuc2Nyb2xsSGVpZ2h0LGluaXRlZHx8KGN0cmwuZm9vdGVyRWw9ZWwpfSB9LCBjaGlsZHJlbjogWyAoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuYWN0aW9ucyB9LCBjaGlsZHJlbjogWyBvcHRzLmZvb3RlciBdIH0pIF0gfSk6bnVsbCBdIH0pO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17Y29udHJvbGxlcjpmdW5jdGlvbigpe3ZhciBpbnN0YW5jZURhdGE9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSxvcHRzPWluc3RhbmNlRGF0YS5vcHRzfHx7fSx6PXZvaWQgMCE9PW9wdHMuej9vcHRzLno6MztyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxpbnN0YW5jZURhdGEse2luc3RhbmNlSWQ6aW5zdGFuY2VEYXRhLmluc3RhbmNlSWQsejp6LHNjcm9sbEVsOm51bGwsZm9vdGVyRWw6bnVsbCx0b3BPdmVyZmxvdzohMSxib3R0b21PdmVyZmxvdzohMSxzY3JvbGxXYXRjaElkOjAsaXNTY3JvbGxpbmc6ITEsaGVhZGVySGVpZ2h0OjAsZm9vdGVySGVpZ2h0OjAsZWw6bnVsbCx2aXNpYmxlOiExLGlzVHJhbnNpdGlvbmluZzohMX0pfSx2aWV3OmZ1bmN0aW9uKGN0cmwsaW5zdGFuY2VEYXRhKXt2YXIgb3B0cz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpbnN0YW5jZURhdGEub3B0cz9pbnN0YW5jZURhdGEub3B0cygpOmluc3RhbmNlRGF0YS5vcHRzO3JldHVybiBpbnN0YW5jZURhdGEuaGlkZSYmIWN0cmwuaXNUcmFuc2l0aW9uaW5nJiZoaWRlKGN0cmwsb3B0cyksY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlhbG9nLWluc3RhbmNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9tdWx0aXBsZT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9tdWx0aXBsZVwiKSxfbXVsdGlwbGUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX211bHRpcGxlKSxfZGlhbG9nSW5zdGFuY2U9cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvZGlhbG9nLWluc3RhbmNlXCIpLF9kaWFsb2dJbnN0YW5jZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGlhbG9nSW5zdGFuY2UpO2V4cG9ydHNbXCJkZWZhdWx0XCJdPSgwLF9tdWx0aXBsZTJbXCJkZWZhdWx0XCJdKSh7aW5zdGFuY2U6X2RpYWxvZ0luc3RhbmNlMltcImRlZmF1bHRcIl0sZGVmYXVsdElkOlwiZGVmYXVsdF9kaWFsb2dcIix0YWc6XCIucGUtZGlhbG9nX19ob2xkZXJcIixub25lVGFnOlwic3Bhbi5wZS1kaWFsb2dfX3BsYWNlaG9sZGVyXCIsYm9keVNob3dDbGFzczpcInBlLWRpYWxvZy0tb3BlblwifSksbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaWFsb2cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1kaWFsb2dcIix7XCImLnBlLWRpYWxvZy0tYmFja2Ryb3BcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9iYWNrZHJvcF9iYWNrZ3JvdW5kXCJdfSxcIiAucGUtZGlhbG9nX19jb250ZW50XCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfY29udGVudF9iYWNrZ3JvdW5kXCJdfSxcIiAucGUtZGlhbG9nX19oZWFkZXIgLnBlLWRpYWxvZ19fdGl0bGVcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl90aXRsZV90ZXh0XCJdfSxcIiAucGUtZGlhbG9nX19ib2R5XCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9keV90ZXh0XCJdfSxcIiYucGUtZGlhbG9nLS1vdmVyZmxvdy10b3AgLnBlLWRpYWxvZ19fYm9keVwiOntcImJvcmRlci10b3AtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvZHlfYm9yZGVyXCJdfSxcIiYucGUtZGlhbG9nLS1vdmVyZmxvdy1ib3R0b20gLnBlLWRpYWxvZ19fYm9keVwiOntcImJvcmRlci1ib3R0b20tY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvZHlfYm9yZGVyXCJdfX0pXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIpLHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiJlwiKV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZykscmdiYT1fY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYTtleHBvcnRzW1wiZGVmYXVsdFwiXT17Ym9yZGVyX3JhZGl1czpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9ibG9ja19ib3JkZXJfcmFkaXVzLHBhZGRpbmc6MypfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCxoZWFkZXJfYm90dG9tOjIwLGhlYWRlcl9oZWlnaHQ6NjAsZm9vdGVyX2hlaWdodDo1Mixjb2xvcl9saWdodF9jb250ZW50X2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfYmFja2dyb3VuZCksY29sb3JfbGlnaHRfdGl0bGVfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3ByaW1hcnkpLGNvbG9yX2xpZ2h0X2JvZHlfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3JlZ3VsYXIpLGNvbG9yX2xpZ2h0X2JvZHlfYm9yZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JvcmRlcl9saWdodCksY29sb3JfbGlnaHRfYmFja2Ryb3BfYmFja2dyb3VuZDpcInJnYmEoMCwgMCwgMCwgLjQpXCIsY29sb3JfZGFya19jb250ZW50X2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19iYWNrZ3JvdW5kKSxjb2xvcl9kYXJrX3RpdGxlX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcHJpbWFyeSksY29sb3JfZGFya19ib2R5X3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfcmVndWxhciksY29sb3JfZGFya19ib2R5X2JvcmRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYm9yZGVyX2xpZ2h0KSxjb2xvcl9kYXJrX2JhY2tkcm9wX2JhY2tncm91bmQ6XCJyZ2JhKDAsIDAsIDAsIC41KVwifSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxfZmxleD1yZXF1aXJlKFwicG9seXRoZW5lL2xheW91dC90aGVtZS9mbGV4XCIpLF9mbGV4Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mbGV4KSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXt2YXIgcGFkZGluZz1jb25maWcucGFkZGluZztyZXR1cm5be1wiLnBlLWRpYWxvZ1wiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dENlbnRlckNlbnRlcixfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIjpcImVhc2Utb3V0XCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widHJhbnNpdGlvbi1wcm9wZXJ0eVwiOlwib3BhY2l0eVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbikse3Bvc2l0aW9uOlwiZml4ZWRcIix0b3A6MCxsZWZ0OjAscmlnaHQ6MCxib3R0b206MCxcInotaW5kZXhcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uel9kaWFsb2csaGVpZ2h0OlwiMTAwJVwiLHBhZGRpbmc6cGFkZGluZytcInB4IDQwcHhcIixvcGFjaXR5OjAsXCImLnBlLWRpYWxvZy0tdmlzaWJsZVwiOntvcGFjaXR5OjF9LFwiJi5wZS1kaWFsb2ctLWZ1bGxzY3JlZW5cIjp7cGFkZGluZzowLFwiIC5wZS1kaWFsb2dfX2NvbnRlbnRcIjp7XCJib3JkZXItcmFkaXVzXCI6MCxcIm1heC13aWR0aFwiOlwibm9uZVwiLGhlaWdodDpcIjEwMCVcIix3aWR0aDpcIjEwMCVcIixcIiAucGUtZGlhbG9nX19oZWFkZXIsIC5wZS1kaWFsb2dfX2Zvb3RlclwiOntkaXNwbGF5Olwibm9uZVwifSxcIiAucGUtZGlhbG9nX19ib2R5XCI6e3BhZGRpbmc6MCxoZWlnaHQ6XCIxMDB2aFwiLGJvcmRlcjpcIm5vbmVcIixcIm1heC1oZWlnaHRcIjpcImNhbGMoMTAwdmgpXCJ9fX0sXCIgLnBlLWRpYWxvZ19faGVhZGVyLCBwZS1kaWFsb2dfX2JvZHksIHBlLWRpYWxvZ19faGVhZGVyXCI6e1wiei1pbmRleFwiOjF9LFwiIC5wZS1kaWFsb2dfX2NvbnRlbnRcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRWZXJ0aWNhbCx7cG9zaXRpb246XCJyZWxhdGl2ZVwiLFwibWF4LWhlaWdodFwiOlwiMTAwJVwiLFwibWluLXdpZHRoXCI6XCIyODBweFwiLFwibWF4LXdpZHRoXCI6NypfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X21lbnUrXCJweFwiLFwiYm9yZGVyLXJhZGl1c1wiOmNvbmZpZy5ib3JkZXJfcmFkaXVzK1wicHhcIixcIiA+IC5wZS1zaGFkb3dcIjp7XCJ6LWluZGV4XCI6LTF9LFwiJi5wZS1tZW51X19jb250ZW50XCI6e1wiIC5wZS1kaWFsb2dfX2JvZHlcIjp7cGFkZGluZzowLGJvcmRlcjpcIm5vbmVcIn19fV0sXCIgLnBlLWRpYWxvZ19fdGl0bGVcIjp7XCJmb250LXNpemVcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF9zaXplX3RpdGxlK1wicHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9tZWRpdW0sZGlzcGxheTpcImJsb2NrXCIsXCImICsgZGl2XCI6e1wibWFyZ2luLXRvcFwiOlwiMTZweFwifX0sXCIgLnBlLWRpYWxvZ19faGVhZGVyXCI6e3BhZGRpbmc6W3BhZGRpbmctNCxwYWRkaW5nLGNvbmZpZy5oZWFkZXJfYm90dG9tLTQscGFkZGluZ10ubWFwKGZ1bmN0aW9uKHYpe3JldHVybiB2K1wicHhcIn0pLmpvaW4oXCIgXCIpLFwibWluLWhlaWdodFwiOmNvbmZpZy5oZWFkZXJfaGVpZ2h0K1wicHhcIixcIiAucGUtZGlhbG9nX190aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygpLHtkaXNwbGF5OlwiYmxvY2tcIix3aWR0aDpcIjEwMCVcIn1dfSxcIiAucGUtZGlhbG9nX19ib2R5XCI6W19mbGV4MltcImRlZmF1bHRcIl0uc2VsZlN0cmV0Y2gsX21peGluMltcImRlZmF1bHRcIl0uaGFpcmxpbmUoXCJib3JkZXItdG9wXCIpLHtcImJvcmRlci10b3Atc3R5bGVcIjpcInNvbGlkXCJ9LF9taXhpbjJbXCJkZWZhdWx0XCJdLmhhaXJsaW5lKFwiYm9yZGVyLXRvcFwiKSx7XCJib3JkZXItYm90dG9tLXN0eWxlXCI6XCJzb2xpZFwifSx7cGFkZGluZzpbcGFkZGluZyxwYWRkaW5nLHBhZGRpbmctNSxwYWRkaW5nXS5tYXAoZnVuY3Rpb24odil7cmV0dXJuIHYrXCJweFwifSkuam9pbihcIiBcIiksXCJvdmVyZmxvdy15XCI6XCJhdXRvXCIsXCItd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZ1wiOlwidG91Y2hcIixcImJvcmRlci13aWR0aFwiOlwiMXB4XCIsXCJib3JkZXItc3R5bGVcIjpcInNvbGlkIG5vbmVcIixcImJvcmRlci1jb2xvclwiOlwidHJhbnNwYXJlbnRcIixcIm1heC1oZWlnaHRcIjpcImNhbGMoMTAwdmggLSBcIisyKnBhZGRpbmcrXCJweCAtIFwiKyhjb25maWcuaGVhZGVyX2hlaWdodCtjb25maWcuZm9vdGVyX2hlaWdodCkrXCJweClcIn1dLFwiIC5wZS1kaWFsb2dfX2hlYWRlciArIC5wZS1kaWFsb2dfX2JvZHlcIjp7XCJwYWRkaW5nLXRvcFwiOjB9LFwiIC5wZS1kaWFsb2dfX2Zvb3RlclwiOntwYWRkaW5nOlwiMnB4IDhweFwiLFwibWluLWhlaWdodFwiOmNvbmZpZy5mb290ZXJfaGVpZ2h0K1wicHhcIixcImZvbnQtc2l6ZVwiOjAsXCImLnBlLWRpYWxvZ19fZm9vdGVyLS1oaWdoXCI6e1wicGFkZGluZy1ib3R0b21cIjpcIjhweFwifX0sXCIgLnBlLWRpYWxvZ19fYWN0aW9uc1wiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dEhvcml6b250YWwsX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRFbmRKdXN0aWZpZWQsX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRXcmFwLHttYXJnaW46XCIwIC00cHhcIixcIiAucGUtYnV0dG9uXCI6e2hlaWdodDpcIjM2cHhcIixcIm1hcmdpbi10b3BcIjpcIjZweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiNnB4XCIscGFkZGluZzowfX1dfV0sXCIgYm9keS5wZS1kaWFsb2ctLW9wZW5cIjp7b3ZlcmZsb3c6XCJoaWRkZW5cIixsZWZ0OjAsXCItd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZ1wiOlwidG91Y2hcIixwb3NpdGlvbjpcImZpeGVkXCIsdG9wOjAsd2lkdGg6XCIxMDAlXCJ9fV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLmRpYWxvZyxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWRpYWxvZ1wiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfd2ViZm9udGxvYWRlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi93ZWJmb250bG9hZGVyXCIpLF93ZWJmb250bG9hZGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93ZWJmb250bG9hZGVyKTtfd2ViZm9udGxvYWRlcjJbXCJkZWZhdWx0XCJdLmFkZChcImdvb2dsZVwiLFwiUm9ib3RvOjQwMCw1MDAsNzAwLDQwMGl0YWxpYzpsYXRpblwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9zdmc9cmVxdWlyZShcInBvbHl0aGVuZS9zdmcvc3ZnXCIpLF9zdmcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N2Zyk7cmVxdWlyZShcInBvbHl0aGVuZS9pY29uL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17aWNvbjpcInBlLWljb25cIixhdmF0YXI6XCJwZS1pY29uLS1hdmF0YXJcIixzbWFsbDpcInBlLWljb24tLXNtYWxsXCIscmVndWxhcjpcInBlLWljb24tLXJlZ3VsYXJcIixtZWRpdW06XCJwZS1pY29uLS1tZWRpdW1cIixsYXJnZTpcInBlLWljb24tLWxhcmdlXCJ9LHR5cGVDbGFzc2VzPXtzbWFsbDpDU1NfQ0xBU1NFUy5zbWFsbCxyZWd1bGFyOkNTU19DTEFTU0VTLnJlZ3VsYXIsbWVkaXVtOkNTU19DTEFTU0VTLm1lZGl1bSxsYXJnZTpDU1NfQ0xBU1NFUy5sYXJnZX0sY2xhc3NGb3JUeXBlPWZ1bmN0aW9uKCl7dmFyIG1vZGU9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP1wicmVndWxhclwiOmFyZ3VtZW50c1swXTtyZXR1cm4gdHlwZUNsYXNzZXNbbW9kZV19LGxheW91dENvbnRlbnQ9ZnVuY3Rpb24ob3B0cyl7aWYob3B0cy5jb250ZW50KXJldHVybiBvcHRzLmNvbnRlbnQ7aWYob3B0cy5zdmcpe3ZhciBzdmdPcHRzPU9iamVjdC5hc3NpZ24oe30sb3B0cy5zdmcpO3JldHVybiBzdmdPcHRzLnRhZz1zdmdPcHRzLnRhZ3x8XCJpXCIsX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3N2ZzJbXCJkZWZhdWx0XCJdLHN2Z09wdHMpfXJldHVybiBvcHRzLm1zdmc/KDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkoXCJpLnBlLXN2Z1wiLF9taXRocmlsMltcImRlZmF1bHRcIl0udHJ1c3Qob3B0cy5tc3ZnKSk6KHsgdGFnOiBcImlcIiwgYXR0cnM6IHsgIH0sIGNoaWxkcmVuOiBbICh7IHRhZzogXCJpbWdcIiwgYXR0cnM6IHsgXCJzcmNcIjogb3B0cy5zcmMgfSwgY2hpbGRyZW46IFtdIH0pIF0gfSl9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9T2JqZWN0LmFzc2lnbih7fSx7XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5pY29uLGNsYXNzRm9yVHlwZShvcHRzLnR5cGUpLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LG9wdHMuZXZlbnRzP29wdHMuZXZlbnRzOm51bGwpLGNvbnRlbnQ9bGF5b3V0Q29udGVudChvcHRzKTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e3ZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWNvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7ZXhwb3J0c1tcImRlZmF1bHRcIl09e3NpemVfc21hbGw6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaWNvbl9zaXplX3NtYWxsLHNpemVfcmVndWxhcjpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pY29uX3NpemUsc2l6ZV9tZWRpdW06X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaWNvbl9zaXplX21lZGl1bSxzaXplX2xhcmdlOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2ljb25fc2l6ZV9sYXJnZX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksaWNvblNpemVzUHg9ZnVuY3Rpb24oKXt2YXIgc2l6ZT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaWNvbl9zaXplOmFyZ3VtZW50c1swXTtyZXR1cm57d2lkdGg6c2l6ZStcInB4XCIsaGVpZ2h0OnNpemUrXCJweFwifX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1pY29uXCI6e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixcInZlcnRpY2FsLWFsaWduXCI6XCJtaWRkbGVcIixcImJhY2tncm91bmQtcmVwZWF0XCI6XCJuby1yZXBlYXRcIixmaWxsOlwiY3VycmVudGNvbG9yXCIscG9zaXRpb246XCJyZWxhdGl2ZVwiLFwiJi5wZS1pY29uLS1hdmF0YXIgaW1nXCI6e2JvcmRlcjpcIm5vbmVcIixcImJvcmRlci1yYWRpdXNcIjpcIjUwJVwiLHdpZHRoOlwiMTAwJVwiLGhlaWdodDpcIjEwMCVcIn0sXCIgaVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7ZGlzcGxheTpcImJsb2NrXCIsXCJmb250LXNpemVcIjpcImluaGVyaXRcIixjb2xvcjpcImluaGVyaXRcIixcImxpbmUtaGVpZ2h0XCI6XCJpbmhlcml0XCIsaGVpZ2h0OlwiMTAwJVwiLFwiIGltZ1wiOntoZWlnaHQ6XCIxMDAlXCJ9LFwiIHN2Z1wiOnt3aWR0aDpcIjEwMCVcIixoZWlnaHQ6XCIxMDAlXCIsZmlsbDpcImN1cnJlbnRjb2xvclwiLGNvbG9yOlwiaW5oZXJpdFwiLFwiIHBhdGg6bm90KFtmaWxsPW5vbmVdKVwiOntmaWxsOlwiY3VycmVudGNvbG9yXCJ9fX1dLFwiJi5wZS1pY29uLS1zbWFsbFwiOmljb25TaXplc1B4KGNvbmZpZy5zaXplX3NtYWxsKSxcIiYucGUtaWNvbi0tcmVndWxhclwiOmljb25TaXplc1B4KGNvbmZpZy5zaXplX3JlZ3VsYXIpLFwiJi5wZS1pY29uLS1tZWRpdW1cIjppY29uU2l6ZXNQeChjb25maWcuc2l6ZV9tZWRpdW0pLFwiJi5wZS1pY29uLS1sYXJnZVwiOmljb25TaXplc1B4KGNvbmZpZy5zaXplX2xhcmdlKX19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvaWNvbi90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9pY29uL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLmljb24sY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1pY29uXCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsYXlvdXQ9W3tkaXNwbGF5OlwiLXdlYmtpdC1ib3hcIn0se2Rpc3BsYXk6XCItbW96LWJveFwifSx7ZGlzcGxheTpcIi1tcy1mbGV4Ym94XCIsXCItbXMtZmxleC1wcmVmZXJyZWQtc2l6ZVwiOlwiaW5pdGlhbFwifSx7ZGlzcGxheTpcIi13ZWJraXQtZmxleFwifSx7ZGlzcGxheTpcImZsZXhcIn1dLGxheW91dElubGluZT1bbGF5b3V0LHtkaXNwbGF5OlwiLW1zLWlubGluZS1mbGV4Ym94XCJ9LHtkaXNwbGF5OlwiLXdlYmtpdC1pbmxpbmUtZmxleFwifSx7ZGlzcGxheTpcImlubGluZS1mbGV4XCJ9XSxsYXlvdXRIb3Jpem9udGFsPVtsYXlvdXQse1wiLW1zLWZsZXgtZGlyZWN0aW9uXCI6XCJyb3dcIixcIi13ZWJraXQtZmxleC1kaXJlY3Rpb25cIjpcInJvd1wiLFwiZmxleC1kaXJlY3Rpb25cIjpcInJvd1wifV0sbGF5b3V0SG9yaXpvbnRhbFJldmVyc2U9W2xheW91dCx7XCItbXMtZmxleC1kaXJlY3Rpb25cIjpcInJvdy1yZXZlcnNlXCIsXCItd2Via2l0LWZsZXgtZGlyZWN0aW9uXCI6XCJyb3ctcmV2ZXJzZVwiLFwiZmxleC1kaXJlY3Rpb25cIjpcInJvdy1yZXZlcnNlXCJ9XSxsYXlvdXRWZXJ0aWNhbD1bbGF5b3V0LHtcIi1tcy1mbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uXCIsXCItd2Via2l0LWZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW5cIixcImZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW5cIn1dLGxheW91dFZlcnRpY2FsUmV2ZXJzZT1bbGF5b3V0LHtcIi1tcy1mbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uLXJldmVyc2VcIixcIi13ZWJraXQtZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtbi1yZXZlcnNlXCIsXCJmbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uLXJldmVyc2VcIn1dLGxheW91dFdyYXA9W2xheW91dCx7XCItbXMtZmxleC13cmFwXCI6XCJ3cmFwXCIsXCItd2Via2l0LWZsZXgtd3JhcFwiOlwid3JhcFwiLFwiZmxleC13cmFwXCI6XCJ3cmFwXCJ9XSxsYXlvdXRXcmFwUmV2ZXJzZT1bbGF5b3V0LHtcIi1tcy1mbGV4LXdyYXBcIjpcIndyYXAtcmV2ZXJzZVwiLFwiLXdlYmtpdC1mbGV4LXdyYXBcIjpcIndyYXAtcmV2ZXJzZVwiLFwiZmxleC13cmFwXCI6XCJ3cmFwLXJldmVyc2VcIn1dLGxheW91dFN0YXJ0PVtsYXlvdXQse1wiLW1zLWZsZXgtYWxpZ25cIjpcInN0YXJ0XCIsXCItd2Via2l0LWFsaWduLWl0ZW1zXCI6XCJmbGV4LXN0YXJ0XCIsXCJhbGlnbi1pdGVtc1wiOlwiZmxleC1zdGFydFwifV0sbGF5b3V0Q2VudGVyPVtsYXlvdXQse1wiLW1zLWZsZXgtYWxpZ25cIjpcImNlbnRlclwiLFwiLXdlYmtpdC1hbGlnbi1pdGVtc1wiOlwiY2VudGVyXCIsXCJhbGlnbi1pdGVtc1wiOlwiY2VudGVyXCJ9XSxsYXlvdXRFbmQ9W2xheW91dCx7XCItbXMtZmxleC1hbGlnblwiOlwiZW5kXCIsXCItd2Via2l0LWFsaWduLWl0ZW1zXCI6XCJmbGV4LWVuZFwiLFwiYWxpZ24taXRlbXNcIjpcImZsZXgtZW5kXCJ9XSxsYXlvdXRKdXN0aWZpZWQ9W2xheW91dCx7XCItbXMtZmxleC1saW5lLXBhY2tcIjpcInN0cmV0Y2hcIixcIi1tcy1mbGV4LXBhY2tcIjpcImp1c3RpZnlcIixcIi13ZWJraXQtanVzdGlmeS1jb250ZW50XCI6XCJzcGFjZS1iZXR3ZWVuXCIsXCJqdXN0aWZ5LWNvbnRlbnRcIjpcInNwYWNlLWJldHdlZW5cIn1dLGxheW91dFN0YXJ0SnVzdGlmaWVkPVtsYXlvdXQse1wiLW1zLWZsZXgtYWxpZ25cIjpcInN0YXJ0XCIsXCItbXMtZmxleC1wYWNrXCI6XCJzdGFydFwiLFwiLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnRcIjpcImZsZXgtc3RhcnRcIixcImp1c3RpZnktY29udGVudFwiOlwiZmxleC1zdGFydFwifV0sbGF5b3V0Q2VudGVySnVzdGlmaWVkPVtsYXlvdXQse1wiLW1zLWZsZXgtcGFja1wiOlwiY2VudGVyXCIsXCItd2Via2l0LWp1c3RpZnktY29udGVudFwiOlwiY2VudGVyXCIsXCJqdXN0aWZ5LWNvbnRlbnRcIjpcImNlbnRlclwifV0sbGF5b3V0RW5kSnVzdGlmaWVkPVtsYXlvdXQse1wiLW1zLWZsZXgtcGFja1wiOlwiZW5kXCIsXCItd2Via2l0LWp1c3RpZnktY29udGVudFwiOlwiZmxleC1lbmRcIixcImp1c3RpZnktY29udGVudFwiOlwiZmxleC1lbmRcIn1dLGxheW91dENlbnRlckNlbnRlcj1bbGF5b3V0Q2VudGVySnVzdGlmaWVkLGxheW91dENlbnRlcl0sbGF5b3V0QXJvdW5kSnVzdGlmaWVkPVtsYXlvdXQse1wiLW1zLWZsZXgtcGFja1wiOlwiZGlzdHJpYnV0ZVwiLFwiLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnRcIjpcInNwYWNlLWFyb3VuZFwiLFwianVzdGlmeS1jb250ZW50XCI6XCJzcGFjZS1hcm91bmRcIn1dLGZsZXg9ZnVuY3Rpb24oKXt2YXIgbnVtPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT8xOmFyZ3VtZW50c1swXTtyZXR1cm5be1wiLXdlYmtpdC1ib3gtZmxleFwiOm51bX0se1wiLW1vei1ib3gtZmxleFwiOm51bX0se1wiLXdlYmtpdC1mbGV4XCI6bnVtfSx7XCItbXMtZmxleFwiOm51bX0se2ZsZXg6bnVtfSwxPT09bnVtP3tcIi13ZWJraXQtZmxleC1iYXNpc1wiOlwiMC4wMDAwMDAwMDFweFwifTp7fSwxPT09bnVtP3tcImZsZXgtYmFzaXNcIjpcIjAuMDAwMDAwMDAxcHhcIn06e31dfSxmbGV4QXV0bz17XCItbXMtZmxleFwiOlwiMSAxIGF1dG9cIixcIi13ZWJraXQtZmxleC1iYXNpc1wiOlwiYXV0b1wiLFwiZmxleC1iYXNpc1wiOlwiYXV0b1wifSxmbGV4QXV0b1ZlcnRpY2FsPXtcIi1tcy1mbGV4XCI6XCIxIDEgYXV0b1wiLFwiLXdlYmtpdC1mbGV4LWJhc2lzXCI6XCJhdXRvXCIsXCJmbGV4LWJhc2lzXCI6XCJhdXRvXCJ9LGZsZXhJbmRleD1mdW5jdGlvbihpbmRleCl7cmV0dXJue1wiLW1zLWZsZXhcIjppbmRleCxcIi13ZWJraXQtZmxleFwiOmluZGV4LGZsZXg6aW5kZXh9fSxzZWxmU3RhcnQ9e1wiLW1zLWZsZXgtaXRlbS1hbGlnblwiOlwic3RhcnRcIixcIi1tcy1hbGlnbi1zZWxmXCI6XCJmbGV4LXN0YXJ0XCIsXCItd2Via2l0LWFsaWduLXNlbGZcIjpcImZsZXgtc3RhcnRcIixcImFsaWduLXNlbGZcIjpcImZsZXgtc3RhcnRcIn0sc2VsZkNlbnRlcj17XCItbXMtZmxleC1pdGVtLWFsaWduXCI6XCJjZW50ZXJcIixcIi1tcy1hbGlnbi1zZWxmXCI6XCJjZW50ZXJcIixcIi13ZWJraXQtYWxpZ24tc2VsZlwiOlwiY2VudGVyXCIsXCJhbGlnbi1zZWxmXCI6XCJjZW50ZXJcIn0sc2VsZkVuZD17XCItbXMtZmxleC1pdGVtLWFsaWduXCI6XCJlbmRcIixcIi1tcy1hbGlnbi1zZWxmXCI6XCJmbGV4LWVuZFwiLFwiLXdlYmtpdC1hbGlnbi1zZWxmXCI6XCJmbGV4LWVuZFwiLFwiYWxpZ24tc2VsZlwiOlwiZmxleC1lbmRcIn0sc2VsZlN0cmV0Y2g9e1wiLW1zLWZsZXgtaXRlbS1hbGlnblwiOlwic3RyZXRjaFwiLFwiLW1zLWFsaWduLXNlbGZcIjpcInN0cmV0Y2hcIixcIi13ZWJraXQtYWxpZ24tc2VsZlwiOlwic3RyZXRjaFwiLFwiYWxpZ24tc2VsZlwiOlwic3RyZXRjaFwifTtleHBvcnRzW1wiZGVmYXVsdFwiXT17ZmxleDpmbGV4LGZsZXhBdXRvOmZsZXhBdXRvLGZsZXhBdXRvVmVydGljYWw6ZmxleEF1dG9WZXJ0aWNhbCxmbGV4SW5kZXg6ZmxleEluZGV4LGxheW91dDpsYXlvdXQsbGF5b3V0QXJvdW5kSnVzdGlmaWVkOmxheW91dEFyb3VuZEp1c3RpZmllZCxsYXlvdXRDZW50ZXI6bGF5b3V0Q2VudGVyLGxheW91dENlbnRlckNlbnRlcjpsYXlvdXRDZW50ZXJDZW50ZXIsbGF5b3V0Q2VudGVySnVzdGlmaWVkOmxheW91dENlbnRlckp1c3RpZmllZCxsYXlvdXRFbmQ6bGF5b3V0RW5kLGxheW91dEVuZEp1c3RpZmllZDpsYXlvdXRFbmRKdXN0aWZpZWQsbGF5b3V0SG9yaXpvbnRhbDpsYXlvdXRIb3Jpem9udGFsLGxheW91dEhvcml6b250YWxSZXZlcnNlOmxheW91dEhvcml6b250YWxSZXZlcnNlLGxheW91dElubGluZTpsYXlvdXRJbmxpbmUsbGF5b3V0SnVzdGlmaWVkOmxheW91dEp1c3RpZmllZCxsYXlvdXRTdGFydDpsYXlvdXRTdGFydCxsYXlvdXRTdGFydEp1c3RpZmllZDpsYXlvdXRTdGFydEp1c3RpZmllZCxsYXlvdXRWZXJ0aWNhbDpsYXlvdXRWZXJ0aWNhbCxsYXlvdXRWZXJ0aWNhbFJldmVyc2U6bGF5b3V0VmVydGljYWxSZXZlcnNlLGxheW91dFdyYXA6bGF5b3V0V3JhcCxsYXlvdXRXcmFwUmV2ZXJzZTpsYXlvdXRXcmFwUmV2ZXJzZSxzZWxmQ2VudGVyOnNlbGZDZW50ZXIsc2VsZkVuZDpzZWxmRW5kLHNlbGZTdGFydDpzZWxmU3RhcnQsc2VsZlN0cmV0Y2g6c2VsZlN0cmV0Y2h9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmxleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfaWNvbj1yZXF1aXJlKFwicG9seXRoZW5lL2ljb24vaWNvblwiKSxfaWNvbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWNvbiksX3JpcHBsZT1yZXF1aXJlKFwicG9seXRoZW5lL3JpcHBsZS9yaXBwbGVcIiksX3JpcHBsZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmlwcGxlKTtyZXF1aXJlKFwicG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtbGlzdC10aWxlXCIscHJpbWFyeTpcInBlLWxpc3QtdGlsZV9fcHJpbWFyeVwiLHNlY29uZGFyeTpcInBlLWxpc3QtdGlsZV9fc2Vjb25kYXJ5XCIsY29udGVudDpcInBlLWxpc3QtdGlsZV9fY29udGVudFwiLGNvbnRlbnRGcm9udDpcInBlLWxpc3QtdGlsZV9fY29udGVudC0tZnJvbnRcIix0aXRsZTpcInBlLWxpc3QtdGlsZV9fdGl0bGVcIixzdWJ0aXRsZTpcInBlLWxpc3QtdGlsZV9fc3VidGl0bGVcIixoaWdoU3VidGl0bGU6XCJwZS1saXN0LXRpbGVfX3N1YnRpdGxlLS1oaWdoXCIsc2VsZWN0ZWQ6XCJwZS1saXN0LXRpbGUtLXNlbGVjdGVkXCIsZGlzYWJsZWQ6XCJwZS1saXN0LXRpbGUtLWRpc2FibGVkXCIsc3RpY2t5OlwicGUtbGlzdC10aWxlLS1zdGlja3lcIixoYXNTdWJ0aXRsZTpcInBlLWxpc3QtdGlsZS0tc3VidGl0bGVcIixoYXNIaWdoU3VidGl0bGU6XCJwZS1saXN0LXRpbGUtLWhpZ2gtc3VidGl0bGVcIixoYXNGcm9udDpcInBlLWxpc3QtdGlsZS0tZnJvbnRcIixpc0NvbXBhY3Q6XCJwZS1saXN0LXRpbGUtLWNvbXBhY3RcIn0scGFyc2VQcmltYXJ5Q29udGVudD1mdW5jdGlvbihvcHRzKXt2YXIgdGFnPW9wdHMudGFnP29wdHMudGFnOm9wdHMudXJsP1wiYVwiOlwiZGl2XCIsZnJvbnRDb21wPW9wdHMuZnJvbnQ/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQrXCIgXCIrQ1NTX0NMQVNTRVMuY29udGVudEZyb250IH0sIGNoaWxkcmVuOiBbIG9wdHMuZnJvbnQgXSB9KTpvcHRzLmluZGVudD8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCtcIiBcIitDU1NfQ0xBU1NFUy5jb250ZW50RnJvbnQgfSwgY2hpbGRyZW46IFtdIH0pOm51bGw7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLE9iamVjdC5hc3NpZ24oe1wiY2xhc3NcIjpDU1NfQ0xBU1NFUy5wcmltYXJ5fSxvcHRzLnVybCxvcHRzLmV2ZW50cyksW2Zyb250Q29tcCwoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCB9LCBjaGlsZHJlbjogWyBvcHRzLmNvbnRlbnQ/b3B0cy5jb250ZW50Om51bGwsb3B0cy50aXRsZT8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMudGl0bGUgfSwgY2hpbGRyZW46IFsgb3B0cy50aXRsZSBdIH0pOm51bGwsb3B0cy5zdWJ0aXRsZT8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuc3VidGl0bGUgfSwgY2hpbGRyZW46IFsgb3B0cy5zdWJ0aXRsZSBdIH0pOm51bGwsb3B0cy5oaWdoU3VidGl0bGU/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLnN1YnRpdGxlK1wiIFwiK0NTU19DTEFTU0VTLmhpZ2hTdWJ0aXRsZSB9LCBjaGlsZHJlbjogWyBvcHRzLmhpZ2hTdWJ0aXRsZSBdIH0pOm51bGwgXSB9KV0pfSxwYXJzZVNlY29uZGFyeUNvbnRlbnQ9ZnVuY3Rpb24ob3B0cyl7dmFyIHNlY29uZGFyeU9wdHM9b3B0cy5zZWNvbmRhcnl8fHt9LHRhZz12b2lkIDA7cmV0dXJuIHRhZz1zZWNvbmRhcnlPcHRzLnRhZz9zZWNvbmRhcnlPcHRzLnRhZzpzZWNvbmRhcnlPcHRzLnVybD9cImFcIjpcImRpdlwiLCgwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxPYmplY3QuYXNzaWduKHtcImNsYXNzXCI6Q1NTX0NMQVNTRVMuc2Vjb25kYXJ5fSxzZWNvbmRhcnlPcHRzLnVybCxzZWNvbmRhcnlPcHRzLmV2ZW50cyksKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmNvbnRlbnQgfSwgY2hpbGRyZW46IFsgc2Vjb25kYXJ5T3B0cy5pY29uP19taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9pY29uMltcImRlZmF1bHRcIl0sc2Vjb25kYXJ5T3B0cy5pY29uKTpudWxsLHNlY29uZGFyeU9wdHMuY29udGVudD9zZWNvbmRhcnlPcHRzLmNvbnRlbnQ6bnVsbCBdIH0pKX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixoZWlnaHRDbGFzcz1vcHRzLnN1YnRpdGxlP0NTU19DTEFTU0VTLmhhc1N1YnRpdGxlOm9wdHMuaGlnaFN1YnRpdGxlP0NTU19DTEFTU0VTLmhhc0hpZ2hTdWJ0aXRsZTpvcHRzLmZyb250fHxvcHRzLmluZGVudD9DU1NfQ0xBU1NFUy5oYXNGcm9udDpudWxsLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHMuc2VsZWN0ZWQ/Q1NTX0NMQVNTRVMuc2VsZWN0ZWQ6bnVsbCxvcHRzLmRpc2FibGVkP0NTU19DTEFTU0VTLmRpc2FibGVkOm51bGwsb3B0cy5zdGlja3k/Q1NTX0NMQVNTRVMuc3RpY2t5Om51bGwsb3B0cy5jb21wYWN0P0NTU19DTEFTU0VTLmlzQ29tcGFjdDpudWxsLGhlaWdodENsYXNzLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LGNvbnRlbnQ9W29wdHMuaW5rJiYhb3B0cy5kaXNhYmxlZD9fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfcmlwcGxlMltcImRlZmF1bHRcIl0sb3B0cy5yaXBwbGUpOm51bGwscGFyc2VQcmltYXJ5Q29udGVudChvcHRzKSxvcHRzLnNlY29uZGFyeT9wYXJzZVNlY29uZGFyeUNvbnRlbnQob3B0cyk6bnVsbF07cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXt2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QtdGlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLWxpc3QtdGlsZVwiLHtcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX3RpdGxlXCJdfSxcIiYucGUtbGlzdF9faGVhZGVyXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOlwiaW5oZXJpdFwiLFwiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfbGlzdF9oZWFkZXJcIl19fSxcIiAucGUtbGlzdC10aWxlX19jb250ZW50LCAucGUtbGlzdC10aWxlX19zdWJ0aXRsZVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX3N1YnRpdGxlXCJdfSxcIiYucGUtbGlzdC10aWxlLS1kaXNhYmxlZFwiOntcIiYsIC5wZS1saXN0LXRpbGVfX3RpdGxlLCAucGUtbGlzdC10aWxlX19jb250ZW50LCAucGUtbGlzdC10aWxlX19zdWJ0aXRsZVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX3RleHRfZGlzYWJsZWRcIl19fSxcIiYucGUtbGlzdC10aWxlLS1zZWxlY3RlZFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JhY2tncm91bmRfc2VsZWN0ZWRcIl19fSldfSxub1RvdWNoPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtbGlzdC10aWxlXCIse1wiJjpub3QoLnBlLWxpc3RfX2hlYWRlcik6bm90KC5wZS1saXN0LXRpbGUtLWRpc2FibGVkKTpob3ZlclwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JhY2tncm91bmRfaG92ZXJcIl19fSldfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIikse1wiaHRtbC5wZS1uby10b3VjaCAucGUtbGlzdC0taG92ZXJhYmxlXCI6W25vVG91Y2goY29uZmlnLFwibGlnaHRcIixcIiBcIildfSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcIiZcIildfSx7XCJodG1sLnBlLW5vLXRvdWNoIC5wZS1kYXJrLXRoZW1lIC5wZS1saXN0LS1ob3ZlcmFibGVcIjpub1RvdWNoKGNvbmZpZyxcImRhcmtcIixcIiBcIiksXCJodG1sLnBlLW5vLXRvdWNoIC5wZS1saXN0LS1ob3ZlcmFibGUgLnBlLWRhcmstdGhlbWVcIjpub1RvdWNoKGNvbmZpZyxcImRhcmtcIil9XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZykscmdiYT1fY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYSxzaW5nbGVfaGVpZ2h0PTQ4LHBhZGRpbmc9OCxzaW5nbGVfd2l0aF9pY29uX2hlaWdodD01NjtleHBvcnRzW1wiZGVmYXVsdFwiXT17c2luZ2xlX2hlaWdodDpzaW5nbGVfaGVpZ2h0LHNpbmdsZV9saW5lX2hlaWdodDpzaW5nbGVfaGVpZ2h0LTIqcGFkZGluZy0xMSxzaW5nbGVfd2l0aF9pY29uX2hlaWdodDpzaW5nbGVfd2l0aF9pY29uX2hlaWdodCxzaW5nbGVfd2l0aF9pY29uX2xpbmVfaGVpZ2h0OnNpbmdsZV93aXRoX2ljb25faGVpZ2h0LTIqcGFkZGluZy0xMSxwYWRkaW5nOjEzLGNvbXBhY3RfcGFkZGluZzo5LHN1YnRpdGxlX2xpbmVfY291bnQ6MSxoYXNfc3VidGl0bGVfcGFkZGluZzoxNSxoaWdoX3N1YnRpdGxlX2xpbmVfY291bnQ6MixoYXNfaGlnaF9zdWJ0aXRsZV9wYWRkaW5nOjEzLGZyb250X2l0ZW1fd2lkdGg6NzIsc2lkZV9wYWRkaW5nOjIqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQsZm9udF9zaXplX3RpdGxlOjE2LGZvbnRfc2l6ZV9zdWJ0aXRsZToxNCxsaW5lX2hlaWdodF9zdWJ0aXRsZToyMCxmb250X3NpemVfbGlzdF9oZWFkZXI6MTQsZm9udF9zaXplX3NtYWxsOjEyLGNvbG9yX2xpZ2h0X3RpdGxlOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeSksY29sb3JfbGlnaHRfc3VidGl0bGU6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9zZWNvbmRhcnkpLGNvbG9yX2xpZ2h0X2luZm86cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF90ZXJ0aWFyeSksY29sb3JfbGlnaHRfdGV4dF9kaXNhYmxlZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X2Rpc2FibGVkKSxjb2xvcl9saWdodF9saXN0X2hlYWRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3RlcnRpYXJ5KSxjb2xvcl9saWdodF9iYWNrZ3JvdW5kX2hvdmVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2xpZ2h0X2JhY2tncm91bmRfc2VsZWN0ZWQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfZGFya190aXRsZTpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5KSxjb2xvcl9kYXJrX3N1YnRpdGxlOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3NlY29uZGFyeSksY29sb3JfZGFya19pbmZvOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3RlcnRpYXJ5KSxjb2xvcl9kYXJrX3RleHRfZGlzYWJsZWQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfZGlzYWJsZWQpLGNvbG9yX2RhcmtfbGlzdF9oZWFkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfdGVydGlhcnkpLGNvbG9yX2RhcmtfYmFja2dyb3VuZF9ob3ZlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfZGFya19iYWNrZ3JvdW5kX3NlbGVjdGVkOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19iYWNrZ3JvdW5kX2hvdmVyKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksX2ZsZXg9cmVxdWlyZShcInBvbHl0aGVuZS9sYXlvdXQvdGhlbWUvZmxleFwiKSxfZmxleDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleCkscGFkZGluZ0g9ZnVuY3Rpb24oaCl7cmV0dXJue1wicGFkZGluZy1sZWZ0XCI6aCtcInB4XCIsXCJwYWRkaW5nLXJpZ2h0XCI6aCtcInB4XCJ9fSxwYWRkaW5nVj1mdW5jdGlvbih0b3AsYm90dG9tKXtyZXR1cm57XCJwYWRkaW5nLXRvcFwiOnRvcCtcInB4XCIsXCJwYWRkaW5nLWJvdHRvbVwiOihib3R0b218fHRvcCkrXCJweFwifX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1saXN0LXRpbGVcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXQse3Bvc2l0aW9uOlwicmVsYXRpdmVcIixvdmVyZmxvdzpcImhpZGRlblwiLFwiJi5wZS1saXN0LXRpbGUtLXN0aWNreVwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLnN0aWNreSgpLFwiIC5wZS1saXN0LXRpbGVfX3ByaW1hcnksIC5wZS1saXN0LXRpbGVfX3NlY29uZGFyeVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dEhvcml6b250YWwse1wiIGEmXCI6e1widGV4dC1kZWNvcmF0aW9uXCI6XCJub25lXCIsY29sb3I6XCJpbmhlcml0XCIsYm9yZGVyOlwibm9uZVwifX1dLFwiIC5wZS1saXN0LXRpbGVfX3ByaW1hcnlcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5mbGV4KCkse3Bvc2l0aW9uOlwicmVsYXRpdmVcIixcIiAucGUtbGlzdC10aWxlX19jb250ZW50Om5vdCgucGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udClcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5mbGV4KCkscGFkZGluZ1YoY29uZmlnLnBhZGRpbmcsY29uZmlnLnBhZGRpbmcrMSldfV0sXCIgLnBlLWxpc3QtdGlsZV9fc2Vjb25kYXJ5XCI6e1widGV4dC1hbGlnblwiOlwicmlnaHRcIixcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemVfdGl0bGUrXCJweFwifSxcIiAucGUtbGlzdC10aWxlX19jb250ZW50XCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0VmVydGljYWwsX2ZsZXgyW1wiZGVmYXVsdFwiXS5zZWxmQ2VudGVyLHBhZGRpbmdIKGNvbmZpZy5zaWRlX3BhZGRpbmcpLHtcIiYucGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udFwiOltwYWRkaW5nVihjb25maWcucGFkZGluZy01KSx7d2lkdGg6Y29uZmlnLmZyb250X2l0ZW1fd2lkdGgrXCJweFwifV0sXCIgc21hbGxcIjp7XCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplX3NtYWxsK1wicHhcIn19XSxcIiAucGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udCArIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjp7XCJwYWRkaW5nLWxlZnRcIjowfSxcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygxLGNvbmZpZy5zaW5nbGVfbGluZV9oZWlnaHQpLHtcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemVfdGl0bGUrXCJweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpjb25maWcuc2luZ2xlX2xpbmVfaGVpZ2h0K1wicHhcIn1dLFwiIC5wZS1saXN0LXRpbGVfX3N1YnRpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKGNvbmZpZy5zdWJ0aXRsZV9saW5lX2NvdW50LGNvbmZpZy5saW5lX2hlaWdodF9zdWJ0aXRsZSkse1wiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZV9zdWJ0aXRsZStcInB4XCIsXCJsaW5lLWhlaWdodFwiOmNvbmZpZy5saW5lX2hlaWdodF9zdWJ0aXRsZStcInB4XCIsXCImLnBlLWxpc3QtdGlsZV9fc3VidGl0bGUtLWhpZ2hcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoY29uZmlnLmhpZ2hfc3VidGl0bGVfbGluZV9jb3VudCxjb25maWcubGluZV9oZWlnaHRfc3VidGl0bGUpLHtcIndoaXRlLXNwYWNlXCI6XCJub3JtYWxcIn1dfV0sXCImLnBlLWxpc3QtdGlsZS0tc2VsZWN0ZWQsICYucGUtbGlzdC10aWxlLS1kaXNhYmxlZFwiOntjdXJzb3I6XCJkZWZhdWx0XCJ9LFwiJi5wZS1saXN0LXRpbGUtLXN1YnRpdGxlXCI6e1wiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjpbcGFkZGluZ1YoY29uZmlnLmhhc19zdWJ0aXRsZV9wYWRkaW5nLGNvbmZpZy5oYXNfc3VidGl0bGVfcGFkZGluZysxKSx7XCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjp7cGFkZGluZzowfX1dfSxcIiYucGUtbGlzdC10aWxlLS1oaWdoLXN1YnRpdGxlXCI6e1wiIC5wZS1saXN0LXRpbGUtLWhpZ2gtc3VidGl0bGUgLnBlLWxpc3QtdGlsZV9fc2Vjb25kYXJ5XCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0SG9yaXpvbnRhbCxfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dFN0YXJ0XSxcIiAucGUtbGlzdC10aWxlX19jb250ZW50XCI6W19mbGV4MltcImRlZmF1bHRcIl0uc2VsZlN0YXJ0LHBhZGRpbmdWKGNvbmZpZy5oYXNfaGlnaF9zdWJ0aXRsZV9wYWRkaW5nLGNvbmZpZy5oYXNfaGlnaF9zdWJ0aXRsZV9wYWRkaW5nKzEpLHtcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOntwYWRkaW5nOjB9fV19LFwiJi5wZS1saXN0X19oZWFkZXJcIjp7aGVpZ2h0OmNvbmZpZy5zaW5nbGVfaGVpZ2h0K1wicHhcIixcIiAucGUtbGlzdC10aWxlX19jb250ZW50XCI6e1wicGFkZGluZy10b3BcIjowLFwicGFkZGluZy1ib3R0b21cIjowfSxcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygxLGNvbmZpZy5zaW5nbGVfaGVpZ2h0KSx7XCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplX2xpc3RfaGVhZGVyK1wicHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X21lZGl1bSxcImxpbmUtaGVpZ2h0XCI6Y29uZmlnLnNpbmdsZV9oZWlnaHQrXCJweFwiLHBhZGRpbmc6MH1dfSxcIiAucGUtbGlzdC0tY29tcGFjdCAmLCAmLnBlLWxpc3QtdGlsZS0tY29tcGFjdFwiOntcIiY6bm90KC5wZS1saXN0X19oZWFkZXIpXCI6e1wiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjpwYWRkaW5nVihjb25maWcuY29tcGFjdF9wYWRkaW5nLGNvbmZpZy5jb21wYWN0X3BhZGRpbmcrMSl9fSxcIkBzdXBwb3J0cyAoLW1vei1hcHBlYXJhbmNlOm5vbmUpIGFuZCAoZGlzcGxheTpjb250ZW50cylcIjp7XCIgLnBlLWxpc3QtdGlsZV9fcHJpbWFyeSwgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOntvdmVyZmxvdzpcImhpZGRlblwifX0sXCIucGUtZGlhbG9nIC5wZS1tZW51X19jb250ZW50ICZcIjp7XCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcyhcIm5vbmVcIil9LFwiLnBlLW1lbnVfX2NvbnRlbnQgJlwiOntcIiY6bm90KC5wZS1saXN0LXRpbGUtLWRpc2FibGVkKVwiOntjdXJzb3I6XCJkZWZhdWx0XCIsXCImLCAucGUtbGlzdC10aWxlX19wcmltYXJ5LCAucGUtbGlzdC10aWxlX19zZWNvbmRhcnlcIjp7XCIgLnBlLWxpc3QtdGlsZV9fdGl0bGUsIC5wZS1saXN0LXRpbGVfX3N1YnRpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ1c2VyLXNlbGVjdFwiOlwibm9uZVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdXNlcl9zZWxlY3QpXX19fSxcImh0bWwucGUtbm8tdG91Y2ggLnBlLWxpc3QtLWhvdmVyYWJsZSAmLCBodG1sLnBlLW5vLXRvdWNoIC5wZS1saXN0LS1zZWxlY3RhYmxlICZcIjp7XCImOm5vdCgucGUtbGlzdF9faGVhZGVyKTpub3QoLnBlLWxpc3QtdGlsZS0tZGlzYWJsZWQpOm5vdCgucGUtbGlzdC10aWxlLS1zZWxlY3RlZCk6aG92ZXJcIjp7Y3Vyc29yOlwicG9pbnRlclwifX19XX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC10aWxlL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXVtcImxpc3QtdGlsZVwiXSxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWxpc3QtdGlsZVwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfbGlzdFRpbGU9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0LXRpbGUvbGlzdC10aWxlXCIpLF9saXN0VGlsZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGlzdFRpbGUpO3JlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtbGlzdFwiLGhlYWRlcjpcInBlLWxpc3RfX2hlYWRlclwiLGhvdmVyYWJsZTpcInBlLWxpc3QtLWhvdmVyYWJsZVwiLHNlbGVjdGFibGU6XCJwZS1saXN0LS1zZWxlY3RhYmxlXCIsYm9yZGVyczpcInBlLWxpc3QtLWJvcmRlcnNcIixpbmRlbnRlZEJvcmRlcnM6XCJwZS1saXN0LS1ib3JkZXJzLWluZGVudGVkXCIsaGFzSGVhZGVyOlwicGUtbGlzdC0taGVhZGVyXCIsaXNDb21wYWN0OlwicGUtbGlzdC0tY29tcGFjdFwifSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHMuYm9yZGVycz9DU1NfQ0xBU1NFUy5ib3JkZXJzOm51bGwsb3B0cy5pbmRlbnRlZEJvcmRlcnM/Q1NTX0NMQVNTRVMuaW5kZW50ZWRCb3JkZXJzOm51bGwsb3B0cy5ob3ZlcmFibGU/Q1NTX0NMQVNTRVMuaG92ZXJhYmxlOm51bGwsb3B0cy5zZWxlY3RhYmxlP0NTU19DTEFTU0VTLnNlbGVjdGFibGU6bnVsbCxvcHRzLmhlYWRlcj9DU1NfQ0xBU1NFUy5oYXNIZWFkZXI6bnVsbCxvcHRzLmNvbXBhY3Q/Q1NTX0NMQVNTRVMuaXNDb21wYWN0Om51bGwsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30saGVhZGVyT3B0cz12b2lkIDA7b3B0cy5oZWFkZXImJihoZWFkZXJPcHRzPU9iamVjdC5hc3NpZ24oe30sb3B0cy5oZWFkZXIpLGhlYWRlck9wdHNbXCJjbGFzc1wiXT1bQ1NTX0NMQVNTRVMuaGVhZGVyLGhlYWRlck9wdHNbXCJjbGFzc1wiXXx8bnVsbF0uam9pbihcIiBcIikpO3ZhciBjb250ZW50PVtoZWFkZXJPcHRzP19taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9saXN0VGlsZTJbXCJkZWZhdWx0XCJdLGhlYWRlck9wdHMpOm51bGwsb3B0cy50aWxlcz9vcHRzLnRpbGVzOm51bGxdO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17dmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgX3JlZixzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuWyhfcmVmPXt9LF9kZWZpbmVQcm9wZXJ0eShfcmVmLHNjb3BlK1wiLnBlLWxpc3RcIix7XCImLnBlLWxpc3QtLWJvcmRlcnNcIjp7XCIgLnBlLWxpc3QtdGlsZTpub3QoLnBlLWxpc3RfX2hlYWRlcilcIjp7XCImOm5vdCg6bGFzdC1jaGlsZClcIjp7XCJib3JkZXItY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvcmRlclwiXX19fSxcIiYucGUtbGlzdC0tYm9yZGVycy1pbmRlbnRlZFwiOntcIiAucGUtbGlzdC10aWxlOm5vdCgucGUtbGlzdF9faGVhZGVyKVwiOntcIiAucGUtbGlzdC10aWxlX19jb250ZW50Om5vdCgucGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udClcIjp7XCJib3JkZXItY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvcmRlclwiXX19fX0pLF9kZWZpbmVQcm9wZXJ0eShfcmVmLFwiIC5wZS1saXN0ICsgLnBlLWxpc3RcIix7XCJib3JkZXItY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JvcmRlclwiXX0pLF9yZWYpXX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3N0eWxlKGNvbmZpZyxcImxpZ2h0XCIpLHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiJlwiKV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZykscmdiYT1fY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYTtleHBvcnRzW1wiZGVmYXVsdFwiXT17cGFkZGluZzpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCxwYWRkaW5nX2NvbXBhY3Q6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQvMixib3JkZXJfd2lkdGhfc3RhY2tlZDoxLGJvcmRlcl93aWR0aF9ib3JkZXJlZDoxLGNvbG9yX2xpZ2h0X2JvcmRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9ib3JkZXJfbGlnaHQpLGNvbG9yX2RhcmtfYm9yZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19ib3JkZXJfbGlnaHQpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksYm9yZGVyU3R5bGU9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uaGFpcmxpbmUoXCJib3JkZXItYm90dG9tXCIpLHtcImJvcmRlci1zdHlsZVwiOlwibm9uZSBub25lIHNvbGlkIG5vbmVcIixcImJvcmRlci13aWR0aFwiOmNvbmZpZy5ib3JkZXJfd2lkdGhfYm9yZGVyZWQrXCJweFwifX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1saXN0XCI6e3BhZGRpbmc6Y29uZmlnLnBhZGRpbmcrXCJweCAwXCIsXCImLnBlLWxpc3QtLWhlYWRlclwiOntcInBhZGRpbmctdG9wXCI6MH0sXCImLnBlLWxpc3QtLWNvbXBhY3RcIjp7cGFkZGluZzpjb25maWcucGFkZGluZ19jb21wYWN0K1wicHggMFwifSxcIiYgKyAmXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmhhaXJsaW5lKFwiYm9yZGVyLXRvcFwiKSx7XCJib3JkZXItc3R5bGVcIjpcInNvbGlkIG5vbmUgbm9uZSBub25lXCIsXCJib3JkZXItd2lkdGhcIjpjb25maWcuYm9yZGVyX3dpZHRoX3N0YWNrZWQrXCJweFwifV0sXCImLnBlLWxpc3QtLWJvcmRlcnNcIjp7XCIgLnBlLWxpc3QtdGlsZTpub3QoLnBlLWxpc3RfX2hlYWRlcilcIjp7XCImOm5vdCg6bGFzdC1jaGlsZClcIjp7XCImXCI6Ym9yZGVyU3R5bGUoY29uZmlnKX19fSxcIiYucGUtbGlzdC0tYm9yZGVycy1pbmRlbnRlZFwiOntcImJvcmRlci10b3BcIjpcIm5vbmVcIixcIiAucGUtbGlzdC10aWxlOm5vdCgucGUtbGlzdF9faGVhZGVyKVwiOntcIiY6bm90KDpsYXN0LWNoaWxkKVwiOntcIiAucGUtbGlzdC10aWxlX19jb250ZW50Om5vdCgucGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udClcIjpib3JkZXJTdHlsZShjb25maWcpfX19fX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0L3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5saXN0LGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtbGlzdFwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfZXZlbnRzPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL2V2ZW50c1wiKSxfZXZlbnRzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudHMpLF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfc2hhZG93PXJlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3NoYWRvd1wiKSxfc2hhZG93Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGFkb3cpLF90cmFuc2l0aW9uPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3RyYW5zaXRpb25cIiksX3RyYW5zaXRpb24yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyYW5zaXRpb24pO3JlcXVpcmUoXCJwb2x5dGhlbmUvbWVudS90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtbWVudVwiLGNvbnRlbnQ6XCJwZS1tZW51X19jb250ZW50XCIscGxhY2Vob2xkZXI6XCJwZS1tZW51LS1wbGFjZWhvbGRlclwiLHZpc2libGU6XCJwZS1tZW51LS12aXNpYmxlXCIscGVybWFuZW50OlwicGUtbWVudS0tcGVybWFuZW50XCIsdGFyZ2V0OlwicGUtbWVudS0tdGFyZ2V0XCIsd2lkdGhfbjpcInBlLW1lbnUtLXdpZHRoLVwiLHdpZHRoX2F1dG86XCJwZS1tZW51LS13aWR0aC1hdXRvXCIsbGlzdFRpbGU6XCJwZS1saXN0LXRpbGVcIixzZWxlY3RlZExpc3RUaWxlOlwicGUtbGlzdC10aWxlLS1zZWxlY3RlZFwifSxPRkZTRVRfVj0tOCxERUZBVUxUX09GRlNFVF9IPTE2LE1JTl9TSVpFPTEuNSxwb3NpdGlvbk1lbnU9ZnVuY3Rpb24oY3RybCxvcHRzKXtpZihvcHRzLnRhcmdldCl7dmFyIHRhcmdldEVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIrb3B0cy50YXJnZXQpO2lmKHRhcmdldEVsKXt2YXIgb2Zmc2V0SD12b2lkIDAhPT1vcHRzLm9mZnNldD9vcHRzLm9mZnNldDpERUZBVUxUX09GRlNFVF9ILG1lbnVFbD1jdHJsLmVsO2lmKG1lbnVFbCl7dmFyIGNvbnRlbnRFbD1jdHJsLmNvbnRlbnRFbCxvcmlnaW49b3B0cy5vcmlnaW58fFwidG9wLWxlZnRcIixyZXBvc2l0aW9uPW9wdHMucmVwb3NpdGlvbiE9PSExLHBvc2l0aW9uT2Zmc2V0PTA7aWYocmVwb3NpdGlvbil7dmFyIGZpcnN0SXRlbT1jb250ZW50RWwucXVlcnlTZWxlY3RvckFsbChcIi5cIitDU1NfQ0xBU1NFUy5saXN0VGlsZSlbMF0sc2VsZWN0ZWRJdGVtPWNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yKFwiLlwiK0NTU19DTEFTU0VTLnNlbGVjdGVkTGlzdFRpbGUpO2lmKGZpcnN0SXRlbSYmc2VsZWN0ZWRJdGVtKXt2YXIgZmlyc3RJdGVtUmVjdD1maXJzdEl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksc2VsZWN0ZWRJdGVtUmVjdD1zZWxlY3RlZEl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cG9zaXRpb25PZmZzZXQ9c2VsZWN0ZWRJdGVtUmVjdC50b3AtZmlyc3RJdGVtUmVjdC50b3B9dmFyIGFsaWduRWw9c2VsZWN0ZWRJdGVtfHxmaXJzdEl0ZW0sYWxpZ25SZWN0PWFsaWduRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksX3RhcmdldFJlY3Q9dGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksaGVpZ2h0RGlmZj1hbGlnblJlY3QuaGVpZ2h0LV90YXJnZXRSZWN0LmhlaWdodDtwb3NpdGlvbk9mZnNldCs9aGVpZ2h0RGlmZi8yfXZhciB0YXJnZXRSZWN0PXRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHBhcmVudFJlY3Q9bWVudUVsLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksYWxpZ25MZWZ0PWZ1bmN0aW9uKCl7cmV0dXJuIG1lbnVFbC5zdHlsZS5sZWZ0PXRhcmdldFJlY3QubGVmdC1wYXJlbnRSZWN0LmxlZnQrb2Zmc2V0SCtcInB4XCJ9LGFsaWduUmlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbWVudUVsLnN0eWxlLnJpZ2h0PXRhcmdldFJlY3QucmlnaHQtcGFyZW50UmVjdC5yaWdodCtvZmZzZXRIK1wicHhcIn0sYWxpZ25Ub3A9ZnVuY3Rpb24oKXtyZXR1cm4gbWVudUVsLnN0eWxlLnRvcD10YXJnZXRSZWN0LnRvcC1wYXJlbnRSZWN0LnRvcC1wb3NpdGlvbk9mZnNldCtPRkZTRVRfVitcInB4XCJ9LGFsaWduQm90dG9tPWZ1bmN0aW9uKCl7cmV0dXJuIG1lbnVFbC5zdHlsZS5ib3R0b209dGFyZ2V0UmVjdC5ib3R0b20tcGFyZW50UmVjdC5ib3R0b20tcG9zaXRpb25PZmZzZXQrXCJweFwifSxhbGlnbkZuPXtcInRvcC1sZWZ0XCI6ZnVuY3Rpb24oKXtyZXR1cm4gYWxpZ25Ub3AoKSYmYWxpZ25MZWZ0KCl9LFwidG9wLXJpZ2h0XCI6ZnVuY3Rpb24oKXtyZXR1cm4gYWxpZ25Ub3AoKSYmYWxpZ25SaWdodCgpfSxcImJvdHRvbS1sZWZ0XCI6ZnVuY3Rpb24oKXtyZXR1cm4gYWxpZ25Cb3R0b20oKSYmYWxpZ25MZWZ0KCl9LFwiYm90dG9tLXJpZ2h0XCI6ZnVuY3Rpb24oKXtyZXR1cm4gYWxpZ25Cb3R0b20oKSYmYWxpZ25SaWdodCgpfX07YWxpZ25GbltvcmlnaW5dLmNhbGwoKX19fX0sc2hvdz1mdW5jdGlvbihjdHJsLG9wdHMpe3JldHVybiBjdHJsLmlzVHJhbnNpdGlvbmluZz0hMCxfdHJhbnNpdGlvbjJbXCJkZWZhdWx0XCJdLnNob3coT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtlbDpjdHJsLmVsLHNob3dDbGFzczpDU1NfQ0xBU1NFUy52aXNpYmxlfSkpLnRoZW4oZnVuY3Rpb24oKXtjdHJsLmlzVHJhbnNpdGlvbmluZz0hMSxjdHJsLnZpc2libGU9ITAsb3B0cy5kaWRTaG93JiZvcHRzLmRpZFNob3cob3B0cy5pZCl9KX0saGlkZT1mdW5jdGlvbihjdHJsLG9wdHMpe3JldHVybiBjdHJsLmlzVHJhbnNpdGlvbmluZz0hMCxfdHJhbnNpdGlvbjJbXCJkZWZhdWx0XCJdLmhpZGUoT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtlbDpjdHJsLmVsLHNob3dDbGFzczpDU1NfQ0xBU1NFUy52aXNpYmxlfSkpLnRoZW4oZnVuY3Rpb24oKXtjdHJsLmlzVHJhbnNpdGlvbmluZz0hMSxjdHJsLnZpc2libGU9ITEsb3B0cy5kaWRIaWRlJiZvcHRzLmRpZEhpZGUob3B0cy5pZCksX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKX0pfSx1bmlmeVNpemU9ZnVuY3Rpb24oc2l6ZSl7cmV0dXJuIE1JTl9TSVpFPnNpemU/TUlOX1NJWkU6c2l6ZX0sd2lkdGhDbGFzcz1mdW5jdGlvbihzaXplKXt2YXIgc2l6ZVN0cj1zaXplLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIixcIi1cIik7cmV0dXJuIENTU19DTEFTU0VTLndpZHRoX24rc2l6ZVN0cn0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLGxpc3RlbkVsPWRvY3VtZW50LmJvZHksYWN0aXZhdGVEaXNtaXNzVGFwPWZ1bmN0aW9uKCl7bGlzdGVuRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsaGFuZGxlRGlzbWlzc1RhcCl9LGRlQWN0aXZhdGVEaXNtaXNzVGFwPWZ1bmN0aW9uKCl7bGlzdGVuRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsaGFuZGxlRGlzbWlzc1RhcCl9LGhhbmRsZURpc21pc3NUYXA9ZnVuY3Rpb24oZSl7ZS50YXJnZXQhPT1jdHJsLmVsJiYoZGVBY3RpdmF0ZURpc21pc3NUYXAoKSxlLmRlZmF1bHRQcmV2ZW50ZWQ/aGlkZShjdHJsLG9wdHMpOmhpZGUoY3RybCxPYmplY3QuYXNzaWduKHt9LG9wdHMse2hpZGVEZWxheTowfSkpKX0sdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHMucGVybWFuZW50P0NTU19DTEFTU0VTLnBlcm1hbmVudDpudWxsLG9wdHMudGFyZ2V0P0NTU19DTEFTU0VTLnRhcmdldDpcImxheW91dCBjZW50ZXItY2VudGVyXCIsb3B0cy5zaXplP3dpZHRoQ2xhc3ModW5pZnlTaXplKG9wdHMuc2l6ZSkpOm51bGwsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpmdW5jdGlvbihlbCxpbml0ZWQsY29udGV4dCx2ZG9tKXtpZighaW5pdGVkKXtvcHRzLmNvbmZpZyYmb3B0cy5jb25maWcoZWwsaW5pdGVkLGNvbnRleHQsdmRvbSksY3RybC5lbD1lbDt2YXIgdXBkYXRlPWZ1bmN0aW9uKCl7cG9zaXRpb25NZW51KGN0cmwsb3B0cyksX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKX0saGFuZGxlRXNjYXBlPWZ1bmN0aW9uKGUpezI3PT09ZS53aGljaCYmaGlkZShjdHJsLE9iamVjdC5hc3NpZ24oe30sb3B0cyx7aGlkZURlbGF5OjB9KSl9O29wdHMucGVybWFuZW50fHwoX2V2ZW50czJbXCJkZWZhdWx0XCJdLnN1YnNjcmliZShcInJlc2l6ZVwiLHVwZGF0ZSksX2V2ZW50czJbXCJkZWZhdWx0XCJdLnN1YnNjcmliZShcImtleWRvd25cIixoYW5kbGVFc2NhcGUpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXthY3RpdmF0ZURpc21pc3NUYXAoKSxzaG93KGN0cmwsb3B0cyl9LDApKSxjb250ZXh0Lm9udW5sb2FkPWZ1bmN0aW9uKCl7X2V2ZW50czJbXCJkZWZhdWx0XCJdLnVuc3Vic2NyaWJlKFwicmVzaXplXCIsdXBkYXRlKSxfZXZlbnRzMltcImRlZmF1bHRcIl0udW5zdWJzY3JpYmUoXCJrZXlkb3duXCIsaGFuZGxlRXNjYXBlKSxvcHRzLnBlcm1hbmVudHx8ZGVBY3RpdmF0ZURpc21pc3NUYXAoKX0scG9zaXRpb25NZW51KGN0cmwsb3B0cyl9fX0sY29udGVudD0oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCwgXCJjb25maWdcIjogZnVuY3Rpb24oZWwsaW5pdGVkKXtpbml0ZWR8fChjdHJsLmNvbnRlbnRFbD1lbCl9LCBcIm9uY2xpY2tcIjogZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpfSB9LCBjaGlsZHJlbjogWyBfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfc2hhZG93MltcImRlZmF1bHRcIl0se3o6Y3RybC56LGFuaW1hdGVkOiEwfSksb3B0cy5jb250ZW50P29wdHMuY29udGVudDpudWxsIF0gfSk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXtjb250cm9sbGVyOmZ1bmN0aW9uKCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSx6PXZvaWQgMCE9PW9wdHMuej9vcHRzLno6MTtyZXR1cm57ejp6LGVsOm51bGwsY29udGVudEVsOm51bGwsaXNUcmFuc2l0aW9uaW5nOiExLHZpc2libGU6b3B0cy5wZXJtYW5lbnR8fCExfX0sdmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBvcHRzLnNob3cmJiFjdHJsLnZpc2libGUmJihjdHJsLnZpc2libGU9ITApLGN0cmwudmlzaWJsZT9jcmVhdGVWaWV3KGN0cmwsb3B0cyk6KHsgdGFnOiBcInNwYW5cIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5wbGFjZWhvbGRlciB9LCBjaGlsZHJlbjogW10gfSl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZW51LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtbWVudVwiLHtcIiAucGUtbWVudV9fY29udGVudFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JhY2tncm91bmRcIl19fSldfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIikse1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCImXCIpXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKTtleHBvcnRzW1wiZGVmYXVsdFwiXT17c2l6ZXM6WzEsMS41LDIsMyw0LDUsNiw3XSxtaW5fc2l6ZToxLjUsbWF4X3NpemVfc21hbGxfc2NyZWVuOjUsc2l6ZV9mYWN0b3I6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9tZW51LGJvcmRlcl9yYWRpdXM6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfYmxvY2tfYm9yZGVyX3JhZGl1cyxjb2xvcl9saWdodF9iYWNrZ3JvdW5kOl9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9iYWNrZ3JvdW5kKSxjb2xvcl9kYXJrX2JhY2tncm91bmQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfYmFja2dyb3VuZCl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksdW5pZnlTaXplPWZ1bmN0aW9uKGNvbmZpZyxzaXplKXtyZXR1cm4gc2l6ZTxjb25maWcubWluX3NpemU/Y29uZmlnLm1pbl9zaXplOnNpemV9LHdpZHRoQ2xhc3M9ZnVuY3Rpb24oY29uZmlnLHNpemUpe3ZhciBzaXplU3RyPXNpemUudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLFwiLVwiKTtyZXR1cm5cInBlLW1lbnUtLXdpZHRoLVwiK3NpemVTdHJ9LHdpZHRoU3R5bGU9ZnVuY3Rpb24oY29uZmlnLHNpemUpe3ZhciBzPXVuaWZ5U2l6ZShjb25maWcsc2l6ZSk7cmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSxcIiYuXCIrd2lkdGhDbGFzcyhjb25maWcscykse3dpZHRoOmNvbmZpZy5zaXplX2ZhY3RvcipzK1wicHhcIixcIm1heC13aWR0aFwiOlwiMTAwJVwifSl9LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVyblt7XCIucGUtbWVudVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cIjpcImVhc2Utb3V0XCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widHJhbnNpdGlvbi1wcm9wZXJ0eVwiOlwib3BhY2l0eVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksY29uZmlnLnNpemVzLm1hcChmdW5jdGlvbihzaXplKXtyZXR1cm4gd2lkdGhTdHlsZShjb25maWcsc2l6ZSl9KSxfZGVmaW5lUHJvcGVydHkoe1wiei1pbmRleFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS56X21lbnUsb3BhY2l0eTowLHBvc2l0aW9uOlwiYWJzb2x1dGVcIix3aWR0aDpcIjEwMCVcIixcIm1pbi13aWR0aFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfbWVudSpjb25maWcubWluX3NpemUrXCJweFwiLFwiJi5wZS1tZW51LS13aWR0aC1hdXRvXCI6e3dpZHRoOlwiYXV0b1wifSxcIiYucGUtbWVudS0tdmlzaWJsZVwiOntvcGFjaXR5OjF9LFwiJi5wZS1tZW51LS1wZXJtYW5lbnRcIjp7cG9zaXRpb246XCJyZWxhdGl2ZVwiLG9wYWNpdHk6MX0sXCIgLnBlLW1lbnVfX2NvbnRlbnRcIjp7d2lkdGg6XCIxMDAlXCIsXCJib3JkZXItcmFkaXVzXCI6Y29uZmlnLmJvcmRlcl9yYWRpdXMrXCJweFwifX0sXCJAbWVkaWEgKG1heC13aWR0aDogXCIrX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfc2NyZWVuX3NpemVfbGFyZ2UrXCJweClcIix7XCJtYXgtd2lkdGhcIjpjb25maWcubWF4X3NpemVfc21hbGxfc2NyZWVuKl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfbWVudStcInB4XCJ9KV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvbWVudS90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9tZW51L3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL21lbnUvdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0ubWVudSxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLW1lbnVcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGlzVG91Y2g9XCJvbnRvdWNoc3RhcnRcImluIHdpbmRvd3x8bmF2aWdhdG9yLk1heFRvdWNoUG9pbnRzPjB8fG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzPjA7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWxcIikuY2xhc3NMaXN0LmFkZChpc1RvdWNoP1wicGUtdG91Y2hcIjpcInBlLW5vLXRvdWNoXCIpLGV4cG9ydHNbXCJkZWZhdWx0XCJdPXtpc1RvdWNoOmlzVG91Y2h9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seXRoZW5lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfcG9seXRoZW5lPXJlcXVpcmUoXCJwb2x5dGhlbmUvcG9seXRoZW5lL3BvbHl0aGVuZVwiKSxfcG9seXRoZW5lMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb2x5dGhlbmUpLF90cmFuc2l0aW9uRXZlbnQ9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vdHJhbnNpdGlvbi1ldmVudFwiKSxfdHJhbnNpdGlvbkV2ZW50Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cmFuc2l0aW9uRXZlbnQpO3JlcXVpcmUoXCJwb2x5dGhlbmUvcmlwcGxlL3RoZW1lL3RoZW1lXCIpO3ZhciB0cmFuc2l0aW9uRXZlbnQ9KDAsX3RyYW5zaXRpb25FdmVudDJbXCJkZWZhdWx0XCJdKSgpLERFRkFVTFRfU1RBUlRfT1BBQ0lUWT0uMixPUEFDSVRZX0RFQ0FZX1ZFTE9DSVRZPS4zNSxDU1NfQ0xBU1NFUz17cmlwcGxlOlwicGUtcmlwcGxlXCIsd2F2ZXM6XCJwZS1yaXBwbGVfX3dhdmVzXCIsbWFzazpcInBlLXJpcHBsZV9fbWFza1wiLGNvbnN0cmFpbmVkOlwicGUtcmlwcGxlLS1jb25zdHJhaW5lZFwiLGFuaW1hdGVkOlwicGUtcmlwcGxlX193YXZlcy0tYW5pbWF0ZWRcIn0sbWFrZVJpcHBsZT1mdW5jdGlvbihlLGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT97fTphcmd1bWVudHNbMl0sZWw9Y3RybC5yaXBwbGUoKSx3YXZlc0VsPWN0cmwud2F2ZXMoKSx3PWVsLm9mZnNldFdpZHRoLGg9ZWwub2Zmc2V0SGVpZ2h0LHdhdmVSYWRpdXM9TWF0aC5zcXJ0KHcqdytoKmgpLHJlY3Q9ZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkseD1fcG9seXRoZW5lMltcImRlZmF1bHRcIl0uaXNUb3VjaCYmZS50b3VjaGVzP2UudG91Y2hlc1swXS5wYWdlWDplLmNsaWVudFgseT1fcG9seXRoZW5lMltcImRlZmF1bHRcIl0uaXNUb3VjaCYmZS50b3VjaGVzP2UudG91Y2hlc1swXS5wYWdlWTplLmNsaWVudFksbXg9b3B0cy5jZW50ZXI/cmVjdC5sZWZ0K3JlY3Qud2lkdGgvMjp4LG15PW9wdHMuY2VudGVyP3JlY3QudG9wK3JlY3QuaGVpZ2h0LzI6eSxyeD1teC1yZWN0LmxlZnQtd2F2ZVJhZGl1cy8yLHJ5PW15LXJlY3QudG9wLXdhdmVSYWRpdXMvMixpbml0aWFsT3BhY2l0eT12b2lkIDAhPT1vcHRzLmluaXRpYWxPcGFjaXR5P29wdHMuaW5pdGlhbE9wYWNpdHk6REVGQVVMVF9TVEFSVF9PUEFDSVRZLG9wYWNpdHlEZWNheVZlbG9jaXR5PXZvaWQgMCE9PW9wdHMub3BhY2l0eURlY2F5VmVsb2NpdHk/b3B0cy5vcGFjaXR5RGVjYXlWZWxvY2l0eTpPUEFDSVRZX0RFQ0FZX1ZFTE9DSVRZLGR1cmF0aW9uPTEvb3BhY2l0eURlY2F5VmVsb2NpdHkqaW5pdGlhbE9wYWNpdHksY29sb3I9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmNvbG9yLG9uRW5kPWZ1bmN0aW9uIG9uRW5kKGV2dCl7d2F2ZXNFbC5jbGFzc0xpc3QucmVtb3ZlKENTU19DTEFTU0VTLmFuaW1hdGVkKSx3YXZlc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LG9uRW5kLCExKSxvcHRzLmVuZCYmb3B0cy5lbmQoZXZ0KX07d2F2ZXNFbC5jbGFzc0xpc3QucmVtb3ZlKENTU19DTEFTU0VTLmFuaW1hdGVkKTt2YXIgc3R5bGU9d2F2ZXNFbC5zdHlsZTtzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9d2F2ZVJhZGl1cytcInB4XCIsc3R5bGUudG9wPXJ5K1wicHhcIixzdHlsZS5sZWZ0PXJ4K1wicHhcIixzdHlsZVtcImFuaW1hdGlvbi1kdXJhdGlvblwiXT1zdHlsZVtcIi13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uXCJdPXN0eWxlW1wiLW1vei1hbmltYXRpb24tZHVyYXRpb25cIl09c3R5bGVbXCItby1hbmltYXRpb24tZHVyYXRpb25cIl09ZHVyYXRpb24rXCJzXCIsc3R5bGUuYmFja2dyb3VuZENvbG9yPWNvbG9yLHN0eWxlLm9wYWNpdHk9aW5pdGlhbE9wYWNpdHksd2F2ZXNFbC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCxvbkVuZCwhMSksb3B0cy5zdGFydCYmb3B0cy5zdGFydChlKSx3YXZlc0VsLmNsYXNzTGlzdC5hZGQoQ1NTX0NMQVNTRVMuYW5pbWF0ZWQpfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07aWYob3B0cy5kaXNhYmxlZClyZXR1cm4oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7ICB9LCBjaGlsZHJlbjogW10gfSk7dmFyIGluaXRSaXBwbGU9ZnVuY3Rpb24ocmlwcGxlLGluaXRlZCxjb250ZXh0KXtpZighaW5pdGVkKXtjdHJsLnJpcHBsZShyaXBwbGUpO3ZhciBwYXJlbnQ9cmlwcGxlLnBhcmVudEVsZW1lbnQsb25DbGljaz1mdW5jdGlvbihlKXttYWtlUmlwcGxlKGUsY3RybCxvcHRzKX0sZW5kVHlwZT1fcG9seXRoZW5lMltcImRlZmF1bHRcIl0uaXNUb3VjaD9cImNsaWNrXCI6XCJtb3VzZXVwXCI7cGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoZW5kVHlwZSxvbkNsaWNrLCExKSxjb250ZXh0Lm9udW5sb2FkPWZ1bmN0aW9uKCl7cGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZW5kVHlwZSxvbkNsaWNrLCExKX19fSxpbml0V2F2ZXM9ZnVuY3Rpb24od2F2ZXMsaW5pdGVkKXtpbml0ZWR8fGN0cmwud2F2ZXMod2F2ZXMpfSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMucmlwcGxlLG9wdHMuY29uc3RyYWluZWQhPT0hMT9DU1NfQ0xBU1NFUy5jb25zdHJhaW5lZDpudWxsLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6aW5pdFJpcHBsZX0sY29udGVudD0oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMubWFzayB9LCBjaGlsZHJlbjogWyAoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMud2F2ZXMsIFwiY29uZmlnXCI6IGluaXRXYXZlcyB9LCBjaGlsZHJlbjogW10gfSkgXSB9KTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsY29udGVudCl9LGNvbXBvbmVudD17Y29udHJvbGxlcjpmdW5jdGlvbigpe3JldHVybntyaXBwbGU6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKCksd2F2ZXM6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKCksZGVsZWdhdGU6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKCl9fSx2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJpcHBsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzW1wiZGVmYXVsdFwiXT17c3RhcnRfc2NhbGU6LjEsZW5kX3NjYWxlOjIsc3RhcnRfb3BhY2l0eTouMixlbmRfb3BhY2l0eTowfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxrZlJpcHBsZT1mdW5jdGlvbihjb25maWcpe3JldHVybntcIiAxMDAlXCI6e3RyYW5zZm9ybTpcInNjYWxlKFwiK2NvbmZpZy5lbmRfc2NhbGUrXCIpXCIsb3BhY2l0eTpjb25maWcuZW5kX29wYWNpdHl9fX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1yaXBwbGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse2NvbG9yOlwiaW5oZXJpdFwiLFwiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwiLFwiJi5wZS1yaXBwbGUtLWNvbnN0cmFpbmVkXCI6e1wiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwiLFwiIC5wZS1yaXBwbGVfX21hc2tcIjp7b3ZlcmZsb3c6XCJoaWRkZW5cIixcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIn19LFwiIC5wZS1yaXBwbGVfX21hc2tcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGUzZCgwLDAsMClcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zZm9ybSldLFwiIC5wZS1yaXBwbGVfX3dhdmVzXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNmb3JtOlwic2NhbGUoXCIrY29uZmlnLnN0YXJ0X3NjYWxlK1wiKVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNmb3JtKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe2FuaW1hdGlvbjpcInJpcHBsZSBcIitfY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2N1cnZlX2RlZmF1bHR9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc19hbmltYXRpb24pLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJhbmltYXRpb24tZHVyYXRpb25cIjpfY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2R1cmF0aW9ufSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfYW5pbWF0aW9uKSx7b3V0bGluZTpcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiLHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcImJvcmRlci1yYWRpdXNcIjpcIjUwJVwiLG9wYWNpdHk6Y29uZmlnLnN0YXJ0X29wYWNpdHksXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwiLGRpc3BsYXk6XCJub25lXCJ9XSxcIiAucGUtcmlwcGxlX193YXZlcy0tYW5pbWF0ZWRcIjp7ZGlzcGxheTpcImJsb2NrXCJ9fV0sXCJAa2V5ZnJhbWVzIHJpcHBsZVwiOmtmUmlwcGxlKGNvbmZpZyl9XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvcmlwcGxlL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL3JpcHBsZS90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5yaXBwbGUsY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1yaXBwbGVcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpO3JlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1zaGFkb3dcIix0b3BTaGFkb3c6XCJwZS1zaGFkb3dfX3RvcFwiLGJvdHRvbVNoYWRvdzpcInBlLXNoYWRvd19fYm90dG9tXCIsYW5pbWF0ZWQ6XCJwZS1zaGFkb3ctLWFuaW1hdGVkXCIsZGVwdGhfbjpcInBlLXNoYWRvdy0tei1cIn0sY2xhc3NGb3JEZXB0aD1mdW5jdGlvbigpe3ZhciB6PWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT8xOmFyZ3VtZW50c1swXTtyZXR1cm4gQ1NTX0NMQVNTRVMuZGVwdGhfbitNYXRoLm1pbig1LHopfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sZGVwdGhDbGFzcz1jbGFzc0ZvckRlcHRoKG9wdHMueiksdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHMuYW5pbWF0ZWQ/Q1NTX0NMQVNTRVMuYW5pbWF0ZWQ6XCJcIixvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxjb250ZW50PVtvcHRzLmNvbnRlbnQ/b3B0cy5jb250ZW50Om51bGwsKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IFtDU1NfQ0xBU1NFUy5ib3R0b21TaGFkb3csZGVwdGhDbGFzc10uam9pbihcIiBcIikgfSwgY2hpbGRyZW46IFtdIH0pLCh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBbQ1NTX0NMQVNTRVMudG9wU2hhZG93LGRlcHRoQ2xhc3NdLmpvaW4oXCIgXCIpIH0sIGNoaWxkcmVuOiBbXSB9KV07cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLGNvbnRlbnQpfSxjb21wb25lbnQ9e3ZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhZG93LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHNbXCJkZWZhdWx0XCJdPXt0cmFuc2l0aW9uOlwiYm94LXNoYWRvdyAwLjE4cyBlYXNlLW91dFwiLFwic2hhZG93LXRvcC16LTFcIjpcIm5vbmVcIixcInNoYWRvdy1ib3R0b20tei0xXCI6XCIwIDFweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMzcpXCIsXCJzaGFkb3ctdG9wLXotMlwiOlwiMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpXCIsXCJzaGFkb3ctYm90dG9tLXotMlwiOlwiMCA2cHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4zKVwiLFwic2hhZG93LXRvcC16LTNcIjpcIjAgMTFweCA3cHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpXCIsXCJzaGFkb3ctYm90dG9tLXotM1wiOlwiMCAxM3B4IDI1cHggMCByZ2JhKDAsIDAsIDAsIDAuMylcIixcInNoYWRvdy10b3Atei00XCI6XCIwIDE0cHggMTJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNylcIixcInNoYWRvdy1ib3R0b20tei00XCI6XCIwIDIwcHggNDBweCAwIHJnYmEoMCwgMCwgMCwgMC4zKVwiLFwic2hhZG93LXRvcC16LTVcIjpcIjAgMTdweCAxN3B4IDAgcmdiYSgwLCAwLCAwLCAwLjE1KVwiLFwic2hhZG93LWJvdHRvbS16LTVcIjpcIjAgMjdweCA1NXB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpXCIsXCJzaGFkb3ctZG93bi16LTFcIjpcImluc2V0IDBweCAxcHggMnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjE1KVwiLFwic2hhZG93LWRvd24tei0yXCI6XCJpbnNldCAwcHggNHB4IDZweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yNSlcIn0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzaGFkb3dEaXJlY3RpdmU9ZnVuY3Rpb24oZGlyKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcImJveC1zaGFkb3dcIjpkaXJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc19ib3hfc2hhZG93KX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1zaGFkb3dcIjpbX21peGluMltcImRlZmF1bHRcIl0uZml0KCkse1wiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIixcIiAucGUtc2hhZG93X19ib3R0b20sIC5wZS1zaGFkb3dfX3RvcFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7XCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCJ9XSxcIiYucGUtc2hhZG93LS1hbmltYXRlZFwiOntcIiAucGUtc2hhZG93X19ib3R0b20sIC5wZS1zaGFkb3dfX3RvcFwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNpdGlvbjpjb25maWcudHJhbnNpdGlvbn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pfX0sWzEsMiwzLDQsNV0ubWFwKGZ1bmN0aW9uKGluZGV4KXt2YXIgX3JlZjtyZXR1cm4gX3JlZj17fSxfZGVmaW5lUHJvcGVydHkoX3JlZixcIiAucGUtc2hhZG93X190b3AucGUtc2hhZG93LS16LVwiK2luZGV4LHNoYWRvd0RpcmVjdGl2ZShjb25maWdbXCJzaGFkb3ctdG9wLXotXCIraW5kZXhdKSksX2RlZmluZVByb3BlcnR5KF9yZWYsXCIgLnBlLXNoYWRvd19fYm90dG9tLnBlLXNoYWRvdy0tei1cIitpbmRleCxzaGFkb3dEaXJlY3RpdmUoY29uZmlnW1wic2hhZG93LWJvdHRvbS16LVwiK2luZGV4XSkpLF9yZWZ9KV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL3NoYWRvdy90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5zaGFkb3csY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1zaGFkb3dcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCk7cmVxdWlyZShcInBvbHl0aGVuZS9zdmcvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLXN2Z1wifSxnbG9iYWxDYWNoZT17fSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sY29udGVudD12b2lkIDAsc3ZnPXZvaWQgMCx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9T2JqZWN0LmFzc2lnbih7fSx7XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5ibG9jayxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxvcHRzLmV2ZW50cz9vcHRzLmV2ZW50czpudWxsKTtpZihvcHRzLmNvbnRlbnQpY29udGVudD1vcHRzLmNvbnRlbnQ7ZWxzZXt2YXIgcGF0aD1vcHRzLnNyYztjdHJsLnBhdGgoKSE9PXBhdGg/KHN2Zz1nbG9iYWxDYWNoZVtwYXRoXSxzdmc/KGNvbnRlbnQ9X21pdGhyaWwyW1wiZGVmYXVsdFwiXS50cnVzdChzdmcpLHByZWxvYWROZXh0KGN0cmwsb3B0cykpOihjdHJsLnBhdGgocGF0aCksbG9hZFN2ZyhwYXRoLGN0cmwsb3B0cykudGhlbihfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdykpKTooc3ZnPWN0cmwuc3ZnKCksc3ZnPXN2Z3x8XCJcIixjb250ZW50PV9taXRocmlsMltcImRlZmF1bHRcIl0udHJ1c3Qoc3ZnKSxwcmVsb2FkTmV4dChjdHJsLG9wdHMpKX1yZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxsb2FkU3ZnPWZ1bmN0aW9uKHBhdGgsY3RybCxvcHRzKXt2YXIgcHJlbG9hZGluZz1hcmd1bWVudHMubGVuZ3RoPD0zfHx2b2lkIDA9PT1hcmd1bWVudHNbM10/ITE6YXJndW1lbnRzWzNdO2lmKFN5c3RlbSYmU3lzdGVtW1wiaW1wb3J0XCJdKXt2YXIgbm9ybWFsaXplZE5hbWU9U3lzdGVtLm5vcm1hbGl6ZVN5bmMocGF0aCk7cmV0dXJuIFN5c3RlbVtcImltcG9ydFwiXShub3JtYWxpemVkTmFtZSkudGhlbihmdW5jdGlvbihkYXRhKXtwcmVsb2FkaW5nPyhnbG9iYWxDYWNoZVtwYXRoXT1kYXRhLGN0cmwucHJlbG9hZGluZ0luZGV4KysscHJlbG9hZE5leHQoY3RybCxvcHRzKSk6Y3RybC5zdmcoZGF0YSl9KX1jb25zb2xlJiZjb25zb2xlLmxvZyhcInBvbHl0aGVuZS9zdmc6IFN5c3RlbSBub3QgZm91bmQuXCIpfSxwcmVsb2FkTmV4dD1mdW5jdGlvbiBwcmVsb2FkTmV4dChjdHJsLG9wdHMpe2lmKGN0cmwucHJlbG9hZGluZ0l0ZW1zJiYhKGN0cmwucHJlbG9hZGluZ0luZGV4Pj1jdHJsLnByZWxvYWRpbmdJdGVtcy5sZW5ndGgpKXt2YXIgbmV4dD1jdHJsLnByZWxvYWRpbmdJdGVtc1tjdHJsLnByZWxvYWRpbmdJbmRleF07Z2xvYmFsQ2FjaGVbbmV4dF0/KGN0cmwucHJlbG9hZGluZ0luZGV4KysscHJlbG9hZE5leHQoY3RybCxvcHRzKSk6bG9hZFN2ZyhuZXh0LGN0cmwsb3B0cywhMCl9fSxjb21wb25lbnQ9e2NvbnRyb2xsZXI6ZnVuY3Rpb24oKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdO3JldHVybntwYXRoOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcChcIlwiKSxzdmc6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKFwiXCIpLHByZWxvYWRpbmdJdGVtczpvcHRzLnByZWxvYWQscHJlbG9hZGluZ0luZGV4OjB9fSx2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN2Zy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlcik7cmVxdWlyZShcInBvbHl0aGVuZS9mb250LXJvYm90by90aGVtZVwiKTt2YXIgX3R5cG9ncmFwaHk9cmVxdWlyZShcInBvbHl0aGVuZS90aGVtZS90eXBvZ3JhcGh5XCIpLF90eXBvZ3JhcGh5Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBvZ3JhcGh5KSxyb2JvdG89W3tcImh0bWwsIGJvZHksIGlucHV0LCB0ZXh0YXJlYVwiOntcImZvbnQtZmFtaWx5XCI6XCJSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIn19XSxnZW5lcmFsPVt7XCIqXCI6W3tcImJveC1zaXppbmdcIjpcImJvcmRlci1ib3hcIn0se1wiLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yXCI6XCJyZ2JhKDAsMCwwLDApXCJ9LHtcIi13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvclwiOlwidHJhbnNwYXJlbnRcIn1dLFwiIGEsIGE6YWN0aXZlLCBhOmZvY3VzLCBpbnB1dDphY3RpdmUsIGlucHV0W3R5cGVdOmZvY3VzXCI6e291dGxpbmU6MH0sXCJpbnB1dDpkaXNhYmxlZFwiOntvcGFjaXR5OjF9fV07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLXRoZW1lXCIscm9ib3RvLF90eXBvZ3JhcGh5MltcImRlZmF1bHRcIl0sZ2VuZXJhbCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLGZvbnRTaXplPTE0LHN0eWxlcz1be1wiIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHBcIjp7bWFyZ2luOjAscGFkZGluZzowfX0se1wiIGgxIHNtYWxsLCBoMiBzbWFsbCwgaDMgc21hbGwsIGg0IHNtYWxsLCBoNSBzbWFsbCwgaDYgc21hbGxcIjp7XCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5saW5lX2hlaWdodCxcImxldHRlci1zcGFjaW5nXCI6XCItMC4wMmVtXCIsXCJmb250LXNpemVcIjpcIjAuNmVtXCJ9fSx7XCIgaDFcIjp7XCJmb250LXNpemVcIjpcIjU2cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmxpbmVfaGVpZ2h0LFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMjRweFwifX0se1wiIGgyXCI6e1wiZm9udC1zaXplXCI6XCI0NXB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiNDhweFwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMjRweFwifX0se1wiIGgzXCI6e1wiZm9udC1zaXplXCI6XCIzNHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiNDBweFwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMjRweFwifX0se1wiIGg0XCI6e1wiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiMzJweFwiLFwiLW1vei1vc3gtZm9udC1zbW9vdGhpbmdcIjpcImdyYXlzY2FsZVwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMTZweFwifX0se1wiIGg1XCI6e1wiZm9udC1zaXplXCI6XCIyMHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9tZWRpdW0sXCJsaW5lLWhlaWdodFwiOlwiMVwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIi0wLjAyZW1cIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjE2cHhcIn19LHtcIiBoNlwiOntcImZvbnQtc2l6ZVwiOlwiMTZweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIwLjA0ZW1cIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjE2cHhcIn19LHtcIiBodG1sLCBib2R5XCI6e1wiZm9udC1zaXplXCI6Zm9udFNpemUrXCJweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbH0sXCIgcFwiOntcImZvbnQtc2l6ZVwiOmZvbnRTaXplK1wicHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMTZweFwifSxcIiBibG9ja3F1b3RlXCI6e3Bvc2l0aW9uOlwicmVsYXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwiZm9udC1zdHlsZVwiOlwiaXRhbGljXCIsXCJsaW5lLWhlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5saW5lX2hlaWdodCxcImxldHRlci1zcGFjaW5nXCI6XCIwLjA4ZW1cIixcIm1hcmdpbi10b3BcIjpcIjI0cHhcIixcIm1hcmdpbi1ib3R0b21cIjpcIjE2cHhcIn0sXCIgdWwsIG9sXCI6e1wiZm9udC1zaXplXCI6Zm9udFNpemUrXCJweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6MH0sXCJiLCBzdHJvbmdcIjp7XCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9tZWRpdW19fV07ZXhwb3J0c1tcImRlZmF1bHRcIl09c3R5bGVzLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwb2dyYXBoeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLXRvb2xiYXJcIix7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl90ZXh0XCJdfSldfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIikse1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCImXCIpXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxtYXJnaW5fc2lkZT0yKl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LTEyLGhlaWdodF9kZXNrdG9wPTgqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQsaGVpZ2h0X21vYmlsZV9wb3J0cmFpdD03Kl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LGhlaWdodF9tb2JpbGVfbGFuZHNjYXBlPTYqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQ7ZXhwb3J0c1tcImRlZmF1bHRcIl09e21hcmdpbl9zaWRlOm1hcmdpbl9zaWRlLGluZGVudDpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pbmRlbnQsdHJhbnNpdGlvbl9kdXJhdGlvbjpfY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2R1cmF0aW9uLGZvbnRfc2l6ZTpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF9zaXplX3RpdGxlLGxpbmVfaGVpZ2h0Ol9jb25maWcyW1wiZGVmYXVsdFwiXS5saW5lX2hlaWdodCxoZWlnaHRfZGVza3RvcDpoZWlnaHRfZGVza3RvcCxoZWlnaHRfbW9iaWxlX3BvcnRyYWl0OmhlaWdodF9tb2JpbGVfcG9ydHJhaXQsaGVpZ2h0X21vYmlsZV9sYW5kc2NhcGU6aGVpZ2h0X21vYmlsZV9sYW5kc2NhcGUsaGVpZ2h0X25vcm1hbDpoZWlnaHRfZGVza3RvcCxoZWlnaHRfbWVkaXVtX3RhbGw6MipoZWlnaHRfZGVza3RvcCxoZWlnaHRfdGFsbDozKmhlaWdodF9kZXNrdG9wLGhlaWdodF9uYXJyb3c6aGVpZ2h0X21vYmlsZV9wb3J0cmFpdCxoZWlnaHRfbmFycm93X21lZGl1bV90YWxsOjExMixoZWlnaHRfbmFycm93X3RhbGw6MTY4LGNvbG9yX2xpZ2h0X3RleHQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeSksY29sb3JfZGFya190ZXh0Ol9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5KX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksX2ZsZXg9cmVxdWlyZShcInBvbHl0aGVuZS9sYXlvdXQvdGhlbWUvZmxleFwiKSxfZmxleDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleCksY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS10b29sYmFyXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNmb3JtOlwidHJhbnNsYXRlM2QoMCwwLDApXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2Zvcm0pLHtkaXNwbGF5OlwiYmxvY2tcIixwb3NpdGlvbjpcInJlbGF0aXZlXCIsaGVpZ2h0OmNvbmZpZy5oZWlnaHRfbm9ybWFsK1wicHhcIixcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemUrXCJweFwiLFwibGluZS1oZWlnaHRcIjpjb25maWcubGluZV9oZWlnaHQrXCJlbVwiLFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI0NGRDhEQ1wiLFwiJi5wZS1oZWFkZXItLWFuaW1hdGVkXCI6X21peGluMltcImRlZmF1bHRcIl0uZGVmYXVsdFRyYW5zaXRpb24oXCJoZWlnaHRcIixjb25maWcudHJhbnNpdGlvbl9kdXJhdGlvbixcImVhc2UtaW5cIiksXCImLnBlLWhlYWRlci0tbWVkaXVtLXRhbGxcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfbWVkaXVtX3RhbGwrXCJweFwifSxcIiYucGUtaGVhZGVyLS10YWxsXCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X3RhbGwrXCJweFwifSxcIiYucGUtdG9vbGJhci0tbmFycm93XCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X25hcnJvdytcInB4XCIsXCIgLnBlLXRvb2xiYXJfX2JhclwiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF9uYXJyb3crXCJweFwiLHBhZGRpbmc6MH19LFwiJi5wZS10b29sYmFyLS1uYXJyb3cucGUtaGVhZGVyLS1tZWRpdW0tdGFsbFwiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF9uYXJyb3dfbWVkaXVtX3RhbGwrXCJweFwifSxcIiYucGUtdG9vbGJhci0tbmFycm93LnBlLWhlYWRlci0tdGFsbFwiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF9uYXJyb3dfdGFsbCtcInB4XCJ9LFwiJi5wZS1oZWFkZXItLXRhbGwgLnBlLXRvb2xiYXJfX2Jhci0tbWlkZGxlXCI6X21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGVZKDEwMCUpXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2Zvcm0pLFwiIC5wZS10b29sYmFyX19iYXJcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRDZW50ZXIsX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRIb3Jpem9udGFsLHtcIj4gKjpub3QoLmRpc2FibGVkKVwiOntcInBvaW50ZXItZXZlbnRzXCI6XCJhdXRvXCJ9fSx7XCI+IDpmaXJzdC1jaGlsZFwiOntcIm1hcmdpbi1sZWZ0XCI6Y29uZmlnLm1hcmdpbl9zaWRlK1wicHhcIn19LHtcIj4gOmxhc3QtY2hpbGRcIjp7XCJtYXJnaW4tcmlnaHRcIjpjb25maWcubWFyZ2luX3NpZGUrXCJweFwifX0se1wiIC5wZS1idXR0b24tLWljb24gKyBzcGFuLCAucGUtYnV0dG9uLS1pY29uICsgLnBlLXRpdGxlXCI6e1wibWFyZ2luLWxlZnRcIjpjb25maWcuaW5kZW50LWNvbmZpZy5tYXJnaW5fc2lkZS1fY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2ljb25fYnV0dG9uK1wicHhcIn19LHtcIj4gc3BhbjpmaXJzdC1jaGlsZCwgLnBlLXRvb2xiYXJfX3RpdGxlLS1pbmRlbnRcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoKSx7XCJtYXJnaW4tbGVmdFwiOmNvbmZpZy5pbmRlbnQrXCJweFwifV19LHtcIj4gc3BhbiwgPiAucGUtdGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1widHJhbnNmb3JtLW9yaWdpblwiOlwibGVmdCA1MCVcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zZm9ybSkse2Rpc3BsYXk6XCJibG9ja1wiLFwibGluZS1oZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0ubGluZV9oZWlnaHQrXCJlbVwifV19LHt3aWR0aDpcIjEwMCVcIixwb3NpdGlvbjpcInJlbGF0aXZlXCIsaGVpZ2h0OmNvbmZpZy5oZWlnaHRfbm9ybWFsK1wicHhcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCIsXCIgLnBlLWZpdFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7d2lkdGg6XCJhdXRvXCIsbWFyZ2luOjAsXCIuYm90dG9tXCI6e3RvcDpcImF1dG9cIn19XSxcIiAucGUtaGVhZGVyXCI6X21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoKSxcIiYucGUtdG9vbGJhcl9fYmFyLS1taWRkbGVcIjp7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDowLHJpZ2h0OjAsbGVmdDowfSxcIiYucGUtdG9vbGJhcl9fYmFyLS1ib3R0b21cIjp7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHJpZ2h0OjAsYm90dG9tOjAsbGVmdDowfX1dfV19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS90b29sYmFyL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9jb2xvcj1yZXF1aXJlKFwicG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0udG9vbGJhcixjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLXRvb2xiYXJcIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZyksKDAsX2NvbG9yMltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpO3JlcXVpcmUoXCJwb2x5dGhlbmUvdG9vbGJhci90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtdG9vbGJhclwiLGJhcjpcInBlLXRvb2xiYXJfX2JhclwiLHRvcEJhcjpcInBlLXRvb2xiYXJfX2Jhci0tdG9wXCIsbWlkZGxlQmFyOlwicGUtdG9vbGJhcl9fYmFyLS1taWRkbGVcIixib3R0b21CYXI6XCJwZS10b29sYmFyX19iYXItLWJvdHRvbVwiLGFuaW1hdGVkOlwicGUtaGVhZGVyLS1hbmltYXRlZFwiLG1lZGl1bVRhbGw6XCJwZS1oZWFkZXItLW1lZGl1bS10YWxsXCIsdGFsbDpcInBlLWhlYWRlci0tdGFsbFwifSxiYXJXcmFwcGVyPWZ1bmN0aW9uKGNsYXNzTmFtZSxjb250ZW50KXtyZXR1cm4oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogW0NTU19DTEFTU0VTLmJhcixjbGFzc05hbWVdLmpvaW4oXCIgXCIpIH0sIGNoaWxkcmVuOiBbIGNvbnRlbnQgXSB9KX0sYmFyPWZ1bmN0aW9uKCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSxiYXJzPVtdO3JldHVybiBvcHRzLmNvbnRlbnQ/YmFycy5wdXNoKGJhcldyYXBwZXIoQ1NTX0NMQVNTRVMudG9wQmFyLG9wdHMuY29udGVudCkpOihvcHRzLnRvcEJhciYmYmFycy5wdXNoKGJhcldyYXBwZXIoQ1NTX0NMQVNTRVMudG9wQmFyLG9wdHMudG9wQmFyKSksb3B0cy5taWRkbGVCYXImJmJhcnMucHVzaChiYXJXcmFwcGVyKENTU19DTEFTU0VTLm1pZGRsZUJhcixvcHRzLm1pZGRsZUJhcikpLG9wdHMuYm90dG9tQmFyJiZiYXJzLnB1c2goYmFyV3JhcHBlcihDU1NfQ0xBU1NFUy5ib3R0b21CYXIsb3B0cy5ib3R0b21CYXIpKSksYmFyc30sbW9kZUNsYXNzZXM9e1wibWVkaXVtLXRhbGxcIjpDU1NfQ0xBU1NFUy5tZWRpdW1UYWxsLHRhbGw6Q1NTX0NMQVNTRVMudGFsbH0sY2xhc3NGb3JNb2RlPWZ1bmN0aW9uKCl7dmFyIG1vZGU9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP1wic3RhbmRhcmRcIjphcmd1bWVudHNbMF07cmV0dXJuXCJzdGFuZGFyZFwiPT09bW9kZT9cIlwiOm1vZGVDbGFzc2VzW21vZGVdfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sdGFnPW9wdHMudGFnfHxcImRpdlwiLHByb3BzPXtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLENTU19DTEFTU0VTLmFuaW1hdGVkLGNsYXNzRm9yTW9kZShvcHRzLm1vZGUpLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LGNvbnRlbnQ9YmFyKG9wdHMpO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17dmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b29sYmFyLmpzLm1hcCJdfQ==
