var buscar = document.getElementById("buscar");
buscar.addEventListener("keyup", () => {
    var valor = buscar.value;
    console.log("Valor de búsqueda:", valor);
    if (valor == "") {
        verUsuarios('');
    } else {
        verUsuarios(valor);
    }
});

verUsuarios('');

function verUsuarios(valor) {
    var crudUsuarios = document.getElementById('crudUsuarios');
    if (crudUsuarios) {

        var formdata = new FormData();
        formdata.append('busqueda', valor);

        var ajax = new XMLHttpRequest();

        ajax.open('POST', './CRUDS/procesarUsuarios.php');

        ajax.onload = function() {
            // console.log(ajax.responseText);
            var str = "";
            var miID = document.getElementById('user_id').textContent;
            if (ajax.status == 200) {
                var json = JSON.parse(ajax.responseText);
                // console.log(json);
                var tabla = "";
                // console.log(miID);
                json.forEach(function(item) {
                    var str = "<tr>";
                    if (item.nombre_user !== miID) {
                        str += "<td>" + item.nombre_user + "</td>";
                        str += "<td>" + item.apellido1 + "</td>";
                        str += "<td>" + item.apellido2 + "</td>";
                        str += "<td>" + item.email + "</td>";
                        str += "<td>" + item.telefono + "</td>";
                        str += "<td>" + item.trabajo + "</td>";
                        str += "<td>";
                        str += "<button onclick='formEditarUsuario(" + item.id_usuario + ", \"" + item.nombre_user + "\", \"" + item.apellido1 + "\", \"" + item.apellido2 + "\", \"" + item.email + "\", \"" + item.telefono + "\", \"" + item.trabajo + "\")' name='editar_user' class='btn btn-custom' style='background-color: #F88379; color: white; " + "transition: background-color 0.3s;'>" + "Editar</button>";
                        str += "</td>";
                        str += "<td>";
                        str += "<input id='eliminarUsuario' type='hidden' value='" + item.id_usuario + "'>";
                        str += "<button onclick='formEliminarUsuario(" + item.id_usuario + ", \"" + item.nombre_user + "\")' name='eliminar_user' class='btn btn-danger'>Eliminar</button>";
                        str += "</td>";
                        str += "</tr>";
                        tabla += str;
                    }
                });
                crudUsuarios.innerHTML = tabla;
            }
        }
        ajax.send(formdata);
    } else {
        console.error("Elemento 'crudUsuarios' no encontrado en el DOM.");
    }
};

function formEditarUsuario(id, nombre, apellido1, apellido2, email, telefono, trabajo) {
    Swal.fire({
        title: `Editar a ${nombre}`,
        html: `<form id="editarForm" style="text-align: left;">
                <input type='hidden' id='idUser' value="${id}">
                <label for="nombre">Nombre:</label>
                <input id="nombre" style="width: 80%; display: flex; margin-bottom: 5px; margin-left: 20px;" type="text" value="${nombre}"><br>
                <label for="apellido1">Primer Apellido:</label>
                <input id="apellido1" style="width: 80%; display: flex; margin-bottom: 5px; margin-left: 20px;" type="text" value="${apellido1}"><br>
                <label for="nombre">Segundo Apellido:</label>
                <input id="apellido2" style="width: 80%; display: flex; margin-bottom: 5px; margin-left: 20px;" type="text" value="${apellido2}"><br>
                <label for="email">Correo Electrónico:</label>
                <input id="email" style="width: 80%; display: flex; margin-bottom: 5px; margin-left: 20px;" type="email" value="${email}"><br>
                <label for="telefono">Teléfono:</label>
                <input id="telefono" style="width: 80%; display: flex; margin-bottom: 5px; margin-left: 20px;" type="num" value="${telefono}"><br>
                <label for="trabajo">Trabajo:</label>
                <select id="trabajo" style="width: 80%; display: flex; margin-bottom: 40px; margin-left: 20px;" >
                    <option value="Camarero" ${trabajo === 'Camarero' ? 'selected' : ''}>Camarero</option>
                    <option value="Gerente" ${trabajo === 'Gerente' ? 'selected' : ''}>Gerente</option>
                    <option value="Mantenimiento" ${trabajo === 'Mantenimiento' ? 'selected' : ''}>Mantenimiento</option>
                </select>
                <button type="submit" class="btn btn-success" onclick='enviarEditarUsuario()'>Guardar Cambios</button>
                <button type="button" class="btn btn-secondary" style="margin-left: 10px;" onclick="Swal.close();">Cancelar</button>
            </form>`,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        preConfirm: () => {}
    });
}

function enviarEditarUsuario() {
    var id = document.getElementById('idUser').value;
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var trabajo = document.getElementById('trabajo').value;
    // console.log(id);
    // console.log(nombre);
    // console.log(apellido1);
    // console.log(apellido2);
    // console.log(email);
    // console.log(telefono);
    // console.log(trabajo);

    var formdata = new FormData();
    formdata.append('id', id);
    formdata.append('nombre', nombre);
    formdata.append('apellido1', apellido1);
    formdata.append('apellido2', apellido2);
    formdata.append('email', email);
    formdata.append('telefono', telefono);
    formdata.append('trabajo', trabajo);
    var ajax = new XMLHttpRequest();

    ajax.open('POST', './CRUDS/editarUsuarios.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            console.log(ajax.responseText);
            Swal.fire({
                title: 'Éxito',
                text: 'El formulario se envió correctamente.',
                icon: 'success',
            });
        }
    };
    ajax.send(formdata);
}



function formEliminarUsuario(valor1, valor2) {
    Swal.fire({
        icon: 'error',
        title: `¿Eliminar a ${valor2}?`,
        html: `<form id="eliminarForm" style="text-align: left;">
                <input type='hidden' id='id_usuario' value="${valor1}">
                <button type="submit" class="btn btn-danger" style="position: center;" onclick='enviarEliminarUsuario()'>Eliminar Usuario</button>
                <button type="button" class="btn btn-secondary" style="margin-left: 10px;" onclick="Swal.close();">Cancelar</button>
            </form>`,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        preConfirm: () => {

        }
    });
}


function enviarEliminarUsuario() {
    var idUsuario = document.getElementById('id_usuario').value;

    var formdata = new FormData();
    formdata.append('id_user', idUsuario);
    console.log(idUsuario);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', './CRUDS/eliminarUsuarios.php');

    ajax.onload = function() {
        if (ajax.status == 200) {
            var respuesta = ajax.responseText;
            if (respuesta === 'ok') {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
                verUsuarios('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el usuario',
                    text: 'Por favor, inténtalo de nuevo más tarde.'
                });
            }
        }
    };

    ajax.send(formdata);
    Swal.close();
}