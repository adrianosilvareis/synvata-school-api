/* eslint-disable max-len */
import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { ListStudentsByCourseIdRepository } from '@/students/domain/repositories/list-students-by-course-id-repository';

export interface ListByCourseIdParams {
  courseId: string
}
@injectable()
export class ListStudentsByCourseIdCommand extends Commands<ListByCourseIdParams> {
  public constructor(
    @inject(ListStudentsByCourseIdRepository) private readonly repository: ListStudentsByCourseIdRepository,
  ) {
    super();
  }

  async execute(params: ListByCourseIdParams): Promise<void> {
    try {
      const list = await this.repository.listByCourseId(params.courseId);
      this.emit('Success', list);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
