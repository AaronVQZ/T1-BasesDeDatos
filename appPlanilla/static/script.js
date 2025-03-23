
document.addEventListener('DOMContentLoaded', function() {
    const btnAgregarEmpleado = document.getElementById('boton_agregar');
    const modal = document.getElementById('modalInsertarEmpleado');
    const cerrar = document.getElementsByClassName('cerrar')[0];
    const form = document.getElementById('formInsertarEmpleado');

    //al hacer click se abre el modal
    btnAgregarEmpleado.onclick = function(){
        modal.style.display = "block";
    }

    //el boton de cierre, cierra el modal
    cerrar.onclick = function(){
        modal.style.display = 'none';
    }

    window.onclick = function(event){
        if (event.target == modal){
            modal.style.display = 'none';
        }
    }

    form.onsubmit = function(event){
        event.preventDefault();

        let formData = new FormData(form);

        fetch("insertar_empleado/" ,{
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": getCSRFTOKEN()
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            if (data.mensaje){
                modal.style.display = "none";
                form.reset();
            }
        })
        .catch(error => console.error("Error:", error))
    }

    function getCSRFTOKEN() {
        return document.querySelector("[name=csrfmiddlewaretoken]").value;
    }

});



