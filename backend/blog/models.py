from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Articulo(models.Model):
    titulo = models.CharField(max_length=100)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='articulos/', null=True, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)
    publicado = models.BooleanField()
    
    def __str__(self):
        return self.titulo
