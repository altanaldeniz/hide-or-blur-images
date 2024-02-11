const { active, hide } = await chrome.storage.local.get()
const toggleActive = document.getElementById('toggleActive')
const toggleHide = document.getElementById('toggleHide')
toggleActive.innerHTML = active
toggleHide.innerHTML = hide
toggleActive.addEventListener('click', async () => {
  const { active } = await chrome.storage.local.get()
  if (active === 'ON') {
    await chrome.storage.local.set({
      active: 'OFF',
    })
    toggleActive.innerHTML = 'OFF'
  } else {
    await chrome.storage.local.set({
      active: 'ON',
    })
    toggleActive.innerHTML = 'ON'
  }
})
toggleHide.addEventListener('click', async () => {
  const { hide } = await chrome.storage.local.get()
  if (hide === 'HIDE') {
    await chrome.storage.local.set({
      hide: 'BLUR',
    })
    toggleHide.innerHTML = 'BLUR'
  } else if (hide === 'BLUR') {
    await chrome.storage.local.set({
      hide: 'HIDE',
    })
    toggleHide.innerHTML = 'HIDE'
  }
})
