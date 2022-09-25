import { Course } from '@/courses/domain/entities/course';

export abstract class ListCoursesRepository {
  abstract list(): Promise<Course[]>
}
