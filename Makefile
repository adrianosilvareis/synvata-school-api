## install
install:
	docker-compose run --rm --no-deps -w ${PWD} app yarn

clear_install: | clear_folder_node_modules

## lint
lint:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app yarn lint

## lint
lint_all:
	docker-compose run --rm --no-deps -w ${PWD} app yarn workspaces run lint

## builder
build:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app yarn build

build_dev:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app yarn build:watch

build_libs:
	docker-compose run --rm --no-deps -w ${PWD}/packages/libs/uuid-lib       app yarn build
	docker-compose run --rm --no-deps -w ${PWD}/packages/libs/entity-builder app yarn build
	docker-compose run --rm --no-deps -w ${PWD}/packages/libs/commands-lib   app yarn build

build_workspaces:
	docker-compose run --rm --no-deps -w ${PWD} app yarn workspaces run build

build_all: | build_libs build

clear_build: | clear_folder_dist

# up
migrate:
	docker-compose -f docker-compose.yml up -d migrate

# up
up:
	docker-compose -f docker-compose.yml up -d postgres

# up
down:
	docker-compose -f docker-compose.yml down

## tests
test:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app yarn test

test_w:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app yarn test:watch

test_ci:
	docker-compose run --rm --no-deps -w ${PWD} app yarn workspaces run test --coverage

test_all:
	docker-compose run --rm --no-deps -w ${PWD} app yarn workspaces run test

clear_coverage:
	docker-compose run --rm --no-deps -w ${PWD}/packages/app app rm -rf coverage

## helper
clear_folder_%:
	docker-compose run --rm --no-deps -w ${PWD} app rm -rf $*
	docker-compose run --rm --no-deps -w ${PWD} app rm -rf packages/**/$*
	docker-compose run --rm --no-deps -w ${PWD} app rm -rf packages/**/**/$*