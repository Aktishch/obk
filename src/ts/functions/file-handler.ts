const init = (input: HTMLInputElement, error: HTMLElement): boolean => {

  if ((input.files as FileList).length == 0) {

    error.classList.remove('anim--fade')
    error.innerText = 'Пожалуйста, загрузите изображение!'
    return false

  } else if (!['image/jpeg', 'image/png', 'image/gif'].includes((input.files as FileList)[0].type)) {

    error.classList.remove('anim--fade')
    error.innerText = 'Только изображения!'
    return false

  } else if ((input.files as FileList)[0].size > 2 * Math.pow(1024, 2)) {

    error.classList.remove('anim--fade')
    error.innerText = 'Размер не более 2 мб!'
    return false

  } else {

    error.classList.add('anim--fade')
    return true

  }

}

export default { init }