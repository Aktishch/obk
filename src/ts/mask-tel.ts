const phoneMask = (event: Event): void => {

  const input = event.target as HTMLInputElement
  const matrix: string = '+7 (___) ___-__-__'
  const replace: string = matrix.replace(/\D/g, '')

  let values: string = input.value.replace(/\D/g, '')
  let length: number = 0

  if (replace.length >= values.length) values = replace

  input.value = matrix.replace(/./g, (value: string): string => {

    return /[_\d]/.test(value) && length < values.length ? values.charAt(length++) : length >= values.length ? '' : value

  })

  input.addEventListener('blur', ((): void => {

    if (input.value.length == 2) input.value = ''

  }) as EventListener)

}

const init = (): void => {

  document.addEventListener('input', ((event: InputEvent): void => {

    if ((event.target as HTMLInputElement).getAttribute('type') == 'tel') phoneMask(event)

  }) as EventListener)

}

export default { init }