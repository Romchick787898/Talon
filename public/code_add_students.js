async function Add_student(ev){
  ev.preventDefault();
  await fetch("/form_add_student", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_student = document.querySelector("#form_add_student");
form_student.addEventListener("submit", Add_student);

const url = new URL(window.location.href);
const id_group = url.searchParams.get("id_group");
document.querySelector("#id_group").value = id_group;
