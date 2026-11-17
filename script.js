const products = [
 {id:1,category:"phone",tag:"IPHONE",name:"iPhone 16 Pro",desc:"A18 Pro chip • Pro kamera tizimi",price:"14 999 000 so‘m",storage:"256 GB",color:"Titanium",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=85"},
 {id:2,category:"phone",tag:"IPHONE",name:"iPhone 16",desc:"A18 chip • Ilg‘or ikki kamera",price:"10 999 000 so‘m",storage:"128 GB",color:"Ultramarine",image:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=85"},
 {id:3,category:"tablet",tag:"IPAD",name:"iPad Air",desc:"M2 chip • Liquid Retina displey",price:"8 499 000 so‘m",storage:"128 GB",color:"Space Gray",image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=85"},
 {id:4,category:"laptop",tag:"MAC",name:"MacBook Air 13″",desc:"Apple silicon • Yupqa va yengil",price:"15 499 000 so‘m",storage:"256 GB SSD",color:"Midnight",image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85"},
 {id:5,category:"audio",tag:"AIRPODS",name:"AirPods Pro",desc:"Faol shovqinni bekor qilish",price:"3 299 000 so‘m",storage:"—",color:"White",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85"},
 {id:6,category:"watch",tag:"WATCH",name:"Apple Watch Series",desc:"Sog‘liq va faollik kuzatuvi",price:"5 199 000 so‘m",storage:"64 GB",color:"Silver",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85"}
];

const grid = document.getElementById("productGrid");
const modal = document.getElementById("registerModal");
const modalProduct = document.getElementById("modalProduct");
const toast = document.getElementById("toast");
let selectedProduct = null;

function renderProducts(filter = "all") {
  const visible = products.filter(p => filter === "all" || p.category === filter);
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <span class="product-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="specs">
        <div><span>Xotira</span><b>${p.storage}</b></div>
        <div><span>Rang</span><b>${p.color}</b></div>
      </div>
      <div class="product-bottom"><strong class="price">${p.price}</strong><button class="buy-btn" data-buy="${p.id}">Xarid qilish ↗</button></div>
    </article>`).join("");
}

renderProducts();

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-buy]");
  if (!button) return;
  selectedProduct = products.find(p => p.id === Number(button.dataset.buy));
  modalProduct.textContent = `${selectedProduct.name} · ${selectedProduct.storage} · ${selectedProduct.color} · ${selectedProduct.price}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("#registerForm input")?.focus();
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

document.getElementById("registerForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const name = new FormData(event.currentTarget).get("name");
  closeModal();
  event.currentTarget.reset();
  toast.textContent = `Rahmat, ${name}! ${selectedProduct.name} uchun so‘rovingiz qabul qilindi (demo).`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
});

const track = document.getElementById("carouselTrack");
const slides = [...track.children];
const dots = document.getElementById("carouselDots");
let currentSlide = 0;
slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `${index + 1}-slayd`);
  dot.addEventListener("click", () => goToSlide(index));
  dots.appendChild(dot);
});
function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  [...dots.children].forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}
document.getElementById("prevSlide").addEventListener("click", () => goToSlide(currentSlide - 1));
document.getElementById("nextSlide").addEventListener("click", () => goToSlide(currentSlide + 1));
goToSlide(0);
let carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
document.querySelector(".carousel-window").addEventListener("mouseenter", () => clearInterval(carouselTimer));
document.querySelector(".carousel-window").addEventListener("mouseleave", () => {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));
