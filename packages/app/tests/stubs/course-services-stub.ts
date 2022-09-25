import { UpdateCourseRepository } from '@/courses/domain/repositories/update-course-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';
import { Course } from '@/courses/domain/entities/course';
import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import { AddCourseParams } from '@/courses/domain/use-cases/add-course-command';
import { RemoveCourseRepository } from '@/courses/domain/repositories/remove-course-repository';

export class CourseRepositoryStub implements
ListCoursesRepository,
AddCourseRepository,
RemoveCourseRepository,
UpdateCourseRepository {
  public courses: Course[] = [];

  public newId: string = '';

  public callback!: () => void;

  async list(): Promise<Course[]> {
    this.callback();
    return this.courses;
  }

  async add(params: AddCourseParams): Promise<Course> {
    const course = new Course(this.newId, params.name);
    this.courses.push(course);

    this.callback();
    return course;
  }

  async removeById(id: string): Promise<Course> {
    const course = this.courses.find((c) => c.id === id);

    if (!course) {
      throw new NotFoundError('Record to delete does not exist.');
    }

    this.courses = this.courses.filter((c) => c.id !== id);

    this.callback();
    return course;
  }

  async update(params: Course): Promise<Course> {
    const course = this.courses.find((c) => c.id === params.id);

    if (!course) {
      throw new NotFoundError('Record to update does not exist.');
    }

    this.courses = this.courses.map((c) => (c.id !== params.id ? c : course));

    this.callback();
    return params;
  }
}
