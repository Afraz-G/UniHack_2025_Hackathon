// This javascript is to run the Tamagochi
// Notes: First Bug: If website was added to monitor list while it is opened, extension does
// not take that into account.
// Second Bug: On some websites like the website to look at documentation for manifest.json, for some reason the sprites is croped
// incorrectly, causing a double (first and next sprite sheet rows).

const enableTamagotchi = async () => {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];
        console.log("Enable tamagochi");
        let matchFound = false;

        for (const domain of monitorList) {
            if (window.location.hostname.includes(domain)) {
                console.log("This is a BAD website") // Replace with what to do depending on website
                matchFound = true;
                showTamagotchi();

                // TESTING ONLY: Call the function to start the cycle
                cycleTamagotchiClasses();    
                break;
            }
        }
        if (!matchFound) {removeTamagotchi();}
    });
    
}

function showTamagotchi() {
    console.log("LOADING TAMGOTCHI OVERLAY")
    // Create the Tamagotchi HTML structure

    const tamagotchiContainer=document.createElement('div');
    tamagotchiContainer.className='TamagotchiContainer';
    tamagotchiContainer.setAttribute('id', 'TamagotchiContainer');

    // Create the Tamagotchi div
    const tamagotchiDiv = document.createElement('div');
    tamagotchiDiv.className = 'Tamagotchi';

    // Create the img element
    const tamagotchiImg = document.createElement('img');
    tamagotchiImg.className = 'TamagotchiSpriteSheet';
    tamagotchiImg.className += " Pixelart";
    tamagotchiImg.className += " be_angry";
    // tamagotchiImg.className += " be_annoyed";
    // tamagotchiImg.className += " be_sad";
    // tamagotchiImg.className += " be_neutral";
    // tamagotchiImg.className += " be_happy";
    tamagotchiImg.src = chrome.runtime.getURL('assets/laptopbyteyv1.png'); // Make sure the path is correct
    tamagotchiImg.alt = 'tamagotchi';

    // Append the image to the Tamagotchi div
    tamagotchiDiv.appendChild(tamagotchiImg);

    // Append the Tamagotchi div to the main container
    tamagotchiContainer.appendChild(tamagotchiDiv);

    document.body.appendChild(tamagotchiContainer);
}

function removeTamagotchi() {
    console.log("REMOVING TAMAGOTCHI OVERLAY");

    const tamagotchiContainer = document.getElementById('TamagotchiContainer');

    if (tamagotchiContainer) {
        tamagotchiContainer.remove();
        console.log("Tamagotchi overlay removed.");
    } else {
        console.log("No Tamagotchi overlay to remove.");
    }
}


function updateTamagotchiImageClass(newClass) {
    // Get the Tamagotchi image element
    const tamagotchiImg = document.querySelector('.TamagotchiSpriteSheet');
    
    if (tamagotchiImg) {
        tamagotchiImg.classList.remove("be_angry", "be_annoyed", "be_sad", "be_neutral", "be_happy");
        
        // Add the new class
        tamagotchiImg.classList.add(newClass);
    }
}

enableTamagotchi();



// FOR TESTING PURPOSES, TO LOOP THROUGH ANIMATIONS
function cycleTamagotchiClasses() {
    const classes = ["be_angry", "be_annoyed", "be_sad", "be_neutral", "be_happy"];
    let currentIndex = 0;

    const tamagotchiImg = document.querySelector('.TamagotchiSpriteSheet');

    if (!tamagotchiImg) {
        return;
    }

    // Function to update the class
    function updateClass() {
        // Remove all mood-related classes
        tamagotchiImg.classList.remove(...classes);

        // Add the current class
        tamagotchiImg.classList.add(classes[currentIndex]);

        // Move to the next class
        currentIndex = (currentIndex + 1) % classes.length; // Loop back to the first class after the last one
    }

    // Set an interval to cycle through the classes every 2 seconds (2000ms)
    setInterval(updateClass, 2000);
}




// // Bytey Character Overlay
// let bytey = document.createElement("div");
// bytey.id = "bytey";
// bytey.innerHTML = "<img src='" + chrome.runtime.getURL("bytey/pixel-bytey.png") + "'>";
// document.body.appendChild(bytey);

// // Style Bytey
// let byteyStyle = document.createElement("style");
// byteyStyle.innerHTML = `
//     #bytey {
//         position: fixed;
//         bottom: 20px;
//         right: 20px;
//         width: 100px;
//         height: 100px;
//         z-index: 9999;
//     }
//     #bytey img {
//         width: 100%;
//         height: auto;
//         animation: blink 1s infinite alternate;
//     }
//     @keyframes blink {
//         0% { opacity: 1; }
//         100% { opacity: 0.8; }
//     }
// `;
// document.head.appendChild(byteyStyle);

// // Show Bytey's Message
// setTimeout(() => {
//     alert("🚨 Bytey says: Stop scrolling and get back to work! 🚨");
// }, 5000);
