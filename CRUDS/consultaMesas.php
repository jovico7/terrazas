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
$sql = 'SELECT DISTINCT tipo_sala FROM salas;';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$sala = $stmt->fetchAll(PDO::FETCH_ASSOC);
$mesa = "<option value='todos'>Todos</option>";

foreach ($sala as $fila) {
    $salat = $fila['tipo_sala'];
    $mesa .= "<option value='$salat'>$salat</option>";
}
echo json_encode($mesa);