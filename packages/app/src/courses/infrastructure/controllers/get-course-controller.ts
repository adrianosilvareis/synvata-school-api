import {
  JsonController, Res, Get, Param,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { GetCorseParams, GetCourseCommand } from '@/courses/domain/use-cases/get-course-command';

@injectable()
@JsonController()
export class GetCourseController {
  constructor(
    @inject(GetCourseCommand) private readonly getCourseCommand: Commands<GetCorseParams>,
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

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  @Get('/courses/:id')
  public async get(@Res() res: Response, @Param('id') id: string): Promise<Response> {
    this.getCourseCommand.on('InternalServerError', this.onError(res));
    this.getCourseCommand.on('NotFoundError', this.onNotFound(res));
    this.getCourseCommand.on('Success', this.onSuccess(res));

    await this.getCourseCommand.execute({ id });
    return res;
  }
}
