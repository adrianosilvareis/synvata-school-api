import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { UpdateStudentRepository } from '@/students/domain/repositories/update-student-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { Student } from '@/students/domain/entities/student';

@injectable()
export class UpdateStudentCommand extends Commands<Student> {
  public constructor(
    @inject(UpdateStudentRepository) private readonly repository: UpdateStudentRepository,
  ) {
    super();
  }

  async execute(params: Student): Promise<void> {
    try {
      const student = await this.repository.update(params);
      this.emit('Success', student);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        this.emit('NotFoundError', error.message);
        return;
      }
      const e: Error = error as Error;
      this.emit('InternalServerError', e.message);
    }
  }
}
