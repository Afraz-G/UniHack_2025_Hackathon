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