from django.urls import path
from .views import ArticuloList, ArticuloDetail, UserList, UserDetail

urlpatterns = [
    path('articulos/', ArticuloList.as_view(), name='articulo-list'),
    path('articulos/<int:pk>/', ArticuloDetail.as_view(), name='articulo-detail'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
]
