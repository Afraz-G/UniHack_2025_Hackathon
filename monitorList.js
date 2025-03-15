document.addEventListener("DOMContentLoaded", () => {
<<<<<<< Updated upstream
    const addButton = document.getElementById("submitDomainButton");
    if (addButton) {
        addButton.addEventListener("click", saveInputedDomain);
    }

    const deleteButton = document.getElementById("deleteAllDomainButton");
    if (deleteButton) {
        deleteButton.addEventListener("click", clearMonitoringList);
    }
    updateWebsiteListDisplay();
=======
    const myUL = document.getElementById("monitoredWebsitesList");
    const myInput = document.getElementById("websiteDomain");
    const addButton = document.querySelector(".addDmn");
    const clearButton = document.querySelector(".clrDmn");
    
    // Load and display the saved list
    updateWebsiteListDisplay();
    
    // Add event listeners
    addButton.addEventListener("click", newElement);
    clearButton.addEventListener("click", clearMonitoringList);
    
    

    function newElement() {
        // console.log("NEw ELEMENT")
        const inputValue = myInput.value.trim();
        if (inputValue === "") {
            alert("You must write something!");
            return;
        }

        // Save the input value to storage
        saveInputedDomain(inputValue);

        // Create a new list item
        const li = document.createElement("li");
        li.textContent = inputValue;

        // Add a close button to the new list item
        const span = document.createElement("SPAN");
        span.className = "close";
        span.textContent = "\u00D7"; // "×" symbol
        li.appendChild(span);

        // Add the new item to the list
        myUL.appendChild(li);

        // Clear the input field
        myInput.value = "";

        // Add click event to the new close button
        span.addEventListener("click", function () {
            li.remove(); // Remove the item from the DOM
            removeDomainFromList(inputValue); // Remove the item from storage
        });
    }

    function clearMonitoringList() {
        chrome.storage.sync.remove("monitorList", () => {
            updateWebsiteListDisplay(); // Refresh the displayed list
        });
    }

    
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

function clearMonitoringList() {
    chrome.storage.sync.remove("monitorList", () => {
        updateWebsiteListDisplay()
    })
}
=======
// console.log("SCRIPT LOADED")
>>>>>>> Stashed changes
