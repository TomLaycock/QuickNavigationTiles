function Add_Profile_Management_Modal_Content() {
    var profiles = GetTrackedProfiles();

    var builder = new ElementBuilder("div", "modal_content");
    builder.AddChild("h6", null, "modal_title_padding")
        .Custom(AddInnerHtml, "Profile Management")
        .ReturnToRoot()
        .AddChild("div", null, "scrollable_content max_height_30vh")
        .AddChild("div", null, "modal_content_row max_height_30vh ten_px_margin_top");

    for (let index = 0; index < profiles.length; index++) {
        var profileName = profiles[index] + "_qnt_profile";
        var profileJsonData = GetItem(profileName);
        if (profileJsonData === undefined || profileJsonData === null) continue;

        var profileData = JSON.parse(profileJsonData);

        builder.AddChild("div", null, "modal_2_row profile_hover_selector two_px_bottom_margin")
            .Custom(AddElementButton, profileData.profileName, SelectProfileWrapper.bind(this, profiles[index]), "element_button profile_selector_image", profileData.profileImageUrl)
            .StepToParent_NTimes(1);
    }

    builder.Custom(AddButton, "element", "+", ShowModal_AddContent.bind(this, Add_Profile_Creation_Modal_Content, false), "element_button")
        .ReturnToRoot()
        .AddChild("div", "modal_controls")
        .Custom(AddButton, "cancel", "Close", HideModal);

    var modal = FindChildById(active_modal, "modal");
    modal.append(builder.ReturnResult());
}

function SelectProfileWrapper(profile) {
    console.log("Select Wrapper:");
    console.log(profile);
    SetActiveProfile(profile);
    HideModal();
}