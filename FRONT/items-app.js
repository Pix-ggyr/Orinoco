const srcAPI = "http://localhost:3000/api/furniture/";

    //GET products list

function searchAllFurnitures() {
    var searchFurnitures = new XMLHttpRequest();
    searchFurnitures.onreadystatechange = function() {
        if (searchFurnitures.readyState == XMLHttpRequest.DONE && searchFurnitures.status == 200) {
            let furnituresList = JSON.parse(searchFurnitures.response);
            console.log(furnituresList);
            const furnitures = document.getElementById("items-display");
            furnituresList.forEach(item => {
                console.log(item.name);
                const newFurniture = document.createElement("div");
                furnitures.appendChild(newFurniture);
                newFurniture.classList.add("new-furniture");
                const link = document.createElement("a");
                newFurniture.appendChild(link); 
                link.href = "Produit.html?id=" + item._id; //penser à ajouter la vérification de l'url pour voir s'il est correct.
                link.innerHTML = `<h2>${item.name}</h2><img src="${item.imageUrl}"/>`; 
            })
        }
    };
    searchFurnitures.open("GET" , srcAPI);
    searchFurnitures.send();
}
searchAllFurnitures();

    // GET furnitures details one per page

const productDetails = document.getElementById("product-details");
const itemPath = window.location.search.substr(4);
console.log(itemPath);
function itemDetails() {
    var searchItems = new XMLHttpRequest();
    searchItems.onreadystatechange = function() {
        if (itemPath.length > 0 && searchItems.readyState == XMLHttpRequest.DONE && searchItems.status == 200) {
            let itemsList = JSON.parse(searchItems.response);
            console.log(itemsList);
            console.log(itemsList.price);
            console.log(itemsList.name);
        }
        else if (searchItems.readyState == XMLHttpRequest.DONE && searchItems.status == 404){
            alert("ce produit n'existe pas"); //ajouter une redirection à la page d'accueil du site
        }
    };
    searchItems.open("GET" , srcAPI + itemPath);
    searchItems.send();
}
itemDetails();

