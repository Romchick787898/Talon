async function Edit_category(ev){
  ev.preventDefault();
  await fetch("/form_edit_category", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/category";
    })
}

let form_category = document.querySelector("#form_edit_category");
form_category.addEventListener("submit", Edit_category);