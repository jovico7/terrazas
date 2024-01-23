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
$id_user = $_POST['id_user'];

try {
    // Iniciar una transacción
    $pdo->beginTransaction();

    // Actualizar el estado de la mesa a "ocupada"
    $sql = 'UPDATE mesas SET estado = "ocupada" WHERE numero_mesa = :numero_mesa';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":numero_mesa", $numero_mesa, PDO::PARAM_INT);
    $stmt->execute();

    // Insertar un registro en la tabla ocupaciones
    $sql_ocupar = "INSERT INTO ocupaciones (id_usuario, id_mesa) VALUES (:id_user, :id_mesa)";
    $stmt_ocupar = $pdo->prepare($sql_ocupar);
    $stmt_ocupar->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $stmt_ocupar->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT);
    $stmt_ocupar->execute();

    // Confirmar la transacción
    $pdo->commit();

    // Emitir una respuesta de éxito 
    echo "ok";
} catch (PDOException $e) {
    // Deshacer la transacción en caso de error
    $pdo->rollBack();

    // Emitir un mensaje de error
    echo "Error al ocupar la mesa: " . $e->getMessage();
}