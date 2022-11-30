const SectionClassAvoidance = new Set();
SectionClassAvoidance.add("link_element_button");
SectionClassAvoidance.add("is");

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
    var sections = document.getElementsByClassName("section");
    SetupSectionMovingFunctionality(sections);

    var link_element_buttons = document.getElementsByClassName("link_element_button");
    SetupStyleTwo(link_element_buttons);

    addEventListener('mouseup', HandleMouseUpEvents);
});



//---------------------------------------------------------------//
//-------------- LINK ELEMENT MOVING FUNCTIONALITY --------------//
//---------------------------------------------------------------//
function SetupStyleTwo(link_elements) {
    for (var i = 0; i < link_elements.length; i++) {
        link_elements[i].addEventListener("mousemove", setPaddingOnStyleTwo);
        link_elements[i].addEventListener("mouseout", setPaddingOffStyleTwo);
    }
}

function setPaddingOnStyleTwo(element) {
    var buttonElement = document.getElementsByClassName(element.target.classList[0] + " " + element.target.classList[1]);

    var leftElement = document.getElementsByClassName("drop_spacer_" + getIdNumber(element.target.classList[1]));
    var leftElementSub = leftElement[0].querySelector('.drop_style');

    var rightElement = document.getElementsByClassName("drop_spacer_" + (parseInt(getIdNumber(element.target.classList[1])) + 1));
    var rightElementSub = rightElement[0].querySelector('.drop_style');

    var bounds = buttonElement[0].getBoundingClientRect();
    var elementWidth = bounds.right - bounds.left;

    if (element.clientX <= bounds.left + (elementWidth / 2)) {
        leftElement[0].style.width = "50px";
        leftElement[0].style.height = "50px";
        leftElement[0].style.padding = "0px 5px 0px 5px";

        leftElementSub.style.width = "46px";
        leftElementSub.style.height = "46px";
        leftElementSub.style.border = "2px solid #666666";
        leftElementSub.style.borderRadius = "15px";

        rightElement[0].style.width = null;
        rightElement[0].style.height = null;
        rightElement[0].style.padding = null;

        rightElementSub.style.width = null;
        rightElementSub.style.height = null;
        rightElementSub.style.border = null;
        rightElementSub.style.borderRadius = null;
    } else {
        rightElement[0].style.width = "50px";
        rightElement[0].style.height = "50px";
        rightElement[0].style.padding = "0px 5px 0px 5px";

        rightElementSub.style.width = "46px";
        rightElementSub.style.height = "46px";
        rightElementSub.style.border = "2px solid #666666";
        rightElementSub.style.borderRadius = "15px";

        leftElement[0].style.width = null;
        leftElement[0].style.height = null;
        leftElement[0].style.padding = null;

        leftElementSub.style.width = null;
        leftElementSub.style.height = null;
        leftElementSub.style.border = null;
        leftElementSub.style.borderRadius = null;
    }
}

function setPaddingOffStyleTwo(element) {
    var leftElement = document.getElementsByClassName("drop_spacer_" + getIdNumber(element.target.classList[1]));
    var leftElementSub = leftElement[0].querySelector('.drop_style');

    leftElement[0].style.width = null;
    leftElement[0].style.height = null;
    leftElement[0].style.padding = null;

    leftElementSub.style.width = null;
    leftElementSub.style.height = null;
    leftElementSub.style.border = null;
    leftElementSub.style.borderRadius = null;

    var rightElement = document.getElementsByClassName("drop_spacer_" + (parseInt(getIdNumber(element.target.classList[1])) + 1));
    var rightElementSub = rightElement[0].querySelector('.drop_style');

    rightElement[0].style.width = null;
    rightElement[0].style.height = null;
    rightElement[0].style.padding = null;

    rightElementSub.style.width = null;
    rightElementSub.style.height = null;
    rightElementSub.style.border = null;
    rightElementSub.style.borderRadius = null;
}



//---------------------------------------------------------------//
//----------------- SECTION MOVING FUNCTIONALITY ----------------//
//---------------------------------------------------------------//
function SetupSectionMovingFunctionality(link_elements) {
    for (var i = 0; i < link_elements.length; i++) {
        link_elements[i].addEventListener("mousemove", SetSectionSpacerOn);
        link_elements[i].addEventListener("mouseout", SetSectionSpacerOff);
    }
}

function SetSectionSpacerOn(element) {
    console.log(element)

    if (SectionClassAvoidance.has(element.target.classList[0])) return;

    var targetSection = document.getElementsByClassName(element.target.classList[0] + " " + element.target.classList[1]);

    var topSpacer = document.getElementsByClassName("ssid_" + getIdNumber(element.target.classList[1]));
    var topSpacerSub = topSpacer[0].querySelector('.section_spacer_style');

    var bottomSpacer = document.getElementsByClassName("ssid_" + (parseInt(getIdNumber(element.target.classList[1])) + 1));
    var bottomSpacerSub = bottomSpacer[0].querySelector('.section_spacer_style');

    var bounds = targetSection[0].getBoundingClientRect();
    var elementHeight = bounds.bottom - bounds.top;

    if (element.clientY <= bounds.top + (elementHeight / 2)) {
        topSpacer[0].style.width = "100%";
        topSpacer[0].style.height = "10px";

        topSpacerSub.style.width = "100%";
        topSpacerSub.style.height = "10px";
        topSpacerSub.style.border = "2px solid #FFFFFF";
        topSpacerSub.style.borderRadius = "15px";

        bottomSpacer[0].style.width = null;
        bottomSpacer[0].style.height = null;
        bottomSpacer[0].style.padding = null;

        bottomSpacerSub.style.width = null;
        bottomSpacerSub.style.height = null;
        bottomSpacerSub.style.border = null;
        bottomSpacerSub.style.borderRadius = null;
    } else {
        bottomSpacer[0].style.width = "100%";
        bottomSpacer[0].style.height = "10px";

        bottomSpacerSub.style.width = "100%";
        bottomSpacerSub.style.height = "10px";
        bottomSpacerSub.style.border = "2px solid #FFFFFF";
        bottomSpacerSub.style.borderRadius = "15px";

        topSpacer[0].style.width = null;
        topSpacer[0].style.height = null;
        topSpacer[0].style.padding = null;

        topSpacerSub.style.width = null;
        topSpacerSub.style.height = null;
        topSpacerSub.style.border = null;
        topSpacerSub.style.borderRadius = null;
    }
}

function SetSectionSpacerOff(element) {
    console.log(element)

    if (SectionClassAvoidance.has(element.target.classList[0])) return;

    var topSpacer = document.getElementsByClassName("ssid_" + getIdNumber(element.target.classList[1]));
    var topSpacerSub = topSpacer[0].querySelector('.section_spacer_style');

    topSpacer[0].style.width = null;
    topSpacer[0].style.height = null;
    topSpacer[0].style.padding = null;

    topSpacerSub.style.width = null;
    topSpacerSub.style.height = null;
    topSpacerSub.style.border = null;
    topSpacerSub.style.borderRadius = null;

    var bottomSpacer = document.getElementsByClassName("ssid_" + (parseInt(getIdNumber(element.target.classList[1])) + 1));
    var bottomSpacerSub = bottomSpacer[0].querySelector('.section_spacer_style');

    bottomSpacer[0].style.width = null;
    bottomSpacer[0].style.height = null;
    bottomSpacer[0].style.padding = null;

    bottomSpacerSub.style.width = null;
    bottomSpacerSub.style.height = null;
    bottomSpacerSub.style.border = null;
    bottomSpacerSub.style.borderRadius = null;
}



//---------------------------------------------------------------//
//-------------------------- GENERIC  ---------------------------//
//---------------------------------------------------------------//
function getIdNumber(idToGetFrom) {
    console.log(idToGetFrom);

    var elementTextId = idToGetFrom.substring(0, 2);
    switch (elementTextId) {
        case "id":
            return idToGetFrom.substring(3, 3 + (idToGetFrom.length - 3));
        case "si":
            return idToGetFrom.substring(4, 4 + (idToGetFrom.length - 4));
        default:
            console.log("No case has been set in getIdNumber for: " + elementTextId);
            break;
    }

    return idToGetFrom.substring(3, 3 + (idToGetFrom.length - 3));
}



//---------------------------------------------------------------//
//----------------- MOUSE UP - FINALISE MOVEMENT ----------------//
//---------------------------------------------------------------//
function HandleMouseUpEvents(MouseEvent) {
    if (MouseEvent.button == 0) {
        console.log("Left Button Released!");
        console.log(MouseEvent);
        console.log(getIdNumberFromSrcElement(MouseEvent));
    }
}

function getIdNumberFromSrcElement(MouseEvent) {
    var src = MouseEvent.srcElement;

    var horizontalCheck = true;
    var classListItemToTarget = 0;
    var offset = 0;

    switch (src.classList[0]) {
        case "link_element_button":
            classListItemToTarget = 1;
            offset = 3;
            horizontalCheck = true;
            break;
        case "is":
            classListItemToTarget = 1;
            offset = 12;
            horizontalCheck = true;
            break;
        case "section":
            classListItemToTarget = 1;
            offset = 4;
            horizontalCheck = false;
            break;
        case "section_spacer":
            classListItemToTarget = 1;
            offset = 5;
            horizontalCheck = false;
            break;
        default:
            return -1;
    }

    console.log("Settings: " + classListItemToTarget + "   " + offset + "   " + horizontalCheck);

    return parseInt(src.classList[classListItemToTarget].substring(offset, src.classList[classListItemToTarget].length)) +
        (horizontalCheck == true ?
            (shouldAddOne_RightSideOfButton(MouseEvent) ? 1 : 0) :
            (shouldAddOne_BottomOfButton(MouseEvent) ? 1 : 0));
}

function shouldAddOne_RightSideOfButton(MouseEvent) {
    console.log("Horizontal Check:");
    console.log(MouseEvent);

    var src = MouseEvent.srcElement;

    if (src.classList[0] != "link_element_button") return false;

    var buttonElement = document.getElementsByClassName(src.classList[0] + " " + src.classList[1]);

    var bounds = buttonElement[0].getBoundingClientRect();
    var elementWidth = bounds.right - bounds.left;

    if (MouseEvent.clientX <= bounds.left + (elementWidth / 2)) {
        return false;
    } else {
        return true;
    }
}

function shouldAddOne_BottomOfButton(MouseEvent) {
    console.log("Vertical Check:");
    console.log(MouseEvent);

    var src = MouseEvent.srcElement;

    if (src.classList[0] != "section") return false;

    var section = document.getElementsByClassName(src.classList[0] + " " + src.classList[1]);

    var bounds = section[0].getBoundingClientRect();
    var elementHeight = bounds.bottom - bounds.top;

    if (MouseEvent.clientY <= bounds.top + (elementHeight / 2)) {
        return false;
    } else {
        return true;
    }
}