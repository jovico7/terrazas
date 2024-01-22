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
    estadoMesa(tiposala);
    numeroSala(tiposala);
    verMesas(tiposala);
});

function estadoMesa() {
    var sala = document.getElementById('salas');
    var estado = document.getElementById('estado');
    var ajax = new XMLHttpRequest();

    ajax.open('POST', './CRUDS/consultaEstado.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            if (ajax.readyState === 4) {
                var prueba = ajax.responseText;
                // console.log(prueba);
                estado.innerHTML = "";
                var mesaOptions = JSON.parse(ajax.responseText);
                estado.innerHTML = mesaOptions;
            }
        }
    };
    ajax.send();
    estado.addEventListener('change', function() {
        var tiposala = sala.value;
        var valorEstado = estado.value
        numeroSala(tiposala);
        verMesas(tiposala, valorEstado);
    });
}


function numeroSala(valor) {
    var sala = document.getElementById('salas');
    var numero_salas = document.getElementById('numero_sala');
    var estado = document.getElementById('estado');
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
        var tiposala = sala.value;
        var numerosalas = numero_salas.value
        var valorEstado = estado.value
        numeroMesas(numero_salas.value);
        verMesas(tiposala, valorEstado, numerosalas);
    });
};

function numeroMesas(valor) {
    var sala = document.getElementById('salas');
    var numero_salas = document.getElementById('numero_sala');
    var mesas = document.getElementById('mesas');
    var estado = document.getElementById('estado');
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
        var numerosalas = numero_salas.value;
        var valorMesas = mesas.value;
        var valorEstado = estado.value
        verMesas(tiposala, valorEstado, numerosalas, valorMesas);
    });
};


function verMesas(valor1, valor2, valor3, valor4) {
    var formdata = new FormData();
    // console.log(valor1);
    if (valor1) {
        formdata.append('sala', valor1);
    }
    if (valor2) {
        formdata.append('estado', valor2);
    }
    if (valor3) {
        formdata.append('numero_sala', valor3);
    }
    if (valor4) {
        formdata.append('mesas', valor4);
    }
    var ajax = new XMLHttpRequest();
    ajax.open('POST', './CRUDS/procesarMesas.php');
    ajax.onload = function() {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = "";
            // console.log(json);
            json.forEach(function(item) {
                var str = "";
                var str = "<tr>";
                str += "<td>" + item.tipo_sala + "</td>";
                str += "<td>" + item.nombre_sala + "</td>";
                str += "<td>" + item.numero_mesa + "</td>";
                str += "<td>" + item.estado + "</td>";
                str += "<tr>";
                tabla += str;
            });
            crudMesas.innerHTML = tabla;
        }
    }
    ajax.send(formdata);
}