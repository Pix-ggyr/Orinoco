// Getting furniture ID path & API

const getFurnitureID = window.location.search.substr(4);
const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;
console.log(getFurnitureID);

const shutThePopup = function() {
    const addToCartButton = document.getElementsByClassName("add-to-cart")[0];
    addToCartButton.textContent = 'Add to cart';
    const popup = document.getElementsByClassName('confirmation-popup');
    while(popup.length > 0) {
        popup[0].parentNode.removeChild(popup[0]);
    }
    console.log("hey!")
}

const confirmationPopup = function(Furniture) {
    
    const body = document.querySelector('body');
    const popupBg = document.createElement('div');
    popupBg.classList.add('confirmation-popup', 'bg');
    body.appendChild(popupBg);
    const popupContent = document.createElement('div');
    popupContent.classList.add('confirmation-popup', 'content');
    popupContent.innerHTML = `
        <button class="shut"> x </button>
        <div class="added-alert">
            <p>${Furniture.name} has been successfuly added to your Cart</p>
        </div>
        <div class="choice">
        <button class="shop">continue shopping</button>
        <button class="go-to-cart">checkout</button>
        </div>`
    body.appendChild(popupContent);

    console.log(popupContent);

    const shutPopup = document.querySelector('.confirmation-popup.content>button.shut');
    shutPopup.addEventListener('click', shutThePopup);
    console.log(shutPopup);

    const goBackShopping = document.querySelector('.confirmation-popup.content>div.choice>button.shop');
    console.log(goBackShopping);
    goBackShopping.addEventListener('click', shutThePopup);
    
    const goToCart = document.querySelector('.confirmation-popup.content>div.choice>button.go-to-cart');
    goToCart.addEventListener('click' , function() {
        window.location.href = 'http://127.0.0.1:5500/FRONT/cart.html';
    })
    console.log(goToCart);
}

// GET furnitures details one per page

async function getFurnitureDetails() {
    try {
        const Furniture = await getProduct(getFurnitureID);
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
            id: "photo",
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
                value: `<h3 id="product-price">Price : </h3><p>${Furniture.price/100}$</p>`,
            }
        });
        // Creation of the add-to-cart button
        createElement({
            containerId: "add-to-cart",
            type: "button",
            classList: "add-to-cart",
            contentAttribution: {
                type: "innerHTML",
                value: `<h3>Add to cart</h3>`,
            }
        });

        const addToCartButton = document.getElementsByClassName("add-to-cart")[0];
        addToCartButton.addEventListener('click' , function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            addToCartButton.textContent = 'Please wait...';
            confirmationPopup(Furniture);
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
                    value: `${Element}`,
                }
            });
        });
        // Listening to cart and storing purchase history into localStorage
        console.log("ajout eventListener");
        const cartButton = document.getElementById("add-to-cart");

        cartButton.addEventListener('click' , function(_event) {
            let panier = JSON.parse(localStorage.getItem("cart")) || {};
            const modifier = document.getElementById("choose-finition").value;
            let item = panier[`${getFurnitureID} ${modifier}`];
            console.log(item);
            if (item === undefined) {
                panier[`${getFurnitureID} ${modifier}`] = {
                    id: getFurnitureID,
                    modifier,
                    quantity: 1,
                };
            }
            else {
                panier[`${getFurnitureID} ${modifier}`].quantity += 1; 
            }
            console.log(panier);
            localStorage.setItem("cart" , JSON.stringify(panier));
        })

 
    } catch (_e) {
        console.log(_e);
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
    
}
// Calling getFurnitureDetails function
console.log("Appel getFurnitureDetails");
getFurnitureDetails();

