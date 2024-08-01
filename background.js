chrome.runtime.onInstalled.addListener((details) => {
  // creating context menus
  chrome.contextMenus.create({
    title: "Search TV Show",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.create({
    title: "Read this text",
    id: "contextMenu2",
    contexts: ["page", "selection"],
  });

  // setting default value for show array, so it's not undefined
  chrome.storage.local.set({
    shows: [],
  });
});

// implement an action once it's clicked
chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === "contextMenu1") {
    fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("👀 Fetched data", data);
        chrome.storage.local.set({
          shows: data,
        });
      });
  } else if (event.menuItemId === "contextMenu2") {
    chrome.tts.speak(event.selectionText);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  chrome.tabs.sendMessage(
    sender.tab.id,
    "This is a message from background.js"
  );
});
