from rest_framework import serializers
from base.models import Match

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['points', 'matchOutcome']