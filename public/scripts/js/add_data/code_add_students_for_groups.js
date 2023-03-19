async function Add_group(ev){
  ev.preventDefault();
  await fetch("/form_add_student_for_group", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_student_groups = document.querySelector("#form_add_students_in_groups");
form_student_groups.addEventListener("submit", Add_group);


