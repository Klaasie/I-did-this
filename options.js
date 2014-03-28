// Saves options to chrome.storage
function save_options() {
	var endpoint = document.getElementById('endpoint').value;
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var learner_email = document.getElementById('email').value;
	var learner_name = document.getElementById('name').value;

	chrome.storage.sync.set({
		endpoint: endpoint,
		username: username,
		password: password,
		learner_email: learner_email,
		learner_name: learner_name
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.innerHTML = '<div class="alert alert-success">Options saved.</div>';
		setTimeout(function() {
			status.textContent = '';
		}, 5000);
	});
}

// Inserts the data from storage to the input fields
function restore_options() {
	chrome.storage.sync.get({
		// In case no data is present we'll insert default data. This data points the statements to the public LRS of Tin Can.
		endpoint: 'https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/',
		username: 'username',
		password: 'VGVzdFVzZXI6cGFzc3dvcmQ=',
		learner_email: 'Email address',
		learner_name: 'Your name'
	}, function(items) {
		document.getElementById('endpoint').value = items.endpoint;
		document.getElementById('username').value = items.username;
		document.getElementById('password').value = items.password;
		document.getElementById('email').value = items.learner_email;
		document.getElementById('name').value = items.learner_name;
	});
}

function add_verb(){
	// Code to add verbs
	// Probably the best way about this is to take the verbs object from verb.js
	// Add the new verb + url to the object and save to the storage.
}

// Add event listeners to the page.
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);