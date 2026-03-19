let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = [];
let isLoggedIn = false;
let isAdmin = false;

let products = [];
let orders = [];

// LOAD DATA
function loadData() {
  try {
    products = JSON.parse(localStorage.getItem("products")) || [];
    orders = JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    products = [];
    orders = [];
  }
}

// SAVE
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// LOGIN
function loginUser() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  // ADMIN LOGIN
  if (user === "admin" && pass === "123") {
    isAdmin = true;
    isLoggedIn = true;
    document.getElementById("adminBtn").style.display = "inline-block";
    alert("Admin Login 👑");
    showProducts();
    return;
  }

  // USER LOGIN
  let found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    isLoggedIn = true;
    alert("Login Successful 👤");
  } else {
    alert("Invalid user ❗");
  }
}
  
  //  SIGNUP
  function signupUser() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Fill all fields ❗");
    return;
  }

  // check duplicate
  let exist = users.find(u => u.username === user);

  if (exist) {
    alert("User already exists ❗");
    return;
  }

  users.push({ username: user, password: pass });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup Successful 🎉");
}

// ADMIN PANEL
function openAdmin() {
  if (!isAdmin) {
    alert("Admin only ❗");
    return;
  }
  document.getElementById("adminPanel").style.display = "block";
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

// ADD PRODUCT
function addProduct() {
  let name = document.getElementById("pName").value;
  let price = document.getElementById("pPrice").value;
  let desc = document.getElementById("pDesc").value;
  let image = document.getElementById("pImage").value;

  if (!name || !price || !desc) {
    alert("Fill all fields ❗");
    return;
  }

  if (!image) image = "https://via.placeholder.com/100";

  products.push({ name, price, desc, image, stock: true });

  saveProducts();
  showProducts();

  alert("Product Added ✅");
}

// SHOW PRODUCTS
function showProducts() {
  let html = "";

  products.forEach((p, index) => {
    html += `
      <div class="product">
        <img src="${p.image}" width="100">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p>₹${p.price}</p>
        <p>${p.stock ? "✅ In Stock" : "❌ Out of Stock"}</p>

        <button onclick="addToCart('${p.name}', ${p.price})" ${!p.stock ? "disabled" : ""}>Add to Cart</button>

        ${isAdmin ? `
          <br>
          <button onclick="deleteProduct(${index})">Delete</button>
          <button onclick="toggleStock(${index})">Stock</button>
        ` : ""}
      </div>
    `;
  });

  document.getElementById("productList").innerHTML = html;
}

// DELETE
function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  showProducts();
}

// STOCK
function toggleStock(index) {
  products[index].stock = !products[index].stock;
  saveProducts();
  showProducts();
}

// CART
function addToCart(name, price) {
  cart.push({ name, price });
  alert(name + " added 🛒");
}

// ORDER
function placeOrder() {
  if (!isLoggedIn) {
    alert("Login first ❗");
    return;
  }

  if (cart.length === 0) {
    alert("Cart empty ❗");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  orders.push({
    items: cart,
    total: total,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  document.getElementById("totalAmount").innerText = total;
  document.getElementById("paymentModal").style.display = "block";
}

// PAYMENT
function confirmPayment() {
  alert("Payment Successful 🎉");
  cart = [];
  document.getElementById("paymentModal").style.display = "none";
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
}

// SHOW ORDERS
function showOrders() {
  let html = "";

  if (orders.length === 0) {
    html = "<p>No Orders ❗</p>";
  }

  orders.forEach((o, i) => {
    html += `
      <div style="border:1px solid black; margin:10px; padding:10px;">
        <h4>Order ${i + 1}</h4>
        <p>Total: ₹${o.total}</p>
        <p>${o.time}</p>
        ${o.items.map(x => `<p>${x.name} - ₹${x.price}</p>`).join("")}
      </div>
    `;
  });

  document.getElementById("orderList").innerHTML = html;
}

// INIT
window.onload = function () {
  document.getElementById("adminBtn").style.display = "none";
  loadData();
  showProducts();
};