import { diContainer } from '@/config/di-container';
import { ListCoursesCommand } from '@/courses/domain/use-cases/list-courses-command';
import { AddCourseCommand } from '@/courses/domain/use-cases/add-course-command';
import { RemoveCourseCommand } from '@/courses/domain/use-cases/remove-course-command';
import { UpdateCourseCommand } from '@/courses/domain/use-cases/update-course-command';

diContainer.bind(AddCourseCommand).toSelf();
diContainer.bind(ListCoursesCommand).toSelf();
diContainer.bind(RemoveCourseCommand).toSelf();
diContainer.bind(UpdateCourseCommand).toSelf();
