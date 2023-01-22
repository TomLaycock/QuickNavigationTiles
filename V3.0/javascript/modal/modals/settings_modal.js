function Add_Settings_Modal_Content() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6")
        .Custom(AddInnerHtml, "Settings")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "Quick Nav Version: 3.0")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "Development Version: 1.0.0")
        .ReturnToRoot()
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Close", HideModal);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}