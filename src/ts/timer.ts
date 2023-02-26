import timeFormat from './functions/time-format'

const init = (): void => {

  const timer = document.querySelector('*[data-timer]') as HTMLElement

  if (!timer) return

  const stopwatch = timer.querySelector('*[data-timer-stopwatch]') as HTMLElement
  const units = timer.querySelector('*[data-timer-units]') as HTMLElement
  const turn = timer.querySelector('*[data-timer-turn]') as HTMLButtonElement
  const icon = turn.querySelector('use') as SVGUseElement
  const reset = timer.querySelector('*[data-timer-reset]') as HTMLButtonElement

  let status: boolean = false
  let seconds: number = 0
  let minutes: number = 0
  let hours: number = 0
  let steps: number = 0

  const setTime = (): void => {

    if (status == true) {

      seconds += 1
      steps += 1

      if (seconds == 60) {

        minutes += 1
        seconds = 0

      }

      if (minutes == 60) {

        hours += 1
        minutes = 0
        seconds = 0

      }

      units.innerText = `${timeFormat.init(hours)}:${timeFormat.init(minutes)}:${timeFormat.init(seconds)}`

      setTimeout(setTime, 1000)

    }

  }

  const statusTimer = (): void => {

    if (status == false) {

      status = true
      icon.setAttribute('xlink:href', 'img/icons.svg#pause')

      setTime()

    } else {

      status = false
      icon.setAttribute('xlink:href', 'img/icons.svg#play')

    }

  }

  const timerReset = (): void => {

    status = false
    seconds = 0
    minutes = 0
    hours = 0
    steps = 0
    units.innerText = '00:00:00'
    icon.setAttribute('xlink:href', 'img/icons.svg#play')

  }

  setInterval((): void => {

    stopwatch.style.transform = `rotate(${6 * steps}deg)`

  }, 1000)

  units.innerText = '00:00:00'

  turn.addEventListener('click', statusTimer as EventListener)
  reset.addEventListener('click', timerReset as EventListener)

}

export default { init }