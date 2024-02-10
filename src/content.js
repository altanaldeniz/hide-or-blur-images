console.log('content script loaded')
;(async () => {
  const { currentState } = await chrome.storage.local.get('currentState')
  if (currentState === 'ON') {
    console.log('EXTENSION IS CURRENTLY ON')
    const observerTarget = document.querySelector('html')
    const observerOptions = {
      childList: true,
      subtree: true,
      attributes: true,
    }
    const observer = new MutationObserver(hide)
    observer.observe(observerTarget, observerOptions)

    async function hide() {
      console.log('HIDE IMAGES')
      const images = document.querySelectorAll('img') // Select all images
      let totalImage = 0
      images.forEach((image, i) => {
        image.style.visibility = 'hidden' // Add 'hidden' CSS property
        totalImage = i
      })
      console.log(`${totalImage} of images hidden`)
    }
  }
})()
