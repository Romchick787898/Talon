async function Login(ev){
  ev.preventDefault();
  await fetch("/login", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      if(result.message == "ADMIN"){
        document.location.href = "/groups";
      }else if(result.message == "USER"){
        document.location.href = "/user";
      }
    })
}

let form = document.querySelector("#form_avtorization");
form.addEventListener("submit", Login);