import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { GetCourseRepository } from '@/courses/domain/repositories/get-course-repository';
import { NotFoundError } from '@/http-status/not-found-error';

export interface GetCorseParams {
  id: string;
}

@injectable()
export class GetCourseCommand extends Commands<GetCorseParams> {
  public constructor(
    @inject(GetCourseRepository) private readonly repository: GetCourseRepository,
  ) {
    super();
  }

  async execute(params: GetCorseParams): Promise<void> {
    try {
      const course = await this.repository.get(params.id);
      this.emit('Success', course);
    } catch (e: unknown) {
      if (e instanceof NotFoundError) {
        this.emit('NotFoundError', e.message);
      }

      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
