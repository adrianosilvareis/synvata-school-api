import { diContainer } from '@/config/di-container';
import { ListCoursesCommand } from '@/courses/domain/use-cases/list-courses-command';

diContainer.bind(ListCoursesCommand).toSelf();
