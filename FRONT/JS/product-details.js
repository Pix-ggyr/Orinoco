// Getting furniture ID path & API

const getFurnitureID = window.location.search.substr(4);
const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;
console.log(getFurnitureID);

// GET furnitures details one per page

function getFurnitureDetails() {
    console.log("début appel API");
    var getOneFurniture = new XMLHttpRequest();
    getOneFurniture.onreadystatechange = function() {
        if (getOneFurniture.readyState !== XMLHttpRequest.DONE) return;
        if (getFurnitureID.length > 0 && getOneFurniture.status === 200) {
            console.log("appel API terminé, création bouton");
            let Furniture = JSON.parse(getOneFurniture.response);
            console.log(Furniture);
            // Creation of the product name field
            createElement({
                containerId: "product-name", 
                type: "h2", 
                contentAttribution: {
                    type: "innerHTML", 
                    value: `${Furniture.name}`
                }
            });
            // Creation of the product description field
            createElement({
                containerId: "product-specs", 
                type: "p",
                contentAttribution: {
                    type: "innerHTML", 
                    value: `<h3>Description : <h3/><p>${Furniture.description}<p/>`
                }
            });
            // Creation of the product picture field
            createElement({
                containerId: "packshot",
                type:"div",
                contentAttribution: {
                    type:"innerHTML",
                    value: `<img src="${Furniture.imageUrl}" alt="photo d'illustration du produit ${Furniture.name}">`
                }
            });
            // Creation of the product price field
            createElement({
                containerId: "product-specs",
                type: "div",
                contentAttribution: {
                    type: "innerHTML",
                    value: `<h3 id="product-price">Price : </h3><p>${Furniture.price}$</p>`,
                }
            });
            // Creation of the add-to-cart button
            createElement({
                containerId: "add-to-cart",
                type: "button",
                contentAttribution: {
                    type: "innerHTML",
                    value: `<h3>Add to cart`,
                }
            });
            // Creation of the product finition choice field
            createElement({
               containerId: "product-specs",
               type: "form",
               contentAttribution: {
                    type: "innerHTML",
                    value: `<form action="choice" id="finition-form">
                    <h3>Choose your finition varnish :</h3>
                    <select name="finitions" id="choose-finition"></select>
                </form>`,  
               }  
            })
            // Getting varnish values for finition choice
            Furniture.varnish.forEach(Element => {
                console.log(Element);
                createElement({
                    containerId: "choose-finition",
                    type: "option",
                    contentAttribution: {
                        type: "innerHTML",
                        value: `${Element} Varnish`,
                    }
                });
            });
            // Listening to cart and storing purchase history into localStorage
            console.log("ajout eventListener");
            const cartButton = document.getElementById("add-to-cart");

            cartButton.addEventListener('click' , function(_event) {
                const panier = JSON.parse(localStorage.getItem("cart")) || [];
                panier.push(getFurnitureID);
                localStorage.setItem("cart" , JSON.stringify(panier));   
            });
            
        }
        // Setting error message when product ID is not in the database
        else if (getOneFurniture.status !== 200) {
            console.log("le produit n'existe pas");
            createElement({
                containerId: "product-page",
                type: "div",
                contentAttribution: {
                    type: "innerHTML",
                    value: `<h3>Oops, this product is not in our collection !<h3/>
                    <button>Go back to homepage</a></button>`
                }
            })
        }
        };
        getOneFurniture.open("GET" , srcPath);
        console.log("envoi requête");
        getOneFurniture.send();
        console.log("requête envoyée");
    }
    // Calling getFurnitureDetails function
    console.log("Appel getFurnitureDetails");
    getFurnitureDetails();

