
var verbsCollection;
function menu_init(){
	// Removing the existing menu first.
	chrome.contextMenus.removeAll();

	// Creating parent menu
	var parent = chrome.contextMenus.create({"title": "I did this:", contexts:["all"]});

	// Retrieving Verbs
	
	chrome.storage.sync.get("collection", function(obj){
		verbsCollection = obj; // For later use.
		for(var index in obj.collection){
			chrome.contextMenus.create({"id": obj.collection[index]["verb"], "title": "I "+obj.collection[index]["verb"], "parentId": parent, contexts:["all"], "onclick": function(info){clicked(info.menuItemId, info.selectionText)}});
		}
	});
}

// re-initializing menu so it appears when chrome starts.
menu_init();