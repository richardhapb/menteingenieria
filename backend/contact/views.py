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


# Handle an user request, and notify by email to menteingenieria team and send
# an email to the user indicating that will be contacted

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def perform_create(self, serializer: RequestSerializer) -> None:
        """
        Get data from user and spawn a thread for email sending.

        Args:
            serializer: Serializer of model where will be store the data
        """

        try:
            data = self.request.data
            contact, _ = Contact.objects.get_or_create(
                email=data['email'],
                defaults={
                    'name': data.get('name', ''),
                    'phone': data.get('phone', ''),
                    'company': data.get('company', None)
                }
            )

            user_request = serializer.save(contact=contact)

            # Process the request async
            request_thread = threading.Thread(target=process_request, args=(user_request, contact))
            request_thread.start()
        except Contact.DoesNotExist as e:
            logger.error("Error: Contact doesn't exists and cannot be created: %s", e)
        except Exception as e:
            logger.error("Error: %s", e)

def process_request(user_request: Request, contact: Contact) -> None:
    """
    Proccess the request of contact and capture send confirmation email

    Args:
        request: Request data provided by user
        contact: `Contact` instance that represents the customer
    """
    try:
        # Request creation
        logger.info(user_request)

        user_request.contact = contact
        user_request.save()

        send_mail(user_request)
    except Exception as e:
        logger.error("Error: %s", e)

def send_mail(request: Request) -> None:
    """
    Send the confirmation email to customer and notification for
    menteingenieria

    Args:
        request:   `Request` instance with the user requirements
    """
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
                f"Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo a la brevedad.\n\n" \
                f"Saludos,\n\n" \
                f"El equipo de {config('WEB_NAME')}"
    html_message = f"<p>Hola {request.contact.name},</p>" \
                    f"<p>Gracias por contactar con nosotros. Tu solicitud ha sido recibida y nos pondremos en contacto contigo lo antes posible.</p>" \
                    f"<p>Saludos,</p>"
    
    utils.contact_mail(subject, message, [request.contact.email], html_message)