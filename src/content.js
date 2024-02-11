console.log('content script loaded')
;(async () => {
  const { active, hide } = await chrome.storage.local.get()
  if (active === 'ON') {
    console.log('EXTENSION IS CURRENTLY ON')
    const observerTarget = document.querySelector('html')
    const observerOptions = {
      childList: true,
      subtree: true,
      attributes: true,
    }
    const observer = new MutationObserver(() =>
      hideOrBlurImages(hide, (amount = '5px'))
    )
    observer.observe(observerTarget, observerOptions)

    async function hideOrBlurImages(hide, amount) {
      const images = document.querySelectorAll('img') // Select all images
      let totalImage = 0
      if (hide === 'HIDE') {
        images.forEach((image, i) => {
          image.style.visibility = 'hidden' // Add 'hidden' CSS property
          totalImage = i
        })
      } else if (hide === 'BLUR') {
        images.forEach((image, i) => {
          image.style.filter = `blur(${amount})` // Add 'hidden' CSS property
          totalImage = i
        })
      }
      console.log(`${totalImage} of images affected`)
    }
  }
})()
