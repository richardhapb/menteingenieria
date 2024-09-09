from rest_framework import serializers
from .models import Contacto, Servicio, Solicitud

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class SolicitudSerializer(serializers.ModelSerializer):
    # Si contacto es una relación foránea
    contacto = serializers.PrimaryKeyRelatedField(queryset=Contacto.objects.all(), required=False)

    class Meta:
        model = Solicitud
        fields = ['contacto', 'texto']  # Asegúrate de incluir 'contacto'

