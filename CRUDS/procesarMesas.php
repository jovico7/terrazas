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

// $sql = "SELECT * FROM mesas m INNER JOIN salas s WHERE m.id_sala = s.id_sala;";

// $stmt = $pdo->prepare($sql);
// $stmt->execute();
// $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo json_encode($result);

$salaFiltro = isset($_POST['sala']) ? $_POST['sala'] : 'todos';
$numeroSalaFiltro = isset($_POST['numero_sala']) ? $_POST['numero_sala'] : 'todos';
$mesas = isset($_POST['mesas']) ? $_POST['mesas'] : 'todos';
$estado = isset($_POST['estado']) ? $_POST['estado'] : 'todos';

$sql = 'SELECT salas.tipo_sala, salas.nombre_sala, mesas.numero_mesa, mesas.id_mesa, mesas.estado, mesas.numero_sillas FROM mesas INNER JOIN salas ON mesas.id_sala = salas.id_sala WHERE 1 ';

if ($salaFiltro !== 'todos') {
    $sql .= ' AND salas.tipo_sala = :tipo_sala ';
}

if ($numeroSalaFiltro !== 'todos') {
    $sql .= ' AND nombre_sala = :numero_sala ';
}

if ($mesas !== 'todos') {
    $sql .= ' AND numero_mesa = :numero_mesa ';
}

if ($estado !== 'todos') {
    $sql .= ' AND estado = :estado ';
}

$stmt = $pdo->prepare($sql);

if ($salaFiltro !== 'todos') {
    $stmt->bindParam(':tipo_sala', $salaFiltro, PDO::PARAM_STR);
}

if ($numeroSalaFiltro !== 'todos') {
    $stmt->bindParam(':numero_sala', $numeroSalaFiltro, PDO::PARAM_STR);
}

if ($mesas !== 'todos') {
    $stmt->bindParam(':numero_mesa', $mesas, PDO::PARAM_INT);
}

if ($estado !== 'todos') {
    $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
}

$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);