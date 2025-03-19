from django.shortcuts import render, HttpResponse
from django.db import connection

# Create your views here.

def obtener_empleados():
    query = "EXEC sp_ObtenerEmpleados"
    
    connection.ensure_connection()

    conn = connection.connection
    empleados = conn.execute(query).fetchall()
    return empleados


def home(request):
    
    lista_empleados = obtener_empleados()
    
    return render(request, "Pagina_principal.html", {"empleados": lista_empleados})