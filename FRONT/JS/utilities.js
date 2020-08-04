// createElement function based on POO

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

// XHR & Promise for getting one product informations

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
