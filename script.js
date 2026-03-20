let products = [];

function renderProducts() {
  let html = "";
  products.forEach((p, index) => {
    html += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>${p.stock ? "In Stock" : "Out of Stock"}</p>

        <button onclick="orderNow()">Order</button>
        <button onclick="toggleStock(${index})">Toggle Stock</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });

  document.getElementById("products").innerHTML = html;
}

function addProduct() {
  let name = document.getElementById("pname").value;
  let price = document.getElementById("pprice").value;

  if (!name || !price) {
    alert("Fill all fields");
    return;
  }

  products.push({
    name: name,
    price: price,
    stock: true
  });

  renderProducts();
}

function deleteProduct(i) {
  products.splice(i, 1);
  renderProducts();
}

function toggleStock(i) {
  products[i].stock = !products[i].stock;
  renderProducts();
}

function orderNow() {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLSe-7N5UEgtCtmckjNalMQXygN3a7JZMGAsva-f6T28wySSnZw/viewform", "_blank");
}

function login() {
  let email = prompt("Enter email:");
  if (email) alert("Logged in");
}

function openAdmin() {
  let pass = prompt("Enter admin password:");
  if (pass === "1234") {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    alert("Wrong password");
  }
}

function closeAdmin() {
  document.getElementById("adminPanel").classList.add("hidden");
}

renderProducts();
