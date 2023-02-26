import { coordinates } from './coordinates'

const init = (): coordinates => {

  const coordinates: coordinates = {

    top: (window && window.scrollY && window.self.pageYOffset) || (document.documentElement && document.documentElement.scrollTop),
    left: (window && window.scrollX && window.self.pageXOffset) || (document.documentElement && document.documentElement.scrollLeft)

  }

  return coordinates

}

export default { init }