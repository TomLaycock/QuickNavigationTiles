function Build_MenuButton(func) {
    var builder = new ElementBuilder("button", null, "navbar_button");

    builder.Custom(OnClick, func);

    return builder;
}