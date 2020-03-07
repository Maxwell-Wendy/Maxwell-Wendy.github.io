function addToList() {
    var newListItem = document.createElement("li");
    var userInput = document.getElementById("color").value;
    var newText = document.createTextNode(userInput);
    newListItem.appendChild(newText);
    var list = document.getElementById("list");
    list.appendChild(newListItem);
    list.style.backgroundColor = userInput;
    list.style.textTransform = "uppercase";
    list.style.listStyleType = "upper-roman";
    if (document.getElementById("surprise")) {
        document.getElementById("surprise").classList.add("animation");
        document.getElementById("surprise").id = "sliding_spinning2";
    } 
    if (document.getElementById("bouncing2")) {
        document.getElementById("bouncing2").id = "sliding_spinning2";
    }
}

function addToTopOfList() {
    var newListItem = document.createElement("li");
    var userInput = document.getElementById("color").value;
    var newText = document.createTextNode(userInput);
    newListItem.appendChild(newText);
    var list = document.getElementById("list");
    list.insertBefore(newListItem, list.childNodes[0]);
    list.style.color = userInput;
    list.style.textTransform = "lowercase";
    list.style.listStyleType = "lower-roman";
    if (document.getElementById("surprise")) {
        document.getElementById("surprise").classList.add("animation");
        document.getElementById("surprise").id = "bouncing2";
    } 
    if (document.getElementById("sliding_spinning2")) {
        document.getElementById("sliding_spinning2").id = "bouncing2";
    }
}