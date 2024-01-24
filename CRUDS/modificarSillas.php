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

$numero_mesa = $_POST['numero_mesa'];
$id_mesa = $_POST['id_mesa'];
$numero_sillas = $_POST['numero_sillas'];

var_dump($_POST);

var_dump($numero_mesa, $id_mesa, $numero_sillas);

try {
    $sql = 'UPDATE mesas SET numero_sillas = :numero_sillas WHERE numero_mesa = :numero_mesa;';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":numero_sillas", $numero_sillas, PDO::PARAM_INT);
    $stmt->bindParam(":numero_mesa", $numero_mesa, PDO::PARAM_INT);
    $stmt->execute();

    echo "ok";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}