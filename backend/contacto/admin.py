from django.contrib import admin
from .models import Contacto, Servicio, Solicitud

# Register your models here.
admin.site.register(Contacto)
admin.site.register(Servicio)
admin.site.register(Solicitud)
