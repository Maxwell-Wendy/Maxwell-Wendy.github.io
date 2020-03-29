//const myapikey = process.env.GOOGLE_API_KEY;
const myapikey = localStorage.getItem(apikey);
var searchBy = "";
var searchText = "";
var input = "";

class Book {
    constructor(title, author, id, imageURL, description) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.imageURL = imageURL;
        this.description = description;
    }
}

function getBooksByTitle() {
    var xmlhttp = new XMLHttpRequest();

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=10&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[0].value;
    searchText = document.getElementsByName("searchText")[0].value;
    input = searchBy + searchText;
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myBookByTitle = JSON.parse(this.responseText);
            myDisplayFunction(myBookByTitle);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getBooksByAuthor() {
    var xmlhttp = new XMLHttpRequest();

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=10&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[1].value;
    searchText = document.getElementsByName("searchText")[1].value;
    input = searchBy + searchText;
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myBookByAuthor = JSON.parse(this.responseText);
            myDisplayFunction(myBookByAuthor);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function myDisplayFunction(result) { 
    var form = document.getElementById("booklist");
    while (form.hasChildNodes()) {  
        form.removeChild(form.firstChild);
    }

    var details = document.getElementById("details");
    while (details.hasChildNodes()) {  
        details.removeChild(details.firstChild);
    }

    var books = new Array();

    for (var i = 0; i < result.items.length; i++) {
        console.log(result.items[i]);
        var title = result.items[i].volumeInfo.title;
        var author;
        if ("authors" in result.items[i].volumeInfo) {
            var authors = result.items[i].volumeInfo.authors;
            author = authors[0];
        }
        else {
            author = "N/A";
        }
        var id = result.items[i].id;
        var imageURL = "";
        if ("imageLinks" in result.items[i].volumeInfo) {
            if ("thumbnail" in result.items[i].volumeInfo.imageLinks) {
                var imageURL = result.items[i].volumeInfo.imageLinks.thumbnail;
            }
        }
        var description = "";
        if ("description" in result.items[i].volumeInfo) {
            description = result.items[i].volumeInfo.description;
        }
        
        var singleBook = new Book(title, author, id, imageURL, description);

        books[i] = singleBook;

        console.log(books[i].title);

        var book = document.createTextNode(title + ", by " + author);
        form.appendChild(book);
        var addBreak = document.createElement("br");
        form.appendChild(addBreak);

        var elem = document.createElement("input");
        elem.type = "radio";
        elem.name = "book";
        elem.id = id;
        elem.value = i;
        form.insertBefore(elem, book);
    }
    localStorage.setItem("books", JSON.stringify(books));

    var message = document.createElement("p");
    message.innerHTML = "If you would like to see details about a book, select a radio button and...";
    form.appendChild(message);
    
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Click here!";
    btn.onclick = function () {
        displayDetails();
    }
    form.appendChild(btn);
    document.getElementById("output").innerHTML = "Here are the first 10 books from your search.<br><br>";
}

function displayDetails() {
    var form = document.getElementById("booklist");
    var bookId = form.elements["book"].value;

    var details = document.getElementById("details");
    while (details.hasChildNodes()) {  
        details.removeChild(details.firstChild);
    }

    var retrievedBooks = localStorage.getItem("books");

    var bookList = JSON.parse(retrievedBooks);

    var title = bookList[bookId].title;
    var author = bookList[bookId].author;
    var imageURL = bookList[bookId].imageURL;
    var description = bookList[bookId].description;

    console.log("this is the title", title);
    console.log("by " + author);

    var image = document.createElement("img");
    image.src = imageURL;
    image.alt = "Book Image";
    image.id = "spinning";
   
    var t = document.createElement("h3");
    t.innerHTML = title;
    t.id = "bouncing";
    t.onmouseover = "blueVioletText();"
    t.onmouseout = "blackText();"
    var a = document.createElement("p");
    a.innerHTML = "by " + author;
    var desc = document.createElement("p");
    desc.innerHTML = description;
    var addBreak = document.createElement("br");

    details.appendChild(t);
    details.appendChild(addBreak);
    details.appendChild(image);
    details.appendChild(a);
    details.appendChild(addBreak);
    details.appendChild(desc);
}

function blueVioletText() {
    document.getElementById("output").style.color = "blueviolet";
}

function blackText() {
    document.getElementById("output").style.color = "black";
}

function blueVioletBackground1() {
    document.getElementById("displayField").style.backgroundColor = "blueviolet";
    document.getElementById("displayField").style.color = "white";
    document.getElementById("displayField").style.transition = "all 1.5s";
    document.getElementById("moving").style.backgroundColor = "white";
}

function whiteBackground1() {
    document.getElementById("displayField").style.backgroundColor = "white";
    document.getElementById("displayField").style.color = "black";
    document.getElementById("displayField").style.transition = "all 1.5s";
    document.getElementById("moving").style.backgroundColor = "blueviolet";
}

function blueVioletBackground2() {
    document.getElementById("details").style.backgroundColor = "blueviolet";
    document.getElementById("details").style.color = "white";
    document.getElementById("details").style.transition = "all 1.5s";
    document.getElementById("moving").style.backgroundColor = "white";
}

function whiteBackground2() {
    document.getElementById("details").style.backgroundColor = "white";
    document.getElementById("details").style.color = "black";
    document.getElementById("details").style.transition = "all 1.5s";
    document.getElementById("moving").style.backgroundColor = "blueviolet";
}