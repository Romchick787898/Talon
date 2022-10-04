<?php 
    $id = $_POST["id"];
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

    pg_query($server, "UPDATE talon SET num_ticket=$num_ticket, surname='$surname', name='$name', patronymic='$patronymic', img_src='$img_src', succefull_breakfast='$succefull_breakfast', succefull_lunch='$succefull_lunch' WHERE id=$id;");
    $query = pg_query($server, "SELECT * FROM talon WHERE id=$id LIMIT 1;");
    if (!$query){
        http_response_code(400);
        exit;
    }

    if (pg_num_rows($query) !== 0){
        $result = pg_fetch_assoc($query);
        echo json_encode($result);
        pg_close($server);
    } else {
        http_response_code(204);
        pg_close($server);
    }
?>