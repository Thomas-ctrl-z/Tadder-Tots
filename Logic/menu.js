const confirmBtns = document.querySelectorAll(".confirm-btn");
const cartItems = document.querySelector(".cart-items");
const popupMsg = document.getElementById("popup-msg");


confirmBtns.forEach(btn => {
    btn.addEventListener('click', function(){
        const menuCard = btn.closest(".menu-card");

        const itemName = menuCard.querySelector("h3").textContent;

        const quantity = menuCard.querySelector(".quantity-input").value;

        if  (quantity <= 0){
            alert("Enter a valid quantity");
            return;
        }

        const cartItem = document.createElement("p");


        cartItem.textContent = `${itemName} x ${quantity}`;

        cartItems.appendChild(cartItem);
        quantity.value = "";
        showPopup();
    });
});



function showPopup() {
    popupMsg.classList.add("active");

    setTimeout(()=> {
        popupMsg.classList.remove("active");
    }, 2000);
}


