const canUseWebp = (): boolean => {

  const canvas = document.createElement('canvas') as HTMLCanvasElement

  if (!!(canvas.getContext && canvas.getContext('2d'))) return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0

  return false

}

const createBackground = (data: string): void => {

  const items = document.querySelectorAll(`*[${data}]`) as NodeListOf<Element>

  items.forEach((element: Element): void => {

    const item = element as HTMLElement

    if (!item) return

    const src: string = String(item.getAttribute(`${data}`))

    item.style.backgroundImage = `url('${src}')`

  })

}

const init = (): void => {

  const firefox: RegExpMatchArray | null = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./)
  const firefoxVersion: number = firefox ? Number(firefox[1]) : 0

  createBackground('data-bg')

  if (canUseWebp() || firefoxVersion >= 65) createBackground('data-bg-webp')

}

export default { init }