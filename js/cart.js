// Shared product data used by product cards, cart, and checkout pages.
const studyBoostProducts = [
  {
    id: 1,
    name: "Exam Planner Template",
    price: 12,
    category: "Planning",
    rating: "4.9",
    reviews: 124,
    discount: "20% OFF",
    icon: "&#128211;",
    mockup: "planner",
    badge: "Exam week",
    trending: true,
    fileType: "PDF + Notion",
    description: "A calm revision planner with exam countdowns, topic lists, daily priorities, and progress check-ins."
  },
  {
    id: 2,
    name: "Student Budget Tracker",
    price: 8,
    category: "Finance",
    rating: "4.8",
    reviews: 98,
    discount: "SAVE RM3",
    icon: "&#128179;",
    mockup: "budget",
    badge: "Money reset",
    trending: false,
    fileType: "Sheets",
    description: "Track allowance, meals, subscriptions, savings, and tiny campus spending leaks in one simple dashboard."
  },
  {
    id: 3,
    name: "Lecture Notes Canva Template",
    price: 15,
    category: "Templates",
    rating: "5.0",
    reviews: 146,
    discount: "BESTSELLER",
    icon: "&#128187;",
    mockup: "canva",
    badge: "Canva ready",
    trending: true,
    fileType: "Canva",
    description: "Editable Canva pages for polished lecture summaries, diagrams, key terms, and clean class handouts."
  },
  {
    id: 4,
    name: "Assignment Tracker Dashboard",
    price: 10,
    category: "Planning",
    rating: "4.9",
    reviews: 117,
    discount: "NEW",
    icon: "&#128203;",
    mockup: "dashboard",
    badge: "Deadline care",
    trending: true,
    fileType: "Notion",
    description: "A clean dashboard for deadlines, progress stages, reference links, rubrics, and submission status."
  },
  {
    id: 5,
    name: "Study Timetable Pack",
    price: 9,
    category: "Planning",
    rating: "4.7",
    reviews: 86,
    discount: "15% OFF",
    icon: "&#128197;",
    mockup: "timetable",
    badge: "Weekly focus",
    trending: false,
    fileType: "PDF",
    description: "Weekly and monthly timetable layouts with gentle color blocks, study sessions, and planned breaks."
  },
  {
    id: 6,
    name: "Digital Flashcard Set",
    price: 7,
    category: "Revision",
    rating: "4.8",
    reviews: 103,
    discount: "SAVE RM2",
    icon: "&#9997;",
    mockup: "flashcards",
    badge: "Recall boost",
    trending: false,
    fileType: "PDF + PNG",
    description: "Printable and digital flashcard layouts for definitions, formulas, quick recall, and active revision."
  }
];

// Format prices using Malaysian Ringgit labels.
function formatPrice(value) {
  return `RM${value.toFixed(2).replace(".00", "")}`;
}

// Load cart data from localStorage so items stay when moving between pages.
function getCart() {
  return JSON.parse(localStorage.getItem("studyboost-cart")) || [];
}

// Save cart data after every cart change.
function saveCart(cart) {
  localStorage.setItem("studyboost-cart", JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart.
function addToCart(productId) {
  const product = studyBoostProducts.find((item) => item.id === productId);
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (!product) return;

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

// Increase or decrease product quantity in cart.
function changeCartQuantity(productId, amount) {
  let cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart(cart);
  renderCartPage();
}

// Remove product from cart.
function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderCartPage();
}

// Count total items in cart for the header badge.
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = totalItems;
  });
}

// Calculate subtotal, discount, and final total.
function calculateTotals() {
  const cart = getCart();
  const promo = localStorage.getItem("studyboost-promo");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promo === "STUDY10" ? subtotal * 0.1 : promo === "BOOST5" ? subtotal * 0.05 : 0;

  return {
    subtotal,
    discount,
    total: Math.max(subtotal - discount, 0)
  };
}

// Apply simulated promo code on cart page.
function applyPromoCode() {
  const promoInput = document.querySelector("#promoCode");
  const promoMessage = document.querySelector("#promoMessage");
  const code = promoInput.value.trim().toUpperCase();

  if (!getCart().length) {
    promoMessage.textContent = "Add an item before applying a promo code.";
    return;
  }

  if (code === "STUDY10" || code === "BOOST5") {
    localStorage.setItem("studyboost-promo", code);
    promoMessage.textContent = code === "STUDY10" ? "10% study discount applied." : "5% productivity discount applied.";
  } else {
    localStorage.removeItem("studyboost-promo");
    promoMessage.textContent = "Promo code not found. Try STUDY10.";
  }

  renderCartPage();
}

// Render the full cart page when cart.html is open.
function renderCartPage() {
  const cartContainer = document.querySelector("#cartPageItems");
  const subtotalElement = document.querySelector("#cartSubtotal");
  const discountElement = document.querySelector("#cartDiscount");
  const totalElement = document.querySelector("#cartTotal");
  const checkoutLink = document.querySelector("#checkoutLink");

  if (!cartContainer || !subtotalElement || !discountElement || !totalElement) return;

  const cart = getCart();
  const totals = calculateTotals();

  subtotalElement.textContent = formatPrice(totals.subtotal);
  discountElement.textContent = `-${formatPrice(totals.discount)}`;
  totalElement.textContent = formatPrice(totals.total);

  if (checkoutLink) {
    checkoutLink.classList.toggle("disabled", cart.length === 0);
  }

  if (!cart.length) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty.</h2>
        <p>Add a planner, tracker, or template to begin your simulated order.</p>
        <a class="button primary" href="products.html">Shop Products</a>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <!-- Cart Item Card -->
        <article class="cart-item">
          <div class="cart-item-main">
            <span class="cart-item-icon" aria-hidden="true">${item.icon}</span>
            <div>
              <h3>${item.name}</h3>
              <p>${formatPrice(item.price)} each</p>
            </div>
          </div>
          <div class="cart-actions">
            <div class="quantity-control" aria-label="Quantity controls for ${item.name}">
              <button type="button" data-decrease="${item.id}" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-increase="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-button" type="button" data-remove="${item.id}">Remove</button>
          </div>
        </article>
      `
    )
    .join("");
}

// Listen for clicks inside the cart page.
document.addEventListener("click", (event) => {
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");
  const removeButton = event.target.closest("[data-remove]");
  const promoButton = event.target.closest("#applyPromo");

  if (increaseButton) changeCartQuantity(Number(increaseButton.dataset.increase), 1);
  if (decreaseButton) changeCartQuantity(Number(decreaseButton.dataset.decrease), -1);
  if (removeButton) removeFromCart(Number(removeButton.dataset.remove));
  if (promoButton) applyPromoCode();
});

// Allow Enter key to apply promo code.
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "promoCode") {
    event.preventDefault();
    applyPromoCode();
  }
});

updateCartCount();
renderCartPage();
