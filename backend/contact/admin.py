from django.contrib import admin
from .models import Contact, Service, Request

# Register your models here.
admin.site.register(Contact)
admin.site.register(Service)
admin.site.register(Request)
