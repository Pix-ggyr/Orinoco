class CartSummary {
  constructor() {
    this.printCartSummary();
  }

  // eslint-disable-next-line class-methods-use-this
  async printItemInCart(item) {
    const itemDetails = await window.getProduct(item.id);
    window.createElement({
      containerId: 'cart-container',
      type: 'tr',
      contentAttribution: {
        type: 'innerHTML',
        // eslint-disable-next-line no-undef
        value: `<td class="designation">${itemDetails.name}</td>
              <td class="modifier">${item.modifier}</td>
              <td class="quantity">${item.quantity}</td>
              <td class="unitprice">${itemDetails.price / 100}$</td>
              <td class="subtotal">${(itemDetails.price / 100) * item.quantity}$</td>
              <td class="remove"><button class="rmvItem" data-productid="${itemDetails._id} ${item.modifier}">X</button></td>`,
      },
    });
    // eslint-disable-next-line no-undef
    const cartManager = new CartManager();
    const clearButtons = document.getElementsByClassName('rmvItem');
    for (let i = 0; i < clearButtons.length; i += 1) {
      clearButtons[i].addEventListener('click', (e) => {
        const productId = e.srcElement.dataset.productid;
        cartManager.clearOneLine(productId);
      });
    }
    const subTotals = (itemDetails.price / 100) * item.quantity;
    const totalElt = document.querySelector('table#cart-table>tfoot>tr>td#total-price>span.value');
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

    const triggerButton = document.getElementById('purchase-btn');
    triggerButton.addEventListener('click', () => {
      // eslint-disable-next-line
      new Popup({
        customContent: `
        <div class="main-info">
          <p>Fill up your informations to purchase</p>
        </div>  
        <div class="infos">
          <form class="user-infos">
          <input name="Firstname" type="text" class="user-feedback" required placeholder="Firstname"></input>      
          <input name="Lastname" type="text" class="user-feedback" required placeholder="Lastname"></input>   
          <input name="email" type="email" class="user-feedback" required placeholder="Email"/></input>
          <input name="address-street" class="user-feedback" required placeholder="Street"></input>
          <input name="address-city" class="user-feedback" required placeholder="City"></input>
          </form>
        </div>`,
        actions: {
          firstButton: {
            text: 'Cancel',
            callback: 'close',
          },
          secondButton: {
            text: 'Order',
            async callback() {
              // eslint-disable-next-line max-len
              // au click stocker les informations client dans le local storage;
              const data = {
                contact: {
                  firstName: document.querySelector('form.user-infos>input[name="Firstname"]').value,
                  lastName: document.querySelector('form.user-infos>input[name="Lastname"]').value,
                  address: document.querySelector('form.user-infos>input[name="address-street"]').value,
                  city: document.querySelector('form.user-infos>input[name="address-city"]').value,
                  email: document.querySelector('form.user-infos>input[name="email"]').value,
                },
                products: [],
              };
              const cart = JSON.parse(localStorage.getItem('cart')) || {};
              if (cart.length !== 0) {
                Object.keys(cart).forEach((key) => {
                  if (Object.prototype.hasOwnProperty.call(cart, key)) {
                    const item = cart[key];
                    data.products.push(item.id);
                  }
                });
              }
              const order = await window.postOrder(data);
              const totalElt = document.querySelector('table#cart-table>tfoot>tr>td#total-price>span.value');
              const total = Number(totalElt.textContent);
              localStorage.setItem('total-price', total);
              localStorage.setItem('order-Id', order.orderId);
              window.location.href = 'http://127.0.0.1:5500//FRONT/confirmation.html';
            },
          },
        },
        triggerButton: {
          id: 'purchase-btn',
          initialValue: 'Purchase',
          triggeredValue: 'Please wait',
        },
      });
    });
    const clearAll = document.getElementById('clear-cart');
    clearAll.addEventListener('click', () => {
      // eslint-disable-next-line
      CartManager.clearCart();
    });
  }
}

// eslint-disable-next-line no-new
new CartSummary();
