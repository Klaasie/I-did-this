// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		// Initializing menu.
		menu_init();
    }else if(details.reason == "update"){
        menu_init();
    }
});

// Setting LRS vars
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
		// console.log(endpoint);
		// console.log(username);
		// console.log(password);
		// console.log(learner_name);
		// console.log(learner_email);
		// console.log(verbUrl); 
		// console.log(verb);
		// console.log(objectUrl);
		// console.log(objectText);

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