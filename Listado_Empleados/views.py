from django.shortcuts import render

def listado(request):
    return render(request, 'listado.html')