// Render checkout summary on checkout.html.
function renderCheckoutPage() {
  const checkoutItems = document.querySelector("#checkoutItems");
  const checkoutTotal = document.querySelector("#checkoutTotal");
  if (!checkoutItems || !checkoutTotal) return;

  const cart = getCart();
  const totals = calculateTotals();

  checkoutTotal.textContent = formatPrice(totals.total);

  if (!cart.length) {
    checkoutItems.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty. Add products before checkout.</p>
        <a class="button primary" href="products.html">Shop Products</a>
      </div>
    `;
    return;
  }

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
        <!-- Checkout Item -->
        <article class="checkout-item">
          <span aria-hidden="true">${item.icon}</span>
          <div>
            <strong>${item.name}</strong>
            <p>${item.quantity} x ${formatPrice(item.price)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

// Submit simulated checkout form.
function setupCheckoutForm() {
  const checkoutForm = document.querySelector("#checkoutForm");
  const successModal = document.querySelector("#successModal");
  const downloadList = document.querySelector("#downloadList");

  if (!checkoutForm || !successModal || !downloadList) return;

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = getCart();
    const totals = calculateTotals();
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    // Save receipt data before clearing the cart.
    const order = {
      receiptNumber: `SB-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleString("en-MY", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
      customer: {
        name: document.querySelector("#customerName").value.trim(),
        email: document.querySelector("#customerEmail").value.trim()
      },
      paymentMethod: document.querySelector("#paymentMethod").value,
      items: cart,
      totals
    };

    localStorage.setItem("studyboost-latest-order", JSON.stringify(order));
    downloadList.innerHTML = cart.map((item) => `<span>${item.name}</span>`).join("");
    successModal.classList.add("open");
    successModal.setAttribute("aria-hidden", "false");

    localStorage.removeItem("studyboost-cart");
    localStorage.removeItem("studyboost-promo");
    updateCartCount();
  });
}

renderCheckoutPage();
setupCheckoutForm();
