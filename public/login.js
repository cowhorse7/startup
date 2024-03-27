function routeToCreatePage() {
    window.location.href = "create.html";
}

function onCreateBtnClick() {
    // is there a localStorage username?
    routeToCreatePage();
}

function login() {
    const name = document.querySelector("#name").value;
    localStorage.setItem("username", name);
    routeToCreatePage();
}
