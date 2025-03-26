import traceback
from django.shortcuts import render, HttpResponse
from django.db import connection
from django.http import JsonResponse
# Create your views here.

def obtener_empleados():
    query = "EXEC sp_ObtenerEmpleados"
    
    connection.ensure_connection()

    conn = connection.connection
    empleados = conn.execute(query).fetchall()
    return empleados


def insertar_empleado(request):
    if request.method == "POST":
        nombre = request.POST.get("nombre")
        salario = request.POST.get("salario")
        outCode = 0

        query = "EXEC sp_AgregarEmpleado ?, ?, ?"

        connection.ensure_connection()
        conn = connection.connection

        try:    
            conn.execute(query, (nombre,salario,outCode))
            return JsonResponse({"mensaje": "Empleado insertado correctamente"})
        
        except Exception as e:
            mensaje_error = str(e)
            error_traceback = traceback.format_exc()
            print(f"Error:{mensaje_error}")
            print(f"Traceback:{error_traceback}")
            return JsonResponse({"Error":str(e)},status=500)

        
    else:
        print("something's wrong")
        return JsonResponse({"error" : "metodo no permitido"}, status=400)
    





def home(request):
    
    lista_empleados = obtener_empleados()
    
    return render(request, "Pagina_principal.html", {"empleados": lista_empleados})

