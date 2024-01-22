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

$tipo_sala = $_POST['sala'];

$sql = 'SELECT DISTINCT nombre_sala FROM salas WHERE tipo_sala = :sala;';
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":sala", $tipo_sala, PDO::PARAM_STR);
$stmt->execute();
$salas = $stmt->fetchAll(PDO::FETCH_ASSOC);
$mesa = "<option value='todos'>Todos</option>";

foreach ($salas as $fila) {
    $tipo_sala = $fila['nombre_sala'];
    $mesa .= "<option value='$tipo_sala'>$tipo_sala</option>";
}
echo json_encode($mesa);