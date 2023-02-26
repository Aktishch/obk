import scrolledPage from './functions/scrolled-page'

const scrollTo = (event: Event): void => {

  event.preventDefault()


  const link = event.target as HTMLAnchorElement
  const id: string = String(link.getAttribute('href'))
  const block = document.querySelector(id) as HTMLElement

  if (link.dataset.scroll == 'top') {

    const headerHeight: number = (document.querySelector('*[data-header]') as HTMLElement).offsetHeight
    const offsetTop: number = block.getBoundingClientRect().top + scrolledPage.init().top - headerHeight

    window.scrollTo({

      top: offsetTop,
      behavior: 'smooth'

    })

  }

  if (link.dataset.scroll == 'center') {

    block.scrollIntoView({

      behavior: 'smooth',
      block: 'center'

    })

  }

}

const init = (): void => {

  document.addEventListener('click', ((event: Event): void => {

    if ((event.target as HTMLElement).hasAttribute('data-scroll')) scrollTo(event)

  }) as EventListener)

}

export default { init }