import scrollbar from './functions/scrollbar'

const init = (): void => {

  const compare = document.querySelector('*[data-compare]') as HTMLElement

  if (!compare) return

  const before = compare.querySelector('*[data-compare-before]') as HTMLElement
  const image = compare.querySelector('*[data-compare-image]') as HTMLImageElement
  const change = compare.querySelector('*[data-compare-change]') as HTMLElement

  let active: boolean = false
  let value: number = 0
  let position: number = 0

  const setSizeImage = (): void => {

    image.style.width = `${compare.offsetWidth}px`

  }

  const compareStart = (event: Event): void => {

    if ((event.target as HTMLElement).closest('[data-compare]')) {

      scrollbar.hidden()

      active = true

    }

  }

  const compareEnd = (): void => {

    scrollbar.show()

    active = false

  }

  const compareMove = (event: Event): void => {

    if (!active) return

    if (event.type === 'mousemove') {

      position = (event as MouseEvent).pageX

    } else {

      for (let i: number = 0; i < (event as TouchEvent).changedTouches.length; i++) {

        position = (event as TouchEvent).changedTouches[i].pageX

      }

    }

    position -= compare.getBoundingClientRect().left
    value = Math.max(0, Math.min(position, compare.offsetWidth))

    before.style.width = `${value}px`
    change.style.left = `${value}px`

    event.stopPropagation()
    event.preventDefault()

  }

  setSizeImage()

  window.addEventListener('resize', setSizeImage as EventListener)

  compare.addEventListener('mousedown', compareStart as EventListener)
  compare.addEventListener('mouseup', compareEnd as EventListener)
  compare.addEventListener('mouseleave', compareEnd as EventListener)
  compare.addEventListener('mousemove', compareMove as EventListener)

  compare.addEventListener('touchstart', compareStart as EventListener)
  compare.addEventListener('touchend', compareEnd as EventListener)
  compare.addEventListener('touchcancel', compareEnd as EventListener)
  compare.addEventListener('touchmove', compareMove as EventListener)

}

export default { init }