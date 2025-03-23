/*
var modal = document.getElementById("modalInsertarEmpleado");
var btn = document.getElementById("btnAgregarEmpleado")
var span = document.getElementsByClassName("close")[0];
*/

document.addEventListener('DOMContentLoaded', function() {
    const btnAgregarEmpleado = document.getElementById('boton_agregar');
    const modal = document.getElementById('modalInsertarEmpleado');
    const cerrar = document.getElementsByClassName('cerrar')[0];


    //al hacer click se abre el modal
    btnAgregarEmpleado.onclick = function(){
        modal.style.display = "block";
    }

    //el boton de cierre, cierra el modal
    cerrar.onclick = function(){
        modal.style.display = 'none';
    }

    window.onclick = function(){
        if (event.target == modal){
            modal.style.display = 'none';
        }
    }
});