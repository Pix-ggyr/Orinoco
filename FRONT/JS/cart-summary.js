// Creation of variables
const getFurnitureID = window.location.search.substr(4);
const srcPath = "http://localhost:3000/api/furniture/" + getFurnitureID;
const cartDisplay = document.getElementById("cart-content");
console.log(getFurnitureID);

const inMyCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("In my cart, I have : ", inMyCart);
if(inMyCart.length === 0) {
    console.log("empty cart");
    
}
else {
    inMyCart.forEach(item => {
        console.log("product : ", item);
        console.log("Appel API lancé");
        var cartList = new XMLHttpRequest();
        cartList.onreadystatechange = function() {
            if (cartList.readyState !== XMLHttpRequest.DONE && cartList.length > 0 && cartList.status === 200) {
                console.log("appel API OK")
                let itemInCart = JSON.parse(cartList.response);
                console.log(itemInCart);
            }
        }
    });
    cartList.open("GET" , srcPath);
    cartList.send();
}



