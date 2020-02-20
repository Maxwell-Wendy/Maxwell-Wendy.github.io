class FullName {
    constructor(first, last) {
        this.first = first;
        this.last = last;
    }
}

function saveFirstName() {
    var firstName1 = document.getElementById("fname1").value;
    console.log(firstName1);
    localStorage.firstname = firstName1;
}

function saveLastName() {
    var lastName1 = document.getElementById("lname1").value;
    console.log(lastName1);
    localStorage.lastname = lastName1;
}

function displayFullName() {
    document.getElementById("fullname1").innerHTML = "Your full name is " + 
    localStorage.firstname + " " + localStorage.lastname + ".";
}

function saveName() {
    var firstName2 = document.getElementById("fname2").value;
    console.log(firstName2);
    var lastName2 = document.getElementById("lname2").value;
    console.log(lastName2);
    var fullName = new FullName(firstName2, lastName2);
    var fullNameString = JSON.stringify(fullName);
    localStorage.full_name = fullNameString;
}

function displayName() {
    var name = JSON.parse(localStorage.full_name);
    document.getElementById("fullname2").innerHTML = "Your full name is " + 
    name.first + " " + name.last + ".";
}

