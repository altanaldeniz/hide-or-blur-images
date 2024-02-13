chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      active: true,
      hide: 'HIDE',
      blurAmount: 5,
    })
  }
})
