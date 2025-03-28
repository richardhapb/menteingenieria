"""
URL configuration for menteingenieria project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Custom hashed URL for admin is expected in environment
    path(getattr(settings, "ADMIN_URI", "admin/"), admin.site.urls),
    path("", include("contact.urls")),
    path("blog/", include("blog.urls")),
    path("openai_request/", include("openai_requests.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
