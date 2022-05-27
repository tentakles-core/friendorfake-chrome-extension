chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete'){
        chrome.tabs.get(tabId, currentTabInfo => {
            if(/^https:\/\/www\.instagram/.test(currentTabInfo.url)){
                chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['render.js'],
                })
            }   
        })
    }
})
