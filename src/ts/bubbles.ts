const setBubbles = (event: Event): void => {

  const btn = event.target as HTMLElement

  btn.dataset.bubles = 'show'

  setTimeout((): void => {

    btn.dataset.bubles = 'hidden'

  }, 600)

}

const init = (): void => {

  document.addEventListener('click', ((event: Event): void => {

    if ((event.target as HTMLElement).closest('[data-bubbles]')) setBubbles(event)

  }) as EventListener)

}

export default { init }