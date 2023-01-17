async function Edit_group(ev){
  ev.preventDefault();
  await fetch("/form_edit_group", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_group = document.querySelector("#form_edit_group");
form_group.addEventListener("submit", Edit_group);