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
      type: 'p',
      contentAttribution: {
        type: 'innerHTML',
        value: `Your order n°${orderId} has been processed for a total amount of ${totalPrice}€`,
      },
    });
  }
}
// eslint-disable-next-line no-new
new OrderFeedback();
/* eslint-enable no-console */
