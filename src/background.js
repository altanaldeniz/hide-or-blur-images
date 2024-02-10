chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      currentState: 'ON',
    })
  }
})

// chrome.tabs.onUpdated.addListener(async (tabId) => {
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

console.log('test')
