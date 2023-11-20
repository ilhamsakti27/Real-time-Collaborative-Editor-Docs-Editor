/* eslint-disable */

export function qwerty() {
  console.log('Hello World!!!')

  const tableWrapper = document.getElementsByClassName('tableWrapper')

  if (tableWrapper !== null) {
    // tambahkan elemen "div" ke setiap element dengan class ".tableWrapper"
    for (const element of tableWrapper) {
      // create div element
      const div = document.createElement('div')
      div.innerText = 'Hello World'

      // append div in table wrapper
      element.appendChild(div)

      element.style.backgroundColor = 'blue'
      console.log(element)
    }

  } else {
    console.log('TIdak ada komponen table wrapper')

  }
}
