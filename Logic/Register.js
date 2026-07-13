const signupForm = document.getElementById("Signup-form");
const loginForm = document.getElementById("Login-form");

const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");


//Toggle Password Visibility
const signup_password = document.getElementById("signup-password");
const toggle_signup = document.getElementById("toggle-signup-password");
const signup_confirm = document.getElementById("signup-confirm-pswd");
const toggle_confirm = document.getElementById("toggle-signup-confirm-pswd");

toggle_confirm.addEventListener("click", () => {
    if (signup_confirm.type === "password") {
        signup_confirm.type = "text";
        toggle_confirm.textContent = "Hide";
    } else {
        signup_confirm.type = "password";
        toggle_confirm.textContent = "Show";
    }
});


toggle_signup.addEventListener("click", () => {
    if (signup_password.type === "password") {
        signup_password.type = "text";
        toggle_signup.textContent = "Hide";
    } else {
        signup_password.type = "password";
        toggle_signup.textContent = "Show";
    }
});

//-----END-----------

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



const form = document.querySelector("#Signup-form form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://127.0.0.1:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    console.log(await response.text());
});



// //--------------Prevent Page Reload--------------
// const signupFormElement = document.querySelector("#Signup-form form");

// signupFormElement.addEventListener("submit", (event) => {
//     event.preventDefault();

//     console.log("Signup Submitted");
// });

// const loginFormElement = document.querySelector("#Login-form form");

// loginFormElement.addEventListener("submit", (event) => {
//     event.preventDefault();

//     console.log("Login Submitted");
// });

//-----------END--------------------------------------