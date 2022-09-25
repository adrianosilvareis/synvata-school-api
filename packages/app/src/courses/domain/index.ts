import { diContainer } from '@/config/di-container';
import { ListCoursesCommand } from '@/courses/domain/use-cases/list-courses-command';
import { AddCourseCommand } from '@/courses/domain//use-cases/add-course-command';

diContainer.bind(AddCourseCommand).toSelf();
diContainer.bind(ListCoursesCommand).toSelf();
