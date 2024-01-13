const signInButton = document.querySelector("#sign-in-button");

signInButton.addEventListener("click", (e) => {
    const login = document.querySelector("#login");
    login.show();
})
const registrationButton = document.querySelector("#registration-button");
registrationButton.addEventListener("click", (e) => {
    const login = document.querySelector("#login");
    login.close();
    const signup = document.querySelector("#signup");
    signup.show();
})
const loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", (e) => {
    const signup = document.querySelector("#signup");
    signup.close();
    const login = document.querySelector("#login");
    login.show();
})
const login_form = document.querySelector("#login-form");

login_form.addEventListener("submit", (e) => {
    e.preventDefault()
    const form_data = new FormData()
    const login = document.querySelector("input[name=login]").value
    const password = document.querySelector("input[name=password]").value
    form_data.append("login", login)
    form_data.append("password", password)
    fetch("http://localhost:3000/vendor/login.php", {
        method: "Post",
        body: form_data
    })
        .then((res ) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
        })
})

const signup_form = document.querySelector("#signup-form");

const signupButton = signup_form.querySelector("button[type=submit]")
signup_form.addEventListener("submit", (e) => {
    e.preventDefault()
    const form_data = new FormData(signup_form, signupButton)
console.log(form_data.entries());
    fetch("http://localhost:3000/vendor/sign_up.php", {
        method: "Post",
        body: form_data
    })
        .then((res ) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
        })
})


const dialogSignInButton = document.querySelector("#dialog-sign-in-button");
try {
    dialogSignInButton.addEventListener("click", (e) => {
        const login = document.querySelector("#login");
        login.show();
    })
}
catch (e) {
    console.log(e);
}
const buyTourButton = document.querySelector("#buy-tour-button");
try {
    buyTourButton.addEventListener("click", (e) => {
        const buyDialog = document.querySelector("#buy-dialog");
        buyDialog.show();
    })
}
catch (e) {
    console.log(e);
}

const buy_form = document.querySelector("#buy-selected-tour");

const buyButton = buy_form.querySelector("button[type=submit]")
buy_form.addEventListener("submit", (e) => {
    e.preventDefault()
    const form_data = new FormData(buy_form, buyButton)
    const select =document.querySelector("#tour_id").value;
    form_data.append("tour_id", select)
    console.log(form_data.entries());
    fetch("http://localhost:3000/vendor/buy.php", {
        method: "Post",
        body: form_data
    })
        .then((res ) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
        })
})