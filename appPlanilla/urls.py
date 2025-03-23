from django.urls import path
from . import views

urlpatterns = [
    path("",views.home, name="home"),
    path("insertar_empleado/", views.insertar_empleado, name='insertar_empleado'),
]