// eslint-disable-next-line prefer-const
let myLibrary = []
const bookList = document.getElementById('bookList')
// const newBookButton = document.getElementById('newBookButton')
const newContainer = document.getElementById('newContainer')
// newBookButton.addEventListener('click', getBookInfo)

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

function makeBookButton () {
  while (newContainer.lastElementChild) {
    newContainer.removeChild(newContainer.lastElementChild)
  }
  const newBookButton = document.createElement('button')
  newBookButton.setAttribute('id', 'newBookButton')
  newBookButton.appendChild(document.createTextNode('Add Book'))
  newBookButton.type = 'button'
  newContainer.appendChild(newBookButton)
  newBookButton.addEventListener('click', makeBookForm)
}
makeBookButton()

function makeBookForm () {
  while (newContainer.lastElementChild) {
    newContainer.removeChild(newContainer.lastElementChild)
  }

  const newBookForm = document.createElement('form')
  newBookForm.setAttribute('id', 'newBookForm')
  newBookForm.setAttribute('id', 'newBookForm')
  newBookForm.type = 'text'

  const newBookInput = document.createElement('input')
  newBookInput.setAttribute('id', 'newBookInput')
  newBookForm.appendChild(newBookInput)
  newContainer.appendChild(newBookForm)

  let placeholderIdx = 0
  function changePlaceholder () {
    switch (placeholderIdx) {
      case 0:
        newBookInput.placeholder = 'Title'
        newBookInput.required = true
        break
      case 1:
        newBookInput.placeholder = 'Author'
        newBookInput.required = true
        break
      case 2:
        newBookInput.placeholder = 'Pages'
        newBookInput.required = true
        newBookInput.type = 'number'
        newBookInput.min = 1
        newBookInput.max = 10000
        break
      case 3:
        newBookInput.placeholder = 'Done? (yes/no)'
        newBookInput.required = true
        newBookInput.type = 'text'
        newBookInput.pattern = '[Yy]es|[Nn]o'
        break
    }
    placeholderIdx++
  }
  changePlaceholder()
  newBookInput.focus()

  // eslint-disable-next-line prefer-const
  let finalBook = []

  newBookForm.addEventListener('submit', () => {
    finalBook.push(newBookInput.value)
    console.log(finalBook)
    changePlaceholder()
    newBookInput.value = ''
    newBookInput.focus()
    event.preventDefault()

    if (finalBook.length === 4) {
      const newBook = new Book(finalBook[0], finalBook[1], finalBook[2], finalBook[3])
      myLibrary.push(newBook)
      updateLibrary()
      makeBookButton()
    }
  })
}
