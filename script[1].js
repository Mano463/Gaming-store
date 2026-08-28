const products = [
  {name:"NEXORA RTX Gaming PC", category:"Gaming PCs", price:189999, old:209999, icon:"🖥️"},
  {name:"PlayStation 5 Slim", category:"Consoles", price:154999, old:164999, icon:"🎮"},
  {name:"Pro RGB Gaming Headset", category:"Accessories", price:8999, old:10999, icon:"🎧"},
  {name:"Mechanical RGB Keyboard", category:"Accessories", price:6499, old:7999, icon:"⌨️"},
  {name:"Xbox Series X", category:"Consoles", price:164999, old:174999, icon:"🎮"},
  {name:"Ultra Gaming Monitor", category:"Gaming PCs", price:54999, old:59999, icon:"🖥️"},
  {name:"Wireless Pro Controller", category:"Accessories", price:12999, old:14999, icon:"🎮"},
  {name:"Gaming Mouse Pro", category:"Accessories", price:4499, old:5499, icon:"🖱️"}
];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const wishCount = document.getElementById("wishCount");
let cart = 0, wishes = 0;

function money(n){ return "Rs. " + n.toLocaleString("en-PK"); }
function renderProducts(filter="All"){
  const list = filter==="All" ? products : products.filter(p=>p.category===filter);
  productGrid.innerHTML = list.map((p,i)=>`
    <article class="product-card">
      <button class="heart" aria-label="Add to wishlist" data-wish="${i}">♡</button>
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
        <button class="add" data-add="${i}">Add to Cart +</button>
      </div>
    </article>`).join("");
}
renderProducts();

productGrid.addEventListener("click", e=>{
  const add = e.target.closest("[data-add]");
  const wish = e.target.closest("[data-wish]");
  if(add){ cart++; cartCount.textContent=cart; showToast("Added to your cart ✓"); }
  if(wish){ wish.classList.toggle("active"); if(wish.classList.contains("active")){wishes++;showToast("Added to wishlist ♡")}else{wishes--} wishCount.textContent=wishes; }
});

document.getElementById("filters").addEventListener("click",e=>{
  const btn=e.target.closest(".filter"); if(!btn)return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); renderProducts(btn.dataset.filter);
});

const menuToggle=document.getElementById("menuToggle");
const mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
  menuToggle.textContent=open?"✕":"☰";
});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); menuToggle.textContent="☰";
}));

document.querySelectorAll(".category-card").forEach(card=>card.addEventListener("click",()=>{
  const cat=card.dataset.category;
  if(cat){ document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===cat)); renderProducts(cat); }
}));

const searchPanel=document.getElementById("searchPanel");
const searchInput=document.getElementById("searchInput");
document.getElementById("searchBtn").addEventListener("click",()=>{searchPanel.classList.add("open");searchInput.focus()});
document.getElementById("closeSearch").addEventListener("click",()=>searchPanel.classList.remove("open"));
searchInput.addEventListener("input",()=>{
  const q=searchInput.value.toLowerCase().trim();
  const list=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q));
  productGrid.innerHTML=list.length?list.map((p,i)=>`
  <article class="product-card"><button class="heart" data-wish="${i}">♡</button><div class="product-img">${p.icon}</div><div class="product-info"><span class="product-cat">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div><button class="add" data-add="${i}">Add to Cart +</button></div></article>`).join(""):"<p style='color:#8991a2;grid-column:1/-1'>No products found.</p>";
});
document.getElementById("wishlistBtn").addEventListener("click",()=>document.getElementById("shop").scrollIntoView({behavior:"smooth"}));
document.getElementById("cartBtn").addEventListener("click",()=>showToast(cart?`You have ${cart} item${cart>1?"s":""} in your cart.`:"Your cart is empty."));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Thanks! You're on the list ✓");e.target.reset()});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
