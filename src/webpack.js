// Libraries
import fancybox from './lib/fancybox'
import sliderSwiper from './lib/slider-swiper'

// Scripts
import scrollHeader from './ts/scroll-header'
import mobileMenu from './ts/mobile-menu'
import animation from './ts/animation'
import waved from './ts/waved'
import listing from './ts/listing'
import accordion from './ts/accordion'
import filter from './ts/filter'
import outNumber from './ts/out-number'
import formSubmit from './ts/form-submit'
import inputs from './ts/inputs'
import maskTel from './ts/mask-tel'
import catalog from './ts/catalog'

// Style
import './scss/index.scss'

// Connection
window.addEventListener('DOMContentLoaded', () => {

  fancybox.init()
  sliderSwiper.init()
  scrollHeader.init()
  mobileMenu.init()
  animation.init()
  waved.init()
  listing.init()
  accordion.init()
  filter.init()
  outNumber.init()
  formSubmit.init()
  inputs.init()
  maskTel.init()
  catalog.init()

})