from django.core.mail import send_mail
from decouple import config

def contact_mail(subject, message, to, html_message=None):

    # Read mail signature
    with open('contact-signature.html', 'r') as file:
        signature = file.read()

    send_mail(subject, message, config("CONTACT_MAIL"), to, html_message=html_message + signature if html_message else None)
