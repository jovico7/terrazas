
<?php

include_once('../inc/conexion.php');

try {

if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['busqueda'])) {
    $sql = "SELECT * FROM `usuarios`;";
}


$stmt = $pdo->prepare($sql);
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