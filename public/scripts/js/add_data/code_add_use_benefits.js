async function Add_use_benefits(ev){
  ev.preventDefault();
  await fetch("/use_benefits", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/user";
    })
}

let form_use_benefits = document.querySelector("#form_add_use_benefits");
form_use_benefits.addEventListener("submit", Add_use_benefits);


