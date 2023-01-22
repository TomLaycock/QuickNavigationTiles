function Build_NavBar() {
    var builder = new ElementBuilder("div", "navbar");

    builder.AddChild("div", "navbar_title").AddChild("h1").Custom(AddInnerHtml, "Quick Nav 3.0").StepToParent_NTimes(2).AddChild("div", "navbar_controls");

    return builder;
}