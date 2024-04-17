from django.db import models

class Match(models.Model):
    points = models.JSONField()  # Assumes you're using Django 3.1 or later for JSONField support
    matchOutcome = models.CharField(max_length=100)

    def __str__(self):
        return f"Match {self.pk} Outcome: {self.matchOutcome}"

