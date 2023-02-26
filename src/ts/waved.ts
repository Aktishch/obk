import { coordinates } from './functions/coordinates'

const setWaved = (event: MouseEvent): void => {

  const item = (event.target as HTMLElement).closest('[data-waved]') as HTMLElement
  const waved = item.querySelector('.waved') as HTMLDivElement
  const circle = document.createElement('div') as HTMLDivElement

  const coordinates: coordinates = {

    top: event.clientY - item.getBoundingClientRect().top,
    left: event.clientX - item.getBoundingClientRect().left

  }

  circle.classList.add('waved-circle')
  circle.style.top = `${coordinates.top}px`
  circle.style.left = `${coordinates.left}px`

  waved.appendChild(circle)

  setTimeout((): void => circle.remove(), 1000)

}

const init = (): void => {

  const items = document.querySelectorAll('*[data-waved]') as NodeListOf<Element>

  items.forEach((element: Element): void => {

    const item = element as HTMLElement

    if (!item) return

    const waved = document.createElement('div') as HTMLDivElement

    waved.classList.add('waved')
    item.appendChild(waved)

    item.addEventListener('click', setWaved as EventListener)

  })

}

export default { init }