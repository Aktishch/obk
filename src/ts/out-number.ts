const setOutNumber = (section: HTMLElement): void => {

  const items = section.querySelectorAll('*[data-number]') as NodeListOf<Element>

  items.forEach((element: Element): void => {

    const item = element as HTMLElement

    if (!item) return

    const number: number = Number(item.dataset.number)
    const step: number = item.dataset.numberStep ? Number(item.dataset.numberStep) : 0.5
    const time: number = item.dataset.numberTime ? Number(item.dataset.numberTime) * 1000 : 1000
    const timer: number = Math.round(time / (number / step))

    let sum: number = 0

    const interval: NodeJS.Timer = setInterval((): void => {

      sum += step

      if (sum == number || sum > number) {

        item.innerHTML = String(number)

        clearInterval(interval)

      } else {

        item.innerHTML = String(sum)

      }

    }, timer)

  })

}

const scrollToNumbers = (): void => {

  const section = document.querySelector('.about') as HTMLElement

  if (section && screen.height >= section.getBoundingClientRect().top) {

    setOutNumber(section)

    document.removeEventListener('scroll', scrollToNumbers as EventListener)

  }

}

const init = (): void => {

  document.addEventListener('scroll', scrollToNumbers as EventListener)

}

export default { init }