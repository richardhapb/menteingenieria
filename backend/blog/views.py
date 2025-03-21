from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer, UserSerializer
from django.contrib.auth.models import User

class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all().filter(published=True).order_by('-date')
    serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
