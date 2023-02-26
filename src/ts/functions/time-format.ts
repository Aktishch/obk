const init = (number: number): string => {

  if (number < 10 || number == 0) {

    return `0${number}`

  } else {

    return `${number}`

  }

}

export default { init }