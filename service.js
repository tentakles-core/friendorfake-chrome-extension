chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete'){
        chrome.tabs.get(tabId, currentTabInfo => {
            if(/^https:\/\/www\.instagram\.com\/[a-z0-9A-Z]+(\/)?/.test(currentTabInfo.url)){
                chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['render.js'],
                })
            }   
        })
    }
})
