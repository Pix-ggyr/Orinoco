// createElement function based on POO

createElement =  function(settings) {
    const parent = document.getElementById(settings.containerId); 
    const child = document.createElement(settings.type);
    parent.appendChild(child);
    child[settings.contentAttribution.type] = settings.contentAttribution.value;
    return child;
}