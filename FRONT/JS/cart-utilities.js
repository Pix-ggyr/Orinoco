/* eslint-disable no-console */
// enregistrer le panier;
// fonction (class cartManager) cartManager.setCart => localStorage;
// vider le panier;
// récupérer le panier;
// vérifier le panier;
// supprimer une ligne;
// modifier la quantité d'une ligne;

// eslint-disable-next-line no-unused-vars
class CartManager {
  constructor() {
    this.saveCart();
  }

  saveCart() {
    const cartContent = JSON.parse(localStorage.getItem('cart')) || {};
    if (cartContent.length !== 0) {
      Object.keys(cartContent).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(cartContent, key)) {
          const item = cartContent[key];
          this.saveCart(item);
        }
      });
    }
  }

  clearOneLine(i) {
    console.log('retirer une ligne du panier');
    this.cartContent.localStorage.removeItem(i);
    console.log(this.cartContent);
  }

  clearOneLineTrigger() {
    const clearOneTriggerBtn = document.getElementsByClassName('rmvItem');
    clearOneTriggerBtn.addEventListener('click', () => {
      this.clearOneLine();
    });
  }

  clearCart() {
    this.cartContent.localStorage.clear();
    console.log(this.cartContent);
  }

  clearCartTrigger() {
    const clearCartTriggerBtn = document.getElementById('clear-cart');
    clearCartTriggerBtn.addEventListener('click', () => {
      this.clearCart();
    });
  }
}
