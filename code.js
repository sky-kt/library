let myLibrary = [];

let bookList = document.getElementById("bookList")
let addBook = document.getElementById("addBook")
let deleteButton = document.getElementsByClassName("deleteButton")

addBook.addEventListener("click", getBookInfo);

function deleteBook(delNum) {
    myLibrary.splice(delNum, 1)
    updateLibrary()
}


function getBookInfo() {
    let author = prompt("Author?")
    let title = prompt("Title?")
    let pageNumbers = prompt("Amount of pages?")
    let hasBeenRead = prompt("Has it been read?")
    let newBook = new Book(author, title, pageNumbers, hasBeenRead)
    myLibrary.push(newBook)
    console.log(newBook)
    updateLibrary()
}

function Book(author, title, pageNumbers, hasBeenRead) {
    this.author = author
    this.title = title
    this.pageNumbers = pageNumbers
    this.hasBeenRead = hasBeenRead
}

function updateLibrary() {
    let deleteButtonCounter = 0
    bookList.textContent = '';
    for(let book in myLibrary) {
        let bookCharacteristics = Object.values(myLibrary[book])
        let newBook = document.createElement("div")
        for(characteristic in bookCharacteristics) {
            let trait = document.createElement("div")
            let traitText = document.createTextNode(bookCharacteristics[characteristic])
            trait.appendChild(traitText)
            newBook.appendChild(trait)
        }
        newBook.className = "indivBook"
        let deleteButton = makeDeleteButton()
        deleteButton.id = `del${deleteButtonCounter++}`
        newBook.appendChild(deleteButton)        
        bookList.appendChild(newBook)
    }
    activiateDeleteButton()
}

function makeDeleteButton() {
    let deleteButton = document.createElement("button")
    let deleteButtonText = document.createTextNode("Delete")
    deleteButton.appendChild(deleteButtonText)
    deleteButton.className = "deleteButton"
    return deleteButton
}

function activiateDeleteButton() {
    document.querySelectorAll('.deleteButton').forEach(item => {
        item.addEventListener('click', event => {
            console.log(item.id)
            deleteBook(item.id.replace('del', ''))
        })
    })
}