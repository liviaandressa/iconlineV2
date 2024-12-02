from rest_framework.routers import DefaultRouter

from .views import IConlineViewSet

router = DefaultRouter()
router.register(r'', IConlineViewSet, basename='IC online')
urlpatterns = router.urls


