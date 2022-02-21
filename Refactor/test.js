var Configs = {}
var ConfigNames = []
var FileToDownload = null;

/* BASE FUNCTIONS */
function GetElmByID(ElementId) {
    return document.getElementById(ElementId);
}

function GetElmsByCls(ElementClassName) {
    return document.getElementsByClassName(ElementClassName);
}

function AddClickListnerToButton(ButtonToAddTo, FunctionToCall) {
    ButtonToAddTo.addEventListener("click", FunctionToCall);
}

function ArrayContains(ArrayToCheck, Element) {
    ArrayToCheck.forEach(value => {
        if (Element == value) {
            return true;
        }
    });

    return false;
}

function RemoveAllChildrenFromElement(ElementToRemoveFrom) {
    while (ElementToRemoveFrom.firstChild) {
        ElementToRemoveFrom.removeChild(ElementToRemoveFrom.lastChild);
    }
}

/* SAVING PROFILES TO STORAGE */
function UpdateLocalConfigStorage() {
    window.localStorage.setItem("ConfigNames", JSON.stringify(ConfigNames));
}

function SaveConfigToStorage(Name, ConfigJSONString) {
    window.localStorage.setItem(Name, ConfigJSONString);
}

function SaveCurrentActiveConfig(ConfigName) {
    window.localStorage.setItem("CurrentConfig", ConfigName);
}

/* GETTING LOCAL STORAGE DATA */
function GetCurrentActiveConfig() {
    return window.localStorage.getItem("CurrentConfig");
}

/* PROFILE FILE LOADING */
function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}

function loadConfig() {
    let QuickNavigationConfigFile = document.getElementById("quick_nav_config_upload").files[0];
    if (QuickNavigationConfigFile != null) {
        readFile(QuickNavigationConfigFile, loadConfigReadFileCallback);
    }
    toggleLoadConfigMenu();
}

function convertJSONtoConfig(configJSON) {
    var config = new Config();

    config.Name = configJSON.Name;

    configJSON.Sections.forEach(element => {
        var newSection = new Section();
        newSection.Name = element.Name;
        element.QuickNavLinks.forEach(quickNavLink => {
            var newQuickNavLink = new QuickNavLink();
            newQuickNavLink.Name = quickNavLink.Name;
            newQuickNavLink.Link = quickNavLink.Link;
            newQuickNavLink.Target = quickNavLink.Target;
            newSection.QuickNavLinks.push(newQuickNavLink);
        });
        config.Sections.push(newSection);
    });

    return config;
}

function loadConfigReadFileCallback(LoadedFile) {
    var config = convertJSONtoConfig(JSON.parse(LoadedFile.target.result));
    Configs[config.Name] = config;

    if (!ArrayContains(ConfigNames, config.Name)) {
        ConfigNames.push(config.Name);
    }

    SaveConfigToStorage(config.Name, JSON.stringify(config));

    addConfigToSelector(config.Name);
    UpdateLocalConfigStorage();
    activateConfig(config.Name);
}

function addConfigToSelector(configToAdd) {
    var configSelector = GetElmByID("config_select");

    if (!ArrayContains(Array.from(configSelector.options), configToAdd)) {
        var option = document.createElement("option");
        option.classList.add("quick_nav_option_element");
        option.classList.add("sub_detail_color");
        option.classList.add("quick_nav_small_title");
        option.classList.add("small_header_text_color");
        option.classList.add("quick_nav_center_text");
        option.text = configToAdd;
        option.id = "ID:" + configToAdd;
        configSelector.add(option);
    }
}

function setQuickNavTitle(Value) {
    GetElmByID("quick_nav_title").innerHTML = Value;
}

function activateConfig(configName) {
    setQuickNavTitle(Configs[configName].Name);

    var configSelector = GetElmByID("config_select");
    configSelector.value = configToAdd;

    var container = GetElmByID("quick_nav_section_container");
    RemoveAllChildrenFromElement(container);

    Configs[configName].Sections.forEach(section => {
        var newSection = CreateSection(section.Name);
        section.QuickNavLinks.forEach(quickNavLink => {
            AddNavLinkToSection(newSection, quickNavLink);
        });
        container.appendChild(newSection);
        var AddQuickNavButton = AddInsertQuickNavLinkButton(newSection);
        AddQuickNavButton.addEventListener("click", SetValuesForSectionToAddLinkTo.bind(this, section.Name));
    });

    SaveConfigToStorage(configName);
}

function SetValuesForSectionToAddLinkTo(SectionName) {
    var SectionToAddLinkTo = GetElmByID("quick_nav_new_link_section_text");
    SectionToAddLinkTo.innerHTML = "Section: " + SectionName;

    var CreateNewLinkButton = GetElmByID("quick_nav_new_link_button");

    CreateNewLinkButton.onclick = function() {
        AddQuickNavButtonToSection(SectionName);
    }

    if (!NewLinkMenuOpen) {
        toggleNewLinkMenu();
    }
}

/* PROFILE EDITING */
function NewProfile() {
    var ValueObject = GetElmByID("quick_nav_new_profile_text");

    var NewConfig = new Config();
    NewConfig.Name = ValueObject.value;

    if (ArrayContains(ConfigNames, NewConfig.Name)) {
        return;
    }

    Configs[NewConfig.Name] = NewConfig;
    ConfigNames.push(NewConfig.Name);

    addConfigToSelector(NewConfig.Name);

    activateConfig(NewConfig.Name);

    SaveConfigToStorage(NewConfig.Name, JSON.stringify(NewConfig));
    UpdateLocalConfigStorage();

    ValueObject.value = "";

    closeAllMenus();
}

function addSection() {
    var CurrentActiveConfig = GetCurrentActiveConfig();

    var ValueObject = GetElmByID("quick_nav_add_section_text");

    var SectionToAdd = new Section();
    SectionToAdd.Name = ValueObject.value;

    Configs[CurrentActiveConfig].Sections.push(SectionToAdd);

    SaveConfigToStorage(CurrentActiveConfig, JSON.stringify(Configs[CurrentActiveConfig]));

    activateConfig(CurrentActiveConfig);
    ValueObject.value = "";
}

/*
    ----------------------------------------------------------------------------
    ---------------------------- PROGRAM ENTRY POINT ---------------------------
    ----------------------------------------------------------------------------
*/
window.onload = function() {
    createDefaultConfig();
    InitialiseQuickNavigation();

    AddClickListnerToButton(GetElmByID("quick_nav_config_submit_button"), loadConfig);
    AddClickListnerToButton(GetElmByID("quick_nav_manage_profiles_button"), toggleLoadConfigMenu);
    AddClickListnerToButton(GetElmByID("download_config_button"), SaveJsonToFileAndSetAsDownload);
    AddClickListnerToButton(GetElmByID("quick_nav_add_section_button"), toggleAddSectionMenu);
    AddClickListnerToButton(GetElmByID("quick_nav_add_section_to_config_button"), addSection);
    AddClickListnerToButton(GetElmByID("quick_nav_delete_profile_button"), DeleteProfile);
    AddClickListnerToButton(GetElmByID("quick_nav_new_profile_button"), NewProfile);

    Array.from(GetElmsByCls("close_button")).forEach(function(Button) {
        AddClickListnerToButton(Button, closeAllMenus);
    });

    GetElmByID("config_select").addEventListener('change', (event) => {
        activateConfig(event.target.value);
    });
}