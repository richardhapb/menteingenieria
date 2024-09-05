from django.core.mail import send_mail
from decouple import config

def correo_contacto(asunto, mensaje, para, html_message=None):

    # Leer firma de correo
    with open('contact-signature.html', 'r') as file:
        firma = file.read()

    send_mail(asunto, mensaje, config("CONTACT_MAIL"), para, html_message=html_message + firma if html_message else None)
