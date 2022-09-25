import {
  JsonController, Res, Get,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { ListCoursesCommand } from '@/courses/domain/use-cases/list-courses-command';

@injectable()
@JsonController()
export class ListCoursesController {
  constructor(@inject(ListCoursesCommand) private readonly listCourseCommand: Commands) {}

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

  @Get('/courses')
  public async list(@Res() res: Response): Promise<Response> {
    this.listCourseCommand.on('InternalServerError', this.onError(res));
    this.listCourseCommand.on('Success', this.onSuccess(res));

    await this.listCourseCommand.execute();
    return res;
  }
}
