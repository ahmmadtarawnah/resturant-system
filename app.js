function Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone, email) {
    this.fullName = fullName;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.orderType = orderType;
    this.orderOption = orderOption;
    this.imageUrl = imageUrl;
    this.phone = phone;
    this.email = email;
}

let orders = [];

function Orders() {
    const ordersContainer = document.getElementById("orders-container");
    ordersContainer.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const orderCard = document.createElement("div");
        orderCard.className = "order-card";

        orderCard.innerHTML = `
      <img src="${order.imageUrl}" alt="${order.fullName}">
      <h3>${order.fullName}</h3>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Date of Birth:</strong>${order.dob}</p>
      <p><strong>Gender:</strong> ${order.gender}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Order Type:</strong> ${order.orderType.join(", ")}</p>
      <p><strong>Order Option:</strong> ${order.orderOption}</p>
    `;

        ordersContainer.appendChild(orderCard);
    }
}

function validateForm(fullName, password, dob, email, phone) {
    const errors = [];
    const usernameRegex = /^\S+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^07\d{8}$/;


    if (!usernameRegex.test(fullName)) {
        errors.push("Username must not contain spaces.");
    }

    // Password validation
    if (!passwordRegex.test(password)) {
        errors.push(
            "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character."
        );
    }

    // Date of Birth validation
    if (!dobRegex.test(dob)) {
        errors.push("Date of Birth must follow the format YYYY-MM-DD.");
    }

    // Email validation
    if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // Phone validation
    if (!phoneRegex.test(phone)) {
        errors.push("Phone number must be 10 digits and start with 07.");
    }

    return errors;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById("full-name").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value.trim();
    const imageUrl = document.getElementById("image-url").value.trim();
    const email = document.getElementById("email").value.trim();

    const orderType = [];
    const orderTypeCheckboxes = document.querySelectorAll('input[name="order-type"]:checked');
    orderTypeCheckboxes.forEach(checkbox => orderType.push(checkbox.value));

    const orderOption = document.querySelector('input[name="order-option"]:checked').value;

    // Validation
    const errors = validateForm(fullName, password, dob, email, phone);
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    // Check if user exists
    const userExists = orders.some(order => order.email === email || order.phone === phone);
    if (userExists) {
        alert("A user with this email or phone number already exists.");
        return;
    }

    // Add user
    const customer = new Customer(fullName, password, dob, gender, orderType, orderOption, imageUrl, phone, email);

    orders.push(customer);

    localStorage.setItem("orders", JSON.stringify(orders));

    Orders();

    alert("Order successfully added!");
    event.target.reset();
}

function clearOrders() {
    localStorage.removeItem("orders");
    orders = [];
    Orders();
}

document.addEventListener("DOMContentLoaded", () => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        Orders();
    }

    const form = document.getElementById("order-form");
    form.addEventListener("submit", handleFormSubmit);

    const clearButton = document.getElementById("clear-orders");
    clearButton.addEventListener("click", clearOrders);
});
