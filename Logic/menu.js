const confirmBtns = document.querySelectorAll(".confirm-btn");
const cancelBtns = document.querySelectorAll(".cancel-btn");
const cartItems =document.querySelector(".cart-items");

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
    });
});









cancelBtns.forEach(btn => {
    btn.addEventListener("click", function(){
        console.log("Clicked");
    });
});