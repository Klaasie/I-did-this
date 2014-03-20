// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Icon: vinkje! 

// Adding menu items.
var parent = chrome.contextMenus.create({"title": "I did this:", contexts:["all"]});
var child1 = chrome.contextMenus.create({"title": "I learned", "parentId": parent, contexts:["all"],"onclick": function(info){clicked("learned", info.selectionText)}});
var child2 = chrome.contextMenus.create({"title": "I read", "parentId": parent, contexts:["all"], "onclick": function(){clicked("read")}});

// Adding a onclick event
function clicked(verb, object) {
  if(object == undefined){
    chrome.tabs.query({ currentWindow: true, active: true}, function(tab){
      alert('I '+verb+' '+tab[0].title+'!'); // When no text is selected we'll use the document title.
    });
  }else{
    alert('I '+verb+' '+object+'!'); //A text is selected and we'll use this as the object.
  }
  
}