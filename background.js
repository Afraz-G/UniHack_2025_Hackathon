chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.create({ url: "https://theuselessweb.com/" });
  });