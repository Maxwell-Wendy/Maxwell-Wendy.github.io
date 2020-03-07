//const myapikey = process.env.GOOGLE_API_KEY;
const myapikey = localStorage.getItem(apikey);
var searchBy = "";
var searchText = "";
var input = "";


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
    console.log(result.items[0]);
    var booklist = "Here are the first 20 books from your search: <br><br>";

    for(var i=0; i < result.items.length; i++) {
        var title = result.items[i].volumeInfo.title;
        console.log(title);
        var author = result.items[i].volumeInfo.authors;
        console.log(author);  
        var id = result.items[i].id;
        console.log(id);
        booklist += '<strong>' + title + '</strong> by ' + author + '<br>';
    }
    document.getElementById("output").innerHTML = booklist;
}
