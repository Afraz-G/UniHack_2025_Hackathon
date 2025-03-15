
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

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startFocusMode") {
        chrome.storage.local.set({ focusMode: true });
    } else if (request.action === "stopFocusMode") {
        chrome.storage.local.set({ focusMode: false });
    }
});

chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.storage.local.get("focusMode", (data) => {
        if (data.focusMode) {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                function: blockWebsite
            });
        }
    });
}, { url: [{ urlMatches: ".*" }] });

function blockWebsite() {
    document.body.innerHTML = `
        <div style="display: flex; height: 100vh; justify-content: center; align-items: center; text-align: center; background: black; color: white;">
            <h1>🚀 Bytey says: This site is off-limits during focus mode! 🚀</h1>
        </div>
    `;
}
