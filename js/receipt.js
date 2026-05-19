// Render the latest receipt saved from checkout.
function renderReceipt() {
  const receiptCard = document.querySelector("#receiptCard");
  if (!receiptCard) return;

  const order = JSON.parse(localStorage.getItem("studyboost-latest-order"));

  if (!order) {
    receiptCard.innerHTML = `
      <div class="receipt-body empty-state">
        <h2>No receipt found.</h2>
        <p>Place an order first to generate a StudyBoost receipt.</p>
        <a class="button primary" href="products.html">Shop Products</a>
      </div>
    `;
    return;
  }

  receiptCard.innerHTML = `
    <!-- Receipt Header -->
    <div class="receipt-header">
      <div>
        <p class="eyebrow">Payment receipt</p>
        <h2>Thank you, ${order.customer.name}.</h2>
        <p>Your digital products are ready for instant delivery.</p>
      </div>
      <span class="receipt-number">${order.receiptNumber}</span>
    </div>

    <!-- Receipt Body -->
    <div class="receipt-body">
      <div class="receipt-grid">
        <div class="receipt-info">
          <span>Customer email</span>
          <strong>${order.customer.email}</strong>
        </div>
        <div class="receipt-info">
          <span>Payment method</span>
          <strong>${order.paymentMethod}</strong>
        </div>
        <div class="receipt-info">
          <span>Order date</span>
          <strong>${order.date}</strong>
        </div>
      </div>

      <div class="receipt-items">
        <div class="receipt-row header">
          <span>Product</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Total</span>
        </div>
        ${order.items
          .map(
            (item) => `
              <div class="receipt-row">
                <strong>${item.name}</strong>
                <span>${item.quantity}</span>
                <span>${formatPrice(item.price)}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="receipt-total">
        <div><span>Subtotal</span><strong>${formatPrice(order.totals.subtotal)}</strong></div>
        <div><span>Discount</span><strong>-${formatPrice(order.totals.discount)}</strong></div>
        <div class="final"><span>Total Paid</span><strong>${formatPrice(order.totals.total)}</strong></div>
      </div>

      <div class="receipt-info">
        <span>Digital delivery</span>
        <strong>Files are marked as ready for download after checkout. This is a simulated frontend order.</strong>
      </div>

      <div class="receipt-actions">
        <button class="button secondary" type="button" onclick="window.print()">Print Receipt</button>
        <a class="button primary" href="products.html">Continue Shopping</a>
      </div>
    </div>
  `;
}

renderReceipt();
