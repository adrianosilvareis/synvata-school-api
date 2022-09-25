import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';

import { prismaMock } from '#/config/client-database';
import { CourseBuilder } from '#/builders/course-builder';

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
