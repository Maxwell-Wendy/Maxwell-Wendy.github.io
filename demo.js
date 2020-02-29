function addToList() {
    var newListItem = document.createElement("li");
    var userInput = document.getElementById("color").value;
    var newText = document.createTextNode(userInput);
    newListItem.appendChild(newText);
    document.getElementById("list").appendChild(newListItem);
    document.getElementById("list").style.backgroundColor = userInput;
}

function addToTopOfList() {
    var newListItem = document.createElement("li");
    var userInput = document.getElementById("color").value;
    var newText = document.createTextNode(userInput);
    newListItem.appendChild(newText);
    var list = document.getElementById("list");
    list.insertBefore(newListItem, list.childNodes[0]);
    list.style.color = userInput;
}