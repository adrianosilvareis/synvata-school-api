import {
  JsonController, Res, Delete, Params,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { RemoveCourseCommand, RemoveCourseParams } from '@/courses/domain/use-cases/remove-course-command';

@injectable()
@JsonController()
export class RemoveCourseController {
  constructor(
    @inject(RemoveCourseCommand) private readonly removeCourseCommand: Commands<RemoveCourseParams>,
  ) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Delete('/courses/:id')
  public async remove(
    @Res() res: Response,
    @Params() params: RemoveCourseParams,
  ): Promise<Response> {
    this.removeCourseCommand.on('InternalServerError', this.onError(res));
    this.removeCourseCommand.on('NotFoundError', this.onNotFound(res));
    this.removeCourseCommand.on('Success', this.onSuccess(res));

    await this.removeCourseCommand.execute(params);
    return res;
  }
}
