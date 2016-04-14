(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var btn =require( 'polythene/button/button');
var theme=require('polythene/theme/theme');
var toolbar= require( 'polythene/toolbar/toolbar');
var menu =require( 'polythene/menu/menu');
var list =require('polythene/list/list');
var listTile=require( 'polythene/list-tile/list-tile');
var server=require('../main.js');
exports.header = {
    controller: function() {
	
	// var file=m.component(btn, {
	// 	    label: 'File',
	// 	    events: {
	// 		onclick: function() {
			
	// 		    m.route('/report');
	// 		}
		    
	// 	    }
		
	// });
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
		 m.component(ctrl.myToolbar)
		 // m.component(ctrl.buildBtn),
		 // m.component(ctrl.reportBtn)
		);
    }
};

},{"../main.js":3,"polythene/button/button":9,"polythene/list-tile/list-tile":37,"polythene/list/list":42,"polythene/menu/menu":47,"polythene/theme/theme":63,"polythene/toolbar/toolbar":69}],2:[function(require,module,exports){
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


},{"polythene/button/button":9,"polythene/dialog/dialog":26}],3:[function(require,module,exports){
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

connect();

Global.socket.on('time',function(time){
    console.log(time)
    socket.emit('data',{data:'recieved'})
});
var header=require('./components/header.js').header;

var load=require('./components/load.js').main;

var main={
    view:function(){
	return [
	    m.component(header),
	    m.component(load)
	       ];
    }
    
};



m.route.mode = 'pathname';

m.route(document.body, '/', {
    '/': main
});

exports.Global=Global;

},{"./components/header.js":1,"./components/load.js":2}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";require("polythene/base-button/theme/theme");

},{"polythene/base-button/theme/theme":8}],7:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=[{".pe-button":[_mixin2["default"].vendorize({"user-select":"none"},_config2["default"].prefixes_user_select),{outline:"none",padding:0,"text-decoration":"none","text-align":"center",cursor:"pointer","&.pe-button--selected, &.pe-button--disabled, &.pe-button--inactive":{cursor:"default","pointer-events":"none"}," .pe-button__content":{position:"relative","border-radius":"inherit"}," .pe-button__label":[_mixin2["default"].fontSmoothing(),{position:"relative","z-index":1,display:"block","border-radius":"inherit","pointer-events":"none"}]," .pe-button__wash":[_mixin2["default"].vendorize({transition:"background-color "+_config2["default"].animation_duration+" "+_config2["default"].animation_curve_default},_config2["default"].prefixes_transition),_mixin2["default"].fit(),{"z-index":1,"border-radius":"inherit","pointer-events":"none"}]}]}];exports["default"]=style,module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22}],8:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _layout=require("polythene/base-button/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler);_styler2["default"].add("pe-base-button",_layout2["default"]);

},{"polythene/base-button/theme/layout":7,"polythene/common/styler":18}],9:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj};require("polythene/common/object.assign");var _polythene=require("polythene/polythene/polythene"),_polythene2=_interopRequireDefault(_polythene),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_ripple=require("polythene/ripple/ripple"),_ripple2=_interopRequireDefault(_ripple),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow);require("polythene/base-button/base-button"),require("polythene/button/theme/theme");var CSS_CLASSES={block:"pe-button pe-button--text",content:"pe-button__content",label:"pe-button__label",raised:"pe-button--raised",wash:"pe-button__wash",selected:"pe-button--selected",disabled:"pe-button--disabled",borders:"pe-button--borders",inactive:"pe-button--inactive"},MAX_Z=5,startType=window.PointerEvent?"pointerdown":"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?"touchstart":"mousedown",endType=window.PointerEvent?"pointerup":"ontouchend"in window||window.DocumentTouch&&document instanceof DocumentTouch?"touchend":"mouseup",tapStart=void 0,tapEnd=void 0,tapEndAll=void 0,downButtons=[],animateZ=function(ctrl,opts,name){var baseZ=ctrl.baseZ(),increase=opts.increase||1,z=ctrl.z();"down"===name&&5!==baseZ?(z+=increase,z=Math.min(z,MAX_Z)):"up"===name&&(z-=increase,z=Math.max(z,baseZ)),z!==ctrl.z()&&(ctrl.z(z),_mithril2["default"].redraw())},inactivate=function(ctrl,opts){ctrl.inactive=!0,_mithril2["default"].redraw(),setTimeout(function(){ctrl.inactive=!1,_mithril2["default"].redraw()},1e3*opts.inactivate)},initTapEvents=function(el,ctrl,opts){var tapHandler=function(ctrl,opts,name){"down"===name?downButtons.push({ctrl:ctrl,opts:opts}):"up"===name&&opts.inactivate&&!opts.inactive&&inactivate(ctrl,opts),opts.animateOnTap&&!_polythene2["default"].isTouch&&animateZ(ctrl,opts,name)};tapStart=function(){return tapHandler(ctrl,opts,"down")},tapEnd=function(){return tapHandler(ctrl,opts,"up")},tapEndAll=function(){downButtons.map(function(btn){tapHandler(btn.ctrl,btn.opts,"up")}),downButtons=[]},el.addEventListener(startType,tapStart),el.addEventListener(endType,tapEnd),window.addEventListener(endType,tapEndAll)},clearTapEvents=function(el){el.removeEventListener(startType,tapStart),el.removeEventListener(endType,tapEnd),window.removeEventListener(endType,tapEndAll)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],noink=void 0!==opts.ink&&!opts.ink,disabled=opts.disabled,inactive=ctrl.inactive,tag=opts.tag||"a",buttonConfig=function(el,isInited,context){isInited||disabled||inactive||(initTapEvents(el,ctrl,Object.assign({},opts,{animateOnTap:opts.animateOnTap!==!1})),context.onunload=function(){clearTapEvents(el)})},optsConfig=opts.config||function(){},urlConfig=opts.url&&opts.url.config?opts.url.config:function(){},props=Object.assign({},{"class":[opts.parentClass||CSS_CLASSES.block,opts.selected?CSS_CLASSES.selected:null,disabled?CSS_CLASSES.disabled:null,inactive?CSS_CLASSES.inactive:null,opts.borders?CSS_CLASSES.borders:null,opts.raised?CSS_CLASSES.raised:null,opts["class"]].join(" "),id:opts.id||""},opts.url?opts.url:null,opts.formaction?{formaction:opts.formaction}:null,opts.type?{type:opts.type}:null,opts.events?opts.events:null,{config:function(){return[buttonConfig.apply(void 0,arguments),optsConfig.apply(void 0,arguments),urlConfig.apply(void 0,arguments)]}},disabled?{disabled:!0}:null),label=opts.content?opts.content:opts.label?"object"===_typeof(opts.label)?opts.label:({ tag: "div", attrs: { "class": CSS_CLASSES.label }, children: [ opts.label ] }):null,content=({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ opts.raised&&!disabled?_mithril2["default"].component(_shadow2["default"],{z:ctrl.z(),animated:!0}):null,disabled||noink?null:_mithril2["default"].component(_ripple2["default"],opts.ripple||{}),disabled||void 0!==opts.wash&&!opts.wash?null:({ tag: "div", attrs: { "class": CSS_CLASSES.wash }, children: [] }),label ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],z=void 0!==opts.z?opts.z:1;return{baseZ:_mithril2["default"].prop(z),z:_mithril2["default"].prop(z),inactive:opts.inactive||!1}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/base-button/base-button":6,"polythene/button/theme/theme":13,"polythene/common/object.assign":17,"polythene/polythene/polythene":52,"polythene/ripple/ripple":53,"polythene/shadow/shadow":57}],10:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint,type){var scope=arguments.length<=3||void 0===arguments[3]?"":arguments[3],normalBorder=config["color_"+tint+"_"+type+"_normal_border"]||"transparent",activeBorder=config["color_"+tint+"_"+type+"_active_border"]||normalBorder,disabledBorder=config["color_"+tint+"_"+type+"_disabled_border"]||normalBorder;return[_defineProperty({},scope+".pe-button",{"&, &:link, &:visited":{color:config["color_"+tint+"_"+type+"_normal_text"]}," .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_normal_background"],"border-color":normalBorder},"&.pe-button--disabled":{color:config["color_"+tint+"_"+type+"_disabled_text"]," .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_disabled_background"],"border-color":disabledBorder}},"&.pe-button--selected":{" .pe-button__content":{"background-color":config["color_"+tint+"_"+type+"_active_background"],"border-color":activeBorder}," .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"]}},"&:active":{" .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"]}}})]},noTouch=function(config,tint,type){var scope=arguments.length<=3||void 0===arguments[3]?"":arguments[3],normalBorder=config["color_"+tint+"_"+type+"_normal_border"],hoverBorder=config["color_"+tint+"_"+type+"_normal_border"]||normalBorder;return[_defineProperty({},scope+".pe-button:hover",{"&:not(.pe-button--selected) .pe-button__wash":{"background-color":config["color_"+tint+"_"+type+"_hover_background"],"border-color":hoverBorder}})]},createStyles=function(config){return[style(config,"light","flat"),style(config,"light","raised",".pe-button--raised"),{"html.pe-no-touch":[noTouch(config,"light","flat"," "),noTouch(config,"light","raised"," .pe-button--raised")]},{".pe-dark-theme":[style(config,"dark","flat"," "),style(config,"dark","raised"," .pe-button--raised")]},{"html.pe-no-touch .pe-dark-theme":[noTouch(config,"dark","flat"," "),noTouch(config,"dark","raised"," .pe-button--raised")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],11:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba,touch_height=_config2["default"].unit_touch_height,height=36;exports["default"]={margin_h:_config2["default"].grid_unit,border_radius:_config2["default"].unit_item_border_radius,font_size:14,font_weight:500,outer_padding_v:(touch_height-height)/2,padding_h:2*_config2["default"].grid_unit,padding_v:11,min_width:8*_config2["default"].grid_unit_component,text_transform:"uppercase",border_width:0,color_light_flat_normal_background:"transparent",color_light_flat_normal_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_flat_hover_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_flat_active_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_active),color_light_flat_disabled_background:"transparent",color_light_flat_disabled_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_light_raised_normal_background:"#E0E0E0",color_light_raised_normal_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_raised_hover_background:"transparent",color_light_raised_active_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_raised_disabled_background:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_disabled),color_light_raised_disabled_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_dark_flat_normal_background:"transparent",color_dark_flat_normal_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_flat_hover_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover),color_dark_flat_active_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_active),color_dark_flat_disabled_background:"transparent",color_dark_flat_disabled_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled),color_dark_raised_normal_background:rgba(_config2["default"].color_primary),color_dark_raised_normal_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_raised_hover_background:_config2["default"].color_primary_active,color_dark_raised_active_background:_config2["default"].color_primary_dark,color_dark_raised_disabled_background:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_disabled),color_dark_raised_disabled_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled)},module.exports=exports["default"];

},{"polythene/config/config":22}],12:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),createStyles=function(config){return[{".pe-button--text":{display:"inline-block","min-width":config.min_width+"px",margin:"0 "+config.margin_h+"px",padding:config.outer_padding_v+"px 0",background:"transparent",border:"none"," .pe-button__content":{"border-width":0,padding:"0 "+config.padding_h+"px","border-radius":config.border_radius+"px"}," .pe-button__label":{padding:config.padding_v+"px 0","font-size":config.font_size+"px","line-height":config.font_size+"px","font-weight":config.font_weight,"text-transform":config.text_transform,"white-space":"pre"},"&.pe-button--borders":{" .pe-button__wash":_mixin2["default"].fit(-1)," .pe-ripple":_mixin2["default"].fit(-1)," .pe-button__content":{"border-style":"solid","border-width":"1px"}," .pe-button__label":{padding:config.padding_v-1+"px 0"}}}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],13:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/button/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/button/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/button/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].button,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-button-text",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/button/theme/color":10,"polythene/button/theme/config":11,"polythene/button/theme/layout":12,"polythene/common/styler":18,"polythene/config/custom":23}],14:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var listeners={},throttle=function(func){var s=arguments.length<=1||void 0===arguments[1]?.05:arguments[1],context=arguments.length<=2||void 0===arguments[2]?window:arguments[2],wait=!1;return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];var later=function(){func.apply(context,args)};wait||(later(),wait=!0,setTimeout(function(){wait=!1},s))}},subscribe=function(eventName,listener,delay){listeners[eventName]=listeners[eventName]||[],listeners[eventName].push(delay?throttle(listener,delay):listener)},unsubscribe=function(eventName,listener){if(listeners[eventName]){var index=listeners[eventName].indexOf(listener);index>-1&&listeners[eventName].splice(index,1)}},emit=function(eventName,event){listeners[eventName]&&listeners[eventName].forEach(function(listener){listener(event)})};window.addEventListener("resize",function(e){return emit("resize",e)}),window.addEventListener("scroll",function(e){return emit("scroll",e)}),window.addEventListener("keydown",function(e){return emit("keydown",e)}),exports["default"]={throttle:throttle,subscribe:subscribe,unsubscribe:unsubscribe,emit:emit},module.exports=exports["default"];

},{}],15:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);require("polythene/common/object.assign");var vendorize=function(what,prefixes){var vendorsSel=prefixes.map(function(v){return"_"+v+"$"}).join("");return _defineProperty({},vendorsSel,what)},fit=function(){var offset=arguments.length<=0||void 0===arguments[0]?0:arguments[0],offsetPx=offset+"px";return{position:"absolute",top:offsetPx,right:offsetPx,bottom:offsetPx,left:offsetPx}},fontSmoothing=function(){var smoothing=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];return smoothing?{"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"}:{"-webkit-font-smoothing":"subpixel-antialiased","-moz-osx-font-smoothing":"auto"}},ellipsis=function(lines,lineHeight){return"none"===lines?{"text-overflow":"initial",overflow:"initial","white-space":"initial",display:"block",height:"auto"}:Object.assign({overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis","text-rendering":"auto"},void 0!==lines?{"-webkit-line-clamp":lines,"-webkit-box-orient":"vertical",display:"-webkit-box",height:lines*lineHeight+"px"}:null)},clearfix=function(){return{"&:after":{content:'""',display:"table",clear:"both"}}},hairline=function(){return{}},sticky=function(){return[{position:"-webkit-sticky"},{position:"-moz-sticky"},{position:"-o-sticky"},{position:"-ms-sticky"},{position:"sticky"},{top:0,"z-index":1}]},createStyles=function(common,fn){return Array.isArray(common)?common.map(function(o){for(var scope in o)return _defineProperty({},scope,fn(o[scope]))}):fn(common)},defaultTransition=function(){var properties=arguments.length<=0||void 0===arguments[0]?"all":arguments[0],duration=arguments.length<=1||void 0===arguments[1]?_config2["default"].animation_duration:arguments[1],curve=arguments.length<=2||void 0===arguments[2]?_config2["default"].animation_curve_default:arguments[2];return[vendorize({"transition-delay":0},_config2["default"].prefixes_transition),vendorize({"transition-duration":duration},_config2["default"].prefixes_transition),vendorize({"transition-timing-function":curve},_config2["default"].prefixes_transition),vendorize({"transition-property":properties},_config2["default"].prefixes_transition)]},fluidScale=function(property,unit,minValue,maxValue){var minBreakpoint=arguments.length<=4||void 0===arguments[4]?320:arguments[4],maxBreakpoint=arguments.length<=5||void 0===arguments[5]?1920:arguments[5],orientation=arguments.length<=6||void 0===arguments[6]?"horizontal":arguments[6];return fluidScales([property],unit,[[minBreakpoint,minValue],[maxBreakpoint,maxValue]],orientation)},fluidScales=function(property,unit,sizes,orientation){var sorted=sizes.sort(),minBreakpoints=sorted.map(function(data){return data[0]}),maxBreakpoints=sorted.map(function(data){return data[0]});maxBreakpoints.shift(),maxBreakpoints.push(minBreakpoints[minBreakpoints.length-1]);var minValues=sorted.map(function(data){return data[1]}),maxValues=sorted.map(function(data){return data[1]});return maxValues.shift(),maxValues.push(minValues[minValues.length-1]),sorted.map(function(data,index){return fluidRule(property,unit,orientation,minBreakpoints[index],maxBreakpoints[index],minValues[index],maxValues[index],0===index,index===sorted.length-1)})},fluidRule=function(property,unit){var orientation=arguments.length<=2||void 0===arguments[2]?"horizontal":arguments[2],minBreakpoint=arguments[3],maxBreakpoint=arguments[4],minValue=arguments[5],maxValue=arguments[6],isFirst=arguments[7],isLast=arguments[8],orientationUnit="vertical"===orientation?"vh":"vw",orientationRule="vertical"===orientation?"height":"width",rule=isLast?["@media (min-"+orientationRule+": "+minBreakpoint+"px)"]:["@media (min-"+orientationRule+": "+minBreakpoint+"px) and (max-"+orientationRule+": "+maxBreakpoint+"px)"],multiplier="(("+maxValue+" - "+minValue+") / ("+maxBreakpoint+" - "+minBreakpoint+") * 100"+orientationUnit+")",adder="((("+minValue+" * "+maxBreakpoint+") - ("+maxValue+" * "+minBreakpoint+")) / ("+maxBreakpoint+" - "+minBreakpoint+")) * 1"+unit,formula="calc("+multiplier+" + "+adder+")",properties=Array.isArray(property)?property:[property];return[isFirst?properties.map(function(p){return _defineProperty({},p,""+minValue+unit)}):null,_defineProperty({},rule,properties.map(function(p){return _defineProperty({},p,isLast?""+maxValue+unit:formula)}))]};exports["default"]={clearfix:clearfix,createStyles:createStyles,defaultTransition:defaultTransition,ellipsis:ellipsis,fit:fit,fontSmoothing:fontSmoothing,fluidScale:fluidScale,fluidScales:fluidScales,hairline:hairline,sticky:sticky,vendorize:vendorize},module.exports=exports["default"];

},{"polythene/common/object.assign":17,"polythene/config/config":22}],16:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/common/object.assign");var multiple=function(mOpts){var items=[],itemIndex=function(id){var item=findItem(id);return items.indexOf(item)},removeItem=function(id){var index=itemIndex(id);-1!==index&&items.splice(index,1)},replaceItem=function(id,newItem){var index=itemIndex(id);-1!==index&&(items[index]=newItem)},findItem=function(id){for(var i=0;i<items.length;i++)if(items[i].instanceId===id)return items[i]},next=function(){items.length&&(items[0].show=!0,_mithril2["default"].redraw())},_remove=function(instanceId){mOpts.queue?(items.shift(),setTimeout(next,0)):removeItem(instanceId)},setPauseState=function(pause,instanceId){var item=findItem(instanceId);item&&(item.pause=pause,item.unpause=!pause)},makeItem=function(itemOpts,instanceId){var opts="function"==typeof itemOpts?itemOpts():itemOpts,resolveShow=void 0,didShow=function(){return opts.didShow&&opts.didShow(instanceId),resolveShow(instanceId)},showPromise=new Promise(function(resolve){resolveShow=resolve}),resolveHide=void 0,didHide=function(){return opts.didHide&&opts.didHide(instanceId),mOpts.queue&&_remove(instanceId),resolveHide(instanceId)},hidePromise=new Promise(function(resolve){resolveHide=resolve});return Object.assign({},mOpts,{instanceId:instanceId,opts:opts,show:!mOpts.queue,showPromise:showPromise,hidePromise:hidePromise,didShow:didShow,didHide:didHide})};return{count:function(){return items.length},clear:function(){return items.length=0},show:function(opts){var instanceId=arguments.length<=1||void 0===arguments[1]?mOpts.defaultId:arguments[1],item=void 0;if(mOpts.queue)item=makeItem(opts,instanceId),items.push(item),1===items.length&&next();else{var storedItem=findItem(instanceId);item=makeItem(opts,instanceId),storedItem?replaceItem(instanceId,item):items.push(item)}return item.showPromise},hide:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0],item=void 0;return mOpts.queue?items.length&&(item=items[0]):item=findItem(instanceId),item?(item.hide=!0,item.hidePromise):Promise.resolve(instanceId)},remove:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];_remove(instanceId)},pause:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];setPauseState(!0,instanceId)},unpause:function(){var instanceId=arguments.length<=0||void 0===arguments[0]?mOpts.defaultId:arguments[0];setPauseState(!1,instanceId)},view:function(){var toShowItems=items.filter(function(item){return item.show});return toShowItems.length?(document.body.classList.add(mOpts.bodyShowClass),(0,_mithril2["default"])(mOpts.tag,toShowItems.map(function(itemData){return _mithril2["default"].component(mOpts.instance,Object.assign({},itemData,{transitions:mOpts.transitions,key:itemData.key||itemData.instanceId}))}))):(document.body.classList.remove(mOpts.bodyShowClass),(0,_mithril2["default"])(mOpts.noneTag))}}};exports["default"]=multiple,module.exports=exports["default"];

},{"mithril":5,"polythene/common/object.assign":17}],17:[function(require,module,exports){
"use strict";Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(target){if(void 0===target||null===target)throw new TypeError("Cannot convert first argument to object");for(var to=Object(target),i=1;i<arguments.length;i++){var nextSource=arguments[i];if(void 0!==nextSource&&null!==nextSource){nextSource=Object(nextSource);for(var keysArray=Object.keys(nextSource),nextIndex=0,len=keysArray.length;len>nextIndex;nextIndex++){var nextKey=keysArray[nextIndex],desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);void 0!==desc&&desc.enumerable&&(to[nextKey]=nextSource[nextKey])}}}return to}});

},{}],18:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _j2c=require("j2c"),_j2c2=_interopRequireDefault(_j2c),remove=function(id){if(id){var old=document.getElementById(id);old&&old.parentNode.removeChild(old)}},add=function(id){for(var _len=arguments.length,styles=Array(_len>1?_len-1:0),_key=1;_len>_key;_key++)styles[_key-1]=arguments[_key];remove(id);var styleEl=document.createElement("style");id&&styleEl.setAttribute("id",id),styles.forEach(function(styleList){Object.keys(styleList).length&&styleList.forEach(function(style){var scoped={"@global":style},sheet=_j2c2["default"].sheet(scoped);styleEl.appendChild(document.createTextNode(sheet))})}),document.head.appendChild(styleEl)};exports["default"]={add:add,remove:remove},module.exports=exports["default"];

},{"j2c":4}],19:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){var el=document.createElement("fakeelement"),animations={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(var a in animations)if(void 0!==el.style[a])return animations[a]},module.exports=exports["default"];

},{}],20:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),SHOW_DURATION=.22,HIDE_DURATION=.2,SHOW_DELAY=0,HIDE_DELAY=0,TRANSITION="both",show=function(opts){return transition(opts,"show")},hide=function(opts){return transition(opts,"hide")},getDuration=function(opts,state){var transition=opts.transition||TRANSITION;return"none"===transition?0:"show"===transition&&"hide"===state?0:"hide"===transition&&"show"===state?0:"show"===state?void 0!==opts.showDuration?opts.showDuration:SHOW_DURATION:void 0!==opts.hideDuration?opts.hideDuration:HIDE_DURATION},getDelay=function(opts,state){var transition=opts.transition||TRANSITION;return"none"===transition?0:"show"===transition&&"hide"===state?0:"hide"===transition&&"show"===state?0:"show"===state?void 0!==opts.showDelay?opts.showDelay:SHOW_DELAY:void 0!==opts.hideDelay?opts.hideDelay:HIDE_DELAY},transition=function(opts,state){var deferred=_mithril2["default"].deferred(),el=opts.el;if(!el)return deferred.resolve(),deferred.promise;var transitionDuration=1e3*getDuration(opts,state),delay=1e3*getDelay(opts,state),style=el.style,beforeTransition=opts.beforeShow&&"show"===state?function(){style.transitionDuration="0ms",style.transitionDelay="0ms",opts.beforeShow()}:null,applyTransition=function(){style.transitionDuration=transitionDuration+"ms",style.transitionDelay=delay+"ms",opts.showClass&&el.classList["show"===state?"add":"remove"](opts.showClass),opts.show&&"function"==typeof opts.show&&"show"===state&&opts.show(),opts.hide&&"function"==typeof opts.hide&&"hide"===state&&opts.hide()},applyAfterTransition=function(){opts.afterHide&&"hide"===state&&(style.transitionDuration="0ms",style.transitionDelay="0ms",opts.afterHide())},doTransition=function(){applyTransition(),setTimeout(function(){applyAfterTransition(),deferred.resolve()},transitionDuration+delay)},maybeDelayTransition=function(){0===transitionDuration?doTransition():setTimeout(function(){doTransition()},0)};return beforeTransition?(beforeTransition(),setTimeout(function(){maybeDelayTransition()},0)):maybeDelayTransition(),deferred.promise};exports["default"]={show:show,hide:hide},module.exports=exports["default"];

},{"mithril":5}],21:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),window.WebFontConfig||(window.WebFontConfig={},function(){var wf=document.createElement("script");wf.src=("https:"===document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",wf.type="text/javascript",wf.async="true";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(wf,s)}());var webfontLoader={add:function(vendor,family,key){var vendorCfg=window.WebFontConfig[vendor]||{};vendorCfg.families=vendorCfg.families||[],vendorCfg.families.push(family),key&&(vendorCfg.key=key),window.WebFontConfig[vendor]=vendorCfg}};exports["default"]=webfontLoader,module.exports=exports["default"];

},{}],22:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _default=require("polythene/config/default"),_default2=_interopRequireDefault(_default);exports["default"]=_default2["default"],module.exports=exports["default"];

},{"polythene/config/default":24}],23:[function(require,module,exports){
"use strict";

},{}],24:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var hex=function(_hex){var bigint=parseInt(_hex.substring(1),16),r=bigint>>16&255,g=bigint>>8&255,b=255&bigint;return r+","+g+","+b},rgba=function(colorStr){var opacity=arguments.length<=1||void 0===arguments[1]?1:arguments[1];return"rgba("+colorStr+","+opacity+")"},isInteger=function(nVal){return"number"==typeof nVal&&isFinite(nVal)&&nVal>-9007199254740992&&9007199254740992>nVal&&Math.floor(nVal)===nVal},isDesktop=window.innerWidth>=1024,grid_unit=4,grid_unit_component=8,animation_curve_slow_in_fast_out="cubic-bezier(.4, 0, .2, 1)",animation_curve_slow_in_linear_out="cubic-bezier(0, 0, .2, 1)",animation_curve_linear_in_fast_out="cubic-bezier(.4, 0, 1, 1)";exports["default"]={rgba:rgba,hex:hex,isInteger:isInteger,grid_unit:grid_unit,grid_unit_component:grid_unit_component,grid_unit_menu:56,grid_unit_icon_button:6*grid_unit_component,unit_block_border_radius:2,unit_item_border_radius:2,unit_indent:72,unit_side_padding:isDesktop?24:16,unit_touch_height:48,unit_icon_size_small:2*grid_unit_component,unit_icon_size:3*grid_unit_component,unit_icon_size_medium:4*grid_unit_component,unit_icon_size_large:5*grid_unit_component,unit_screen_size_extra_large:1280,unit_screen_size_large:960,unit_screen_size_medium:480,unit_screen_size_small:320,animation_duration:".18s",animation_curve_slow_in_fast_out:animation_curve_slow_in_fast_out,animation_curve_slow_in_linear_out:animation_curve_slow_in_linear_out,animation_curve_linear_in_fast_out:animation_curve_linear_in_fast_out,animation_curve_default:"ease-out",font_weight_light:300,font_weight_normal:400,font_weight_medium:500,font_weight_bold:700,font_size_title:20,line_height:1.3,color_primary:"33, 150, 243",color_primary_active:"30, 136, 229",color_primary_dark:"25, 118, 210",color_primary_faded:"100, 181, 249",color_primary_foreground:"255, 255, 255",color_light_background:"255, 255, 255",color_light_foreground:"0, 0, 0",color_dark_background:"34, 34, 34",color_dark_foreground:"255, 255, 255",blend_light_text_primary:.87,blend_light_text_regular:.73,blend_light_text_secondary:.54,blend_light_text_tertiary:.4,blend_light_text_disabled:.26,blend_light_border_light:.11,blend_light_background_active:.14,blend_light_background_hover:.06,blend_light_background_hover_medium:.12,blend_light_background_disabled:.09,blend_light_overlay_background:.3,blend_dark_text_primary:1,blend_dark_text_regular:.87,blend_dark_text_secondary:.7,blend_dark_text_tertiary:.4,blend_dark_text_disabled:.26,blend_dark_border_light:.1,blend_dark_background_active:.14,blend_dark_background_hover:.08,blend_dark_background_hoverMedium:.12,blend_dark_background_disabled:.12,blend_dark_overlay_background:.3,prefixes_animation:["o","moz","webkit"],prefixes_appearance:["o","moz","ms","webkit"],prefixes_background_size:["o","moz","webkit"],prefixes_box_shadow:["moz","webkit"],prefixes_keyframes:["o","moz","webkit"],prefixes_transform:["o","moz","ms","webkit"],prefixes_transition:["o","moz","webkit"],prefixes_user_select:["moz","ms","webkit"],breakpoint_small_handset_portrait:0,breakpoint_medium_handset_portrait:360,breakpoint_large_handset_portrait:400,breakpoint_small_tablet_portrait:600,breakpoint_large_tablet_portrait:720,breakpoint_small_handset_landscape:480,breakpoint_medium_handset_landscape:600,breakpoint_large_handset_landscape:720,env_tablet:window.innerWidth>=600,env_desktop:window.innerWidth>=1024,z_menu:99,z_header_container:999,z_notification:9998,z_dialog:9999},module.exports=exports["default"];

},{}],25:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _events=require("polythene/common/events"),_events2=_interopRequireDefault(_events),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_dialog=require("polythene/dialog/dialog"),_dialog2=_interopRequireDefault(_dialog),_transition=require("polythene/common/transition"),_transition2=_interopRequireDefault(_transition),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow);require("polythene/dialog/theme/theme");var CSS_CLASSES={block:"pe-dialog",visible:"pe-dialog--visible",body:"pe-dialog__body",fullscreen:"pe-dialog--fullscreen",content:"pe-dialog__content",header:"pe-dialog__header",footer:"pe-dialog__footer",footerHigh:"pe-dialog__footer--high",title:"pe-dialog__title",actions:"pe-dialog__actions",hasBackdrop:"pe-dialog--backdrop",hasTopOverflow:"pe-dialog--overflow-top",hasBottomOverflow:"pe-dialog--overflow-bottom",menuContent:"pe-menu__content"},SCROLL_WATCH_TIMER=150,updateScrollState=function(ctrl){var scroller=ctrl.scrollEl;scroller&&(ctrl.topOverflow=scroller.scrollTop>0,ctrl.bottomOverflow=scroller.scrollHeight-(scroller.scrollTop+scroller.getBoundingClientRect().height)>0)},updateFooterState=function(ctrl){var footerEl=ctrl.footerEl;if(footerEl){var style=window.getComputedStyle(footerEl),height=footerEl.getBoundingClientRect().height,minHeight=parseInt(style.minHeight,10);height>minHeight?footerEl.classList.add(CSS_CLASSES.footerHigh):footerEl.classList.remove(CSS_CLASSES.footerHigh)}},show=function(ctrl,opts){var id=ctrl.instanceId;return ctrl.isTransitioning=!0,_transition2["default"].show(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!0,ctrl.didShow&&ctrl.didShow(id)})},hide=function(ctrl,opts){var id=ctrl.instanceId;return ctrl.isTransitioning=!0,_transition2["default"].hide(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){_dialog2["default"].remove(id),ctrl.isTransitioning=!1,ctrl.visible=!1,ctrl.didHide&&ctrl.didHide(id),setTimeout(_mithril2["default"].redraw,0)})},createViewContent=function(ctrl,opts){var style={},bodyOpts=opts.body||opts.menu;return({ tag: "div", attrs: { "class": CSS_CLASSES.body, "style": style, "config": function(el,inited){inited||(ctrl.scrollEl=el)}, "onscroll": function(){ctrl.isScrolling=!0,updateScrollState(ctrl),clearTimeout(ctrl.scrollWatchId),ctrl.scrollWatchId=setTimeout(function(){ctrl.isScrolling=!1},SCROLL_WATCH_TIMER)} }, children: [ bodyOpts ] })},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],bodyOpts=opts.body||opts.menu,updateContentOnScroll=opts.updateContentOnScroll||!1,ignoreContent=!updateContentOnScroll&&ctrl.isScrolling,tag=opts.tag||"form",update=function(){updateScrollState(ctrl),updateFooterState(ctrl),_mithril2["default"].redraw()},props=Object.assign({},{"class":[CSS_CLASSES.block,opts.fullscreen?CSS_CLASSES.fullscreen:null,opts.backdrop?CSS_CLASSES.hasBackdrop:null,ctrl.topOverflow||opts.borders?CSS_CLASSES.hasTopOverflow:null,ctrl.bottomOverflow||opts.borders?CSS_CLASSES.hasBottomOverflow:null,ctrl.visible?CSS_CLASSES.visible:null,opts["class"]].join(" "),id:opts.id||"",config:function(el,inited,context,vdom){if(!inited){opts.config&&opts.config(el,inited,context,vdom),ctrl.el=el;var cleanup=function(){_events2["default"].unsubscribe("resize",update),_events2["default"].unsubscribe("keydown",handleEscape)},handleEscape=function(e){opts.fullscreen||opts.backdrop||27===e.which&&(cleanup(),hide(ctrl,Object.assign({},opts,{hideDelay:0})))};_events2["default"].subscribe("resize",update),_events2["default"].subscribe("keydown",handleEscape),context.onunload=function(){cleanup()},updateScrollState(ctrl),updateFooterState(ctrl),show(ctrl,opts).then(function(){updateScrollState(ctrl),updateFooterState(ctrl),(ctrl.topOverflow||ctrl.bottomOverflow)&&setTimeout(_mithril2["default"].redraw,0)})}},onclick:function(e){e.target===ctrl.el&&(opts.modal||ctrl.isTransitioning||hide(ctrl,Object.assign({},opts,{hideDelay:0})))}},opts.formOptions?opts.formOptions:null),body=bodyOpts?ignoreContent?{subtree:"retain"}:createViewContent(ctrl,opts):null,content=({ tag: "div", attrs: { "class": [CSS_CLASSES.content,opts.menu?CSS_CLASSES.menuContent:null].join(" ") }, children: [ opts.fullscreen?null:_mithril2["default"].component(_shadow2["default"],{z:ctrl.z,animated:!0}),opts.fullscreen?null:opts.title?({ tag: "div", attrs: { "class": CSS_CLASSES.header, "config": function(el){ctrl.headerHeight=el.scrollHeight} }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.title }, children: [ opts.title ] }) ] }):null,body,opts.fullscreen?null:opts.footer?({ tag: "div", attrs: { "class": CSS_CLASSES.footer, "config": function(el,inited){ctrl.footerHeight=el.scrollHeight,inited||(ctrl.footerEl=el)} }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.actions }, children: [ opts.footer ] }) ] }):null ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var instanceData=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],opts=instanceData.opts||{},z=void 0!==opts.z?opts.z:3;return Object.assign({},instanceData,{instanceId:instanceData.instanceId,z:z,scrollEl:null,footerEl:null,topOverflow:!1,bottomOverflow:!1,scrollWatchId:0,isScrolling:!1,headerHeight:0,footerHeight:0,el:null,visible:!1,isTransitioning:!1})},view:function(ctrl,instanceData){var opts="function"==typeof instanceData.opts?instanceData.opts():instanceData.opts;return instanceData.hide&&!ctrl.isTransitioning&&hide(ctrl,opts),createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/events":14,"polythene/common/object.assign":17,"polythene/common/transition":20,"polythene/dialog/dialog":26,"polythene/dialog/theme/theme":30,"polythene/shadow/shadow":57}],26:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _multiple=require("polythene/common/multiple"),_multiple2=_interopRequireDefault(_multiple),_dialogInstance=require("polythene/dialog/dialog-instance"),_dialogInstance2=_interopRequireDefault(_dialogInstance);exports["default"]=(0,_multiple2["default"])({instance:_dialogInstance2["default"],defaultId:"default_dialog",tag:".pe-dialog__holder",noneTag:"span.pe-dialog__placeholder",bodyShowClass:"pe-dialog--open"}),module.exports=exports["default"];

},{"polythene/common/multiple":16,"polythene/dialog/dialog-instance":25}],27:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-dialog",{"&.pe-dialog--backdrop":{"background-color":config["color_"+tint+"_backdrop_background"]}," .pe-dialog__content":{"background-color":config["color_"+tint+"_content_background"]}," .pe-dialog__header .pe-dialog__title":{color:config["color_"+tint+"_title_text"]}," .pe-dialog__body":{color:config["color_"+tint+"_body_text"]},"&.pe-dialog--overflow-top .pe-dialog__body":{"border-top-color":config["color_"+tint+"_body_border"]},"&.pe-dialog--overflow-bottom .pe-dialog__body":{"border-bottom-color":config["color_"+tint+"_body_border"]}})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],28:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba;exports["default"]={border_radius:_config2["default"].unit_block_border_radius,padding:3*_config2["default"].grid_unit_component,header_bottom:20,header_height:60,footer_height:52,color_light_content_background:rgba(_config2["default"].color_light_background),color_light_title_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_body_text:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_regular),color_light_body_border:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_border_light),color_light_backdrop_background:"rgba(0, 0, 0, .4)",color_dark_content_background:rgba(_config2["default"].color_dark_background),color_dark_title_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_body_text:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_regular),color_dark_body_border:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_border_light),color_dark_backdrop_background:"rgba(0, 0, 0, .5)"},module.exports=exports["default"];

},{"polythene/config/config":22}],29:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),createStyles=function(config){var padding=config.padding;return[{".pe-dialog":[_flex2["default"].layoutCenterCenter,_mixin2["default"].vendorize({"transition-timing-function":"ease-out"},_config2["default"].prefixes_transition),_mixin2["default"].vendorize({"transition-property":"opacity"},_config2["default"].prefixes_transition),{position:"fixed",top:0,left:0,right:0,bottom:0,"z-index":_config2["default"].z_dialog,height:"100%",padding:padding+"px 40px",opacity:0,"&.pe-dialog--visible":{opacity:1},"&.pe-dialog--fullscreen":{padding:0," .pe-dialog__content":{"border-radius":0,"max-width":"none",height:"100%",width:"100%"," .pe-dialog__header, .pe-dialog__footer":{display:"none"}," .pe-dialog__body":{padding:0,height:"100vh",border:"none","max-height":"calc(100vh)"}}}," .pe-dialog__header, pe-dialog__body, pe-dialog__header":{"z-index":1}," .pe-dialog__content":[_flex2["default"].layoutVertical,{position:"relative","max-height":"100%","min-width":"280px","max-width":7*_config2["default"].grid_unit_menu+"px","border-radius":config.border_radius+"px"," > .pe-shadow":{"z-index":-1},"&.pe-menu__content":{" .pe-dialog__body":{padding:0,border:"none"}}}]," .pe-dialog__title":{"font-size":_config2["default"].font_size_title+"px","line-height":"24px","font-weight":_config2["default"].font_weight_medium,display:"block","& + div":{"margin-top":"16px"}}," .pe-dialog__header":{padding:[padding-4,padding,config.header_bottom-4,padding].map(function(v){return v+"px"}).join(" "),"min-height":config.header_height+"px"," .pe-dialog__title":[_mixin2["default"].ellipsis(),{display:"block",width:"100%"}]}," .pe-dialog__body":[_flex2["default"].selfStretch,_mixin2["default"].hairline("border-top"),{"border-top-style":"solid"},_mixin2["default"].hairline("border-top"),{"border-bottom-style":"solid"},{padding:[padding,padding,padding-5,padding].map(function(v){return v+"px"}).join(" "),"overflow-y":"auto","-webkit-overflow-scrolling":"touch","border-width":"1px","border-style":"solid none","border-color":"transparent","max-height":"calc(100vh - "+2*padding+"px - "+(config.header_height+config.footer_height)+"px)"}]," .pe-dialog__header + .pe-dialog__body":{"padding-top":0}," .pe-dialog__footer":{padding:"2px 8px","min-height":config.footer_height+"px","font-size":0,"&.pe-dialog__footer--high":{"padding-bottom":"8px"}}," .pe-dialog__actions":[_flex2["default"].layoutHorizontal,_flex2["default"].layoutEndJustified,_flex2["default"].layoutWrap,{margin:"0 -4px"," .pe-button":{height:"36px","margin-top":"6px","margin-bottom":"6px",padding:0}}]}]," body.pe-dialog--open":{overflow:"hidden",left:0,"-webkit-overflow-scrolling":"touch",position:"fixed",top:0,width:"100%"}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22,"polythene/layout/theme/flex":36}],30:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/dialog/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/dialog/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/dialog/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].dialog,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-dialog",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/dialog/theme/color":27,"polythene/dialog/theme/config":28,"polythene/dialog/theme/layout":29}],31:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _webfontloader=require("polythene/common/webfontloader"),_webfontloader2=_interopRequireDefault(_webfontloader);_webfontloader2["default"].add("google","Roboto:400,500,700,400italic:latin");

},{"polythene/common/webfontloader":21}],32:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_svg=require("polythene/svg/svg"),_svg2=_interopRequireDefault(_svg);require("polythene/icon/theme/theme");var CSS_CLASSES={icon:"pe-icon",avatar:"pe-icon--avatar",small:"pe-icon--small",regular:"pe-icon--regular",medium:"pe-icon--medium",large:"pe-icon--large"},typeClasses={small:CSS_CLASSES.small,regular:CSS_CLASSES.regular,medium:CSS_CLASSES.medium,large:CSS_CLASSES.large},classForType=function(){var mode=arguments.length<=0||void 0===arguments[0]?"regular":arguments[0];return typeClasses[mode]},layoutContent=function(opts){if(opts.content)return opts.content;if(opts.svg){var svgOpts=Object.assign({},opts.svg);return svgOpts.tag=svgOpts.tag||"i",_mithril2["default"].component(_svg2["default"],svgOpts)}return opts.msvg?(0,_mithril2["default"])("i.pe-svg",_mithril2["default"].trust(opts.msvg)):({ tag: "i", attrs: {  }, children: [ ({ tag: "img", attrs: { "src": opts.src }, children: [] }) ] })},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props=Object.assign({},{"class":[CSS_CLASSES.icon,classForType(opts.type),opts["class"]].join(" "),id:opts.id||"",config:opts.config},opts.events?opts.events:null),content=layoutContent(opts);return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/object.assign":17,"polythene/icon/theme/theme":35,"polythene/svg/svg":61}],33:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);exports["default"]={size_small:_config2["default"].unit_icon_size_small,size_regular:_config2["default"].unit_icon_size,size_medium:_config2["default"].unit_icon_size_medium,size_large:_config2["default"].unit_icon_size_large},module.exports=exports["default"];

},{"polythene/common/object.assign":17,"polythene/config/config":22}],34:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),iconSizesPx=function(){var size=arguments.length<=0||void 0===arguments[0]?_config2["default"].unit_icon_size:arguments[0];return{width:size+"px",height:size+"px"}},createStyles=function(config){return[{".pe-icon":{display:"inline-block","vertical-align":"middle","background-repeat":"no-repeat",fill:"currentcolor",position:"relative","&.pe-icon--avatar img":{border:"none","border-radius":"50%",width:"100%",height:"100%"}," i":[_mixin2["default"].fit(),{display:"block","font-size":"inherit",color:"inherit","line-height":"inherit",height:"100%"," img":{height:"100%"}," svg":{width:"100%",height:"100%",fill:"currentcolor",color:"inherit"," path:not([fill=none])":{fill:"currentcolor"}}}],"&.pe-icon--small":iconSizesPx(config.size_small),"&.pe-icon--regular":iconSizesPx(config.size_regular),"&.pe-icon--medium":iconSizesPx(config.size_medium),"&.pe-icon--large":iconSizesPx(config.size_large)}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22}],35:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/icon/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/icon/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].icon,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-icon",(0,_layout2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/icon/theme/config":33,"polythene/icon/theme/layout":34}],36:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var layout=[{display:"-webkit-box"},{display:"-moz-box"},{display:"-ms-flexbox","-ms-flex-preferred-size":"initial"},{display:"-webkit-flex"},{display:"flex"}],layoutInline=[layout,{display:"-ms-inline-flexbox"},{display:"-webkit-inline-flex"},{display:"inline-flex"}],layoutHorizontal=[layout,{"-ms-flex-direction":"row","-webkit-flex-direction":"row","flex-direction":"row"}],layoutHorizontalReverse=[layout,{"-ms-flex-direction":"row-reverse","-webkit-flex-direction":"row-reverse","flex-direction":"row-reverse"}],layoutVertical=[layout,{"-ms-flex-direction":"column","-webkit-flex-direction":"column","flex-direction":"column"}],layoutVerticalReverse=[layout,{"-ms-flex-direction":"column-reverse","-webkit-flex-direction":"column-reverse","flex-direction":"column-reverse"}],layoutWrap=[layout,{"-ms-flex-wrap":"wrap","-webkit-flex-wrap":"wrap","flex-wrap":"wrap"}],layoutWrapReverse=[layout,{"-ms-flex-wrap":"wrap-reverse","-webkit-flex-wrap":"wrap-reverse","flex-wrap":"wrap-reverse"}],layoutStart=[layout,{"-ms-flex-align":"start","-webkit-align-items":"flex-start","align-items":"flex-start"}],layoutCenter=[layout,{"-ms-flex-align":"center","-webkit-align-items":"center","align-items":"center"}],layoutEnd=[layout,{"-ms-flex-align":"end","-webkit-align-items":"flex-end","align-items":"flex-end"}],layoutJustified=[layout,{"-ms-flex-line-pack":"stretch","-ms-flex-pack":"justify","-webkit-justify-content":"space-between","justify-content":"space-between"}],layoutStartJustified=[layout,{"-ms-flex-align":"start","-ms-flex-pack":"start","-webkit-justify-content":"flex-start","justify-content":"flex-start"}],layoutCenterJustified=[layout,{"-ms-flex-pack":"center","-webkit-justify-content":"center","justify-content":"center"}],layoutEndJustified=[layout,{"-ms-flex-pack":"end","-webkit-justify-content":"flex-end","justify-content":"flex-end"}],layoutCenterCenter=[layoutCenterJustified,layoutCenter],layoutAroundJustified=[layout,{"-ms-flex-pack":"distribute","-webkit-justify-content":"space-around","justify-content":"space-around"}],flex=function(){var num=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return[{"-webkit-box-flex":num},{"-moz-box-flex":num},{"-webkit-flex":num},{"-ms-flex":num},{flex:num},1===num?{"-webkit-flex-basis":"0.000000001px"}:{},1===num?{"flex-basis":"0.000000001px"}:{}]},flexAuto={"-ms-flex":"1 1 auto","-webkit-flex-basis":"auto","flex-basis":"auto"},flexAutoVertical={"-ms-flex":"1 1 auto","-webkit-flex-basis":"auto","flex-basis":"auto"},flexIndex=function(index){return{"-ms-flex":index,"-webkit-flex":index,flex:index}},selfStart={"-ms-flex-item-align":"start","-ms-align-self":"flex-start","-webkit-align-self":"flex-start","align-self":"flex-start"},selfCenter={"-ms-flex-item-align":"center","-ms-align-self":"center","-webkit-align-self":"center","align-self":"center"},selfEnd={"-ms-flex-item-align":"end","-ms-align-self":"flex-end","-webkit-align-self":"flex-end","align-self":"flex-end"},selfStretch={"-ms-flex-item-align":"stretch","-ms-align-self":"stretch","-webkit-align-self":"stretch","align-self":"stretch"};exports["default"]={flex:flex,flexAuto:flexAuto,flexAutoVertical:flexAutoVertical,flexIndex:flexIndex,layout:layout,layoutAroundJustified:layoutAroundJustified,layoutCenter:layoutCenter,layoutCenterCenter:layoutCenterCenter,layoutCenterJustified:layoutCenterJustified,layoutEnd:layoutEnd,layoutEndJustified:layoutEndJustified,layoutHorizontal:layoutHorizontal,layoutHorizontalReverse:layoutHorizontalReverse,layoutInline:layoutInline,layoutJustified:layoutJustified,layoutStart:layoutStart,layoutStartJustified:layoutStartJustified,layoutVertical:layoutVertical,layoutVerticalReverse:layoutVerticalReverse,layoutWrap:layoutWrap,layoutWrapReverse:layoutWrapReverse,selfCenter:selfCenter,selfEnd:selfEnd,selfStart:selfStart,selfStretch:selfStretch},module.exports=exports["default"];

},{}],37:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_icon=require("polythene/icon/icon"),_icon2=_interopRequireDefault(_icon),_ripple=require("polythene/ripple/ripple"),_ripple2=_interopRequireDefault(_ripple);require("polythene/list-tile/theme/theme");var CSS_CLASSES={block:"pe-list-tile",primary:"pe-list-tile__primary",secondary:"pe-list-tile__secondary",content:"pe-list-tile__content",contentFront:"pe-list-tile__content--front",title:"pe-list-tile__title",subtitle:"pe-list-tile__subtitle",highSubtitle:"pe-list-tile__subtitle--high",selected:"pe-list-tile--selected",disabled:"pe-list-tile--disabled",sticky:"pe-list-tile--sticky",hasSubtitle:"pe-list-tile--subtitle",hasHighSubtitle:"pe-list-tile--high-subtitle",hasFront:"pe-list-tile--front",isCompact:"pe-list-tile--compact"},parsePrimaryContent=function(opts){var tag=opts.tag?opts.tag:opts.url?"a":"div",frontComp=opts.front?({ tag: "div", attrs: { "class": CSS_CLASSES.content+" "+CSS_CLASSES.contentFront }, children: [ opts.front ] }):opts.indent?({ tag: "div", attrs: { "class": CSS_CLASSES.content+" "+CSS_CLASSES.contentFront }, children: [] }):null;return(0,_mithril2["default"])(tag,Object.assign({"class":CSS_CLASSES.primary},opts.url,opts.events),[frontComp,({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ opts.content?opts.content:null,opts.title?({ tag: "div", attrs: { "class": CSS_CLASSES.title }, children: [ opts.title ] }):null,opts.subtitle?({ tag: "div", attrs: { "class": CSS_CLASSES.subtitle }, children: [ opts.subtitle ] }):null,opts.highSubtitle?({ tag: "div", attrs: { "class": CSS_CLASSES.subtitle+" "+CSS_CLASSES.highSubtitle }, children: [ opts.highSubtitle ] }):null ] })])},parseSecondaryContent=function(opts){var secondaryOpts=opts.secondary||{},tag=void 0;return tag=secondaryOpts.tag?secondaryOpts.tag:secondaryOpts.url?"a":"div",(0,_mithril2["default"])(tag,Object.assign({"class":CSS_CLASSES.secondary},secondaryOpts.url,secondaryOpts.events),({ tag: "div", attrs: { "class": CSS_CLASSES.content }, children: [ secondaryOpts.icon?_mithril2["default"].component(_icon2["default"],secondaryOpts.icon):null,secondaryOpts.content?secondaryOpts.content:null ] }))},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",heightClass=opts.subtitle?CSS_CLASSES.hasSubtitle:opts.highSubtitle?CSS_CLASSES.hasHighSubtitle:opts.front||opts.indent?CSS_CLASSES.hasFront:null,props={"class":[CSS_CLASSES.block,opts.selected?CSS_CLASSES.selected:null,opts.disabled?CSS_CLASSES.disabled:null,opts.sticky?CSS_CLASSES.sticky:null,opts.compact?CSS_CLASSES.isCompact:null,heightClass,opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=[opts.ink&&!opts.disabled?_mithril2["default"].component(_ripple2["default"],opts.ripple):null,parsePrimaryContent(opts),opts.secondary?parseSecondaryContent(opts):null];return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/object.assign":17,"polythene/icon/icon":32,"polythene/list-tile/theme/theme":41,"polythene/ripple/ripple":53}],38:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-list-tile",{" .pe-list-tile__title":{color:config["color_"+tint+"_title"]},"&.pe-list__header":{"background-color":"inherit"," .pe-list-tile__title":{color:config["color_"+tint+"_list_header"]}}," .pe-list-tile__content, .pe-list-tile__subtitle":{color:config["color_"+tint+"_subtitle"]},"&.pe-list-tile--disabled":{"&, .pe-list-tile__title, .pe-list-tile__content, .pe-list-tile__subtitle":{color:config["color_"+tint+"_text_disabled"]}},"&.pe-list-tile--selected":{"background-color":config["color_"+tint+"_background_selected"]}})]},noTouch=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-list-tile",{"&:not(.pe-list__header):not(.pe-list-tile--disabled):hover":{"background-color":config["color_"+tint+"_background_hover"]}})]},createStyles=function(config){return[style(config,"light"),{"html.pe-no-touch .pe-list--hoverable":[noTouch(config,"light"," ")]},{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]},{"html.pe-no-touch .pe-dark-theme .pe-list--hoverable":noTouch(config,"dark"," "),"html.pe-no-touch .pe-list--hoverable .pe-dark-theme":noTouch(config,"dark")}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],39:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba,single_height=48,padding=8,single_with_icon_height=56;exports["default"]={single_height:single_height,single_line_height:single_height-2*padding-11,single_with_icon_height:single_with_icon_height,single_with_icon_line_height:single_with_icon_height-2*padding-11,padding:13,compact_padding:9,subtitle_line_count:1,has_subtitle_padding:15,high_subtitle_line_count:2,has_high_subtitle_padding:13,front_item_width:72,side_padding:2*_config2["default"].grid_unit_component,font_size_title:16,font_size_subtitle:14,line_height_subtitle:20,font_size_list_header:14,font_size_small:12,color_light_title:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_light_subtitle:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_secondary),color_light_info:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_tertiary),color_light_text_disabled:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_disabled),color_light_list_header:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_tertiary),color_light_background_hover:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_light_background_selected:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_background_hover),color_dark_title:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary),color_dark_subtitle:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_secondary),color_dark_info:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_tertiary),color_dark_text_disabled:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_disabled),color_dark_list_header:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_tertiary),color_dark_background_hover:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover),color_dark_background_selected:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_background_hover)},module.exports=exports["default"];

},{"polythene/config/config":22}],40:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),paddingH=function(h){return{"padding-left":h+"px","padding-right":h+"px"}},paddingV=function(top,bottom){return{"padding-top":top+"px","padding-bottom":(bottom||top)+"px"}},createStyles=function(config){return[{".pe-list-tile":[_flex2["default"].layout,{position:"relative",overflow:"hidden","&.pe-list-tile--sticky":_mixin2["default"].sticky()," .pe-list-tile__primary, .pe-list-tile__secondary":[_flex2["default"].layoutHorizontal,{" a&":{"text-decoration":"none",color:"inherit",border:"none"}}]," .pe-list-tile__primary":[_flex2["default"].flex(),{position:"relative"," .pe-list-tile__content:not(.pe-list-tile__content--front)":[_flex2["default"].flex(),paddingV(config.padding,config.padding+1)]}]," .pe-list-tile__secondary":{"text-align":"right","font-size":config.font_size_title+"px"}," .pe-list-tile__content":[_flex2["default"].layoutVertical,_flex2["default"].selfCenter,paddingH(config.side_padding),{"&.pe-list-tile__content--front":[paddingV(config.padding-5),{width:config.front_item_width+"px"}]," small":{"font-size":config.font_size_small+"px"}}]," .pe-list-tile__content--front + .pe-list-tile__content":{"padding-left":0}," .pe-list-tile__title":[_mixin2["default"].ellipsis(1,config.single_line_height),{"font-size":config.font_size_title+"px","font-weight":_config2["default"].font_weight_normal,"line-height":config.single_line_height+"px"}]," .pe-list-tile__subtitle":[_mixin2["default"].ellipsis(config.subtitle_line_count,config.line_height_subtitle),{"font-size":config.font_size_subtitle+"px","line-height":config.line_height_subtitle+"px","&.pe-list-tile__subtitle--high":[_mixin2["default"].ellipsis(config.high_subtitle_line_count,config.line_height_subtitle),{"white-space":"normal"}]}],"&.pe-list-tile--selected, &.pe-list-tile--disabled":{cursor:"default"},"&.pe-list-tile--subtitle":{" .pe-list-tile__content":[paddingV(config.has_subtitle_padding,config.has_subtitle_padding+1),{" .pe-list-tile__title":{padding:0}}]},"&.pe-list-tile--high-subtitle":{" .pe-list-tile--high-subtitle .pe-list-tile__secondary":[_flex2["default"].layoutHorizontal,_flex2["default"].layoutStart]," .pe-list-tile__content":[_flex2["default"].selfStart,paddingV(config.has_high_subtitle_padding,config.has_high_subtitle_padding+1),{" .pe-list-tile__title":{padding:0}}]},"&.pe-list__header":{height:config.single_height+"px"," .pe-list-tile__content":{"padding-top":0,"padding-bottom":0}," .pe-list-tile__title":[_mixin2["default"].ellipsis(1,config.single_height),{"font-size":config.font_size_list_header+"px","font-weight":_config2["default"].font_weight_medium,"line-height":config.single_height+"px",padding:0}]}," .pe-list--compact &, &.pe-list-tile--compact":{"&:not(.pe-list__header)":{" .pe-list-tile__content":paddingV(config.compact_padding,config.compact_padding+1)}},"@supports (-moz-appearance:none) and (display:contents)":{" .pe-list-tile__primary, .pe-list-tile__content":{overflow:"hidden"}},".pe-dialog .pe-menu__content &":{" .pe-list-tile__title":_mixin2["default"].ellipsis("none")},".pe-menu__content &":{"&:not(.pe-list-tile--disabled)":{cursor:"default","&, .pe-list-tile__primary, .pe-list-tile__secondary":{" .pe-list-tile__title, .pe-list-tile__subtitle":[_mixin2["default"].vendorize({"user-select":"none"},_config2["default"].prefixes_user_select)]}}},"html.pe-no-touch .pe-list--hoverable &, html.pe-no-touch .pe-list--selectable &":{"&:not(.pe-list__header):not(.pe-list-tile--disabled):not(.pe-list-tile--selected):hover":{cursor:"pointer"}}}]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22,"polythene/layout/theme/flex":36}],41:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/list-tile/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/list-tile/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/list-tile/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"]["list-tile"],config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-list-tile",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/list-tile/theme/color":38,"polythene/list-tile/theme/config":39,"polythene/list-tile/theme/layout":40}],42:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_listTile=require("polythene/list-tile/list-tile"),_listTile2=_interopRequireDefault(_listTile);require("polythene/list/theme/theme");var CSS_CLASSES={block:"pe-list",header:"pe-list__header",hoverable:"pe-list--hoverable",selectable:"pe-list--selectable",borders:"pe-list--borders",indentedBorders:"pe-list--borders-indented",hasHeader:"pe-list--header",isCompact:"pe-list--compact"},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.borders?CSS_CLASSES.borders:null,opts.indentedBorders?CSS_CLASSES.indentedBorders:null,opts.hoverable?CSS_CLASSES.hoverable:null,opts.selectable?CSS_CLASSES.selectable:null,opts.header?CSS_CLASSES.hasHeader:null,opts.compact?CSS_CLASSES.isCompact:null,opts["class"]].join(" "),id:opts.id||"",config:opts.config},headerOpts=void 0;opts.header&&(headerOpts=Object.assign({},opts.header),headerOpts["class"]=[CSS_CLASSES.header,headerOpts["class"]||null].join(" "));var content=[headerOpts?_mithril2["default"].component(_listTile2["default"],headerOpts):null,opts.tiles?opts.tiles:null];return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/object.assign":17,"polythene/list-tile/list-tile":37,"polythene/list/theme/theme":46}],43:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var _ref,scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[(_ref={},_defineProperty(_ref,scope+".pe-list",{"&.pe-list--borders":{" .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{"border-color":config["color_"+tint+"_border"]}}},"&.pe-list--borders-indented":{" .pe-list-tile:not(.pe-list__header)":{" .pe-list-tile__content:not(.pe-list-tile__content--front)":{"border-color":config["color_"+tint+"_border"]}}}}),_defineProperty(_ref," .pe-list + .pe-list",{"border-color":config["color_"+tint+"_border"]}),_ref)]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],44:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),rgba=_config2["default"].rgba;exports["default"]={padding:_config2["default"].grid_unit_component,padding_compact:_config2["default"].grid_unit_component/2,border_width_stacked:1,border_width_bordered:1,color_light_border:rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_border_light),color_dark_border:rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_border_light)},module.exports=exports["default"];

},{"polythene/config/config":22}],45:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),borderStyle=function(config){return _mixin2["default"].hairline("border-bottom"),{"border-style":"none none solid none","border-width":config.border_width_bordered+"px"}},createStyles=function(config){return[{".pe-list":{padding:config.padding+"px 0","&.pe-list--header":{"padding-top":0},"&.pe-list--compact":{padding:config.padding_compact+"px 0"},"& + &":[_mixin2["default"].hairline("border-top"),{"border-style":"solid none none none","border-width":config.border_width_stacked+"px"}],"&.pe-list--borders":{" .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{"&":borderStyle(config)}}},"&.pe-list--borders-indented":{"border-top":"none"," .pe-list-tile:not(.pe-list__header)":{"&:not(:last-child)":{" .pe-list-tile__content:not(.pe-list-tile__content--front)":borderStyle(config)}}}}}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],46:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/list/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/list/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/list/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].list,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-list",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/list/theme/color":43,"polythene/list/theme/config":44,"polythene/list/theme/layout":45}],47:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _events=require("polythene/common/events"),_events2=_interopRequireDefault(_events),_mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_shadow=require("polythene/shadow/shadow"),_shadow2=_interopRequireDefault(_shadow),_transition=require("polythene/common/transition"),_transition2=_interopRequireDefault(_transition);require("polythene/menu/theme/theme");var CSS_CLASSES={block:"pe-menu",content:"pe-menu__content",placeholder:"pe-menu--placeholder",visible:"pe-menu--visible",permanent:"pe-menu--permanent",target:"pe-menu--target",width_n:"pe-menu--width-",width_auto:"pe-menu--width-auto",listTile:"pe-list-tile",selectedListTile:"pe-list-tile--selected"},OFFSET_V=-8,DEFAULT_OFFSET_H=16,MIN_SIZE=1.5,positionMenu=function(ctrl,opts){if(opts.target){var targetEl=document.querySelector("#"+opts.target);if(targetEl){var offsetH=void 0!==opts.offset?opts.offset:DEFAULT_OFFSET_H,menuEl=ctrl.el;if(menuEl){var contentEl=ctrl.contentEl,origin=opts.origin||"top-left",reposition=opts.reposition!==!1,positionOffset=0;if(reposition){var firstItem=contentEl.querySelectorAll("."+CSS_CLASSES.listTile)[0],selectedItem=contentEl.querySelector("."+CSS_CLASSES.selectedListTile);if(firstItem&&selectedItem){var firstItemRect=firstItem.getBoundingClientRect(),selectedItemRect=selectedItem.getBoundingClientRect();positionOffset=selectedItemRect.top-firstItemRect.top}var alignEl=selectedItem||firstItem,alignRect=alignEl.getBoundingClientRect(),_targetRect=targetEl.getBoundingClientRect(),heightDiff=alignRect.height-_targetRect.height;positionOffset+=heightDiff/2}var targetRect=targetEl.getBoundingClientRect(),parentRect=menuEl.parentNode.getBoundingClientRect(),alignLeft=function(){return menuEl.style.left=targetRect.left-parentRect.left+offsetH+"px"},alignRight=function(){return menuEl.style.right=targetRect.right-parentRect.right+offsetH+"px"},alignTop=function(){return menuEl.style.top=targetRect.top-parentRect.top-positionOffset+OFFSET_V+"px"},alignBottom=function(){return menuEl.style.bottom=targetRect.bottom-parentRect.bottom-positionOffset+"px"},alignFn={"top-left":function(){return alignTop()&&alignLeft()},"top-right":function(){return alignTop()&&alignRight()},"bottom-left":function(){return alignBottom()&&alignLeft()},"bottom-right":function(){return alignBottom()&&alignRight()}};alignFn[origin].call()}}}},show=function(ctrl,opts){return ctrl.isTransitioning=!0,_transition2["default"].show(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!0,opts.didShow&&opts.didShow(opts.id)})},hide=function(ctrl,opts){return ctrl.isTransitioning=!0,_transition2["default"].hide(Object.assign({},opts,{el:ctrl.el,showClass:CSS_CLASSES.visible})).then(function(){ctrl.isTransitioning=!1,ctrl.visible=!1,opts.didHide&&opts.didHide(opts.id),_mithril2["default"].redraw()})},unifySize=function(size){return MIN_SIZE>size?MIN_SIZE:size},widthClass=function(size){var sizeStr=size.toString().replace(".","-");return CSS_CLASSES.width_n+sizeStr},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],listenEl=document.body,activateDismissTap=function(){listenEl.addEventListener("click",handleDismissTap)},deActivateDismissTap=function(){listenEl.removeEventListener("click",handleDismissTap)},handleDismissTap=function(e){e.target!==ctrl.el&&(deActivateDismissTap(),e.defaultPrevented?hide(ctrl,opts):hide(ctrl,Object.assign({},opts,{hideDelay:0})))},tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.permanent?CSS_CLASSES.permanent:null,opts.target?CSS_CLASSES.target:"layout center-center",opts.size?widthClass(unifySize(opts.size)):null,opts["class"]].join(" "),id:opts.id||"",config:function(el,inited,context,vdom){if(!inited){opts.config&&opts.config(el,inited,context,vdom),ctrl.el=el;var update=function(){positionMenu(ctrl,opts),_mithril2["default"].redraw()},handleEscape=function(e){27===e.which&&hide(ctrl,Object.assign({},opts,{hideDelay:0}))};opts.permanent||(_events2["default"].subscribe("resize",update),_events2["default"].subscribe("keydown",handleEscape),setTimeout(function(){activateDismissTap(),show(ctrl,opts)},0)),context.onunload=function(){_events2["default"].unsubscribe("resize",update),_events2["default"].unsubscribe("keydown",handleEscape),opts.permanent||deActivateDismissTap()},positionMenu(ctrl,opts)}}},content=({ tag: "div", attrs: { "class": CSS_CLASSES.content, "config": function(el,inited){inited||(ctrl.contentEl=el)}, "onclick": function(e){e.preventDefault()} }, children: [ _mithril2["default"].component(_shadow2["default"],{z:ctrl.z,animated:!0}),opts.content?opts.content:null ] });return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],z=void 0!==opts.z?opts.z:1;return{z:z,el:null,contentEl:null,isTransitioning:!1,visible:opts.permanent||!1}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return opts.show&&!ctrl.visible&&(ctrl.visible=!0),ctrl.visible?createView(ctrl,opts):({ tag: "span", attrs: { "class": CSS_CLASSES.placeholder }, children: [] })}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/events":14,"polythene/common/transition":20,"polythene/menu/theme/theme":51,"polythene/shadow/shadow":57}],48:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-menu",{" .pe-menu__content":{"background-color":config["color_"+tint+"_background"]}})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config);exports["default"]={sizes:[1,1.5,2,3,4,5,6,7],min_size:1.5,max_size_small_screen:5,size_factor:_config2["default"].grid_unit_menu,border_radius:_config2["default"].unit_block_border_radius,color_light_background:_config2["default"].rgba(_config2["default"].color_light_background),color_dark_background:_config2["default"].rgba(_config2["default"].color_dark_background)},module.exports=exports["default"];

},{"polythene/config/config":22}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),unifySize=function(config,size){return size<config.min_size?config.min_size:size},widthClass=function(config,size){var sizeStr=size.toString().replace(".","-");return"pe-menu--width-"+sizeStr},widthStyle=function(config,size){var s=unifySize(config,size);return _defineProperty({},"&."+widthClass(config,s),{width:config.size_factor*s+"px","max-width":"100%"})},createStyles=function(config){return[{".pe-menu":[_mixin2["default"].vendorize({"transition-timing-function":"ease-out"},_config2["default"].prefixes_transition),_mixin2["default"].vendorize({"transition-property":"opacity"},_config2["default"].prefixes_transition),config.sizes.map(function(size){return widthStyle(config,size)}),_defineProperty({"z-index":_config2["default"].z_menu,opacity:0,position:"absolute",width:"100%","min-width":_config2["default"].grid_unit_menu*config.min_size+"px","&.pe-menu--width-auto":{width:"auto"},"&.pe-menu--visible":{opacity:1},"&.pe-menu--permanent":{position:"relative",opacity:1}," .pe-menu__content":{width:"100%","border-radius":config.border_radius+"px"}},"@media (max-width: "+_config2["default"].unit_screen_size_large+"px)",{"max-width":config.max_size_small_screen*_config2["default"].grid_unit_menu+"px"})]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/menu/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/menu/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/menu/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].menu,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-menu",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/menu/theme/color":48,"polythene/menu/theme/config":49,"polythene/menu/theme/layout":50}],52:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var isTouch="ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0;document.querySelector("html").classList.add(isTouch?"pe-touch":"pe-no-touch"),exports["default"]={isTouch:isTouch},module.exports=exports["default"];

},{}],53:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril),_polythene=require("polythene/polythene/polythene"),_polythene2=_interopRequireDefault(_polythene),_transitionEvent=require("polythene/common/transition-event"),_transitionEvent2=_interopRequireDefault(_transitionEvent);require("polythene/ripple/theme/theme");var transitionEvent=(0,_transitionEvent2["default"])(),DEFAULT_START_OPACITY=.2,OPACITY_DECAY_VELOCITY=.35,CSS_CLASSES={ripple:"pe-ripple",waves:"pe-ripple__waves",mask:"pe-ripple__mask",constrained:"pe-ripple--constrained",animated:"pe-ripple__waves--animated"},makeRipple=function(e,ctrl){var opts=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],el=ctrl.ripple(),wavesEl=ctrl.waves(),w=el.offsetWidth,h=el.offsetHeight,waveRadius=Math.sqrt(w*w+h*h),rect=el.getBoundingClientRect(),x=_polythene2["default"].isTouch&&e.touches?e.touches[0].pageX:e.clientX,y=_polythene2["default"].isTouch&&e.touches?e.touches[0].pageY:e.clientY,mx=opts.center?rect.left+rect.width/2:x,my=opts.center?rect.top+rect.height/2:y,rx=mx-rect.left-waveRadius/2,ry=my-rect.top-waveRadius/2,initialOpacity=void 0!==opts.initialOpacity?opts.initialOpacity:DEFAULT_START_OPACITY,opacityDecayVelocity=void 0!==opts.opacityDecayVelocity?opts.opacityDecayVelocity:OPACITY_DECAY_VELOCITY,duration=1/opacityDecayVelocity*initialOpacity,color=window.getComputedStyle(el).color,onEnd=function onEnd(evt){wavesEl.classList.remove(CSS_CLASSES.animated),wavesEl.removeEventListener(transitionEvent,onEnd,!1),opts.end&&opts.end(evt)};wavesEl.classList.remove(CSS_CLASSES.animated);var style=wavesEl.style;style.width=style.height=waveRadius+"px",style.top=ry+"px",style.left=rx+"px",style["animation-duration"]=style["-webkit-animation-duration"]=style["-moz-animation-duration"]=style["-o-animation-duration"]=duration+"s",style.backgroundColor=color,style.opacity=initialOpacity,wavesEl.addEventListener(transitionEvent,onEnd,!1),opts.start&&opts.start(e),wavesEl.classList.add(CSS_CLASSES.animated)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(opts.disabled)return({ tag: "div", attrs: {  }, children: [] });var initRipple=function(ripple,inited,context){if(!inited){ctrl.ripple(ripple);var parent=ripple.parentElement,onClick=function(e){makeRipple(e,ctrl,opts)},endType=_polythene2["default"].isTouch?"click":"mouseup";parent.addEventListener(endType,onClick,!1),context.onunload=function(){parent.removeEventListener(endType,onClick,!1)}}},initWaves=function(waves,inited){inited||ctrl.waves(waves)},tag=opts.tag||"div",props={"class":[CSS_CLASSES.ripple,opts.constrained!==!1?CSS_CLASSES.constrained:null,opts["class"]].join(" "),id:opts.id||"",config:initRipple},content=({ tag: "div", attrs: { "class": CSS_CLASSES.mask }, children: [ ({ tag: "div", attrs: { "class": CSS_CLASSES.waves, "config": initWaves }, children: [] }) ] });return(0,_mithril2["default"])(tag,props,content)},component={controller:function(){return{ripple:_mithril2["default"].prop(),waves:_mithril2["default"].prop(),delegate:_mithril2["default"].prop()}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/transition-event":19,"polythene/polythene/polythene":52,"polythene/ripple/theme/theme":56}],54:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={start_scale:.1,end_scale:2,start_opacity:.2,end_opacity:0},module.exports=exports["default"];

},{}],55:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),kfRipple=function(config){return{" 100%":{transform:"scale("+config.end_scale+")",opacity:config.end_opacity}}},createStyles=function(config){return[{".pe-ripple":[_mixin2["default"].fit(),{color:"inherit","border-radius":"inherit","&.pe-ripple--constrained":{"border-radius":"inherit"," .pe-ripple__mask":{overflow:"hidden","border-radius":"inherit"}}," .pe-ripple__mask":[_mixin2["default"].fit(),_mixin2["default"].vendorize({transform:"translate3d(0,0,0)"},_config2["default"].prefixes_transform)]," .pe-ripple__waves":[_mixin2["default"].vendorize({transform:"scale("+config.start_scale+")"},_config2["default"].prefixes_transform),_mixin2["default"].vendorize({animation:"ripple "+_config2["default"].animation_curve_default},_config2["default"].prefixes_animation),_mixin2["default"].vendorize({"animation-duration":_config2["default"].animation_duration},_config2["default"].prefixes_animation),{outline:"1px solid transparent",position:"absolute","border-radius":"50%",opacity:config.start_opacity,"pointer-events":"none",display:"none"}]," .pe-ripple__waves--animated":{display:"block"}}],"@keyframes ripple":kfRipple(config)}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22}],56:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/ripple/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/ripple/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].ripple,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-ripple",(0,_layout2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/ripple/theme/config":54,"polythene/ripple/theme/layout":55}],57:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/shadow/theme/theme");var CSS_CLASSES={block:"pe-shadow",topShadow:"pe-shadow__top",bottomShadow:"pe-shadow__bottom",animated:"pe-shadow--animated",depth_n:"pe-shadow--z-"},classForDepth=function(){var z=arguments.length<=0||void 0===arguments[0]?1:arguments[0];return CSS_CLASSES.depth_n+Math.min(5,z)},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],depthClass=classForDepth(opts.z),tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,opts.animated?CSS_CLASSES.animated:"",opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=[opts.content?opts.content:null,({ tag: "div", attrs: { "class": [CSS_CLASSES.bottomShadow,depthClass].join(" ") }, children: [] }),({ tag: "div", attrs: { "class": [CSS_CLASSES.topShadow,depthClass].join(" ") }, children: [] })];return(0,_mithril2["default"])(tag,props,content)},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/shadow/theme/theme":60}],58:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={transition:"box-shadow 0.18s ease-out","shadow-top-z-1":"none","shadow-bottom-z-1":"0 1px 4px 0 rgba(0, 0, 0, 0.37)","shadow-top-z-2":"0 2px 2px 0 rgba(0, 0, 0, 0.2)","shadow-bottom-z-2":"0 6px 10px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-3":"0 11px 7px 0 rgba(0, 0, 0, 0.19)","shadow-bottom-z-3":"0 13px 25px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-4":"0 14px 12px 0 rgba(0, 0, 0, 0.17)","shadow-bottom-z-4":"0 20px 40px 0 rgba(0, 0, 0, 0.3)","shadow-top-z-5":"0 17px 17px 0 rgba(0, 0, 0, 0.15)","shadow-bottom-z-5":"0 27px 55px 0 rgba(0, 0, 0, 0.3)","shadow-down-z-1":"inset 0px 1px 2px -1px rgba(0, 0, 0, 0.15)","shadow-down-z-2":"inset 0px 4px 6px -3px rgba(0, 0, 0, 0.25)"},module.exports=exports["default"];

},{}],59:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),shadowDirective=function(dir){return _mixin2["default"].vendorize({"box-shadow":dir},_config2["default"].prefixes_box_shadow)},createStyles=function(config){return[{".pe-shadow":[_mixin2["default"].fit(),{"border-radius":"inherit","pointer-events":"none"," .pe-shadow__bottom, .pe-shadow__top":[_mixin2["default"].fit(),{"border-radius":"inherit"}],"&.pe-shadow--animated":{" .pe-shadow__bottom, .pe-shadow__top":_mixin2["default"].vendorize({transition:config.transition},_config2["default"].prefixes_transition)}},[1,2,3,4,5].map(function(index){var _ref;return _ref={},_defineProperty(_ref," .pe-shadow__top.pe-shadow--z-"+index,shadowDirective(config["shadow-top-z-"+index])),_defineProperty(_ref," .pe-shadow__bottom.pe-shadow--z-"+index,shadowDirective(config["shadow-bottom-z-"+index])),_ref})]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22}],60:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/shadow/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/shadow/theme/layout"),_layout2=_interopRequireDefault(_layout),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].shadow,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-shadow",(0,_layout2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/shadow/theme/config":58,"polythene/shadow/theme/layout":59}],61:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0}),require("polythene/common/object.assign");var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/svg/theme/theme");var CSS_CLASSES={block:"pe-svg"},globalCache={},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],content=void 0,svg=void 0,tag=opts.tag||"div",props=Object.assign({},{"class":[CSS_CLASSES.block,opts["class"]].join(" "),id:opts.id||"",config:opts.config},opts.events?opts.events:null);if(opts.content)content=opts.content;else{var path=opts.src;ctrl.path()!==path?(svg=globalCache[path],svg?(content=_mithril2["default"].trust(svg),preloadNext(ctrl,opts)):(ctrl.path(path),loadSvg(path,ctrl,opts).then(_mithril2["default"].redraw))):(svg=ctrl.svg(),svg=svg||"",content=_mithril2["default"].trust(svg),preloadNext(ctrl,opts))}return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},loadSvg=function(path,ctrl,opts){var preloading=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];if(System&&System["import"]){var normalizedName=System.normalizeSync(path);return System["import"](normalizedName).then(function(data){preloading?(globalCache[path]=data,ctrl.preloadingIndex++,preloadNext(ctrl,opts)):ctrl.svg(data)})}console&&console.log("polythene/svg: System not found.")},preloadNext=function preloadNext(ctrl,opts){if(ctrl.preloadingItems&&!(ctrl.preloadingIndex>=ctrl.preloadingItems.length)){var next=ctrl.preloadingItems[ctrl.preloadingIndex];globalCache[next]?(ctrl.preloadingIndex++,preloadNext(ctrl,opts)):loadSvg(next,ctrl,opts,!0)}},component={controller:function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return{path:_mithril2["default"].prop(""),svg:_mithril2["default"].prop(""),preloadingItems:opts.preload,preloadingIndex:0}},view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/common/object.assign":17,"polythene/svg/theme/theme":62}],62:[function(require,module,exports){
"use strict";

},{}],63:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler);require("polythene/font-roboto/theme");var _typography=require("polythene/theme/typography"),_typography2=_interopRequireDefault(_typography),roboto=[{"html, body, input, textarea":{"font-family":"Roboto, Helvetica, Arial, sans-serif"}}],general=[{"*":[{"box-sizing":"border-box"},{"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},{"-webkit-tap-highlight-color":"transparent"}]," a, a:active, a:focus, input:active, input[type]:focus":{outline:0},"input:disabled":{opacity:1}}];_styler2["default"].add("pe-theme",roboto,_typography2["default"],general);

},{"polythene/common/styler":18,"polythene/font-roboto/theme":31,"polythene/theme/typography":64}],64:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),fontSize=14,styles=[{" h1, h2, h3, h4, h5, h6, p":{margin:0,padding:0}},{" h1 small, h2 small, h3 small, h4 small, h5 small, h6 small":{"font-weight":_config2["default"].font_weight_normal,"line-height":_config2["default"].line_height,"letter-spacing":"-0.02em","font-size":"0.6em"}},{" h1":{"font-size":"56px","font-weight":_config2["default"].font_weight_normal,"line-height":_config2["default"].line_height,"margin-top":"24px","margin-bottom":"24px"}},{" h2":{"font-size":"45px","font-weight":_config2["default"].font_weight_normal,"line-height":"48px","margin-top":"24px","margin-bottom":"24px"}},{" h3":{"font-size":"34px","font-weight":_config2["default"].font_weight_normal,"line-height":"40px","margin-top":"24px","margin-bottom":"24px"}},{" h4":{"font-size":"24px","font-weight":_config2["default"].font_weight_normal,"line-height":"32px","-moz-osx-font-smoothing":"grayscale","margin-top":"24px","margin-bottom":"16px"}},{" h5":{"font-size":"20px","font-weight":_config2["default"].font_weight_medium,"line-height":"1","letter-spacing":"-0.02em","margin-top":"24px","margin-bottom":"16px"}},{" h6":{"font-size":"16px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":"0.04em","margin-top":"24px","margin-bottom":"16px"}},{" html, body":{"font-size":fontSize+"px","line-height":"20px","font-weight":_config2["default"].font_weight_normal}," p":{"font-size":fontSize+"px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":"0","margin-bottom":"16px"}," blockquote":{position:"relative","font-size":"24px","font-weight":_config2["default"].font_weight_normal,"font-style":"italic","line-height":_config2["default"].line_height,"letter-spacing":"0.08em","margin-top":"24px","margin-bottom":"16px"}," ul, ol":{"font-size":fontSize+"px","font-weight":_config2["default"].font_weight_normal,"line-height":"24px","letter-spacing":0},"b, strong":{"font-weight":_config2["default"].font_weight_medium}}];exports["default"]=styles,module.exports=exports["default"];

},{"polythene/config/config":22}],65:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.defineProperty(exports,"__esModule",{value:!0});var _mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),style=function(config,tint){var scope=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return[_defineProperty({},scope+".pe-toolbar",{color:config["color_"+tint+"_text"]})]},createStyles=function(config){return[style(config,"light"),{".pe-dark-theme":[style(config,"dark"," "),style(config,"dark","&")]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15}],66:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),margin_side=2*_config2["default"].grid_unit_component-12,height_desktop=8*_config2["default"].grid_unit_component,height_mobile_portrait=7*_config2["default"].grid_unit_component,height_mobile_landscape=6*_config2["default"].grid_unit_component;exports["default"]={margin_side:margin_side,indent:_config2["default"].unit_indent,transition_duration:_config2["default"].animation_duration,font_size:_config2["default"].font_size_title,line_height:_config2["default"].line_height,height_desktop:height_desktop,height_mobile_portrait:height_mobile_portrait,height_mobile_landscape:height_mobile_landscape,height_normal:height_desktop,height_medium_tall:2*height_desktop,height_tall:3*height_desktop,height_narrow:height_mobile_portrait,height_narrow_medium_tall:112,height_narrow_tall:168,color_light_text:_config2["default"].rgba(_config2["default"].color_light_foreground,_config2["default"].blend_light_text_primary),color_dark_text:_config2["default"].rgba(_config2["default"].color_dark_foreground,_config2["default"].blend_dark_text_primary)},module.exports=exports["default"];

},{"polythene/config/config":22}],67:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _config=require("polythene/config/config"),_config2=_interopRequireDefault(_config),_mixin=require("polythene/common/mixin"),_mixin2=_interopRequireDefault(_mixin),_flex=require("polythene/layout/theme/flex"),_flex2=_interopRequireDefault(_flex),createStyles=function(config){return[{".pe-toolbar":[_mixin2["default"].vendorize({transform:"translate3d(0,0,0)"},_config2["default"].prefixes_transform),{display:"block",position:"relative",height:config.height_normal+"px","font-size":config.font_size+"px","line-height":config.line_height+"em","background-color":"#CFD8DC","&.pe-header--animated":_mixin2["default"].defaultTransition("height",config.transition_duration,"ease-in"),"&.pe-header--medium-tall":{height:config.height_medium_tall+"px"},"&.pe-header--tall":{height:config.height_tall+"px"},"&.pe-toolbar--narrow":{height:config.height_narrow+"px"," .pe-toolbar__bar":{height:config.height_narrow+"px",padding:0}},"&.pe-toolbar--narrow.pe-header--medium-tall":{height:config.height_narrow_medium_tall+"px"},"&.pe-toolbar--narrow.pe-header--tall":{height:config.height_narrow_tall+"px"},"&.pe-header--tall .pe-toolbar__bar--middle":_mixin2["default"].vendorize({transform:"translateY(100%)"},_config2["default"].prefixes_transform)," .pe-toolbar__bar":[_flex2["default"].layoutCenter,_flex2["default"].layoutHorizontal,{"> *:not(.disabled)":{"pointer-events":"auto"}},{"> :first-child":{"margin-left":config.margin_side+"px"}},{"> :last-child":{"margin-right":config.margin_side+"px"}},{" .pe-button--icon + span, .pe-button--icon + .pe-title":{"margin-left":config.indent-config.margin_side-_config2["default"].grid_unit_icon_button+"px"}},{"> span:first-child, .pe-toolbar__title--indent":[_mixin2["default"].ellipsis(),{"margin-left":config.indent+"px"}]},{"> span, > .pe-title":[_mixin2["default"].ellipsis(),_mixin2["default"].vendorize({"transform-origin":"left 50%"},_config2["default"].prefixes_transform),{display:"block","line-height":_config2["default"].line_height+"em"}]},{width:"100%",position:"relative",height:config.height_normal+"px","pointer-events":"none"," .pe-fit":[_mixin2["default"].fit(),{width:"auto",margin:0,".bottom":{top:"auto"}}]," .pe-header":_mixin2["default"].ellipsis(),"&.pe-toolbar__bar--middle":{position:"absolute",top:0,right:0,left:0},"&.pe-toolbar__bar--bottom":{position:"absolute",right:0,bottom:0,left:0}}]}]}]};exports["default"]=function(config){return _mixin2["default"].createStyles(config,createStyles)},module.exports=exports["default"];

},{"polythene/common/mixin":15,"polythene/config/config":22,"polythene/layout/theme/flex":36}],68:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _config=require("polythene/toolbar/theme/config"),_config2=_interopRequireDefault(_config),_custom=require("polythene/config/custom"),_custom2=_interopRequireDefault(_custom),_layout=require("polythene/toolbar/theme/layout"),_layout2=_interopRequireDefault(_layout),_color=require("polythene/toolbar/theme/color"),_color2=_interopRequireDefault(_color),_styler=require("polythene/common/styler"),_styler2=_interopRequireDefault(_styler),customConfigFn=_custom2["default"].toolbar,config=customConfigFn?customConfigFn(_config2["default"]):_config2["default"];_styler2["default"].add("pe-toolbar",(0,_layout2["default"])(config),(0,_color2["default"])(config));

},{"polythene/common/styler":18,"polythene/config/custom":23,"polythene/toolbar/theme/color":65,"polythene/toolbar/theme/config":66,"polythene/toolbar/theme/layout":67}],69:[function(require,module,exports){
"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _mithril=require("mithril"),_mithril2=_interopRequireDefault(_mithril);require("polythene/toolbar/theme/theme");var CSS_CLASSES={block:"pe-toolbar",bar:"pe-toolbar__bar",topBar:"pe-toolbar__bar--top",middleBar:"pe-toolbar__bar--middle",bottomBar:"pe-toolbar__bar--bottom",animated:"pe-header--animated",mediumTall:"pe-header--medium-tall",tall:"pe-header--tall"},barWrapper=function(className,content){return({ tag: "div", attrs: { "class": [CSS_CLASSES.bar,className].join(" ") }, children: [ content ] })},bar=function(){var opts=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],bars=[];return opts.content?bars.push(barWrapper(CSS_CLASSES.topBar,opts.content)):(opts.topBar&&bars.push(barWrapper(CSS_CLASSES.topBar,opts.topBar)),opts.middleBar&&bars.push(barWrapper(CSS_CLASSES.middleBar,opts.middleBar)),opts.bottomBar&&bars.push(barWrapper(CSS_CLASSES.bottomBar,opts.bottomBar))),bars},modeClasses={"medium-tall":CSS_CLASSES.mediumTall,tall:CSS_CLASSES.tall},classForMode=function(){var mode=arguments.length<=0||void 0===arguments[0]?"standard":arguments[0];return"standard"===mode?"":modeClasses[mode]},createView=function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],tag=opts.tag||"div",props={"class":[CSS_CLASSES.block,CSS_CLASSES.animated,classForMode(opts.mode),opts["class"]].join(" "),id:opts.id||"",config:opts.config},content=bar(opts);return(0,_mithril2["default"])(tag,props,[opts.before,content,opts.after])},component={view:function(ctrl){var opts=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return createView(ctrl,opts)}};exports["default"]=component,module.exports=exports["default"];

},{"mithril":5,"polythene/toolbar/theme/theme":68}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb21wb25lbnRzL2hlYWRlci5qcyIsImNvbXBvbmVudHMvbG9hZC5qcyIsIm1haW4uanMiLCIuLi9ub2RlX21vZHVsZXMvajJjL2Rpc3QvajJjLmNvbW1vbmpzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pdGhyaWwvbWl0aHJpbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYmFzZS1idXR0b24vYmFzZS1idXR0b24uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2Jhc2UtYnV0dG9uL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYmFzZS1idXR0b24vdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2J1dHRvbi9idXR0b24uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2J1dHRvbi90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvYnV0dG9uL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vZXZlbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vbWl4aW4uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9tdWx0aXBsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi9zdHlsZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uLWV2ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9jb21tb24vdHJhbnNpdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvY29tbW9uL3dlYmZvbnRsb2FkZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbmZpZy9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbmZpZy9jdXN0b20uanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2NvbmZpZy9kZWZhdWx0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9kaWFsb2cvZGlhbG9nLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9kaWFsb2cvZGlhbG9nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9kaWFsb2cvdGhlbWUvY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy90aGVtZS9sYXlvdXQuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2RpYWxvZy90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvZm9udC1yb2JvdG8vdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2ljb24vaWNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvaWNvbi90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2ljb24vdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9pY29uL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9sYXlvdXQvdGhlbWUvZmxleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC10aWxlL2xpc3QtdGlsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC10aWxlL3RoZW1lL2NvbG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QvbGlzdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC90aGVtZS9jb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbGlzdC90aGVtZS9jb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL2xpc3QvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9saXN0L3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9tZW51L21lbnUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvdGhlbWUvY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL21lbnUvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9tZW51L3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvbWVudS90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvcG9seXRoZW5lL3BvbHl0aGVuZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvcmlwcGxlL3JpcHBsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvcmlwcGxlL3RoZW1lL2NvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvcmlwcGxlL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvcmlwcGxlL3RoZW1lL3RoZW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9zaGFkb3cvc2hhZG93LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9zaGFkb3cvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9zaGFkb3cvdGhlbWUvbGF5b3V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS9zaGFkb3cvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3N2Zy9zdmcuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3N2Zy90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdGhlbWUvdGhlbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3RoZW1lL3R5cG9ncmFwaHkuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvcG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvY29uZmlnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3BvbHl0aGVuZS90b29sYmFyL3RoZW1lL2xheW91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90aGVtZS90aGVtZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9wb2x5dGhlbmUvdG9vbGJhci90b29sYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2xFQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBidG4gPXJlcXVpcmUoICdwb2x5dGhlbmUvYnV0dG9uL2J1dHRvbicpO1xudmFyIHRoZW1lPXJlcXVpcmUoJ3BvbHl0aGVuZS90aGVtZS90aGVtZScpO1xudmFyIHRvb2xiYXI9IHJlcXVpcmUoICdwb2x5dGhlbmUvdG9vbGJhci90b29sYmFyJyk7XG52YXIgbWVudSA9cmVxdWlyZSggJ3BvbHl0aGVuZS9tZW51L21lbnUnKTtcbnZhciBsaXN0ID1yZXF1aXJlKCdwb2x5dGhlbmUvbGlzdC9saXN0Jyk7XG52YXIgbGlzdFRpbGU9cmVxdWlyZSggJ3BvbHl0aGVuZS9saXN0LXRpbGUvbGlzdC10aWxlJyk7XG52YXIgc2VydmVyPXJlcXVpcmUoJy4uL21haW4uanMnKTtcbmV4cG9ydHMuaGVhZGVyID0ge1xuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuXHRcblx0Ly8gdmFyIGZpbGU9bS5jb21wb25lbnQoYnRuLCB7XG5cdC8vIFx0ICAgIGxhYmVsOiAnRmlsZScsXG5cdC8vIFx0ICAgIGV2ZW50czoge1xuXHQvLyBcdFx0b25jbGljazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcblx0Ly8gXHRcdCAgICBtLnJvdXRlKCcvcmVwb3J0Jyk7XG5cdC8vIFx0XHR9XG5cdFx0ICAgIFxuXHQvLyBcdCAgICB9XG5cdFx0XG5cdC8vIH0pO1xuXHR2YXIgZWRpdD0gbS5jb21wb25lbnQoYnRuLCB7XG5cdFx0XHQgIGxhYmVsOiAnRWRpdCcsXG5cdFx0XHQgIGV2ZW50czoge1xuXHRcdFx0ICAgICAgb25jbGljazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCAgXG5cdFx0XHRcdCAgbS5yb3V0ZSgnL3JlcG9ydCcpO1xuXHRcdFx0ICAgICAgfVxuXHRcdCAgICBcblx0XHRcdCAgfVxuXHRcdFxuXHR9KTtcblx0XG5cdHZhciBzaW1wbGVDb250YWluZXIyPXt9O1xuXHR2YXIgc2ltcGxlQ29udGFpbmVyMz17fTtcblx0dmFyIGZpbGU9e3ZpZXcgOiBmdW5jdGlvbihjdHJsKXtcblx0ICAgIHJldHVybiBtKCcuY29udGFpbmVyJyxcblx0XHQgICAgIG0oJ2EnLCB7XG5cdFx0XHQgaHJlZjogJ2phdmFzY3JpcHQ6IHZvaWQoMCknLFxuXHRcdFx0IGlkOiAnc2ltcGxlX2J0bicsIC8vIHVzZSBhcyBtZW51J3MgdGFyZ2V0XG5cdFx0XHQgb25jbGljazogKCkgPT4gKGN0cmwub3BlbiA9IHRydWUpIC8vIG9wZW5zIGF0IG5leHQgcmVkcmF3XG5cdFx0ICAgICB9LCAnRmlsZScpLFxuXHRcdCAgICAgbS5jb21wb25lbnQobWVudSwge1xuXHRcdFx0IHRhcmdldDogJ3NpbXBsZV9idG4nLCAvLyB0byBhbGlnbiB3aXRoIHRoZSBsaW5rXG5cdFx0XHQgb2Zmc2V0OiAwLCAvLyBob3Jpem9udGFsbHkgYWxpZ24gd2l0aCBsaW5rXG5cdFx0XHQgc2hvdzogY3RybC5vcGVuLCAvLyBzaG91bGQgdGhlIG1lbnUgYmUgb3BlbiBvciBjbG9zZWQ/XG5cdFx0XHQgc2l6ZTonYXV0bycsXG5cdFx0XHQgZGlkSGlkZTogKCkgPT4gKGN0cmwub3BlbiA9IGZhbHNlKSwgLy8gY2FsbGVkIGFmdGVyIGNsb3Npbmdcblx0XHRcdCBjb250ZW50OiBtLmNvbXBvbmVudChsaXN0LCB7XG5cdFx0XHQgICAgIHRpbGVzOiBbXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnWWVzJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWVcblx0XHRcdFx0IH0pLFxuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ05vJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWVcblx0XHRcdFx0IH0pXG5cdFx0XHQgICAgIF1cblx0XHRcdCB9KVxuXHRcdCAgICAgfSlcblx0XHQgICAgKTtcblx0fX07XG5cdFxuXHRzaW1wbGVDb250YWluZXIyLnZpZXcgPSAoY3RybCkgPT4ge1xuXHQgICAgcmV0dXJuIG0oJy5jb250YWluZXInLFxuXHRcdCAgICAgbSgnYScsIHtcblx0XHRcdCBocmVmOiAnamF2YXNjcmlwdDogdm9pZCgwKScsXG5cdFx0XHQgaWQ6ICdzaW1wbGVfYnRuMicsIC8vIHVzZSBhcyBtZW51J3MgdGFyZ2V0XG5cdFx0XHQgb25jbGljazogKCkgPT4gKGN0cmwub3BlbiA9IHRydWUpIC8vIG9wZW5zIGF0IG5leHQgcmVkcmF3XG5cdFx0ICAgICB9LCAnRWRpdCcpLFxuXHRcdCAgICAgbS5jb21wb25lbnQobWVudSwge1xuXHRcdFx0IHRhcmdldDogJ3NpbXBsZV9idG4yJywgLy8gdG8gYWxpZ24gd2l0aCB0aGUgbGlua1xuXHRcdFx0IG9mZnNldDogMCwgLy8gaG9yaXpvbnRhbGx5IGFsaWduIHdpdGggbGlua1xuXHRcdFx0IHNob3c6IGN0cmwub3BlbiwgLy8gc2hvdWxkIHRoZSBtZW51IGJlIG9wZW4gb3IgY2xvc2VkP1xuXHRcdFx0IHNpemU6J2F1dG8nLFxuXHRcdFx0IGRpZEhpZGU6ICgpID0+IChjdHJsLm9wZW4gPSBmYWxzZSksIC8vIGNhbGxlZCBhZnRlciBjbG9zaW5nXG5cdFx0XHQgY29udGVudDogbS5jb21wb25lbnQobGlzdCwge1xuXHRcdFx0ICAgICB0aWxlczogW1xuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ1llcycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KSxcblx0XHRcdFx0IG0uY29tcG9uZW50KGxpc3RUaWxlLCB7XG5cdFx0XHRcdCAgICAgdGl0bGU6ICdObycsXG5cdFx0XHRcdCAgICAgaW5rOiB0cnVlXG5cdFx0XHRcdCB9KVxuXHRcdFx0ICAgICBdXG5cdFx0XHQgfSlcblx0XHQgICAgIH0pXG5cdFx0ICAgICk7XG5cdH07XG5cdHNpbXBsZUNvbnRhaW5lcjMudmlldyA9IChjdHJsKSA9PiB7XG5cdCAgICByZXR1cm4gbSgnLmNvbnRhaW5lcicsXG5cdFx0ICAgICBtKCdhJywge1xuXHRcdFx0IGhyZWY6ICdqYXZhc2NyaXB0OiB2b2lkKDApJyxcblx0XHRcdCBpZDogJ3NpbXBsZV9idG4zJywgLy8gdXNlIGFzIG1lbnUncyB0YXJnZXRcblx0XHRcdCBvbmNsaWNrOiAoKSA9PiAoY3RybC5vcGVuID0gdHJ1ZSkgLy8gb3BlbnMgYXQgbmV4dCByZWRyYXdcblx0XHQgICAgIH0sICdIZWxwJyksXG5cdFx0ICAgICBtLmNvbXBvbmVudChtZW51LCB7XG5cdFx0XHQgdGFyZ2V0OiAnc2ltcGxlX2J0bjMnLCAvLyB0byBhbGlnbiB3aXRoIHRoZSBsaW5rXG5cdFx0XHQgb2Zmc2V0OiAwLCAvLyBob3Jpem9udGFsbHkgYWxpZ24gd2l0aCBsaW5rXG5cdFx0XHQgc2hvdzogY3RybC5vcGVuLCAvLyBzaG91bGQgdGhlIG1lbnUgYmUgb3BlbiBvciBjbG9zZWQ/XG5cdFx0XHQgc2l6ZTonYXV0bycsXG5cdFx0XHQgXG5cdFx0XHQgZGlkSGlkZTogKCkgPT4gKGN0cmwub3BlbiA9IGZhbHNlKSwgLy8gY2FsbGVkIGFmdGVyIGNsb3Npbmdcblx0XHRcdCBjb250ZW50OiBtLmNvbXBvbmVudChsaXN0LCB7XG5cdFx0XHQgICAgIHRpbGVzOiBbXG5cdFx0XHRcdCBtLmNvbXBvbmVudChsaXN0VGlsZSwge1xuXHRcdFx0XHQgICAgIHRpdGxlOiAnWWVzJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWUsXG5cdFx0XHRcdCAgICAgZXZlbnRzOntvbmNsaWNrOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0IHNlcnZlci5HbG9iYWwuc29ja2V0LmVtaXQoJ2RhdGEnLHtkYXRhOidXb1cnfSk7XG5cdFx0XHRcdCAgICAgfX1cblx0XHRcdFx0IH0pLFxuXHRcdFx0XHQgbS5jb21wb25lbnQobGlzdFRpbGUsIHtcblx0XHRcdFx0ICAgICB0aXRsZTogJ05vJyxcblx0XHRcdFx0ICAgICBpbms6IHRydWVcblx0XHRcdFx0IH0pXG5cdFx0XHQgICAgIF1cblx0XHRcdCB9KVxuXHRcdCAgICAgfSlcblx0XHQgICAgKTtcblx0fTtcblx0XG5cdHRoaXMubXlUb29sYmFyID0gbS5jb21wb25lbnQodG9vbGJhciwge1xuXHQgICAgXG5cdCAgICBjb250ZW50OlttLmNvbXBvbmVudChmaWxlKSxcblx0XHQgICAgIG0uY29tcG9uZW50KHNpbXBsZUNvbnRhaW5lcjIpLFxuXHRcdCAgICAgbS5jb21wb25lbnQoc2ltcGxlQ29udGFpbmVyMyldXG5cdFx0ICAgICBcblx0XHRcdFx0IFxuXHR9KVxuXG4gICAgfSxcbiAgICB2aWV3OiBmdW5jdGlvbihjdHJsKSB7XG5cbiAgICAgICAgcmV0dXJuIG0oJy5oZWFkZXInLFxuXHRcdCBtLmNvbXBvbmVudChjdHJsLm15VG9vbGJhcilcblx0XHQgLy8gbS5jb21wb25lbnQoY3RybC5idWlsZEJ0biksXG5cdFx0IC8vIG0uY29tcG9uZW50KGN0cmwucmVwb3J0QnRuKVxuXHRcdCk7XG4gICAgfVxufTtcbiIsInZhciBidXR0b24gPXJlcXVpcmUoICdwb2x5dGhlbmUvYnV0dG9uL2J1dHRvbicpO1xudmFyIGRpYWxvZyA9cmVxdWlyZSgncG9seXRoZW5lL2RpYWxvZy9kaWFsb2cnKTtcblxuXG5cbnZhciBsb2FkPXt2aWV3IDpmdW5jdGlvbiAoKSAge1xuICAgIHJldHVybiBtKCdkaXYnLCBbXG4gICAgICAgIG0uY29tcG9uZW50KGJ1dHRvbiwge1xuICAgICAgICAgICAgbGFiZWw6ICdMb2FkJyxcbiAgICAgICAgICAgIHJhaXNlZDogdHJ1ZSxcblx0ICAgIFxuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25jbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvdyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0xvYWQgYSBEQicsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiAnc29tZSB0ZXh0J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBtLmNvbXBvbmVudChkaWFsb2cpXG4gICAgXSk7XG59XG5cdCB9O1xuXG5leHBvcnRzLm1haW49e1xuICAgIHZpZXc6ZnVuY3Rpb24oKXtcblx0cmV0dXJuIG0oJycpO1xuICAgIH1cbn07XG5cbiIsInZhciBzb2NrZXQ7XG52YXIgZmlyc3Rjb25uZWN0ID0gdHJ1ZTtcbnZhciBHbG9iYWw9e3NlcnZlcjonJ307XG5mdW5jdGlvbiBjb25uZWN0KCkge1xuICAgIGlmKGZpcnN0Y29ubmVjdCkge1xuICAgICAgICBHbG9iYWwuc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2Rldi50ZXN0dHViZTo4MDAwJyk7XG4gICAgICAgIEdsb2JhbC5zb2NrZXQub24oJ3NlcnZlck1lc3NhZ2UnLCBmdW5jdGlvbihkYXRhKXsgbWVzc2FnZShkYXRhKTsgfSk7XG4gICAgICAgIEdsb2JhbC5zb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpeyBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBTZXJ2ZXJcIik7IH0pO1xuXG4gICAgICAgIGZpcnN0Y29ubmVjdCA9IGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgR2xvYmFsLnNvY2tldC5zb2NrZXQucmVjb25uZWN0KCk7XG4gICAgfVxufVxuXG5jb25uZWN0KCk7XG5cbkdsb2JhbC5zb2NrZXQub24oJ3RpbWUnLGZ1bmN0aW9uKHRpbWUpe1xuICAgIGNvbnNvbGUubG9nKHRpbWUpXG4gICAgc29ja2V0LmVtaXQoJ2RhdGEnLHtkYXRhOidyZWNpZXZlZCd9KVxufSk7XG52YXIgaGVhZGVyPXJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKS5oZWFkZXI7XG5cbnZhciBsb2FkPXJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkLmpzJykubWFpbjtcblxudmFyIG1haW49e1xuICAgIHZpZXc6ZnVuY3Rpb24oKXtcblx0cmV0dXJuIFtcblx0ICAgIG0uY29tcG9uZW50KGhlYWRlciksXG5cdCAgICBtLmNvbXBvbmVudChsb2FkKVxuXHQgICAgICAgXTtcbiAgICB9XG4gICAgXG59O1xuXG5cblxubS5yb3V0ZS5tb2RlID0gJ3BhdGhuYW1lJztcblxubS5yb3V0ZShkb2N1bWVudC5ib2R5LCAnLycsIHtcbiAgICAnLyc6IG1haW5cbn0pO1xuXG5leHBvcnRzLkdsb2JhbD1HbG9iYWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xudmFyIGVtcHR5QXJyYXkgPSBbXTtcbnZhciB0eXBlID0gZW1wdHlPYmplY3QudG9TdHJpbmc7XG52YXIgb3duID0gIGVtcHR5T2JqZWN0Lmhhc093blByb3BlcnR5O1xudmFyIE9CSkVDVCA9IHR5cGUuY2FsbChlbXB0eU9iamVjdCk7XG52YXIgQVJSQVkgPSAgdHlwZS5jYWxsKGVtcHR5QXJyYXkpO1xudmFyIFNUUklORyA9IHR5cGUuY2FsbCgnJyk7XG4vKi8taW5saW5lLS8qL1xuLy8gZnVuY3Rpb24gY2FydGVzaWFuKGEsIGIsIHJlcywgaSwgaikge1xuLy8gICByZXMgPSBbXTtcbi8vICAgZm9yIChqIGluIGIpIGlmIChvd24uY2FsbChiLCBqKSlcbi8vICAgICBmb3IgKGkgaW4gYSkgaWYgKG93bi5jYWxsKGEsIGkpKVxuLy8gICAgICAgcmVzLnB1c2goYVtpXSArIGJbal0pO1xuLy8gICByZXR1cm4gcmVzO1xuLy8gfVxuLyovLWlubGluZS0vKi9cblxuLyogLy1zdGF0ZW1lbnRzLS8qL1xuZnVuY3Rpb24gY2FydGVzaWFuKGEsYiwgc2VsZWN0b3JQLCByZXMsIGksIGopIHtcbiAgcmVzID0gW11cbiAgZm9yIChqIGluIGIpIGlmKG93bi5jYWxsKGIsIGopKVxuICAgIGZvciAoaSBpbiBhKSBpZihvd24uY2FsbChhLCBpKSlcbiAgICAgIHJlcy5wdXNoKGNvbmNhdChhW2ldLCBiW2pdLCBzZWxlY3RvclApKVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGNvbmNhdChhLCBiLCBzZWxlY3RvclApIHtcbiAgLy8gYGIucmVwbGFjZSgvJi9nLCBhKWAgaXMgbmV2ZXIgZmFsc3ksIHNpbmNlIHRoZVxuICAvLyAnYScgb2YgY2FydGVzaWFuIGNhbid0IGJlIHRoZSBlbXB0eSBzdHJpbmdcbiAgLy8gaW4gc2VsZWN0b3IgbW9kZS5cbiAgcmV0dXJuIHNlbGVjdG9yUCAmJiAoXG4gICAgL15bLVxcdyRdKyQvLnRlc3QoYikgJiYgJzotZXJyb3ItYmFkLXN1Yi1zZWxlY3Rvci0nICsgYiB8fFxuICAgIC8mLy50ZXN0KGIpICYmIC8qIG5ldmVyIGZhbHN5ICovIGIucmVwbGFjZSgvJi9nLCBhKVxuICApIHx8IGEgKyBiXG59XG5cbmZ1bmN0aW9uIGRlY2FtZWxpemUobWF0Y2gpIHtcbiAgcmV0dXJuICctJyArIG1hdGNoLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBwcm9wZXJ0eTp2YWx1ZTsgcGFpcnMuXG4gKlxuICogQHBhcmFtIHthcnJheXxvYmplY3R8c3RyaW5nfSBvIC0gdGhlIGRlY2xhcmF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGJ1ZiAtIHRoZSBidWZmZXIgaW4gd2hpY2ggdGhlIGZpbmFsIHN0eWxlIHNoZWV0IGlzIGJ1aWx0LlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIHRoZSBjdXJyZW50IHByb3BlcnR5IG9yIGEgcHJlZml4IGluIGNhc2Ugb2YgbmVzdGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViLXByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVuZG9ycyAtIGEgbGlzdCBvZiB2ZW5kb3IgcHJlZml4ZXMuXG4gKiBAUGFyYW0ge2Jvb2xlYW59IGxvY2FsIC0gYXJlIHdlIGluIEBsb2NhbCBvciBpbiBAZ2xvYmFsIHNjb3BlLlxuICogQHBhcmFtIHtvYmplY3R9IG5zIC0gaGVscGVyIGZ1bmN0aW9ucyB0byBwb3B1bGF0ZSBvciBjcmVhdGUgdGhlIEBsb2NhbCBuYW1lc3BhY2VcbiAqICAgICAgICAgICAgICAgICAgICAgIGFuZCB0byBAZXh0ZW5kIGNsYXNzZXMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5lIC0gQGV4dGVuZCBoZWxwZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5sIC0gQGxvY2FsIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBkZWNsYXJhdGlvbnMobywgYnVmLCBwcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucywgLyp2YXIqLyBrLCB2LCBraykge1xuICBpZiAobz09bnVsbCkgcmV0dXJuXG4gIGlmICgvXFwkLy50ZXN0KHByZWZpeCkpIHtcbiAgICBmb3IgKGtrIGluIChwcmVmaXggPSBwcmVmaXguc3BsaXQoJyQnKSkpIGlmIChvd24uY2FsbChwcmVmaXgsIGtrKSkge1xuICAgICAgZGVjbGFyYXRpb25zKG8sIGJ1ZiwgcHJlZml4W2trXSwgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICBzd2l0Y2ggKCB0eXBlLmNhbGwobyA9IG8udmFsdWVPZigpKSApIHtcbiAgY2FzZSBBUlJBWTpcbiAgICBmb3IgKGsgPSAwOyBrIDwgby5sZW5ndGg7IGsrKylcbiAgICAgIGRlY2xhcmF0aW9ucyhvW2tdLCBidWYsIHByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIGJyZWFrXG4gIGNhc2UgT0JKRUNUOlxuICAgIC8vIHByZWZpeCBpcyBmYWxzeSBpaWYgaXQgaXMgdGhlIGVtcHR5IHN0cmluZywgd2hpY2ggbWVhbnMgd2UncmUgYXQgdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgZGVjbGFyYXRpb25zIGxpc3QuXG4gICAgcHJlZml4ID0gKHByZWZpeCAmJiBwcmVmaXggKyAnLScpXG4gICAgZm9yIChrIGluIG8pIGlmIChvd24uY2FsbChvLCBrKSl7XG4gICAgICB2ID0gb1trXVxuICAgICAgaWYgKC9cXCQvLnRlc3QoaykpIHtcbiAgICAgICAgZm9yIChrayBpbiAoayA9IGsuc3BsaXQoJyQnKSkpIGlmIChvd24uY2FsbChrLCBraykpXG4gICAgICAgICAgZGVjbGFyYXRpb25zKHYsIGJ1ZiwgcHJlZml4ICsga1tra10sIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlY2xhcmF0aW9ucyh2LCBidWYsIHByZWZpeCArIGssIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICAgIH1cbiAgICB9XG4gICAgYnJlYWtcbiAgZGVmYXVsdDpcbiAgICAvLyBwcmVmaXggaXMgZmFsc3kgd2hlbiBpdCBpcyBcIlwiLCB3aGljaCBtZWFucyB0aGF0IHdlJ3JlXG4gICAgLy8gYXQgdGhlIHRvcCBsZXZlbC5cbiAgICAvLyBgb2AgaXMgdGhlbiB0cmVhdGVkIGFzIGEgYHByb3BlcnR5OnZhbHVlYCBwYWlyLlxuICAgIC8vIG90aGVyd2lzZSwgYHByZWZpeGAgaXMgdGhlIHByb3BlcnR5IG5hbWUsIGFuZFxuICAgIC8vIGBvYCBpcyB0aGUgdmFsdWUuXG4gICAgayA9IHByZWZpeC5yZXBsYWNlKC9fL2csICctJykucmVwbGFjZSgvW0EtWl0vZywgZGVjYW1lbGl6ZSlcblxuICAgIGlmIChsb2NhbCAmJiAoayA9PSAnYW5pbWF0aW9uLW5hbWUnIHx8IGsgPT0gJ2FuaW1hdGlvbicpKSB7XG4gICAgICBvID0gby5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5yZXBsYWNlKC8oKSg/OjpnbG9iYWxcXChcXHMqKFstXFx3XSspXFxzKlxcKXwoKShbLVxcd10rKSkvLCBucy5sKVxuICAgICAgfSkuam9pbignLCcpXG4gICAgfVxuICAgIGlmICgvXmFuaW1hdGlvbnxedHJhbnNpdGlvbi8udGVzdChrKSkgdmVuZG9ycyA9IFsnd2Via2l0J11cbiAgICAvLyAnQCcgaW4gcHJvcGVydGllcyBhbHNvIHRyaWdnZXJzIHRoZSAqaWVsdGU3IGhhY2tcbiAgICAvLyBTaW5jZSBwbHVnaW5zIGRpc3BhdGNoIG9uIHRoZSAvXkAvIGZvciBhdC1ydWxlc1xuICAgIC8vIHdlIHN3YXAgdGhlIGF0IGZvciBhbiBhc3Rlcmlza1xuICAgIC8vIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLTZkNDllOTI2MzRmMjZhZTZkNmU0NmIzZWJjMTAwMTlhXG5cbiAgICBrID0gay5yZXBsYWNlKC9eQC8sICcqJylcblxuLyovLXN0YXRlbWVudHMtLyovXG4gICAgLy8gdmVuZG9yaWZ5XG4gICAgZm9yIChrayA9IDA7IGtrIDwgdmVuZG9ycy5sZW5ndGg7IGtrKyspXG4gICAgICBidWYucHVzaCgnLScsIHZlbmRvcnNba2tdLCAnLScsIGssIGsgPyAnOic6ICcnLCBvLCAnO1xcbicpXG4vKi8tc3RhdGVtZW50cy0vKi9cblxuICAgIGJ1Zi5wdXNoKGssIGsgPyAnOic6ICcnLCBvLCAnO1xcbicpXG5cbiAgfVxufVxuXG52YXIgZmluZENsYXNzID0gLygpKD86Omdsb2JhbFxcKFxccyooXFwuWy1cXHddKylcXHMqXFwpfChcXC4pKFstXFx3XSspKS9nXG5cbi8qKlxuICogSGFubGRlcyBhdC1ydWxlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrIC0gVGhlIGF0LXJ1bGUgbmFtZSwgYW5kLCBpZiB0YWtlcyBib3RoIHBhcmFtZXRlcnMgYW5kIGFcbiAqICAgICAgICAgICAgICAgICAgICAgYmxvY2ssIHRoZSBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYnVmIC0gdGhlIGJ1ZmZlciBpbiB3aGljaCB0aGUgZmluYWwgc3R5bGUgc2hlZXQgaXMgYnVpbHRcbiAqIEBwYXJhbSB7c3RyaW5nW119IHYgLSBFaXRoZXIgcGFyYW1ldGVycyBmb3IgYmxvY2stbGVzcyBydWxlcyBvciB0aGVpciBibG9ja1xuICogICAgICAgICAgICAgICAgICAgICAgIGZvciB0aGUgb3RoZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIHRoZSBjdXJyZW50IHNlbGVjdG9yIG9yIGEgcHJlZml4IGluIGNhc2Ugb2YgbmVzdGVkIHJ1bGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gcmF3UHJlZml4IC0gYXMgYWJvdmUsIGJ1dCB3aXRob3V0IGxvY2FsaXphdGlvbiB0cmFuc2Zvcm1hdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZW5kb3JzIC0gYSBsaXN0IG9mIHZlbmRvciBwcmVmaXhlc1xuICogQFBhcmFtIHtib29sZWFufSBsb2NhbCAtIGFyZSB3ZSBpbiBAbG9jYWwgb3IgaW4gQGdsb2JhbCBzY29wZT9cbiAqIEBwYXJhbSB7b2JqZWN0fSBucyAtIGhlbHBlciBmdW5jdGlvbnMgdG8gcG9wdWxhdGUgb3IgY3JlYXRlIHRoZSBAbG9jYWwgbmFtZXNwYWNlXG4gKiAgICAgICAgICAgICAgICAgICAgICBhbmQgdG8gQGV4dGVuZCBjbGFzc2VzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBucy5lIC0gQGV4dGVuZCBoZWxwZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmwgLSBAbG9jYWwgaGVscGVyXG4gKi9cblxuZnVuY3Rpb24gYXQoaywgdiwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKXtcbiAgdmFyIGtrXG4gIGlmICgvXkAoPzpuYW1lc3BhY2V8aW1wb3J0fGNoYXJzZXQpJC8udGVzdChrKSkge1xuICAgIGlmKHR5cGUuY2FsbCh2KSA9PSBBUlJBWSl7XG4gICAgICBmb3IgKGtrID0gMDsga2sgPCB2Lmxlbmd0aDsga2srKykge1xuICAgICAgICBidWYucHVzaChrLCAnICcsIHZba2tdLCAnO1xcbicpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGssICcgJywgdiwgJztcXG4nKVxuICAgIH1cbiAgfSBlbHNlIGlmICgvXkBrZXlmcmFtZXMgLy50ZXN0KGspKSB7XG4gICAgayA9IGxvY2FsID8gay5yZXBsYWNlKFxuICAgICAgLy8gZ2VuZXJhdGVkIGJ5IHNjcmlwdC9yZWdleHBzLmpzXG4gICAgICAvKCApKD86Omdsb2JhbFxcKFxccyooWy1cXHddKylcXHMqXFwpfCgpKFstXFx3XSspKS8sXG4gICAgICBucy5sXG4gICAgKSA6IGtcbiAgICAvLyBhZGQgYSBALXdlYmtpdC1rZXlmcmFtZXMgYmxvY2sgdG9vLlxuXG4gICAgYnVmLnB1c2goJ0Atd2Via2l0LScsIGsuc2xpY2UoMSksICcge1xcbicpXG4gICAgc2hlZXQodiwgYnVmLCAnJywgJycsIFsnd2Via2l0J10pXG4gICAgYnVmLnB1c2goJ31cXG4nKVxuXG4gICAgYnVmLnB1c2goaywgJyB7XFxuJylcbiAgICBzaGVldCh2LCBidWYsICcnLCAnJywgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIGJ1Zi5wdXNoKCd9XFxuJylcblxuICB9IGVsc2UgaWYgKC9eQGV4dGVuZHM/JC8udGVzdChrKSkge1xuXG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiovXG4gICAgLy8gcGljayB0aGUgbGFzdCBjbGFzcyB0byBiZSBleHRlbmRlZFxuICAgIHdoaWxlIChrayA9IGZpbmRDbGFzcy5leGVjKHJhd1ByZWZpeCkpIGsgPSBra1s0XVxuICAgIC8qZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiovXG4gICAgaWYgKGsgPT0gbnVsbCB8fCAhbG9jYWwpIHtcbiAgICAgIC8vIHdlJ3JlIGluIGEgQGdsb2JhbHt9IGJsb2NrXG4gICAgICBidWYucHVzaCgnQC1lcnJvci1jYW5ub3QtZXh0ZW5kLWluLWdsb2JhbC1jb250ZXh0ICcsIEpTT04uc3RyaW5naWZ5KHJhd1ByZWZpeCksICc7XFxuJylcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoL15AZXh0ZW5kcz8kLy50ZXN0KGspKSB7XG4gICAgICAvLyBubyBjbGFzcyBpbiB0aGUgc2VsZWN0b3JcbiAgICAgIGJ1Zi5wdXNoKCdALWVycm9yLW5vLWNsYXNzLXRvLWV4dGVuZC1pbiAnLCBKU09OLnN0cmluZ2lmeShyYXdQcmVmaXgpLCAnO1xcbicpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbnMuZShcbiAgICAgIHR5cGUuY2FsbCh2KSA9PSBBUlJBWSA/IHYubWFwKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudC5yZXBsYWNlKC8oKSg/OjpnbG9iYWxcXChcXHMqKFxcLlstXFx3XSspXFxzKlxcKXwoKVxcLihbLVxcd10rKSkvLCBucy5sKVxuICAgICAgfSkuam9pbignICcpIDogdi5yZXBsYWNlKC8oKSg/OjpnbG9iYWxcXChcXHMqKFxcLlstXFx3XSspXFxzKlxcKXwoKVxcLihbLVxcd10rKSkvLCBucy5sKSxcbiAgICAgIGtcbiAgICApXG5cbiAgfSBlbHNlIGlmICgvXkAoPzpmb250LWZhY2UkfHZpZXdwb3J0JHxwYWdlICkvLnRlc3QoaykpIHtcbiAgICBzaGVldCh2LCBidWYsIGssIGssIGVtcHR5QXJyYXkpXG5cbiAgfSBlbHNlIGlmICgvXkBnbG9iYWwkLy50ZXN0KGspKSB7XG4gICAgc2hlZXQodiwgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgMCwgbnMpXG5cbiAgfSBlbHNlIGlmICgvXkBsb2NhbCQvLnRlc3QoaykpIHtcbiAgICBzaGVldCh2LCBidWYsIHByZWZpeCwgcmF3UHJlZml4LCB2ZW5kb3JzLCAxLCBucylcblxuICB9IGVsc2UgaWYgKC9eQCg/Om1lZGlhIHxzdXBwb3J0cyB8ZG9jdW1lbnQgKS4vLnRlc3QoaykpIHtcbiAgICBidWYucHVzaChrLCAnIHtcXG4nKVxuICAgIHNoZWV0KHYsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICBidWYucHVzaCgnfVxcbicpXG5cbiAgfSBlbHNlIHtcbiAgICBidWYucHVzaCgnQC1lcnJvci11bnN1cHBvcnRlZC1hdC1ydWxlICcsIEpTT04uc3RyaW5naWZ5KGspLCAnO1xcbicpXG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgcnVsZXNldHMgYW5kIG90aGVyIENTUyBzdGF0ZW1lbnRzIHRvIHRoZSBzaGVldC5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fHN0cmluZ3xvYmplY3R9IHN0YXRlbWVudHMgLSBhIHNvdXJjZSBvYmplY3Qgb3Igc3ViLW9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGJ1ZiAtIHRoZSBidWZmZXIgaW4gd2hpY2ggdGhlIGZpbmFsIHN0eWxlIHNoZWV0IGlzIGJ1aWx0XG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gdGhlIGN1cnJlbnQgc2VsZWN0b3Igb3IgYSBwcmVmaXggaW4gY2FzZSBvZiBuZXN0ZWQgcnVsZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSByYXdQcmVmaXggLSBhcyBhYm92ZSwgYnV0IHdpdGhvdXQgbG9jYWxpemF0aW9uIHRyYW5zZm9ybWF0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IHZlbmRvcnMgLSBhIGxpc3Qgb2YgdmVuZG9yIHByZWZpeGVzXG4gKiBAUGFyYW0ge2Jvb2xlYW59IGxvY2FsIC0gYXJlIHdlIGluIEBsb2NhbCBvciBpbiBAZ2xvYmFsIHNjb3BlP1xuICogQHBhcmFtIHtvYmplY3R9IG5zIC0gaGVscGVyIGZ1bmN0aW9ucyB0byBwb3B1bGF0ZSBvciBjcmVhdGUgdGhlIEBsb2NhbCBuYW1lc3BhY2VcbiAqICAgICAgICAgICAgICAgICAgICAgIGFuZCB0byBAZXh0ZW5kIGNsYXNzZXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG5zLmUgLSBAZXh0ZW5kIGhlbHBlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gbnMubCAtIEBsb2NhbCBoZWxwZXJcbiAqL1xuZnVuY3Rpb24gc2hlZXQoc3RhdGVtZW50cywgYnVmLCBwcmVmaXgsIHJhd1ByZWZpeCwgdmVuZG9ycywgbG9jYWwsIG5zKSB7XG4gIHZhciBrLCBraywgdiwgaW5EZWNsYXJhdGlvblxuXG4gIHN3aXRjaCAodHlwZS5jYWxsKHN0YXRlbWVudHMpKSB7XG5cbiAgY2FzZSBBUlJBWTpcbiAgICBmb3IgKGsgPSAwOyBrIDwgc3RhdGVtZW50cy5sZW5ndGg7IGsrKylcbiAgICAgIHNoZWV0KHN0YXRlbWVudHNba10sIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICBicmVha1xuXG4gIGNhc2UgT0JKRUNUOlxuICAgIGZvciAoayBpbiBzdGF0ZW1lbnRzKSB7XG4gICAgICB2ID0gc3RhdGVtZW50c1trXVxuICAgICAgaWYgKHByZWZpeCAmJiAvXlstXFx3JF0rJC8udGVzdChrKSkge1xuICAgICAgICBpZiAoIWluRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICBpbkRlY2xhcmF0aW9uID0gMVxuICAgICAgICAgIGJ1Zi5wdXNoKCggcHJlZml4IHx8ICcqJyApLCAnIHtcXG4nKVxuICAgICAgICB9XG4gICAgICAgIGRlY2xhcmF0aW9ucyh2LCBidWYsIGssIHZlbmRvcnMsIGxvY2FsLCBucylcbiAgICAgIH0gZWxzZSBpZiAoL15ALy50ZXN0KGspKSB7XG4gICAgICAgIC8vIEhhbmRsZSBBdC1ydWxlc1xuICAgICAgICBpbkRlY2xhcmF0aW9uID0gKGluRGVjbGFyYXRpb24gJiYgYnVmLnB1c2goJ31cXG4nKSAmJiAwKVxuXG4gICAgICAgIGF0KGssIHYsIGJ1ZiwgcHJlZml4LCByYXdQcmVmaXgsIHZlbmRvcnMsIGxvY2FsLCBucylcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2VsZWN0b3Igb3IgbmVzdGVkIHN1Yi1zZWxlY3RvcnNcblxuICAgICAgICBpbkRlY2xhcmF0aW9uID0gKGluRGVjbGFyYXRpb24gJiYgYnVmLnB1c2goJ31cXG4nKSAmJiAwKVxuXG4gICAgICAgIHNoZWV0KHYsIGJ1ZixcbiAgICAgICAgICAoa2sgPSAvLC8udGVzdChwcmVmaXgpIHx8IHByZWZpeCAmJiAvLC8udGVzdChrKSkgP1xuICAgICAgICAgICAgY2FydGVzaWFuKHByZWZpeC5zcGxpdCgnLCcpLCAoIGxvY2FsID9cbiAgICAgICAgICBrLnJlcGxhY2UoXG4gICAgICAgICAgICAvKCkoPzo6Z2xvYmFsXFwoXFxzKihcXC5bLVxcd10rKVxccypcXCl8KFxcLikoWy1cXHddKykpL2csIG5zLmxcbiAgICAgICAgICApIDoga1xuICAgICAgICApLnNwbGl0KCcsJyksIHByZWZpeCkuam9pbignLCcpIDpcbiAgICAgICAgICAgIGNvbmNhdChwcmVmaXgsICggbG9jYWwgP1xuICAgICAgICAgIGsucmVwbGFjZShcbiAgICAgICAgICAgIC8oKSg/OjpnbG9iYWxcXChcXHMqKFxcLlstXFx3XSspXFxzKlxcKXwoXFwuKShbLVxcd10rKSkvZywgbnMubFxuICAgICAgICAgICkgOiBrXG4gICAgICAgICksIHByZWZpeCksXG4gICAgICAgICAga2sgP1xuICAgICAgICAgICAgY2FydGVzaWFuKHJhd1ByZWZpeC5zcGxpdCgnLCcpLCBrLnNwbGl0KCcsJyksIHJhd1ByZWZpeCkuam9pbignLCcpIDpcbiAgICAgICAgICAgIGNvbmNhdChyYXdQcmVmaXgsIGssIHJhd1ByZWZpeCksXG4gICAgICAgICAgdmVuZG9ycyxcbiAgICAgICAgICBsb2NhbCwgbnNcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5EZWNsYXJhdGlvbikgYnVmLnB1c2goJ31cXG4nKVxuICAgIGJyZWFrXG4gIGNhc2UgU1RSSU5HOlxuICAgIGJ1Zi5wdXNoKFxuICAgICAgICAoIHByZWZpeCB8fCAnOi1lcnJvci1uby1zZWxlY3RvcicgKSAsICcge1xcbidcbiAgICAgIClcbiAgICBkZWNsYXJhdGlvbnMoc3RhdGVtZW50cywgYnVmLCAnJywgdmVuZG9ycywgbG9jYWwsIG5zKVxuICAgIGJ1Zi5wdXNoKCd9XFxuJylcbiAgfVxufVxuXG52YXIgc2NvcGVfcm9vdCA9ICdfajJjXycgK1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApLnRvU3RyaW5nKDM2KSArICdfJyArXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCkudG9TdHJpbmcoMzYpICsgJ18nICtcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwKS50b1N0cmluZygzNikgKyAnXycgK1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDApLnRvU3RyaW5nKDM2KSArICdfJztcbnZhciBjb3VudGVyID0gMDtcbmZ1bmN0aW9uIGoyYyhyZXMpIHtcbiAgcmVzID0gcmVzIHx8IHt9XG4gIHZhciBleHRlbnNpb25zID0gW11cblxuICBmdW5jdGlvbiBmaW5hbGl6ZShidWYsIGkpIHtcbiAgICBmb3IgKGkgPSAwOyBpPCBleHRlbnNpb25zLmxlbmd0aDsgaSsrKSBidWYgPSBleHRlbnNpb25zW2ldKGJ1ZikgfHwgYnVmXG4gICAgcmV0dXJuIGJ1Zi5qb2luKCcnKVxuICB9XG5cbiAgcmVzLnVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGV4dGVuc2lvbnMucHVzaChhcmdzW2ldKVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cbi8qLy1zdGF0ZW1lbnRzLS8qL1xuICByZXMuc2hlZXQgPSBmdW5jdGlvbihucywgc3RhdGVtZW50cykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBzdGF0ZW1lbnRzID0gbnM7IG5zID0ge31cbiAgICB9XG4gICAgdmFyXG4gICAgICBzdWZmaXggPSBzY29wZV9yb290ICsgY291bnRlcisrLFxuICAgICAgbG9jYWxzID0ge30sXG4gICAgICBrLCBidWYgPSBbXVxuICAgIC8vIHBpY2sgb25seSBub24tbnVtZXJpYyBrZXlzIHNpbmNlIGAoTmFOICE9IE5hTikgPT09IHRydWVgXG4gICAgZm9yIChrIGluIG5zKSBpZiAoay0wICE9IGstMCAmJiBvd24uY2FsbChucywgaykpIHtcbiAgICAgIGxvY2Fsc1trXSA9IG5zW2tdXG4gICAgfVxuICAgIHNoZWV0KFxuICAgICAgc3RhdGVtZW50cywgYnVmLCAnJywgJycsIGVtcHR5QXJyYXkgLyp2ZW5kb3JzKi8sXG4gICAgICAxLCAvLyBsb2NhbFxuICAgICAge1xuICAgICAgICBlOiBmdW5jdGlvbiBleHRlbmQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICAgIHZhciBuYW1lTGlzdCA9IGxvY2Fsc1tjaGlsZF1cbiAgICAgICAgICBsb2NhbHNbY2hpbGRdID1cbiAgICAgICAgICAgIG5hbWVMaXN0LnNsaWNlKDAsIG5hbWVMaXN0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSArXG4gICAgICAgICAgICBwYXJlbnQgKyAnICcgK1xuICAgICAgICAgICAgbmFtZUxpc3Quc2xpY2UobmFtZUxpc3QubGFzdEluZGV4T2YoJyAnKSArIDEpXG4gICAgICAgIH0sXG4gICAgICAgIGw6IGZ1bmN0aW9uIGxvY2FsaXplKG1hdGNoLCBzcGFjZSwgZ2xvYmFsLCBkb3QsIG5hbWUpIHtcbiAgICAgICAgICBpZiAoZ2xvYmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gc3BhY2UgKyBnbG9iYWxcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFsb2NhbHNbbmFtZV0pIGxvY2Fsc1tuYW1lXSA9IG5hbWUgKyBzdWZmaXhcbiAgICAgICAgICByZXR1cm4gc3BhY2UgKyBkb3QgKyBsb2NhbHNbbmFtZV0ubWF0Y2goL1xcUyskLylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICAvKmpzaGludCAtVzA1MyAqL1xuICAgIGJ1ZiA9IG5ldyBTdHJpbmcoZmluYWxpemUoYnVmKSlcbiAgICAvKmpzaGludCArVzA1MyAqL1xuICAgIGZvciAoayBpbiBsb2NhbHMpIGlmIChvd24uY2FsbChsb2NhbHMsIGspKSBidWZba10gPSBsb2NhbHNba11cbiAgICByZXR1cm4gYnVmXG4gIH1cbi8qLy1zdGF0ZW1lbnRzLS8qL1xuICByZXMuaW5saW5lID0gZnVuY3Rpb24gKGxvY2FscywgZGVjbCwgYnVmKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlY2wgPSBsb2NhbHM7IGxvY2FscyA9IHt9XG4gICAgfVxuICAgIGRlY2xhcmF0aW9ucyhcbiAgICAgIGRlY2wsXG4gICAgICBidWYgPSBbXSxcbiAgICAgICcnLCAvLyBwcmVmaXhcbiAgICAgIGVtcHR5QXJyYXksIC8vIHZlbmRvcnNcbiAgICAgIDEsXG4gICAgICB7XG4gICAgICAgIGw6IGZ1bmN0aW9uIGxvY2FsaXplKG1hdGNoLCBzcGFjZSwgZ2xvYmFsLCBkb3QsIG5hbWUpIHtcbiAgICAgICAgICBpZiAoZ2xvYmFsKSByZXR1cm4gc3BhY2UgKyBnbG9iYWxcbiAgICAgICAgICBpZiAoIWxvY2Fsc1tuYW1lXSkgcmV0dXJuIG5hbWVcbiAgICAgICAgICByZXR1cm4gc3BhY2UgKyBkb3QgKyBsb2NhbHNbbmFtZV1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICByZXR1cm4gZmluYWxpemUoYnVmKVxuICB9XG5cbiAgcmVzLnByZWZpeCA9IGZ1bmN0aW9uKHZhbCwgdmVuZG9ycykge1xuICAgIHJldHVybiBjYXJ0ZXNpYW4oXG4gICAgICB2ZW5kb3JzLm1hcChmdW5jdGlvbihwKXtyZXR1cm4gJy0nICsgcCArICctJ30pLmNvbmNhdChbJyddKSxcbiAgICAgIFt2YWxdXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuajJjLmdsb2JhbCA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuICc6Z2xvYmFsKCcgKyB4ICsgJyknXG59XG5cbmoyYy5rdiA9IGt2XG5mdW5jdGlvbiBrdiAoaywgdiwgbykge1xuICBvID0ge31cbiAgb1trXSA9IHZcbiAgcmV0dXJuIG9cbn1cblxuajJjLmF0ID0gZnVuY3Rpb24gYXQgKHJ1bGUsIHBhcmFtcywgYmxvY2spIHtcbiAgaWYgKFxuICAgIGFyZ3VtZW50cy5sZW5ndGggPCAzXG4gICkge1xuICAgIHZhciBfYXQgPSBhdC5iaW5kLmFwcGx5KGF0LCBbbnVsbF0uY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApKSlcbiAgICBfYXQudG9TdHJpbmcgPSBmdW5jdGlvbigpe3JldHVybiAnQCcgKyBydWxlICsgJyAnICsgcGFyYW1zfVxuICAgIHJldHVybiBfYXRcbiAgfVxuICBlbHNlIHJldHVybiBrdignQCcgKyBydWxlICsgJyAnICsgcGFyYW1zLCBibG9jaylcbn1cblxuajJjKGoyYylcbmRlbGV0ZSBqMmMudXNlXG5cbm1vZHVsZS5leHBvcnRzID0gajJjOyIsIjsoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblx0XCJ1c2Ugc3RyaWN0XCJcclxuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG5cdHZhciBtID0gZmFjdG9yeShnbG9iYWwpXHJcblx0aWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlICE9IG51bGwgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuXHRcdG1vZHVsZS5leHBvcnRzID0gbVxyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcclxuXHRcdGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBtIH0pXHJcblx0fSBlbHNlIHtcclxuXHRcdGdsb2JhbC5tID0gbVxyXG5cdH1cclxuXHQvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXHJcbn0pKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSwgZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHRcInVzZSBzdHJpY3RcIlxyXG5cclxuXHRtLnZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gXCJ2MC4yLjNcIlxyXG5cdH1cclxuXHJcblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5XHJcblx0dmFyIHR5cGUgPSB7fS50b1N0cmluZ1xyXG5cclxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT09IFwiZnVuY3Rpb25cIlxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZS5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBPYmplY3RdXCJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlzU3RyaW5nKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGUuY2FsbChvYmplY3QpID09PSBcIltvYmplY3QgU3RyaW5nXVwiXHJcblx0fVxyXG5cclxuXHR2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGUuY2FsbChvYmplY3QpID09PSBcIltvYmplY3QgQXJyYXldXCJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxuXHR2YXIgdm9pZEVsZW1lbnRzID0ge1xyXG5cdFx0QVJFQTogMSxcclxuXHRcdEJBU0U6IDEsXHJcblx0XHRCUjogMSxcclxuXHRcdENPTDogMSxcclxuXHRcdENPTU1BTkQ6IDEsXHJcblx0XHRFTUJFRDogMSxcclxuXHRcdEhSOiAxLFxyXG5cdFx0SU1HOiAxLFxyXG5cdFx0SU5QVVQ6IDEsXHJcblx0XHRLRVlHRU46IDEsXHJcblx0XHRMSU5LOiAxLFxyXG5cdFx0TUVUQTogMSxcclxuXHRcdFBBUkFNOiAxLFxyXG5cdFx0U09VUkNFOiAxLFxyXG5cdFx0VFJBQ0s6IDEsXHJcblx0XHRXQlI6IDFcclxuXHR9XHJcblxyXG5cdC8vIGNhY2hpbmcgY29tbW9ubHkgdXNlZCB2YXJpYWJsZXNcclxuXHR2YXIgJGRvY3VtZW50LCAkbG9jYXRpb24sICRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUsICRjYW5jZWxBbmltYXRpb25GcmFtZVxyXG5cclxuXHQvLyBzZWxmIGludm9raW5nIGZ1bmN0aW9uIG5lZWRlZCBiZWNhdXNlIG9mIHRoZSB3YXkgbW9ja3Mgd29ya1xyXG5cdGZ1bmN0aW9uIGluaXRpYWxpemUobW9jaykge1xyXG5cdFx0JGRvY3VtZW50ID0gbW9jay5kb2N1bWVudFxyXG5cdFx0JGxvY2F0aW9uID0gbW9jay5sb2NhdGlvblxyXG5cdFx0JGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gbW9jay5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBtb2NrLmNsZWFyVGltZW91dFxyXG5cdFx0JHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IG1vY2sucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IG1vY2suc2V0VGltZW91dFxyXG5cdH1cclxuXHJcblx0Ly8gdGVzdGluZyBBUElcclxuXHRtLmRlcHMgPSBmdW5jdGlvbiAobW9jaykge1xyXG5cdFx0aW5pdGlhbGl6ZShnbG9iYWwgPSBtb2NrIHx8IHdpbmRvdylcclxuXHRcdHJldHVybiBnbG9iYWxcclxuXHR9XHJcblxyXG5cdG0uZGVwcyhnbG9iYWwpXHJcblxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlZGVmIHtTdHJpbmd9IFRhZ1xyXG5cdCAqIEEgc3RyaW5nIHRoYXQgbG9va3MgbGlrZSAtPiBkaXYuY2xhc3NuYW1lI2lkW3BhcmFtPW9uZV1bcGFyYW0yPXR3b11cclxuXHQgKiBXaGljaCBkZXNjcmliZXMgYSBET00gbm9kZVxyXG5cdCAqL1xyXG5cclxuXHRmdW5jdGlvbiBwYXJzZVRhZ0F0dHJzKGNlbGwsIHRhZykge1xyXG5cdFx0dmFyIGNsYXNzZXMgPSBbXVxyXG5cdFx0dmFyIHBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbLis/XFxdKS9nXHJcblx0XHR2YXIgbWF0Y2hcclxuXHJcblx0XHR3aGlsZSAoKG1hdGNoID0gcGFyc2VyLmV4ZWModGFnKSkpIHtcclxuXHRcdFx0aWYgKG1hdGNoWzFdID09PSBcIlwiICYmIG1hdGNoWzJdKSB7XHJcblx0XHRcdFx0Y2VsbC50YWcgPSBtYXRjaFsyXVxyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoWzFdID09PSBcIiNcIikge1xyXG5cdFx0XHRcdGNlbGwuYXR0cnMuaWQgPSBtYXRjaFsyXVxyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoWzFdID09PSBcIi5cIikge1xyXG5cdFx0XHRcdGNsYXNzZXMucHVzaChtYXRjaFsyXSlcclxuXHRcdFx0fSBlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcclxuXHRcdFx0XHR2YXIgcGFpciA9IC9cXFsoLis/KSg/Oj0oXCJ8J3wpKC4qPylcXDIpP1xcXS8uZXhlYyhtYXRjaFszXSlcclxuXHRcdFx0XHRjZWxsLmF0dHJzW3BhaXJbMV1dID0gcGFpclszXSB8fCAocGFpclsyXSA/IFwiXCIgOiB0cnVlKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNsYXNzZXNcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldFZpcnR1YWxDaGlsZHJlbihhcmdzLCBoYXNBdHRycykge1xyXG5cdFx0dmFyIGNoaWxkcmVuID0gaGFzQXR0cnMgPyBhcmdzLnNsaWNlKDEpIDogYXJnc1xyXG5cclxuXHRcdGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgaXNBcnJheShjaGlsZHJlblswXSkpIHtcclxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuWzBdXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFzc2lnbkF0dHJzKHRhcmdldCwgYXR0cnMsIGNsYXNzZXMpIHtcclxuXHRcdHZhciBjbGFzc0F0dHIgPSBcImNsYXNzXCIgaW4gYXR0cnMgPyBcImNsYXNzXCIgOiBcImNsYXNzTmFtZVwiXHJcblxyXG5cdFx0Zm9yICh2YXIgYXR0ck5hbWUgaW4gYXR0cnMpIHtcclxuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBhdHRyTmFtZSkpIHtcclxuXHRcdFx0XHRpZiAoYXR0ck5hbWUgPT09IGNsYXNzQXR0ciAmJlxyXG5cdFx0XHRcdFx0XHRhdHRyc1thdHRyTmFtZV0gIT0gbnVsbCAmJlxyXG5cdFx0XHRcdFx0XHRhdHRyc1thdHRyTmFtZV0gIT09IFwiXCIpIHtcclxuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChhdHRyc1thdHRyTmFtZV0pXHJcblx0XHRcdFx0XHQvLyBjcmVhdGUga2V5IGluIGNvcnJlY3QgaXRlcmF0aW9uIG9yZGVyXHJcblx0XHRcdFx0XHR0YXJnZXRbYXR0ck5hbWVdID0gXCJcIlxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0YXJnZXRbYXR0ck5hbWVdID0gYXR0cnNbYXR0ck5hbWVdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNsYXNzZXMubGVuZ3RoKSB0YXJnZXRbY2xhc3NBdHRyXSA9IGNsYXNzZXMuam9pbihcIiBcIilcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtUYWd9IFRoZSBET00gbm9kZSB0YWdcclxuXHQgKiBAcGFyYW0ge09iamVjdD1bXX0gb3B0aW9uYWwga2V5LXZhbHVlIHBhaXJzIHRvIGJlIG1hcHBlZCB0byBET00gYXR0cnNcclxuXHQgKiBAcGFyYW0gey4uLm1Ob2RlPVtdfSBaZXJvIG9yIG1vcmUgTWl0aHJpbCBjaGlsZCBub2Rlcy4gQ2FuIGJlIGFuIGFycmF5LFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgIG9yIHNwbGF0IChvcHRpb25hbClcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBtKHRhZywgcGFpcnMpIHtcclxuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcblxyXG5cdFx0aWYgKGlzT2JqZWN0KHRhZykpIHJldHVybiBwYXJhbWV0ZXJpemUodGFnLCBhcmdzKVxyXG5cclxuXHRcdGlmICghaXNTdHJpbmcodGFnKSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzZWxlY3RvciBpbiBtKHNlbGVjdG9yLCBhdHRycywgY2hpbGRyZW4pIHNob3VsZCBcIiArXHJcblx0XHRcdFx0XCJiZSBhIHN0cmluZ1wiKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBoYXNBdHRycyA9IHBhaXJzICE9IG51bGwgJiYgaXNPYmplY3QocGFpcnMpICYmXHJcblx0XHRcdCEoXCJ0YWdcIiBpbiBwYWlycyB8fCBcInZpZXdcIiBpbiBwYWlycyB8fCBcInN1YnRyZWVcIiBpbiBwYWlycylcclxuXHJcblx0XHR2YXIgYXR0cnMgPSBoYXNBdHRycyA/IHBhaXJzIDoge31cclxuXHRcdHZhciBjZWxsID0ge1xyXG5cdFx0XHR0YWc6IFwiZGl2XCIsXHJcblx0XHRcdGF0dHJzOiB7fSxcclxuXHRcdFx0Y2hpbGRyZW46IGdldFZpcnR1YWxDaGlsZHJlbihhcmdzLCBoYXNBdHRycylcclxuXHRcdH1cclxuXHJcblx0XHRhc3NpZ25BdHRycyhjZWxsLmF0dHJzLCBhdHRycywgcGFyc2VUYWdBdHRycyhjZWxsLCB0YWcpKVxyXG5cdFx0cmV0dXJuIGNlbGxcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvckVhY2gobGlzdCwgZikge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aCAmJiAhZihsaXN0W2ldLCBpKyspOykge1xyXG5cdFx0XHQvLyBmdW5jdGlvbiBjYWxsZWQgaW4gY29uZGl0aW9uXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JLZXlzKGxpc3QsIGYpIHtcclxuXHRcdGZvckVhY2gobGlzdCwgZnVuY3Rpb24gKGF0dHJzLCBpKSB7XHJcblx0XHRcdHJldHVybiAoYXR0cnMgPSBhdHRycyAmJiBhdHRycy5hdHRycykgJiZcclxuXHRcdFx0XHRhdHRycy5rZXkgIT0gbnVsbCAmJlxyXG5cdFx0XHRcdGYoYXR0cnMsIGkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHQvLyBUaGlzIGZ1bmN0aW9uIHdhcyBjYXVzaW5nIGRlb3B0cyBpbiBDaHJvbWUuXHJcblx0ZnVuY3Rpb24gZGF0YVRvU3RyaW5nKGRhdGEpIHtcclxuXHRcdC8vIGRhdGEudG9TdHJpbmcoKSBtaWdodCB0aHJvdyBvciByZXR1cm4gbnVsbCBpZiBkYXRhIGlzIHRoZSByZXR1cm5cclxuXHRcdC8vIHZhbHVlIG9mIENvbnNvbGUubG9nIGluIHNvbWUgdmVyc2lvbnMgb2YgRmlyZWZveCAoYmVoYXZpb3IgZGVwZW5kcyBvblxyXG5cdFx0Ly8gdmVyc2lvbilcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChkYXRhICE9IG51bGwgJiYgZGF0YS50b1N0cmluZygpICE9IG51bGwpIHJldHVybiBkYXRhXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIHNpbGVudGx5IGlnbm9yZSBlcnJvcnNcclxuXHRcdH1cclxuXHRcdHJldHVybiBcIlwiXHJcblx0fVxyXG5cclxuXHQvLyBUaGlzIGZ1bmN0aW9uIHdhcyBjYXVzaW5nIGRlb3B0cyBpbiBDaHJvbWUuXHJcblx0ZnVuY3Rpb24gaW5qZWN0VGV4dE5vZGUocGFyZW50RWxlbWVudCwgZmlyc3QsIGluZGV4LCBkYXRhKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIGZpcnN0LCBpbmRleClcclxuXHRcdFx0Zmlyc3Qubm9kZVZhbHVlID0gZGF0YVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvLyBJRSBlcnJvbmVvdXNseSB0aHJvd3MgZXJyb3Igd2hlbiBhcHBlbmRpbmcgYW4gZW1wdHkgdGV4dCBub2RlXHJcblx0XHRcdC8vIGFmdGVyIGEgbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZmxhdHRlbihsaXN0KSB7XHJcblx0XHQvLyByZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGlzQXJyYXkobGlzdFtpXSkpIHtcclxuXHRcdFx0XHRsaXN0ID0gbGlzdC5jb25jYXQuYXBwbHkoW10sIGxpc3QpXHJcblx0XHRcdFx0Ly8gY2hlY2sgY3VycmVudCBpbmRleCBhZ2FpbiBhbmQgZmxhdHRlbiB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZVxyXG5cdFx0XHRcdC8vIG5lc3RlZCBhcnJheXMgYXQgdGhhdCBpbmRleFxyXG5cdFx0XHRcdGktLVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbGlzdFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBub2RlLCBpbmRleCkge1xyXG5cdFx0cGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUobm9kZSxcclxuXHRcdFx0cGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSB8fCBudWxsKVxyXG5cdH1cclxuXHJcblx0dmFyIERFTEVUSU9OID0gMVxyXG5cdHZhciBJTlNFUlRJT04gPSAyXHJcblx0dmFyIE1PVkUgPSAzXHJcblxyXG5cdGZ1bmN0aW9uIGhhbmRsZUtleXNEaWZmZXIoZGF0YSwgZXhpc3RpbmcsIGNhY2hlZCwgcGFyZW50RWxlbWVudCkge1xyXG5cdFx0Zm9yS2V5cyhkYXRhLCBmdW5jdGlvbiAoa2V5LCBpKSB7XHJcblx0XHRcdGV4aXN0aW5nW2tleSA9IGtleS5rZXldID0gZXhpc3Rpbmdba2V5XSA/IHtcclxuXHRcdFx0XHRhY3Rpb246IE1PVkUsXHJcblx0XHRcdFx0aW5kZXg6IGksXHJcblx0XHRcdFx0ZnJvbTogZXhpc3Rpbmdba2V5XS5pbmRleCxcclxuXHRcdFx0XHRlbGVtZW50OiBjYWNoZWQubm9kZXNbZXhpc3Rpbmdba2V5XS5pbmRleF0gfHxcclxuXHRcdFx0XHRcdCRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdH0gOiB7YWN0aW9uOiBJTlNFUlRJT04sIGluZGV4OiBpfVxyXG5cdFx0fSlcclxuXHJcblx0XHR2YXIgYWN0aW9ucyA9IFtdXHJcblx0XHRmb3IgKHZhciBwcm9wIGluIGV4aXN0aW5nKSBpZiAoaGFzT3duLmNhbGwoZXhpc3RpbmcsIHByb3ApKSB7XHJcblx0XHRcdGFjdGlvbnMucHVzaChleGlzdGluZ1twcm9wXSlcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY2hhbmdlcyA9IGFjdGlvbnMuc29ydChzb3J0Q2hhbmdlcylcclxuXHRcdHZhciBuZXdDYWNoZWQgPSBuZXcgQXJyYXkoY2FjaGVkLmxlbmd0aClcclxuXHJcblx0XHRuZXdDYWNoZWQubm9kZXMgPSBjYWNoZWQubm9kZXMuc2xpY2UoKVxyXG5cclxuXHRcdGZvckVhY2goY2hhbmdlcywgZnVuY3Rpb24gKGNoYW5nZSkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSBjaGFuZ2UuaW5kZXhcclxuXHRcdFx0aWYgKGNoYW5nZS5hY3Rpb24gPT09IERFTEVUSU9OKSB7XHJcblx0XHRcdFx0Y2xlYXIoY2FjaGVkW2luZGV4XS5ub2RlcywgY2FjaGVkW2luZGV4XSlcclxuXHRcdFx0XHRuZXdDYWNoZWQuc3BsaWNlKGluZGV4LCAxKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjaGFuZ2UuYWN0aW9uID09PSBJTlNFUlRJT04pIHtcclxuXHRcdFx0XHR2YXIgZHVtbXkgPSAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5cdFx0XHRcdGR1bW15LmtleSA9IGRhdGFbaW5kZXhdLmF0dHJzLmtleVxyXG5cdFx0XHRcdGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgZHVtbXksIGluZGV4KVxyXG5cdFx0XHRcdG5ld0NhY2hlZC5zcGxpY2UoaW5kZXgsIDAsIHtcclxuXHRcdFx0XHRcdGF0dHJzOiB7a2V5OiBkYXRhW2luZGV4XS5hdHRycy5rZXl9LFxyXG5cdFx0XHRcdFx0bm9kZXM6IFtkdW1teV1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdG5ld0NhY2hlZC5ub2Rlc1tpbmRleF0gPSBkdW1teVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY2hhbmdlLmFjdGlvbiA9PT0gTU9WRSkge1xyXG5cdFx0XHRcdHZhciBjaGFuZ2VFbGVtZW50ID0gY2hhbmdlLmVsZW1lbnRcclxuXHRcdFx0XHR2YXIgbWF5YmVDaGFuZ2VkID0gcGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XVxyXG5cdFx0XHRcdGlmIChtYXliZUNoYW5nZWQgIT09IGNoYW5nZUVsZW1lbnQgJiYgY2hhbmdlRWxlbWVudCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0cGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2hhbmdlRWxlbWVudCxcclxuXHRcdFx0XHRcdFx0bWF5YmVDaGFuZ2VkIHx8IG51bGwpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG5ld0NhY2hlZFtpbmRleF0gPSBjYWNoZWRbY2hhbmdlLmZyb21dXHJcblx0XHRcdFx0bmV3Q2FjaGVkLm5vZGVzW2luZGV4XSA9IGNoYW5nZUVsZW1lbnRcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gbmV3Q2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkaWZmS2V5cyhkYXRhLCBjYWNoZWQsIGV4aXN0aW5nLCBwYXJlbnRFbGVtZW50KSB7XHJcblx0XHR2YXIga2V5c0RpZmZlciA9IGRhdGEubGVuZ3RoICE9PSBjYWNoZWQubGVuZ3RoXHJcblxyXG5cdFx0aWYgKCFrZXlzRGlmZmVyKSB7XHJcblx0XHRcdGZvcktleXMoZGF0YSwgZnVuY3Rpb24gKGF0dHJzLCBpKSB7XHJcblx0XHRcdFx0dmFyIGNhY2hlZENlbGwgPSBjYWNoZWRbaV1cclxuXHRcdFx0XHRyZXR1cm4ga2V5c0RpZmZlciA9IGNhY2hlZENlbGwgJiZcclxuXHRcdFx0XHRcdGNhY2hlZENlbGwuYXR0cnMgJiZcclxuXHRcdFx0XHRcdGNhY2hlZENlbGwuYXR0cnMua2V5ICE9PSBhdHRycy5rZXlcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoa2V5c0RpZmZlcikge1xyXG5cdFx0XHRyZXR1cm4gaGFuZGxlS2V5c0RpZmZlcihkYXRhLCBleGlzdGluZywgY2FjaGVkLCBwYXJlbnRFbGVtZW50KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGNhY2hlZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZGlmZkFycmF5KGRhdGEsIGNhY2hlZCwgbm9kZXMpIHtcclxuXHRcdC8vIGRpZmYgdGhlIGFycmF5IGl0c2VsZlxyXG5cclxuXHRcdC8vIHVwZGF0ZSB0aGUgbGlzdCBvZiBET00gbm9kZXMgYnkgY29sbGVjdGluZyB0aGUgbm9kZXMgZnJvbSBlYWNoIGl0ZW1cclxuXHRcdGZvckVhY2goZGF0YSwgZnVuY3Rpb24gKF8sIGkpIHtcclxuXHRcdFx0aWYgKGNhY2hlZFtpXSAhPSBudWxsKSBub2Rlcy5wdXNoLmFwcGx5KG5vZGVzLCBjYWNoZWRbaV0ubm9kZXMpXHJcblx0XHR9KVxyXG5cdFx0Ly8gcmVtb3ZlIGl0ZW1zIGZyb20gdGhlIGVuZCBvZiB0aGUgYXJyYXkgaWYgdGhlIG5ldyBhcnJheSBpcyBzaG9ydGVyXHJcblx0XHQvLyB0aGFuIHRoZSBvbGQgb25lLiBpZiBlcnJvcnMgZXZlciBoYXBwZW4gaGVyZSwgdGhlIGlzc3VlIGlzIG1vc3RcclxuXHRcdC8vIGxpa2VseSBhIGJ1ZyBpbiB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSBgY2FjaGVkYCBkYXRhIHN0cnVjdHVyZVxyXG5cdFx0Ly8gc29tZXdoZXJlIGVhcmxpZXIgaW4gdGhlIHByb2dyYW1cclxuXHRcdGZvckVhY2goY2FjaGVkLm5vZGVzLCBmdW5jdGlvbiAobm9kZSwgaSkge1xyXG5cdFx0XHRpZiAobm9kZS5wYXJlbnROb2RlICE9IG51bGwgJiYgbm9kZXMuaW5kZXhPZihub2RlKSA8IDApIHtcclxuXHRcdFx0XHRjbGVhcihbbm9kZV0sIFtjYWNoZWRbaV1dKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGlmIChkYXRhLmxlbmd0aCA8IGNhY2hlZC5sZW5ndGgpIGNhY2hlZC5sZW5ndGggPSBkYXRhLmxlbmd0aFxyXG5cdFx0Y2FjaGVkLm5vZGVzID0gbm9kZXNcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkQXJyYXlLZXlzKGRhdGEpIHtcclxuXHRcdHZhciBndWlkID0gMFxyXG5cdFx0Zm9yS2V5cyhkYXRhLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZvckVhY2goZGF0YSwgZnVuY3Rpb24gKGF0dHJzKSB7XHJcblx0XHRcdFx0aWYgKChhdHRycyA9IGF0dHJzICYmIGF0dHJzLmF0dHJzKSAmJiBhdHRycy5rZXkgPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0YXR0cnMua2V5ID0gXCJfX21pdGhyaWxfX1wiICsgZ3VpZCsrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gMVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlzRGlmZmVyZW50RW5vdWdoKGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKSB7XHJcblx0XHRpZiAoZGF0YS50YWcgIT09IGNhY2hlZC50YWcpIHJldHVybiB0cnVlXHJcblxyXG5cdFx0aWYgKGRhdGFBdHRyS2V5cy5zb3J0KCkuam9pbigpICE9PVxyXG5cdFx0XHRcdE9iamVjdC5rZXlzKGNhY2hlZC5hdHRycykuc29ydCgpLmpvaW4oKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJzLmlkICE9PSBjYWNoZWQuYXR0cnMuaWQpIHtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGF0YS5hdHRycy5rZXkgIT09IGNhY2hlZC5hdHRycy5rZXkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJhbGxcIikge1xyXG5cdFx0XHRyZXR1cm4gIWNhY2hlZC5jb25maWdDb250ZXh0IHx8IGNhY2hlZC5jb25maWdDb250ZXh0LnJldGFpbiAhPT0gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChtLnJlZHJhdy5zdHJhdGVneSgpID09PSBcImRpZmZcIikge1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVkLmNvbmZpZ0NvbnRleHQgJiYgY2FjaGVkLmNvbmZpZ0NvbnRleHQucmV0YWluID09PSBmYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbWF5YmVSZWNyZWF0ZU9iamVjdChkYXRhLCBjYWNoZWQsIGRhdGFBdHRyS2V5cykge1xyXG5cdFx0Ly8gaWYgYW4gZWxlbWVudCBpcyBkaWZmZXJlbnQgZW5vdWdoIGZyb20gdGhlIG9uZSBpbiBjYWNoZSwgcmVjcmVhdGUgaXRcclxuXHRcdGlmIChpc0RpZmZlcmVudEVub3VnaChkYXRhLCBjYWNoZWQsIGRhdGFBdHRyS2V5cykpIHtcclxuXHRcdFx0aWYgKGNhY2hlZC5ub2Rlcy5sZW5ndGgpIGNsZWFyKGNhY2hlZC5ub2RlcylcclxuXHJcblx0XHRcdGlmIChjYWNoZWQuY29uZmlnQ29udGV4dCAmJlxyXG5cdFx0XHRcdFx0aXNGdW5jdGlvbihjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCkpIHtcclxuXHRcdFx0XHRjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjYWNoZWQuY29udHJvbGxlcnMpIHtcclxuXHRcdFx0XHRmb3JFYWNoKGNhY2hlZC5jb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRcdGlmIChjb250cm9sbGVyLm9udW5sb2FkKSBjb250cm9sbGVyLm9udW5sb2FkKHtwcmV2ZW50RGVmYXVsdDogbm9vcH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRPYmplY3ROYW1lc3BhY2UoZGF0YSwgbmFtZXNwYWNlKSB7XHJcblx0XHRpZiAoZGF0YS5hdHRycy54bWxucykgcmV0dXJuIGRhdGEuYXR0cnMueG1sbnNcclxuXHRcdGlmIChkYXRhLnRhZyA9PT0gXCJzdmdcIikgcmV0dXJuIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG5cdFx0aWYgKGRhdGEudGFnID09PSBcIm1hdGhcIikgcmV0dXJuIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiXHJcblx0XHRyZXR1cm4gbmFtZXNwYWNlXHJcblx0fVxyXG5cclxuXHR2YXIgcGVuZGluZ1JlcXVlc3RzID0gMFxyXG5cdG0uc3RhcnRDb21wdXRhdGlvbiA9IGZ1bmN0aW9uICgpIHsgcGVuZGluZ1JlcXVlc3RzKysgfVxyXG5cdG0uZW5kQ29tcHV0YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAocGVuZGluZ1JlcXVlc3RzID4gMSkge1xyXG5cdFx0XHRwZW5kaW5nUmVxdWVzdHMtLVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzID0gMFxyXG5cdFx0XHRtLnJlZHJhdygpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB1bmxvYWRDYWNoZWRDb250cm9sbGVycyhjYWNoZWQsIHZpZXdzLCBjb250cm9sbGVycykge1xyXG5cdFx0aWYgKGNvbnRyb2xsZXJzLmxlbmd0aCkge1xyXG5cdFx0XHRjYWNoZWQudmlld3MgPSB2aWV3c1xyXG5cdFx0XHRjYWNoZWQuY29udHJvbGxlcnMgPSBjb250cm9sbGVyc1xyXG5cdFx0XHRmb3JFYWNoKGNvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xyXG5cdFx0XHRcdGlmIChjb250cm9sbGVyLm9udW5sb2FkICYmIGNvbnRyb2xsZXIub251bmxvYWQuJG9sZCkge1xyXG5cdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZCA9IGNvbnRyb2xsZXIub251bmxvYWQuJG9sZFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHBlbmRpbmdSZXF1ZXN0cyAmJiBjb250cm9sbGVyLm9udW5sb2FkKSB7XHJcblx0XHRcdFx0XHR2YXIgb251bmxvYWQgPSBjb250cm9sbGVyLm9udW5sb2FkXHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkID0gbm9vcFxyXG5cdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZC4kb2xkID0gb251bmxvYWRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzY2hlZHVsZUNvbmZpZ3NUb0JlQ2FsbGVkKGNvbmZpZ3MsIGRhdGEsIG5vZGUsIGlzTmV3LCBjYWNoZWQpIHtcclxuXHRcdC8vIHNjaGVkdWxlIGNvbmZpZ3MgdG8gYmUgY2FsbGVkLiBUaGV5IGFyZSBjYWxsZWQgYWZ0ZXIgYGJ1aWxkYCBmaW5pc2hlc1xyXG5cdFx0Ly8gcnVubmluZ1xyXG5cdFx0aWYgKGlzRnVuY3Rpb24oZGF0YS5hdHRycy5jb25maWcpKSB7XHJcblx0XHRcdHZhciBjb250ZXh0ID0gY2FjaGVkLmNvbmZpZ0NvbnRleHQgPSBjYWNoZWQuY29uZmlnQ29udGV4dCB8fCB7fVxyXG5cclxuXHRcdFx0Ly8gYmluZFxyXG5cdFx0XHRjb25maWdzLnB1c2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBkYXRhLmF0dHJzLmNvbmZpZy5jYWxsKGRhdGEsIG5vZGUsICFpc05ldywgY29udGV4dCxcclxuXHRcdFx0XHRcdGNhY2hlZClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkVXBkYXRlZE5vZGUoXHJcblx0XHRjYWNoZWQsXHJcblx0XHRkYXRhLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRoYXNLZXlzLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0dmlld3MsXHJcblx0XHRjb25maWdzLFxyXG5cdFx0Y29udHJvbGxlcnNcclxuXHQpIHtcclxuXHRcdHZhciBub2RlID0gY2FjaGVkLm5vZGVzWzBdXHJcblxyXG5cdFx0aWYgKGhhc0tleXMpIHtcclxuXHRcdFx0c2V0QXR0cmlidXRlcyhub2RlLCBkYXRhLnRhZywgZGF0YS5hdHRycywgY2FjaGVkLmF0dHJzLCBuYW1lc3BhY2UpXHJcblx0XHR9XHJcblxyXG5cdFx0Y2FjaGVkLmNoaWxkcmVuID0gYnVpbGQoXHJcblx0XHRcdG5vZGUsXHJcblx0XHRcdGRhdGEudGFnLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0ZGF0YS5jaGlsZHJlbixcclxuXHRcdFx0Y2FjaGVkLmNoaWxkcmVuLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0MCxcclxuXHRcdFx0ZGF0YS5hdHRycy5jb250ZW50ZWRpdGFibGUgPyBub2RlIDogZWRpdGFibGUsXHJcblx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0Y29uZmlnc1xyXG5cdFx0KVxyXG5cclxuXHRcdGNhY2hlZC5ub2Rlcy5pbnRhY3QgPSB0cnVlXHJcblxyXG5cdFx0aWYgKGNvbnRyb2xsZXJzLmxlbmd0aCkge1xyXG5cdFx0XHRjYWNoZWQudmlld3MgPSB2aWV3c1xyXG5cdFx0XHRjYWNoZWQuY29udHJvbGxlcnMgPSBjb250cm9sbGVyc1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBub2RlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVOb25leGlzdGVudE5vZGVzKGRhdGEsIHBhcmVudEVsZW1lbnQsIGluZGV4KSB7XHJcblx0XHR2YXIgbm9kZXNcclxuXHRcdGlmIChkYXRhLiR0cnVzdGVkKSB7XHJcblx0XHRcdG5vZGVzID0gaW5qZWN0SFRNTChwYXJlbnRFbGVtZW50LCBpbmRleCwgZGF0YSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGVzID0gWyRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKV1cclxuXHRcdFx0aWYgKCEocGFyZW50RWxlbWVudC5ub2RlTmFtZSBpbiB2b2lkRWxlbWVudHMpKSB7XHJcblx0XHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBub2Rlc1swXSwgaW5kZXgpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY2FjaGVkXHJcblxyXG5cdFx0aWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiIHx8XHJcblx0XHRcdFx0dHlwZW9mIGRhdGEgPT09IFwibnVtYmVyXCIgfHxcclxuXHRcdFx0XHR0eXBlb2YgZGF0YSA9PT0gXCJib29sZWFuXCIpIHtcclxuXHRcdFx0Y2FjaGVkID0gbmV3IGRhdGEuY29uc3RydWN0b3IoZGF0YSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNhY2hlZCA9IGRhdGFcclxuXHRcdH1cclxuXHJcblx0XHRjYWNoZWQubm9kZXMgPSBub2Rlc1xyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVhdHRhY2hOb2RlcyhcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRpbmRleCxcclxuXHRcdHBhcmVudFRhZ1xyXG5cdCkge1xyXG5cdFx0dmFyIG5vZGVzID0gY2FjaGVkLm5vZGVzXHJcblx0XHRpZiAoIWVkaXRhYmxlIHx8IGVkaXRhYmxlICE9PSAkZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xyXG5cdFx0XHRpZiAoZGF0YS4kdHJ1c3RlZCkge1xyXG5cdFx0XHRcdGNsZWFyKG5vZGVzLCBjYWNoZWQpXHJcblx0XHRcdFx0bm9kZXMgPSBpbmplY3RIVE1MKHBhcmVudEVsZW1lbnQsIGluZGV4LCBkYXRhKVxyXG5cdFx0XHR9IGVsc2UgaWYgKHBhcmVudFRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XHJcblx0XHRcdFx0Ly8gPHRleHRhcmVhPiB1c2VzIGB2YWx1ZWAgaW5zdGVhZCBvZiBgbm9kZVZhbHVlYC5cclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LnZhbHVlID0gZGF0YVxyXG5cdFx0XHR9IGVsc2UgaWYgKGVkaXRhYmxlKSB7XHJcblx0XHRcdFx0Ly8gY29udGVudGVkaXRhYmxlIG5vZGVzIHVzZSBgaW5uZXJIVE1MYCBpbnN0ZWFkIG9mIGBub2RlVmFsdWVgLlxyXG5cdFx0XHRcdGVkaXRhYmxlLmlubmVySFRNTCA9IGRhdGFcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyB3YXMgYSB0cnVzdGVkIHN0cmluZ1xyXG5cdFx0XHRcdGlmIChub2Rlc1swXS5ub2RlVHlwZSA9PT0gMSB8fCBub2Rlcy5sZW5ndGggPiAxIHx8XHJcblx0XHRcdFx0XHRcdChub2Rlc1swXS5ub2RlVmFsdWUudHJpbSAmJlxyXG5cdFx0XHRcdFx0XHRcdCFub2Rlc1swXS5ub2RlVmFsdWUudHJpbSgpKSkge1xyXG5cdFx0XHRcdFx0Y2xlYXIoY2FjaGVkLm5vZGVzLCBjYWNoZWQpXHJcblx0XHRcdFx0XHRub2RlcyA9IFskZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSldXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpbmplY3RUZXh0Tm9kZShwYXJlbnRFbGVtZW50LCBub2Rlc1swXSwgaW5kZXgsIGRhdGEpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhY2hlZCA9IG5ldyBkYXRhLmNvbnN0cnVjdG9yKGRhdGEpXHJcblx0XHRjYWNoZWQubm9kZXMgPSBub2Rlc1xyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlVGV4dE5vZGUoXHJcblx0XHRjYWNoZWQsXHJcblx0XHRkYXRhLFxyXG5cdFx0aW5kZXgsXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdHBhcmVudFRhZ1xyXG5cdCkge1xyXG5cdFx0aWYgKCFjYWNoZWQubm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVOb25leGlzdGVudE5vZGVzKGRhdGEsIHBhcmVudEVsZW1lbnQsIGluZGV4KVxyXG5cdFx0fSBlbHNlIGlmIChjYWNoZWQudmFsdWVPZigpICE9PSBkYXRhLnZhbHVlT2YoKSB8fCBzaG91bGRSZWF0dGFjaCkge1xyXG5cdFx0XHRyZXR1cm4gcmVhdHRhY2hOb2RlcyhkYXRhLCBjYWNoZWQsIHBhcmVudEVsZW1lbnQsIGVkaXRhYmxlLCBpbmRleCxcclxuXHRcdFx0XHRwYXJlbnRUYWcpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gKGNhY2hlZC5ub2Rlcy5pbnRhY3QgPSB0cnVlLCBjYWNoZWQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRTdWJBcnJheUNvdW50KGl0ZW0pIHtcclxuXHRcdGlmIChpdGVtLiR0cnVzdGVkKSB7XHJcblx0XHRcdC8vIGZpeCBvZmZzZXQgb2YgbmV4dCBlbGVtZW50IGlmIGl0ZW0gd2FzIGEgdHJ1c3RlZCBzdHJpbmcgdy8gbW9yZVxyXG5cdFx0XHQvLyB0aGFuIG9uZSBodG1sIGVsZW1lbnRcclxuXHRcdFx0Ly8gdGhlIGZpcnN0IGNsYXVzZSBpbiB0aGUgcmVnZXhwIG1hdGNoZXMgZWxlbWVudHNcclxuXHRcdFx0Ly8gdGhlIHNlY29uZCBjbGF1c2UgKGFmdGVyIHRoZSBwaXBlKSBtYXRjaGVzIHRleHQgbm9kZXNcclxuXHRcdFx0dmFyIG1hdGNoID0gaXRlbS5tYXRjaCgvPFteXFwvXXxcXD5cXHMqW148XS9nKVxyXG5cdFx0XHRpZiAobWF0Y2ggIT0gbnVsbCkgcmV0dXJuIG1hdGNoLmxlbmd0aFxyXG5cdFx0fSBlbHNlIGlmIChpc0FycmF5KGl0ZW0pKSB7XHJcblx0XHRcdHJldHVybiBpdGVtLmxlbmd0aFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIDFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkQXJyYXkoXHJcblx0XHRkYXRhLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdGluZGV4LFxyXG5cdFx0cGFyZW50VGFnLFxyXG5cdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdGNvbmZpZ3NcclxuXHQpIHtcclxuXHRcdGRhdGEgPSBmbGF0dGVuKGRhdGEpXHJcblx0XHR2YXIgbm9kZXMgPSBbXVxyXG5cdFx0dmFyIGludGFjdCA9IGNhY2hlZC5sZW5ndGggPT09IGRhdGEubGVuZ3RoXHJcblx0XHR2YXIgc3ViQXJyYXlDb3VudCA9IDBcclxuXHJcblx0XHQvLyBrZXlzIGFsZ29yaXRobTogc29ydCBlbGVtZW50cyB3aXRob3V0IHJlY3JlYXRpbmcgdGhlbSBpZiBrZXlzIGFyZVxyXG5cdFx0Ly8gcHJlc2VudFxyXG5cdFx0Ly9cclxuXHRcdC8vIDEpIGNyZWF0ZSBhIG1hcCBvZiBhbGwgZXhpc3Rpbmcga2V5cywgYW5kIG1hcmsgYWxsIGZvciBkZWxldGlvblxyXG5cdFx0Ly8gMikgYWRkIG5ldyBrZXlzIHRvIG1hcCBhbmQgbWFyayB0aGVtIGZvciBhZGRpdGlvblxyXG5cdFx0Ly8gMykgaWYga2V5IGV4aXN0cyBpbiBuZXcgbGlzdCwgY2hhbmdlIGFjdGlvbiBmcm9tIGRlbGV0aW9uIHRvIGEgbW92ZVxyXG5cdFx0Ly8gNCkgZm9yIGVhY2gga2V5LCBoYW5kbGUgaXRzIGNvcnJlc3BvbmRpbmcgYWN0aW9uIGFzIG1hcmtlZCBpblxyXG5cdFx0Ly8gICAgcHJldmlvdXMgc3RlcHNcclxuXHJcblx0XHR2YXIgZXhpc3RpbmcgPSB7fVxyXG5cdFx0dmFyIHNob3VsZE1haW50YWluSWRlbnRpdGllcyA9IGZhbHNlXHJcblxyXG5cdFx0Zm9yS2V5cyhjYWNoZWQsIGZ1bmN0aW9uIChhdHRycywgaSkge1xyXG5cdFx0XHRzaG91bGRNYWludGFpbklkZW50aXRpZXMgPSB0cnVlXHJcblx0XHRcdGV4aXN0aW5nW2NhY2hlZFtpXS5hdHRycy5rZXldID0ge2FjdGlvbjogREVMRVRJT04sIGluZGV4OiBpfVxyXG5cdFx0fSlcclxuXHJcblx0XHRidWlsZEFycmF5S2V5cyhkYXRhKVxyXG5cdFx0aWYgKHNob3VsZE1haW50YWluSWRlbnRpdGllcykge1xyXG5cdFx0XHRjYWNoZWQgPSBkaWZmS2V5cyhkYXRhLCBjYWNoZWQsIGV4aXN0aW5nLCBwYXJlbnRFbGVtZW50KVxyXG5cdFx0fVxyXG5cdFx0Ly8gZW5kIGtleSBhbGdvcml0aG1cclxuXHJcblx0XHR2YXIgY2FjaGVDb3VudCA9IDBcclxuXHRcdC8vIGZhc3RlciBleHBsaWNpdGx5IHdyaXR0ZW5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBkYXRhLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdC8vIGRpZmYgZWFjaCBpdGVtIGluIHRoZSBhcnJheVxyXG5cdFx0XHR2YXIgaXRlbSA9IGJ1aWxkKFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0cGFyZW50VGFnLFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRpbmRleCxcclxuXHRcdFx0XHRkYXRhW2ldLFxyXG5cdFx0XHRcdGNhY2hlZFtjYWNoZUNvdW50XSxcclxuXHRcdFx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdFx0XHRpbmRleCArIHN1YkFycmF5Q291bnQgfHwgc3ViQXJyYXlDb3VudCxcclxuXHRcdFx0XHRlZGl0YWJsZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0Y29uZmlncylcclxuXHJcblx0XHRcdGlmIChpdGVtICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRpbnRhY3QgPSBpbnRhY3QgJiYgaXRlbS5ub2Rlcy5pbnRhY3RcclxuXHRcdFx0XHRzdWJBcnJheUNvdW50ICs9IGdldFN1YkFycmF5Q291bnQoaXRlbSlcclxuXHRcdFx0XHRjYWNoZWRbY2FjaGVDb3VudCsrXSA9IGl0ZW1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaW50YWN0KSBkaWZmQXJyYXkoZGF0YSwgY2FjaGVkLCBub2RlcylcclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG1ha2VDYWNoZShkYXRhLCBjYWNoZWQsIGluZGV4LCBwYXJlbnRJbmRleCwgcGFyZW50Q2FjaGUpIHtcclxuXHRcdGlmIChjYWNoZWQgIT0gbnVsbCkge1xyXG5cdFx0XHRpZiAodHlwZS5jYWxsKGNhY2hlZCkgPT09IHR5cGUuY2FsbChkYXRhKSkgcmV0dXJuIGNhY2hlZFxyXG5cclxuXHRcdFx0aWYgKHBhcmVudENhY2hlICYmIHBhcmVudENhY2hlLm5vZGVzKSB7XHJcblx0XHRcdFx0dmFyIG9mZnNldCA9IGluZGV4IC0gcGFyZW50SW5kZXhcclxuXHRcdFx0XHR2YXIgZW5kID0gb2Zmc2V0ICsgKGlzQXJyYXkoZGF0YSkgPyBkYXRhIDogY2FjaGVkLm5vZGVzKS5sZW5ndGhcclxuXHRcdFx0XHRjbGVhcihcclxuXHRcdFx0XHRcdHBhcmVudENhY2hlLm5vZGVzLnNsaWNlKG9mZnNldCwgZW5kKSxcclxuXHRcdFx0XHRcdHBhcmVudENhY2hlLnNsaWNlKG9mZnNldCwgZW5kKSlcclxuXHRcdFx0fSBlbHNlIGlmIChjYWNoZWQubm9kZXMpIHtcclxuXHRcdFx0XHRjbGVhcihjYWNoZWQubm9kZXMsIGNhY2hlZClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhY2hlZCA9IG5ldyBkYXRhLmNvbnN0cnVjdG9yKClcclxuXHRcdC8vIGlmIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYSB2aXJ0dWFsIGRvbSBlbGVtZW50LCB1c2UgYSBibGFuayBvYmplY3QgYXNcclxuXHRcdC8vIHRoZSBiYXNlIGNhY2hlZCBub2RlIGluc3RlYWQgb2YgY29weWluZyB0aGUgdmlydHVhbCBlbCAoIzI3NylcclxuXHRcdGlmIChjYWNoZWQudGFnKSBjYWNoZWQgPSB7fVxyXG5cdFx0Y2FjaGVkLm5vZGVzID0gW11cclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNvbnN0cnVjdE5vZGUoZGF0YSwgbmFtZXNwYWNlKSB7XHJcblx0XHRpZiAoZGF0YS5hdHRycy5pcykge1xyXG5cdFx0XHRpZiAobmFtZXNwYWNlID09IG51bGwpIHtcclxuXHRcdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZGF0YS50YWcsIGRhdGEuYXR0cnMuaXMpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuICRkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlLCBkYXRhLnRhZyxcclxuXHRcdFx0XHRcdGRhdGEuYXR0cnMuaXMpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAobmFtZXNwYWNlID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KGRhdGEudGFnKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuICRkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlLCBkYXRhLnRhZylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNvbnN0cnVjdEF0dHJzKGRhdGEsIG5vZGUsIG5hbWVzcGFjZSwgaGFzS2V5cykge1xyXG5cdFx0aWYgKGhhc0tleXMpIHtcclxuXHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMobm9kZSwgZGF0YS50YWcsIGRhdGEuYXR0cnMsIHt9LCBuYW1lc3BhY2UpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS5hdHRyc1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29uc3RydWN0Q2hpbGRyZW4oXHJcblx0XHRkYXRhLFxyXG5cdFx0bm9kZSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0aWYgKGRhdGEuY2hpbGRyZW4gIT0gbnVsbCAmJiBkYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIGJ1aWxkKFxyXG5cdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0ZGF0YS50YWcsXHJcblx0XHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0XHRkYXRhLmNoaWxkcmVuLFxyXG5cdFx0XHRcdGNhY2hlZC5jaGlsZHJlbixcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdDAsXHJcblx0XHRcdFx0ZGF0YS5hdHRycy5jb250ZW50ZWRpdGFibGUgPyBub2RlIDogZWRpdGFibGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdGNvbmZpZ3MpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZGF0YS5jaGlsZHJlblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVjb25zdHJ1Y3RDYWNoZWQoXHJcblx0XHRkYXRhLFxyXG5cdFx0YXR0cnMsXHJcblx0XHRjaGlsZHJlbixcclxuXHRcdG5vZGUsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHR2aWV3cyxcclxuXHRcdGNvbnRyb2xsZXJzXHJcblx0KSB7XHJcblx0XHR2YXIgY2FjaGVkID0ge1xyXG5cdFx0XHR0YWc6IGRhdGEudGFnLFxyXG5cdFx0XHRhdHRyczogYXR0cnMsXHJcblx0XHRcdGNoaWxkcmVuOiBjaGlsZHJlbixcclxuXHRcdFx0bm9kZXM6IFtub2RlXVxyXG5cdFx0fVxyXG5cclxuXHRcdHVubG9hZENhY2hlZENvbnRyb2xsZXJzKGNhY2hlZCwgdmlld3MsIGNvbnRyb2xsZXJzKVxyXG5cclxuXHRcdGlmIChjYWNoZWQuY2hpbGRyZW4gJiYgIWNhY2hlZC5jaGlsZHJlbi5ub2Rlcykge1xyXG5cdFx0XHRjYWNoZWQuY2hpbGRyZW4ubm9kZXMgPSBbXVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGVkZ2UgY2FzZTogc2V0dGluZyB2YWx1ZSBvbiA8c2VsZWN0PiBkb2Vzbid0IHdvcmsgYmVmb3JlIGNoaWxkcmVuXHJcblx0XHQvLyBleGlzdCwgc28gc2V0IGl0IGFnYWluIGFmdGVyIGNoaWxkcmVuIGhhdmUgYmVlbiBjcmVhdGVkXHJcblx0XHRpZiAoZGF0YS50YWcgPT09IFwic2VsZWN0XCIgJiYgXCJ2YWx1ZVwiIGluIGRhdGEuYXR0cnMpIHtcclxuXHRcdFx0c2V0QXR0cmlidXRlcyhub2RlLCBkYXRhLnRhZywge3ZhbHVlOiBkYXRhLmF0dHJzLnZhbHVlfSwge30sXHJcblx0XHRcdFx0bmFtZXNwYWNlKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldENvbnRyb2xsZXIodmlld3MsIHZpZXcsIGNhY2hlZENvbnRyb2xsZXJzLCBjb250cm9sbGVyKSB7XHJcblx0XHR2YXIgY29udHJvbGxlckluZGV4XHJcblxyXG5cdFx0aWYgKG0ucmVkcmF3LnN0cmF0ZWd5KCkgPT09IFwiZGlmZlwiICYmIHZpZXdzKSB7XHJcblx0XHRcdGNvbnRyb2xsZXJJbmRleCA9IHZpZXdzLmluZGV4T2YodmlldylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnRyb2xsZXJJbmRleCA9IC0xXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbnRyb2xsZXJJbmRleCA+IC0xKSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWRDb250cm9sbGVyc1tjb250cm9sbGVySW5kZXhdXHJcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oY29udHJvbGxlcikpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBjb250cm9sbGVyKClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB7fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIHVubG9hZGVycyA9IFtdXHJcblxyXG5cdGZ1bmN0aW9uIHVwZGF0ZUxpc3RzKHZpZXdzLCBjb250cm9sbGVycywgdmlldywgY29udHJvbGxlcikge1xyXG5cdFx0aWYgKGNvbnRyb2xsZXIub251bmxvYWQgIT0gbnVsbCAmJiB1bmxvYWRlcnMubWFwKGZ1bmN0aW9uKHUpIHtyZXR1cm4gdS5oYW5kbGVyfSkuaW5kZXhPZihjb250cm9sbGVyLm9udW5sb2FkKSA8IDApIHtcclxuXHRcdFx0dW5sb2FkZXJzLnB1c2goe1xyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXHJcblx0XHRcdFx0aGFuZGxlcjogY29udHJvbGxlci5vbnVubG9hZFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHZpZXdzLnB1c2godmlldylcclxuXHRcdGNvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcilcclxuXHR9XHJcblxyXG5cdHZhciBmb3JjaW5nID0gZmFsc2VcclxuXHRmdW5jdGlvbiBjaGVja1ZpZXcoZGF0YSwgdmlldywgY2FjaGVkLCBjYWNoZWRDb250cm9sbGVycywgY29udHJvbGxlcnMsIHZpZXdzKSB7XHJcblx0XHR2YXIgY29udHJvbGxlciA9IGdldENvbnRyb2xsZXIoY2FjaGVkLnZpZXdzLCB2aWV3LCBjYWNoZWRDb250cm9sbGVycywgZGF0YS5jb250cm9sbGVyKVxyXG5cdFx0dmFyIGtleSA9IGRhdGEgJiYgZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmtleVxyXG5cdFx0ZGF0YSA9IHBlbmRpbmdSZXF1ZXN0cyA9PT0gMCB8fCBmb3JjaW5nIHx8IGNhY2hlZENvbnRyb2xsZXJzICYmIGNhY2hlZENvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlcikgPiAtMSA/IGRhdGEudmlldyhjb250cm9sbGVyKSA6IHt0YWc6IFwicGxhY2Vob2xkZXJcIn1cclxuXHRcdGlmIChkYXRhLnN1YnRyZWUgPT09IFwicmV0YWluXCIpIHJldHVybiBkYXRhO1xyXG5cdFx0ZGF0YS5hdHRycyA9IGRhdGEuYXR0cnMgfHwge31cclxuXHRcdGRhdGEuYXR0cnMua2V5ID0ga2V5XHJcblx0XHR1cGRhdGVMaXN0cyh2aWV3cywgY29udHJvbGxlcnMsIHZpZXcsIGNvbnRyb2xsZXIpXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbWFya1ZpZXdzKGRhdGEsIGNhY2hlZCwgdmlld3MsIGNvbnRyb2xsZXJzKSB7XHJcblx0XHR2YXIgY2FjaGVkQ29udHJvbGxlcnMgPSBjYWNoZWQgJiYgY2FjaGVkLmNvbnRyb2xsZXJzXHJcblxyXG5cdFx0d2hpbGUgKGRhdGEudmlldyAhPSBudWxsKSB7XHJcblx0XHRcdGRhdGEgPSBjaGVja1ZpZXcoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRkYXRhLnZpZXcuJG9yaWdpbmFsIHx8IGRhdGEudmlldyxcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0Y2FjaGVkQ29udHJvbGxlcnMsXHJcblx0XHRcdFx0Y29udHJvbGxlcnMsXHJcblx0XHRcdFx0dmlld3MpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkT2JqZWN0KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1zdGF0ZW1lbnRzXHJcblx0XHRkYXRhLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0aW5kZXgsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdGNvbmZpZ3NcclxuXHQpIHtcclxuXHRcdHZhciB2aWV3cyA9IFtdXHJcblx0XHR2YXIgY29udHJvbGxlcnMgPSBbXVxyXG5cclxuXHRcdGRhdGEgPSBtYXJrVmlld3MoZGF0YSwgY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpXHJcblxyXG5cdFx0aWYgKGRhdGEuc3VidHJlZSA9PT0gXCJyZXRhaW5cIikgcmV0dXJuIGNhY2hlZFxyXG5cclxuXHRcdGlmICghZGF0YS50YWcgJiYgY29udHJvbGxlcnMubGVuZ3RoKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCB0ZW1wbGF0ZSBtdXN0IHJldHVybiBhIHZpcnR1YWwgXCIgK1xyXG5cdFx0XHRcdFwiZWxlbWVudCwgbm90IGFuIGFycmF5LCBzdHJpbmcsIGV0Yy5cIilcclxuXHRcdH1cclxuXHJcblx0XHRkYXRhLmF0dHJzID0gZGF0YS5hdHRycyB8fCB7fVxyXG5cdFx0Y2FjaGVkLmF0dHJzID0gY2FjaGVkLmF0dHJzIHx8IHt9XHJcblxyXG5cdFx0dmFyIGRhdGFBdHRyS2V5cyA9IE9iamVjdC5rZXlzKGRhdGEuYXR0cnMpXHJcblx0XHR2YXIgaGFzS2V5cyA9IGRhdGFBdHRyS2V5cy5sZW5ndGggPiAoXCJrZXlcIiBpbiBkYXRhLmF0dHJzID8gMSA6IDApXHJcblxyXG5cdFx0bWF5YmVSZWNyZWF0ZU9iamVjdChkYXRhLCBjYWNoZWQsIGRhdGFBdHRyS2V5cylcclxuXHJcblx0XHRpZiAoIWlzU3RyaW5nKGRhdGEudGFnKSkgcmV0dXJuXHJcblxyXG5cdFx0dmFyIGlzTmV3ID0gY2FjaGVkLm5vZGVzLmxlbmd0aCA9PT0gMFxyXG5cclxuXHRcdG5hbWVzcGFjZSA9IGdldE9iamVjdE5hbWVzcGFjZShkYXRhLCBuYW1lc3BhY2UpXHJcblxyXG5cdFx0dmFyIG5vZGVcclxuXHRcdGlmIChpc05ldykge1xyXG5cdFx0XHRub2RlID0gY29uc3RydWN0Tm9kZShkYXRhLCBuYW1lc3BhY2UpXHJcblx0XHRcdC8vIHNldCBhdHRyaWJ1dGVzIGZpcnN0LCB0aGVuIGNyZWF0ZSBjaGlsZHJlblxyXG5cdFx0XHR2YXIgYXR0cnMgPSBjb25zdHJ1Y3RBdHRycyhkYXRhLCBub2RlLCBuYW1lc3BhY2UsIGhhc0tleXMpXHJcblxyXG5cdFx0XHR2YXIgY2hpbGRyZW4gPSBjb25zdHJ1Y3RDaGlsZHJlbihkYXRhLCBub2RlLCBjYWNoZWQsIGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSwgY29uZmlncylcclxuXHJcblx0XHRcdGNhY2hlZCA9IHJlY29uc3RydWN0Q2FjaGVkKFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0YXR0cnMsXHJcblx0XHRcdFx0Y2hpbGRyZW4sXHJcblx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0dmlld3MsXHJcblx0XHRcdFx0Y29udHJvbGxlcnMpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlID0gYnVpbGRVcGRhdGVkTm9kZShcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRlZGl0YWJsZSxcclxuXHRcdFx0XHRoYXNLZXlzLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHR2aWV3cyxcclxuXHRcdFx0XHRjb25maWdzLFxyXG5cdFx0XHRcdGNvbnRyb2xsZXJzKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc05ldyB8fCBzaG91bGRSZWF0dGFjaCA9PT0gdHJ1ZSAmJiBub2RlICE9IG51bGwpIHtcclxuXHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBub2RlLCBpbmRleClcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUaGUgY29uZmlncyBhcmUgY2FsbGVkIGFmdGVyIGBidWlsZGAgZmluaXNoZXMgcnVubmluZ1xyXG5cdFx0c2NoZWR1bGVDb25maWdzVG9CZUNhbGxlZChjb25maWdzLCBkYXRhLCBub2RlLCBpc05ldywgY2FjaGVkKVxyXG5cclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkKFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdHBhcmVudFRhZyxcclxuXHRcdHBhcmVudENhY2hlLFxyXG5cdFx0cGFyZW50SW5kZXgsXHJcblx0XHRkYXRhLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRpbmRleCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0LypcclxuXHRcdCAqIGBidWlsZGAgaXMgYSByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBtYW5hZ2VzIGNyZWF0aW9uL2RpZmZpbmcvcmVtb3ZhbFxyXG5cdFx0ICogb2YgRE9NIGVsZW1lbnRzIGJhc2VkIG9uIGNvbXBhcmlzb24gYmV0d2VlbiBgZGF0YWAgYW5kIGBjYWNoZWRgIHRoZVxyXG5cdFx0ICogZGlmZiBhbGdvcml0aG0gY2FuIGJlIHN1bW1hcml6ZWQgYXMgdGhpczpcclxuXHRcdCAqXHJcblx0XHQgKiAxIC0gY29tcGFyZSBgZGF0YWAgYW5kIGBjYWNoZWRgXHJcblx0XHQgKiAyIC0gaWYgdGhleSBhcmUgZGlmZmVyZW50LCBjb3B5IGBkYXRhYCB0byBgY2FjaGVkYCBhbmQgdXBkYXRlIHRoZSBET01cclxuXHRcdCAqICAgICBiYXNlZCBvbiB3aGF0IHRoZSBkaWZmZXJlbmNlIGlzXHJcblx0XHQgKiAzIC0gcmVjdXJzaXZlbHkgYXBwbHkgdGhpcyBhbGdvcml0aG0gZm9yIGV2ZXJ5IGFycmF5IGFuZCBmb3IgdGhlXHJcblx0XHQgKiAgICAgY2hpbGRyZW4gb2YgZXZlcnkgdmlydHVhbCBlbGVtZW50XHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIGBjYWNoZWRgIGRhdGEgc3RydWN0dXJlIGlzIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91c1xyXG5cdFx0ICogcmVkcmF3J3MgYGRhdGFgIGRhdGEgc3RydWN0dXJlLCB3aXRoIGEgZmV3IGFkZGl0aW9uczpcclxuXHRcdCAqIC0gYGNhY2hlZGAgYWx3YXlzIGhhcyBhIHByb3BlcnR5IGNhbGxlZCBgbm9kZXNgLCB3aGljaCBpcyBhIGxpc3Qgb2ZcclxuXHRcdCAqICAgIERPTSBlbGVtZW50cyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhlIGRhdGEgcmVwcmVzZW50ZWQgYnkgdGhlXHJcblx0XHQgKiAgICByZXNwZWN0aXZlIHZpcnR1YWwgZWxlbWVudFxyXG5cdFx0ICogLSBpbiBvcmRlciB0byBzdXBwb3J0IGF0dGFjaGluZyBgbm9kZXNgIGFzIGEgcHJvcGVydHkgb2YgYGNhY2hlZGAsXHJcblx0XHQgKiAgICBgY2FjaGVkYCBpcyAqYWx3YXlzKiBhIG5vbi1wcmltaXRpdmUgb2JqZWN0LCBpLmUuIGlmIHRoZSBkYXRhIHdhc1xyXG5cdFx0ICogICAgYSBzdHJpbmcsIHRoZW4gY2FjaGVkIGlzIGEgU3RyaW5nIGluc3RhbmNlLiBJZiBkYXRhIHdhcyBgbnVsbGAgb3JcclxuXHRcdCAqICAgIGB1bmRlZmluZWRgLCBjYWNoZWQgaXMgYG5ldyBTdHJpbmcoXCJcIilgXHJcblx0XHQgKiAtIGBjYWNoZWQgYWxzbyBoYXMgYSBgY29uZmlnQ29udGV4dGAgcHJvcGVydHksIHdoaWNoIGlzIHRoZSBzdGF0ZVxyXG5cdFx0ICogICAgc3RvcmFnZSBvYmplY3QgZXhwb3NlZCBieSBjb25maWcoZWxlbWVudCwgaXNJbml0aWFsaXplZCwgY29udGV4dClcclxuXHRcdCAqIC0gd2hlbiBgY2FjaGVkYCBpcyBhbiBPYmplY3QsIGl0IHJlcHJlc2VudHMgYSB2aXJ0dWFsIGVsZW1lbnQ7IHdoZW5cclxuXHRcdCAqICAgIGl0J3MgYW4gQXJyYXksIGl0IHJlcHJlc2VudHMgYSBsaXN0IG9mIGVsZW1lbnRzOyB3aGVuIGl0J3MgYVxyXG5cdFx0ICogICAgU3RyaW5nLCBOdW1iZXIgb3IgQm9vbGVhbiwgaXQgcmVwcmVzZW50cyBhIHRleHQgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIGBwYXJlbnRFbGVtZW50YCBpcyBhIERPTSBlbGVtZW50IHVzZWQgZm9yIFczQyBET00gQVBJIGNhbGxzXHJcblx0XHQgKiBgcGFyZW50VGFnYCBpcyBvbmx5IHVzZWQgZm9yIGhhbmRsaW5nIGEgY29ybmVyIGNhc2UgZm9yIHRleHRhcmVhXHJcblx0XHQgKiB2YWx1ZXNcclxuXHRcdCAqIGBwYXJlbnRDYWNoZWAgaXMgdXNlZCB0byByZW1vdmUgbm9kZXMgaW4gc29tZSBtdWx0aS1ub2RlIGNhc2VzXHJcblx0XHQgKiBgcGFyZW50SW5kZXhgIGFuZCBgaW5kZXhgIGFyZSB1c2VkIHRvIGZpZ3VyZSBvdXQgdGhlIG9mZnNldCBvZiBub2Rlcy5cclxuXHRcdCAqIFRoZXkncmUgYXJ0aWZhY3RzIGZyb20gYmVmb3JlIGFycmF5cyBzdGFydGVkIGJlaW5nIGZsYXR0ZW5lZCBhbmQgYXJlXHJcblx0XHQgKiBsaWtlbHkgcmVmYWN0b3JhYmxlXHJcblx0XHQgKiBgZGF0YWAgYW5kIGBjYWNoZWRgIGFyZSwgcmVzcGVjdGl2ZWx5LCB0aGUgbmV3IGFuZCBvbGQgbm9kZXMgYmVpbmdcclxuXHRcdCAqIGRpZmZlZFxyXG5cdFx0ICogYHNob3VsZFJlYXR0YWNoYCBpcyBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGEgcGFyZW50IG5vZGUgd2FzXHJcblx0XHQgKiByZWNyZWF0ZWQgKGlmIHNvLCBhbmQgaWYgdGhpcyBub2RlIGlzIHJldXNlZCwgdGhlbiB0aGlzIG5vZGUgbXVzdFxyXG5cdFx0ICogcmVhdHRhY2ggaXRzZWxmIHRvIHRoZSBuZXcgcGFyZW50KVxyXG5cdFx0ICogYGVkaXRhYmxlYCBpcyBhIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBhbiBhbmNlc3RvciBpc1xyXG5cdFx0ICogY29udGVudGVkaXRhYmxlXHJcblx0XHQgKiBgbmFtZXNwYWNlYCBpbmRpY2F0ZXMgdGhlIGNsb3Nlc3QgSFRNTCBuYW1lc3BhY2UgYXMgaXQgY2FzY2FkZXMgZG93blxyXG5cdFx0ICogZnJvbSBhbiBhbmNlc3RvclxyXG5cdFx0ICogYGNvbmZpZ3NgIGlzIGEgbGlzdCBvZiBjb25maWcgZnVuY3Rpb25zIHRvIHJ1biBhZnRlciB0aGUgdG9wbW9zdFxyXG5cdFx0ICogYGJ1aWxkYCBjYWxsIGZpbmlzaGVzIHJ1bm5pbmdcclxuXHRcdCAqXHJcblx0XHQgKiB0aGVyZSdzIGxvZ2ljIHRoYXQgcmVsaWVzIG9uIHRoZSBhc3N1bXB0aW9uIHRoYXQgbnVsbCBhbmQgdW5kZWZpbmVkXHJcblx0XHQgKiBkYXRhIGFyZSBlcXVpdmFsZW50IHRvIGVtcHR5IHN0cmluZ3NcclxuXHRcdCAqIC0gdGhpcyBwcmV2ZW50cyBsaWZlY3ljbGUgc3VycHJpc2VzIGZyb20gcHJvY2VkdXJhbCBoZWxwZXJzIHRoYXQgbWl4XHJcblx0XHQgKiAgIGltcGxpY2l0IGFuZCBleHBsaWNpdCByZXR1cm4gc3RhdGVtZW50cyAoZS5nLlxyXG5cdFx0ICogICBmdW5jdGlvbiBmb28oKSB7aWYgKGNvbmQpIHJldHVybiBtKFwiZGl2XCIpfVxyXG5cdFx0ICogLSBpdCBzaW1wbGlmaWVzIGRpZmZpbmcgY29kZVxyXG5cdFx0ICovXHJcblx0XHRkYXRhID0gZGF0YVRvU3RyaW5nKGRhdGEpXHJcblx0XHRpZiAoZGF0YS5zdWJ0cmVlID09PSBcInJldGFpblwiKSByZXR1cm4gY2FjaGVkXHJcblx0XHRjYWNoZWQgPSBtYWtlQ2FjaGUoZGF0YSwgY2FjaGVkLCBpbmRleCwgcGFyZW50SW5kZXgsIHBhcmVudENhY2hlKVxyXG5cclxuXHRcdGlmIChpc0FycmF5KGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBidWlsZEFycmF5KFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0cGFyZW50VGFnLFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhICE9IG51bGwgJiYgaXNPYmplY3QoZGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIGJ1aWxkT2JqZWN0KFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdGNvbmZpZ3MpXHJcblx0XHR9IGVsc2UgaWYgKCFpc0Z1bmN0aW9uKGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVUZXh0Tm9kZShcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRpbmRleCxcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdHBhcmVudFRhZylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNvcnRDaGFuZ2VzKGEsIGIpIHtcclxuXHRcdHJldHVybiBhLmFjdGlvbiAtIGIuYWN0aW9uIHx8IGEuaW5kZXggLSBiLmluZGV4XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb3B5U3R5bGVBdHRycyhub2RlLCBkYXRhQXR0ciwgY2FjaGVkQXR0cikge1xyXG5cdFx0Zm9yICh2YXIgcnVsZSBpbiBkYXRhQXR0cikgaWYgKGhhc093bi5jYWxsKGRhdGFBdHRyLCBydWxlKSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkQXR0ciA9PSBudWxsIHx8IGNhY2hlZEF0dHJbcnVsZV0gIT09IGRhdGFBdHRyW3J1bGVdKSB7XHJcblx0XHRcdFx0bm9kZS5zdHlsZVtydWxlXSA9IGRhdGFBdHRyW3J1bGVdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHJ1bGUgaW4gY2FjaGVkQXR0cikgaWYgKGhhc093bi5jYWxsKGNhY2hlZEF0dHIsIHJ1bGUpKSB7XHJcblx0XHRcdGlmICghaGFzT3duLmNhbGwoZGF0YUF0dHIsIHJ1bGUpKSBub2RlLnN0eWxlW3J1bGVdID0gXCJcIlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIHNob3VsZFVzZVNldEF0dHJpYnV0ZSA9IHtcclxuXHRcdGxpc3Q6IDEsXHJcblx0XHRzdHlsZTogMSxcclxuXHRcdGZvcm06IDEsXHJcblx0XHR0eXBlOiAxLFxyXG5cdFx0d2lkdGg6IDEsXHJcblx0XHRoZWlnaHQ6IDFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldFNpbmdsZUF0dHIoXHJcblx0XHRub2RlLFxyXG5cdFx0YXR0ck5hbWUsXHJcblx0XHRkYXRhQXR0cixcclxuXHRcdGNhY2hlZEF0dHIsXHJcblx0XHR0YWcsXHJcblx0XHRuYW1lc3BhY2VcclxuXHQpIHtcclxuXHRcdGlmIChhdHRyTmFtZSA9PT0gXCJjb25maWdcIiB8fCBhdHRyTmFtZSA9PT0gXCJrZXlcIikge1xyXG5cdFx0XHQvLyBgY29uZmlnYCBpc24ndCBhIHJlYWwgYXR0cmlidXRlLCBzbyBpZ25vcmUgaXRcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihkYXRhQXR0cikgJiYgYXR0ck5hbWUuc2xpY2UoMCwgMikgPT09IFwib25cIikge1xyXG5cdFx0XHQvLyBob29rIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBhdXRvLXJlZHJhd2luZyBzeXN0ZW1cclxuXHRcdFx0bm9kZVthdHRyTmFtZV0gPSBhdXRvcmVkcmF3KGRhdGFBdHRyLCBub2RlKVxyXG5cdFx0fSBlbHNlIGlmIChhdHRyTmFtZSA9PT0gXCJzdHlsZVwiICYmIGRhdGFBdHRyICE9IG51bGwgJiZcclxuXHRcdFx0XHRpc09iamVjdChkYXRhQXR0cikpIHtcclxuXHRcdFx0Ly8gaGFuZGxlIGBzdHlsZTogey4uLn1gXHJcblx0XHRcdGNvcHlTdHlsZUF0dHJzKG5vZGUsIGRhdGFBdHRyLCBjYWNoZWRBdHRyKVxyXG5cdFx0fSBlbHNlIGlmIChuYW1lc3BhY2UgIT0gbnVsbCkge1xyXG5cdFx0XHQvLyBoYW5kbGUgU1ZHXHJcblx0XHRcdGlmIChhdHRyTmFtZSA9PT0gXCJocmVmXCIpIHtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxyXG5cdFx0XHRcdFx0XCJocmVmXCIsIGRhdGFBdHRyKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKFxyXG5cdFx0XHRcdFx0YXR0ck5hbWUgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBhdHRyTmFtZSxcclxuXHRcdFx0XHRcdGRhdGFBdHRyKVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGF0dHJOYW1lIGluIG5vZGUgJiYgIXNob3VsZFVzZVNldEF0dHJpYnV0ZVthdHRyTmFtZV0pIHtcclxuXHRcdFx0Ly8gaGFuZGxlIGNhc2VzIHRoYXQgYXJlIHByb3BlcnRpZXMgKGJ1dCBpZ25vcmUgY2FzZXMgd2hlcmUgd2VcclxuXHRcdFx0Ly8gc2hvdWxkIHVzZSBzZXRBdHRyaWJ1dGUgaW5zdGVhZClcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gLSBsaXN0IGFuZCBmb3JtIGFyZSB0eXBpY2FsbHkgdXNlZCBhcyBzdHJpbmdzLCBidXQgYXJlIERPTVxyXG5cdFx0XHQvLyAgIGVsZW1lbnQgcmVmZXJlbmNlcyBpbiBqc1xyXG5cdFx0XHQvL1xyXG5cdFx0XHQvLyAtIHdoZW4gdXNpbmcgQ1NTIHNlbGVjdG9ycyAoZS5nLiBgbShcIltzdHlsZT0nJ11cIilgKSwgc3R5bGUgaXNcclxuXHRcdFx0Ly8gICB1c2VkIGFzIGEgc3RyaW5nLCBidXQgaXQncyBhbiBvYmplY3QgaW4ganNcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gIzM0OCBkb24ndCBzZXQgdGhlIHZhbHVlIGlmIG5vdCBuZWVkZWQgLSBvdGhlcndpc2UsIGN1cnNvclxyXG5cdFx0XHQvLyBwbGFjZW1lbnQgYnJlYWtzIGluIENocm9tZVxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmICh0YWcgIT09IFwiaW5wdXRcIiB8fCBub2RlW2F0dHJOYW1lXSAhPT0gZGF0YUF0dHIpIHtcclxuXHRcdFx0XHRcdG5vZGVbYXR0ck5hbWVdID0gZGF0YUF0dHJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgZGF0YUF0dHIpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Ugbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGRhdGFBdHRyKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdHJ5U2V0QXR0cihcclxuXHRcdG5vZGUsXHJcblx0XHRhdHRyTmFtZSxcclxuXHRcdGRhdGFBdHRyLFxyXG5cdFx0Y2FjaGVkQXR0cixcclxuXHRcdGNhY2hlZEF0dHJzLFxyXG5cdFx0dGFnLFxyXG5cdFx0bmFtZXNwYWNlXHJcblx0KSB7XHJcblx0XHRpZiAoIShhdHRyTmFtZSBpbiBjYWNoZWRBdHRycykgfHwgKGNhY2hlZEF0dHIgIT09IGRhdGFBdHRyKSkge1xyXG5cdFx0XHRjYWNoZWRBdHRyc1thdHRyTmFtZV0gPSBkYXRhQXR0clxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBzZXRTaW5nbGVBdHRyKFxyXG5cdFx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRcdGF0dHJOYW1lLFxyXG5cdFx0XHRcdFx0ZGF0YUF0dHIsXHJcblx0XHRcdFx0XHRjYWNoZWRBdHRyLFxyXG5cdFx0XHRcdFx0dGFnLFxyXG5cdFx0XHRcdFx0bmFtZXNwYWNlKVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Ly8gc3dhbGxvdyBJRSdzIGludmFsaWQgYXJndW1lbnQgZXJyb3JzIHRvIG1pbWljIEhUTUwnc1xyXG5cdFx0XHRcdC8vIGZhbGxiYWNrLXRvLWRvaW5nLW5vdGhpbmctb24taW52YWxpZC1hdHRyaWJ1dGVzIGJlaGF2aW9yXHJcblx0XHRcdFx0aWYgKGUubWVzc2FnZS5pbmRleE9mKFwiSW52YWxpZCBhcmd1bWVudFwiKSA8IDApIHRocm93IGVcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhdHRyTmFtZSA9PT0gXCJ2YWx1ZVwiICYmIHRhZyA9PT0gXCJpbnB1dFwiICYmXHJcblx0XHRcdFx0bm9kZS52YWx1ZSAhPT0gZGF0YUF0dHIpIHtcclxuXHRcdFx0Ly8gIzM0OCBkYXRhQXR0ciBtYXkgbm90IGJlIGEgc3RyaW5nLCBzbyB1c2UgbG9vc2UgY29tcGFyaXNvblxyXG5cdFx0XHRub2RlLnZhbHVlID0gZGF0YUF0dHJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMobm9kZSwgdGFnLCBkYXRhQXR0cnMsIGNhY2hlZEF0dHJzLCBuYW1lc3BhY2UpIHtcclxuXHRcdGZvciAodmFyIGF0dHJOYW1lIGluIGRhdGFBdHRycykgaWYgKGhhc093bi5jYWxsKGRhdGFBdHRycywgYXR0ck5hbWUpKSB7XHJcblx0XHRcdGlmICh0cnlTZXRBdHRyKFxyXG5cdFx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRcdGF0dHJOYW1lLFxyXG5cdFx0XHRcdFx0ZGF0YUF0dHJzW2F0dHJOYW1lXSxcclxuXHRcdFx0XHRcdGNhY2hlZEF0dHJzW2F0dHJOYW1lXSxcclxuXHRcdFx0XHRcdGNhY2hlZEF0dHJzLFxyXG5cdFx0XHRcdFx0dGFnLFxyXG5cdFx0XHRcdFx0bmFtZXNwYWNlKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjYWNoZWRBdHRyc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2xlYXIobm9kZXMsIGNhY2hlZCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IG5vZGVzLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XHJcblx0XHRcdGlmIChub2Rlc1tpXSAmJiBub2Rlc1tpXS5wYXJlbnROb2RlKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG5vZGVzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZXNbaV0pXHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG5cdFx0XHRcdFx0Ly8gaWdub3JlIGlmIHRoaXMgZmFpbHMgZHVlIHRvIG9yZGVyIG9mIGV2ZW50cyAoc2VlXHJcblx0XHRcdFx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxOTI2MDgzL2ZhaWxlZC10by1leGVjdXRlLXJlbW92ZWNoaWxkLW9uLW5vZGUpXHJcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FjaGVkID0gW10uY29uY2F0KGNhY2hlZClcclxuXHRcdFx0XHRpZiAoY2FjaGVkW2ldKSB1bmxvYWQoY2FjaGVkW2ldKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpZiBub2RlcyBpcyBhbiBhcnJheS4gVGhpcyBjaGVjayBzaG91bGQgZmFpbCBpZiBub2Rlc1xyXG5cdFx0Ly8gaXMgYSBOb2RlTGlzdCAoc2VlIGxvb3AgYWJvdmUpXHJcblx0XHRpZiAobm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdG5vZGVzLmxlbmd0aCA9IDBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHVubG9hZChjYWNoZWQpIHtcclxuXHRcdGlmIChjYWNoZWQuY29uZmlnQ29udGV4dCAmJiBpc0Z1bmN0aW9uKGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKSkge1xyXG5cdFx0XHRjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCgpXHJcblx0XHRcdGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkID0gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGNhY2hlZC5jb250cm9sbGVycykge1xyXG5cdFx0XHRmb3JFYWNoKGNhY2hlZC5jb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRpZiAoaXNGdW5jdGlvbihjb250cm9sbGVyLm9udW5sb2FkKSkge1xyXG5cdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZCh7cHJldmVudERlZmF1bHQ6IG5vb3B9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdGlmIChjYWNoZWQuY2hpbGRyZW4pIHtcclxuXHRcdFx0aWYgKGlzQXJyYXkoY2FjaGVkLmNoaWxkcmVuKSkgZm9yRWFjaChjYWNoZWQuY2hpbGRyZW4sIHVubG9hZClcclxuXHRcdFx0ZWxzZSBpZiAoY2FjaGVkLmNoaWxkcmVuLnRhZykgdW5sb2FkKGNhY2hlZC5jaGlsZHJlbilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFwcGVuZFRleHRGcmFnbWVudChwYXJlbnRFbGVtZW50LCBkYXRhKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKFxyXG5cdFx0XHRcdCRkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChkYXRhKSlcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZGF0YSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGluamVjdEhUTUwocGFyZW50RWxlbWVudCwgaW5kZXgsIGRhdGEpIHtcclxuXHRcdHZhciBuZXh0U2libGluZyA9IHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF1cclxuXHRcdGlmIChuZXh0U2libGluZykge1xyXG5cdFx0XHR2YXIgaXNFbGVtZW50ID0gbmV4dFNpYmxpbmcubm9kZVR5cGUgIT09IDFcclxuXHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcblx0XHRcdGlmIChpc0VsZW1lbnQpIHtcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgbmV4dFNpYmxpbmcgfHwgbnVsbClcclxuXHRcdFx0XHRwbGFjZWhvbGRlci5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmViZWdpblwiLCBkYXRhKVxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocGxhY2Vob2xkZXIpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bmV4dFNpYmxpbmcuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlYmVnaW5cIiwgZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YXBwZW5kVGV4dEZyYWdtZW50KHBhcmVudEVsZW1lbnQsIGRhdGEpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG5vZGVzID0gW11cclxuXHJcblx0XHR3aGlsZSAocGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSAhPT0gbmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0bm9kZXMucHVzaChwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdKVxyXG5cdFx0XHRpbmRleCsrXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5vZGVzXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhdXRvcmVkcmF3KGNhbGxiYWNrLCBvYmplY3QpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlID0gZSB8fCBldmVudFxyXG5cdFx0XHRtLnJlZHJhdy5zdHJhdGVneShcImRpZmZcIilcclxuXHRcdFx0bS5zdGFydENvbXB1dGF0aW9uKClcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChvYmplY3QsIGUpXHJcblx0XHRcdH0gZmluYWxseSB7XHJcblx0XHRcdFx0ZW5kRmlyc3RDb21wdXRhdGlvbigpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBodG1sXHJcblx0dmFyIGRvY3VtZW50Tm9kZSA9IHtcclxuXHRcdGFwcGVuZENoaWxkOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0XHRpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSBodG1sID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJodG1sXCIpXHJcblx0XHRcdGlmICgkZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmXHJcblx0XHRcdFx0XHQkZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICE9PSBub2RlKSB7XHJcblx0XHRcdFx0JGRvY3VtZW50LnJlcGxhY2VDaGlsZChub2RlLCAkZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRkb2N1bWVudC5hcHBlbmRDaGlsZChub2RlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmNoaWxkTm9kZXMgPSAkZG9jdW1lbnQuY2hpbGROb2Rlc1xyXG5cdFx0fSxcclxuXHJcblx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQobm9kZSlcclxuXHRcdH0sXHJcblxyXG5cdFx0Y2hpbGROb2RlczogW11cclxuXHR9XHJcblxyXG5cdHZhciBub2RlQ2FjaGUgPSBbXVxyXG5cdHZhciBjZWxsQ2FjaGUgPSB7fVxyXG5cclxuXHRtLnJlbmRlciA9IGZ1bmN0aW9uIChyb290LCBjZWxsLCBmb3JjZVJlY3JlYXRpb24pIHtcclxuXHRcdGlmICghcm9vdCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIERPTSBlbGVtZW50IGJlaW5nIHBhc3NlZCB0byBcIiArXHJcblx0XHRcdFx0XCJtLnJvdXRlL20ubW91bnQvbS5yZW5kZXIgaXMgbm90IHVuZGVmaW5lZC5cIilcclxuXHRcdH1cclxuXHRcdHZhciBjb25maWdzID0gW11cclxuXHRcdHZhciBpZCA9IGdldENlbGxDYWNoZUtleShyb290KVxyXG5cdFx0dmFyIGlzRG9jdW1lbnRSb290ID0gcm9vdCA9PT0gJGRvY3VtZW50XHJcblx0XHR2YXIgbm9kZVxyXG5cclxuXHRcdGlmIChpc0RvY3VtZW50Um9vdCB8fCByb290ID09PSAkZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XHJcblx0XHRcdG5vZGUgPSBkb2N1bWVudE5vZGVcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUgPSByb290XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzRG9jdW1lbnRSb290ICYmIGNlbGwudGFnICE9PSBcImh0bWxcIikge1xyXG5cdFx0XHRjZWxsID0ge3RhZzogXCJodG1sXCIsIGF0dHJzOiB7fSwgY2hpbGRyZW46IGNlbGx9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNlbGxDYWNoZVtpZF0gPT09IHVuZGVmaW5lZCkgY2xlYXIobm9kZS5jaGlsZE5vZGVzKVxyXG5cdFx0aWYgKGZvcmNlUmVjcmVhdGlvbiA9PT0gdHJ1ZSkgcmVzZXQocm9vdClcclxuXHJcblx0XHRjZWxsQ2FjaGVbaWRdID0gYnVpbGQoXHJcblx0XHRcdG5vZGUsXHJcblx0XHRcdG51bGwsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRjZWxsLFxyXG5cdFx0XHRjZWxsQ2FjaGVbaWRdLFxyXG5cdFx0XHRmYWxzZSxcclxuXHRcdFx0MCxcclxuXHRcdFx0bnVsbCxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRjb25maWdzKVxyXG5cclxuXHRcdGZvckVhY2goY29uZmlncywgZnVuY3Rpb24gKGNvbmZpZykgeyBjb25maWcoKSB9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0Q2VsbENhY2hlS2V5KGVsZW1lbnQpIHtcclxuXHRcdHZhciBpbmRleCA9IG5vZGVDYWNoZS5pbmRleE9mKGVsZW1lbnQpXHJcblx0XHRyZXR1cm4gaW5kZXggPCAwID8gbm9kZUNhY2hlLnB1c2goZWxlbWVudCkgLSAxIDogaW5kZXhcclxuXHR9XHJcblxyXG5cdG0udHJ1c3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHZhbHVlID0gbmV3IFN0cmluZyh2YWx1ZSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcclxuXHRcdHZhbHVlLiR0cnVzdGVkID0gdHJ1ZVxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXR0ZXJzZXR0ZXIoc3RvcmUpIHtcclxuXHRcdGZ1bmN0aW9uIHByb3AoKSB7XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKSBzdG9yZSA9IGFyZ3VtZW50c1swXVxyXG5cdFx0XHRyZXR1cm4gc3RvcmVcclxuXHRcdH1cclxuXHJcblx0XHRwcm9wLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHN0b3JlXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb3BcclxuXHR9XHJcblxyXG5cdG0ucHJvcCA9IGZ1bmN0aW9uIChzdG9yZSkge1xyXG5cdFx0aWYgKChzdG9yZSAhPSBudWxsICYmIGlzT2JqZWN0KHN0b3JlKSB8fCBpc0Z1bmN0aW9uKHN0b3JlKSkgJiZcclxuXHRcdFx0XHRpc0Z1bmN0aW9uKHN0b3JlLnRoZW4pKSB7XHJcblx0XHRcdHJldHVybiBwcm9waWZ5KHN0b3JlKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBnZXR0ZXJzZXR0ZXIoc3RvcmUpXHJcblx0fVxyXG5cclxuXHR2YXIgcm9vdHMgPSBbXVxyXG5cdHZhciBjb21wb25lbnRzID0gW11cclxuXHR2YXIgY29udHJvbGxlcnMgPSBbXVxyXG5cdHZhciBsYXN0UmVkcmF3SWQgPSBudWxsXHJcblx0dmFyIGxhc3RSZWRyYXdDYWxsVGltZSA9IDBcclxuXHR2YXIgY29tcHV0ZVByZVJlZHJhd0hvb2sgPSBudWxsXHJcblx0dmFyIGNvbXB1dGVQb3N0UmVkcmF3SG9vayA9IG51bGxcclxuXHR2YXIgdG9wQ29tcG9uZW50XHJcblx0dmFyIEZSQU1FX0JVREdFVCA9IDE2IC8vIDYwIGZyYW1lcyBwZXIgc2Vjb25kID0gMSBjYWxsIHBlciAxNiBtc1xyXG5cclxuXHRmdW5jdGlvbiBwYXJhbWV0ZXJpemUoY29tcG9uZW50LCBhcmdzKSB7XHJcblx0XHRmdW5jdGlvbiBjb250cm9sbGVyKCkge1xyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHRcdFx0cmV0dXJuIChjb21wb25lbnQuY29udHJvbGxlciB8fCBub29wKS5hcHBseSh0aGlzLCBhcmdzKSB8fCB0aGlzXHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbXBvbmVudC5jb250cm9sbGVyKSB7XHJcblx0XHRcdGNvbnRyb2xsZXIucHJvdG90eXBlID0gY29tcG9uZW50LmNvbnRyb2xsZXIucHJvdG90eXBlXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gdmlldyhjdHJsKSB7XHJcblx0XHRcdHZhciBjdXJyZW50QXJncyA9IFtjdHJsXS5jb25jYXQoYXJncylcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjdXJyZW50QXJncy5wdXNoKGFyZ3VtZW50c1tpXSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGNvbXBvbmVudC52aWV3LmFwcGx5KGNvbXBvbmVudCwgY3VycmVudEFyZ3MpXHJcblx0XHR9XHJcblxyXG5cdFx0dmlldy4kb3JpZ2luYWwgPSBjb21wb25lbnQudmlld1xyXG5cdFx0dmFyIG91dHB1dCA9IHtjb250cm9sbGVyOiBjb250cm9sbGVyLCB2aWV3OiB2aWV3fVxyXG5cdFx0aWYgKGFyZ3NbMF0gJiYgYXJnc1swXS5rZXkgIT0gbnVsbCkgb3V0cHV0LmF0dHJzID0ge2tleTogYXJnc1swXS5rZXl9XHJcblx0XHRyZXR1cm4gb3V0cHV0XHJcblx0fVxyXG5cclxuXHRtLmNvbXBvbmVudCA9IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcblxyXG5cdFx0cmV0dXJuIHBhcmFtZXRlcml6ZShjb21wb25lbnQsIGFyZ3MpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjaGVja1ByZXZlbnRlZChjb21wb25lbnQsIHJvb3QsIGluZGV4LCBpc1ByZXZlbnRlZCkge1xyXG5cdFx0aWYgKCFpc1ByZXZlbnRlZCkge1xyXG5cdFx0XHRtLnJlZHJhdy5zdHJhdGVneShcImFsbFwiKVxyXG5cdFx0XHRtLnN0YXJ0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHRyb290c1tpbmRleF0gPSByb290XHJcblx0XHRcdHZhciBjdXJyZW50Q29tcG9uZW50XHJcblxyXG5cdFx0XHRpZiAoY29tcG9uZW50KSB7XHJcblx0XHRcdFx0Y3VycmVudENvbXBvbmVudCA9IHRvcENvbXBvbmVudCA9IGNvbXBvbmVudFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGN1cnJlbnRDb21wb25lbnQgPSB0b3BDb21wb25lbnQgPSBjb21wb25lbnQgPSB7Y29udHJvbGxlcjogbm9vcH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbnRyb2xsZXIgPSBuZXcgKGNvbXBvbmVudC5jb250cm9sbGVyIHx8IG5vb3ApKClcclxuXHJcblx0XHRcdC8vIGNvbnRyb2xsZXJzIG1heSBjYWxsIG0ubW91bnQgcmVjdXJzaXZlbHkgKHZpYSBtLnJvdXRlIHJlZGlyZWN0cyxcclxuXHRcdFx0Ly8gZm9yIGV4YW1wbGUpXHJcblx0XHRcdC8vIHRoaXMgY29uZGl0aW9uYWwgZW5zdXJlcyBvbmx5IHRoZSBsYXN0IHJlY3Vyc2l2ZSBtLm1vdW50IGNhbGwgaXNcclxuXHRcdFx0Ly8gYXBwbGllZFxyXG5cdFx0XHRpZiAoY3VycmVudENvbXBvbmVudCA9PT0gdG9wQ29tcG9uZW50KSB7XHJcblx0XHRcdFx0Y29udHJvbGxlcnNbaW5kZXhdID0gY29udHJvbGxlclxyXG5cdFx0XHRcdGNvbXBvbmVudHNbaW5kZXhdID0gY29tcG9uZW50XHJcblx0XHRcdH1cclxuXHRcdFx0ZW5kRmlyc3RDb21wdXRhdGlvbigpXHJcblx0XHRcdGlmIChjb21wb25lbnQgPT09IG51bGwpIHtcclxuXHRcdFx0XHRyZW1vdmVSb290RWxlbWVudChyb290LCBpbmRleClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY29udHJvbGxlcnNbaW5kZXhdXHJcblx0XHR9IGVsc2UgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XHJcblx0XHRcdHJlbW92ZVJvb3RFbGVtZW50KHJvb3QsIGluZGV4KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5tb3VudCA9IG0ubW9kdWxlID0gZnVuY3Rpb24gKHJvb3QsIGNvbXBvbmVudCkge1xyXG5cdFx0aWYgKCFyb290KSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBlbnN1cmUgdGhlIERPTSBlbGVtZW50IGV4aXN0cyBiZWZvcmUgXCIgK1xyXG5cdFx0XHRcdFwicmVuZGVyaW5nIGEgdGVtcGxhdGUgaW50byBpdC5cIilcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaW5kZXggPSByb290cy5pbmRleE9mKHJvb3QpXHJcblx0XHRpZiAoaW5kZXggPCAwKSBpbmRleCA9IHJvb3RzLmxlbmd0aFxyXG5cclxuXHRcdHZhciBpc1ByZXZlbnRlZCA9IGZhbHNlXHJcblx0XHR2YXIgZXZlbnQgPSB7XHJcblx0XHRcdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aXNQcmV2ZW50ZWQgPSB0cnVlXHJcblx0XHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2sgPSBjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBudWxsXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3JFYWNoKHVubG9hZGVycywgZnVuY3Rpb24gKHVubG9hZGVyKSB7XHJcblx0XHRcdHVubG9hZGVyLmhhbmRsZXIuY2FsbCh1bmxvYWRlci5jb250cm9sbGVyLCBldmVudClcclxuXHRcdFx0dW5sb2FkZXIuY29udHJvbGxlci5vbnVubG9hZCA9IG51bGxcclxuXHRcdH0pXHJcblxyXG5cdFx0aWYgKGlzUHJldmVudGVkKSB7XHJcblx0XHRcdGZvckVhY2godW5sb2FkZXJzLCBmdW5jdGlvbiAodW5sb2FkZXIpIHtcclxuXHRcdFx0XHR1bmxvYWRlci5jb250cm9sbGVyLm9udW5sb2FkID0gdW5sb2FkZXIuaGFuZGxlclxyXG5cdFx0XHR9KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5sb2FkZXJzID0gW11cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29udHJvbGxlcnNbaW5kZXhdICYmIGlzRnVuY3Rpb24oY29udHJvbGxlcnNbaW5kZXhdLm9udW5sb2FkKSkge1xyXG5cdFx0XHRjb250cm9sbGVyc1tpbmRleF0ub251bmxvYWQoZXZlbnQpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNoZWNrUHJldmVudGVkKGNvbXBvbmVudCwgcm9vdCwgaW5kZXgsIGlzUHJldmVudGVkKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVtb3ZlUm9vdEVsZW1lbnQocm9vdCwgaW5kZXgpIHtcclxuXHRcdHJvb3RzLnNwbGljZShpbmRleCwgMSlcclxuXHRcdGNvbnRyb2xsZXJzLnNwbGljZShpbmRleCwgMSlcclxuXHRcdGNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxyXG5cdFx0cmVzZXQocm9vdClcclxuXHRcdG5vZGVDYWNoZS5zcGxpY2UoZ2V0Q2VsbENhY2hlS2V5KHJvb3QpLCAxKVxyXG5cdH1cclxuXHJcblx0dmFyIHJlZHJhd2luZyA9IGZhbHNlXHJcblx0bS5yZWRyYXcgPSBmdW5jdGlvbiAoZm9yY2UpIHtcclxuXHRcdGlmIChyZWRyYXdpbmcpIHJldHVyblxyXG5cdFx0cmVkcmF3aW5nID0gdHJ1ZVxyXG5cdFx0aWYgKGZvcmNlKSBmb3JjaW5nID0gdHJ1ZVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIGxhc3RSZWRyYXdJZCBpcyBhIHBvc2l0aXZlIG51bWJlciBpZiBhIHNlY29uZCByZWRyYXcgaXMgcmVxdWVzdGVkXHJcblx0XHRcdC8vIGJlZm9yZSB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWVcclxuXHRcdFx0Ly8gbGFzdFJlZHJhd0lEIGlzIG51bGwgaWYgaXQncyB0aGUgZmlyc3QgcmVkcmF3IGFuZCBub3QgYW4gZXZlbnRcclxuXHRcdFx0Ly8gaGFuZGxlclxyXG5cdFx0XHRpZiAobGFzdFJlZHJhd0lkICYmICFmb3JjZSkge1xyXG5cdFx0XHRcdC8vIHdoZW4gc2V0VGltZW91dDogb25seSByZXNjaGVkdWxlIHJlZHJhdyBpZiB0aW1lIGJldHdlZW4gbm93XHJcblx0XHRcdFx0Ly8gYW5kIHByZXZpb3VzIHJlZHJhdyBpcyBiaWdnZXIgdGhhbiBhIGZyYW1lLCBvdGhlcndpc2Uga2VlcFxyXG5cdFx0XHRcdC8vIGN1cnJlbnRseSBzY2hlZHVsZWQgdGltZW91dFxyXG5cdFx0XHRcdC8vIHdoZW4gckFGOiBhbHdheXMgcmVzY2hlZHVsZSByZWRyYXdcclxuXHRcdFx0XHRpZiAoJHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gZ2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG5cdFx0XHRcdFx0XHRuZXcgRGF0ZSgpIC0gbGFzdFJlZHJhd0NhbGxUaW1lID4gRlJBTUVfQlVER0VUKSB7XHJcblx0XHRcdFx0XHRpZiAobGFzdFJlZHJhd0lkID4gMCkgJGNhbmNlbEFuaW1hdGlvbkZyYW1lKGxhc3RSZWRyYXdJZClcclxuXHRcdFx0XHRcdGxhc3RSZWRyYXdJZCA9ICRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVkcmF3LCBGUkFNRV9CVURHRVQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlZHJhdygpXHJcblx0XHRcdFx0bGFzdFJlZHJhd0lkID0gJHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRsYXN0UmVkcmF3SWQgPSBudWxsXHJcblx0XHRcdFx0fSwgRlJBTUVfQlVER0VUKVxyXG5cdFx0XHR9XHJcblx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRyZWRyYXdpbmcgPSBmb3JjaW5nID0gZmFsc2VcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ucmVkcmF3LnN0cmF0ZWd5ID0gbS5wcm9wKClcclxuXHRmdW5jdGlvbiByZWRyYXcoKSB7XHJcblx0XHRpZiAoY29tcHV0ZVByZVJlZHJhd0hvb2spIHtcclxuXHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2soKVxyXG5cdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IG51bGxcclxuXHRcdH1cclxuXHRcdGZvckVhY2gocm9vdHMsIGZ1bmN0aW9uIChyb290LCBpKSB7XHJcblx0XHRcdHZhciBjb21wb25lbnQgPSBjb21wb25lbnRzW2ldXHJcblx0XHRcdGlmIChjb250cm9sbGVyc1tpXSkge1xyXG5cdFx0XHRcdHZhciBhcmdzID0gW2NvbnRyb2xsZXJzW2ldXVxyXG5cdFx0XHRcdG0ucmVuZGVyKHJvb3QsXHJcblx0XHRcdFx0XHRjb21wb25lbnQudmlldyA/IGNvbXBvbmVudC52aWV3KGNvbnRyb2xsZXJzW2ldLCBhcmdzKSA6IFwiXCIpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHQvLyBhZnRlciByZW5kZXJpbmcgd2l0aGluIGEgcm91dGVkIGNvbnRleHQsIHdlIG5lZWQgdG8gc2Nyb2xsIGJhY2sgdG9cclxuXHRcdC8vIHRoZSB0b3AsIGFuZCBmZXRjaCB0aGUgZG9jdW1lbnQgdGl0bGUgZm9yIGhpc3RvcnkucHVzaFN0YXRlXHJcblx0XHRpZiAoY29tcHV0ZVBvc3RSZWRyYXdIb29rKSB7XHJcblx0XHRcdGNvbXB1dGVQb3N0UmVkcmF3SG9vaygpXHJcblx0XHRcdGNvbXB1dGVQb3N0UmVkcmF3SG9vayA9IG51bGxcclxuXHRcdH1cclxuXHRcdGxhc3RSZWRyYXdJZCA9IG51bGxcclxuXHRcdGxhc3RSZWRyYXdDYWxsVGltZSA9IG5ldyBEYXRlKClcclxuXHRcdG0ucmVkcmF3LnN0cmF0ZWd5KFwiZGlmZlwiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZW5kRmlyc3RDb21wdXRhdGlvbigpIHtcclxuXHRcdGlmIChtLnJlZHJhdy5zdHJhdGVneSgpID09PSBcIm5vbmVcIikge1xyXG5cdFx0XHRwZW5kaW5nUmVxdWVzdHMtLVxyXG5cdFx0XHRtLnJlZHJhdy5zdHJhdGVneShcImRpZmZcIilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG0uZW5kQ29tcHV0YXRpb24oKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS53aXRoQXR0ciA9IGZ1bmN0aW9uIChwcm9wLCB3aXRoQXR0ckNhbGxiYWNrLCBjYWxsYmFja1RoaXMpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlID0gZSB8fCBldmVudFxyXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cclxuXHRcdFx0dmFyIGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgfHwgdGhpc1xyXG5cdFx0XHR2YXIgX3RoaXMgPSBjYWxsYmFja1RoaXMgfHwgdGhpc1xyXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gcHJvcCBpbiBjdXJyZW50VGFyZ2V0ID9cclxuXHRcdFx0XHRjdXJyZW50VGFyZ2V0W3Byb3BdIDpcclxuXHRcdFx0XHRjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wKVxyXG5cdFx0XHR3aXRoQXR0ckNhbGxiYWNrLmNhbGwoX3RoaXMsIHRhcmdldClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIHJvdXRpbmdcclxuXHR2YXIgbW9kZXMgPSB7cGF0aG5hbWU6IFwiXCIsIGhhc2g6IFwiI1wiLCBzZWFyY2g6IFwiP1wifVxyXG5cdHZhciByZWRpcmVjdCA9IG5vb3BcclxuXHR2YXIgaXNEZWZhdWx0Um91dGUgPSBmYWxzZVxyXG5cdHZhciByb3V0ZVBhcmFtcywgY3VycmVudFJvdXRlXHJcblxyXG5cdG0ucm91dGUgPSBmdW5jdGlvbiAocm9vdCwgYXJnMSwgYXJnMiwgdmRvbSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblx0XHQvLyBtLnJvdXRlKClcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gY3VycmVudFJvdXRlXHJcblx0XHQvLyBtLnJvdXRlKGVsLCBkZWZhdWx0Um91dGUsIHJvdXRlcylcclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIGlzU3RyaW5nKGFyZzEpKSB7XHJcblx0XHRcdHJlZGlyZWN0ID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG5cdFx0XHRcdHZhciBwYXRoID0gY3VycmVudFJvdXRlID0gbm9ybWFsaXplUm91dGUoc291cmNlKVxyXG5cdFx0XHRcdGlmICghcm91dGVCeVZhbHVlKHJvb3QsIGFyZzIsIHBhdGgpKSB7XHJcblx0XHRcdFx0XHRpZiAoaXNEZWZhdWx0Um91dGUpIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBkZWZhdWx0IHJvdXRlIG1hdGNoZXMgXCIgK1xyXG5cdFx0XHRcdFx0XHRcdFwib25lIG9mIHRoZSByb3V0ZXMgZGVmaW5lZCBpbiBtLnJvdXRlXCIpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aXNEZWZhdWx0Um91dGUgPSB0cnVlXHJcblx0XHRcdFx0XHRtLnJvdXRlKGFyZzEsIHRydWUpXHJcblx0XHRcdFx0XHRpc0RlZmF1bHRSb3V0ZSA9IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbGlzdGVuZXIgPSBtLnJvdXRlLm1vZGUgPT09IFwiaGFzaFwiID9cclxuXHRcdFx0XHRcIm9uaGFzaGNoYW5nZVwiIDpcclxuXHRcdFx0XHRcIm9ucG9wc3RhdGVcIlxyXG5cclxuXHRcdFx0Z2xvYmFsW2xpc3RlbmVyXSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgcGF0aCA9ICRsb2NhdGlvblttLnJvdXRlLm1vZGVdXHJcblx0XHRcdFx0aWYgKG0ucm91dGUubW9kZSA9PT0gXCJwYXRobmFtZVwiKSBwYXRoICs9ICRsb2NhdGlvbi5zZWFyY2hcclxuXHRcdFx0XHRpZiAoY3VycmVudFJvdXRlICE9PSBub3JtYWxpemVSb3V0ZShwYXRoKSkgcmVkaXJlY3QocGF0aClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2sgPSBzZXRTY3JvbGxcclxuXHRcdFx0Z2xvYmFsW2xpc3RlbmVyXSgpXHJcblxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBjb25maWc6IG0ucm91dGVcclxuXHRcdGlmIChyb290LmFkZEV2ZW50TGlzdGVuZXIgfHwgcm9vdC5hdHRhY2hFdmVudCkge1xyXG5cdFx0XHR2YXIgYmFzZSA9IG0ucm91dGUubW9kZSAhPT0gXCJwYXRobmFtZVwiID8gJGxvY2F0aW9uLnBhdGhuYW1lIDogXCJcIlxyXG5cdFx0XHRyb290LmhyZWYgPSBiYXNlICsgbW9kZXNbbS5yb3V0ZS5tb2RlXSArIHZkb20uYXR0cnMuaHJlZlxyXG5cdFx0XHRpZiAocm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XHJcblx0XHRcdFx0cm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcm91dGVVbm9idHJ1c2l2ZSlcclxuXHRcdFx0XHRyb290LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJvb3QuZGV0YWNoRXZlbnQoXCJvbmNsaWNrXCIsIHJvdXRlVW5vYnRydXNpdmUpXHJcblx0XHRcdFx0cm9vdC5hdHRhY2hFdmVudChcIm9uY2xpY2tcIiwgcm91dGVVbm9idHJ1c2l2ZSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuXHJcblx0XHR9XHJcblx0XHQvLyBtLnJvdXRlKHJvdXRlLCBwYXJhbXMsIHNob3VsZFJlcGxhY2VIaXN0b3J5RW50cnkpXHJcblx0XHRpZiAoaXNTdHJpbmcocm9vdCkpIHtcclxuXHRcdFx0dmFyIG9sZFJvdXRlID0gY3VycmVudFJvdXRlXHJcblx0XHRcdGN1cnJlbnRSb3V0ZSA9IHJvb3RcclxuXHJcblx0XHRcdHZhciBhcmdzID0gYXJnMSB8fCB7fVxyXG5cdFx0XHR2YXIgcXVlcnlJbmRleCA9IGN1cnJlbnRSb3V0ZS5pbmRleE9mKFwiP1wiKVxyXG5cdFx0XHR2YXIgcGFyYW1zXHJcblxyXG5cdFx0XHRpZiAocXVlcnlJbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0cGFyYW1zID0gcGFyc2VRdWVyeVN0cmluZyhjdXJyZW50Um91dGUuc2xpY2UocXVlcnlJbmRleCArIDEpKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBhcmFtcyA9IHt9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGkgaW4gYXJncykgaWYgKGhhc093bi5jYWxsKGFyZ3MsIGkpKSB7XHJcblx0XHRcdFx0cGFyYW1zW2ldID0gYXJnc1tpXVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKHBhcmFtcylcclxuXHRcdFx0dmFyIGN1cnJlbnRQYXRoXHJcblxyXG5cdFx0XHRpZiAocXVlcnlJbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0Y3VycmVudFBhdGggPSBjdXJyZW50Um91dGUuc2xpY2UoMCwgcXVlcnlJbmRleClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGN1cnJlbnRSb3V0ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocXVlcnlzdHJpbmcpIHtcclxuXHRcdFx0XHRjdXJyZW50Um91dGUgPSBjdXJyZW50UGF0aCArXHJcblx0XHRcdFx0XHQoY3VycmVudFBhdGguaW5kZXhPZihcIj9cIikgPT09IC0xID8gXCI/XCIgOiBcIiZcIikgK1xyXG5cdFx0XHRcdFx0cXVlcnlzdHJpbmdcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlcGxhY2VIaXN0b3J5ID1cclxuXHRcdFx0XHQoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGFyZzIgOiBhcmcxKSA9PT0gdHJ1ZSB8fFxyXG5cdFx0XHRcdG9sZFJvdXRlID09PSByb290XHJcblxyXG5cdFx0XHRpZiAoZ2xvYmFsLmhpc3RvcnkucHVzaFN0YXRlKSB7XHJcblx0XHRcdFx0dmFyIG1ldGhvZCA9IHJlcGxhY2VIaXN0b3J5ID8gXCJyZXBsYWNlU3RhdGVcIiA6IFwicHVzaFN0YXRlXCJcclxuXHRcdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IHNldFNjcm9sbFxyXG5cdFx0XHRcdGNvbXB1dGVQb3N0UmVkcmF3SG9vayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGdsb2JhbC5oaXN0b3J5W21ldGhvZF0obnVsbCwgJGRvY3VtZW50LnRpdGxlLFxyXG5cdFx0XHRcdFx0XHRtb2Rlc1ttLnJvdXRlLm1vZGVdICsgY3VycmVudFJvdXRlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWRpcmVjdChtb2Rlc1ttLnJvdXRlLm1vZGVdICsgY3VycmVudFJvdXRlKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRsb2NhdGlvblttLnJvdXRlLm1vZGVdID0gY3VycmVudFJvdXRlXHJcblx0XHRcdFx0cmVkaXJlY3QobW9kZXNbbS5yb3V0ZS5tb2RlXSArIGN1cnJlbnRSb3V0ZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5yb3V0ZS5wYXJhbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdGlmICghcm91dGVQYXJhbXMpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgY2FsbCBtLnJvdXRlKGVsZW1lbnQsIGRlZmF1bHRSb3V0ZSwgXCIgK1xyXG5cdFx0XHRcdFwicm91dGVzKSBiZWZvcmUgY2FsbGluZyBtLnJvdXRlLnBhcmFtKClcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWtleSkge1xyXG5cdFx0XHRyZXR1cm4gcm91dGVQYXJhbXNcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcm91dGVQYXJhbXNba2V5XVxyXG5cdH1cclxuXHJcblx0bS5yb3V0ZS5tb2RlID0gXCJzZWFyY2hcIlxyXG5cclxuXHRmdW5jdGlvbiBub3JtYWxpemVSb3V0ZShyb3V0ZSkge1xyXG5cdFx0cmV0dXJuIHJvdXRlLnNsaWNlKG1vZGVzW20ucm91dGUubW9kZV0ubGVuZ3RoKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcm91dGVCeVZhbHVlKHJvb3QsIHJvdXRlciwgcGF0aCkge1xyXG5cdFx0cm91dGVQYXJhbXMgPSB7fVxyXG5cclxuXHRcdHZhciBxdWVyeVN0YXJ0ID0gcGF0aC5pbmRleE9mKFwiP1wiKVxyXG5cdFx0aWYgKHF1ZXJ5U3RhcnQgIT09IC0xKSB7XHJcblx0XHRcdHJvdXRlUGFyYW1zID0gcGFyc2VRdWVyeVN0cmluZyhcclxuXHRcdFx0XHRwYXRoLnN1YnN0cihxdWVyeVN0YXJ0ICsgMSwgcGF0aC5sZW5ndGgpKVxyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMCwgcXVlcnlTdGFydClcclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgYWxsIHJvdXRlcyBhbmQgY2hlY2sgaWYgdGhlcmUnc1xyXG5cdFx0Ly8gYW4gZXhhY3QgbWF0Y2ggZm9yIHRoZSBjdXJyZW50IHBhdGhcclxuXHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMocm91dGVyKVxyXG5cdFx0dmFyIGluZGV4ID0ga2V5cy5pbmRleE9mKHBhdGgpXHJcblxyXG5cdFx0aWYgKGluZGV4ICE9PSAtMSl7XHJcblx0XHRcdG0ubW91bnQocm9vdCwgcm91dGVyW2tleXMgW2luZGV4XV0pXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgcm91dGUgaW4gcm91dGVyKSBpZiAoaGFzT3duLmNhbGwocm91dGVyLCByb3V0ZSkpIHtcclxuXHRcdFx0aWYgKHJvdXRlID09PSBwYXRoKSB7XHJcblx0XHRcdFx0bS5tb3VudChyb290LCByb3V0ZXJbcm91dGVdKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChcIl5cIiArIHJvdXRlXHJcblx0XHRcdFx0LnJlcGxhY2UoLzpbXlxcL10rP1xcLnszfS9nLCBcIiguKj8pXCIpXHJcblx0XHRcdFx0LnJlcGxhY2UoLzpbXlxcL10rL2csIFwiKFteXFxcXC9dKylcIikgKyBcIlxcLz8kXCIpXHJcblxyXG5cdFx0XHRpZiAobWF0Y2hlci50ZXN0KHBhdGgpKSB7XHJcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0cGF0aC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHZhciBrZXlzID0gcm91dGUubWF0Y2goLzpbXlxcL10rL2cpIHx8IFtdXHJcblx0XHRcdFx0XHR2YXIgdmFsdWVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEsIC0yKVxyXG5cdFx0XHRcdFx0Zm9yRWFjaChrZXlzLCBmdW5jdGlvbiAoa2V5LCBpKSB7XHJcblx0XHRcdFx0XHRcdHJvdXRlUGFyYW1zW2tleS5yZXBsYWNlKC86fFxcLi9nLCBcIlwiKV0gPVxyXG5cdFx0XHRcdFx0XHRcdGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaV0pXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0bS5tb3VudChyb290LCByb3V0ZXJbcm91dGVdKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByb3V0ZVVub2J0cnVzaXZlKGUpIHtcclxuXHRcdGUgPSBlIHx8IGV2ZW50XHJcblx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5IHx8IGUud2hpY2ggPT09IDIpIHJldHVyblxyXG5cclxuXHRcdGlmIChlLnByZXZlbnREZWZhdWx0KSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZS5yZXR1cm5WYWx1ZSA9IGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgfHwgZS5zcmNFbGVtZW50XHJcblx0XHR2YXIgYXJnc1xyXG5cclxuXHRcdGlmIChtLnJvdXRlLm1vZGUgPT09IFwicGF0aG5hbWVcIiAmJiBjdXJyZW50VGFyZ2V0LnNlYXJjaCkge1xyXG5cdFx0XHRhcmdzID0gcGFyc2VRdWVyeVN0cmluZyhjdXJyZW50VGFyZ2V0LnNlYXJjaC5zbGljZSgxKSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFyZ3MgPSB7fVxyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChjdXJyZW50VGFyZ2V0ICYmICEvYS9pLnRlc3QoY3VycmVudFRhcmdldC5ub2RlTmFtZSkpIHtcclxuXHRcdFx0Y3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNsZWFyIHBlbmRpbmdSZXF1ZXN0cyBiZWNhdXNlIHdlIHdhbnQgYW4gaW1tZWRpYXRlIHJvdXRlIGNoYW5nZVxyXG5cdFx0cGVuZGluZ1JlcXVlc3RzID0gMFxyXG5cdFx0bS5yb3V0ZShjdXJyZW50VGFyZ2V0W20ucm91dGUubW9kZV1cclxuXHRcdFx0LnNsaWNlKG1vZGVzW20ucm91dGUubW9kZV0ubGVuZ3RoKSwgYXJncylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldFNjcm9sbCgpIHtcclxuXHRcdGlmIChtLnJvdXRlLm1vZGUgIT09IFwiaGFzaFwiICYmICRsb2NhdGlvbi5oYXNoKSB7XHJcblx0XHRcdCRsb2NhdGlvbi5oYXNoID0gJGxvY2F0aW9uLmhhc2hcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGdsb2JhbC5zY3JvbGxUbygwLCAwKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmplY3QsIHByZWZpeCkge1xyXG5cdFx0dmFyIGR1cGxpY2F0ZXMgPSB7fVxyXG5cdFx0dmFyIHN0ciA9IFtdXHJcblxyXG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIGlmIChoYXNPd24uY2FsbChvYmplY3QsIHByb3ApKSB7XHJcblx0XHRcdHZhciBrZXkgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHByb3AgKyBcIl1cIiA6IHByb3BcclxuXHRcdFx0dmFyIHZhbHVlID0gb2JqZWN0W3Byb3BdXHJcblxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRzdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSlcclxuXHRcdFx0fSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcclxuXHRcdFx0XHRzdHIucHVzaChidWlsZFF1ZXJ5U3RyaW5nKHZhbHVlLCBrZXkpKVxyXG5cdFx0XHR9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XHJcblx0XHRcdFx0dmFyIGtleXMgPSBbXVxyXG5cdFx0XHRcdGR1cGxpY2F0ZXNba2V5XSA9IGR1cGxpY2F0ZXNba2V5XSB8fCB7fVxyXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRcdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRcdFx0aWYgKCFkdXBsaWNhdGVzW2tleV1baXRlbV0pIHtcclxuXHRcdFx0XHRcdFx0ZHVwbGljYXRlc1trZXldW2l0ZW1dID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHRrZXlzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArXHJcblx0XHRcdFx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGl0ZW0pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0c3RyLnB1c2goa2V5cy5qb2luKFwiJlwiKSlcclxuXHRcdFx0fSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0c3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArXHJcblx0XHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyLmpvaW4oXCImXCIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nKHN0cikge1xyXG5cdFx0aWYgKHN0ciA9PT0gXCJcIiB8fCBzdHIgPT0gbnVsbCkgcmV0dXJuIHt9XHJcblx0XHRpZiAoc3RyLmNoYXJBdCgwKSA9PT0gXCI/XCIpIHN0ciA9IHN0ci5zbGljZSgxKVxyXG5cclxuXHRcdHZhciBwYWlycyA9IHN0ci5zcGxpdChcIiZcIilcclxuXHRcdHZhciBwYXJhbXMgPSB7fVxyXG5cclxuXHRcdGZvckVhY2gocGFpcnMsIGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuXHRcdFx0dmFyIHBhaXIgPSBzdHJpbmcuc3BsaXQoXCI9XCIpXHJcblx0XHRcdHZhciBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQocGFpclswXSlcclxuXHRcdFx0dmFyIHZhbHVlID0gcGFpci5sZW5ndGggPT09IDIgPyBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkgOiBudWxsXHJcblx0XHRcdGlmIChwYXJhbXNba2V5XSAhPSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKCFpc0FycmF5KHBhcmFtc1trZXldKSkgcGFyYW1zW2tleV0gPSBbcGFyYW1zW2tleV1dXHJcblx0XHRcdFx0cGFyYW1zW2tleV0ucHVzaCh2YWx1ZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHBhcmFtc1trZXldID0gdmFsdWVcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIHBhcmFtc1xyXG5cdH1cclxuXHJcblx0bS5yb3V0ZS5idWlsZFF1ZXJ5U3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZ1xyXG5cdG0ucm91dGUucGFyc2VRdWVyeVN0cmluZyA9IHBhcnNlUXVlcnlTdHJpbmdcclxuXHJcblx0ZnVuY3Rpb24gcmVzZXQocm9vdCkge1xyXG5cdFx0dmFyIGNhY2hlS2V5ID0gZ2V0Q2VsbENhY2hlS2V5KHJvb3QpXHJcblx0XHRjbGVhcihyb290LmNoaWxkTm9kZXMsIGNlbGxDYWNoZVtjYWNoZUtleV0pXHJcblx0XHRjZWxsQ2FjaGVbY2FjaGVLZXldID0gdW5kZWZpbmVkXHJcblx0fVxyXG5cclxuXHRtLmRlZmVycmVkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKClcclxuXHRcdGRlZmVycmVkLnByb21pc2UgPSBwcm9waWZ5KGRlZmVycmVkLnByb21pc2UpXHJcblx0XHRyZXR1cm4gZGVmZXJyZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHByb3BpZnkocHJvbWlzZSwgaW5pdGlhbFZhbHVlKSB7XHJcblx0XHR2YXIgcHJvcCA9IG0ucHJvcChpbml0aWFsVmFsdWUpXHJcblx0XHRwcm9taXNlLnRoZW4ocHJvcClcclxuXHRcdHByb3AudGhlbiA9IGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0cmV0dXJuIHByb3BpZnkocHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCksIGluaXRpYWxWYWx1ZSlcclxuXHRcdH1cclxuXHJcblx0XHRwcm9wLmNhdGNoID0gcHJvcC50aGVuLmJpbmQobnVsbCwgbnVsbClcclxuXHRcdHJldHVybiBwcm9wXHJcblx0fVxyXG5cdC8vIFByb21pei5taXRocmlsLmpzIHwgWm9sbWVpc3RlciB8IE1JVFxyXG5cdC8vIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiBQcm9taXouanMsIHdoaWNoIGRvZXMgbm90IGNvbmZvcm0gdG8gUHJvbWlzZXMvQStcclxuXHQvLyBmb3IgdHdvIHJlYXNvbnM6XHJcblx0Ly9cclxuXHQvLyAxKSBgdGhlbmAgY2FsbGJhY2tzIGFyZSBjYWxsZWQgc3luY2hyb25vdXNseSAoYmVjYXVzZSBzZXRUaW1lb3V0IGlzIHRvb1xyXG5cdC8vICAgIHNsb3csIGFuZCB0aGUgc2V0SW1tZWRpYXRlIHBvbHlmaWxsIGlzIHRvbyBiaWdcclxuXHQvL1xyXG5cdC8vIDIpIHRocm93aW5nIHN1YmNsYXNzZXMgb2YgRXJyb3IgY2F1c2UgdGhlIGVycm9yIHRvIGJlIGJ1YmJsZWQgdXAgaW5zdGVhZFxyXG5cdC8vICAgIG9mIHRyaWdnZXJpbmcgcmVqZWN0aW9uIChiZWNhdXNlIHRoZSBzcGVjIGRvZXMgbm90IGFjY291bnQgZm9yIHRoZVxyXG5cdC8vICAgIGltcG9ydGFudCB1c2UgY2FzZSBvZiBkZWZhdWx0IGJyb3dzZXIgZXJyb3IgaGFuZGxpbmcsIGkuZS4gbWVzc2FnZSB3L1xyXG5cdC8vICAgIGxpbmUgbnVtYmVyKVxyXG5cclxuXHR2YXIgUkVTT0xWSU5HID0gMVxyXG5cdHZhciBSRUpFQ1RJTkcgPSAyXHJcblx0dmFyIFJFU09MVkVEID0gM1xyXG5cdHZhciBSRUpFQ1RFRCA9IDRcclxuXHJcblx0ZnVuY3Rpb24gRGVmZXJyZWQob25TdWNjZXNzLCBvbkZhaWx1cmUpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpc1xyXG5cdFx0dmFyIHN0YXRlID0gMFxyXG5cdFx0dmFyIHByb21pc2VWYWx1ZSA9IDBcclxuXHRcdHZhciBuZXh0ID0gW11cclxuXHJcblx0XHRzZWxmLnByb21pc2UgPSB7fVxyXG5cclxuXHRcdHNlbGYucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRpZiAoIXN0YXRlKSB7XHJcblx0XHRcdFx0cHJvbWlzZVZhbHVlID0gdmFsdWVcclxuXHRcdFx0XHRzdGF0ZSA9IFJFU09MVklOR1xyXG5cclxuXHRcdFx0XHRmaXJlKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHNlbGZcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRpZiAoIXN0YXRlKSB7XHJcblx0XHRcdFx0cHJvbWlzZVZhbHVlID0gdmFsdWVcclxuXHRcdFx0XHRzdGF0ZSA9IFJFSkVDVElOR1xyXG5cclxuXHRcdFx0XHRmaXJlKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHNlbGZcclxuXHRcdH1cclxuXHJcblx0XHRzZWxmLnByb21pc2UudGhlbiA9IGZ1bmN0aW9uIChvblN1Y2Nlc3MsIG9uRmFpbHVyZSkge1xyXG5cdFx0XHR2YXIgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQob25TdWNjZXNzLCBvbkZhaWx1cmUpXHJcblxyXG5cdFx0XHRpZiAoc3RhdGUgPT09IFJFU09MVkVEKSB7XHJcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShwcm9taXNlVmFsdWUpXHJcblx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09IFJFSkVDVEVEKSB7XHJcblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KHByb21pc2VWYWx1ZSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRuZXh0LnB1c2goZGVmZXJyZWQpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZmluaXNoKHR5cGUpIHtcclxuXHRcdFx0c3RhdGUgPSB0eXBlIHx8IFJFSkVDVEVEXHJcblx0XHRcdG5leHQubWFwKGZ1bmN0aW9uIChkZWZlcnJlZCkge1xyXG5cdFx0XHRcdGlmIChzdGF0ZSA9PT0gUkVTT0xWRUQpIHtcclxuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiB0aGVubmFibGUodGhlbiwgc3VjY2VzcywgZmFpbHVyZSwgbm90VGhlbm5hYmxlKSB7XHJcblx0XHRcdGlmICgoKHByb21pc2VWYWx1ZSAhPSBudWxsICYmIGlzT2JqZWN0KHByb21pc2VWYWx1ZSkpIHx8XHJcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKHByb21pc2VWYWx1ZSkpICYmIGlzRnVuY3Rpb24odGhlbikpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly8gY291bnQgcHJvdGVjdHMgYWdhaW5zdCBhYnVzZSBjYWxscyBmcm9tIHNwZWMgY2hlY2tlclxyXG5cdFx0XHRcdFx0dmFyIGNvdW50ID0gMFxyXG5cdFx0XHRcdFx0dGhlbi5jYWxsKHByb21pc2VWYWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjb3VudCsrKSByZXR1cm5cclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gdmFsdWVcclxuXHRcdFx0XHRcdFx0c3VjY2VzcygpXHJcblx0XHRcdFx0XHR9LCBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNvdW50KyspIHJldHVyblxyXG5cdFx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSB2YWx1ZVxyXG5cdFx0XHRcdFx0XHRmYWlsdXJlKClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0bS5kZWZlcnJlZC5vbmVycm9yKGUpXHJcblx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSBlXHJcblx0XHRcdFx0XHRmYWlsdXJlKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bm90VGhlbm5hYmxlKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpcmUoKSB7XHJcblx0XHRcdC8vIGNoZWNrIGlmIGl0J3MgYSB0aGVuYWJsZVxyXG5cdFx0XHR2YXIgdGhlblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHRoZW4gPSBwcm9taXNlVmFsdWUgJiYgcHJvbWlzZVZhbHVlLnRoZW5cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihlKVxyXG5cdFx0XHRcdHByb21pc2VWYWx1ZSA9IGVcclxuXHRcdFx0XHRzdGF0ZSA9IFJFSkVDVElOR1xyXG5cdFx0XHRcdHJldHVybiBmaXJlKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHN0YXRlID09PSBSRUpFQ1RJTkcpIHtcclxuXHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGVubmFibGUodGhlbiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHN0YXRlID0gUkVTT0xWSU5HXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRzdGF0ZSA9IFJFSkVDVElOR1xyXG5cdFx0XHRcdGZpcmUoKVxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGlmIChzdGF0ZSA9PT0gUkVTT0xWSU5HICYmIGlzRnVuY3Rpb24ob25TdWNjZXNzKSkge1xyXG5cdFx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSBvblN1Y2Nlc3MocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzdGF0ZSA9PT0gUkVKRUNUSU5HICYmIGlzRnVuY3Rpb24ob25GYWlsdXJlKSkge1xyXG5cdFx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSBvbkZhaWx1cmUocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHRcdFx0XHRzdGF0ZSA9IFJFU09MVklOR1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihlKVxyXG5cdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZpbmlzaCgpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocHJvbWlzZVZhbHVlID09PSBzZWxmKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlVmFsdWUgPSBUeXBlRXJyb3IoKVxyXG5cdFx0XHRcdFx0ZmluaXNoKClcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhlbm5hYmxlKHRoZW4sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0ZmluaXNoKFJFU09MVkVEKVxyXG5cdFx0XHRcdFx0fSwgZmluaXNoLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGZpbmlzaChzdGF0ZSA9PT0gUkVTT0xWSU5HICYmIFJFU09MVkVEKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLmRlZmVycmVkLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKHR5cGUuY2FsbChlKSA9PT0gXCJbb2JqZWN0IEVycm9yXVwiICYmXHJcblx0XHRcdFx0IS8gRXJyb3IvLnRlc3QoZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpKSkge1xyXG5cdFx0XHRwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0XHRcdHRocm93IGVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0uc3luYyA9IGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHR2YXIgZGVmZXJyZWQgPSBtLmRlZmVycmVkKClcclxuXHRcdHZhciBvdXRzdGFuZGluZyA9IGFyZ3MubGVuZ3RoXHJcblx0XHR2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShvdXRzdGFuZGluZylcclxuXHRcdHZhciBtZXRob2QgPSBcInJlc29sdmVcIlxyXG5cclxuXHRcdGZ1bmN0aW9uIHN5bmNocm9uaXplcihwb3MsIHJlc29sdmVkKSB7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRyZXN1bHRzW3Bvc10gPSB2YWx1ZVxyXG5cdFx0XHRcdGlmICghcmVzb2x2ZWQpIG1ldGhvZCA9IFwicmVqZWN0XCJcclxuXHRcdFx0XHRpZiAoLS1vdXRzdGFuZGluZyA9PT0gMCkge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucHJvbWlzZShyZXN1bHRzKVxyXG5cdFx0XHRcdFx0ZGVmZXJyZWRbbWV0aG9kXShyZXN1bHRzKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmdzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9yRWFjaChhcmdzLCBmdW5jdGlvbiAoYXJnLCBpKSB7XHJcblx0XHRcdFx0YXJnLnRoZW4oc3luY2hyb25pemVyKGksIHRydWUpLCBzeW5jaHJvbml6ZXIoaSwgZmFsc2UpKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShbXSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHsgcmV0dXJuIHZhbHVlIH1cclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlSnNvbnAob3B0aW9ucykge1xyXG5cdFx0dmFyIGNhbGxiYWNrS2V5ID0gXCJtaXRocmlsX2NhbGxiYWNrX1wiICtcclxuXHRcdFx0bmV3IERhdGUoKS5nZXRUaW1lKCkgKyBcIl9cIiArXHJcblx0XHRcdChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTE2KSkudG9TdHJpbmcoMzYpXHJcblxyXG5cdFx0dmFyIHNjcmlwdCA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcblxyXG5cdFx0Z2xvYmFsW2NhbGxiYWNrS2V5XSA9IGZ1bmN0aW9uIChyZXNwKSB7XHJcblx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcclxuXHRcdFx0b3B0aW9ucy5vbmxvYWQoe1xyXG5cdFx0XHRcdHR5cGU6IFwibG9hZFwiLFxyXG5cdFx0XHRcdHRhcmdldDoge1xyXG5cdFx0XHRcdFx0cmVzcG9uc2VUZXh0OiByZXNwXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRnbG9iYWxbY2FsbGJhY2tLZXldID0gdW5kZWZpbmVkXHJcblx0XHR9XHJcblxyXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcclxuXHJcblx0XHRcdG9wdGlvbnMub25lcnJvcih7XHJcblx0XHRcdFx0dHlwZTogXCJlcnJvclwiLFxyXG5cdFx0XHRcdHRhcmdldDoge1xyXG5cdFx0XHRcdFx0c3RhdHVzOiA1MDAsXHJcblx0XHRcdFx0XHRyZXNwb25zZVRleHQ6IEpTT04uc3RyaW5naWZ5KHtcclxuXHRcdFx0XHRcdFx0ZXJyb3I6IFwiRXJyb3IgbWFraW5nIGpzb25wIHJlcXVlc3RcIlxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdGdsb2JhbFtjYWxsYmFja0tleV0gPSB1bmRlZmluZWRcclxuXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdHNjcmlwdC5zcmMgPSBvcHRpb25zLnVybCArXHJcblx0XHRcdChvcHRpb25zLnVybC5pbmRleE9mKFwiP1wiKSA+IDAgPyBcIiZcIiA6IFwiP1wiKSArXHJcblx0XHRcdChvcHRpb25zLmNhbGxiYWNrS2V5ID8gb3B0aW9ucy5jYWxsYmFja0tleSA6IFwiY2FsbGJhY2tcIikgK1xyXG5cdFx0XHRcIj1cIiArIGNhbGxiYWNrS2V5ICtcclxuXHRcdFx0XCImXCIgKyBidWlsZFF1ZXJ5U3RyaW5nKG9wdGlvbnMuZGF0YSB8fCB7fSlcclxuXHJcblx0XHQkZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjcmVhdGVYaHIob3B0aW9ucykge1xyXG5cdFx0dmFyIHhociA9IG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKVxyXG5cdFx0eGhyLm9wZW4ob3B0aW9ucy5tZXRob2QsIG9wdGlvbnMudXJsLCB0cnVlLCBvcHRpb25zLnVzZXIsXHJcblx0XHRcdG9wdGlvbnMucGFzc3dvcmQpXHJcblxyXG5cdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMub25sb2FkKHt0eXBlOiBcImxvYWRcIiwgdGFyZ2V0OiB4aHJ9KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLm9uZXJyb3Ioe3R5cGU6IFwiZXJyb3JcIiwgdGFyZ2V0OiB4aHJ9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLnNlcmlhbGl6ZSA9PT0gSlNPTi5zdHJpbmdpZnkgJiZcclxuXHRcdFx0XHRvcHRpb25zLmRhdGEgJiZcclxuXHRcdFx0XHRvcHRpb25zLm1ldGhvZCAhPT0gXCJHRVRcIikge1xyXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFxyXG5cdFx0XHRcdFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmRlc2VyaWFsaXplID09PSBKU09OLnBhcnNlKSB7XHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC8qXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzRnVuY3Rpb24ob3B0aW9ucy5jb25maWcpKSB7XHJcblx0XHRcdHZhciBtYXliZVhociA9IG9wdGlvbnMuY29uZmlnKHhociwgb3B0aW9ucylcclxuXHRcdFx0aWYgKG1heWJlWGhyICE9IG51bGwpIHhociA9IG1heWJlWGhyXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGRhdGEgPSBvcHRpb25zLm1ldGhvZCA9PT0gXCJHRVRcIiB8fCAhb3B0aW9ucy5kYXRhID8gXCJcIiA6IG9wdGlvbnMuZGF0YVxyXG5cclxuXHRcdGlmIChkYXRhICYmICFpc1N0cmluZyhkYXRhKSAmJiBkYXRhLmNvbnN0cnVjdG9yICE9PSBnbG9iYWwuRm9ybURhdGEpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUmVxdWVzdCBkYXRhIHNob3VsZCBiZSBlaXRoZXIgYmUgYSBzdHJpbmcgb3IgXCIgK1xyXG5cdFx0XHRcdFwiRm9ybURhdGEuIENoZWNrIHRoZSBgc2VyaWFsaXplYCBvcHRpb24gaW4gYG0ucmVxdWVzdGBcIilcclxuXHRcdH1cclxuXHJcblx0XHR4aHIuc2VuZChkYXRhKVxyXG5cdFx0cmV0dXJuIHhoclxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYWpheChvcHRpb25zKSB7XHJcblx0XHRpZiAob3B0aW9ucy5kYXRhVHlwZSAmJiBvcHRpb25zLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCkgPT09IFwianNvbnBcIikge1xyXG5cdFx0XHRyZXR1cm4gaGFuZGxlSnNvbnAob3B0aW9ucylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjcmVhdGVYaHIob3B0aW9ucylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJpbmREYXRhKG9wdGlvbnMsIGRhdGEsIHNlcmlhbGl6ZSkge1xyXG5cdFx0aWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiICYmIG9wdGlvbnMuZGF0YVR5cGUgIT09IFwianNvbnBcIikge1xyXG5cdFx0XHR2YXIgcHJlZml4ID0gb3B0aW9ucy51cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIlxyXG5cdFx0XHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKGRhdGEpXHJcblx0XHRcdG9wdGlvbnMudXJsICs9IChxdWVyeXN0cmluZyA/IHByZWZpeCArIHF1ZXJ5c3RyaW5nIDogXCJcIilcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YSA9IHNlcmlhbGl6ZShkYXRhKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFyYW1ldGVyaXplVXJsKHVybCwgZGF0YSkge1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoLzpbYS16XVxcdysvZ2ksIGZ1bmN0aW9uKHRva2VuKXtcclxuXHRcdFx0XHR2YXIga2V5ID0gdG9rZW4uc2xpY2UoMSlcclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV1cclxuXHRcdFx0XHRkZWxldGUgZGF0YVtrZXldXHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdXJsXHJcblx0fVxyXG5cclxuXHRtLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0aWYgKG9wdGlvbnMuYmFja2dyb3VuZCAhPT0gdHJ1ZSkgbS5zdGFydENvbXB1dGF0aW9uKClcclxuXHRcdHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpXHJcblx0XHR2YXIgaXNKU09OUCA9IG9wdGlvbnMuZGF0YVR5cGUgJiZcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImpzb25wXCJcclxuXHJcblx0XHR2YXIgc2VyaWFsaXplLCBkZXNlcmlhbGl6ZSwgZXh0cmFjdFxyXG5cclxuXHRcdGlmIChpc0pTT05QKSB7XHJcblx0XHRcdHNlcmlhbGl6ZSA9IG9wdGlvbnMuc2VyaWFsaXplID1cclxuXHRcdFx0ZGVzZXJpYWxpemUgPSBvcHRpb25zLmRlc2VyaWFsaXplID0gaWRlbnRpdHlcclxuXHJcblx0XHRcdGV4dHJhY3QgPSBmdW5jdGlvbiAoanNvbnApIHsgcmV0dXJuIGpzb25wLnJlc3BvbnNlVGV4dCB9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXJpYWxpemUgPSBvcHRpb25zLnNlcmlhbGl6ZSA9IG9wdGlvbnMuc2VyaWFsaXplIHx8IEpTT04uc3RyaW5naWZ5XHJcblxyXG5cdFx0XHRkZXNlcmlhbGl6ZSA9IG9wdGlvbnMuZGVzZXJpYWxpemUgPVxyXG5cdFx0XHRcdG9wdGlvbnMuZGVzZXJpYWxpemUgfHwgSlNPTi5wYXJzZVxyXG5cdFx0XHRleHRyYWN0ID0gb3B0aW9ucy5leHRyYWN0IHx8IGZ1bmN0aW9uICh4aHIpIHtcclxuXHRcdFx0XHRpZiAoeGhyLnJlc3BvbnNlVGV4dC5sZW5ndGggfHwgZGVzZXJpYWxpemUgIT09IEpTT04ucGFyc2UpIHtcclxuXHRcdFx0XHRcdHJldHVybiB4aHIucmVzcG9uc2VUZXh0XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b3B0aW9ucy5tZXRob2QgPSAob3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIikudG9VcHBlckNhc2UoKVxyXG5cdFx0b3B0aW9ucy51cmwgPSBwYXJhbWV0ZXJpemVVcmwob3B0aW9ucy51cmwsIG9wdGlvbnMuZGF0YSlcclxuXHRcdGJpbmREYXRhKG9wdGlvbnMsIG9wdGlvbnMuZGF0YSwgc2VyaWFsaXplKVxyXG5cdFx0b3B0aW9ucy5vbmxvYWQgPSBvcHRpb25zLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRldiA9IGV2IHx8IGV2ZW50XHJcblx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZGVzZXJpYWxpemUoZXh0cmFjdChldi50YXJnZXQsIG9wdGlvbnMpKVxyXG5cdFx0XHRcdGlmIChldi50eXBlID09PSBcImxvYWRcIikge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMudW53cmFwU3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IG9wdGlvbnMudW53cmFwU3VjY2VzcyhyZXNwb25zZSwgZXYudGFyZ2V0KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpc0FycmF5KHJlc3BvbnNlKSAmJiBvcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0Zm9yRWFjaChyZXNwb25zZSwgZnVuY3Rpb24gKHJlcywgaSkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlW2ldID0gbmV3IG9wdGlvbnMudHlwZShyZXMpXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBvcHRpb25zLnR5cGUocmVzcG9uc2UpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMudW53cmFwRXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBvcHRpb25zLnVud3JhcEVycm9yKHJlc3BvbnNlLCBldi50YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChlKVxyXG5cdFx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmJhY2tncm91bmQgIT09IHRydWUpIG0uZW5kQ29tcHV0YXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWpheChvcHRpb25zKVxyXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSA9IHByb3BpZnkoZGVmZXJyZWQucHJvbWlzZSwgb3B0aW9ucy5pbml0aWFsVmFsdWUpXHJcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIG1cclxufSlcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7cmVxdWlyZShcInBvbHl0aGVuZS9iYXNlLWJ1dHRvbi90aGVtZS90aGVtZVwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UtYnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPVt7XCIucGUtYnV0dG9uXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ1c2VyLXNlbGVjdFwiOlwibm9uZVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdXNlcl9zZWxlY3QpLHtvdXRsaW5lOlwibm9uZVwiLHBhZGRpbmc6MCxcInRleHQtZGVjb3JhdGlvblwiOlwibm9uZVwiLFwidGV4dC1hbGlnblwiOlwiY2VudGVyXCIsY3Vyc29yOlwicG9pbnRlclwiLFwiJi5wZS1idXR0b24tLXNlbGVjdGVkLCAmLnBlLWJ1dHRvbi0tZGlzYWJsZWQsICYucGUtYnV0dG9uLS1pbmFjdGl2ZVwiOntjdXJzb3I6XCJkZWZhdWx0XCIsXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwifSxcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e3Bvc2l0aW9uOlwicmVsYXRpdmVcIixcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIn0sXCIgLnBlLWJ1dHRvbl9fbGFiZWxcIjpbX21peGluMltcImRlZmF1bHRcIl0uZm9udFNtb290aGluZygpLHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCJ6LWluZGV4XCI6MSxkaXNwbGF5OlwiYmxvY2tcIixcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCJ9XSxcIiAucGUtYnV0dG9uX193YXNoXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7dHJhbnNpdGlvbjpcImJhY2tncm91bmQtY29sb3IgXCIrX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmFuaW1hdGlvbl9kdXJhdGlvbitcIiBcIitfY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2N1cnZlX2RlZmF1bHR9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7XCJ6LWluZGV4XCI6MSxcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIixcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCJ9XX1dfV07ZXhwb3J0c1tcImRlZmF1bHRcIl09c3R5bGUsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2Jhc2UtYnV0dG9uL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlcik7X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWJhc2UtYnV0dG9uXCIsX2xheW91dDJbXCJkZWZhdWx0XCJdKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF90eXBlb2Y9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9OmZ1bmN0aW9uKG9iail7cmV0dXJuIG9iaiYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZvYmouY29uc3RydWN0b3I9PT1TeW1ib2w/XCJzeW1ib2xcIjp0eXBlb2Ygb2JqfTtyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfcG9seXRoZW5lPXJlcXVpcmUoXCJwb2x5dGhlbmUvcG9seXRoZW5lL3BvbHl0aGVuZVwiKSxfcG9seXRoZW5lMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb2x5dGhlbmUpLF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKSxfcmlwcGxlPXJlcXVpcmUoXCJwb2x5dGhlbmUvcmlwcGxlL3JpcHBsZVwiKSxfcmlwcGxlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yaXBwbGUpLF9zaGFkb3c9cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvc2hhZG93XCIpLF9zaGFkb3cyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NoYWRvdyk7cmVxdWlyZShcInBvbHl0aGVuZS9iYXNlLWJ1dHRvbi9iYXNlLWJ1dHRvblwiKSxyZXF1aXJlKFwicG9seXRoZW5lL2J1dHRvbi90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtYnV0dG9uIHBlLWJ1dHRvbi0tdGV4dFwiLGNvbnRlbnQ6XCJwZS1idXR0b25fX2NvbnRlbnRcIixsYWJlbDpcInBlLWJ1dHRvbl9fbGFiZWxcIixyYWlzZWQ6XCJwZS1idXR0b24tLXJhaXNlZFwiLHdhc2g6XCJwZS1idXR0b25fX3dhc2hcIixzZWxlY3RlZDpcInBlLWJ1dHRvbi0tc2VsZWN0ZWRcIixkaXNhYmxlZDpcInBlLWJ1dHRvbi0tZGlzYWJsZWRcIixib3JkZXJzOlwicGUtYnV0dG9uLS1ib3JkZXJzXCIsaW5hY3RpdmU6XCJwZS1idXR0b24tLWluYWN0aXZlXCJ9LE1BWF9aPTUsc3RhcnRUeXBlPXdpbmRvdy5Qb2ludGVyRXZlbnQ/XCJwb2ludGVyZG93blwiOlwib250b3VjaHN0YXJ0XCJpbiB3aW5kb3d8fHdpbmRvdy5Eb2N1bWVudFRvdWNoJiZkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2g/XCJ0b3VjaHN0YXJ0XCI6XCJtb3VzZWRvd25cIixlbmRUeXBlPXdpbmRvdy5Qb2ludGVyRXZlbnQ/XCJwb2ludGVydXBcIjpcIm9udG91Y2hlbmRcImluIHdpbmRvd3x8d2luZG93LkRvY3VtZW50VG91Y2gmJmRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaD9cInRvdWNoZW5kXCI6XCJtb3VzZXVwXCIsdGFwU3RhcnQ9dm9pZCAwLHRhcEVuZD12b2lkIDAsdGFwRW5kQWxsPXZvaWQgMCxkb3duQnV0dG9ucz1bXSxhbmltYXRlWj1mdW5jdGlvbihjdHJsLG9wdHMsbmFtZSl7dmFyIGJhc2VaPWN0cmwuYmFzZVooKSxpbmNyZWFzZT1vcHRzLmluY3JlYXNlfHwxLHo9Y3RybC56KCk7XCJkb3duXCI9PT1uYW1lJiY1IT09YmFzZVo/KHorPWluY3JlYXNlLHo9TWF0aC5taW4oeixNQVhfWikpOlwidXBcIj09PW5hbWUmJih6LT1pbmNyZWFzZSx6PU1hdGgubWF4KHosYmFzZVopKSx6IT09Y3RybC56KCkmJihjdHJsLnooeiksX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKSl9LGluYWN0aXZhdGU9ZnVuY3Rpb24oY3RybCxvcHRzKXtjdHJsLmluYWN0aXZlPSEwLF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KCksc2V0VGltZW91dChmdW5jdGlvbigpe2N0cmwuaW5hY3RpdmU9ITEsX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKX0sMWUzKm9wdHMuaW5hY3RpdmF0ZSl9LGluaXRUYXBFdmVudHM9ZnVuY3Rpb24oZWwsY3RybCxvcHRzKXt2YXIgdGFwSGFuZGxlcj1mdW5jdGlvbihjdHJsLG9wdHMsbmFtZSl7XCJkb3duXCI9PT1uYW1lP2Rvd25CdXR0b25zLnB1c2goe2N0cmw6Y3RybCxvcHRzOm9wdHN9KTpcInVwXCI9PT1uYW1lJiZvcHRzLmluYWN0aXZhdGUmJiFvcHRzLmluYWN0aXZlJiZpbmFjdGl2YXRlKGN0cmwsb3B0cyksb3B0cy5hbmltYXRlT25UYXAmJiFfcG9seXRoZW5lMltcImRlZmF1bHRcIl0uaXNUb3VjaCYmYW5pbWF0ZVooY3RybCxvcHRzLG5hbWUpfTt0YXBTdGFydD1mdW5jdGlvbigpe3JldHVybiB0YXBIYW5kbGVyKGN0cmwsb3B0cyxcImRvd25cIil9LHRhcEVuZD1mdW5jdGlvbigpe3JldHVybiB0YXBIYW5kbGVyKGN0cmwsb3B0cyxcInVwXCIpfSx0YXBFbmRBbGw9ZnVuY3Rpb24oKXtkb3duQnV0dG9ucy5tYXAoZnVuY3Rpb24oYnRuKXt0YXBIYW5kbGVyKGJ0bi5jdHJsLGJ0bi5vcHRzLFwidXBcIil9KSxkb3duQnV0dG9ucz1bXX0sZWwuYWRkRXZlbnRMaXN0ZW5lcihzdGFydFR5cGUsdGFwU3RhcnQpLGVsLmFkZEV2ZW50TGlzdGVuZXIoZW5kVHlwZSx0YXBFbmQpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGVuZFR5cGUsdGFwRW5kQWxsKX0sY2xlYXJUYXBFdmVudHM9ZnVuY3Rpb24oZWwpe2VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoc3RhcnRUeXBlLHRhcFN0YXJ0KSxlbC5yZW1vdmVFdmVudExpc3RlbmVyKGVuZFR5cGUsdGFwRW5kKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbmRUeXBlLHRhcEVuZEFsbCl9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSxub2luaz12b2lkIDAhPT1vcHRzLmluayYmIW9wdHMuaW5rLGRpc2FibGVkPW9wdHMuZGlzYWJsZWQsaW5hY3RpdmU9Y3RybC5pbmFjdGl2ZSx0YWc9b3B0cy50YWd8fFwiYVwiLGJ1dHRvbkNvbmZpZz1mdW5jdGlvbihlbCxpc0luaXRlZCxjb250ZXh0KXtpc0luaXRlZHx8ZGlzYWJsZWR8fGluYWN0aXZlfHwoaW5pdFRhcEV2ZW50cyhlbCxjdHJsLE9iamVjdC5hc3NpZ24oe30sb3B0cyx7YW5pbWF0ZU9uVGFwOm9wdHMuYW5pbWF0ZU9uVGFwIT09ITF9KSksY29udGV4dC5vbnVubG9hZD1mdW5jdGlvbigpe2NsZWFyVGFwRXZlbnRzKGVsKX0pfSxvcHRzQ29uZmlnPW9wdHMuY29uZmlnfHxmdW5jdGlvbigpe30sdXJsQ29uZmlnPW9wdHMudXJsJiZvcHRzLnVybC5jb25maWc/b3B0cy51cmwuY29uZmlnOmZ1bmN0aW9uKCl7fSxwcm9wcz1PYmplY3QuYXNzaWduKHt9LHtcImNsYXNzXCI6W29wdHMucGFyZW50Q2xhc3N8fENTU19DTEFTU0VTLmJsb2NrLG9wdHMuc2VsZWN0ZWQ/Q1NTX0NMQVNTRVMuc2VsZWN0ZWQ6bnVsbCxkaXNhYmxlZD9DU1NfQ0xBU1NFUy5kaXNhYmxlZDpudWxsLGluYWN0aXZlP0NTU19DTEFTU0VTLmluYWN0aXZlOm51bGwsb3B0cy5ib3JkZXJzP0NTU19DTEFTU0VTLmJvcmRlcnM6bnVsbCxvcHRzLnJhaXNlZD9DU1NfQ0xBU1NFUy5yYWlzZWQ6bnVsbCxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCJ9LG9wdHMudXJsP29wdHMudXJsOm51bGwsb3B0cy5mb3JtYWN0aW9uP3tmb3JtYWN0aW9uOm9wdHMuZm9ybWFjdGlvbn06bnVsbCxvcHRzLnR5cGU/e3R5cGU6b3B0cy50eXBlfTpudWxsLG9wdHMuZXZlbnRzP29wdHMuZXZlbnRzOm51bGwse2NvbmZpZzpmdW5jdGlvbigpe3JldHVybltidXR0b25Db25maWcuYXBwbHkodm9pZCAwLGFyZ3VtZW50cyksb3B0c0NvbmZpZy5hcHBseSh2b2lkIDAsYXJndW1lbnRzKSx1cmxDb25maWcuYXBwbHkodm9pZCAwLGFyZ3VtZW50cyldfX0sZGlzYWJsZWQ/e2Rpc2FibGVkOiEwfTpudWxsKSxsYWJlbD1vcHRzLmNvbnRlbnQ/b3B0cy5jb250ZW50Om9wdHMubGFiZWw/XCJvYmplY3RcIj09PV90eXBlb2Yob3B0cy5sYWJlbCk/b3B0cy5sYWJlbDooeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMubGFiZWwgfSwgY2hpbGRyZW46IFsgb3B0cy5sYWJlbCBdIH0pOm51bGwsY29udGVudD0oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCB9LCBjaGlsZHJlbjogWyBvcHRzLnJhaXNlZCYmIWRpc2FibGVkP19taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9zaGFkb3cyW1wiZGVmYXVsdFwiXSx7ejpjdHJsLnooKSxhbmltYXRlZDohMH0pOm51bGwsZGlzYWJsZWR8fG5vaW5rP251bGw6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX3JpcHBsZTJbXCJkZWZhdWx0XCJdLG9wdHMucmlwcGxlfHx7fSksZGlzYWJsZWR8fHZvaWQgMCE9PW9wdHMud2FzaCYmIW9wdHMud2FzaD9udWxsOih7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy53YXNoIH0sIGNoaWxkcmVuOiBbXSB9KSxsYWJlbCBdIH0pO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17Y29udHJvbGxlcjpmdW5jdGlvbigpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF0sej12b2lkIDAhPT1vcHRzLno/b3B0cy56OjE7cmV0dXJue2Jhc2VaOl9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcCh6KSx6Ol9taXRocmlsMltcImRlZmF1bHRcIl0ucHJvcCh6KSxpbmFjdGl2ZTpvcHRzLmluYWN0aXZlfHwhMX19LHZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50LHR5cGUpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0zfHx2b2lkIDA9PT1hcmd1bWVudHNbM10/XCJcIjphcmd1bWVudHNbM10sbm9ybWFsQm9yZGVyPWNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ub3JtYWxfYm9yZGVyXCJdfHxcInRyYW5zcGFyZW50XCIsYWN0aXZlQm9yZGVyPWNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9hY3RpdmVfYm9yZGVyXCJdfHxub3JtYWxCb3JkZXIsZGlzYWJsZWRCb3JkZXI9Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2Rpc2FibGVkX2JvcmRlclwiXXx8bm9ybWFsQm9yZGVyO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtYnV0dG9uXCIse1wiJiwgJjpsaW5rLCAmOnZpc2l0ZWRcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX25vcm1hbF90ZXh0XCJdfSxcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfXCIrdHlwZStcIl9ub3JtYWxfYmFja2dyb3VuZFwiXSxcImJvcmRlci1jb2xvclwiOm5vcm1hbEJvcmRlcn0sXCImLnBlLWJ1dHRvbi0tZGlzYWJsZWRcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2Rpc2FibGVkX3RleHRcIl0sXCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfZGlzYWJsZWRfYmFja2dyb3VuZFwiXSxcImJvcmRlci1jb2xvclwiOmRpc2FibGVkQm9yZGVyfX0sXCImLnBlLWJ1dHRvbi0tc2VsZWN0ZWRcIjp7XCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfYWN0aXZlX2JhY2tncm91bmRcIl0sXCJib3JkZXItY29sb3JcIjphY3RpdmVCb3JkZXJ9LFwiIC5wZS1idXR0b25fX3dhc2hcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2hvdmVyX2JhY2tncm91bmRcIl19fSxcIiY6YWN0aXZlXCI6e1wiIC5wZS1idXR0b25fX3dhc2hcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2hvdmVyX2JhY2tncm91bmRcIl19fX0pXX0sbm9Ub3VjaD1mdW5jdGlvbihjb25maWcsdGludCx0eXBlKXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9M3x8dm9pZCAwPT09YXJndW1lbnRzWzNdP1wiXCI6YXJndW1lbnRzWzNdLG5vcm1hbEJvcmRlcj1jb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfbm9ybWFsX2JvcmRlclwiXSxob3ZlckJvcmRlcj1jb25maWdbXCJjb2xvcl9cIit0aW50K1wiX1wiK3R5cGUrXCJfbm9ybWFsX2JvcmRlclwiXXx8bm9ybWFsQm9yZGVyO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtYnV0dG9uOmhvdmVyXCIse1wiJjpub3QoLnBlLWJ1dHRvbi0tc2VsZWN0ZWQpIC5wZS1idXR0b25fX3dhc2hcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9cIit0eXBlK1wiX2hvdmVyX2JhY2tncm91bmRcIl0sXCJib3JkZXItY29sb3JcIjpob3ZlckJvcmRlcn19KV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiLFwiZmxhdFwiKSxzdHlsZShjb25maWcsXCJsaWdodFwiLFwicmFpc2VkXCIsXCIucGUtYnV0dG9uLS1yYWlzZWRcIikse1wiaHRtbC5wZS1uby10b3VjaFwiOltub1RvdWNoKGNvbmZpZyxcImxpZ2h0XCIsXCJmbGF0XCIsXCIgXCIpLG5vVG91Y2goY29uZmlnLFwibGlnaHRcIixcInJhaXNlZFwiLFwiIC5wZS1idXR0b24tLXJhaXNlZFwiKV19LHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcImZsYXRcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwicmFpc2VkXCIsXCIgLnBlLWJ1dHRvbi0tcmFpc2VkXCIpXX0se1wiaHRtbC5wZS1uby10b3VjaCAucGUtZGFyay10aGVtZVwiOltub1RvdWNoKGNvbmZpZyxcImRhcmtcIixcImZsYXRcIixcIiBcIiksbm9Ub3VjaChjb25maWcsXCJkYXJrXCIsXCJyYWlzZWRcIixcIiAucGUtYnV0dG9uLS1yYWlzZWRcIildfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLHJnYmE9X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEsdG91Y2hfaGVpZ2h0PV9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X3RvdWNoX2hlaWdodCxoZWlnaHQ9MzY7ZXhwb3J0c1tcImRlZmF1bHRcIl09e21hcmdpbl9oOl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXQsYm9yZGVyX3JhZGl1czpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pdGVtX2JvcmRlcl9yYWRpdXMsZm9udF9zaXplOjE0LGZvbnRfd2VpZ2h0OjUwMCxvdXRlcl9wYWRkaW5nX3Y6KHRvdWNoX2hlaWdodC1oZWlnaHQpLzIscGFkZGluZ19oOjIqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdCxwYWRkaW5nX3Y6MTEsbWluX3dpZHRoOjgqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQsdGV4dF90cmFuc2Zvcm06XCJ1cHBlcmNhc2VcIixib3JkZXJfd2lkdGg6MCxjb2xvcl9saWdodF9mbGF0X25vcm1hbF9iYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIixjb2xvcl9saWdodF9mbGF0X25vcm1hbF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeSksY29sb3JfbGlnaHRfZmxhdF9ob3Zlcl9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2xpZ2h0X2ZsYXRfYWN0aXZlX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9hY3RpdmUpLGNvbG9yX2xpZ2h0X2ZsYXRfZGlzYWJsZWRfYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsY29sb3JfbGlnaHRfZmxhdF9kaXNhYmxlZF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfZGlzYWJsZWQpLGNvbG9yX2xpZ2h0X3JhaXNlZF9ub3JtYWxfYmFja2dyb3VuZDpcIiNFMEUwRTBcIixjb2xvcl9saWdodF9yYWlzZWRfbm9ybWFsX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5KSxjb2xvcl9saWdodF9yYWlzZWRfaG92ZXJfYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsY29sb3JfbGlnaHRfcmFpc2VkX2FjdGl2ZV9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfaG92ZXIpLGNvbG9yX2xpZ2h0X3JhaXNlZF9kaXNhYmxlZF9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JhY2tncm91bmRfZGlzYWJsZWQpLGNvbG9yX2xpZ2h0X3JhaXNlZF9kaXNhYmxlZF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfZGlzYWJsZWQpLGNvbG9yX2RhcmtfZmxhdF9ub3JtYWxfYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsY29sb3JfZGFya19mbGF0X25vcm1hbF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3ByaW1hcnkpLGNvbG9yX2RhcmtfZmxhdF9ob3Zlcl9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9kYXJrX2ZsYXRfYWN0aXZlX2JhY2tncm91bmQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JhY2tncm91bmRfYWN0aXZlKSxjb2xvcl9kYXJrX2ZsYXRfZGlzYWJsZWRfYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsY29sb3JfZGFya19mbGF0X2Rpc2FibGVkX3RleHQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfZGlzYWJsZWQpLGNvbG9yX2RhcmtfcmFpc2VkX25vcm1hbF9iYWNrZ3JvdW5kOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX3ByaW1hcnkpLGNvbG9yX2RhcmtfcmFpc2VkX25vcm1hbF90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3ByaW1hcnkpLGNvbG9yX2RhcmtfcmFpc2VkX2hvdmVyX2JhY2tncm91bmQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX3ByaW1hcnlfYWN0aXZlLGNvbG9yX2RhcmtfcmFpc2VkX2FjdGl2ZV9iYWNrZ3JvdW5kOl9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9wcmltYXJ5X2RhcmssY29sb3JfZGFya19yYWlzZWRfZGlzYWJsZWRfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfYmFja2dyb3VuZF9kaXNhYmxlZCksY29sb3JfZGFya19yYWlzZWRfZGlzYWJsZWRfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9kaXNhYmxlZCl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLWJ1dHRvbi0tdGV4dFwiOntkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXCJtaW4td2lkdGhcIjpjb25maWcubWluX3dpZHRoK1wicHhcIixtYXJnaW46XCIwIFwiK2NvbmZpZy5tYXJnaW5faCtcInB4XCIscGFkZGluZzpjb25maWcub3V0ZXJfcGFkZGluZ192K1wicHggMFwiLGJhY2tncm91bmQ6XCJ0cmFuc3BhcmVudFwiLGJvcmRlcjpcIm5vbmVcIixcIiAucGUtYnV0dG9uX19jb250ZW50XCI6e1wiYm9yZGVyLXdpZHRoXCI6MCxwYWRkaW5nOlwiMCBcIitjb25maWcucGFkZGluZ19oK1wicHhcIixcImJvcmRlci1yYWRpdXNcIjpjb25maWcuYm9yZGVyX3JhZGl1cytcInB4XCJ9LFwiIC5wZS1idXR0b25fX2xhYmVsXCI6e3BhZGRpbmc6Y29uZmlnLnBhZGRpbmdfditcInB4IDBcIixcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemUrXCJweFwiLFwibGluZS1oZWlnaHRcIjpjb25maWcuZm9udF9zaXplK1wicHhcIixcImZvbnQtd2VpZ2h0XCI6Y29uZmlnLmZvbnRfd2VpZ2h0LFwidGV4dC10cmFuc2Zvcm1cIjpjb25maWcudGV4dF90cmFuc2Zvcm0sXCJ3aGl0ZS1zcGFjZVwiOlwicHJlXCJ9LFwiJi5wZS1idXR0b24tLWJvcmRlcnNcIjp7XCIgLnBlLWJ1dHRvbl9fd2FzaFwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgtMSksXCIgLnBlLXJpcHBsZVwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgtMSksXCIgLnBlLWJ1dHRvbl9fY29udGVudFwiOntcImJvcmRlci1zdHlsZVwiOlwic29saWRcIixcImJvcmRlci13aWR0aFwiOlwiMXB4XCJ9LFwiIC5wZS1idXR0b25fX2xhYmVsXCI6e3BhZGRpbmc6Y29uZmlnLnBhZGRpbmdfdi0xK1wicHggMFwifX19fV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2J1dHRvbi90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9idXR0b24vdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvYnV0dG9uL3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLmJ1dHRvbixjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWJ1dHRvbi10ZXh0XCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsaXN0ZW5lcnM9e30sdGhyb3R0bGU9ZnVuY3Rpb24oZnVuYyl7dmFyIHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdPy4wNTphcmd1bWVudHNbMV0sY29udGV4dD1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/d2luZG93OmFyZ3VtZW50c1syXSx3YWl0PSExO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgX2xlbj1hcmd1bWVudHMubGVuZ3RoLGFyZ3M9QXJyYXkoX2xlbiksX2tleT0wO19sZW4+X2tleTtfa2V5KyspYXJnc1tfa2V5XT1hcmd1bWVudHNbX2tleV07dmFyIGxhdGVyPWZ1bmN0aW9uKCl7ZnVuYy5hcHBseShjb250ZXh0LGFyZ3MpfTt3YWl0fHwobGF0ZXIoKSx3YWl0PSEwLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt3YWl0PSExfSxzKSl9fSxzdWJzY3JpYmU9ZnVuY3Rpb24oZXZlbnROYW1lLGxpc3RlbmVyLGRlbGF5KXtsaXN0ZW5lcnNbZXZlbnROYW1lXT1saXN0ZW5lcnNbZXZlbnROYW1lXXx8W10sbGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChkZWxheT90aHJvdHRsZShsaXN0ZW5lcixkZWxheSk6bGlzdGVuZXIpfSx1bnN1YnNjcmliZT1mdW5jdGlvbihldmVudE5hbWUsbGlzdGVuZXIpe2lmKGxpc3RlbmVyc1tldmVudE5hbWVdKXt2YXIgaW5kZXg9bGlzdGVuZXJzW2V2ZW50TmFtZV0uaW5kZXhPZihsaXN0ZW5lcik7aW5kZXg+LTEmJmxpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpbmRleCwxKX19LGVtaXQ9ZnVuY3Rpb24oZXZlbnROYW1lLGV2ZW50KXtsaXN0ZW5lcnNbZXZlbnROYW1lXSYmbGlzdGVuZXJzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcil7bGlzdGVuZXIoZXZlbnQpfSl9O3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oZSl7cmV0dXJuIGVtaXQoXCJyZXNpemVcIixlKX0pLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsZnVuY3Rpb24oZSl7cmV0dXJuIGVtaXQoXCJzY3JvbGxcIixlKX0pLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGZ1bmN0aW9uKGUpe3JldHVybiBlbWl0KFwia2V5ZG93blwiLGUpfSksZXhwb3J0c1tcImRlZmF1bHRcIl09e3Rocm90dGxlOnRocm90dGxlLHN1YnNjcmliZTpzdWJzY3JpYmUsdW5zdWJzY3JpYmU6dW5zdWJzY3JpYmUsZW1pdDplbWl0fSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyk7cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgdmVuZG9yaXplPWZ1bmN0aW9uKHdoYXQscHJlZml4ZXMpe3ZhciB2ZW5kb3JzU2VsPXByZWZpeGVzLm1hcChmdW5jdGlvbih2KXtyZXR1cm5cIl9cIit2K1wiJFwifSkuam9pbihcIlwiKTtyZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LHZlbmRvcnNTZWwsd2hhdCl9LGZpdD1mdW5jdGlvbigpe3ZhciBvZmZzZXQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPzA6YXJndW1lbnRzWzBdLG9mZnNldFB4PW9mZnNldCtcInB4XCI7cmV0dXJue3Bvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6b2Zmc2V0UHgscmlnaHQ6b2Zmc2V0UHgsYm90dG9tOm9mZnNldFB4LGxlZnQ6b2Zmc2V0UHh9fSxmb250U21vb3RoaW5nPWZ1bmN0aW9uKCl7dmFyIHNtb290aGluZz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/ITA6YXJndW1lbnRzWzBdO3JldHVybiBzbW9vdGhpbmc/e1wiLXdlYmtpdC1mb250LXNtb290aGluZ1wiOlwiYW50aWFsaWFzZWRcIixcIi1tb3otb3N4LWZvbnQtc21vb3RoaW5nXCI6XCJncmF5c2NhbGVcIn06e1wiLXdlYmtpdC1mb250LXNtb290aGluZ1wiOlwic3VicGl4ZWwtYW50aWFsaWFzZWRcIixcIi1tb3otb3N4LWZvbnQtc21vb3RoaW5nXCI6XCJhdXRvXCJ9fSxlbGxpcHNpcz1mdW5jdGlvbihsaW5lcyxsaW5lSGVpZ2h0KXtyZXR1cm5cIm5vbmVcIj09PWxpbmVzP3tcInRleHQtb3ZlcmZsb3dcIjpcImluaXRpYWxcIixvdmVyZmxvdzpcImluaXRpYWxcIixcIndoaXRlLXNwYWNlXCI6XCJpbml0aWFsXCIsZGlzcGxheTpcImJsb2NrXCIsaGVpZ2h0OlwiYXV0b1wifTpPYmplY3QuYXNzaWduKHtvdmVyZmxvdzpcImhpZGRlblwiLFwid2hpdGUtc3BhY2VcIjpcIm5vd3JhcFwiLFwidGV4dC1vdmVyZmxvd1wiOlwiZWxsaXBzaXNcIixcInRleHQtcmVuZGVyaW5nXCI6XCJhdXRvXCJ9LHZvaWQgMCE9PWxpbmVzP3tcIi13ZWJraXQtbGluZS1jbGFtcFwiOmxpbmVzLFwiLXdlYmtpdC1ib3gtb3JpZW50XCI6XCJ2ZXJ0aWNhbFwiLGRpc3BsYXk6XCItd2Via2l0LWJveFwiLGhlaWdodDpsaW5lcypsaW5lSGVpZ2h0K1wicHhcIn06bnVsbCl9LGNsZWFyZml4PWZ1bmN0aW9uKCl7cmV0dXJue1wiJjphZnRlclwiOntjb250ZW50OidcIlwiJyxkaXNwbGF5OlwidGFibGVcIixjbGVhcjpcImJvdGhcIn19fSxoYWlybGluZT1mdW5jdGlvbigpe3JldHVybnt9fSxzdGlja3k9ZnVuY3Rpb24oKXtyZXR1cm5be3Bvc2l0aW9uOlwiLXdlYmtpdC1zdGlja3lcIn0se3Bvc2l0aW9uOlwiLW1vei1zdGlja3lcIn0se3Bvc2l0aW9uOlwiLW8tc3RpY2t5XCJ9LHtwb3NpdGlvbjpcIi1tcy1zdGlja3lcIn0se3Bvc2l0aW9uOlwic3RpY2t5XCJ9LHt0b3A6MCxcInotaW5kZXhcIjoxfV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb21tb24sZm4pe3JldHVybiBBcnJheS5pc0FycmF5KGNvbW1vbik/Y29tbW9uLm1hcChmdW5jdGlvbihvKXtmb3IodmFyIHNjb3BlIGluIG8pcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZSxmbihvW3Njb3BlXSkpfSk6Zm4oY29tbW9uKX0sZGVmYXVsdFRyYW5zaXRpb249ZnVuY3Rpb24oKXt2YXIgcHJvcGVydGllcz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJhbGxcIjphcmd1bWVudHNbMF0sZHVyYXRpb249YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP19jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fZHVyYXRpb246YXJndW1lbnRzWzFdLGN1cnZlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9fY29uZmlnMltcImRlZmF1bHRcIl0uYW5pbWF0aW9uX2N1cnZlX2RlZmF1bHQ6YXJndW1lbnRzWzJdO3JldHVyblt2ZW5kb3JpemUoe1widHJhbnNpdGlvbi1kZWxheVwiOjB9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSx2ZW5kb3JpemUoe1widHJhbnNpdGlvbi1kdXJhdGlvblwiOmR1cmF0aW9ufSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbiksdmVuZG9yaXplKHtcInRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6Y3VydmV9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSx2ZW5kb3JpemUoe1widHJhbnNpdGlvbi1wcm9wZXJ0eVwiOnByb3BlcnRpZXN9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKV19LGZsdWlkU2NhbGU9ZnVuY3Rpb24ocHJvcGVydHksdW5pdCxtaW5WYWx1ZSxtYXhWYWx1ZSl7dmFyIG1pbkJyZWFrcG9pbnQ9YXJndW1lbnRzLmxlbmd0aDw9NHx8dm9pZCAwPT09YXJndW1lbnRzWzRdPzMyMDphcmd1bWVudHNbNF0sbWF4QnJlYWtwb2ludD1hcmd1bWVudHMubGVuZ3RoPD01fHx2b2lkIDA9PT1hcmd1bWVudHNbNV0/MTkyMDphcmd1bWVudHNbNV0sb3JpZW50YXRpb249YXJndW1lbnRzLmxlbmd0aDw9Nnx8dm9pZCAwPT09YXJndW1lbnRzWzZdP1wiaG9yaXpvbnRhbFwiOmFyZ3VtZW50c1s2XTtyZXR1cm4gZmx1aWRTY2FsZXMoW3Byb3BlcnR5XSx1bml0LFtbbWluQnJlYWtwb2ludCxtaW5WYWx1ZV0sW21heEJyZWFrcG9pbnQsbWF4VmFsdWVdXSxvcmllbnRhdGlvbil9LGZsdWlkU2NhbGVzPWZ1bmN0aW9uKHByb3BlcnR5LHVuaXQsc2l6ZXMsb3JpZW50YXRpb24pe3ZhciBzb3J0ZWQ9c2l6ZXMuc29ydCgpLG1pbkJyZWFrcG9pbnRzPXNvcnRlZC5tYXAoZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRhdGFbMF19KSxtYXhCcmVha3BvaW50cz1zb3J0ZWQubWFwKGZ1bmN0aW9uKGRhdGEpe3JldHVybiBkYXRhWzBdfSk7bWF4QnJlYWtwb2ludHMuc2hpZnQoKSxtYXhCcmVha3BvaW50cy5wdXNoKG1pbkJyZWFrcG9pbnRzW21pbkJyZWFrcG9pbnRzLmxlbmd0aC0xXSk7dmFyIG1pblZhbHVlcz1zb3J0ZWQubWFwKGZ1bmN0aW9uKGRhdGEpe3JldHVybiBkYXRhWzFdfSksbWF4VmFsdWVzPXNvcnRlZC5tYXAoZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRhdGFbMV19KTtyZXR1cm4gbWF4VmFsdWVzLnNoaWZ0KCksbWF4VmFsdWVzLnB1c2gobWluVmFsdWVzW21pblZhbHVlcy5sZW5ndGgtMV0pLHNvcnRlZC5tYXAoZnVuY3Rpb24oZGF0YSxpbmRleCl7cmV0dXJuIGZsdWlkUnVsZShwcm9wZXJ0eSx1bml0LG9yaWVudGF0aW9uLG1pbkJyZWFrcG9pbnRzW2luZGV4XSxtYXhCcmVha3BvaW50c1tpbmRleF0sbWluVmFsdWVzW2luZGV4XSxtYXhWYWx1ZXNbaW5kZXhdLDA9PT1pbmRleCxpbmRleD09PXNvcnRlZC5sZW5ndGgtMSl9KX0sZmx1aWRSdWxlPWZ1bmN0aW9uKHByb3BlcnR5LHVuaXQpe3ZhciBvcmllbnRhdGlvbj1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJob3Jpem9udGFsXCI6YXJndW1lbnRzWzJdLG1pbkJyZWFrcG9pbnQ9YXJndW1lbnRzWzNdLG1heEJyZWFrcG9pbnQ9YXJndW1lbnRzWzRdLG1pblZhbHVlPWFyZ3VtZW50c1s1XSxtYXhWYWx1ZT1hcmd1bWVudHNbNl0saXNGaXJzdD1hcmd1bWVudHNbN10saXNMYXN0PWFyZ3VtZW50c1s4XSxvcmllbnRhdGlvblVuaXQ9XCJ2ZXJ0aWNhbFwiPT09b3JpZW50YXRpb24/XCJ2aFwiOlwidndcIixvcmllbnRhdGlvblJ1bGU9XCJ2ZXJ0aWNhbFwiPT09b3JpZW50YXRpb24/XCJoZWlnaHRcIjpcIndpZHRoXCIscnVsZT1pc0xhc3Q/W1wiQG1lZGlhIChtaW4tXCIrb3JpZW50YXRpb25SdWxlK1wiOiBcIittaW5CcmVha3BvaW50K1wicHgpXCJdOltcIkBtZWRpYSAobWluLVwiK29yaWVudGF0aW9uUnVsZStcIjogXCIrbWluQnJlYWtwb2ludCtcInB4KSBhbmQgKG1heC1cIitvcmllbnRhdGlvblJ1bGUrXCI6IFwiK21heEJyZWFrcG9pbnQrXCJweClcIl0sbXVsdGlwbGllcj1cIigoXCIrbWF4VmFsdWUrXCIgLSBcIittaW5WYWx1ZStcIikgLyAoXCIrbWF4QnJlYWtwb2ludCtcIiAtIFwiK21pbkJyZWFrcG9pbnQrXCIpICogMTAwXCIrb3JpZW50YXRpb25Vbml0K1wiKVwiLGFkZGVyPVwiKCgoXCIrbWluVmFsdWUrXCIgKiBcIittYXhCcmVha3BvaW50K1wiKSAtIChcIittYXhWYWx1ZStcIiAqIFwiK21pbkJyZWFrcG9pbnQrXCIpKSAvIChcIittYXhCcmVha3BvaW50K1wiIC0gXCIrbWluQnJlYWtwb2ludCtcIikpICogMVwiK3VuaXQsZm9ybXVsYT1cImNhbGMoXCIrbXVsdGlwbGllcitcIiArIFwiK2FkZGVyK1wiKVwiLHByb3BlcnRpZXM9QXJyYXkuaXNBcnJheShwcm9wZXJ0eSk/cHJvcGVydHk6W3Byb3BlcnR5XTtyZXR1cm5baXNGaXJzdD9wcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwKXtyZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LHAsXCJcIittaW5WYWx1ZSt1bml0KX0pOm51bGwsX2RlZmluZVByb3BlcnR5KHt9LHJ1bGUscHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocCl7cmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSxwLGlzTGFzdD9cIlwiK21heFZhbHVlK3VuaXQ6Zm9ybXVsYSl9KSldfTtleHBvcnRzW1wiZGVmYXVsdFwiXT17Y2xlYXJmaXg6Y2xlYXJmaXgsY3JlYXRlU3R5bGVzOmNyZWF0ZVN0eWxlcyxkZWZhdWx0VHJhbnNpdGlvbjpkZWZhdWx0VHJhbnNpdGlvbixlbGxpcHNpczplbGxpcHNpcyxmaXQ6Zml0LGZvbnRTbW9vdGhpbmc6Zm9udFNtb290aGluZyxmbHVpZFNjYWxlOmZsdWlkU2NhbGUsZmx1aWRTY2FsZXM6Zmx1aWRTY2FsZXMsaGFpcmxpbmU6aGFpcmxpbmUsc3RpY2t5OnN0aWNreSx2ZW5kb3JpemU6dmVuZG9yaXplfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1peGluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKTtyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBtdWx0aXBsZT1mdW5jdGlvbihtT3B0cyl7dmFyIGl0ZW1zPVtdLGl0ZW1JbmRleD1mdW5jdGlvbihpZCl7dmFyIGl0ZW09ZmluZEl0ZW0oaWQpO3JldHVybiBpdGVtcy5pbmRleE9mKGl0ZW0pfSxyZW1vdmVJdGVtPWZ1bmN0aW9uKGlkKXt2YXIgaW5kZXg9aXRlbUluZGV4KGlkKTstMSE9PWluZGV4JiZpdGVtcy5zcGxpY2UoaW5kZXgsMSl9LHJlcGxhY2VJdGVtPWZ1bmN0aW9uKGlkLG5ld0l0ZW0pe3ZhciBpbmRleD1pdGVtSW5kZXgoaWQpOy0xIT09aW5kZXgmJihpdGVtc1tpbmRleF09bmV3SXRlbSl9LGZpbmRJdGVtPWZ1bmN0aW9uKGlkKXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspaWYoaXRlbXNbaV0uaW5zdGFuY2VJZD09PWlkKXJldHVybiBpdGVtc1tpXX0sbmV4dD1mdW5jdGlvbigpe2l0ZW1zLmxlbmd0aCYmKGl0ZW1zWzBdLnNob3c9ITAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXS5yZWRyYXcoKSl9LF9yZW1vdmU9ZnVuY3Rpb24oaW5zdGFuY2VJZCl7bU9wdHMucXVldWU/KGl0ZW1zLnNoaWZ0KCksc2V0VGltZW91dChuZXh0LDApKTpyZW1vdmVJdGVtKGluc3RhbmNlSWQpfSxzZXRQYXVzZVN0YXRlPWZ1bmN0aW9uKHBhdXNlLGluc3RhbmNlSWQpe3ZhciBpdGVtPWZpbmRJdGVtKGluc3RhbmNlSWQpO2l0ZW0mJihpdGVtLnBhdXNlPXBhdXNlLGl0ZW0udW5wYXVzZT0hcGF1c2UpfSxtYWtlSXRlbT1mdW5jdGlvbihpdGVtT3B0cyxpbnN0YW5jZUlkKXt2YXIgb3B0cz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpdGVtT3B0cz9pdGVtT3B0cygpOml0ZW1PcHRzLHJlc29sdmVTaG93PXZvaWQgMCxkaWRTaG93PWZ1bmN0aW9uKCl7cmV0dXJuIG9wdHMuZGlkU2hvdyYmb3B0cy5kaWRTaG93KGluc3RhbmNlSWQpLHJlc29sdmVTaG93KGluc3RhbmNlSWQpfSxzaG93UHJvbWlzZT1uZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtyZXNvbHZlU2hvdz1yZXNvbHZlfSkscmVzb2x2ZUhpZGU9dm9pZCAwLGRpZEhpZGU9ZnVuY3Rpb24oKXtyZXR1cm4gb3B0cy5kaWRIaWRlJiZvcHRzLmRpZEhpZGUoaW5zdGFuY2VJZCksbU9wdHMucXVldWUmJl9yZW1vdmUoaW5zdGFuY2VJZCkscmVzb2x2ZUhpZGUoaW5zdGFuY2VJZCl9LGhpZGVQcm9taXNlPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe3Jlc29sdmVIaWRlPXJlc29sdmV9KTtyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxtT3B0cyx7aW5zdGFuY2VJZDppbnN0YW5jZUlkLG9wdHM6b3B0cyxzaG93OiFtT3B0cy5xdWV1ZSxzaG93UHJvbWlzZTpzaG93UHJvbWlzZSxoaWRlUHJvbWlzZTpoaWRlUHJvbWlzZSxkaWRTaG93OmRpZFNob3csZGlkSGlkZTpkaWRIaWRlfSl9O3JldHVybntjb3VudDpmdW5jdGlvbigpe3JldHVybiBpdGVtcy5sZW5ndGh9LGNsZWFyOmZ1bmN0aW9uKCl7cmV0dXJuIGl0ZW1zLmxlbmd0aD0wfSxzaG93OmZ1bmN0aW9uKG9wdHMpe3ZhciBpbnN0YW5jZUlkPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT9tT3B0cy5kZWZhdWx0SWQ6YXJndW1lbnRzWzFdLGl0ZW09dm9pZCAwO2lmKG1PcHRzLnF1ZXVlKWl0ZW09bWFrZUl0ZW0ob3B0cyxpbnN0YW5jZUlkKSxpdGVtcy5wdXNoKGl0ZW0pLDE9PT1pdGVtcy5sZW5ndGgmJm5leHQoKTtlbHNle3ZhciBzdG9yZWRJdGVtPWZpbmRJdGVtKGluc3RhbmNlSWQpO2l0ZW09bWFrZUl0ZW0ob3B0cyxpbnN0YW5jZUlkKSxzdG9yZWRJdGVtP3JlcGxhY2VJdGVtKGluc3RhbmNlSWQsaXRlbSk6aXRlbXMucHVzaChpdGVtKX1yZXR1cm4gaXRlbS5zaG93UHJvbWlzZX0saGlkZTpmdW5jdGlvbigpe3ZhciBpbnN0YW5jZUlkPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9tT3B0cy5kZWZhdWx0SWQ6YXJndW1lbnRzWzBdLGl0ZW09dm9pZCAwO3JldHVybiBtT3B0cy5xdWV1ZT9pdGVtcy5sZW5ndGgmJihpdGVtPWl0ZW1zWzBdKTppdGVtPWZpbmRJdGVtKGluc3RhbmNlSWQpLGl0ZW0/KGl0ZW0uaGlkZT0hMCxpdGVtLmhpZGVQcm9taXNlKTpQcm9taXNlLnJlc29sdmUoaW5zdGFuY2VJZCl9LHJlbW92ZTpmdW5jdGlvbigpe3ZhciBpbnN0YW5jZUlkPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9tT3B0cy5kZWZhdWx0SWQ6YXJndW1lbnRzWzBdO19yZW1vdmUoaW5zdGFuY2VJZCl9LHBhdXNlOmZ1bmN0aW9uKCl7dmFyIGluc3RhbmNlSWQ9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP21PcHRzLmRlZmF1bHRJZDphcmd1bWVudHNbMF07c2V0UGF1c2VTdGF0ZSghMCxpbnN0YW5jZUlkKX0sdW5wYXVzZTpmdW5jdGlvbigpe3ZhciBpbnN0YW5jZUlkPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9tT3B0cy5kZWZhdWx0SWQ6YXJndW1lbnRzWzBdO3NldFBhdXNlU3RhdGUoITEsaW5zdGFuY2VJZCl9LHZpZXc6ZnVuY3Rpb24oKXt2YXIgdG9TaG93SXRlbXM9aXRlbXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNob3d9KTtyZXR1cm4gdG9TaG93SXRlbXMubGVuZ3RoPyhkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQobU9wdHMuYm9keVNob3dDbGFzcyksKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkobU9wdHMudGFnLHRvU2hvd0l0ZW1zLm1hcChmdW5jdGlvbihpdGVtRGF0YSl7cmV0dXJuIF9taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KG1PcHRzLmluc3RhbmNlLE9iamVjdC5hc3NpZ24oe30saXRlbURhdGEse3RyYW5zaXRpb25zOm1PcHRzLnRyYW5zaXRpb25zLGtleTppdGVtRGF0YS5rZXl8fGl0ZW1EYXRhLmluc3RhbmNlSWR9KSl9KSkpOihkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUobU9wdHMuYm9keVNob3dDbGFzcyksKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkobU9wdHMubm9uZVRhZykpfX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPW11bHRpcGxlLG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGlwbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmFzc2lnbnx8T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCxcImFzc2lnblwiLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbih0YXJnZXQpe2lmKHZvaWQgMD09PXRhcmdldHx8bnVsbD09PXRhcmdldCl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0XCIpO2Zvcih2YXIgdG89T2JqZWN0KHRhcmdldCksaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe3ZhciBuZXh0U291cmNlPWFyZ3VtZW50c1tpXTtpZih2b2lkIDAhPT1uZXh0U291cmNlJiZudWxsIT09bmV4dFNvdXJjZSl7bmV4dFNvdXJjZT1PYmplY3QobmV4dFNvdXJjZSk7Zm9yKHZhciBrZXlzQXJyYXk9T2JqZWN0LmtleXMobmV4dFNvdXJjZSksbmV4dEluZGV4PTAsbGVuPWtleXNBcnJheS5sZW5ndGg7bGVuPm5leHRJbmRleDtuZXh0SW5kZXgrKyl7dmFyIG5leHRLZXk9a2V5c0FycmF5W25leHRJbmRleF0sZGVzYz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsbmV4dEtleSk7dm9pZCAwIT09ZGVzYyYmZGVzYy5lbnVtZXJhYmxlJiYodG9bbmV4dEtleV09bmV4dFNvdXJjZVtuZXh0S2V5XSl9fX1yZXR1cm4gdG99fSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYmplY3QuYXNzaWduLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9qMmM9cmVxdWlyZShcImoyY1wiKSxfajJjMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qMmMpLHJlbW92ZT1mdW5jdGlvbihpZCl7aWYoaWQpe3ZhciBvbGQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO29sZCYmb2xkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkKX19LGFkZD1mdW5jdGlvbihpZCl7Zm9yKHZhciBfbGVuPWFyZ3VtZW50cy5sZW5ndGgsc3R5bGVzPUFycmF5KF9sZW4+MT9fbGVuLTE6MCksX2tleT0xO19sZW4+X2tleTtfa2V5Kyspc3R5bGVzW19rZXktMV09YXJndW1lbnRzW19rZXldO3JlbW92ZShpZCk7dmFyIHN0eWxlRWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO2lkJiZzdHlsZUVsLnNldEF0dHJpYnV0ZShcImlkXCIsaWQpLHN0eWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlTGlzdCl7T2JqZWN0LmtleXMoc3R5bGVMaXN0KS5sZW5ndGgmJnN0eWxlTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHN0eWxlKXt2YXIgc2NvcGVkPXtcIkBnbG9iYWxcIjpzdHlsZX0sc2hlZXQ9X2oyYzJbXCJkZWZhdWx0XCJdLnNoZWV0KHNjb3BlZCk7c3R5bGVFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzaGVldCkpfSl9KSxkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpfTtleHBvcnRzW1wiZGVmYXVsdFwiXT17YWRkOmFkZCxyZW1vdmU6cmVtb3ZlfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbigpe3ZhciBlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIiksYW5pbWF0aW9ucz17YW5pbWF0aW9uOlwiYW5pbWF0aW9uZW5kXCIsT0FuaW1hdGlvbjpcIm9BbmltYXRpb25FbmRcIixNb3pBbmltYXRpb246XCJhbmltYXRpb25lbmRcIixXZWJraXRBbmltYXRpb246XCJ3ZWJraXRBbmltYXRpb25FbmRcIn07Zm9yKHZhciBhIGluIGFuaW1hdGlvbnMpaWYodm9pZCAwIT09ZWwuc3R5bGVbYV0pcmV0dXJuIGFuaW1hdGlvbnNbYV19LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNpdGlvbi1ldmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksU0hPV19EVVJBVElPTj0uMjIsSElERV9EVVJBVElPTj0uMixTSE9XX0RFTEFZPTAsSElERV9ERUxBWT0wLFRSQU5TSVRJT049XCJib3RoXCIsc2hvdz1mdW5jdGlvbihvcHRzKXtyZXR1cm4gdHJhbnNpdGlvbihvcHRzLFwic2hvd1wiKX0saGlkZT1mdW5jdGlvbihvcHRzKXtyZXR1cm4gdHJhbnNpdGlvbihvcHRzLFwiaGlkZVwiKX0sZ2V0RHVyYXRpb249ZnVuY3Rpb24ob3B0cyxzdGF0ZSl7dmFyIHRyYW5zaXRpb249b3B0cy50cmFuc2l0aW9ufHxUUkFOU0lUSU9OO3JldHVyblwibm9uZVwiPT09dHJhbnNpdGlvbj8wOlwic2hvd1wiPT09dHJhbnNpdGlvbiYmXCJoaWRlXCI9PT1zdGF0ZT8wOlwiaGlkZVwiPT09dHJhbnNpdGlvbiYmXCJzaG93XCI9PT1zdGF0ZT8wOlwic2hvd1wiPT09c3RhdGU/dm9pZCAwIT09b3B0cy5zaG93RHVyYXRpb24/b3B0cy5zaG93RHVyYXRpb246U0hPV19EVVJBVElPTjp2b2lkIDAhPT1vcHRzLmhpZGVEdXJhdGlvbj9vcHRzLmhpZGVEdXJhdGlvbjpISURFX0RVUkFUSU9OfSxnZXREZWxheT1mdW5jdGlvbihvcHRzLHN0YXRlKXt2YXIgdHJhbnNpdGlvbj1vcHRzLnRyYW5zaXRpb258fFRSQU5TSVRJT047cmV0dXJuXCJub25lXCI9PT10cmFuc2l0aW9uPzA6XCJzaG93XCI9PT10cmFuc2l0aW9uJiZcImhpZGVcIj09PXN0YXRlPzA6XCJoaWRlXCI9PT10cmFuc2l0aW9uJiZcInNob3dcIj09PXN0YXRlPzA6XCJzaG93XCI9PT1zdGF0ZT92b2lkIDAhPT1vcHRzLnNob3dEZWxheT9vcHRzLnNob3dEZWxheTpTSE9XX0RFTEFZOnZvaWQgMCE9PW9wdHMuaGlkZURlbGF5P29wdHMuaGlkZURlbGF5OkhJREVfREVMQVl9LHRyYW5zaXRpb249ZnVuY3Rpb24ob3B0cyxzdGF0ZSl7dmFyIGRlZmVycmVkPV9taXRocmlsMltcImRlZmF1bHRcIl0uZGVmZXJyZWQoKSxlbD1vcHRzLmVsO2lmKCFlbClyZXR1cm4gZGVmZXJyZWQucmVzb2x2ZSgpLGRlZmVycmVkLnByb21pc2U7dmFyIHRyYW5zaXRpb25EdXJhdGlvbj0xZTMqZ2V0RHVyYXRpb24ob3B0cyxzdGF0ZSksZGVsYXk9MWUzKmdldERlbGF5KG9wdHMsc3RhdGUpLHN0eWxlPWVsLnN0eWxlLGJlZm9yZVRyYW5zaXRpb249b3B0cy5iZWZvcmVTaG93JiZcInNob3dcIj09PXN0YXRlP2Z1bmN0aW9uKCl7c3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uPVwiMG1zXCIsc3R5bGUudHJhbnNpdGlvbkRlbGF5PVwiMG1zXCIsb3B0cy5iZWZvcmVTaG93KCl9Om51bGwsYXBwbHlUcmFuc2l0aW9uPWZ1bmN0aW9uKCl7c3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uPXRyYW5zaXRpb25EdXJhdGlvbitcIm1zXCIsc3R5bGUudHJhbnNpdGlvbkRlbGF5PWRlbGF5K1wibXNcIixvcHRzLnNob3dDbGFzcyYmZWwuY2xhc3NMaXN0W1wic2hvd1wiPT09c3RhdGU/XCJhZGRcIjpcInJlbW92ZVwiXShvcHRzLnNob3dDbGFzcyksb3B0cy5zaG93JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBvcHRzLnNob3cmJlwic2hvd1wiPT09c3RhdGUmJm9wdHMuc2hvdygpLG9wdHMuaGlkZSYmXCJmdW5jdGlvblwiPT10eXBlb2Ygb3B0cy5oaWRlJiZcImhpZGVcIj09PXN0YXRlJiZvcHRzLmhpZGUoKX0sYXBwbHlBZnRlclRyYW5zaXRpb249ZnVuY3Rpb24oKXtvcHRzLmFmdGVySGlkZSYmXCJoaWRlXCI9PT1zdGF0ZSYmKHN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbj1cIjBtc1wiLHN0eWxlLnRyYW5zaXRpb25EZWxheT1cIjBtc1wiLG9wdHMuYWZ0ZXJIaWRlKCkpfSxkb1RyYW5zaXRpb249ZnVuY3Rpb24oKXthcHBseVRyYW5zaXRpb24oKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YXBwbHlBZnRlclRyYW5zaXRpb24oKSxkZWZlcnJlZC5yZXNvbHZlKCl9LHRyYW5zaXRpb25EdXJhdGlvbitkZWxheSl9LG1heWJlRGVsYXlUcmFuc2l0aW9uPWZ1bmN0aW9uKCl7MD09PXRyYW5zaXRpb25EdXJhdGlvbj9kb1RyYW5zaXRpb24oKTpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9UcmFuc2l0aW9uKCl9LDApfTtyZXR1cm4gYmVmb3JlVHJhbnNpdGlvbj8oYmVmb3JlVHJhbnNpdGlvbigpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXttYXliZURlbGF5VHJhbnNpdGlvbigpfSwwKSk6bWF5YmVEZWxheVRyYW5zaXRpb24oKSxkZWZlcnJlZC5wcm9taXNlfTtleHBvcnRzW1wiZGVmYXVsdFwiXT17c2hvdzpzaG93LGhpZGU6aGlkZX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmFuc2l0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHdpbmRvdy5XZWJGb250Q29uZmlnfHwod2luZG93LldlYkZvbnRDb25maWc9e30sZnVuY3Rpb24oKXt2YXIgd2Y9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt3Zi5zcmM9KFwiaHR0cHM6XCI9PT1kb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbD9cImh0dHBzXCI6XCJodHRwXCIpK1wiOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvd2ViZm9udC8xL3dlYmZvbnQuanNcIix3Zi50eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIsd2YuYXN5bmM9XCJ0cnVlXCI7dmFyIHM9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF07cy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3ZixzKX0oKSk7dmFyIHdlYmZvbnRMb2FkZXI9e2FkZDpmdW5jdGlvbih2ZW5kb3IsZmFtaWx5LGtleSl7dmFyIHZlbmRvckNmZz13aW5kb3cuV2ViRm9udENvbmZpZ1t2ZW5kb3JdfHx7fTt2ZW5kb3JDZmcuZmFtaWxpZXM9dmVuZG9yQ2ZnLmZhbWlsaWVzfHxbXSx2ZW5kb3JDZmcuZmFtaWxpZXMucHVzaChmYW1pbHkpLGtleSYmKHZlbmRvckNmZy5rZXk9a2V5KSx3aW5kb3cuV2ViRm9udENvbmZpZ1t2ZW5kb3JdPXZlbmRvckNmZ319O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXdlYmZvbnRMb2FkZXIsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJmb250bG9hZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9kZWZhdWx0PXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2RlZmF1bHRcIiksX2RlZmF1bHQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHQpO2V4cG9ydHNbXCJkZWZhdWx0XCJdPV9kZWZhdWx0MltcImRlZmF1bHRcIl0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jdXN0b20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGhleD1mdW5jdGlvbihfaGV4KXt2YXIgYmlnaW50PXBhcnNlSW50KF9oZXguc3Vic3RyaW5nKDEpLDE2KSxyPWJpZ2ludD4+MTYmMjU1LGc9YmlnaW50Pj44JjI1NSxiPTI1NSZiaWdpbnQ7cmV0dXJuIHIrXCIsXCIrZytcIixcIitifSxyZ2JhPWZ1bmN0aW9uKGNvbG9yU3RyKXt2YXIgb3BhY2l0eT1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/MTphcmd1bWVudHNbMV07cmV0dXJuXCJyZ2JhKFwiK2NvbG9yU3RyK1wiLFwiK29wYWNpdHkrXCIpXCJ9LGlzSW50ZWdlcj1mdW5jdGlvbihuVmFsKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgblZhbCYmaXNGaW5pdGUoblZhbCkmJm5WYWw+LTkwMDcxOTkyNTQ3NDA5OTImJjkwMDcxOTkyNTQ3NDA5OTI+blZhbCYmTWF0aC5mbG9vcihuVmFsKT09PW5WYWx9LGlzRGVza3RvcD13aW5kb3cuaW5uZXJXaWR0aD49MTAyNCxncmlkX3VuaXQ9NCxncmlkX3VuaXRfY29tcG9uZW50PTgsYW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fZmFzdF9vdXQ9XCJjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKVwiLGFuaW1hdGlvbl9jdXJ2ZV9zbG93X2luX2xpbmVhcl9vdXQ9XCJjdWJpYy1iZXppZXIoMCwgMCwgLjIsIDEpXCIsYW5pbWF0aW9uX2N1cnZlX2xpbmVhcl9pbl9mYXN0X291dD1cImN1YmljLWJlemllciguNCwgMCwgMSwgMSlcIjtleHBvcnRzW1wiZGVmYXVsdFwiXT17cmdiYTpyZ2JhLGhleDpoZXgsaXNJbnRlZ2VyOmlzSW50ZWdlcixncmlkX3VuaXQ6Z3JpZF91bml0LGdyaWRfdW5pdF9jb21wb25lbnQ6Z3JpZF91bml0X2NvbXBvbmVudCxncmlkX3VuaXRfbWVudTo1NixncmlkX3VuaXRfaWNvbl9idXR0b246NipncmlkX3VuaXRfY29tcG9uZW50LHVuaXRfYmxvY2tfYm9yZGVyX3JhZGl1czoyLHVuaXRfaXRlbV9ib3JkZXJfcmFkaXVzOjIsdW5pdF9pbmRlbnQ6NzIsdW5pdF9zaWRlX3BhZGRpbmc6aXNEZXNrdG9wPzI0OjE2LHVuaXRfdG91Y2hfaGVpZ2h0OjQ4LHVuaXRfaWNvbl9zaXplX3NtYWxsOjIqZ3JpZF91bml0X2NvbXBvbmVudCx1bml0X2ljb25fc2l6ZTozKmdyaWRfdW5pdF9jb21wb25lbnQsdW5pdF9pY29uX3NpemVfbWVkaXVtOjQqZ3JpZF91bml0X2NvbXBvbmVudCx1bml0X2ljb25fc2l6ZV9sYXJnZTo1KmdyaWRfdW5pdF9jb21wb25lbnQsdW5pdF9zY3JlZW5fc2l6ZV9leHRyYV9sYXJnZToxMjgwLHVuaXRfc2NyZWVuX3NpemVfbGFyZ2U6OTYwLHVuaXRfc2NyZWVuX3NpemVfbWVkaXVtOjQ4MCx1bml0X3NjcmVlbl9zaXplX3NtYWxsOjMyMCxhbmltYXRpb25fZHVyYXRpb246XCIuMThzXCIsYW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fZmFzdF9vdXQ6YW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fZmFzdF9vdXQsYW5pbWF0aW9uX2N1cnZlX3Nsb3dfaW5fbGluZWFyX291dDphbmltYXRpb25fY3VydmVfc2xvd19pbl9saW5lYXJfb3V0LGFuaW1hdGlvbl9jdXJ2ZV9saW5lYXJfaW5fZmFzdF9vdXQ6YW5pbWF0aW9uX2N1cnZlX2xpbmVhcl9pbl9mYXN0X291dCxhbmltYXRpb25fY3VydmVfZGVmYXVsdDpcImVhc2Utb3V0XCIsZm9udF93ZWlnaHRfbGlnaHQ6MzAwLGZvbnRfd2VpZ2h0X25vcm1hbDo0MDAsZm9udF93ZWlnaHRfbWVkaXVtOjUwMCxmb250X3dlaWdodF9ib2xkOjcwMCxmb250X3NpemVfdGl0bGU6MjAsbGluZV9oZWlnaHQ6MS4zLGNvbG9yX3ByaW1hcnk6XCIzMywgMTUwLCAyNDNcIixjb2xvcl9wcmltYXJ5X2FjdGl2ZTpcIjMwLCAxMzYsIDIyOVwiLGNvbG9yX3ByaW1hcnlfZGFyazpcIjI1LCAxMTgsIDIxMFwiLGNvbG9yX3ByaW1hcnlfZmFkZWQ6XCIxMDAsIDE4MSwgMjQ5XCIsY29sb3JfcHJpbWFyeV9mb3JlZ3JvdW5kOlwiMjU1LCAyNTUsIDI1NVwiLGNvbG9yX2xpZ2h0X2JhY2tncm91bmQ6XCIyNTUsIDI1NSwgMjU1XCIsY29sb3JfbGlnaHRfZm9yZWdyb3VuZDpcIjAsIDAsIDBcIixjb2xvcl9kYXJrX2JhY2tncm91bmQ6XCIzNCwgMzQsIDM0XCIsY29sb3JfZGFya19mb3JlZ3JvdW5kOlwiMjU1LCAyNTUsIDI1NVwiLGJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeTouODcsYmxlbmRfbGlnaHRfdGV4dF9yZWd1bGFyOi43MyxibGVuZF9saWdodF90ZXh0X3NlY29uZGFyeTouNTQsYmxlbmRfbGlnaHRfdGV4dF90ZXJ0aWFyeTouNCxibGVuZF9saWdodF90ZXh0X2Rpc2FibGVkOi4yNixibGVuZF9saWdodF9ib3JkZXJfbGlnaHQ6LjExLGJsZW5kX2xpZ2h0X2JhY2tncm91bmRfYWN0aXZlOi4xNCxibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyOi4wNixibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyX21lZGl1bTouMTIsYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9kaXNhYmxlZDouMDksYmxlbmRfbGlnaHRfb3ZlcmxheV9iYWNrZ3JvdW5kOi4zLGJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5OjEsYmxlbmRfZGFya190ZXh0X3JlZ3VsYXI6Ljg3LGJsZW5kX2RhcmtfdGV4dF9zZWNvbmRhcnk6LjcsYmxlbmRfZGFya190ZXh0X3RlcnRpYXJ5Oi40LGJsZW5kX2RhcmtfdGV4dF9kaXNhYmxlZDouMjYsYmxlbmRfZGFya19ib3JkZXJfbGlnaHQ6LjEsYmxlbmRfZGFya19iYWNrZ3JvdW5kX2FjdGl2ZTouMTQsYmxlbmRfZGFya19iYWNrZ3JvdW5kX2hvdmVyOi4wOCxibGVuZF9kYXJrX2JhY2tncm91bmRfaG92ZXJNZWRpdW06LjEyLGJsZW5kX2RhcmtfYmFja2dyb3VuZF9kaXNhYmxlZDouMTIsYmxlbmRfZGFya19vdmVybGF5X2JhY2tncm91bmQ6LjMscHJlZml4ZXNfYW5pbWF0aW9uOltcIm9cIixcIm1velwiLFwid2Via2l0XCJdLHByZWZpeGVzX2FwcGVhcmFuY2U6W1wib1wiLFwibW96XCIsXCJtc1wiLFwid2Via2l0XCJdLHByZWZpeGVzX2JhY2tncm91bmRfc2l6ZTpbXCJvXCIsXCJtb3pcIixcIndlYmtpdFwiXSxwcmVmaXhlc19ib3hfc2hhZG93OltcIm1velwiLFwid2Via2l0XCJdLHByZWZpeGVzX2tleWZyYW1lczpbXCJvXCIsXCJtb3pcIixcIndlYmtpdFwiXSxwcmVmaXhlc190cmFuc2Zvcm06W1wib1wiLFwibW96XCIsXCJtc1wiLFwid2Via2l0XCJdLHByZWZpeGVzX3RyYW5zaXRpb246W1wib1wiLFwibW96XCIsXCJ3ZWJraXRcIl0scHJlZml4ZXNfdXNlcl9zZWxlY3Q6W1wibW96XCIsXCJtc1wiLFwid2Via2l0XCJdLGJyZWFrcG9pbnRfc21hbGxfaGFuZHNldF9wb3J0cmFpdDowLGJyZWFrcG9pbnRfbWVkaXVtX2hhbmRzZXRfcG9ydHJhaXQ6MzYwLGJyZWFrcG9pbnRfbGFyZ2VfaGFuZHNldF9wb3J0cmFpdDo0MDAsYnJlYWtwb2ludF9zbWFsbF90YWJsZXRfcG9ydHJhaXQ6NjAwLGJyZWFrcG9pbnRfbGFyZ2VfdGFibGV0X3BvcnRyYWl0OjcyMCxicmVha3BvaW50X3NtYWxsX2hhbmRzZXRfbGFuZHNjYXBlOjQ4MCxicmVha3BvaW50X21lZGl1bV9oYW5kc2V0X2xhbmRzY2FwZTo2MDAsYnJlYWtwb2ludF9sYXJnZV9oYW5kc2V0X2xhbmRzY2FwZTo3MjAsZW52X3RhYmxldDp3aW5kb3cuaW5uZXJXaWR0aD49NjAwLGVudl9kZXNrdG9wOndpbmRvdy5pbm5lcldpZHRoPj0xMDI0LHpfbWVudTo5OSx6X2hlYWRlcl9jb250YWluZXI6OTk5LHpfbm90aWZpY2F0aW9uOjk5OTgsel9kaWFsb2c6OTk5OX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX2V2ZW50cz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9ldmVudHNcIiksX2V2ZW50czI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXZlbnRzKSxfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX2RpYWxvZz1yZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy9kaWFsb2dcIiksX2RpYWxvZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGlhbG9nKSxfdHJhbnNpdGlvbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uXCIpLF90cmFuc2l0aW9uMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cmFuc2l0aW9uKSxfc2hhZG93PXJlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3NoYWRvd1wiKSxfc2hhZG93Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGFkb3cpO3JlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1kaWFsb2dcIix2aXNpYmxlOlwicGUtZGlhbG9nLS12aXNpYmxlXCIsYm9keTpcInBlLWRpYWxvZ19fYm9keVwiLGZ1bGxzY3JlZW46XCJwZS1kaWFsb2ctLWZ1bGxzY3JlZW5cIixjb250ZW50OlwicGUtZGlhbG9nX19jb250ZW50XCIsaGVhZGVyOlwicGUtZGlhbG9nX19oZWFkZXJcIixmb290ZXI6XCJwZS1kaWFsb2dfX2Zvb3RlclwiLGZvb3RlckhpZ2g6XCJwZS1kaWFsb2dfX2Zvb3Rlci0taGlnaFwiLHRpdGxlOlwicGUtZGlhbG9nX190aXRsZVwiLGFjdGlvbnM6XCJwZS1kaWFsb2dfX2FjdGlvbnNcIixoYXNCYWNrZHJvcDpcInBlLWRpYWxvZy0tYmFja2Ryb3BcIixoYXNUb3BPdmVyZmxvdzpcInBlLWRpYWxvZy0tb3ZlcmZsb3ctdG9wXCIsaGFzQm90dG9tT3ZlcmZsb3c6XCJwZS1kaWFsb2ctLW92ZXJmbG93LWJvdHRvbVwiLG1lbnVDb250ZW50OlwicGUtbWVudV9fY29udGVudFwifSxTQ1JPTExfV0FUQ0hfVElNRVI9MTUwLHVwZGF0ZVNjcm9sbFN0YXRlPWZ1bmN0aW9uKGN0cmwpe3ZhciBzY3JvbGxlcj1jdHJsLnNjcm9sbEVsO3Njcm9sbGVyJiYoY3RybC50b3BPdmVyZmxvdz1zY3JvbGxlci5zY3JvbGxUb3A+MCxjdHJsLmJvdHRvbU92ZXJmbG93PXNjcm9sbGVyLnNjcm9sbEhlaWdodC0oc2Nyb2xsZXIuc2Nyb2xsVG9wK3Njcm9sbGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk+MCl9LHVwZGF0ZUZvb3RlclN0YXRlPWZ1bmN0aW9uKGN0cmwpe3ZhciBmb290ZXJFbD1jdHJsLmZvb3RlckVsO2lmKGZvb3RlckVsKXt2YXIgc3R5bGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZm9vdGVyRWwpLGhlaWdodD1mb290ZXJFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsbWluSGVpZ2h0PXBhcnNlSW50KHN0eWxlLm1pbkhlaWdodCwxMCk7aGVpZ2h0Pm1pbkhlaWdodD9mb290ZXJFbC5jbGFzc0xpc3QuYWRkKENTU19DTEFTU0VTLmZvb3RlckhpZ2gpOmZvb3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoQ1NTX0NMQVNTRVMuZm9vdGVySGlnaCl9fSxzaG93PWZ1bmN0aW9uKGN0cmwsb3B0cyl7dmFyIGlkPWN0cmwuaW5zdGFuY2VJZDtyZXR1cm4gY3RybC5pc1RyYW5zaXRpb25pbmc9ITAsX3RyYW5zaXRpb24yW1wiZGVmYXVsdFwiXS5zaG93KE9iamVjdC5hc3NpZ24oe30sb3B0cyx7ZWw6Y3RybC5lbCxzaG93Q2xhc3M6Q1NTX0NMQVNTRVMudmlzaWJsZX0pKS50aGVuKGZ1bmN0aW9uKCl7Y3RybC5pc1RyYW5zaXRpb25pbmc9ITEsY3RybC52aXNpYmxlPSEwLGN0cmwuZGlkU2hvdyYmY3RybC5kaWRTaG93KGlkKX0pfSxoaWRlPWZ1bmN0aW9uKGN0cmwsb3B0cyl7dmFyIGlkPWN0cmwuaW5zdGFuY2VJZDtyZXR1cm4gY3RybC5pc1RyYW5zaXRpb25pbmc9ITAsX3RyYW5zaXRpb24yW1wiZGVmYXVsdFwiXS5oaWRlKE9iamVjdC5hc3NpZ24oe30sb3B0cyx7ZWw6Y3RybC5lbCxzaG93Q2xhc3M6Q1NTX0NMQVNTRVMudmlzaWJsZX0pKS50aGVuKGZ1bmN0aW9uKCl7X2RpYWxvZzJbXCJkZWZhdWx0XCJdLnJlbW92ZShpZCksY3RybC5pc1RyYW5zaXRpb25pbmc9ITEsY3RybC52aXNpYmxlPSExLGN0cmwuZGlkSGlkZSYmY3RybC5kaWRIaWRlKGlkKSxzZXRUaW1lb3V0KF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3LDApfSl9LGNyZWF0ZVZpZXdDb250ZW50PWZ1bmN0aW9uKGN0cmwsb3B0cyl7dmFyIHN0eWxlPXt9LGJvZHlPcHRzPW9wdHMuYm9keXx8b3B0cy5tZW51O3JldHVybih7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5ib2R5LCBcInN0eWxlXCI6IHN0eWxlLCBcImNvbmZpZ1wiOiBmdW5jdGlvbihlbCxpbml0ZWQpe2luaXRlZHx8KGN0cmwuc2Nyb2xsRWw9ZWwpfSwgXCJvbnNjcm9sbFwiOiBmdW5jdGlvbigpe2N0cmwuaXNTY3JvbGxpbmc9ITAsdXBkYXRlU2Nyb2xsU3RhdGUoY3RybCksY2xlYXJUaW1lb3V0KGN0cmwuc2Nyb2xsV2F0Y2hJZCksY3RybC5zY3JvbGxXYXRjaElkPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtjdHJsLmlzU2Nyb2xsaW5nPSExfSxTQ1JPTExfV0FUQ0hfVElNRVIpfSB9LCBjaGlsZHJlbjogWyBib2R5T3B0cyBdIH0pfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sYm9keU9wdHM9b3B0cy5ib2R5fHxvcHRzLm1lbnUsdXBkYXRlQ29udGVudE9uU2Nyb2xsPW9wdHMudXBkYXRlQ29udGVudE9uU2Nyb2xsfHwhMSxpZ25vcmVDb250ZW50PSF1cGRhdGVDb250ZW50T25TY3JvbGwmJmN0cmwuaXNTY3JvbGxpbmcsdGFnPW9wdHMudGFnfHxcImZvcm1cIix1cGRhdGU9ZnVuY3Rpb24oKXt1cGRhdGVTY3JvbGxTdGF0ZShjdHJsKSx1cGRhdGVGb290ZXJTdGF0ZShjdHJsKSxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpfSxwcm9wcz1PYmplY3QuYXNzaWduKHt9LHtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHMuZnVsbHNjcmVlbj9DU1NfQ0xBU1NFUy5mdWxsc2NyZWVuOm51bGwsb3B0cy5iYWNrZHJvcD9DU1NfQ0xBU1NFUy5oYXNCYWNrZHJvcDpudWxsLGN0cmwudG9wT3ZlcmZsb3d8fG9wdHMuYm9yZGVycz9DU1NfQ0xBU1NFUy5oYXNUb3BPdmVyZmxvdzpudWxsLGN0cmwuYm90dG9tT3ZlcmZsb3d8fG9wdHMuYm9yZGVycz9DU1NfQ0xBU1NFUy5oYXNCb3R0b21PdmVyZmxvdzpudWxsLGN0cmwudmlzaWJsZT9DU1NfQ0xBU1NFUy52aXNpYmxlOm51bGwsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpmdW5jdGlvbihlbCxpbml0ZWQsY29udGV4dCx2ZG9tKXtpZighaW5pdGVkKXtvcHRzLmNvbmZpZyYmb3B0cy5jb25maWcoZWwsaW5pdGVkLGNvbnRleHQsdmRvbSksY3RybC5lbD1lbDt2YXIgY2xlYW51cD1mdW5jdGlvbigpe19ldmVudHMyW1wiZGVmYXVsdFwiXS51bnN1YnNjcmliZShcInJlc2l6ZVwiLHVwZGF0ZSksX2V2ZW50czJbXCJkZWZhdWx0XCJdLnVuc3Vic2NyaWJlKFwia2V5ZG93blwiLGhhbmRsZUVzY2FwZSl9LGhhbmRsZUVzY2FwZT1mdW5jdGlvbihlKXtvcHRzLmZ1bGxzY3JlZW58fG9wdHMuYmFja2Ryb3B8fDI3PT09ZS53aGljaCYmKGNsZWFudXAoKSxoaWRlKGN0cmwsT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtoaWRlRGVsYXk6MH0pKSl9O19ldmVudHMyW1wiZGVmYXVsdFwiXS5zdWJzY3JpYmUoXCJyZXNpemVcIix1cGRhdGUpLF9ldmVudHMyW1wiZGVmYXVsdFwiXS5zdWJzY3JpYmUoXCJrZXlkb3duXCIsaGFuZGxlRXNjYXBlKSxjb250ZXh0Lm9udW5sb2FkPWZ1bmN0aW9uKCl7Y2xlYW51cCgpfSx1cGRhdGVTY3JvbGxTdGF0ZShjdHJsKSx1cGRhdGVGb290ZXJTdGF0ZShjdHJsKSxzaG93KGN0cmwsb3B0cykudGhlbihmdW5jdGlvbigpe3VwZGF0ZVNjcm9sbFN0YXRlKGN0cmwpLHVwZGF0ZUZvb3RlclN0YXRlKGN0cmwpLChjdHJsLnRvcE92ZXJmbG93fHxjdHJsLmJvdHRvbU92ZXJmbG93KSYmc2V0VGltZW91dChfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdywwKX0pfX0sb25jbGljazpmdW5jdGlvbihlKXtlLnRhcmdldD09PWN0cmwuZWwmJihvcHRzLm1vZGFsfHxjdHJsLmlzVHJhbnNpdGlvbmluZ3x8aGlkZShjdHJsLE9iamVjdC5hc3NpZ24oe30sb3B0cyx7aGlkZURlbGF5OjB9KSkpfX0sb3B0cy5mb3JtT3B0aW9ucz9vcHRzLmZvcm1PcHRpb25zOm51bGwpLGJvZHk9Ym9keU9wdHM/aWdub3JlQ29udGVudD97c3VidHJlZTpcInJldGFpblwifTpjcmVhdGVWaWV3Q29udGVudChjdHJsLG9wdHMpOm51bGwsY29udGVudD0oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogW0NTU19DTEFTU0VTLmNvbnRlbnQsb3B0cy5tZW51P0NTU19DTEFTU0VTLm1lbnVDb250ZW50Om51bGxdLmpvaW4oXCIgXCIpIH0sIGNoaWxkcmVuOiBbIG9wdHMuZnVsbHNjcmVlbj9udWxsOl9taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9zaGFkb3cyW1wiZGVmYXVsdFwiXSx7ejpjdHJsLnosYW5pbWF0ZWQ6ITB9KSxvcHRzLmZ1bGxzY3JlZW4/bnVsbDpvcHRzLnRpdGxlPyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5oZWFkZXIsIFwiY29uZmlnXCI6IGZ1bmN0aW9uKGVsKXtjdHJsLmhlYWRlckhlaWdodD1lbC5zY3JvbGxIZWlnaHR9IH0sIGNoaWxkcmVuOiBbICh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy50aXRsZSB9LCBjaGlsZHJlbjogWyBvcHRzLnRpdGxlIF0gfSkgXSB9KTpudWxsLGJvZHksb3B0cy5mdWxsc2NyZWVuP251bGw6b3B0cy5mb290ZXI/KHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLmZvb3RlciwgXCJjb25maWdcIjogZnVuY3Rpb24oZWwsaW5pdGVkKXtjdHJsLmZvb3RlckhlaWdodD1lbC5zY3JvbGxIZWlnaHQsaW5pdGVkfHwoY3RybC5mb290ZXJFbD1lbCl9IH0sIGNoaWxkcmVuOiBbICh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5hY3Rpb25zIH0sIGNoaWxkcmVuOiBbIG9wdHMuZm9vdGVyIF0gfSkgXSB9KTpudWxsIF0gfSk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXtjb250cm9sbGVyOmZ1bmN0aW9uKCl7dmFyIGluc3RhbmNlRGF0YT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdLG9wdHM9aW5zdGFuY2VEYXRhLm9wdHN8fHt9LHo9dm9pZCAwIT09b3B0cy56P29wdHMuejozO3JldHVybiBPYmplY3QuYXNzaWduKHt9LGluc3RhbmNlRGF0YSx7aW5zdGFuY2VJZDppbnN0YW5jZURhdGEuaW5zdGFuY2VJZCx6Onosc2Nyb2xsRWw6bnVsbCxmb290ZXJFbDpudWxsLHRvcE92ZXJmbG93OiExLGJvdHRvbU92ZXJmbG93OiExLHNjcm9sbFdhdGNoSWQ6MCxpc1Njcm9sbGluZzohMSxoZWFkZXJIZWlnaHQ6MCxmb290ZXJIZWlnaHQ6MCxlbDpudWxsLHZpc2libGU6ITEsaXNUcmFuc2l0aW9uaW5nOiExfSl9LHZpZXc6ZnVuY3Rpb24oY3RybCxpbnN0YW5jZURhdGEpe3ZhciBvcHRzPVwiZnVuY3Rpb25cIj09dHlwZW9mIGluc3RhbmNlRGF0YS5vcHRzP2luc3RhbmNlRGF0YS5vcHRzKCk6aW5zdGFuY2VEYXRhLm9wdHM7cmV0dXJuIGluc3RhbmNlRGF0YS5oaWRlJiYhY3RybC5pc1RyYW5zaXRpb25pbmcmJmhpZGUoY3RybCxvcHRzKSxjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaWFsb2ctaW5zdGFuY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX211bHRpcGxlPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL211bHRpcGxlXCIpLF9tdWx0aXBsZTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbXVsdGlwbGUpLF9kaWFsb2dJbnN0YW5jZT1yZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy9kaWFsb2ctaW5zdGFuY2VcIiksX2RpYWxvZ0luc3RhbmNlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kaWFsb2dJbnN0YW5jZSk7ZXhwb3J0c1tcImRlZmF1bHRcIl09KDAsX211bHRpcGxlMltcImRlZmF1bHRcIl0pKHtpbnN0YW5jZTpfZGlhbG9nSW5zdGFuY2UyW1wiZGVmYXVsdFwiXSxkZWZhdWx0SWQ6XCJkZWZhdWx0X2RpYWxvZ1wiLHRhZzpcIi5wZS1kaWFsb2dfX2hvbGRlclwiLG5vbmVUYWc6XCJzcGFuLnBlLWRpYWxvZ19fcGxhY2Vob2xkZXJcIixib2R5U2hvd0NsYXNzOlwicGUtZGlhbG9nLS1vcGVuXCJ9KSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpYWxvZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxzdHlsZT1mdW5jdGlvbihjb25maWcsdGludCl7dmFyIHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bX2RlZmluZVByb3BlcnR5KHt9LHNjb3BlK1wiLnBlLWRpYWxvZ1wiLHtcIiYucGUtZGlhbG9nLS1iYWNrZHJvcFwiOntcImJhY2tncm91bmQtY29sb3JcIjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX2JhY2tkcm9wX2JhY2tncm91bmRcIl19LFwiIC5wZS1kaWFsb2dfX2NvbnRlbnRcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9jb250ZW50X2JhY2tncm91bmRcIl19LFwiIC5wZS1kaWFsb2dfX2hlYWRlciAucGUtZGlhbG9nX190aXRsZVwiOntjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX3RpdGxlX3RleHRcIl19LFwiIC5wZS1kaWFsb2dfX2JvZHlcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9ib2R5X3RleHRcIl19LFwiJi5wZS1kaWFsb2ctLW92ZXJmbG93LXRvcCAucGUtZGlhbG9nX19ib2R5XCI6e1wiYm9yZGVyLXRvcC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9keV9ib3JkZXJcIl19LFwiJi5wZS1kaWFsb2ctLW92ZXJmbG93LWJvdHRvbSAucGUtZGlhbG9nX19ib2R5XCI6e1wiYm9yZGVyLWJvdHRvbS1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9keV9ib3JkZXJcIl19fSldfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIikse1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCImXCIpXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxyZ2JhPV9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtib3JkZXJfcmFkaXVzOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2Jsb2NrX2JvcmRlcl9yYWRpdXMscGFkZGluZzozKl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LGhlYWRlcl9ib3R0b206MjAsaGVhZGVyX2hlaWdodDo2MCxmb290ZXJfaGVpZ2h0OjUyLGNvbG9yX2xpZ2h0X2NvbnRlbnRfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9iYWNrZ3JvdW5kKSxjb2xvcl9saWdodF90aXRsZV90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcHJpbWFyeSksY29sb3JfbGlnaHRfYm9keV90ZXh0OnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfcmVndWxhciksY29sb3JfbGlnaHRfYm9keV9ib3JkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYm9yZGVyX2xpZ2h0KSxjb2xvcl9saWdodF9iYWNrZHJvcF9iYWNrZ3JvdW5kOlwicmdiYSgwLCAwLCAwLCAuNClcIixjb2xvcl9kYXJrX2NvbnRlbnRfYmFja2dyb3VuZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2JhY2tncm91bmQpLGNvbG9yX2RhcmtfdGl0bGVfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9wcmltYXJ5KSxjb2xvcl9kYXJrX2JvZHlfdGV4dDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9yZWd1bGFyKSxjb2xvcl9kYXJrX2JvZHlfYm9yZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19ib3JkZXJfbGlnaHQpLGNvbG9yX2RhcmtfYmFja2Ryb3BfYmFja2dyb3VuZDpcInJnYmEoMCwgMCwgMCwgLjUpXCJ9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLF9mbGV4PXJlcXVpcmUoXCJwb2x5dGhlbmUvbGF5b3V0L3RoZW1lL2ZsZXhcIiksX2ZsZXgyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsZXgpLGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3ZhciBwYWRkaW5nPWNvbmZpZy5wYWRkaW5nO3JldHVyblt7XCIucGUtZGlhbG9nXCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0Q2VudGVyQ2VudGVyLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblwiOlwiZWFzZS1vdXRcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXByb3BlcnR5XCI6XCJvcGFjaXR5XCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSx7cG9zaXRpb246XCJmaXhlZFwiLHRvcDowLGxlZnQ6MCxyaWdodDowLGJvdHRvbTowLFwiei1pbmRleFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS56X2RpYWxvZyxoZWlnaHQ6XCIxMDAlXCIscGFkZGluZzpwYWRkaW5nK1wicHggNDBweFwiLG9wYWNpdHk6MCxcIiYucGUtZGlhbG9nLS12aXNpYmxlXCI6e29wYWNpdHk6MX0sXCImLnBlLWRpYWxvZy0tZnVsbHNjcmVlblwiOntwYWRkaW5nOjAsXCIgLnBlLWRpYWxvZ19fY29udGVudFwiOntcImJvcmRlci1yYWRpdXNcIjowLFwibWF4LXdpZHRoXCI6XCJub25lXCIsaGVpZ2h0OlwiMTAwJVwiLHdpZHRoOlwiMTAwJVwiLFwiIC5wZS1kaWFsb2dfX2hlYWRlciwgLnBlLWRpYWxvZ19fZm9vdGVyXCI6e2Rpc3BsYXk6XCJub25lXCJ9LFwiIC5wZS1kaWFsb2dfX2JvZHlcIjp7cGFkZGluZzowLGhlaWdodDpcIjEwMHZoXCIsYm9yZGVyOlwibm9uZVwiLFwibWF4LWhlaWdodFwiOlwiY2FsYygxMDB2aClcIn19fSxcIiAucGUtZGlhbG9nX19oZWFkZXIsIHBlLWRpYWxvZ19fYm9keSwgcGUtZGlhbG9nX19oZWFkZXJcIjp7XCJ6LWluZGV4XCI6MX0sXCIgLnBlLWRpYWxvZ19fY29udGVudFwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dFZlcnRpY2FsLHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCJtYXgtaGVpZ2h0XCI6XCIxMDAlXCIsXCJtaW4td2lkdGhcIjpcIjI4MHB4XCIsXCJtYXgtd2lkdGhcIjo3Kl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfbWVudStcInB4XCIsXCJib3JkZXItcmFkaXVzXCI6Y29uZmlnLmJvcmRlcl9yYWRpdXMrXCJweFwiLFwiID4gLnBlLXNoYWRvd1wiOntcInotaW5kZXhcIjotMX0sXCImLnBlLW1lbnVfX2NvbnRlbnRcIjp7XCIgLnBlLWRpYWxvZ19fYm9keVwiOntwYWRkaW5nOjAsYm9yZGVyOlwibm9uZVwifX19XSxcIiAucGUtZGlhbG9nX190aXRsZVwiOntcImZvbnQtc2l6ZVwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3NpemVfdGl0bGUrXCJweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X21lZGl1bSxkaXNwbGF5OlwiYmxvY2tcIixcIiYgKyBkaXZcIjp7XCJtYXJnaW4tdG9wXCI6XCIxNnB4XCJ9fSxcIiAucGUtZGlhbG9nX19oZWFkZXJcIjp7cGFkZGluZzpbcGFkZGluZy00LHBhZGRpbmcsY29uZmlnLmhlYWRlcl9ib3R0b20tNCxwYWRkaW5nXS5tYXAoZnVuY3Rpb24odil7cmV0dXJuIHYrXCJweFwifSkuam9pbihcIiBcIiksXCJtaW4taGVpZ2h0XCI6Y29uZmlnLmhlYWRlcl9oZWlnaHQrXCJweFwiLFwiIC5wZS1kaWFsb2dfX3RpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKCkse2Rpc3BsYXk6XCJibG9ja1wiLHdpZHRoOlwiMTAwJVwifV19LFwiIC5wZS1kaWFsb2dfX2JvZHlcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5zZWxmU3RyZXRjaCxfbWl4aW4yW1wiZGVmYXVsdFwiXS5oYWlybGluZShcImJvcmRlci10b3BcIikse1wiYm9yZGVyLXRvcC1zdHlsZVwiOlwic29saWRcIn0sX21peGluMltcImRlZmF1bHRcIl0uaGFpcmxpbmUoXCJib3JkZXItdG9wXCIpLHtcImJvcmRlci1ib3R0b20tc3R5bGVcIjpcInNvbGlkXCJ9LHtwYWRkaW5nOltwYWRkaW5nLHBhZGRpbmcscGFkZGluZy01LHBhZGRpbmddLm1hcChmdW5jdGlvbih2KXtyZXR1cm4gditcInB4XCJ9KS5qb2luKFwiIFwiKSxcIm92ZXJmbG93LXlcIjpcImF1dG9cIixcIi13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nXCI6XCJ0b3VjaFwiLFwiYm9yZGVyLXdpZHRoXCI6XCIxcHhcIixcImJvcmRlci1zdHlsZVwiOlwic29saWQgbm9uZVwiLFwiYm9yZGVyLWNvbG9yXCI6XCJ0cmFuc3BhcmVudFwiLFwibWF4LWhlaWdodFwiOlwiY2FsYygxMDB2aCAtIFwiKzIqcGFkZGluZytcInB4IC0gXCIrKGNvbmZpZy5oZWFkZXJfaGVpZ2h0K2NvbmZpZy5mb290ZXJfaGVpZ2h0KStcInB4KVwifV0sXCIgLnBlLWRpYWxvZ19faGVhZGVyICsgLnBlLWRpYWxvZ19fYm9keVwiOntcInBhZGRpbmctdG9wXCI6MH0sXCIgLnBlLWRpYWxvZ19fZm9vdGVyXCI6e3BhZGRpbmc6XCIycHggOHB4XCIsXCJtaW4taGVpZ2h0XCI6Y29uZmlnLmZvb3Rlcl9oZWlnaHQrXCJweFwiLFwiZm9udC1zaXplXCI6MCxcIiYucGUtZGlhbG9nX19mb290ZXItLWhpZ2hcIjp7XCJwYWRkaW5nLWJvdHRvbVwiOlwiOHB4XCJ9fSxcIiAucGUtZGlhbG9nX19hY3Rpb25zXCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0SG9yaXpvbnRhbCxfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dEVuZEp1c3RpZmllZCxfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dFdyYXAse21hcmdpbjpcIjAgLTRweFwiLFwiIC5wZS1idXR0b25cIjp7aGVpZ2h0OlwiMzZweFwiLFwibWFyZ2luLXRvcFwiOlwiNnB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCI2cHhcIixwYWRkaW5nOjB9fV19XSxcIiBib2R5LnBlLWRpYWxvZy0tb3BlblwiOntvdmVyZmxvdzpcImhpZGRlblwiLGxlZnQ6MCxcIi13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nXCI6XCJ0b3VjaFwiLHBvc2l0aW9uOlwiZml4ZWRcIix0b3A6MCx3aWR0aDpcIjEwMCVcIn19XX07ZXhwb3J0c1tcImRlZmF1bHRcIl09ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm4gX21peGluMltcImRlZmF1bHRcIl0uY3JlYXRlU3R5bGVzKGNvbmZpZyxjcmVhdGVTdHlsZXMpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxheW91dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fXZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvZGlhbG9nL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2RpYWxvZy90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS9kaWFsb2cvdGhlbWUvY29sb3JcIiksX2NvbG9yMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvciksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0uZGlhbG9nLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtZGlhbG9nXCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF93ZWJmb250bG9hZGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3dlYmZvbnRsb2FkZXJcIiksX3dlYmZvbnRsb2FkZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dlYmZvbnRsb2FkZXIpO193ZWJmb250bG9hZGVyMltcImRlZmF1bHRcIl0uYWRkKFwiZ29vZ2xlXCIsXCJSb2JvdG86NDAwLDUwMCw3MDAsNDAwaXRhbGljOmxhdGluXCIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9vYmplY3QuYXNzaWduXCIpO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCksX3N2Zz1yZXF1aXJlKFwicG9seXRoZW5lL3N2Zy9zdmdcIiksX3N2ZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ZnKTtyZXF1aXJlKFwicG9seXRoZW5lL2ljb24vdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtpY29uOlwicGUtaWNvblwiLGF2YXRhcjpcInBlLWljb24tLWF2YXRhclwiLHNtYWxsOlwicGUtaWNvbi0tc21hbGxcIixyZWd1bGFyOlwicGUtaWNvbi0tcmVndWxhclwiLG1lZGl1bTpcInBlLWljb24tLW1lZGl1bVwiLGxhcmdlOlwicGUtaWNvbi0tbGFyZ2VcIn0sdHlwZUNsYXNzZXM9e3NtYWxsOkNTU19DTEFTU0VTLnNtYWxsLHJlZ3VsYXI6Q1NTX0NMQVNTRVMucmVndWxhcixtZWRpdW06Q1NTX0NMQVNTRVMubWVkaXVtLGxhcmdlOkNTU19DTEFTU0VTLmxhcmdlfSxjbGFzc0ZvclR5cGU9ZnVuY3Rpb24oKXt2YXIgbW9kZT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJyZWd1bGFyXCI6YXJndW1lbnRzWzBdO3JldHVybiB0eXBlQ2xhc3Nlc1ttb2RlXX0sbGF5b3V0Q29udGVudD1mdW5jdGlvbihvcHRzKXtpZihvcHRzLmNvbnRlbnQpcmV0dXJuIG9wdHMuY29udGVudDtpZihvcHRzLnN2Zyl7dmFyIHN2Z09wdHM9T2JqZWN0LmFzc2lnbih7fSxvcHRzLnN2Zyk7cmV0dXJuIHN2Z09wdHMudGFnPXN2Z09wdHMudGFnfHxcImlcIixfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLmNvbXBvbmVudChfc3ZnMltcImRlZmF1bHRcIl0sc3ZnT3B0cyl9cmV0dXJuIG9wdHMubXN2Zz8oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKShcImkucGUtc3ZnXCIsX21pdGhyaWwyW1wiZGVmYXVsdFwiXS50cnVzdChvcHRzLm1zdmcpKTooeyB0YWc6IFwiaVwiLCBhdHRyczogeyAgfSwgY2hpbGRyZW46IFsgKHsgdGFnOiBcImltZ1wiLCBhdHRyczogeyBcInNyY1wiOiBvcHRzLnNyYyB9LCBjaGlsZHJlbjogW10gfSkgXSB9KX0sY3JlYXRlVmlldz1mdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz1PYmplY3QuYXNzaWduKHt9LHtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmljb24sY2xhc3NGb3JUeXBlKG9wdHMudHlwZSksb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30sb3B0cy5ldmVudHM/b3B0cy5ldmVudHM6bnVsbCksY29udGVudD1sYXlvdXRDb250ZW50KG9wdHMpO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGNvbXBvbmVudD17dmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pY29uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKTtleHBvcnRzW1wiZGVmYXVsdFwiXT17c2l6ZV9zbWFsbDpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pY29uX3NpemVfc21hbGwsc2l6ZV9yZWd1bGFyOl9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2ljb25fc2l6ZSxzaXplX21lZGl1bTpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pY29uX3NpemVfbWVkaXVtLHNpemVfbGFyZ2U6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnVuaXRfaWNvbl9zaXplX2xhcmdlfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxpY29uU2l6ZXNQeD1mdW5jdGlvbigpe3ZhciBzaXplPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT9fY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9pY29uX3NpemU6YXJndW1lbnRzWzBdO3JldHVybnt3aWR0aDpzaXplK1wicHhcIixoZWlnaHQ6c2l6ZStcInB4XCJ9fSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLWljb25cIjp7ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFwidmVydGljYWwtYWxpZ25cIjpcIm1pZGRsZVwiLFwiYmFja2dyb3VuZC1yZXBlYXRcIjpcIm5vLXJlcGVhdFwiLGZpbGw6XCJjdXJyZW50Y29sb3JcIixwb3NpdGlvbjpcInJlbGF0aXZlXCIsXCImLnBlLWljb24tLWF2YXRhciBpbWdcIjp7Ym9yZGVyOlwibm9uZVwiLFwiYm9yZGVyLXJhZGl1c1wiOlwiNTAlXCIsd2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwifSxcIiBpXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHtkaXNwbGF5OlwiYmxvY2tcIixcImZvbnQtc2l6ZVwiOlwiaW5oZXJpdFwiLGNvbG9yOlwiaW5oZXJpdFwiLFwibGluZS1oZWlnaHRcIjpcImluaGVyaXRcIixoZWlnaHQ6XCIxMDAlXCIsXCIgaW1nXCI6e2hlaWdodDpcIjEwMCVcIn0sXCIgc3ZnXCI6e3dpZHRoOlwiMTAwJVwiLGhlaWdodDpcIjEwMCVcIixmaWxsOlwiY3VycmVudGNvbG9yXCIsY29sb3I6XCJpbmhlcml0XCIsXCIgcGF0aDpub3QoW2ZpbGw9bm9uZV0pXCI6e2ZpbGw6XCJjdXJyZW50Y29sb3JcIn19fV0sXCImLnBlLWljb24tLXNtYWxsXCI6aWNvblNpemVzUHgoY29uZmlnLnNpemVfc21hbGwpLFwiJi5wZS1pY29uLS1yZWd1bGFyXCI6aWNvblNpemVzUHgoY29uZmlnLnNpemVfcmVndWxhciksXCImLnBlLWljb24tLW1lZGl1bVwiOmljb25TaXplc1B4KGNvbmZpZy5zaXplX21lZGl1bSksXCImLnBlLWljb24tLWxhcmdlXCI6aWNvblNpemVzUHgoY29uZmlnLnNpemVfbGFyZ2UpfX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9pY29uL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL2ljb24vdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKSxjdXN0b21Db25maWdGbj1fY3VzdG9tMltcImRlZmF1bHRcIl0uaWNvbixjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLWljb25cIiwoMCxfbGF5b3V0MltcImRlZmF1bHRcIl0pKGNvbmZpZykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGxheW91dD1be2Rpc3BsYXk6XCItd2Via2l0LWJveFwifSx7ZGlzcGxheTpcIi1tb3otYm94XCJ9LHtkaXNwbGF5OlwiLW1zLWZsZXhib3hcIixcIi1tcy1mbGV4LXByZWZlcnJlZC1zaXplXCI6XCJpbml0aWFsXCJ9LHtkaXNwbGF5OlwiLXdlYmtpdC1mbGV4XCJ9LHtkaXNwbGF5OlwiZmxleFwifV0sbGF5b3V0SW5saW5lPVtsYXlvdXQse2Rpc3BsYXk6XCItbXMtaW5saW5lLWZsZXhib3hcIn0se2Rpc3BsYXk6XCItd2Via2l0LWlubGluZS1mbGV4XCJ9LHtkaXNwbGF5OlwiaW5saW5lLWZsZXhcIn1dLGxheW91dEhvcml6b250YWw9W2xheW91dCx7XCItbXMtZmxleC1kaXJlY3Rpb25cIjpcInJvd1wiLFwiLXdlYmtpdC1mbGV4LWRpcmVjdGlvblwiOlwicm93XCIsXCJmbGV4LWRpcmVjdGlvblwiOlwicm93XCJ9XSxsYXlvdXRIb3Jpem9udGFsUmV2ZXJzZT1bbGF5b3V0LHtcIi1tcy1mbGV4LWRpcmVjdGlvblwiOlwicm93LXJldmVyc2VcIixcIi13ZWJraXQtZmxleC1kaXJlY3Rpb25cIjpcInJvdy1yZXZlcnNlXCIsXCJmbGV4LWRpcmVjdGlvblwiOlwicm93LXJldmVyc2VcIn1dLGxheW91dFZlcnRpY2FsPVtsYXlvdXQse1wiLW1zLWZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW5cIixcIi13ZWJraXQtZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtblwiLFwiZmxleC1kaXJlY3Rpb25cIjpcImNvbHVtblwifV0sbGF5b3V0VmVydGljYWxSZXZlcnNlPVtsYXlvdXQse1wiLW1zLWZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW4tcmV2ZXJzZVwiLFwiLXdlYmtpdC1mbGV4LWRpcmVjdGlvblwiOlwiY29sdW1uLXJldmVyc2VcIixcImZsZXgtZGlyZWN0aW9uXCI6XCJjb2x1bW4tcmV2ZXJzZVwifV0sbGF5b3V0V3JhcD1bbGF5b3V0LHtcIi1tcy1mbGV4LXdyYXBcIjpcIndyYXBcIixcIi13ZWJraXQtZmxleC13cmFwXCI6XCJ3cmFwXCIsXCJmbGV4LXdyYXBcIjpcIndyYXBcIn1dLGxheW91dFdyYXBSZXZlcnNlPVtsYXlvdXQse1wiLW1zLWZsZXgtd3JhcFwiOlwid3JhcC1yZXZlcnNlXCIsXCItd2Via2l0LWZsZXgtd3JhcFwiOlwid3JhcC1yZXZlcnNlXCIsXCJmbGV4LXdyYXBcIjpcIndyYXAtcmV2ZXJzZVwifV0sbGF5b3V0U3RhcnQ9W2xheW91dCx7XCItbXMtZmxleC1hbGlnblwiOlwic3RhcnRcIixcIi13ZWJraXQtYWxpZ24taXRlbXNcIjpcImZsZXgtc3RhcnRcIixcImFsaWduLWl0ZW1zXCI6XCJmbGV4LXN0YXJ0XCJ9XSxsYXlvdXRDZW50ZXI9W2xheW91dCx7XCItbXMtZmxleC1hbGlnblwiOlwiY2VudGVyXCIsXCItd2Via2l0LWFsaWduLWl0ZW1zXCI6XCJjZW50ZXJcIixcImFsaWduLWl0ZW1zXCI6XCJjZW50ZXJcIn1dLGxheW91dEVuZD1bbGF5b3V0LHtcIi1tcy1mbGV4LWFsaWduXCI6XCJlbmRcIixcIi13ZWJraXQtYWxpZ24taXRlbXNcIjpcImZsZXgtZW5kXCIsXCJhbGlnbi1pdGVtc1wiOlwiZmxleC1lbmRcIn1dLGxheW91dEp1c3RpZmllZD1bbGF5b3V0LHtcIi1tcy1mbGV4LWxpbmUtcGFja1wiOlwic3RyZXRjaFwiLFwiLW1zLWZsZXgtcGFja1wiOlwianVzdGlmeVwiLFwiLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnRcIjpcInNwYWNlLWJldHdlZW5cIixcImp1c3RpZnktY29udGVudFwiOlwic3BhY2UtYmV0d2VlblwifV0sbGF5b3V0U3RhcnRKdXN0aWZpZWQ9W2xheW91dCx7XCItbXMtZmxleC1hbGlnblwiOlwic3RhcnRcIixcIi1tcy1mbGV4LXBhY2tcIjpcInN0YXJ0XCIsXCItd2Via2l0LWp1c3RpZnktY29udGVudFwiOlwiZmxleC1zdGFydFwiLFwianVzdGlmeS1jb250ZW50XCI6XCJmbGV4LXN0YXJ0XCJ9XSxsYXlvdXRDZW50ZXJKdXN0aWZpZWQ9W2xheW91dCx7XCItbXMtZmxleC1wYWNrXCI6XCJjZW50ZXJcIixcIi13ZWJraXQtanVzdGlmeS1jb250ZW50XCI6XCJjZW50ZXJcIixcImp1c3RpZnktY29udGVudFwiOlwiY2VudGVyXCJ9XSxsYXlvdXRFbmRKdXN0aWZpZWQ9W2xheW91dCx7XCItbXMtZmxleC1wYWNrXCI6XCJlbmRcIixcIi13ZWJraXQtanVzdGlmeS1jb250ZW50XCI6XCJmbGV4LWVuZFwiLFwianVzdGlmeS1jb250ZW50XCI6XCJmbGV4LWVuZFwifV0sbGF5b3V0Q2VudGVyQ2VudGVyPVtsYXlvdXRDZW50ZXJKdXN0aWZpZWQsbGF5b3V0Q2VudGVyXSxsYXlvdXRBcm91bmRKdXN0aWZpZWQ9W2xheW91dCx7XCItbXMtZmxleC1wYWNrXCI6XCJkaXN0cmlidXRlXCIsXCItd2Via2l0LWp1c3RpZnktY29udGVudFwiOlwic3BhY2UtYXJvdW5kXCIsXCJqdXN0aWZ5LWNvbnRlbnRcIjpcInNwYWNlLWFyb3VuZFwifV0sZmxleD1mdW5jdGlvbigpe3ZhciBudW09YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPzE6YXJndW1lbnRzWzBdO3JldHVyblt7XCItd2Via2l0LWJveC1mbGV4XCI6bnVtfSx7XCItbW96LWJveC1mbGV4XCI6bnVtfSx7XCItd2Via2l0LWZsZXhcIjpudW19LHtcIi1tcy1mbGV4XCI6bnVtfSx7ZmxleDpudW19LDE9PT1udW0/e1wiLXdlYmtpdC1mbGV4LWJhc2lzXCI6XCIwLjAwMDAwMDAwMXB4XCJ9Ont9LDE9PT1udW0/e1wiZmxleC1iYXNpc1wiOlwiMC4wMDAwMDAwMDFweFwifTp7fV19LGZsZXhBdXRvPXtcIi1tcy1mbGV4XCI6XCIxIDEgYXV0b1wiLFwiLXdlYmtpdC1mbGV4LWJhc2lzXCI6XCJhdXRvXCIsXCJmbGV4LWJhc2lzXCI6XCJhdXRvXCJ9LGZsZXhBdXRvVmVydGljYWw9e1wiLW1zLWZsZXhcIjpcIjEgMSBhdXRvXCIsXCItd2Via2l0LWZsZXgtYmFzaXNcIjpcImF1dG9cIixcImZsZXgtYmFzaXNcIjpcImF1dG9cIn0sZmxleEluZGV4PWZ1bmN0aW9uKGluZGV4KXtyZXR1cm57XCItbXMtZmxleFwiOmluZGV4LFwiLXdlYmtpdC1mbGV4XCI6aW5kZXgsZmxleDppbmRleH19LHNlbGZTdGFydD17XCItbXMtZmxleC1pdGVtLWFsaWduXCI6XCJzdGFydFwiLFwiLW1zLWFsaWduLXNlbGZcIjpcImZsZXgtc3RhcnRcIixcIi13ZWJraXQtYWxpZ24tc2VsZlwiOlwiZmxleC1zdGFydFwiLFwiYWxpZ24tc2VsZlwiOlwiZmxleC1zdGFydFwifSxzZWxmQ2VudGVyPXtcIi1tcy1mbGV4LWl0ZW0tYWxpZ25cIjpcImNlbnRlclwiLFwiLW1zLWFsaWduLXNlbGZcIjpcImNlbnRlclwiLFwiLXdlYmtpdC1hbGlnbi1zZWxmXCI6XCJjZW50ZXJcIixcImFsaWduLXNlbGZcIjpcImNlbnRlclwifSxzZWxmRW5kPXtcIi1tcy1mbGV4LWl0ZW0tYWxpZ25cIjpcImVuZFwiLFwiLW1zLWFsaWduLXNlbGZcIjpcImZsZXgtZW5kXCIsXCItd2Via2l0LWFsaWduLXNlbGZcIjpcImZsZXgtZW5kXCIsXCJhbGlnbi1zZWxmXCI6XCJmbGV4LWVuZFwifSxzZWxmU3RyZXRjaD17XCItbXMtZmxleC1pdGVtLWFsaWduXCI6XCJzdHJldGNoXCIsXCItbXMtYWxpZ24tc2VsZlwiOlwic3RyZXRjaFwiLFwiLXdlYmtpdC1hbGlnbi1zZWxmXCI6XCJzdHJldGNoXCIsXCJhbGlnbi1zZWxmXCI6XCJzdHJldGNoXCJ9O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtmbGV4OmZsZXgsZmxleEF1dG86ZmxleEF1dG8sZmxleEF1dG9WZXJ0aWNhbDpmbGV4QXV0b1ZlcnRpY2FsLGZsZXhJbmRleDpmbGV4SW5kZXgsbGF5b3V0OmxheW91dCxsYXlvdXRBcm91bmRKdXN0aWZpZWQ6bGF5b3V0QXJvdW5kSnVzdGlmaWVkLGxheW91dENlbnRlcjpsYXlvdXRDZW50ZXIsbGF5b3V0Q2VudGVyQ2VudGVyOmxheW91dENlbnRlckNlbnRlcixsYXlvdXRDZW50ZXJKdXN0aWZpZWQ6bGF5b3V0Q2VudGVySnVzdGlmaWVkLGxheW91dEVuZDpsYXlvdXRFbmQsbGF5b3V0RW5kSnVzdGlmaWVkOmxheW91dEVuZEp1c3RpZmllZCxsYXlvdXRIb3Jpem9udGFsOmxheW91dEhvcml6b250YWwsbGF5b3V0SG9yaXpvbnRhbFJldmVyc2U6bGF5b3V0SG9yaXpvbnRhbFJldmVyc2UsbGF5b3V0SW5saW5lOmxheW91dElubGluZSxsYXlvdXRKdXN0aWZpZWQ6bGF5b3V0SnVzdGlmaWVkLGxheW91dFN0YXJ0OmxheW91dFN0YXJ0LGxheW91dFN0YXJ0SnVzdGlmaWVkOmxheW91dFN0YXJ0SnVzdGlmaWVkLGxheW91dFZlcnRpY2FsOmxheW91dFZlcnRpY2FsLGxheW91dFZlcnRpY2FsUmV2ZXJzZTpsYXlvdXRWZXJ0aWNhbFJldmVyc2UsbGF5b3V0V3JhcDpsYXlvdXRXcmFwLGxheW91dFdyYXBSZXZlcnNlOmxheW91dFdyYXBSZXZlcnNlLHNlbGZDZW50ZXI6c2VsZkNlbnRlcixzZWxmRW5kOnNlbGZFbmQsc2VsZlN0YXJ0OnNlbGZTdGFydCxzZWxmU3RyZXRjaDpzZWxmU3RyZXRjaH0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mbGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9pY29uPXJlcXVpcmUoXCJwb2x5dGhlbmUvaWNvbi9pY29uXCIpLF9pY29uMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pY29uKSxfcmlwcGxlPXJlcXVpcmUoXCJwb2x5dGhlbmUvcmlwcGxlL3JpcHBsZVwiKSxfcmlwcGxlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yaXBwbGUpO3JlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC10aWxlL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1saXN0LXRpbGVcIixwcmltYXJ5OlwicGUtbGlzdC10aWxlX19wcmltYXJ5XCIsc2Vjb25kYXJ5OlwicGUtbGlzdC10aWxlX19zZWNvbmRhcnlcIixjb250ZW50OlwicGUtbGlzdC10aWxlX19jb250ZW50XCIsY29udGVudEZyb250OlwicGUtbGlzdC10aWxlX19jb250ZW50LS1mcm9udFwiLHRpdGxlOlwicGUtbGlzdC10aWxlX190aXRsZVwiLHN1YnRpdGxlOlwicGUtbGlzdC10aWxlX19zdWJ0aXRsZVwiLGhpZ2hTdWJ0aXRsZTpcInBlLWxpc3QtdGlsZV9fc3VidGl0bGUtLWhpZ2hcIixzZWxlY3RlZDpcInBlLWxpc3QtdGlsZS0tc2VsZWN0ZWRcIixkaXNhYmxlZDpcInBlLWxpc3QtdGlsZS0tZGlzYWJsZWRcIixzdGlja3k6XCJwZS1saXN0LXRpbGUtLXN0aWNreVwiLGhhc1N1YnRpdGxlOlwicGUtbGlzdC10aWxlLS1zdWJ0aXRsZVwiLGhhc0hpZ2hTdWJ0aXRsZTpcInBlLWxpc3QtdGlsZS0taGlnaC1zdWJ0aXRsZVwiLGhhc0Zyb250OlwicGUtbGlzdC10aWxlLS1mcm9udFwiLGlzQ29tcGFjdDpcInBlLWxpc3QtdGlsZS0tY29tcGFjdFwifSxwYXJzZVByaW1hcnlDb250ZW50PWZ1bmN0aW9uKG9wdHMpe3ZhciB0YWc9b3B0cy50YWc/b3B0cy50YWc6b3B0cy51cmw/XCJhXCI6XCJkaXZcIixmcm9udENvbXA9b3B0cy5mcm9udD8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCtcIiBcIitDU1NfQ0xBU1NFUy5jb250ZW50RnJvbnQgfSwgY2hpbGRyZW46IFsgb3B0cy5mcm9udCBdIH0pOm9wdHMuaW5kZW50Pyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50K1wiIFwiK0NTU19DTEFTU0VTLmNvbnRlbnRGcm9udCB9LCBjaGlsZHJlbjogW10gfSk6bnVsbDtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcsT2JqZWN0LmFzc2lnbih7XCJjbGFzc1wiOkNTU19DTEFTU0VTLnByaW1hcnl9LG9wdHMudXJsLG9wdHMuZXZlbnRzKSxbZnJvbnRDb21wLCh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50IH0sIGNoaWxkcmVuOiBbIG9wdHMuY29udGVudD9vcHRzLmNvbnRlbnQ6bnVsbCxvcHRzLnRpdGxlPyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy50aXRsZSB9LCBjaGlsZHJlbjogWyBvcHRzLnRpdGxlIF0gfSk6bnVsbCxvcHRzLnN1YnRpdGxlPyh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5zdWJ0aXRsZSB9LCBjaGlsZHJlbjogWyBvcHRzLnN1YnRpdGxlIF0gfSk6bnVsbCxvcHRzLmhpZ2hTdWJ0aXRsZT8oeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuc3VidGl0bGUrXCIgXCIrQ1NTX0NMQVNTRVMuaGlnaFN1YnRpdGxlIH0sIGNoaWxkcmVuOiBbIG9wdHMuaGlnaFN1YnRpdGxlIF0gfSk6bnVsbCBdIH0pXSl9LHBhcnNlU2Vjb25kYXJ5Q29udGVudD1mdW5jdGlvbihvcHRzKXt2YXIgc2Vjb25kYXJ5T3B0cz1vcHRzLnNlY29uZGFyeXx8e30sdGFnPXZvaWQgMDtyZXR1cm4gdGFnPXNlY29uZGFyeU9wdHMudGFnP3NlY29uZGFyeU9wdHMudGFnOnNlY29uZGFyeU9wdHMudXJsP1wiYVwiOlwiZGl2XCIsKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLE9iamVjdC5hc3NpZ24oe1wiY2xhc3NcIjpDU1NfQ0xBU1NFUy5zZWNvbmRhcnl9LHNlY29uZGFyeU9wdHMudXJsLHNlY29uZGFyeU9wdHMuZXZlbnRzKSwoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogQ1NTX0NMQVNTRVMuY29udGVudCB9LCBjaGlsZHJlbjogWyBzZWNvbmRhcnlPcHRzLmljb24/X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX2ljb24yW1wiZGVmYXVsdFwiXSxzZWNvbmRhcnlPcHRzLmljb24pOm51bGwsc2Vjb25kYXJ5T3B0cy5jb250ZW50P3NlY29uZGFyeU9wdHMuY29udGVudDpudWxsIF0gfSkpfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sdGFnPW9wdHMudGFnfHxcImRpdlwiLGhlaWdodENsYXNzPW9wdHMuc3VidGl0bGU/Q1NTX0NMQVNTRVMuaGFzU3VidGl0bGU6b3B0cy5oaWdoU3VidGl0bGU/Q1NTX0NMQVNTRVMuaGFzSGlnaFN1YnRpdGxlOm9wdHMuZnJvbnR8fG9wdHMuaW5kZW50P0NTU19DTEFTU0VTLmhhc0Zyb250Om51bGwscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5zZWxlY3RlZD9DU1NfQ0xBU1NFUy5zZWxlY3RlZDpudWxsLG9wdHMuZGlzYWJsZWQ/Q1NTX0NMQVNTRVMuZGlzYWJsZWQ6bnVsbCxvcHRzLnN0aWNreT9DU1NfQ0xBU1NFUy5zdGlja3k6bnVsbCxvcHRzLmNvbXBhY3Q/Q1NTX0NMQVNTRVMuaXNDb21wYWN0Om51bGwsaGVpZ2h0Q2xhc3Msb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30sY29udGVudD1bb3B0cy5pbmsmJiFvcHRzLmRpc2FibGVkP19taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9yaXBwbGUyW1wiZGVmYXVsdFwiXSxvcHRzLnJpcHBsZSk6bnVsbCxwYXJzZVByaW1hcnlDb250ZW50KG9wdHMpLG9wdHMuc2Vjb25kYXJ5P3BhcnNlU2Vjb25kYXJ5Q29udGVudChvcHRzKTpudWxsXTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e3ZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC10aWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtbGlzdC10aWxlXCIse1wiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfdGl0bGVcIl19LFwiJi5wZS1saXN0X19oZWFkZXJcIjp7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCJpbmhlcml0XCIsXCIgLnBlLWxpc3QtdGlsZV9fdGl0bGVcIjp7Y29sb3I6Y29uZmlnW1wiY29sb3JfXCIrdGludCtcIl9saXN0X2hlYWRlclwiXX19LFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQsIC5wZS1saXN0LXRpbGVfX3N1YnRpdGxlXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfc3VidGl0bGVcIl19LFwiJi5wZS1saXN0LXRpbGUtLWRpc2FibGVkXCI6e1wiJiwgLnBlLWxpc3QtdGlsZV9fdGl0bGUsIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQsIC5wZS1saXN0LXRpbGVfX3N1YnRpdGxlXCI6e2NvbG9yOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfdGV4dF9kaXNhYmxlZFwiXX19LFwiJi5wZS1saXN0LXRpbGUtLXNlbGVjdGVkXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYmFja2dyb3VuZF9zZWxlY3RlZFwiXX19KV19LG5vVG91Y2g9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1saXN0LXRpbGVcIix7XCImOm5vdCgucGUtbGlzdF9faGVhZGVyKTpub3QoLnBlLWxpc3QtdGlsZS0tZGlzYWJsZWQpOmhvdmVyXCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYmFja2dyb3VuZF9ob3ZlclwiXX19KV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiKSx7XCJodG1sLnBlLW5vLXRvdWNoIC5wZS1saXN0LS1ob3ZlcmFibGVcIjpbbm9Ub3VjaChjb25maWcsXCJsaWdodFwiLFwiIFwiKV19LHtcIi5wZS1kYXJrLXRoZW1lXCI6W3N0eWxlKGNvbmZpZyxcImRhcmtcIixcIiBcIiksc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiJlwiKV19LHtcImh0bWwucGUtbm8tdG91Y2ggLnBlLWRhcmstdGhlbWUgLnBlLWxpc3QtLWhvdmVyYWJsZVwiOm5vVG91Y2goY29uZmlnLFwiZGFya1wiLFwiIFwiKSxcImh0bWwucGUtbm8tdG91Y2ggLnBlLWxpc3QtLWhvdmVyYWJsZSAucGUtZGFyay10aGVtZVwiOm5vVG91Y2goY29uZmlnLFwiZGFya1wiKX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxyZ2JhPV9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhLHNpbmdsZV9oZWlnaHQ9NDgscGFkZGluZz04LHNpbmdsZV93aXRoX2ljb25faGVpZ2h0PTU2O2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtzaW5nbGVfaGVpZ2h0OnNpbmdsZV9oZWlnaHQsc2luZ2xlX2xpbmVfaGVpZ2h0OnNpbmdsZV9oZWlnaHQtMipwYWRkaW5nLTExLHNpbmdsZV93aXRoX2ljb25faGVpZ2h0OnNpbmdsZV93aXRoX2ljb25faGVpZ2h0LHNpbmdsZV93aXRoX2ljb25fbGluZV9oZWlnaHQ6c2luZ2xlX3dpdGhfaWNvbl9oZWlnaHQtMipwYWRkaW5nLTExLHBhZGRpbmc6MTMsY29tcGFjdF9wYWRkaW5nOjksc3VidGl0bGVfbGluZV9jb3VudDoxLGhhc19zdWJ0aXRsZV9wYWRkaW5nOjE1LGhpZ2hfc3VidGl0bGVfbGluZV9jb3VudDoyLGhhc19oaWdoX3N1YnRpdGxlX3BhZGRpbmc6MTMsZnJvbnRfaXRlbV93aWR0aDo3MixzaWRlX3BhZGRpbmc6MipfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCxmb250X3NpemVfdGl0bGU6MTYsZm9udF9zaXplX3N1YnRpdGxlOjE0LGxpbmVfaGVpZ2h0X3N1YnRpdGxlOjIwLGZvbnRfc2l6ZV9saXN0X2hlYWRlcjoxNCxmb250X3NpemVfc21hbGw6MTIsY29sb3JfbGlnaHRfdGl0bGU6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5KSxjb2xvcl9saWdodF9zdWJ0aXRsZTpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3NlY29uZGFyeSksY29sb3JfbGlnaHRfaW5mbzpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF90ZXh0X3RlcnRpYXJ5KSxjb2xvcl9saWdodF90ZXh0X2Rpc2FibGVkOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfZGlzYWJsZWQpLGNvbG9yX2xpZ2h0X2xpc3RfaGVhZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X3RleHRfdGVydGlhcnkpLGNvbG9yX2xpZ2h0X2JhY2tncm91bmRfaG92ZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfYmFja2dyb3VuZF9ob3ZlciksY29sb3JfbGlnaHRfYmFja2dyb3VuZF9zZWxlY3RlZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9saWdodF9mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9saWdodF9iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9kYXJrX3RpdGxlOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3ByaW1hcnkpLGNvbG9yX2Rhcmtfc3VidGl0bGU6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfc2Vjb25kYXJ5KSxjb2xvcl9kYXJrX2luZm86cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX3RleHRfdGVydGlhcnkpLGNvbG9yX2RhcmtfdGV4dF9kaXNhYmxlZDpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF9kaXNhYmxlZCksY29sb3JfZGFya19saXN0X2hlYWRlcjpyZ2JhKF9jb25maWcyW1wiZGVmYXVsdFwiXS5jb2xvcl9kYXJrX2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2RhcmtfdGV4dF90ZXJ0aWFyeSksY29sb3JfZGFya19iYWNrZ3JvdW5kX2hvdmVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya19iYWNrZ3JvdW5kX2hvdmVyKSxjb2xvcl9kYXJrX2JhY2tncm91bmRfc2VsZWN0ZWQ6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JhY2tncm91bmRfaG92ZXIpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxfZmxleD1yZXF1aXJlKFwicG9seXRoZW5lL2xheW91dC90aGVtZS9mbGV4XCIpLF9mbGV4Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mbGV4KSxwYWRkaW5nSD1mdW5jdGlvbihoKXtyZXR1cm57XCJwYWRkaW5nLWxlZnRcIjpoK1wicHhcIixcInBhZGRpbmctcmlnaHRcIjpoK1wicHhcIn19LHBhZGRpbmdWPWZ1bmN0aW9uKHRvcCxib3R0b20pe3JldHVybntcInBhZGRpbmctdG9wXCI6dG9wK1wicHhcIixcInBhZGRpbmctYm90dG9tXCI6KGJvdHRvbXx8dG9wKStcInB4XCJ9fSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLWxpc3QtdGlsZVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dCx7cG9zaXRpb246XCJyZWxhdGl2ZVwiLG92ZXJmbG93OlwiaGlkZGVuXCIsXCImLnBlLWxpc3QtdGlsZS0tc3RpY2t5XCI6X21peGluMltcImRlZmF1bHRcIl0uc3RpY2t5KCksXCIgLnBlLWxpc3QtdGlsZV9fcHJpbWFyeSwgLnBlLWxpc3QtdGlsZV9fc2Vjb25kYXJ5XCI6W19mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0SG9yaXpvbnRhbCx7XCIgYSZcIjp7XCJ0ZXh0LWRlY29yYXRpb25cIjpcIm5vbmVcIixjb2xvcjpcImluaGVyaXRcIixib3JkZXI6XCJub25lXCJ9fV0sXCIgLnBlLWxpc3QtdGlsZV9fcHJpbWFyeVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmZsZXgoKSx7cG9zaXRpb246XCJyZWxhdGl2ZVwiLFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQ6bm90KC5wZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250KVwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmZsZXgoKSxwYWRkaW5nVihjb25maWcucGFkZGluZyxjb25maWcucGFkZGluZysxKV19XSxcIiAucGUtbGlzdC10aWxlX19zZWNvbmRhcnlcIjp7XCJ0ZXh0LWFsaWduXCI6XCJyaWdodFwiLFwiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZV90aXRsZStcInB4XCJ9LFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRWZXJ0aWNhbCxfZmxleDJbXCJkZWZhdWx0XCJdLnNlbGZDZW50ZXIscGFkZGluZ0goY29uZmlnLnNpZGVfcGFkZGluZykse1wiJi5wZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250XCI6W3BhZGRpbmdWKGNvbmZpZy5wYWRkaW5nLTUpLHt3aWR0aDpjb25maWcuZnJvbnRfaXRlbV93aWR0aCtcInB4XCJ9XSxcIiBzbWFsbFwiOntcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemVfc21hbGwrXCJweFwifX1dLFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250ICsgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOntcInBhZGRpbmctbGVmdFwiOjB9LFwiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKDEsY29uZmlnLnNpbmdsZV9saW5lX2hlaWdodCkse1wiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZV90aXRsZStcInB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOmNvbmZpZy5zaW5nbGVfbGluZV9oZWlnaHQrXCJweFwifV0sXCIgLnBlLWxpc3QtdGlsZV9fc3VidGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0uZWxsaXBzaXMoY29uZmlnLnN1YnRpdGxlX2xpbmVfY291bnQsY29uZmlnLmxpbmVfaGVpZ2h0X3N1YnRpdGxlKSx7XCJmb250LXNpemVcIjpjb25maWcuZm9udF9zaXplX3N1YnRpdGxlK1wicHhcIixcImxpbmUtaGVpZ2h0XCI6Y29uZmlnLmxpbmVfaGVpZ2h0X3N1YnRpdGxlK1wicHhcIixcIiYucGUtbGlzdC10aWxlX19zdWJ0aXRsZS0taGlnaFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcyhjb25maWcuaGlnaF9zdWJ0aXRsZV9saW5lX2NvdW50LGNvbmZpZy5saW5lX2hlaWdodF9zdWJ0aXRsZSkse1wid2hpdGUtc3BhY2VcIjpcIm5vcm1hbFwifV19XSxcIiYucGUtbGlzdC10aWxlLS1zZWxlY3RlZCwgJi5wZS1saXN0LXRpbGUtLWRpc2FibGVkXCI6e2N1cnNvcjpcImRlZmF1bHRcIn0sXCImLnBlLWxpc3QtdGlsZS0tc3VidGl0bGVcIjp7XCIgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOltwYWRkaW5nVihjb25maWcuaGFzX3N1YnRpdGxlX3BhZGRpbmcsY29uZmlnLmhhc19zdWJ0aXRsZV9wYWRkaW5nKzEpLHtcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOntwYWRkaW5nOjB9fV19LFwiJi5wZS1saXN0LXRpbGUtLWhpZ2gtc3VidGl0bGVcIjp7XCIgLnBlLWxpc3QtdGlsZS0taGlnaC1zdWJ0aXRsZSAucGUtbGlzdC10aWxlX19zZWNvbmRhcnlcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5sYXlvdXRIb3Jpem9udGFsLF9mbGV4MltcImRlZmF1bHRcIl0ubGF5b3V0U3RhcnRdLFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjpbX2ZsZXgyW1wiZGVmYXVsdFwiXS5zZWxmU3RhcnQscGFkZGluZ1YoY29uZmlnLmhhc19oaWdoX3N1YnRpdGxlX3BhZGRpbmcsY29uZmlnLmhhc19oaWdoX3N1YnRpdGxlX3BhZGRpbmcrMSkse1wiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6e3BhZGRpbmc6MH19XX0sXCImLnBlLWxpc3RfX2hlYWRlclwiOntoZWlnaHQ6Y29uZmlnLnNpbmdsZV9oZWlnaHQrXCJweFwiLFwiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnRcIjp7XCJwYWRkaW5nLXRvcFwiOjAsXCJwYWRkaW5nLWJvdHRvbVwiOjB9LFwiIC5wZS1saXN0LXRpbGVfX3RpdGxlXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKDEsY29uZmlnLnNpbmdsZV9oZWlnaHQpLHtcImZvbnQtc2l6ZVwiOmNvbmZpZy5mb250X3NpemVfbGlzdF9oZWFkZXIrXCJweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbWVkaXVtLFwibGluZS1oZWlnaHRcIjpjb25maWcuc2luZ2xlX2hlaWdodCtcInB4XCIscGFkZGluZzowfV19LFwiIC5wZS1saXN0LS1jb21wYWN0ICYsICYucGUtbGlzdC10aWxlLS1jb21wYWN0XCI6e1wiJjpub3QoLnBlLWxpc3RfX2hlYWRlcilcIjp7XCIgLnBlLWxpc3QtdGlsZV9fY29udGVudFwiOnBhZGRpbmdWKGNvbmZpZy5jb21wYWN0X3BhZGRpbmcsY29uZmlnLmNvbXBhY3RfcGFkZGluZysxKX19LFwiQHN1cHBvcnRzICgtbW96LWFwcGVhcmFuY2U6bm9uZSkgYW5kIChkaXNwbGF5OmNvbnRlbnRzKVwiOntcIiAucGUtbGlzdC10aWxlX19wcmltYXJ5LCAucGUtbGlzdC10aWxlX19jb250ZW50XCI6e292ZXJmbG93OlwiaGlkZGVuXCJ9fSxcIi5wZS1kaWFsb2cgLnBlLW1lbnVfX2NvbnRlbnQgJlwiOntcIiAucGUtbGlzdC10aWxlX190aXRsZVwiOl9taXhpbjJbXCJkZWZhdWx0XCJdLmVsbGlwc2lzKFwibm9uZVwiKX0sXCIucGUtbWVudV9fY29udGVudCAmXCI6e1wiJjpub3QoLnBlLWxpc3QtdGlsZS0tZGlzYWJsZWQpXCI6e2N1cnNvcjpcImRlZmF1bHRcIixcIiYsIC5wZS1saXN0LXRpbGVfX3ByaW1hcnksIC5wZS1saXN0LXRpbGVfX3NlY29uZGFyeVwiOntcIiAucGUtbGlzdC10aWxlX190aXRsZSwgLnBlLWxpc3QtdGlsZV9fc3VidGl0bGVcIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcInVzZXItc2VsZWN0XCI6XCJub25lXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc191c2VyX3NlbGVjdCldfX19LFwiaHRtbC5wZS1uby10b3VjaCAucGUtbGlzdC0taG92ZXJhYmxlICYsIGh0bWwucGUtbm8tdG91Y2ggLnBlLWxpc3QtLXNlbGVjdGFibGUgJlwiOntcIiY6bm90KC5wZS1saXN0X19oZWFkZXIpOm5vdCgucGUtbGlzdC10aWxlLS1kaXNhYmxlZCk6bm90KC5wZS1saXN0LXRpbGUtLXNlbGVjdGVkKTpob3ZlclwiOntjdXJzb3I6XCJwb2ludGVyXCJ9fX1dfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QtdGlsZS90aGVtZS9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxfY3VzdG9tPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2N1c3RvbVwiKSxfY3VzdG9tMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXN0b20pLF9sYXlvdXQ9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0LXRpbGUvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC10aWxlL3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdW1wibGlzdC10aWxlXCJdLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtbGlzdC10aWxlXCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkscmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vb2JqZWN0LmFzc2lnblwiKTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9saXN0VGlsZT1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QtdGlsZS9saXN0LXRpbGVcIiksX2xpc3RUaWxlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9saXN0VGlsZSk7cmVxdWlyZShcInBvbHl0aGVuZS9saXN0L3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1saXN0XCIsaGVhZGVyOlwicGUtbGlzdF9faGVhZGVyXCIsaG92ZXJhYmxlOlwicGUtbGlzdC0taG92ZXJhYmxlXCIsc2VsZWN0YWJsZTpcInBlLWxpc3QtLXNlbGVjdGFibGVcIixib3JkZXJzOlwicGUtbGlzdC0tYm9yZGVyc1wiLGluZGVudGVkQm9yZGVyczpcInBlLWxpc3QtLWJvcmRlcnMtaW5kZW50ZWRcIixoYXNIZWFkZXI6XCJwZS1saXN0LS1oZWFkZXJcIixpc0NvbXBhY3Q6XCJwZS1saXN0LS1jb21wYWN0XCJ9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5ib3JkZXJzP0NTU19DTEFTU0VTLmJvcmRlcnM6bnVsbCxvcHRzLmluZGVudGVkQm9yZGVycz9DU1NfQ0xBU1NFUy5pbmRlbnRlZEJvcmRlcnM6bnVsbCxvcHRzLmhvdmVyYWJsZT9DU1NfQ0xBU1NFUy5ob3ZlcmFibGU6bnVsbCxvcHRzLnNlbGVjdGFibGU/Q1NTX0NMQVNTRVMuc2VsZWN0YWJsZTpudWxsLG9wdHMuaGVhZGVyP0NTU19DTEFTU0VTLmhhc0hlYWRlcjpudWxsLG9wdHMuY29tcGFjdD9DU1NfQ0xBU1NFUy5pc0NvbXBhY3Q6bnVsbCxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOm9wdHMuY29uZmlnfSxoZWFkZXJPcHRzPXZvaWQgMDtvcHRzLmhlYWRlciYmKGhlYWRlck9wdHM9T2JqZWN0LmFzc2lnbih7fSxvcHRzLmhlYWRlciksaGVhZGVyT3B0c1tcImNsYXNzXCJdPVtDU1NfQ0xBU1NFUy5oZWFkZXIsaGVhZGVyT3B0c1tcImNsYXNzXCJdfHxudWxsXS5qb2luKFwiIFwiKSk7dmFyIGNvbnRlbnQ9W2hlYWRlck9wdHM/X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5jb21wb25lbnQoX2xpc3RUaWxlMltcImRlZmF1bHRcIl0saGVhZGVyT3B0cyk6bnVsbCxvcHRzLnRpbGVzP29wdHMudGlsZXM6bnVsbF07cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXt2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBfcmVmLHNjb3BlPWFyZ3VtZW50cy5sZW5ndGg8PTJ8fHZvaWQgMD09PWFyZ3VtZW50c1syXT9cIlwiOmFyZ3VtZW50c1syXTtyZXR1cm5bKF9yZWY9e30sX2RlZmluZVByb3BlcnR5KF9yZWYsc2NvcGUrXCIucGUtbGlzdFwiLHtcIiYucGUtbGlzdC0tYm9yZGVyc1wiOntcIiAucGUtbGlzdC10aWxlOm5vdCgucGUtbGlzdF9faGVhZGVyKVwiOntcIiY6bm90KDpsYXN0LWNoaWxkKVwiOntcImJvcmRlci1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9yZGVyXCJdfX19LFwiJi5wZS1saXN0LS1ib3JkZXJzLWluZGVudGVkXCI6e1wiIC5wZS1saXN0LXRpbGU6bm90KC5wZS1saXN0X19oZWFkZXIpXCI6e1wiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQ6bm90KC5wZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250KVwiOntcImJvcmRlci1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9yZGVyXCJdfX19fSksX2RlZmluZVByb3BlcnR5KF9yZWYsXCIgLnBlLWxpc3QgKyAucGUtbGlzdFwiLHtcImJvcmRlci1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYm9yZGVyXCJdfSksX3JlZildfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5bc3R5bGUoY29uZmlnLFwibGlnaHRcIikse1wiLnBlLWRhcmstdGhlbWVcIjpbc3R5bGUoY29uZmlnLFwiZGFya1wiLFwiIFwiKSxzdHlsZShjb25maWcsXCJkYXJrXCIsXCImXCIpXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jb25maWdcIiksX2NvbmZpZzI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uZmlnKSxyZ2JhPV9jb25maWcyW1wiZGVmYXVsdFwiXS5yZ2JhO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtwYWRkaW5nOl9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfY29tcG9uZW50LHBhZGRpbmdfY29tcGFjdDpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudC8yLGJvcmRlcl93aWR0aF9zdGFja2VkOjEsYm9yZGVyX3dpZHRoX2JvcmRlcmVkOjEsY29sb3JfbGlnaHRfYm9yZGVyOnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2ZvcmVncm91bmQsX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmJsZW5kX2xpZ2h0X2JvcmRlcl9saWdodCksY29sb3JfZGFya19ib3JkZXI6cmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19mb3JlZ3JvdW5kLF9jb25maWcyW1wiZGVmYXVsdFwiXS5ibGVuZF9kYXJrX2JvcmRlcl9saWdodCl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxib3JkZXJTdHlsZT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5oYWlybGluZShcImJvcmRlci1ib3R0b21cIikse1wiYm9yZGVyLXN0eWxlXCI6XCJub25lIG5vbmUgc29saWQgbm9uZVwiLFwiYm9yZGVyLXdpZHRoXCI6Y29uZmlnLmJvcmRlcl93aWR0aF9ib3JkZXJlZCtcInB4XCJ9fSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLWxpc3RcIjp7cGFkZGluZzpjb25maWcucGFkZGluZytcInB4IDBcIixcIiYucGUtbGlzdC0taGVhZGVyXCI6e1wicGFkZGluZy10b3BcIjowfSxcIiYucGUtbGlzdC0tY29tcGFjdFwiOntwYWRkaW5nOmNvbmZpZy5wYWRkaW5nX2NvbXBhY3QrXCJweCAwXCJ9LFwiJiArICZcIjpbX21peGluMltcImRlZmF1bHRcIl0uaGFpcmxpbmUoXCJib3JkZXItdG9wXCIpLHtcImJvcmRlci1zdHlsZVwiOlwic29saWQgbm9uZSBub25lIG5vbmVcIixcImJvcmRlci13aWR0aFwiOmNvbmZpZy5ib3JkZXJfd2lkdGhfc3RhY2tlZCtcInB4XCJ9XSxcIiYucGUtbGlzdC0tYm9yZGVyc1wiOntcIiAucGUtbGlzdC10aWxlOm5vdCgucGUtbGlzdF9faGVhZGVyKVwiOntcIiY6bm90KDpsYXN0LWNoaWxkKVwiOntcIiZcIjpib3JkZXJTdHlsZShjb25maWcpfX19LFwiJi5wZS1saXN0LS1ib3JkZXJzLWluZGVudGVkXCI6e1wiYm9yZGVyLXRvcFwiOlwibm9uZVwiLFwiIC5wZS1saXN0LXRpbGU6bm90KC5wZS1saXN0X19oZWFkZXIpXCI6e1wiJjpub3QoOmxhc3QtY2hpbGQpXCI6e1wiIC5wZS1saXN0LXRpbGVfX2NvbnRlbnQ6bm90KC5wZS1saXN0LXRpbGVfX2NvbnRlbnQtLWZyb250KVwiOmJvcmRlclN0eWxlKGNvbmZpZyl9fX19fV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXlvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX2NvbmZpZz1yZXF1aXJlKFwicG9seXRoZW5lL2xpc3QvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvbGlzdC90aGVtZS9sYXlvdXRcIiksX2xheW91dDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGF5b3V0KSxfY29sb3I9cmVxdWlyZShcInBvbHl0aGVuZS9saXN0L3RoZW1lL2NvbG9yXCIpLF9jb2xvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLmxpc3QsY29uZmlnPWN1c3RvbUNvbmZpZ0ZuP2N1c3RvbUNvbmZpZ0ZuKF9jb25maWcyW1wiZGVmYXVsdFwiXSk6X2NvbmZpZzJbXCJkZWZhdWx0XCJdO19zdHlsZXIyW1wiZGVmYXVsdFwiXS5hZGQoXCJwZS1saXN0XCIsKDAsX2xheW91dDJbXCJkZWZhdWx0XCJdKShjb25maWcpLCgwLF9jb2xvcjJbXCJkZWZhdWx0XCJdKShjb25maWcpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9ldmVudHM9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vZXZlbnRzXCIpLF9ldmVudHMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50cyksX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9zaGFkb3c9cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvc2hhZG93XCIpLF9zaGFkb3cyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NoYWRvdyksX3RyYW5zaXRpb249cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vdHJhbnNpdGlvblwiKSxfdHJhbnNpdGlvbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHJhbnNpdGlvbik7cmVxdWlyZShcInBvbHl0aGVuZS9tZW51L3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS1tZW51XCIsY29udGVudDpcInBlLW1lbnVfX2NvbnRlbnRcIixwbGFjZWhvbGRlcjpcInBlLW1lbnUtLXBsYWNlaG9sZGVyXCIsdmlzaWJsZTpcInBlLW1lbnUtLXZpc2libGVcIixwZXJtYW5lbnQ6XCJwZS1tZW51LS1wZXJtYW5lbnRcIix0YXJnZXQ6XCJwZS1tZW51LS10YXJnZXRcIix3aWR0aF9uOlwicGUtbWVudS0td2lkdGgtXCIsd2lkdGhfYXV0bzpcInBlLW1lbnUtLXdpZHRoLWF1dG9cIixsaXN0VGlsZTpcInBlLWxpc3QtdGlsZVwiLHNlbGVjdGVkTGlzdFRpbGU6XCJwZS1saXN0LXRpbGUtLXNlbGVjdGVkXCJ9LE9GRlNFVF9WPS04LERFRkFVTFRfT0ZGU0VUX0g9MTYsTUlOX1NJWkU9MS41LHBvc2l0aW9uTWVudT1mdW5jdGlvbihjdHJsLG9wdHMpe2lmKG9wdHMudGFyZ2V0KXt2YXIgdGFyZ2V0RWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIitvcHRzLnRhcmdldCk7aWYodGFyZ2V0RWwpe3ZhciBvZmZzZXRIPXZvaWQgMCE9PW9wdHMub2Zmc2V0P29wdHMub2Zmc2V0OkRFRkFVTFRfT0ZGU0VUX0gsbWVudUVsPWN0cmwuZWw7aWYobWVudUVsKXt2YXIgY29udGVudEVsPWN0cmwuY29udGVudEVsLG9yaWdpbj1vcHRzLm9yaWdpbnx8XCJ0b3AtbGVmdFwiLHJlcG9zaXRpb249b3B0cy5yZXBvc2l0aW9uIT09ITEscG9zaXRpb25PZmZzZXQ9MDtpZihyZXBvc2l0aW9uKXt2YXIgZmlyc3RJdGVtPWNvbnRlbnRFbC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK0NTU19DTEFTU0VTLmxpc3RUaWxlKVswXSxzZWxlY3RlZEl0ZW09Y29udGVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrQ1NTX0NMQVNTRVMuc2VsZWN0ZWRMaXN0VGlsZSk7aWYoZmlyc3RJdGVtJiZzZWxlY3RlZEl0ZW0pe3ZhciBmaXJzdEl0ZW1SZWN0PWZpcnN0SXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzZWxlY3RlZEl0ZW1SZWN0PXNlbGVjdGVkSXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtwb3NpdGlvbk9mZnNldD1zZWxlY3RlZEl0ZW1SZWN0LnRvcC1maXJzdEl0ZW1SZWN0LnRvcH12YXIgYWxpZ25FbD1zZWxlY3RlZEl0ZW18fGZpcnN0SXRlbSxhbGlnblJlY3Q9YWxpZ25FbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxfdGFyZ2V0UmVjdD10YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxoZWlnaHREaWZmPWFsaWduUmVjdC5oZWlnaHQtX3RhcmdldFJlY3QuaGVpZ2h0O3Bvc2l0aW9uT2Zmc2V0Kz1oZWlnaHREaWZmLzJ9dmFyIHRhcmdldFJlY3Q9dGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscGFyZW50UmVjdD1tZW51RWwucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxhbGlnbkxlZnQ9ZnVuY3Rpb24oKXtyZXR1cm4gbWVudUVsLnN0eWxlLmxlZnQ9dGFyZ2V0UmVjdC5sZWZ0LXBhcmVudFJlY3QubGVmdCtvZmZzZXRIK1wicHhcIn0sYWxpZ25SaWdodD1mdW5jdGlvbigpe3JldHVybiBtZW51RWwuc3R5bGUucmlnaHQ9dGFyZ2V0UmVjdC5yaWdodC1wYXJlbnRSZWN0LnJpZ2h0K29mZnNldEgrXCJweFwifSxhbGlnblRvcD1mdW5jdGlvbigpe3JldHVybiBtZW51RWwuc3R5bGUudG9wPXRhcmdldFJlY3QudG9wLXBhcmVudFJlY3QudG9wLXBvc2l0aW9uT2Zmc2V0K09GRlNFVF9WK1wicHhcIn0sYWxpZ25Cb3R0b209ZnVuY3Rpb24oKXtyZXR1cm4gbWVudUVsLnN0eWxlLmJvdHRvbT10YXJnZXRSZWN0LmJvdHRvbS1wYXJlbnRSZWN0LmJvdHRvbS1wb3NpdGlvbk9mZnNldCtcInB4XCJ9LGFsaWduRm49e1widG9wLWxlZnRcIjpmdW5jdGlvbigpe3JldHVybiBhbGlnblRvcCgpJiZhbGlnbkxlZnQoKX0sXCJ0b3AtcmlnaHRcIjpmdW5jdGlvbigpe3JldHVybiBhbGlnblRvcCgpJiZhbGlnblJpZ2h0KCl9LFwiYm90dG9tLWxlZnRcIjpmdW5jdGlvbigpe3JldHVybiBhbGlnbkJvdHRvbSgpJiZhbGlnbkxlZnQoKX0sXCJib3R0b20tcmlnaHRcIjpmdW5jdGlvbigpe3JldHVybiBhbGlnbkJvdHRvbSgpJiZhbGlnblJpZ2h0KCl9fTthbGlnbkZuW29yaWdpbl0uY2FsbCgpfX19fSxzaG93PWZ1bmN0aW9uKGN0cmwsb3B0cyl7cmV0dXJuIGN0cmwuaXNUcmFuc2l0aW9uaW5nPSEwLF90cmFuc2l0aW9uMltcImRlZmF1bHRcIl0uc2hvdyhPYmplY3QuYXNzaWduKHt9LG9wdHMse2VsOmN0cmwuZWwsc2hvd0NsYXNzOkNTU19DTEFTU0VTLnZpc2libGV9KSkudGhlbihmdW5jdGlvbigpe2N0cmwuaXNUcmFuc2l0aW9uaW5nPSExLGN0cmwudmlzaWJsZT0hMCxvcHRzLmRpZFNob3cmJm9wdHMuZGlkU2hvdyhvcHRzLmlkKX0pfSxoaWRlPWZ1bmN0aW9uKGN0cmwsb3B0cyl7cmV0dXJuIGN0cmwuaXNUcmFuc2l0aW9uaW5nPSEwLF90cmFuc2l0aW9uMltcImRlZmF1bHRcIl0uaGlkZShPYmplY3QuYXNzaWduKHt9LG9wdHMse2VsOmN0cmwuZWwsc2hvd0NsYXNzOkNTU19DTEFTU0VTLnZpc2libGV9KSkudGhlbihmdW5jdGlvbigpe2N0cmwuaXNUcmFuc2l0aW9uaW5nPSExLGN0cmwudmlzaWJsZT0hMSxvcHRzLmRpZEhpZGUmJm9wdHMuZGlkSGlkZShvcHRzLmlkKSxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpfSl9LHVuaWZ5U2l6ZT1mdW5jdGlvbihzaXplKXtyZXR1cm4gTUlOX1NJWkU+c2l6ZT9NSU5fU0laRTpzaXplfSx3aWR0aENsYXNzPWZ1bmN0aW9uKHNpemUpe3ZhciBzaXplU3RyPXNpemUudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLFwiLVwiKTtyZXR1cm4gQ1NTX0NMQVNTRVMud2lkdGhfbitzaXplU3RyfSxjcmVhdGVWaWV3PWZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV0sbGlzdGVuRWw9ZG9jdW1lbnQuYm9keSxhY3RpdmF0ZURpc21pc3NUYXA9ZnVuY3Rpb24oKXtsaXN0ZW5FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixoYW5kbGVEaXNtaXNzVGFwKX0sZGVBY3RpdmF0ZURpc21pc3NUYXA9ZnVuY3Rpb24oKXtsaXN0ZW5FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIixoYW5kbGVEaXNtaXNzVGFwKX0saGFuZGxlRGlzbWlzc1RhcD1mdW5jdGlvbihlKXtlLnRhcmdldCE9PWN0cmwuZWwmJihkZUFjdGl2YXRlRGlzbWlzc1RhcCgpLGUuZGVmYXVsdFByZXZlbnRlZD9oaWRlKGN0cmwsb3B0cyk6aGlkZShjdHJsLE9iamVjdC5hc3NpZ24oe30sb3B0cyx7aGlkZURlbGF5OjB9KSkpfSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5wZXJtYW5lbnQ/Q1NTX0NMQVNTRVMucGVybWFuZW50Om51bGwsb3B0cy50YXJnZXQ/Q1NTX0NMQVNTRVMudGFyZ2V0OlwibGF5b3V0IGNlbnRlci1jZW50ZXJcIixvcHRzLnNpemU/d2lkdGhDbGFzcyh1bmlmeVNpemUob3B0cy5zaXplKSk6bnVsbCxvcHRzW1wiY2xhc3NcIl1dLmpvaW4oXCIgXCIpLGlkOm9wdHMuaWR8fFwiXCIsY29uZmlnOmZ1bmN0aW9uKGVsLGluaXRlZCxjb250ZXh0LHZkb20pe2lmKCFpbml0ZWQpe29wdHMuY29uZmlnJiZvcHRzLmNvbmZpZyhlbCxpbml0ZWQsY29udGV4dCx2ZG9tKSxjdHJsLmVsPWVsO3ZhciB1cGRhdGU9ZnVuY3Rpb24oKXtwb3NpdGlvbk1lbnUoY3RybCxvcHRzKSxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnJlZHJhdygpfSxoYW5kbGVFc2NhcGU9ZnVuY3Rpb24oZSl7Mjc9PT1lLndoaWNoJiZoaWRlKGN0cmwsT2JqZWN0LmFzc2lnbih7fSxvcHRzLHtoaWRlRGVsYXk6MH0pKX07b3B0cy5wZXJtYW5lbnR8fChfZXZlbnRzMltcImRlZmF1bHRcIl0uc3Vic2NyaWJlKFwicmVzaXplXCIsdXBkYXRlKSxfZXZlbnRzMltcImRlZmF1bHRcIl0uc3Vic2NyaWJlKFwia2V5ZG93blwiLGhhbmRsZUVzY2FwZSksc2V0VGltZW91dChmdW5jdGlvbigpe2FjdGl2YXRlRGlzbWlzc1RhcCgpLHNob3coY3RybCxvcHRzKX0sMCkpLGNvbnRleHQub251bmxvYWQ9ZnVuY3Rpb24oKXtfZXZlbnRzMltcImRlZmF1bHRcIl0udW5zdWJzY3JpYmUoXCJyZXNpemVcIix1cGRhdGUpLF9ldmVudHMyW1wiZGVmYXVsdFwiXS51bnN1YnNjcmliZShcImtleWRvd25cIixoYW5kbGVFc2NhcGUpLG9wdHMucGVybWFuZW50fHxkZUFjdGl2YXRlRGlzbWlzc1RhcCgpfSxwb3NpdGlvbk1lbnUoY3RybCxvcHRzKX19fSxjb250ZW50PSh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5jb250ZW50LCBcImNvbmZpZ1wiOiBmdW5jdGlvbihlbCxpbml0ZWQpe2luaXRlZHx8KGN0cmwuY29udGVudEVsPWVsKX0sIFwib25jbGlja1wiOiBmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCl9IH0sIGNoaWxkcmVuOiBbIF9taXRocmlsMltcImRlZmF1bHRcIl0uY29tcG9uZW50KF9zaGFkb3cyW1wiZGVmYXVsdFwiXSx7ejpjdHJsLnosYW5pbWF0ZWQ6ITB9KSxvcHRzLmNvbnRlbnQ/b3B0cy5jb250ZW50Om51bGwgXSB9KTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsW29wdHMuYmVmb3JlLGNvbnRlbnQsb3B0cy5hZnRlcl0pfSxjb21wb25lbnQ9e2NvbnRyb2xsZXI6ZnVuY3Rpb24oKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdLHo9dm9pZCAwIT09b3B0cy56P29wdHMuejoxO3JldHVybnt6OnosZWw6bnVsbCxjb250ZW50RWw6bnVsbCxpc1RyYW5zaXRpb25pbmc6ITEsdmlzaWJsZTpvcHRzLnBlcm1hbmVudHx8ITF9fSx2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIG9wdHMuc2hvdyYmIWN0cmwudmlzaWJsZSYmKGN0cmwudmlzaWJsZT0hMCksY3RybC52aXNpYmxlP2NyZWF0ZVZpZXcoY3RybCxvcHRzKTooeyB0YWc6IFwic3BhblwiLCBhdHRyczogeyBcImNsYXNzXCI6IENTU19DTEFTU0VTLnBsYWNlaG9sZGVyIH0sIGNoaWxkcmVuOiBbXSB9KX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lbnUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl4aW49cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vbWl4aW5cIiksX21peGluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXhpbiksc3R5bGU9ZnVuY3Rpb24oY29uZmlnLHRpbnQpe3ZhciBzY29wZT1hcmd1bWVudHMubGVuZ3RoPD0yfHx2b2lkIDA9PT1hcmd1bWVudHNbMl0/XCJcIjphcmd1bWVudHNbMl07cmV0dXJuW19kZWZpbmVQcm9wZXJ0eSh7fSxzY29wZStcIi5wZS1tZW51XCIse1wiIC5wZS1tZW51X19jb250ZW50XCI6e1wiYmFja2dyb3VuZC1jb2xvclwiOmNvbmZpZ1tcImNvbG9yX1wiK3RpbnQrXCJfYmFja2dyb3VuZFwiXX19KV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiKSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcIiZcIildfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpO2V4cG9ydHNbXCJkZWZhdWx0XCJdPXtzaXplczpbMSwxLjUsMiwzLDQsNSw2LDddLG1pbl9zaXplOjEuNSxtYXhfc2l6ZV9zbWFsbF9zY3JlZW46NSxzaXplX2ZhY3RvcjpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X21lbnUsYm9yZGVyX3JhZGl1czpfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9ibG9ja19ib3JkZXJfcmFkaXVzLGNvbG9yX2xpZ2h0X2JhY2tncm91bmQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2xpZ2h0X2JhY2tncm91bmQpLGNvbG9yX2RhcmtfYmFja2dyb3VuZDpfY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfZGFya19iYWNrZ3JvdW5kKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7cmV0dXJuIGtleSBpbiBvYmo/T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6b2JqW2tleV09dmFsdWUsb2JqfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSx1bmlmeVNpemU9ZnVuY3Rpb24oY29uZmlnLHNpemUpe3JldHVybiBzaXplPGNvbmZpZy5taW5fc2l6ZT9jb25maWcubWluX3NpemU6c2l6ZX0sd2lkdGhDbGFzcz1mdW5jdGlvbihjb25maWcsc2l6ZSl7dmFyIHNpemVTdHI9c2l6ZS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsXCItXCIpO3JldHVyblwicGUtbWVudS0td2lkdGgtXCIrc2l6ZVN0cn0sd2lkdGhTdHlsZT1mdW5jdGlvbihjb25maWcsc2l6ZSl7dmFyIHM9dW5pZnlTaXplKGNvbmZpZyxzaXplKTtyZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LFwiJi5cIit3aWR0aENsYXNzKGNvbmZpZyxzKSx7d2lkdGg6Y29uZmlnLnNpemVfZmFjdG9yKnMrXCJweFwiLFwibWF4LXdpZHRoXCI6XCIxMDAlXCJ9KX0sY3JlYXRlU3R5bGVzPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuW3tcIi5wZS1tZW51XCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblwiOlwiZWFzZS1vdXRcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zaXRpb24pLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ0cmFuc2l0aW9uLXByb3BlcnR5XCI6XCJvcGFjaXR5XCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2l0aW9uKSxjb25maWcuc2l6ZXMubWFwKGZ1bmN0aW9uKHNpemUpe3JldHVybiB3aWR0aFN0eWxlKGNvbmZpZyxzaXplKX0pLF9kZWZpbmVQcm9wZXJ0eSh7XCJ6LWluZGV4XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnpfbWVudSxvcGFjaXR5OjAscG9zaXRpb246XCJhYnNvbHV0ZVwiLHdpZHRoOlwiMTAwJVwiLFwibWluLXdpZHRoXCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9tZW51KmNvbmZpZy5taW5fc2l6ZStcInB4XCIsXCImLnBlLW1lbnUtLXdpZHRoLWF1dG9cIjp7d2lkdGg6XCJhdXRvXCJ9LFwiJi5wZS1tZW51LS12aXNpYmxlXCI6e29wYWNpdHk6MX0sXCImLnBlLW1lbnUtLXBlcm1hbmVudFwiOntwb3NpdGlvbjpcInJlbGF0aXZlXCIsb3BhY2l0eToxfSxcIiAucGUtbWVudV9fY29udGVudFwiOnt3aWR0aDpcIjEwMCVcIixcImJvcmRlci1yYWRpdXNcIjpjb25maWcuYm9yZGVyX3JhZGl1cytcInB4XCJ9fSxcIkBtZWRpYSAobWF4LXdpZHRoOiBcIitfY29uZmlnMltcImRlZmF1bHRcIl0udW5pdF9zY3JlZW5fc2l6ZV9sYXJnZStcInB4KVwiLHtcIm1heC13aWR0aFwiOmNvbmZpZy5tYXhfc2l6ZV9zbWFsbF9zY3JlZW4qX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9tZW51K1wicHhcIn0pXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9tZW51L3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL21lbnUvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvbWVudS90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS5tZW51LGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtbWVudVwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgaXNUb3VjaD1cIm9udG91Y2hzdGFydFwiaW4gd2luZG93fHxuYXZpZ2F0b3IuTWF4VG91Y2hQb2ludHM+MHx8bmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHM+MDtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKS5jbGFzc0xpc3QuYWRkKGlzVG91Y2g/XCJwZS10b3VjaFwiOlwicGUtbm8tdG91Y2hcIiksZXhwb3J0c1tcImRlZmF1bHRcIl09e2lzVG91Y2g6aXNUb3VjaH0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2x5dGhlbmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21pdGhyaWw9cmVxdWlyZShcIm1pdGhyaWxcIiksX21pdGhyaWwyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21pdGhyaWwpLF9wb2x5dGhlbmU9cmVxdWlyZShcInBvbHl0aGVuZS9wb2x5dGhlbmUvcG9seXRoZW5lXCIpLF9wb2x5dGhlbmUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbHl0aGVuZSksX3RyYW5zaXRpb25FdmVudD1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi90cmFuc2l0aW9uLWV2ZW50XCIpLF90cmFuc2l0aW9uRXZlbnQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyYW5zaXRpb25FdmVudCk7cmVxdWlyZShcInBvbHl0aGVuZS9yaXBwbGUvdGhlbWUvdGhlbWVcIik7dmFyIHRyYW5zaXRpb25FdmVudD0oMCxfdHJhbnNpdGlvbkV2ZW50MltcImRlZmF1bHRcIl0pKCksREVGQVVMVF9TVEFSVF9PUEFDSVRZPS4yLE9QQUNJVFlfREVDQVlfVkVMT0NJVFk9LjM1LENTU19DTEFTU0VTPXtyaXBwbGU6XCJwZS1yaXBwbGVcIix3YXZlczpcInBlLXJpcHBsZV9fd2F2ZXNcIixtYXNrOlwicGUtcmlwcGxlX19tYXNrXCIsY29uc3RyYWluZWQ6XCJwZS1yaXBwbGUtLWNvbnN0cmFpbmVkXCIsYW5pbWF0ZWQ6XCJwZS1yaXBwbGVfX3dhdmVzLS1hbmltYXRlZFwifSxtYWtlUmlwcGxlPWZ1bmN0aW9uKGUsY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP3t9OmFyZ3VtZW50c1syXSxlbD1jdHJsLnJpcHBsZSgpLHdhdmVzRWw9Y3RybC53YXZlcygpLHc9ZWwub2Zmc2V0V2lkdGgsaD1lbC5vZmZzZXRIZWlnaHQsd2F2ZVJhZGl1cz1NYXRoLnNxcnQodyp3K2gqaCkscmVjdD1lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx4PV9wb2x5dGhlbmUyW1wiZGVmYXVsdFwiXS5pc1RvdWNoJiZlLnRvdWNoZXM/ZS50b3VjaGVzWzBdLnBhZ2VYOmUuY2xpZW50WCx5PV9wb2x5dGhlbmUyW1wiZGVmYXVsdFwiXS5pc1RvdWNoJiZlLnRvdWNoZXM/ZS50b3VjaGVzWzBdLnBhZ2VZOmUuY2xpZW50WSxteD1vcHRzLmNlbnRlcj9yZWN0LmxlZnQrcmVjdC53aWR0aC8yOngsbXk9b3B0cy5jZW50ZXI/cmVjdC50b3ArcmVjdC5oZWlnaHQvMjp5LHJ4PW14LXJlY3QubGVmdC13YXZlUmFkaXVzLzIscnk9bXktcmVjdC50b3Atd2F2ZVJhZGl1cy8yLGluaXRpYWxPcGFjaXR5PXZvaWQgMCE9PW9wdHMuaW5pdGlhbE9wYWNpdHk/b3B0cy5pbml0aWFsT3BhY2l0eTpERUZBVUxUX1NUQVJUX09QQUNJVFksb3BhY2l0eURlY2F5VmVsb2NpdHk9dm9pZCAwIT09b3B0cy5vcGFjaXR5RGVjYXlWZWxvY2l0eT9vcHRzLm9wYWNpdHlEZWNheVZlbG9jaXR5Ok9QQUNJVFlfREVDQVlfVkVMT0NJVFksZHVyYXRpb249MS9vcGFjaXR5RGVjYXlWZWxvY2l0eSppbml0aWFsT3BhY2l0eSxjb2xvcj13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkuY29sb3Isb25FbmQ9ZnVuY3Rpb24gb25FbmQoZXZ0KXt3YXZlc0VsLmNsYXNzTGlzdC5yZW1vdmUoQ1NTX0NMQVNTRVMuYW5pbWF0ZWQpLHdhdmVzRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRXZlbnQsb25FbmQsITEpLG9wdHMuZW5kJiZvcHRzLmVuZChldnQpfTt3YXZlc0VsLmNsYXNzTGlzdC5yZW1vdmUoQ1NTX0NMQVNTRVMuYW5pbWF0ZWQpO3ZhciBzdHlsZT13YXZlc0VsLnN0eWxlO3N0eWxlLndpZHRoPXN0eWxlLmhlaWdodD13YXZlUmFkaXVzK1wicHhcIixzdHlsZS50b3A9cnkrXCJweFwiLHN0eWxlLmxlZnQ9cngrXCJweFwiLHN0eWxlW1wiYW5pbWF0aW9uLWR1cmF0aW9uXCJdPXN0eWxlW1wiLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb25cIl09c3R5bGVbXCItbW96LWFuaW1hdGlvbi1kdXJhdGlvblwiXT1zdHlsZVtcIi1vLWFuaW1hdGlvbi1kdXJhdGlvblwiXT1kdXJhdGlvbitcInNcIixzdHlsZS5iYWNrZ3JvdW5kQ29sb3I9Y29sb3Isc3R5bGUub3BhY2l0eT1pbml0aWFsT3BhY2l0eSx3YXZlc0VsLmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LG9uRW5kLCExKSxvcHRzLnN0YXJ0JiZvcHRzLnN0YXJ0KGUpLHdhdmVzRWwuY2xhc3NMaXN0LmFkZChDU1NfQ0xBU1NFUy5hbmltYXRlZCl9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtpZihvcHRzLmRpc2FibGVkKXJldHVybih7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgIH0sIGNoaWxkcmVuOiBbXSB9KTt2YXIgaW5pdFJpcHBsZT1mdW5jdGlvbihyaXBwbGUsaW5pdGVkLGNvbnRleHQpe2lmKCFpbml0ZWQpe2N0cmwucmlwcGxlKHJpcHBsZSk7dmFyIHBhcmVudD1yaXBwbGUucGFyZW50RWxlbWVudCxvbkNsaWNrPWZ1bmN0aW9uKGUpe21ha2VSaXBwbGUoZSxjdHJsLG9wdHMpfSxlbmRUeXBlPV9wb2x5dGhlbmUyW1wiZGVmYXVsdFwiXS5pc1RvdWNoP1wiY2xpY2tcIjpcIm1vdXNldXBcIjtwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcihlbmRUeXBlLG9uQ2xpY2ssITEpLGNvbnRleHQub251bmxvYWQ9ZnVuY3Rpb24oKXtwYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbmRUeXBlLG9uQ2xpY2ssITEpfX19LGluaXRXYXZlcz1mdW5jdGlvbih3YXZlcyxpbml0ZWQpe2luaXRlZHx8Y3RybC53YXZlcyh3YXZlcyl9LHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz17XCJjbGFzc1wiOltDU1NfQ0xBU1NFUy5yaXBwbGUsb3B0cy5jb25zdHJhaW5lZCE9PSExP0NTU19DTEFTU0VTLmNvbnN0cmFpbmVkOm51bGwsb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzppbml0UmlwcGxlfSxjb250ZW50PSh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy5tYXNrIH0sIGNoaWxkcmVuOiBbICh7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBDU1NfQ0xBU1NFUy53YXZlcywgXCJjb25maWdcIjogaW5pdFdhdmVzIH0sIGNoaWxkcmVuOiBbXSB9KSBdIH0pO3JldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxjb250ZW50KX0sY29tcG9uZW50PXtjb250cm9sbGVyOmZ1bmN0aW9uKCl7cmV0dXJue3JpcHBsZTpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoKSx3YXZlczpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoKSxkZWxlZ2F0ZTpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoKX19LHZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmlwcGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHNbXCJkZWZhdWx0XCJdPXtzdGFydF9zY2FsZTouMSxlbmRfc2NhbGU6MixzdGFydF9vcGFjaXR5Oi4yLGVuZF9vcGFjaXR5OjB9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLGtmUmlwcGxlPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJue1wiIDEwMCVcIjp7dHJhbnNmb3JtOlwic2NhbGUoXCIrY29uZmlnLmVuZF9zY2FsZStcIilcIixvcGFjaXR5OmNvbmZpZy5lbmRfb3BhY2l0eX19fSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLXJpcHBsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7Y29sb3I6XCJpbmhlcml0XCIsXCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCIsXCImLnBlLXJpcHBsZS0tY29uc3RyYWluZWRcIjp7XCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCIsXCIgLnBlLXJpcHBsZV9fbWFza1wiOntvdmVyZmxvdzpcImhpZGRlblwiLFwiYm9yZGVyLXJhZGl1c1wiOlwiaW5oZXJpdFwifX0sXCIgLnBlLXJpcHBsZV9fbWFza1wiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSxfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zZm9ybTpcInRyYW5zbGF0ZTNkKDAsMCwwKVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNmb3JtKV0sXCIgLnBlLXJpcHBsZV9fd2F2ZXNcIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2Zvcm06XCJzY2FsZShcIitjb25maWcuc3RhcnRfc2NhbGUrXCIpXCJ9LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc190cmFuc2Zvcm0pLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7YW5pbWF0aW9uOlwicmlwcGxlIFwiK19jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fY3VydmVfZGVmYXVsdH0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX2FuaW1hdGlvbiksX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHtcImFuaW1hdGlvbi1kdXJhdGlvblwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fZHVyYXRpb259LF9jb25maWcyW1wiZGVmYXVsdFwiXS5wcmVmaXhlc19hbmltYXRpb24pLHtvdXRsaW5lOlwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIscG9zaXRpb246XCJhYnNvbHV0ZVwiLFwiYm9yZGVyLXJhZGl1c1wiOlwiNTAlXCIsb3BhY2l0eTpjb25maWcuc3RhcnRfb3BhY2l0eSxcInBvaW50ZXItZXZlbnRzXCI6XCJub25lXCIsZGlzcGxheTpcIm5vbmVcIn1dLFwiIC5wZS1yaXBwbGVfX3dhdmVzLS1hbmltYXRlZFwiOntkaXNwbGF5OlwiYmxvY2tcIn19XSxcIkBrZXlmcmFtZXMgcmlwcGxlXCI6a2ZSaXBwbGUoY29uZmlnKX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9yaXBwbGUvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvcmlwcGxlL3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLnJpcHBsZSxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLXJpcHBsZVwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCk7cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvdGhlbWUvdGhlbWVcIik7dmFyIENTU19DTEFTU0VTPXtibG9jazpcInBlLXNoYWRvd1wiLHRvcFNoYWRvdzpcInBlLXNoYWRvd19fdG9wXCIsYm90dG9tU2hhZG93OlwicGUtc2hhZG93X19ib3R0b21cIixhbmltYXRlZDpcInBlLXNoYWRvdy0tYW5pbWF0ZWRcIixkZXB0aF9uOlwicGUtc2hhZG93LS16LVwifSxjbGFzc0ZvckRlcHRoPWZ1bmN0aW9uKCl7dmFyIHo9YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdPzE6YXJndW1lbnRzWzBdO3JldHVybiBDU1NfQ0xBU1NFUy5kZXB0aF9uK01hdGgubWluKDUseil9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSxkZXB0aENsYXNzPWNsYXNzRm9yRGVwdGgob3B0cy56KSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssb3B0cy5hbmltYXRlZD9DU1NfQ0xBU1NFUy5hbmltYXRlZDpcIlwiLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LGNvbnRlbnQ9W29wdHMuY29udGVudD9vcHRzLmNvbnRlbnQ6bnVsbCwoeyB0YWc6IFwiZGl2XCIsIGF0dHJzOiB7IFwiY2xhc3NcIjogW0NTU19DTEFTU0VTLmJvdHRvbVNoYWRvdyxkZXB0aENsYXNzXS5qb2luKFwiIFwiKSB9LCBjaGlsZHJlbjogW10gfSksKHsgdGFnOiBcImRpdlwiLCBhdHRyczogeyBcImNsYXNzXCI6IFtDU1NfQ0xBU1NFUy50b3BTaGFkb3csZGVwdGhDbGFzc10uam9pbihcIiBcIikgfSwgY2hpbGRyZW46IFtdIH0pXTtyZXR1cm4oMCxfbWl0aHJpbDJbXCJkZWZhdWx0XCJdKSh0YWcscHJvcHMsY29udGVudCl9LGNvbXBvbmVudD17dmlldzpmdW5jdGlvbihjdHJsKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0xfHx2b2lkIDA9PT1hcmd1bWVudHNbMV0/e306YXJndW1lbnRzWzFdO3JldHVybiBjcmVhdGVWaWV3KGN0cmwsb3B0cyl9fTtleHBvcnRzW1wiZGVmYXVsdFwiXT1jb21wb25lbnQsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFkb3cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0c1tcImRlZmF1bHRcIl09e3RyYW5zaXRpb246XCJib3gtc2hhZG93IDAuMThzIGVhc2Utb3V0XCIsXCJzaGFkb3ctdG9wLXotMVwiOlwibm9uZVwiLFwic2hhZG93LWJvdHRvbS16LTFcIjpcIjAgMXB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4zNylcIixcInNoYWRvdy10b3Atei0yXCI6XCIwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuMilcIixcInNoYWRvdy1ib3R0b20tei0yXCI6XCIwIDZweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpXCIsXCJzaGFkb3ctdG9wLXotM1wiOlwiMCAxMXB4IDdweCAwIHJnYmEoMCwgMCwgMCwgMC4xOSlcIixcInNoYWRvdy1ib3R0b20tei0zXCI6XCIwIDEzcHggMjVweCAwIHJnYmEoMCwgMCwgMCwgMC4zKVwiLFwic2hhZG93LXRvcC16LTRcIjpcIjAgMTRweCAxMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE3KVwiLFwic2hhZG93LWJvdHRvbS16LTRcIjpcIjAgMjBweCA0MHB4IDAgcmdiYSgwLCAwLCAwLCAwLjMpXCIsXCJzaGFkb3ctdG9wLXotNVwiOlwiMCAxN3B4IDE3cHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpXCIsXCJzaGFkb3ctYm90dG9tLXotNVwiOlwiMCAyN3B4IDU1cHggMCByZ2JhKDAsIDAsIDAsIDAuMylcIixcInNoYWRvdy1kb3duLXotMVwiOlwiaW5zZXQgMHB4IDFweCAycHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMTUpXCIsXCJzaGFkb3ctZG93bi16LTJcIjpcImluc2V0IDBweCA0cHggNnB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjI1KVwifSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHZhbHVlKXtyZXR1cm4ga2V5IGluIG9iaj9PYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLGtleSx7dmFsdWU6dmFsdWUsZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTpvYmpba2V5XT12YWx1ZSxvYmp9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHNoYWRvd0RpcmVjdGl2ZT1mdW5jdGlvbihkaXIpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe1wiYm94LXNoYWRvd1wiOmRpcn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX2JveF9zaGFkb3cpfSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLXNoYWRvd1wiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5maXQoKSx7XCJib3JkZXItcmFkaXVzXCI6XCJpbmhlcml0XCIsXCJwb2ludGVyLWV2ZW50c1wiOlwibm9uZVwiLFwiIC5wZS1zaGFkb3dfX2JvdHRvbSwgLnBlLXNoYWRvd19fdG9wXCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHtcImJvcmRlci1yYWRpdXNcIjpcImluaGVyaXRcIn1dLFwiJi5wZS1zaGFkb3ctLWFuaW1hdGVkXCI6e1wiIC5wZS1zaGFkb3dfX2JvdHRvbSwgLnBlLXNoYWRvd19fdG9wXCI6X21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2l0aW9uOmNvbmZpZy50cmFuc2l0aW9ufSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNpdGlvbil9fSxbMSwyLDMsNCw1XS5tYXAoZnVuY3Rpb24oaW5kZXgpe3ZhciBfcmVmO3JldHVybiBfcmVmPXt9LF9kZWZpbmVQcm9wZXJ0eShfcmVmLFwiIC5wZS1zaGFkb3dfX3RvcC5wZS1zaGFkb3ctLXotXCIraW5kZXgsc2hhZG93RGlyZWN0aXZlKGNvbmZpZ1tcInNoYWRvdy10b3Atei1cIitpbmRleF0pKSxfZGVmaW5lUHJvcGVydHkoX3JlZixcIiAucGUtc2hhZG93X19ib3R0b20ucGUtc2hhZG93LS16LVwiK2luZGV4LHNoYWRvd0RpcmVjdGl2ZShjb25maWdbXCJzaGFkb3ctYm90dG9tLXotXCIraW5kZXhdKSksX3JlZn0pXX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9zaGFkb3cvdGhlbWUvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksX2N1c3RvbT1yZXF1aXJlKFwicG9seXRoZW5lL2NvbmZpZy9jdXN0b21cIiksX2N1c3RvbTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3VzdG9tKSxfbGF5b3V0PXJlcXVpcmUoXCJwb2x5dGhlbmUvc2hhZG93L3RoZW1lL2xheW91dFwiKSxfbGF5b3V0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sYXlvdXQpLF9zdHlsZXI9cmVxdWlyZShcInBvbHl0aGVuZS9jb21tb24vc3R5bGVyXCIpLF9zdHlsZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0eWxlciksY3VzdG9tQ29uZmlnRm49X2N1c3RvbTJbXCJkZWZhdWx0XCJdLnNoYWRvdyxjb25maWc9Y3VzdG9tQ29uZmlnRm4/Y3VzdG9tQ29uZmlnRm4oX2NvbmZpZzJbXCJkZWZhdWx0XCJdKTpfY29uZmlnMltcImRlZmF1bHRcIl07X3N0eWxlcjJbXCJkZWZhdWx0XCJdLmFkZChcInBlLXNoYWRvd1wiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL29iamVjdC5hc3NpZ25cIik7dmFyIF9taXRocmlsPXJlcXVpcmUoXCJtaXRocmlsXCIpLF9taXRocmlsMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taXRocmlsKTtyZXF1aXJlKFwicG9seXRoZW5lL3N2Zy90aGVtZS90aGVtZVwiKTt2YXIgQ1NTX0NMQVNTRVM9e2Jsb2NrOlwicGUtc3ZnXCJ9LGdsb2JhbENhY2hlPXt9LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSxjb250ZW50PXZvaWQgMCxzdmc9dm9pZCAwLHRhZz1vcHRzLnRhZ3x8XCJkaXZcIixwcm9wcz1PYmplY3QuYXNzaWduKHt9LHtcImNsYXNzXCI6W0NTU19DTEFTU0VTLmJsb2NrLG9wdHNbXCJjbGFzc1wiXV0uam9pbihcIiBcIiksaWQ6b3B0cy5pZHx8XCJcIixjb25maWc6b3B0cy5jb25maWd9LG9wdHMuZXZlbnRzP29wdHMuZXZlbnRzOm51bGwpO2lmKG9wdHMuY29udGVudCljb250ZW50PW9wdHMuY29udGVudDtlbHNle3ZhciBwYXRoPW9wdHMuc3JjO2N0cmwucGF0aCgpIT09cGF0aD8oc3ZnPWdsb2JhbENhY2hlW3BhdGhdLHN2Zz8oY29udGVudD1fbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnRydXN0KHN2ZykscHJlbG9hZE5leHQoY3RybCxvcHRzKSk6KGN0cmwucGF0aChwYXRoKSxsb2FkU3ZnKHBhdGgsY3RybCxvcHRzKS50aGVuKF9taXRocmlsMltcImRlZmF1bHRcIl0ucmVkcmF3KSkpOihzdmc9Y3RybC5zdmcoKSxzdmc9c3ZnfHxcIlwiLGNvbnRlbnQ9X21pdGhyaWwyW1wiZGVmYXVsdFwiXS50cnVzdChzdmcpLHByZWxvYWROZXh0KGN0cmwsb3B0cykpfXJldHVybigwLF9taXRocmlsMltcImRlZmF1bHRcIl0pKHRhZyxwcm9wcyxbb3B0cy5iZWZvcmUsY29udGVudCxvcHRzLmFmdGVyXSl9LGxvYWRTdmc9ZnVuY3Rpb24ocGF0aCxjdHJsLG9wdHMpe3ZhciBwcmVsb2FkaW5nPWFyZ3VtZW50cy5sZW5ndGg8PTN8fHZvaWQgMD09PWFyZ3VtZW50c1szXT8hMTphcmd1bWVudHNbM107aWYoU3lzdGVtJiZTeXN0ZW1bXCJpbXBvcnRcIl0pe3ZhciBub3JtYWxpemVkTmFtZT1TeXN0ZW0ubm9ybWFsaXplU3luYyhwYXRoKTtyZXR1cm4gU3lzdGVtW1wiaW1wb3J0XCJdKG5vcm1hbGl6ZWROYW1lKS50aGVuKGZ1bmN0aW9uKGRhdGEpe3ByZWxvYWRpbmc/KGdsb2JhbENhY2hlW3BhdGhdPWRhdGEsY3RybC5wcmVsb2FkaW5nSW5kZXgrKyxwcmVsb2FkTmV4dChjdHJsLG9wdHMpKTpjdHJsLnN2ZyhkYXRhKX0pfWNvbnNvbGUmJmNvbnNvbGUubG9nKFwicG9seXRoZW5lL3N2ZzogU3lzdGVtIG5vdCBmb3VuZC5cIil9LHByZWxvYWROZXh0PWZ1bmN0aW9uIHByZWxvYWROZXh0KGN0cmwsb3B0cyl7aWYoY3RybC5wcmVsb2FkaW5nSXRlbXMmJiEoY3RybC5wcmVsb2FkaW5nSW5kZXg+PWN0cmwucHJlbG9hZGluZ0l0ZW1zLmxlbmd0aCkpe3ZhciBuZXh0PWN0cmwucHJlbG9hZGluZ0l0ZW1zW2N0cmwucHJlbG9hZGluZ0luZGV4XTtnbG9iYWxDYWNoZVtuZXh0XT8oY3RybC5wcmVsb2FkaW5nSW5kZXgrKyxwcmVsb2FkTmV4dChjdHJsLG9wdHMpKTpsb2FkU3ZnKG5leHQsY3RybCxvcHRzLCEwKX19LGNvbXBvbmVudD17Y29udHJvbGxlcjpmdW5jdGlvbigpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF07cmV0dXJue3BhdGg6X21pdGhyaWwyW1wiZGVmYXVsdFwiXS5wcm9wKFwiXCIpLHN2ZzpfbWl0aHJpbDJbXCJkZWZhdWx0XCJdLnByb3AoXCJcIikscHJlbG9hZGluZ0l0ZW1zOm9wdHMucHJlbG9hZCxwcmVsb2FkaW5nSW5kZXg6MH19LHZpZXc6ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXTtyZXR1cm4gY3JlYXRlVmlldyhjdHJsLG9wdHMpfX07ZXhwb3J0c1tcImRlZmF1bHRcIl09Y29tcG9uZW50LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3ZnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7XCJkZWZhdWx0XCI6b2JqfX12YXIgX3N0eWxlcj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9zdHlsZXJcIiksX3N0eWxlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3R5bGVyKTtyZXF1aXJlKFwicG9seXRoZW5lL2ZvbnQtcm9ib3RvL3RoZW1lXCIpO3ZhciBfdHlwb2dyYXBoeT1yZXF1aXJlKFwicG9seXRoZW5lL3RoZW1lL3R5cG9ncmFwaHlcIiksX3R5cG9ncmFwaHkyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cG9ncmFwaHkpLHJvYm90bz1be1wiaHRtbCwgYm9keSwgaW5wdXQsIHRleHRhcmVhXCI6e1wiZm9udC1mYW1pbHlcIjpcIlJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwifX1dLGdlbmVyYWw9W3tcIipcIjpbe1wiYm94LXNpemluZ1wiOlwiYm9yZGVyLWJveFwifSx7XCItd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3JcIjpcInJnYmEoMCwwLDAsMClcIn0se1wiLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yXCI6XCJ0cmFuc3BhcmVudFwifV0sXCIgYSwgYTphY3RpdmUsIGE6Zm9jdXMsIGlucHV0OmFjdGl2ZSwgaW5wdXRbdHlwZV06Zm9jdXNcIjp7b3V0bGluZTowfSxcImlucHV0OmRpc2FibGVkXCI6e29wYWNpdHk6MX19XTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtdGhlbWVcIixyb2JvdG8sX3R5cG9ncmFwaHkyW1wiZGVmYXVsdFwiXSxnZW5lcmFsKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY29uZmlnXCIpLF9jb25maWcyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmZpZyksZm9udFNpemU9MTQsc3R5bGVzPVt7XCIgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcFwiOnttYXJnaW46MCxwYWRkaW5nOjB9fSx7XCIgaDEgc21hbGwsIGgyIHNtYWxsLCBoMyBzbWFsbCwgaDQgc21hbGwsIGg1IHNtYWxsLCBoNiBzbWFsbFwiOntcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmxpbmVfaGVpZ2h0LFwibGV0dGVyLXNwYWNpbmdcIjpcIi0wLjAyZW1cIixcImZvbnQtc2l6ZVwiOlwiMC42ZW1cIn19LHtcIiBoMVwiOntcImZvbnQtc2l6ZVwiOlwiNTZweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0ubGluZV9oZWlnaHQsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIyNHB4XCJ9fSx7XCIgaDJcIjp7XCJmb250LXNpemVcIjpcIjQ1cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCI0OHB4XCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIyNHB4XCJ9fSx7XCIgaDNcIjp7XCJmb250LXNpemVcIjpcIjM0cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCI0MHB4XCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIyNHB4XCJ9fSx7XCIgaDRcIjp7XCJmb250LXNpemVcIjpcIjI0cHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X25vcm1hbCxcImxpbmUtaGVpZ2h0XCI6XCIzMnB4XCIsXCItbW96LW9zeC1mb250LXNtb290aGluZ1wiOlwiZ3JheXNjYWxlXCIsXCJtYXJnaW4tdG9wXCI6XCIyNHB4XCIsXCJtYXJnaW4tYm90dG9tXCI6XCIxNnB4XCJ9fSx7XCIgaDVcIjp7XCJmb250LXNpemVcIjpcIjIwcHhcIixcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X21lZGl1bSxcImxpbmUtaGVpZ2h0XCI6XCIxXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiLTAuMDJlbVwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMTZweFwifX0se1wiIGg2XCI6e1wiZm9udC1zaXplXCI6XCIxNnB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjAuMDRlbVwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMTZweFwifX0se1wiIGh0bWwsIGJvZHlcIjp7XCJmb250LXNpemVcIjpmb250U2l6ZStcInB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsfSxcIiBwXCI6e1wiZm9udC1zaXplXCI6Zm9udFNpemUrXCJweFwiLFwiZm9udC13ZWlnaHRcIjpfY29uZmlnMltcImRlZmF1bHRcIl0uZm9udF93ZWlnaHRfbm9ybWFsLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIwXCIsXCJtYXJnaW4tYm90dG9tXCI6XCIxNnB4XCJ9LFwiIGJsb2NrcXVvdGVcIjp7cG9zaXRpb246XCJyZWxhdGl2ZVwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJmb250LXN0eWxlXCI6XCJpdGFsaWNcIixcImxpbmUtaGVpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmxpbmVfaGVpZ2h0LFwibGV0dGVyLXNwYWNpbmdcIjpcIjAuMDhlbVwiLFwibWFyZ2luLXRvcFwiOlwiMjRweFwiLFwibWFyZ2luLWJvdHRvbVwiOlwiMTZweFwifSxcIiB1bCwgb2xcIjp7XCJmb250LXNpemVcIjpmb250U2l6ZStcInB4XCIsXCJmb250LXdlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3dlaWdodF9ub3JtYWwsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjowfSxcImIsIHN0cm9uZ1wiOntcImZvbnQtd2VpZ2h0XCI6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmZvbnRfd2VpZ2h0X21lZGl1bX19XTtleHBvcnRzW1wiZGVmYXVsdFwiXT1zdHlsZXMsbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBvZ3JhcGh5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe3JldHVybiBrZXkgaW4gb2JqP09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOm9ialtrZXldPXZhbHVlLG9ian1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgX21peGluPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL21peGluXCIpLF9taXhpbjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl4aW4pLHN0eWxlPWZ1bmN0aW9uKGNvbmZpZyx0aW50KXt2YXIgc2NvcGU9YXJndW1lbnRzLmxlbmd0aDw9Mnx8dm9pZCAwPT09YXJndW1lbnRzWzJdP1wiXCI6YXJndW1lbnRzWzJdO3JldHVybltfZGVmaW5lUHJvcGVydHkoe30sc2NvcGUrXCIucGUtdG9vbGJhclwiLHtjb2xvcjpjb25maWdbXCJjb2xvcl9cIit0aW50K1wiX3RleHRcIl19KV19LGNyZWF0ZVN0eWxlcz1mdW5jdGlvbihjb25maWcpe3JldHVybltzdHlsZShjb25maWcsXCJsaWdodFwiKSx7XCIucGUtZGFyay10aGVtZVwiOltzdHlsZShjb25maWcsXCJkYXJrXCIsXCIgXCIpLHN0eWxlKGNvbmZpZyxcImRhcmtcIixcIiZcIildfV19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKGNvbmZpZyl7cmV0dXJuIF9taXhpbjJbXCJkZWZhdWx0XCJdLmNyZWF0ZVN0eWxlcyhjb25maWcsY3JlYXRlU3R5bGVzKX0sbW9kdWxlLmV4cG9ydHM9ZXhwb3J0c1tcImRlZmF1bHRcIl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2xvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLG1hcmdpbl9zaWRlPTIqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQtMTIsaGVpZ2h0X2Rlc2t0b3A9OCpfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudCxoZWlnaHRfbW9iaWxlX3BvcnRyYWl0PTcqX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmdyaWRfdW5pdF9jb21wb25lbnQsaGVpZ2h0X21vYmlsZV9sYW5kc2NhcGU9NipfY29uZmlnMltcImRlZmF1bHRcIl0uZ3JpZF91bml0X2NvbXBvbmVudDtleHBvcnRzW1wiZGVmYXVsdFwiXT17bWFyZ2luX3NpZGU6bWFyZ2luX3NpZGUsaW5kZW50Ol9jb25maWcyW1wiZGVmYXVsdFwiXS51bml0X2luZGVudCx0cmFuc2l0aW9uX2R1cmF0aW9uOl9jb25maWcyW1wiZGVmYXVsdFwiXS5hbmltYXRpb25fZHVyYXRpb24sZm9udF9zaXplOl9jb25maWcyW1wiZGVmYXVsdFwiXS5mb250X3NpemVfdGl0bGUsbGluZV9oZWlnaHQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLmxpbmVfaGVpZ2h0LGhlaWdodF9kZXNrdG9wOmhlaWdodF9kZXNrdG9wLGhlaWdodF9tb2JpbGVfcG9ydHJhaXQ6aGVpZ2h0X21vYmlsZV9wb3J0cmFpdCxoZWlnaHRfbW9iaWxlX2xhbmRzY2FwZTpoZWlnaHRfbW9iaWxlX2xhbmRzY2FwZSxoZWlnaHRfbm9ybWFsOmhlaWdodF9kZXNrdG9wLGhlaWdodF9tZWRpdW1fdGFsbDoyKmhlaWdodF9kZXNrdG9wLGhlaWdodF90YWxsOjMqaGVpZ2h0X2Rlc2t0b3AsaGVpZ2h0X25hcnJvdzpoZWlnaHRfbW9iaWxlX3BvcnRyYWl0LGhlaWdodF9uYXJyb3dfbWVkaXVtX3RhbGw6MTEyLGhlaWdodF9uYXJyb3dfdGFsbDoxNjgsY29sb3JfbGlnaHRfdGV4dDpfY29uZmlnMltcImRlZmF1bHRcIl0ucmdiYShfY29uZmlnMltcImRlZmF1bHRcIl0uY29sb3JfbGlnaHRfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfbGlnaHRfdGV4dF9wcmltYXJ5KSxjb2xvcl9kYXJrX3RleHQ6X2NvbmZpZzJbXCJkZWZhdWx0XCJdLnJnYmEoX2NvbmZpZzJbXCJkZWZhdWx0XCJdLmNvbG9yX2RhcmtfZm9yZWdyb3VuZCxfY29uZmlnMltcImRlZmF1bHRcIl0uYmxlbmRfZGFya190ZXh0X3ByaW1hcnkpfSxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfY29uZmlnPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29uZmlnL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9taXhpbj1yZXF1aXJlKFwicG9seXRoZW5lL2NvbW1vbi9taXhpblwiKSxfbWl4aW4yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21peGluKSxfZmxleD1yZXF1aXJlKFwicG9seXRoZW5lL2xheW91dC90aGVtZS9mbGV4XCIpLF9mbGV4Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mbGV4KSxjcmVhdGVTdHlsZXM9ZnVuY3Rpb24oY29uZmlnKXtyZXR1cm5be1wiLnBlLXRvb2xiYXJcIjpbX21peGluMltcImRlZmF1bHRcIl0udmVuZG9yaXplKHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGUzZCgwLDAsMClcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zZm9ybSkse2Rpc3BsYXk6XCJibG9ja1wiLHBvc2l0aW9uOlwicmVsYXRpdmVcIixoZWlnaHQ6Y29uZmlnLmhlaWdodF9ub3JtYWwrXCJweFwiLFwiZm9udC1zaXplXCI6Y29uZmlnLmZvbnRfc2l6ZStcInB4XCIsXCJsaW5lLWhlaWdodFwiOmNvbmZpZy5saW5lX2hlaWdodCtcImVtXCIsXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjQ0ZEOERDXCIsXCImLnBlLWhlYWRlci0tYW5pbWF0ZWRcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5kZWZhdWx0VHJhbnNpdGlvbihcImhlaWdodFwiLGNvbmZpZy50cmFuc2l0aW9uX2R1cmF0aW9uLFwiZWFzZS1pblwiKSxcIiYucGUtaGVhZGVyLS1tZWRpdW0tdGFsbFwiOntoZWlnaHQ6Y29uZmlnLmhlaWdodF9tZWRpdW1fdGFsbCtcInB4XCJ9LFwiJi5wZS1oZWFkZXItLXRhbGxcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfdGFsbCtcInB4XCJ9LFwiJi5wZS10b29sYmFyLS1uYXJyb3dcIjp7aGVpZ2h0OmNvbmZpZy5oZWlnaHRfbmFycm93K1wicHhcIixcIiAucGUtdG9vbGJhcl9fYmFyXCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X25hcnJvdytcInB4XCIscGFkZGluZzowfX0sXCImLnBlLXRvb2xiYXItLW5hcnJvdy5wZS1oZWFkZXItLW1lZGl1bS10YWxsXCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X25hcnJvd19tZWRpdW1fdGFsbCtcInB4XCJ9LFwiJi5wZS10b29sYmFyLS1uYXJyb3cucGUtaGVhZGVyLS10YWxsXCI6e2hlaWdodDpjb25maWcuaGVpZ2h0X25hcnJvd190YWxsK1wicHhcIn0sXCImLnBlLWhlYWRlci0tdGFsbCAucGUtdG9vbGJhcl9fYmFyLS1taWRkbGVcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS52ZW5kb3JpemUoe3RyYW5zZm9ybTpcInRyYW5zbGF0ZVkoMTAwJSlcIn0sX2NvbmZpZzJbXCJkZWZhdWx0XCJdLnByZWZpeGVzX3RyYW5zZm9ybSksXCIgLnBlLXRvb2xiYXJfX2JhclwiOltfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dENlbnRlcixfZmxleDJbXCJkZWZhdWx0XCJdLmxheW91dEhvcml6b250YWwse1wiPiAqOm5vdCguZGlzYWJsZWQpXCI6e1wicG9pbnRlci1ldmVudHNcIjpcImF1dG9cIn19LHtcIj4gOmZpcnN0LWNoaWxkXCI6e1wibWFyZ2luLWxlZnRcIjpjb25maWcubWFyZ2luX3NpZGUrXCJweFwifX0se1wiPiA6bGFzdC1jaGlsZFwiOntcIm1hcmdpbi1yaWdodFwiOmNvbmZpZy5tYXJnaW5fc2lkZStcInB4XCJ9fSx7XCIgLnBlLWJ1dHRvbi0taWNvbiArIHNwYW4sIC5wZS1idXR0b24tLWljb24gKyAucGUtdGl0bGVcIjp7XCJtYXJnaW4tbGVmdFwiOmNvbmZpZy5pbmRlbnQtY29uZmlnLm1hcmdpbl9zaWRlLV9jb25maWcyW1wiZGVmYXVsdFwiXS5ncmlkX3VuaXRfaWNvbl9idXR0b24rXCJweFwifX0se1wiPiBzcGFuOmZpcnN0LWNoaWxkLCAucGUtdG9vbGJhcl9fdGl0bGUtLWluZGVudFwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygpLHtcIm1hcmdpbi1sZWZ0XCI6Y29uZmlnLmluZGVudCtcInB4XCJ9XX0se1wiPiBzcGFuLCA+IC5wZS10aXRsZVwiOltfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygpLF9taXhpbjJbXCJkZWZhdWx0XCJdLnZlbmRvcml6ZSh7XCJ0cmFuc2Zvcm0tb3JpZ2luXCI6XCJsZWZ0IDUwJVwifSxfY29uZmlnMltcImRlZmF1bHRcIl0ucHJlZml4ZXNfdHJhbnNmb3JtKSx7ZGlzcGxheTpcImJsb2NrXCIsXCJsaW5lLWhlaWdodFwiOl9jb25maWcyW1wiZGVmYXVsdFwiXS5saW5lX2hlaWdodCtcImVtXCJ9XX0se3dpZHRoOlwiMTAwJVwiLHBvc2l0aW9uOlwicmVsYXRpdmVcIixoZWlnaHQ6Y29uZmlnLmhlaWdodF9ub3JtYWwrXCJweFwiLFwicG9pbnRlci1ldmVudHNcIjpcIm5vbmVcIixcIiAucGUtZml0XCI6W19taXhpbjJbXCJkZWZhdWx0XCJdLmZpdCgpLHt3aWR0aDpcImF1dG9cIixtYXJnaW46MCxcIi5ib3R0b21cIjp7dG9wOlwiYXV0b1wifX1dLFwiIC5wZS1oZWFkZXJcIjpfbWl4aW4yW1wiZGVmYXVsdFwiXS5lbGxpcHNpcygpLFwiJi5wZS10b29sYmFyX19iYXItLW1pZGRsZVwiOntwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOjAscmlnaHQ6MCxsZWZ0OjB9LFwiJi5wZS10b29sYmFyX19iYXItLWJvdHRvbVwiOntwb3NpdGlvbjpcImFic29sdXRlXCIscmlnaHQ6MCxib3R0b206MCxsZWZ0OjB9fV19XX1dfTtleHBvcnRzW1wiZGVmYXVsdFwiXT1mdW5jdGlvbihjb25maWcpe3JldHVybiBfbWl4aW4yW1wiZGVmYXVsdFwiXS5jcmVhdGVTdHlsZXMoY29uZmlnLGNyZWF0ZVN0eWxlcyl9LG1vZHVsZS5leHBvcnRzPWV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e1wiZGVmYXVsdFwiOm9ian19dmFyIF9jb25maWc9cmVxdWlyZShcInBvbHl0aGVuZS90b29sYmFyL3RoZW1lL2NvbmZpZ1wiKSxfY29uZmlnMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25maWcpLF9jdXN0b209cmVxdWlyZShcInBvbHl0aGVuZS9jb25maWcvY3VzdG9tXCIpLF9jdXN0b20yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2N1c3RvbSksX2xheW91dD1yZXF1aXJlKFwicG9seXRoZW5lL3Rvb2xiYXIvdGhlbWUvbGF5b3V0XCIpLF9sYXlvdXQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xheW91dCksX2NvbG9yPXJlcXVpcmUoXCJwb2x5dGhlbmUvdG9vbGJhci90aGVtZS9jb2xvclwiKSxfY29sb3IyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKSxfc3R5bGVyPXJlcXVpcmUoXCJwb2x5dGhlbmUvY29tbW9uL3N0eWxlclwiKSxfc3R5bGVyMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHlsZXIpLGN1c3RvbUNvbmZpZ0ZuPV9jdXN0b20yW1wiZGVmYXVsdFwiXS50b29sYmFyLGNvbmZpZz1jdXN0b21Db25maWdGbj9jdXN0b21Db25maWdGbihfY29uZmlnMltcImRlZmF1bHRcIl0pOl9jb25maWcyW1wiZGVmYXVsdFwiXTtfc3R5bGVyMltcImRlZmF1bHRcIl0uYWRkKFwicGUtdG9vbGJhclwiLCgwLF9sYXlvdXQyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSwoMCxfY29sb3IyW1wiZGVmYXVsdFwiXSkoY29uZmlnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aGVtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntcImRlZmF1bHRcIjpvYmp9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBfbWl0aHJpbD1yZXF1aXJlKFwibWl0aHJpbFwiKSxfbWl0aHJpbDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWl0aHJpbCk7cmVxdWlyZShcInBvbHl0aGVuZS90b29sYmFyL3RoZW1lL3RoZW1lXCIpO3ZhciBDU1NfQ0xBU1NFUz17YmxvY2s6XCJwZS10b29sYmFyXCIsYmFyOlwicGUtdG9vbGJhcl9fYmFyXCIsdG9wQmFyOlwicGUtdG9vbGJhcl9fYmFyLS10b3BcIixtaWRkbGVCYXI6XCJwZS10b29sYmFyX19iYXItLW1pZGRsZVwiLGJvdHRvbUJhcjpcInBlLXRvb2xiYXJfX2Jhci0tYm90dG9tXCIsYW5pbWF0ZWQ6XCJwZS1oZWFkZXItLWFuaW1hdGVkXCIsbWVkaXVtVGFsbDpcInBlLWhlYWRlci0tbWVkaXVtLXRhbGxcIix0YWxsOlwicGUtaGVhZGVyLS10YWxsXCJ9LGJhcldyYXBwZXI9ZnVuY3Rpb24oY2xhc3NOYW1lLGNvbnRlbnQpe3JldHVybih7IHRhZzogXCJkaXZcIiwgYXR0cnM6IHsgXCJjbGFzc1wiOiBbQ1NTX0NMQVNTRVMuYmFyLGNsYXNzTmFtZV0uam9pbihcIiBcIikgfSwgY2hpbGRyZW46IFsgY29udGVudCBdIH0pfSxiYXI9ZnVuY3Rpb24oKXt2YXIgb3B0cz1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/e306YXJndW1lbnRzWzBdLGJhcnM9W107cmV0dXJuIG9wdHMuY29udGVudD9iYXJzLnB1c2goYmFyV3JhcHBlcihDU1NfQ0xBU1NFUy50b3BCYXIsb3B0cy5jb250ZW50KSk6KG9wdHMudG9wQmFyJiZiYXJzLnB1c2goYmFyV3JhcHBlcihDU1NfQ0xBU1NFUy50b3BCYXIsb3B0cy50b3BCYXIpKSxvcHRzLm1pZGRsZUJhciYmYmFycy5wdXNoKGJhcldyYXBwZXIoQ1NTX0NMQVNTRVMubWlkZGxlQmFyLG9wdHMubWlkZGxlQmFyKSksb3B0cy5ib3R0b21CYXImJmJhcnMucHVzaChiYXJXcmFwcGVyKENTU19DTEFTU0VTLmJvdHRvbUJhcixvcHRzLmJvdHRvbUJhcikpKSxiYXJzfSxtb2RlQ2xhc3Nlcz17XCJtZWRpdW0tdGFsbFwiOkNTU19DTEFTU0VTLm1lZGl1bVRhbGwsdGFsbDpDU1NfQ0xBU1NFUy50YWxsfSxjbGFzc0Zvck1vZGU9ZnVuY3Rpb24oKXt2YXIgbW9kZT1hcmd1bWVudHMubGVuZ3RoPD0wfHx2b2lkIDA9PT1hcmd1bWVudHNbMF0/XCJzdGFuZGFyZFwiOmFyZ3VtZW50c1swXTtyZXR1cm5cInN0YW5kYXJkXCI9PT1tb2RlP1wiXCI6bW9kZUNsYXNzZXNbbW9kZV19LGNyZWF0ZVZpZXc9ZnVuY3Rpb24oY3RybCl7dmFyIG9wdHM9YXJndW1lbnRzLmxlbmd0aDw9MXx8dm9pZCAwPT09YXJndW1lbnRzWzFdP3t9OmFyZ3VtZW50c1sxXSx0YWc9b3B0cy50YWd8fFwiZGl2XCIscHJvcHM9e1wiY2xhc3NcIjpbQ1NTX0NMQVNTRVMuYmxvY2ssQ1NTX0NMQVNTRVMuYW5pbWF0ZWQsY2xhc3NGb3JNb2RlKG9wdHMubW9kZSksb3B0c1tcImNsYXNzXCJdXS5qb2luKFwiIFwiKSxpZDpvcHRzLmlkfHxcIlwiLGNvbmZpZzpvcHRzLmNvbmZpZ30sY29udGVudD1iYXIob3B0cyk7cmV0dXJuKDAsX21pdGhyaWwyW1wiZGVmYXVsdFwiXSkodGFnLHByb3BzLFtvcHRzLmJlZm9yZSxjb250ZW50LG9wdHMuYWZ0ZXJdKX0sY29tcG9uZW50PXt2aWV3OmZ1bmN0aW9uKGN0cmwpe3ZhciBvcHRzPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT97fTphcmd1bWVudHNbMV07cmV0dXJuIGNyZWF0ZVZpZXcoY3RybCxvcHRzKX19O2V4cG9ydHNbXCJkZWZhdWx0XCJdPWNvbXBvbmVudCxtb2R1bGUuZXhwb3J0cz1leHBvcnRzW1wiZGVmYXVsdFwiXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2xiYXIuanMubWFwIl19
