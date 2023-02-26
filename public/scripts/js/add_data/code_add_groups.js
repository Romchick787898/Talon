async function Add_group(ev){
  ev.preventDefault();
  await fetch("/form_add_group", {
    method: "POST",
    body: new FormData(ev.target),
  })
    .then(response => response.json())
    .then(result => {
      alert(result.message);
      document.location.href = "/groups";
    })
}

let form_group = document.querySelector("#form_add_group");
form_group.addEventListener("submit", Add_group);


