# Create your models here.
from django.contrib.auth.models import User
from django.db import models


class Alunos(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'alunos'
        verbose_name_plural = 'Alunos'


class Disciplinas(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    eletiva = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'disciplinas'
        verbose_name_plural = 'Disciplinas'


class Cursos(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    disciplinas = models.ManyToManyField(Disciplinas, blank=True)

    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'cursos'
        verbose_name_plural = 'Cursos'


class Professores(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    disciplinas = models.ManyToManyField(Disciplinas, blank=True)

    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'professores'
        verbose_name_plural = 'Professores'


class Material(models.Model):
    class TipoMaterial(models.TextChoices):
        PROVA = 'prova', 'Prova'
        LISTA = 'lista', 'Lista'
        PROJETO = 'projeto', 'Projeto'

    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255, choices=TipoMaterial.choices)
    nome = models.CharField(max_length=255)
    professor = models.ForeignKey(Professores, on_delete=models.CASCADE)
    disciplina = models.ForeignKey(Disciplinas, on_delete=models.CASCADE, related_name='materiais')
    curso = models.ForeignKey(Cursos, on_delete=models.CASCADE)
    semestre = models.CharField(max_length=6)
    descricao = models.TextField()
    link = models.URLField(null=True, blank=True)
    arquivo = models.FileField(upload_to='uploads/')

    def __str__(self):
        return self.nome

    class Meta:
        db_table = 'materiais'
        verbose_name_plural = 'Materiais'
