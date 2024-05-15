const myLibrary = [
    
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        if (this.status === 'read') {
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + "already read."  
        } else {
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + "not read yet."
        };
    };
};

Book.prototype.toggleRead = function() {
    if (this.status === 'read') {
        this.status = 'not read'
    } else {
        this.status = 'read'
    };
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
        titlePara.innerText = myLibrary[each].title;

        let authorPara = document.createElement('div');
        authorPara.innerText = "by " + myLibrary[each].author;

        let pagesPara = document.createElement('div');
        pagesPara.innerText = "Pages: " + myLibrary[each].pages;

        let changeBtn = document.createElement('button')
        changeBtn.classList = "change";
        changeBtn.value = each;
        if (myLibrary[each].status === 'read') {
            changeBtn.innerText = "Already read";
        } else {
            changeBtn.innerText = "Not read yet";
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