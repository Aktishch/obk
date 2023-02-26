const quantityDecrease = (event: InputEvent): void => {

  const quantity = (event.target as HTMLButtonElement).closest('[data-quantity]') as HTMLElement
  const input = quantity.querySelector('*[data-input]') as HTMLInputElement

  let value: number = Number(input.value)

  --value
  input.value = String(value)

  if (value < 1) input.value = '1'

}

const quantityIncrease = (event: InputEvent): void => {

  const quantity = (event.target as HTMLButtonElement).closest('[data-quantity]') as HTMLElement
  const input = quantity.querySelector('*[data-input]') as HTMLInputElement

  let value: number = Number(input.value)

  ++value
  input.value = String(value)

}

const init = (): void => {

  document.addEventListener('click', ((event: InputEvent): void => {

    if ((event.target as HTMLElement).closest('[data-quantity-decrease]')) quantityDecrease(event)

    if ((event.target as HTMLElement).closest('[data-quantity-increase]')) quantityIncrease(event)

  }) as EventListener)

}

export default { init }