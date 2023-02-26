const init = (): void => {

  const counter = document.querySelector('*[data-counter]') as HTMLElement

  if (!counter) return

  const subtitle = counter.querySelector('*[data-counter-subtitle]') as HTMLElement
  const timer = counter.querySelector('*[data-counter-timer]') as HTMLElement
  const units = timer.querySelectorAll('*[data-counter-unit]') as NodeListOf<Element>
  const date: number = new Date(2023, 11, 23, 0, 0, 0).getTime()

  let interval: NodeJS.Timer

  const removeTimeCounter = (): void => {

    clearInterval(interval)
    timer.remove()
    subtitle.classList.remove('d-none')

  }

  const getTimeCounter = (): void => {

    const distance: number = date - new Date().getTime()
    const day: number = 24 * 60 * 60 * 1000
    const hour: number = 60 * 60 * 1000
    const minute: number = 60 * 1000

    const values = [

      Math.floor(distance / day),
      Math.floor((distance % day) / hour),
      Math.floor((distance % hour) / minute),
      Math.floor((distance % minute) / 1000)

    ]

    units.forEach((element: Element, index: number): void => (element as HTMLElement).textContent = values[String(index)])

    if (distance < 0) removeTimeCounter()

  }

  interval = setInterval(getTimeCounter, 1000)

  getTimeCounter()

}

export default { init }