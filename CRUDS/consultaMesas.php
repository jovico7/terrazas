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

$numero_sala = $_POST['numero_sala'];

$sql = 'SELECT DISTINCT m.numero_mesa FROM mesas m INNER JOIN salas s ON m.id_sala = s.id_sala WHERE s.nombre_sala = :numero_sala;';
$stmt = $pdo->prepare($sql);
$stmt->bindParam(":numero_sala", $numero_sala, PDO::PARAM_STR);
$stmt->execute();
$salas = $stmt->fetchAll(PDO::FETCH_ASSOC);
$mesa = "<option value='todos'>Todos</option>";

foreach ($salas as $fila) {
    $numero_mesa = $fila['numero_mesa'];
    $mesa .= "<option value='$numero_mesa'>$numero_mesa</option>";
}
echo json_encode($mesa);