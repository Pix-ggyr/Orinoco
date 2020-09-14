/* eslint-disable no-console */
class OrderFeedback {
  constructor() {
    this.catchOrderSummary();
  }

  // eslint-disable-next-line
  catchOrderSummary() {
    const orderId = localStorage.getItem('order-Id');
    console.log(orderId);
    const totalPrice = localStorage.getItem('total-price');
    console.log(totalPrice);
    window.createElement({
      containerId: 'order-summary',
      type: 'div',
      id: 'order-infos',
      contentAttribution: {
        type: 'innerHTML',
        value: `
        <p>Your order n° : <span>n°${orderId}</span>
        Total price amount : <span>${totalPrice}</span>$</p>`,
      },
    });
  }
}
// eslint-disable-next-line no-new
new OrderFeedback();
/* eslint-enable no-console */
