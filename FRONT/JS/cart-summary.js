// Creation of variables
const cartDisplay = document.getElementById("cart-content");

const inMyCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("In my cart, I have : ", inMyCart);
if(inMyCart.length === 0) {
    console.log("empty cart");
    
}
else {
    inMyCart.forEach(async item => { //trouver comment boucler sur un objet et non un tableau
        console.log("product : ", item);
        let itemDetails = await getProduct(item);
        console.log(itemDetails);
        createElement({
            containerId: "cart-table",
            type: "tr",
            contentAttribution: {
                type: "innerHTML",
                value: `<td>${itemDetails.name}</td>
                <td>${itemDetails.price}$</td>`
            }
        });
    });
}