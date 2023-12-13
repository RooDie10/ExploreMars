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