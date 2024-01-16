<?php

if (!filter_has_var(INPUT_POST, 'inicio')) {
    header('Location: ../index.php');
    exit();
} else {
    try {
        include_once("./conexion.php");

        $user = $_POST["user"];
        $password = $_POST["password"];
        $username = $_POST['hiddenUsername'];

        if (empty($user) || empty($password)) {
            header("Location: ../index.php?empty");
            exit();
        } else {
            $query = "SELECT id_usuario, nombre_user, contrasena FROM usuarios WHERE nombre_user = :user";
            $stmt = $pdo->prepare($query);

            $stmt->bindParam(':user', $user, PDO::PARAM_STR);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $id_usuario = $row['id_usuario'];
                $nombre_user = $row['nombre_user'];
                $contrasena = $row['contrasena'];

                if (password_verify($password, $contrasena)) {
                    session_start();
                    $_SESSION["id"] = $id_usuario;
                    $_SESSION["user"] = $nombre_user;
                    header("Location: ../home.php?username=$nombre_user");
                    exit();
                } else {
                    header("Location: ../index.php?error");
                    exit();
                }
            } else {
                header("Location: ../index.php?error");
                exit();
            }
        }
    } catch (Exception $e) {
        echo "Error:" . $e->getMessage();
        die();
    }
}
?>
