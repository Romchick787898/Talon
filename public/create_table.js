let arr_tr = document.querySelectorAll("tr");

arr_tr.forEach(item =>{
  item.addEventListener("click", (ev)=>{ Active_disactive_tr(ev, item); });
});

function Active_disactive_tr(ev, item){
  let id_tr = item.id;
  document.querySelectorAll(".active_tr").forEach(elem =>{
    if(elem !== item){
      elem.classList.remove("active_tr");
    }
  });
  item.classList.toggle("active_tr");

  document.querySelector("#edit_btn").setAttribute("data-id_tr", id_tr);
  document.querySelector("#delete_btn").setAttribute("data-id_tr", id_tr);
  document.querySelector("#view_btn").setAttribute("data-id_tr", id_tr);
}

function Delete_student(event){
  let id_student = event.target.getAttribute("data-id_tr");
  document.location.href = "/delete_student/" + id_student;
}

function Edit_student(event){  
  let id_student = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_student/" + id_student;
}

function Delete_group(event){
  let id_group = event.target.getAttribute("data-id_tr");
  document.location.href = "/delete_group/" + id_group;
}

function Edit_group(event){  
  let id_group = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_group/" + id_group;
}

function View_group(event){  
  let id_group = event.target.getAttribute("data-id_tr");
  document.location.href = "/students/" + id_group;
}