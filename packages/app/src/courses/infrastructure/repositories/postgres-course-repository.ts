import { injectable } from 'inversify';
import { Uuid } from '@libs/uuid-lib/src/lib/uuid';

import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';
import { Course } from '@/courses/domain/entities/course';
import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import client from '@/config/database-client';

@injectable()
export class PostgresCourseRepositories implements ListCoursesRepository, AddCourseRepository {
  async add(params: Omit<Course, 'id'>): Promise<Course> {
    const course = await client.svCourse.create({
      data: {
        id: Uuid.generate().toString(),
        name: params.name,
      },
    });

    return course;
  }

  async list(): Promise<Course[]> {
    const list = await client.svCourse.findMany();
    return list.map((course) => new Course(course.id, course.name));
  }
}
