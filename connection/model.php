<?php
$Funcion = $_POST["Funcion"];
$Accion = $_POST["Accion"];
require "conn.php";

$process = new Process($conexion);
// echo $process->getEncKey('Isidora221518');
// $process->mail();
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
    case 'Formato_papel':
    case 'Formato_Papel':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, a.medida, b.nombre medicion", "comun", "formato_papel a", "", "JOIN comun.medicion b ON a.medicion = b.id", true);
        else if ($Accion == 'Create') echo $process->create("comun", "formato_papel", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "formato_papel", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "formato_papel", $_POST['Id']);
        break;
    case 'Textura':
        if ($Accion == 'Read') echo $process->read("*", "comun", "textura", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "textura", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "textura", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "textura", $_POST['Id']);
        break;
    case 'Papel':
        if ($Accion == 'Read') echo $process->read("*", "comun", "papel", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "papel", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "papel", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "papel", $_POST['Id']);
        break;
    case 'Papeleria':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, b.nombre marca, a.cantidad, c.nombre formato_papel, a.precio, d.nombre color, e.nombre textura", "materia", "papeleria a", "", "JOIN comun.marca b ON a.marca = b.id JOIN comun.formato_papel c ON a.formato_papel = c.id JOIN comun.color d ON a.color = d.id JOIN comun.textura e ON a.textura = e.id ", true);
        else if ($Accion == 'Create') echo $process->create("materia", "papeleria", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("materia", "papeleria", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("materia", "papeleria", $_POST['Id']);
        break;
    case 'Medicion':
        if ($Accion == 'Read') echo $process->read("*", "comun", "medicion", "", "", true);
        else if ($Accion == 'Create') echo $process->create("comun", "medicion", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "medicion", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "medicion", $_POST['Id']);
        break;
    case 'Tienda':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, a.direccion, b.nombre comuna, c.nombre region, a.telefono, a.correo", "comun", "tienda a", "", "JOIN comun.comuna b ON a.comuna = b.id JOIN comun.region c ON a.region = c.id", true);
        else if ($Accion == 'Create') echo $process->create("comun", "tienda", $_POST['Obj']);
        else if ($Accion == 'Update') echo $process->update("comun", "tienda", $_POST['Obj'], $_POST['Id']);
        else if ($Accion == 'Delete') echo $process->delete("comun", "tienda", $_POST['Id']);
        break;
    case 'Impresora':
        if ($Accion == 'Read') echo $process->read("a.id, a.nombre, a.kwh, b.nombre marca", "comun", "impresora a", "", "JOIN comun.marca b ON a.marca = b.id", true);
        break;
    case 'Categoria':
    case 'Parte':
        if ($Accion == 'Read') echo $process->read("*", "impresion3d", "parte", "", "", true);
        else if ($Accion == 'Create') echo $process->create("impresion3d", "parte", $_POST['Obj']);
        break;
    case 'Impresion':
        if ($Accion == 'Read') echo $process->read("*", "impresion3d", "impresion", "", "", true);
        else if ($Accion == 'Create') echo $process->create("impresion3d", "impresion", $_POST['Obj']);
        else if ($Accion == 'Listar-Partes') echo $process->read(
            "b.id, a.costo, a.subtotal, a.descuento, a.total, a.modelo, b.nombre parte, b.minutos, b.gramos, b.cantidad, c.nombre, c.apellido_paterno, c.apellido_materno, 
            c.fecha_nacimiento, g.nombre region, h.nombre comuna, c.codigo_postal, c.rut, c.correo, c.telefono, d.nombre estado, e.nombre impresora, e.kwh, e.marca, f.nombre color",
            "impresion3d",
            "impresion a",
            "",
            "JOIN impresion3d.parte b ON a.id = b.impresion
            JOIN cliente.cliente c ON a.cliente = c.id
            JOIN comun.estado d ON a.estado = d.id
            JOIN comun.impresora e ON b.impresora = e.id
            JOIN comun.color f ON b.color = f.id
            JOIN comun.region g ON c.region = g.id
            JOIN comun.comuna h ON c.comuna = h.id",
            true
        );
        else if ($Accion == 'Listar-Partes-Pendientes') echo $process->read(
            "b.id, a.costo, a.subtotal, a.descuento, a.total, a.modelo, b.nombre parte, b.minutos, b.gramos, b.cantidad, c.nombre, c.apellido_paterno, c.apellido_materno, 
            c.fecha_nacimiento, g.nombre region, h.nombre comuna, c.codigo_postal, c.rut, c.correo, c.telefono, d.nombre estado, e.nombre impresora, e.kwh, e.marca, f.nombre color",
            "impresion3d",
            "impresion a",
            "estado NOT IN (5,6)",
            "JOIN impresion3d.parte b ON a.id = b.impresion
            JOIN cliente.cliente c ON a.cliente = c.id
            JOIN comun.estado d ON a.estado = d.id
            JOIN comun.impresora e ON b.impresora = e.id
            JOIN comun.color f ON b.color = f.id
            JOIN comun.region g ON c.region = g.id
            JOIN comun.comuna h ON c.comuna = h.id",
            true
        );
        else if ($Accion == 'Listar-Impresiones') echo $process->read(
            "a.id impresion, a.costo, a.subtotal, a.descuento, a.total, CONCAT(c.nombre,' ',c.apellido_paterno,' ',c.apellido_materno) cliente, d.nombre estado, a.modelo, 
            b.nombre parte, e.nombre impresora, b.minutos, b.gramos, b.cantidad, f.nombre color, g.nombre region, h.nombre comuna, c.codigo_postal, c.correo, c.telefono",
            "impresion3D",
            "impresion a",
            "",
            "JOIN impresion3D.parte b ON a.id = b.impresion
            JOIN cliente.cliente c ON a.cliente = c.id
            JOIN comun.estado d ON a.estado = d.id
            JOIN comun.impresora e ON b.impresora = e.id
            JOIN comun.color f ON b.color = f.id
            JOIN comun.region g ON c.region = g.id
            JOIN comun.comuna h ON c.comuna = h.id",
            true
        );
        else if ($Accion == 'Listar-Impresiones-y-Partes') {
            $Datos = array();
            $Datos = $process->read(
                "a.id, a.modelo, CONCAT(b.nombre,' ',b.apellido_paterno,' ',b.apellido_materno) cliente, a.costo, a.subtotal, a.descuento, a.total, c.nombre estado",
                'impresion3D',
                'impresion a',
                '',
                'JOIN cliente.cliente b ON a.cliente = b.id
            JOIN comun.estado c ON a.estado = c.id',
                false
            );
            foreach ($Datos as $key => $value) {
                $Parte = new stdClass;
                $Parte = $process->read(
                    'a.id, a.impresion, a.nombre, a.cantidad, a.minutos, a.gramos, c.nombre color, b.nombre impresora',
                    'impresion3D',
                    'parte a',
                    "impresion = $value[id]",
                    'JOIN comun.impresora b ON a.impresora = b.id
                    JOIN comun.color c ON a.color = c.id',
                    false
                );
                // array_push($Datos->Impresiones[$key],$Parte);
                $Datos[$key]['partes'] = $Parte;
            }
            echo json_encode($Datos);
        }
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
        $query .= (strlen($join) > 0) ? " " . $join : "";
        $query .= (strlen($where) > 0) ? " WHERE " . $where : "";

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

    public function getEncKey($text)
    {
        return $this->encript($text);
    }

    public function getDecKey($text)
    {
        return $this->decript($text);
    }

    public function mail()
    {
        echo 'test';
    }

    private function toJson($data)
    {
        return json_encode($data);
    }

    private function encript($string)
    {

        // Store the cipher method
        $ciphering = "AES-128-CTR";

        // Use OpenSSl Encryption method
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;

        // Non-NULL Initialization Vector for encryption
        $encryption_iv = '1503897453602459';

        // Store the encryption key
        $encryption_key = "trfftrff282122";

        // Use openssl_encrypt() function to encrypt the data
        $encryption = openssl_encrypt(
            $string,
            $ciphering,
            $encryption_key,
            $options,
            $encryption_iv
        );

        // Display the encrypted string
        return $encryption;
    }

    private function decript($string)
    {
        // Store the cipher method
        $ciphering = "AES-128-CTR";

        // Use OpenSSl Encryption method
        $iv_length = openssl_cipher_iv_length($ciphering);
        $options = 0;

        // Non-NULL Initialization Vector for decryption
        $decryption_iv = '1503897453602459';

        // Store the decryption key
        $decryption_key = "trfftrff282122";

        // Use openssl_decrypt() function to decrypt the data
        $decryption = openssl_decrypt(
            $string,
            $ciphering,
            $decryption_key,
            $options,
            $decryption_iv
        );

        // Display the decrypted string
        return $decryption;
    }
}
