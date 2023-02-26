import { coordinates } from './functions/coordinates'
import scrollbar from './functions/scrollbar'

const setTranslate = (element: HTMLElement, xPos: number, yPos: number): void => {

  element.style.transform = `translate(${xPos}px, ${yPos}px)`

}

const setDraggable = (id: string): void => {

  const draggable = document.querySelector(`#${id}`) as HTMLElement

  if (!draggable) return

  const body = document.body as HTMLBodyElement

  const coordinates: coordinates = {

    top: 0,
    left: 0

  }

  let active: boolean = false
  let currentY: number
  let currentX: number
  let initialY: number
  let initialX: number

  const getDragPosition = (): void => {

    if (draggable.closest('[data-draggable]')) {

      setTranslate((draggable.closest('[data-draggable]') as HTMLElement), coordinates.left, coordinates.top)

    } else {

      setTranslate(draggable, coordinates.left, coordinates.top)

    }

  }

  const dragStart = (event: Event): void => {

    if (event.type === 'touchstart') {

      initialY = (event as TouchEvent).touches[0].clientY - coordinates.top
      initialX = (event as TouchEvent).touches[0].clientX - coordinates.left

    } else {

      initialY = (event as MouseEvent).clientY - coordinates.top
      initialX = (event as MouseEvent).clientX - coordinates.left

    }

    if (event.target === draggable) active = true

  }

  const dragEnd = (): void => {

    initialX = currentX
    initialY = currentY
    active = false

  }

  const dragMove = (event: Event): void => {

    if (!active) return

    if (event.type === 'touchmove') {

      currentX = (event as TouchEvent).touches[0].clientX - initialX
      currentY = (event as TouchEvent).touches[0].clientY - initialY

    } else {

      currentX = (event as MouseEvent).clientX - initialX
      currentY = (event as MouseEvent).clientY - initialY

    }

    coordinates.top = currentY
    coordinates.left = currentX

    getDragPosition()

    sessionStorage.setItem(`${id}`, JSON.stringify(coordinates))

  }

  if (sessionStorage.getItem(`${id}`)) {

    coordinates.top = JSON.parse(sessionStorage.getItem(`${id}`) || '{}').top
    coordinates.left = JSON.parse(sessionStorage.getItem(`${id}`) || '{}').left

    getDragPosition()

  }

  draggable.addEventListener('touchstart', scrollbar.hidden as EventListener)
  draggable.addEventListener('touchend', scrollbar.show as EventListener)
  draggable.addEventListener('mousedown', scrollbar.hidden as EventListener)
  draggable.addEventListener('mouseup', scrollbar.show as EventListener)

  body.addEventListener('touchstart', dragStart as EventListener, false)
  body.addEventListener('touchmove', dragMove as EventListener, false)
  body.addEventListener('touchend', dragEnd as EventListener, false)

  body.addEventListener('mousedown', dragStart as EventListener, false)
  body.addEventListener('mousemove', dragMove as EventListener, false)
  body.addEventListener('mouseup', dragEnd as EventListener, false)

}

const init = (): void => {

  setDraggable('draggable')

}

export default { init }