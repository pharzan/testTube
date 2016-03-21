var Datastore = require('nedb'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    db = {};
var Global = {
    steps: ''
};
var r = require('request');

db.steps = new Datastore('data/steps.db');
db.sets = new Datastore('data/sets.db');
db.steps.loadDatabase();
db.sets.loadDatabase();

function load(dbName, query) {
    // query={name:'checkTestTubes.json' };
    var d = db[dbName];
    return new Promise(function(resolve) {


        d.find(query, function(err, steps) {
            if (steps.length == 0)
                return resolve('empty');

            //console.log('DATA SERVICES:: LOADED ',steps.map(function(st){return st.name}));
            return resolve(steps);

        });
    });
}

function save(dbName, data) {

    var d = db[dbName];
    //var doc = // { name: 'leftCycle.json'
    //             , n: 0
    //             , content: [
    //     {
    // 	"description":"one complete cycle, subtitles disabled, right choice clicked"
    //     },


    //     {"action":"waitForVisibility",
    //      "tag":".answer_box.p5.m5>.subtitles_disabled",
    //      "des":"wait for the subtitles/no subtitles button to apear.",
    //      "callback":""},

    //     {"action":"click",
    //      "tag":".answer_box.p5.m5>.subtitles_disabled",
    //      "des":"click on no subtitles",
    //      "callback":""},


    //     {"action":"waitForVisibility",
    //      "tag":".answer_box.unselectable.p5.m5",
    //      "des":"wait for answer boxes to appear",
    //      "callback":""},

    //     {"action":"click",
    //      "tag":".answer_box.unselectable.p5.m5",
    //      "des":"click on the left answer",
    //      "callback":""},

    //     {"action":"waitForVisibility",
    //      "tag":"#finger>i",
    //      "des":"wait for next finger to appear",
    //      "callback":""},

    //     {"action":"click",
    //      "tag":"#finger>i",
    //      "callback":""},

    //     {"action":"done"}

    // ]

    // 	    , continueable:true
    //             , infos: { cretaedBy: 'pharzan',
    // 		       time: new Date()
    // 		     }
    // 	    , categoery:'products'
    // 	    , fruits: [ 'apple', 'orange', 'pear' ]
    //               };

    var doc = {
        name: 'productsTest_Red',
        dataStore: 'data/steps.db',
        content: [{
                loopCount: 0,
                url: 'http://dev.fev1/',
                stepsName: 'productsClick.json'

            }, {
                loopCount: 0,
                url: 'http://dev.fev1/',
                stepsName: 'redClick.json'
            }, {
                loopCount: 0,
                url: 'http://dev.fev1/',
                stepsName: 'urlCheck_Red.json'
            },

            {
                loopCount: 0,
                url: 'http://dev.fev1/',
                stepsName: 'leftCycle.json'
            },

            {
                status: 'testSetComplete'
            }


        ],
        categoery: 'products',
        infos: {
            cretaedBy: 'pharzan',
            time: new Date()
        }
    };

    d.insert(doc, function(err, newDoc) { // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        console.log('inserted');
    });


}

function remove(data) {
    db.steps.remove({
        name: 'checkTestTubes.json'
    }, {}, function(err, numRemoved) {
        // numRemoved = 1
        console.log('Number Removed::', numRemoved);
        console.log('removed')
    });
}

function removeById(dbName, id) {
    var d = db[dbName];
    d.remove({
        _id: id
    }, {}, function(err, numRemoved) {
        // numRemoved = 1
        console.log('Number Removed::', numRemoved);
        console.log('removed')
    });
}

function server() {
    http.createServer(function(request, response) {
        //	var u = 'http://127.0.0.1' + request.url;
        //	request.pipe(r(u)).pipe(response);

        var responseHeaders = {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",

            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': true,
            "Content-Type": "text/plain"
        };

        response.writeHead(200, responseHeaders);

        //request.setHeader('host','http://dev.testtube')
        if (request.method === "OPTIONS") {
            // Add headers to response and send
            response.end();
        }

        var path = url.parse(request.url).pathname;
        var search = url.parse(request.url).search;


        var answer;
        if (path == "/steps/") {

            // console.log("request recieved",search);
            if (search === '?all') {

                load('steps', {}).then(function(steps) {
                    //console.log('HERE');
                    response.writeHead(200, responseHeaders);
                    response.write(JSON.stringify(steps))
                    response.end();

                });
            }
            if (search === '?names') {

                load('steps', {}).then(function(steps) {

                    //console.log('NAMES',steps.length);
                    var names = [];


                    steps.map(function(step) {
                        // console.log('!!!!',step.name);
                        names.push(step.name)
                    });

                    response.writeHead(200, responseHeaders);
                    response.write(JSON.stringify(names))
                    response.end();

                });
            }


            // response.writeHead(200, {"Content-Type": "text/plain"});
            // response.end(answer);
            console.log("string sent");
        } else if (path == '/step/') {
            var query = {
                name: search.replace('?', '')
            };
            load('steps', query).then(function(res) {
                Global.steps = res[0];
                console.log('sent step, GLOBAL step set to', Global.steps = res[0].content);
                response.write(JSON.stringify(res[0]));
                response.end();
            });

        } else if (path == '/sets/') {
            if (search === '?names') {
                var names = [];
                var query = {};
                load('sets', query).then(function(res) {
                    res.map(function(r) {
                        names.push(r.name);
                    });
                    console.log('sent step, GLOBAL step set to');
                    response.write(JSON.stringify(names));
                    response.end();
                });
            }
            if (search === '?all') {
                var names=[];
                var query = {};
                load('sets', query).then(function(res) {
                    res.map(function(r) {
                        names.push(r);
                    });
                    console.log('sent step, GLOBAL step set to');
                    response.write(JSON.stringify(names));
                    response.end();
                });
            }
        } else if (path == '/set/') {
            query = {
                name: search.replace('?', '')
            };
	    console.log('query:::',query)
            load('sets', query).then(function(res) {
                Global.steps = res[0];
                console.log('sent step, GLOBAL step set to', Global.set = res[0].content);
                response.write(JSON.stringify(res[0]));
                response.end();
            });
        } else {
            fs.readFile('./index.html', function(err, file) {
                if (err) {
                    // write an error response or nothing here  
                    return;
                }
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(file, "utf-8");
            });
        }
    }).listen(8001);
    console.log("server initialized");

}

module.exports = {
    server: server,
    load: load,
    save: save,
    remove: remove,
    removeById: removeById
};
