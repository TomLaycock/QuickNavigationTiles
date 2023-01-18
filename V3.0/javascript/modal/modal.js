var active_modal = null

function InitialiseModal() {
    var builder = new ElementBuilder("div", "modal_container");

    builder.AddChild_StayWithParent("div", "modal_background")
        .AddChild("div", "modal")
        .AddChild("button", "modal_close_button")
        .Custom(OnClick, HideModal)
        .AddChild_StayWithParent("div", "modal_close_button_background")
        .AddChild("div", "modal_close_button_content")
        .Custom(AddInnerHtml, "X");

    active_modal = builder.ReturnResult();
}

function ClearModalContent() {
    let modal = FindChildById(active_modal, "modal");
    let modal_content = FindChildById(modal, "modal_content");
    if (!IsNullOrUndefined(modal_content)) modal.removeChild(modal_content);
}

function ShowModal() {
    document.body.append(active_modal);
}

function ShowModal_AddContent(func, append = false) {
    if (!append) ClearModalContent();
    func();
    document.body.append(active_modal);
}

function HideModal() {
    document.body.removeChild(active_modal);
}

function AddDefaultContent() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6")
        .Custom(AddInnerHtml, "Modal Title")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "This is some modal content, Likely asking a question!");

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}