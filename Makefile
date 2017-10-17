.PHONY: all
all: install build

.PHONY: ci
ci: check test ## CI | Run all validation targets

# SYSTEM DEPENDENCIES #########################################################

.PHONY: doctor
doctor: ## Check for required system dependencies
	bin/verchew

# PROJECT DEPENDENCIES ########################################################

DEPENDENCIES := tmp/.installed

.PHONY: install
install: $(DEPENDENCIES) ## Install project dependencies

$(DEPENDENCIES): Pipfile*
	mkdir -p tmp
	pipenv install --dev
	@ touch $@

# BUILD TARGETS ###############################################################

.PHONY: build
build:
	echo "TODO: Compile frontend here..."
	@ touch $@

.PHONY: clean
clean:
	rm -rf staticfiles
	rm -rf .coverage htmlcov
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
	echo "TODO: Seed data for review apps"

# VALIDATION TARGETS ##########################################################

# TODO: Add validation targets

# SERVER TARGETS ##############################################################

.PHONY: run
run: install ## Run the applicaiton
	pipenv run honcho start --procfile=Procfile.dev

# HELP ########################################################################

.PHONY: help
help: all
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
