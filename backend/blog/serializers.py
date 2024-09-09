from rest_framework import serializers
from .models import Articulo
from django.contrib.auth.models import User

class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = ['id', 'titulo', 'autor', 'contenido', 'imagen', 'fecha']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']
