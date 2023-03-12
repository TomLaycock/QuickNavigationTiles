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


function Add_Welcome_Profile_Creation_Modal_Content() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "Create your first profile")
        .ReturnToRoot()
        .Custom(AddInformationPanel, "info", "Enter a name and an image url to display for your first profile, if no image url is entered, the program will use the default!")
        .Custom(AddInput, "text", "Name", "profile name", null, true, null)
        .Custom(AddInput, "text", "Custom Image", "image url", null, true, null)
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "confirm", "Finish", WrapCreationWelcome);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}

function WrapCreationWelcome() {
    CreateProfile(document.getElementById("Name").value, document.getElementById("CustomImage").value);
    HideModal();
}