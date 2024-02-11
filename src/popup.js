const { active, hide, blurAmount } = await chrome.storage.local.get()
const toggleActive = document.getElementById('toggleActive')
const toggleHide = document.getElementById('toggleHide')
const rangeInput = document.getElementById('rangeInput')
const rangeText = document.getElementById('rangeText')
toggleActive.innerHTML = active
toggleHide.innerHTML = hide
rangeText.innerHTML = blurAmount + ' px'
rangeInput.value = blurAmount

if (active === 'ON' && hide === 'BLUR') {
  document.getElementById('rangeInput').disabled = false
}
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
  syncUI()
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
  syncUI()
})
rangeInput.addEventListener('change', async () => {
  rangeText.innerHTML = rangeInput.value + ' px'
  await chrome.storage.local.set({
    blurAmount: rangeInput.value,
  })
})

const syncUI = async () => {
  const { active, hide } = await chrome.storage.local.get()
  if (active === 'OFF') {
    rangeInput.disabled = true
  }
  if (active === 'ON' && hide === 'BLUR') rangeInput.disabled = false
  else rangeInput.disabled = true
}
