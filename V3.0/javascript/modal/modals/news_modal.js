function Add_News_Modal_Content() {
    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "News")
        .ReturnToRoot()
        .AddChild("p")
        .Custom(AddInnerHtml, "Quick Nav V3.0 improves on profile management, link editing, styling, data management, sharing and many more.")
        .ReturnToRoot()
        .AddChild("h7")
        .Custom(AddInnerHtml, "New Features:")
        .ReturnToRoot()
        .Custom(AddTextList,
            "News Page",
            "Saved Data Management",
            "Individual Profile Management",
            "Profile Exporting"
        )
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Close", HideModal);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}