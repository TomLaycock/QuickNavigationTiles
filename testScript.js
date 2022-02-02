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
        activateConfig(QuickNavigationConfigJSON);
    });
}

function activateConfig(config) {
    console.log(config);

    document.getElementById("quick_nav_title").innerHTML = config.Name;
}

window.onload = function() {
    let ConfigSubmitButton = document.getElementById("quick_nav_config_submit_button");
    ConfigSubmitButton.addEventListener("click", loadConfig);
}