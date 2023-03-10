function Add_Welcome_Modal_Content() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "Welcome to Quick Nav 3.0")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "This appears to be your first time using Quick Nav 3.0, Follow the next steps to setup the initial program.")
        .ReturnToRoot()
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "info", "Continue", HideModal);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}