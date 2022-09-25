import { Course } from '@/courses/domain/entities/course';

export abstract class AddCourseRepository {
  abstract add(course: Omit<Course, 'id'>): Promise<Course>
}
