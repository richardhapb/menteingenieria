from django.contrib import admin
from .models import Contact, Service, Request

# Routes for API response

admin.site.register(Contact)
admin.site.register(Service)
admin.site.register(Request)
