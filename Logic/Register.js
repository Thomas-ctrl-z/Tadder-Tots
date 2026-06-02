const signupForm = document.getElementById("Signup-form");
const loginForm = document.getElementById("Login-form");

const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");

showLoginBtn.addEventListener("click", ()=> {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");

    console.log("clicked 1");

});

showSignupBtn.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");

    console.log("clicked 2");

});





//--------------Prevent Page Reload--------------
const signupFormElement = document.querySelector("#Signup-form form");

signupFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Signup Submitted");
});

const loginFormElement = document.querySelector("#Login-form form");

loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Login Submitted");
});

//-----------END--------------------------------------