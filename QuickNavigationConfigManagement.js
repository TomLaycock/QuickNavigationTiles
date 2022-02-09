var Configs = {}
var ConfigNames = []
var FileToDownload = null;

function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}

function loadConfig(setAsActive = true, updateConfigsInStorage = true) {
    let QuickNavigationConfigFile = document.getElementById("quick_nav_config_upload").files[0];
    if (QuickNavigationConfigFile != null) {
        readFile(QuickNavigationConfigFile, function(e) {
            var QuickNavigationConfigContent = e.target.result;
            var QuickNavigationConfigJSON = JSON.parse(QuickNavigationConfigContent);
            var config = convertJSONtoConfig(QuickNavigationConfigJSON);

            // if (Configs[QuickNavigationConfigJSON.Name] != null) { console.warn("A config with the name: " + QuickNavigationConfigJSON.Name + " already exists!"); return; }
            Configs[QuickNavigationConfigJSON.Name] = config;

            var AddNameToConfigNames = true;
            console.log(ConfigNames);
            ConfigNames.forEach(value => {
                if (QuickNavigationConfigJSON.Name == value) {
                    AddNameToConfigNames = false;
                }
            });

            if (AddNameToConfigNames) {
                ConfigNames.push(QuickNavigationConfigJSON.Name);
            }

            window.localStorage.setItem(QuickNavigationConfigJSON.Name, JSON.stringify(config));

            addConfigToSelector(QuickNavigationConfigJSON.Name, setAsActive, updateConfigsInStorage);
        });
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

function activateConfig(configName, setAsActiveConfig = true) {
    console.log("ACTIVATING CONFIG: " + configName);
    document.getElementById("quick_nav_title").innerHTML = Configs[configName].Name;

    var container = document.getElementById("quick_nav_section_container");
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    Configs[configName].Sections.forEach(section => {
        var newSection = CreateSection(section.Name);
        section.QuickNavLinks.forEach(quickNavLink => {
            AddNavLinkToSection(newSection, quickNavLink);
        });
        container.appendChild(newSection);
        var AddQuickNavButton = AddInsertQuickNavLinkButton(newSection);
        AddQuickNavButton.addEventListener("click", AddQuickNavButtonToSection.bind(this, section.Name));
    });

    if (setAsActiveConfig) {
        window.localStorage.setItem("CurrentConfig", configName);
    }
}

function addConfigToSelector(configToAdd, setAsActive = false, updateConfigsInStorage = false, setAsActiveConfig = true) {
    var configSelector = document.getElementById("config_select");
    var addOptionToSelector = true;

    Array.from(configSelector.options).forEach(function(option_element) {
        if (option_element.text == configToAdd) {
            console.warn("A option with the name: " + configToAdd + " already exists!  -  Updating Active Config but Ignoring add to selector!");
            addOptionToSelector = false;
            return;
        }
    });

    if (addOptionToSelector) {
        var option = document.createElement("option");
        option.classList.add("quick_nav_option_element");
        option.classList.add("sub_detail_color");
        option.classList.add("quick_nav_small_title");
        option.classList.add("small_header_text_color");
        option.classList.add("quick_nav_center_text");
        option.text = configToAdd;
        configSelector.add(option);
    }

    if (setAsActive) {
        configSelector.value = configToAdd;
        activateConfig(configToAdd, setAsActiveConfig);
    }

    if (updateConfigsInStorage) {
        UpdateLocalConfigStorage();
    }
}

function createDefaultConfig() {
    var config = new Config();

    config.Name = "Default";

    var WebsitesSection = {
        "Name": "Websites",
        "QuickNavLinks": [{
            "Name": "Google",
            "Link": "https://www.google.co.uk",
            "Target": "_blank"
        }]
    };

    config.Sections.push(WebsitesSection);

    Configs[config.Name] = config;
    ConfigNames.push(config.Name);
    addConfigToSelector(config.Name, true, false, false);
}

function UpdateLocalConfigStorage() {
    window.localStorage.setItem("ConfigNames", JSON.stringify(ConfigNames));
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

    let quick_nav_load_config_menu = document.getElementById("quick_nav_load_config_menu");

    if (LoadConfigMenuOpen) {
        quick_nav_load_config_menu.style.display = "flex";
    } else {
        quick_nav_load_config_menu.style.display = "none";
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

function closeAllMenus(callerId = -1) {
    if (LoadConfigMenuOpen && callerId != 0) {
        toggleLoadConfigMenu(true);
    }
    if (addSectionMenuOpen && callerId != 1) {
        toggleAddSectionMenu(true);
    }
}

function AddQuickNavButtonToSection(SectionName) {
    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");

    var NewNavLink = new QuickNavLink();
    NewNavLink.Name = "Test";
    NewNavLink.Link = "https://www.youtube.com/";
    NewNavLink.Target = "_blank";

    var SecctionFound = Configs[CurrentActiveConfig].Sections.find(element => element.Name == SectionName);
    SecctionFound.QuickNavLinks.push(NewNavLink);

    console.log(Configs[CurrentActiveConfig]);
    window.localStorage.setItem(CurrentActiveConfig, JSON.stringify(Configs[CurrentActiveConfig]));

    var Section = document.getElementById(SectionName);
    AddNavLinkToSection(Section, NewNavLink);
}

function addSection() {
    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");

    var ValueObject = document.getElementById("quick_nav_add_section_text");

    var SectionToAdd = new Section();
    SectionToAdd.Name = ValueObject.value;

    Configs[CurrentActiveConfig].Sections.push(SectionToAdd);

    activateConfig(CurrentActiveConfig);
    ValueObject.value = "";
}

window.onload = function() {
    createDefaultConfig();
    InitialiseQuickNavigation();

    let ConfigSubmitButton = document.getElementById("quick_nav_config_submit_button");
    ConfigSubmitButton.addEventListener("click", loadConfig);

    let LoadConfigMenuButton = document.getElementById("quick_nav_load_config_button");
    LoadConfigMenuButton.addEventListener("click", toggleLoadConfigMenu);

    let ConfigExportButton = document.getElementById("download_config_button");
    ConfigExportButton.addEventListener("click", SaveJsonToFileAndSetAsDownload);

    let AddSectionMenuButton = document.getElementById("quick_nav_add_section_button");
    AddSectionMenuButton.addEventListener("click", toggleAddSectionMenu);

    let AddSectionToConfigButton = document.getElementById("quick_nav_add_section_to_config_button");
    AddSectionToConfigButton.addEventListener("click", addSection);

    let CloseButtons = document.getElementsByClassName("close_button");
    Array.from(CloseButtons).forEach(function(button) {
        button.addEventListener("click", closeAllMenus);
    });

    let configSelector = document.getElementById("config_select");
    configSelector.addEventListener('change', (event) => {
        activateConfig(event.target.value);
    });
}