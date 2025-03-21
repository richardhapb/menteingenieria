import logging
import threading

import utils
from decouple import config
from rest_framework import viewsets

from .models import Contact, Request, Service
from .serializers import ContactSerializer, RequestSerializer, ServiceSerializer

logger = logging.getLogger(__name__)

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def perform_create(self, serializer):
        data = self.request.data

        contact, _ = Contact.objects.get_or_create(
            email=data['email'],
            defaults={
                'name': data.get('name', 'Unknown'),
                'phone': data.get('phone', 'Unknown'),
                'company': data.get('company', None)
            }
        )

        user_request = serializer.save(contact=contact)

        # Process the request async
        request_thread = threading.Thread(target=process_request, args=(data, user_request))
        request_thread.start()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

def process_request(data: dict, user_request: Request) -> None:
    """
    Proccess the request of contact and capture send confirmation email

    Args:
        data: HTTP request `POST` data
        request: Request data provided by user
    """
    try:
        contact, _ = Contact.objects.get_or_create(
            email=data['email'],
            defaults={
                'name': data.get('name', ''),
                'phone': data.get('phone', ''),
                'company': data.get('company', None)
            }
        )

        # Request creation
        logger.info(user_request)
        user_request.contact = contact
        user_request.save()

        send_mail(user_request)
    except Contact.DoesNotExist:
        logger.error("Error: Contact doesn't exists and cannot be created.")
    except Exception as e:
        logger.error(f"Error: {e}")

def send_mail(request):
        subject = f"Solicitud de contacto de {request.contact.name}"
        message = f"Se ha recibido una nueva solicitud de contacto\n\n" \
                    f"Nombre: {request.contact.name}\n" \
                    f"Email: {request.contact.email}\n" \
                    f"Teléfono: {request.contact.phone}\n" \
                    f"Empresa: {request.contact.company}\n\n" \
                    f"Mensaje:\n{request.text}"
        html_message = f"<p>Se ha recibido una nueva solicitud de contacto</p>" \
                        f"<strong>Nombre:</strong> {request.contact.name}<br />" \
                        f"<strong>Email:</strong> {request.contact.email}<br />" \
                        f"<strong>Teléfono:</strong> {request.contact.phone}<br />" \
                        f"<strong>Mensaje:</strong><p>{request.text}</p>"
        utils.contact_mail(subject, message, [config('CONTACT_MAIL')], html_message)

        # Mail to customer
        subject = "Solicitud de contacto recibida"
        message = f"Hola {request.contact.name},\n\n" \
                    f"Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.\n\n" \
                    f"Saludos,\n\n" \
                    f"El equipo de {config('WEB_NAME')}"
        html_message = f"<p>Hola {request.contact.name},</p>" \
                        f"<p>Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.</p>" \
                        f"<p>Saludos,</p>"
        
        utils.contact_mail(subject, message, [request.contact.email], html_message)