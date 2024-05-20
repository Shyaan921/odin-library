const myLibrary = [
    
];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toggleRead() {
        if (this.status === 'read') {
            this.status = 'not read'
        } else {
            this.status = 'read'
        };
    }
}

function addToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
};

function displayLibrary() {
    let container = document.querySelector('.container');
    container.innerHTML = "";

    for (each in myLibrary) {

        let card = document.createElement('div');
        card.classList = 'card';
        card.setAttribute('dataIndex', each)

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList = 'delete';
        deleteBtn.value = each;

        let titlePara = document.createElement('div');
        titlePara.innerText = "Title: " + myLibrary[each].title;

        let authorPara = document.createElement('div');
        authorPara.innerText = "Author: " + myLibrary[each].author;

        let pagesPara = document.createElement('div');
        pagesPara.innerText = "Pages: " + myLibrary[each].pages;

        let changeBtn = document.createElement('button')
        changeBtn.classList = "change";
        changeBtn.value = each;
        if (myLibrary[each].status === 'read') {
            changeBtn.innerText = "read";
            changeBtn.classList = 'read'
        } else {
            changeBtn.innerText = "not read";
            changeBtn.classList = 'not-read'
        };

        card.appendChild(deleteBtn)
        deleteBook(deleteBtn);
        card.appendChild(titlePara);
        card.appendChild(authorPara);
        card.appendChild(pagesPara);
        card.appendChild(changeBtn)
        toggle(changeBtn);

        container.append(card);
    }
};

let dialog = document.querySelector('dialog');
let btn = document.querySelector('.add').addEventListener('click', function() {
    dialog.showModal();
});
    

let closeBtn = document.querySelector('.close').addEventListener('click', function(e) {
    e.preventDefault();
    dialog.close();
    let formTitle = document.getElementById('title').value;
    let formAuthor = document.getElementById('author').value;
    let formPages = document.getElementById('pages').value;
    let formStatus;
    if (document.querySelector('input[type="radio"]:checked')) {
        formStatus = 'read';
    } else {
        formStatus = 'not-read'
    };

    let form = document.querySelector('form').reset();
    addToLibrary(formTitle, formAuthor, formPages, formStatus);
    displayLibrary();
})

function deleteBook(button) {
    button.addEventListener('click', function() {
        myLibrary.splice(button.value, 1)
        displayLibrary();
    });
}

function toggle(button) {
    button.addEventListener('click', function() {
        let index = button.value;
        myLibrary[index].toggleRead();
        console.log(myLibrary[index])

        if (button.innerText === 'read') {
            button.innerText = 'not read'
            button.classList = 'not-read'
        } else {
            button.innerText = 'read';
            button.classList = 'read';
        }
    });
};