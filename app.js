// Constructor for Customer Object
function Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone) {
    this.fullName = fullName;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.orderType = orderType;
    this.orderOption = orderOption;
    this.imageUrl = imageUrl;
    this.phone = phone;
}

// Array to store customer orders
let orders = [];

// Function to render customer orders
function Orders() {
    const ordersContainer = document.getElementById("orders-container");

    // Loop through orders and create cards
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const orderCard = document.createElement("div");
        orderCard.className = "order-card";

        orderCard.innerHTML = `
      <img src="${order.imageUrl}" alt="${order.fullName}">
      <h3>${order.fullName}</h3>
      <p><strong>Date of Birth:</strong>${order.dob}</p>
      <p><strong>Gender:</strong> ${order.gender}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Order Type:</strong> ${order.orderType.join(", ")}</p>
      <p><strong>Order Option:</strong> ${order.orderOption}</p>
    `;

        ordersContainer.appendChild(orderCard);
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const fullName = document.getElementById("full-name").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const imageUrl = document.getElementById("image-url").value;

    // Get order type (checkboxes)
    const orderType = [];
    const orderTypeCheckboxes = document.querySelectorAll('input[name="order-type"]:checked');
    orderTypeCheckboxes.forEach(checkbox => orderType.push(checkbox.value));

    // Get order option (radio buttons)
    const orderOption = document.querySelector('input[name="order-option"]:checked').value;

    // Create customer object
    const customer = new Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone);

    // Add to orders array
    orders.push(customer);

    // Save to local storage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Render orders
    Orders();

    // Reset form
    event.target.reset();
}

// Load orders from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        Orders();
    }

    // Attach form submit event
    const form = document.getElementById("order-form");
    form.addEventListener("submit", handleFormSubmit);
});