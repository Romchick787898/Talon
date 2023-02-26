async function Edit_students(ev){
  ev.preventDefault();
  await fetch("/form_edit_user", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/users";
    })
}

let form_user = document.querySelector("#form_edit_user");
form_user.addEventListener("submit", Edit_students);