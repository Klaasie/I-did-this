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
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    endpoint: 'https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/',
    username: 'LRS username',
    password: 'LRS Password',
    learner_email: 'Email address',
    learner_name: 'Your name'
  }, function(items) {
    var endpoint = document.getElementById('endpoint').value = items.endpoint;
    var username = document.getElementById('username').value = items.username;
    var password = document.getElementById('password').value = items.password;
    var leaner_email = document.getElementById('email').value = items.learner_email;
    var learner_name = document.getElementById('name').value = items.learner_name;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);