// Creation of variables
const cartDisplay = document.getElementById("cart-content");

const inMyCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("In my cart, I have : ", inMyCart);
if(inMyCart.length === 0) {
    console.log("empty cart");
    
}
else {
    inMyCart.forEach(async item => {
        console.log("product : ", item);
        let itemDetails = await getProduct(item);
        console.log(itemDetails);
    });
}



