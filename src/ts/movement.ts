import { coordinates } from './functions/coordinates'

const setMovement = (event: MouseEvent): void => {

  const item = (event.target as HTMLElement).closest('[data-movement]') as HTMLElement

  const coordinates: coordinates = {

    top: event.clientY - item.getBoundingClientRect().top,
    left: event.clientX - item.getBoundingClientRect().left

  }

  item.style.setProperty('--y', `${coordinates.top}px`)
  item.style.setProperty('--x', `${coordinates.left}px`)

}

const init = (): void => {

  const items = document.querySelectorAll('*[data-movement]') as NodeListOf<Element>

  items.forEach((element: Element): void => {

    const item = element as HTMLElement

    if (!item) return

    item.classList.add('movement')

    item.addEventListener('mousemove', setMovement as EventListener)

  })

}

export default { init }