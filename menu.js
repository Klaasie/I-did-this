// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Icon: vinkje! 

//List of verbs
var verbs = {
	1: {
			"verb": "read",
			"url": "http://activitystrea.ms/schema/1.0/read"
		},
	2: {
			"verb": "watched",
			"url": "http://activitystrea.ms/schema/1.0/watch"
		},
	3: {
			"verb": "completed",
			"url": "http://activitystrea.ms/schema/1.0/complete"
		},
	4: {
			"verb": "experienced",
			"url": "http://activitystrea.ms/schema/1.0/experience"
		},
	5: {
			"verb": "started",
			"url": "http://activitystrea.ms/schema/1.0/start"
		}
};

// Adding menu items.
var parent = chrome.contextMenus.create({"title": "I did this:", contexts:["all"]});
//console.log(verbs);
/*var menuitem = [];
for(var index in verbs){
	chrome.contextMenus.create({"title": "I "+verbs[index]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[index]["verb"], info.selectionText, verbs[index]["url"])}});
}*/


var child1 = chrome.contextMenus.create({"title": "I "+verbs[1]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[1]["verb"], info.selectionText, verbs[1]["url"])}});
var child2 = chrome.contextMenus.create({"title": "I "+verbs[2]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[2]["verb"], info.selectionText, verbs[2]["url"])}});
var child3 = chrome.contextMenus.create({"title": "I "+verbs[3]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[3]["verb"], info.selectionText, verbs[3]["url"])}});
var child4 = chrome.contextMenus.create({"title": "I "+verbs[4]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[4]["verb"], info.selectionText, verbs[4]["url"])}});
var child5 = chrome.contextMenus.create({"title": "I "+verbs[5]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(verbs[5]["verb"], info.selectionText, verbs[5]["url"])}});

// Adding a onclick event
function clicked(verb, object, verbUrl) {
  	console.log(verb);
  	var verb = verb;
	var selection = object;
	var verbUrl = verbUrl;
  	// Query to the LRS and user info.
	chrome.storage.sync.get({
		endpoint: 'https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/',
		username: 'LRS username',
		password: 'LRS password',
		learner_email: 'Email address',
		learner_name: 'Your name'
	}, function(items) { 
		// Check if a text is selected, in the other case we'll take the site title.
	  	chrome.tabs.query({ currentWindow: true, active: true}, function(tab){
	  		if(selection == undefined){
	  			var object = tab[0].title;
	  			var objectUrl = tab[0].url;
	  		}else{
	  			var object = selection;
	  			var objectUrl = tab[0].url;
	  		}

	  		// Prepare tin can class.
			var tincan = new TinCan({
				recordStores: [{
					endpoint: items.endpoint,
					username: items.username,
					password: items.password
				}]
			});
			
			// Debugging
			// console.log(items.learner_name);
			// console.log(items.learner_email);
			// console.log(verbUrl); 
			// console.log(verb);
			// console.log(objectUrl);
			// console.log(object);
			
			// Sending statement!
			tincan.sendStatement({
				"actor": {
			        "name": items.learner_name,
			        "mbox": items.learner_email
			     },
			     "verb": {
			         "id": verbUrl,
			         "display": {"en-US": verb}
			         },
			     "object": {
					"id": objectUrl,
			        "definition": {
			            "name": { "en-US": object }
			        }
			    }
			});

	  	});
	  	
	});

  
  
}

