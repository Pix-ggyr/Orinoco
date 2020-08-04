// Creation of variables
// eslint-disable-next-line no-unused-vars
const cartDisplay = document.getElementById('my-cart');
const printItemInCart = async (item) => {
  const itemDetails = await window.getProduct(item.id);
  window.createElement({
    containerId: 'cart-table',
    type: 'tr',
    contentAttribution: {
      type: 'innerHTML',
      // eslint-disable-next-line no-undef
      value: `<td>${itemDetails.name}</td>
            <td>${item.modifier}</td>
            <td class="quantity">${item.quantity}</td>
            <td class="unitprice">${itemDetails.price / 100}$</td>
            <td class="subtotal">${(itemDetails.price / 100) * item.quantity}$</td>`,
    },
  });

  const subTotals = (itemDetails.price / 100) * item.quantity;
  const totalElt = document.querySelector('table#cart-table>tfoot#total-price>tr>td>span.value');
  let total = Number(totalElt.textContent);
  total += subTotals;
  totalElt.textContent = total;
};

const inMyCart = JSON.parse(localStorage.getItem('cart')) || {};
if (inMyCart.length !== 0) {
  Object.keys(inMyCart).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(inMyCart, key)) {
      const item = inMyCart[key];
      printItemInCart(item);
    }
  });
}
