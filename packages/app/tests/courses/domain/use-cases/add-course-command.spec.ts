import { faker } from '@faker-js/faker';
import { Uuid } from '@libs/uuid-lib';

import { UnexpectedError } from '@/http-status/unexpected-error';
import { AddCourseCommand } from '@/courses/domain/use-cases/add-course-command';

import { CourseRepositoryStub } from '#/stubs/course-services-stub';

describe('AddCourseCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, courseRepository, listeners } = makeSut();
    const params = { name: faker.name.fullName() };
    courseRepository.newId = Uuid.generate().toString();
    // when
    await sut.execute(params);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith({ ...params, id: courseRepository.newId });
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = { name: faker.name.fullName() };

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalledWith('any_message');
  });
});

// eslint-disable-next-line no-empty-function
function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    callback: jest.fn(),
  };

  const courseRepository = new CourseRepositoryStub();
  courseRepository.callback = listeners.callback;
  const sut = new AddCourseCommand(courseRepository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    courseRepository,
    listeners,
  };
}
