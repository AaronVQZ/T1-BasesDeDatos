
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

        const nombre = document.getElementById('nombre').value;
        const salario = document.getElementById('salario').value;
        
        //validacion del nombre

        //expresion regular
        const nombreExpReg = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/;
        if (!nombreExpReg.test(nombre)) {
            alert("El nombre solo puede contener letras, espacios y guiones");
            return;
        }

        //validacion del salario
        const salarioExpReg = /^\d+(\.\d{1,2})?$/;
        if(!salarioExpReg.test(salario)) {
            alert("El salario debe ser un valor monetario correcto");
            return;
        }




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



