import scrolledPage from './functions/scrolled-page'

const setProgressLineWidth = (): void => {

  const progressLine = document.querySelector('*[data-progress-line]') as HTMLElement

  if (!progressLine) return

  progressLine.style.width = `${Math.floor(scrolledPage.init().top / (document.documentElement.scrollHeight - window.innerHeight) * 100)}%`

}

const init = (): void => {

  document.addEventListener('scroll', setProgressLineWidth as EventListener)

}

export default { init }