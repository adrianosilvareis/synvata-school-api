/* eslint-disable max-len */
import {
  JsonController, Res, Get, Param,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { ListByCourseIdParams, ListStudentsByCourseIdCommand } from '@/students/domain/use-cases/list-students-by-course-id-command';

@injectable()
@JsonController()
export class ListStudentsByCourseIdController {
  constructor(
    @inject(ListStudentsByCourseIdCommand) private readonly listStudentCommand: Commands<ListByCourseIdParams>,
  ) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Get('/courses/:courseId/students')
  public async list(@Res() res: Response, @Param('courseId') courseId: string): Promise<Response> {
    this.listStudentCommand.on('InternalServerError', this.onError(res));
    this.listStudentCommand.on('Success', this.onSuccess(res));

    await this.listStudentCommand.execute({ courseId });
    return res;
  }
}
