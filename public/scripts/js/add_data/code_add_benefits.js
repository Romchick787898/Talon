async function Add_benefits(ev){
  ev.preventDefault();
  await fetch("/form_add_benefits/", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/benefits";
    })
}

let form_benefits = document.querySelector("#form_add_benefits");
form_benefits.addEventListener("submit", Add_benefits);


