import { Course } from '@/courses/domain/entities/course';

export abstract class UpdateCourseRepository {
  abstract update(course: Course): Promise<Course>
}
