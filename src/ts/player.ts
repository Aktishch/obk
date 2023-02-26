import scrollbar from './functions/scrollbar'
import timeFormat from './functions/time-format'

interface compositionCondition {

  status: string,
  time: number,
  index: number

}

type playlistDetail = {

  artist: string,
  song: string,
  audio: string,
  poster: string

}

const playlist: playlistDetail[] = [

  {

    artist: 'Slipknot',
    song: 'Snuff',
    audio: 'https://mp3minusovki.com/music/fhvndfjwserjgt/247bab1c312b2335afe3f5c9b496a3d3/01d63b016f64e0739a9e3d2599b6521f.mp3',
    poster: 'https://picsum.photos/600/400?random=1'

  },

  {

    artist: 'System of a down',
    song: 'Lonely Day',
    audio: 'https://cdn1.shadam.net/uploads/files/2018-09/1536003683_system-of-a-down-lonely-day.mp3',
    poster: 'https://picsum.photos/600/400?random=2'

  },

  {

    artist: 'Scorpions',
    song: 'Slave Me',
    audio: 'https://ruo.morsmusic.org/load/941771577/Scorpions_-_Slave_Me_(musmore.com).mp3',
    poster: 'https://picsum.photos/600/400?random=3'

  }

]

const setPlayer = (id: string, playlist: playlistDetail[]): void => {

  const player = document.querySelector(`#${id}`) as HTMLElement

  if (!player) return

  const compositions = player.querySelectorAll('*[data-player-composition]') as NodeListOf<Element>
  const poster = player.querySelector('*[data-player-poster]') as HTMLImageElement
  const artist = player.querySelector('*[data-player-artist]') as HTMLElement
  const song = player.querySelector('*[data-player-song]') as HTMLElement
  const audio = player.querySelector('*[data-player-audio]') as HTMLAudioElement
  const progress = player.querySelector('*[data-player-progress]') as HTMLElement
  const range = player.querySelector('*[data-player-range]') as HTMLElement
  const play = player.querySelector('*[data-player-play]') as HTMLButtonElement
  const loading = play.querySelector('*[data-player-loading]') as SVGElement
  const status = play.querySelector('*[data-player-status]') as SVGElement
  const icon = status.querySelector('use') as SVGUseElement
  const prev = player.querySelector('*[data-player-prev]') as HTMLButtonElement
  const next = player.querySelector('*[data-player-next]') as HTMLButtonElement
  const start = player.querySelector('*[data-player-start]') as HTMLElement
  const end = player.querySelector('*[data-player-end]') as HTMLElement
  const volume = player.querySelector('*[data-player-volume]') as HTMLButtonElement

  let active: boolean = false
  let index: number = 0
  let minutes: number = 0
  let seconds: number = 0

  let condition: compositionCondition = {

    status: 'pause',
    time: 0,
    index: 0

  }

  const setComposition = (index: number): void => {

    if (artist) artist.innerText = playlist[index].artist

    if (song) song.innerText = playlist[index].song

    if (audio) audio.src = playlist[index].audio

    if (poster) poster.src = playlist[index].poster

  }

  const currentComposition = (): void => {

    compositions.forEach((element: Element): void => {

      const composition = element as HTMLButtonElement

      if (!composition) return

      const compositionIndex: number = Number(composition.dataset.playerComposition)
      const compositionStatus = composition.querySelector('*[data-player-status]') as SVGElement
      const compositionIcon = compositionStatus.querySelector('use') as SVGUseElement

      if (audio.played) {

        if (compositionIndex == index) {

          compositionIcon.setAttribute('xlink:href', 'img/icons.svg#pause')

        } else {

          compositionIcon.setAttribute('xlink:href', 'img/icons.svg#play')

        }

      }

      if (audio.paused) {

        compositionIcon.setAttribute('xlink:href', 'img/icons.svg#play')

      }

    })

  }

  const statusComposition = (): void => {

    if (audio.paused) {

      audio.play()

      icon.setAttribute('xlink:href', 'img/icons.svg#pause')

      currentComposition()

      condition.status = 'play'

    } else {

      audio.pause()

      icon.setAttribute('xlink:href', 'img/icons.svg#play')

      currentComposition()

      condition.status = 'pause'

    }

    condition.index = index

  }

  const randomComposition = (): void => {

    if (player.dataset.player == 'random') {

      index = Math.floor(Math.random() * playlist.length)

    }

  }

  const nextComposition = (): void => {

    index++

    if (index > playlist.length - 1) index = 0

    randomComposition()
    setComposition(index)
    statusComposition()

  }

  const prevComposition = (): void => {

    index--

    if (index < 0) index = playlist.length - 1

    randomComposition()
    setComposition(index)
    statusComposition()

  }

  const setProgress = (clickX: number): void => {

    const width: number = progress.clientWidth
    const duration: number = audio.duration

    audio.currentTime = (clickX / width) * duration

  }

  const progressStart = (event: Event): void => {

    if ((event.target as HTMLElement).closest('[data-player-progress]')) {

      scrollbar.hidden()

      active = true

    }

  }

  const progressEnd = (): void => {

    scrollbar.show()

    active = false

  }

  const progressMove = (event: Event): void => {

    if (!active) return

    if ((event.target as HTMLElement).closest('[data-player-controls]')) {

      if (event.type === 'mousemove') {

        const clickX: number = (event as MouseEvent).offsetX

        setProgress(clickX)

      } else {

        for (let i: number = 0; i < (event as TouchEvent).changedTouches.length; i++) {

          const clickX: number = (event as TouchEvent).changedTouches[i].pageX - progress.getBoundingClientRect().left

          setProgress(clickX)

        }

      }

      event.stopPropagation()
      event.preventDefault()

    }

  }

  const audioLoad = (event: Event): void => {

    compositions.forEach((element: Element): void => {

      const composition = element as HTMLButtonElement

      if (!composition) return

      const compositionIndex: number = Number(composition.dataset.playerComposition)
      const compositionLoading = composition.querySelector('*[data-player-loading]') as SVGElement
      const compositionStatus = composition.querySelector('*[data-player-status]') as SVGElement

      if (event.type === 'loadstart') {

        play.classList.add('pointer-none')
        loading.classList.remove('d-none')
        status.classList.add('d-none')

        if (compositionIndex == index) {

          composition.classList.add('pointer-none')
          compositionLoading.classList.remove('d-none')
          compositionStatus.classList.add('d-none')

        }

      }

      if (event.type === 'loadeddata') {

        play.classList.remove('pointer-none')
        loading.classList.add('d-none')
        status.classList.remove('d-none')
        composition.classList.remove('pointer-none')
        compositionLoading.classList.add('d-none')
        compositionStatus.classList.remove('d-none')

      }

    })

  }

  const audioTiming = (type: string, time: HTMLElement): void => {

    if (type == 'timeupdate') {

      minutes = Math.floor(audio.currentTime / 60)
      seconds = Math.floor(audio.currentTime % 60)

    }

    if (type == 'loadedmetadata') {

      minutes = Math.floor(audio.duration / 60)
      seconds = Math.floor(audio.duration % 60)

    }

    if (time) time.innerText = `${timeFormat.init(minutes)}:${timeFormat.init(seconds)}`

  }

  const audioStart = (event: Event): void => {

    range.style.width = `${(audio.currentTime / audio.duration) * 100}%`

    audioTiming(event.type, start)

    condition.time = audio.currentTime

    sessionStorage.setItem(`${id}`, JSON.stringify(condition))

  }

  const audioEnd = (): void => {

    audio.addEventListener('loadedmetadata', ((event: Event): void => {

      audioTiming(event.type, end)

    }) as EventListener)

  }

  const audioPause = (): void => {

    icon.setAttribute('xlink:href', 'img/icons.svg#play')

    currentComposition()

  }

  setComposition(index)

  if (start) start.innerText = '00:00'

  if (end) end.innerText = '00:00'

  if (sessionStorage.getItem(`${id}`)) {

    condition = JSON.parse(sessionStorage.getItem(`${id}`) || '{}')
    index = condition.index

    if (index == null || index == undefined) index = 0

    setComposition(index)

    audio.currentTime = condition.time

    if (condition.status == 'play') {

      statusComposition()

      if (audio.paused) audioPause()

    }

  }

  compositions.forEach((element: Element): void => {

    const composition = element as HTMLButtonElement

    if (!composition) return

    const compositionIndex = Number(composition.dataset.playerComposition)

    composition.addEventListener('click', ((): void => {

      if (compositionIndex != index) {

        index = compositionIndex

        setComposition(index)

      }

      statusComposition()

    }) as EventListener)

  })

  if (volume) {

    volume.addEventListener('click', ((): void => {

      const volumeStatus = volume.querySelector('svg') as SVGSVGElement
      const volumeIcon = volumeStatus.querySelector('use') as SVGUseElement

      if (volume.dataset.playerVolume == 'on') {

        volume.dataset.playerVolume = 'off'
        volumeStatus.classList.add('fade-50')
        volumeIcon.setAttribute('xlink:href', 'img/icons.svg#volume-off')
        audio.volume = 0

      } else {

        volume.dataset.playerVolume = 'on'
        volumeStatus.classList.remove('fade-50')
        volumeIcon.setAttribute('xlink:href', 'img/icons.svg#volume-on')
        audio.volume = 1

      }

    }) as EventListener)

  }

  play.addEventListener('click', statusComposition as EventListener)
  next.addEventListener('click', nextComposition as EventListener)
  prev.addEventListener('click', prevComposition as EventListener)

  progress.addEventListener('click', ((event: MouseEvent): void => {

    const clickX: number = event.offsetX

    setProgress(clickX)

  }) as EventListener)

  player.addEventListener('mousedown', progressStart as EventListener)
  player.addEventListener('mouseup', progressEnd as EventListener)
  player.addEventListener('mouseleave', progressEnd as EventListener)
  player.addEventListener('mousemove', progressMove as EventListener)

  player.addEventListener('touchstart', progressStart as EventListener)
  player.addEventListener('touchend', progressEnd as EventListener)
  player.addEventListener('touchcancel', progressEnd as EventListener)
  player.addEventListener('touchmove', progressMove as EventListener)

  audio.addEventListener('loadstart', audioLoad as EventListener)
  audio.addEventListener('loadeddata', audioLoad as EventListener)
  audio.addEventListener('timeupdate', audioStart as EventListener)
  audio.addEventListener('timeupdate', audioEnd as EventListener)
  audio.addEventListener('ended', nextComposition as EventListener)
  audio.addEventListener('pause', audioPause as EventListener)

}

const playOnlyOne = (event: Event): void => {

  const audios = document.querySelectorAll('audio') as NodeListOf<HTMLAudioElement>

  for (let i: number = 0; i < audios.length; i++) {

    const audio = audios[i] as HTMLAudioElement

    if (audio !== event.target) audio.pause()

  }

}

const init = (): void => {

  setPlayer('player', playlist)

  document.addEventListener('play', playOnlyOne as EventListener, true)

}

export default { init }