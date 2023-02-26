const init = (): void => {

  const smartMenu = document.querySelector('*[data-menu]') as HTMLElement

  if (!smartMenu) return

  const title = smartMenu.querySelector('*[data-menu-title]') as HTMLElement
  const length = smartMenu.querySelector('*[data-menu-length]') as HTMLElement
  const nav = smartMenu.querySelector('*[data-menu-nav]') as HTMLButtonElement
  const count = smartMenu.querySelector('*[data-menu-count]') as HTMLElement
  const list = smartMenu.querySelector('*[data-menu-list]') as HTMLElement

  let breaks: number[] = []

  const updateSmartMenu = (): void => {

    const smartMenuWidth: number = nav.classList.contains('d-none') ? smartMenu.offsetWidth : smartMenu.offsetWidth - nav.offsetWidth
    const lengthWidth: number = length.offsetWidth

    if (smartMenuWidth > 0 && smartMenuWidth < lengthWidth) {

      breaks.push(lengthWidth)
      list.prepend(length.lastElementChild as HTMLElement)
      count.innerText = String(breaks.length)

      updateSmartMenu()

    } else {

      if (smartMenuWidth > breaks[breaks.length - 1]) {

        breaks.pop()
        length.append(list.firstElementChild as HTMLElement)
        count.innerText = String(breaks.length)

      }

    }

    (list.querySelectorAll('li') as NodeListOf<Element>).length == 0 ? nav.classList.add('d-none') : nav.classList.remove('d-none')

    lengthWidth == 0 ? title.classList.remove('d-none') : title.classList.add('d-none')

  }

  updateSmartMenu()

  window.addEventListener('resize', updateSmartMenu as EventListener)

}

export default { init }