const checkQuizSlide = (slide: HTMLElement): void => {

  const quiz = slide.closest('[data-quiz]') as HTMLElement

  const inputs: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[] = [

    ...slide.querySelectorAll('input'),
    ...slide.querySelectorAll('select'),
    ...slide.querySelectorAll('textarea')

  ]

  let empty: boolean = true

  for (const index in inputs) {

    if (!Object.hasOwnProperty.call(inputs, index)) continue

    const input = inputs[index] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

    if (input.type == 'checkbox' || input.type == 'radio') {

      if ((input as HTMLInputElement).checked != false) {

        empty = false
        break

      }

    } else if (input.value != '') {

      empty = false
      break

    }

  }

  empty ? quiz.dataset.quiz = 'stop' : quiz.dataset.quiz = 'auto'

}

const init = (): void => {

  document.addEventListener('input', ((event: InputEvent) => {

    if ((event.target as HTMLInputElement).closest('[data-quiz-slide]')) {

      const input = event.target as HTMLInputElement
      const slide = input.closest('[data-quiz-slide]') as HTMLElement

      checkQuizSlide(slide)
    }

  }) as EventListener)

}

export default { init, checkQuizSlide }