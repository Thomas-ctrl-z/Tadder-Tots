const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");

const cartSideBar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");

openCartBtn.addEventListener("click", () => {
    cartSideBar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
});

closeCartBtn.addEventListener("click", () => {
    cartSideBar.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
});