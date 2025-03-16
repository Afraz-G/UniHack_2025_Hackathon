document.addEventListener("DOMContentLoaded", () => {
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
        li.className = "listItem";

        // Add a close button to the new list item
        const span = document.createElement("SPAN");
        span.className = "close";
        span.classList = " listItemButton"
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

    
});

function saveInputedDomain(domain) {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];

        // Add the new domain to the list
        monitorList.push(domain);

        // Save the updated list
        chrome.storage.sync.set({ monitorList }, () => {
            updateWebsiteListDisplay(); // Refresh the displayed list
        });
    });
}

function removeDomainFromList(domain) {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];

        // Remove the domain from the list
        const updatedList = monitorList.filter((item) => item !== domain);

        // Save the updated list
        chrome.storage.sync.set({ monitorList: updatedList }, () => {
            updateWebsiteListDisplay(); // Refresh the displayed list
        });
    });
}

function updateWebsiteListDisplay() {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];
        const listElement = document.getElementById("monitoredWebsitesList");

        // Clear the existing list before updating
        listElement.innerHTML = "";

        // Add each domain to the list
        monitorList.forEach((domain) => {
            const liElement = document.createElement("li");
            liElement.textContent = domain;
            liElement.className = "listItem";
            
            // Add a close button to the list item
            const span = document.createElement("SPAN");
            span.className = "close";
            span.className = " listItemButton";
            span.textContent = "\u00D7"; // "×" symbol

            // Add the list item to the DOM
            liElement.insertBefore(span, liElement.firstChild);
            
            listElement.appendChild(liElement);

            // Add click event to the close button
            span.addEventListener("click", function () {
                liElement.remove(); // Remove the item from the DOM
                removeDomainFromList(domain); // Remove the item from storage
            });
        });
    });
}
// console.log("SCRIPT LOADED")
