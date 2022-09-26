import { Course } from '@/courses/domain/entities/course';

export abstract class GetCourseRepository {
  abstract get(id: string): Promise<Course>
}
