import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';

import { prismaMock } from '#/config/client-database';
import { CourseBuilder } from '#/builders/course-builder';

describe('List', () => {
  test('should return course list', async () => {
    // give
    const courseList = new CourseBuilder()
      .buildMany(10);

    // when
    prismaMock
      .svCourse
      .findMany
      .mockResolvedValueOnce(courseList);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.list()).resolves.toEqual(courseList);
  });
});

describe('Add', () => {
  test('should return new Course', async () => {
    // give
    const course = new CourseBuilder().build();

    // when
    prismaMock
      .svCourse
      .create
      .mockResolvedValueOnce(course);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.add({ name: course.name })).resolves.toEqual(course);
  });
});
