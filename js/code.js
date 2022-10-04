function get_request(){
  let btn_ot = document.querySelector("#add");
  btn_ot.style.pointerEvents = "none";
  btn_ot.style.background = "#a3a3a3";
  let number_card = document.querySelector('#z').value;

  let xhr = new XMLHttpRequest();

  xhr.open('GET', "server/find_student.php?num_ticket="+number_card, true);

  xhr.responseType = 'json';

  xhr.send(null);

  xhr.onload = function(){
    if (xhr.status != 200){
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      setTimeout(Color, 1500);
    }else{
      let response_obj = xhr.response;
      let surname = response_obj.surname;
      let name =  response_obj.name;
      let patronymic = response_obj.patronymic;
      let img_src = response_obj.img_src;
      let succefull_breakfast = response_obj.succefull_breakfast;
      let succefull_lunch = response_obj.succefull_lunch;

      if(succefull_breakfast == 'yes'){
        alert('Позавтракай');
        document.querySelector('#img').src = img_src;
        document.querySelector('#family').textContent = surname;
        document.querySelector('#otchestvo').textContent = patronymic;
        document.querySelector('#name').textContent = name;
        document.querySelector("#add").style.pointerEvents = "auto";
        rgb(163, 163, 163)
      }else if(succefull_lunch == 'yes'){
        alert('Пообедай');
        document.querySelector('#img').src = img_src;
        document.querySelector('#family').textContent = surname;
        document.querySelector('#otchestvo').textContent = patronymic;
        document.querySelector('#name').textContent = name;
        document.querySelector("#add").style.pointerEvents = "auto";
        rgb(163, 163, 163)
      } else {
        alert('Не хавай');
        document.querySelector('#img').src = img_src;
        document.querySelector('#family').textContent = surname;
        document.querySelector('#otchestvo').textContent = patronymic;
        document.querySelector('#name').textContent = name;
        document.querySelector("#add").style.pointerEvents = "auto";
        rgb(163, 163, 163)
        setTimeout(Color, 1500);
      };
    };
  };

  xhr.onerror = function(){
    alert(`Запрос не удался`);
    setTimeout(Color, 1500);
  };

};

function Color(){
  document.querySelector("#add").style.pointerEvents = "auto";
  document.querySelector("#add").style.background = "#3c8bff";
}