<?php
$Funcion = $_POST["Funcion"];
$Accion = $_POST["Accion"];
require "conn.php";

$process = new Process($conexion);
switch (ucwords($Funcion)) {
    case 'Color':
        if ($Accion == 'Read') echo $process->read("*", "comun", "color", "", "", true);
        else if ($Accion == 'Delete') echo $process->delete("comun", "color", $_POST['Id']);
        else if ($Accion == 'Create') echo $process->create("comun", "color", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "color", $_POST['Obj'], $_POST['Id']);
        break;
    case 'Region':
        if ($Accion == 'Read') echo $process->read("*", "comun", "region", "", "", true);
        break;
    case 'Comuna':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, b.nombre region, a.cut", "comun", "comuna a", "", "LEFT JOIN comun.region b ON a.region = b.id", true);
        if ($Accion == 'Filter-Region') echo $process->read("a.id, a.nombre, b.nombre region, a.cut", "comun", "comuna a", "", "LEFT JOIN comun.region b ON a.region = b.id", true);
        break;
    case 'Marca':
        if ($Accion == 'Read') echo $process->read("*", "comun", "marca", "", "", true);
        break;
    case 'Cliente':
        if ($Accion == 'Read') echo $process->read("a.id, CONCAT(a.nombre,' ', a.apellido_paterno,' ', a.apellido_materno) nombre, b.nombre region, c.nombre comuna, a.codigo_postal, a.rut, a.correo, a.telefono", "cliente", "cliente a", "", "LEFT JOIN comun.region b ON a.region = b.id LEFT JOIN comun.comuna c ON a.comuna = c.id", true);      
        else if ($Accion == 'Create') echo $process->create("cliente", "cliente", $_POST['Obj']);
        break;
}


class Process
{
    public $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function read($columns, $schema, $table, $where, $join, $json)
    {
        $query = "SELECT $columns FROM $schema.$table";
        $query .= (strlen($where) > 0) ? " WHERE " . $where : "";
        $query .= (strlen($join) > 0) ? " " . $join : "";

        $QRes = pg_query($this->conexion, $query);
        $Values = pg_fetch_all($QRes);
        return ($json) ? $this->toJson($Values) : $Values;
    }

    public function create($Schema, $Table, $Obj)
    {
        $Query = "";
        $Columns = "(";
        $Values = "(";

        // foreach ($Obj as $key => $value) {
        //     $Columns .= $key . ",";
        //     $Values .= "'" . $value . "',";
        // }

        foreach ($Obj as $key => $value) {
            $Columns .= $value['name'] . ",";
            $Values .= "'" . $value['value'] . "',";
        }
        $Columns = substr_replace($Columns, ")", -1);
        $Values = substr_replace($Values, ")", -1);

        $Query = "INSERT INTO $Schema.$Table $Columns VALUES $Values";

        return (pg_query($this->conexion, $Query)) ? 'Registro Exitoso' : 'Ocurrio un error';
    }

    public function update($Schema, $Table, $Obj, $Id)
    {
        $Query = "";
        $Set = "";

        foreach ($Obj as $key => $value) {
            $Set .= "$key=$value,";
        }
        $Set = substr_replace($Set, "", -1);

        $Query = "UPDATE $Schema.$Table SET $Set WHERE id = $Id;";

        return (pg_query($this->conexion, $Query)) ? 'Registro Exitoso' : 'Ocurrio un error';
    }

    public function delete($Schema, $Table, $Id)
    {
        $Query = "DELETE FROM $Schema.$Table WHERE id = $Id";
        return (pg_query($this->conexion, $Query)) ? 'Eliminacion Exitoso' : 'Ocurrio un error';
    }

    private function toJson($data)
    {
        return json_encode($data);
    }
}
