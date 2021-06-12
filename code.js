let myLibrary = [];

let bookList = document.getElementById("bookList")
let addBook = document.getElementById("addBook")

addBook.addEventListener("click", getBookInfo);

function deleteBook(delNum) {
    myLibrary.splice(delNum, 1)
    updateLibrary()
}

function changeStatus(index) {
    if(myLibrary[index].readStatus === 'yes') {
        myLibrary[index].readStatus = 'no'
        console.log(myLibrary[index].readStatus)
    } else myLibrary[index].readStatus = 'yes'
    updateLibrary()
}


function getBookInfo() {
    let author = prompt("Author?")
    let title = prompt("Title?")
    let pageNumbers = prompt("Amount of pages?")
    let readStatus
    do {
        readStatus = prompt("Has it been read?\nAnswer with yes or no.")
    } while (readStatus != 'yes' && readStatus != 'no');
    let newBook = new Book(author, title, pageNumbers, readStatus)
    myLibrary.push(newBook)
    updateLibrary()
    console.log(myLibrary)
}

function Book(author, title, pageNumbers, readStatus) {
    this.author = author
    this.title = title
    this.pageNumbers = pageNumbers
    this.readStatus = readStatus
}

function updateLibrary() {
    let buttonCounter = 0
    bookList.textContent = '';
    for(let book in myLibrary) {
        let bookCharacteristics = Object.values(myLibrary[book])
        let newBook = document.createElement("div")
        for(let characteristic = 0; characteristic < bookCharacteristics.length - 1; characteristic++) {
            let trait = document.createElement("div")
            let traitText = document.createTextNode(bookCharacteristics[characteristic])
            trait.appendChild(traitText)
            newBook.appendChild(trait)
        }
        newBook.className = "indivBook"
        let deleteButton = makeDeleteButton()
        let statusButton = makeStatusButton(myLibrary[book].readStatus)

        statusButton.id = `status${buttonCounter}`
        deleteButton.id = `del${buttonCounter}`
        buttonCounter++
        
        newBook.appendChild(statusButton)
        newBook.appendChild(deleteButton)        

        bookList.appendChild(newBook)
    }
    activateButtons()
}


function makeStatusButton(currentStatus) {
    let statusButton = document.createElement("button")
    let statusButtonText 
    if(currentStatus === "yes") {
        statusButtonText = document.createTextNode("yes")
    } else statusButtonText = document.createTextNode("no")
    statusButton.appendChild(statusButtonText)
    statusButton.className = "statusButton"
    return statusButton
}

function makeDeleteButton() {
    let deleteButton = document.createElement("button")
    let deleteButtonText = document.createTextNode("Delete")
    deleteButton.appendChild(deleteButtonText)
    deleteButton.className = "deleteButton"
    return deleteButton
}

function activateButtons() {
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