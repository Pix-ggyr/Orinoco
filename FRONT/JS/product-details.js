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
                    value: `<a href="cart.html" target="blank">Add to cart</a>`,
                }
            });

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
        }
        else if (getOneFurniture.readyState == XMLHttpRequest.DONE && getOneFurniture.status == 404){
            }
        };
        getOneFurniture.open("GET" , srcPath);
        getOneFurniture.send();
    }
    getFurnitureDetails();

    createElement =  function(settings) {
        const parent = document.getElementById(settings.containerId); 
        const child = document.createElement(settings.type);
        parent.appendChild(child);
        child[settings.contentAttribution.type] = settings.contentAttribution.value;
        return child;
    }

    //eventlistener for shopping cart button

    const cartButton = document.getElementById("add-to-cart");

    cartButton.addEventListener('onclick' , function(event) {
    console.log("hey mais ça ne marche pas !")   
    event.createElement({
           containerId : "my-cart",
           type : "p",
           contentAttribution : {
               type : "innerHTML",
               value : `Là c'est sensé marcher`           
            }
       })
   });