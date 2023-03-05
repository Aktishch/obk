import scrollbar from './functions/scrollbar'

const init = (): void => {

  const catalog = document.querySelector('*[data-catalog]') as HTMLElement

  if (!catalog) return

  const search = catalog.querySelector('*[data-catalog-search]') as HTMLButtonElement
  const nav = catalog.querySelector('*[data-catalog-nav]') as HTMLElement
  const close = catalog.querySelector('*[data-catalog-close]') as HTMLButtonElement

  const openCatalog = (): void => {

    nav.classList.add('catalog__nav--active')

    scrollbar.hidden()

  }

  const closeCatalog = (): void => {

    nav.classList.remove('catalog__nav--active')

    scrollbar.show()

  }

  search.addEventListener('click', openCatalog as EventListener)
  close.addEventListener('click', closeCatalog as EventListener)

  nav.addEventListener('click', ((event: Event): void => {

    if ((event.target as HTMLAnchorElement).closest('[data-filter-category]')) closeCatalog()

  }) as EventListener)

}

export default { init }