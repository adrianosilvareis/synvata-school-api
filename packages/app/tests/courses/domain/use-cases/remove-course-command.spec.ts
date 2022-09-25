import { faker } from '@faker-js/faker';

import { NotFoundError } from '@/http-status/not-found-error';
import { RemoveCourseCommand } from '@/courses/domain/use-cases/remove-course-command';

import { CourseBuilder } from '#/builders/course-builder';
import { CourseRepositoryStub } from '#/stubs/course-services-stub';

describe('RemoveCourseCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, courseRepository, listeners } = makeSut();
    courseRepository.courses = new CourseBuilder().buildMany(10);
    const params = courseRepository.courses[0];

    // when
    await sut.execute({ id: params.id });

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith(params);
  });

  it('should call "NotFoundError" on throw NotFoundError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = { id: faker.datatype.uuid() };

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new NotFoundError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onNotFoundSpy).toHaveBeenCalledWith('Record to delete does not exist.');
  });

  it('should call "InternalServerError" on throw UnexpectedError', async () => {
    // give
    const { sut, courseRepository, listeners } = makeSut();
    courseRepository.courses = new CourseBuilder().buildMany(10);
    const params = courseRepository.courses[0];

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new Error('any_message');
    });

    // when
    await sut.execute({ id: params.id });

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalled();
  });
});

// eslint-disable-next-line no-empty-function
function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    onNotFoundSpy: jest.fn(),
    callback: jest.fn(),
  };

  const courseRepository = new CourseRepositoryStub();
  courseRepository.callback = listeners.callback;
  const sut = new RemoveCourseCommand(courseRepository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    courseRepository,
    listeners,
  };
}
