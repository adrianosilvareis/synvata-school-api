import { ListStudentsRepository } from '@/students/domain/repositories/list-students-repository';
import { diContainer } from '@/config/di-container';
import { ListStudentsController } from '@/students/infrastructure/controllers/list-students-controller';
import { PostgresStudentRepositories } from '@/students/infrastructure/repositories/postgres-student-repository';
import { AddStudentController } from '@/students/infrastructure/controllers/add-student-controller';
import { AddStudentRepository } from '@/students/domain/repositories/add-student-repository';
import { RemoveStudentController } from '@/students/infrastructure/controllers/remove-student-controller';
import { RemoveStudentRepository } from '@/students/domain/repositories/remove-student-repository';
import { UpdateStudentController } from '@/students/infrastructure/controllers/update-student-controller';
import { UpdateStudentRepository } from '@/students/domain/repositories/update-student-repository';
import { GetStudentController } from '@/students/infrastructure/controllers/get-student-controller';
import { GetStudentRepository } from '@/students/domain/repositories/get-student-repository';
import { ListStudentsByCourseIdController } from '@/students/infrastructure/controllers/list-students-by-course-id-controller';
import { ListStudentsByCourseIdRepository } from '@/students/domain/repositories/list-students-by-course-id-repository';

diContainer.bind(ListStudentsController).toSelf();
diContainer.bind(ListStudentsRepository).to(PostgresStudentRepositories);

diContainer.bind(ListStudentsByCourseIdController).toSelf();
diContainer.bind(ListStudentsByCourseIdRepository).to(PostgresStudentRepositories);

diContainer.bind(GetStudentController).toSelf();
diContainer.bind(GetStudentRepository).to(PostgresStudentRepositories);

diContainer.bind(AddStudentController).toSelf();
diContainer.bind(AddStudentRepository).to(PostgresStudentRepositories);

diContainer.bind(RemoveStudentController).toSelf();
diContainer.bind(RemoveStudentRepository).to(PostgresStudentRepositories);

diContainer.bind(UpdateStudentController).toSelf();
diContainer.bind(UpdateStudentRepository).to(PostgresStudentRepositories);
