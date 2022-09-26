# SYNVATA-SCHOOL

this is a `monorepo` project divided between `libs` and `app` modules inside the `package` folder.

1) the `libs` are small auxiliary or useful projects, 
2) the `app` is the main project of this monorepo.

## app

base url http://localhost:3000

### COURSE

```json
  # course object
  {
    "id":"any_uuid",
    "name": "any_name"
  }
```

VERB   | ROUTE                     | BODY          | DESCRIBE                         |
---    | ---                       | ---           | ---                              |
GET    | /api/courses              |               | list all courses                 | 
GET    | /api/courses/:id          |               | get one course by id             |
GET    | /api/courses/:id/students |               | list all students of this course |
POST   | /api/courses              | course object | create new course                |
PUT    | /api/courses/:id          | course object | update course                    |
DELETE | /api/courses/:id          |               | delete course                    |

### STUDENTS

```json
  # student object
  {
    "id":"any_uuid",
    "name": "any_name",
    "email": "any_email@email.com"
  }
```

VERB   | ROUTE                     | BODY           | DESCRIBE              |
---    | ---                       | ---            | ---                   |
GET    | /api/students             |                | list all students     | 
GET    | /api/students/:id         |                | get one student by id |
POST   | /api/students             | student object | create new student    |
PUT    | /api/students/:id         | student object | update student        |
DELETE | /api/students/:id         |                | delete student        |

## setup

follow this step by step the first time you run the project:

`make install` to install all dependencies

`duplicate .env.sample file with .env name`

`make migrate` to migrate all tables to database
****
`make build_all` to build all libs and app module

`make down` to take down all running containers

`make up` to turn up database and app container

## tests

run ``make test_ci` command to see test coverage

## Other Makefile commands

`make up` raise and run docker containers

`make down` drop the containers

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