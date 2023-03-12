function AddSelectedProfileInformation() {
    var selectedProfileInfoElement = document.getElementById("navbar_selected_profile");
    var selectedProfileInfoInteriorElement = document.getElementById("navbar_selected_profile_interior");

    if (!IsNullOrUndefined(selectedProfileInfoInteriorElement)) selectedProfileInfoElement.removeChild(selectedProfileInfoInteriorElement);

    var activeProfileName = GetActiveProfile();
    if (activeProfileName !== null && activeProfileName !== undefined) {
        var builder = new ElementBuilder("div", "navbar_selected_profile_interior");

        builder.AddChild("div", null, "divider_bar ten_px_right_margin", false);

        var profileJsonData = GetItem(activeProfileName + "_qnt_profile");
        if (profileJsonData !== undefined && profileJsonData !== null) {
            var profileData = JSON.parse(profileJsonData);

            console.log(profileData);

            builder.AddChild("div", null, "navbar_icon ten_px_right_margin")
                .Custom(SetBackgroundImage, profileData.profileImageUrl)
                .StepToParent_NTimes(1);

            builder.AddChild("h7", null, "navbar_profile_text")
                .Custom(AddInnerHtml, profileData.profileName)
                .StepToParent_NTimes(2);
        }

        selectedProfileInfoElement.append(builder.ReturnResult());
    }
}

function Build_NavBar() {
    var builder = new ElementBuilder("div", "navbar");

    builder.AddChild("div", "navbar_title")
        .AddChild("h1")
        .Custom(AddInnerHtml, "Quick Nav 3.0")
        .Custom(AddClass, "ten_px_right_margin")
        .StepToParent_NTimes(1)
        .AddChild("div", "navbar_selected_profile")
        .StepToParent_NTimes(2)
        .AddChild("div", "navbar_controls");

    return builder;
}