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

diContainer.bind(ListStudentsController).toSelf();
diContainer.bind(ListStudentsRepository).to(PostgresStudentRepositories);

diContainer.bind(AddStudentController).toSelf();
diContainer.bind(AddStudentRepository).to(PostgresStudentRepositories);

diContainer.bind(RemoveStudentController).toSelf();
diContainer.bind(RemoveStudentRepository).to(PostgresStudentRepositories);

diContainer.bind(UpdateStudentController).toSelf();
diContainer.bind(UpdateStudentRepository).to(PostgresStudentRepositories);
