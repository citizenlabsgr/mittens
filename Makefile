.PHONY: all
all: doctor check test ## CI | Run all validation targets

# SYSTEM DEPENDENCIES #########################################################

.PHONY: bootstrap
bootstrap: ## Attempt to install system dependencies
	asdf plugin add python || asdf plugin update python
	asdf plugin add poetry https://github.com/asdf-community/asdf-poetry.git || asdf plugin update poetry
	asdf plugin add nodejs || asdf plugin update nodejs
	asdf install

.PHONY: doctor
doctor: ## Check for required system dependencies
	bin/verchew --exit-code

.envrc:
	echo export SECRET_KEY=local >> $@
	echo export DATABASE_URL=postgresql://localhost/voterengagement_dev >> $@
	echo >> $@
	echo export MANDRILL_API_KEY=copy-from-staging >> $@
	echo >> $@
	echo export BUGSNAG_API_KEY=copy-from-staging >> $@
	echo >> $@
	echo export LOG_LEVEL=DEBUG >> $@
	direnv allow

# PROJECT DEPENDENCIES ########################################################

export PIPENV_VENV_IN_PROJECT=true
VENV := .venv
NODE_MODULES := node_modules

BACKEND_DEPENDENCIES = $(VENV)/.pipenv-$(shell bin/checksum Pipfile*)
FRONTEND_DEPENDENCIES =$(NODE_MODULES)/.yarn-$(shell bin/checksum yarn.lock)

.PHONY: install
install: $(BACKEND_DEPENDENCIES) $(FRONTEND_DEPENDENCIES) ## Install project dependencies

$(BACKEND_DEPENDENCIES):
	pipenv install --dev
	@ touch $@

$(FRONTEND_DEPENDENCIES):
	yarn install
	@ touch  $@

.PHONY: clean
clean:
	rm -rf staticfiles
	rm -rf .coverage htmlcov
	rm -rf $(NODE_MODULES) web_client/build
	rm -rf $(VENV)

# RUNTIME DEPENDENCIES ########################################################

.PHONY: migrations
migrations: install  ## Database | Generate database migrations
	pipenv run python manage.py makemigrations

.PHONY: migrate
migrate: install ## Database | Run database migrations
	pipenv run python manage.py migrate

.PHONY: dump
dump: install
	pipenv run python manage.py dumpdata elections.Kind --indent=2 --output=api/elections/fixtures/kinds.json

.PHONY: data
ifdef HEROKU_APP_NAME
data: ## Database | Seed data for manual testing
	python manage.py loaddata kinds
	python manage.py gendata
else
data: install migrate
	pipenv run python manage.py loaddata kinds
	pipenv run python manage.py gendata
endif

.PHONY: reset
reset: install ## Database | Create a new database, migrate, and seed it
	- dropdb voterengagement_dev
	- createdb voterengagement_dev
	make data

# VALIDATION TARGETS ##########################################################

.PHONY: check
check: check-backend

.PHONY: check-backend
check-backend: install
	pipenv run isort --recursive --apply api
	@ echo
	pipenv run pycodestyle api
	@ echo
	pipenv run pylint api

.PHONY: test
test: test-backend test-frontend

.PHONY: test-backend
test-backend: install
	pipenv run pytest api

.PHONY: test-frontend
test-frontend: install
	yarn build
	yarn test

.PHONY: watch
watch: install
	@ sleep 2 && make all &
	pipenv run watchmedo tricks .watchdog.yml

# DOCUMENTATION ###############################################################

.PHONY: uml
uml: install
	pipenv run pip install pygraphviz
	mkdir -p design_documents/UML
	pipenv run python manage.py graph_models -a -g -o design_documents/UML/ERD.png

# SERVER TARGETS ##############################################################

.PHONY: run
run: install ## Run the applicaiton
	yarn build
	cp web_client/app/index.html web_client/build/index.html
	pipenv run honcho start --procfile=Procfile.dev

.PHONY: run-prod
run-prod: .envrc install ## Run the application (emulate production)
	pipenv shell "bin/pre_compile; exit \$$?"
	pipenv shell "bin/post_compile; exit \$$?"
	pipenv shell "heroku local release; exit \$$?"
	pipenv shell "heroku local web; exit \$$?"

# HELP ########################################################################

.PHONY: help
help: install
	@ grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
