var Datastore = require('nedb');
var db = {};

db.steps = new Datastore('data/steps.db');
db.sets = new Datastore('data/sets.db');
db.steps.loadDatabase();
db.sets.loadDatabase();

function load (dbName,query){
   // query={name:'checkTestTubes.json' };
    var d=db[dbName];
    return new Promise(function(resolve){
	
	
	d.find(query, function (err, steps) {
	    if(steps.length == 0)
		return resolve('empty');
	 
	    console.log('DATA SERVICES:: LOADED ',steps.map(function(st){return st.name}));
	    return resolve(steps);
	
	});
    });
}

function save (dbName,data){
    
    var d=db[dbName];
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
	
var doc = { name: 'productsTest_Red'
            , dataStore:'data/steps.db'
            , content: [
	    	{
	    	    loopCount: 0,
	    	    url: 'http://dev.fev1/',
	    	    stepsName: 'productsClick.json'
	    	    
	    	},
	    	{
	    	    loopCount: 0,
	    	    url: 'http://dev.fev1/',
	    	    stepsName: 'redClick.json'
	    	},
	    	{
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
	    	    status:'testSetComplete'
	    	}
		

	    ]
	    , categoery:'products'
            , infos: { cretaedBy: 'pharzan',
	    	       time: new Date()
	    	     }
          };

    d.insert(doc, function (err, newDoc) {   // Callback is optional
	// newDoc is the newly inserted document, including its _id
	// newDoc has no key called notToBeSaved since its value was undefined
	console.log('inserted');
});


}

function remove (data){
    db.steps.remove({ name: 'checkTestTubes.json' }, {}, function (err, numRemoved) {
	// numRemoved = 1
	console.log('Number Removed::',numRemoved);
	console.log('removed')
    });
}

function removeById (dbName,id){
    var d=db[dbName];
    d.remove({ _id: id }, {}, function (err, numRemoved) {
	// numRemoved = 1
	console.log('Number Removed::',numRemoved);
	console.log('removed')
    });
}


module.exports = {
    load:load,
    save:save,
    remove:remove,
    removeById:removeById
};
