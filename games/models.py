from django.db import models
from django.contrib.auth.models import User

class Institucion(models.Model):
    nombre = models.CharField(max_length=180)

class Paciente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=50, unique=True)
    institucion = models.ForeignKey('institucion', on_delete=models.CASCADE)

class Partida(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    juego = models.CharField(max_length=20)
    puntaje = models.IntegerField()
    tiempo = models.CharField()
    fecha = models.DateTimeField(auto_now_add=True)