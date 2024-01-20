var sala = document.getElementById('salas');
var ajax = new XMLHttpRequest();
ajax.open('POST', './CRUDS/consultaMesas.php');
ajax.onload = function() {
    if (ajax.status = 200) {
        sala.innerHTML = "";
        var json = JSON.parse(ajax.responseText);
        sala.innerHTML = json;

        console.log(json);
    }
};
ajax.send();

verMesas('');

function verMesas() {
    var crudMesas = document.getElementById('crudMesas');
    if (crudMesas) {
        var ajax = new XMLHttpRequest();

        ajax.open('POST', './CRUDS/procesarMesas.php');

        ajax.onload = function() {
            if (ajax.status == 200) {
                var json = JSON.parse(ajax.responseText);
                var tabla = "";
                console.log(json);
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
        ajax.send();
    } else {
        console.error("Elemento 'crudUsuarios' no encontrado en el DOM.");
    }
}