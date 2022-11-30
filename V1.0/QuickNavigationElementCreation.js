function CreateSection(SectionName) {
    var newSection = document.createElement("div");
    newSection.id = SectionName;
    newSection.classList.add("section_container");

    var newSectionHeader = document.createElement("div");
    newSectionHeader.classList.add("section_header");
    newSection.appendChild(newSectionHeader);

    var newSectionHeaderTitle = document.createElement("h1");
    newSectionHeaderTitle.classList.add("section_header_h1");
    newSectionHeaderTitle.classList.add("small_header_text_color");
    newSectionHeaderTitle.innerHTML = SectionName;
    newSectionHeader.appendChild(newSectionHeaderTitle);

    var newSectionElements = document.createElement("div");
    newSectionElements.classList.add("section_elements");
    newSection.appendChild(newSectionElements);

    return newSection;
}

function CreateNavLinkContainer() {
    var newQuickNavLinkContianer = document.createElement("div");
    newQuickNavLinkContianer.classList.add("quick_nav_box_contianer");

    return newQuickNavLinkContianer;
}

function AddNavLinkToolsToContainer(newQuickNavLinkContianer) {
    var newToolBar = document.createElement("div");
    newToolBar.classList.add("quick_nav_tool_bar");
    newToolBar.classList.add("quick_nav_tool_bar_enabled");

    var moveLeftButton = document.createElement("a");
    moveLeftButton.classList.add("quick_nav_tool_bar_element");
    moveLeftButton.classList.add("utility_button_color");
    moveLeftButton.innerHTML = "<";

    var moveRightButton = document.createElement("a");
    moveRightButton.classList.add("quick_nav_tool_bar_element");
    moveRightButton.classList.add("utility_button_color");
    moveRightButton.innerHTML = ">";

    var deleteButton = document.createElement("a");
    deleteButton.classList.add("quick_nav_tool_bar_element");
    deleteButton.classList.add("utility_button_color");
    deleteButton.classList.add("quick_nav_tool_bar_element_delete");
    deleteButton.innerHTML = "x";

    newToolBar.appendChild(moveLeftButton);
    newToolBar.appendChild(moveRightButton);
    newToolBar.appendChild(deleteButton);

    newQuickNavLinkContianer.appendChild(newToolBar);

    return {
        ["ToolBar"]: newToolBar,
        ["Left"]: moveLeftButton,
        ["Right"]: moveRightButton,
        ["Delete"]: deleteButton
    }
}

function AddNavLinkToContainer(newQuickNavLinkContianer, NavLink) {
    var newQuickNavLink = document.createElement("a");
    newQuickNavLink.classList.add("quick_nav_box");
    newQuickNavLink.classList.add("detail_color");
    newQuickNavLink.classList.add("quick_nav_nav_link_background");
    newQuickNavLink.href = NavLink.Link;
    newQuickNavLink.target = NavLink.Target;

    //var imageURL = NavLink.Link + "/favicon.ico";
    //var imageURL = "http://www.google.com/s2/favicons?domain=" + NavLink.Link;
    var imageURL = "http://f1.allesedv.com/32/" + NavLink.Link;
    newQuickNavLink.style.backgroundImage = "url('" + imageURL + "')";

    var newQuickNavLinkDesc = document.createElement("div");
    newQuickNavLinkDesc.classList.add("quick_nav_box_desc");
    newQuickNavLinkDesc.classList.add("quick_nav_center_text");
    newQuickNavLinkDesc.classList.add("small_header_text_color");
    newQuickNavLinkDesc.innerHTML = NavLink.Name;

    newQuickNavLinkContianer.appendChild(newQuickNavLink);
    newQuickNavLinkContianer.appendChild(newQuickNavLinkDesc);
}

function AddNavLinkContainerToSection(Section, newQuickNavLinkContianer) {
    var section_elements = Section.children[1]
    section_elements.appendChild(newQuickNavLinkContianer);
}

function AddInsertQuickNavLinkButton(Section) {
    var section_elements = Section.children[1]

    var newQuickNavLink = document.createElement("a");
    newQuickNavLink.classList.add("quick_nav_box_add_element");
    newQuickNavLink.classList.add("header_text_color");
    newQuickNavLink.classList.add("quick_nav_center_text");
    newQuickNavLink.innerHTML = "+";

    section_elements.appendChild(newQuickNavLink);

    return newQuickNavLink;
}