import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { ListCoursesRepository } from '@/courses/domain/repositories/list-courses-repository';

@injectable()
export class ListCoursesCommand extends Commands {
  public constructor(
    @inject(ListCoursesRepository) private readonly courseRepository: ListCoursesRepository,
  ) {
    super();
  }

  async execute(): Promise<void> {
    try {
      const list = await this.courseRepository.list();
      this.emit('Success', list);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.emit('InternalServerError', error.message);
      }

      this.emit('InternalServerError', error);
    }
  }
}
