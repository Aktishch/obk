const init = (): void => {

  const social = document.querySelector('*[data-social]') as HTMLElement

  if (!social) return

  const round = social.querySelector('*[data-social-round]') as HTMLElement
  const links = social.querySelectorAll('*[data-social-link]') as NodeListOf<Element>
  const btn = social.querySelector('*[data-social-button]') as HTMLButtonElement

  let lastTap: number

  const doubleTap = (): void => {

    const timeSince: number = new Date().getTime() - lastTap

    if ((timeSince < 300) && (timeSince > 0)) {

      if (round.dataset.socialRound == 'hidden') {

        round.dataset.socialRound = 'show'
        round.classList.remove('fade-0')

      } else {

        round.dataset.socialRound = 'hidden'
        round.classList.add('fade-0')

      }
    }

    lastTap = new Date().getTime()

  }

  for (let i: number = 0; i < links.length; i++) {

    const network = links[i] as HTMLAnchorElement

    network.style.top = (42 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / links.length) * i * Math.PI)).toFixed(4) + '%'
    network.style.left = (42 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / links.length) * i * Math.PI)).toFixed(4) + '%'

  }

  btn.addEventListener('click', doubleTap as EventListener)
  btn.addEventListener('touchstart', doubleTap as EventListener)

}

export default { init }