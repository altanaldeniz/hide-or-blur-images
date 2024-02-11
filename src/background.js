chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      active: 'ON',
      hide: 'HIDE',
    })
  }
})

// chrome.tabs.onUpdated.addListener(async (tabId) => {
//   console.log('HEEEY')
//   const { currentState } = await chrome.storage.local.get('currentState')
//   if (currentState == 'ON') {
//     chrome.scripting
//       .executeScript({
//         target: { tabId: tabId },
//         files: ['content.js'],
//       })
//       .then(() => console.log('script injected'))
//   }
// })
