
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

try {

if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['busqueda'])) {
    $valorBusqueda = '%' . $_POST['busqueda'] . '%';
    $sql = "SELECT `id_usuario`, `nombre_user`, `apellido1`, `apellido2`, `email`, `telefono`, `trabajo`  FROM `usuarios`
            WHERE `nombre_user` LIKE :busqueda;";
}


$stmt = $pdo->prepare($sql);
$stmt->bindParam(":busqueda", $valorBusqueda, PDO::PARAM_STR);
$stmt->bindParam(":busqueda", $valorBusqueda, PDO::PARAM_STR);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);

// if ($result) {
// } else {
//     echo '<a  href="./registro.php">';
//     echo '<img src="./img/LOGORICK _Blanco.png" alt="" style="width: 50%; display: block; margin: auto;"><br>';
//     echo '</a>';
//     echo "<div style='color: white; display: flex; justify-content: center;'>";
//     echo "<b style='font-size: 20px;' >¡Oops! Parece que las hamburguesas se han comido los resultados. ¡Intenta con otra combinación!</b>";
//     echo "</div>";
// }
} catch (Exception $e) {
echo "Error: " . $e->getMessage();
}
?>