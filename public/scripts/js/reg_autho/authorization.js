async function Login(ev){
  ev.preventDefault();
  await fetch("/login", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/category";
    })
}

let form = document.querySelector("#form_avtorization");
form.addEventListener("submit", Login);