async function Edit_students(ev){
  ev.preventDefault();
  await fetch("/form_edit_student", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_student = document.querySelector("#form_edit_students");
form_student.addEventListener("submit", Edit_students);