
    <!----------------FIN DE LA BARRA DE NAVEGACION --------------------->
    <?php
    ?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <?php
    // if (!isset($_GET['id'])) {
    //     header("Location: ./home.php");
    //     exit;
    // } else {
        try {
            require './inc/conexion.php';
            // $id = trim(htmlspecialchars($_POST['id']));
            $id = $_POST['id'];
            $sql = "SELECT * FROM mesas WHERE id_sala = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }

        echo '<div class="centrado">';
        $i = 0;
        foreach ($res as $mesa) {
            if ($i % 3 == 0 || $i == 0) {
                echo '<div class="image-grid">';
            }
            echo '<a><div class="image-item">';
            if ($mesa['estado'] == "ocupada") {
                echo '<img class="filtro" src="./img/mesas.png" alt="Imagen 1">';
                echo '<div class="image-text"><h2> Mesa' . $mesa['numero_mesa'] . '</h2>';
                echo '<p class="diss">' . $mesa['estado'] . '</p>';
                $clase = 'class ="btn2 danger  btn-block" value="Desocupar" ';
                $reserva = 'class = "btn2 danger btn-block" value="Cancelar Reserva" ';
            } else {
                echo '<img class="" src="./img/mesas.png" alt="Imagen 1">';
                echo '<div class="image-text"><h2> Mesa' . $mesa['numero_mesa'] . '</h2>';
                echo '<p>' . $mesa['estado'] . '</p>';
                $clase = 'class ="btn2 success btn-block" value="Ocupar" ';
                $reserva = 'class = "btn2 success btn-block" value="Hacer una reserva"';
            }
            echo "<form method='POST' action='./inc/procesar.php'>";
            echo "<input type='hidden' name='id_sala' value=" . $mesa['id_sala'] . ">";
            echo "<input type='hidden' name='id_mesa' value=" . $mesa['id_mesa'] . ">";
            echo "<input type='hidden' name='numero_mesa' value=" . $mesa['numero_mesa'] . ">";
            echo "<input " . $clase . " type='submit'>";

            echo "</form>";
            if (isset($reserva) && $reserva === 'class = "btn2 success btn-block" value="Hacer una reserva"') {
                echo "<form method='POST' action='./mesas.php?id=". $mesa['id_sala'] ."'>";
                echo "<input type='hidden' name='id_mesa' value=" . $mesa['id_mesa'] . ">";
                echo "<input type='hidden' name='numero_mesa' value=" . $mesa['numero_mesa'] . ">";
                echo "<input " . $reserva . " name='reservar' id='reservar' type='submit'>";
                echo "</form>";
            }
            echo '</div></div></a>';
            // FORMULARIO DE RESERVAS
            // && $_POST['reservar'] !== null && $_POST['id_mesa'] == $mesa['id_mesa']
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                ?>
                <script>
                document.getElementById('reservar').addEventListener('click', function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                });
                </script>
                <?php
            }
            if ($i == 2) {
                echo '</div>';
            }
            $i++;
        }
    // }
    ?>
