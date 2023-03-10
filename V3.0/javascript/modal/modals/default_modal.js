function AddDefaultContent() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "Modal Title")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "This is some modal content, Likely asking a question!")
        .ReturnToRoot()
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Cancel", HideModal)
        .Custom(AddButton, "confirm", "Confirm")
        .Custom(AddButton, "info", "Next");

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}