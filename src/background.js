chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      active: true,
      hide: 'HIDE',
      blurAmount: 5,
    })
  }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    !tab.url.startsWith('chrome://') &&
    !tab.url.startsWith('edge://') &&
    !tab.url.startsWith('https://chromewebstore.google.com/')
  ) {
    const { active } = await chrome.storage.local.get()
    if (active) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js'],
        injectImmediately: true,
      })
    }
  }
})
