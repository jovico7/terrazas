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
<!DOCTYPE html> 
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RICK DECKARD - HOME</title>
    <link rel="stylesheet" href="./css/home.css">
    <link rel="shortcut icon" href="./img/LOGORICK.png" type="image/x-icon">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
 <!-- Enlace a SweetAlert -->
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Enlace a tu archivo popup.js -->
  <script src="./js/popup.js" defer></script>
</head>

<body>
    <nav class="navbar navbar-light bg-lights position-top">
        <div class="container">
            <div>
        <a class="navbar-brand " href="#">
                <img src="./img/LOGORICK _Blanco.png" alt="" width="100" height="90">
                <?php
                    require './inc/conexion.php';

                    $id = $_SESSION['id'];
                    $sql2 = "SELECT * FROM usuarios WHERE id_usuario = :id";
                    $stmt2 = $pdo->prepare($sql2);
                    $stmt2->bindParam(":id", $id, PDO::PARAM_INT);
                    $stmt2->execute();
                    $users2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                    ?>
                <p style='display: none;' id='id_user'><?php echo $users2['id_usuario']; ?></p>
                <?php
                    $sql = "SELECT * FROM usuarios WHERE id_usuario = :id";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
                    $stmt->execute();
                    $users = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($users['trabajo'] === 'Administrador') {
                    ?>
                    <a href="./crudMesas.php"><button class="atrasboton"><img class="atrasimg" src="./img/writing.png" alt=""></button></a>
                    <a href="./crudUsuarios.php"><button class="atrasboton"><img class="atrasimg" src="./img/account.png" alt=""></button></a>
                    <?php
                }
                ?>
                <a href="./registro.php"><button class="atrasboton"><img class="atrasimg" src="./img/libro.png" alt=""></button></a>

            <select name="salas" id="salas">
            </select>
            <select style='display: none;' name="numero_sala" id="numero_sala">
                <option value='todos'>Todos</option>
            </select>
            <select style='display: none;' name="mesas" id="mesas">
                <option value='todos'>Todos</option>
            </select>
            <select style='display: none;' name="estado" id="estado">
                <option name='ocupado' id='ocupado'>Ocupado</option>
                <option name='libre' id='libre'>Libre</option>
            </select>
            </div>
            <div class="saludo">
            <b style="color:white">¡Bienvenido al portal, <?php echo $_SESSION['user'];?>!</b>
            </div>
            <a href="./inc/salir.php"><button class="logoutboton"><img class="logoutimg" src="./img/LOGOUT.png" alt=""></button></a>
        </div>
    </nav>
<!------------FIN BARRA DE NAVEGACION--------------------->
    <!-- <div class="image-grid">
        <a href="./mostrar.php?id=Terraza">
            <div class="image-item">
                <img src="./img/terraza.jpg" alt="Imagen 1">
                <div class="image-text">
                    <h2>Terrazas</h2>
                    <p>En la terraza, encontrarás tres áreas al aire libre, cada una con capacidad para cuatro mesas.</p>
                </div>
            </div>
    </a>
    <a href="./mostrar.php?id=Menjador">
        <div class="image-item">
            <img src="./img/comedor.jpg" alt="Imagen 2">
            <div class="image-text">
                <h2>Comedores</h2>
                <p>Dentro de nuestros comedores, contamos con dos zonas, cada una con cuatro mesas.</p>
            </div>
    </div>
    </a>

    <a href="./mostrar.php?id=Privada">
        <div class="image-item">
            <img src="./img/private.jpg" alt="Imagen 3">
            <div class="image-text">
                <h2>Areas Privadas</h2>
                <p>Nuestras cuatro salas privadas están equipadas con una mesa en cada una. Estos espacios brindan privacidad y comodidad.</p>
            </div>
        </div>
    </a> -->

    <div id="home"></div>
    
    <script>
       document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        if (username !== null) {
            Swal.fire({
                imageUrl: "./img/LOGORICK.png",
                imageHeight: 100,
                title: `Bienvenido/a ${username}`,
                showConfirmButton: false,
                timer: 3500,
                allowOutsideClick: false
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "./home.php";
                }
            });
        }
    });
    </script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script src="./js/homeAjax.js"></script>
</body>

</html>