from django.urls import path
from .views import MatchView

urlpatterns = [
    path('matches/', MatchView.as_view(), name='matches'),
]