// Simple navigation
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    pages.forEach(p => p.classList.remove("active"));
    document.querySelector(link.getAttribute("href")).classList.add("active");
  });
});

// Demo Products
const products = [
  { name: "Smartphone", price: 299 },
  { name: "Laptop", price: 799 },
  { name: "Headphones", price: 99 },
];

const productList = document.getElementById("product-list");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `<h3>${p.name}</h3><p>$${p.price}</p>
                   <button onclick="addToWishlist('${p.name}')">Add to Wishlist</button>`;
  productList.appendChild(div);
});

let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
let orders = JSON.parse(localStorage.getItem("orders") || "[]");
let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

// Wishlist handling
function addToWishlist(name) {
  wishlist.push(name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert(name + " added to wishlist!");
  renderWishlist();
}

function renderWishlist() {
  const ul = document.getElementById("wishlist");
  ul.innerHTML = wishlist.map(item => `<li>${item}</li>`).join("");
}
renderWishlist();

// Contact form
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("contact-response").textContent =
    "Thank you for contacting us! We’ll reply soon.";
  e.target.reset();
});

// Registration & Login
document.getElementById("register-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  if (!email.includes("@") || pass.length < 6) {
    alert("Invalid registration details!");
    return;
  }
  localStorage.setItem("user", JSON.stringify({ email }));
  alert("Registration successful!");
});

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.email === email) {
    alert("Login successful!");
    document.querySelector("#dashboard").classList.add("active");
  } else {
    alert("Invalid login!");
  }
});

// Reviews
document.getElementById("submit-review").addEventListener("click", () => {
  const text = document.getElementById("review").value;
  if (text.trim() === "") return alert("Please enter a review.");
  reviews.push(text);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReviews();
  document.getElementById("review").value = "";
});

function renderReviews() {
  const ul = document.getElementById("review-list");
  ul.innerHTML = reviews.map(r => `<li>${r}</li>`).join("");
}
renderReviews();