
// THIS IS SYNTAX FOR LISTENING TO  THE WEBSITES TAB

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // if (tab.url && tab.url.includes("youtube.com/watch")){ // This things triggers multiple times on a single chrome update
//     //     console.log("Youtube openeed!");
//     //     console.log("Youtube tab!");
//     // }

// })

chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.create({ url: "Checklist_implementation.html" });
  });