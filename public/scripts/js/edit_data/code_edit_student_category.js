async function Edit_student_category(ev){
  ev.preventDefault();
  await fetch("/form_edit_student_category", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_student_category = document.querySelector("#form_edit_student_category");
form_student_category.addEventListener("submit", Edit_student_category);