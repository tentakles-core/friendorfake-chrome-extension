chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.get(tabId, (currentTabInfo) => {
      if (
        /^https:\/\/www\.instagram\.com\/[A-Za-z0-9-_\.]{2,}(\/)?/.test(
          currentTabInfo.url
        )
      ) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ["render.js"],
        });
      }
    });
  }
});
