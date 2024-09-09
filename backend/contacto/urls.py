from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactoViewSet, ServicioViewSet, SolicitudViewSet

router = DefaultRouter()
router.register(r'contacto', ContactoViewSet)
router.register(r'servicio', ServicioViewSet)
router.register(r'solicitud', SolicitudViewSet)

urlpatterns = [
    path('', include(router.urls))
]

