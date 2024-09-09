from django.urls import path
from . import views

urlpatterns = [
    path("request/", views.openai_request, name="openai_request"),
]

