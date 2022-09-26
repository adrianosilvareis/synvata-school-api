import { UnexpectedError } from '@/http-status/unexpected-error';
import { GetCourseCommand } from '@/courses/domain/use-cases/get-course-command';
import { NotFoundError } from '@/http-status/not-found-error';

import { CourseBuilder } from '#/courses/builders/course-builder';
import { CourseRepositoryStub } from '#/courses/stubs/course-repository-stub';

describe('GetCourseCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.courses = new CourseBuilder().buildMany(10);
    const course = repository.courses[0];

    // when
    await sut.execute({ id: course.id });

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalled();
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.courses = new CourseBuilder().buildMany(10);
    const course = repository.courses[0];

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute({ id: course.id });

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalledWith('any_message');
  });

  it('should call "NotFoundError" on throw NotFoundError', async () => {
    // give
    const { sut, listeners } = makeSut();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new NotFoundError('any_message');
    });

    // when
    await sut.execute({ id: 'any_id' });

    // then
    expect(listeners.onNotFoundSpy).toHaveBeenCalledWith('Record not exist.');
  });
});

// eslint-disable-next-line no-empty-function
function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onNotFoundSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    callback: jest.fn(),
  };

  const repository = new CourseRepositoryStub();
  repository.callback = listeners.callback;
  const sut = new GetCourseCommand(repository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    repository,
    listeners,
  };
}
