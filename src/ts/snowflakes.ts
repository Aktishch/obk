import { coordinates } from './functions/coordinates'

const init = (): void => {

  const snow = document.querySelector('*[data-snow]') as HTMLElement

  if (!snow) return

  let flag: boolean = true

  document.addEventListener('mousemove', ((event: MouseEvent) => {

    if (!flag) return

    flag = false

    setTimeout((): boolean => flag = true, 300)

    const snowflake = document.createElement('span') as HTMLSpanElement

    const coordinates: coordinates = {

      top: event.clientY,
      left: event.clientX

    }

    let size: number = Math.random() * 60

    snowflake.classList.add('snowflake')
    snowflake.style.top = `${coordinates.top}px`
    snowflake.style.left = `${coordinates.left}px`
    snowflake.style.width = `${20 + size}px`
    snowflake.style.height = `${20 + size}px`

    snow.appendChild(snowflake)

    setTimeout((): void => snowflake.remove(), 3000)

  }) as EventListener)

}

export default { init }