import logging
from django.core.mail import send_mail
from decouple import config

logger = logging.getLogger(__name__)

def contact_mail(subject: str, message: str, to: str, html_message: str | None = None) -> None:
    """
    Send an email with custom signature

    Args:
        subject: Subject of the mail
        message: Message content
        to: Destinatary email
        html_message: Message in HTML format
    """

    if not html_message:
        html_message = message

    try:
        # Read mail signature
        with open('contact-signature.html', 'r') as file:
            signature = file.read()
    except FileNotFoundError as e:
        signature = ""
        logger.warning("Signature doesn't exist, sending a mail without signature. %s", e)


    send_mail(subject, message, str(config("CONTACT_MAIL")), to, html_message=html_message + signature if html_message else None)
