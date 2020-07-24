// createElement function based on POO

createElement =  function(settings) {
    const parent = document.getElementById(settings.containerId); 
    const child = document.createElement(settings.type);
    parent.appendChild(child);
    if (settings.id) {
        child.id = settings.id;
    }
    if (settings.classList) {
        child.classList = settings.classList;
    }
    if (settings.contentAttribution) {
        child[settings.contentAttribution.type] = settings.contentAttribution.value;      
    }
    return child;
}


// getFullApiPath function

getFurnitureID = function() {
    return window.location.search.substr(4);
}
const baseUrl = "http://localhost:3000";
const furnitureApiPath = "/api/furniture";
getFullApiPath = function() {
    return baseUrl + furnitureApiPath;
}

// XHR & Promise for getting one product informations

getProduct = function(id) {
    return new Promise(function(resolve , reject) {
        let itemRequest = new XMLHttpRequest();
        itemRequest.onreadystatechange = function() {
            if (itemRequest.readyState !== XMLHttpRequest.DONE) return;
            if (itemRequest.response.length > 0 && itemRequest.status === 200) {
                resolve(JSON.parse(itemRequest.response));   
            }
            else {
                reject(new Error('this product does not exist'));

            }
        }
        itemRequest.open("GET" , getFullApiPath() + "/" + id);
        itemRequest.send();
    });
}

getProducts = function() {
    return new Promise(function(resolve , reject) {
        let allItemsRequest = new XMLHttpRequest();
        allItemsRequest.onreadystatechange = function() {
            if (allItemsRequest.readyState !== XMLHttpRequest.DONE) return;
            if (allItemsRequest.status === 200) {
                resolve(JSON.parse(allItemsRequest.response));
            }
            else {
                reject(new Error('we cannot find the collection'));
                console.log("une erreur est survenue");
            }
        }
        allItemsRequest.open("GET" , getFullApiPath());
        allItemsRequest.send();
    });
}
