// Bytey Character Overlay
let bytey = document.createElement("div");
bytey.id = "bytey";
bytey.innerHTML = "<img src='" + chrome.runtime.getURL("bytey/pixel-bytey.png") + "'>";
document.body.appendChild(bytey);

// Style Bytey
let byteyStyle = document.createElement("style");
byteyStyle.innerHTML = `
    #bytey {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 100px;
        height: 100px;
        z-index: 9999;
    }
    #bytey img {
        width: 100%;
        height: auto;
        animation: blink 1s infinite alternate;
    }
    @keyframes blink {
        0% { opacity: 1; }
        100% { opacity: 0.8; }
    }
`;
document.head.appendChild(byteyStyle);

// Show Bytey's Message
setTimeout(() => {
    alert("🚨 Bytey says: Stop scrolling and get back to work! 🚨");
}, 5000);

const enableTamagochi = async () => {
    chrome.storage.sync.get("monitorList", (data) => {
        const monitorList = data.monitorList || [];
        console.log("Enable tamagochi");
        for (const domain of monitorList) {
            // console.log(domain)
            if (window.location.hostname.includes(domain)) {
                
                console.log("This is a BAD website") // Replace with what to do depending on website
            }
        }
    });
    
}
enableTamagochi();