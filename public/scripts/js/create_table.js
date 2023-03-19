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

function Delete_student_groups(event){
  let id_student = event.target.getAttribute("data-id_tr");
  document.location.href = "/delete_students_group/" + id_student;
}

function Edit_student(event){  
  let id_student = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_student/" + id_student;
}

function View_student(event){  
  let id_student = event.target.getAttribute("data-id_tr");
  document.location.href = "/student_category/" + id_student;
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

function Delete_category(event){
  let id_category = event.target.getAttribute("data-id_tr");
  document.location.href = "/delete_category/" + id_category;
}

function Edit_category(event){  
  let id_category = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_category/" + id_category;
}

function View_category(event){  
  let id_category = event.target.getAttribute("data-id_tr");
  document.location.href = "/benefits/" + id_category;
}

function Delete_benefits(event){
  let id_benefits = event.target.getAttribute("data-id_tr");
  let id_category = event.target.getAttribute("data-id_category");
  document.location.href = "/delete_benefits/" + id_benefits;
}

function Delete_benefits_for_category(event){
  let id_benefits = event.target.getAttribute("data-id_tr");
  let id_category = event.target.getAttribute("data-id_category");
  document.location.href = "/delete_benefits_for_category/" + id_benefits + "?id_category=" + id_category;
}

function Edit_benefits(event){  
  let id_benefits = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_benefits/" + id_benefits;
}

function Delete_student_category(event){
  let id_category = event.target.getAttribute("data-id_tr");
  let id_student = event.target.getAttribute("data-id_student");
  document.location.href = "/delete_student_category/" + id_category + "?id_student=" + id_student;
}

function Edit_student_category(event){
  let id_category = event.target.getAttribute("data-id_tr");
  let id_student = event.target.getAttribute("data-id_student");
  document.location.href = "/form_edit_student_category/" + id_category + "?id_student=" + id_student;
}

function Delete_user(event){
  let id_user = event.target.getAttribute("data-id_tr");
  document.location.href = "/delete_user/" + id_user;
}

function Edit_user(event){  
  let id_user = event.target.getAttribute("data-id_tr");
  document.location.href = "/form_edit_user/" + id_user;
}

function Get_available_benefits(event){
  event.preventDefault();
  const id_student = document.querySelector("#id_student").value;
  document.location.href = "/available_benefits/" + id_student;
}