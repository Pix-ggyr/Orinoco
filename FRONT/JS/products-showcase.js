class Collection {
  constructor() {
    // GET products list
    async function searchAllFurnitures() {
      try {
        // eslint-disable-next-line no-undef
        const productsCollection = await window.getProducts();
        productsCollection.forEach((item) => {
          window.createElement({
            containerId: 'items-display',
            type: 'div',
            classList: 'new-furniture',
            contentAttribution: {
              type: 'innerHTML',
              value: `
                <a href="product.html?id=${item._id}">
                    <h2>${item.name}</h2>
                    <img src="${item.imageUrl}"/>
                </a>`,
            },
          });
        });
      } catch (_e) {
        window.createElement({
          containerId: 'items-display',
          type: 'div',
          contentAttribution: {
            type: 'innerHTML',
            value: `
                    <p> This collection page doesn't exist</p>
                    `,
          },
        });
      }
    }
    searchAllFurnitures();
  }
}

// eslint-disable-next-line no-new
new Collection();
