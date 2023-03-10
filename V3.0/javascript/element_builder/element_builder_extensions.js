function AddInnerHtml(builder, value) { builder.currentElement.innerHTML = value; return builder; }

function AddClass(builder, classes) {
    classes.split(" ").forEach(class_ => {
        builder.currentElement.classList.add(class_);
    });
    return builder;
}

function SetBackgroundImage(builder, value) { builder.currentElement.style.backgroundImage = "url('" + value + "')"; return builder; }

function OnClick(builder, func) { AddClickListnerToButton(builder.currentElement, func); return builder; }

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
        case "default":
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