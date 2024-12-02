format:
	ruff check --silent --exit-zero --fix .
	ruff format .

db:
	docker compose up -d db

run:
	python3 manage.py runserver localhost:8000

migrations:
	python3 manage.py makemigrations

migrate:
	python3 manage.py migrate

restart_db:
	docker compose down
	docker compose up -d db
