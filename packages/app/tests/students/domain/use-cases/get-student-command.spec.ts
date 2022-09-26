import { UnexpectedError } from '@/http-status/unexpected-error';
import { GetStudentCommand } from '@/students/domain/use-cases/get-student-command';
import { NotFoundError } from '@/http-status/not-found-error';

import { StudentBuilder } from '#/students/builders/student-builder';
import { StudentRepositoryStub } from '#/students/stubs/student-repository-stub';

describe('GetStudentCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.students = new StudentBuilder().buildMany(10);
    const course = repository.students[0];

    // when
    await sut.execute({ id: course.id });

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalled();
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.students = new StudentBuilder().buildMany(10);
    const course = repository.students[0];

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

  const repository = new StudentRepositoryStub();
  repository.callback = listeners.callback;
  const sut = new GetStudentCommand(repository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    repository,
    listeners,
  };
}
