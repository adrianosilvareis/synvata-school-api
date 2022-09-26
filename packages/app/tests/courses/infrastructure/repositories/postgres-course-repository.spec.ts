import { NotFoundError } from '@/http-status/not-found-error';
import { PostgresCourseRepositories } from '@/courses/infrastructure/repositories/postgres-course-repository';

import { prismaMock } from '#/config/client-database';
import { CourseBuilder } from '#/courses/builders/course-builder';

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

describe('Get', () => {
  test('should return course', async () => {
    // give
    const course = new CourseBuilder().build();

    // when
    prismaMock
      .svCourse
      .findFirst
      .mockResolvedValueOnce(course);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.get(course.id)).resolves.toEqual(course);
  });

  test('should not return course', async () => {
    // give
    const course = new CourseBuilder().build();

    // when
    prismaMock
      .svCourse
      .findFirst
      .mockResolvedValueOnce(null);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.get(course.id)).rejects.toThrowError(new NotFoundError('Record not exits.'));
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

describe('Remove', () => {
  test('should return remove course', async () => {
    // give
    const course = new CourseBuilder().build();

    // when
    prismaMock
      .svCourse
      .delete
      .mockResolvedValueOnce(course);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.removeById(course.id)).resolves.toEqual(course);
  });

  test('should return throw NotFoundException when not course not exists', async () => {
    // give
    const course = new CourseBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .svCourse
      .delete
      .mockRejectedValueOnce(error);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.removeById(course.id)).rejects.toThrowError(new NotFoundError('Record to delete does not exist.'));
  });
});

describe('Update', () => {
  test('should return updated course', async () => {
    // give
    const course = new CourseBuilder().build();
    const newCourse = new CourseBuilder().with('id', course.id).build();

    // when
    prismaMock
      .svCourse
      .update
      .mockResolvedValueOnce(newCourse);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.update(course)).resolves.toEqual(newCourse);
  });

  test('should return throw NotFoundException when not course not exists', async () => {
    // give
    const course = new CourseBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .svCourse
      .update
      .mockRejectedValueOnce(error);

    const repository = new PostgresCourseRepositories();

    // then
    await expect(repository.update(course)).rejects.toThrowError(new NotFoundError('Record to update does not exist.'));
  });
});
