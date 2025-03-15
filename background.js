chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.create({ url: "Checklist_implementation.html" });
  });