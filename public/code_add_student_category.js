async function Add_group(ev){
  ev.preventDefault();
  await fetch("/form_add_student_category", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_student_category = document.querySelector("#form_add_student_category");
form_student_category.addEventListener("submit", Add_group);


