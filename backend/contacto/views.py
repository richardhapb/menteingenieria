from rest_framework import viewsets

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
