import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { RemoveCourseRepository } from '@/courses/domain//repositories/remove-course-repository';
import { NotFoundError } from '@/http-status/not-found-error';

export interface RemoveCourseParams {
  id: string
}

@injectable()
export class RemoveCourseCommand extends Commands<RemoveCourseParams> {
  public constructor(
    @inject(RemoveCourseRepository) private readonly courseRepository: RemoveCourseRepository,
  ) {
    super();
  }

  async execute(params: RemoveCourseParams): Promise<void> {
    try {
      const course = await this.courseRepository.removeById(params.id);
      this.emit('Success', course);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        this.emit('NotFoundError', error.message);
        return;
      }

      this.emit('InternalServerError', error);
    }
  }
}
