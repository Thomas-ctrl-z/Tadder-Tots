const signupForm = document.getElementById("Signup-form");
const loginForm = document.getElementById("Login-form");

const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");

showLoginBtn.addEventListener("click", ()=> {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";

});

showSignupBtn.addEventListener("click", () => {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";

});