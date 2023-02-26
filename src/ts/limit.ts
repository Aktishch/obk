import scrollbar from './functions/scrollbar'

const init = (): void => {

  const limit = document.querySelector('*[data-limit]') as HTMLElement

  if (!limit) return

  if (sessionStorage.getItem('limit') && sessionStorage.getItem('limit') == 'positive') {

    limit.remove()
    scrollbar.show()

  } else {

    limit.classList.remove('hidden', 'fade-0')

    scrollbar.hidden()

  }

  const currentTab = window.open('', '_self') as Window
  const positive = limit.querySelector('*[data-limit-positive]') as HTMLButtonElement
  const negative = limit.querySelector('*[data-limit-negative]') as HTMLButtonElement

  const positiveAnswer = (): void => {

    sessionStorage.setItem('limit', 'positive')
    limit.classList.add('hidden', 'fade-0')

    setTimeout((): void => {

      limit.remove()
      scrollbar.show()

    }, 800)

  }

  const negativeAnswer = (): void => {

    currentTab.document.write('')

    setTimeout((): void => currentTab.close(), 1000)

  }

  positive.addEventListener('click', positiveAnswer as EventListener)
  negative.addEventListener('click', negativeAnswer as EventListener)

}

export default { init }