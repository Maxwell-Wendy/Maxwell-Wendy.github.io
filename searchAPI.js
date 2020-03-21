//const myapikey = process.env.GOOGLE_API_KEY;
const myapikey = localStorage.getItem(apikey);
var searchBy = "";
var searchText = "";
var input = "";

class DetailedBook {
    constructor(title, author, id, publisher, publishedDate, pageCount, imageURL, description) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.pageCount = pageCount;
        this.imageURL = imageURL;
        this.description = description;
    }
}

class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }
}


function getBooksByTitle() {
    var xmlhttp = new XMLHttpRequest();

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[0].value;
    searchText = document.getElementsByName("searchText")[0].value;
    input = searchBy + searchText;
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function() {
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

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[1].value;
    searchText = document.getElementsByName("searchText")[1].value;
    input = searchBy + searchText;
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myBookByAuthor = JSON.parse(this.responseText);
            myDisplayFunction(myBookByAuthor);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function myDisplayFunction(result) {
    var disp = document.getElementById("booklist");
    var prev = disp.children[0];
    var booklist = "Here are the first 20 books from your search: <br><br>";
    var books = new Array();
    for(var i=0; i < result.items.length; i++) {
        console.log(result.items[i]);
        var elem;

        var title = result.items[i].volumeInfo.title;
        var author = result.items[i].volumeInfo.authors; 
        var id = result.items[i].id;

        var book = new Book(title, author, id); 
        
        books[i] = book;

        console.log(books[i].title);

        elem = document.createElement("br");
        disp.insertBefore(elem, prev);
        prev = elem;

        elem = document.createTextNode(title + ", by " + author);
        disp.insertBefore(elem, prev);
        prev = elem;

        elem = document.createElement("input");
        elem.type = "radio";
        elem.name = "book[]";
        elem.id = i;
        elem.value = id;
        disp.insertBefore(elem, prev);
        prev = elem;

    }
    document.getElementById("output").innerHTML = booklist;
}



function myDisplayFunction2(result) {
    console.log(result.items[0]);
    var booklist = "Here are the first 20 books from your search: <br><br>";

    for(var i=0; i < result.items.length; i++) {
        var title = result.items[i].volumeInfo.title;
        var author = result.items[i].volumeInfo.authors[0]; 
        var id = result.items[i].id;
        var publisher = result.items[i].publisher;
        var publishedDate = result.items[i].publishedDate;
        var pageCount = result.items[0].volumeInfo.pageCount;
        var imageURL = "";
        if (result.items[0].volumeInfo.imageLinks.thumbnail) {
            imageURL = result.items[0].volumeInfo.imageLinks.thumbnail;
        } 
        booklist += '<strong>' + title + '</strong> by ' + author + '<br>';
    }
    document.getElementById("output").innerHTML = booklist;
}
