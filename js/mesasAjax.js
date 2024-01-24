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
    var id_user = document.getElementById('id_user').textContent;
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
                str += "<td>" + item.numero_sillas + "</td>";
                str += "<td>" + item.estado + "</td>";
                if (item.estado === "ocupada") {
                    str += "<td>";
                    str += "<button class='btn2 danger btn-block' onclick='desocuparMesa(" + item.numero_mesa + "," + item.id_mesa + ")'>Desocupar</button>";
                    str += "</td>";
                } else if (item.estado === "libre") {
                    str += "<td>";
                    str += "<button class='btn2 success btn-block' onclick='ocuparMesa(" + item.numero_mesa + "," + item.id_mesa + ")'>Ocupar</button>";
                    str += "<button class='btn2 success btn-block' onclick='formReservarMesa(" + item.id_sala + "," + item.numero_mesa + "," + item.id_mesa + "," + id_user + ")'>Hacer una reserva</button>";
                    str += "</td>";
                } else {
                    str += "<td>";
                    str += "<button class='btn2 success btn-block' onclick='ocuparMesa(" + item.numero_mesa + "," + item.id_mesa + ")'>Ocupar</button>";
                    str += "</td>";
                }
                str += "<td style='position: center;'>";
                str += "<button class='btn2 danger btn-block' onclick='modificarMesa(" + item.numero_mesa + "," + item.id_mesa + "," + item.numero_sillas + ")'>Modificar</button>";
                str += "</td>";
                str += "<tr>";
                tabla += str;
            });
            crudMesas.innerHTML = tabla;
        }
    }
    ajax.send(formdata);
}

function modificarMesa(numeroMesa, idMesa, numeroSillas) {
    Swal.fire({
        title: `Modificar Mesa`,
        html: `<form id="editarForm" style="text-align: center;">
                <h5> Número de Sillas </h5>
                <input style='display: none;' id='numeroMesa' value='${numeroMesa}'>
                <input style='display: none;' id='idMesa' value='${idMesa}'>
                <button type="button" id="botonRestar" onclick="restarNumero()">-</button>
                <input id="numeroInput" type="number" value="${numeroSillas}" min="1" max="6">
                <button type="button" id="botonSumar" onclick="sumarNumero()">+</button>
                </form>`,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            modificarSillas();
        }
    });
}

function modificarSillas() {
    var numeroMesa = document.getElementById('numeroMesa').value;
    var idMesa = document.getElementById('idMesa').value;
    var numeroSillas = document.getElementById('numeroInput').value;
    var sala = document.getElementById('salas');
    var formdata = new FormData();
    formdata.append('numero_mesa', numeroMesa);
    formdata.append('id_mesa', idMesa);
    formdata.append('numero_sillas', numeroSillas);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', './CRUDS/modificarSillas.php');
    ajax.onload = function() {
        if (ajax.status == 200) {
            // console.log(ajax.responseText);
            if (ajax.readyState === 4) {
                verMesas(sala.value);
            }
        }
    }
    ajax.send(formdata);
}

function sumarNumero() {
    var numeroInput = document.getElementById('numeroInput');
    var numeroActual = parseInt(numeroInput.value, 10);
    if (numeroActual < 6) {
        numeroActual++;
        numeroInput.value = numeroActual;
    }
}

function restarNumero() {
    var numeroInput = document.getElementById('numeroInput');
    var numeroActual = parseInt(numeroInput.value, 10);
    if (numeroActual > 1) {
        numeroActual--;
        numeroInput.value = numeroActual;
    }
}

function formReservarMesa(idSala, numeroMesa, idMesa, idUser) {
    Swal.fire({
        title: `Reservar Mesa ${numeroMesa}`,
        html: `<form id="editarForm" style="text-align: left;">
                <input type='hidden' id='id_user' value="${idUser}">
                <input type='hidden' id='id_sala' value="${idSala}">
                <input type='hidden' id='id_mesa' value="${idMesa}">
                <label for="fecha-ini">Seleccione la fecha y la hora de reserva:</label>
                <input id="fecha-ini" type="date">
                <input id="hora-ini" type="time"><br><br>
                <button type="submit" class="btn btn-success" onclick='enviarReservarMesa()'>Reservar Mesa</button>
                <button type="button" class="btn btn-secondary" style="margin-left: 10px;" onclick="Swal.close();">Cancelar</button>
            </form>`,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        preConfirm: () => {
            enviarReservarMesa();
        }
    });
}

function enviarReservarMesa() {
    var fechaReserva = document.getElementById('fecha-ini').value;
    var horaReserva = document.getElementById('hora-ini').value;

    var idUser = document.getElementById('id_user').value;
    var idSala = document.getElementById('id_sala').value;
    var idMesa = document.getElementById('id_mesa').value;

    console.log('Datos a enviar:');
    console.log('id_user:', idUser);
    console.log('id_sala:', idSala);
    console.log('id_mesa:', idMesa);
    console.log('fecha_reserva:', fechaReserva);
    console.log('hora_reserva:', horaReserva);

    var formdata = new FormData();
    formdata.append('id_user', idUser);
    formdata.append('id_sala', idSala);
    formdata.append('id_mesa', idMesa);
    formdata.append('fecha_reserva', fechaReserva);
    formdata.append('hora_reserva', horaReserva);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', './CRUDS/reservarMesa.php');

    ajax.onload = function() {
        if (ajax.status == 200) {
            Swal.fire('Reserva exitosa', 'La mesa ha sido reservada correctamente', 'success');
        } else {
            Swal.fire('Error', 'Hubo un problema al realizar la reserva', 'error');
            console.log(ajax.responseText);
        }
        Swal.close();
    };
    ajax.send(formdata);
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