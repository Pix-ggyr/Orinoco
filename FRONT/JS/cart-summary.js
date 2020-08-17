class CartSummary {
  constructor() {
    this.printCartSummary();
  }

  // eslint-disable-next-line class-methods-use-this
  async printItemInCart(item) {
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
  }

  printCartSummary() {
    // Creation of variables
    const inMyCart = JSON.parse(localStorage.getItem('cart')) || {};
    if (inMyCart.length !== 0) {
      Object.keys(inMyCart).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(inMyCart, key)) {
          const item = inMyCart[key];
          this.printItemInCart(item);
        }
      });
    }
    // popup for buying confirmation
    // eslint-disable-next-line
    new Popup({
      customContent: `<p>Fill up your informations to purchase</p>
      <div class="infos">
        <form action="">
          <input type="text" label="Your Name">John Doe</input>
          <input type="text" label="Your Email">john.doe@gmail.com</input>
        </form>
      </div>`,
      actions: {
        firstButton: {
          text: 'Cancel',
          callback: 'close',
        },
        secondButton: {
          text: 'Order',
          callback() {
            // va falloir faire mieux...
            window.location.href = '/FRONT/confirmation.html';
          },
        },
      },
      triggerButton: {
        id: 'purchase-btn',
        initialValue: 'Purchase',
        triggeredValue: 'Please wait',
      },
    });
  }
}

// eslint-disable-next-line no-new
new CartSummary();
