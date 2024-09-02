SERVICE := api
IMAGE := genially-backend

build:
	@docker build . -t $(IMAGE):dev

dev: build
	docker-compose up $(SERVICE)

stop: build
	docker-compose down $(SERVICE)

shell: build
	docker-compose run --rm -p 3000:3000 $(SERVICE) /bin/sh