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

$idUsuario = $_POST['id_user'];

try {
    $pdo->beginTransaction();

    $sqlEliminarOcupaciones = 'DELETE FROM ocupaciones WHERE id_usuario = :id_usuario';
    $stmtEliminarOcupaciones = $pdo->prepare($sqlEliminarOcupaciones);
    $stmtEliminarOcupaciones->bindParam(':id_usuario', $idUsuario, PDO::PARAM_INT);
    $stmtEliminarOcupaciones->execute();

    $sqlEliminarUsuario = 'DELETE FROM usuarios WHERE id_usuario = :id_usuario';
    $stmtEliminarUsuario = $pdo->prepare($sqlEliminarUsuario);
    $stmtEliminarUsuario->bindParam(':id_usuario', $idUsuario, PDO::PARAM_INT);
    $stmtEliminarUsuario->execute();

    $pdo->commit();

    echo "ok";
} catch (PDOException $e) {
    $pdo->rollBack();

    echo "Error al eliminar el usuario: " . $e->getMessage();
}