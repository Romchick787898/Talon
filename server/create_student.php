<?php 
    $num_ticket = $_POST["num_ticket"];
    $surname = $_POST["surname"];
    $name = $_POST["name"];
    $patronymic = $_POST["patronymic"];
    $img_src = $_POST["img_src"];
    $succefull_breakfast = $_POST["succefull_breakfast"];
    $succefull_lunch = $_POST["succefull_lunch"];

    $server = pg_connect("host=127.0.0.1 port=5432 dbname=max user=postgres password=qwerty");

    if (!$server){
        http_response_code(500);
        exit;
    }

    pg_query($server, "INSERT INTO talon(num_ticket, surname, name, patronymic, img_src, succefull_breakfast, succefull_lunch) VALUES ('$num_ticket', '$surname', '$name', '$patronymic', '$img_src', '$succefull_breakfast', '$succefull_lunch');");
    $query = pg_query($server, "SELECT * FROM talon ORDER BY id DESC LIMIT 1;");
    if (!$query){
        http_response_code(400);
        exit;
    }

    if (pg_num_rows($query) !== 0){
        $result = pg_fetch_assoc($query);
        echo json_encode($result);
        pg_close($server);
        exit;
    } else {
        http_response_code(204);
        pg_close($server);
        exit;
    }
?>