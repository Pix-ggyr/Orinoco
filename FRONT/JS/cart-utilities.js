/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
class CartManager {
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart() {
    const cartContent = JSON.parse(localStorage.getItem('cart')) || {};
    return cartContent;
  }

  // eslint-disable-next-line
  clearOneLine(key) {
    console.log('retirer une ligne du panier', key);
    const cart = CartManager.getCart();
    if (cart[key] === 0) return console.log('key does not exist');
    Object.keys(cart).forEach((clef) => {
      if (Object.prototype.hasOwnProperty.call(cart, clef)) {
        if (clef === key) {
          if (cart[key].quantity === 1) {
            delete cart[key];
          } else {
            cart[key].quantity -= 1;
          }
        }
      }
    });
    CartManager.saveCart(cart);
    window.location.reload();
  }

  static clearCart() {
    const cart = CartManager.getCart();
    localStorage.removeItem(cart);
  }
}
