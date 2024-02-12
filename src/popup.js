// Element selectors
const toggleExtension = document.getElementById('toggler')
const rangeInput = document.getElementById('range-input')
const rangeText = document.getElementById('range-text')
const togglerText = document.getElementById('toggler-text')
const radioButtons = document.getElementById('radios')
const refreshWrapper = document.getElementById('refresh-wrapper')

const { active, hide, blurAmount } = await chrome.storage.local.get()
let initialState = {
  active,
  hide,
  blurAmount,
}

syncUI()

toggleExtension.addEventListener('change', async () => {
  const { active } = await chrome.storage.local.get()
  if (active) await chrome.storage.local.set({ active: !active })
  else await chrome.storage.local.set({ active: !active })
  syncUI()
})

radioButtons.addEventListener('change', async () => {
  if (event.target && event.target.matches("input[type='radio'")) {
    if (event.target.value === 'HIDE')
      await chrome.storage.local.set({ hide: 'HIDE' })
    else if (event.target.value === 'BLUR')
      await chrome.storage.local.set({ hide: 'BLUR' })
    syncUI()
  }
})

rangeInput.addEventListener('change', async () => {
  rangeText.innerHTML = rangeInput.value + ' px'
  await chrome.storage.local.set({
    blurAmount: rangeInput.value,
  })
  syncUI()
})

refreshWrapper.addEventListener('click', async () => {
  chrome.tabs.reload()
  const { active, hide, blurAmount } = await chrome.storage.local.get()
  initialState = {
    active,
    hide,
    blurAmount,
  }
  refreshWrapper.style.display = 'none'
})

async function syncUI() {
  const { active, hide, blurAmount } = await chrome.storage.local.get()

  if (
    JSON.stringify(initialState) !==
    JSON.stringify({ active, hide, blurAmount })
  ) {
    refreshWrapper.style.display = 'flex'
  } else refreshWrapper.style.display = 'none'
  console.log('current state: ', active, hide, blurAmount)

  toggleExtension.checked = active
  if (toggleExtension.checked) togglerText.innerHTML = 'extension is ON'
  else togglerText.innerHTML = 'extension is OFF'

  rangeInput.value = blurAmount
  rangeText.innerHTML = blurAmount + ' px'

  if (!active) {
    rangeInput.disabled = true
    radioButtons.disabled = true
    if (hide === 'HIDE') radioButtons[0].checked = true
    else if (hide === 'BLUR') radioButtons[1].checked = true
  } else if (active && hide === 'HIDE') {
    console.log('?')
    rangeInput.disabled = true
    radioButtons[0].checked = true
  } else if (active && hide === 'BLUR') {
    console.log('!')
    rangeInput.disabled = false
    radioButtons[1].checked = true
  }
}
