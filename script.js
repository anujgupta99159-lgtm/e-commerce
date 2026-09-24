let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");

/* Show Products */

function showProducts(list){
productContainer.innerHTML="";

list.forEach(p=>{

let div=document.createElement("div");
div.className="product";

div.innerHTML=`
<img src="${p.image}" loading="lazy">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})">Add</button>
`;

productContainer.appendChild(div);
});
}

/* Add To Cart */

function addToCart(id){

let product = products.find(p=>p.id===id);
let item = cart.find(p=>p.id===id);

if(item){
item.qty++;
}else{
cart.push({...product, qty:1});
}

cartBtn.style.transform="scale(1.2)";
setTimeout(()=>{ cartBtn.style.transform="scale(1)"; },300);

saveCart();
updateCart();
}

/* Update Cart */

function updateCart(){

cartItems.innerHTML="";
let sum=0;

cart.forEach((item,index)=>{

sum += item.price * item.qty;

let li=document.createElement("li");
li.innerHTML=`
${item.name} x${item.qty}
<button onclick="removeItem(${index})">X</button>
`;

cartItems.appendChild(li);
});

total.textContent=sum;
cartCount.textContent=cart.length;
}

/* Remove Item */

function removeItem(i){
cart.splice(i,1);
saveCart();
updateCart();
}

/* Save */

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

/* Cart Toggle */

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

cartBtn.onclick = toggleCart;

/* Search */

document.getElementById("search").oninput=(e)=>{
let text=e.target.value.toLowerCase();

let filtered = products.filter(p =>
p.name.toLowerCase().includes(text)
);

showProducts(filtered);
};

/* Filter */

document.getElementById("filter").onchange=(e)=>{
let value=e.target.value;

if(value==="all"){
showProducts(products);
}else{
showProducts(products.filter(p=>p.category===value));
}
};

/* Dark Mode */

document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("dark");
};

/* Load */

showProducts(products);
updateCart();
