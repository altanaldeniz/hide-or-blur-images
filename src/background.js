chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      active: 'ON',
      hide: 'HIDE',
      blurAmount: 0,
    })
  }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
    const { active } = await chrome.storage.local.get()
    if (active == 'ON') {
      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          files: ['content.js'],
          injectImmediately: true,
        })
        .then(() => console.log('script injected'))
    }
  }
})
