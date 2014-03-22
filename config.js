//List of default verbs
var verbs = {
	"read": {
			"verb": "read",
			"url": "http://activitystrea.ms/schema/1.0/read"
		},
	"watched": {
			"verb": "watched",
			"url": "http://activitystrea.ms/schema/1.0/watch"
		},
	"completed": {
			"verb": "completed",
			"url": "http://activitystrea.ms/schema/1.0/complete"
		},
	"experienced": {
			"verb": "experienced",
			"url": "http://activitystrea.ms/schema/1.0/experience"
		},
	"started": {
			"verb": "started",
			"url": "http://activitystrea.ms/schema/1.0/start"
		}
};

//Setting default verbs in the database
chrome.storage.sync.set({
		collection: verbs
	}, function() {
		// Do nothing.
	});