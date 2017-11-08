.PHONY: all
all: install

.PHONY: ci
ci: check test ## CI | Run all validation targets

# SYSTEM DEPENDENCIES #########################################################

.PHONY: doctor
doctor: ## Check for required system dependencies
	bin/verchew

.env:
	echo SECRET_KEY=local >> $@
	echo DATABASE_URL=postgresql://localhost/voterengagement_dev >> $@

# PROJECT DEPENDENCIES ########################################################

BACKEND_DEPENDENCIES := tmp/.pipenv-$(shell bin/checksum Pipfile*)
FRONTEND_DEPENDENCIES := tmp/.yarn-$(shell bin/checksum yarn.lock)

.PHONY: install
install: $(BACKEND_DEPENDENCIES) $(FRONTEND_DEPENDENCIES) ## Install project dependencies

$(BACKEND_DEPENDENCIES):
	mkdir -p tmp
	pipenv install --dev
	@ touch $@

$(FRONTEND_DEPENDENCIES):
	yarn install
	@ touch  $@

.PHONY: clean
clean:
	rm -rf tmp
	rm -rf staticfiles
	rm -rf .coverage htmlcov
	rm -rf node_modules web_client/build
	- pipenv --rm

# RUNTIME DEPENDENCIES ########################################################

.PHONY: migrations
migrations: install  ## Database | Generate database migrations
	pipenv run python manage.py makemigrations

.PHONY: migrate
migrate: install ## Database | Run database migrations
	pipenv run python manage.py migrate

.PHONY: data
ifdef HEROKU_APP_NAME
data: ## Database | Seed data for manual testing
else
data: install migrate
endif
	pipenv run python manage.py gendata

# VALIDATION TARGETS ##########################################################

.PHONY: check
check: install
	echo "TODO: Add static analysis"

.PHONY: test
test: install
	echo "TODO: Run tests"

# SERVER TARGETS ##############################################################

.PHONY: run
run: install ## Run the applicaiton
	pipenv run honcho start --procfile=Procfile.dev

TODO: Emulate the production server
.PHONY: run-prod
run-prod: .env install ## Run the application (emulate production)
	pipenv shell "bin/pre_compile; exit \$$?"
	pipenv shell "bin/post_compile; exit \$$?"
	pipenv shell "heroku local release; exit \$$?"
	pipenv shell "heroku local web; exit \$$?"

# HELP ########################################################################

.PHONY: help
help: all
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
