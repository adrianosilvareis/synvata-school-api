import { Course } from '@/courses/domain/entities/course';

export abstract class ListCourseRepository {
  abstract list(): Promise<Course[]>
}
