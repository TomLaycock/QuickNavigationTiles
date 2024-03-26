function AddInnerHtml(builder, value) { builder.currentElement.innerHTML = value; return builder; }

function AddClass(builder, classes) {
    classes.split(" ").forEach(class_ => {
        builder.currentElement.classList.add(class_);
    });
    return builder;
}

function SetBackgroundImage(builder, value) { builder.currentElement.style.backgroundImage = "url('" + value + "')"; return builder; }

function OnClick(builder, func) { AddClickListnerToButton(builder.currentElement, func); return builder; }

function SetAttribute(builder, attributeName, attributeValue) { builder.currentElement.setAttribute(attributeName, attributeValue); return builder; }

function BindOnMouseDown(builder, boundFunction, ...boundVars) {
    builder.currentElement.onmousedown = function(event) {
        boundFunction(event, ...boundVars);
    };

    return builder;
}

function AddTextList(builder, ...Items) {
    builder.AddChild("ul", null, "modal_list_ul");
    AddItemsToList(builder, ...Items);
    builder.StepToParent_NTimes(1);
    return builder;
}

function AddItemsToList(builder, Item, ...Items) {
    if (Item === undefined || Item === null) return;
    builder.AddChild("li", null, "modal_list_li").Custom(AddInnerHtml, Item).StepToParent_NTimes(1);
    AddItemsToList(builder, ...Items);
}

function AddInformationPanel(builder, type, text) {
    var imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/480px-Info_icon_002.svg.png";

    builder.AddChild("div", null, "modal_2_col info_panel")
        .AddChild("div", null, "info_panel_image")
        .Custom(SetBackgroundImage, imageUrl)
        .StepToParent_NTimes(1)
        .AddChild("p")
        .Custom(AddInnerHtml, text)
        .StepToParent_NTimes(2);

    return builder;
}

function AddInput(builder, type, fieldName, placeholder, inputClasses, includeLabel, labelClasses) {
    var idSafeString = fieldName.replace(/\s/g, "");

    if (includeLabel) {
        builder.AddChild("label", null, "modal_label two_px_top_margin").Custom(AddInnerHtml, fieldName + ":");
        builder.currentElement.htmlFor = idSafeString;
        if (labelClasses !== undefined && labelClasses !== null)
            builder.Custom(AddClass, labelClasses);
        builder.StepToParent_NTimes(1);
    }

    builder.AddChild("input", idSafeString, "modal_input two_px_bottom_margin");
    builder.currentElement.type = type;
    builder.currentElement.placeholder = placeholder;
    if (inputClasses !== undefined && inputClasses !== null)
        builder.Custom(AddClass, inputClasses);

    builder.StepToParent_NTimes(1);
    return builder;
}

function AddButton(builder, value, text, func, classes) {
    switch (value) {
        case "confirm":
            builder.AddChild("button", "modal_confirm", "modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.AddChild("p")
                .Custom(AddInnerHtml, text)
                .StepToParent_NTimes(2)
            break;

        case "cancel":
            builder.AddChild("button", "modal_cancel", "modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.AddChild("p")
                .Custom(AddInnerHtml, text)
                .StepToParent_NTimes(2)
            break;

        case "info":
            builder.AddChild("button", "modal_Info", "modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.AddChild("p")
                .Custom(AddInnerHtml, text)
                .StepToParent_NTimes(2)
            break;

        case "element":
            builder.AddChild("button", null, "modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.AddChild("p")
                .Custom(AddInnerHtml, text)
                .StepToParent_NTimes(2)
            break;

        case "element_button":
            builder.AddChild("button", text, "modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.StepToParent_NTimes(1);
            break;

        case "default":
        default:
            builder.AddChild("button", null, "modal_button_default modal_control");
            if (!IsNullOrUndefined(classes)) builder.Custom(AddClass, classes);
            if (!IsNullOrUndefined(func)) builder.Custom(OnClick, func);
            builder.AddChild("p")
                .Custom(AddInnerHtml, text)
                .StepToParent_NTimes(2)
            break;
    }

    return builder;
}

function AddElementButton(builder, text, func, classes, imageUrl) {
    var idSafeString = text.replace(/\s/g, "").toUpperCase();

    builder.Custom(AddButton, "element_button", idSafeString, func, classes);
    builder.GoToChild_By_Id(idSafeString).currentElement.style.backgroundImage = "url('" + imageUrl + "')";
    builder.StepToParent_NTimes(1);

    builder.AddChild("label", null, "modal_label two_px_top_margin profile_selector_text").Custom(AddInnerHtml, text);
    builder.currentElement.htmlFor = idSafeString;
    builder.StepToParent_NTimes(1);

    return builder;
}