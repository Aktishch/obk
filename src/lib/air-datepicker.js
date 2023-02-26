import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import localeRu from 'air-datepicker/locale/ru'
import touchDevice from '../ts/functions/touch-device'

const init = () => {

  const datepickers = document.querySelectorAll('*[data-datepicker]')

  datepickers.forEach(datepicker => {

    if (!datepicker) return

    const inputMin = datepicker.querySelector('*[data-input="min"]')
    const inputMax = datepicker.querySelector('*[data-input="max"]')

    let min = new AirDatepicker(inputMin, {

      onSelect({ date }) {

        max.update({

          minDate: date

        })

      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMin.dataset.position || 'bottom left'

    })

    let max = new AirDatepicker(inputMax, {

      onSelect({ date }) {

        min.update({

          maxDate: date

        })

      },

      locale: localeRu,
      isMobile: touchDevice.init(),
      autoClose: true,
      minDate: new Date(),
      position: inputMax.dataset.position || 'bottom left'

    })

  })

}

export default { init }