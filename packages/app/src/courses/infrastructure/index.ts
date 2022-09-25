import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import { diContainer } from '@/config/di-container';
import { ListCoursesController } from '@/courses/infrastructure/controllers/list-courses-controller';
import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';
import { AddCourseController } from '@/courses/infrastructure/controllers/add-course-controller';
import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';
import { RemoveCourseController } from '@/courses/infrastructure/controllers/remove-course-controller';
import { RemoveCourseRepository } from '@/courses/domain/repositories/remove-course-repository';
import { UpdateCourseController } from '@/courses/infrastructure/controllers/update-course-controller';
import { UpdateCourseRepository } from '@/courses/domain/repositories/update-course-repository';

diContainer.bind(ListCoursesController).toSelf();
diContainer.bind(ListCoursesRepository).to(PostgresCourseRepositories);

diContainer.bind(AddCourseController).toSelf();
diContainer.bind(AddCourseRepository).to(PostgresCourseRepositories);

diContainer.bind(RemoveCourseController).toSelf();
diContainer.bind(RemoveCourseRepository).to(PostgresCourseRepositories);

diContainer.bind(UpdateCourseController).toSelf();
diContainer.bind(UpdateCourseRepository).to(PostgresCourseRepositories);
