function Initialise_QuickNav() {
    var NavBar_Builder = Build_NavBar();
    var NavBar_Element = NavBar_Builder.ReturnResult();
    //console.log(NavBar_Element);
    //console.log(NavBar_Element.childNodes);
    document.body.append(NavBar_Element);

    var NavBarControls = FindChildById(NavBar_Element, "navbar_controls");

    var NavBar_NewsButton_Builder = Build_MenuButton(ShowModal_AddContent.bind(this, Add_News_Modal_Content, false)).Custom(SetBackgroundImage, "images/news.png");
    NavBarControls.append(NavBar_NewsButton_Builder.ReturnResult());

    var NavBar_ProfilesButton_Builder = Build_MenuButton(ShowModal_AddContent.bind(this, Add_Welcome_Modal_Content, false)).Custom(SetBackgroundImage, "images/profiles.png");
    NavBarControls.append(NavBar_ProfilesButton_Builder.ReturnResult());

    var NavBar_SettingsButton_Builder = Build_MenuButton(ShowModal_AddContent.bind(this, Add_Settings_Modal_Content, false)).Custom(SetBackgroundImage, "images/settings.png");
    NavBarControls.append(NavBar_SettingsButton_Builder.ReturnResult());
}





/*

Two Methods of creating buttons like this:

Build_MenuButton(ShowModal_AddContent.bind(this, AddDefaultContent, false)).ReturnResult();

OR

Build_MenuButton(News_Button).ReturnResult()

function News_Button() {
    ShowModal_AddContent(AddDefaultContent);
}

*/