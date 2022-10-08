let adress = 'server/get_student.php';

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
