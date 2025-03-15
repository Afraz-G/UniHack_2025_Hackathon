// Contains javascript for the checklist and the monitor list

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const myUL = document.getElementById("myUL");
    const addButton = document.querySelector(".addBtn");
    const myInput = document.getElementById("myInput");

    // Load saved checklist items from storage
    loadChecklist();

    // Add event listener to the "Add" button
    addButton.addEventListener("click", newElement);

    // Function to create a new list item
    function newElement() {
        const inputValue = myInput.value.trim();
        if (inputValue === "") {
            alert("You must write something!");
            return;
        }

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

        // Save the updated checklist to storage
        saveChecklist();

        // Add click event to the new close button
        span.addEventListener("click", function () {
            li.remove(); // Remove the item from the DOM
            saveChecklist(); // Save the updated checklist to storage
        });
    }

    // Add a "checked" symbol when clicking on a list item
    myUL.addEventListener("click", function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
            saveChecklist(); // Save the updated checklist to storage
        }
    });

    // Function to save the checklist to chrome.storage.local
    function saveChecklist() {
        const items = [];
        const listItems = myUL.querySelectorAll("li");

        listItems.forEach((item) => {
            items.push({
                text: item.textContent.replace("\u00D7", "").trim(), // Remove the "×" symbol
                checked: item.classList.contains("checked")
            });
        });

        // Save the items to chrome.storage.local
        chrome.storage.local.set({ checklist: items }, () => {
            console.log("Checklist saved:", items);
        });
    }

    // Function to load the checklist from chrome.storage.local
    function loadChecklist() {
        chrome.storage.local.get("checklist", (result) => {
            const items = result.checklist || [];

            items.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.text;

                if (item.checked) {
                    li.classList.add("checked");
                }

                // Add a close button to the list item
                const span = document.createElement("SPAN");
                span.className = "close";
                span.textContent = "\u00D7"; // "×" symbol
                li.appendChild(span);

                // Add the item to the list
                myUL.appendChild(li);

                // Add click event to the close button
                span.addEventListener("click", function () {
                    li.remove(); // Remove the item from the DOM
                    saveChecklist(); // Save the updated checklist to storage
                });
            });
        });
    }
});