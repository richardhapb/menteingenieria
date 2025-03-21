from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, ServiceViewSet, RequestViewSet

# Routes for response as a API

router = DefaultRouter()
router.register(r'contact', ContactViewSet)
router.register(r'service', ServiceViewSet)
router.register(r'request', RequestViewSet)

urlpatterns = [
    path('', include(router.urls))
]

