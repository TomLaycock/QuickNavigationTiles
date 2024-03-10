/* OBJECTS */

class ProfileSelectorData {
    profileName = null
    profileImageUrl = null
}

class Profile {
    Name = null
    Sections = []
}

class Section {
    Name = null
    QuickNavLinks = []
}

class QuickNavLink {
    Name = null
    Link = null
    Target = null
    AltImgUrl = null
}

/* DATA MANAGEMENT */

function GetTrackedProfiles() {
    var saved_data = GetItem("qnt_saved_profiles");

    if (saved_data === undefined || saved_data == null)
        saved_data = [];
    else
        saved_data = JSON.parse(saved_data);

    return saved_data;
}

function SetActiveProfile(profile) {
    SaveItem("qnt_active_profile", profile);
    AddSelectedProfileInformation();
}

function GetActiveProfile() {
    var activeProfileData = GetItem("qnt_active_profile");
    console.log(activeProfileData);
    return activeProfileData;
}


/* UTILITY */

function CreateProfile(name, imageUrl) {
    var profiles = GetTrackedProfiles();

    if (profiles.includes(name)) return;
    if (name === undefined || name === null) return;

    profiles.push(name);
    SaveItem("qnt_saved_profiles", JSON.stringify(profiles));

    var newProfileSelector = new ProfileSelectorData();
    newProfileSelector.profileName = name;
    newProfileSelector.profileImageUrl = imageUrl;

    SaveItem(name + "_qnt_profile", JSON.stringify(newProfileSelector));
    SetActiveProfile(name);
}