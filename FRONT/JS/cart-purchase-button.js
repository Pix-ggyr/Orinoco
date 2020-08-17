const shutThePopup = () => {
  const cartBtn = document.getElementsById('purchase-btn')[0];
  cartBtn.textContent = 'Go purchase';
  const popup = document.getElementsByClassName('purchase-popup');
  while (popup.length > 0) {
    popup[0].parentNode.removeChild(popup[0]);
  }
};

// eslint-disable-next-line no-unused-vars
const purchasePopup = () => {
  // eslint-disable-next-line no-unused-vars
  const body = document.querySelector('body');
  window.createElement({
    containerId: 'body',
    type: 'div',
    classList: 'purchase-popup bg',
  });
  window.createElement({
    containerId: 'body',
    type: 'div',
    classList: 'purchase-popup content',
    contentAttribution: {
      type: 'innerHTML',
      value: `
      <button class="close"> x </button>
      <p>Fill up your informations to purchase</p>
      <div class="infos">
        <form></form>
      </div>`,
    },
  });
  const closePopup = document.querySelector('.purchase-popup.content>button.close');
  closePopup.addEventListener('click', shutThePopup);
};
