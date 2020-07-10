// GET furnitures details one per page

const getFurnitureID = window.location.search.substr(4);
const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;
console.log(getFurnitureID);

function getFurnitureDetails() {
    console.log("début appel API");
    var getOneFurniture = new XMLHttpRequest();
    getOneFurniture.onreadystatechange = function() {
        if (getOneFurniture.readyState !== XMLHttpRequest.DONE) return;
        if (getFurnitureID.length > 0 && getOneFurniture.status === 200) {
            console.log("appel API terminé, création bouton");
            let Furniture = JSON.parse(getOneFurniture.response);
            console.log(Furniture);
            createElement({
                containerId: "product-name", 
                type: "h2", 
                contentAttribution: {
                    type: "innerHTML", 
                    value: `${Furniture.name}`
                }
            });
            createElement({
                containerId: "product-specs", 
                type: "p",
                contentAttribution: {
                    type: "innerHTML", 
                    value: `<h3>Description : <h3/><p>${Furniture.description}<p/>`
                }
            });

            createElement({
                containerId: "packshot",
                type:"div",
                contentAttribution: {
                    type:"innerHTML",
                    value: `<img src="${Furniture.imageUrl}" alt="photo d'illustration du produit ${Furniture.name}">`
                }
            });

            createElement({
                containerId: "product-specs",
                type: "div",
                contentAttribution: {
                    type: "innerHTML",
                    value: `<h3 id="product-price">Price : </h3><p>${Furniture.price}$</p>`,
                }
            });

            createElement({
                containerId: "add-to-cart",
                type: "button",
                contentAttribution: {
                    type: "innerHTML",
                    value: `Add to cart`,
                }
            });

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

            //eventlistener for shopping cart button
            console.log("ajout eventListener");
            const cartButton = document.getElementById("add-to-cart");

            cartButton.addEventListener('click' , function(_event) {
                const panier = JSON.parse(localStorage.getItem("cart")) || [];
                panier.push(getFurnitureID);
                localStorage.setItem("cart" , JSON.stringify(panier));   
            });
            
        }
        else if (getOneFurniture.status !== 200) {
            console.log("oups cela n'existe pas");
            createElement({
                containerId: "product-page",
                type: "div",
                contentAttribution: {
                    type: "innerHTML",
                    value: `<h3>Oops, this product is not in our collection !<h3/>
                    <button><a href="index.html" target="blank">Go back to homepage</a></button>`
                }
            })
        }
        };
        getOneFurniture.open("GET" , srcPath);
        console.log("envoi requête");
        getOneFurniture.send();
        console.log("requête envoyée");
    }
    console.log("Appel getFurnitureDetails");
    getFurnitureDetails();

    createElement =  function(settings) {
        const parent = document.getElementById(settings.containerId); 
        const child = document.createElement(settings.type);
        parent.appendChild(child);
        child[settings.contentAttribution.type] = settings.contentAttribution.value;
        return child;
    }
