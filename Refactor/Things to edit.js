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

    Configs[config.Name] = config;
    ConfigNames.push(config.Name);
    addConfigToSelector(config.Name, true, false, false);
}



function DeleteProfile() {
    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");

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

    var elementToDelete = document.getElementById("ID:" + CurrentActiveConfig);
    elementToDelete.remove();

    window.localStorage.removeItem(CurrentActiveConfig);

    activateConfig("Default");
    closeAllMenus();
}

function InitialiseQuickNavigation() {
    var CurrentConfigs = JSON.parse(window.localStorage.getItem("ConfigNames"));
    var ConfigNameDuplicateCheck = {}

    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");
    if (CurrentConfigs == null) { return; }

    CurrentConfigs.forEach(configName => {
        if (ConfigNameDuplicateCheck[configName] == null || ConfigNameDuplicateCheck[configName] == false) {
            ConfigNameDuplicateCheck[configName] = true;
            if (configName != "Default") {
                var LoadedConfig = JSON.parse(window.localStorage.getItem(configName));
                Configs[configName] = LoadedConfig;
                ConfigNames.push(configName);
                addConfigToSelector(configName, false, false);
                if (configName == CurrentActiveConfig) {
                    activateConfig(configName);
                }
            }
        }
    });
}

function SaveJsonToFileAndSetAsDownload() {
    var CurrentConfigName = window.localStorage.getItem("CurrentConfig");
    var ConfigJsonData = window.localStorage.getItem(CurrentConfigName);
    var data = new Blob([ConfigJsonData], { type: 'application/json' });

    if (FileToDownload !== null) {
        window.URL.revokeObjectURL(FileToDownload);
    }

    FileToDownload = window.URL.createObjectURL(data);

    var ExportButton = document.getElementById("masked_download_button");
    ExportButton.href = FileToDownload;
    ExportButton.download = CurrentConfigName;
    ExportButton.click();
}

var LoadConfigMenuOpen = false

function toggleLoadConfigMenu(useToggle = false) {
    if (useToggle) {
        closeAllMenus(0);
    }

    LoadConfigMenuOpen = !LoadConfigMenuOpen;

    let quick_nav_manage_profiles_menu = document.getElementById("quick_nav_manage_profiles_menu");

    if (LoadConfigMenuOpen) {
        quick_nav_manage_profiles_menu.style.display = "flex";
    } else {
        quick_nav_manage_profiles_menu.style.display = "none";
    }
}

var addSectionMenuOpen = false

function toggleAddSectionMenu(useToggle = false) {
    if (useToggle) {
        closeAllMenus(1);
    }

    addSectionMenuOpen = !addSectionMenuOpen;

    let quick_nav_menu = document.getElementById("quick_nav_add_section_menu");

    if (addSectionMenuOpen) {
        quick_nav_menu.style.display = "flex";
    } else {
        quick_nav_menu.style.display = "none";
    }
}

var NewLinkMenuOpen = false

function toggleNewLinkMenu(useToggle = false) {
    if (useToggle) {
        closeAllMenus(2);
    }

    NewLinkMenuOpen = !NewLinkMenuOpen;

    let quick_nav_menu = document.getElementById("quick_nav_add_link_menu");

    if (NewLinkMenuOpen) {
        quick_nav_menu.style.display = "flex";
    } else {
        quick_nav_menu.style.display = "none";
    }
}

function closeAllMenus(callerId = -1) {
    if (LoadConfigMenuOpen && callerId != 0) {
        toggleLoadConfigMenu(true);
    }
    if (addSectionMenuOpen && callerId != 1) {
        toggleAddSectionMenu(true);
    }
    if (NewLinkMenuOpen && callerId != 2) {
        toggleNewLinkMenu(true);
    }
}



function AddQuickNavButtonToSection(SectionName) {
    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");

    var NewNavLink = new QuickNavLink();

    var NameElement = document.getElementById("quick_nav_new_link_name_text");
    NewNavLink.Name = NameElement.value;
    NameElement.value = "";

    var LinkElement = document.getElementById("quick_nav_new_link_link_text");
    var LinkElementValue = LinkElement.value;
    if (!LinkElementValue.includes("https://")) {
        LinkElementValue = "https://" + LinkElementValue;
    }
    NewNavLink.Link = LinkElementValue;
    LinkElement.value = "";

    var NewTarget = document.getElementById("quick_nav_new_link_target_text");
    if (!(NewTarget.value == "_self" || NewTarget.value == "_blank")) {
        NewTarget.value = "_blank";
    }
    NewNavLink.Target = NewTarget.value;
    NewTarget.value = "";

    var SecctionFound = Configs[CurrentActiveConfig].Sections.find(element => element.Name == SectionName);
    SecctionFound.QuickNavLinks.push(NewNavLink);

    console.log(Configs[CurrentActiveConfig]);
    window.localStorage.setItem(CurrentActiveConfig, JSON.stringify(Configs[CurrentActiveConfig]));

    var Section = document.getElementById(SectionName);
    AddNavLinkToSection(Section, NewNavLink);

    closeAllMenus();
}