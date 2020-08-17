// eslint-disable-next-line no-unused-vars
class Popup {
  constructor(settings) {
    this.settings = settings;
    this.listenTrigger();
  }

  listenTrigger() {
    const triggerButton = document.getElementById(this.settings.triggerButton.id);
    triggerButton.addEventListener('click', () => { this.displayPopup(); });
  }

  // eslint-disable-next-line no-unused-vars
  displayPopup() {
    if (this.settings.triggerButton.triggeredValue !== undefined) {
      const triggerButton = document.getElementById(this.settings.triggerButton.id);
      triggerButton.textContent = this.settings.triggerButton.triggeredValue;
    }
    window.createElement({
      containerId: 'body',
      type: 'div',
      classList: 'confirmation-popup bg',
    });
    window.createElement({
      containerId: 'body',
      type: 'div',
      classList: 'confirmation-popup content',
      contentAttribution: {
        type: 'innerHTML',
        value: `
              <button class="shut"> x </button>
              ${this.settings.customContent}
              <div class="choice">
                <button class="first-btn">${this.settings.actions.firstButton.text}</button>
                <button class="second-btn">${this.settings.actions.secondButton.text}</button>
              </div>`,
      },
    });
    const shutPopup = document.querySelector('.confirmation-popup.content>button.shut');
    shutPopup.addEventListener('click', () => { this.shutThePopup(); });

    const firstButton = document.querySelector('.confirmation-popup.content>div.choice>button.first-btn');
    if (this.settings.actions.firstButton.callback === 'close') {
      firstButton.addEventListener('click', () => { this.shutThePopup(); });
    } else {
      firstButton.addEventListener('click', this.settings.actions.firstButton.callback);
    }

    const secondButton = document.querySelector('.confirmation-popup.content>div.choice>button.second-btn');
    if (this.settings.actions.secondButton.callback === 'close') {
      secondButton.addEventListener('click', () => { this.shutThePopup(); });
    } else {
      secondButton.addEventListener('click', this.settings.actions.secondButton.callback);
    }
  }

  shutThePopup() {
    if (this.settings.triggerButton.initialValue !== undefined) {
      const triggerButton = document.getElementById(this.settings.triggerButton.id);
      triggerButton.textContent = this.settings.triggerButton.initialValue;
    }
    const popup = document.getElementsByClassName('confirmation-popup');
    while (popup.length > 0) {
      popup[0].parentNode.removeChild(popup[0]);
    }
  }
}

// createElement function based on object programing
window.createElement = (settings) => {
  const parent = document.getElementById(settings.containerId);
  const child = document.createElement(settings.type);
  parent.appendChild(child);
  if (settings.id) {
    child.id = settings.id;
  }
  if (settings.classList) {
    child.classList = settings.classList;
  }
  if (settings.contentAttribution) {
    child[settings.contentAttribution.type] = settings.contentAttribution.value;
  }
  return child;
};

// getFullApiPath function
// eslint-disable-next-line no-unused-vars
window.getFurnitureID = () => window.location.search.substr(4);
const baseUrl = 'http://localhost:3000';
const furnitureApiPath = '/api/furniture';
const getFullApiPath = () => baseUrl + furnitureApiPath;

// XHR & Promise for information page per product
// eslint-disable-next-line no-unused-vars
window.getProduct = (id) => new Promise((resolve, reject) => {
  const itemRequest = new XMLHttpRequest();
  itemRequest.onreadystatechange = () => {
    if (itemRequest.readyState !== XMLHttpRequest.DONE) return;
    if (itemRequest.response.length > 0 && itemRequest.status === 200) {
      resolve(JSON.parse(itemRequest.response));
    } else {
      reject(new Error('this product does not exist'));
    }
  };
  itemRequest.open('GET', `${getFullApiPath()}/${id}`);
  itemRequest.send();
});

// XHR & Promise for all items display on the home page
// eslint-disable-next-line no-unused-vars
window.getProducts = () => new Promise((resolve, reject) => {
  const allItemsRequest = new XMLHttpRequest();
  allItemsRequest.onreadystatechange = () => {
    if (allItemsRequest.readyState !== XMLHttpRequest.DONE) return;
    if (allItemsRequest.status === 200) {
      resolve(JSON.parse(allItemsRequest.response));
    } else {
      reject(new Error('we cannot find the collection'));
      // eslint-disable-next-line no-console
      console.log('une erreur est survenue');
    }
  };
  allItemsRequest.open('GET', getFullApiPath());
  allItemsRequest.send();
});
