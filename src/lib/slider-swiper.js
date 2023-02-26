import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import media from '../ts/functions/media'

const init = () => {

  const reviewsSlider = new Swiper('.reviews-slider .swiper', {

    pagination: {

      el: '.reviews-slider .swiper-pagination',
      clickable: true

    },

    navigation: {

      prevEl: '.reviews-slider .swiper-button-prev',
      nextEl: '.reviews-slider .swiper-button-next'

    },

    slidesPerView: 1.2,
    slidesPerGroup: 1,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,

    breakpoints: {

      [media.sm]: {

        slidesPerView: 1.5

      },

      [media.lg]: {

        slidesPerView: 1.8

      },

      [media.xl]: {

        slidesPerView: 2.3,
        centeredSlides: true

      }

    },

    autoplay: {

      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false

    }

  })

  window.Swiper = Swiper

}

export default { init }