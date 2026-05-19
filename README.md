# StudyBoost

StudyBoost is a professional multi-page static e-commerce website for a student digital product store. It sells digital planners, trackers, Canva templates, dashboards, timetables, and flashcard sets for students who want a more organized semester.

The project uses a cute doodle stationery aesthetic with soft pastel beige, cream, brown, pink, and blue colors. It is built for university e-commerce assessment, GitHub portfolio presentation, and beginner-friendly frontend learning.

## Project Overview

StudyBoost demonstrates a complete digital product storefront:

- Business branding and logo
- Homepage banner and marketing sections
- Product listing and product details pages
- Cart page with quantity updates
- Promo code and discount calculation
- Simulated checkout page
- Digital delivery explanation
- Responsive layout for mobile, tablet, and desktop

No backend or real payment gateway is used.

## Features

- Multi-page website structure
- Sticky responsive navigation
- Mobile hamburger menu
- Featured categories
- Productivity statistics
- Trending products
- Product search and category filtering
- Wishlist/favorite button UI
- Product details page
- Add to cart functionality
- LocalStorage cart persistence between pages
- Cart quantity update and remove buttons
- Subtotal, discount, and total calculation
- Simulated promo codes: `STUDY10` and `BOOST5`
- Simulated checkout success popup
- Contact page
- Scroll reveal animations
- Beginner-friendly comments in HTML, CSS, and JavaScript

## Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Google Fonts

## Folder Structure

```text
studyboost-store/
|-- index.html
|-- about.html
|-- products.html
|-- product-details.html
|-- cart.html
|-- checkout.html
|-- contact.html
|
|-- css/
|   |-- global.css
|   |-- home.css
|   |-- products.css
|   |-- cart.css
|   |-- checkout.css
|   `-- responsive.css
|
|-- js/
|   |-- main.js
|   |-- products.js
|   |-- cart.js
|   |-- checkout.js
|   `-- animations.js
|
|-- images/
|   |-- logo/
|   |-- banners/
|   |-- products/
|   `-- doodles/
|
`-- README.md
```

## Pages

- `index.html` - Homepage with hero, categories, stats, trending products, and CTA
- `about.html` - Business concept, digital product explanation, and testimonials
- `products.html` - Product catalog with search, filters, wishlist UI, and add to cart
- `product-details.html` - Dynamic product detail page using the product ID in the URL
- `cart.html` - Cart review, quantity controls, promo code, and order summary
- `checkout.html` - Simulated checkout form and success popup
- `contact.html` - Contact form for customer questions

## Promo Codes

Use these demo promo codes on the cart page:

- `STUDY10` - 10% discount
- `BOOST5` - 5% discount

## Installation

Clone or download this repository, then open `index.html` in your browser.

```bash
git clone <your-repository-url>
cd studyboost-store
```

No package installation is required.

## Local Preview

You can run a small local server:

```bash
python -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173/
```

## Screenshots

Add screenshots here when publishing to GitHub:

```text
screenshots/
|-- desktop-home.png
|-- desktop-products.png
|-- desktop-cart.png
|-- checkout-success.png
`-- mobile-home.png
```

## Assignment Alignment

This project clearly demonstrates:

- Digital product business concept
- Product descriptions and pricing
- Branding, logo, and banner
- Cart and simulated checkout/payment
- Digital delivery explanation
- Marketing-friendly homepage sections
- Responsive frontend design
- Clean professional project structure

Checkout is simulated for demonstration only. No real payment is processed.
