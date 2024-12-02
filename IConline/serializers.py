from rest_framework import serializers

from .models import Material
from .models import Professores
from .models import Disciplinas


class ProfessoresSerialazer(serializers.ModelSerializer):
    class Meta:
        model = Professores
        fields = ['id', 'nome']

class DisciplinasSerialazer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinas
        fields = ['id', 'nome']
class MaterialSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(source='get_tipo_display')
    professor = serializers.CharField(source='professor.nome')
    disciplina = serializers.CharField(source='disciplina.nome')
    curso = serializers.CharField(source='curso.nome')

    class Meta:
        model = Material
        fields = [
            'id',
            'tipo',
            'nome',
            'professor',
            'disciplina',
            'curso',
            'semestre',
            'descricao',
            'link',
            'arquivo',
        ]
