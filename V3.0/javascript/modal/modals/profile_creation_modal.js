function Add_Profile_Creation_Modal_Content() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "Create Profile")
        .ReturnToRoot()
        .Custom(AddInput, "text", "Name", "profile name", null, true, null)
        .Custom(AddInput, "text", "Custom Image", "image url", null, true, null)
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Cancel", ShowModal_AddContent.bind(this, Add_Profile_Management_Modal_Content, false))
        .Custom(AddButton, "confirm", "Create", WrapCreation);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}

function WrapCreation() {
    CreateProfile(document.getElementById("Name").value, document.getElementById("CustomImage").value);
    ShowModal_AddContent(Add_Profile_Management_Modal_Content, false);
}