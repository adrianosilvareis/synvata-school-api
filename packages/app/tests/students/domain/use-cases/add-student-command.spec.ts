import { UnexpectedError } from '@/http-status/unexpected-error';
import { AddStudentCommand } from '@/students/domain/use-cases/add-student-command';

import { StudentBuilder } from '#/students/builders/student-builder';
import { StudentRepositoryStub } from '#/students/stubs/student-repository-stub';

describe('AddStudentCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, repository, listeners } = makeSut();
    const params = new StudentBuilder().build();
    repository.newId = params.id;

    // when
    await sut.execute(params);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith(params);
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = new StudentBuilder().build();

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

  const repository = new StudentRepositoryStub();
  repository.callback = listeners.callback;
  const sut = new AddStudentCommand(repository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    repository,
    listeners,
  };
}
