up:
	docker-compose up --scale api-example=5 -d

down:
	docker-compose down
	docker volume prune -f