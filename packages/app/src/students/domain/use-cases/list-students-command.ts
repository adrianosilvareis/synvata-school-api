import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { ListStudentsRepository } from '@/students/domain/repositories/list-students-repository';

@injectable()
export class ListStudentsCommand extends Commands {
  public constructor(
    @inject(ListStudentsRepository) private readonly repository: ListStudentsRepository,
  ) {
    super();
  }

  async execute(): Promise<void> {
    try {
      const list = await this.repository.list();
      this.emit('Success', list);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
