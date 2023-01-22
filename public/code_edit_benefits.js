async function Edit_benefits(ev){
  ev.preventDefault();
  await fetch("/form_edit_benefits", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/category";
    })
}

let form_benefits = document.querySelector("#form_edit_benefits");
form_benefits.addEventListener("submit", Edit_benefits);