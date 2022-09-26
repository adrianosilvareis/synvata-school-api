import { diContainer } from '@/config/di-container';
import { ListStudentsCommand } from '@/students/domain/use-cases/list-students-command';
import { AddStudentCommand } from '@/students/domain/use-cases/add-student-command';
import { RemoveStudentCommand } from '@/students/domain/use-cases/remove-student-command';
import { UpdateStudentCommand } from '@/students/domain/use-cases/update-student-command';
import { GetStudentCommand } from '@/students/domain/use-cases/get-student-command';

diContainer.bind(AddStudentCommand).toSelf();
diContainer.bind(ListStudentsCommand).toSelf();
diContainer.bind(RemoveStudentCommand).toSelf();
diContainer.bind(UpdateStudentCommand).toSelf();
diContainer.bind(GetStudentCommand).toSelf();
