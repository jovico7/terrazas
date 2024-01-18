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
            console.log(ajax.responseText);
            var str = "";
            if (ajax.status == 200) {
                var json = JSON.parse(ajax.responseText);
                console.log(json);
                var tabla = "";
                json.forEach(function(item) {
                    // if () {
                    str += "<td>" + item.nombre_user + "</td>";
                    str += "<td>" + item.apellido1 + "</td>";
                    str += "<td>" + item.apellido2 + "</td>";
                    str += "<td>" + item.email + "</td>";
                    str += "<td>" + item.telefono + "</td>";
                    str += "<td>";
                    str += "<input id='editarUsuario' type='hidden' value='" + item.id_usuario + "'>";
                    str += "<button onclick='editarUsuario(" + item.id_usuario + ")' name='editar_user' class='btn btn-custom' style='background-color: #F88379; color: white; " + "transition: background-color 0.3s; /* Efecto de transición en el cambio de color de fondo */ " + "'>" + "Editar</button>";
                    str += "</td>";
                    str += "<td>";
                    str += "<input id='eliminarUsuario' type='hidden' value='" + item.id_usuario + "'>";
                    str += "<button onclick='eliminarUsuario(" + item.id_usuario + ")' name='eliminar_user' class='btn btn-danger'>Eliminar</button>";
                    str += "</td>";
                    str += "</tr>";
                    tabla += str;
                    // } else {
                    // }
                });
                crudUsuarios.innerHTML = tabla;
            }
        }

        ajax.send();
    } else {
        console.error("Elemento 'crudUsuarios' no encontrado en el DOM.");
    }

};