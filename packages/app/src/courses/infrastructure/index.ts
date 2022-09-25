import { ListCourseRepository } from '@/courses/domain/repositories/list-courses-repository';
import { diContainer } from '@/config/di-container';
import { ListCoursesController } from '@/courses/infrastructure/controllers/list-courses-controller';
import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';

diContainer.bind(ListCoursesController).toSelf();
diContainer.bind(ListCourseRepository).to(PostgresCourseRepositories);
