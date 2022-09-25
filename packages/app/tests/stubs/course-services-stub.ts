import { Course } from '@/courses/domain/entities/course';
import { ListCourseRepository } from '@/courses/domain/repositories/list-courses-repository';

export class CourseRepositoryStub implements ListCourseRepository {
  public courses = [];

  public callback!: () => void;

  async list(): Promise<Course[]> {
    this.callback();
    return this.courses;
  }
}
