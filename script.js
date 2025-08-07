const products = [
  { name: "Caramel Macchiato", price: 120, image: "Caramel Macchiato.jpg", badge: "New" },
  { name: "Americano", price: 160, image: "Americano.jpg", badge: "Popular" },
  { name: "Affogato", price: 140, image: "Affogato.jpg", badge: "Hot Deal" },
  { name: "Dalgona Coffee", price: 150, image: "Dalgona Coffee.jpg", badge: "New" },
  { name: "Cold Brew", price: 130, image: "Cold Brew.jpeg", badge: "Bestseller" },
  { name: "Iced Latte", price: 200, image: "Iced Latte.jpg", badge: "New" },
  { name: "Hazelnut Latte", price: 250, image: "Hazelnut Latte.jpg", badge: "Popular" },
  { name: "Iced Mocha", price: 140, image: "Iced Mocha.jpg", badge: "Hot Deal" },
  { name: "Mocha", price: 150, image: "Mocha.jpg", badge: "New" },
  { name: "Pumpkin Spice Latte", price: 130, image: "Pumpkin Spice Latte.jpg", badge: "Bestseller" },
  { name: "Toffenut Latte", price: 200, image: "Toffe Nut Latte.png", badge: "New" },
  { name: "Cappucino", price: 180, image: "Cappucino.jpg", badge: "Popular" },
  { name: "Iced Caramel Latte", price: 140, image: "Iced Caramel Latte.jpeg", badge: "Hot Deal" },
  { name: "Espresso Con Panna", price: 300, image: "Espresso Con Panna.jpg", badge: "New" },
  { name: "Flat White", price: 130, image: "Flat White.jpeg", badge: "Bestseller" },
  { name: "Irish Coffee", price: 280, image: "Irish Coffee.jpg", badge: "Popular" },
  { name: "Masala-Chai", price: 80, image: "Masala-Chai.jpg", badge: "Hot Deal" },
  { name: "Vietnamese Iced Coffee", price: 190, image: "Vietnamese Iced Coffee.avif", badge: "New" },
  { name: "Ristretto", price: 130, image: "Ristretto.jpeg", badge: "Hot Deal" },
  { name: "Turkish Coffee", price: 150, image: "Turkish Coffee.jpeg", badge: "New" },
];

const productList = document.getElementById("productList");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalAmount = document.getElementById("totalAmount");
const themeToggle = document.getElementById("themeToggle");

let cart = [];

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="badge">${product.badge}</span>
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="rating">⭐ Excellent</div>
      <div class="quantity-controls">
        <button onclick="updateQty(${index}, -1)">➖</button>
        <span id="qty-${index}">1</span>
        <button onclick="updateQty(${index}, 1)">➕</button>
      </div>
      <button class="cart-btn" onclick="addToCart(${index})">Add to Cart</button>
      <button class="like-btn">❤️</button>
      
    `;
    productList.appendChild(card);
  });
}

function updateQty(index, change) {
  const qtyEl = document.getElementById(`qty-${index}`);
  let current = parseInt(qtyEl.innerText);
  current = Math.max(1, current + change);
  qtyEl.innerText = current;
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  const existing = cart.find(item => item.index === index);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ index, qty });
  }
  updateCart();
  cartOverlay.classList.remove("hidden");
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const product = products[item.index];
    const itemTotal = item.qty * product.price;
    total += itemTotal;
    cartItems.innerHTML += `<p>${product.name} x ${item.qty} = ₹${itemTotal}</p>`;
  });
  cartCount.innerText = cart.length;
  totalAmount.innerText = `Total: ₹${total}`;
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  cartOverlay.classList.toggle("dark");
});

// Cart Toggle
cartBtn.addEventListener("click", () => {
  cartOverlay.classList.toggle("hidden");
});
closeCart.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});

// Scroll to Top
document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Nav Scroll
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// Order & Payment
document.getElementById("placeOrderBtn").addEventListener("click", () => {
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  cartOverlay.classList.add("hidden");
});
document.getElementById("payBillBtn").addEventListener("click", () => {
  alert(totalAmount.innerText + " paid successfully!");
  cart = [];
  updateCart();
  cartOverlay.classList.add("hidden");
});

// Show only Home section on load
window.onload = () => {
  scrollToSection("home");
};

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

renderProducts();
// Optional: contact form submission alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for contacting CoffeeCraze! We'll get back to you soon.");
  this.reset();
});
// 🔍 SEARCH FUNCTIONALITY
document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "block";
      found = true;
    } else {
      product.style.display = "none";
    }
  });
  

  let noResult = document.getElementById("noResultMsg");
  if (!found) {
    if (!noResult) {
      noResult = document.createElement("div");
      noResult.id = "noResultMsg";
      noResult.textContent = "No items found.";
      noResult.style.textAlign = "center";
      noResult.style.fontWeight = "bold";
      noResult.style.marginTop = "20px";
      document.getElementById("productList").appendChild(noResult);
    }
  } else {
    if (noResult) {
      noResult.remove();
    }
  }
});
// ⌨️ Scroll to products on Enter key press
document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form submission (if any)
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
  }
});
