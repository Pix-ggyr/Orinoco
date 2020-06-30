// GET furnitures details one per page

const getFurnitureID = window.location.search.substr(4);
const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;
console.log(getFurnitureID);

function getFurnitureDetails() {
    var getOneFurniture = new XMLHttpRequest();
    getOneFurniture.onreadystatechange = function() {
        if (getFurnitureID.length > 0 && getOneFurniture.readyState == XMLHttpRequest.DONE && getOneFurniture.status == 200) {
            let Furniture = JSON.parse(getOneFurniture.response);
            console.log(Furniture);
            const Name = document.getElementById("product-name");
            let newName = document.createElement("h2");
            Name.appendChild(newName);
            newName.textContent = `${Furniture.name}`;
            const Description = document.getElementById("product-specs");
            let newDescription = document.createElement("p");
            Description.appendChild(newDescription);
            newDescription.innerHTML = `<h3>Description : <h3/><p>${Furniture.description}<p/>`
            const Picture = document.getElementById("packshot");
            let newPicture = document.createElement("div");
            Picture.appendChild(newPicture);
            newPicture.innerHTML = `<img src="${Furniture.imageUrl}" alt="photo d'illustration du produit ${Furniture.name}">`;
            const Price = document.getElementById("product-specs");
            let newPrice = document.createElement("div");
            Price.appendChild(newPrice);
            newPrice.innerHTML = `<h3 id="product-price">Price : </h3><p>${Furniture.price}$</p>`;
            const CartButton = document.getElementById("add-to-cart");
            let newCartButton = document.createElement("button");
            CartButton.appendChild(newCartButton);
            newCartButton.innerHTML = `<a href="#" target="blank">Add to cart</a>`;
            // Furniture.varnish.forEach(item => {
            //     console.log(Furniture.varnish);
            //     const finitionVarnish = document.getElementById("choose-finition");
            //     let varnishChoice = document.createElement("select");
            //     finitionVarnish.appendChild(varnishChoice);
            //     varnishChoice.innerHTML = Furniture.varnish;
            // });
            const finitionVarnish = document.getElementById("choose-finition");
            let varnishChoice = document.createElement("select");
            finitionVarnish.appendChild(varnishChoice);
            varnishChoice.innerHTML = Furniture.varnish(0) + Furniture.varnish(1) + Furniture.varnish(2);
            console.log(varnishChoice);
        }
        // else if (getOneFurniture.readyState == XMLHttpRequest.DONE && getOneFurniture.status == 404){
        //     alert("ce produit n'existe pas"); //ajouter une redirection à la page d'accueil du site
        // }
    };
    getOneFurniture.open("GET" , srcPath);
    getOneFurniture.send();
}
getFurnitureDetails();