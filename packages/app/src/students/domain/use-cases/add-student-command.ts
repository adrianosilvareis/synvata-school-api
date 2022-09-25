import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { AddStudentRepository } from '@/students/domain/repositories/add-student-repository';

export interface AddStudentParams {
  name: string;
  email: string;
}

@injectable()
export class AddStudentCommand extends Commands<AddStudentParams> {
  public constructor(
    @inject(AddStudentRepository) private readonly repository: AddStudentRepository,
  ) {
    super();
  }

  async execute(params: AddStudentParams): Promise<void> {
    try {
      const student = await this.repository.add(params);
      this.emit('Success', student);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
