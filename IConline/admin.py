from django.contrib import admin
from .models import Alunos, Cursos, Disciplinas, Material, Professores

# Personalizando o modelo Material no Django Admin
class MaterialAdmin(admin.ModelAdmin):
    # Campos a serem exibidos na lista do admin
    list_display = ('id', 'nome', 'tipo', 'professor', 'disciplina', 'curso', 'semestre', 'descricao')
    
    # Campos a serem exibidos no formulário de criação e edição
    fields = ('nome', 'tipo', 'professor', 'disciplina', 'curso', 'semestre', 'descricao', 'link', 'arquivo')
    
    # Filtros na barra lateral do Django Admin
    list_filter = ('tipo', 'curso', 'semestre')

# Registrando os modelos no admin
admin.site.register(Alunos)
admin.site.register(Cursos)
admin.site.register(Disciplinas)
admin.site.register(Professores)

# Registrando o modelo Material com a personalização
admin.site.register(Material, MaterialAdmin)
