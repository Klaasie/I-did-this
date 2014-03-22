// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Icon: vinkje! 

// Creating parent menu
var parent = chrome.contextMenus.create({"title": "I did this:", contexts:["all"]});

// Retrieving Verbs
var verbsCollection;
chrome.storage.sync.get("collection", function(obj){
	verbsCollection = obj; // For later use.
	for(var index in obj.collection){
		chrome.contextMenus.create({"id": obj.collection[index]["verb"], "title": "I "+obj.collection[index]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(info.menuItemId, info.selectionText)}});
	}
});

//Setting LRS vars
var endpoint;
var username;
var password;
var learner_name;
var learner_email;
// Retrieving LRS details
chrome.storage.sync.get({
		endpoint: 'https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/',
		username: 'LRS username',
		password: 'LRS password',
		learner_email: 'Email address',
		learner_name: 'Your name'
	}, function(items) {
		endpoint = items.endpoint;
		username = items.username;
		password = items.password;
		learner_name = items.learner_name;
		learner_email = items.learner_email;
	});

// Adding a onclick event
function clicked(verb, object) {
	//Setting vars
	var objectText;
	var objecturl;
	var verbUrl = verbsCollection.collection[verb]["url"]; //Retrieving verb url from verbsCollection.

	chrome.tabs.query({ currentWindow: true, active: true}, function(tab){
	  	if(object == undefined){
			objectText = tab[0].title;
			objectUrl = tab[0].url;
		}else{
			objectText = object;
			objectUrl = tab[0].url;
		}

		// Debugging: a check if all the data is there.
		console.log(endpoint);
		console.log(username);
		console.log(password);
		console.log(learner_name);
		console.log(learner_email);
		console.log(verbUrl); 
		console.log(verb);
		console.log(objectUrl);
		console.log(objectText);

		//If all the above are set: (The above should probably be build in like a check)
		// Prepare tin can class.
		var tincan = new TinCan({
			recordStores: [{
				endpoint: endpoint,
				username: username,
				password: password
			}]
		});
		
		
		
		// Sending statement!
		tincan.sendStatement({
			"actor": {
		        "name": learner_name,
		        "mbox": learner_email
		     },
		     "verb": {
		         "id": verbUrl,
		         "display": {"en-US": verb}
		         },
		     "object": {
				"id": objectUrl,
		        "definition": {
		            "name": { "en-US": objectText }
		        }
		    }
		});
	});
  
}

