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

        print(nombre, salario)
    else:
        print("something's wrong")
        return JsonResponse({"error" : "metodo no permitido"}, status=400)
    
    return JsonResponse({"mensaje" : "Empleado valido para insertar"}, status=200)





def home(request):
    
    lista_empleados = obtener_empleados()
    
    return render(request, "Pagina_principal.html", {"empleados": lista_empleados})

