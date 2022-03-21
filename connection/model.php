<?php
$Funcion = $_POST["Funcion"];

switch ($Funcion) {
    case 'Color':
        require "conn.php";
        $QRes = pg_query($conexion, "select * from comun.color");
        $Values = pg_fetch_all($QRes);
        echo json_encode($Values);
        break;
    case 'Region':
        require "conn.php";
        $QRes = pg_query($conexion, "select * from comun.region");
        $Values = pg_fetch_all($QRes);
        echo json_encode($Values);
        break;
}
