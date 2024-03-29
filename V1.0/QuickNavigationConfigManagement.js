var Configs = {}
var ConfigNames = []
var FileToDownload = null;
var EDITING_ACTIVE = false;

/* EXTENSIONS */
Array.prototype.swap = function(First, Second) {
    if (First >= 0 && First < this.length && Second >= 0 && Second < this.length) {
        var ElementOne = this[First];
        this[First] = this[Second];
        this[Second] = ElementOne;
    }
    return this;
}

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
    var DoesArrayContainElement = false;

    ArrayToCheck.forEach(function(value) {
        if (Element == value) {
            DoesArrayContainElement = true;
        }
    });

    return DoesArrayContainElement;
}

function ArrayContainsForSelector(ArrayToCheck, Element) {
    var DoesArrayContainElement = false;

    ArrayToCheck.forEach(function(Option) {
        if (Element == Option.value) {
            DoesArrayContainElement = true;
        }
    });

    return DoesArrayContainElement;
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

function GetConfigByName(ConfigName) {
    return window.localStorage.getItem(ConfigName);
}

function GetAllConfigNames() {
    return window.localStorage.getItem("ConfigNames");
}

/* DELETING ITEMS */
function DeleteConfig(ConfigName) {
    window.localStorage.removeItem(ConfigName);
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
    CloseAllMenus();
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

    config.Settings = configJSON.Settings;

    return config;
}

function loadConfigReadFileCallback(LoadedFile) {
    var config = convertJSONtoConfig(JSON.parse(LoadedFile.target.result));
    Configs[config.Name] = config;

    var DoesConfigAlreadyExist = ArrayContains(ConfigNames, config.Name);

    if (!DoesConfigAlreadyExist) {
        ConfigNames.push(config.Name);
    }

    SaveConfigToStorage(config.Name, JSON.stringify(config));

    if (!DoesConfigAlreadyExist) {
        addConfigToSelector(config.Name);
        UpdateLocalConfigStorage();
    }

    activateConfig(config.Name);
    SaveCurrentActiveConfig(config.Name);
}

function addConfigToSelector(configToAdd) {
    var configSelector = GetElmByID("config_select");

    if (!ArrayContainsForSelector(Array.from(configSelector.options), configToAdd)) {
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
    configSelector.value = configName;

    var container = GetElmByID("quick_nav_section_container");
    RemoveAllChildrenFromElement(container);

    var SectionCounter = 0;
    Configs[configName].Sections.forEach(section => {
        var newSection = CreateSection(section.Name);

        var QuickNavLinkCounter = 0;
        section.QuickNavLinks.forEach(quickNavLink => {
            var newContainer = CreateNavLinkContainer();
            var containerToolBar = AddNavLinkToolsToContainer(newContainer);

            if (EDITING_ACTIVE) {
                containerToolBar["ToolBar"].style.display = "flex";
            }

            containerToolBar["Left"].addEventListener("click", MoveItem.bind(this, SectionCounter, QuickNavLinkCounter, -1));
            containerToolBar["Right"].addEventListener("click", MoveItem.bind(this, SectionCounter, QuickNavLinkCounter, 1));
            containerToolBar["Delete"].addEventListener("click", DeleteQuickNavItem.bind(this, SectionCounter, QuickNavLinkCounter));

            AddNavLinkToContainer(newContainer, quickNavLink);
            AddNavLinkContainerToSection(newSection, newContainer);
            QuickNavLinkCounter += 1;
        });
        container.appendChild(newSection);
        var AddQuickNavButton = AddInsertQuickNavLinkButton(newSection);
        AddQuickNavButton.addEventListener("click", SetValuesForSectionToAddLinkTo.bind(this, section.Name));

        SectionCounter += 1;
    });

    if (Configs[configName].Settings != undefined && Configs[configName].Settings != null) {
        if (Configs[configName].Settings["BGC"] != null) {
            ChangeBackgroundColor(Configs[configName].Settings["BGC"]);
            GetElmByID("background_color_selector").value = Configs[configName].Settings["BGC"];
        }

        if (Configs[configName].Settings["MBGC"] != null) {
            ChangeMainBackgroundColor(Configs[configName].Settings["MBGC"]);
            GetElmByID("main_background_color_selector").value = Configs[configName].Settings["MBGC"];
        }

        if (Configs[configName].Settings["SBGC"] != null) {
            ChangeSubBackgroundColor(Configs[configName].Settings["SBGC"]);
            GetElmByID("sub_background_color_selector").value = Configs[configName].Settings["SBGC"];
        }

        if (Configs[configName].Settings["MBOC"] != null) {
            ChangeMainBorderColor(Configs[configName].Settings["MBOC"]);
            GetElmByID("main_border_color_selector").value = Configs[configName].Settings["MBOC"];
        }

        if (Configs[configName].Settings["BBGC"] != null) {
            ChangeButtonBackgroundColor(Configs[configName].Settings["BBGC"]);
            GetElmByID("button_background_color_selector").value = Configs[configName].Settings["BBGC"];
        }

        if (Configs[configName].Settings["BBFGC"] != null) {
            ChangeButtonBackgroundFadeColor(Configs[configName].Settings["BBFGC"]);
            GetElmByID("button_background_fade_color_selector").value = Configs[configName].Settings["BBFGC"];
        }

        if (Configs[configName].Settings["BBOGC"] != null) {
            ChangeButtonBorderColor(Configs[configName].Settings["BBOGC"]);
            GetElmByID("button_border_color_selector").value = Configs[configName].Settings["BBOGC"];
        }
    }

    if (configName != "Default") {
        SaveConfigToStorage(configName, JSON.stringify(Configs[configName]));
    }
}

function DeleteQuickNavItem(SectionNo, ItemNo) {
    var CurrentActiveConfigName = GetCurrentActiveConfig();
    Configs[CurrentActiveConfigName].Sections[SectionNo].QuickNavLinks.splice(ItemNo, 1);
    activateConfig(CurrentActiveConfigName);
}

function MoveItem(SectionNo, ItemNo, Direction) {
    var CurrentActiveConfigName = GetCurrentActiveConfig();
    Configs[CurrentActiveConfigName].Sections[SectionNo].QuickNavLinks.swap(ItemNo, ItemNo + Direction);
    activateConfig(CurrentActiveConfigName);
}

function SetValuesForSectionToAddLinkTo(SectionName) {
    var SectionToAddLinkTo = GetElmByID("quick_nav_new_link_section_text");
    SectionToAddLinkTo.innerHTML = "Section: " + SectionName;

    var CreateNewLinkButton = GetElmByID("quick_nav_new_link_button");

    CreateNewLinkButton.onclick = function() {
        AddQuickNavButtonToSection(SectionName);
    }

    OpenMenu("quick_nav_add_link_menu");
}

function SaveJsonToFileAndSetAsDownload() {
    var CurrentConfigName = GetCurrentActiveConfig();
    var ConfigJsonData = GetConfigByName(CurrentConfigName);
    var data = new Blob([ConfigJsonData], { type: 'application/json' });

    if (FileToDownload !== null) {
        window.URL.revokeObjectURL(FileToDownload);
    }

    FileToDownload = window.URL.createObjectURL(data);

    var ExportButton = GetElmByID("masked_download_button");
    ExportButton.href = FileToDownload;
    ExportButton.download = CurrentConfigName;
    ExportButton.click();
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
    SaveCurrentActiveConfig(NewConfig.Name);

    SaveConfigToStorage(NewConfig.Name, JSON.stringify(NewConfig));
    UpdateLocalConfigStorage();

    ValueObject.value = "";

    CloseAllMenus();
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

function AddQuickNavButtonToSection(SectionName) {
    var CurrentActiveConfig = GetCurrentActiveConfig();

    var NewNavLink = new QuickNavLink();

    var NameElement = GetElmByID("quick_nav_new_link_name_text");
    NewNavLink.Name = NameElement.value;
    NameElement.value = "";

    var LinkElement = GetElmByID("quick_nav_new_link_link_text");
    var LinkElementValue = LinkElement.value;
    /*if (!LinkElementValue.includes("https://") || !LinkElementValue.includes("http://")) {
        LinkElementValue = "https://" + LinkElementValue;
    }*/
    NewNavLink.Link = LinkElementValue;
    LinkElement.value = "";

    var NewTarget = GetElmByID("quick_nav_new_link_target_text");
    if (!(NewTarget.value == "_self" || NewTarget.value == "_blank")) {
        NewTarget.value = "_blank";
    }
    NewNavLink.Target = NewTarget.value;
    NewTarget.value = "";

    var SecctionFound = Configs[CurrentActiveConfig].Sections.find(element => element.Name == SectionName);
    SecctionFound.QuickNavLinks.push(NewNavLink);

    activateConfig(CurrentActiveConfig);
    CloseAllMenus();
}

function DeleteProfile() {
    var CurrentActiveConfig = GetCurrentActiveConfig();

    if (CurrentActiveConfig == "Default") {
        return;
    }

    var newConfigNames = []
    ConfigNames.forEach(element => {
        if (element != CurrentActiveConfig) {
            newConfigNames.push(element);
        }
    });

    ConfigNames = newConfigNames;
    UpdateLocalConfigStorage();

    var elementToDelete = GetElmByID("ID:" + CurrentActiveConfig);
    elementToDelete.remove();

    DeleteConfig(CurrentActiveConfig);

    activateConfig("Default");
    SaveCurrentActiveConfig("Default");
    CloseAllMenus();
}

function ToggleEditing() {
    EDITING_ACTIVE = !EDITING_ACTIVE;

    var toolBars = document.getElementsByClassName("quick_nav_tool_bar_enabled");

    if (EDITING_ACTIVE) {
        for (var i = 0; i < toolBars.length; i++) {
            toolBars[i].style.display = "flex";
        }
        return;
    }

    for (var i = 0; i < toolBars.length; i++) {
        toolBars[i].style.display = "none";
    }
}

/* MENU STATE MANAGEMENT */
var MenuNames = []

function OpenMenu(MenuId) {
    if (!ArrayContains(MenuNames, MenuId)) {
        MenuNames.push(MenuId);
    }

    let MenuFound = GetElmByID(MenuId);
    MenuFound.style.display = "flex";
}

function CloseMenu(MenuId) {
    if (!ArrayContains(MenuNames, MenuId)) {
        MenuNames.push(MenuId);
    }

    let MenuFound = GetElmByID(MenuId);
    MenuFound.style.display = "none";
}

function CloseAllMenus() {
    MenuNames.forEach(MenuName => {
        CloseMenu(MenuName);
    })
}

/* INITIALISATION */

function InitialiseQuickNavigation() {
    var CurrentConfigs = JSON.parse(GetAllConfigNames());
    var ConfigNameDuplicateCheck = {}

    var CurrentActiveConfig = GetCurrentActiveConfig();
    if (CurrentConfigs == null) { return; }

    CurrentConfigs.forEach(configName => {
        if (ConfigNameDuplicateCheck[configName] == null || ConfigNameDuplicateCheck[configName] == false) {
            ConfigNameDuplicateCheck[configName] = true;
            if (configName != "Default") {
                var LoadedConfig = JSON.parse(GetConfigByName(configName));
                Configs[configName] = LoadedConfig;
                ConfigNames.push(configName);
                addConfigToSelector(configName);
            }
            if (configName == CurrentActiveConfig) {
                activateConfig(configName);
            }
        }
    });
}

function createDefaultConfig() {
    var config = new Config();

    config.Name = "Default";

    var WebsitesSection = {
        "Name": "Websites",
        "QuickNavLinks": [{
                "Name": "Google",
                "Link": "https://www.google.co.uk",
                "Target": "_self"
            },
            {
                "Name": "Gmail",
                "Link": "https://mail.google.com/mail/u/0/#inbox",
                "Target": "_self"
            },
            {
                "Name": "Youtube",
                "Link": "https://www.youtube.com",
                "Target": "_self"
            },
            {
                "Name": "Netflix",
                "Link": "https://www.netflix.com/browse",
                "Target": "_self"
            }
        ]
    };

    var SocialsSection = {
        "Name": "Socials",
        "QuickNavLinks": [{
                "Name": "Facebook",
                "Link": "https://www.facebook.com",
                "Target": "_self"
            },
            {
                "Name": "Twitter",
                "Link": "https://www.twitter.com",
                "Target": "_self"
            },
            {
                "Name": "Instagram",
                "Link": "https://www.instagram.com",
                "Target": "_self"
            }
        ]
    };

    config.Sections.push(WebsitesSection);
    config.Sections.push(SocialsSection);

    config.Settings = { "BGC": "#696969", "MBGC": "#bababa", "SBGC": "#a8a8a8", "MBOC": "#8a8a8a", "BBGC": "#ababab", "BBFGC": "#787878", "BBOGC": "#4d4d4d" }

    Configs[config.Name] = config;
    ConfigNames.push(config.Name);
    addConfigToSelector(config.Name);
    activateConfig(config.Name);

    var CurrentActiveConfigValue = GetCurrentActiveConfig();
    if (CurrentActiveConfigValue == null || CurrentActiveConfigValue == "") {
        SaveCurrentActiveConfig("Default");
    }
}

/* RESET DATA */
var ResetDataAtStart = false;

function CompleteReset() {
    window.localStorage.clear();
    SaveCurrentActiveConfig("Default");
}

/* Settings for Colors */
function UpdateColor(ColorToUpdate, Event) {
    var CurrentActiveConfigName = GetCurrentActiveConfig();

    switch (ColorToUpdate) {
        case "BGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeBackgroundColor(Event);
            break;
        case "MBGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeMainBackgroundColor(Event);
            break;
        case "SBGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeSubBackgroundColor(Event);
            break;
        case "MBOC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeMainBorderColor(Event);
            break;
        case "BBGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeButtonBackgroundColor(Event);
            break;
        case "BBFGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeButtonBackgroundFadeColor(Event);
            break;
        case "BBOGC":
            Configs[CurrentActiveConfigName].Settings[ColorToUpdate] = Event.target.value;
            ChangeButtonBorderColor(Event);
            break;
    }

    if (CurrentActiveConfigName != "Default") {
        SaveConfigToStorage(CurrentActiveConfigName, JSON.stringify(Configs[CurrentActiveConfigName]));
    }
}

/*
    ----------------------------------------------------------------------------
    ---------------------------- PROGRAM ENTRY POINT ---------------------------
    ----------------------------------------------------------------------------
*/
window.onload = function() {
    if (ResetDataAtStart) { CompleteReset(); }

    createDefaultConfig();
    InitialiseQuickNavigation();

    AddClickListnerToButton(GetElmByID("quick_nav_config_submit_button"), loadConfig);
    AddClickListnerToButton(GetElmByID("quick_nav_toggle_columns"), ToggleColumnMode);
    AddClickListnerToButton(GetElmByID("quick_nav_toggle_editing"), ToggleEditing);
    AddClickListnerToButton(GetElmByID("quick_nav_manage_profiles_button"), OpenMenu.bind(this, "quick_nav_manage_profiles_menu"));
    AddClickListnerToButton(GetElmByID("download_config_button"), SaveJsonToFileAndSetAsDownload);
    AddClickListnerToButton(GetElmByID("quick_nav_add_section_button"), OpenMenu.bind(this, "quick_nav_add_section_menu"));
    AddClickListnerToButton(GetElmByID("quick_nav_add_section_to_config_button"), addSection);
    AddClickListnerToButton(GetElmByID("quick_nav_delete_profile_button"), DeleteProfile);
    AddClickListnerToButton(GetElmByID("quick_nav_new_profile_button"), NewProfile);
    AddClickListnerToButton(GetElmByID("quick_nav_settings_button"), OpenMenu.bind(this, "quick_nav_settings_menu"))

    Array.from(GetElmsByCls("close_button")).forEach(function(Button) {
        AddClickListnerToButton(Button, CloseAllMenus);
    });

    GetElmByID("config_select").addEventListener('change', (event) => {
        activateConfig(event.target.value);
        SaveCurrentActiveConfig(event.target.value);
    });

    GetElmByID("background_color_selector").addEventListener("input", UpdateColor.bind(this, "BGC"), false);
    GetElmByID("background_color_selector").addEventListener("change", UpdateColor.bind(this, "BGC"), false);

    GetElmByID("main_background_color_selector").addEventListener("input", UpdateColor.bind(this, "MBGC"), false);
    GetElmByID("main_background_color_selector").addEventListener("change", UpdateColor.bind(this, "MBGC"), false);

    GetElmByID("sub_background_color_selector").addEventListener("input", UpdateColor.bind(this, "SBGC"), false);
    GetElmByID("sub_background_color_selector").addEventListener("change", UpdateColor.bind(this, "SBGC"), false);

    GetElmByID("main_border_color_selector").addEventListener("input", UpdateColor.bind(this, "MBOC"), false);
    GetElmByID("main_border_color_selector").addEventListener("change", UpdateColor.bind(this, "MBOC"), false);

    GetElmByID("button_background_color_selector").addEventListener("input", UpdateColor.bind(this, "BBGC"), false);
    GetElmByID("button_background_color_selector").addEventListener("change", UpdateColor.bind(this, "BBGC"), false);

    GetElmByID("button_background_fade_color_selector").addEventListener("input", UpdateColor.bind(this, "BBFGC"), false);
    GetElmByID("button_background_fade_color_selector").addEventListener("change", UpdateColor.bind(this, "BBFGC"), false);

    GetElmByID("button_border_color_selector").addEventListener("input", UpdateColor.bind(this, "BBOGC"), false);
    GetElmByID("button_border_color_selector").addEventListener("change", UpdateColor.bind(this, "BBOGC"), false);
}