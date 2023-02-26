const writeText = (section: HTMLElement): void => {

  const record = section.querySelector('*[data-record]') as HTMLElement

  if (!record) return

  const recordText: string = String(record.dataset.record)
  const recordSpeed: number = record.dataset.recordSpeed ? Number(record.dataset.recordSpeed) : 30
  const letters: string[] = [recordText].join('').split('')

  const interval: NodeJS.Timer = setInterval((): void => {

    if (!letters[0]) return clearInterval(interval)

    record.innerHTML += letters.shift()

  }, recordSpeed != undefined ? recordSpeed : 100)

}

const scrollToText = (): void => {

  const section = document.querySelector('*[data-section]') as HTMLElement

  if (section && screen.height >= section.getBoundingClientRect().top) {

    writeText(section)

    document.removeEventListener('scroll', scrollToText as EventListener)

  }

}

const init = (): void => {

  document.addEventListener('scroll', scrollToText as EventListener)

}

export default { init }