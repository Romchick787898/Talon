async function Add_category(ev){
  ev.preventDefault();
  await fetch("/form_add_category", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/category";
    })
}

let form_category = document.querySelector("#form_add_category");
form_category.addEventListener("submit", Add_category);


