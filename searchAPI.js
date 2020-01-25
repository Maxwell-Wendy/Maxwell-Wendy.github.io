var xmlhttp = new XMLHttpRequest();
//const myapikey = process.env.GOOGLE_API_KEY;
const myapikey = "20a6c88e296ccb9a84900de16bdc0d715e85d073";
var searchBy = "";
var searchText = "";
var input = "";



function getBooksByTitle() {
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[0].value;
    searchText = document.getElementsByName("searchText")[0].value;
    input = searchBy + searchText;

    console.log(searchBy);
    console.log(searchText);

    console.log(input);
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myBookByTitle = JSON.parse(this.responseText);
            console.log(myBookByTitle);
            myDisplayFunction(myBookByTitle);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getBooksByAuthor() {
    xmlhttp = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    searchBy = document.getElementsByName("searchBy")[1].value;
    searchText = document.getElementsByName("searchText")[1].value;
    input = searchBy + searchText;

    console.log(searchBy);
    console.log(searchText);

    console.log(input);
    url = url + "&q=" + input;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myBookByAuthor = JSON.parse(this.responseText);
            console.log(myBookByAuthor);
            myDisplayFunction(myBookByAuthor);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function myDisplayFunction(result) {
    console.log(result.items.length);
    var booklist = "";

    for(var i=0; i < result.items.length; i++) {
        var title = result.items[i].volumeInfo.title;
        console.log(title);

        var author = result.items[i].volumeInfo.authors;
        
        var id = result.items[i].id;
        console.log(id);
        booklist += '<strong>' + title + '</strong> by ' + author + '<br>';
    }
    document.getElementById("output").innerHTML = booklist;
}
