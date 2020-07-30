// Creation of variables
const cartDisplay = document.getElementById("my-cart");
const printItemInCart = async (item) => {
    let itemDetails = await getProduct(item.id);
    createElement({
        containerId: "cart-table",
        type: "tr",
        contentAttribution: {
            type: "innerHTML",
            value: `<td>${itemDetails.name}</td>
            <td>${item.modifier}</td>
            <td class="quantity">${item.quantity}</td>
            <td class="unitprice">${itemDetails.price/100}$</td>
            <td class="subtotal">${(itemDetails.price/100) * item.quantity}$</td>`
        }
    });
    
    let subTotals = (itemDetails.price/100) * item.quantity;
    const totalElt = document.querySelector("table#cart-table>tfoot#total-price>tr>td>span.value");
    let total = parseInt(totalElt.textContent);
    console.log(total);
    total += subTotals;
    totalElt.textContent = total;
}

const inMyCart = JSON.parse(localStorage.getItem("cart")) || {};
console.log("In my cart, I have : ", inMyCart);
if(inMyCart.length === 0) {
    console.log("empty cart");
    
}
else {
    for (const key in inMyCart) {
        console.log(key);
        const item = inMyCart[key];
        printItemInCart(item);
    }    
}