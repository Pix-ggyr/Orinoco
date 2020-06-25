const srcAPI = "http://localhost:3000/api/furniture/";

    //GET products list

function displayItems() {
    var searchItems = new XMLHttpRequest();
    searchItems.onreadystatechange = function() {
        if (searchItems.readyState == XMLHttpRequest.DONE && searchItems.status == 200) {
            let itemsList = JSON.parse(searchItems.response);
            console.log(itemsList);
            const items = document.getElementById("items-display");
            itemsList.forEach(item => {
                console.log(item.name);
                const newItem = document.createElement("div");
                items.appendChild(newItem);
                newItem.classList.add("new-item");
                const link = document.createElement("a");
                newItem.appendChild(link); 
                link.href = "Produit.html?id=" + item._id; //penser à ajouter la vérification de l'url pour voir s'il est correct.
                link.innerHTML = `<h2>${item.name}</h2><img src="${item.imageUrl}"/>`; 
            })
        }
    };
    searchItems.open("GET" , srcAPI);
    searchItems.send();
}
displayItems();


    // GET furnitures details one per page

const productDetails = document.getElementById("product-details");
const itemPath = window.location.search;
console.log(itemPath);
    //?id=5be9cc611c9d440000c1421e - CROSS TABLE
    //?id=5beaadda1c9d440000a57d98 - COFFEE TABLE
    //?id=5beaae361c9d440000a57d99 - DINING TABLE 
    //?id=5beaaf2e1c9d440000a57d9a - BENCH
    //?id=5beab2061c9d440000a57d9b - VINTAGE CHAIR

function itemDetails() {
    var searchProduct = new XMLHttpRequest();
    if (searchProduct.readyState == XMLHttpRequest.DONE && searchItems.status == 200) {
        let itemDetails = JSON.parse(searchProduct.response);
        console.log("itemDetails");
    }

    searchProduct.open("GET" , srcAPI);
    searchProduct.send();
}

itemDetails();