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

  clearOneLine(key) {
    console.log('retirer une ligne du panier', key);
    // this.cartContent.localStorage.removeItem(key);
    /*
    const cart = this.getCart();
    -> Dans panier vérifier si key existe
    -> Si oui, retirer la clé key du panier (delete cart[key])
    this.saveCart('cart');
    */
    console.log(this.cartContent);
  }

  static clearCart() {
    localStorage.removeItem('cart');
  }
}
