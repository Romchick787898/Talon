<?php
     $server = pg_connect("host=127.0.0.1 port=5432 dbname=max user=postgres password=qwerty");
     $num_ticket = $_GET['num_ticket'];

     if (!$server){
        http_response_code(500);
        exit;
    } 

    $query = pg_query($server, "SELECT * FROM talon WHERE num_ticket=$num_ticket;");
    if (!$query){
        http_response_code(400);
        exit;
    }

    
    if (pg_num_rows($query) !== 0){
        $result = pg_fetch_assoc($query);
        if ($result['succefull_breakfast'] == 'yes'){
            echo json_encode($result);
            pg_query($server, "UPDATE talon SET succefull_breakfast='no' WHERE num_ticket=$num_ticket;");
            pg_close($server);
        } elseif ($result['succefull_lunch'] == 'yes'){
            echo json_encode($result);
            pg_query($server, "UPDATE talon SET succefull_lunch='no' WHERE num_ticket=$num_ticket;");
            pg_close($server);
        }else{
            echo json_encode($result);
            pg_close($server);
        }
    } else {
        http_response_code(204);
        pg_close($server);
    }
?>