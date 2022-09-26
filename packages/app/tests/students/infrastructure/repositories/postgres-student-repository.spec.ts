import { NotFoundError } from '@/http-status/not-found-error';
import { PostgresStudentRepositories } from '@/students/infrastructure/repositories/postgres-student-repository';

import { prismaMock } from '#/config/client-database';
import { StudentBuilder } from '#/students/builders/student-builder';

describe('List', () => {
  test('should return student list', async () => {
    // give
    const list = new StudentBuilder()
      .buildMany(10);

    // when
    prismaMock
      .svStudent
      .findMany
      .mockResolvedValueOnce(list);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.list()).resolves.toEqual(list);
  });
});

describe('ListByCourseId', () => {
  test('should return student list filtered by courseId', async () => {
    // give
    const list = new StudentBuilder()
      .buildMany(10);

    // when
    prismaMock
      .svStudent
      .findMany
      .mockResolvedValueOnce(list);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.listByCourseId('any_course_id')).resolves.toEqual(list);
  });
});

describe('Get', () => {
  test('should return course', async () => {
    // give
    const student = new StudentBuilder().build();

    // when
    prismaMock
      .svStudent
      .findFirst
      .mockResolvedValueOnce(student);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.get(student.id)).resolves.toEqual(student);
  });

  test('should not return student', async () => {
    // give
    const student = new StudentBuilder().build();

    // when
    prismaMock
      .svStudent
      .findFirst
      .mockResolvedValueOnce(null);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.get(student.id)).rejects.toThrowError(new NotFoundError('Record not exist.'));
  });
});

describe('Add', () => {
  test('should return new student', async () => {
    // give
    const student = new StudentBuilder().build();
    const params = { name: student.name, email: student.email };

    // when
    prismaMock
      .svStudent
      .create
      .mockResolvedValueOnce(student);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.add(params)).resolves.toEqual(student);
  });
});

describe('Remove', () => {
  test('should return remove student', async () => {
    // give
    const student = new StudentBuilder().build();

    // when
    prismaMock
      .svStudent
      .delete
      .mockResolvedValueOnce(student);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.removeById(student.id)).resolves.toEqual(student);
  });

  test('should return throw NotFoundException when not student not exists', async () => {
    // give
    const student = new StudentBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .svStudent
      .delete
      .mockRejectedValueOnce(error);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.removeById(student.id)).rejects.toThrowError(new NotFoundError('Record to delete does not exist.'));
  });
});

describe('Update', () => {
  test('should return updated student', async () => {
    // give
    const student = new StudentBuilder().build();
    const newStudent = new StudentBuilder().with('id', student.id).build();

    // when
    prismaMock
      .svStudent
      .update
      .mockResolvedValueOnce(newStudent);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.update(student)).resolves.toEqual(newStudent);
  });

  test('should return throw NotFoundException when not student not exists', async () => {
    // give
    const student = new StudentBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .svStudent
      .update
      .mockRejectedValueOnce(error);

    const repository = new PostgresStudentRepositories();

    // then
    await expect(repository.update(student)).rejects.toThrowError(new NotFoundError('Record to update does not exist.'));
  });
});
