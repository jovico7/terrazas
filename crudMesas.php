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
    <title>RICK DECKARD - HISTORIAL</title>
    <link rel="shortcut icon" href="./img/LOGORICK.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        .table-responsive>.table-bordered {
            margin-bottom: 0px !important;
        }
    </style>
    <!-- Enlace a SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Enlace a tu archivo popup.js -->
    <script src="./js/popup.js" defer></script>
</head>

<body>
    <nav class="navbar navbar-light bg-lights position-top">
        <div class="container">
            <div>
                <a class="navbar-brand " href="./home.php">
                    <img src="./img/LOGORICK _Blanco.png" alt="" width="100" height="90">
                </a>
            </div>
            <div class="saludo">
                <b style="color:white">¡Bienvenido al portal, <?php echo $_SESSION['user'];?>!</b>
            </div>
            <div>
                <a href="./home.php"><button class="atrasboton"><img class="atrasimg" src="./img/atras.png" alt=""></button></a>
                <a href="./inc/salir.php"><button class="logoutboton"><img class="logoutimg" src="./img/LOGOUT.png" alt=""></button></a>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <h2 class="mb-4" style="color: white;">Mesas</h2>
        <select name="salas" id="salas">
            <option value='todos'>Todos</option>
        </select>
        <select name="numero_sala" id="numero_sala">
            <option value='todos'>Todos</option>
        </select>
        <select name="mesas" id="mesas">
            <option value='todos'>Todos</option>
        </select>
        <select name="estado" id="estado">
            <option value='todos'>Todos</option>
            <option value='ocupado' id='ocupado'>Ocupado</option>
            <option value='libre' id='libre'>Libre</option>
        </select>
            <div class="table-responsive table-wrapper" style="background-color: white; overflow-y: scroll; overflow-x: hidden; height:65vh;">
                <table class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Tipo de sala</th>
                            <th>Número de sala</th>
                            <th>Número de mesa</th>
                            <th>Estado</th>
                            <th>Ocupar/Desocupar</th>
                        </tr>
                    </thead>
                    <tbody id="crudMesas">
                    </tbody>
                </table>
            </div>
    </div>
</body>
<script src="./js/mesasAjax.js"></script>
</html>
