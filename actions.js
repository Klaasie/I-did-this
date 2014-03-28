// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install"){
		// Initializing menu.
		menu_init();

		// Sending user to config page
		chrome.tabs.create({url: "options.html"});

	}else if(details.reason == "update"){
		menu_init();
	}
});

// Adding a onclick event
function clicked(verb, object) {
	//Setting vars
	var objectText;
	var objecturl;
	var verbUrl = verbsCollection.collection[verb]["url"]; //Retrieving verb url from verbsCollection (set in menu.js).

	chrome.tabs.query({ currentWindow: true, active: true}, function(tab){
		if(object == undefined){
			objectText = tab[0].title;
			objectUrl = tab[0].url;
		}else{
			objectText = object;
			objectUrl = tab[0].url;
		}
		// Retrieving LRS details
		chrome.storage.sync.get({
			endpoint: 'https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/',
			username: 'LRS username',
			password: 'LRS password',
			learner_email: 'Email address',
			learner_name: 'Your name'
		}, function(items) {
			// Debugging: a check if all the data is there.
			// console.log(items.endpoint);
			// console.log(items.username);
			// console.log(items.password);
			// console.log(items.learner_name);
			// console.log(items.learner_email);
			// console.log(verbUrl); 
			// console.log(verb);
			// console.log(objectUrl);
			// console.log(objectText);
			//If all the above are set: (The above should probably be build in like a check)

			// Creating new tin can class with the LRS details.
			var tincan = new TinCan({
				recordStores: [{
					endpoint: items.endpoint,
					username: items.username,
					password: items.password
				}]
			});

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
						"name": { "en-US": objectText }
					}
				}
			}, function(result){
				// Check to see if the statement was send.
				if(result[0].xhr.status == 204){
					// Giving the user feedback that the statement was sent.
					var notification = webkitNotifications.createNotification(
						'img/Tick_48x48.png',  // icon url - can be relative
						'I did this!',  // notification title
						'Your statement has been sent!'  // notification body text
					);
					notification.show();

					// Hide the message after 3 seconds
					setTimeout(function(){
						notification.cancel();
					}, 3000);
				}else{
					// An error has occured, once again we give the user feedback
					var notification = webkitNotifications.createNotification(
						'img/Error_48x48.png',
						'Something went wrong!',
						'Your statement was not sent, please check your configurations.'
					);
					notification.show();

					// Hide the message after 5 seconds
					setTimeout(function(){
						notification.cancel();
					}, 5000);
				}
			});
		});
	});
}