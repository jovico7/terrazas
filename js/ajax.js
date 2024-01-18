document.getElementById("tipo_sala").addEventListener("change", cambiarOpciones);

function cambiarOpciones() {
    var tipoSala = document.getElementById("tipo_sala").value;
    console.log('tipo de sala: ' + tipoSala);

    var sala = document.getElementById("sala");
    sala.innerHTML = ''; // Limpiar las opciones existentes

    var opcionDefault = document.createElement("option");
    opcionDefault.value = "";
    opcionDefault.text = "Selecciona una opción...";
    sala.appendChild(opcionDefault);

    if (tipoSala === "terrazas") {
        agregarOpcion("Todas las terrazas", "terraza0");
        agregarOpcion("Terraza 1", "1");
        agregarOpcion("Terraza 2", "terraza2");
        agregarOpcion("Terraza 3", "terraza3");
    } else if (tipoSala === "comedores") {
        agregarOpcion("Todos los comedores", "comedor0");
        agregarOpcion("Comedor 1", "comedor1");
        agregarOpcion("Comedor 2", "comedor2");
    } else if (tipoSala === "salasPrivadas") {
        agregarOpcion("Todas las Salas Privadas", "salaPrivada0");
        agregarOpcion("Sala Privada 2", "salaPrivada2");
        agregarOpcion("Sala Privada 3", "salaPrivada3");
        agregarOpcion("Sala Privada 4", "salaPrivada4");
    }

    console.log(sala.value);
}

function agregarOpcion(texto, valor) {
    var opcion = document.createElement("option");
    opcion.value = valor.toLowerCase().replace(/\s+/g, ''); // Valor sin espacios y en minúsculas
    opcion.text = texto;
    document.getElementById("sala").appendChild(opcion);
}

document.getElementById("sala").onchange = function() {
    var salaSeleccionada = this.value;
    console.log('Sala seleccionada:', salaSeleccionada);

    verMesas(salaSeleccionada);
};

verMesas('');

function verMesas(salaSeleccionada) {
    var home = document.getElementById('home');
    var formdata = new FormData();
    formdata.append('id', salaSeleccionada);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'mesas.php');

    ajax.onload = function() {
        console.log("tipo de sala: " + salaSeleccionada);
        home.innerHTML = ajax.responseText;
    }

    ajax.send(formdata);
};