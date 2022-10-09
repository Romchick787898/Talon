function Yes_no (event, id){
  let element = event.target;
  element.classList.add('active');
  let id_meal = element.closest('.yes_no');
  if(id == "yes"){
    let li_no =  id_meal.querySelector('#no');
    li_no.style.display = 'none';
  }else{
    let li_no = id_meal.querySelector('#yes');
    li_no.style.display = 'none';
  }
}

function Yes_and_no(id){
  let ul = document.querySelector('.yes_no#' + id);
  let li = ul.querySelectorAll('li');
  li.forEach(item =>{
    item.style.display = "block";
    item.classList.remove('active');
  });
}

