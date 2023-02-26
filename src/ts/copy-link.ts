const copyLink = (event: Event) => {

  const copy = (event.target as HTMLButtonElement).closest('[data-copy]') as HTMLElement
  const input = copy.querySelector('*[data-copy-input]') as HTMLInputElement

  setTimeout((): void => {

    input.select()
    document.execCommand('copy')

  }, 100)

}

const init = (): void => {

  document.addEventListener('click', ((event: Event) => {

    if ((event.target as HTMLButtonElement).closest('[data-copy-button]')) copyLink(event)

  }) as EventListener)

}

export default { init }