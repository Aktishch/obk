const getPosition = (num: number, input: HTMLInputElement, progress: HTMLElement, bubble: HTMLOutputElement): void => {

  const value: number = Number(input.value)
  const min: number = input.min ? Number(input.min) : 0
  const max: number = input.max ? Number(input.max) : 100

  let step: number

  if (num == 0) {

    step = ((value - min) * 100) / (max - min)
    progress.style.left = '0'
    bubble.style.left = `calc(${step}% - (${step * 0.28}px))`

  } else {

    step = ((value - max) * 100) / (min - max)
    progress.style.right = '0'
    bubble.style.right = `calc(${step}% - (${step * 0.28}px))`

  }

  progress.style.width = `calc(${step}% + (${14 - step * 0.28}px))`
  bubble.innerHTML = String(value)

}

const init = (): void => {

  const ranges = document.querySelectorAll('*[data-range]') as NodeListOf<Element>

  ranges.forEach((element: Element): void => {

    const range = element as HTMLElement

    if (!range) return

    const wrappers = range.querySelectorAll('*[data-range-wrapper]') as NodeListOf<Element>
    const first: number = 0
    const last: number = 1

    if (wrappers.length == 1) {

      const output = range.querySelector('*[data-range-output]') as HTMLOutputElement
      const input = range.querySelector('*[data-range-input]') as HTMLInputElement
      const progress = range.querySelector('*[data-range-progress]') as HTMLElement
      const bubble = range.querySelector('*[data-range-bubble]') as HTMLOutputElement

      const changeRange = (): void => {

        getPosition(first, input, progress, bubble)

        output.value = input.value

      }

      changeRange()

      input.addEventListener('input', changeRange as EventListener)

    } else {

      const outputs = range.querySelectorAll('*[data-range-output]') as NodeListOf<Element>

      const firstOutput = outputs[first] as HTMLInputElement
      const firstInput = (wrappers[first] as HTMLElement).querySelector('*[data-range-input]') as HTMLInputElement
      const firstProgress = (wrappers[first] as HTMLElement).querySelector('*[data-range-progress]') as HTMLElement
      const firstBubble = (wrappers[first] as HTMLElement).querySelector('*[data-range-bubble]') as HTMLOutputElement

      const lastOutput = outputs[last] as HTMLInputElement
      const lastInput = (wrappers[last] as HTMLElement).querySelector('*[data-range-input]') as HTMLInputElement
      const lastProgress = (wrappers[last] as HTMLElement).querySelector('*[data-range-progress]') as HTMLElement
      const lastBubble = (wrappers[last] as HTMLElement).querySelector('*[data-range-bubble]') as HTMLOutputElement

      const changeRanges = (): void => {

        getPosition(first, firstInput, firstProgress, firstBubble)
        getPosition(last, lastInput, lastProgress, lastBubble)

      }

      firstOutput.value = firstInput.value
      lastOutput.value = lastInput.value

      changeRanges()

      firstOutput.addEventListener('input', ((): void => {

        if (+firstOutput.value > Number(lastOutput.value)) {

          firstInput.value = firstOutput.value
          lastOutput.value = firstOutput.value
          lastInput.value = lastOutput.value

        }

        firstInput.value = firstOutput.value

        changeRanges()

      }) as EventListener)

      lastOutput.addEventListener('input', ((): void => {

        if (+lastOutput.value < Number(firstOutput.value)) {

          lastInput.value = lastOutput.value
          firstOutput.value = lastOutput.value
          firstInput.value = firstOutput.value

        }

        lastInput.value = lastOutput.value

        changeRanges()

      }) as EventListener)

      firstInput.addEventListener('input', ((): void => {

        if (+firstInput.value > Number(lastInput.value)) {

          lastInput.value = firstInput.value
          lastOutput.value = lastInput.value

        }

        firstOutput.value = firstInput.value

        changeRanges()

      }) as EventListener)

      lastInput.addEventListener('input', ((): void => {

        if (+lastInput.value < Number(firstInput.value)) {

          firstInput.value = lastInput.value
          firstOutput.value = firstInput.value

        }

        lastOutput.value = lastInput.value

        changeRanges()

      }) as EventListener)

    }

  })

}

export default { init }