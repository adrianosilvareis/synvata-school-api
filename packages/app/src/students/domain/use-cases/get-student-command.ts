import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { GetStudentRepository } from '@/students/domain/repositories/get-student-repository';
import { NotFoundError } from '@/http-status/not-found-error';

export interface GetStudentParams {
  id: string;
}

@injectable()
export class GetStudentCommand extends Commands<GetStudentParams> {
  public constructor(
    @inject(GetStudentRepository) private readonly repository: GetStudentRepository,
  ) {
    super();
  }

  async execute(params: GetStudentParams): Promise<void> {
    try {
      const student = await this.repository.get(params.id);
      this.emit('Success', student);
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        this.emit('NotFoundError', e.message);
      }

      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
