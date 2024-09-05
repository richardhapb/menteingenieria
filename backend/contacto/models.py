from django.db import models
from django.core.mail import send_mail
from decouple import config
import utils

# Create your models here.

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=15)
    empresa = models.CharField(max_length=100)

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
    
    def save(self, *args, **kwargs):
        asunto = f"Solicitud de contacto de {self.contacto.nombre}"
        mensaje = f"Se ha recibido una nueva solicitud de contacto\n\n" \
                    f"Nombre: {self.contacto.nombre}\n" \
                    f"Email: {self.contacto.email}\n" \
                    f"Teléfono: {self.contacto.telefono}\n" \
                    f"Empresa: {self.contacto.empresa}\n\n" \
                    f"Mensaje:\n{self.texto}"
        html_message = f"<p>Se ha recibido una nueva solicitud de contacto</p>" \
                        f"<strong>Nombre:</strong> {self.contacto.nombre}<br />" \
                        f"<strong>Email:</strong> {self.contacto.email}<br />" \
                        f"<strong>Teléfono:</strong> {self.contacto.telefono}<br />" \
                        f"<strong>Empresa:</strong> {self.contacto.empresa}<br />" \
                        f"<strong>Mensaje:</strong><p>{self.texto}</p>"
        utils.correo_contacto(asunto, mensaje, [config('CONTACT_MAIL')], html_message)

        # Correo a la persona que envió la solicitud
        asunto = "Solicitud de contacto recibida"
        mensaje = f"Hola {self.contacto.nombre},\n\n" \
                    f"Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.\n\n" \
                    f"Saludos,\n\n" \
                    f"El equipo de {config('WEB_NAME')}"
        html_message = f"<p>Hola {self.contacto.nombre},</p>" \
                        f"<p>Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.</p>" \
                        f"<p>Saludos,</p>"
        utils.correo_contacto(asunto, mensaje, [self.contacto.email], html_message)


        
    
