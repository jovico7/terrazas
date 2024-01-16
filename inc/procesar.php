<?php
session_start();

if (!isset($_SESSION['id'])) {
    header("Location: ./index.php");
    exit;
} elseif (isset($_GET['logout'])) {
    session_destroy();
    header("Location: ./index.php");
    exit;
}

include_once('./conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['numero_mesa'])) {
        try {
            $id_sala = $_POST['id_sala'];
            $numero_mesa = $_POST['numero_mesa'];
            $id_mesa = $_POST['id_mesa'];

            $fecha_actual = date("Y-m-d H:i:s");

            // Verificar si la mesa está libre u ocupada
            $sql_check = "SELECT estado FROM mesas WHERE id_sala = :id_sala AND id_mesa = :id_mesa";
            $stmt_check = $pdo->prepare($sql_check);
            $stmt_check->bindParam(':id_sala', $id_sala, PDO::PARAM_INT);
            $stmt_check->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT);
            $stmt_check->execute();
            $estado = $stmt_check->fetch(PDO::FETCH_COLUMN);
            $stmt_check->closeCursor();

            if ($estado == 'libre') {
                try {
                    $pdo->beginTransaction();

                    $L_update_sql = "UPDATE mesas SET estado = 'ocupada' WHERE numero_mesa = :numero_mesa";
                    $L_update_stmt = $pdo->prepare($L_update_sql);

                    $sql_insert = "INSERT INTO ocupaciones (id_usuario, id_mesa) VALUES (:id_usuario, :id_mesa)";
                    $stmt_insert = $pdo->prepare($sql_insert);

                    $id_usuario = $_SESSION['id'];

                    $L_update_stmt->bindParam(':numero_mesa', $numero_mesa, PDO::PARAM_INT);
                    $L_update_stmt->execute();

                    $stmt_insert->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
                    $stmt_insert->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT);
                    $stmt_insert->execute();

                    $pdo->commit();

                    // Redirect based on the id_sala
                    if ($id_sala >= 1 && $id_sala <= 3) {
                        header("Location: ../mesas.php?id=" . $id_sala);
                    } elseif ($id_sala >= 4 && $id_sala <= 5) {
                        header("Location: ../mesas.php?id=" . $id_sala);
                    } elseif ($id_sala >= 6 && $id_sala <= 9) {
                        header("Location: ../mostrar.php?id=Privada");
                    } else {
                        echo "Error: ID de sala desconocido.";
                    }

                    die();
                } catch (Exception $e) {
                    echo "Error:" . $e->getMessage();
                    $pdo->rollBack();
                    die();
                }
            } elseif ($estado == 'ocupada') {
                try {
                    $pdo->beginTransaction();

                    $O_update_sql = "UPDATE mesas SET estado = 'libre' WHERE numero_mesa = :numero_mesa";
                    $O_update_stmt = $pdo->prepare($O_update_sql);

                    $sql_update = "UPDATE ocupaciones SET fecha_fin = :fecha_fin WHERE id_usuario = :id_usuario AND id_mesa = :id_mesa AND fecha_fin IS NULL";
                    $stmt_update = $pdo->prepare($sql_update);

                    $id_usuario = $_SESSION['id'];

                    $O_update_stmt->bindParam(':numero_mesa', $numero_mesa, PDO::PARAM_INT);
                    $O_update_stmt->execute();

                    $stmt_update->bindParam(':fecha_fin', $fecha_actual, PDO::PARAM_STR);
                    $stmt_update->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
                    $stmt_update->bindParam(':id_mesa', $id_mesa, PDO::PARAM_INT);
                    $stmt_update->execute();

                    $pdo->commit();

                    // Redirect based on the id_sala
                    if ($id_sala >= 1 && $id_sala <= 3) {
                        header("Location: ../mesas.php?id=" . $id_sala);
                    } elseif ($id_sala >= 4 && $id_sala <= 5) {
                        header("Location: ../mesas.php?id=" . $id_sala);
                    } elseif ($id_sala >= 6 && $id_sala <= 9) {
                        header("Location: ../mostrar.php?id=Privada");
                    } else {
                        echo "Error: ID de sala desconocido.";
                    }
                    die();
                } catch (Exception $e) {
                    echo "Error:" . $e->getMessage();
                    $pdo->rollBack();
                    die();
                }
            }
        } catch (Exception $e) {
            echo "Error:" . $e->getMessage();
            die();
        }
    } else {
        echo "Error: No se ha enviado el número de mesa.";
    }
} else {
    echo "Error: Método de solicitud no válido.";
}
?>
