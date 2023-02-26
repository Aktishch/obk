const show = (): void => {

  const html = document.documentElement as HTMLElement

  html.classList.remove('overflow-hidden')
  html.style.marginRight = '0'

}

const hidden = (): void => {

  const html = document.documentElement as HTMLElement
  const scrollbarWidth: number = window.innerWidth - html.clientWidth

  html.classList.add('overflow-hidden')
  html.style.marginRight = `${scrollbarWidth}px`

}

export default { show, hidden }