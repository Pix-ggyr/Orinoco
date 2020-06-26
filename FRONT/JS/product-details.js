// GET furnitures details one per page

const getFurnitureID = window.location.search.substr(4);

const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;


console.log(getFurnitureID);

function getFurnitureDetails() {
    var getOneFurniture = new XMLHttpRequest();
    getOneFurniture.onreadystatechange = function() {
        if (getFurnitureID.length > 0 && getOneFurniture.readyState == XMLHttpRequest.DONE && getOneFurniture.status == 200) {
            let Furniture = JSON.parse(getOneFurniture.response);
            console.log(Furniture.price);
            console.log(Furniture.name);
            console.log(Furniture.description);
            const furnitureDetails = document.getElementById("product-details");
            let newFurnitureDetails = document.createElement("div");
            furnitureDetails.appendChild(newFurnitureDetails);
            newFurnitureDetails.classList.add("details-box");
            newFurnitureDetails.innerHTML = `${Furniture.name} buy it for ${Furniture.price}$ !`
        }
        // else if (getOneFurniture.readyState == XMLHttpRequest.DONE && getOneFurniture.status == 404){
        //     alert("ce produit n'existe pas"); //ajouter une redirection à la page d'accueil du site
        // }
    };
    getOneFurniture.open("GET" , srcPath);
    getOneFurniture.send();
}
getFurnitureDetails();