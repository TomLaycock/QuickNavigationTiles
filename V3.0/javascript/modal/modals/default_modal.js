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