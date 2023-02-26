import scrolledPage from './functions/scrolled-page'

const init = (): void => {

  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  let prevOffsetTop: number = scrolledPage.init().top

  const scrollHeader = (): void => {

    const currentOffsetTop: number = scrolledPage.init().top
    const headerHeight: number = header.offsetHeight

    prevOffsetTop > currentOffsetTop ? header.style.setProperty('--top', '0') : header.style.setProperty('--top', `-${headerHeight}px`)

    prevOffsetTop = currentOffsetTop

  }

  document.addEventListener('scroll', scrollHeader as EventListener)

}

export default { init }