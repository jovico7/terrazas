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
                if (item.estado === "ocupada") {
                    str += "<td>";
                    str += "<button class='btn2 danger btn-block' onclick='desocuparMesa(" + item.numero_mesa + "," + item.id_mesa + ")'>Desocupar</button>";
                    str += "</td>";
                } else {
                    str += "<td>";
                    str += "<button class='btn2 success btn-block' onclick='ocuparMesa(" + item.numero_mesa + "," + item.id_mesa + ")'>Ocupar</button>";
                    str += "<button class='btn2 success btn-block' onclick='reservarMesa(" + item.id_mesa + "," + item.numero_mesa + ")'>Hacer una reserva</button>";
                    str += "</td>";
                }
                str += "<tr>";
                tabla += str;
            });
            crudMesas.innerHTML = tabla;
        }
    }
    ajax.send(formdata);
}


reservarMesa() {

}

function ocuparMesa(valor1, valor2) {
    var id_user = document.getElementById('id_user').textContent;
    var formdata = new FormData();
    formdata.append('numero_mesa', valor1);
    formdata.append('id_mesa', valor2);
    formdata.append('id_user', id_user);
    var ajax = new XMLHttpRequest();

    ajax.open('POST', './CRUDS/ocuparMesa.php');
    ajax.onload = function() {
        if (ajax.status == 200) {
            if (ajax.readyState === 4 && ajax.responseText === 'ok') {
                // Operación exitosa
                // console.log('Mesa ocupada con éxito');
            } else {
                // Manejar otros casos si es necesario
                // console.log('Error al ocupar la mesa');
            }
        }
    }
    ajax.send(formdata);
    verMesas('');
}


function desocuparMesa(valor1, valor2) {
    var id_user = document.getElementById('id_user').textContent;
    var formdata = new FormData();
    formdata.append('numero_mesa', valor1);
    formdata.append('id_mesa', valor2);
    formdata.append('id_user', id_user);
    var ajax = new XMLHttpRequest();

    ajax.open('POST', './CRUDS/desocuparMesa.php');
    ajax.onload = function() {
        if (ajax.status == 200) {
            if (ajax.readyState === 4) {
                try {
                    var response = JSON.parse(ajax.responseText);
                    if (response.success) {
                        // console.log(response);
                        // console.log("Mesa desocupada con éxito");
                        verMesas('');
                    } else {
                        // Manejar errores
                        console.error("Error al desocupar mesa: " + response.error);
                    }
                } catch (error) {
                    console.error("Error al analizar la respuesta JSON: " + error);
                }
            }
        }
    };
    ajax.send(formdata);
}