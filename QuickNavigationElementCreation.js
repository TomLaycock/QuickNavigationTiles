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

function AddNavLinkToSection(Section, NavLink) {
    var section_elements = Section.children[1]

    var newQuickNavLinkContianer = document.createElement("div");
    newQuickNavLinkContianer.classList.add("quick_nav_box_contianer");

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

/*

<div class="section_container">
    <div class="section_header">
        <h1 class="section_header_h1 small_header_text_color">Section Title</h1>
    </div>
    <div class="section_elements">
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box"></a>
        <a class="quick_nav_box_add_element header_text_color quick_nav_center_text"> + </a>
    </div>
</div>

*/