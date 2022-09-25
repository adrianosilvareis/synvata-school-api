import { NotFoundError } from '@/http-status/not-found-error';
import { UpdateStudentCommand } from '@/students/domain/use-cases/update-student-command';

import { StudentBuilder } from '#/students/builders/student-builder';
import { StudentRepositoryStub } from '#/students/stubs/student-repository-stub';

describe('UpdateStudentCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.students = new StudentBuilder().buildMany(10);
    const params = repository.students[0];

    const studentUpdated = new StudentBuilder().with('id', params.id).build();

    // when
    await sut.execute(studentUpdated);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith(studentUpdated);
  });

  it('should call "NotFoundError" on throw NotFoundError', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.students = new StudentBuilder().buildMany(10);
    const params = new StudentBuilder().build();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new NotFoundError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onNotFoundSpy).toHaveBeenCalledWith('Record to update does not exist.');
  });

  it('should call "InternalServerError" on throw UnexpectedError', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    repository.students = new StudentBuilder().buildMany(10);
    const params = repository.students[0];

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new Error('any_message');
    });

    // when
    await sut.execute(params);

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

  const repository = new StudentRepositoryStub();
  repository.callback = listeners.callback;
  const sut = new UpdateStudentCommand(repository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    repository,
    listeners,
  };
}
