class ProductDetails {
  constructor() {
    this.getFurnitureDetails();
  }

  // eslint-disable-next-line class-methods-use-this
  async getFurnitureDetails() {
    try {
      const Furniture = await window.getProduct(window.getFurnitureID());
      // Creation of the product name field
      window.createElement({
        containerId: 'product-name',
        type: 'h2',
        contentAttribution: {
          type: 'innerHTML',
          // eslint-disable-next-line no-undef
          value: `${Furniture.name}`,
        },
      });
      // Creation of the product description field
      window.createElement({
        containerId: 'product-specs',
        type: 'p',
        contentAttribution: {
          type: 'innerHTML',
          // eslint-disable-next-line no-undef
          value: `<h3>Description : <h3/><p>${Furniture.description}<p/>`,
        },
      });
      // Creation of the product picture field
      window.createElement({
        containerId: 'packshot',
        type: 'div',
        id: 'photo',
        contentAttribution: {
          type: 'innerHTML',
          // eslint-disable-next-line no-undef
          value: `<img src="${Furniture.imageUrl}" alt="photo d'illustration du produit ${Furniture.name}">`,
        },
      });
      // Creation of the product price field
      window.createElement({
        containerId: 'product-specs',
        type: 'div',
        contentAttribution: {
          type: 'innerHTML',
          // eslint-disable-next-line no-undef
          value: `<h3 id="product-price">Price : </h3><p>${Furniture.price / 100}$</p>`,
        },
      });
      // Creation of the add-to-cart button
      window.createElement({
        containerId: 'add-to-cart',
        type: 'button',
        id: 'add-btn',
        contentAttribution: {
          type: 'innerHTML',
          value: '<h3>Add to cart</h3>',
        },
      });
      // Creation of the product finition choice field
      window.createElement({
        containerId: 'product-specs',
        type: 'form',
        contentAttribution: {
          type: 'innerHTML',
          value: `<form action="choice" id="finition-form">
                  <h3>Choose your finition varnish :</h3>
                  <select name="finitions" id="choose-finition"></select>
                  </form>`,
        },
      });
      // Getting varnish values for finition choice
      // eslint-disable-next-line no-undef
      Furniture.varnish.forEach((Element) => {
        window.createElement({
          containerId: 'choose-finition',
          type: 'option',
          contentAttribution: {
            type: 'innerHTML',
            value: `${Element}`,
          },
        });
      });
      // Listening to cart and storing purchase history into localStorage
      const addToCartButton = document.getElementById('add-btn');
      addToCartButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        // addToCartButton.textContent = 'Please wait...';

        const panier = JSON.parse(localStorage.getItem('cart')) || {};
        const modifier = document.getElementById('choose-finition').value;
        const item = panier[`${window.getFurnitureID()} ${modifier}`];

        if (item === undefined) {
          panier[`${window.getFurnitureID()} ${modifier}`] = {
            id: window.getFurnitureID(),
            modifier,
            quantity: 1,
          };
        } else {
          panier[`${window.getFurnitureID()} ${modifier}`].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(panier));

        // Confirmation popup call
        // eslint-disable-next-line
        new Popup({
          customContent: `<h3>${Furniture.name} has been correctly added to your cart</h3>`,
          actions: {
            firstButton: {
              text: 'Go back shopping',
              callback: 'close',
            },
            secondButton: {
              text: 'Go to cart',
              callback() {
                // va falloir faire mieux...
                window.location.href = 'http://127.0.0.1:5500/FRONT/cart.html';
              },
            },
          },
          triggerButton: {
            id: 'add-btn',
            initialValue: 'Add to cart',
            triggeredValue: 'Please wait',
          },
        });
      });
    } catch (_e) {
      // eslint-disable-next-line no-console
      window.createElement({
        containerId: 'product-page',
        type: 'div',
        contentAttribution: {
          type: 'innerHTML',
          value: `<h3>Oops, this product is not in our collection !<h3/>
                  <button>Go back to homepage</a></button>`,
        },
      });
    }
  }
}

// eslint-disable-next-line no-new
new ProductDetails();
