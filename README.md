# SYNVATA-SCHOOL

## setup

before run project exec this commands:

`make install`

## Makefile commands

run `make info` to see all commands

`make up` raise and run docker containers

`make down` drop the containers

`make setup` clone all libs repositories and do a pull request in all repositories

`make clear_setup` remove all files of packages/libs folder

`make install` install all dependencies in every packages/project

`make clear_install` remove all node_modules folder

`make lint` run lint command in app project

`make build` run build command in app project

`make build-libs` run build command in libs projects

`make clear_build` remove all dist folder

`make test` run a tests of app project

`make test_w` run a tests of app project with watch mode

`make test_ci` run a tests of app project with coverage mode

`make clear_coverage` remove coverage folder of app project