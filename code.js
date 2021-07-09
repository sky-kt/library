// eslint-disable-next-line prefer-const
let myLibrary = []
const bookList = document.getElementById('bookList')
const addBook = document.getElementById('addBook')

addBook.addEventListener('click', getBookInfo)

function deleteBook (delNum) {
  myLibrary.splice(delNum, 1)
  updateLibrary()
}

function changeStatus (index) {
  if (myLibrary[index].readStatus === 'yes') {
    myLibrary[index].readStatus = 'no'
    console.log(myLibrary[index].readStatus)
  } else myLibrary[index].readStatus = 'yes'
  updateLibrary()
}

function getBookInfo () {
  const author = prompt('Author?')
  const title = prompt('Title?')
  const pageNumbers = prompt('Amount of pages?')
  let readStatus
  do {
    readStatus = prompt('Has it been read?\nAnswer with yes or no.')
  } while (readStatus !== 'yes' && readStatus !== 'no')
  const newBook = new Book(author, title, pageNumbers, readStatus)
  myLibrary.push(newBook)
  updateLibrary()
}

function Book (author, title, pageNumbers, readStatus) {
  this.author = author
  this.title = title
  this.pageNumbers = pageNumbers
  this.readStatus = readStatus
}

function updateLibrary () {
  let buttonCounter = 0
  bookList.textContent = ''
  for (const book in myLibrary) {
    const bookCharacteristics = Object.values(myLibrary[book])
    const newBook = document.createElement('div')

    for (let characteristic = 0; characteristic < bookCharacteristics.length - 1; characteristic++) {
      const trait = document.createElement('div')
      const traitText = document.createTextNode(bookCharacteristics[characteristic])
      trait.appendChild(traitText)
      newBook.appendChild(trait)
    }

    newBook.className = 'indivBook'
    const deleteButton = makeDeleteButton()
    const statusButton = makeStatusButton(myLibrary[book].readStatus)
    statusButton.id = `status${buttonCounter}`
    deleteButton.id = `del${buttonCounter}`
    buttonCounter++

    newBook.appendChild(statusButton)
    newBook.appendChild(deleteButton)
    bookList.appendChild(newBook)
  }
  activateButtons()
}

function makeStatusButton (currentStatus) {
  const statusButton = document.createElement('button')
  let statusButtonText
  if (currentStatus === 'yes') {
    statusButtonText = document.createTextNode('yes')
  } else statusButtonText = document.createTextNode('no')
  statusButton.appendChild(statusButtonText)
  statusButton.className = 'statusButton'
  return statusButton
}

function makeDeleteButton () {
  const deleteButton = document.createElement('button')
  const deleteButtonText = document.createTextNode('Delete')
  deleteButton.appendChild(deleteButtonText)
  deleteButton.className = 'deleteButton'
  return deleteButton
}

function activateButtons () {
  document.querySelectorAll('.deleteButton').forEach(item => {
    item.addEventListener('click', event => {
      deleteBook(item.id.replace('del', ''))
    })
  })
  document.querySelectorAll('.statusButton').forEach(item => {
    item.addEventListener('click', event => {
      changeStatus(item.id.replace('status', ''))
    })
  })
}
