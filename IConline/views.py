import base64

from drf_spectacular.utils import extend_schema

from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Alunos, Cursos, Disciplinas, Material, Professores
from .serializers import MaterialSerializer, ProfessoresSerialazer, DisciplinasSerialazer


class IConlineViewSet(viewsets.ViewSet):
    authentication_classes = [BasicAuthentication]

    @extend_schema(
        description='This endpoint is used to login the user.',
        request=(),
        responses={'token': 'string'},
    )
    @action(
        detail=False,
        methods=['post'],
        url_path='acesso/login',
        permission_classes=[AllowAny],
    )
    def login(self, request):
        username = request.data['email']
        password = request.data['password']

        try:
            aluno = Alunos.objects.get(email=username)
            user = aluno.user

            if not user.check_password(password):
                return Response(
                    {'error': 'Invalid username/password.'}, status=status.HTTP_400_BAD_REQUEST
                )

            token = base64.b64encode(f'{username}:{password}'.encode()).decode()
            return Response({'token': token})

        except Alunos.DoesNotExist:
            return Response({'error': 'User not registered'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response(
                {'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        description='This endpoint is used to register a new user.',
        request=(),
        responses={'token': 'string'},
    )
    @action(
        detail=False, methods=['post'], url_path='acesso/cadastro', permission_classes=[AllowAny]
    )
    def cadastro(self, request):
        nome = request.data['nome']
        email = request.data['email']
        password = request.data['password']

        user = User.objects.create_user(
            username=email, password=password, email=email, first_name=nome
        )
        _, created_now = Alunos.objects.get_or_create(
            email=email, defaults={'nome': nome, 'user': user}
        )

        if not created_now:
            return Response(
                {'error': 'User already registered'}, status=status.HTTP_400_BAD_REQUEST
            )

        token = base64.b64encode(f'{email}:{password}'.encode()).decode()
        return Response({'token': token})

    @action(detail=False, methods=['get'], url_path='cursos/(?P<id_curso>[0-9]+)/disciplinas')
    def disciplinas(self, request, id_curso=None):
        curso = Cursos.objects.get(id=id_curso)
        disciplinas = curso.disciplinas.all()

        data = {'curso': curso.nome, 'disciplinas': disciplinas.values()}

        return Response(data)

    @action(detail=False, methods=['get'], url_path='disciplinas/(?P<id_disciplina>[0-9]+)/provas')
    def provas(self, request, id_disciplina=None):
        disciplina = Disciplinas.objects.get(id=id_disciplina)
        provas = disciplina.materiais.filter(tipo='prova')

        data = {
            'disciplina': disciplina.nome,
            'provas': MaterialSerializer(provas, many=True).data,
        }

        return Response(data)

    @action(detail=False, methods=['get'], url_path='disciplinas/(?P<id_disciplina>[0-9]+)/listas')
    def listas(self, request, id_disciplina=None):
        disciplina = Disciplinas.objects.get(id=id_disciplina)
        listas = disciplina.materiais.filter(tipo='lista')

        data = {
            'disciplina': disciplina.nome,
            'listas': MaterialSerializer(listas, many=True).data,
        }

        return Response(data)

    @action(
        detail=False, methods=['get'], url_path='disciplinas/(?P<id_disciplina>[0-9]+)/projetos'
    )
    def projetos(self, request, id_disciplina=None):
        disciplina = Disciplinas.objects.get(id=id_disciplina)
        projetos = disciplina.materiais.filter(tipo='projeto')

        data = {
            'disciplina': disciplina.nome,
            'projetos': MaterialSerializer(projetos, many=True).data,
        }

        return Response(data)

    @action(detail=False, methods=['post'], url_path='materiais', permission_classes=[AllowAny])
    def cadastro_material(self, request):
        Material.objects.create(
            **{
                'nome': request.data['nome'],
                'tipo': request.data['tipo'],
                'professor': Professores.objects.get(id=request.data['professor']),
                'disciplina': Disciplinas.objects.get(id=request.data['disciplina']),
                'curso': Cursos.objects.get(id=request.data['curso']),
                'semestre': request.data['semestre'],
                'descricao': request.data['descricao'],
                'link': request.data['link'],
                'arquivo': request.data['arquivo'],
            }
        )

        return Response({'message': 'Material cadastrado com sucesso.'})

    @action(
        detail=False, methods=['get'], url_path='disciplinas/(?P<id_disciplina>[0-9]+)/materiais'
    )
    def todos_materiais(self, request, id_disciplina=None):
        disciplina = Disciplinas.objects.get(id=id_disciplina)
        materiais = disciplina.materiais.all()
        data = {
            'disciplina': disciplina.nome,
            'materiais': MaterialSerializer(materiais, many=True).data,
        }

        return Response(data)
    
    @action(detail=False, methods=['get'], url_path='professores', permission_classes=[AllowAny])
    def listar_professores(self, request):
        """
        Retorna a lista de todos os professores cadastrados.
        """
        professores = Professores.objects.all()
        data = ProfessoresSerialazer(professores, many=True).data
        return Response(data)


    @action(detail=False, methods=['get'], url_path='disciplinas', permission_classes=[AllowAny])
    def listas_disciplinas(self, request):
        """
        Retorna a lista de todos as disciplinas cadastrados.
        """
        disciplinas = Disciplinas.objects.all()
        data = DisciplinasSerialazer(disciplinas, many=True).data
        return Response(data)
