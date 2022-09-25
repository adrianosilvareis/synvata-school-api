import { injectable } from 'inversify';
import { Uuid } from '@libs/uuid-lib/src/lib/uuid';

import { UpdateCourseRepository } from '@/courses/domain/repositories/update-course-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';
import { Course } from '@/courses/domain/entities/course';
import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';
import client from '@/config/database-client';
import { RemoveCourseRepository } from '@/courses/domain/repositories/remove-course-repository';

@injectable()
export class PostgresCourseRepositories implements
  ListCoursesRepository,
  AddCourseRepository,
  RemoveCourseRepository,
  UpdateCourseRepository {
  async update(params: Course): Promise<Course> {
    try {
      const course = await client.svCourse.update({
        where: {
          id: params.id,
        },
        data: params,
      });
      return course;
    } catch (error) {
      throw new NotFoundError('Record to update does not exist.');
    }
  }

  async removeById(id: string): Promise<Course> {
    try {
      const course = await client.svCourse.delete({
        where: {
          id,
        },
      });
      return course;
    } catch (error) {
      throw new NotFoundError('Record to delete does not exist.');
    }
  }

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
