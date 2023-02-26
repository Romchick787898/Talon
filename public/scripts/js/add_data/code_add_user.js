async function Add_student(ev){
  ev.preventDefault();
  await fetch("/registration", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/users";
    })
}

let form_user = document.querySelector("#form_add_user");
form_user.addEventListener("submit", Add_student);