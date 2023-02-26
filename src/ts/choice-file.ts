import formValidate from './functions/form-validate'
import fileHandler from './functions/file-handler'
import dialog from './functions/dialog'

const choiceFile = (event: Event): void => {

  const form = (event.target as HTMLInputElement).closest('[data-form]') as HTMLFormElement
  const download = form.querySelector('*[data-label="download"]') as HTMLElement
  const input = download.querySelector('*[data-input="file"]') as HTMLInputElement
  const error = download.querySelector('*[data-error]') as HTMLElement
  const image = download.querySelector('*[data-file="image"]') as HTMLImageElement

  fileHandler.init(input, error)

  if (!image) return

  const file: File = (input.files as FileList)[0]
  const readFile: FileReader = new FileReader()

  file ? readFile.readAsDataURL(file) : image.src = ''

  readFile.addEventListener('loadend', ((): void => {

    if (!formValidate.init(form)) return

    if (form.dataset.form == 'avatar') {

      const formData: FormData = new FormData(form)
      const requestUrl: string = '/ajax/submit-handler.php'
      const avatar = document.querySelector('*[data-avatar]') as HTMLImageElement

      dialog.open('fancybox-loading', '/dialogs/loading.html')

      fetch(requestUrl, {

        method: 'POST',
        body: formData

      }).then((response: Response): void => {

        response.text()

      }).then((): void => {

        image.src = String(readFile.result)
        avatar.src = String(readFile.result)

        dialog.close()

      }).catch((error: string): void =>

        console.log('The form has not been sent', error)

      )

    } else {

      image.src = String(readFile.result)

    }

  }) as EventListener)

}

const init = (): void => {

  document.addEventListener('change', ((event: Event): void => {

    if ((event.target as HTMLInputElement).getAttribute('data-input') == 'file') choiceFile(event)

  }) as EventListener)

}

export default { init }