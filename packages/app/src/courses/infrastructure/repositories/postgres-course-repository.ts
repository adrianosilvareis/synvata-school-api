import { injectable } from 'inversify';

import { Course } from '@/courses/domain/entities/course';
import { ListCourseRepository } from '@/courses/domain/repositories/list-courses-repository';
import client from '@/config/database-client';

@injectable()
export class PostgresCourseRepositories implements ListCourseRepository {
  async list(): Promise<Course[]> {
    const list = await client.svCourse.findMany();
    return list.map((course) => new Course(course.id, course.name));
  }
}
