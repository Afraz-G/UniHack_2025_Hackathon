// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Create a "close" button and append it to each list item
    const myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7"); // "×" symbol
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    // Click on a close button to hide the current list item
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function () {
            const div = this.parentElement;
            div.style.display = "none";
        });
    }

    // Add a "checked" symbol when clicking on a list item
    const list = document.querySelector("ul");
    list.addEventListener("click", function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
        }
    });

    // Add a new list item when clicking on the "Add" button
    const addButton = document.querySelector(".addBtn");
    addButton.addEventListener("click", newElement);

    // Function to create a new list item
    function newElement() {
        const li = document.createElement("li");
        const inputValue = document.getElementById("myInput").value;
        const textNode = document.createTextNode(inputValue);
        li.appendChild(textNode);

        if (inputValue === "") {
            alert("You must write something!");
        } else {
            document.getElementById("myUL").appendChild(li);
        }
        document.getElementById("myInput").value = "";

        // Add a close button to the new list item
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7"); // "×" symbol
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        // Add click event to the new close button
        span.addEventListener("click", function () {
            const div = this.parentElement;
            div.style.display = "none";
        });
    }
});