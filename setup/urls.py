"""
URL configuration for setup project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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

from decouple import config
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

BASE_URL = config('BASE_URL_PREFIX')

urlpatterns = [
    path(f'{BASE_URL}admin/', admin.site.urls),
    path(f'{BASE_URL}schemas/', SpectacularAPIView.as_view(), name='schemas'),
    path(
        f'{BASE_URL}schemas/swagger-ui/',
        SpectacularSwaggerView.as_view(url_name='schemas'),
        name='swagger-ui',
    ),
    path(
        f'{BASE_URL}schemas/redoc/',
        SpectacularRedocView.as_view(url_name='schemas'),
        name='redoc',
    ),
    path(f'{BASE_URL}', include('IConline.urls')),
]
