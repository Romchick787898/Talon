<?php 
    $server = pg_connect("host=127.0.0.1 port=5432 dbname=max user=postgres password=qwerty");

    if (!$server){
        http_response_code(500);
        exit;
    }

    $query = pg_query($server, "SELECT * FROM talon;");
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