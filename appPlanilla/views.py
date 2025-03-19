from django.shortcuts import render, HttpResponse
from django.db import connection

# Create your views here.

def obtener_empleados(request):
    query = "EXEC sp_ObtenerEmpleados"
    with connection.connecction as conn:
        empleados = conn.execute(query).fetchall()
    return empleados


def home(request):
    return render(request, "Pagina_principal.html")