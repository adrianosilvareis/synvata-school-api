import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { RemoveStudentRepository } from '@/students/domain/repositories/remove-student-repository';
import { NotFoundError } from '@/http-status/not-found-error';

export interface RemoveStudentParams {
  id: string
}

@injectable()
export class RemoveStudentCommand extends Commands<RemoveStudentParams> {
  public constructor(
    @inject(RemoveStudentRepository) private readonly repository: RemoveStudentRepository,
  ) {
    super();
  }

  async execute(params: RemoveStudentParams): Promise<void> {
    try {
      const student = await this.repository.removeById(params.id);
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
