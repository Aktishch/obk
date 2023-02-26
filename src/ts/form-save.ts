const formSave = (id: string): void => {

  const form = document.querySelector(`#${id}`) as HTMLFormElement

  if (!form) return

  const inputs = form.querySelectorAll('*[data-input]') as NodeListOf<Element>

  let formData: object = {}

  if (sessionStorage.getItem(`${id}`)) {

    formData = JSON.parse(sessionStorage.getItem(`${id}`) || '{}')

    inputs.forEach((element: Element): void => {

      const input = element as HTMLInputElement

      if (input.dataset.input != 'file') {

        for (const key in formData) if (input.name == key) input.value = formData[key]

      }

    })

  }

  form.addEventListener('input', ((): void => {

    inputs.forEach((element: Element): void => {

      const input = element as HTMLInputElement

      if (input.dataset.input != 'file') {

        formData[input.name] = input.value
        sessionStorage.setItem(`${id}`, JSON.stringify(formData))

      }

    })

  }) as EventListener)

}

const init = (): void => {

  formSave('form-data')

}

export default { init }