async function Registration(ev){
  ev.preventDefault();
  await fetch("/registration", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => alert(result.message))
}

let form = document.querySelector("#form_registration");
form.addEventListener("submit", Registration);