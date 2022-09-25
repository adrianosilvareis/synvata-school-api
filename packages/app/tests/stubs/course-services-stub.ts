import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';
import { Course } from '@/courses/domain/entities/course';
import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import { AddCourseParams } from '@/courses/domain/use-cases/add-course-command';

export class CourseRepositoryStub implements ListCoursesRepository, AddCourseRepository {
  public courses: Course[] = [];

  public newId: string = '';

  public callback!: () => void;

  async list(): Promise<Course[]> {
    this.callback();
    return this.courses;
  }

  async add(params: AddCourseParams): Promise<Course> {
    this.callback();
    const course = new Course(this.newId, params.name);
    this.courses.push(course);

    return course;
  }
}
