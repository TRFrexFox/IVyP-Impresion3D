<?php
echo $_POST['rememberMe'];
require "conn.php";

$process = new Process($conexion);
$usuario = $process->read("*", "usuario", "usuario", "", "", true);

if ($process->getEncKey($_POST['password']) == $usuario['contraseña']) {
    $info = new stdClass;
    $info->Nombre = $usuario['nombre'];
    setcookie('user', json_encode($info), 0, '/');
    header('Location: ../Home.php');
}else{
    header('Location: ../index.php?messaje=error');
}

class Process
{
    public $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function read($columns, $schema, $table, $where, $join)
    {
        $query = "SELECT $columns FROM $schema.$table";
        $query .= (strlen($where) > 0) ? " WHERE " . $where : "";
        $query .= (strlen($join) > 0) ? " " . $join : "";

        $QRes = pg_query($this->conexion, $query);
        $Values = pg_fetch_array($QRes);
        return $Values;
    }

    public function getEncKey($text)
    {
        return $this->encript($text);
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
}
