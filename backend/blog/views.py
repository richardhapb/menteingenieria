from rest_framework import generics
from .models import Articulo
from .serializers import ArticuloSerializer, UserSerializer
from django.contrib.auth.models import User

# Create your views here.
class ArticuloList(generics.ListCreateAPIView):
    queryset = Articulo.objects.all().filter(publicado=True).order_by('-fecha')
    serializer_class = ArticuloSerializer

class ArticuloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
