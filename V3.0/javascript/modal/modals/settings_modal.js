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
        .AddChild("div", null, "modal_2_col")
        .AddChild("p")
        .Custom(AddInnerHtml, "Stored Data:")
        .StepToParent_NTimes(1)
        .Custom(AddButton, "default", "View", ShowModal_AddContent.bind(this, Add_Settings_Tracked_Data_Modal_Content, false), "no_margin")
        .StepToParent_NTimes(1)
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Close", HideModal);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}