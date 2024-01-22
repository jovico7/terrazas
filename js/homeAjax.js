var sala = document.getElementById('salas');
var numero_salas = document.getElementById('numero_salas');
var mesas = document.getElementById('mesas');
var estado = document.getElementById('estado');
var ajax = new XMLHttpRequest();
ajax.open('POST', './CRUDS/consultaTipoSala.php');
ajax.onload = function() {
    if (ajax.status = 200) {
        sala.innerHTML = "";
        var mesaOptions = JSON.parse(ajax.responseText);
        sala.innerHTML = mesaOptions;
        verMesas(sala.value);
    }
};
ajax.send();

sala.addEventListener('change', function() {
    var tiposala = sala.value;
    numeroSala(tiposala);
    verMesas(tiposala);
});


function numeroSala(valor) {
    var sala = document.getElementById('salas');
    var numero_salas = document.getElementById('numero_sala');
    var ajax = new XMLHttpRequest();
    var formdata = new FormData();
    // console.log("el valor de la sala es  " + valor);
    formdata.append('sala', valor);

    ajax.open('POST', './CRUDS/consultaNumeroSalas.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            if (ajax.readyState === 4) {
                var prueba = ajax.responseText;
                // console.log(prueba);
                numero_salas.innerHTML = "";
                var mesaOptions = JSON.parse(ajax.responseText);
                numero_salas.innerHTML = mesaOptions;
            }
        }
    };
    ajax.send(formdata);
    numero_salas.addEventListener('change', function() {
        // console.log("Valor seleccionado del option: " + numero_salas.value);
        numeroMesas(numero_salas.value);
        var tiposala = sala.value;
        var numerosalas = numero_salas.value
        verMesas(tiposala, numerosalas);
    });
};

function numeroMesas(valor) {
    var sala = document.getElementById('salas');
    var numero_salas = document.getElementById('numero_sala');
    var mesas = document.getElementById('mesas');
    var ajax = new XMLHttpRequest();
    var formdata = new FormData();
    // console.log("el valor es de mesas es " + valor);
    formdata.append('numero_sala', valor);

    ajax.open('POST', './CRUDS/consultaMesas.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            if (ajax.readyState === 4) {
                var prueba = ajax.responseText;
                // console.log(prueba);
                mesas.innerHTML = "";
                var mesaOptions = JSON.parse(ajax.responseText);
                mesas.innerHTML = mesaOptions;
            }
        }
    };
    ajax.send(formdata);
    mesas.addEventListener('change', function() {
        // console.log("Valor seleccionado del option: " + mesas.value);
        var tiposala = sala.value;
        var numerosalas = numero_salas.value
        var valorMesas = mesas.value
        verMesas(tiposala, numerosalas, valorMesas);
    });
};


function verMesas(valor1, valor2, valor3) {
    var home = document.getElementById('home');
    var formdata = new FormData();
    formdata.append('sala', valor1);
    if (valor2) {
        formdata.append('numero_sala', valor2);
    }

    if (valor3) {
        formdata.append('mesas', valor3);
    }

    var ajax = new XMLHttpRequest();
    ajax.open('POST', './CRUDS/procesarMesas.php');

    ajax.onload = function() {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '<div class="centrado" style="overflow-y: scroll; overflow-x: hidden; height:85vh;">';
            tabla += "<div class='image-grid'>";
            console.log(json);
            json.forEach(function(item) {
                var str = "<a><div class='image-item'>";
                if (item.estado === "ocupada") {
                    str += "<img class='filtro' src='./img/mesas.png' alt='Imagen 1'>";
                    str += "<div class='image-text'><h2>Mesa " + item.numero_mesa + "</h2>";
                    str += "<p class='diss'>" + item.estado + "</p>";
                    str += "<button class='btn2 danger btn-block' onclick='desocuparMesa(" + item.id_sala + "," + item.id_mesa + "," + item.numero_mesa + ")'>Desocupar</button>";
                } else {
                    str += "<img class='' src='./img/mesas.png' alt='Imagen 1'>";
                    str += "<div class='image-text'><h2>Mesa " + item.numero_mesa + "</h2>";
                    str += "<p>" + item.estado + "</p>";
                    str += "<button class='btn2 success btn-block' onclick='ocuparMesa(" + item.id_sala + "," + item.id_mesa + "," + item.numero_mesa + ")'>Ocupar</button>";
                    str += "<button class='btn2 success btn-block' onclick='reservarMesa(" + item.id_sala + "," + item.id_mesa + "," + item.numero_mesa + ")'>Hacer una reserva</button>";
                }
                str += "</div></div></a>";
                tabla += str;
            });
            tabla += '</div></div>';
            home.innerHTML = tabla;
        }
    }
    ajax.send(formdata);
}