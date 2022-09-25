import { Course } from '@/courses/domain/entities/course';

export abstract class RemoveCourseRepository {
  abstract removeById(id: string): Promise<Course>
}
