import scrollbar from './functions/scrollbar'

const init = (): void => {

  const mobile = document.querySelector('*[data-mobile]') as HTMLElement

  if (!mobile) return

  const burger = document.querySelector('*[data-burger]') as HTMLButtonElement
  const close = mobile.querySelector('*[data-mobile-close]') as HTMLButtonElement

  const openMobileMenu = (): void => {

    scrollbar.hidden()

    mobile.dataset.mobile = 'open'

  }

  const closeMobileMenu = (): void => {

    scrollbar.show()

    mobile.dataset.mobile = 'close'

  }

  burger.addEventListener('click', openMobileMenu as EventListener)
  close.addEventListener('click', closeMobileMenu as EventListener)

  mobile.addEventListener('click', ((event: Event): void => {

    if ((event.target as HTMLAnchorElement).hasAttribute('data-scroll')) closeMobileMenu()

  }) as EventListener)

  document.addEventListener('click', ((event: Event): void => {

    if ((event.target as HTMLElement).hasAttribute('data-mobile')) closeMobileMenu()

  }) as EventListener)

}

export default { init }