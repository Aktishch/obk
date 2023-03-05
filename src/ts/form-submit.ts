import formValidate from './functions/form-validate'
import dialog from './functions/dialog'

const formSubmit = (event: Event): void => {

  event.preventDefault()

  const form = event.target as HTMLFormElement

  if (!formValidate.init(form)) return

  const formData: FormData = new FormData(form)
  const requestUrl: string = '/ajax/submit-handler.php'
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement

  submitBtn.setAttribute('disabled', 'disabled')

  dialog.open('fancybox-loading', '/dialogs/loading.html')

  fetch(requestUrl, {

    method: 'POST',
    body: formData

  }).then((response: Response): void => {

    response.text()

  }).then((): void => {

    dialog.close()

    dialog.open('fancybox-dialog', '/dialogs/dialog-submit.html')

    form.reset()

    submitBtn.removeAttribute('disabled')

  }).catch((error: string): void =>

    console.log('The form has not been sent', error)

  )

}

const init = (): void => {

  document.addEventListener('submit', ((event: Event): void => {

    if ((event.target as HTMLFormElement).getAttribute('data-form') == 'submit') formSubmit(event)

  }) as EventListener)

}

export default { init }