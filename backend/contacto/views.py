from rest_framework import viewsets
import threading
from decouple import config
import utils


from .models import (
    Contacto,
    Servicio,
    Solicitud
)

from .serializers import (
    ContactoSerializer,
    ServicioSerializer,
    SolicitudSerializer
)

def procesar_solicitud(datos, solicitud):
    # Creación de contacto o recuperación si ya existe
    try:
        contacto, _ = Contacto.objects.get_or_create(
            email=datos['email'],
            defaults={
                'nombre': datos['nombre'],
                'telefono': datos['telefono'],
                'empresa': datos.get('empresa', None)
            }
        )

        # Creación de solicitud
        print(solicitud)
        solicitud.contacto = contacto
        solicitud.save()

        enviar_correo(solicitud)
    except Contacto.DoesNotExist:
        print("Error: El contacto no existe y no se pudo crear.")
    except Exception as e:
        print(f"Error inesperado: {e}")

def enviar_correo(solicitud):
        asunto = f"Solicitud de contacto de {solicitud.contacto.nombre}"
        mensaje = f"Se ha recibido una nueva solicitud de contacto\n\n" \
                    f"Nombre: {solicitud.contacto.nombre}\n" \
                    f"Email: {solicitud.contacto.email}\n" \
                    f"Teléfono: {solicitud.contacto.telefono}\n" \
                    f"Empresa: {solicitud.contacto.empresa}\n\n" \
                    f"Mensaje:\n{solicitud.texto}"
        html_message = f"<p>Se ha recibido una nueva solicitud de contacto</p>" \
                        f"<strong>Nombre:</strong> {solicitud.contacto.nombre}<br />" \
                        f"<strong>Email:</strong> {solicitud.contacto.email}<br />" \
                        f"<strong>Teléfono:</strong> {solicitud.contacto.telefono}<br />" \
                        f"<strong>Mensaje:</strong><p>{solicitud.texto}</p>"
        utils.correo_contacto(asunto, mensaje, [config('CONTACT_MAIL')], html_message)

        # Correo a la persona que envió la solicitud
        asunto = "Solicitud de contacto recibida"
        mensaje = f"Hola {solicitud.contacto.nombre},\n\n" \
                    f"Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.\n\n" \
                    f"Saludos,\n\n" \
                    f"El equipo de {config('WEB_NAME')}"
        html_message = f"<p>Hola {solicitud.contacto.nombre},</p>" \
                        f"<p>Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.</p>" \
                        f"<p>Saludos,</p>"
        
        utils.correo_contacto(asunto, mensaje, [solicitud.contacto.email], html_message)

# Create your views here.
class ContactoViewSet(viewsets.ModelViewSet):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = Solicitud.objects.all()
    serializer_class = SolicitudSerializer

    def perform_create(self, serializer):
        datos = self.request.data

        # Crear o recuperar contacto antes de guardar la solicitud
        contacto, _ = Contacto.objects.get_or_create(
            email=datos['email'],
            defaults={
                'nombre': datos['nombre'],
                'telefono': datos['telefono'],
                'empresa': datos.get('empresa', None)
            }
        )

        # Asignar el contacto a la solicitud antes de guardarla
        solicitud = serializer.save(contacto=contacto)

        # Iniciar el procesamiento de la solicitud en un hilo
        solicitud_thread = threading.Thread(target=procesar_solicitud, args=(datos, solicitud))
        solicitud_thread.start()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    