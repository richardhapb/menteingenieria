from django.urls import path
from . import views

urlpatterns = [
    path("request/", views.openai_request, name="openai_request"),
    path("csrf/", views.get_csrf_token, name="get_csrf_token"),
]

