from rest_framework import generics
from .models import Articulo
from .serializers import ArticuloSerializer

# Create your views here.
class ArticuloList(generics.ListCreateAPIView):
    queryset = Articulo.objects.all().filter(publicado=True).order_by('-fecha')
    serializer_class = ArticuloSerializer

class ArticuloDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticuloSerializer

    def get_queryset(self):
        return Articulo.objects.filter(publicado=True)
