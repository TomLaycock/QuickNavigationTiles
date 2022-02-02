var Configs = {}

function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
}

function loadConfig() {
    let QuickNavigationConfigFile = document.getElementById("quick_nav_config_upload").files[0];

    readFile(QuickNavigationConfigFile, function(e) {
        var QuickNavigationConfigContent = e.target.result;
        var QuickNavigationConfigJSON = JSON.parse(QuickNavigationConfigContent);
        var config = convertJSONtoConfig(QuickNavigationConfigJSON);

        if (Configs[QuickNavigationConfigJSON.Name] != null) { console.warn("A config with the name: " + QuickNavigationConfigJSON.Name + " already exists!"); return; }
        Configs[QuickNavigationConfigJSON.Name] = config;

        addConfigToSelector(QuickNavigationConfigJSON.Name);
    });
}

function convertJSONtoConfig(configJSON) {
    var config = new Config();

    config.Name = configJSON.Name;

    return config;
}

function activateConfig(configName) {
    console.log(Configs[configName]);

    document.getElementById("quick_nav_title").innerHTML = Configs[configName].Name;
}

function addConfigToSelector(configToAdd, setAsActive = false) {
    var configSelector = document.getElementById("config_select");

    Array.from(configSelector.options).forEach(function(option_element) {
        if (option_element.text == configToAdd) { console.warn("A config with the name: " + QuickNavigationConfigJSON.Name + " already exists!"); return; }
    });

    var option = document.createElement("option");
    option.text = configToAdd;
    configSelector.add(option);

    if (setAsActive) {
        configSelector.value = configToAdd;
    }
}

function createDefaultConfig() {
    var config = new Config();

    config.Name = "Default";

    Configs[config.Name] = config;
    addConfigToSelector(config.Name, true);

    activateConfig(config.Name);
}

window.onload = function() {
    let ConfigSubmitButton = document.getElementById("quick_nav_config_submit_button");
    ConfigSubmitButton.addEventListener("click", loadConfig);

    createDefaultConfig();

    const configSelector = document.getElementById("config_select");

    configSelector.addEventListener('change', (event) => {
        activateConfig(event.target.value);
    });
}