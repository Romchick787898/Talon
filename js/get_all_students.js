/* let adress = 'server/get_student.php';

fetch(adress)
  .then(
    response => {
      if (response.status != 200){
        alert(`Ошибка ${response.status}: ${response.statusText}`);
        let error = new Error(response.statusText);
        error.response = response;
        alert(error);
        throw error
      } else {
        let result = response.json();
        return result;
      }
    }
  )
  .then(
    result => console.log(result)
  );
 */

let a = null;

function Check(event){
  let arr_check = document.querySelectorAll('.checkbox');
  arr_check.forEach(item =>{
    if(item == event.target){
      item.classList.toggle('active');
      console.log(a);
      if(event.target == a){
        document.querySelector('.menu').classList.remove('active');
        a = null;
        document.querySelector('.menu').querySelector('.btn_change').id = "";
        document.querySelector('.menu').querySelector('.btn_delete').id = "";
      }else{
        document.querySelector('.menu').classList.add('active');
        document.querySelector('.menu').querySelector('.btn_change').id = "id-checkbox";
        document.querySelector('.menu').querySelector('.btn_delete').id = "id-checkbox";
        a = event.target;
      }
    }else{
      item.classList.remove('active');
    }
  });
}  