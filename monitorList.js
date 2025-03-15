document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("submitDomainButton");
    if (addButton) {
        addButton.addEventListener("click", saveInputedDomain);
    }

    const deleteButton = document.getElementById("deleteAllDomainButton");
    if (deleteButton) {
        deleteButton.addEventListener("click", clearMonitoringList);
    }
    updateWebsiteListDisplay();
});

function saveInputedDomain() {
    let websiteDomain = document.getElementById("websiteDomain").value;

    // Add to monitor list and save
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];

        // Add
        monitorList.push(websiteDomain);

        //Save
        chrome.storage.sync.set({monitorList}, () => {
            updateWebsiteListDisplay();
        });
    });
}

function updateWebsiteListDisplay() {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];
        const listElement = document.getElementById("monitoredWebsitesList");

        // Clear the existing list before updating
        listElement.innerHTML = '';

        for (const domain of monitorList) {
            // Generate the UI for the deny list
            const liElement = document.createElement("li");
            liElement.textContent = domain;
            listElement.appendChild(liElement);
            // TODO: Remove items to deny list.
        }
    });
}

function clearMonitoringList() {
    chrome.storage.sync.remove("monitorList", () => {
        updateWebsiteListDisplay()
    })
}