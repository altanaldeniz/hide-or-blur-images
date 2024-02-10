const { currentState } = await chrome.storage.local.get('currentState')
const button = document.querySelector('button')
button.innerHTML = currentState
button.addEventListener('click', async () => {
  const { currentState } = await chrome.storage.local.get('currentState')
  if (currentState === 'ON') {
    await chrome.storage.local.set({
      currentState: 'OFF',
    })
    button.innerHTML = 'OFF'
  } else {
    await chrome.storage.local.set({
      currentState: 'ON',
    })
    button.innerHTML = 'ON'
  }

  console.log('click, currently state is: ', currentState)
})
