<?php
session_start();
if (!isset($_SESSION['id'])) {
    header("Location: ./index.php");
    exit;
} else if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: ./index.php");
    exit;
}
?>
<?php

include_once('../inc/conexion.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $idUsuario = $_POST['id'];
    $nuevoNombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $nuevoApellido1 = isset($_POST['apellido1']) ? $_POST['apellido1'] : null;
    $nuevoApellido2 = isset($_POST['apellido2']) ? $_POST['apellido2'] : null;
    $nuevoEmail = isset($_POST['email']) ? $_POST['email'] : null;
    $nuevoTelefono = isset($_POST['telefono']) ? $_POST['telefono'] : null;
    $nuevoTrabajo = isset($_POST['trabajo']) ? $_POST['trabajo'] : null;

    var_dump($_POST);
var_dump($nuevoNombre, $nuevoApellido1, $nuevoApellido2, $nuevoEmail, $nuevoTelefono, $nuevoTrabajo);

    $stmt = $pdo->prepare("SELECT nombre_user, apellido1, apellido2, email, telefono, trabajo FROM usuarios WHERE id_usuario = :id");
    $stmt->bindParam(":id", $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    $datosActuales = $stmt->fetch(PDO::FETCH_ASSOC);

    var_dump($datosActuales);
    $camposActualizados = [];

    if ($datosActuales['nombre_user'] !== $nuevoNombre) {
        $camposActualizados['nombre_user'] = $nuevoNombre;
    }

    if ($datosActuales['apellido1'] !== $nuevoApellido1) {
        $camposActualizados['apellido1'] = $nuevoApellido1;
    }

    if ($datosActuales['apellido2'] !== $nuevoApellido2) {
        $camposActualizados['apellido2'] = $nuevoApellido2;
    }

    if ($datosActuales['email'] !== $nuevoEmail) {
        $camposActualizados['email'] = $nuevoEmail;
    }

    if ($datosActuales['telefono'] !== $nuevoTelefono) {
        $camposActualizados['telefono'] = $nuevoTelefono;
    }

    if ($datosActuales['trabajo'] !== $nuevoTrabajo) {
        $camposActualizados['trabajo'] = $nuevoTrabajo;
    }

    if (!empty($camposActualizados)) {
        $sqlUpdate = "UPDATE usuarios SET ";

        foreach ($camposActualizados as $campo => $valor) {
            $sqlUpdate .= "$campo = :$campo, ";
        }
        // Elimina la coma adicional al final del SQL
        $sqlUpdate = rtrim($sqlUpdate, ', ');

        $sqlUpdate .= " WHERE id_usuario = :id";

        $stmtUpdate = $pdo->prepare($sqlUpdate);

        foreach ($camposActualizados as $campo => $valor) {
            $stmtUpdate->bindValue(":$campo", $valor, PDO::PARAM_STR);
        }

        $stmtUpdate->bindParam(":id", $idUsuario, PDO::PARAM_INT);

        $stmtUpdate->execute();
    }

    
}
