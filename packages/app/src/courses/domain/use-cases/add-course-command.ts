import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { AddCourseRepository } from '@/courses/domain/repositories/add-course-repository';

export interface AddCourseParams {
  name: string
}

@injectable()
export class AddCourseCommand extends Commands<AddCourseParams> {
  public constructor(
    @inject(AddCourseRepository) private readonly courseRepository: AddCourseRepository,
  ) {
    super();
  }

  async execute(params: AddCourseParams): Promise<void> {
    try {
      const course = await this.courseRepository.add(params);
      this.emit('Success', course);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
