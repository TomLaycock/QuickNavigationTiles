var elementLookup = {
    "section_template" : {
        classes : "section",
        editorClasses : "section",
        initialEditorSectionClasses : "edit_container col",
        editorSectionClasses : "edit_container col",
        editorContainerSectionClasses : "edit_container col editor_full_content_width",
        acceptor : "add_section",
        moveDetectorName : "move_section",
        innerdetector : "add_sub_section",
        nameField : "section name",
        generateelement : function() {
            var builder = new ElementBuilder("div", null, elementLookup["section_template"].editorClasses);

            if (!IsNullOrUndefined(elementLookup["section_template"].innerdetector)) {
                builder.AddChild("div", null, elementLookup["section_template"].initialEditorSectionClasses)
                        .AddChild("div", elementLookup["section_template"].innerdetector, null, true)
                        .Custom(SetAttribute, "data-location", "0")
                        .Custom(AddInnerHtml, "+");
            }

            return builder.ReturnResult();
        }
    },


    "section_row_template_100" : {
        classes : "section_row section_row_100",
        editorClasses : "section_row editor_full_content_width",
        initialEditorSectionClasses : "edit_container row",
        editorSectionClasses : "edit_container section_row_100 row",
        editorContainerSectionClasses : "edit_container col editor_full_content_width_offset",
        acceptor : "add_sub_section",
        moveDetectorName : "move_sub_section",
        innerdetector : "add_group",
        nameField : "row name",
        generateelement : null
    },
    "section_row_template_50" : {
        classes : "section_row section_row_50",
        editorClasses : "section_row editor_full_content_width",
        initialEditorSectionClasses : "edit_container row",
        editorSectionClasses : "edit_container section_row_50 row",
        editorContainerSectionClasses : "edit_container col editor_full_content_width_offset",
        acceptor : "add_sub_section",
        moveDetectorName : "move_sub_section",
        innerdetector : "add_group",
        nameField : "row name",
        generateelement : null
    },


    "section_col_template_100" : {
        classes : "section_col section_col_100",
        editorClasses : "section_col editor_full_content_width",
        initialEditorSectionClasses : "edit_container row",
        editorSectionClasses : "edit_container section_col_100 row",
        editorContainerSectionClasses : "edit_container col editor_full_content_width_offset",
        acceptor : "add_sub_section",
        moveDetectorName : "move_sub_section",
        innerdetector : "add_group",
        nameField : "column name",
        generateelement : null
    },
    "section_col_template_50" : {
        classes : "section_col section_col_50",
        editorClasses : "section_col editor_full_content_width",
        initialEditorSectionClasses : "edit_container row",
        editorSectionClasses : "edit_container section_col_50 row",
        editorContainerSectionClasses : "edit_container col editor_full_content_width_offset",
        acceptor : "add_sub_section",
        moveDetectorName : "move_sub_section",
        innerdetector : "add_group",
        nameField : "column name",
        generateelement : null
    },


    "group_template_100" : {
        classes : "group group_100",
        editorClasses : "group editor_full_content_width",
        initialEditorSectionClasses : "edit_container row",
        editorSectionClasses : "edit_container group_100 row",
        editorContainerSectionClasses : "edit_container col editor_full_content_width_offset",
        acceptor : "add_group",
        moveDetectorName : "move_group",
        innerdetector : null,
        nameField : "group name",
        generateelement : function() {
            var builder = new ElementBuilder("div", null, elementLookup["group_template_100"].editorClasses);

            builder.AddChild("div", null, "element_container", true);

            return builder.ReturnResult();
        }
    }
}

var acceptorColourLookup = {
    "add_section" : {
        default : "rgb(255, 146, 146)",
        hover : "rgb(255, 100, 100)"
    },
    "add_sub_section" : {
        default : "rgb(120, 255, 172)",
        hover : "rgb(41, 255, 123)"
    },
    "add_group" : {
        default : "rgb(158, 255, 242)",
        hover : "rgb(62, 255, 229)"
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

function DragObject(e, draggedElement) {
    e = e || window.event;
    e.preventDefault();

    mainContentDiv = document.getElementById("body");

    console.log(draggedElement);

	newWindowDiv = draggedElement[0].cloneNode(true);
    newWindowDiv.className = "edit_container col drag_object";
    //newWindowDiv.classList.add("drag_object");

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

            var lookupReset = section_container.querySelectorAll("#" + value.acceptor);
            lookupReset.forEach(function(resetZone) {
                resetZone.onmouseover = null;
                resetZone.onmouseleave = null;
                resetZone.onmouseout = null;
                resetZone.onmouseup = null;
                resetZone.style.backgroundColor = acceptorColourLookup[value.acceptor].default;
            });
        }
    }
}

function BindTemplateButton(element) {
    element.onmousedown = function(event) {
        activeDragElementType = element.id;
        DragTemplateObject(event, element);

        var dropZoneId = "#" + elementLookup[activeDragElementType].acceptor;
        var dropZones = section_container.querySelectorAll(dropZoneId);

        console.log(dropZoneId);
        console.log(dropZones);

        dropZones.forEach(function(dropZone) {
            dropZone.onmouseover = function() {
                dropZone.style.backgroundColor = acceptorColourLookup[elementLookup[activeDragElementType].acceptor].hover;
            }
            dropZone.onmouseleave = function() {
                dropZone.style.backgroundColor = acceptorColourLookup[elementLookup[activeDragElementType].acceptor].default;
            }
            dropZone.onmouseout = function() {
                dropZone.style.backgroundColor = acceptorColourLookup[elementLookup[activeDragElementType].acceptor].default;
            }

            dropZone.onmouseup = function() {
                var element = null;

                var dataLocation = dropZone.getAttribute('data-location');
                var dataLocationNumber = parseInt(dataLocation);

                //dropZone.setAttribute('data-location', dataLocationNumber + 1);

                if (!IsNullOrUndefined(elementLookup[activeDragElementType].generateelement)) {
                    element = elementLookup[activeDragElementType].generateelement();
                }
                else {
                    var builder = new ElementBuilder("div", null, elementLookup[activeDragElementType].editorClasses);

                    if (!IsNullOrUndefined(elementLookup[activeDragElementType].innerdetector)) {
                        builder.AddChild("div", null, elementLookup[activeDragElementType].initialEditorSectionClasses)
                                .AddChild("div", elementLookup[activeDragElementType].innerdetector, null, true)
                                .Custom(SetAttribute, "data-location", "0")
                                .Custom(AddInnerHtml, "+");
                    }

                    element = builder.ReturnResult();
                }
                
                var containerElement = dropZone.parentElement.parentElement;

                var newContainerElement = new ElementBuilder("div", null, elementLookup[activeDragElementType].editorSectionClasses).ReturnResult();

                //containerElement.insertBefore(element, dropZone);

                // Update Existing
                var detectorsToUpdate = dropZone.parentElement.parentElement.querySelectorAll(dropZoneId);

                detectorsToUpdate.forEach(function(detector) {
                    var detectorDataLocation = detector.getAttribute('data-location');
                    var detectorDataLocationNumber = parseInt(detectorDataLocation);

                    if(detectorDataLocationNumber >= dataLocationNumber) {
                        detector.setAttribute('data-location', detectorDataLocationNumber + 1);
                    }
                });

                // Add new detector
                newAddDetector = document.createElement('div');
                newAddDetector.id = elementLookup[activeDragElementType].acceptor;
                newAddDetector.innerHTML = "+";
                newAddDetector.setAttribute('data-location', dataLocationNumber);

                newContainerElement.appendChild(newAddDetector);

                var newSectionContainerBuilder = new ElementBuilder("div", null, elementLookup[activeDragElementType].editorContainerSectionClasses)
                                            .AddChild("div", null, "row")
                                            .AddChild("div", elementLookup[activeDragElementType].moveDetectorName, null, true);
                                            
                newSectionContainerBuilder.Custom(BindOnMouseDown, DragObject, newSectionContainerBuilder.currentElement.parentElement.parentElement)
                                            .StepToParent_NTimes(1)
                                            .Custom(AddInput, "text", "Name", elementLookup[activeDragElementType].nameField, "editor_input_box", false, null).ReturnResult();

                var newSectionContainer = newSectionContainerBuilder.ReturnResult();

                newSectionContainer.appendChild(element);

                newContainerElement.appendChild(newSectionContainer);

                containerElement.insertBefore(newContainerElement, dropZone.parentElement);

                FullElementReset();
            }
        });
    };
}

function init()
{
    function changeCSSVariable(variable, value) {
        document.documentElement.style.setProperty(variable, value);
    }
      
    changeCSSVariable('--width-offset', '30px');

    //InitialiseRestyler();
    //ToggleEditMode();

    window.onmouseup = FullElementReset;

    section_container = document.getElementById("section_container");

    var parentElement = document.getElementById("element_selection");
    var childDivs = parentElement.querySelectorAll("div");

    childDivs.forEach(function(childDiv) {
        BindTemplateButton(childDiv);
    });
}

onload = init;