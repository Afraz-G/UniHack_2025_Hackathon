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
                getChecklistData();

                // TESTING ONLY: Call the function to start the cycle
                // cycleTamagotchiClasses();    
                break;
            }
        }
        if (!matchFound) {removeTamagotchi();}
    });
    
}

function getChecklistData(){
    chrome.storage.local.get(['checklist'], function(result){
        if (result.checklist) {
            const data = Object.values(result.checklist);
            console.log('Checklist data received:', data);
            startDialogueInterval(data);
        } else {
            console.log('No checklist data found in chrome.storage.local');
        }
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
    console.log("TAMAGOTCHI WIDTH:")
    
    
    // Append the image to the Tamagotchi div
    tamagotchiDiv.appendChild(tamagotchiImg);
    
    // Append the Tamagotchi div to the main container
    tamagotchiContainer.appendChild(tamagotchiDiv);
    
    document.body.appendChild(tamagotchiContainer);
    console.log(getComputedStyle(document.querySelector('.TamagotchiSpriteSheet')).width);
    const img = document.querySelector('.TamagotchiSpriteSheet');
    if (img) {
        img.style.maxWidth = 'none'; // Override site restrictions
    }
    // console.log("Computed width:", getComputedStyle(img).width);
    // console.log("Offset width:", img.offsetWidth);
    // console.log("Transform:", getComputedStyle(img).transform);
    // console.log("Zoom:", getComputedStyle(document.body).zoom);
    // console.log("Font size:", getComputedStyle(document.documentElement).fontSize);
    // console.log("Box-sizing:", getComputedStyle(img).boxSizing);
    // console.log("Max-width:", getComputedStyle(img).maxWidth);
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

// Function to create and display the dialogue box
function createDialogueBox(text) {
    console.log('Creating dialogue box with text:', text)
    const tamagotchi = document.querySelector('.Tamagotchi');
    if (!tamagotchi) {
        console.error('Tamagotchi element not found!');
        return;
    }

    const dialogueBox = document.createElement('div');
    dialogueBox.className = 'tamagotchi-dialogue';

    const dialogueText = document.createElement('p');
    dialogueText.textContent = text;
    dialogueBox.appendChild(dialogueText);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.onclick = function() {
        tamagotchi.removeChild(dialogueBox);
    };
    dialogueBox.appendChild(closeButton);

    tamagotchi.appendChild(dialogueBox);
    console.log('Dialogue box created and appended.')
}

// Function to display a random choice from the checklist
function displayRandomDialogue(choices) {
    if (!Array.isArray(choices) || choices.length === 0) {
        console.error('Invalid or empty choices array.');
        return;
    }
    const texts = choices.map(choice => choice.text)
    const randomIndex = Math.floor(Math.random() * texts.length);
    const randomChoice = texts[randomIndex];
    console.log(randomChoice)
    createDialogueBox(randomChoice);
}

// Function to start the 30-minute interval
function startDialogueInterval(choices) {
    displayRandomDialogue(choices);
    setInterval(() => {
        displayRandomDialogue(choices);
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
}


// FOR TESTING PURPOSES, TO LOOP THROUGH ANIMATIONS
// function cycleTamagotchiClasses() {
//     const classes = ["be_angry", "be_annoyed", "be_sad", "be_neutral", "be_happy"];
//     let currentIndex = 0;

//     const tamagotchiImg = document.querySelector('.TamagotchiSpriteSheet');

//     if (!tamagotchiImg) {
//         return;
//     }

//     // Function to update the class
//     function updateClass() {
//         // Remove all mood-related classes
//         tamagotchiImg.classList.remove(...classes);

//         // Add the current class
//         tamagotchiImg.classList.add(classes[currentIndex]);

//         // Move to the next class
//         currentIndex = (currentIndex + 1) % classes.length; // Loop back to the first class after the last one
//     }

//     // Set an interval to cycle through the classes every 2 seconds (2000ms)
//     setInterval(updateClass, 2000);
// }
