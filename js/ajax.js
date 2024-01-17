function cambiarOpciones() {
    var tipoSala = document.getElementById("tipo_sala").value;
    var sala = document.getElementById("sala").value;
    console.log(tipoSala);
    sala.innerHTML = '<option value="" selected disabled>Selecciona una opción...</option>';

    if (tipoSala === "terrazas") {
        sala.innerHTML += '<option value="terraza0"> Todas las terrazas </option>';
        sala.innerHTML += '<option value="terraza1"> Terraza 1</option>';
        sala.innerHTML += '<option value="terraza2"> Terraza 2</option>';
        sala.innerHTML += '<option value="terraza3"> Terraza 3</option>';
    } else if (tipoSala === "comedores") {
        sala.innerHTML += '<option value="comedor0"> Todos los comedores </option>';
        sala.innerHTML += '<option value="comedor1"> Comedor 1</option>';
        sala.innerHTML += '<option value="comedor2"> Comedor 2</option>';
    } else if (tipoSala === "salasPrivadas") {
        sala.innerHTML += '<option value="salaPrivada0"> Todas las Salas Privadas</option>';
        sala.innerHTML += '<option value="salaPrivada2"> Sala Privada 2</option>';
        sala.innerHTML += '<option value="salaPrivada3"> Sala Privada 3</option>';
        sala.innerHTML += '<option value="salaPrivada4"> Sala Privada 4</option>';
    }
}


verMesas('');

function verMesas() {
    var home = document.getElementById('home');
    var tipoSala = document.getElementById("tipo_sala").value;
    var formdata = new FormData();
    formdata.append('id', tipoSala);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'mesas.php');

    ajax.onload = function() {
        home.innerHTML = ajax.responseText;
    }

    ajax.send();
};