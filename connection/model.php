<?php
$Funcion = $_POST["Funcion"];
$Accion = $_POST["Accion"];
require "conn.php";

$process = new Process($conexion);
switch (ucwords($Funcion)) {
    case 'Dashboard':
        if ($Accion == 'Card-Data') echo $process->read("*", "comun", "marca", "", "", true);
        break;
    case 'Cliente':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, a.apellido_paterno, a.apellido_materno, b.nombre region, c.nombre comuna, a.codigo_postal, a.rut, a.correo, a.telefono, a.fecha_nacimiento", "cliente", "cliente a", "", "LEFT JOIN comun.region b ON a.region = b.id LEFT JOIN comun.comuna c ON a.comuna = c.id", true);
        else if ($Accion == 'Create') echo $process->create("cliente", "cliente", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("cliente", "cliente", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("cliente", "cliente", $_POST['Id']);
        break;
    case 'Marca':
        if ($Accion == 'Read') echo $process->read("*", "comun", "marca", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "marca", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "marca", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "marca", $_POST['Id']);
        break;
    case 'Estado':
        if ($Accion == 'Read') echo $process->read("*", "comun", "estado", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "estado", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "estado", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "estado", $_POST['Id']);
        break;
    case 'Color':
        if ($Accion == 'Read') echo $process->read("*", "comun", "color", "", "", true);
        else if ($Accion == 'Delete') echo $process->delete("comun", "color", $_POST['Id']);
        else if ($Accion == 'Create') echo $process->create("comun", "color", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "color", $_POST['Obj'], $_POST['Id']);
        break;
    case 'Comuna':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, b.nombre region, a.cut", "comun", "comuna a", "", "LEFT JOIN comun.region b ON a.region = b.id", true);
        else if ($Accion == 'Delete') echo $process->delete("comun", "comuna", $_POST['Id']);
        else if ($Accion == 'Create') echo $process->create("comun", "comuna", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "comuna", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Filter-Region') echo $process->read("a.id, a.nombre, b.nombre region, a.cut", "comun", "comuna a", "", "LEFT JOIN comun.region b ON a.region = b.id", true);
        break;
    case 'Region':
        if ($Accion == 'Read') echo $process->read("*", "comun", "region", "", "", true);
        else if ($Accion == 'Delete') echo $process->delete("comun", "region", $_POST['Id']);
        else if ($Accion == 'Create') echo $process->create("comun", "region", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "region", $_POST['Obj'], $_POST['Id']);
        break;
    case 'Pla':
        if ($Accion == 'Read') echo $process->read("a.id, b.nombre color, c.nombre marca, a.diametro, a.temperatura, a.gramos, d.nombre categoria, a.valor", "materia", "pla a", "", "LEFT JOIN comun.color b ON a.color = b.id LEFT JOIN comun.marca c ON a.marca = c.id LEFT JOIN materia.categoria d ON a.categoria = d.id", true);
        else if ($Accion == 'Create') echo $process->create("materia", "pla", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("materia", "pla", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("materia", "pla", $_POST['Id']);
        break;
    case 'Categoria':
        if ($Accion == 'Read') echo $process->read("*", "materia", "categoria", "", "", true);
        else if ($Accion == 'Create') echo $process->create("materia", "categoria", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("materia", "categoria", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("materia", "categoria", $_POST['Id']);
        break;
    case 'Valorizacion':
        if ($Accion == 'Read') echo $process->read("*", "comun", "valorizacion", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "valorizacion", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "valorizacion", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "valorizacion", $_POST['Id']);
        break;
    case 'Impresora':
        if ($Accion == 'Read') echo $process->read("*", "comun", "impresora", "", "", true);
        break;
    case 'Categoria':
        if ($Accion == 'Read') echo $process->read("*", "materia", "categoria", "", "", true);
        break;
    case 'Modelo':
        if ($Accion == 'Read') echo $process->read("*", "impresion", "modelo", "", "", true);
        else if ($Accion == 'Create') echo $process->create("impresion", "modelo", $_POST['Obj']);
        break;
    case 'Parte':
        if ($Accion == 'Read') echo $process->read("*", "impresion", "parte", "", "", true);
        else if ($Accion == 'Create') echo $process->create("impresion", "parte", $_POST['Obj']);
        break;
    case 'Impresion':
        if ($Accion == 'Read') echo $process->read("*", "impresion", "impresion", "", "", true);
        else if ($Accion == 'Create') echo $process->create("impresion", "impresion", $_POST['Obj']);
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

        $Query = "INSERT INTO $Schema.$Table $Columns VALUES $Values RETURNING id";
        $result = pg_query($this->conexion, $Query);
        $row = pg_fetch_row($result);
        return (is_numeric($row[0])) ? json_encode(array('status' => 'Registro Exitoso', 'returning' => $row[0])) : 'Ocurrio un error';
    }

    public function update($Schema, $Table, $Obj, $Id)
    {
        $Query = "";
        $Set = "";

        // foreach ($Obj as $key => $value) {
        //     $Set .= "$key=$value,";
        // }
        foreach ($Obj as $key => $value) {
            $Set .= $value['name'] . "='" . $value['value'] . "',";
        }
        $Set = substr_replace($Set, "", -1);

        $Query = "UPDATE $Schema.$Table SET $Set WHERE id = $Id;";

        return (pg_query($this->conexion, $Query)) ? json_encode(array('status' => 'Registro Exitoso')) : 'Ocurrio un error';
    }

    public function delete($Schema, $Table, $Id)
    {
        $Query = "DELETE FROM $Schema.$Table WHERE id = $Id";
        return (pg_query($this->conexion, $Query)) ? json_encode(array('status' => 'Registro Exitoso')) : 'Ocurrio un error';
    }

    private function toJson($data)
    {
        return json_encode($data);
    }
}
