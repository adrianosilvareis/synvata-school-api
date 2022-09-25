import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { UpdateCourseRepository } from '@/courses/domain/repositories/update-course-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { Course } from '@/courses/domain/entities/course';

@injectable()
export class UpdateCourseCommand extends Commands<Course> {
  public constructor(
    @inject(UpdateCourseRepository) private readonly courseRepository: UpdateCourseRepository,
  ) {
    super();
  }

  async execute(params: Course): Promise<void> {
    try {
      const course = await this.courseRepository.update(params);
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
