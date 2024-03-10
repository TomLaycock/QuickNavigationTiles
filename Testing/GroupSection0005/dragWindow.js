var elementLookup = {
    "section_template" : {
        classes : "section",
        acceptor : "#add_section",
        innerdetector : "add_sub_section",
        generateelement : null
    },


    "section_row_template_100" : {
        classes : "section_row section_row_100",
        acceptor : "#add_sub_section",
        innerdetector : "add_group",
        generateelement : null
    },
    "section_row_template_50" : {
        classes : "section_row section_row_50",
        acceptor : "#add_sub_section",
        innerdetector : "add_group",
        generateelement : null
    },


    "section_col_template_100" : {
        classes : "section_col section_col_100",
        acceptor : "#add_sub_section",
        innerdetector : "add_group",
        generateelement : null
    },
    "section_col_template_50" : {
        classes : "section_col section_col_50",
        acceptor : "#add_sub_section",
        innerdetector : "add_group",
        generateelement : null
    },


    "group_template_100" : {
        classes : "group group_100",
        acceptor : "#add_group",
        innerdetector : null,
        generateelement : function() {
            var builder = new ElementBuilder("div", null, elementLookup["group_template_100"].classes);

            builder.AddChild("div", null, "element_container", true);

            return builder.ReturnResult();
        }
    }
}

var activeDragElement;
var activeDragElementType;
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

var section_container;

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;

    pos3 = e.clientX;
    pos4 = e.clientY;
    
    activeDragElement.style.top = (activeDragElement.offsetTop - pos2) + "px";
    activeDragElement.style.left = (activeDragElement.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    activeDragElement.remove();

    pos1 = 0;
    pos2 = 0;
    pos3 = 0;
    pos4 = 0;

    document.onmouseup = null;
    document.onmousemove = null;
}

function DragTemplateObject(e, draggedElement) {
    e = e || window.event;
    e.preventDefault();

    mainContentDiv = document.getElementById("body");

	newWindowDiv = document.createElement('div');
	newWindowDiv.className = "template_drag_object";
    newWindowDiv.innerHTML = draggedElement.innerHTML;

	mainContentDiv.appendChild(newWindowDiv);

    newWindowDiv.style.left = (newWindowDiv.offsetLeft - (pos3 - e.clientX)) + "px";
	newWindowDiv.style.top = (newWindowDiv.offsetTop - (pos4 - e.clientY)) + "px";

	activeDragElement = newWindowDiv;

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function FullElementReset() {
    for (var key in elementLookup) {
        if (elementLookup.hasOwnProperty(key)) {
            var value = elementLookup[key];

            var lookupReset = section_container.querySelectorAll(value.acceptor);
            lookupReset.forEach(function(resetZone) {
                resetZone.onmouseover = null;
                resetZone.onmouseleave = null;
                resetZone.onmouseout = null;
                resetZone.onmouseup = null;
            });
        }
    }
}

function BindTemplateButton(element) {
    element.onmousedown = function(event) {
        activeDragElementType = element.id;
        DragTemplateObject(event, element);

        var dropZoneId = elementLookup[activeDragElementType].acceptor;
        var dropZones = section_container.querySelectorAll(dropZoneId);

        console.log(dropZoneId);
        console.log(dropZones);

        dropZones.forEach(function(dropZone) {
            dropZone.onmouseover = function() {
                dropZone.style.backgroundColor = "#FFFFFF";
            }
            dropZone.onmouseleave = function() {
                dropZone.style.backgroundColor = "#888888";
            }
            dropZone.onmouseout = function() {
                dropZone.style.backgroundColor = "#888888";
            }

            dropZone.onmouseup = function() {
                var element = null;

                if (!IsNullOrUndefined(elementLookup[activeDragElementType].generateelement)) {
                    element = elementLookup[activeDragElementType].generateelement();
                }
                else {
                    var builder = new ElementBuilder("div", null, elementLookup[activeDragElementType].classes);

                    if (!IsNullOrUndefined(elementLookup[activeDragElementType].innerdetector)) {
                        builder.AddChild("div", elementLookup[activeDragElementType].innerdetector, null, true);
                    }

                    element = builder.ReturnResult();
                }
                
                var containerElement = dropZone.parentElement;
                containerElement.insertBefore(element, dropZone);

                FullElementReset();
            }
        });
    };
}

function init()
{
    window.onmouseup = FullElementReset;

    section_container = document.getElementById("section_container");

    var parentElement = document.getElementById("element_selection");
    var childDivs = parentElement.querySelectorAll("div");

    childDivs.forEach(function(childDiv) {
        BindTemplateButton(childDiv);
    });
}

onload = init;