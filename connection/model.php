<?php
    $Funcion = $_POST["Funcion"];

    switch ($Funcion) {
        case 'Color':
            require "conn.php";
            $QRes = pg_query($conexion, "select * from comun.color");
            $Values = pg_fetch_all($result);
            echo json_encode($Values);
            break;
        
        default:
            # code...
            break;
    }
