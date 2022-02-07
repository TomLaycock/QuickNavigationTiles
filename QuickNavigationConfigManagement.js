var Configs = {}
var ConfigNames = []

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
            ConfigNames.push(QuickNavigationConfigJSON.Name);

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
        AddFinalDetailsToSection(newSection);
    });

    if (setAsActiveConfig) {
        window.localStorage.setItem("CurrentConfig", configName);
    }
}

function addConfigToSelector(configToAdd, setAsActive = false, updateConfigsInStorage = false, setAsActiveConfig = true) {
    var configSelector = document.getElementById("config_select");

    Array.from(configSelector.options).forEach(function(option_element) {
        if (option_element.text == configToAdd) {
            console.warn("A config with the name: " + configToAdd + " already exists!");

            configSelector.value = configToAdd;

            if (setAsActive) {
                configSelector.value = configToAdd;
                activateConfig(configToAdd, setAsActiveConfig);
            }

            if (updateConfigsInStorage) {
                UpdateLocalConfigStorage();
            }
            return;
        }
    });

    var option = document.createElement("option");
    option.classList.add("quick_nav_option_element");
    option.classList.add("sub_detail_color");
    option.classList.add("quick_nav_small_title");
    option.classList.add("small_header_text_color");
    option.classList.add("quick_nav_center_text");
    option.text = configToAdd;
    configSelector.add(option);

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

var LoadConfigMenuOpen = false

function toggleLoadConfigMenu() {
    LoadConfigMenuOpen = !LoadConfigMenuOpen;

    let quick_nav_load_config_menu = document.getElementById("quick_nav_load_config_menu");

    if (LoadConfigMenuOpen) {
        quick_nav_load_config_menu.style.display = "flex";
    } else {
        quick_nav_load_config_menu.style.display = "none";
    }
}

function InitialiseQuickNavigation() {
    var CurrentConfigs = JSON.parse(window.localStorage.getItem("ConfigNames"));

    var CurrentActiveConfig = window.localStorage.getItem("CurrentConfig");
    console.log(CurrentActiveConfig);
    if (CurrentConfigs == null) { return; }

    CurrentConfigs.forEach(configName => {
        if (configName != "Default") {
            var LoadedConfig = JSON.parse(window.localStorage.getItem(configName));
            Configs[configName] = LoadedConfig;
            ConfigNames.push(configName);
            console.log(LoadedConfig);
            addConfigToSelector(configName, false, false);
            if (configName == CurrentActiveConfig) {
                console.log("ACTIVATING CONFIG  " + configName);
                activateConfig(configName);
            }
        }
    });
}

window.onload = function() {
    createDefaultConfig();
    InitialiseQuickNavigation();

    let ConfigSubmitButton = document.getElementById("quick_nav_config_submit_button");
    ConfigSubmitButton.addEventListener("click", loadConfig);

    let LoadConfigMenuButton = document.getElementById("quick_nav_load_config_button");
    LoadConfigMenuButton.addEventListener("click", toggleLoadConfigMenu);

    let CloseButtons = document.getElementsByClassName("close_button");
    Array.from(CloseButtons).forEach(function(button) {
        button.addEventListener("click", toggleLoadConfigMenu);
    });

    const configSelector = document.getElementById("config_select");

    configSelector.addEventListener('change', (event) => {
        activateConfig(event.target.value);
    });
}