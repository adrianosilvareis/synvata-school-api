import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import { diContainer } from '@/config/di-container';
import { ListCoursesController } from '@/courses/infrastructure/controllers/list-courses-controller';
import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';
import { AddCourseController } from '@/courses/infrastructure/controllers/add-course-controller';
import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';

diContainer.bind(ListCoursesController).toSelf();
diContainer.bind(ListCoursesRepository).to(PostgresCourseRepositories);

diContainer.bind(AddCourseController).toSelf();
diContainer.bind(AddCourseRepository).to(PostgresCourseRepositories);
