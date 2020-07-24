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
        createElement({
            containerId: "cart-table",
            type: "tr",
            contentAttribution: {
                type: "innerHTML",
                value: `<td>${itemDetails.name}</td>
                <td>${itemDetails.price}$</td>`
            }
        });

        // createElement({
        //     containerId: "selected-product",
        //     type: "td",
        //     contentAttribution: {
        //         type: "innerHTML",
        //         value: `${itemDetails.name}`
        //     }
        // });
        // createElement({
        //     containerId: "selected-product",
        //     type: "td",
        //     contentAttribution: {
        //         type: "innerHTML",
        //         value: `${itemDetails.price}$`
        //     }
        // });
    });
}