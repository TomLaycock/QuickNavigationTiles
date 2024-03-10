function init()
{
    var numbox = document.getElementsByClassName("number");
    var oddbox = document.getElementById("odd");
    var evenbox = document.getElementById("even");
    for (var i = 0; i < numbox.length; i++) {
            numbox[i].ondragstart = function(event) {
        event.dataTransfer.setData("Text", this.id);
        }
    }
    oddbox.ondragover = function(event){ return false; }
    evenbox.ondragover = function(event){ return false; }
    oddbox.ondrop = function(event)
    {
        var num = event.dataTransfer.getData("Text");
        var obj = document.getElementById(num);
        oddbox.appendChild(obj);
        if (num % 2 == 1) {
            obj.style.backgroundColor = "green";
        } else {
            obj.style.backgroundColor = "red";
        }
        return false;
    }
    even.ondrop = function (event)
    {
        var num = event.dataTransfer.getData("Text");
        var obj = document.getElementById(num);
        evenbox.appendChild(obj);
        if (num % 2 == 0) {
            obj.style.backgroundColor = "green";
        } else {
            obj.style.backgroundColor = "red";
        }
        return false;
    }
}
onload = init;