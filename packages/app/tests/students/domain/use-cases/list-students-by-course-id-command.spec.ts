import { UnexpectedError } from '@/http-status/unexpected-error';
import { ListStudentsByCourseIdCommand } from '@/students/domain/use-cases/list-students-by-course-id-command';

import { StudentRepositoryStub } from '#/students/stubs/student-repository-stub';

describe('ListStudentsByCourseIdCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, listeners } = makeSut();

    // when
    await sut.execute({ courseId: 'any_course_id' });

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalled();
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute({ courseId: 'any_course_id' });

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
  const sut = new ListStudentsByCourseIdCommand(repository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    listeners,
  };
}
