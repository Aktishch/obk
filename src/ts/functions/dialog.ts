declare global {

  interface Window {

    Fancybox: any

  }

}

const open = (dialogName: string, requestUrl: string): void => {

  window.Fancybox.show(

    [{ src: requestUrl, type: 'ajax' }],

    { dragToClose: false, mainClass: dialogName }

  )

}

const close = (): void => {

  window.Fancybox.close()

}

export default { open, close }