const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    fetch("http://localhost:3000/main.php", {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        });
});
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