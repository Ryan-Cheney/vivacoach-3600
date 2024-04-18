from django.urls import path
from .views import MatchView

urlpatterns = [
    path('matches/', MatchView.as_view(), name='matches'),
]

# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'journal', JournalEntryViewSet, basename='journal')

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include(router.urls)),