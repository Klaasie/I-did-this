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