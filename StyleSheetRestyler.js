var QuickNavigationStyleSheet = null;
var StylesToAllowEditingFor = [".background_color", ".detail_color", ".sub_detail_color", ".button_gradient", ".quick_nav_content_area", ".section_container"];
var EditableStyles = {}

for (let index = 0; index < document.styleSheets.length; index++) {
    if (document.styleSheets[index].cssRules[0].selectorText == ".QuickNavCustomStylesDetector") {
        QuickNavigationStyleSheet = document.styleSheets[index];
    }
}

StylesToAllowEditingFor.forEach(StyleName => {
    for (let i = 0; i < QuickNavigationStyleSheet.cssRules.length; i++) {
        if (QuickNavigationStyleSheet.cssRules[i].selectorText == StyleName) {
            EditableStyles[StyleName] = QuickNavigationStyleSheet.cssRules[i];
            break;
        }
    }
});

function ToggleColumnMode() {
    if (EditableStyles[".quick_nav_content_area"].style.flexDirection == "column") {
        EditableStyles[".quick_nav_content_area"].style.flexDirection = "row";

        EditableStyles[".section_container"].style.width = "46%";
        EditableStyles[".section_container"].style.border = "2px solid #222222";
        EditableStyles[".section_container"].style.borderRadius = "10px";
        EditableStyles[".section_container"].style.margin = "10px";
        EditableStyles[".section_container"].style.padding = "10px";
    } else {
        EditableStyles[".quick_nav_content_area"].style.flexDirection = "column";

        EditableStyles[".section_container"].style.width = "98%";
        EditableStyles[".section_container"].style.border = "";
        EditableStyles[".section_container"].style.borderRadius = "";
        EditableStyles[".section_container"].style.margin = "";
        EditableStyles[".section_container"].style.padding = "";
    }
}

function ChangeBackgroundColor(ValueToSet) {
    if (typeof ValueToSet === 'string')
        EditableStyles[".background_color"].style.backgroundColor = ValueToSet;
    else
        EditableStyles[".background_color"].style.backgroundColor = ValueToSet.target.value;
}

function ChangeMainBackgroundColor(ValueToSet) {
    if (typeof ValueToSet === 'string')
        EditableStyles[".detail_color"].style.backgroundColor = ValueToSet;
    else
        EditableStyles[".detail_color"].style.backgroundColor = ValueToSet.target.value;
}

function ChangeSubBackgroundColor(ValueToSet) {
    if (typeof ValueToSet === 'string')
        EditableStyles[".sub_detail_color"].style.backgroundColor = ValueToSet;
    else
        EditableStyles[".sub_detail_color"].style.backgroundColor = ValueToSet.target.value;
}

function ChangeMainBorderColor(ValueToSet) {
    if (typeof ValueToSet === 'string') {
        EditableStyles[".detail_color"].style.borderColor = ValueToSet;
        EditableStyles[".sub_detail_color"].style.borderColor = ValueToSet;
    } else {
        EditableStyles[".detail_color"].style.borderColor = ValueToSet.target.value;
        EditableStyles[".sub_detail_color"].style.borderColor = ValueToSet.target.value;
    }
}

var FirstColor = null;

function ChangeButtonBackgroundColor(ValueToSet) {
    if (typeof ValueToSet === 'string') {
        FirstColor = ValueToSet;
        EditableStyles[".button_gradient"].style.backgroundColor = ValueToSet;
    } else {
        FirstColor = ValueToSet.target.value;
        EditableStyles[".button_gradient"].style.backgroundColor = ValueToSet.target.value;
    }
}

function ChangeButtonBackgroundFadeColor(ValueToSet) {
    if (typeof ValueToSet === 'string')
        EditableStyles[".button_gradient"].style.backgroundImage = "linear-gradient(" + FirstColor + "," + ValueToSet + ")";
    else
        EditableStyles[".button_gradient"].style.backgroundImage = "linear-gradient(" + FirstColor + "," + ValueToSet.target.value + ")";
}

function ChangeButtonBorderColor(ValueToSet) {
    if (typeof ValueToSet === 'string')
        EditableStyles[".button_gradient"].style.borderColor = ValueToSet;
    else
        EditableStyles[".button_gradient"].style.borderColor = ValueToSet.target.value;
}