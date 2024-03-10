function init()
{
    var numbox = document.getElementById("section_template");
    var oddbox = document.getElementById("add_section");
    
    oddbox.ondragstart = function(event) { return false; }

    numbox.ondragstart = function(event) {
        event.dataTransfer.dropEffect = "pointer";
        event.dataTransfer.effectAllowed = "pointer";
        console.log("Drag Started!");
        event.dataTransfer.setData("elementType", "section");

        event.target.style.cursor = "pointer";

        // Change cursor appearance during drag
        event.dataTransfer.effectAllowed = 'pointer';

        // Change cursor appearance during drag
        document.getElementById('section_template').style.cursor = 'pointer';
        document.getElementById('section_template').style.pointerEvents = "all";
    }

    oddbox.ondragover = function(event){ 
        event.preventDefault();
        event.dataTransfer.dropEffect = "pointer";
        event.dataTransfer.effectAllowed = "pointer";

        event.target.style.cursor = "pointer";
        document.getElementById('section_template').style.pointerEvents = "none";
        return false; 
    }

    oddbox.ondrop = function(event)
    {
        event.preventDefault();
        event.dataTransfer.dropEffect = "pointer";
        event.dataTransfer.effectAllowed = "pointer";
        var num = event.dataTransfer.getData("elementType");

        var builder = new ElementBuilder("div", null, num);
        var element = builder.ReturnResult();
        var bodyElement = document.getElementById("section_container");
        bodyElement.append(element);

        event.target.style.cursor = "pointer";
        console.log(event);
        document.getElementById('section_template').style.pointerEvents = "all";

        return false;
    }
}

onload = init;