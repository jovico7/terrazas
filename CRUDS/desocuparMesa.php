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

include_once('../inc/conexion.php');

$id_mesa = $_POST['id_mesa'];
$numero_mesa = $_POST['numero_mesa'];
$id_user = $_POST['id_user'];
$fecha_actual = date("Y-m-d H:i:s");

try {
    // Actualizar el estado de la mesa a "libre"
    $sql = 'UPDATE mesas SET estado = "libre" WHERE numero_mesa = :numero_mesa';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":numero_mesa", $numero_mesa, PDO::PARAM_INT);

    // Actualizar la fecha_fin en la tabla ocupaciones
    $sql_desocupar = "UPDATE ocupaciones SET fecha_fin = :fecha_fin WHERE id_usuario = :id_user AND id_mesa = :id_mesa AND fecha_fin IS NULL";
    $stmt_desocupar = $pdo->prepare($sql_desocupar);
    $stmt_desocupar->bindParam(':fecha_fin', $fecha_actual, PDO::PARAM_STR);
    $stmt_desocupar->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $stmt_desocupar->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT); // Corrección aquí

    $stmt->execute();
    $stmt_desocupar->execute();

    // Emitir una respuesta de éxito (puedes ajustar según tus necesidades)
    echo json_encode(array('success' => true));
} catch (PDOException $e) {
    // Enviar una respuesta JSON indicando el error
    echo json_encode(array('error' => 'Error al actualizar la mesa: ' . $e->getMessage()));
}
?>
