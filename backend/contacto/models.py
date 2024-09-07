from django.db import models
from django.core.mail import send_mail

# Create your models here.

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=15)
    empresa = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.nombre
class Servicio(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.nombre
    
class Solicitud(models.Model):
    contacto = models.ForeignKey(Contacto, on_delete=models.CASCADE, null=False, blank=False)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, null=True, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)
    texto = models.TextField()

    def __str__(self):
        return f"Solicitud de {self.contacto.nombre} el {self.fecha}"
    

        
