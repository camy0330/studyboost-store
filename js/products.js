let selectedCategory = "All";
let favorites = new Set(JSON.parse(localStorage.getItem("studyboost-favorites")) || []);

// Create star rating HTML.
function getStars(rating) {
  const rounded = Math.round(Number(rating));
  return Array.from({ length: 5 }, (_, index) => (index < rounded ? "&#9733;" : "&#9734;")).join("");
}

// Build a CSS product mockup based on the product type.
// This keeps images realistic for a digital product shop without needing external image files.
function getProductMockup(product, size = "card") {
  const sizeClass = size === "large" ? " large" : "";
  const mockup = product.mockup;

  if (mockup === "planner") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-window planner-preview">
          <div class="window-bar"><span></span><span></span><span></span></div>
          <div class="mockup-title">Exam Planner</div>
          <div class="mockup-lines">
            <span>Study Goals</span><span>Countdown</span><span>Subject Checklist</span>
          </div>
          <div class="mockup-grid">
            <span>Math</span><span>Bio</span><span>Eng</span>
          </div>
        </div>
      </div>
    `;
  }

  if (mockup === "dashboard") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-window dashboard-preview">
          <div class="window-bar"><span></span><span></span><span></span></div>
          <div class="mockup-title">Assignment Tracker</div>
          <div class="dashboard-columns">
            <span>Due Date</span><span>Progress</span><span>Status</span>
          </div>
        </div>
      </div>
    `;
  }

  if (mockup === "budget") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-sheet">
          <div class="sheet-header">Budget Tracker</div>
          <div class="sheet-row"><span>Income</span><span>Expenses</span><span>Savings</span></div>
          <div class="sheet-row"><span>RM</span><span>Food</span><span>Goal</span></div>
          <div class="mini-chart"><span></span><span></span><span></span></div>
        </div>
      </div>
    `;
  }

  if (mockup === "canva") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-canva">
          <div class="canva-sidebar"><span>Topic</span><span>Layout</span></div>
          <div class="canva-page">
            <strong>Lecture Notes</strong>
            <span>Key Points</span>
            <span>Summary</span>
            <span>Diagram</span>
          </div>
        </div>
      </div>
    `;
  }

  if (mockup === "timetable") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-tablet">
          <div class="tablet-screen">
            <strong>Study Timetable</strong>
            <span>Monday</span><span>Tuesday</span><span>Revision</span>
            <span>9 AM</span><span>Math</span><span>Bio</span>
            <span>Break</span><span>Notes</span><span>Quiz</span>
          </div>
        </div>
      </div>
    `;
  }

  if (mockup === "flashcards") {
    return `
      <div class="product-mockup${sizeClass}" aria-hidden="true">
        <div class="mockup-phone">
          <div class="phone-screen">
            <strong>Flashcards</strong>
            <span class="flashcard-line">Question</span>
            <span class="flashcard-line">Answer</span>
            <span class="flashcard-line">Review</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="product-mockup${sizeClass}" aria-hidden="true">
      <div class="mockup-paper">
        <div class="paper-title">Planner</div>
        <div class="paper-check"><span>Task</span><span>Focus</span><span>Done</span></div>
      </div>
    </div>
  `;
}

// Render trending products on the homepage.
function renderTrendingProducts() {
  const trendingGrid = document.querySelector("#trendingGrid");
  if (!trendingGrid) return;

  trendingGrid.innerHTML = studyBoostProducts
    .filter((product) => product.trending)
    .map(
      (product) => `
        <!-- Trending Product Card -->
        <a class="trend-card" href="product-details.html?id=${product.id}">
          <span class="trend-icon" aria-hidden="true">${getProductMockup(product)}</span>
          <div>
            <h3>${product.name}</h3>
            <p>${product.badge} - ${formatPrice(product.price)}</p>
          </div>
        </a>
      `
    )
    .join("");
}

// Render all product cards on products.html.
function renderProducts() {
  const productGrid = document.querySelector("#productGrid");
  const searchInput = document.querySelector("#productSearch");
  if (!productGrid) return;

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const visibleProducts = studyBoostProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const searchableText = `${product.name} ${product.description} ${product.category} ${product.fileType}`.toLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });

  if (!visibleProducts.length) {
    productGrid.innerHTML = `<p class="empty-state">No products found. Try another search or category.</p>`;
    return;
  }

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <!-- Product Card -->
        <article class="product-card ${product.trending ? "featured" : ""}">
          <!-- Product Image Area: mockup, wishlist, and details button have reserved safe spaces. -->
          <div class="product-art">
            ${getProductMockup(product)}
            <button
              class="wishlist-button ${favorites.has(product.id) ? "active" : ""}"
              type="button"
              data-favorite="${product.id}"
              aria-label="Add ${product.name} to wishlist"
            >
              ${favorites.has(product.id) ? "&#9829;" : "&#9825;"}
            </button>
            <a class="quick-view" href="product-details.html?id=${product.id}">View Details</a>
          </div>
          <!-- Product Content Area: all readable text and actions stay below the image. -->
          <div class="product-body">
            <div class="product-top">
              <div>
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
              </div>
              <span class="discount">${product.discount}</span>
            </div>
            <div class="rating" aria-label="${product.rating} out of 5 stars">
              ${getStars(product.rating)} <span>${product.rating} (${product.reviews})</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-meta">
              <span>${product.fileType}</span>
              <span>Instant download</span>
            </div>
            <div class="product-bottom">
              <span class="price">${formatPrice(product.price)}</span>
              <div class="product-actions">
                <button class="button primary small-add" type="button" data-add="${product.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

// Render a single product on product-details.html.
function renderProductDetails() {
  const detailContainer = document.querySelector("#productDetail");
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id")) || 1;
  const product = studyBoostProducts.find((item) => item.id === productId);

  if (!product) {
    detailContainer.innerHTML = `<div class="empty-state"><h2>Product not found.</h2><a class="button primary" href="products.html">Back to Products</a></div>`;
    return;
  }

  detailContainer.innerHTML = `
    <!-- Product Details Content -->
    <div class="detail-art">${getProductMockup(product, "large")}</div>
    <div>
      <p class="eyebrow">${product.category} product</p>
      <h1>${product.name}</h1>
      <div class="rating">${getStars(product.rating)} ${product.rating} (${product.reviews} reviews)</div>
      <p>${product.description}</p>
      <div class="detail-meta">
        <span>${product.fileType}</span>
        <span>${product.discount}</span>
        <span>Instant digital delivery</span>
      </div>
      <p class="price">${formatPrice(product.price)}</p>
      <button class="button primary" type="button" data-add="${product.id}">Add to Cart</button>
      <a class="button secondary" href="products.html">Back to Products</a>
    </div>
  `;
}

// Toggle wishlist state.
function toggleFavorite(productId) {
  if (favorites.has(productId)) {
    favorites.delete(productId);
  } else {
    favorites.add(productId);
  }

  localStorage.setItem("studyboost-favorites", JSON.stringify([...favorites]));
  renderProducts();
}

// Product page event listeners.
document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const favoriteButton = event.target.closest("[data-favorite]");

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
    addButton.textContent = "Added!";
    setTimeout(() => {
      addButton.textContent = "Add to Cart";
    }, 900);
  }

  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "productSearch") {
    renderProducts();
  }
});

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-category]");
  if (!filterButton) return;

  selectedCategory = filterButton.dataset.category;
  document.querySelectorAll(".filter").forEach((button) => button.classList.remove("active"));
  filterButton.classList.add("active");
  renderProducts();
});

renderTrendingProducts();
renderProducts();
renderProductDetails();
