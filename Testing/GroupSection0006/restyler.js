var QuickNavigationStyleSheet = null;
var StylesToAllowEditingFor = [".section_row_100", ".section_row_50", ".section_col_100", ".section_col_50", ".group_100"];
var EditableStyles = {}

function InitialiseRestyler() {
    console.log(document.styleSheets);
    return;
    for (let index = 0; index < document.styleSheets.length; index++) {
        if (document.styleSheets[index].cssRules[0].selectorText == ".QuickNavV3StyleDetector") {
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
}

function ToggleEditMode() {
    if (EditableStyles[".section_row_100"].style.width == "100%") {
        EditableStyles[".section_row_100"].style.width = "calc(100% - 30px)";
        EditableStyles[".section_row_50"].style.width = "calc(50% - 30px)";

        EditableStyles[".section_col_100"].style.width = "calc(100% - 30px)";
        EditableStyles[".section_col_50"].style.width = "calc(50% - 30px)";

        EditableStyles[".group_100"].style.width = "calc(100% - 30px)";
    } else {
        EditableStyles[".section_row_100"].style.width = "100%";
        EditableStyles[".section_row_50"].style.width = "50%";

        EditableStyles[".section_col_100"].style.width = "100%";
        EditableStyles[".section_col_50"].style.width = "50%";

        EditableStyles[".group_100"].style.width = "100%";
    }
}
