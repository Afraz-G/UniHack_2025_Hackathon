document.getElementById('startFocus').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "startFocusMode" });
});

document.getElementById('stopFocus').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopFocusMode" });
});