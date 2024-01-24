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

$id_user = $_POST['id_user'];
$id_sala = $_POST['id_sala'];
$id_mesa = $_POST['id_mesa'];
$fecha_reserva = $_POST['fecha_reserva'];
// $hora_reserva = $_POST['hora_reserva'];

try {
    // Iniciar una transacción
    $pdo->beginTransaction();

    // Actualizar el estado de la mesa a "reservada"
    $sql = 'UPDATE mesas SET estado = "reservada" WHERE id_mesa = :id_mesa';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id_mesa", $id_mesa, PDO::PARAM_INT);
    $stmt->execute();

    // Insertar un registro en la tabla de ocupaciones para representar la reserva
    $sql_reservar = "INSERT INTO ocupaciones (id_usuario, id_mesa, fecha_inicio, tipo, hora_reserva) 
                     VALUES (:id_user, :id_mesa, :fecha_reserva, 'reserva', :hora_reserva)";
    $stmt_reservar = $pdo->prepare($sql_reservar);
    $stmt_reservar->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $stmt_reservar->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT);
    $stmt_reservar->bindParam(':fecha_reserva', $fecha_reserva, PDO::PARAM_STR);
    $stmt_reservar->bindParam(':hora_reserva', $hora_reserva, PDO::PARAM_INT);
    $stmt_reservar->execute();

    // Confirmar la transacción
    $pdo->commit();

    // Emitir una respuesta de éxito
    echo "ok";
} catch (PDOException $e) {
    // Deshacer la transacción en caso de error
    $pdo->rollBack();

    // Emitir un mensaje de error
    echo "Error al reservar la mesa: " . $e->getMessage();
}