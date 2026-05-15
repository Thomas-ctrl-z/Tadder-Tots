const openCartBtn = document.getElementById('open-cart-button');
const closeCartBtn = dpcument.getElementById('close-cart-button');

const cartSideBar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

openCartBtn.addEventListener("click", () => {
    cartSideBar.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
    cartSideBar.classList.remove("active");
    cartOverlay.classList.remove("active");
});